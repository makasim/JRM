<?php

class JRMReferenceSerializer extends JRMSerializer
{
    public function serialize()
    {
        $result = array();
         
        $result[$this->getMeta()->getField()] = array(
            'Reference' => $this->getId()
        );
         
        return $result;
    }
     
    public function getId()
    {
        return $this->getRegister()->getId($this->getObject());
    }
     
}