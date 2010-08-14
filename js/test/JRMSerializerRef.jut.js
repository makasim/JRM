//console.log('JRMSerializerRef');
JsUnitTest.Suite.JRMSerializerRef = 
{
 
    testReference: function()
    {
        JRMTestClass = function(){};

        JRMTestClass.prototype = {
            '*': {Class: 'JRMTestClass'},
            p1: 1
        }
        
        var i = new JRMTestClass(); 
        
        var x = {
            c1: i,
            c2: i
        };
		
		try
		{
            var y = JRM.serialize(x);
		}
		catch(e)
		{
            console.log(e);	
		}
        
        with (this) 
        {
            assertEqual(y.c2['*'].Reference, 2);
        }
    }
    
    
}
