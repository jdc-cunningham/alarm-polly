<?php

    include(dirname(__FILE__) . DIRECTORY_SEPARATOR.'db-connect.php');  // db credentials

    date_default_timezone_set("America/Chicago");

    $current_date = date('mdY') . '%'; // use this for wildcard match

    $query_return = []; // for json output

    $stmt = $dbh->prepare('SELECT time_string, article_source, special_message FROM scheduled_alarms WHERE time_string LIKE :partial_time_string AND alarm_went_off=0');
    $stmt->bindParam(':partial_time_string', $current_date, PDO::PARAM_STR);
    if ($stmt->execute()) {
        $result = $stmt->fetchAll();
        if (!empty($result)) {
            $query_return['status'] = 'ok';
            foreach ($result as $row) {
                // build JSON output
                $query_return['alarms'][$row['time_string']] = [];
                $query_return['alarms'][$row['time_string']]['article_source'] = $row['article_source'];
                $query_return['alarms'][$row['time_string']]['special_message'] = $row['special_message'];
            }
        }
        else {
            $query_return['status'] = 'ok';
            $query_return['alarms'] = '';
        }
        echo json_encode($query_return);
    }
