var SmartclipParser = AdParser.extend({}).methods({

  parse: function() {
    var adDetails = this.getElementByPath(this.dom, "ad_details").item(0);

    var url = adDetails.getAttribute("imageUrl");
    var m = url.match(/.*\.([^\.]*)/)
    var type = "";
    if (m) {
      type = m[1];
    }
    var data = {
      "width" : adDetails.getAttribute("width"),
      "height" : adDetails.getAttribute("height"),
      "url" : url,
      "type" : type
    }
    this.ad.videos.push(data);
    var trackings = this.getElementByPath(adDetails, "agencyTracker");
    if (trackings != null && trackings.length > 0){
       for (var i = 0; i < trackings.length; i++) {
          var tracker = trackings.item(i);
          var percent = tracker.getAttribute("progress");
          var url = Util.trim(tracker.getAttribute("url"));
          if (url.length > 0) {
            this.ad.appendTrackingForPercent(percent, url);
          }
       }
    }
    return this.ad;
  }
});
