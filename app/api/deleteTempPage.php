<?php

$file = "../../ozngiozdfngklsakn_fsd_445.html";

if (file_exists($file)) {
    unlink($file);
} else {
    header("HTTP/1.0 400 Bad Request");
} 