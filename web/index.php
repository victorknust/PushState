<?php

require '../init.php';

$content = <<< EOF
<a href="/page-2.php">Second page</a>
EOF;

sendResponse($content);
