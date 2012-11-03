<?php

require '../init.php';

$content = <<< EOF
<a href="/">First page</a>
EOF;

sendResponse($content);
