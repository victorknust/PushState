<?php

define('IS_AJAX', isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');

define('APPLICATION_PATH', dirname($_SERVER['DOCUMENT_ROOT']));

function sendResponse($content) {
    if (IS_AJAX) {
        echo $content;
    }
    else {
        require APPLICATION_PATH . '/templates/layout.php';
    }
}
