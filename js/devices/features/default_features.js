/*
 * This class is a dummy feature class that basically
 * says this device has no special features. Special
 * features could be: 
 * - screensaver
 * - special input devices (e.g. kinect devices)
 */
var DefaultFeatures = klass({

  hasFeature: function(feature) {
    return false;
  }

});
