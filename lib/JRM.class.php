<?php

class JRM
{

    static private $factory;

    static private $options = array(
      'useClassName' => false
    );

    static private $map = array(); // phpClass => javascriptClass

    static private $flipMap = array();

    static public function serialize(&$object, $constructor = false, $method = false)
    {
        $mapper = self::createMapper();

        $result = $mapper->serialize($object, $constructor, $method);
        $mapper->destruct();
        return $result;

    }
    
    

    static public function setOptions($options = array())
    {
      self::$options = array_merge(self::$options, $options);
    }
    
    static public function getOption($name)
    {
      return isset(self::$options[$name]) ? self::$options[$name] : null;
    }
    
    
    
    static public function unserialize(&$data)
    {
        $array = self::object2array($data);
        
        $mapper = self::createMapper();
        $result = $mapper->unserialize($array);        
        $mapper->destruct();

        return $result;
    }

    /**
     * @return JRMMapper
     */
    static public function createMapper()
    {
        return self::getFactory()->mapper();
    }

    /**
     * @return JRMFactory
     */
    static public function getFactory()
    {
        if(!self::$factory)
        {
            self::$factory = new JRMFactory();
        }
        return self::$factory;
    }

    static public function isArray($array)
    {
        return is_array($array) || self::isArrayObject($array);
    }

    static public function isObject($object)
    {
        return is_object($object) && !self::isArray($object);
    }

    static public function isArrayObject($array)
    {
        return $array instanceof ArrayObject;
    }

    /**
     * @return ArrayObject
     */
    static public function fixArray(&$array)
    {
        if(is_array($array) &&!self::isArrayObject($array))
        {
            return new ArrayObject($array);
        }
        return $array;
    }

    /**
     * @return ArrayObject
     */
    static public function createArray()
    {
        return new ArrayObject();
    }

    static public function create($class, &$args)
    {
        if(class_exists($class))
        {
            $ref = new ReflectionClass($class);
            return $ref->newInstanceArgs($args);
        }
        else
        {
            throw new Exception('Not found class: ' . $class);
        }
    }

    /**
     *  phpClass => javascriptClass ( function )
     *
     * @param unknown $xxxxx
     * @return array
     */
    static public function getMap()
    {
        return self::$map;
    }

    /**
     * phpClass => javascriptClass ( function )
     *
     * @param array $map
     */
    static public function setMap($map)
    {
        self::$map = $map;
        self::setFlipMap(array_flip($map));
    }

    /**
     * javascriptClass ( function ) => phpClass
     *
     * @return array
     */
    static public function getFlipMap()
    {
        return self::$flipMap;
    }

    static public function setFlipMap($flipMap)
    {
        self::$flipMap = $flipMap;
    }

    static public function object2array($object)
    {
        $result = array();

        if(is_object($object))
        {
            foreach (get_object_vars($object) as $key => $value)
            {
                $result[$key] = self::object2array($object->$key);
            }

            return $result;
        }
        else
        {
            if(JRM::isArray($object))
            {

                foreach ($object as $key => $value)
                {
                    $result[$key] = self::object2array($object[$key]);
                }

                return $result;

            }
        }

        return $object;
    }
}

