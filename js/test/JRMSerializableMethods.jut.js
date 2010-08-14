
//console.log('JRMSerializer');

JsUnitTest.Suite.JRMSerializableMethods = 
{
    testGetProperties: function()
    {
        JRMSerializableTestClass = function()
        {
        };
        
        JRMSerializableTestClass.prototype = 
        {
            '*': 
            {
                Class: 'JRMSerializableTestClass',
                Fields: ['x1', 'x2']
            },
            x: 0,
            y: 0,
            z: 0,
            getJrmProperties: function()
            {
                return {
                    x1: this.x,
                    x2: this.y
                };
            },
            setJrmProperties: function(prop)
            {
                this.x = prop.x1;
                this.y = prop.x2;
				return true;
            }
        }
        
        var i = new JRMSerializableTestClass();
        i.x = 1;
        i.y = 2;
//        
        var s = JRM.serialize(i);
//		cc(s);
//		
        var u = JRM.unserialize(s);
//
////        cc(i);
////        cc(s);
////        cc(u);
//        
//
//        
        with (this) 
        {
            assertEqual(s['*'].Properties.x1, 1);
            assertEqual(s['*'].Properties.x2, 2);

            assertEqual(u.x, 1);
            assertEqual(u.y, 2);
        }
    }
    
    
}
