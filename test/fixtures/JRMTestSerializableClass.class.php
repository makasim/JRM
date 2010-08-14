<?php

class JRMTestSerializableClass implements IJRMSerializable
{

    public $x;

    public $y;

    public $z;

    public function __construct()
    {

    }

    /**
     * @return array
     */
    public function getJrmProperties()
    {
        return array('x1'=> $this->x, 'x2' => $this->y);
    }

    /**
     * 
     * @param array $array
     * @return bool
     */
    public function setJrmProperties($array)
    {
        $this->x = $array['x1'];
        $this->y = $array['x2'];
        return true;
    }
}