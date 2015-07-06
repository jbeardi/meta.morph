buster.spec.expose();

describe("an advertisement", function() {
  it("should know when it is empty", function() {
    var ad = new Advertisement();
    buster.expect(ad.isEmpty()).toEqual(true);
  });

  it("should know when it is not empty", function() {
    var ad = new Advertisement();
    ad.videos.push({});
    buster.expect(ad.isEmpty()).toEqual(false);
  });

  it("should not add empty trackings", function() {
    var ad = new Advertisement();
    ad.appendTrackingForName("track", "");
    ad.appendTrackingForName("track", null);
    buster.expect(ad.trackings.length).toEqual(0);
  });

  it("should add trackings", function() {
    var ad = new Advertisement();
    ad.appendTrackingForName("track", "hallo");
    buster.expect(ad.trackings.length).toEqual(1);
    buster.expect(ad.getTrackingsForName("track")).toEqual(["hallo"]);
  });

  it("should get trackings by percent", function() {
    var ad = new Advertisement();
    ad.appendTrackingForPercent(99, "hallo");
    buster.expect(ad.getTrackingsForPercent(99)).toEqual(["hallo"]);
  });

  it("should get all pending trackings", function() {
    var ad = new Advertisement();
    ad.appendTrackingForPercent(30, "hallo");
    ad.appendTrackingForPercent(60, "hallo2");
    buster.expect(ad.getPendingTrackings(30)).toEqual([{percent:30, urls:["hallo"]}]);
    buster.expect(ad.getPendingTrackings(50)).toEqual([{percent:30, urls:["hallo"]}]);
    buster.expect(ad.getPendingTrackings(60)).toEqual([
      {percent:30, urls:["hallo"]},
      {percent:60, urls:["hallo2"]}
    ]);
  });

  it("should delete only certain percent values", function() {
    var ad = new Advertisement();
    ad.appendTrackingForPercent(30, "hallo");
    ad.appendTrackingForPercent(60, "hallo2");
    ad.removePercentTrackings([30]);
    buster.expect(ad.getTrackingsForPercent(30)).toEqual([]);
    buster.expect(ad.getPendingTrackings(60)).toEqual([{percent:60, urls:["hallo2"]}]);
  });

  it("should send trackings for percent", function() {
    var spy = sinon.spy();
    var ad = new Advertisement();
    this.stub(ad, "sendTrackByUrl", spy); 
    ad.appendTrackingForPercent(30, "hallo");
    ad.appendTrackingForPercent(60, "hallo2");
    ad.sendTrackingsByPercent(50);
    buster.expect(ad.getTrackingsForPercent(30)).toEqual([]);
    buster.expect(ad.getPendingTrackings(60)).toEqual([{percent:60, urls:["hallo2"]}]);
    buster.assert.calledOnce(spy);
    buster.assert.calledWith(spy, "hallo");
  });

  it("should send trackings for name", function() {
    var spy = sinon.spy();
    var ad = new Advertisement();
    this.stub(ad, "sendTrackByUrl", spy); 
    ad.appendTrackingForName("fullscreen", "hallo");
    ad.appendTrackingForName("fullscreen", "hallo2");
    ad.appendTrackingForName("start", "hallo3");
    ad.sendTrackingsByName("fullscreen");
    buster.expect(ad.getTrackingsForName("fullscreen")).toEqual([]);
    buster.expect(ad.getTrackingsForName("start")).toEqual(["hallo3"]);
    buster.assert.calledTwice(spy);
    buster.assert.calledWith(spy, "hallo");
    buster.assert.calledWith(spy, "hallo2");
  });

  it("should create new images for sended tracks", function() {
    var ad = new Advertisement();
    ad.sendTrackByUrl("http://example.com/hallo");
    buster.expect(ad.imageCache.length).toEqual(1);
    buster.expect(ad.imageCache[0].src).toEqual("http://example.com/hallo");
  });

  it("should return the first video url", function() {
    var ad = new Advertisement();
    ad.videos = [{
      bitrate: 1100,
      delivery: "progressive",
      height: "360",
      type: "video/mp4",
      url: "http://cdn1.eyewonder.com/200125/763729/1646452/GameTrailer_vid2_640x360_tablet.mp4",
      width: "640"
    }];
    buster.expect(ad.getVideoUrl()).toEqual("http://cdn1.eyewonder.com/200125/763729/1646452/GameTrailer_vid2_640x360_tablet.mp4");
  });
});
