var ToshibaKeyHandler = CEhtmlKeyHandler.extend({
    initialize: function(){
        this.supr();
        // Additional Exit Key for Toshiba
        this.tvKey[461] = "BACK";
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
            } else if (keyName == 'FAST_FWD') {
                Logger.log("special found on: " + keyName + " is now: FF");
                keyName = 'FF';
            } else if (keyName == 'REWIND') {
                Logger.log("special found on: " + keyName + " is now: RW");
                keyName = 'RW';
            }

            this.tvKey[_keySet[key]] = keyName;
        }
    },
});
