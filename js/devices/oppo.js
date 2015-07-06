/*
 * Oppo Device Factory Class
 */
var OppoDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.OPPO;
        this.info.type = DEVICE_TYPE.BDP;
    },
    createDevice: function(){
        this.setupOppo();
        return this.onDeviceCreation(new Html5Device(this.info));
    },
    setupOppo: function(){
        Html5Device = Html5Device.extend({
            createKeyHandler: function(){
                this.keyHandler = new OppoKeyHandler();
                return this.keyHandler;
            }
        });
    }
});
