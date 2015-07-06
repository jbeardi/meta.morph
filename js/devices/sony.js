/*
 * Sony Device Factory Class
 */
var SonyDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.SONY;
        this.info.useVideoSourceObject = true;
    },
    createDevice: function(){
        // GOOGLETV
        if ( this.checkDeviceByUserAgent("GoogleTV", false) ) {
            var googleTVFactory = new GoogleTVDeviceFactory(this.info);
            return this.onDeviceCreation(googleTVFactory.createDevice());
        // CEB
        } else if ( this.checkDeviceByUserAgent("SonyCEBrowser", false) ) {
            this.setupCEB();
            return this.onDeviceCreation(new Html5Device(this.info));
        // NO DEFAULT
        } else {
            return this.onDeviceCreation(new Device(this.info));
        }
    },
    setupCEB: function(){
        Html5Device = Html5Device.extend({
            createKeyHandler: function(){
                this.keyHandler = new SonyCEBKeyHandler();
                return this.keyHandler;
            },
            exit: function(){
                window.close();
            }
        });
    }
});
