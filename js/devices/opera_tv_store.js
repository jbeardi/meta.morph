/*
 * Opera TV Store Device Factory Class
 */
var OperaTVStoreDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.platform = PLATFORM.OPERATVSTORE;
        this.info.useVideoSourceObject = true;
    },
    createDevice: function(){
        // SONY
        if ( this.checkDeviceByUserAgent("SonyCEBrowser", false) ) {
            this.info.vendor = VENDOR.SONY;
        } else if ( this.checkDeviceByUserAgent("Swisscom", false) ) {
        	this.info.vendor = VENDOR.SWISSCOM;
        } else if ( this.checkDeviceByHash('opera-') ) {
            var suffix = this.info.hash.replace(/^.*opera\-(.+)/g, '$1');
            if( suffix ) {
            	suffix = suffix.toLowerCase();
							_.every(VENDOR, function(name) {
								name = name.toLowerCase();
								if (name !== suffix) return true;
                this.info.vendor = name;
							}, this);
            }
        }
        this.setupOpera();
        return this.onDeviceCreation(new Html5Device(this.info));
    },
    setupOpera: function(){
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
