<?php

class JRMTestClass
{
    public $x = 1;

    public $y = 1;

    public $n = 0;

    private $xp = 1;

    protected $xpp = 1;

    
    public function __construct()
    {
    	
    }
    
    public function setY($y)
    {
    	$this->y = $y + 1;
    }
    

    public function setN($n)
    {
        $this->n = $n;
    }
    
}