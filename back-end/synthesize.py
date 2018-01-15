from boto3 import Session
session = Session(profile_name="adminuser")
polly = session.client("polly")

def synthesize_text(file_name,text):

    # limiter
    text_len = len(text)

    if (text_len > 1500):

        trunc_len = 1482
        text = text[:trunc_len] + ' content truncated'

    text = text.encode('utf-8')
    voiceID = "Nicole"
    outputFormat = "mp3"
    response = polly.synthesize_speech(Text=text,VoiceId=voiceID,OutputFormat=outputFormat)
    data_stream = response.get("AudioStream")

    filename = file_name
    f=file(filename, 'wb')

    CHUNK_SIZE = 1024

    import pygame
    pygame.mixer.init()

    while True:
      # stream data
      data = data_stream.read(CHUNK_SIZE)
      # write data
      f.write(data)
      # stop stream if no more data
      if not data:
        break
