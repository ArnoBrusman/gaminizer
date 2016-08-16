<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CharacterTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }
    
    function testStats()
    {
        $response = $this->call('POST', '/restapi/characters/stats',
                ['elaborate' => TRUE]);
        
//        $this->assertEquals(200, $response->status());
        return $response;
    }
    
}
