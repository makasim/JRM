<?php

class JRMInstanceSerializer extends JRMObjectSerializer
{

  private $constructor;

  private $_constructor;

  private $method;

  private $_method;


  public function __construct(JRMMapper $mapper, $object, $conctructor = false, $method = false)
  {
    parent::__construct($mapper, $object);

    $this->setConstructor($conctructor);
    $this->setMethod($method);

  }

  public function serialize()
  {
    
    if($this->getClass())
    {
      $this->getConstructor();
      return parent::serialize();
    }
    
    return null;
  }

  public function serializeObject()
  {
    $this->result = array(
            'Class' => $this->getClass(),
            'Constructor' => $this->getConstructor(),
            'Properties' => $this->getProperties(),
            'Method' => $this->getMethod()
    );

  }

  public function getClass()
  {
    $map = $this->getMapper()->getMap();
    $class = $this->getMeta()->getClass();;

    if(JRM::getOption('useClassName'))
    {
      return  isset($map[$class]) ? $map[$class] : $class;
    }
    else
    {
      return  isset($map[$class]) ? $map[$class] : null;
    }

  }

  public function getProperties()
  {
    $prop = $this->getMeta()->getProperties();

    $result = array();

    foreach ($prop as $key => $value)
    {
      if($this->isProperty($key))
      {
        $result[$key] = $this->mixed($prop[$key]);
      }
    }

    return $result;
  }


  public function getResult()
  {
    $result = array();
    $result[$this->getMeta()->getField()] = $this->filter($this->result);
    return $result;
  }

  public function filter($result)
  {
    foreach ($result as $key => $value)
    {
      if(!$value)
      {
        unset($result[$key]);
      }
    }
    return $result;
  }

  public function getConstructor()
  {
    if($this->constructor && !$this->_constructor)
    {

      $result = array();

      foreach ($this->constructor as $key => $value)
      {
        $result[$key] = $this->mixed($this->constructor[$key]);
      }

      $this->_constructor = $result;
    }

    return $this->_constructor;
  }

  public function setConstructor($constructor)
  {
    $this->constructor = $constructor;
  }

  public function getMethod()
  {
    if($this->method && !$this->_method)
    {

      $result = array();

      foreach ($this->method as $key => $value)
      {
        $result[$key] = $this->mixed($this->method[$key]);
      }

      $this->_method = $result;
    }

    return $this->_method;
  }

  public function setMethod($method)
  {
    $this->method = $method;
  }




}