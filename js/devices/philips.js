/*
 * Philips Device Factory Class
 */
var PhilipsDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.PHILIPS;
        this.info.useVideoSourceObject = true;
        this.detectNetTVVersion();
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
            this.setupPhilipsHtml5();
            return this.onDeviceCreation(new Html5Device(this.info));
        case TECHNOLOGY.CEHTML :
            this.setupPhilipsCEhtml();
            return this.onDeviceCreation(new CEhtmlDevice(this.info));
            break;
        }
    },
    detectNetTVVersion: function() {
        this.info.version = this.info.userAgent.replace(/.+NETTV\/(\S+).+/g, "$1");
    },
    setupPhilipsCEhtml: function(){
        CEhtmlDevice = CEhtmlDevice.extend({
            createKeyHandler: function(){
                this.keyHandler = new PhilipsKeyHandler();
                return this.keyHandler;
            },
            createPlayer: function(){
                this.player = new PhilipsCEhtmlPlayer(this.info);
                return this.player;
            },
            exit: function(){
                window.history.go(-999);
            }
        });
    },
    setupPhilipsHtml5: function(){
        Html5Device = Html5Device.extend({
            createKeyHandler: function(){
                this.keyHandler = new PhilipsKeyHandler();
                return this.keyHandler;
            },
            createPlayer: function(){
                this.player = new PhilipsHTML5Player(this.info);
                return this.player;
            },
            exit: function(){
                window.history.go(-999);
            }
        });
    }
});
