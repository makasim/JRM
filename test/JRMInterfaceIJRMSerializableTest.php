<?php

class JRMInterfaceIJRMSerializableTest extends sfBasePhpunitTestCase
{
    public function testGetProperties()
    {
        $i = new JRMTestSerializableClass();
        
        $i->x = 1;
        $i->y = 2;
        
        $s = JRM::serialize($i);
        $u = JRM::unserialize($s);
        
        $this->assertEquals($s['*']['Properties']['x1'], 1);
        $this->assertEquals($s['*']['Properties']['x2'], 2);
        
        $this->assertEquals($u->x, 1);
        $this->assertEquals($u->y, 2);
        
    }
}