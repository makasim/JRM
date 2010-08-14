<?php

class JRMArrayUnserializer extends JRMObjectUnserializer
{

    public function __construct(JRMMapper $mapper, $data)
    {
        parent::__construct($mapper, $data);
        $array = array();
        $this->setResult( JRM::fixArray($array) );
    }

    public function unserializeObject()
    {
        $array = $this->getData();

        foreach ($array as $key => $data)
        {
            $this->result[$key] = $this->mixed($array[$key]);
        }

    }
}