/*
 * Toshiba Device Class
 * ! Still in here for legacy support in Bild.de app !
 * ! Should be refactored in Bild.de app to use ToshibaDeviceFactory instead !
 */
var ToshibaDevice = Html5Device.extend({
    initialize: function(_info) {
        this.supr(_info);
    },
    // creates a device depended key handler
    createKeyHandler: function(){
        this.keyHandler = new ToshibaKeyHandler();
        return this.keyHandler;
    },
    // creates a device depended way to exit the app
    // Attention! Please steal this file from the bild
    // app :)
    exit: function(){
        window.location = "Toshiba/toshiba_exit.html";
    }
});

/*
 * Toshiba Device Factory Class
 */
var ToshibaDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.TOSHIBA;
        // check if HTML5 or CE-HTML
        if ( this.checkDeviceByHash("-html5") ) {
            this.techVersion = TECHNOLOGY.HTML5;
        } else {
            this.techVersion = TECHNOLOGY.CEHTML;
        }
    },
    createDevice: function(){
        switch (this.techVersion) {
            case TECHNOLOGY.HTML5 :
                this.setupToshibaHtml5();
                return this.onDeviceCreation(new Html5Device(this.info));
            case TECHNOLOGY.CEHTML :
                this.setupToshibaCEhtml();
                return this.onDeviceCreation(new CEhtmlDevice(this.info));
                break;
        }
    },
    setupToshibaCEhtml: function(){
        this.info.useVideoSourceObject = true;
        CEhtmlDevice = CEhtmlDevice.extend({
            createKeyHandler: function(){
                this.keyHandler = new ToshibaKeyHandler();
                return this.keyHandler;
            },
            createPlayer: function(){
                this.player = new PhilipsCEhtmlPlayer(this.info);
                return this.player;
            },
            exit: function(){
                window.location.href = "exittoshiba.htm";
            }
        });
    },
    setupToshibaHtml5: function(){
        Html5Device = Html5Device.extend({
            createKeyHandler: function(){
                this.keyHandler = new ToshibaKeyHandler();
                return this.keyHandler;
            },
            exit: function(){
                window.location.href = "exittoshiba.htm";
            }
        });
    }
});
