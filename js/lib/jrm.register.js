//console.log('jrm.register');

JRM.Register = JRM.Class(
{
    objects: 0,
    
    mapper: 0,
    
    field: 0,
    
    construct: function(mapper)
    {
        this.setObjects([0]);
        this.setMapper(mapper);
    },
    getField: function()
    {
        if (!this.field) 
            this.field = this.getMapper().getReferenceField();
        
        return this.field;
    },
    destruct: function()
    {
        var o = this.objects;
        for (var i = 1, field = this.getField(); i < o.length; i++) 
        {
            delete o[i][field];
            //            delete o[i];
            // TODO uncomment
        }
    },
    add: function(object)
    {
        var id = 0;
        if (JRM.isHash(object) && !this.has(object)) 
        {
            this.objects.push(object);
            id = this.objects.length - 1;
            this.set(id, object);
        }
        return id;
    },
    get: function(id)
    {
        var o = this.objects;
        return o[id] ? o[id] : null;
    },
    set: function(id, object)
    {
        object[this.getField()] = id;
    },
    getId: function(object)
    {
        return object[this.getField()] ? object[this.getField()] : 0;
    },
    has: function(object)
    {
        if (this.isReference(object)) 
        {
            return this.get(this.getId(object)) ? true : false;
        }
    },
    isReference: function(object)
    {
        return JRM.isHash(object) && this.getId(object);
    }
});

// @TODO remove
//,
//    addArray: function(array)
//    {
//        if (JRM.isArray(array)) 
//        {
//            for (var i = 0; i < array.length; i++) 
//            {
//                this.add(array[i]);
//            }
//        }
//    },
//    addObject: function(object)
//    {
//        if (JRM.isObject(object)) 
//        {
//            for (var i in object) 
//            {
//                this.add(object[i]);
//            }
//        }
//    }