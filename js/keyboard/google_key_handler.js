var GoogleTVKeyHandler = HTMLKeyHandler.extend({
  initialize: function(){
    this.mapKeys(TVKeyValueGoogleTV);
    this.supr();
  },
});
