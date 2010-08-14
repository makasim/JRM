<?php

class JRMInstanceUnserializer extends JRMObjectUnserializer
{
    public function __construct(JRMMapper $mapper, $data)
    {
        parent::__construct($mapper, $data);
        $this->setResult( $this->createInstance() );
    }

    private function createInstance()
    {
        $mapper = $this->getMapper();
        $map = $mapper->getFlipMap();
        $class = $this->getMeta()->getClass();;

        if(isset($map[$class]))
        {
            // @TODO map Exception and allow
            $class = $map[$class];
        }

        $constructor = $this->getConstructor();
        return $mapper->create($class, $constructor);
    }

    public function unserializeObject()
    {
    	$this->setProperties();        
        //$this->callMethods();
    }

    public function getClass()
    {
        return $this->getMeta()->getClass();
    }

    public function getProperties()
    {
        $array = $this->getMeta()->getProperties();

        if( JRM::isArray($array) )
        {
            $result = array();

            foreach ($array as $key => $value)
            {                
                $result[$key] = $this->mixed($array[$key]);
            }

            return $result;
        }
    }

    public function getMethod()
    {
        $array = $this->getMeta()->getMethod();

        if( JRM::isArray($array) )
        {
            $result = array();

            foreach ($array as $key => $value)
            {
                $result[$key] = $this->mixed($array[$key]);
            }

            return $result;
        }
    }

    public function getConstructor()
    {

        $array = $this->getMeta()->getConstructor();

        if( JRM::isArray($array) )
        {
            $result = array();
            $result = JRM::fixArray($result);
            
            foreach ($array as $key => $value)
            {
                $result[$key] = $this->mixed($array[$key]);
            }

            return $result;
        }

        return array();
    }

     
    private function setProperties()
    {    	
        $prop = $this->getProperties();

        if($prop)
        {
            
            if ($this->getResult() instanceof IJRMSerializable)
            {
                if($this->getResult()->setJrmProperties($prop))
                {
                    return true;
                }
            }
            
            foreach ($prop as $key => $value)
            {
                $this->setProperty($key, $prop[$key]);
            }
        }

    }

    private function setPropertiesToMethod()
    {

    }

    private function setProperty($name, &$value)
    {

        $result = $this->getResult();

        if(isset($result->$name))
        {

            $method = 'set' . ucfirst($name);

            if($this->methodExists($method))
            {
                $args = array($value);
                $this->callMethod($method, $args);
            }
            else
            {
                if(isset($result->$name))
                {
                    $result->$name = $value;
                }
            }

        }

    }

    private function callMethods()
    {
        $methods = $this->getMethod();

        if($methods)
        {
            foreach ($methods as $method => $value)
            {
                $this->callMethod($method, $methods[$method]);
            }
        }
    }

    protected function callMethod($name, &$args)
    {
        if($this->methodExists($name))
        {
            return call_user_func_array(array($this->result, $name), $args);
        }
    }

    protected function methodExists($name)
    {
        return method_exists($this->result, $name);
    }

}