var NOT_AVAILABLE = 'n.a.';
var VENDOR = {
    UNKNOWN :       'unknown',
    SAMSUNG :       'samsung',
    VIDEOWEB :      'videoweb',
    ABOX42 :        'abox42',
    TECHNISAT :     'technisat',
    INVERTO :       'inverto',
    BOXEE :         'boxee',
    SONY :          'sony',
    LOEWE :         'loewe',
    LG :            'lg',
    WD :            'wd',
    PHILIPS :       'nettv',
    SMART :         'smart',
    PANASONIC :     'panasonic',
    TOSHIBA :       'toshiba',
    OPPO :          'oppo',
    AMAZON :        'amazon',
    GOOGLE :        'google',
    SWISSCOM :      'swisscom'
};
var TECHNOLOGY = {
    HTML5 :         'html5Device',
    CEHTML :        'cehtmlDevice',
    PROP :          'proprietaryDevice'
};
var PLATFORM = {
    GOOGLETV :      'googletv',
    OPERATVSTORE :  'operatvstore',
    FIRETV :        'firetv',
    ANDROIDTV :     'androidtv',
    TIZEN : 		'tizen'
};
var DEVICE_TYPE = {
    TV :            'tv',
    BDP :           'bluraydiscplayer',
    STB :           'settopbox',
    HT :            'hometheatersystem',
    MC :            'mediacenter',
    PC_CHROME :     'pcchrome',
    PC_OPERA :      'pcopera',
    PC_FIREFOX :    'pcfirefox',
    PC_SAFARI :     'pcsafari',
    EMU :           'emulator'
};
/*
 * Device Detection Class
 */
var DeviceDetection = DeviceFactory.extend({
    initialize: function(){
        this.info = {
            userAgent: '',
            windowLocation: '',
            url: '',
            hash: ''
        };
        this.activeDeviceFactory = null;
    },

    createDeviceInfo: function(params) {
        this.info.userAgent = navigator.userAgent;
        this.info.windowLocation = window.location.search;
        this.info.url = document.URL;
        this.info.vendor = VENDOR.UNKNOWN;
        this.info.platform = NOT_AVAILABLE;
        this.info.type = NOT_AVAILABLE;
        this.info.params = params || {};
        this.info.hash = (window.location.hash ? window.location.hash : '');
    },

    createDevice: function(params) {
      // Deprecated! Please use one of the other two methods
      // to create a device.
      return this.createDeviceByHash(params);
    },

    createDeviceByHash: function(params){
        this.createDeviceInfo(params);

        // ANDROIDTV
        if ( this.checkDeviceByHash("androidtv") ) {
            this.activeDeviceFactory = new AndroidTVDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // SAMSUNG
        } else if ( (this.info.windowLocation && this.info.windowLocation.length > 0 && (/^.*modelid=.*$/).test(this.info.windowLocation)) || (/^.*Tizen.*$/).test(this.info.userAgent)) {
            this.activeDeviceFactory = new SamsungDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // SONY
        } else if (this.checkDeviceByHash("sony") ) {
            this.activeDeviceFactory = new SonyDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // GOOGLETV
        } else if (this.checkDeviceByHash("googletv") ) {
            this.activeDeviceFactory = new GoogleTVDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // OPERA TV STORE
        } else if (this.checkDeviceByHash("opera") ) {
            this.activeDeviceFactory = new OperaTVStoreDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // LG
        } else if (this.checkDeviceByHash("lg") && this.checkDeviceByUserAgent(/^.*LG\sNetCast\.(TV|Media)-20[1-9][1-9].*$/g, false, true) ) {
            this.activeDeviceFactory = new LGDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // PANASONIC
        } else if (this.checkDeviceByHash("panasonic") && this.checkDeviceByUserAgent("Viera", false) ) {
            this.activeDeviceFactory = new PanasonicDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // PHILIPS
        } else if (this.checkDeviceByHash("nettv") && this.checkDeviceByUserAgent("NETTV", false) ) {
            this.activeDeviceFactory = new PhilipsDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // TOSHIBA
        } else if (this.checkDeviceByHash("toshiba") ) {
            this.activeDeviceFactory = new ToshibaDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // OPPO
        } else if (this.checkDeviceByHash("oppo") ) {
            this.activeDeviceFactory = new OppoDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // AMAZON (FireTV)
        } else if (this.checkDeviceByHash("firetv") ) {
            this.activeDeviceFactory = new FireTVDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // TECHNISAT
        } else if (this.checkDeviceByHash("TechniSat") ) {
            this.activeDeviceFactory = new TechnisatDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // LOEWE
        } else if (this.checkDeviceByHash("loewe") ) {
            this.activeDeviceFactory = new LoeweDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // VIDEOWEB TODO: conform to new device factory driven detection
        } else if ( this.checkDeviceByUserAgent("videoweb", true) ) {
            this.info.vendor = VENDOR.VIDEOWEB;
            return new CEhtmlDevice( this.info );
        // ABOX42 TODO: conform to new device factory driven detection
        } else if ( this.checkDeviceByUserAgent("ABox42-B12", false) ) {
            this.info.vendor = VENDOR.ABOX42;
            return new CEhtmlDevice( this.info );
        } else {
            return this.createFallBackDevice(params);
        }
    },

    createDeviceByUserAgent: function(params){
        this.createDeviceInfo(params);

        if ( (this.info.windowLocation && this.info.windowLocation.length > 0 && /^.*modelid=.*$/.test(this.info.windowLocation)) || (/^.*Tizen.*$/).test(this.info.userAgent) ) {
            this.info.vendor = VENDOR.SAMSUNG;
            this.activeDeviceFactory = new SamsungDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if ( this.checkDeviceByUserAgent("GoogleTV", false)) {
            this.activeDeviceFactory = new GoogleTVDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if ( this.checkDeviceByUserAgent(/^.*LG\sNetCast\.(TV|Media)-20[1-9][1-9].*$/g, false, true) || this.checkDeviceByUserAgent("Web0S", false) ) {
            this.activeDeviceFactory = new LGDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if ( this.checkDeviceByUserAgent("Viera", false) ) {
            this.activeDeviceFactory = new PanasonicDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if (this.checkDeviceByUserAgent("NETTV", false) || this.checkDeviceByUserAgent("philips", true)) {
            this.activeDeviceFactory = new PhilipsDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if ( this.checkDeviceByUserAgent("SonyCEBrowser", false) ) {
            this.activeDeviceFactory = new SonyDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if ( this.checkDeviceByUserAgent("Opera TV Store", false) ) {
            this.activeDeviceFactory = new OperaTVStoreDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if ( this.checkDeviceByUserAgent("TOSHIBA", false) ) {
            this.activeDeviceFactory = new ToshibaDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if ( this.checkDeviceByUserAgent("TechniSat") ) {
            this.activeDeviceFactory = new TechnisatDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if ( this.checkDeviceByUserAgent("videoweb", true)) {
            this.info.vendor = VENDOR.VIDEOWEB;
            return new CEhtmlDevice( this.info );
        } else if ( this.checkDeviceByUserAgent("ABox42-B12", false) ) {
            this.info.vendor = VENDOR.ABOX42;
            return new CEhtmlDevice( this.info );
        } else {
            return this.createFallBackDevice(params);
        }
    },

    createFallBackDevice: function(params) {
        // handle special cases here, all supported devices should have been recognized up to this point
        // Attention: DO NOT TEST FOR OPERA HERE. The Opera/Safari UserAgent is also used by CE-HTML Devices.
        //            If you want to test on Opera Desktop and want a Dev System use the Hash "development"
        if (this.checkDeviceByHash("androidtv") ) {
            this.activeDeviceFactory = new AndroidTVDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
		}
        if (this.checkDeviceByHash("firetv") ) {
            this.activeDeviceFactory = new FireTVDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        }
        if (this.checkDeviceByHash("development") ||
            this.checkDeviceByUserAgent("Chrome", false) ||
            this.checkDeviceByUserAgent("Firefox", false)) {
            this.activeDeviceFactory = new DevelopmentDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        }
        if (params.fallback == "samsung") {
          this.activeDeviceFactory = new SamsungDeviceFactory(this.info);
          return this.activeDeviceFactory.createDevice();
        }
        if (params.fallback == "philips") {
          this.activeDeviceFactory = new PhilipsDeviceFactory(this.info);
          return this.activeDeviceFactory.createDevice();
        }
        if (this.checkDeviceByHash("technisat")) {
            this.activeDeviceFactory = new TechnisatDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        }
        if (params.fallback == "cehtml") {
          this.info.vendor = VENDOR.CEHTML;
          return new CEhtmlDevice( this.info );
        }
        if (params.fallback == "html5") {
          this.info.vendor = VENDOR.HTML5;
          return new Html5Device( this.info );
        }
        return new Device( this.info );
    }

});
