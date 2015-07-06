var OppoKeyHandler = KeyHandler.extend({
    initialize: function(){
        this.supr();
        this.mapKeys(TVKeyValueOppo);
    }
});
