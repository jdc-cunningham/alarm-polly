# alarm-polly
Schedule alarms with a message and news, weather forecast to be read allowed with AWS Polly through Raspberry Pi

## Video demo
https://www.youtube.com/watch?v=CqU3jfzUy6c

## Interface screenshots
![alt text](https://cdn-images-1.medium.com/max/800/1*Dre6aa81R28AiHDNu-Jgtw.png)

## Details on how this works:
https://medium.com/@jdc_cunningham/alarm-polly-create-your-own-alarm-messages-with-aws-polly-and-raspberry-pi-8af6d3c0d411

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

## Setting it up on your Pi
The medium post goes over most of the instructions, this assumes you're able to use a terminal/know what LAMP/python/pip/pygame/aws are.

The directory paths are:

```/home/pi/alarmPolly``` (back end)

```/var/www/html/alarm-polly``` (front end)


The two scripts that run alarm polly are ran by CRON every minute in sequence like this:

```check scheduled alarms```

```* * * * * /usr/bin/php /var/www/html/alarm-polly/php/check-alarm.php && /usr/bin/python /home/pi/alarmPolly/get-articles-parse-synth.py```

## Note

Even if you have a Pi Zero you can do this, provided you have some spare parts. Namely: a couple of resistors, capacitor and a film capacitor. I myself am using a Pi Zero to run this. You have to build a little filter and use the tutorial provided here by Adafruit.
https://learn.adafruit.com/adding-basic-audio-ouput-to-raspberry-pi-zero/pi-zero-pwm-audio

