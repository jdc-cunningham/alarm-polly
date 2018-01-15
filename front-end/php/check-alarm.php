<?php

    include(dirname(__FILE__) . DIRECTORY_SEPARATOR.'db-connect.php');  // db credentials

    date_default_timezone_set("America/Chicago");

    $current_date_time = date('mdYhiA');

    $your_raspi_ip = "";

    $stmt = $dbh->prepare('SELECT special_message FROM scheduled_alarms WHERE time_string=:time_string');
    $stmt->bindParam(':time_string', $current_date_time, PDO::PARAM_STR);
    if ($stmt->execute()) {
        $result = $stmt->fetchAll();
        if (!empty($result)) {
            foreach ($result as $row) {
                // make state file
                $myfile = fopen("/var/www/html/alarm-polly/php/state-file.txt", "w") or die("Unable to open file!");
                $txt = 'play';
                fwrite($myfile, $txt);
                fclose($myfile);
                $page_url = 'http://' . $your_raspi_ip . '/alarm-polly/php/generate-text?'.$current_date_time;
                file_get_contents($page_url);
            }
        }
        else {
            unlink('/var/www/html/alarm-polly/php/state-file.txt');
        }
    }

