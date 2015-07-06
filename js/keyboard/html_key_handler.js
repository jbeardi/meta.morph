var HTMLKeyHandler = KeyHandler.extend({
  pointer_timeout_id: null,
  pointer_last_position_x: null,
  pointer_last_position_y: null,
  pointer_on: false,
  pointer_timeout_time: 4000,

  block_while_processing_event: false,

  initialize: function(){
    this.useKeyPressedEvents = false;
    this.supr();
    this.registerPointerEvents();
  },

  registerPointerEvents: function() {
    document.onmousemove = Util.bind(this, this.onMouseMove);
  },

  receiveKeyDown: function(ev) {
    this.pointerOff();
    this.supr(ev);
  },

  receiveKeyPress: function(ev) {
    this.pointerOff();
    this.supr(ev);
  },

  pointerOn: function() {
    this.pointer_on  = true;
    this.trigger('PointerChangeState', 'on' );
    Logger.log("KeyHandler. pointer on ");
  },

  pointerOff: function() {
      if (this.pointer_on) {
        this.pointer_on  = false;
        this.trigger('PointerChangeState', 'off' );
        Logger.log("KeyHandler. pointer off");
      }
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

      if(!this.pointer_on) {
        this.pointerOn();
      } else {
        var that = this;
        if(this.pointer_timeout_id != null) {
          clearTimeout(this.pointer_timeout_id);
          this.pointer_timeout_id = null;
        }
        this.pointer_timeout_id = setTimeout(function() {
          that.pointerOff();
        }, this.pointer_timeout_time);
      }
    }
    this.block_while_processing_event = false;
  }

});
