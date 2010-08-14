<?php

class JRMFactory
{

    private $metaObject;

    private $metaArray;

    /**
     * @return JRMSerializer
     */
    public function serializer(JRMMapper $mapper, $object, $constructor = false, $method = false)
    {
        if($mapper->getRegister()->isReference($object))
        {
            return new JRMReferenceSerializer($mapper, $object);
        }

        if(JRM::isObject($object))
        {
            // @TODO $constructor, $method refactor
            return new JRMInstanceSerializer($mapper, $object, $constructor, $method);
        }

        if(JRM::isArray($object))
        {
            return new JRMArraySerializer($mapper, $object);
        }


        return null;
    }

    /**
     * @return JRMUnserializer
     */
    public function unserializer(JRMMapper $mapper, $data)
    {
        
        if($mapper->getMeta($data)->getReference())
        {        
            return new JRMReferenceUnserializer($mapper, $data);
        }

        if($mapper->getMeta($data)->getClass())
        {        
            return new JRMInstanceUnserializer($mapper, $data);
        }

        if(JRM::isArray($data))
        {        	
            return new JRMArrayUnserializer($mapper, $data);
        }


        return null;
    }

    /**
     * @return JRMMeta
     */
    public function meta(JRMMapper $mapper, $object)
    {
        if(JRM::isArray($object))
        {
            if(!$this->metaArray)
            {
                $this->metaArray = new JRMArrayMeta($mapper);
            }

//            $this->metaArray = new JRMArrayMeta($mapper);
            
            $this->metaArray->setObject($object);
            return $this->metaArray;
        }
        else
        {
            if(!$this->metaObject)
            {
                $this->metaObject = new JRMObjectMeta($mapper);
            }

//            $this->metaObject = new JRMObjectMeta($mapper);
            $this->metaObject->setObject($object);
            
            return $this->metaObject;
        }
    }

    /**
     * @return JRMMapper
     */
    public function mapper()
    {
        return new JRMMapper();
    }

     
}