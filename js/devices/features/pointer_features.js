var PointerFeatures = DefaultFeatures.extend({

  initialize: function(device) {
    this.device = device;
  },

  hasFeature: function(feature) {
    return (feature == "pointer_support");
  }

});
