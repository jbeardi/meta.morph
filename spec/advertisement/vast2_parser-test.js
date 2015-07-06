buster.spec.expose();

describe("a vast2 parser", function() {

  it("should completely parse a vast2 inline ad", function() {
    var vast = new DOMParser().parseFromString(SMARTCLIP_VAST2, 'text/xml').firstChild;
    var parser = new Vast2Parser(vast);
    var ad = parser.parse();
    buster.expect(ad.duration).toEqual(19);
    buster.expect(ad.getTrackingsForName("errors")).toEqual(["http://cdn1.eyewonder.com/200125/EWTRACK_NEW_I?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&pnl=MainBanner&type=2&itr=VASTERROR&num=2&time=0&diff=0"]);
    buster.expect(ad.getTrackingsForPercent(0)).toEqual([
      "http://stats.smartclip.net/stats/beacon?269;11042;400x320;1354808;3080504;0;0;2088207205",
      "http://cdn.eyewonder.com/100125/763729/1646452/ewtrack.gif?ewadid=183626&amp;ewbust=1308168877",
      "http://cdn1.eyewonder.com/200125/EWTRACK_NEW_V?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&bw=600&vlen=30&per=0&time=0"]);
    buster.expect(ad.getTrackingsForPercent(25)).toEqual(["http://cdn1.eyewonder.com/200125/EWTRACK_NEW_V?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&bw=600&vlen=30&per=20&time=600"]);
    buster.expect(ad.getTrackingsForPercent(50)).toEqual(["http://cdn1.eyewonder.com/200125/EWTRACK_NEW_V?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&bw=600&vlen=30&per=40&time=600"]);
    buster.expect(ad.getTrackingsForPercent(75)).toEqual([
      "http://cdn1.eyewonder.com/200125/EWTRACK_NEW_V?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&bw=600&vlen=30&per=80&time=600",
      "http://cdn1.eyewonder.com/200125/EWTRACK_NEW_V?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&bw=600&vlen=30&per=60&time=600"
    ]);
    buster.expect(ad.getTrackingsForPercent(100)).toEqual(["http://cdn1.eyewonder.com/200125/EWTRACK_NEW_V?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&bw=600&vlen=30&per=100&time=600"]);
    buster.expect(ad.getTrackingsForName("track_fullscreen")).toEqual(["http://cdn1.eyewonder.com/200125/EWTRACK_NEW_I?ewadid=183626&ewbust=1308168877EW&eid=1646452&file=video-600.flv&pnl=MainBanner&type=2&itr=Fullscreen-M&num=2&time=0&diff=0"]);
    buster.expect(ad.getTrackingsForName("click_through")).toEqual(["http://stats.smartclip.net/stats/click?269;11042;400x320;1354808;3080504;0;0;1600621235;http://ad.de.doubleclick.net/click%3Bh%3Dv8/3c47/2/0/%2a/z%3B253509210%3B0-0%3B0%3B67705220%3B11203-400/320%3B33750196/33768074/1%3B%3B%7Eaopt%3D2/1/ff/0%3B%7Esscs%3D%3fhttp://www.eyewonderlabs.com/ct.cfm?ewbust=1308168877EW&file=http://cdn1.eyewonder.com/200125/763729/1646452/dot.gif&eid=1646452&name=Clickthru-clickTag1&num=1&time=0&diff=0&click=http%3A//www.eyewonder.com"]);
    buster.expect(ad.getTrackingsForName("click_tracking")).toEqual(["http://clicktracking"]);
    buster.expect(ad.videos).toEqual([{
      bitrate: 1100,
      delivery: "progressive",
      height: "360",
      type: "video/mp4",
      url: "http://cdn1.eyewonder.com/200125/763729/1646452/GameTrailer_vid2_640x360_tablet.mp4",
      width: "640"
    }]);
  });

  it("should completely parse a vast2 wrapper ad", function() {
    var vast = new DOMParser().parseFromString(SMARTCLIP_WRAPPER, 'text/xml').firstChild;
    var parser = new Vast2Parser(vast);
    var ad = parser.parse();
    buster.expect(ad.duration).toEqual(0);
    buster.expect(ad.videos.length).toEqual(0);
    buster.expect(ad.wrapperUrl).toEqual("http://ae.amgdgt.com/ads?t=de&p=9372&pl=eb81027c&cat=&sz=400x320&rnd=90626760?");
    buster.expect(ad.getTrackingsForName("errors")).toEqual([]);
    buster.expect(ad.getTrackingsForPercent(0)).toEqual([
      "http://ww251.smartadserver.com/h/maip?insid=1980682&imgid=7139591&pgid=283366&visit=V&capp=0&mcrdbt=0&pubid=6&statid=12&ckid=8966030186088480184&tmstp=1o23i41234214&systgt=%24qc%3D1309944077%3B%24ql%3Dmedium%3B%24qpc%3D13178%3B%24qpp%3D0%3B%24qt%3D25_632_7994t%3B%24b%3D16280%3B%24o%3D12100%3B%24sh%3D1024%3B%24sw%3D1600%3B%3B%24mdwi%3D0t%3B%24mdhi%3D0t&tgt=%24mv%3Dunknownt%3B%24mm%3D0t%3B%24mdw%3D0%3B%24mdh%3D0%3B%24mdt%3D1t%3B%24t%3Djs%3B%24mct%3D1t",
      "http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=0&num2=0&num3=0&value=start"]);
    buster.expect(ad.getTrackingsForPercent(25)).toEqual(["http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=25000&num2=0&num3=0&value=firstquartile"]);
    buster.expect(ad.getTrackingsForPercent(50)).toEqual(["http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=50000&num2=0&num3=0&value=midpoint"]);
    buster.expect(ad.getTrackingsForPercent(75)).toEqual(["http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=75000&num2=0&num3=0&value=thirdquartile"]);
    buster.expect(ad.getTrackingsForPercent(100)).toEqual(["http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=100000&num2=0&num3=0&value=complete"]);
    buster.expect(ad.getTrackingsForName("track_fullscreen")).toEqual(["http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=fullscreen&num1=0&num2=0&num3=0&value=fullscreen"]);
    buster.expect(ad.getTrackingsForName("click_through")).toEqual([]);
    buster.expect(ad.getTrackingsForName("click_tracking")).toEqual(["http://ww251.smartadserver.com/h/mcp?imgid=7139591&pgid=283366&uid=8966030186088480184&tmstp=1o23i41234214&tgt=%24mv%3Dunknownt%3B%24mm%3D0t%3B%24mdw%3D0%3B%24mdh%3D0%3B%24mdt%3D1t%3B%24t%3Djs%3B%24mct%3D1t"]);
  });

  it("should parse an empty vast", function() {
    var vast = new DOMParser().parseFromString(EMPTY_VAST, 'text/xml').firstChild;
    var parser = new Vast2Parser(vast);
    var ad = parser.parse();
    buster.expect(ad.duration).toEqual(0);
    buster.expect(ad.videos.length).toEqual(0);
    buster.expect(ad.wrapperUrl).toEqual(null);
    buster.expect(ad.getTrackingsForName("errors")).toEqual([]);
    buster.expect(ad.getTrackingsForPercent(0)).toEqual(["http://stats.smartclip.net/stats/beacon?709;11040;400x320;1184521;2529199;0;1662365331"]);
    buster.expect(ad.getTrackingsForPercent(25)).toEqual([]);
    buster.expect(ad.getTrackingsForPercent(50)).toEqual([]);
    buster.expect(ad.getTrackingsForPercent(75)).toEqual([]);
    buster.expect(ad.getTrackingsForPercent(100)).toEqual([]);
    buster.expect(ad.getTrackingsForName("track_fullscreen")).toEqual([]);
    buster.expect(ad.getTrackingsForName("click_through")).toEqual([]);
    buster.expect(ad.getTrackingsForName("click_tracking")).toEqual([]);
  });

  it("should combine two ads together", function() {
    var vast = new DOMParser().parseFromString(SMARTCLIP_WRAPPER, 'text/xml').firstChild;
    var parser = ParserFactory.getParser(vast);
    var ad = parser.parse();
    vast = new DOMParser().parseFromString(EMPTY_VAST, 'text/xml').firstChild;
    parser = ParserFactory.getParser(vast, ad);
    ad = parser.parse();
    buster.expect(ad.duration).toEqual(0);
    buster.expect(ad.videos.length).toEqual(0);
    buster.expect(ad.wrapperUrl).toEqual("http://ae.amgdgt.com/ads?t=de&p=9372&pl=eb81027c&cat=&sz=400x320&rnd=90626760?");
    buster.expect(ad.getTrackingsForName("errors")).toEqual([]);
    buster.expect(ad.getTrackingsForPercent(0)).toEqual([
      "http://ww251.smartadserver.com/h/maip?insid=1980682&imgid=7139591&pgid=283366&visit=V&capp=0&mcrdbt=0&pubid=6&statid=12&ckid=8966030186088480184&tmstp=1o23i41234214&systgt=%24qc%3D1309944077%3B%24ql%3Dmedium%3B%24qpc%3D13178%3B%24qpp%3D0%3B%24qt%3D25_632_7994t%3B%24b%3D16280%3B%24o%3D12100%3B%24sh%3D1024%3B%24sw%3D1600%3B%3B%24mdwi%3D0t%3B%24mdhi%3D0t&tgt=%24mv%3Dunknownt%3B%24mm%3D0t%3B%24mdw%3D0%3B%24mdh%3D0%3B%24mdt%3D1t%3B%24t%3Djs%3B%24mct%3D1t", 
      "http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=0&num2=0&num3=0&value=start",
      "http://stats.smartclip.net/stats/beacon?709;11040;400x320;1184521;2529199;0;1662365331"
    ]);
    buster.expect(ad.getTrackingsForPercent(25)).toEqual(["http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=25000&num2=0&num3=0&value=firstquartile"]);
    buster.expect(ad.getTrackingsForPercent(50)).toEqual(["http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=50000&num2=0&num3=0&value=midpoint"]);
    buster.expect(ad.getTrackingsForPercent(75)).toEqual(["http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=75000&num2=0&num3=0&value=thirdquartile"]);
    buster.expect(ad.getTrackingsForPercent(100)).toEqual(["http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=100000&num2=0&num3=0&value=complete"]);
    buster.expect(ad.getTrackingsForName("track_fullscreen")).toEqual(["http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=fullscreen&num1=0&num2=0&num3=0&value=fullscreen"]);
    buster.expect(ad.getTrackingsForName("click_through")).toEqual([]);
    buster.expect(ad.getTrackingsForName("click_tracking")).toEqual(["http://ww251.smartadserver.com/h/mcp?imgid=7139591&pgid=283366&uid=8966030186088480184&tmstp=1o23i41234214&tgt=%24mv%3Dunknownt%3B%24mm%3D0t%3B%24mdw%3D0%3B%24mdh%3D0%3B%24mdt%3D1t%3B%24t%3Djs%3B%24mct%3D1t"]);
  });

  it("should parse another vast", function() {
    var vast = new DOMParser().parseFromString(STRANGE_DURATION, 'text/xml').firstChild;
    var parser = new Vast2Parser(vast);
    var ad = parser.parse();
    buster.expect(ad.duration).toEqual(9);
    buster.expect(ad.videos.length).toEqual(1);
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

  var SMARTCLIP_WRAPPER = '<?xml version="1.0" encoding="utf-8"?>'+
    '<VAST version="2.0">'+
    '  <Ad id="1980682">'+
    '    <Wrapper>'+
    '      <AdSystem>SMART Adserver</AdSystem>'+
    '      <VASTAdTagURI><![CDATA[http://ae.amgdgt.com/ads?t=de&p=9372&pl=eb81027c&cat=&sz=400x320&rnd=90626760?]]></VASTAdTagURI>'+
    '      <AdTitle>SMART Redirect</AdTitle>'+
    '      <Description/>'+
    '      <Survey/>'+
    '      <Error/>'+
    '      <Impression id="smart"><![CDATA[http://ww251.smartadserver.com/h/maip?insid=1980682&imgid=7139591&pgid=283366&visit=V&capp=0&mcrdbt=0&pubid=6&statid=12&ckid=8966030186088480184&tmstp=1o23i41234214&systgt=%24qc%3D1309944077%3B%24ql%3Dmedium%3B%24qpc%3D13178%3B%24qpp%3D0%3B%24qt%3D25_632_7994t%3B%24b%3D16280%3B%24o%3D12100%3B%24sh%3D1024%3B%24sw%3D1600%3B%3B%24mdwi%3D0t%3B%24mdhi%3D0t&tgt=%24mv%3Dunknownt%3B%24mm%3D0t%3B%24mdw%3D0%3B%24mdh%3D0%3B%24mdt%3D1t%3B%24t%3Djs%3B%24mct%3D1t]]></Impression>'+
    '      <Creatives>'+
    '        <Creative id="Linear">'+
    '          <Linear>'+
    '            <TrackingEvents>'+
    '              <Tracking event="start"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=0&num2=0&num3=0&value=start]]></Tracking>'+
    '              <Tracking event="midpoint"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=50000&num2=0&num3=0&value=midpoint]]></Tracking>'+
    '              <Tracking event="firstQuartile"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=25000&num2=0&num3=0&value=firstquartile]]></Tracking>'+
    '              <Tracking event="thirdQuartile"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=75000&num2=0&num3=0&value=thirdquartile]]></Tracking>'+
    '              <Tracking event="complete"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=100000&num2=0&num3=0&value=complete]]></Tracking>'+
    '              <Tracking event="mute"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=audioOff&num1=0&num2=0&num3=0&value=mute]]></Tracking>'+
    '              <Tracking event="unmute"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=audioOn&num1=0&num2=0&num3=0&value=unmute]]></Tracking>'+
    '              <Tracking event="fullscreen"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=fullscreen&num1=0&num2=0&num3=0&value=fullscreen]]></Tracking>'+
    '              <Tracking event="pause"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=stop&num1=0&num2=0&num3=0&value=pause]]></Tracking>'+
    '              <Tracking event="expand"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=expand&num1=0&num2=0&num3=0&value=expand]]></Tracking>'+
    '              <Tracking event="collapse"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=collapse&num1=0&num2=0&num3=0&value=collapse]]></Tracking>'+
    '              <Tracking event="acceptInvitation"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=accinv&num1=0&num2=0&num3=0&value=acceptinv]]></Tracking>'+
    '              <Tracking event="close"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=close&num1=0&num2=0&num3=0&value=close]]></Tracking>'+
    '            </TrackingEvents>'+
    '            <VideoClicks>'+
    '              <ClickTracking id="smart"><![CDATA[http://ww251.smartadserver.com/h/mcp?imgid=7139591&pgid=283366&uid=8966030186088480184&tmstp=1o23i41234214&tgt=%24mv%3Dunknownt%3B%24mm%3D0t%3B%24mdw%3D0%3B%24mdh%3D0%3B%24mdt%3D1t%3B%24t%3Djs%3B%24mct%3D1t]]></ClickTracking>'+
    '            </VideoClicks>'+
    '          </Linear>'+
    '        </Creative>'+
    '        <Creative id="NonLinear">'+
    '          <NonLinearAds>'+
    '            <TrackingEvents>'+
    '              <Tracking event="start"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=0&num2=0&num3=0&value=start]]></Tracking>'+
    '              <Tracking event="midpoint"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=50000&num2=0&num3=0&value=midpoint]]></Tracking>'+
    '              <Tracking event="firstQuartile"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=25000&num2=0&num3=0&value=firstquartile]]></Tracking>'+
    '              <Tracking event="thirdQuartile"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=75000&num2=0&num3=0&value=thirdquartile]]></Tracking>'+
    '              <Tracking event="complete"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=start&num1=100000&num2=0&num3=0&value=complete]]></Tracking>'+
    '              <Tracking event="mute"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=audioOff&num1=0&num2=0&num3=0&value=mute]]></Tracking>'+
    '              <Tracking event="unmute"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=audioOn&num1=0&num2=0&num3=0&value=unmute]]></Tracking>'+
    '              <Tracking event="fullscreen"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=fullscreen&num1=0&num2=0&num3=0&value=fullscreen]]></Tracking>'+
    '              <Tracking event="pause"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=stop&num1=0&num2=0&num3=0&value=pause]]></Tracking>'+
    '              <Tracking event="expand"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=expand&num1=0&num2=0&num3=0&value=expand]]></Tracking>'+
    '              <Tracking event="collapse"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=collapse&num1=0&num2=0&num3=0&value=collapse]]></Tracking>'+
    '              <Tracking event="acceptInvitation"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=accinv&num1=0&num2=0&num3=0&value=acceptinv]]></Tracking>'+
    '              <Tracking event="close"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=283366&iid=1980682&cid=7139591&sid=1o23i41234214&key=close&num1=0&num2=0&num3=0&value=close]]></Tracking>'+
    '            </TrackingEvents>'+
    '          </NonLinearAds>'+
    '        </Creative>'+
    '      </Creatives>'+
    '    </Wrapper>'+
    '  </Ad>'+
    '</VAST>';


  var STRANGE_DURATION = '<?xml version="1.0" encoding="UTF-8"?>'+
    '<VAST version="2.0">'+
    '   <Ad id="2573003">'+
    '      <InLine>'+
    '         <AdSystem>SMART Adserver</AdSystem>'+
    '         <AdTitle>SMART PreMidPost-Roll</AdTitle>'+
    '         <Description />'+
    '         <Survey />'+
    '         <Error />'+
    '         <Impression id="smart"><![CDATA[http://ww251.smartadserver.com/h/maip?insid=2573003&imgid=8660004&pgid=305010&visit=M&capp=0&mcrdbt=0&pubid=21&statid=12&ckid=9112846987715314468&tmstp=10868558&systgt=%24qc%3D1309944077%3B%24ql%3Dmedium%3B%24qpc%3D10178%3B%24qpp%3D0%3B%24qt%3D25_632_7994t%3B%24b%3D12020%3B%24o%3D11999%3B%3B%24mdwi%3D0t%3B%24mdhi%3D0t&tgt=%24mv%3Dunknownt%3B%24mm%3D0t%3B%24mdw%3D0%3B%24mdh%3D0%3B%24mdt%3D1t%3B%24t%3Djs%3B%24mct%3D1t%3B%3Bsmartclicktrack%3D%26_%3D1376666665902]]></Impression>'+
    '         <Creatives>'+
    '            <Creative id="Linear">'+
    '               <Linear>'+
    '                  <Duration>00:00:09</Duration>'+
    '                  <TrackingEvents>'+
    '                     <Tracking event="start"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=305010&iid=2573003&cid=8660004&sid=10868558&key=start&num1=0&num2=0&num3=0&value=start]]></Tracking>'+
    '                     <Tracking event="midpoint"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=305010&iid=2573003&cid=8660004&sid=10868558&key=start&num1=50000&num2=0&num3=0&value=midpoint]]></Tracking>'+
    '                     <Tracking event="firstQuartile"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=305010&iid=2573003&cid=8660004&sid=10868558&key=start&num1=25000&num2=0&num3=0&value=firstquartile]]></Tracking>'+
    '                     <Tracking event="thirdQuartile"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=305010&iid=2573003&cid=8660004&sid=10868558&key=start&num1=75000&num2=0&num3=0&value=thirdquartile]]></Tracking>'+
    '                     <Tracking event="complete"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=305010&iid=2573003&cid=8660004&sid=10868558&key=start&num1=100000&num2=0&num3=0&value=complete]]></Tracking>'+
    '                     <Tracking event="mute"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=305010&iid=2573003&cid=8660004&sid=10868558&key=audioOff&num1=0&num2=0&num3=0&value=mute]]></Tracking>'+
    '                     <Tracking event="unmute"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=305010&iid=2573003&cid=8660004&sid=10868558&key=audioOn&num1=0&num2=0&num3=0&value=unmute]]></Tracking>'+
    '                     <Tracking event="fullscreen"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=305010&iid=2573003&cid=8660004&sid=10868558&key=fullscreen&num1=0&num2=0&num3=0&value=fullscreen]]></Tracking>'+
    '                     <Tracking event="pause"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=305010&iid=2573003&cid=8660004&sid=10868558&key=stop&num1=0&num2=0&num3=0&value=pause]]></Tracking>'+
    '                     <Tracking event="expand"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=305010&iid=2573003&cid=8660004&sid=10868558&key=expand&num1=0&num2=0&num3=0&value=expand]]></Tracking>'+
    '                     <Tracking event="collapse"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=305010&iid=2573003&cid=8660004&sid=10868558&key=collapse&num1=0&num2=0&num3=0&value=collapse]]></Tracking>'+
    '                     <Tracking event="acceptInvitation"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=305010&iid=2573003&cid=8660004&sid=10868558&key=accinv&num1=0&num2=0&num3=0&value=acceptinv]]></Tracking>'+
    '                     <Tracking event="close"><![CDATA[http://ww251.smartadserver.com/a/track/pixa.asp?pid=305010&iid=2573003&cid=8660004&sid=10868558&key=close&num1=0&num2=0&num3=0&value=close]]></Tracking>'+
    '                  </TrackingEvents>'+
    '                  <VideoClicks>'+
    '                     <ClickThrough id="smart"><![CDATA[&_=1376666665902http://ww251.smartadserver.com/diff/251/2573003/go14.asp?2573003%3B305010%3B9112846987715314468%3B10868558%3BM%3B21%3Bsystemtarget=%24qc%3d1309944077%3b%24ql%3dmedium%3b%24qpc%3d10178%3b%24qpp%3d0%3b%24qt%3d25_632_7994t%3b%24b%3d12020%3b%24o%3d11999%3b%3b%24mdwi%3d0t%3b%24mdhi%3d0t%3Btarget=%24mv%3dunknownt%3b%24mm%3d0t%3b%24mdw%3d0%3b%24mdh%3d0%3b%24mdt%3d1t%3b%24t%3djs%3b%24mct%3d1t%3B%3B8660004%3Bclickvars=]]></ClickThrough>'+
    '                  </VideoClicks>'+
    '                  <MediaFiles>'+
    '                     <MediaFile delivery="progressive" bitrate="600" width="640" height="360" type="video/mp4">http://ced.sascdn.com/diff/251/2573003/10_sek_preroll_familienrabatt_130603_v01_Button_h264_mp4_small.mp4</MediaFile>'+
    '                  </MediaFiles>'+
    '               </Linear>'+
    '            </Creative>'+
    '         </Creatives>'+
    '      </InLine>'+
    '   </Ad>'+
    '</VAST>';

  var EMPTY_VAST = '<?xml version="1.0"?> <VAST version="2.0"> <Ad id="EWAD"> <InLine> <AdSystem>EW</AdSystem> <AdTitle>SAMPLE</AdTitle> <Creatives> <Creative> </Creative> </Creatives> <Impression id="SMARTCLIP"><![CDATA[http://stats.smartclip.net/stats/beacon?709;11040;400x320;1184521;2529199;0;1662365331]]></Impression></InLine> </Ad> </VAST>'

});
