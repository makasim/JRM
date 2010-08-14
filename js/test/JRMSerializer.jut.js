
//console.log('JRMSerializer');

JsUnitTest.Suite.JRMSerializer = 
{
    test1: function()
    {
        with (this) 
        {
            assertEqual(JRM.serialize(1), 1);
        }
    },
    testS: function()
    {
        with (this) 
        {
            assertEqual(JRM.serialize('S'), 'S');
        }
    },
    testArray: function()
    {
        var x = JRM.serialize([1, 2]);
        
        with (this) 
        {
            assertEqual(x[1], 2);
        }
    },
    testArray1: function()
    {
        var x = JRM.serialize( {y: [1, 2]} );
        
        with (this) 
        {
            assertEqual(x.y[1], 2);
        }
    },
    testHash: function()
    {
        var x = JRM.serialize(
        {
            1: 1
        });
        
        with (this) 
        {
            assertEqual(x['1'], 1);
        }
    },
    testHash2: function()
    {
        var x = JRM.serialize(
        {
            x: 
            {
                y: 1
            }
        });
        with (this) 
        {
            assertEqual(x.x.y, 1);
        }
    },
    testClassInstance: function()
    {
        JRMTestClass = function()
        {
        };
        
        JRMTestClass.prototype = 
        {
            '*': 
            {
                Class: 'JRMTestClass',
                Fields: ['p1']
            },
            p1: 1
        }
        var x = JRM.serialize(new JRMTestClass);
        
        with (this) 
        {
            assertEqual(x['*'].Class, 'JRMTestClass');
            assertEqual(x['*'].Properties.p1, 1);
        }
    },
    testClassInstance2: function()
    {
        JRMTestClass = function()
        {
			this.items = [1, 2, 3];
			this.design = new JRMTestDesignClass;
        };

        JRMTestClass.prototype = 
        {
            '*': 
            {
                Class: 'JRMTestClass',
                Fields: ['id', 'items', 'design']
            },
            id: 1,
			items: 0,
			design: 0
        }
		
        JRMTestDesignClass = function()
        {
            this.items = [];
			this.html = 'xhtml';
			this.css = 'xcss';
        };
		
        JRMTestDesignClass.prototype = 
        {
            '*': 
            {
                Class: 'JRMTestDesignClass',
                Fields: ['id', 'items', 'html', 'css']
            },
            id: 1,
            items: 0,
			html: 0,
			css: 0
        }
		
		var i = new JRMTestClass;
        var x = JRM.serialize(i);
		
		//cc(i);
		//cc(x);
		
        with (this) 
        {
            assertEqual(x['*'].Class, 'JRMTestClass');
            assertEqual(x['*'].Properties.id, 1);
            assertEqual(x['*'].Properties.items[1], 2);
			assert(x['*'].Properties.design);
        }
    },
    testReference: function()
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
            p1: 1
        }
        
        var i = new JRMTestClass();
        
        var x = 
        {
            c1: i,
            c2: i
        };
        
        var x = JRM.serialize(x);
        
        with (this) 
        {
            assertEqual(x.c2['*'].Reference, 2);
        }
    },
    testRegister_isReference: function()
    {
        var mapper = JRM.createMapper();
        var register = mapper.getRegister();
        
        this.assert(mapper instanceof JRM.Mapper);
        this.assert(register instanceof JRM.Register);
        
        var field = register.getField();
        
        var ref = {};
        ref[field] = 1;
        
        
        this.assert(register.isReference(ref));
        
    },
    testRegister_isReference2: function()
    {
        var register = JRM.createMapper().getRegister();
        
        var obj = {};
        
        register.add(obj);
        
        this.assert(register.isReference(obj));
        
    }
    
    
}
