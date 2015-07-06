var PanasonicKeyHandler = KeyHandler.extend({
    initialize: function(){
        this.supr();
        this.mapKeys(TVKeyValuePanasonic);
    },
    mapKeys: function(_keySet) {
        this.tvKey = {};
        var keyName = '';
        for (key in _keySet) { 
            if ( key.match(/^KEY_(.+)/g) ) {
                keyName = key.replace(/^KEY_(.+)/g, "$1");
                // RENAMING:
                if (keyName == 'RETURN') {
                    Logger.log("special found on: " + keyName + " is now: BACK");
                    keyName = 'BACK';
                } else if (keyName == 'ENTER') {
                    Logger.log("special found on: " + keyName + " is now: OK");
                    keyName = 'OK';
                }
            }
            this.tvKey[_keySet[key]] = keyName;
        }
    }
});
