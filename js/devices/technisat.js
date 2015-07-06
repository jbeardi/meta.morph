/*
 * TechniSat Device Factory Class
 */
var TechnisatDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.TECHNISAT;
    },
    createDevice: function(){
        this.setupTechnisat();
        return this.onDeviceCreation(new CEhtmlDevice(this.info));
    },
    setupTechnisat: function(){
        CEhtmlDevice = CEhtmlDevice.extend({
            exit: function() {
                // there should be a redirect to ISIO live Portal-URL
            }
        });
    }
});
