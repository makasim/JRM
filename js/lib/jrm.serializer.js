//console.log('jrm.serializer');

JRM.Serializer = JRM.Class(
{
    mapper: 0,
    object: 0,
    
    construct: function(mapper, object)
    {
        this.setMapper(mapper);
        this.setObject(object);
    },
    serialize: function()
    {
    },
    mixed: function(x)
    {
        return this.getMapper().serialize(x);
    },
    getMeta: function(x)
    {
        return this.getMapper().getMeta(this.object);
    },
    getRegister: function(x)
    {
        return this.getMapper().getRegister();
    }
});

JRM.ObjectSerializer = JRM.Class(JRM.Serializer, 
{
    result: 0,
    
    id: 0,
    
    serialize: function()
    {
        this.result = {};
        
        this.register();
        
        this.serializeObject();
        
        return this.getResult();
    },
    register: function()
    {
        this.setId(this.getRegister().add(this.object));
    },
    serializeObject: function()
    {
    
    },
    isProperty: function(name, value)
    {
        var mapper = this.getMapper();
        
        var ref = mapper.getReferenceField(), meta = mapper.getMetaField();
        
        return ref != name && meta != name && !JRM.isFunction(value);
    }
});

JRM.HashSerializer = JRM.Class(JRM.ObjectSerializer, 
{
    serializeObject: function()
    {
        for (var i in this.object) 
        {
            if (this.isProperty(i, this.object[i])) 
            {
                this.result[i] = this.mixed(this.object[i]);
            }
        }
    }
});

JRM.ArraySerializer = JRM.Class(JRM.ObjectSerializer, 
{
    serializeObject: function()
    {
        this.result = [];
        
        for (var i = 0; i < this.object.length; i++) 
        {
            if (this.isProperty(i, this.object[i])) 
            {
                this.result[i] = this.mixed(this.object[i]);
            }
        }
    }
});

JRM.InstanceSerializer = JRM.Class(JRM.ObjectSerializer, 
{

    Construct: 0,
    Method: 0,
    
    _construct: 0,
    _method: 0,
    
    fields: 0,
    
    properties: 0,
    
    fieldsHash: 0,
    
    construct: function(mapper, object)
    {
		this.properties = 0;
		
        var a = arguments;
        JRM.InstanceSerializer.Super.construct.apply(this, a);
        
        this.setConstruct(a[2] ? a[2] : false);
        this.setMethod(a[3] ? a[3] : false);
        
    },
    serialize: function()
    {
        this.getConstruct();
        return JRM.InstanceSerializer.Super.serialize.apply(this, arguments);
    },
    serializeObject: function()
    {
        this.result = 
        {
            'Class': this.getClass(),
            'Constructor': this.getConstruct(),
            'Properties': this.getProperties(),
            'Method': this.getMethod()
        };
    },
    getClass: function()
    {
        return this.getMeta().getClass();
    },
    getFields: function()
    {
        if (!this.fields) 
        {
			var fields = this.getMeta().getFields();
			fields = JRM.isArray(fields) ? fields : [];
            this.fields = fields;
        }
        return this.fields;
    },
    getFieldsHash: function()
    {
        if (!this.fieldsHash) 
        {
            this.fieldsHash = this.createFieldsHash(this.getFields());
        }
        return this.fieldsHash;
    },
    createFieldsHash: function(fields)
    {
        var result = {}, name, i;
        for (i = 0; i < fields.length; i++) 
        {
            name = fields[i];
            result[name] = name;
        }
        return result;
    },
    isProperty: function(name, value)
    {
        var is = JRM.InstanceSerializer.Super.isProperty.apply(this, arguments);
        return is && this.hasField(name);
    },
    hasField: function(name)
    {
        var fields = this.getFieldsHash();
        return fields[name] === undefined ? false : true;
    },
    getPropertiesByMethod: function()
    {
        var object = this.getObject(), method = 'getJrmProperties';
        
        if (object[method] && JRM.isFunction(object[method])) 
        {
            return this.mixedObject(object[method].apply(object));
        }
        
        return false;
    },
    getProperties: function()
    {
        if (!this.properties) 
        {
            this.properties = this.createProperties();
        }
		
        return this.properties;
        
    },
    createProperties: function()
    {
        var prop = this.mixedObject(this.getPropertiesByMethod());
        
        if (prop) 
            return prop;
        
        return this.mixedObject(this.getObject());
    },
    mixedObject: function(object)
    {
        if (!JRM.isObject(object)) 
            return object;
        
        var result = {};
        
        for (var i in object) 
        {
            if (this.isProperty(i, object[i])) 
            {
                result[i] = this.mixed(object[i]);
            }
        }
        
        return result;
    },
    getConstruct: function()
    {
        var data = this.Construct;
        
        if (!this._construct && data) 
        {
            if (JRM.isArray(data)) 
            {
                result = [];
                for (var i = 0; i < data.length; i++) 
                {
                    result[i] = this.mixed(data[i]);
                }
            }
            this._construct = result;
        }
        
        
        return this._construct;
    },
    getMethod: function()
    {
        var result = false, data = this.Method;
        
        if (JRM.isObject(data)) 
        {
            result = {};
            for (var i in data) 
            {
                result[i] = this.mixed(data[i]);
            }
        }
        
        return result;
    },
    getResult: function()
    {
        var result = {};
        result[this.getMapper().getMetaField()] = this.filter(this.result);
        return result;
    },
    filter: function(result)
    {
        for (var i in result) 
        {
            if (!result[i]) 
            {
                delete result[i];
            }
        }
        return result;
    }
    
});


JRM.ReferenceSerializer = JRM.Class(JRM.Serializer, 
{
    serialize: function()
    {
        var result = {};
        
        result[this.getMeta().getField()] = 
        {
            Reference: this.getRegister().getId(this.getObject())
        };
        
        return result;
    }
});

