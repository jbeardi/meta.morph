/*
 * AndroidTV Device Factory Class
 */
var AndroidTVDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.GOOGLE;
        this.info.platform = PLATFORM.ANDROIDTV;
        this.info.useVideoSourceObject = false;
        // check if a specific vendor is given as suffix after "androidtv-" in hash
        if ( this.checkDeviceByHash('androidtv-') ) {
            var suffix = this.info.hash.replace(/^.*androidtv\-(.+)/g, '$1');
            if( suffix ) {
            	suffix = suffix.toLowerCase();
							_.every(VENDOR, function(name) {
								name = name.toLowerCase();
								if (name !== suffix) return true;
                this.info.vendor = name;
							}, this);
            }
        }
    },
    createDevice: function(){
        this.setupAndroidTV();
        return this.onDeviceCreation(new Html5Device(this.info));
    },
    setupAndroidTV: function(){
        Html5Device = Html5Device.extend({
            initialize: function(_info){
                this.supr(_info);
                this.info.hasBadResolution = false;
                //this.zoom();
            },
            createKeyHandler: function(){
                this.keyHandler = new AndroidTVKeyHandler();
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
                this.player = new AndroidTVPlayer(this.info);
                return this.player;
            },
            getIO: function(o) {
              return new AndroidTVIO(o);
            },
            getWrapperVersion: function(){
                var androidTVWrapperVersion = null;
                if(window.androidTVWrapper && window.androidTVWrapper.getWrapperVersion){
                    var version = window.androidTVWrapper.getWrapperVersion();
                    if(version != "")
                        androidTVWrapperVersion = version;
                }
                return androidTVWrapperVersion;
            },
            // creates a device depended way to notify platform that the app is ready to use
            ready: function(){
                window.androidTVWrapper && window.androidTVWrapper.ready();
            },
            /**
             * Method to transfer meta data to an Android TV device in order to set a Now Playing card.
             * Parameter must be a JSON object
 			 * @param {Object} metaData
             */
            setNowPlayingMetaData: function(metaData){
                metaData && window.androidTVWrapper && window.androidTVWrapper.setNowPlayingMetaData(JSON.stringify(metaData));
            },
            exit: function(){
                window.history.go(-2);
                window.androidTVWrapper && window.androidTVWrapper.exit();
            }
        });
    }
});
