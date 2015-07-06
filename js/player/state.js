// ToDo: Warum?
var BaseState = Backbone.Model.extend({
    
    initialize: function(owner) {
        this.owner = owner;
    },
    
    enter: function(_previousState) {
        // Implement me in your state objects
        // passing _previousState just in case the next states needs to know about the previousState
    },
    
    execute: function() {
      // Implement me in your state objects
    },
    
    play: function() {
        Logger.log('changing to the playing state...');
        this.owner.changeState(this.owner.states.playing);
    },
    
    stop: function() {
        Logger.log('changing to the stopping state...');
        this.owner.changeState(this.owner.states.stopping);
    },
    
    pause: function() {
        Logger.log('changing to the pausing state...');
        this.owner.changeState(this.owner.states.pausing);
    },
    
    exit: function() {
      // Implement me in your state objects
    }

});

var PlayingState = BaseState.extend({
    
    execute: function() {
        Logger.log('playing the video!');
        this.owner.doPlay();
        this.owner.trigger("player:switched_state:playing");
    },
    
    play: function() {
        Logger.log('already playing!');
    }

});

var StoppingState = BaseState.extend({
    
    enter: function() {
        Logger.log('we have entered the stopping state...');
    },
    
    execute: function() {
        Logger.log('stopping the video...');
        this.owner.videoInfoObject = null;
        this.owner.doStop();
        this.owner.trigger("player:switched_state:stopped");
    },
    
    stop: function() {
        Logger.log('already stopped!');
    },
    
    pause: function() {
        Logger.log('pause not possible!');
    }

});

var PausingState = BaseState.extend({
    
    execute: function() {
        Logger.log('pausing the video.');
        this.owner.doPause();
        this.owner.trigger("player:switched_state:paused");
    },
    
    pause: function() {
        this.owner.changeState(this.owner.states.playing);
    }

});
