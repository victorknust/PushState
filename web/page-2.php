<?php

require '../init.php';

$content = <<< EOF
<a href="/page-3.php">Third page</a>
EOF;

sendResponse($content);
