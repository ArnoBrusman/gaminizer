<?php
namespace App\Http\Controllers\RestApi;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;

/**
 * Description of RestApiController
 *
 * @author Brusman
 */
abstract class RestApiController extends Controller {

    var $request;
    
    public function __construct(Request $request) {
        $this->request = $request;
    }
    
    function allData($method)
    {
        return $this->$method(NULL);
    }
    
    function findData($id = NULL, $method = NULL)
    {
        return $this->$method($id);
        
    }
    
}
