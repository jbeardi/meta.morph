var RCEvent = klass({
    name: '',
    evObj: null,
    handled: false,
    
    initialize: function(_name, _evObj){
        this.name = _name;
        this.evObj = _evObj;
    },
    setHandled: function(){
        this.handled = true;
    }
});

