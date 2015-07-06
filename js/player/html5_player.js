var HTML5Player = Player.extend({

    useVideoSourceObject: false,
    video_src_tag: null,
    video_tag: null,
    templateID: "framework/player/html5",

    recreate_on_play: false,

    /*events: {
        "loadstart"         : 'loadstart',
        "durationchange"    : 'durationchange',
        "loadedmetadata"    : 'loadedmetadata',
        "loadeddata"        : 'loadeddata',
        "progress"          : 'progress',
        "canplay"           : 'canplay',
        "canplaythrough"    : "canplaythrough",
        "ended"             : 'ended',
        "timeupdate"        : 'timeupdate',

        "waiting"           : 'waiting',

        "abort"             : 'other_event',
        "suspend"           : 'other_event',
        "emptied"           : 'other_event',
        "seeked"            : 'other_event',
        "seeking"           : 'other_event',
        "playing"           : 'other_event',
        "stalled"           : 'other_event',
        "error"             : 'error',
    },*/

    initialize: function(_deviceInfo) {
        Player.prototype.initialize.call(this, _deviceInfo);

        this.useVideoSourceObject = _deviceInfo.useVideoSourceObject;
        //this.useVideoSourceObject = true;
    },

    bindPlayerEvents: function() {
        Logger.log('HTML5Player bindPlayerEvents ...');
        // not used at the moment see events property
        this.video_tag.addEventListener("loadstart",Util.bind(this, this.loadstart), false);
        this.video_tag.addEventListener("durationchange",Util.bind(this, this.durationchange), false);
        this.video_tag.addEventListener("loadedmetadata",Util.bind(this, this.loadedmetadata), false);
        this.video_tag.addEventListener("loadeddata",Util.bind(this, this.loadeddata), false);

        this.video_tag.addEventListener("progress", Util.bind(this, this.progress), false);
        this.video_tag.addEventListener("canplay",Util.bind(this, this.canplay), false);
        this.video_tag.addEventListener("canplaythrough",Util.bind(this, this.canplaythrough), false);
        this.video_tag.addEventListener("ended",Util.bind(this, this.ended), false);
        this.video_tag.addEventListener("timeupdate", playerInstance.timeupdate, false);
        this.video_tag.addEventListener("waiting",Util.bind(this, this.waiting), false);

        this.video_tag.addEventListener("abort",Util.bind(this, this.other_event), false);
        this.video_tag.addEventListener("suspend",Util.bind(this, this.other_event), false);
        this.video_tag.addEventListener("emptied",Util.bind(this, this.other_event), false);
        this.video_tag.addEventListener("seeked",Util.bind(this, this.other_event), false);
        this.video_tag.addEventListener("seeking",Util.bind(this, this.other_event), false);
        this.video_tag.addEventListener("playing",Util.bind(this, this.other_event), false);
        this.video_tag.addEventListener("stalled",Util.bind(this, this.other_event), false);
        this.video_tag.addEventListener("play",Util.bind(this, this.other_event), false);
        this.video_tag.addEventListener("pause",Util.bind(this, this.other_event), false);

        this.video_tag.addEventListener("error",Util.bind(this, this.error), false);
    },

    render: function() {
        Player.prototype.render.call(this);
        this.video_tag = $("#player_object", this.el)[0];
        this.bindPlayerEvents();
        return this;
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

        this.video_tag.load();
        //this.video_tag.play();
        this.play();
      }
    },

    error: function(event) {
        Logger.log("HTML5 error event.type:"+event.type);
        Logger.log("HTML5 error event.target:"+event.target);
        if (event.target.error !=null) {
            Logger.log("HTML5 error event.target.error.code:" + event.target.error.code);
            switch (event.target.error.code) {
                case 1 :
                    Logger.log("The fetching process for the media resource was aborted by the user agent at the user's request");
                    break;
                case 2 :
                    Logger.log("A network error of some description caused the user agent to stop fetching the media resource, after the resource was established to be usable");
                    break;
                case 3 :
                    Logger.log("An error of some description occurred while decoding the media resource, after the resource was established to be usable");
                    break;
                case 4 :
                    Logger.log("The media resource indicated by the src attribute was not suitable");
                    break;
                default:
                    Logger.log("no description");
            }
        }
        if (event.target === this.video_tag || event.target == this.video_src_tag) {
            if(this.videoInfoObject){
                Logger.log("HTML5 ERROR having video!");
                this.fatal_error();
            }
            else {
                Logger.log("HTML5 ERROR ignored --> we have no videoInfoObject");
            }
        } else {
            Logger.log("HTML5 ERROR ignored --> error event is not from video object");
        }
    },

    other_event: function(event) {
        //Logger.log("HTML5Player other_event type:"+event.type);
        this.trigger("player:"+event.type);
    },

    waiting: function(event) {
        Logger.log("HTML5Player waiting:");
        // TODO: Show Spinner App.loadingView.show();
    },

    loadstart: function() {
        Logger.log("HTML5Player loadstart");
        this.buffering_started();
    },

    durationchange: function(_event) {
        Logger.log("HTML5Player durationchange");
        this.duration_update(_event.target.duration);
    },

    loadedmetadata: function() {
        Logger.log("HTML5Player loadedmetadata "+this.video_tag.videoWidth+"/"+this.video_tag.videoHeight);
        //this.play();
    },

    loadeddata: function() {
        Logger.log("HTML5Player loadeddata");

    },

    progress: function() {
        if(this.video_tag.buffered.length > 0)
            this.buffering_progress(this.video_tag.buffered.end(0));
    },

    canplay: function() {
        Logger.log("HTML5Player canplay");
        this.buffering_completed();
    },

    canplaythrough: function() {
        Logger.log("HTML5Player canplaythrough");
        this.trigger("player:canplaythrough");
    },

    ended: function() {
        Logger.log("HTML5Player ended");
        this.playback_ended();
    },

    timeupdate: function(_event) {
    //    Logger.log("timeupdate");
        playerInstance.time_update(_event.target.currentTime, _event.target.currentTime);
    },

    show: function() {
        Logger.log("HTML5Player show");
        this.video_tag.style.display = "block";
        $(this.video_tag).attr("width","100%");
        $(this.video_tag).attr("height","100%");
        Logger.log(this.video_tag);
    },

    hide: function(_event) {
        Logger.log("HTML5Player hide");
        this.video_tag.style.display = "none";
    },

    reset: function() {
        Logger.log("HTML5Player reset");
        Player.prototype.reset.call(this);
        this.removeSource();
    },

    removeSource: function() {
        if(this.useVideoSourceObject) {
            $("#player_object source").remove();
        } else if (this.video_src_tag) {
            this.video_src_tag.src =  "";
        }
    },

    setDisplayArea: function(x,y,width, height) {
      this.el.style.position = "fixed";
      this.el.style.top = y + "px";
      this.el.style.left = x + "px";
      this.el.style.width = width + "px";
      this.el.style.height = height + "px";
    },

    seekTo: function(timeInSeconds) {
      this.video_tag.currentTime = timeInSeconds;
    },

    doPlay: function() {
        Logger.log('HTML5 playing the video!');
        this.video_tag.play();
    },
    doPause: function() {
        Logger.log('HTML5 pausing the video.');
        this.video_tag.pause();
    },
    doStop: function() {
        Logger.log('HTML5 stopping the video...');
        this.video_tag.pause();
        this.removeSource();
    }

});
