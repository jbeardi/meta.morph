var AndroidTVPlayer = HTML5Player.extend({

        templateID: "framework/player/androidtv",
        _hasBufferIndicator: true,
        resumePlayDelay: 0.2,

        initialize: function(_deviceInfo) {
            HTML5Player.prototype.initialize.call(this, _deviceInfo);
        },

        playVideo: function(_videoInfoObject,_seekTo) {
            if (_videoInfoObject) {
                Player.prototype.playVideo.call(this,_videoInfoObject,_seekTo);

                 if(this.useVideoSourceObject) {
                    //TODO: make use of template for the source tag
                    var videosrc = document.createElement('source');
                    $(this.video_tag).empty().append(videosrc);
                    this.video_src_tag = videosrc;
                    // we attach the error handler to the source element cause it does net fire on the video tag
                    var self = this;
                    $(videosrc).on("error", function(event) {
                      self.error(event);
                        });
                    } else {
                        this.video_src_tag = this.video_tag;
                    }

                this.video_src_tag.type = this.videoInfoObject.type;
                this.video_src_tag.src = this.videoInfoObject.url;
                this.show(); // TODO GoogleTV needs video tag to be visible before loading the video - why? In DCH it seems not required ...
                        
                this.play();
          }
    },

    doPlay: function() {
        Logger.log('AndroidTV playing the video!');
        this.video_tag.play();    
        window.androidTVWrapper && window.androidTVWrapper.player_playing();
    },
    
    doPause: function() {
        Logger.log('AndroidTV pausing the video.');
        this.video_tag.pause();
        window.androidTVWrapper && window.androidTVWrapper.player_paused();
    },
    
    doStop: function() {
        Logger.log('AndroidTV stopping the video...');
        this.video_tag.pause();
        window.androidTVWrapper && window.androidTVWrapper.player_stopped();
        this.removeSource();
    }

});
