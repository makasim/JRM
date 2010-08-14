<?php

class JRMRegister
{
    private $mapper;

    private $field;

    private $counter = 1;

    protected $objects = array(0);

    public function __construct(JRMMapper $mapper)
    {
        $this->setMapper($mapper);
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

    public function getField()
    {
        if(!$this->field)
        {
            $this->field = $this->getMapper()->getReferenceField();
        }
        return $this->field;
    }

    public function setField($field)
    {
        $this->field = $field;
    }

    public function add($object)
    {
        $this->objects[$this->counter] = $object;
        $this->register($object, $this->counter);
        $this->counter++;
    }

    public function get($id)
    {
        return isset( $this->objects[$id] ) ? $this->objects[$id] : null;
    }


    public function has($object)
    {
        $id = $this->getId($object);
        return $id && $this->get($id) ? true : false;
    }

    public function isReference($object)
    {
        return $this->getId($object) ? true : false;
    }

    protected function register($object, $id)
    {
        $field = $this->getField();

        if(JRM::isArray($object))
        {
            $object[$field] = $id;
        }
        else
        {
            $object->$field = $id;
        }
        return $object;
    }

    protected function unsetObject($object)
    {
        $field = $this->getField();

        if(JRM::isObject($object))
        {
            unset($object->$field);
        }

        if(JRM::isArray($object))
        {
            unset($object[$field]);
        }


    }
    public function getId($object)
    {
        $field = $this->getField();

        if(JRM::isArray($object))
        {
            return isset($object[$field]) ? $object[$field] : 0;
        }
        else
        {
            return isset($object->$field) ? $object->$field : 0;
        }

    }

    public function destruct()
    {
        for( $i = 1; $i < $this->counter; $i++)
        {
            $this->unsetObject($this->get($i));
            unset($this->objects[$i]);
        }
    }


}