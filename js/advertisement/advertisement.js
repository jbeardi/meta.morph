var Advertisement = klass({

  initialize: function() {
    this.trackings = [];
    this.percentTrackings = [];
    this.videos = [];
    this.duration = 0;
    this.wrapperUrl = null;
    this.imageCache = [];
    this.fallback = false;
  },

  getTrackingsForName: function(name) {
    var matching = [];
    _.each(this.trackings, function(entry) {
      if (entry.key == name) {
        matching.push(entry.url);
      }
    });
    return matching;
  },

  appendTrackingForName: function(track, url) {
    if (url != null && url.length > 0) {
      this.trackings.push({
        key: track,
        url: url
      });
    }
  },

  sendTrackingsByName: function(name) {
    var self = this;
    var matching = [];
    _.each(this.trackings, function(entry, index) {
      if (entry.key == name) {
        self.sendTrackByUrl(entry.url);
        delete self.trackings[index];
      }
    });
    return matching;
  },

  appendTrackingForPercent: function(percent, url) {
    if (this.percentTrackings[percent] == null) {
      this.percentTrackings[percent] = [];
    }

    this.percentTrackings[percent].push(url);
  },

  getTrackingsForPercent: function(percent) {
    var trackings = this.percentTrackings[percent];
    if (trackings == undefined || trackings == null) {
      trackings = [];
    }
    return trackings;
  },

  sendTrackingsByPercent: function(percent) {
    var self = this;
    var pending = this.getPendingTrackings(percent);
    _.each(pending, function(value, key) {
      _.each(value.urls, function(url) {
        self.sendTrackByUrl(url);
      });
      self.removePercentTrackings([value.percent]);
    });
  },

  getPendingTrackings: function(percent) {
    var result = [];
		_.each(this.percentTrackings, function(value, key) {
      if (key <= percent && value != null && value != undefined) {
        result.push({
          percent: key,
          urls: value
        });
      }
    });
    return result;
  },

  removePercentTrackings: function(percents) {
    var self = this;
    _.each(percents, function(percent) {
      self.percentTrackings[percent] = null;
    });
  },

  sendTrackByUrl: function(url) {
    var image = document.createElement("img");
    image.src = url;
    if (this.imageCache.push(image) > 30) {
      this.imageCache.shift();
    }
  },

  getVideoUrl: function() {
    // Das hier ist eine möglichst dumme
    // implementierung. Man könnte das noch ändern in etwas,
    // das erst nach Bitraten sortiert und dann die beste
    // Bitrate und/oder bestes Auslieferungsformat sortiert.
    // Das wird aber erst notwendig, wenn es Vermarkter gibt,
    // die mehr als einen Videostream in der Ad mitschicken.
    if (this.videos.length > 0) {
      return this.videos[0].url;
    }
    return null;
  },

  isEmpty: function() {
    return (this.duration == 1) || (this.videos.length == 0);
  }
  
});
