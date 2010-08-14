<?php

class JRMArrayMeta extends JRMMeta
{

    public function valid()
    {
        $array = $this->getObject();
        return JRM::isArray($array) && isset($array[$this->getField()]);
    }

    public function get($name)
    {
        $array = $this->getObject();
        $field = $this->getField();

        if($this->valid())
        {
            $meta = $array[$field];
            return isset($meta[$name]) ? $meta[$name] : false; 
        }
        
        return false;
    }

    public function getClass()
    {
        return $this->get('Class');
    }

    public function getProperties()
    {
        return $this->get('Properties');
    }

    public function getConstructor()
    {
        return $this->get('Constructor');
    }

    public function getMethod()
    {
        return $this->get('Method');
    }

    public function getReference()
    {
        return $this->get('Reference');
    }
     
}