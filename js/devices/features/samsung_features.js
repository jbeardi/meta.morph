var SamsungFeatures = DefaultFeatures.extend({

  initialize: function(device) {
    this.device = device;
  },

  hasFeature: function(feature) {
    return (feature == "screen_saver" || feature == "pointer_support");
  },

  enableScreenSaver: function(enabled) {
    if (enabled) {
      this.device.pluginAPI.setOnScreenSaver();
    } else {
      this.device.pluginAPI.setOffScreenSaver();
    }
  }

});

var SamsungTizenFeatures = DefaultFeatures.extend({

  initialize: function(device) {
    this.device = device;
  },

  hasFeature: function(feature) {
    return (feature == "pointer_support");
  }
});
