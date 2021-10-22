<?php

namespace Auth;

use Exception;

require_once __DIR__."/Authorization.php";

class Auth 
{
    public static function auth($req, $aud)
    {
        $authorization = new Authorization();
        if($authorization->isTypeValid($req->httpAuth()))
            return false;
        if(empty($authorization->extractAccessToken($req->httpAuth())))
            return false;
        try {
            if($authorization->isAccessTokenVerified($req->httpAuth()))
                return false;
            $authorization->getPayload($authorization->extractAccessToken($req->httpAuth()));
        } catch(Exception $ex) {
            return false;
        }
        if(($info = $authorization->getInfo($req->httpAuth())) === false)
            return false;
        if($aud !== $info->aud)
            return false;
        return true;
    }
}