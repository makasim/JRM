<?php

class JRMSerializerTest extends sfBasePhpunitTestCase
{

    public function testInt()
    {
        $x = 1;
        $this->assertEquals(JRM::serialize($x), 1);
    }
     
    public function testString()
    {
        $x = 'S';
        $this->assertEquals(JRM::serialize($x), 'S');
    }


    public function testRegister()
    {
        error_reporting(E_ALL);

        $mapper = JRM::createMapper();
        $register = new JRMRegister($mapper);
         
        $x = array();

        $x = JRM::fixArray($x);

        $register->add($x);
         
        $this->assertTrue(isset($x[$mapper->getReferenceField()]));
         

    }
    public function testFixArray()
    {
        error_reporting(E_ALL);

        $x = array();

        $x = JRM::fixArray($x);

        $y = $x;

        $y['_'] = 1;

         
        $this->assertEquals($x['_'], 1);
         

    }

    public function testArray()
    {
        $arr = array(1);
        $res = JRM::serialize($arr);

        $this->assertEquals($res[0], 1);
    }

    public function testInstance()
    {
        $x = new JRMTestClass();
         
        $res = JRM::serialize($x);
        $this->assertTrue(is_array($res) && isset($res['*']) );
    }

}