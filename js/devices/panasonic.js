/*
 * Panasonic Device Factory Class
 */
var PanasonicDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.PANASONIC;
    },
    createDevice: function(){
        this.setupPanasonic();
        return this.onDeviceCreation(new Html5Device(this.info));
    },
    setupPanasonic: function(){
        Html5Device = Html5Device.extend({
            initialize: function(_info){
                this.pingURL = _info.params.pingURL || '';
                this.supr(_info);
            },
            createKeyHandler: function(){
                this.keyHandler = new PanasonicKeyHandler();
                return this.keyHandler;
            },
            // creates a device depended way to notify platform that the app is ready to use
            ready: function(){
                Logger.log("PanasonicDevice.ready");
                this.startCheckingConnectivity();
            },
            setPingURL: function(_url){
                this.pingURL = _url;
            },
            exit: function(){
                window.close();
            },
            startCheckingConnectivity: function(){
                if (this.pingURL == '') {
                    Logger.log('WARNING: Please set up ping URL with setPingURL(_url) for connectivity check!');
                } else {
                    var that = this;
                    this._netCableConInterval = setInterval(function() {
                        $.ajax({
                            type : "GET",
                            timeout : 5000,
                            url : that.pingURL+'?'+Math.floor(Math.random(10)*100000),
                            success : function(msg) {
                                if (!that.isConnected) {
                                    that.isConnected = true;
                                    that.trigger('connection:reestablished', that );
                                }
                                result = true;
                            },
                            error : function(jqXHr, textStatus, errorThrown) {
                                if (that.isConnected) {
                                    that.isConnected = false;
                                    that.trigger('connection:lost', that );
                                }
                                result = false;
                            },
                            async:true
                        });
                    }, 4000);
                }
            }
        });
    }
});
