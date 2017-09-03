<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;

/**
 * Description of ApiController
 *
 * @author Brusman
 */
abstract class ApiController extends Controller {

    /**
     * @var Request
     */
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
