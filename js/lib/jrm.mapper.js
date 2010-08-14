//console.log('jrm.mapper');


JRM.Mapper = JRM.Class(
{

    referenceField: '__jrmid',
	
    metaField: '*',
    
    register: 0,
    
    meta: 0,
    
    construct: function()
    {
    },
    destruct: function()
    {
        this.getRegister().destruct();
    },
    serialize: function(object)
    {
        args = arguments[1] ? arguments[1] : [];
        
        var serializer = JRM.getFactory().serializer(this, object, args);
        
        if (serializer) 
        {
            return serializer.serialize();
        }
        
        return object;
    },
    unserialize: function(data)
    {
        var unserializer = JRM.getFactory().unserializer(this, data);
        
        if (unserializer) 
        {
            return unserializer.unserialize();
        }
        
        return data;
    },
    getRegister: function()
    {
        if (!this.register) 
        {
            this.register = new JRM.Register(this);
        }
        return this.register;
    },
    getMeta: function(object)
    {
        if (!this.meta) 
        {
            this.meta = JRM.getFactory().meta(this.metaField);
        }
        
        this.meta.setObject(object);
        
        return this.meta;
    }
    
    
});


