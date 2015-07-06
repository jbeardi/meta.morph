/**
 * This class handles Ads and Videos. It
 * has a basic playlist functionality and is
 * 100% tested with Buster.
 *
 * To use it just create a new AdController like
 * this:
 *
 * var playlist = new AdController([
 *   {adUrl: "http://vastheaven.com/vast2_preroll.xml"},
 *   {videoUrl: "http://video.cdn.com/monkeyballs.mp4"},
 *   {adUrl: "http://vastheaven.com/vast2_preroll.xml"},
 * ]);
 *
 * And then try to get the next Video with
 * playlist.getNextVideo(function(video) {
 *    console.log("Next Video URL is : " + video.url);
 * });
 *
 * The callback will get a null object if there is no
 * video left in the playlist.
 *
 * The AdUrl must be a JsonP able URL.
 */

function jsonp_callback(result) {
  if (window.adCallback) {
    window.adCallback(result);
  }
};

var AdController = klass({

  initialize: function(videos) {
    this.videos = videos;
    this.currentPosition = 0;
    this.duration = 0;
    this.currentAd = null;
    this.skipAd = false;
  },

  getNextVideo: function(callback) {
    var self = this;
    this.currentAd = null;

    if (this.currentPosition >= this.videos.length) {
      callback(null);
    } else {
      var current = this.videos[this.currentPosition];
      this.currentPosition += 1;

      if (current == null) {
        callback(null);
      } else if (current.adUrl != null) {
        this.loadAd(current.adUrl, function(ad) {
        	if( ad ) {
        		if( !ad.isEmpty() ) {
        			self.currentAd = ad;
            	callback({url: ad.getVideoUrl(), type: "ad", ad: ad});
           	} else {
           		// SEND iMPRESSiONS WHEN AD HAS NO ViDEO AND iS 'FALLBACK'
        			if( ad.fallback ) {
          			ad.sendTrackingsByPercent(0);
          		}
            	self.getNextVideo(callback);
        		}
        	} else {
        		self.getNextVideo(callback);
        	}
        });
      } else if (current.videoUrl != null) {
        callback({url: current.videoUrl, type: "video"});
      } else {
        callback(null);
      }
    }
  },

  cancelAd: function() {
    this.currentAd = null;
  },

  updatePlayTime: function(time) {
    this.currentTime = time;
    this.sendTrackings();
  },

  videoFinished: function() {
    this.updatePlayTime(this.duration);
  },

  setDuration: function(duration) {
    this.duration = duration;
  },

  sendTrackingsForName: function(name) {
    if (this.currentAd != null) {
      this.currentAd.sendTrackingsByName(name);
    }
  },

  sendTrackings: function() {
    if (this.currentAd != null) {
      var percent = this.currentTime / (this.duration / 100);
      // Sicherheitshalber schon bei 95% "vollzug" melden,
      // da es bei einigen TV Herstellern rundungsungsprobleme
      // gibt
      if (percent > 95) {
        percent = 100;
      }
      this.currentAd.sendTrackingsByPercent(percent);
    }
  },

  loadAd: function(url, callback, ad) {
    if (this.skipAd || url == null || url == undefined || url.length == 0) {
      callback(new Advertisement());
    } else {
      var self = this;
      // Wenn nach 2 sek nix kommt, alles
      // abbrechen
      var timeoutSend = false;
      var timer = setTimeout(function() {
        timeoutSend = true;
        self.jsonpCallback(null, callback, ad);
      }, 2000);
      window.adCallback = function(data) {
        clearTimeout(timer);
        // Wenn der Timeout noch nicht gesendet
        // worden ist, die Daten parsen
        if (!timeoutSend) {
          window.adCallback = null;
          self.jsonpCallback(data, callback, ad);
        }
      };
      this.adCallback = window.adCallback;
      $.ajax({
        dataType: 'jsonp',
        jsonp: false,
        cache: true, // cache buster parameter not needed, ASMI and Smartclip have their own
        url: url,
        crossDomain: true,
      });
    }
  },

  jsonpCallback: function(data, callback, ad) {
    var ad = this.parseJsonpResult(data, ad);
    if (ad.wrapperUrl != null && ad.wrapperUrl.length > 0) {
      var url = ad.wrapperUrl;
      ad.wrapperUrl = null;
      this.loadAd(url, callback, ad);
    } else {
      callback(ad);
    }
  },

  parseJsonpResult: function(data, ad) {
    try {
      var responseDoc = new DOMParser().parseFromString(data["contents"], 'text/xml');
      var parser = ParserFactory.getParser(responseDoc.firstChild, ad);
      return parser.parse(responseDoc.firstChild);
    } catch(e) {
      return new Advertisement();
    }
  }

});
