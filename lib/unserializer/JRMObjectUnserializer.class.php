<?php

class JRMObjectUnserializer extends JRMUnserializer
{

    protected $result;
    
    public function unserialize()
    {   
    	 	
        $this->register();        
        $this->unserializeObject();
        
        return $this->getResult();
    }

    public function unserializeObject()
    {

    }

    public function register()
    {
        $this->getRegister()->add( $this->getResult() );
    }

    public function getResult()
    {
        return $this->result;
    }

    public function setResult($result)
    {
        $this->result = $result;
    }

}