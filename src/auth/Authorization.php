<?php 
namespace Auth;

require_once __DIR__."/../lib/JWT/JWT.php";

class Authorization 
{
    // The secret key
    private const SECRET_KEY = "secret_key";

    private const AUDIENCE = ['admin', 'organization', 'casual', 'celebrity'];
    
    /**
     * Check the authorization header value for bearer or not
     * 
     * @param string httpAuth The authorization value
     * 
     * @return boolean Is valid type or not
     */
    public function isTypeValid($httpAuth)
    {
        return preg_match('/Bearer\s(\S+)/', $httpAuth);
    }


    /**
     * Extracting the access token from the header value
     * 
     * @param string httpAuth The authorization value
     * 
     * @return string access token
     */
    public function extractAccessToken($httpAuth)
    {
        if(!preg_match('/Bearer\s(\S+)/', $httpAuth, $matches) || !$matches[1])
            return '';
        return $matches[1];
    }

    /**
     * Check the access token validity against secret key
     * 
     * @param string httpAuth The authorization value
     * @param string secretKey The secret key
     * 
     * @return boolean Valid or not
     */
    public function isAccessTokenVerified($httpAuth)
    {
        if(!($info = $this->getInfo($httpAuth)) === false)    
            return false;
        $segments = $this->getSegments($httpAuth());
        $alg = $info->alg;
        $aud = $info->aud;
        $exp = $info->exp;
        if(!is_numeric($exp) || strlen($alg) > 1 || !\Lib\JWT::verify($segments[0].'.'.$segments[1], $segments[2], self::SECRET_KEY, $alg))
            return false;
        if(!$this->validAudience($aud))
            return false;
        return true;
    } 

    public function validAudience($aud) 
    {   
        if(array_key_exists($aud, self::AUDIENCE))
            return true;
        return false;
    }

    /**
     * Getting the payload from access token
     * 
     * @param string accessToken The access token
     * 
     * @return array The payload
     */
    public function getPayload($accessToken)
    {
        return \Lib\JWT::decode($accessToken, self::SECRET_KEY);
    }

    public function getSegments($httpAuth)
    {
        $segments = explode('.', $this->extractAccessToken($httpAuth));
        if(count($segments) !== 3)
            return false;
        return $segments;
    }

    public function getInfo($httpAuth)
    {
        if(($segments = $this->getSegments($httpAuth())) === false)
            return false;
        $header = json_decode(\Lib\JWT::urlSafeBase64Decode($segments[0]));
        $payload = json_decode(\Lib\JWT::urlSafeBase64Decode($segments[1]));

        // it is necessary to contain alg and the exp
        if(!$header || !$payload || !property_exists($header, 'alg') || !property_exists($payload, 'exp') || !property_exists($payload, 'aud'))
            return false;
        return (object)['alg' => $header->alg, 'aud' => $payload->aud, 'exp' => $payload->exp];
    }
}