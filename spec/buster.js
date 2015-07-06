var config = module.exports;

config["Framework Tests"] = {
    env: "browser",
    rootPath: "../",
    sources: [
      "bower_components/jquery/jquery.js",
      "bower_components/klass/klass.js",
      "bower_components/underscore/underscore.js",
      "bower_components/backbone/backbone.js",
      "js/utils/utils.js",
      "js/advertisement/advertisement.js",
      "js/advertisement/parser/ad_parser.js",
      "js/advertisement/parser/empty_parser.js",
      "js/advertisement/parser/vast2_parser.js",
      "js/advertisement/parser/smartclip_parser.js",
      "js/advertisement/parser/parser_factory.js",
      "js/advertisement/ad_controller.js",
    ],
    tests: [
        "spec/**/*-test.js"
    ]
};

