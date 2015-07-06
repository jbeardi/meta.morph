var FireTVIO = CookieIO.extend({
  // SAVE
  save: function(suc, err) {
    this.supr(function() {
  		//signal the wrapper app to sync cookies (from RAM to persistan memory)
  		window.fireTV && window.fireTV.syncCookies && window.fireTV.syncCookies();
  		suc && suc();
  	}, err);
  }
});
