<?php

class JRMUnserializerTest extends sfBasePhpunitTestCase
{

    public function testInt()
    {
        $x = 1;
        $this->assertEquals(JRM::unserialize($x), 1);
    }
     
    public function testString()
    {
        $x = 'S';
        $this->assertEquals(JRM::unserialize($x), 'S');
    }

    public function testArrayMapper()
    {
        $x = array(
        	   '*' => array(
        	       'Class' => 'X1Class'
        	       )
        	       );
        	       	
        	       $mapper = JRM::createMapper();
        	       $meta = $mapper->getMeta($x);
        	       	
        	       $this->assertEquals($meta->getClass(), 'X1Class');
    }


    public function testArray()
    {
        $arr = array(1);
        $res = JRM::unserialize($arr);
        $this->assertEquals($res[0], 1);
    }

    public function testInstance()
    {
        $x = array(
               '*' => array(
                   'Class' => 'JRMTestClass'
                   )
                   );

                   $res = JRM::unserialize($x);

                   $this->assertType('JRMTestClass', $res);

    }


    public function testReference()
    {
        $i = new JRMTestClass();

        $x = array(
            'ins' => $i,
            'ref' => $i
        );

        $s = JRM::serialize($x);

        $u = JRM::unserialize($s);

        $this->assertType('JRMTestClass', $u['ins']);
        $this->assertType('JRMTestClass', $u['ref']);

    }

    public function testSetter()
    {
        $i = new JRMTestClass();

        $x = array(
            'ins' => $i,
            'ref' => $i
        );

        $x['ins']->y = 100;

        $s = JRM::serialize($x);

        $u = JRM::unserialize($s);


        $this->assertEquals($u['ins']->y, 101);

    }
    

    public function testUnserializeStdClassAsArray()
    {
      $x = new stdClass();
      $name = '*';
      
       $x->$name = array(
                   'Class' => 'JRMTestClass'
                   );

                   $res = JRM::unserialize($x);

                   $this->assertType('JRMTestClass', $res);

    }

}