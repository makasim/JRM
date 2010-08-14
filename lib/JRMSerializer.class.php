<?php

class JRMSerializer
{
    private $mapper;

    private $object;

    public function __construct(JRMMapper $mapper, $object)
    {    	
        $this->setMapper($mapper);
        $this->setObject($object);
    }
     
    /**
     * @return array
     */
    public function serialize()
    {
        return array();
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

    /**
     * @return JRMMeta
     */
    public function getMeta()
    {
        return $this->getMapper()->getMeta($this->getObject());
    }
    
    /**
     * @return JRMRegister
     */
    public function getRegister()
    {
        return $this->getMapper()->getRegister();
    }

    public function mixed(&$object)
    {
        return $this->getMapper()->serialize($object);
    }



     
}