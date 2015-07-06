var PhilipsCEhtmlPlayer = CEHTMLPlayer.extend({

    initialize: function(_deviceInfo) {
        CEHTMLPlayer.prototype.initialize.call(this, _deviceInfo);
    },

    reset: function() {
        Logger.log("PhilipsPlayer reset");
        this.doStop();
        Player.prototype.setInitialState.call(this);
        Logger.log("reset done!");
    },

    doStop: function() {
        Logger.log('PhilipsPlayer stopping the video...');
        this.stopPlayPostionInterval();
        this.video_tag.stop();
    }

});

var PhilipsHTML5Player = HTML5Player.extend({

    initialize: function(_deviceInfo) {
        HTML5Player.prototype.initialize.call(this, _deviceInfo);
    },

    reset: function() {
        Logger.log("PhilipsPlayer reset");
        Player.prototype.setInitialState.call(this);
        this.doStop();
    },

    doStop: function() {
        Logger.log('PhilipsPlayer stopping the video...');
        this.video_tag.pause();
    }

});
