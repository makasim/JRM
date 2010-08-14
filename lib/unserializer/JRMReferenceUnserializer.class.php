<?php

class JRMReferenceUnserializer extends JRMUnserializer
{
    public function unserialize()
    {
        return $this->getRegister()->get($this->getId());
    }
     
    private function getId()
    {
        return $this->getMeta()->getReference();
    }
     
}