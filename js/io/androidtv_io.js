var AndroidTVIO = CookieIO.extend({
  // SAVE
  save: function(suc, err) {
    this.supr(function() {
  		//signal the wrapper app to sync cookies (from RAM to persistan memory)
  		window.androidTVWrapper && window.androidTVWrapper.syncCookies && window.androidTVWrapper.syncCookies();
  		suc && suc();
  	}, err);
  }
});
