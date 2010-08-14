<?php

class JRMMappingTest extends sfBasePhpunitTestCase
{
    public function testSerializeMeta()
    {
        $data = new JRMTestClass();
        $data->x = 20;

        $mapper = JRM::createMapper();
        $mapper->setMap(array('JRMTestClass' => 'JRM.Test.Class'));


        $this->assertFalse($mapper->getMeta($data)->getReference());
        $this->assertEquals($mapper->getMeta($data)->getClass(), 'JRMTestClass');
        $this->assertFalse(JRM::isArray($data));
        
    }

    public function testUnSerializeMeta()
    {
        $data = new JRMTestClass();
        $data->x = 20;
        
        $s = JRM::serialize($data);
        
        $mapper = JRM::createMapper();

        $meta = $mapper->getMeta($s);
        $this->assertType('JRMArrayMeta', $meta);        
        
        $cls = $meta->getClass();

        $this->assertEquals('JRMTestClass', $cls);
    }
    

    public function testMap()
    {
        $x = new JRMTestClass();
        $x->x = 20;

        $mapper = JRM::createMapper();
        $mapper->setMap(array('JRMTestClass' => 'JRM.Test.Class'));

        $map = $mapper->getMap();
        $flipMap = $mapper->getFlipMap();

        $s = $mapper->serialize($x);

        $u = $mapper->unserialize($s);

        $this->assertEquals($map['JRMTestClass'], 'JRM.Test.Class');
        $this->assertEquals($flipMap['JRM.Test.Class'], 'JRMTestClass');


        $this->assertEquals($s['*']['Class'], 'JRM.Test.Class');

        $this->assertType('JRMTestClass', $u);
        $this->assertEquals($u->x, 20);

    }

}