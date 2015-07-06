var SonyCEBKeyHandler = KeyHandler.extend({
    initialize: function(){
        this.supr();
        this.mapKeys(TVKeyValueSonyCEB);
    }
});
