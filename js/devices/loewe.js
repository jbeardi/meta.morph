/*
 * Loewe Device Factory Class
 */
var LoeweDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.LOEWE;
        this.info.useVideoSourceObject = true;
    },
    createDevice: function(){
        this.setupLoewe();
        return this.onDeviceCreation(new Html5Device(this.info));
    },
    setupLoewe: function(){
        Html5Device = Html5Device.extend({
            exit: function(){
                window.close();
            }
        });
    }
});
