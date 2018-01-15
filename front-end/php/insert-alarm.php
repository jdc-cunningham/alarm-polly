<?php

    include(dirname(__FILE__) . DIRECTORY_SEPARATOR.'db-connect.php'); // get db credentials

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        // get values from POST request
        $id = null; // auto incrementing
        $time_string = $_POST['time_string'];
        $article_source = $_POST['article_source'];
        $special_message = $_POST['special_message'];
        $alarm_went_off = 0; // boolean set to false

        $status_array = [];

        $stmt = $dbh->prepare('INSERT INTO scheduled_alarms VALUES (:id, :time_string, :article_source, :special_message, :alarm_went_off)');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':time_string', $time_string, PDO::PARAM_STR);
        $stmt->bindParam(':article_source', $article_source, PDO::PARAM_STR);
        $stmt->bindParam(':special_message', $special_message, PDO::PARAM_STR);
        $stmt->bindParam(':alarm_went_off', $alarm_went_off, PDO::PARAM_INT);
        if ($stmt->execute()) {
            $status_array['status'] = 'ok';
        }
        else {
            $status_array['status'] = 'fail';
        }

        echo json_encode($status_array);

    }