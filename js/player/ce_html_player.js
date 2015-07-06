var CEHTMLPlayer = Player.extend({

    templateID: "framework/player/cehtml",
    video_object_templateID: "framework/player/cehtml_video_object",

    recreate_on_play: true,
    currentPlayTimeInterval: null,

    initialize: function(_deviceInfo) {
        Logger.log('CEHTMLPlayer initialize ...');
        Player.prototype.initialize.call(this, _deviceInfo);
        this.video_object_template = window.JST[this.video_object_templateID];
    },

    playStateChanged: function() {
        Logger.log('CEHTMLPlayer playStateChanged ...');
        Logger.log('CEHTMLPlayer playStateChanged this: '+this);
        Logger.log('CEHTMLPlayer playStateChanged this._playState: '+this.video_tag.playState);
        switch (this.video_tag.playState) {
            case 5: // finished
                Logger.log("CEHTMLPlayer state: ended");
                playerInstance.ended();
                break;
            case 6: // error
                Logger.log("CEHTMLPlayer state: error");
                playerInstance.error();
                break;
            case 0: // stopped
                Logger.log("CEHTMLPlayer state: stopped");
                break;
            case 1: // playing
                Logger.log("CEHTMLPlayer state: playing");
                playerInstance.durationupdate(playerInstance.video_tag.playTime);
                playerInstance.buffering_completed();
                playerInstance.startPlayPostionInterval();
                break;
            case 2: // paused
                Logger.log("CEHTMLPlayer state: paused");
                break;
            case 3: // connecting
                Logger.log("CEHTMLPlayer state: connecting");
                break;
            case 4: // buffering
                Logger.log("CEHTMLPlayer state: buffering");
                playerInstance.buffering_started();
                break;
            default: // do nothing
                Logger.log("CEHTMLPlayer no state matched!!!");
                break;
        }
    },

    startPlayPostionInterval: function() {
        Logger.log('CEHTMLPlayer setPlayPostionTime ...');

        if (playerInstance.currentPlayTimeInterval) {
            clearInterval(playerInstance.currentPlayTimeInterval);
        }

        playerInstance.currentPlayTimeInterval = setInterval(function() {
            playerInstance.timeupdate(playerInstance.video_tag.playPosition);
        }, 200);
    },

    stopPlayPostionInterval: function() {
        Logger.log('CEHTMLPlayer stopPlayPostionInterval ...');

        if (playerInstance && playerInstance.currentPlayTimeInterval) {
            clearInterval(playerInstance.currentPlayTimeInterval);
            playerInstance.currentPlayTimeInterval = null;
        }
    },

    error: function() {
        Logger.log("CEHTMLPlayer error()");

        if(playerInstance.videoInfoObject){
            this.fatal_error();
        }
        else {
            Logger.log("CEHTML ERROR ignored --> we have no videoInfoObject");
        }
    },

    onBuffering: function(_isBuffering) {
        Logger.log("CEHTMLPlayer onBuffering() _isBuffering: "+ _isBuffering);
        if(_isBuffering){
            playerInstance.buffering_started();
        }
        else{
            playerInstance.buffering_completed();
        }
    },

    ended: function() {
        Logger.log("CEHTMLPlayer ended()");
        this.playback_ended();
    },

    timeupdate: function(_time) {
        this.time_update(Math.floor(_time/1000), _time);
    },

    durationupdate: function(_time) {
        Logger.log("durationupdate: _time: "+_time);
        this.duration_update(Math.floor(_time/1000));
    },

    show: function() {
        Logger.log("CEHTMLPlayer show");
        this.video_tag.width = (this.videoWidth || 1280) + "px";
        this.video_tag.height = (this.videoHeight || 720) + "px";
    },

    hide: function() {
        Logger.log("CEHTMLPlayer hide");
        this.video_tag.width = "0px";
        this.video_tag.height = "0px";
    },

    render: function() {
        Logger.log("CEHTMLPlayer render");
        Player.prototype.render.call(this);
        this.video_tag = $("#video_player", this.el)[0];
        this.player_div = $("#player_div", this.el)[0];
        return this;
    },
    
    playVideo: function(_videoInfoObject,_seekTo) {
        var video_type_changed = false;
        if(this.videoInfoObject && this.videoInfoObject.type != _videoInfoObject.type) {
            video_type_changed = true;
        }
        Player.prototype.playVideo.call(this,_videoInfoObject,_seekTo);
        //this.video_tag = $("#player_object", this.el)[0];
        Logger.log(this.video_tag);
        // if the video type we need to rerender the video object
        if(video_type_changed){
            this.player_div.empty();
            // we are not setting the url on rendering, cause we want to listen to playStateChanges on the new tag
            // it might be to late to set listeners after setting the url ....
            this.player_div.html(this.video_object_template({url: '',type: _videoInfoObject.type}));
            this.video_tag = $("#video_player", this.el)[0];
        }else{
            // do nothing, type did not change
        }
        if (this.deviceInfo.vendor == VENDOR.LG) {
            Logger.log('CEHTMLPlayer setting LG callbacks ...');
            this.video_tag.PlayStateChange = Util.bind(this, this.playStateChanged);
            //this.video_tag.onBuffering = this.onBuffering; // reported in LG Doc but not working...
            //this.video_tag.onError = this.error; // reported in LG Doc but not working...
        } else{
            this.video_tag.onPlayStateChange = Util.bind(this, this.playStateChanged);
        }
        this.video_tag.data = this.videoInfoObject.url;

        this.show();
        this.play();
    },

    setDisplayArea: function(x,y,width, height) {
      this.videoWidth = width;
      this.videoHeight = height;
      this.player_div.style.position = "fixed";
      this.player_div.style.top =  y + "px";
      this.player_div.style.left = x + "px";
      this.player_div.style.width = width + "px";
      this.player_div.style.height = height + "px";
      this.video_tag.style.width = width + "px";
      this.video_tag.style.height = height + "px";
      this.video_tag.width = width + "px";
      this.video_tag.height = height + "px";
    },

    seekTo: function(timeInSeconds) {
      this.video_tag.seek(timeInSeconds*1000);
    },

    doPlay: function() {
        Logger.log('CEHTML playing the video! '+this.video_tag.width+"/"+this.video_tag.height);
        Logger.log('CEHTML playing the video! '+this.video_tag.data);
        this.video_tag.play(1);
    },
    doPause: function() {
        Logger.log('CEHTML pausing the video.');
        this.video_tag.play(0);
    },
    doStop: function() {
        Logger.log('CEHTML stopping the video...');
        this.stopPlayPostionInterval();
        this.video_tag.stop();
        this.video_tag.data = "";
    }
});
