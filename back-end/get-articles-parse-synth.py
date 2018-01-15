import os, HTMLParser
parser = HTMLParser.HTMLParser()
import re
import synthesize
from synthesize import synthesize_text
import playsound
from playsound import play_sound_file

# text file array
text_list = [
    'weather-forecast.txt',
    'random-article.txt',
    'special-message.txt'
]

at_least_one_file = False

for text_file in text_list:
    if (os.path.isfile('/var/www/html/alarm-polly/php/state-file.txt')):
        at_least_one_file = True

if not at_least_one_file:
    quit()

# loop through list
for text_file in text_list:
    cur_file = text_file
    str = open('/var/www/html/alarm-polly/php/synth-files/'+text_file, 'r').read()
    str = parser.unescape(re.sub('<[^<]+?>', '', str))
    # synthesize
    synthesize_text(cur_file.replace(".txt",".mp3"),str)

# play audio files
for text_file in text_list:
    cur_file = text_file
    play_sound_file(cur_file.replace(".txt",".mp3"))
