var AndroidTVKeyHandler = HTMLKeyHandler.extend({
  initialize: function(){
    this.supr();
    this.mapKeys(TVKeyValueAndroidTV);
    if(window.androidTVWrapper){
        window.androidTVWrapper.simulateKeyDownEvent = this.simulateKeyDownEvent;
    }
  },
  simulateKeyDownEvent: function(keyCode){
    // var e = new KeyboardEvent("keydown");
    // e.which = keyCode;
    // e.keyCode = keyCode; // cannot to be overwritten it seams
    // e.name = this.tvKey[keyCode];
    // e.name = this.tvKey[keyCode];
    
    //TODO: use proper KeyEvent and not such a hack
    //Logger.log("simulateKeyDownEvent keyCode: " + keyCode + " -> " + this.tvKey[keyCode]);
    try {
        this.receiveKeyDown({keyCode: keyCode});
    }
    catch(e) {
        Logger.error("ERROR: simulateKeyDownEvent keyCode: ");
    }
  },
});