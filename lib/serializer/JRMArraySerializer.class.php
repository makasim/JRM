<?php

class JRMArraySerializer extends JRMObjectSerializer
{
    public function serializeObject()
    {
        $object = $this->getObject();
        
        foreach ($object as $key => $value)
        {
            if($this->isProperty($key))
            {
                $this->result[$key] = $this->mixed($object[$key]);
            }
        }
    }
}