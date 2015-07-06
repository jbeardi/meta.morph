var PhilipsKeyHandler = KeyHandler.extend({
    initialize: function(){
        this.useKeyPressedEvents = false;
        this.supr();
        this.mapKeys(TVKeyValuePhilips);
        this.registerPointerEvents();
    },
    registerPointerEvents: function() {
        // TODO: read Smart TV Technical Guidelines - Pointer support.pdf
        window.onmouseon = Util.bind(this, function() {
            this.trigger('PointerChangeState', 'on' );
        });
        window.onmouseoff = Util.bind(this, function() {
            this.trigger('PointerChangeState', 'off' );
        });
    }
});
