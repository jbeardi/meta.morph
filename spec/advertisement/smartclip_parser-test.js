buster.spec.expose();

describe("a smartclip parser", function() {
  it("should parse a smartclip xml file", function() {
    var vast = new DOMParser().parseFromString(SMARTCLIP_XML, 'text/xml').firstChild;
    var parser = new SmartclipParser(vast);
    var ad = parser.parse();
    buster.expect(ad.getTrackingsForPercent(0)).toEqual(["http://servedby.flashtalking.com/imp/2/27885;631460;201;gif;SmartClipChannelRotationDE;640x360/?ft_creative=538136&ft_configuration=0&cachebuster=1609734058", "http://ad-emea.doubleclick.net/ad/N1203.smartclip.xenion.de/B7781489;sz=1x1;ord=1609734058?", "http://stat.flashtalking.com/reportV3/ft.stat?26892354-0-13-0-1987028E1B459F-1609734058", "http://stats.smartclip.net/stats/beacon?352;4364;400x320;2717748;8309588;0;209921;;1379604678"]);
    buster.expect(ad.videos).toEqual([{
      height: "360",
      type: "mp4",
      url: "http://cdn.flashtalking.com/23155/43708_AZU_Glueck_DVD_22sec_HD_1173.mp4",
      width: "640"
    }]);
  });

  var SMARTCLIP_XML = '<?xml version="1.0" encoding="utf-8"?>'+
    '<content>'+
    '  <ad_details name="43708_AZU_Glueck_DVD_22sec_HD_1173.mp4" imageUrl="http://cdn.flashtalking.com/23155/43708_AZU_Glueck_DVD_22sec_HD_1173.mp4" targetUrl="http://stats.smartclip.net/stats/click?352;4364;400x320;2717748;8309588;0;0;;1525213705;http://ad.doubleclick.net/click%3Bh%3Dv8/3e21/2/0/%2a/d%3B274097135%3B0-0%3B0%3B47329331%3B11203-400/320%3B49934196/49925489/1%3B%3B%7Eaopt%3D2/1/ff/0%3B%7Esscs%3D%3fhttp://servedby.flashtalking.com/click/2/27885;631460;538136;211;0/?random=1159921386&amp;ft_width=640&amp;ft_height=360&amp;url=http://ad-emea.doubleclick.net/clk;274063421;100475666;z" width="640" height="360" prerollSkippable="false">'+
    '    <agencyTracker progress="0" url="http://servedby.flashtalking.com/imp/2/27885;631460;201;gif;SmartClipChannelRotationDE;640x360/?ft_creative=538136&amp;ft_configuration=0&amp;cachebuster=1609734058"/>'+
    '    <agencyTracker progress="0" url="http://ad-emea.doubleclick.net/ad/N1203.smartclip.xenion.de/B7781489;sz=1x1;ord=1609734058?"/>'+
    '    <agencyTracker progress="0" url="http://stat.flashtalking.com/reportV3/ft.stat?26892354-0-13-0-1987028E1B459F-1609734058"/>'+
    '    <agencyTracker progress="25" url="http://stat.flashtalking.com/reportV3/ft.stat?26892354-0-14-0-1987028E1B459F-1609734058"/>'+
    '    <agencyTracker progress="50" url="http://stat.flashtalking.com/reportV3/ft.stat?26892354-0-15-0-1987028E1B459F-1609734058"/>'+
    '    <agencyTracker progress="75" url="http://stat.flashtalking.com/reportV3/ft.stat?26892354-0-16-0-1987028E1B459F-1609734058"/>'+
    '    <agencyTracker progress="100" url="http://stat.flashtalking.com/reportV3/ft.stat?26892354-0-17-0-1987028E1B459F-1609734058"/>'+
    '    <agencyTracker progress="0" url="http://stats.smartclip.net/stats/beacon?352;4364;400x320;2717748;8309588;0;209921;;1379604678"/>'+
    '  </ad_details>'+
    '</content>';
});
