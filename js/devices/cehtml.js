/*
 * Ce-Html Device Class
 */
var CEhtmlDevice = Device.extend({
    initialize: function(_info) {
        _info.technology = TECHNOLOGY.CEHTML;
        this.supr(_info);
    },
    // creates a device depended key handler
    createKeyHandler: function(){
        this.keyHandler = new CEhtmlKeyHandler();
        return this.keyHandler;
    },
    // creates a device depended player
    createPlayer: function(){
        this.player = new CEHTMLPlayer(this.info);
        return this.player;
    },
    append: function(eObj, h) {
        Util.append(eObj[0], h, true);
    },
    initLogger: function() {
      Logger.setup(true, false, false);
      Logger.show();
    },
});
