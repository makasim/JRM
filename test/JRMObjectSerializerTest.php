<?php

class JRMObjectSerializerTest extends sfBasePhpunitTestCase
{

    public function testArray()
    {
        $arr = array(1);
        $res = JRM::serialize($arr);

        $this->assertFalse(isset($res[JRM::createMapper()->getReferenceField()]));
        $this->assertEquals($res[0], 1);
    }

    public function testInstance()
    {
        $x = new JRMTestClass();
         
        $res = JRM::serialize($x);
        
        $this->assertTrue(is_array($res) && isset($res['*']) );
        $this->assertEquals($res['*']['Class'], 'JRMTestClass');
        $this->assertEquals($res['*']['Properties']['x'], 1);
        
    }

    public function testInstance2()
    {
        $x = new JRMTestClass();
        $x->x = 2;
         
        $res = JRM::serialize($x);
        
        $this->assertEquals($res['*']['Properties']['x'], 2);
        
    }

    public function testReference()
    {
        $i = new JRMTestClass();
        
        $x = array(
            'ins' => $i,
            'ref' => $i
        );
        
        $res = JRM::serialize($x);

        $this->assertEquals($res['ref']['*']['Reference'], 2);
        
    }
    

}