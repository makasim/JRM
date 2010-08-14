<?php

class JRMUnserializer
{
    private $mapper;

    private $data;

    public function __construct(JRMMapper $mapper, $data)
    {
        $this->setMapper($mapper);
        $this->setData($data);
    }

    public function unserialize()
    {
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

    public function getData()
    {
        return $this->data;
    }

    public function setData($data)
    {
        $this->data = $data;
    }


    /**
     * @return JRMMeta
     */
    public function getMeta()
    {
        return $this->getMapper()->getMeta($this->getData());
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
        return $this->getMapper()->unserialize($object);
    }
}