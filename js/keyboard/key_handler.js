var KeyHandler = klass({
    tvKey: TVKeyValue,
    isBlocked: false,
    useKeyDownEvents: true,
    useKeyPressedEvents: true,

    initialize: function(){
        _.extend(this, Backbone.Events);
        if (typeof KeyEvent != 'undefined') {
          // Firefox has a KeyEvent Hash defined
          this.mapKeys(KeyEvent);
        } else {
          // Other Browsers need this
          this.mapKeys(BrowserKeyValue);
        }
        if (this.useKeyDownEvents)
            window.addEventListener('keydown', Util.bind(this, this.receiveKeyDown), false);
        if (this.useKeyPressedEvents)
            window.addEventListener('keypress', Util.bind(this, this.receiveKeyPress), false);
    },

    mapKeys: function(_keySet) {
        this.tvKey = {};
        var keyName = '';
        for (key in _keySet) { 
            if ( key.match(/^VK_(.+)/g) ) {
                keyName = key.replace(/^VK_(.+)/g, "$1");
            } else if ( key.match(/^KEY_(.+)/g) ) {
                keyName = key.replace(/^KEY_(.+)/g, "$1");
            } else if ( key.match(/^DOM_VK_(.+)/g) ) {
                keyName = key.replace(/^DOM_VK_(.+)/g, "$1");
            } else {
                keyName = key;
            }
            // RENAMING:
            if (keyName == 'RETURN') {
                Logger.log("special found on: " + keyName + " is now: OK");
                keyName = 'OK';
            } else if (keyName == 'BACK_SPACE') {
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

            this.tvKey[_keySet[key]] = keyName;
        }
    },

    receiveKeyDown: function(ev) {
        var key = ev.keyCode;
        Logger.log("KeyHandler.receiveKeyDown: " + this.tvKey[key] + ' (' + key + ')');
        this.trigger('KeyDown', new RCEvent(this.tvKey[key], ev) );
    },

    receiveKeyPress: function(ev) {
        var key = ev.keyCode;
        Logger.log("KeyHandler.receiveKeyPress: " + this.tvKey[key] + ' (' + key + ')');
        this.trigger('KeyPress', new RCEvent(this.tvKey[key], ev) );
    },

    block: function() {
        this.isBlocked = true;
    },

    unblock: function() {
        this.isBlocked = false;
    }
});
