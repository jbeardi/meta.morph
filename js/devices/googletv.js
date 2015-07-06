/*
 * GoogleTV Device Factory Class
 */
var GoogleTVDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.platform = PLATFORM.GOOGLETV;
        this.info.useVideoSourceObject = true;
    },
    createDevice: function(){
        // GOOGLETV
        if ( this.checkDeviceByUserAgent("GoogleTV", false) ) {
            this.setupGoogleTV();
            return this.onDeviceCreation(new Html5Device(this.info));
        // NO DEFAULT
        } else {
            return this.onDeviceCreation(new Device(this.info));
        }
    },
    setupGoogleTV: function(){
        Html5Device = Html5Device.extend({
            initialize: function(_info){
                this.supr(_info);
                this.info.hasBadResolution = false;
                this.zoom();
            },
            createKeyHandler: function(){
                this.keyHandler = new GoogleTVKeyHandler();
                return this.keyHandler;
            },
            zoom: function(){
                var sw = screen.width;
                var sh = screen.height;
                var sRatio = (sw / sh);
                var wRatio = sw / this.info.width;
                var hRatio = sh / this.info.height;
                var zoomratio = (wRatio > hRatio ? wRatio : hRatio);
                //BAD_RESOLUTION
                if (sRatio < 1.7 || sRatio > 1.8)
                    this.info.hasBadResolution = true;
                //if(document.domain != "localhost")
                    $('body').css('zoom', zoomratio);
            },
            getDeviceFirmwareDetails: function(){
                try {
                    var firmware = '';

                    // GoogleTV User Agent changed from something like
                    // Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.77 Large Screen Safari/534.24 GoogleTV/000000
                    // to
                    // Mozilla/5.0 (Linux; GoogleTV x.x.x; LG Google TV Build/123456) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.77 Safari/534.24
                    // https://plus.google.com/u/0/+GoogleTVDevelopers/posts/fdzsmKgHAm9
                    // https://developers.google.com/tv/faq#useragentstring

                    var index_firmware = this.info.userAgent.indexOf("GoogleTV/");
                    if (index_firmware > -1)
                        firmware = this.info.userAgent.substring(index_firmware + 9);
                    else {
                        var res = this.userAgent.match(/GoogleTV\s([.0-9]*);\s(.*)\sBuild\/([.0-9]*)\)/);
                        if (res.length == 4){
                            firmware += res[1]; // x.x.x
                            firmware += "_"+res[2]; // LG Google TV
                            firmware += "/"+res[3]; // 123456 -> x.x.x_LG Google TV_123456
                        }
                    }
                    Logger.log("firmware GoogleTV: " + firmware);
                    return firmware;
                } catch (e) {
                    Logger.log("ERROR GoogleTV Firmware: " + e);
                    return '';
                }
            },
            getFeatures: function() {
              return new PointerFeatures(this);
            }
        });
    }
});
