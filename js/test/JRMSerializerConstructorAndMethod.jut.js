
//console.log('JRMSerializer');

JsUnitTest.Suite.JRMSerializerConstructorAndMethod = 
{
    testConstructor: function()
    {
    
        JRMTestClass = function(p1)
        {
            this.p1 = p1;
            
            if (arguments[1]) 
                this.p2 = arguments[1] ? arguments[1] : 0;
        };
        
        JRMTestClass.prototype = 
        {
            '*': 
            {
                Class: 'JRMTestClass'
            }
        }
        
        var d = 
        {
            1: 1
        };
        
        var x = JRM.serialize(new JRMTestClass(d), [d, d]);
        
//		cc(x);
		
		var u = JRM.unserialize(x);

//        cc(u);
		
        
        with (this) 
        {
            assertEqual(x['*'].Class, 'JRMTestClass');
            assertEqual(u['*'].Class, 'JRMTestClass');
            assertEqual(u.p2[1], 1);
        }
        
    },
    testMethod: function()
    {
    
        JRMTestClass = function()
        {
        };
        
        JRMTestClass.prototype = 
        {
            '*': 
            {
                Class: 'JRMTestClass'
            },
			render: function(name, data, data2)
			{
				this.name = name;
				this.data = data;
				this.data2 = data2;
			}
        }
        
		var x = {1: 1};
		
        var d = 
        {
            render: ['x-name', x, x] 
        };
        
        var x = JRM.serialize(new JRMTestClass(), null, d);
        var u = JRM.unserialize(x);
		
        
        with (this) 
        {
            assertEqual(u['*'].Class, 'JRMTestClass');
            assertEqual(u.name, 'x-name');
            assertEqual(u.data[1], 1);
            assertEqual(u.data2[1], 1);
        }
        
    }
    
    
}
