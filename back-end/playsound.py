import os
import pygame
pygame.mixer.init()

def play_sound_file(file_name):

	pygame.mixer.music.load(file_name)
	pygame.mixer.music.play()
	while pygame.mixer.music.get_busy() == True:
		continue
	os.remove(file_name)
