/*
 * Development Device Factory Class
 */
var DevelopmentDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.useVideoSourceObject = true;
        if ( this.checkDeviceByUserAgent("Chrome", false) ) {
            this.info.type = DEVICE_TYPE.PC_CHROME;
        } else if ( this.checkDeviceByUserAgent("Firefox", false) ) {
            this.info.type = DEVICE_TYPE.PC_FIREFOX;
        } else if ( this.checkDeviceByUserAgent("Opera", false) ) {
            this.info.type = DEVICE_TYPE.PC_OPERA;
        } else if ( this.checkDeviceByUserAgent("Safari", false) ) {
            this.info.type = DEVICE_TYPE.PC_SAFARI;
            //this.info.vendor = "safari";
        }
    },
    createDevice: function(){
        this.setupDevelopment();
        return this.onDeviceCreation(new Html5Device(this.info));
    },
    setupDevelopment: function(){
        Html5Device = Html5Device.extend({
            initialize: function(_info){
                this.supr(_info);
                this.initLogger();
            },
            initLogger: function(){
                Logger.setup(false, true, false);
            },
            getFeatures: function() {
              return new PointerFeatures(this);
            }
        });
    }
});
