var ParserFactory = {
  getParser: function(dom, ad) {
    if (dom == null) {
      return new EmptyParser(ad);
    } else if (dom.nodeName == "VAST") {
      return new Vast2Parser(dom, ad);
    } else if (dom.nodeName == "content") {
      return new SmartclipParser(dom, ad);
    }
    return new EmptyParser();
  }
};
