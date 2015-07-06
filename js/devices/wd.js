/*
 * Western Digital Device Class
 */
var WdDevice = Html5Device.extend({
    initialize: function(_info) {
        this.supr(_info);
    },
    // creates a device depended key handler
    createKeyHandler: function(){
        this.keyHandler = new WdKeyHandler(this.info);
        return this.keyHandler;
    },
    // creates a device depended way to exit the app
    exit: function(){
      if( deviceInfo && typeof deviceInfo.exitBrowser === 'function') {
        deviceInfo.exitBrowser();
      }
    }
});
