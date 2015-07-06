/*
 * Samsung Device Factory Class
 */
var SamsungDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        Logger.log("SamsungDeviceFactory");
        this.info = _info;
        this.info.technology = TECHNOLOGY.PROP;
        this.info.vendor = VENDOR.SAMSUNG;
        if ((/^.*Tizen.*$/).test(this.info.userAgent)) {
        	this.info.platform = PLATFORM.TIZEN;
        } else {
        	this.detectProductType();
        }
    },
    createDevice: function(){
    	switch (this.info.platform) {
            case PLATFORM.TIZEN :
                return this.onDeviceCreation(new SamsungTizenDevice(this.info));
            default  :
                return this.onDeviceCreation(new SamsungDevice(this.info));
        }
    },
    detectProductType: function() {
        var productId = this.info.windowLocation.replace(/^.*product=(\d).*$/, "$1");
        switch (productId) {
            case '0' :
                this.info.type = DEVICE_TYPE.TV;
                break;
            case '2' :
                this.info.type = DEVICE_TYPE.BDP;
                break;
            default  :
                break;
        }
    }
});

/*
 * Samsung Device Class
 */
var SamsungDevice = Device.extend({
    widgetAPI: null,
    pluginAPI: null,
    tvKey: null,
    NNaviPlugin: null,
    NetworkPlugin: null,
    exitKeyCallback : null,
    initialize: function(_info) {
        _info.technology = TECHNOLOGY.PROP;
        Device.prototype.initialize.call(this,_info);
        this.widgetAPI = new Common.API.Widget();
        this.pluginAPI = new Common.API.Plugin();
        this.tvKey = new Common.API.TVKeyValue();
        this.NetworkPlugin = document.getElementById('pluginObjectNetwork');

        window.onShow = Util.bind(this,function () {              // register the onshow event callback
            Logger.log("samsung onshow");

            this.NNaviPlugin = document.getElementById('pluginObjectNNavi');
            this.NNaviPlugin.SetBannerState(1);

            this.pluginAPI.unregistKey(this.tvKey.KEY_VOL_UP);
            this.pluginAPI.unregistKey(this.tvKey.KEY_VOL_DOWN);
            this.pluginAPI.unregistKey(this.tvKey.KEY_MUTE);
            
            // turning off screen saver:
            if (this.pluginAPI.setOffScreenSaver)
                this.pluginAPI.setOffScreenSaver();
            if (this.pluginAPI.setOffIdleEvent)
                this.pluginAPI.setOffIdleEvent();

            if (this.getTVVersion() >= 2012) {
                this.pluginAPI.unregistKey(this.tvKey.KEY_WLINK);
                this.pluginAPI.unregistKey(this.tvKey.KEY_CONTENT);
            }
            this.addDeviceDetailsCSSClasses();
        });
        if ( this.isEmulator())
            this.initLogger();
        window.onunload = Util.bind(this,function () {              // register the onunload event callback
            this.player.doStop();
        });
    },
    initLogger: function() {
        if ( this.isEmulator()) {
            Logger.setup(false, false, true);
        } else {
            Logger.setup(true, false, false);
            Logger.show();
        }
    },
    // adds device specific CSS classes to App's body
    addDeviceDetailsCSSClasses: function() {

        var tv_version = this.getTVVersion();
        if (tv_version < 2012) {
            $("#WidgetBody").addClass("maple");
        }
        else{
            $("#WidgetBody").addClass("webkit");
        }
        $("#WidgetBody").addClass("year"+tv_version);

    },
    // creates a device depended key handler
    createKeyHandler: function(){
        this.keyHandler = new SamsungKeyHandler();
        this.keyHandler.on('ExitKey', this.exitOnExitKey, this);
        return this.keyHandler;
    },
    // creates a device depended player
    createPlayer: function(){
        this.player = new SamsungPlayer();
        return this.player;
    },
    // creates a device depended way to exit the app
    exit: function(){
        Logger.log("SamsungDevice.exit: ");
        this.widgetAPI.sendReturnEvent();
    },
    // special exit on Samsung: exit key sends exit event
    exitOnExitKey: function(){
        Logger.log("SamsungDevice.exitOnExitKey: ");
        if (typeof this.exitKeyCallback == 'function') {
            this.exitKeyCallback();
        } else {
            this.widgetAPI.sendExitEvent();
        }
    },
    // sets an alternative callback function for exitOnExitKey() to override it in-app
    setExitKeyCallback: function(_cb){
        Logger.log("SamsungDevice.setExitKeyCallback: ");
        if (typeof _cb == 'function')
            this.exitKeyCallback = _cb;
    },
    // creates a device depended way to notify platform that the app is ready to use
    ready: function(){
        Logger.log("SamsungDevice.ready");
        this.widgetAPI.sendReadyEvent();
        // turning off screen saver:
        if (this.pluginAPI.setOffScreenSaver)
            this.pluginAPI.setOffScreenSaver();
        if (this.pluginAPI.setOffIdleEvent)
            this.pluginAPI.setOffIdleEvent();
        this.startCheckingConnectivity();
    },
    getTVVersion: function(){
        try {
           var firmware = this.NNaviPlugin.GetFirmware();
           Logger.log("firmware " + firmware + " " + firmware.substring(10, 14));
           var year_integer = parseInt(firmware.substring(10, 14), 10);
           return year_integer;

        } catch (e) {
            Logger.log("Exception(Firmware Check) : " + e);
            return 0;
        }
    },
    getFirmwareVersion: function(){
        try {
            /*var smartHubVersion = '';
            try{
                smartHubVersion = "_"+deviceapis.tv.info.getVersion();
                Logger.log("firmware smartHubVersion: " + smartHubVersion);
            }catch(e){
                smartHubVersion = '';
                Logger.log("firmware Samsung ERROR SmartHub Version: "+e);
            };*/

            var firmware = this.NNaviPlugin.GetFirmware();

            Logger.log("firmware complete: " + firmware);

            var firmware2 = this.NNaviPlugin.GetSystemVersion(PL_NNAVI_SYSTEM_VERSION_LEEUM);
            Logger.log("firmware LEEUM: " + firmware2);
            var firmware3 = this.NNaviPlugin.GetSystemVersion(PL_NNAVI_SYSTEM_VERSION_COMP);
            Logger.log("firmware COMP: " + firmware3);
            firmware = firmware.substring(15);
            Logger.log("firmware SamS substring: " + firmware);

            return firmware;
        } catch (e) {
            Logger.log("ERROR Samsung Firmware: " + e);
            return '';
        }
    },
    getAbsolutePath : function(linkString) {
        var Abs_path = "";
        var rootPath = window.location.href.substring(0, location.href.lastIndexOf("/")+1);
        // For 2012, 2013 platform
        if (unescape(window.location.toString()).indexOf("localhost") == -1) {
            if (unescape(window.location.toString()).indexOf("file://C") != -1) {
                // For PC-SDK
                Abs_path = unescape(rootPath).split("file://")[1].replace("C/","C:/") + linkString;
            } else if (unescape(window.location.toString()).indexOf("file://c") != -1) {
                // For PC-SDK
                Abs_path = unescape(rootPath).split("file://")[1].replace("c/","C:/") + linkString;
            } else {
                // For Real-Device
                Abs_path = unescape(rootPath).split("file://")[1]+linkString;
            }
        // For 2010, 2011 platform
        } else {
            if (unescape(window.location.toString()).indexOf("C:") != -1) {
                // For PC-SDK
                Abs_path = "/" + unescape(rootPath).split("file://localhost/C:\\")[1].replace(/\\/g,"/") + linkString;
            } else {
                // For Real-Device
                Abs_path = "/" + unescape(rootPath).split("file://localhost/")[1] + linkString;
            }
        }
        return Abs_path;
    },
    isEmulator : function() {
        var Abs_path = "";
        var rootPath = window.location.href.substring(0, location.href.lastIndexOf("/") + 1);
        // For 2012, 2013 platform
        if (unescape(window.location.toString()).indexOf("localhost") == -1) {
            if (unescape(window.location.toString()).indexOf("file://C") != -1 || unescape(window.location.toString()).indexOf("file://c") != -1) {
                // For PC-SDK
                return true;
            } else {
                // For Real-Device
                return false;
            }
            // For 2010, 2011 platform
        } else {
            if (unescape(window.location.toString()).indexOf("C:") != -1) {
                // For PC-SDK
                return true;
            } else {
                // For Real-Device
                return false;
            }
        }
        return false;
    },
    getIO: function(o) {
      return new SamsungIO(o);
    },
    startCheckingConnectivity: function() {
        var that = this;
        this._netCableConInterval = setInterval(function() {
            if ( that.NetworkPlugin.CheckPhysicalConnection(1) == 1 || that.NetworkPlugin.CheckPhysicalConnection(0) == 1 ) {
                //Cable is ok
                if (!that.isConnected) {
                    that.isConnected = true;
                    that.trigger('connection:reestablished', that );
                }
            } else {
                //Cable is disconnected
                if (that.isConnected) {
                    that.isConnected = false;
                    that.trigger('connection:lost', that );
                }
            }
        }, 4000);
    },

    checkNetwork: function() {
      // this Code is copied from here:
      // http://samsungdforum.com/Guide/tec00128/index.html
      var physicalConnection = 0,
      httpStatus = 0;

      // Get active connection type - wired or wireless.
      currentInterface = networkPlugin.GetActiveType();

      // If no active connection.
      if (currentInterface === -1) {
        return false;
      }

      // Check physical connection of current interface.
      physicalConnection = networkPlugin.CheckPhysicalConnection(currentInterface);

      // If not connected or error.
      if (physicalConnection !== 1) {
        return false;
      }

      // Check HTTP transport.
      httpStatus = networkPlugin.CheckHTTP(currentInterface);

      // If HTTP is not avaliable.
      if (httpStatus !== 1) {
        return false;
      }

      // Everything went OK.
      return true;
    },
    // a class for special features like screensaver and so on...
    getFeatures: function() {
      return new SamsungFeatures(this);
    },
    // get a string with details on the device, to use in tracking for example
    // this is method is there for coninience
    getDeviceDetails: function() {
      return (this.info.type === '' ? NOT_AVAILABLE : this.info.type)+"_"+this.getTVVersion();
    },
    // get a string with details on the device, to use in tracking for example
    // this is method is there for coninience
    getDeviceFirmwareDetails: function() {
      var firmware =  this.getFirmwareVersion();
      return (firmware === '' ? NOT_AVAILABLE : firmware);
    },
    getLanguage: function(_fallback) {
        Logger.log("SamsungDevice.getLanguage");
        var language = null;
        try{
            var str = window.location.search;
            var returnVar = [];
            var results = str.split('&');
            for(i=0; i < results.length; i++){
                var result = results[i].split('=');
                returnVar[i] = {vars : result[0], values : result[1]};
                if( result[0] == "lang") {
                    language = result[1].split("-")[0];
                    break;
                }
            }
        }
        catch(e){}

        if(language){
            Logger.log("SamsungDevice.getLanguage: "+language);
            return language;
        }
        else{
            return this.supr(_fallback);
        }
    }
});

/*
 * Samsung Tizen Device Class
 */
var SamsungTizenDevice = Device.extend({

    initialize: function(_info) {
        _info.technology = TECHNOLOGY.PROP;
        Device.prototype.initialize.call(this,_info);
		this.addDeviceDetailsCSSClasses();
    },
    initLogger: function() {
        Logger.setup(false, true, false);
    },
    // adds device specific CSS classes to App's body
    addDeviceDetailsCSSClasses: function() {
        $("#WidgetBody").addClass("tizen");
    },
    // creates a device depended key handler
    createKeyHandler: function(){
        this.keyHandler = new SamsungTizenKeyHandler();
        return this.keyHandler;
    },
    // creates a device depended player
    createPlayer: function(){
        this.player = new SamsungTizenPlayer();
        return this.player;
    },
    // creates a device depended way to exit the app
    exit: function(){
        Logger.log("SamsungTizenDevice.exit: ");
        tizen.application.getCurrentApplication().exit();
    },
    // creates a device depended way to notify platform that the app is ready to use
    ready: function(){
        Logger.log("SamsungTizenDevice.ready");
        //this.startCheckingConnectivity();
    },
    getIO: function(o) {
      return new SamsungTizenIO(o);
    },
    /*
    startCheckingConnectivity: function() {
        var that = this;
        this._netCableConInterval = setInterval(function() {
            if ( that.NetworkPlugin.CheckPhysicalConnection(1) == 1 || that.NetworkPlugin.CheckPhysicalConnection(0) == 1 ) {
                //Cable is ok
                if (!that.isConnected) {
                    that.isConnected = true;
                    that.trigger('connection:reestablished', that );
                }
            } else {
                //Cable is disconnected
                if (that.isConnected) {
                    that.isConnected = false;
                    that.trigger('connection:lost', that );
                }
            }
        }, 4000);
    },
	*/
	/*
    checkNetwork: function() {
      // this Code is copied from here:
      // http://samsungdforum.com/Guide/tec00128/index.html
      var physicalConnection = 0,
      httpStatus = 0;

      // Get active connection type - wired or wireless.
      currentInterface = networkPlugin.GetActiveType();

      // If no active connection.
      if (currentInterface === -1) {
        return false;
      }

      // Check physical connection of current interface.
      physicalConnection = networkPlugin.CheckPhysicalConnection(currentInterface);

      // If not connected or error.
      if (physicalConnection !== 1) {
        return false;
      }

      // Check HTTP transport.
      httpStatus = networkPlugin.CheckHTTP(currentInterface);

      // If HTTP is not avaliable.
      if (httpStatus !== 1) {
        return false;
      }

      // Everything went OK.
      return true;
    },
    */
    getTVVersion: function(){
    	return 2015;
    },
    // a class for special features like screensaver and so on...
    getFeatures: function() {
      return new SamsungTizenFeatures(this);
    },
    // get a string with details on the device, to use in tracking for example
    // this is method is there for coninience
    getDeviceDetails: function() {
      return (this.info.type === '' ? NOT_AVAILABLE : this.info.type)+"_tizen";
    },
    // get a string with details on the device, to use in tracking for example
    // this is method is there for coninience
    getDeviceFirmwareDetails: function() {
      return NOT_AVAILABLE;
    }
});

