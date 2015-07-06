/*
 * Device Class
 */
var Device = klass({
    info: {},
    isConnected: true,
    preloadedImages: {},
    player: null,
    keyHandler: null,
    cssAnimation: false,
    cssTransition: false,

    initialize: function(_info) {
        _.extend(this, Backbone.Events);
        this.info = _info;
        this.info.vendor = _info.vendor || '';
        this.info.technology = _info.technology || '';
        this.info.type = _info.type || '';
        this.info.width = _info.width || 1280;
        this.info.height = _info.height || 720;
        this.info.confirmAppExit = _info.confirmAppExit || false;
        this.info.version = _info.version || '';
        this.addCSSclasses();
        this.cssAnimation = this.determineCSSCapabilities('animation');
        this.cssTransition = this.determineCSSCapabilities('transition');
    },
    // inserts HTML, expects an Ender object
    html: function(eObj, h) {
        Util.html(eObj[0], h);
    },
    // appends HTML, expects an Ender object
    append: function(eObj, h) {
        Util.append(eObj[0], h, false);
    },
    // adds device specific CSS classes to App's body
    addCSSclasses: function() {
        if (this.info.vendor !== '') {
            $("#WidgetBody").addClass(this.info.vendor);
        }
        if (this.info.technology !== '') {
            $("#WidgetBody").addClass(this.info.technology);
        }
    },
    // creates a device depended key handler
    createKeyHandler: function(){
        this.keyHandler = new KeyHandler();
        return this.keyHandler;
    },
    // creates a device depended player
    createPlayer: function(){
        this.player = new Player(this.info);
        return this.player;
    },
    // creates a device depended way to exit the app
    exit: function(){
        Logger.log("Device.exit");
    },
    // creates a device depended way to notify platform that the app is ready to use
    ready: function(){
        Logger.log("Device.ready");
    },
    initLogger: function() {
       Logger.setup(false, true, false);
    },
    logger: function() {
      return Logger;
    },
    getIO: function(o) {
      return new CookieIO(o);
    },
    // creates a device depended way to notify platform that the connectivity is lost or re-established
    startCheckingConnectivity: function() {
        Logger.log("Device.startCheckingConnectivity");
    },
    // provides function to preload images. expects all image URLs as an array
    preloadImages: function(_aURL) {
        Util.preloadImages(_aURL, this.preloadedImages);
    },
    // a class for special features like screensaver and so on...
    getFeatures: function() {
      return new DefaultFeatures();
    },
    // get a string with details on the device, to use in tracking for example
    // this is method is there for coninience
    getDeviceDetails: function() {
      return (this.info.type === '' ? NOT_AVAILABLE : this.info.type)+"_"+(this.info.version === '' ? NOT_AVAILABLE : this.info.version);
    },
    // get a string with details on the device, to use in tracking for example
    // this is method is there for coninience
    getDeviceFirmwareDetails: function() {
      return NOT_AVAILABLE;
    },
    //   to determine language
    // if no language can be determined, the _fallback parameter will be returned, otherwise it will be null
    // overriding this method should behave in the same way (by calling super for example)
    // OPTIMIZE: Discuss: maybe this should return english 'en' (English) as default ?
    getLanguage: function(_fallback) {
        Logger.log("Device.getLanguage");
        var language = null;
        try{
            language = navigator.language ? navigator.language.split("-")[0] : language;
        }
        catch(e){}

        if(!language){
            language = _fallback ? _fallback : language;
        }
        Logger.log("Device.getLanguage: "+language);
        return language;
    },
    determineCSSCapabilities: function(featurename) {
        var feature = false,
        result = false,
        domPrefixes = 'Webkit Moz ms O Khtml'.split(' '),
        elm = document.createElement('div'),
        featurenameCapital = null;

        featurename = featurename.toLowerCase();

        if( elm.style[featurename] ) { feature = true; }

        if( feature === false ) {
            featurenameCapital = featurename.charAt(0).toUpperCase() + featurename.substr(1);
            for( var i = 0; i < domPrefixes.length; i++ ) {
                if( elm.style[domPrefixes[i] + featurenameCapital ] !== undefined ) {
                    feature = true;
                    pfx = domPrefixes[ i ];
                    result = {
                       prefix: pfx.toLowerCase(),
                       feature: pfx.toLowerCase() + featurenameCapital,
                       keyframeprefix: '-' + pfx.toLowerCase() + '-'
                    };
                    break;
                }
            }
        }
        return result;
    },
    canAnimateCSS: function() {
        return this.cssAnimation !== false;
    },
    canTransitionCSS: function() {
        return this.cssTransition !== false;
    },
    checkByHash : function(_stringToMatch) {
        return Util.match(this.hash, _stringToMatch, true);
    },
    checkByUserAgent: function(_stringToMatch, _caseInsensitive, _useRegex) {
        return Util.match(this.info.userAgent, _stringToMatch, _caseInsensitive, _useRegex);
    },
    checkByHashAndUserAgent : function(_stringToMatch, _caseInsensitive) {
        return (this.checkDeviceByHash(_stringToMatch) && this.checkDeviceByUserAgent(_stringToMatch, _caseInsensitive));
    }
});
