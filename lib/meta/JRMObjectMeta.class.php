<?php

class JRMObjectMeta extends JRMMeta
{

    public function getClass()
    {    	
    	return is_object($this->getObject())?
    		   get_class($this->getObject()):
    		   0;    	
    }

    public function getProperties()
    {
        if ($this->getObject() instanceof IJRMSerializable)
        {
            if($result = $this->getPropertiesFromMethod())
            {
                return $result;
            }
        }

        return $this->getPropertiesFromReflection();
    }

    private function getPropertiesFromReflection()
    {
        $object = $this->getObject();

        $reflection = new ReflectionClass($this->getClass());
        $properties = $reflection->getProperties(ReflectionProperty::IS_PUBLIC);

        $result = array();

        foreach ($properties as $property)
        {
            $name = $property->getName();
            $result[$name] = &$object->$name;
        }

        return $result;
    }

    private function getPropertiesFromMethod()
    {
        return $this->getObject()->getJrmProperties();
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