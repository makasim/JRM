<?php

class JRMTest extends sfBasePhpunitTestCase
{

  public function testOptions()
  {
    JRM::setOptions(array( 'useClassName'=> false));
    $this->assertFalse(JRM::getOption('useClassName'));
     
    JRM::setOptions(array( 'useClassName'=> true));
    $this->assertTrue(JRM::getOption('useClassName'));
  }
   
}