buster.spec.expose();

describe("a parser factory", function() {
  it("should be able to detect a vast2 file", function() {
    var responseDoc = new DOMParser().parseFromString("<VAST version='2.0'></VAST>", 'text/xml');
    buster.assert(ParserFactory.getParser(responseDoc.firstChild) instanceof Vast2Parser);
  });

  it("should be able to detect a smartclip file", function() {
    var responseDoc = new DOMParser().parseFromString("<content></content>", 'text/xml');
    buster.assert(ParserFactory.getParser(responseDoc.firstChild) instanceof SmartclipParser);
  });

  it("should return an empty parser if the format is not recognized", function() {
    var responseDoc = new DOMParser().parseFromString("<BLABLAFORMAT/>", 'text/xml');
    buster.assert(ParserFactory.getParser(responseDoc.firstChild) instanceof EmptyParser);
  });

  it("should return an empty parser if the dom is empty", function() {
    buster.assert(ParserFactory.getParser(null) instanceof EmptyParser);
  });

  it("should not throw an error if the given dom is not a dom at all", function() {
    buster.assert(ParserFactory.getParser(2) instanceof EmptyParser);
    buster.assert(ParserFactory.getParser("haha") instanceof EmptyParser);
  });
});
