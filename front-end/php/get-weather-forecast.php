<?php

    // include(dirname(__FILE__) . DIRECTORY_SEPARATOR.'simple_html_dom.php');

    function getWeather() {
        // from stackoverflow
        $your_city = '';
        $your_state = '';
        $url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' . $your_city . '%2C%20' . $your_state . '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
        $resp = file_get_contents($url);
        // Will dump a beauty json :3
        $resp = json_decode($resp, true);
        $weather_forecast = '';
        date_default_timezone_set('America/Chicago');
        $date_now = date('Y-m-d', time());
        $month = date('F');
        $date_now_parts = explode("-", $date_now);

        $description = $resp['query']['results']['channel']['item']['condition']['text'];
        $forecasts = $resp['query']['results']['channel']['item']['forecast'];
        $wind = $resp['query']['results']['channel']['wind'];

        // go through array by matching date, need dd M YYYY format
        $date_now_yahoo_weather_format = date('d M Y');

        function returnDirection($wind_degrees) {
            if ($wind_degrees == 0 || $wind_degrees == 360) {
                return 'North';
            }
            else if ($wind_degrees < 90) {
                return 'North East';
            }
            else if ($wind_degrees == 90) {
                return 'East';
            }
            else if ($wind_degrees < 180) {
                return 'South East';
            }
            else if ($wind_degrees == 180) {
                return 'South';
            }
            else if ($wind_degrees < 270) {
                return 'South West';
            }
            else if ($wind_degrees == 270) {
                return 'West';
            }
            else if ($wind_degrees < 360) {
                return 'North West';
            }
        }
        
        foreach ($forecasts as $forecast) {
            if ($forecast['date'] == $date_now_yahoo_weather_format) {
                $temp_high = $forecast['high'];
                $temp_low = $forecast['low'];
                $wind_direction = returnDirection($wind['direction']);
                $wind_speed = $wind['speed'];
            }
        }

        $weather_forecast .= 'Today is ' . $month . $date_now_parts[2] . ', ' . $date_now_parts[0] . ' .';
        $weather_forecast .= " Today's forecast is " . $description . ' with a high of ' . $temp_high . ' degrees and a low of ' . $temp_low . ' degrees. ';
        $weather_forecast .= 'Winds from the ' . $wind_direction . ' at ' . $wind_speed . ' miles per hour.';

        $myfile = fopen("./../synth-files/weather-forecast.txt", "w") or die("Unable to open file!");
        $txt = $weather_forecast;
        fwrite($myfile, $txt);
        fclose($myfile);

    }