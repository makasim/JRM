<?php

interface IJRMSerializable
{

    /**
     * @return array
     */
    public function getJrmProperties();

    /**
     * @param array $array
     * @return bool
     */
    public function setJrmProperties($array);

}