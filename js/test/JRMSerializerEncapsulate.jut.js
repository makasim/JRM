
JsUnitTest.Suite.JRMSerializerEncapsulate = 
{
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
            id: 10,
            items: 0,
			html: 0,
			css: 0
        }
		
		var i = new JRMTestClass;
        var x = JRM.serialize(i);
		
        with (this) 
        {
            assertEqual(x['*'].Class, 'JRMTestClass');
            assertEqual(x['*'].Properties.id, 1);
            assertEqual(x['*'].Properties.items[1], 2);
			assert(x['*'].Properties.design);
			assert(x['*'].Properties.design['*'].Properties.items);
			assertEqual(x['*'].Properties.design['*'].Properties.id, 10);
        }
		
    }
    
    
}
