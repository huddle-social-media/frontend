<?php
// entry point for all requests
// contain frontend server level routes


require_once __DIR__."/src/routes/Router.php";

use Router\Router;

function render($file)
{
    if(file_exists($file))
    {
        readfile($file);
        exit;
    }
    echo('requested file not exists in the server!');
    exit;
}

Router::get('/login', function(){
    render(__DIR__.'/src/views/login.html');
});

Router::get('/signup', function(){
    render(__DIR__.'/src/views/signup.html');
});

// secured route
/*Router::get('/', function(){
    render(__DIR__.'/src/views/main.html');
}, true, 'casual');

// secured route
Router::get('/', function(){
    render(__DIR__.'/src/views/main.html');
}, true, 'celebrity');

// secured route
Router::get('/', function(){
    render(__DIR__.'/src/views/main.html');
}, true, 'organization');

// secured route
Router::get('/', function(){
    render(__DIR__.'/src/views/main.html');
}, true, 'admin');*/

Router::get("/", function() {
    render(__DIR__.'/src/views/casual/html/main.html');
},true, 'organization');

Router::get("/home", function() {
    render(__DIR__.'/src/views/casual/html/main.html');
},true, 'organization');

Router::get("/issues", function() {
    render(__DIR__.'/src/views/casual/html/main.html');
},true, 'organization');

Router::listen();