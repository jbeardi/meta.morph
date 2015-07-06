/*
 * HistoryState Class
 */
var HistoryState = klass({
    
    initialize: function(_options){
        this.callbackFunction = (_options.callbackFunction ? _options.callbackFunction : null);
        this.callbackParams = (_options.callbackParams ? _options.callbackParams : {});
        this.callbackParams.fromBack = true;
        this.clear = (_options.clear ? _options.clear : false);
    }
});

/*
 * History Manager Class
 */
var HistoryManager = klass({
    initialize: function(_device) {
        _.extend(this, Backbone.Events);
        this.device = _device;
        this.states = [];
        Logger.log("HistoryManager initialized");
        if (this.device instanceof Html5Device) {
            this.html5HistoryDummyStateActive = false;
            if (window.history && window.history.pushState && typeof window.history.pushState == 'function' && !this.html5HistoryDummyStateActive) {
                Logger.log("pushing a new state");
                window.history.pushState('_state', "");
                this.html5HistoryDummyStateActive = true;
            }
            window.addEventListener('popstate', Util.bind(this,function(event) {
                Logger.log("popstate triggered");
                this.html5HistoryDummyStateActive = false;
                if (this.states.length < 1 && !this.html5HistoryDummyStateActive) {
                    Logger.log("sending history empty event");
                    event.preventDefault();
                    this.trigger("history:empty");
                }
                if (!this.html5HistoryDummyStateActive) {
                    Logger.log("pushing a new state");
                    window.history.pushState('_state', "");
                    this.html5HistoryDummyStateActive = true;
                } 
            }));
        }
    },
    // pushes a state to the history
    push: function(_historyState) {
        Logger.log("history.push");
        if (_historyState instanceof HistoryState) {
            // clear history states if necessary
            if (_historyState.clear)
                this.clear();
            // save state if it has a callback function defined
            if (typeof _historyState.callbackFunction == 'function') {
                this.states.push(_historyState);
                // push a state using HTML5 history management API in addition
                if (this.device instanceof Html5Device && window.history && window.history.pushState && typeof window.history.pushState == 'function' && !this.html5HistoryDummyStateActive) {
                    Logger.log("pushing a new state");
                    window.history.pushState('_state', "");
                    this.html5HistoryDummyStateActive = true;
                }
            }
            return true;
        } else {
            return false;
        }
    },
    // calls last history state's callback function OR triggers an empty event
    pop: function() {
        Logger.log("history.pop");
        // TODO: get and delete last history entry
        if (this.states.length > 0) {
            var lastState = this.states.pop();
            if (typeof lastState.callbackFunction == 'function'){
                if(lastState.callbackParams == null){
                    lastState.callbackFunction();
                } else {
                    lastState.callbackFunction(lastState.callbackParams); 
                }
            }
        } else {
            this.trigger("history:empty");
        }
    },
    // clears all history states
    clear: function() {
        Logger.log("history.clear");
        this.states = [];
    }
});
