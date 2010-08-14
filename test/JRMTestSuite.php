<?php

class JRMTestSuite extends sfBasePhpunitTestSuite
implements sfPhpunitContextInitilizerInterface
{
  /**
   * Dev hook for custom "setUp" stuff
   */
  protected function _start()
  {
    JRM::setOptions(array( 'useClassName'=> true));
  }

  /**
   * Dev hook for custom "tearDown" stuff
   */
  protected function _end()
  {
  }

  public function getApplication()
  {
    return 'frontend';
  }

  public function getEnvironment()
  {
    return 'test';
  }
}