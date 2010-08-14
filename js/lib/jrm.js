//console.log('jrm');

function cc(x)
{
    if (window.console && console.debug) 
    {
        if (arguments.length > 1) 
        {
            console.log(arguments);
        }
        else 
        {
            console.log(x);
        }
    }
};


JRM = 
{
    factory: 0,
    
    createMapper: function()
    {
        return JRM.getFactory().mapper();
    },
    getFactory: function()
    {
        if (!JRM.factory) 
        {
            JRM.factory = new JRM.Factory();
        }
        return JRM.factory;
    },
    serialize: function(object)
    {
        var mapper = this.createMapper(), result = mapper.serialize(object, arguments);
        mapper.destruct();
        return result;
    },
    unserialize: function(data)
    {
        var mapper = this.createMapper();
        var result = mapper.unserialize(data);
        
        mapper.destruct();
        return result;
    },
    Class: function()
    {
        var a = arguments;
        
        var f = function()
        {
            if (this.construct) 
                this.construct.apply(this, arguments);
        };
        
        
        var proto = a[1] ? a[1] : a[0];
        
        var ext = a[1] ? a[0] : function()
        {
        };
        
        
        proto = JRM.CreateSetters(proto);
        
        return JRM.Extend(f, ext, proto);
    },
    Extend: function(_class, _super, proto)
    {
        var f = function()
        {
        };
        f.prototype = _super.prototype;
        
        var _proto = new f();
        
        for (var i in proto) 
        {
            _proto[i] = proto[i];
        }
        
        _class.prototype = _proto;
        
        _class.Super = _super.prototype;
        _class.SuperClass = _super;
        
        return _class;
    },
    CreateSetter: function(proto, field)
    {
        var name = JRM.FirstToUpper(field);
        
        if (name) 
        {
            var setter = 'set' + name;
            var getter = 'get' + name;
            
            if (!JRM.isFunction(proto[setter])) 
            {
                proto[setter] = new Function('this.' + field + ' = arguments[0]; return this;');
            }
            
            if (!JRM.isFunction(proto[getter])) 
            {
                proto['get' + name] = new Function('return this.' + field + ';');
            }
        }
    },
    CreateSetters: function(proto)
    {
        for (var field in proto) 
        {
            if (!JRM.isFunction(proto[field])) 
            {
                JRM.CreateSetter(proto, field);
            }
        }
        
        return proto;
    },
    FirstToUpper: function(name)
    {
        var match = /^(\w)(\w*)$/i.exec(name);
        
        if (match) 
        {
            return match[1].toUpperCase() + match[2];
        }
        
    },
    isArray: function(x)
    {
        return JRM.isHash(x) && typeof x.length == "number" && typeof x.splice == "function";
    },
    isObject: function(x)
    {
        return JRM.isHash(x) && !this.isArray(x);
    },
    isHash: function(x)
    {
        return typeof x == 'object' && x instanceof Object;
    },
    isFunction: function(x)
    {
        return typeof x == 'function' || x instanceof Function;
    },
    GetClass: function(className)
    {
        if (JRM.isFunction(className)) 
            return className;
        
        if (/^([\w\.]+)$/i.test(className)) 
        {
            return eval(className.toString());
        }
    },
    Create: function(className, args)
    {
        var _class = JRM.GetClass(className);
        
        if (!_class) 
            return null;
        
        var proto = function()
        {
        };
        proto.prototype = _class.prototype;
        
        var _instance = new proto();
        _class.apply(_instance, args);
        return _instance;
    }
};

//console.log('jrm.factory');

JRM.Factory = JRM.Class(
{
    serializer: function(mapper, object, args)
    {
        if (mapper.getRegister().isReference(object)) 
        {
            return new JRM.ReferenceSerializer(mapper, object);
        }
        
        if (this.isInstance(mapper, object)) 
        {
            var construct = args[1] ? args[1] : false;
            var method = args[2] ? args[2] : false;
            return new JRM.InstanceSerializer(mapper, object, construct, method);
        }
        
        if (JRM.isObject(object)) 
        {
            return new JRM.HashSerializer(mapper, object);
        }
        
        if (JRM.isArray(object)) 
        {
            return new JRM.ArraySerializer(mapper, object);
        }
        
        return null;
    },
    isInstance: function(mapper, object)
    {
        return mapper.getMeta(object).getClass() ? true : false;
    },
    mapper: function()
    {
        return new JRM.Mapper();
    },
    meta: function(field)
    {
        return new JRM.Meta(field);
    },
    unserializer: function(mapper, data)
    {
        if (mapper.getMeta(data).getReference()) 
        {
            return new JRM.ReferenceUnserializer(mapper, data);
        }
        
        if (this.isInstance(mapper, data)) 
        {
            return new JRM.InstanceUnserializer(mapper, data);
        }
        
        if (JRM.isObject(data)) 
        {
            return new JRM.HashUnserializer(mapper, data);
        }
        
        if (JRM.isArray(data)) 
        {
            return new JRM.ArrayUnserializer(mapper, data);
        }
        
        return null;
    }
});
