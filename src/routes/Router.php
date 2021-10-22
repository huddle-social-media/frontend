<?php

// server level router
namespace Router;

require_once __DIR__."/../auth/Auth.php";
require_once __DIR__."/../lib/Request/Request.php";

// Router class
class Router
{
    private static $routeTable = [];
    private static $METHOD_GET = 'GET';

    /**
     * Registering GET routes
     * 
     * @param string path Requested path
     * @param function callback The callback function to call
     * @param boolean secure Is route secured or not, default = true
     * 
     * @return void
     */
    public static function get($path, $callback, $secure = false, $aud = '')
    {
        self::add(self::$METHOD_GET, $path, $callback, $aud, $secure);
    }

    /**
     * Registering routes to routing table
     * 
     * @param string method Request method
     * @param string path Requested path
     * @param function callback The callback function to call
     * @param boolean secure Is route secured or not
     * 
     * @return void 
     */
    private static function add($method, $path, $callback, $aud = '', $secure)
    {
        self::$routeTable[$method.$path] = (object)[
            'callback' => $callback,
            'secure' => $secure,
            'aud' => $aud
        ];
    }

    public static function listen()
    {
        // not completed
        $route = $_SERVER['REQUEST_METHOD'].parse_url($_SERVER['REQUEST_URI'])['path'];
        if(!array_key_exists($route, self::$routeTable))
        {
            echo "<h1>404 Page not found</h1>"; // for now
            exit;
        }
        $matched = self::$routeTable[$route]->callback;
        /*$auth = new \Auth\Auth();
        $req = new \Lib\Request();
        if($matched->secure)
        {
            // then we have to check the token and the audience
            if(!$auth::auth($req, $matched->aud))
                echo "<h1>Not valid request</h1>";
        }*/
        $matched();
    }
}