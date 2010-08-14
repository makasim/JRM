//console.log('JRMUnserializer');

JsUnitTest.Suite.JRMUnserializer = 
{
    test1: function()
    {
        with (this) 
        {
            assertEqual(JRM.unserialize(1), 1);
        }
    },
    testS: function()
    {
        with (this) 
        {
            assertEqual(JRM.unserialize('S'), 'S');
        }
    },
    testArray: function()
    {
    		var x = JRM.unserialize([1, 2]);
        with (this) 
        {
            assertEqual(x[1], 2);
        }
    },
    testHash: function()
    {
        var x = JRM.unserialize(
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
        var x = JRM.unserialize(
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
                Class: 'JRMTestClass'
            }
        }
        
        var src = 
        {
            '*': 
            {
                Class: 'JRMTestClass',
                Properties: 
                {
                    p1: 1
                }
            }
        }
        
        var x = JRM.unserialize(src);
        
        with (this) 
        {
            assertEqual(x['*'].Class, 'JRMTestClass');
            assertEqual(x.p1, 1);
        }
    },
    testClassInstanceFields: function()
    {
        JRMTestClass = function()
        {
        };
        
        JRMTestClass.prototype = 
        {
            '*': 
            {
                Class: 'JRMTestClass'
            }
        }
        
        var src = 
        {
            '*': 
            {
                Class: 'JRMTestClass',
                Properties: 
                {
                    p1: 1
                }
            }
        }
        
        var x = JRM.unserialize(src);

        with (this) 
        {
            assertEqual(x['*'].Class, 'JRMTestClass');
            assertEqual(x['*'].Fields[0], 'p1');
            assertEqual(x['*'].Fields.length, 1);
            assertEqual(x.p1, 1);
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
            p1: 1,
            p2: 2
        }
        
        var x = 
        {
            c1: 
            {
                '*': 
                {
                    Class: 'JRMTestClass'
                }
            },
            c2: 
            {
                '*': 
                {
                    Reference: 2
                }
            }
        };
        
        var x = JRM.unserialize(x);
        
        with (this) 
        {
            assertHashEqual(x.c1['*'].Class, 'JRMTestClass');
            assertHashEqual(x.c2['*'].Class, 'JRMTestClass');
        }
    },
    testInstanceConstruct: function()
    {
        JRMTestClass = function(x)
        {
            this.x = x
        };
        
        JRMTestClass.prototype = 
        {
            '*': 
            {
                Class: 'JRMTestClass'
            },
            x: 0
        }
        
        var src = 
        {
            '*': 
            {
                Class: 'JRMTestClass',
                Properties: 
                {
                    p1: 1
                },
                Constructor: [11]
            }
        }
        
        var x = JRM.unserialize(src);
        
        with (this) 
        {
            assertEqual(x.x, 11);
        }
    },
    testSerializeUnserialize: function()
    {
        JRMTestClass = function()
        {
        };
        
        JRMTestClass.prototype = 
        {
            '*': 
            {
                Class: 'JRMTestClass',
                Fields: ['x']
            },
            x: 0
        }
        
        
        var ins = new JRMTestClass();
        
        ins.x = 1;
        
        var x = 
        {
            arr: [1, 1],
            obj: 
            {
                x: 1
            },
            ins: ins,
            ref: ins
        }
        
        var s = JRM.serialize(x);
		
        var u = JRM.unserialize(s);
        
        with (this) 
        {
            assertUndefined(x.__jrmid)
            assertEqual(x.ref.x, u.ref.x);
        }
    },
    testUnserializeSetter: function()
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
            x: 0,
			setX: function(x)
			{
				this.x = x + 1;
			}
        }
        
        
        var ins = new JRMTestClass();
		
        var x = 
        {
            ins: ins
        }
        
        var s = JRM.serialize(x);
		s.ins['*'].Properties.x = 1;
		
        var u = JRM.unserialize(s);
		
        with (this) 
        {
            assertEqual(u.ins.x, 2);
        }
    }
    
    
}
