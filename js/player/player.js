var playerInstance = null;

var Player = Backbone.View.extend({
    tagName: "div",
    videoInfoObject: null,
    templateID: "framework/player/generic",
    template: null,
    recreate_on_play: false,
    state: null,
    previousState : null,
    _hasBufferIndicator: false,
    playerCurrentTime: -1,
    seekImmediatellyToPosition: false,
    resumePlayDelay: 0,

    initialize: function(_deviceInfo) {
        this.deviceInfo = _deviceInfo;
        this.template = window.JST[this.templateID];
        this.states = {};
        this.states.playing = new PlayingState(this);
        this.states.pausing = new PausingState(this);
        this.states.stopping = new StoppingState(this);
        this.setInitialState();

        playerInstance = this;
    },

    setInitialState: function() {
        Logger.log('Player setInitialState ...');
        //this.changeState(this.states.stopping);
        this.playerCurrentTime = -1;
        this.state = this.states.stopping;
    },

    play: function() {
        Logger.log('Player play ...');
        this.state.play();
    },
    pause: function() {
        Logger.log('Player pause ...');
        this.state.pause();
    },
    stop: function() {
        Logger.log('Player stop ...');
        this.state.stop();
    },

    playVideo: function(_videoInfoObject,_seekTo) {
        this.videoInfoObject = _videoInfoObject;
        this.blockPauseState = true;
        if(typeof _seekTo != 'undefined'){
            this.seekImmediatellyToPosition = _seekTo;
        }
        else{
            this.seekImmediatellyToPosition = false;
        }
            
    },

    buffering_started: function() {
        Logger.log('Player buffering_started ...');
        this.trigger("player:buffering_started");
    },
    buffering_completed: function() {
        Logger.log('Player buffering_completed ...');
        this.trigger("player:buffering_completed");
    },
    buffering_progress: function(_time) {
        //Logger.log('Player buffering_progress ...');
        this.trigger("player:buffering_progress",_time);
    },
    time_update: function(_timeInSecs, _timeInDeviceFormat) {
        //Logger.log('Player time_update ...' + _timeInSecs);
        // unblock pause state if current playtime is greater than zero
        if (this.blockPauseState && (_timeInSecs > this.resumePlayDelay || (_timeInDeviceFormat && _timeInDeviceFormat > this.resumePlayDelay)) ) {
            this.blockPauseState = false;
            this.trigger("player:playback_started");
            if(this.seekImmediatellyToPosition){
                this.playerCurrentTime = 0;
                this.seek(this.seekImmediatellyToPosition);
                this.seekImmediatellyToPosition = false;
            }
        }
            
        this.playerCurrentTime = _timeInSecs;
        this.trigger("player:time_update",_timeInSecs);
    },
    duration_update: function(_time) {
        //Logger.log('Player total_time_update ...');
        this.trigger("player:duration_update",_time);
    },
    playback_ended: function() {
        Logger.log('Player playback_ended');
        this.reset();
        this.trigger("player:playback_ended");
    },
    fatal_error: function() {
        Logger.log('Player fatal_error ...');
        this.reset();
        this.trigger("player:fatal_error");
    },
    changeState: function(state) {
        // Make sure the current state wasn't passed in
        if (this.state !== state) {
            // don't change into pausing state when it's not unblocked
            if (state instanceof PausingState && this.blockPauseState) {
                return false;
            }
            // Make sure the current state exists before
            // calling exit() on it
            if (this.state) {
                this.state.exit();
            }
            this.previousState = this.state;
            this.state = state;
            this.state.enter(this.previousState);
            this.state.execute();
        }
        return true;
    },

    toggle_play_pause: function() {
        Logger.log('toggle_play_pause...');
        if(this.state instanceof PlayingState) {
            this.pause();
        }
        else {
            this.play();
        }
    },

    reset: function() {
        this.stop();
        this.seekImmediatellyToPosition = false;
        this.setInitialState();
    },
    getRenderingContext: function() {
        if(this.videoInfoObject !== null){
            return {
                        url: this.videoInfoObject.url,
                        type: this.videoInfoObject.type
                    };
        }
        else {
            return {
                    url: '',
                    type: Player.VIDEO_TYPES.MP4
                    };
        }
    },
    render: function() {
        this.$el.html(this.template(this.getRenderingContext()));
        return this;
    },

    hide: function () {
        this.$el.hide();
    },
    show: function () {
        this.$el.show();
    },

    setDisplayArea: function(x,y,width, height) {
      // Must be implemented in extending subclass
    },

    seekTo: function(timeInSeconds) {
      // Must be implemented in extending subclass
    },

    /**
     * Seek relative from the current position
     * -10 means 10 secs back, 10 means 10 secs forward
     */
    seek: function(timeInSeconds) {
      var time = this.playerCurrentTime + timeInSeconds;
      if (time < 0) {
        time = 0;
      }
      this.seekTo(time);
    },

    /*
     * Device/technology specific methods
     */
    doPlay: function () {
        // must be implemented in extending subclass
    },
    doPause: function () {
        // must be implemented in extending subclass
    },
    doStop: function () {
        // must be implemented in extending subclass
    },
    createVideoObject: function(_url,_type){
        Logger.warn("createVideoObject is deprecated -> build your own videoInfoObject: {url: ..,type: ..}, for types see: Player.VIDEO_TYPES")
        return {url: _url,type: _type};
    },
    isPaused: function(){
        return (this.state instanceof PausingState);
    },
    isPlaying: function(){
        return (this.state instanceof PlayingState);
    },
    isStopped: function(){
        return (this.state instanceof StoppingState);
    },
    hasBufferIndicator: function(){
        return this._hasBufferIndicator;
    },
},{
    VIDEO_TYPES: {
        MP4: "video/mp4",
        HLS: "application/vnd.apple.mpegurl",
    }
});
