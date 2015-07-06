/*
 * LG Device Factory Class
 */
var LGDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.LG;
    },
    createDevice: function(){
        if (this.checkDeviceByUserAgent("Web0S", false)) {
            this.info.version = "webos";
        } else if (this.checkDeviceByUserAgent("LG NetCast.TV-2011", false) || this.checkDeviceByUserAgent("LG NetCast.Media-2011", false)) {
            this.info.version = "2.0";
        } else if (this.checkDeviceByUserAgent("LG NetCast.TV-2012", false) || this.checkDeviceByUserAgent("LG NetCast.Media-2012", false)) {
            this.info.version = "3.0";
        } else if (this.checkDeviceByUserAgent("LG NetCast.TV-2013", false) || this.checkDeviceByUserAgent("LG NetCast.Media-2013", false)) {
            this.info.version = "4.0";
        }
        switch (this.info.version) {
            case 'webos' :
                this.info.type = DEVICE_TYPE.TV;
                this.setupLGWebOS();
                return this.onDeviceCreation(new Html5Device(this.info));
                break;
            default:
                if (this.checkDeviceByUserAgent("LG NetCast.TV", false) && !(this.checkDeviceByUserAgent("LG NetCast.TV-2012", false) && this.checkDeviceByUserAgent("SP820", false))) {
                    this.info.type = DEVICE_TYPE.TV;
                } else {
                    this.info.type = DEVICE_TYPE.BDP;
                }
                this.setupLG();
                return this.onDeviceCreation(new CEhtmlDevice(this.info));
        }
    },
    setupLG: function(){
        CEhtmlDevice = CEhtmlDevice.extend({
            createKeyHandler: function(){
                this.keyHandler = new LGKeyHandler();
                return this.keyHandler;
            },
            exit: function(){
                if (window.NetCastBack)
                    window.NetCastBack();
            },
            addDeviceDetailsCSSClasses: function(){
                var model_year = this.info.userAgent.replace(/^.*LG\sNetCast\.(TV|Media)-(20[1-9][1-9]).*$/g, '$2');
                $("#WidgetBody").addClass("year"+model_year);
            },
            // get a string with details on the device, to use in tracking for example
            // this is method is there for coninience
            getDeviceDetails: function(){
                return (this.info.type === '' ? NOT_AVAILABLE : this.info.type)+"_"+ this.info.userAgent.replace(/^.*LG\sNetCast\.(TV|Media)-(20[1-9][1-9]).*$/g, '$2');
            },
            // get a string with details on the device, to use in tracking for example
            // this is method is there for coninience
            getDeviceFirmwareDetails: function(){
                try {
                    var lg_device = document.getElementById("device");

                    var deviceVersion = lg_device.version;
                    var swVersion = lg_device.swVersion;
                    var modelName = lg_device.modelName;
                    var hwVersion = lg_device.hwVersion;
                    var deviceInfo = deviceVersion + '<br/>' + hwVersion +'<br/>'+ swVersion +'<br/>'+modelName;
                    Logger.log("firmware LG: " + deviceInfo);

                    return swVersion+'_'+modelName;
                } catch (e) {
                    Logger.log("ERROR LG Firmware: " + e);
                    return '';
                }
            },
            getFeatures: function() {
              return new PointerFeatures(this);
            },
            getLanguage: function(_fallback) {
              Logger.log("LGDevice.getLanguage:");
              var language = null;
              try {
                var lgdevice = document.getElementById("device");
                if(lgdevice){
                  language = lgdevice.tvLanguage2.split("-")[0];
                }
              }
              catch(e){}

              if(language){
                Logger.log("LGDevice.getLanguage: "+language);
                return language;
              }
              else{
                return this.supr(_fallback);
              }
            }
        });
    },
    setupLGWebOS: function(){
        Html5Device = Html5Device.extend({
            getFeatures: function() {
              return new PointerFeatures(this);
            },
            addDeviceDetailsCSSClasses: function(){
                $("#WidgetBody").addClass("webos");
            }
        });
    }
});
