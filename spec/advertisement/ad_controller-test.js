buster.spec.expose();

describe("an ad controller", function() {

  it("should set the duration", function() {
    var c = new AdController([{adUrl:"http://example.com"}]);
    c.setDuration(100);
    buster.expect(c.duration).toEqual(100);
  });

  it("should not crash if the jsonp result is null", function() {
    var c = new AdController([{adUrl:"http://example.com"}]);
    var ad = c.parseJsonpResult(null);
    buster.expect(ad.duration).toEqual(0);
    buster.expect(ad.videos.length).toEqual(0);
    buster.expect(ad.wrapperUrl).toEqual(null);
    buster.expect(ad.getTrackingsForName("errors")).toEqual([]);
  });

  it("should not crash if the jsonp result is damaged", function() {
    var c = new AdController([{adUrl:"http://example.com"}]);
    var ad = c.parseJsonpResult({contents: "<VA"});
    buster.expect(ad.duration).toEqual(0);
    buster.expect(ad.videos.length).toEqual(0);
    buster.expect(ad.wrapperUrl).toEqual(null);
    buster.expect(ad.getTrackingsForName("errors")).toEqual([]);
  });

  it("should not crash if the jsonp result is an unknown xml format", function() {
    var c = new AdController([{adUrl:"http://example.com"}]);
    var ad = c.parseJsonpResult({contents: "<a href='hallo'>wow</a>"});
    buster.expect(ad.duration).toEqual(0);
    buster.expect(ad.videos.length).toEqual(0);
    buster.expect(ad.wrapperUrl).toEqual(null);
    buster.expect(ad.getTrackingsForName("errors")).toEqual([]);
  });

  it("should parse VAST in jsonp result", function() {
    var c = new AdController([{adUrl:"http://example.com"}]);
    var ad = c.parseJsonpResult({contents: EMPTY_VAST});
    buster.expect(ad.duration).toEqual(0);
    buster.expect(ad.videos.length).toEqual(0);
    buster.expect(ad.wrapperUrl).toEqual(null);
    buster.expect(ad.getTrackingsForName("errors")).toEqual([]);
    buster.expect(ad.getTrackingsForPercent(0)).toEqual(["http://stats.smartclip.net/stats/beacon?709;11040;400x320;1184521;2529199;0;1662365331"]);
  });

  it("should load ads via ajax", function(done) {
    var spy = sinon.spy();
    this.stub($, "ajax", spy);
    var c = new AdController([{adUrl:"http://example.com"}]);
    c.loadAd("http://example.com/vast2.xml", done(function(ad) {
      buster.expect(ad.duration).toEqual(19);
      buster.expect(ad.videos.length).toEqual(1);
      buster.expect(ad.wrapperUrl).toEqual(null);
    }));

    window.adCallback({contents: SMARTCLIP_VAST2});
    buster.assert.calledOnce(spy);
    buster.assert.calledWith(spy, {
      crossDomain: true,
      dataType: "jsonp",
      jsonp: false,
      url: "http://example.com/vast2.xml"
    });
  });

  it("should load ads with a wrapper vast via ajax", function(done) {
    var spy = sinon.spy();
    this.stub($, "ajax", spy);
    var c = new AdController([{adUrl:"http://example.com"}]);
    c.loadAd("http://example.com/wrapper.xml", done(function(ad) {
      buster.expect(ad.duration).toEqual(19);
      buster.expect(ad.videos.length).toEqual(1);
      buster.expect(ad.wrapperUrl).toEqual(null);
    }));

    c.adCallback({contents: WRAPPER_VAST});
    c.adCallback({contents: SMARTCLIP_VAST2});
    buster.assert.calledTwice(spy);
    buster.assert.calledWith(spy, {
      crossDomain: true,
      dataType: "jsonp",
      jsonp: false,
      url: "http://example.com/wrapper.xml"
    });
    buster.assert.calledWith(spy, {
      crossDomain: true,
      dataType: "jsonp",
      jsonp: false,
      url: "http://example.com/redirect"
    });
  });

  it("should load ads and call the callback", function(done) {
    var spy = sinon.spy();
    this.stub($, "ajax", spy);
    var c = new AdController([{adUrl:"http://example.com/vast2.xml"}]);
    c.getNextVideo(done(function(video) {
      buster.expect(video.url).toEqual("http://cdn1.eyewonder.com/200125/763729/1646452/GameTrailer_vid2_640x360_tablet.mp4");
      buster.expect(video.ad.duration).toEqual(19);
      buster.expect(video.ad.videos.length).toEqual(1);
      buster.expect(video.ad.wrapperUrl).toEqual(null);
    }));

    window.adCallback({contents: SMARTCLIP_VAST2});
    buster.assert.calledOnce(spy);
    buster.assert.calledWith(spy, {
      crossDomain: true,
      dataType: "jsonp",
      jsonp: false,
      url: "http://example.com/vast2.xml"
    });
  });

  it("should send the tracking to the current ad", function() {
    var c = new AdController([{adUrl:"http://example.com/vast2.xml"}]);
    c.currentAd = new Advertisement();
    c.currentAd.appendTrackingForName("impression", "hallo");
    c.sendTrackingsForName("impression");
    buster.expect(c.currentAd.getTrackingsForName("impression")).toEqual([]);
  });

  it("should send trackings for the current progress", function() {
    var c = new AdController([{adUrl:"http://example.com/vast2.xml"}]);
    c.currentAd = new Advertisement();
    c.currentAd.appendTrackingForPercent(50, "hallo");
    c.currentTime = 100;
    c.duration = 200;
    buster.expect(c.currentAd.getTrackingsForPercent(50)).toEqual(["hallo"]);
    c.sendTrackings();
    buster.expect(c.currentAd.getTrackingsForPercent(50)).toEqual([]);
  });

  it("should send trackings if the playtime is updated", function() {
    var c = new AdController([{adUrl:"http://example.com/vast2.xml"}]);
    c.currentAd = new Advertisement();
    c.currentAd.appendTrackingForPercent(50, "hallo");
    c.duration = 200;
    buster.expect(c.currentAd.getTrackingsForPercent(50)).toEqual(["hallo"]);
    c.updatePlayTime(100);
    buster.expect(c.currentAd.getTrackingsForPercent(50)).toEqual([]);
  });

  it("should update the playtime to the current duration if the video is finished", function() {
    var c = new AdController([{adUrl:"http://example.com/vast2.xml"}]);
    c.currentAd = new Advertisement();
    c.currentAd.appendTrackingForPercent(100, "hallo");
    c.duration = 200;
    buster.expect(c.currentAd.getTrackingsForPercent(100)).toEqual(["hallo"]);
    c.videoFinished();
    buster.expect(c.currentAd.getTrackingsForPercent(100)).toEqual([]);
  });

  it("should return an ad and after that the video url and a preroll after that one", function(done) {
    var c = new AdController([
      {adUrl:"http://example.com/vast2.xml"},
      {videoUrl: "http://example.com/video.mp4"},
      {adUrl:"http://example.com/vast2.xml"},
    ]);
    c.getNextVideo(function(video) {
      buster.expect(video.url).toEqual("http://cdn1.eyewonder.com/200125/763729/1646452/GameTrailer_vid2_640x360_tablet.mp4");
      buster.expect(video.ad.duration).toEqual(19);
      buster.expect(video.ad.videos.length).toEqual(1);
      buster.expect(video.ad.wrapperUrl).toEqual(null);

      c.getNextVideo(function(video) {
        buster.expect(video.url).toEqual("http://example.com/video.mp4");

        c.getNextVideo(done(function(video) {
          buster.expect(video.url).toEqual("http://cdn1.eyewonder.com/200125/763729/1646452/GameTrailer_vid2_640x360_tablet.mp4");
          buster.expect(video.ad.duration).toEqual(19);
          buster.expect(video.ad.videos.length).toEqual(1);
          buster.expect(video.ad.wrapperUrl).toEqual(null);
        }));
        c.adCallback({contents: SMARTCLIP_VAST2});
      });
    });
    c.adCallback({contents: SMARTCLIP_VAST2});
  });

  it("should return the video if the ad is empty", function(done) {
    var c = new AdController([
      {adUrl:"http://example.com/vast2.xml"},
      {videoUrl: "http://example.com/video.mp4"}
    ]);
    c.getNextVideo(done(function(video) {
      buster.expect(video.url).toEqual("http://example.com/video.mp4");
    }));
    window.adCallback({contents: EMPTY_VAST});
  });

  it("should load not crash if url is empty", function(done) {
    var c = new AdController([{adUrl:"http://example.com/vast2.xml"}]);
    c.loadAd(null, done(function(ad) {
       buster.expect(ad.videos).toEqual([]);
    }));
  });

  it("should not load ad if skipAd is true", function(done) {
    var c = new AdController([{adUrl:"http://example.com/vast2.xml"}]);
    c.skipAd = true;
    c.getNextVideo(done(function(video) {
      buster.expect(video).toBeNull();
    }));
  });

  it("should load not crash if url is empty", function(done) {
    var c = new AdController([{adUrl:"http://example.com/vast2.xml"}]);
    c.skipAd = true
    c.loadAd("http://example.com/vast.xml", done(function(ad) {
       buster.expect(ad.videos).toEqual([]);
    }));
  });

  var SMARTCLIP_VAST2 =  '<?xml version="1.0" encoding="UTF-8"?>'+
     '<VAST version="2.0">'+
     '  <Ad id="EWAD">'+
     '    <InLine>'+
     '      <AdSystem>Eyewonder</AdSystem>'+
     '      <AdTitle>Smartclip_DE_VAST2_DEMO_640x360_PreRoll_GameTrailer_GameTrailer_vid2_multiscreen_Tablet_640x360_1646452</AdTitle>'+
     '      <Description>Eyewonder VAST 2.0 tag. Generated: 02/06/2012  07:08 AM EST. EW Web Code Version: 18.4.0.1. Site: Smartclip DE VAST2 DEMO. Placement: 640x360_PreRoll GameTrailer. Adname: GameTrailer_vid2_multiscreen_Tablet_640x360. Campaign ID: 763729. Media plan entry ID: 1646452. </Description>'+
     '      <Error>'+
     '        <![CDATA[http://cdn1.eyewonder.com/200125/EWTRACK_NEW_I?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&pnl=MainBanner&type=2&itr=VASTERROR&num=2&time=0&diff=0]]>'+
     '      </Error>'+
     '      <Impression id="SMARTCLIP"><![CDATA[http://stats.smartclip.net/stats/beacon?269;11042;400x320;1354808;3080504;0;0;2088207205]]></Impression><Impression id="EWADSERVER"><![CDATA[http://cdn.eyewonder.com/100125/763729/1646452/ewtrack.gif?ewadid=183626&amp;ewbust=1308168877]]></Impression>'+
     '      <Creatives>'+
     '        <Creative id="EWCREATIVE1" sequence="1">'+
     '          <Linear>'+
     '            <Duration>00:00:19</Duration>'+
     '            <TrackingEvents>'+
     '              <Tracking event="start"><![CDATA[http://cdn1.eyewonder.com/200125/EWTRACK_NEW_V?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&bw=600&vlen=30&per=0&time=0]]></Tracking>'+
     '              <Tracking event="firstQuartile"><![CDATA[http://cdn1.eyewonder.com/200125/EWTRACK_NEW_V?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&bw=600&vlen=30&per=20&time=600]]></Tracking>'+
     '              <Tracking event="midpoint"><![CDATA[http://cdn1.eyewonder.com/200125/EWTRACK_NEW_V?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&bw=600&vlen=30&per=40&time=600]]></Tracking>'+
     '              <Tracking event="thirdQuartile"><![CDATA[http://cdn1.eyewonder.com/200125/EWTRACK_NEW_V?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&bw=600&vlen=30&per=80&time=600]]></Tracking>'+
     '              <Tracking event="thirdQuartile"><![CDATA[http://cdn1.eyewonder.com/200125/EWTRACK_NEW_V?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&bw=600&vlen=30&per=60&time=600]]></Tracking>'+
     '              <Tracking event="complete"><![CDATA[http://cdn1.eyewonder.com/200125/EWTRACK_NEW_V?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&bw=600&vlen=30&per=100&time=600]]></Tracking>'+
     '              <Tracking event="mute"><![CDATA[http://cdn1.eyewonder.com/200125/EWTRACK_NEW_I?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&pnl=MainBanner&type=1&itr=amute&num=2&time=0&diff=0]]></Tracking>'+
     '              <Tracking event="unmute"><![CDATA[http://cdn1.eyewonder.com/200125/EWTRACK_NEW_I?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&pnl=MainBanner&type=1&itr=aplay&num=2&time=0&diff=0]]></Tracking>'+
     '              <Tracking event="pause"><![CDATA[http://cdn1.eyewonder.com/200125/EWTRACK_NEW_I?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&pnl=MainBanner&type=1&itr=vpause&num=2&time=0&diff=0]]></Tracking>'+
     '              <Tracking event="resume"><![CDATA[http://cdn1.eyewonder.com/200125/EWTRACK_NEW_I?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&pnl=MainBanner&type=1&itr=vreplay&num=2&time=0&diff=0]]></Tracking>'+
     '              <Tracking event="rewind"><![CDATA[http://cdn1.eyewonder.com/200125/EWTRACK_NEW_I?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&pnl=MainBanner&type=1&itr=vrewind&num=2&time=0&diff=0]]></Tracking>'+
     '              <Tracking event="fullscreen"><![CDATA[http://cdn1.eyewonder.com/200125/EWTRACK_NEW_I?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&pnl=MainBanner&type=2&itr=Fullscreen-M&num=2&time=0&diff=0]]></Tracking>'+
     '              <Tracking event="close"><![CDATA[http://cdn1.eyewonder.com/200125/EWTRACK_NEW_I?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&pnl=MainBanner&type=1&itr=close&num=2&time=0&diff=0]]></Tracking>'+
     '              <Tracking event="expand"><![CDATA[http://cdn1.eyewonder.com/200125/EWTRACK_NEW_I?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&pnl=MainBanner&type=1&itr=Expand-M&num=2&time=0&diff=0]]></Tracking>'+
     '              <Tracking event="collapse"><![CDATA[http://cdn1.eyewonder.com/200125/EWTRACK_NEW_I?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&pnl=MainBanner&type=1&itr=Contract-M&num=2&time=0&diff=0]]></Tracking>'+
     '            </TrackingEvents>'+
     '            <AdParameters><![CDATA[cp=http://cdn1.eyewonder.com/200125/763729/1646452/&realAdId=183626]]></AdParameters>'+
     '            <VideoClicks>'+
     '              <ClickThrough><![CDATA[http://stats.smartclip.net/stats/click?269;11042;400x320;1354808;3080504;0;0;1600621235;http://ad.de.doubleclick.net/click%3Bh%3Dv8/3c47/2/0/%2a/z%3B253509210%3B0-0%3B0%3B67705220%3B11203-400/320%3B33750196/33768074/1%3B%3B%7Eaopt%3D2/1/ff/0%3B%7Esscs%3D%3fhttp://www.eyewonderlabs.com/ct.cfm?ewbust=1308168877EW&file=http://cdn1.eyewonder.com/200125/763729/1646452/dot.gif&eid=1646452&name=Clickthru-clickTag1&num=1&time=0&diff=0&click=http%3A//www.eyewonder.com]]></ClickThrough>'+
     '              <ClickTracking><![CDATA[http://clicktracking]]></ClickTracking>'+
     '            </VideoClicks>'+
     '            <MediaFiles>'+
     '<MediaFile delivery="progressive" bitrate="1100" type="video/mp4" width="640" height="360" scalable="true" maintainAspectRatio="true"><![CDATA[http://cdn1.eyewonder.com/200125/763729/1646452/GameTrailer_vid2_640x360_tablet.mp4]]></MediaFile>'+
     '            </MediaFiles>'+
     '          </Linear>'+
     '        </Creative>'+
     '      </Creatives>'+
     '    </InLine>'+
     '  </Ad>'+
     '</VAST>';
  var EMPTY_VAST   = '<?xml version="1.0"?> <VAST version="2.0"> <Ad id="EWAD"> <InLine> <AdSystem>EW</AdSystem> <AdTitle>SAMPLE</AdTitle> <Creatives> <Creative> </Creative> </Creatives> <Impression id="SMARTCLIP"><![CDATA[http://stats.smartclip.net/stats/beacon?709;11040;400x320;1184521;2529199;0;1662365331]]></Impression></InLine> </Ad> </VAST>';
  var WRAPPER_VAST = '<?xml version="1.0"?> <VAST version="2.0"> <Ad id="EWAD"> <Wrapper> <VASTAdTagURI>http://example.com/redirect</VASTAdTagURI> <Impression id="SMARTCLIP"><![CDATA[http://stats.smartclip.net/stats/beacon?709;11040;400x320;1184521;2529199;0;1662365331]]></Impression></Wrapper> </Ad> </VAST>';
});
