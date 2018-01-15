# alarm-polly
Schedule alarms with a message and news, weather forecast to be read allowed with AWS Polly through Raspberry Pi

## Details on how this works:

## Dependencies and requirements
This assumes you're running a LAMP stack on your Raspberry Pi and have an AWS account to use AWS Polly

* Raspberry Pi
* LAMP Stack
* Python
* Pygame
* AWS CLI - you have an AWS account such as the free tier
  * create an IAM user to authenticate against AWS Polly

## Other things used by this code

* Yahoo Weather API - need to provide your city and state
* News API - you need to sign up and get a key (free)

## Note

Even if you have a Pi Zero you can do this, provided you have some spare parts. Namely: a couple of resistors, capacitor and a film capacitor. I myself am using a Pi Zero to run this. You have to build a little filter and use the tutorial provided here by Adafruit.
https://learn.adafruit.com/adding-basic-audio-ouput-to-raspberry-pi-zero/pi-zero-pwm-audio
