var Vast2Parser = AdParser.extend({}).methods({

  parse: function() {
    var wrapper = this.getElementByPath(this.dom, "Ad/Wrapper");
    var inline = this.getElementByPath(this.dom, "Ad/InLine");

    if (inline !== null && inline.length > 0) {
      this.parseInline(inline);
		} else if (wrapper !== null && wrapper.length > 0) {
      this.parseWrapper(wrapper);
    }
    return this.ad;
  },

  parseInline: function(dom) {
  	/* <Extensions>
     * 	<Extension type="dfp">
     * 		<AdServingData>
     * 			<Industry></Industry>
     * 		</AdServingData>
     * 		<Fallback>true</Fallback>
     * 	</Extension>
     * </Extensions>
     */
    var fallback = this.getElementByPath(dom, "Extensions/Extension/Fallback");
    
    if( fallback !== null && 
    		fallback.length > 0 && 
    		this.getText(fallback.item(0)) == 'true' ) 
    {
    	// 'FALLBACK' ADVERTiSMENT (iMPRESSiONS TRACKiNG ONLY, NO ViDEOS) 
			this.ad.fallback = true;
			this.addImpressions(dom);
    } else {
    	// 'REAL' ADVERTiSMENT
    	this.addVideosToAd(dom);
    	this.addTrackingToAd(dom);
    }
  },

  parseWrapper: function(dom) {
    this.addTrackingToAd(dom);
    var wrapperUrl = this.getElementByPath(dom, "VASTAdTagURI");
    if (wrapperUrl !== null && wrapperUrl.length > 0) {
      this.ad.wrapperUrl = this.getText(wrapperUrl[0]);
    }
  },

	addImpressions: function(dom) {
		var impressions = this.getElementByPath(dom, "Impression");
    if (impressions !== null && impressions.length > 0) {
      for (var i = 0; i < impressions.length; i++) {
        this.ad.appendTrackingForPercent(0, this.getText(impressions.item(i)));
      }
    }
	},

  addTrackingToAd: function(dom, ad) {
    this.addImpressions(dom);

		var errors = this.getElementByPath(dom, "Error");
    if (errors !== null && errors.length > 0){
      for (var i = 0; i < errors.length; i++) {
        url = this.getText(errors.item(i));
        this.ad.appendTrackingForName("errors", url);
      }
    }

    var trackings = this.getElementByPath(dom, "Creatives/Creative/Linear/TrackingEvents/Tracking");
    if (trackings !== null && trackings.length > 0) {
      for (var i = 0; i < trackings.length; i++) {
        tracking = trackings.item(i);
        var event = tracking.getAttribute("event");

        if (event == "start") {
          this.ad.appendTrackingForPercent(0, this.getText(tracking));
        } else if (event == "firstQuartile") {
          this.ad.appendTrackingForPercent(25, this.getText(tracking));
        } else if (event == "midpoint") {
          this.ad.appendTrackingForPercent(50, this.getText(tracking));
        } else if (event == "thirdQuartile") {
          this.ad.appendTrackingForPercent(75, this.getText(tracking));
        } else if (event == "complete") {
          this.ad.appendTrackingForPercent(100, this.getText(tracking));
        } else if (event == "fullscreen") {
          this.ad.appendTrackingForName("track_fullscreen", this.getText(tracking));
        }
      }
    }

    var videoClicks = this.getElementByPath(dom, "Creatives/Creative/Linear/VideoClicks/ClickThrough");
    if (videoClicks !== null && videoClicks.length > 0) {
      this.ad.appendTrackingForName("click_through", this.getText(videoClicks.item(0)));
    }

    var clickTracking = this.getElementByPath(dom, "Creatives/Creative/Linear/VideoClicks/ClickTracking");
    if (clickTracking !== null && clickTracking.length > 0) {
      for (var v = 0; v < clickTracking.length; v++) {
        this.ad.appendTrackingForName("click_tracking", this.getText(clickTracking.item(v)));
      }
    }

  },

  addVideosToAd: function(dom) {
    var videos = this.getElementByPath(dom, "Creatives/Creative/Linear");
    if (videos !== null && videos.length > 0){
      for (var i = 0; i < videos.length; i++) {
        var mediaFiles = this.getElementByPath(videos.item(i), "MediaFiles/MediaFile");

        if (mediaFiles !== null && mediaFiles.length > 0) {
          for (var v = 0; v < mediaFiles.length; v++) {
            var mediaFile = mediaFiles.item(v);
            url = Util.trim(this.getText(mediaFile));

            if (url.length > 0) {
              var data = {
                "delivery" : mediaFile.getAttribute("delivery"),
                "bitrate" : parseInt(mediaFile.getAttribute("bitrate"), 10),
                "width" : mediaFile.getAttribute("width"),
                "height" : mediaFile.getAttribute("height"),
                "type" : mediaFile.getAttribute("type"),
                "url" : url
              };
              this.ad.videos.push(data);
            }

          }
        }

        var durations = this.getElementByPath(videos.item(i), "Duration");
        if (durations !== null && durations.length > 0) {
          var durationText = this.getText(durations[0]);
          var match = durationText.match(/^(\d\d):(\d\d):(\d\d)$/);
          if (match) {
            var durationInt = parseInt(match[1], 10) * 60*60 + parseInt(match[2], 10) * 60 + parseInt(match[3], 10);
            this.ad.duration = durationInt;
          }
          match = durationText.match(/^(\d*)$/);
          if (match) {
            this.ad.duration = parseInt(durationText,10);
          }
        }
      }
    }
  }
});
