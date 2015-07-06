/*
 * FireTV Device Factory Class
 */
var FireTVDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.AMAZON;
        this.info.platform = PLATFORM.FIRETV;
        this.info.useVideoSourceObject = false;
    },
    createDevice: function(){
        this.setupFireTV();
        return this.onDeviceCreation(new Html5Device(this.info));
    },
    setupFireTV: function(){
        Html5Device = Html5Device.extend({
            initialize: function(_info){
                this.supr(_info);
                this.info.hasBadResolution = false;
                //this.zoom();
            },
            createKeyHandler: function(){
                this.keyHandler = new FireTVKeyHandler();
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
            createPlayer: function(){
                this.player = new FireTVPlayer(this.info);
                return this.player;
			},
            getIO: function(o) {
              return new FireTVIO(o);
            },
            getWrapperVersion: function(){
                var fireTVWrapperVersion = null;
                if(window.fireTV && window.fireTV.getWrapperVersion){
                    var version = window.fireTV.getWrapperVersion();
                    if(version != "")
                        fireTVWrapperVersion = version;
                }
                return fireTVWrapperVersion;
            },
            // creates a device depended way to notify platform that the app is ready to use
            ready: function(){
                window.fireTV && window.fireTV.ready();
            },
            exit: function(){
                window.history.go(-2);
                window.fireTV && window.fireTV.exit();
            }
        });
    }
});
