//console.log('jrm.meta');

// Meta is Flyweight 
JRM.Meta = JRM.Class(
{
    controller: 0,
    
    object: 0,
    
    field: 0,

    construct: function(field)
    {
        this.setObject({});
        this.setField(field);
    },
    get: function(name)
    {
        if (this.valid()) 
        {
            var o = this.getObject();
            var f = this.getField();
            return o[f][name] ? o[f][name] : false;
        }
    },
    valid: function()
    {
        return this.object && this.object[this.getField()] ? true : false;
    },
    getClass: function()
    {
        return this.get('Class');
    },
    getProperties: function()
    {
        return this.get('Properties');
    },
    getConstructor: function()
    {
        return this.get('Constructor');
    },
    getMethod: function()
    {
        return this.get('Method');
    },
    getReference: function()
    {
        return this.get('Reference');
    },
    getFields: function()
    {
        return this.get('Fields');
    }
});
