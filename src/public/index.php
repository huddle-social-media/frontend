<?php
function render($file)
{
    if(file_exists($file))
    {
        readfile($file);
        exit;
    }
    exit;
}

render(__DIR__."/views/document.html");