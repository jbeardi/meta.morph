var SamsungKeyHandler = HTMLKeyHandler.extend({
    initialize: function(){
        this.supr();
        //KeyHandler.prototype.initialize.call(this);
        this.mapKeys(new Common.API.TVKeyValue());
    },
    mapKeys: function(_keySet) {
        this.tvKey = {};
        var keyName = '';
        for (var key in _keySet) { 
            if ( key.match(/^KEY_(.+)/g) ) {
                keyName = key.replace(/^KEY_(.+)/g, "$1");
                // RENAMING:
                if (keyName == 'RETURN') {
                    Logger.log("special found on: " + keyName + " is now: BACK");
                    keyName = 'BACK';
                } else if (keyName == 'ENTER') {
                    Logger.log("special found on: " + keyName + " is now: OK");
                    keyName = 'OK';
                } else if (keyName == 'REWIND_') {
                    Logger.log("special found on: " + keyName + " is now: PREV");
                    keyName = 'PREV';
                } else if (keyName == 'FF_') {
                    Logger.log("special found on: " + keyName + " is now: NEXT");
                    keyName = 'NEXT';
                }
            }
            this.tvKey[_keySet[key]] = keyName;
        }
    },
    receiveKeyDown: function(ev) {
        this.pointerOff();
        var key = ev.keyCode;
        Logger.log("SamsungKeyHandler.receiveKeyDown: " + this.tvKey[key] + ' (' + key + ')');
        // 1057 = Popup/Title Menu Button, this should be ignored
        if (key != 1057) {
          // special case on remote control's dedicated exit key:
          if ( this.tvKey[key] == 'EXIT') {
            this.trigger('ExitKey', new RCEvent(this.tvKey[key], ev) );
          } else {
            this.trigger('KeyDown', new RCEvent(this.tvKey[key], ev) );
          }
        }
    },
});

var SamsungTizenKeyHandler = HTMLKeyHandler.extend({
    initialize: function(){
    	tizen.tvinputdevice.registerKey("MediaPlay");
		tizen.tvinputdevice.registerKey("MediaStop");
		tizen.tvinputdevice.registerKey("MediaPause");
		tizen.tvinputdevice.registerKey("MediaPlayPause");
		tizen.tvinputdevice.registerKey("MediaRewind");
		tizen.tvinputdevice.registerKey("MediaFastForward");
        this.supr();
        this.mapKeys(TVKeyValueSamsungTizen);
    },
    mapKeys: function(_keySet) {
        this.tvKey = {};
        var keyName = '';
        for (var key in _keySet) { 
            if ( key.match(/^KEY_(.+)/g) ) {
                keyName = key.replace(/^KEY_(.+)/g, "$1");
            }
            this.tvKey[_keySet[key]] = keyName;
        }
    },
    receiveKeyDown: function(ev) {
        this.pointerOff();
        var key = ev.keyCode;
        console.log("SamsungTizenKeyHandler.receiveKeyDown: " + this.tvKey[key] + ' (' + key + ')');
        this.trigger('KeyDown', new RCEvent(this.tvKey[key], ev) );
    },
});
