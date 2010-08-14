//console.log('jrm.unserializer');

JRM.Unserializer = JRM.Class(
{
    mapper: 0,
    data: 0,
    
    construct: function(mapper, data)
    {
        this.mapper = mapper;
        this.data = data;
    },
    unserialize: function()
    {
    
    },
    mixed: function(x)
    {
        return this.getMapper().unserialize(x);
    },
    getMeta: function(x)
    {
        return this.getMapper().getMeta(this.data);
    },
    getRegister: function(x)
    {
        return this.getMapper().getRegister();
    }
    
});

JRM.ObjectUnserializer = JRM.Class(JRM.Unserializer, 
{
    result: 0,
    
    id: 0,
    
    construct: function()
    {
        JRM.ObjectUnserializer.Super.construct.apply(this, arguments);
        this.setResult({});
        
    },
    register: function()
    {
        this.setId(this.getRegister().add(this.result));
    },
    registerObject: function()
    {
        this.getRegister().set(this.id, this.result);
    },
    unserialize: function()
    {
        this.register();
        this.unserializeObject();
        this.registerObject();
        return this.getResult();
    },
    unserializeObject: function()
    {
    
    }
});


JRM.InstanceUnserializer = JRM.Class(JRM.ObjectUnserializer, 
{
    _properties: 0,
    
    construct: function()
    {
        JRM.InstanceUnserializer.Super.construct.apply(this, arguments);
        this.setResult(this.createInstance());
    },
    createInstance: function()
    {
        var instance = JRM.Create(this.getClass(), this.getConstruct());
        // @TODO: throw Error
		if(!instance)
		{
			throw new Error( 'JRM.InstanceUnserializer. Not found class: ' + this.getClass() );
		}
        return instance;
    },
    getClass: function()
    {
        return this.getMeta().getClass();
    },
    getConstruct: function()
    {
        var data = this.getMeta().getConstructor(), result = [];
        
        if (JRM.isArray(data)) 
        {
            for (var i = 0; i < data.length; i++) 
            {
                result[i] = this.mixed(data[i]);
            }
        }
        
        return result;
    },
    getMethod: function()
    {
        var data = this.getMeta().getMethod(), result = {};
        
        if (JRM.isObject(data)) 
        {
            for (var i in data) 
            {
                result[i] = this.mixed(data[i]);
            }
        }
        
        return result;
    },
    getProperties: function()
    {
        var data = this.getMeta().getProperties(), result = {};
        
        if (!this._properties) 
        {
            if (JRM.isObject(data)) 
            {
                for (var i in data) 
                {
                    result[i] = this.mixed(data[i]);
                }
            }
            this._properties = result;
        }
        
        return this._properties;
    },
    unserialize: function()
    {
    	if(JRM.isArray( this.getMeta().getProperties() ) )
    	{
    		return this.mixed( this.getMeta().getProperties() );
    	}
    	else
    	{
    		return JRM.InstanceUnserializer.Super.unserialize.apply(this, arguments);
    	}
    },    
    unserializeObject: function()
    {
        this.setMetaInfo();
        this.setProperties();
        this.callMethods();
    },
    getFields: function()
    {
        var prop = this.getProperties(), fields = [];
        for (var i in prop) 
        {
            fields.push(i);
        }
        return fields;
    },
    setMetaInfo: function()
    {
        this.result[this.getMapper().getMetaField()] = 
        {
            Class: this.getClass(),
            Fields: this.getFields()
        };
    },
    setProperties: function()
    {
        var prop = this.getProperties();
        
        var object = this.getResult(), method = 'setJrmProperties';
        
        if (object[method] && JRM.isFunction(object[method])) 
        {
            if (result = object[method].apply(object, [prop])) 
            {
                return result;
            }
        }
        
        for (var i in prop) 
        {
            if (!JRM.isFunction(prop[i])) 
            {
                this.setProperty(i, prop[i]);
            }
        }
        
    },
    setProperty: function(name, value)
    {
        var method = 'set' + JRM.FirstToUpper(name);
        
        if (this.result[method] && JRM.isFunction(this.result[method])) 
        {
            this.callMethod(method, [value]);
        }
        else 
        {
            this.result[name] = value;
        }
    },
    callMethods: function()
    {
        var method = this.getMethod();
        for (var i in method) 
        {
            this.callMethod(i, method[i]);
        }
    },
    callMethod: function(method, args)
    {
        var result = this.result;
        
        if (result[method] && JRM.isFunction(result[method])) 
        {
            return result[method].apply(result, args);
        }
        
    }
});

JRM.ArrayUnserializer = JRM.Class(JRM.ObjectUnserializer, 
{
    construct: function(mapper, data)
    {
        JRM.ArrayUnserializer.Super.construct.apply(this, arguments);
        this.setResult([]);
    },
    
    unserializeObject: function()
    {
        for (var i = 0; i < this.data.length; i++) 
        {
            this.result[i] = this.mixed(this.data[i]);
        }
    }
});



JRM.HashUnserializer = JRM.Class(JRM.ObjectUnserializer, 
{
    unserializeObject: function()
    {
        for (var i in this.data) 
        {
            this.result[i] = this.mixed(this.data[i]);
        }
    }
});

JRM.ReferenceUnserializer = JRM.Class(JRM.Unserializer, 
{
    unserialize: function()
    {
        var id = this.getId();
        
        if (id) 
        {
            return this.getRegister().get(id);
        }
        
        return this.data;
        
    },
    getId: function()
    {
        var ref = this.getMeta().getReference();
        return ref ? ref : 0;
    }
});



