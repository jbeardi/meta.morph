var LGKeyHandler = CEhtmlKeyHandler.extend({
    
    pointer_on: false,
    pointer_last_position_x: null,
    pointer_last_position_y: null,
    block_while_processing_event: false,
    
    initialize: function(){
        this.supr();
        this.registerPointerEvents();
    },
    registerPointerEvents: function() {
        window.onmouseon = Util.bind(this, function() {
            this.pointer_on = true;
            this.trigger('PointerChangeState', 'on' );
        });
        window.onmouseoff = Util.bind(this, function() {
            this.pointer_on = false;
            this.trigger('PointerChangeState', 'off' );
        });
        document.onmousemove = Util.bind(this, this.onMouseMove);
    },
    onMouseMove: function(event) {
        if (this.block_while_processing_event) {
          return;
        }

        this.block_while_processing_event = true;

        if ( (typeof event.pageX != 'undefined' && this.pointer_last_position_x != event.pageX) ||
             (typeof event.pageY != 'undefined' && this.pointer_last_position_y != event.pageY) ){
            this.pointer_last_position_x = event.pageX;
            this.pointer_last_position_y = event.pageY;
            
            if (!this.pointer_on) {
                this.pointer_on = true;
                this.trigger('PointerChangeState', 'on' );
            }
        }
        this.block_while_processing_event = false;
    }
});
