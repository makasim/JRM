<?php

class JRMMapper
{

    private $referenceField = '__jrmid';

    private $metaField = '*';
    
    private $map;       // array( phpClass => javascriptClass )

    private $flipMap;   // array( javascriptClass => phpClass );  
    
    /**
     * @var JRMRegister
     */
    private $register;

    /**
     * @var JRMMeta
     */
    private $meta;
    

    public function serialize(&$object, $constructor = false, $method = false)
    {
        $object = JRM::fixArray($object);
        $constructor = JRM::fixArray($constructor);
        $method = JRM::fixArray($method);

        $serializer = $this->getFactory()->serializer($this, $object, $constructor, $method);

        if($serializer)
        {
            return $serializer->serialize();
        }

        return $object;

    }

    public function unserialize(&$data)
    {
        $data = JRM::fixArray($data);

        $unserializer = $this->getFactory()->unserializer($this, $data);
        
        if($unserializer)
        {        	
            return $unserializer->unserialize();
        }

        return $data;
    }

    public function destruct()
    {
        $this->getRegister()->destruct();
    }

    public function getReferenceField()
    {
        return $this->referenceField;
    }

    public function setReferenceField($referenceField)
    {
        $this->referenceField = $referenceField;
    }

    public function getMetaField()
    {
        return $this->metaField;
    }

    public function setMetaField($metaField)
    {
        $this->metaField = $metaField;
    }
    /**
     * @return JRMRegister
     */
    public function getRegister()
    {
        if(!$this->register)
        {
            $this->register = new JRMRegister($this);
        }
        return $this->register;
    }

    /**
     * @return JRMMeta
     */
    public function getMeta($object)
    {
        return JRM::getFactory()->meta($this, JRM::fixArray($object));
    }

    /**
     * @return JRMFactory
     */
    public function getFactory()
    {
        return JRM::getFactory();
    }

    public function create($class, &$args)
    {
        return JRM::create($class, $args);        
    }
    
    public function getMap()
    {
        if(!$this->map)
        {
            $this->map = JRM::getMap();
        }
        return $this->map;
    }
    
    public function setMap($map)
    {
    	$this->map = $map;
    	$this->setFlipMap(array_flip($map));
    }
    
    public function getFlipMap()
    {
        if(!$this->flipMap)
        {
            $this->flipMap = JRM::getFlipMap();
        }
        return $this->flipMap;
    }
    
    public function setFlipMap($flipMap)
    {
    	$this->flipMap = $flipMap;
    }
    
    
     
}