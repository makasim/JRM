<?php

class JRMMeta
{
    private $mapper;

    private $object;

    public function __construct(JRMMapper $mapper)
    {
        $this->setMapper($mapper);
    }

    public function getField()
    {
        return $this->getMapper()->getMetaField();
    }
    
    /**
     * @return JRMMapper
     */
    public function getMapper()
    {
        return $this->mapper;
    }

    public function setMapper(JRMMapper $mapper)
    {
        $this->mapper = $mapper;
    }

    public function getObject()
    {
        return $this->object;
    }

    public function setObject($object)
    {
        $this->object = $object;
    }
    
    public function getClass()
    {
        return '';
    }
    
    public function getProperties()
    {
        return array();
    }
    
    public function getConstructor()
    {
        return false;
    }
    
    public function getMethod()
    {
        return false;
    }
    
    public function getReference()
    {
        return false;
    }
    
    
    

     
}