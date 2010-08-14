<?php

class JRMObjectSerializer extends JRMSerializer
{
    protected $result = array();
    
    public function serialize()
    {
        $this->register();
        
        $this->serializeObject();
        
        return $this->getResult();
    }

    public function serializeObject()
    {
        
    }
    
    public function register()
    {
    	$this->getRegister()->add($this->getObject());
    }
    
    
    public function getResult()
    {
        return $this->result;
    }
    
    public function setResult($result)
    {
    	$this->result = $result;
    }
    
    protected function isProperty($name)
    {
        $mapper = $this->getMapper();
        
        $ref = $mapper->getReferenceField();
        $meta = $mapper->getMetaField();
        
        return $name !== $ref && $name !== $meta;
    }
    
    
     
     
}