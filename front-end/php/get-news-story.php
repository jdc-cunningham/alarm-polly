<?php

    function getRandomArticle() {

        $your_key = '';
        $url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' . $your_key;
        $resp = file_get_contents($url);
        $resp = json_decode($resp, true);

        $articles = $resp['articles'];

        $articles_count = count($articles);

        $rand_article_id = rand(0,$articles_count);

        $article_text = $articles[$rand_article_id]['title'] . ','; // comma adds pause to synth

        $article_text .= $articles[$rand_article_id]['description'];

        // write to file for text to speech python parser
        $myfile = fopen("./../synth-files/random-article.txt", "w") or die("Unable to open file!");
        $txt = $article_text;
        fwrite($myfile, $txt);
        fclose($myfile);

    }