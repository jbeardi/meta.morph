/*
 * Device Factory Class
 */
var DeviceFactory = klass({
    info: {},
    initialize: function(){
        // must be implemented from extending class
    },
    checkDeviceByHash : function(_stringToMatch) {
        return Util.match(this.info.hash, _stringToMatch, true);
    },
    checkDeviceByUserAgent: function(_stringToMatch, _caseInsensitive, _useRegex) {
        return Util.match(this.info.userAgent, _stringToMatch, _caseInsensitive, _useRegex);
    },
    checkDeviceByHashAndUserAgent : function(_stringToMatch, _caseInsensitive) {
        return (this.checkDeviceByHash(_stringToMatch) && this.checkDeviceByUserAgent(_stringToMatch, _caseInsensitive));
    },
    // general hookup on device creation. override in app implementation in order
    // to set up device/vendor specific elements. MUST be the only way to do these things!!!
    onDeviceCreation: function(_device) {
        return _device;
    },
    createDevice: function(params){
        // must be implemented from extending class
    }
});
