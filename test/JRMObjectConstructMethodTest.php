<?php

class JRMObjectConstructMethodTest extends sfBasePhpunitTestCase
{
    public function testConstruct()
    {
        $x = new JRMTestClass();
        $x->x = 2;

        $d = array(1,1);
        $d = JRM::fixArray($d);
        
        $res = JRM::serialize($x, array(1, $d, $d));
        
//        print_r($res);
        
        $this->assertEquals($res['*']['Properties']['x'], 2);
        $this->assertEquals($res['*']['Constructor'][0], 1);
        
    }

//    public function testMethod()
//    {
//        $x = new JRMTestClass();
//        
//        $d = array(1,1);
//        $d = JRM::fixArray($d);
//        
//        $s = JRM::serialize($x, null, array('setY'=>array(2)));
//        $u = JRM::unserialize($s);
//        
//        
//        $this->assertEquals($s['*']['Method']['setY'][0], 2);
//        $this->assertEquals($u->y, 3);
//        
//    }
}