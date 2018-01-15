<?php

    include(dirname(__FILE__) . DIRECTORY_SEPARATOR.'../db-connect.php');
    include(dirname(__FILE__) . DIRECTORY_SEPARATOR.'../get-weather-forecast.php');
    include(dirname(__FILE__) . DIRECTORY_SEPARATOR.'../get-news-story.php');

    // get url
    $cur_url = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

    // query
    $time_string_query = explode('?', $cur_url)[1];

    // get weather intro
    getWeather();

    // get random article
    getRandomArticle();

    // get special message
    if (!empty($time_string_query)) {
        $stmt = $dbh->prepare('SELECT id, article_source, special_message FROM scheduled_alarms WHERE time_string=:time_string AND alarm_went_off=0');
        $stmt->bindParam(':time_string', $time_string_query, PDO::PARAM_STR);
        if ($stmt->execute()) {
            $result = $stmt->fetchAll();
            if (!empty($result)) {
                foreach($result as $row) {
                    $special_message = $row['special_message'];
                    $myfile = fopen("../synth-files/special-message.txt", "w") or die("Unable to open file!");
                    $txt = $special_message;
                    fwrite($myfile, $txt);
                    fclose($myfile);
                    $cur_id = $row['id'];
                    // update alarm
                    // this isn't a good way to do this, should have Python do a call back to update so if the sound file played
                    // it actually did run, and also it's supposed to have a snooze option (keep playing messages until alarm acknowledged)
                    $stmt = $dbh->prepare('UPDATE scheduled_alarms SET alarm_went_off=1 WHERE id=:id');
                    $stmt->bindParam(':id', $cur_id, PDO::PARAM_INT);
                    $stmt->execute();
                }
            }
            else {
                // no specific message set
            }
        }
    }