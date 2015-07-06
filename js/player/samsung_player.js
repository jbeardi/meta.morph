var SamsungPlayer = Player.extend({
    templateID: "framework/player/samsung",

    recreate_on_play: false,
    pluginAPI: null,

    initialize: function(_info) {
        Logger.log('SamsungPlayer initialize ...');
        Player.prototype.initialize.call(this,_info);
        
        this.pluginAPI = new Common.API.Plugin();

        // EVENT LiSTENERS
        window.samPlayerInstance = this;
        this.plugin = document.getElementById("pluginPlayer");
        this.plugin.OnCurrentPlayTime = "window.samPlayerInstance.onCurrentPlayTime";
        this.plugin.OnStreamInfoReady = "window.samPlayerInstance.onStreamInfoReady";
        this.plugin.OnRenderingComplete = "window.samPlayerInstance.onRenderingComplete";
        this.plugin.OnBufferingStart = "window.samPlayerInstance.onBufferingStart";
        this.plugin.OnBufferingComplete = "window.samPlayerInstance.onBufferingComplete";

        this.plugin.OnBufferingProgress = "window.samPlayerInstance.onBufferingProgress";

        this.plugin.OnConnectionFailed = "window.samPlayerInstance.onError";
        this.plugin.OnNetworkDisconnected = "window.samPlayerInstance.onError";
        this.plugin.OnStreamNotFound = "window.samPlayerInstance.onError";
        this.plugin.OnRenderError = "window.samPlayerInstance.onError";
        this.plugin.OnAuthenticationFailed = "window.samPlayerInstance.onError";
        this.videoX = 0;
        this.videoY = 0;
        this.videoWidth=1280;
        this.videoHeight=720;
    },

    onError: function() {
        Logger.log("SamsungPlayer error()");

        if(playerInstance.videoInfoObject){
            this.fatal_error();
        }
        else {
            Logger.log("Samsung ERROR ignored --> we have no videoInfoObject");
        }
    },

    onStreamInfoReady: function() {
        Logger.log("SamsungPlayer onStreamInfoReady()");
        Logger.log("SamsungPlayer onStreamInfoReady() w: "+ this.plugin.GetVideoWidth());
        Logger.log("SamsungPlayer onStreamInfoReady() h: "+ this.plugin.GetVideoHeight());

        // Sadly the samsung device works with another resolution, we have
        // to compensate for this by multiplying the target values with 0.75
        this.plugin.SetDisplayArea(this.videoX * 0.75, this.videoY * 0.75, this.videoWidth * 0.75, this.videoHeight * 0.75);
        this.duration_update(this.plugin.GetDuration()/1000);
    },

    onBufferingStart: function() {
        Logger.log("SamsungPlayer onBufferingStart()");
        playerInstance.buffering_started();
    },

    onBufferingComplete: function(_isBuffering) {
        Logger.log("SamsungPlayer onBufferingComplete()");
        playerInstance.buffering_completed();
    },

    onBufferingProgress: function(_progress_in_percent) {
        Logger.log("SamsungPlayer onBufferingProgress(): "+_progress_in_percent);
        // this cant be used to draw the buffering bar since the percentage only show how much data it currently needs to buffer no fill the buffer and not the entire video
        //this.buffering_progress(_progress_in_percent);
    },

    onRenderingComplete: function() {
        Logger.log("SamsungPlayer ended()");
        if (this.pluginAPI.setOnScreenSaver)
            this.pluginAPI.setOnScreenSaver();
        this.playback_ended();
    },

    onCurrentPlayTime: function(_time) {
    //    Logger.log("onCurrentPlayTime: _time: "+_time);
        this.currentTime = _time;
        this.time_update(Math.floor(_time/1000), _time);
    },

    show: function() {
        // on Maple Device (< 2012) the player object will always be visible in the background
        Logger.log("SamsungPlayer show");
    },

    hide: function() {
        // on Maple Device (< 2012) the player object will always be visible in the background
        Logger.log("SamsungPlayer hide");
    },

    playVideo: function(_videoInfoObject,_seekTo) {
        Player.prototype.playVideo.call(this,_videoInfoObject,_seekTo);
        this.play();
    },

    setDisplayArea: function(x,y,width, height) {
        Logger.log(" Neue GRÖSSE DES PLAYERS : " + x + "x" + y+ " - " +width+ "x" + height);
        this.videoX = x;
        this.videoY = y;
        this.videoWidth = width;
        this.videoHeight = height;
        this.plugin.SetDisplayArea(x * 0.75, y * 0.75, width * 0.75, height * 0.75);
    },

    seekTo: function(timeInSeconds) {
      var skipTime = timeInSeconds - this.currentTime / 1000;
      this.plugin.JumpForward(skipTime);
    },

    doPlay: function() {
        Logger.log('Samsung playing the video!');
        if (this.pluginAPI.setOffScreenSaver)
            this.pluginAPI.setOffScreenSaver();
        if (this.pluginAPI.setOffIdleEvent)
            this.pluginAPI.setOffIdleEvent();
        if (this.previousState instanceof PausingState) {
            this.plugin.Resume();
        } else {
            // we need to add a special suffix for HLS playback on samsung
            var url_suffix = '';
            if (this.videoInfoObject.type == Player.VIDEO_TYPES.HLS){
               url_suffix += '|COMPONENT=HLS';
            }
            this.plugin.Play(this.videoInfoObject.url+url_suffix);
        }
    },
    doPause: function() {
        Logger.log('Samsung pausing the video.');
        this.plugin.Pause();
    },
    doStop: function() {
        Logger.log('Samsung stopping the video...');
        this.plugin.Stop();
        this.plugin.ClearScreen();
        if (this.pluginAPI.setOnScreenSaver)
            this.pluginAPI.setOnScreenSaver();
    },
    createVideoObject: function(_url,_type){
        Logger.warn("createVideoObject is deprecated -> build your own videoInfoObject: {url: ..,type: ..}, for types see: Player.VIDEO_TYPES")
        return Player.prototype.createVideoObject.call(this,_url,_type);
    },
});

var SamsungTizenPlayer = Player.extend({
    templateID: "framework/player/samsung_tizen",

    recreate_on_play: false,
    //pluginAPI: null,

    initialize: function(_info) {
        Logger.log('SamsungTizenPlayer initialize ...');
        Player.prototype.initialize.call(this,_info);
        
        //this.pluginAPI = new Common.API.Plugin();

        // EVENT LiSTENERS
        
        this.eventListeners = {
			onbufferingstart: this.onBufferingStart,
			onbufferingprogress: this.onBufferingProgress,
			onbufferingcomplete: this.onBufferingComplete,
			onstreamcompleted: Util.bind(this, this.onRenderingComplete),
			oncurrentplaytime: Util.bind(this, this.onCurrentPlayTime),
			oneventcallback: Util.bind(this, this.onEvent),
			onsubtitlecallback: function(duration, text, data3, data4) {
			    console.log("Subtitle Changed.");
			},
			ondrmcallback: function(drmEvent, drmData) {
			    console.log("DRM callback: " + drmEvent + ", data: " + drmData);
			}
	    }
        
        //window.samPlayerInstance = this;
        //this.plugin = document.getElementById("pluginPlayer");
        //this.plugin.OnStreamInfoReady = "window.samPlayerInstance.onStreamInfoReady";

        this.videoX = 0;
        this.videoY = 0;
        this.videoWidth=1280;
        this.videoHeight=720;
    },

    onEvent: function(eventType, eventData) {
        Logger.log("SamsungTizenPlayer onEvent()");
        console.log("Event type error : " + eventType + ", eventData: " + eventData);
		if (false) { // TODO: determine if this is an error
	        if(playerInstance.videoInfoObject){
	            this.fatal_error();
	        } else {
	            Logger.log("Samsung ERROR ignored --> we have no videoInfoObject");
	        }
       	}
    },

	/*
    onStreamInfoReady: function() {
        Logger.log("SamsungPlayer onStreamInfoReady()");
        Logger.log("SamsungPlayer onStreamInfoReady() w: "+ this.plugin.GetVideoWidth());
        Logger.log("SamsungPlayer onStreamInfoReady() h: "+ this.plugin.GetVideoHeight());

        // Sadly the samsung device works with another resolution, we have
        // to compensate for this by multiplying the target values with 0.75
        this.plugin.SetDisplayArea(this.videoX * 0.75, this.videoY * 0.75, this.videoWidth * 0.75, this.videoHeight * 0.75);
        this.duration_update(this.plugin.GetDuration()/1000);
    },
    */

    onBufferingStart: function() {
        Logger.log("SamsungTizenPlayer onBufferingStart()");
        playerInstance.buffering_started();
    },

    onBufferingComplete: function(_isBuffering) {
        Logger.log("SamsungTizenPlayer onBufferingComplete()");
        playerInstance.buffering_completed();
    },

    onBufferingProgress: function(_progress_in_percent) {
        Logger.log("SamsungTizenPlayer onBufferingProgress(): "+_progress_in_percent);
        // this cant be used to draw the buffering bar since the percentage only show how much data it currently needs to buffer no fill the buffer and not the entire video
        //this.buffering_progress(_progress_in_percent);
    },

    onRenderingComplete: function() {
        Logger.log("SamsungTizenPlayer ended()");
        this.playback_ended();
    },

    onCurrentPlayTime: function(_time) {
    //    Logger.log("onCurrentPlayTime: _time: "+_time);
        this.currentTime = _time;
        this.time_update(Math.floor(_time/1000), _time);
    },

    show: function() {
        Logger.log("SamsungTizenPlayer show");
    },

    hide: function() {
        Logger.log("SamsungTizenPlayer hide");
    },

    playVideo: function(_videoInfoObject,_seekTo) {
        Player.prototype.playVideo.call(this,_videoInfoObject,_seekTo);
        this.play();
    },

    setDisplayArea: function(x,y,width, height) {
        switch (webapis.avplay.getState()) {
        	case "PLAYING" :
        		Logger.log(" Neue GRÖSSE DES PLAYERS : " + x + "x" + y+ " - " +width+ "x" + height);
        		this.videoX = x;
		        this.videoY = y;
		        this.videoWidth = width;
		        this.videoHeight = height;
        		webapis.avplay.pause();
        		webapis.avplay.setDisplayRect(x,y,width,height);
        		webapis.avplay.play();
        		return true;
        		break;
        	case "IDLE" :
        	case "PAUSED" :
        		Logger.log(" Neue GRÖSSE DES PLAYERS : " + x + "x" + y+ " - " +width+ "x" + height);
        		this.videoX = x;
		        this.videoY = y;
		        this.videoWidth = width;
		        this.videoHeight = height;
        		webapis.avplay.setDisplayRect(x,y,width,height);
        		return true;
        		break;
        	case "NONE" :
        	case "READY" :
        	default :
        		Logger.log("Not allowed to change player size in this player state: " + webapis.avplay.getState());
        		return false;
        		break;
        }
    },

    seekTo: function(timeInSeconds) {
      var skipTime = timeInSeconds * 1000 - this.currentTime;
      if (skipTime > 0) {
      	webapis.avplay.jumpForward(skipTime);
      } else {
      	webapis.avplay.jumpBackward(-skipTime);
      }
    },

    doPlay: function() {
        Logger.log('Samsung playing the video!');
        if (this.previousState instanceof PausingState) {
            webapis.avplay.play();
        } else {
        	webapis.avplay.open(this.videoInfoObject.url);
			webapis.avplay.setListener(this.eventListeners);
			//this.setDisplayArea(0,0,1920,1080);
			webapis.avplay.prepare();
			webapis.avplay.play();
			this.duration_update(webapis.avplay.getDuration()/1000);
        }
    },
    doPause: function() {
        Logger.log('Samsung pausing the video.');
        webapis.avplay.pause();
    },
    doStop: function() {
        Logger.log('Samsung stopping the video...');
        webapis.avplay.stop();
    },
    createVideoObject: function(_url,_type){
        Logger.warn("createVideoObject is deprecated -> build your own videoInfoObject: {url: ..,type: ..}, for types see: Player.VIDEO_TYPES")
        return Player.prototype.createVideoObject.call(this,_url,_type);
    },
});

