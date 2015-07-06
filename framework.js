/*! @preserve
* Copyright (c) meta.morph Medien GmbH 2015
* All Rights Reserved.
* 
* No part of this source code or any of its contents may be reproduced, 
* copied, modified or adapted, without the prior written consent of the 
* author, unless otherwise indicated for stand-alone materials.
*
* Commercial use and distribution of this source code is not allowed 
* without express and prior written consent of the author.
*/
this["JST"] = this["JST"] || {};
this["JST"]["framework/player/androidtv"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<video id="player_object" autoplay autobuffer preload="metadata" width="0px" height="0px"></video>';}return __p};
this["JST"]["framework/player/cehtml"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div id=\'player_div\'><object id="video_player" type="' +((__t = ( type )) == null ? '' : __t) +'" data="' +((__t = ( url )) == null ? '' : __t) +'" height="0px" width="0px" top="0px" left="0px"></object></div>';}return __p};
this["JST"]["framework/player/cehtml_video_object"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<object id="video_player" type="' +((__t = ( type )) == null ? '' : __t) +'" data="' +((__t = ( url )) == null ? '' : __t) +'" height="0px" width="0px" top="0px" left="0px"></object>';}return __p};
this["JST"]["framework/player/firetv"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<video id="player_object" autoplay autobuffer preload="metadata" width="0px" height="0px"></video>';}return __p};
this["JST"]["framework/player/generic"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<object id="player_object" type="' +((__t = ( type )) == null ? '' : __t) +'" data="' +((__t = ( url )) == null ? '' : __t) +'" style="display: none;"></object>';}return __p};
this["JST"]["framework/player/html5"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<video id="player_object" width="0px" height="0px" preload="none"></video>';}return __p};
this["JST"]["framework/player/samsung"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '';}return __p};
this["JST"]["framework/player/samsung_tizen"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<OBJECT id="player_object" type="application/avplayer"></OBJECT>';}return __p};
//
//------ LOGGER ------
//
var Logger = {
    logToHTML : false,
    logToConsole : false,
    logToAlert : false,
    logToHTMLFromSetup : false,
    logToConsoleFromSetup : false,
    logToAlertFromSetup : false,
    isExclusive : false,
    remoteUrl: null,
    remoteMethod: null,
    remoteLevel: null,
    LEVEL: ["debug", "info", "warn", "error"]
};
//
Logger.setup = function(_logToHTML, _logToConsole, _logToAlert) {
    if (_logToHTML) {
        Logger.logToHTML = true;
        Logger.logToHTMLFromSetup = true;

        // direct errors to HTML Console
        window.onerror = function(msg, url, line) {
            Logger.error('OnError: '+ msg + "\nurl: " + url + "\nline #: " + line);
            var suppressErrorAlert = false;
            return suppressErrorAlert;
        };
    }
    if (_logToConsole) {
        Logger.logToConsole = true;
        Logger.logToConsoleFromSetup = true;
    }
    if (_logToAlert) {
        Logger.logToAlert = true;
        Logger.logToAlertFromSetup = true;
    }
};

Logger.setupRemote = function(url, method, level) {
  Logger.remoteUrl = url;
  if (method !== null && method != undefined) {
    Logger.remoteMethod = method;
  } else {
    Logger.remoteMethod = "get";
  }
  if (level !== null && level != undefined) {
    Logger.remoteLevel = Logger.LEVEL.indexOf(level);
  } else {
    Logger.remoteLevel = "debug";
  }
};

Logger.remoteLog = function(level, message) {
  if (message !== null && message != undefined &&
      Logger.remoteUrl !== null && Logger.remoteLevel <= Logger.LEVEL.indexOf(level)) {

    if (message.innerHTML != undefined) {
      message = message.innerHTML;
    }

    $.ajax({
      url: Logger.remoteUrl,
      method: Logger.remoteMethod,
      data: {message: message}
    });
  }
};

Logger.show = function() {
    if (Logger.logToHTML) {
        // TODO: make id of console configurable ?
        document.getElementById('Console').style.display = 'block';
    }
};
Logger.hide = function() {
    if (Logger.logToHTML) {
        document.getElementById('Console').style.display = 'none';
    }
};
Logger.log = function(txt) {
    Logger.remoteLog("debug", txt);
    if (Logger.logToHTML) {
        document.getElementById('Console').innerHTML += '<br/><span class="log">' + txt +"</span>";
    }
    if (Logger.logToConsole)
        console.log(txt);
    if (Logger.logToAlert)
        alert(txt);
};
Logger.logExclusive = function(txt) {
    Logger.remoteLog("debug", txt);
    if (Logger.logToHTMLFromSetup) {
        if (!Logger.isExclusive) {
            document.getElementById('Console').innerHTML = 'just exlusive logs...';
            Logger.isExclusive = true;
            Logger.logToHTML = false;
        }
        document.getElementById('Console').innerHTML += '<br/>' + txt;
    }
    if (Logger.logToConsoleFromSetup) {
        console.log(txt);
        Logger.logToConsole = false;
    }
    if (Logger.logToAlertFromSetup) {
        alert(txt);
        //Logger.logToAlert = false;
    }
};
Logger.logLast = function(txt) {
    Logger.remoteLog("debug", txt);
    if (Logger.logToHTMLFromSetup) {
        document.getElementById('Console').innerHTML += '<br/>' + txt;
    }
    if (Logger.logToConsoleFromSetup)
        console.log(txt);
    if (Logger.logToAlertFromSetup)
        alert(txt);
    Logger.logToHTML = false;
    Logger.logToConsole = false;
    Logger.logToAlert = false;
    Logger.logToHTMLFromSetup = false;
    Logger.logToConsoleFromSetup = false;
    Logger.logToAlertFromSetup = false;
};

Logger.info = function(txt) {
    Logger.remoteLog("info", txt);
    if (Logger.logToHTML) {
        document.getElementById('Console').innerHTML += '<br/><span class="info">' + txt +"</span>";
    }
    if (Logger.logToConsole)
        console.info(txt);
    if (Logger.logToAlert)
        alert(txt);
};
Logger.warn = function(txt) {
    Logger.remoteLog("warn", txt);
    if (Logger.logToHTML) {
        document.getElementById('Console').innerHTML += '<br/><span class="warn">' + txt +"</span>";
    }
    if (Logger.logToConsole)
        console.warn(txt);
    if (Logger.logToAlert)
        alert(txt);

};
Logger.debug = function(txt) {
    Logger.remoteLog("debug", txt);
    if (Logger.logToHTML) {
        document.getElementById('Console').innerHTML += '<br/><span class="debug">' + txt +"</span>";
    }
    if (Logger.logToConsole)
        console.debug(txt);
    if (Logger.logToAlert)
        alert(txt);
};
Logger.error = function(txt) {
    Logger.remoteLog("error", txt);
    if (Logger.logToHTML) {
        document.getElementById('Console').innerHTML += '<br/><span class="error">' + txt +"</span>";
    }
    if (Logger.logToConsole)
        console.error(txt);
    if (Logger.logToAlert)
        alert(txt);
};

var SYSTEM_TYPE = {
  TV : 0,
  MONITOR : 1,
  BD : 2
};

if (typeof klass !== 'undefined' && $.klass) {
  klass = $.klass;
}

var Util = {};
Util.getFancyTime = function(time) {
  if(time === 0) {
    return "00:00:00";
  }
  var hours = Math.floor(time / 3600);
  time -= hours * 3600;

  var minutes = Math.floor(time / 60);
  time -= minutes * 60;

  var seconds = parseInt(time % 60, 10);

  return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
};

Util.getCurrentSystemType = function() {
  var result = SYSTEM_TYPE.BD;
  var location = window.location.search;
  if (location !== '') {
      if (location.substring(0, 1) == '?') {
          location = location.substring(1, location.length);
      }
      var locations = location.split('&');
      if (locations.length > 0) {
          for (var i = 0; i < locations.length; i++) {
              var values = locations[i].split('=');
              if (values[0] !== '' && values[1] !== '') {
                  if (values[0] == 'product') {
                      result = values[1];
                      break;
                  }
              }
          }
      }
  }
  return result;
};

Util.isBD = function() {
  return Util.getCurrentSystemType() == SYSTEM_TYPE.BD;
};

// CHECK iF UNDEFiNED / NULL
Util.defined = function(_val) {
  var result = false;
  if (_val != undefined && _val !== null)
      result = true;
  return result;
};

Util.html = function(pDiv, pContents) {
  if (pDiv !== null) {
      while (pDiv.firstChild) {
          if (pDiv.deleteChild) {
              try {pDiv.deleteChild(pDiv.firstChild);} catch(e) {}
          } else {
              try {pDiv.removeChild(pDiv.firstChild);} catch(e) {}
          }
      }
      if (typeof pContents == 'string') {
          pDiv.innerHTML = pContents;
      } else {
          pDiv.appendChild(pContents);
      }
  }
};

Util.append = function(pDiv, pContents, considerXHTMLTags) {
  if (pDiv !== null) {
      if (typeof pContents == 'string') {
          Util.appendHTML(pDiv, pContents, considerXHTMLTags);
      } else {
          pDiv.appendChild(pContents);
      }
  }
};

Util.appendHTML = function(pDiv, pContents, considerXHTMLTags) {
  if (pDiv !== null) {
      var formerInnerHTML = "";
      try {
          formerInnerHTML = pDiv.innerHTML;
      } catch(e) {
          Logger.log("Util.append: ERROR: " + e);
      }
      // hack for XHTML:
      if (considerXHTMLTags)
          formerInnerHTML = formerInnerHTML.replace(/(<div\s[^(\/>)]*)\/>/g, "$1></div>");

      while (pDiv.firstChild) {
          if (pDiv.deleteChild) {
              try {
                  pDiv.deleteChild(pDiv.firstChild);
              } catch(e) {
              }
          } else {
              try {
                  pDiv.removeChild(pDiv.firstChild);
              } catch(e) {
              }
          }
      }
      pDiv.innerHTML = formerInnerHTML + pContents;
  }
};

Util.trim = function(str, chars) {
  return str.replace(/^\s+|\s+$/g, "");
};

Util.stripHTML = function(oldString) {
  var newString = "";
  var inTag = false;
  if (oldString) {
    for (var i = 0; i < oldString.length; i++) {

      if (oldString.charAt(i) == '<') {
        inTag = true;
      } else if (oldString.charAt(i) == '>' && oldString.charAt(i + 1) != "<") {
        inTag = false;
        i++;
        newString += " ";
      }

      if (!inTag) {
        newString += oldString.charAt(i);
      }

    }
  }
  return newString;
};

Util.sizeOf = function(obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key))
          size++;
  }
  return size;
};

Util.bind = function(scope, fn, arguments) {
  return function() {
      fn.apply(scope, arguments);
  };
};

Util.zeroPad = function(num, width) {
  num = num.toString();
  while (num.length < width)
  num = "0" + num;
  return num;
};

/*
* Preloads a given amount of image URLs.
* Uses given array reference to store.
* @param
*      urlArr: Array of image URLs to preload
*      imageArrayRef: Array reference to store to
*/
Util.preloadImages = function(urlArr, imageArrayRef) {
  var prelImgsLength = imageArrayRef.length;
  for (i = 0; i < urlArr.length; i++) {
      imageArrayRef[prelImgsLength+i] = document.createElement("img");
      imageArrayRef[prelImgsLength+i].src = urlArr[i];
  }
};

Util.stripTags = function (input, allowed) {
  allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
      commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  if(input){
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
  }
  return input;
};

Util.addKeyframe = function(keyframes) {

    if( document.styleSheets && document.styleSheets.length ) {

        document.styleSheets[0].insertRule( keyframes, 0 );

    } else {

        var s = document.createElement( 'style' );
        s.innerHTML = keyframes;
        document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
    }
};

Util.match = function (_haystack, _stringToMatch, _caseInsensitive, _useRegex) {
    if ( typeof _useRegex != 'undefined' && _useRegex ) {
        // match given string with haystack via regular expression:
        return (_haystack.search(_stringToMatch) > -1 ? true : false);
    } else if ( typeof _caseInsensitive != 'undefined' && _caseInsensitive ) {
        // match given string with haystack via string matching (case insensitive):
        return (_haystack.toLowerCase().indexOf(String(_stringToMatch).toLowerCase()) > -1 ? true : false);
    } else {
        // DEFAULT match given string with haystack via string matching (case sensitive):
        return (_haystack.indexOf(_stringToMatch) > -1 ? true : false);
    }
};

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

var FireTVPlayer = HTML5Player.extend({

		templateID: "framework/player/firetv",
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
        Logger.log('FireTV playing the video!');
        this.video_tag.play();    
        window.fireTV && window.fireTV.player_playing();
    },
    
    doPause: function() {
        Logger.log('FireTV pausing the video.');
        this.video_tag.pause();
        window.fireTV && window.fireTV.player_paused();
    },
    
    doStop: function() {
        Logger.log('FireTV stopping the video...');
        this.video_tag.pause();
        window.fireTV && window.fireTV.player_stopped();
        this.removeSource();
    }

});

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


var RCEvent = klass({
    name: '',
    evObj: null,
    handled: false,
    
    initialize: function(_name, _evObj){
        this.name = _name;
        this.evObj = _evObj;
    },
    setHandled: function(){
        this.handled = true;
    }
});


var BrowserKeyValue = {
  DOM_VK_CANCEL: 3,
  DOM_VK_HELP: 6,
  DOM_VK_BACK_SPACE: 8,
  DOM_VK_TAB: 9,
  DOM_VK_CLEAR: 12,
  DOM_VK_RETURN: 13,
  DOM_VK_ENTER: 14,
  DOM_VK_SHIFT: 16,
  DOM_VK_CONTROL: 17,
  DOM_VK_ALT: 18,
  DOM_VK_PAUSE: 19,
  DOM_VK_CAPS_LOCK: 20,
  DOM_VK_ESCAPE: 27,
  DOM_VK_SPACE: 32,
  DOM_VK_PAGE_UP: 33,
  DOM_VK_PAGE_DOWN: 34,
  DOM_VK_END: 35,
  DOM_VK_HOME: 36,
  DOM_VK_LEFT: 37,
  DOM_VK_UP: 38,
  DOM_VK_RIGHT: 39,
  DOM_VK_DOWN: 40,
  DOM_VK_PRINTSCREEN: 44,
  DOM_VK_INSERT: 45,
  DOM_VK_DELETE: 46,
  DOM_VK_0: 48,
  DOM_VK_1: 49,
  DOM_VK_2: 50,
  DOM_VK_3: 51,
  DOM_VK_4: 52,
  DOM_VK_5: 53,
  DOM_VK_6: 54,
  DOM_VK_7: 55,
  DOM_VK_8: 56,
  DOM_VK_9: 57,
  DOM_VK_SEMICOLON: 59,
  DOM_VK_EQUALS: 61,
  DOM_VK_A: 65,
  DOM_VK_B: 66,
  DOM_VK_C: 67,
  DOM_VK_D: 68,
  DOM_VK_E: 69,
  DOM_VK_F: 70,
  DOM_VK_G: 71,
  DOM_VK_H: 72,
  DOM_VK_I: 73,
  DOM_VK_J: 74,
  DOM_VK_K: 75,
  DOM_VK_L: 76,
  DOM_VK_M: 77,
  DOM_VK_N: 78,
  DOM_VK_O: 79,
  DOM_VK_P: 80,
  DOM_VK_Q: 81,
  DOM_VK_R: 82,
  DOM_VK_S: 83,
  DOM_VK_T: 84,
  DOM_VK_U: 85,
  DOM_VK_V: 86,
  DOM_VK_W: 87,
  DOM_VK_X: 88,
  DOM_VK_Y: 89,
  DOM_VK_Z: 90,
  DOM_VK_CONTEXT_MENU: 93,
  DOM_VK_NUMPAD0: 96,
  DOM_VK_NUMPAD1: 97,
  DOM_VK_NUMPAD2: 98,
  DOM_VK_NUMPAD3: 99,
  DOM_VK_NUMPAD4: 100,
  DOM_VK_NUMPAD5: 101,
  DOM_VK_NUMPAD6: 102,
  DOM_VK_NUMPAD7: 103,
  DOM_VK_NUMPAD8: 104,
  DOM_VK_NUMPAD9: 105,
  DOM_VK_MULTIPLY: 106,
  DOM_VK_ADD: 107,
  DOM_VK_SEPARATOR: 108,
  DOM_VK_SUBTRACT: 109,
  DOM_VK_DECIMAL: 110,
  DOM_VK_DIVIDE: 111,
  DOM_VK_F1: 112,
  DOM_VK_F2: 113,
  DOM_VK_F3: 114,
  DOM_VK_F4: 115,
  DOM_VK_F5: 116,
  DOM_VK_F6: 117,
  DOM_VK_F7: 118,
  DOM_VK_F8: 119,
  DOM_VK_F9: 120,
  DOM_VK_F10: 121,
  DOM_VK_F11: 122,
  DOM_VK_F12: 123,
  DOM_VK_F13: 124,
  DOM_VK_F14: 125,
  DOM_VK_F15: 126,
  DOM_VK_F16: 127,
  DOM_VK_F17: 128,
  DOM_VK_F18: 129,
  DOM_VK_F19: 130,
  DOM_VK_F20: 131,
  DOM_VK_F21: 132,
  DOM_VK_F22: 133,
  DOM_VK_F23: 134,
  DOM_VK_F24: 135,
  DOM_VK_NUM_LOCK: 144,
  DOM_VK_SCROLL_LOCK: 145,
  DOM_VK_COMMA: 188,
  DOM_VK_PERIOD: 190,
  DOM_VK_SLASH: 191,
  DOM_VK_BACK_QUOTE: 192,
  DOM_VK_OPEN_BRACKET: 219,
  DOM_VK_BACK_SLASH: 220,
  DOM_VK_CLOSE_BRACKET: 221,
  DOM_VK_QUOTE: 222,
  DOM_VK_META: 224
};

var TVKeyValue = {
    KEY_RETURN : 0,
    KEY_ENTER : 13,
    KEY_UP : 38,
    KEY_DOWN : 40,
    KEY_LEFT : 37,
    KEY_RIGHT : 39,

    KEY_PAUSE : 74,
    KEY_PLAY : 71,
    KEY_STOP : 413,
    KEY_1 : 101,
    KEY_2 : 98,
    KEY_3 : 6,
    KEY_4 : 8,
    KEY_5 : 9,
    KEY_6 : 10,
    KEY_7 : 12,
    KEY_8 : 13,
    KEY_9 : 14,
    KEY_0 : 17,
    KEY_EMPTY : 0,

    KEY_PANEL_CH_UP : 105,
    KEY_PANEL_CH_DOWN : 106,
    KEY_PANEL_VOL_UP : 203,
    KEY_PANEL_VOL_DOWN : 204,
    KEY_PANEL_ENTER : 309,
    KEY_PANEL_SOURCE : 612,
    KEY_PANEL_MENU : 613,
    KEY_PANEL_POWER : 614,

    KEY_POWER : 76,
    KEY_TV : 77,
    KEY_VOL_UP : 7,
    KEY_VOL_DOWN : 11,
    KEY_CH_UP : 68,
    KEY_CH_DOWN : 65,

    KEY_BLUE : 406,

    KEY_EXIT :  45
};

var TVKeyValuePhilips = {
    KEY_BACK_SPACE : (typeof VK_BACK != 'undefined' ? VK_BACK : 8),
    KEY_ENTER : (typeof VK_ENTER != 'undefined' ? VK_ENTER : 13),
    KEY_UP : (typeof VK_UP != 'undefined' ? VK_UP : 130),
    KEY_DOWN : (typeof VK_DOWN != 'undefined' ? VK_DOWN : 131),
    KEY_LEFT : (typeof VK_LEFT != 'undefined' ? VK_LEFT : 132),
    KEY_RIGHT : (typeof VK_RIGHT != 'undefined' ? VK_RIGHT : 133),

    KEY_PAUSE : (typeof VK_PAUSE != 'undefined' ? VK_PAUSE : 19),
    KEY_PLAY : (typeof VK_PLAY != 'undefined' ? VK_PLAY : 415),
    KEY_STOP : (typeof VK_STOP != 'undefined' ? VK_STOP : 413),
    KEY_FF : (typeof VK_FAST_FWD != 'undefined' ? VK_FAST_FWD : 408),
    KEY_RW : (typeof VK_REWIND != 'undefined' ? VK_REWIND : 412),
    KEY_NEXT : (typeof VK_NEXT != 'undefined' ? VK_NEXT : 34),
    KEY_PREV : (typeof VK_PREV != 'undefined' ? VK_PREV : 33),

    KEY_POWER : (typeof VK_POWER != 'undefined' ? VK_POWER : 76),
    KEY_VOL_UP : (typeof VK_VOLUME_UP != 'undefined' ? VK_VOLUME_UP : 7),
    KEY_VOL_DOWN : (typeof VK_VOLUME_DOWN != 'undefined' ? VK_VOLUME_DOWN : 11),
    KEY_CH_UP : (typeof VK_CHANNEL_UP != 'undefined' ? VK_CHANNEL_UP : 68),
    KEY_CH_DOWN : (typeof VK_CHANNEL_DOWN != 'undefined' ? VK_CHANNEL_DOWN : 65),

    KEY_RED : (typeof VK_RED != 'undefined' ? VK_RED : 403),
    KEY_GREEN : (typeof VK_GREEN != 'undefined' ? VK_GREEN : 404),
    KEY_BLUE : (typeof VK_BLUE != 'undefined' ? VK_BLUE : 406),
    KEY_YELLOW : (typeof VK_YELLOW != 'undefined' ? VK_YELLOW : 502)
};

var TVKeyValueGoogleTV = {
    KEY_BACK_SPACE: 8,
    KEY_BACK: 8,
    KEY_ENTER : 13,
    KEY_UP : 38,
    KEY_DOWN : 40,
    KEY_LEFT : 37,
    KEY_RIGHT : 39,

    KEY_PLAY_PAUSE : 179,
    KEY_STOP : 178,
    KEY_EMPTY : 0,

    KEY_PANEL_CH_UP : 105,
    KEY_PANEL_CH_DOWN : 106,
    KEY_PANEL_VOL_UP : 203,
    KEY_PANEL_VOL_DOWN : 204,
    KEY_PANEL_ENTER : 309,
    KEY_PANEL_SOURCE : 612,
    KEY_PANEL_MENU : 613,
    KEY_PANEL_POWER : 614,

    KEY_POWER : 76,
    KEY_TV : 77,
    KEY_VOL_UP : 7,
    KEY_VOL_DOWN : 11,
    KEY_CH_UP : 68,
    KEY_CH_DOWN : 65,

    KEY_FF : 228,
    KEY_RW : 227,

    KEY_EXIT :  45,

    KEY_0 : (typeof VK_0 != 'undefined' ? VK_0 : null)
};

var TVKeyValueSonyCEB = {
    KEY_BACK_SPACE: (typeof VK_BACK_SPACE != 'undefined' ? VK_BACK_SPACE : 8),
    KEY_BACK: (typeof VK_BACK_SPACE != 'undefined' ? VK_BACK_SPACE : 8),
    KEY_ENTER : (typeof VK_ENTER != 'undefined' ? VK_ENTER : null),
    KEY_UP : (typeof VK_UP != 'undefined' ? VK_UP : null),
    KEY_DOWN : (typeof VK_DOWN != 'undefined' ? VK_DOWN : null),
    KEY_LEFT : (typeof VK_LEFT != 'undefined' ? VK_LEFT : null),
    KEY_RIGHT : (typeof VK_RIGHT != 'undefined' ? VK_RIGHT : null),

    KEY_PAUSE : (typeof VK_PAUSE != 'undefined' ? VK_PAUSE : null),
    KEY_PLAY : (typeof VK_PLAY != 'undefined' ? VK_PLAY : null),
    KEY_STOP : (typeof VK_STOP != 'undefined' ? VK_STOP : null),

    KEY_FF : (typeof VK_FAST_FWD != 'undefined' ? VK_FAST_FWD : null),
    KEY_RW : (typeof VK_REWIND != 'undefined' ? VK_REWIND : null),
    KEY_NEXT : (typeof VK_TRACK_NEXT != 'undefined' ? VK_TRACK_NEXT : null),
    KEY_PREV : (typeof VK_TRACK_PREV != 'undefined' ? VK_TRACK_PREV : null),

    KEY_EXIT :  (typeof VK_EXIT != 'undefined' ? VK_EXIT : null),

    KEY_0 : (typeof VK_0 != 'undefined' ? VK_0 : null),

    KEY_RED : (typeof VK_RED != 'undefined' ? VK_RED : null),
    KEY_GREEN : (typeof VK_GREEN != 'undefined' ? VK_GREEN : null),
    KEY_BLUE : (typeof VK_BLUE != 'undefined' ? VK_BLUE : null),
    KEY_YELLOW :(typeof VK_YELLOW != 'undefined' ? VK_YELLOW : null)
};

var TVKeyValuePanasonic = {
    KEY_RETURN:8,
    KEY_ENTER:13,
    KEY_UP:38,
    KEY_DOWN:40,
    KEY_LEFT:37,
    KEY_RIGHT:39,
    KEY_EMPTY:0,
    KEY_EXIT:null,

    KEY_1 : (typeof VK_1 != 'undefined' ? VK_1 : null),
    KEY_2 : (typeof VK_2 != 'undefined' ? VK_2 : null),
    KEY_3 : (typeof VK_3 != 'undefined' ? VK_3 : null),
    KEY_4 : (typeof VK_4 != 'undefined' ? VK_4 : null),
    KEY_5 : (typeof VK_5 != 'undefined' ? VK_5 : null),
    KEY_6 : (typeof VK_6 != 'undefined' ? VK_6 : null),
    KEY_7 : (typeof VK_7 != 'undefined' ? VK_7 : null),
    KEY_8 : (typeof VK_8 != 'undefined' ? VK_8 : null),
    KEY_9 : (typeof VK_9 != 'undefined' ? VK_9 : null),
    KEY_0 : (typeof VK_0 != 'undefined' ? VK_0 : null),

    KEY_PLAY  : (typeof VK_PLAY  != 'undefined' ? VK_PLAY : null),
    KEY_PAUSE : (typeof VK_PAUSE != 'undefined' ? VK_PAUSE : null),
    KEY_STOP  : (typeof VK_STOP  != 'undefined' ? VK_STOP : null),
    KEY_FF    : (typeof VK_FAST_FWD    != 'undefined' ? VK_FAST_FWD : null),
    KEY_RW    : (typeof VK_REWIND    != 'undefined' ? VK_REWIND : null),
    KEY_NEXT    : (typeof VK_NEXT    != 'undefined' ? VK_NEXT : null),
    KEY_PREV    : (typeof VK_PREV    != 'undefined' ? VK_PREV : null),

    KEY_RED : (typeof VK_RED != 'undefined' ? VK_RED : null),
    KEY_GREEN : (typeof VK_GREEN != 'undefined' ? VK_GREEN : null),
    KEY_BLUE : (typeof VK_BLUE != 'undefined' ? VK_BLUE : null),
    KEY_YELLOW :(typeof VK_YELLOW != 'undefined' ? VK_YELLOW : null)
};

var TVKeyValueToshiba = {
    KEY_EXIT: 461
};

var TVKeyValueFireTV = {
    
    
    // theses keys are handled directly within the webview
    KEY_ENTER : 13,
    KEY_UP : 38,
    KEY_DOWN : 40,
    KEY_LEFT : 37,
    KEY_RIGHT : 39,

    // these will be simulated from the AndroidWrapper app (see FireTVKeyHandler.simulateKeyDownEvent)
    KEY_BACK: 4,
    KEY_PLAY_PAUSE: 85,
    KEY_FF: 90,
    KEY_RW: 89,
    KEY_MENU: 82,
};

var TVKeyValueAndroidTV = {
    // theses keys are handled directly within the webview
    KEY_ENTER : 13,
    KEY_UP : 38,
    KEY_DOWN : 40,
    KEY_LEFT : 37,
    KEY_RIGHT : 39,
    // these will be simulated from the AndroidWrapper app (see FireTVKeyHandler.simulateKeyDownEvent)
    KEY_BACK: 4,
    KEY_PLAY_PAUSE: 85,
    KEY_FF: 90,
    KEY_RW: 89,
    KEY_MENU: 82
};

var TVKeyValueOppo = {
    KEY_BACK  : 461,
    KEY_OK    : 13,
    KEY_UP    : 38,
    KEY_DOWN  : 40,
    KEY_LEFT  : 37,
    KEY_RIGHT : 39,
    KEY_PLAY  : 71,
    KEY_PAUSE : 74,
    KEY_STOP  : 413,
    KEY_FF    : 228,
    KEY_RW    : 227,
    KEY_NEXT  : 65,
    KEY_PREV  : 68,
    KEY_BLUE  : 406
};

var TVKeyValueSamsungTizen = {
	KEY_LEFT  : 37,
	KEY_UP    : 38,
	KEY_RIGHT : 39,
	KEY_DOWN  : 40,
	KEY_OK    : 13,
	KEY_BACK  : 10009,	
	KEY_PLAY  : 415,
	KEY_PAUSE : 19,
	KEY_STOP  : 413,
	KEY_RW    : 412,
	KEY_FF    : 417
};

var KeyHandler = klass({
    tvKey: TVKeyValue,
    isBlocked: false,
    useKeyDownEvents: true,
    useKeyPressedEvents: true,

    initialize: function(){
        _.extend(this, Backbone.Events);
        if (typeof KeyEvent != 'undefined') {
          // Firefox has a KeyEvent Hash defined
          this.mapKeys(KeyEvent);
        } else {
          // Other Browsers need this
          this.mapKeys(BrowserKeyValue);
        }
        if (this.useKeyDownEvents)
            window.addEventListener('keydown', Util.bind(this, this.receiveKeyDown), false);
        if (this.useKeyPressedEvents)
            window.addEventListener('keypress', Util.bind(this, this.receiveKeyPress), false);
    },

    mapKeys: function(_keySet) {
        this.tvKey = {};
        var keyName = '';
        for (key in _keySet) { 
            if ( key.match(/^VK_(.+)/g) ) {
                keyName = key.replace(/^VK_(.+)/g, "$1");
            } else if ( key.match(/^KEY_(.+)/g) ) {
                keyName = key.replace(/^KEY_(.+)/g, "$1");
            } else if ( key.match(/^DOM_VK_(.+)/g) ) {
                keyName = key.replace(/^DOM_VK_(.+)/g, "$1");
            } else {
                keyName = key;
            }
            // RENAMING:
            if (keyName == 'RETURN') {
                Logger.log("special found on: " + keyName + " is now: OK");
                keyName = 'OK';
            } else if (keyName == 'BACK_SPACE') {
                Logger.log("special found on: " + keyName + " is now: BACK");
                keyName = 'BACK';
            } else if (keyName == 'ENTER') {
                Logger.log("special found on: " + keyName + " is now: OK");
                keyName = 'OK';
            } else if (keyName == 'REWIND_') {
                Logger.log("special found on: " + keyName + " is now: PREV");
                keyName = 'PREV';
            } else if (keyName == 'FF_') {
                Logger.log("special found on: " + keyName + " is now: NEXT");
                keyName = 'NEXT';
            }

            this.tvKey[_keySet[key]] = keyName;
        }
    },

    receiveKeyDown: function(ev) {
        var key = ev.keyCode;
        Logger.log("KeyHandler.receiveKeyDown: " + this.tvKey[key] + ' (' + key + ')');
        this.trigger('KeyDown', new RCEvent(this.tvKey[key], ev) );
    },

    receiveKeyPress: function(ev) {
        var key = ev.keyCode;
        Logger.log("KeyHandler.receiveKeyPress: " + this.tvKey[key] + ' (' + key + ')');
        this.trigger('KeyPress', new RCEvent(this.tvKey[key], ev) );
    },

    block: function() {
        this.isBlocked = true;
    },

    unblock: function() {
        this.isBlocked = false;
    }
});

var CEhtmlKeyHandler = KeyHandler.extend({
    initialize: function(){
        this.supr();
    },
    mapKeys: function(_keySet) {
        this.tvKey = {};
        var keyName = '';
        for (key in _keySet) { 
            if ( key.match(/^VK_(.+)/g) ) {
                keyName = key.replace(/^VK_(.+)/g, "$1");
            } else if ( key.match(/^KEY_(.+)/g) ) {
                keyName = key.replace(/^KEY_(.+)/g, "$1");
            } else if ( key.match(/^DOM_VK_(.+)/g) ) {
                keyName = key.replace(/^DOM_VK_(.+)/g, "$1");
            } else {
                keyName = key;
            }
            // RENAMING:
            if (keyName == 'ENTER') {
                Logger.log("special found on: " + keyName + " is now: OK");
                keyName = 'OK';
            } else if (keyName == 'REWIND_') {
                Logger.log("special found on: " + keyName + " is now: PREV");
                keyName = 'PREV';
            } else if (keyName == 'FF_') {
                Logger.log("special found on: " + keyName + " is now: NEXT");
                keyName = 'NEXT';
            } else if (keyName == 'FAST_FWD') {
                Logger.log("special found on: " + keyName + " is now: FF");
                keyName = 'FF';
            } else if (keyName == 'REWIND') {
                Logger.log("special found on: " + keyName + " is now: RW");
                keyName = 'RW';
            }
            this.tvKey[_keySet[key]] = keyName;
        }
    }
});

var HTMLKeyHandler = KeyHandler.extend({
  pointer_timeout_id: null,
  pointer_last_position_x: null,
  pointer_last_position_y: null,
  pointer_on: false,
  pointer_timeout_time: 4000,

  block_while_processing_event: false,

  initialize: function(){
    this.useKeyPressedEvents = false;
    this.supr();
    this.registerPointerEvents();
  },

  registerPointerEvents: function() {
    document.onmousemove = Util.bind(this, this.onMouseMove);
  },

  receiveKeyDown: function(ev) {
    this.pointerOff();
    this.supr(ev);
  },

  receiveKeyPress: function(ev) {
    this.pointerOff();
    this.supr(ev);
  },

  pointerOn: function() {
    this.pointer_on  = true;
    this.trigger('PointerChangeState', 'on' );
    Logger.log("KeyHandler. pointer on ");
  },

  pointerOff: function() {
      if (this.pointer_on) {
        this.pointer_on  = false;
        this.trigger('PointerChangeState', 'off' );
        Logger.log("KeyHandler. pointer off");
      }
  },

  onMouseMove: function(event) {
    if (this.block_while_processing_event) {
      return;
    }

    this.block_while_processing_event = true;

    if ( (typeof event.pageX != 'undefined' && this.pointer_last_position_x != event.pageX) ||
         (typeof event.pageY != 'undefined' && this.pointer_last_position_y != event.pageY) ){
      this.pointer_last_position_x = event.pageX;
      this.pointer_last_position_y = event.pageY;

      if(!this.pointer_on) {
        this.pointerOn();
      } else {
        var that = this;
        if(this.pointer_timeout_id != null) {
          clearTimeout(this.pointer_timeout_id);
          this.pointer_timeout_id = null;
        }
        this.pointer_timeout_id = setTimeout(function() {
          that.pointerOff();
        }, this.pointer_timeout_time);
      }
    }
    this.block_while_processing_event = false;
  }

});

var GoogleTVKeyHandler = HTMLKeyHandler.extend({
  initialize: function(){
    this.mapKeys(TVKeyValueGoogleTV);
    this.supr();
  },
});

var LGKeyHandler = CEhtmlKeyHandler.extend({
    
    pointer_on: false,
    pointer_last_position_x: null,
    pointer_last_position_y: null,
    block_while_processing_event: false,
    
    initialize: function(){
        this.supr();
        this.registerPointerEvents();
    },
    registerPointerEvents: function() {
        window.onmouseon = Util.bind(this, function() {
            this.pointer_on = true;
            this.trigger('PointerChangeState', 'on' );
        });
        window.onmouseoff = Util.bind(this, function() {
            this.pointer_on = false;
            this.trigger('PointerChangeState', 'off' );
        });
        document.onmousemove = Util.bind(this, this.onMouseMove);
    },
    onMouseMove: function(event) {
        if (this.block_while_processing_event) {
          return;
        }

        this.block_while_processing_event = true;

        if ( (typeof event.pageX != 'undefined' && this.pointer_last_position_x != event.pageX) ||
             (typeof event.pageY != 'undefined' && this.pointer_last_position_y != event.pageY) ){
            this.pointer_last_position_x = event.pageX;
            this.pointer_last_position_y = event.pageY;
            
            if (!this.pointer_on) {
                this.pointer_on = true;
                this.trigger('PointerChangeState', 'on' );
            }
        }
        this.block_while_processing_event = false;
    }
});

var OppoKeyHandler = KeyHandler.extend({
    initialize: function(){
        this.supr();
        this.mapKeys(TVKeyValueOppo);
    }
});

var PanasonicKeyHandler = KeyHandler.extend({
    initialize: function(){
        this.supr();
        this.mapKeys(TVKeyValuePanasonic);
    },
    mapKeys: function(_keySet) {
        this.tvKey = {};
        var keyName = '';
        for (key in _keySet) { 
            if ( key.match(/^KEY_(.+)/g) ) {
                keyName = key.replace(/^KEY_(.+)/g, "$1");
                // RENAMING:
                if (keyName == 'RETURN') {
                    Logger.log("special found on: " + keyName + " is now: BACK");
                    keyName = 'BACK';
                } else if (keyName == 'ENTER') {
                    Logger.log("special found on: " + keyName + " is now: OK");
                    keyName = 'OK';
                }
            }
            this.tvKey[_keySet[key]] = keyName;
        }
    }
});

var PhilipsKeyHandler = KeyHandler.extend({
    initialize: function(){
        this.useKeyPressedEvents = false;
        this.supr();
        this.mapKeys(TVKeyValuePhilips);
        this.registerPointerEvents();
    },
    registerPointerEvents: function() {
        // TODO: read Smart TV Technical Guidelines - Pointer support.pdf
        window.onmouseon = Util.bind(this, function() {
            this.trigger('PointerChangeState', 'on' );
        });
        window.onmouseoff = Util.bind(this, function() {
            this.trigger('PointerChangeState', 'off' );
        });
    }
});

var SamsungKeyHandler = HTMLKeyHandler.extend({
    initialize: function(){
        this.supr();
        //KeyHandler.prototype.initialize.call(this);
        this.mapKeys(new Common.API.TVKeyValue());
    },
    mapKeys: function(_keySet) {
        this.tvKey = {};
        var keyName = '';
        for (var key in _keySet) { 
            if ( key.match(/^KEY_(.+)/g) ) {
                keyName = key.replace(/^KEY_(.+)/g, "$1");
                // RENAMING:
                if (keyName == 'RETURN') {
                    Logger.log("special found on: " + keyName + " is now: BACK");
                    keyName = 'BACK';
                } else if (keyName == 'ENTER') {
                    Logger.log("special found on: " + keyName + " is now: OK");
                    keyName = 'OK';
                } else if (keyName == 'REWIND_') {
                    Logger.log("special found on: " + keyName + " is now: PREV");
                    keyName = 'PREV';
                } else if (keyName == 'FF_') {
                    Logger.log("special found on: " + keyName + " is now: NEXT");
                    keyName = 'NEXT';
                }
            }
            this.tvKey[_keySet[key]] = keyName;
        }
    },
    receiveKeyDown: function(ev) {
        this.pointerOff();
        var key = ev.keyCode;
        Logger.log("SamsungKeyHandler.receiveKeyDown: " + this.tvKey[key] + ' (' + key + ')');
        // 1057 = Popup/Title Menu Button, this should be ignored
        if (key != 1057) {
          // special case on remote control's dedicated exit key:
          if ( this.tvKey[key] == 'EXIT') {
            this.trigger('ExitKey', new RCEvent(this.tvKey[key], ev) );
          } else {
            this.trigger('KeyDown', new RCEvent(this.tvKey[key], ev) );
          }
        }
    },
});

var SamsungTizenKeyHandler = HTMLKeyHandler.extend({
    initialize: function(){
    	tizen.tvinputdevice.registerKey("MediaPlay");
		tizen.tvinputdevice.registerKey("MediaStop");
		tizen.tvinputdevice.registerKey("MediaPause");
		tizen.tvinputdevice.registerKey("MediaPlayPause");
		tizen.tvinputdevice.registerKey("MediaRewind");
		tizen.tvinputdevice.registerKey("MediaFastForward");
        this.supr();
        this.mapKeys(TVKeyValueSamsungTizen);
    },
    mapKeys: function(_keySet) {
        this.tvKey = {};
        var keyName = '';
        for (var key in _keySet) { 
            if ( key.match(/^KEY_(.+)/g) ) {
                keyName = key.replace(/^KEY_(.+)/g, "$1");
            }
            this.tvKey[_keySet[key]] = keyName;
        }
    },
    receiveKeyDown: function(ev) {
        this.pointerOff();
        var key = ev.keyCode;
        console.log("SamsungTizenKeyHandler.receiveKeyDown: " + this.tvKey[key] + ' (' + key + ')');
        this.trigger('KeyDown', new RCEvent(this.tvKey[key], ev) );
    },
});

var SonyCEBKeyHandler = KeyHandler.extend({
    initialize: function(){
        this.supr();
        this.mapKeys(TVKeyValueSonyCEB);
    }
});

var ToshibaKeyHandler = CEhtmlKeyHandler.extend({
    initialize: function(){
        this.supr();
        // Additional Exit Key for Toshiba
        this.tvKey[461] = "BACK";
    },
    mapKeys: function(_keySet) {
        this.tvKey = {};
        var keyName = '';
        for (key in _keySet) { 
            if ( key.match(/^VK_(.+)/g) ) {
                keyName = key.replace(/^VK_(.+)/g, "$1");
            } else if ( key.match(/^KEY_(.+)/g) ) {
                keyName = key.replace(/^KEY_(.+)/g, "$1");
            } else if ( key.match(/^DOM_VK_(.+)/g) ) {
                keyName = key.replace(/^DOM_VK_(.+)/g, "$1");
            } else {
                keyName = key;
            }
            // RENAMING:
            if (keyName == 'RETURN') {
                Logger.log("special found on: " + keyName + " is now: OK");
                keyName = 'OK';
            } else if (keyName == 'BACK_SPACE') {
                Logger.log("special found on: " + keyName + " is now: BACK");
                keyName = 'BACK';
            } else if (keyName == 'ENTER') {
                Logger.log("special found on: " + keyName + " is now: OK");
                keyName = 'OK';
            } else if (keyName == 'FAST_FWD') {
                Logger.log("special found on: " + keyName + " is now: FF");
                keyName = 'FF';
            } else if (keyName == 'REWIND') {
                Logger.log("special found on: " + keyName + " is now: RW");
                keyName = 'RW';
            }

            this.tvKey[_keySet[key]] = keyName;
        }
    },
});

var WdKeyHandler = HTMLKeyHandler.extend({
    initialize: function(info){
        this.supr();
        // Additional Exit Keys
        if (info.userAgent.match(/wdsimplebrowser/i)) {
          // Alpha Device
          this.tvKey[127] = "PLAY";
          this.tvKey[128] = "PAUSE";
          this.tvKey[129] = "STOP";
          this.tvKey[131] = "RW";
          this.tvKey[130] = "FF";
          this.tvKey[27] = "BACK";
          this.tvKey[123] = "EXIT";
        } else {
          // Sigma Device
          this.tvKey[415] = "PLAY";
          this.tvKey[19] = "PAUSE";
          this.tvKey[413] = "STOP";
          this.tvKey[412] = "RW";
          this.tvKey[417] = "FF";
          this.tvKey[27] = "BACK";
          this.tvKey[123] = "EXIT";
        }
    },
});

var AndroidTVKeyHandler = HTMLKeyHandler.extend({
  initialize: function(){
    this.supr();
    this.mapKeys(TVKeyValueAndroidTV);
    if(window.androidTVWrapper){
        window.androidTVWrapper.simulateKeyDownEvent = this.simulateKeyDownEvent;
    }
  },
  simulateKeyDownEvent: function(keyCode){
    // var e = new KeyboardEvent("keydown");
    // e.which = keyCode;
    // e.keyCode = keyCode; // cannot to be overwritten it seams
    // e.name = this.tvKey[keyCode];
    // e.name = this.tvKey[keyCode];
    
    //TODO: use proper KeyEvent and not such a hack
    //Logger.log("simulateKeyDownEvent keyCode: " + keyCode + " -> " + this.tvKey[keyCode]);
    try {
        this.receiveKeyDown({keyCode: keyCode});
    }
    catch(e) {
        Logger.error("ERROR: simulateKeyDownEvent keyCode: ");
    }
  },
});
var FireTVKeyHandler = HTMLKeyHandler.extend({
  initialize: function(){
    this.supr();
    this.mapKeys(TVKeyValueFireTV);
    if(window.fireTV){
        window.fireTV.simulateKeyDownEvent = this.simulateKeyDownEvent;
    }
  },
  simulateKeyDownEvent: function(keyCode){
    // var e = new KeyboardEvent("keydown");
    // e.which = keyCode;
    // e.keyCode = keyCode; // cannot to be overwritten it seams
    // e.name = this.tvKey[keyCode];
    // e.name = this.tvKey[keyCode];
    
    //TODO: use proper KeyEvent and not such a hack
    //Logger.log("simulateKeyDownEvent keyCode: " + keyCode + " -> " + this.tvKey[keyCode]);
    try {
        this.receiveKeyDown({keyCode: keyCode});
    }
    catch(e) {
        Logger.error("ERROR: simulateKeyDownEvent keyCode: ");
    }
  },
});
var IO = klass({
  //
  load: 	function(suc, err) {},
  save:		function(suc, err) {},
  erase:	function(suc, err) {},
  // GET VALUE FOR KEY FROM IO
  get: function(key) {
    var result = null;
    var k = key.toLowerCase();
    if(typeof this.data[k] != 'undefined') {
    	result = this.data[k];
    }
    return result;
  },
  // SET VALUE FOR KEY iN IO
  set: function(key, value, suc, err) {
    this.data[key.toLowerCase()] = value;
    this.save( suc, err );
  },
  // SET JSON OBJ AS VALUE iN IO
  setObj: function(obj, suc, err) {
    for(var key in obj) {
      this.data[key.toLowerCase()] = obj[key];
    }
    this.save( suc, err );
  },
  // DELETE KEY-VALUE iN IO
  del: function(key, suc, err) {
    var result = false;
    if(!key) return result;
    var k = key.toLowerCase();
    if(typeof this.data[k] != 'undefined') {
    	delete this.data[k];
    }
    this.save( suc, err );
  },
  // CHECK FOR KEY-VALUE iN IO
  has: function(key) {
    var result = false;
    if(!key) return result;
    var k = key.toLowerCase();
    if(typeof this.data[k] != 'undefined') {
    	result = true;
    }
    return result;
  }
});
//

var CookieIO = IO.extend({
    
  initialize: function(o) {
		o = o || {};
		
		this.domain		= o.domain 	|| '';
		this.expires 	= o.expires || new Date(2030, 2, 19),
		this.name 		= o.name   	|| 'JSON';
		this.path 		= o.path 		|| '/';
  },
  // LOAD
  load: function(suc, err) {
    var cookie = unescape(document.cookie);
    //
    if( cookie ) {
      cookie = cookie.split(';');
      //
      for( var i=0, line=null, l=cookie.length; i<l; i++ ) {
        line = cookie[i];
        if( line.indexOf(this.name + '=') > -1 ) {
          line = line.split('=');
          try {
            this.data = JSON.parse(line[1]);
            suc && suc();
          } catch(e) {
          	err && err(e);
          }
          return;
        }
      }
      // there is a cookie but not with the specified name
      this.data = {};
	  suc && suc();
    } else {
    	this.data = {};
    	suc && suc();
    }
  },
  // SAVE
  save: function(suc, err) {
    document.cookie = ( 
    	this.name + '=' + escape(JSON.stringify(this.data)) + 
    	'; expires=' + this.expires.toUTCString() + 
    	(this.domain ? '; domain=' + this.domain : '') + 
    	'; path=' + this.path 
    );
    suc && suc();
  },
  // ERASE
  erase: function(suc, err) {
    document.cookie = (
    	'name=; expires=Thu, 01-Jan-1970 00:00:01 GMT' + 
    	(this.domain ? '; domain=' + this.domain : '') + 
    	'; path=' + this.path 
    );
    suc && suc();
  }
});

var SamsungIO = IO.extend({
  //
  initialize: function(o) {
  	o = o || {};
    this.fileName = curWidget.id + '/' + ( o.fileName || 'app' ) + '.session';
  },
  // LOAD
  load: function(suc, err) {
  	var file = null;
  	
    try {
      !this.fileSystem && ( this.fileSystem = new FileSystem() );
      file = this.fileSystem.openCommonFile(this.fileName, 'r');
      //
      if( file ) {
        var str = unescape(file.readLine());
        if( str ) this.data = JSON.parse(str);
        this.fileSystem.closeCommonFile(file);
			}
      suc && suc();
    } catch (e) {
    	file && this.fileSystem.closeCommonFile(file);
    	err && err(e);
    }
  },
  // SAVE
  save: function(suc, err) {
    try {
    	!this.fileSystem && ( this.fileSystem = new FileSystem() );
    	
      if( !this.fileSystem.isValidCommonPath( curWidget.id ) ) {
        this.fileSystem.createCommonDir( curWidget.id );
      }
      var file = this.fileSystem.openCommonFile(this.fileName, 'w');
      if( file ) {
        file.writeLine( escape(JSON.stringify(this.data)) );
        this.fileSystem.closeCommonFile(file);
        suc && suc();  
      }
    } catch (e) {
    	file && this.fileSystem.closeCommonFile(file);
    	err && err(e);
    }
  },
  // ERASE
  erase: function(o, suc, err) {
    !this.fileSystem && ( this.fileSystem = new FileSystem() );
    this.fileSystem.deleteCommonFile(this.fileName);
    suc && suc();
  }
});

var SamsungTizenIO = IO.extend({
  //
  initialize: function(o, suc, err) {
  	o = o || {};
    this.fileName = ( o.fileName || 'app') + '.session';
  },
  
  // LOAD
  load: function(suc, err) {
  	tizen.filesystem.resolve(
			'wgt-private',
			Util.bind(this, function(dir){
				// search for file already exist
				dir.listFiles(Util.bind(this, function(files){
					var fileFound = false;
					for (var i = 0; i < files.length; i++) {
						if (files[i].name == this.fileName) {
							fileFound = true;
							break;
						}
					}
					if (fileFound) {
						console.log('File already exists!');
						this.read(suc, err);
					} else {
						try {
				    	dir.createFile(this.fileName);
				    	console.log('File created!');
				    	this.data = {};
				    	this.save(suc, err);
				    } catch (e) {
				    	err && err(e);
				    }
			   }
				}));
			})
		);
  },
  
  // READ
  read: function(suc, err) {
    tizen.filesystem.resolve(
    	'wgt-private/' + this.fileName,
    	Util.bind(this, function(file){
		    try {
		    	file.openStream('r', Util.bind(this, function(stream){
		    		try {
				      	var str = stream.read(stream.bytesAvailable);
		      	  		this.data = JSON.parse(unescape(str));
		      			stream.close();
		      	  		suc && suc();
			        } catch(e) {
			        	stream.close();
			        	err && err(e);
			        }
		    	}));
		    } catch (e) {
		    	err && err(e);
		    }
	    })
		);
  },
  // SAVE
  save: function(suc, err) {
  	console.log('Tizen saving...');
  	
  	tizen.filesystem.resolve(
  		'wgt-private/' + this.fileName, 
  		Util.bind(this, function(file){
		    try {
		    	file.openStream('w', Util.bind(this, function(stream){
	    		  try {
			      	stream.write( escape(JSON.stringify(this.data)) );
			      	
			      	stream.close();
			      	suc && suc();
			      } catch (e) {
			      	stream.close();
			        err && err(e);
			      }
		    	}));
		    } catch (e) {
		    	err && err(e);
		    }
			})
		);
  },
  
  // ERASE
  erase: function(suc, err) {
    console.log('Tizen deleting...');
    
  	tizen.filesystem.resolve(
  		'wgt-private', 
  		Util.bind(this, function(dir) {
				dir.listFiles(Util.bind(this, function(files){
					for (var i = 0; i < files.length; i++) {
						if (files[i].name == this.fileName) {
							// trying to delete file
							dir.deleteFile(files[i].fullPath, suc, err);
							return;
						}
					}
					err && err();
				}));
    }));
  }
});

var AndroidTVIO = CookieIO.extend({
  // SAVE
  save: function(suc, err) {
    this.supr(function() {
  		//signal the wrapper app to sync cookies (from RAM to persistan memory)
  		window.androidTVWrapper && window.androidTVWrapper.syncCookies && window.androidTVWrapper.syncCookies();
  		suc && suc();
  	}, err);
  }
});

var FireTVIO = CookieIO.extend({
  // SAVE
  save: function(suc, err) {
    this.supr(function() {
  		//signal the wrapper app to sync cookies (from RAM to persistan memory)
  		window.fireTV && window.fireTV.syncCookies && window.fireTV.syncCookies();
  		suc && suc();
  	}, err);
  }
});

/*
 * Device Factory Class
 */
var DeviceFactory = klass({
    info: {},
    initialize: function(){
        // must be implemented from extending class
    },
    checkDeviceByHash : function(_stringToMatch) {
        return Util.match(this.info.hash, _stringToMatch, true);
    },
    checkDeviceByUserAgent: function(_stringToMatch, _caseInsensitive, _useRegex) {
        return Util.match(this.info.userAgent, _stringToMatch, _caseInsensitive, _useRegex);
    },
    checkDeviceByHashAndUserAgent : function(_stringToMatch, _caseInsensitive) {
        return (this.checkDeviceByHash(_stringToMatch) && this.checkDeviceByUserAgent(_stringToMatch, _caseInsensitive));
    },
    // general hookup on device creation. override in app implementation in order
    // to set up device/vendor specific elements. MUST be the only way to do these things!!!
    onDeviceCreation: function(_device) {
        return _device;
    },
    createDevice: function(params){
        // must be implemented from extending class
    }
});

/*
 * This class is a dummy feature class that basically
 * says this device has no special features. Special
 * features could be: 
 * - screensaver
 * - special input devices (e.g. kinect devices)
 */
var DefaultFeatures = klass({

  hasFeature: function(feature) {
    return false;
  }

});

var SamsungFeatures = DefaultFeatures.extend({

  initialize: function(device) {
    this.device = device;
  },

  hasFeature: function(feature) {
    return (feature == "screen_saver" || feature == "pointer_support");
  },

  enableScreenSaver: function(enabled) {
    if (enabled) {
      this.device.pluginAPI.setOnScreenSaver();
    } else {
      this.device.pluginAPI.setOffScreenSaver();
    }
  }

});

var SamsungTizenFeatures = DefaultFeatures.extend({

  initialize: function(device) {
    this.device = device;
  },

  hasFeature: function(feature) {
    return (feature == "pointer_support");
  }
});

var PointerFeatures = DefaultFeatures.extend({

  initialize: function(device) {
    this.device = device;
  },

  hasFeature: function(feature) {
    return (feature == "pointer_support");
  }

});

/*
 * Device Class
 */
var Device = klass({
    info: {},
    isConnected: true,
    preloadedImages: {},
    player: null,
    keyHandler: null,
    cssAnimation: false,
    cssTransition: false,

    initialize: function(_info) {
        _.extend(this, Backbone.Events);
        this.info = _info;
        this.info.vendor = _info.vendor || '';
        this.info.technology = _info.technology || '';
        this.info.type = _info.type || '';
        this.info.width = _info.width || 1280;
        this.info.height = _info.height || 720;
        this.info.confirmAppExit = _info.confirmAppExit || false;
        this.info.version = _info.version || '';
        this.addCSSclasses();
        this.cssAnimation = this.determineCSSCapabilities('animation');
        this.cssTransition = this.determineCSSCapabilities('transition');
    },
    // inserts HTML, expects an Ender object
    html: function(eObj, h) {
        Util.html(eObj[0], h);
    },
    // appends HTML, expects an Ender object
    append: function(eObj, h) {
        Util.append(eObj[0], h, false);
    },
    // adds device specific CSS classes to App's body
    addCSSclasses: function() {
        if (this.info.vendor !== '') {
            $("#WidgetBody").addClass(this.info.vendor);
        }
        if (this.info.technology !== '') {
            $("#WidgetBody").addClass(this.info.technology);
        }
    },
    // creates a device depended key handler
    createKeyHandler: function(){
        this.keyHandler = new KeyHandler();
        return this.keyHandler;
    },
    // creates a device depended player
    createPlayer: function(){
        this.player = new Player(this.info);
        return this.player;
    },
    // creates a device depended way to exit the app
    exit: function(){
        Logger.log("Device.exit");
    },
    // creates a device depended way to notify platform that the app is ready to use
    ready: function(){
        Logger.log("Device.ready");
    },
    initLogger: function() {
       Logger.setup(false, true, false);
    },
    logger: function() {
      return Logger;
    },
    getIO: function(o) {
      return new CookieIO(o);
    },
    // creates a device depended way to notify platform that the connectivity is lost or re-established
    startCheckingConnectivity: function() {
        Logger.log("Device.startCheckingConnectivity");
    },
    // provides function to preload images. expects all image URLs as an array
    preloadImages: function(_aURL) {
        Util.preloadImages(_aURL, this.preloadedImages);
    },
    // a class for special features like screensaver and so on...
    getFeatures: function() {
      return new DefaultFeatures();
    },
    // get a string with details on the device, to use in tracking for example
    // this is method is there for coninience
    getDeviceDetails: function() {
      return (this.info.type === '' ? NOT_AVAILABLE : this.info.type)+"_"+(this.info.version === '' ? NOT_AVAILABLE : this.info.version);
    },
    // get a string with details on the device, to use in tracking for example
    // this is method is there for coninience
    getDeviceFirmwareDetails: function() {
      return NOT_AVAILABLE;
    },
    //   to determine language
    // if no language can be determined, the _fallback parameter will be returned, otherwise it will be null
    // overriding this method should behave in the same way (by calling super for example)
    // OPTIMIZE: Discuss: maybe this should return english 'en' (English) as default ?
    getLanguage: function(_fallback) {
        Logger.log("Device.getLanguage");
        var language = null;
        try{
            language = navigator.language ? navigator.language.split("-")[0] : language;
        }
        catch(e){}

        if(!language){
            language = _fallback ? _fallback : language;
        }
        Logger.log("Device.getLanguage: "+language);
        return language;
    },
    determineCSSCapabilities: function(featurename) {
        var feature = false,
        result = false,
        domPrefixes = 'Webkit Moz ms O Khtml'.split(' '),
        elm = document.createElement('div'),
        featurenameCapital = null;

        featurename = featurename.toLowerCase();

        if( elm.style[featurename] ) { feature = true; }

        if( feature === false ) {
            featurenameCapital = featurename.charAt(0).toUpperCase() + featurename.substr(1);
            for( var i = 0; i < domPrefixes.length; i++ ) {
                if( elm.style[domPrefixes[i] + featurenameCapital ] !== undefined ) {
                    feature = true;
                    pfx = domPrefixes[ i ];
                    result = {
                       prefix: pfx.toLowerCase(),
                       feature: pfx.toLowerCase() + featurenameCapital,
                       keyframeprefix: '-' + pfx.toLowerCase() + '-'
                    };
                    break;
                }
            }
        }
        return result;
    },
    canAnimateCSS: function() {
        return this.cssAnimation !== false;
    },
    canTransitionCSS: function() {
        return this.cssTransition !== false;
    },
    checkByHash : function(_stringToMatch) {
        return Util.match(this.hash, _stringToMatch, true);
    },
    checkByUserAgent: function(_stringToMatch, _caseInsensitive, _useRegex) {
        return Util.match(this.info.userAgent, _stringToMatch, _caseInsensitive, _useRegex);
    },
    checkByHashAndUserAgent : function(_stringToMatch, _caseInsensitive) {
        return (this.checkDeviceByHash(_stringToMatch) && this.checkDeviceByUserAgent(_stringToMatch, _caseInsensitive));
    }
});

/*
 * Ce-Html Device Class
 */
var CEhtmlDevice = Device.extend({
    initialize: function(_info) {
        _info.technology = TECHNOLOGY.CEHTML;
        this.supr(_info);
    },
    // creates a device depended key handler
    createKeyHandler: function(){
        this.keyHandler = new CEhtmlKeyHandler();
        return this.keyHandler;
    },
    // creates a device depended player
    createPlayer: function(){
        this.player = new CEHTMLPlayer(this.info);
        return this.player;
    },
    append: function(eObj, h) {
        Util.append(eObj[0], h, true);
    },
    initLogger: function() {
      Logger.setup(true, false, false);
      Logger.show();
    },
});

var Html5Device = Device.extend({

  initialize: function(_info) {
    _info.technology = TECHNOLOGY.HTML5;
    this.supr(_info);
  },

  createPlayer: function(){
      this.player = new HTML5Player(this.info);
      return this.player;
  },

  initLogger: function() {
    Logger.setup(true, false, false);
    Logger.show();
  },

  createKeyHandler: function(){
      this.keyHandler = new HTMLKeyHandler();
      return this.keyHandler;
  },
  
  exit: function(){
      window.history.go(-2);
  }
});

/*
 * Development Device Factory Class
 */
var DevelopmentDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.useVideoSourceObject = true;
        if ( this.checkDeviceByUserAgent("Chrome", false) ) {
            this.info.type = DEVICE_TYPE.PC_CHROME;
        } else if ( this.checkDeviceByUserAgent("Firefox", false) ) {
            this.info.type = DEVICE_TYPE.PC_FIREFOX;
        } else if ( this.checkDeviceByUserAgent("Opera", false) ) {
            this.info.type = DEVICE_TYPE.PC_OPERA;
        } else if ( this.checkDeviceByUserAgent("Safari", false) ) {
            this.info.type = DEVICE_TYPE.PC_SAFARI;
            //this.info.vendor = "safari";
        }
    },
    createDevice: function(){
        this.setupDevelopment();
        return this.onDeviceCreation(new Html5Device(this.info));
    },
    setupDevelopment: function(){
        Html5Device = Html5Device.extend({
            initialize: function(_info){
                this.supr(_info);
                this.initLogger();
            },
            initLogger: function(){
                Logger.setup(false, true, false);
            },
            getFeatures: function() {
              return new PointerFeatures(this);
            }
        });
    }
});

/*
 * AndroidTV Device Factory Class
 */
var AndroidTVDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.GOOGLE;
        this.info.platform = PLATFORM.ANDROIDTV;
        this.info.useVideoSourceObject = false;
        // check if a specific vendor is given as suffix after "androidtv-" in hash
        if ( this.checkDeviceByHash('androidtv-') ) {
            var suffix = this.info.hash.replace(/^.*androidtv\-(.+)/g, '$1');
            if( suffix ) {
            	suffix = suffix.toLowerCase();
							_.every(VENDOR, function(name) {
								name = name.toLowerCase();
								if (name !== suffix) return true;
                this.info.vendor = name;
							}, this);
            }
        }
    },
    createDevice: function(){
        this.setupAndroidTV();
        return this.onDeviceCreation(new Html5Device(this.info));
    },
    setupAndroidTV: function(){
        Html5Device = Html5Device.extend({
            initialize: function(_info){
                this.supr(_info);
                this.info.hasBadResolution = false;
                //this.zoom();
            },
            createKeyHandler: function(){
                this.keyHandler = new AndroidTVKeyHandler();
                return this.keyHandler;
            },
            zoom: function(){
                var sw = screen.width;
                var sh = screen.height;
                var sRatio = (sw / sh);
                var wRatio = sw / this.info.width;
                var hRatio = sh / this.info.height;
                var zoomratio = (wRatio > hRatio ? wRatio : hRatio);
                //BAD_RESOLUTION
                if (sRatio < 1.7 || sRatio > 1.8)
                    this.info.hasBadResolution = true;
                //if(document.domain != "localhost")
                $('body').css('zoom', zoomratio);
            },
            createPlayer: function(){
                this.player = new AndroidTVPlayer(this.info);
                return this.player;
            },
            getIO: function(o) {
              return new AndroidTVIO(o);
            },
            getWrapperVersion: function(){
                var androidTVWrapperVersion = null;
                if(window.androidTVWrapper && window.androidTVWrapper.getWrapperVersion){
                    var version = window.androidTVWrapper.getWrapperVersion();
                    if(version != "")
                        androidTVWrapperVersion = version;
                }
                return androidTVWrapperVersion;
            },
            // creates a device depended way to notify platform that the app is ready to use
            ready: function(){
                window.androidTVWrapper && window.androidTVWrapper.ready();
            },
            /**
             * Method to transfer meta data to an Android TV device in order to set a Now Playing card.
             * Parameter must be a JSON object
 			 * @param {Object} metaData
             */
            setNowPlayingMetaData: function(metaData){
                metaData && window.androidTVWrapper && window.androidTVWrapper.setNowPlayingMetaData(JSON.stringify(metaData));
            },
            exit: function(){
                window.history.go(-2);
                window.androidTVWrapper && window.androidTVWrapper.exit();
            }
        });
    }
});

/*
 * FireTV Device Factory Class
 */
var FireTVDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.AMAZON;
        this.info.platform = PLATFORM.FIRETV;
        this.info.useVideoSourceObject = false;
    },
    createDevice: function(){
        this.setupFireTV();
        return this.onDeviceCreation(new Html5Device(this.info));
    },
    setupFireTV: function(){
        Html5Device = Html5Device.extend({
            initialize: function(_info){
                this.supr(_info);
                this.info.hasBadResolution = false;
                //this.zoom();
            },
            createKeyHandler: function(){
                this.keyHandler = new FireTVKeyHandler();
                return this.keyHandler;
            },
            zoom: function(){
                var sw = screen.width;
                var sh = screen.height;
                var sRatio = (sw / sh);
                var wRatio = sw / this.info.width;
                var hRatio = sh / this.info.height;
                var zoomratio = (wRatio > hRatio ? wRatio : hRatio);
                //BAD_RESOLUTION
                if (sRatio < 1.7 || sRatio > 1.8)
                    this.info.hasBadResolution = true;
                //if(document.domain != "localhost")
                $('body').css('zoom', zoomratio);
            },
            createPlayer: function(){
                this.player = new FireTVPlayer(this.info);
                return this.player;
			},
            getIO: function(o) {
              return new FireTVIO(o);
            },
            getWrapperVersion: function(){
                var fireTVWrapperVersion = null;
                if(window.fireTV && window.fireTV.getWrapperVersion){
                    var version = window.fireTV.getWrapperVersion();
                    if(version != "")
                        fireTVWrapperVersion = version;
                }
                return fireTVWrapperVersion;
            },
            // creates a device depended way to notify platform that the app is ready to use
            ready: function(){
                window.fireTV && window.fireTV.ready();
            },
            exit: function(){
                window.history.go(-2);
                window.fireTV && window.fireTV.exit();
            }
        });
    }
});

/*
 * GoogleTV Device Factory Class
 */
var GoogleTVDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.platform = PLATFORM.GOOGLETV;
        this.info.useVideoSourceObject = true;
    },
    createDevice: function(){
        // GOOGLETV
        if ( this.checkDeviceByUserAgent("GoogleTV", false) ) {
            this.setupGoogleTV();
            return this.onDeviceCreation(new Html5Device(this.info));
        // NO DEFAULT
        } else {
            return this.onDeviceCreation(new Device(this.info));
        }
    },
    setupGoogleTV: function(){
        Html5Device = Html5Device.extend({
            initialize: function(_info){
                this.supr(_info);
                this.info.hasBadResolution = false;
                this.zoom();
            },
            createKeyHandler: function(){
                this.keyHandler = new GoogleTVKeyHandler();
                return this.keyHandler;
            },
            zoom: function(){
                var sw = screen.width;
                var sh = screen.height;
                var sRatio = (sw / sh);
                var wRatio = sw / this.info.width;
                var hRatio = sh / this.info.height;
                var zoomratio = (wRatio > hRatio ? wRatio : hRatio);
                //BAD_RESOLUTION
                if (sRatio < 1.7 || sRatio > 1.8)
                    this.info.hasBadResolution = true;
                //if(document.domain != "localhost")
                    $('body').css('zoom', zoomratio);
            },
            getDeviceFirmwareDetails: function(){
                try {
                    var firmware = '';

                    // GoogleTV User Agent changed from something like
                    // Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.77 Large Screen Safari/534.24 GoogleTV/000000
                    // to
                    // Mozilla/5.0 (Linux; GoogleTV x.x.x; LG Google TV Build/123456) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.77 Safari/534.24
                    // https://plus.google.com/u/0/+GoogleTVDevelopers/posts/fdzsmKgHAm9
                    // https://developers.google.com/tv/faq#useragentstring

                    var index_firmware = this.info.userAgent.indexOf("GoogleTV/");
                    if (index_firmware > -1)
                        firmware = this.info.userAgent.substring(index_firmware + 9);
                    else {
                        var res = this.userAgent.match(/GoogleTV\s([.0-9]*);\s(.*)\sBuild\/([.0-9]*)\)/);
                        if (res.length == 4){
                            firmware += res[1]; // x.x.x
                            firmware += "_"+res[2]; // LG Google TV
                            firmware += "/"+res[3]; // 123456 -> x.x.x_LG Google TV_123456
                        }
                    }
                    Logger.log("firmware GoogleTV: " + firmware);
                    return firmware;
                } catch (e) {
                    Logger.log("ERROR GoogleTV Firmware: " + e);
                    return '';
                }
            },
            getFeatures: function() {
              return new PointerFeatures(this);
            }
        });
    }
});

/*
 * LG Device Factory Class
 */
var LGDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.LG;
    },
    createDevice: function(){
        if (this.checkDeviceByUserAgent("Web0S", false)) {
            this.info.version = "webos";
        } else if (this.checkDeviceByUserAgent("LG NetCast.TV-2011", false) || this.checkDeviceByUserAgent("LG NetCast.Media-2011", false)) {
            this.info.version = "2.0";
        } else if (this.checkDeviceByUserAgent("LG NetCast.TV-2012", false) || this.checkDeviceByUserAgent("LG NetCast.Media-2012", false)) {
            this.info.version = "3.0";
        } else if (this.checkDeviceByUserAgent("LG NetCast.TV-2013", false) || this.checkDeviceByUserAgent("LG NetCast.Media-2013", false)) {
            this.info.version = "4.0";
        }
        switch (this.info.version) {
            case 'webos' :
                this.info.type = DEVICE_TYPE.TV;
                this.setupLGWebOS();
                return this.onDeviceCreation(new Html5Device(this.info));
                break;
            default:
                if (this.checkDeviceByUserAgent("LG NetCast.TV", false) && !(this.checkDeviceByUserAgent("LG NetCast.TV-2012", false) && this.checkDeviceByUserAgent("SP820", false))) {
                    this.info.type = DEVICE_TYPE.TV;
                } else {
                    this.info.type = DEVICE_TYPE.BDP;
                }
                this.setupLG();
                return this.onDeviceCreation(new CEhtmlDevice(this.info));
        }
    },
    setupLG: function(){
        CEhtmlDevice = CEhtmlDevice.extend({
            createKeyHandler: function(){
                this.keyHandler = new LGKeyHandler();
                return this.keyHandler;
            },
            exit: function(){
                if (window.NetCastBack)
                    window.NetCastBack();
            },
            addDeviceDetailsCSSClasses: function(){
                var model_year = this.info.userAgent.replace(/^.*LG\sNetCast\.(TV|Media)-(20[1-9][1-9]).*$/g, '$2');
                $("#WidgetBody").addClass("year"+model_year);
            },
            // get a string with details on the device, to use in tracking for example
            // this is method is there for coninience
            getDeviceDetails: function(){
                return (this.info.type === '' ? NOT_AVAILABLE : this.info.type)+"_"+ this.info.userAgent.replace(/^.*LG\sNetCast\.(TV|Media)-(20[1-9][1-9]).*$/g, '$2');
            },
            // get a string with details on the device, to use in tracking for example
            // this is method is there for coninience
            getDeviceFirmwareDetails: function(){
                try {
                    var lg_device = document.getElementById("device");

                    var deviceVersion = lg_device.version;
                    var swVersion = lg_device.swVersion;
                    var modelName = lg_device.modelName;
                    var hwVersion = lg_device.hwVersion;
                    var deviceInfo = deviceVersion + '<br/>' + hwVersion +'<br/>'+ swVersion +'<br/>'+modelName;
                    Logger.log("firmware LG: " + deviceInfo);

                    return swVersion+'_'+modelName;
                } catch (e) {
                    Logger.log("ERROR LG Firmware: " + e);
                    return '';
                }
            },
            getFeatures: function() {
              return new PointerFeatures(this);
            },
            getLanguage: function(_fallback) {
              Logger.log("LGDevice.getLanguage:");
              var language = null;
              try {
                var lgdevice = document.getElementById("device");
                if(lgdevice){
                  language = lgdevice.tvLanguage2.split("-")[0];
                }
              }
              catch(e){}

              if(language){
                Logger.log("LGDevice.getLanguage: "+language);
                return language;
              }
              else{
                return this.supr(_fallback);
              }
            }
        });
    },
    setupLGWebOS: function(){
        Html5Device = Html5Device.extend({
            getFeatures: function() {
              return new PointerFeatures(this);
            },
            addDeviceDetailsCSSClasses: function(){
                $("#WidgetBody").addClass("webos");
            }
        });
    }
});

/*
 * Panasonic Device Factory Class
 */
var PanasonicDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.PANASONIC;
    },
    createDevice: function(){
        this.setupPanasonic();
        return this.onDeviceCreation(new Html5Device(this.info));
    },
    setupPanasonic: function(){
        Html5Device = Html5Device.extend({
            initialize: function(_info){
                this.pingURL = _info.params.pingURL || '';
                this.supr(_info);
            },
            createKeyHandler: function(){
                this.keyHandler = new PanasonicKeyHandler();
                return this.keyHandler;
            },
            // creates a device depended way to notify platform that the app is ready to use
            ready: function(){
                Logger.log("PanasonicDevice.ready");
                this.startCheckingConnectivity();
            },
            setPingURL: function(_url){
                this.pingURL = _url;
            },
            exit: function(){
                window.close();
            },
            startCheckingConnectivity: function(){
                if (this.pingURL == '') {
                    Logger.log('WARNING: Please set up ping URL with setPingURL(_url) for connectivity check!');
                } else {
                    var that = this;
                    this._netCableConInterval = setInterval(function() {
                        $.ajax({
                            type : "GET",
                            timeout : 5000,
                            url : that.pingURL+'?'+Math.floor(Math.random(10)*100000),
                            success : function(msg) {
                                if (!that.isConnected) {
                                    that.isConnected = true;
                                    that.trigger('connection:reestablished', that );
                                }
                                result = true;
                            },
                            error : function(jqXHr, textStatus, errorThrown) {
                                if (that.isConnected) {
                                    that.isConnected = false;
                                    that.trigger('connection:lost', that );
                                }
                                result = false;
                            },
                            async:true
                        });
                    }, 4000);
                }
            }
        });
    }
});

/*
 * Philips Device Factory Class
 */
var PhilipsDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.PHILIPS;
        this.info.useVideoSourceObject = true;
        this.detectNetTVVersion();
        // check if HTML5 or CE-HTML
        if ( this.checkDeviceByHash("-html5") ) {
            this.techVersion = TECHNOLOGY.HTML5;
        } else {
            this.techVersion = TECHNOLOGY.CEHTML;
        }
    },
    createDevice: function(){
        switch (this.techVersion) {
        case TECHNOLOGY.HTML5 :
            this.setupPhilipsHtml5();
            return this.onDeviceCreation(new Html5Device(this.info));
        case TECHNOLOGY.CEHTML :
            this.setupPhilipsCEhtml();
            return this.onDeviceCreation(new CEhtmlDevice(this.info));
            break;
        }
    },
    detectNetTVVersion: function() {
        this.info.version = this.info.userAgent.replace(/.+NETTV\/(\S+).+/g, "$1");
    },
    setupPhilipsCEhtml: function(){
        CEhtmlDevice = CEhtmlDevice.extend({
            createKeyHandler: function(){
                this.keyHandler = new PhilipsKeyHandler();
                return this.keyHandler;
            },
            createPlayer: function(){
                this.player = new PhilipsCEhtmlPlayer(this.info);
                return this.player;
            },
            exit: function(){
                window.history.go(-999);
            }
        });
    },
    setupPhilipsHtml5: function(){
        Html5Device = Html5Device.extend({
            createKeyHandler: function(){
                this.keyHandler = new PhilipsKeyHandler();
                return this.keyHandler;
            },
            createPlayer: function(){
                this.player = new PhilipsHTML5Player(this.info);
                return this.player;
            },
            exit: function(){
                window.history.go(-999);
            }
        });
    }
});

/*
 * Samsung Device Factory Class
 */
var SamsungDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        Logger.log("SamsungDeviceFactory");
        this.info = _info;
        this.info.technology = TECHNOLOGY.PROP;
        this.info.vendor = VENDOR.SAMSUNG;
        if ((/^.*Tizen.*$/).test(this.info.userAgent)) {
        	this.info.platform = PLATFORM.TIZEN;
        } else {
        	this.detectProductType();
        }
    },
    createDevice: function(){
    	switch (this.info.platform) {
            case PLATFORM.TIZEN :
                return this.onDeviceCreation(new SamsungTizenDevice(this.info));
            default  :
                return this.onDeviceCreation(new SamsungDevice(this.info));
        }
    },
    detectProductType: function() {
        var productId = this.info.windowLocation.replace(/^.*product=(\d).*$/, "$1");
        switch (productId) {
            case '0' :
                this.info.type = DEVICE_TYPE.TV;
                break;
            case '2' :
                this.info.type = DEVICE_TYPE.BDP;
                break;
            default  :
                break;
        }
    }
});

/*
 * Samsung Device Class
 */
var SamsungDevice = Device.extend({
    widgetAPI: null,
    pluginAPI: null,
    tvKey: null,
    NNaviPlugin: null,
    NetworkPlugin: null,
    exitKeyCallback : null,
    initialize: function(_info) {
        _info.technology = TECHNOLOGY.PROP;
        Device.prototype.initialize.call(this,_info);
        this.widgetAPI = new Common.API.Widget();
        this.pluginAPI = new Common.API.Plugin();
        this.tvKey = new Common.API.TVKeyValue();
        this.NetworkPlugin = document.getElementById('pluginObjectNetwork');

        window.onShow = Util.bind(this,function () {              // register the onshow event callback
            Logger.log("samsung onshow");

            this.NNaviPlugin = document.getElementById('pluginObjectNNavi');
            this.NNaviPlugin.SetBannerState(1);

            this.pluginAPI.unregistKey(this.tvKey.KEY_VOL_UP);
            this.pluginAPI.unregistKey(this.tvKey.KEY_VOL_DOWN);
            this.pluginAPI.unregistKey(this.tvKey.KEY_MUTE);
            
            // turning off screen saver:
            if (this.pluginAPI.setOffScreenSaver)
                this.pluginAPI.setOffScreenSaver();
            if (this.pluginAPI.setOffIdleEvent)
                this.pluginAPI.setOffIdleEvent();

            if (this.getTVVersion() >= 2012) {
                this.pluginAPI.unregistKey(this.tvKey.KEY_WLINK);
                this.pluginAPI.unregistKey(this.tvKey.KEY_CONTENT);
            }
            this.addDeviceDetailsCSSClasses();
        });
        if ( this.isEmulator())
            this.initLogger();
        window.onunload = Util.bind(this,function () {              // register the onunload event callback
            this.player.doStop();
        });
    },
    initLogger: function() {
        if ( this.isEmulator()) {
            Logger.setup(false, false, true);
        } else {
            Logger.setup(true, false, false);
            Logger.show();
        }
    },
    // adds device specific CSS classes to App's body
    addDeviceDetailsCSSClasses: function() {

        var tv_version = this.getTVVersion();
        if (tv_version < 2012) {
            $("#WidgetBody").addClass("maple");
        }
        else{
            $("#WidgetBody").addClass("webkit");
        }
        $("#WidgetBody").addClass("year"+tv_version);

    },
    // creates a device depended key handler
    createKeyHandler: function(){
        this.keyHandler = new SamsungKeyHandler();
        this.keyHandler.on('ExitKey', this.exitOnExitKey, this);
        return this.keyHandler;
    },
    // creates a device depended player
    createPlayer: function(){
        this.player = new SamsungPlayer();
        return this.player;
    },
    // creates a device depended way to exit the app
    exit: function(){
        Logger.log("SamsungDevice.exit: ");
        this.widgetAPI.sendReturnEvent();
    },
    // special exit on Samsung: exit key sends exit event
    exitOnExitKey: function(){
        Logger.log("SamsungDevice.exitOnExitKey: ");
        if (typeof this.exitKeyCallback == 'function') {
            this.exitKeyCallback();
        } else {
            this.widgetAPI.sendExitEvent();
        }
    },
    // sets an alternative callback function for exitOnExitKey() to override it in-app
    setExitKeyCallback: function(_cb){
        Logger.log("SamsungDevice.setExitKeyCallback: ");
        if (typeof _cb == 'function')
            this.exitKeyCallback = _cb;
    },
    // creates a device depended way to notify platform that the app is ready to use
    ready: function(){
        Logger.log("SamsungDevice.ready");
        this.widgetAPI.sendReadyEvent();
        // turning off screen saver:
        if (this.pluginAPI.setOffScreenSaver)
            this.pluginAPI.setOffScreenSaver();
        if (this.pluginAPI.setOffIdleEvent)
            this.pluginAPI.setOffIdleEvent();
        this.startCheckingConnectivity();
    },
    getTVVersion: function(){
        try {
           var firmware = this.NNaviPlugin.GetFirmware();
           Logger.log("firmware " + firmware + " " + firmware.substring(10, 14));
           var year_integer = parseInt(firmware.substring(10, 14), 10);
           return year_integer;

        } catch (e) {
            Logger.log("Exception(Firmware Check) : " + e);
            return 0;
        }
    },
    getFirmwareVersion: function(){
        try {
            /*var smartHubVersion = '';
            try{
                smartHubVersion = "_"+deviceapis.tv.info.getVersion();
                Logger.log("firmware smartHubVersion: " + smartHubVersion);
            }catch(e){
                smartHubVersion = '';
                Logger.log("firmware Samsung ERROR SmartHub Version: "+e);
            };*/

            var firmware = this.NNaviPlugin.GetFirmware();

            Logger.log("firmware complete: " + firmware);

            var firmware2 = this.NNaviPlugin.GetSystemVersion(PL_NNAVI_SYSTEM_VERSION_LEEUM);
            Logger.log("firmware LEEUM: " + firmware2);
            var firmware3 = this.NNaviPlugin.GetSystemVersion(PL_NNAVI_SYSTEM_VERSION_COMP);
            Logger.log("firmware COMP: " + firmware3);
            firmware = firmware.substring(15);
            Logger.log("firmware SamS substring: " + firmware);

            return firmware;
        } catch (e) {
            Logger.log("ERROR Samsung Firmware: " + e);
            return '';
        }
    },
    getAbsolutePath : function(linkString) {
        var Abs_path = "";
        var rootPath = window.location.href.substring(0, location.href.lastIndexOf("/")+1);
        // For 2012, 2013 platform
        if (unescape(window.location.toString()).indexOf("localhost") == -1) {
            if (unescape(window.location.toString()).indexOf("file://C") != -1) {
                // For PC-SDK
                Abs_path = unescape(rootPath).split("file://")[1].replace("C/","C:/") + linkString;
            } else if (unescape(window.location.toString()).indexOf("file://c") != -1) {
                // For PC-SDK
                Abs_path = unescape(rootPath).split("file://")[1].replace("c/","C:/") + linkString;
            } else {
                // For Real-Device
                Abs_path = unescape(rootPath).split("file://")[1]+linkString;
            }
        // For 2010, 2011 platform
        } else {
            if (unescape(window.location.toString()).indexOf("C:") != -1) {
                // For PC-SDK
                Abs_path = "/" + unescape(rootPath).split("file://localhost/C:\\")[1].replace(/\\/g,"/") + linkString;
            } else {
                // For Real-Device
                Abs_path = "/" + unescape(rootPath).split("file://localhost/")[1] + linkString;
            }
        }
        return Abs_path;
    },
    isEmulator : function() {
        var Abs_path = "";
        var rootPath = window.location.href.substring(0, location.href.lastIndexOf("/") + 1);
        // For 2012, 2013 platform
        if (unescape(window.location.toString()).indexOf("localhost") == -1) {
            if (unescape(window.location.toString()).indexOf("file://C") != -1 || unescape(window.location.toString()).indexOf("file://c") != -1) {
                // For PC-SDK
                return true;
            } else {
                // For Real-Device
                return false;
            }
            // For 2010, 2011 platform
        } else {
            if (unescape(window.location.toString()).indexOf("C:") != -1) {
                // For PC-SDK
                return true;
            } else {
                // For Real-Device
                return false;
            }
        }
        return false;
    },
    getIO: function(o) {
      return new SamsungIO(o);
    },
    startCheckingConnectivity: function() {
        var that = this;
        this._netCableConInterval = setInterval(function() {
            if ( that.NetworkPlugin.CheckPhysicalConnection(1) == 1 || that.NetworkPlugin.CheckPhysicalConnection(0) == 1 ) {
                //Cable is ok
                if (!that.isConnected) {
                    that.isConnected = true;
                    that.trigger('connection:reestablished', that );
                }
            } else {
                //Cable is disconnected
                if (that.isConnected) {
                    that.isConnected = false;
                    that.trigger('connection:lost', that );
                }
            }
        }, 4000);
    },

    checkNetwork: function() {
      // this Code is copied from here:
      // http://samsungdforum.com/Guide/tec00128/index.html
      var physicalConnection = 0,
      httpStatus = 0;

      // Get active connection type - wired or wireless.
      currentInterface = networkPlugin.GetActiveType();

      // If no active connection.
      if (currentInterface === -1) {
        return false;
      }

      // Check physical connection of current interface.
      physicalConnection = networkPlugin.CheckPhysicalConnection(currentInterface);

      // If not connected or error.
      if (physicalConnection !== 1) {
        return false;
      }

      // Check HTTP transport.
      httpStatus = networkPlugin.CheckHTTP(currentInterface);

      // If HTTP is not avaliable.
      if (httpStatus !== 1) {
        return false;
      }

      // Everything went OK.
      return true;
    },
    // a class for special features like screensaver and so on...
    getFeatures: function() {
      return new SamsungFeatures(this);
    },
    // get a string with details on the device, to use in tracking for example
    // this is method is there for coninience
    getDeviceDetails: function() {
      return (this.info.type === '' ? NOT_AVAILABLE : this.info.type)+"_"+this.getTVVersion();
    },
    // get a string with details on the device, to use in tracking for example
    // this is method is there for coninience
    getDeviceFirmwareDetails: function() {
      var firmware =  this.getFirmwareVersion();
      return (firmware === '' ? NOT_AVAILABLE : firmware);
    },
    getLanguage: function(_fallback) {
        Logger.log("SamsungDevice.getLanguage");
        var language = null;
        try{
            var str = window.location.search;
            var returnVar = [];
            var results = str.split('&');
            for(i=0; i < results.length; i++){
                var result = results[i].split('=');
                returnVar[i] = {vars : result[0], values : result[1]};
                if( result[0] == "lang") {
                    language = result[1].split("-")[0];
                    break;
                }
            }
        }
        catch(e){}

        if(language){
            Logger.log("SamsungDevice.getLanguage: "+language);
            return language;
        }
        else{
            return this.supr(_fallback);
        }
    }
});

/*
 * Samsung Tizen Device Class
 */
var SamsungTizenDevice = Device.extend({

    initialize: function(_info) {
        _info.technology = TECHNOLOGY.PROP;
        Device.prototype.initialize.call(this,_info);
		this.addDeviceDetailsCSSClasses();
    },
    initLogger: function() {
        Logger.setup(false, true, false);
    },
    // adds device specific CSS classes to App's body
    addDeviceDetailsCSSClasses: function() {
        $("#WidgetBody").addClass("tizen");
    },
    // creates a device depended key handler
    createKeyHandler: function(){
        this.keyHandler = new SamsungTizenKeyHandler();
        return this.keyHandler;
    },
    // creates a device depended player
    createPlayer: function(){
        this.player = new SamsungTizenPlayer();
        return this.player;
    },
    // creates a device depended way to exit the app
    exit: function(){
        Logger.log("SamsungTizenDevice.exit: ");
        tizen.application.getCurrentApplication().exit();
    },
    // creates a device depended way to notify platform that the app is ready to use
    ready: function(){
        Logger.log("SamsungTizenDevice.ready");
        //this.startCheckingConnectivity();
    },
    getIO: function(o) {
      return new SamsungTizenIO(o);
    },
    /*
    startCheckingConnectivity: function() {
        var that = this;
        this._netCableConInterval = setInterval(function() {
            if ( that.NetworkPlugin.CheckPhysicalConnection(1) == 1 || that.NetworkPlugin.CheckPhysicalConnection(0) == 1 ) {
                //Cable is ok
                if (!that.isConnected) {
                    that.isConnected = true;
                    that.trigger('connection:reestablished', that );
                }
            } else {
                //Cable is disconnected
                if (that.isConnected) {
                    that.isConnected = false;
                    that.trigger('connection:lost', that );
                }
            }
        }, 4000);
    },
	*/
	/*
    checkNetwork: function() {
      // this Code is copied from here:
      // http://samsungdforum.com/Guide/tec00128/index.html
      var physicalConnection = 0,
      httpStatus = 0;

      // Get active connection type - wired or wireless.
      currentInterface = networkPlugin.GetActiveType();

      // If no active connection.
      if (currentInterface === -1) {
        return false;
      }

      // Check physical connection of current interface.
      physicalConnection = networkPlugin.CheckPhysicalConnection(currentInterface);

      // If not connected or error.
      if (physicalConnection !== 1) {
        return false;
      }

      // Check HTTP transport.
      httpStatus = networkPlugin.CheckHTTP(currentInterface);

      // If HTTP is not avaliable.
      if (httpStatus !== 1) {
        return false;
      }

      // Everything went OK.
      return true;
    },
    */
    getTVVersion: function(){
    	return 2015;
    },
    // a class for special features like screensaver and so on...
    getFeatures: function() {
      return new SamsungTizenFeatures(this);
    },
    // get a string with details on the device, to use in tracking for example
    // this is method is there for coninience
    getDeviceDetails: function() {
      return (this.info.type === '' ? NOT_AVAILABLE : this.info.type)+"_tizen";
    },
    // get a string with details on the device, to use in tracking for example
    // this is method is there for coninience
    getDeviceFirmwareDetails: function() {
      return NOT_AVAILABLE;
    }
});


/*
 * Opera TV Store Device Factory Class
 */
var OperaTVStoreDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.platform = PLATFORM.OPERATVSTORE;
        this.info.useVideoSourceObject = true;
    },
    createDevice: function(){
        // SONY
        if ( this.checkDeviceByUserAgent("SonyCEBrowser", false) ) {
            this.info.vendor = VENDOR.SONY;
        } else if ( this.checkDeviceByUserAgent("Swisscom", false) ) {
        	this.info.vendor = VENDOR.SWISSCOM;
        } else if ( this.checkDeviceByHash('opera-') ) {
            var suffix = this.info.hash.replace(/^.*opera\-(.+)/g, '$1');
            if( suffix ) {
            	suffix = suffix.toLowerCase();
							_.every(VENDOR, function(name) {
								name = name.toLowerCase();
								if (name !== suffix) return true;
                this.info.vendor = name;
							}, this);
            }
        }
        this.setupOpera();
        return this.onDeviceCreation(new Html5Device(this.info));
    },
    setupOpera: function(){
        Html5Device = Html5Device.extend({
            createKeyHandler: function(){
                this.keyHandler = new SonyCEBKeyHandler();
                return this.keyHandler;
            },
            exit: function(){
                window.close();
            }
        });
    }
});

/*
 * Oppo Device Factory Class
 */
var OppoDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.OPPO;
        this.info.type = DEVICE_TYPE.BDP;
    },
    createDevice: function(){
        this.setupOppo();
        return this.onDeviceCreation(new Html5Device(this.info));
    },
    setupOppo: function(){
        Html5Device = Html5Device.extend({
            createKeyHandler: function(){
                this.keyHandler = new OppoKeyHandler();
                return this.keyHandler;
            }
        });
    }
});

/*
 * Sony Device Factory Class
 */
var SonyDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.SONY;
        this.info.useVideoSourceObject = true;
    },
    createDevice: function(){
        // GOOGLETV
        if ( this.checkDeviceByUserAgent("GoogleTV", false) ) {
            var googleTVFactory = new GoogleTVDeviceFactory(this.info);
            return this.onDeviceCreation(googleTVFactory.createDevice());
        // CEB
        } else if ( this.checkDeviceByUserAgent("SonyCEBrowser", false) ) {
            this.setupCEB();
            return this.onDeviceCreation(new Html5Device(this.info));
        // NO DEFAULT
        } else {
            return this.onDeviceCreation(new Device(this.info));
        }
    },
    setupCEB: function(){
        Html5Device = Html5Device.extend({
            createKeyHandler: function(){
                this.keyHandler = new SonyCEBKeyHandler();
                return this.keyHandler;
            },
            exit: function(){
                window.close();
            }
        });
    }
});

/*
 * TechniSat Device Factory Class
 */
var TechnisatDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.TECHNISAT;
    },
    createDevice: function(){
        this.setupTechnisat();
        return this.onDeviceCreation(new CEhtmlDevice(this.info));
    },
    setupTechnisat: function(){
        CEhtmlDevice = CEhtmlDevice.extend({
            exit: function() {
                // there should be a redirect to ISIO live Portal-URL
            }
        });
    }
});

/*
 * Toshiba Device Class
 * ! Still in here for legacy support in Bild.de app !
 * ! Should be refactored in Bild.de app to use ToshibaDeviceFactory instead !
 */
var ToshibaDevice = Html5Device.extend({
    initialize: function(_info) {
        this.supr(_info);
    },
    // creates a device depended key handler
    createKeyHandler: function(){
        this.keyHandler = new ToshibaKeyHandler();
        return this.keyHandler;
    },
    // creates a device depended way to exit the app
    // Attention! Please steal this file from the bild
    // app :)
    exit: function(){
        window.location = "Toshiba/toshiba_exit.html";
    }
});

/*
 * Toshiba Device Factory Class
 */
var ToshibaDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.TOSHIBA;
        // check if HTML5 or CE-HTML
        if ( this.checkDeviceByHash("-html5") ) {
            this.techVersion = TECHNOLOGY.HTML5;
        } else {
            this.techVersion = TECHNOLOGY.CEHTML;
        }
    },
    createDevice: function(){
        switch (this.techVersion) {
            case TECHNOLOGY.HTML5 :
                this.setupToshibaHtml5();
                return this.onDeviceCreation(new Html5Device(this.info));
            case TECHNOLOGY.CEHTML :
                this.setupToshibaCEhtml();
                return this.onDeviceCreation(new CEhtmlDevice(this.info));
                break;
        }
    },
    setupToshibaCEhtml: function(){
        this.info.useVideoSourceObject = true;
        CEhtmlDevice = CEhtmlDevice.extend({
            createKeyHandler: function(){
                this.keyHandler = new ToshibaKeyHandler();
                return this.keyHandler;
            },
            createPlayer: function(){
                this.player = new PhilipsCEhtmlPlayer(this.info);
                return this.player;
            },
            exit: function(){
                window.location.href = "exittoshiba.htm";
            }
        });
    },
    setupToshibaHtml5: function(){
        Html5Device = Html5Device.extend({
            createKeyHandler: function(){
                this.keyHandler = new ToshibaKeyHandler();
                return this.keyHandler;
            },
            exit: function(){
                window.location.href = "exittoshiba.htm";
            }
        });
    }
});

/*
 * Loewe Device Factory Class
 */
var LoeweDeviceFactory = DeviceFactory.extend({
    initialize: function(_info){
        this.info = _info;
        this.info.vendor = VENDOR.LOEWE;
        this.info.useVideoSourceObject = true;
    },
    createDevice: function(){
        this.setupLoewe();
        return this.onDeviceCreation(new Html5Device(this.info));
    },
    setupLoewe: function(){
        Html5Device = Html5Device.extend({
            exit: function(){
                window.close();
            }
        });
    }
});

/*
 * Western Digital Device Class
 */
var WdDevice = Html5Device.extend({
    initialize: function(_info) {
        this.supr(_info);
    },
    // creates a device depended key handler
    createKeyHandler: function(){
        this.keyHandler = new WdKeyHandler(this.info);
        return this.keyHandler;
    },
    // creates a device depended way to exit the app
    exit: function(){
      if( deviceInfo && typeof deviceInfo.exitBrowser === 'function') {
        deviceInfo.exitBrowser();
      }
    }
});

var NOT_AVAILABLE = 'n.a.';
var VENDOR = {
    UNKNOWN :       'unknown',
    SAMSUNG :       'samsung',
    VIDEOWEB :      'videoweb',
    ABOX42 :        'abox42',
    TECHNISAT :     'technisat',
    INVERTO :       'inverto',
    BOXEE :         'boxee',
    SONY :          'sony',
    LOEWE :         'loewe',
    LG :            'lg',
    WD :            'wd',
    PHILIPS :       'nettv',
    SMART :         'smart',
    PANASONIC :     'panasonic',
    TOSHIBA :       'toshiba',
    OPPO :          'oppo',
    AMAZON :        'amazon',
    GOOGLE :        'google',
    SWISSCOM :      'swisscom'
};
var TECHNOLOGY = {
    HTML5 :         'html5Device',
    CEHTML :        'cehtmlDevice',
    PROP :          'proprietaryDevice'
};
var PLATFORM = {
    GOOGLETV :      'googletv',
    OPERATVSTORE :  'operatvstore',
    FIRETV :        'firetv',
    ANDROIDTV :     'androidtv',
    TIZEN : 		'tizen'
};
var DEVICE_TYPE = {
    TV :            'tv',
    BDP :           'bluraydiscplayer',
    STB :           'settopbox',
    HT :            'hometheatersystem',
    MC :            'mediacenter',
    PC_CHROME :     'pcchrome',
    PC_OPERA :      'pcopera',
    PC_FIREFOX :    'pcfirefox',
    PC_SAFARI :     'pcsafari',
    EMU :           'emulator'
};
/*
 * Device Detection Class
 */
var DeviceDetection = DeviceFactory.extend({
    initialize: function(){
        this.info = {
            userAgent: '',
            windowLocation: '',
            url: '',
            hash: ''
        };
        this.activeDeviceFactory = null;
    },

    createDeviceInfo: function(params) {
        this.info.userAgent = navigator.userAgent;
        this.info.windowLocation = window.location.search;
        this.info.url = document.URL;
        this.info.vendor = VENDOR.UNKNOWN;
        this.info.platform = NOT_AVAILABLE;
        this.info.type = NOT_AVAILABLE;
        this.info.params = params || {};
        this.info.hash = (window.location.hash ? window.location.hash : '');
    },

    createDevice: function(params) {
      // Deprecated! Please use one of the other two methods
      // to create a device.
      return this.createDeviceByHash(params);
    },

    createDeviceByHash: function(params){
        this.createDeviceInfo(params);

        // ANDROIDTV
        if ( this.checkDeviceByHash("androidtv") ) {
            this.activeDeviceFactory = new AndroidTVDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // SAMSUNG
        } else if ( (this.info.windowLocation && this.info.windowLocation.length > 0 && (/^.*modelid=.*$/).test(this.info.windowLocation)) || (/^.*Tizen.*$/).test(this.info.userAgent)) {
            this.activeDeviceFactory = new SamsungDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // SONY
        } else if (this.checkDeviceByHash("sony") ) {
            this.activeDeviceFactory = new SonyDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // GOOGLETV
        } else if (this.checkDeviceByHash("googletv") ) {
            this.activeDeviceFactory = new GoogleTVDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // OPERA TV STORE
        } else if (this.checkDeviceByHash("opera") ) {
            this.activeDeviceFactory = new OperaTVStoreDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // LG
        } else if (this.checkDeviceByHash("lg") && this.checkDeviceByUserAgent(/^.*LG\sNetCast\.(TV|Media)-20[1-9][1-9].*$/g, false, true) ) {
            this.activeDeviceFactory = new LGDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // PANASONIC
        } else if (this.checkDeviceByHash("panasonic") && this.checkDeviceByUserAgent("Viera", false) ) {
            this.activeDeviceFactory = new PanasonicDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // PHILIPS
        } else if (this.checkDeviceByHash("nettv") && this.checkDeviceByUserAgent("NETTV", false) ) {
            this.activeDeviceFactory = new PhilipsDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // TOSHIBA
        } else if (this.checkDeviceByHash("toshiba") ) {
            this.activeDeviceFactory = new ToshibaDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // OPPO
        } else if (this.checkDeviceByHash("oppo") ) {
            this.activeDeviceFactory = new OppoDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // AMAZON (FireTV)
        } else if (this.checkDeviceByHash("firetv") ) {
            this.activeDeviceFactory = new FireTVDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // TECHNISAT
        } else if (this.checkDeviceByHash("TechniSat") ) {
            this.activeDeviceFactory = new TechnisatDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // LOEWE
        } else if (this.checkDeviceByHash("loewe") ) {
            this.activeDeviceFactory = new LoeweDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        // VIDEOWEB TODO: conform to new device factory driven detection
        } else if ( this.checkDeviceByUserAgent("videoweb", true) ) {
            this.info.vendor = VENDOR.VIDEOWEB;
            return new CEhtmlDevice( this.info );
        // ABOX42 TODO: conform to new device factory driven detection
        } else if ( this.checkDeviceByUserAgent("ABox42-B12", false) ) {
            this.info.vendor = VENDOR.ABOX42;
            return new CEhtmlDevice( this.info );
        } else {
            return this.createFallBackDevice(params);
        }
    },

    createDeviceByUserAgent: function(params){
        this.createDeviceInfo(params);

        if ( (this.info.windowLocation && this.info.windowLocation.length > 0 && /^.*modelid=.*$/.test(this.info.windowLocation)) || (/^.*Tizen.*$/).test(this.info.userAgent) ) {
            this.info.vendor = VENDOR.SAMSUNG;
            this.activeDeviceFactory = new SamsungDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if ( this.checkDeviceByUserAgent("GoogleTV", false)) {
            this.activeDeviceFactory = new GoogleTVDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if ( this.checkDeviceByUserAgent(/^.*LG\sNetCast\.(TV|Media)-20[1-9][1-9].*$/g, false, true) || this.checkDeviceByUserAgent("Web0S", false) ) {
            this.activeDeviceFactory = new LGDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if ( this.checkDeviceByUserAgent("Viera", false) ) {
            this.activeDeviceFactory = new PanasonicDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if (this.checkDeviceByUserAgent("NETTV", false) || this.checkDeviceByUserAgent("philips", true)) {
            this.activeDeviceFactory = new PhilipsDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if ( this.checkDeviceByUserAgent("SonyCEBrowser", false) ) {
            this.activeDeviceFactory = new SonyDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if ( this.checkDeviceByUserAgent("Opera TV Store", false) ) {
            this.activeDeviceFactory = new OperaTVStoreDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if ( this.checkDeviceByUserAgent("TOSHIBA", false) ) {
            this.activeDeviceFactory = new ToshibaDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if ( this.checkDeviceByUserAgent("TechniSat") ) {
            this.activeDeviceFactory = new TechnisatDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        } else if ( this.checkDeviceByUserAgent("videoweb", true)) {
            this.info.vendor = VENDOR.VIDEOWEB;
            return new CEhtmlDevice( this.info );
        } else if ( this.checkDeviceByUserAgent("ABox42-B12", false) ) {
            this.info.vendor = VENDOR.ABOX42;
            return new CEhtmlDevice( this.info );
        } else {
            return this.createFallBackDevice(params);
        }
    },

    createFallBackDevice: function(params) {
        // handle special cases here, all supported devices should have been recognized up to this point
        // Attention: DO NOT TEST FOR OPERA HERE. The Opera/Safari UserAgent is also used by CE-HTML Devices.
        //            If you want to test on Opera Desktop and want a Dev System use the Hash "development"
        if (this.checkDeviceByHash("androidtv") ) {
            this.activeDeviceFactory = new AndroidTVDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
		}
        if (this.checkDeviceByHash("firetv") ) {
            this.activeDeviceFactory = new FireTVDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        }
        if (this.checkDeviceByHash("development") ||
            this.checkDeviceByUserAgent("Chrome", false) ||
            this.checkDeviceByUserAgent("Firefox", false)) {
            this.activeDeviceFactory = new DevelopmentDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        }
        if (params.fallback == "samsung") {
          this.activeDeviceFactory = new SamsungDeviceFactory(this.info);
          return this.activeDeviceFactory.createDevice();
        }
        if (params.fallback == "philips") {
          this.activeDeviceFactory = new PhilipsDeviceFactory(this.info);
          return this.activeDeviceFactory.createDevice();
        }
        if (this.checkDeviceByHash("technisat")) {
            this.activeDeviceFactory = new TechnisatDeviceFactory(this.info);
            return this.activeDeviceFactory.createDevice();
        }
        if (params.fallback == "cehtml") {
          this.info.vendor = VENDOR.CEHTML;
          return new CEhtmlDevice( this.info );
        }
        if (params.fallback == "html5") {
          this.info.vendor = VENDOR.HTML5;
          return new Html5Device( this.info );
        }
        return new Device( this.info );
    }

});

var Advertisement = klass({

  initialize: function() {
    this.trackings = [];
    this.percentTrackings = [];
    this.videos = [];
    this.duration = 0;
    this.wrapperUrl = null;
    this.imageCache = [];
    this.fallback = false;
  },

  getTrackingsForName: function(name) {
    var matching = [];
    _.each(this.trackings, function(entry) {
      if (entry.key == name) {
        matching.push(entry.url);
      }
    });
    return matching;
  },

  appendTrackingForName: function(track, url) {
    if (url != null && url.length > 0) {
      this.trackings.push({
        key: track,
        url: url
      });
    }
  },

  sendTrackingsByName: function(name) {
    var self = this;
    var matching = [];
    _.each(this.trackings, function(entry, index) {
      if (entry.key == name) {
        self.sendTrackByUrl(entry.url);
        delete self.trackings[index];
      }
    });
    return matching;
  },

  appendTrackingForPercent: function(percent, url) {
    if (this.percentTrackings[percent] == null) {
      this.percentTrackings[percent] = [];
    }

    this.percentTrackings[percent].push(url);
  },

  getTrackingsForPercent: function(percent) {
    var trackings = this.percentTrackings[percent];
    if (trackings == undefined || trackings == null) {
      trackings = [];
    }
    return trackings;
  },

  sendTrackingsByPercent: function(percent) {
    var self = this;
    var pending = this.getPendingTrackings(percent);
    _.each(pending, function(value, key) {
      _.each(value.urls, function(url) {
        self.sendTrackByUrl(url);
      });
      self.removePercentTrackings([value.percent]);
    });
  },

  getPendingTrackings: function(percent) {
    var result = [];
		_.each(this.percentTrackings, function(value, key) {
      if (key <= percent && value != null && value != undefined) {
        result.push({
          percent: key,
          urls: value
        });
      }
    });
    return result;
  },

  removePercentTrackings: function(percents) {
    var self = this;
    _.each(percents, function(percent) {
      self.percentTrackings[percent] = null;
    });
  },

  sendTrackByUrl: function(url) {
    var image = document.createElement("img");
    image.src = url;
    if (this.imageCache.push(image) > 30) {
      this.imageCache.shift();
    }
  },

  getVideoUrl: function() {
    // Das hier ist eine möglichst dumme
    // implementierung. Man könnte das noch ändern in etwas,
    // das erst nach Bitraten sortiert und dann die beste
    // Bitrate und/oder bestes Auslieferungsformat sortiert.
    // Das wird aber erst notwendig, wenn es Vermarkter gibt,
    // die mehr als einen Videostream in der Ad mitschicken.
    if (this.videos.length > 0) {
      return this.videos[0].url;
    }
    return null;
  },

  isEmpty: function() {
    return (this.duration == 1) || (this.videos.length == 0);
  }
  
});

var AdParser = klass({

  initialize: function(dom, ad) {
    this.dom = dom;
    this.errors = [];
    if (ad == null || ad == undefined) {
      this.ad = new Advertisement();
    } else {
      this.ad = ad;
    }
  },

  parse: function() {
    // NOOP, implemented in child classes
    return this.ad;
  },

  getText: function(node) {
    if (typeof node.item == 'function') {
      node = node.item(0);
    }

    if (node == null || node.firstChild == null) {
      return null;
    }

    var text = "";
    _.each(node.childNodes, function(node) {
      text += node.data;
    });
    return Util.trim(text);
  },

  getElementByPath: function(dom, select) {
    var names = select.split("/");
    var result = dom;

    for (var i in names) {
      if (result == null || result.length == 0) {
        return null;
      }
      if (typeof result.item == 'function') {
        result = result.item(0);
      }

      result = result.getElementsByTagName(names[i]);
    }

    return result;
  }
});

var EmptyParser = AdParser.extend({}).methods({
});

var SmartclipParser = AdParser.extend({}).methods({

  parse: function() {
    var adDetails = this.getElementByPath(this.dom, "ad_details").item(0);

    var url = adDetails.getAttribute("imageUrl");
    var m = url.match(/.*\.([^\.]*)/)
    var type = "";
    if (m) {
      type = m[1];
    }
    var data = {
      "width" : adDetails.getAttribute("width"),
      "height" : adDetails.getAttribute("height"),
      "url" : url,
      "type" : type
    }
    this.ad.videos.push(data);
    var trackings = this.getElementByPath(adDetails, "agencyTracker");
    if (trackings != null && trackings.length > 0){
       for (var i = 0; i < trackings.length; i++) {
          var tracker = trackings.item(i);
          var percent = tracker.getAttribute("progress");
          var url = Util.trim(tracker.getAttribute("url"));
          if (url.length > 0) {
            this.ad.appendTrackingForPercent(percent, url);
          }
       }
    }
    return this.ad;
  }
});

var Vast2Parser = AdParser.extend({}).methods({

  parse: function() {
    var wrapper = this.getElementByPath(this.dom, "Ad/Wrapper");
    var inline = this.getElementByPath(this.dom, "Ad/InLine");

    if (inline !== null && inline.length > 0) {
      this.parseInline(inline);
		} else if (wrapper !== null && wrapper.length > 0) {
      this.parseWrapper(wrapper);
    }
    return this.ad;
  },

  parseInline: function(dom) {
  	/* <Extensions>
     * 	<Extension type="dfp">
     * 		<AdServingData>
     * 			<Industry></Industry>
     * 		</AdServingData>
     * 		<Fallback>true</Fallback>
     * 	</Extension>
     * </Extensions>
     */
    var fallback = this.getElementByPath(dom, "Extensions/Extension/Fallback");
    
    if( fallback !== null && 
    		fallback.length > 0 && 
    		this.getText(fallback.item(0)) == 'true' ) 
    {
    	// 'FALLBACK' ADVERTiSMENT (iMPRESSiONS TRACKiNG ONLY, NO ViDEOS) 
			this.ad.fallback = true;
			this.addImpressions(dom);
    } else {
    	// 'REAL' ADVERTiSMENT
    	this.addVideosToAd(dom);
    	this.addTrackingToAd(dom);
    }
  },

  parseWrapper: function(dom) {
    this.addTrackingToAd(dom);
    var wrapperUrl = this.getElementByPath(dom, "VASTAdTagURI");
    if (wrapperUrl !== null && wrapperUrl.length > 0) {
      this.ad.wrapperUrl = this.getText(wrapperUrl[0]);
    }
  },

	addImpressions: function(dom) {
		var impressions = this.getElementByPath(dom, "Impression");
    if (impressions !== null && impressions.length > 0) {
      for (var i = 0; i < impressions.length; i++) {
        this.ad.appendTrackingForPercent(0, this.getText(impressions.item(i)));
      }
    }
	},

  addTrackingToAd: function(dom, ad) {
    this.addImpressions(dom);

		var errors = this.getElementByPath(dom, "Error");
    if (errors !== null && errors.length > 0){
      for (var i = 0; i < errors.length; i++) {
        url = this.getText(errors.item(i));
        this.ad.appendTrackingForName("errors", url);
      }
    }

    var trackings = this.getElementByPath(dom, "Creatives/Creative/Linear/TrackingEvents/Tracking");
    if (trackings !== null && trackings.length > 0) {
      for (var i = 0; i < trackings.length; i++) {
        tracking = trackings.item(i);
        var event = tracking.getAttribute("event");

        if (event == "start") {
          this.ad.appendTrackingForPercent(0, this.getText(tracking));
        } else if (event == "firstQuartile") {
          this.ad.appendTrackingForPercent(25, this.getText(tracking));
        } else if (event == "midpoint") {
          this.ad.appendTrackingForPercent(50, this.getText(tracking));
        } else if (event == "thirdQuartile") {
          this.ad.appendTrackingForPercent(75, this.getText(tracking));
        } else if (event == "complete") {
          this.ad.appendTrackingForPercent(100, this.getText(tracking));
        } else if (event == "fullscreen") {
          this.ad.appendTrackingForName("track_fullscreen", this.getText(tracking));
        }
      }
    }

    var videoClicks = this.getElementByPath(dom, "Creatives/Creative/Linear/VideoClicks/ClickThrough");
    if (videoClicks !== null && videoClicks.length > 0) {
      this.ad.appendTrackingForName("click_through", this.getText(videoClicks.item(0)));
    }

    var clickTracking = this.getElementByPath(dom, "Creatives/Creative/Linear/VideoClicks/ClickTracking");
    if (clickTracking !== null && clickTracking.length > 0) {
      for (var v = 0; v < clickTracking.length; v++) {
        this.ad.appendTrackingForName("click_tracking", this.getText(clickTracking.item(v)));
      }
    }

  },

  addVideosToAd: function(dom) {
    var videos = this.getElementByPath(dom, "Creatives/Creative/Linear");
    if (videos !== null && videos.length > 0){
      for (var i = 0; i < videos.length; i++) {
        var mediaFiles = this.getElementByPath(videos.item(i), "MediaFiles/MediaFile");

        if (mediaFiles !== null && mediaFiles.length > 0) {
          for (var v = 0; v < mediaFiles.length; v++) {
            var mediaFile = mediaFiles.item(v);
            url = Util.trim(this.getText(mediaFile));

            if (url.length > 0) {
              var data = {
                "delivery" : mediaFile.getAttribute("delivery"),
                "bitrate" : parseInt(mediaFile.getAttribute("bitrate"), 10),
                "width" : mediaFile.getAttribute("width"),
                "height" : mediaFile.getAttribute("height"),
                "type" : mediaFile.getAttribute("type"),
                "url" : url
              };
              this.ad.videos.push(data);
            }

          }
        }

        var durations = this.getElementByPath(videos.item(i), "Duration");
        if (durations !== null && durations.length > 0) {
          var durationText = this.getText(durations[0]);
          var match = durationText.match(/^(\d\d):(\d\d):(\d\d)$/);
          if (match) {
            var durationInt = parseInt(match[1], 10) * 60*60 + parseInt(match[2], 10) * 60 + parseInt(match[3], 10);
            this.ad.duration = durationInt;
          }
          match = durationText.match(/^(\d*)$/);
          if (match) {
            this.ad.duration = parseInt(durationText,10);
          }
        }
      }
    }
  }
});

var ParserFactory = {
  getParser: function(dom, ad) {
    if (dom == null) {
      return new EmptyParser(ad);
    } else if (dom.nodeName == "VAST") {
      return new Vast2Parser(dom, ad);
    } else if (dom.nodeName == "content") {
      return new SmartclipParser(dom, ad);
    }
    return new EmptyParser();
  }
};

/**
 * This class handles Ads and Videos. It
 * has a basic playlist functionality and is
 * 100% tested with Buster.
 *
 * To use it just create a new AdController like
 * this:
 *
 * var playlist = new AdController([
 *   {adUrl: "http://vastheaven.com/vast2_preroll.xml"},
 *   {videoUrl: "http://video.cdn.com/monkeyballs.mp4"},
 *   {adUrl: "http://vastheaven.com/vast2_preroll.xml"},
 * ]);
 *
 * And then try to get the next Video with
 * playlist.getNextVideo(function(video) {
 *    console.log("Next Video URL is : " + video.url);
 * });
 *
 * The callback will get a null object if there is no
 * video left in the playlist.
 *
 * The AdUrl must be a JsonP able URL.
 */

function jsonp_callback(result) {
  if (window.adCallback) {
    window.adCallback(result);
  }
};

var AdController = klass({

  initialize: function(videos) {
    this.videos = videos;
    this.currentPosition = 0;
    this.duration = 0;
    this.currentAd = null;
    this.skipAd = false;
  },

  getNextVideo: function(callback) {
    var self = this;
    this.currentAd = null;

    if (this.currentPosition >= this.videos.length) {
      callback(null);
    } else {
      var current = this.videos[this.currentPosition];
      this.currentPosition += 1;

      if (current == null) {
        callback(null);
      } else if (current.adUrl != null) {
        this.loadAd(current.adUrl, function(ad) {
        	if( ad ) {
        		if( !ad.isEmpty() ) {
        			self.currentAd = ad;
            	callback({url: ad.getVideoUrl(), type: "ad", ad: ad});
           	} else {
           		// SEND iMPRESSiONS WHEN AD HAS NO ViDEO AND iS 'FALLBACK'
        			if( ad.fallback ) {
          			ad.sendTrackingsByPercent(0);
          		}
            	self.getNextVideo(callback);
        		}
        	} else {
        		self.getNextVideo(callback);
        	}
        });
      } else if (current.videoUrl != null) {
        callback({url: current.videoUrl, type: "video"});
      } else {
        callback(null);
      }
    }
  },

  cancelAd: function() {
    this.currentAd = null;
  },

  updatePlayTime: function(time) {
    this.currentTime = time;
    this.sendTrackings();
  },

  videoFinished: function() {
    this.updatePlayTime(this.duration);
  },

  setDuration: function(duration) {
    this.duration = duration;
  },

  sendTrackingsForName: function(name) {
    if (this.currentAd != null) {
      this.currentAd.sendTrackingsByName(name);
    }
  },

  sendTrackings: function() {
    if (this.currentAd != null) {
      var percent = this.currentTime / (this.duration / 100);
      // Sicherheitshalber schon bei 95% "vollzug" melden,
      // da es bei einigen TV Herstellern rundungsungsprobleme
      // gibt
      if (percent > 95) {
        percent = 100;
      }
      this.currentAd.sendTrackingsByPercent(percent);
    }
  },

  loadAd: function(url, callback, ad) {
    if (this.skipAd || url == null || url == undefined || url.length == 0) {
      callback(new Advertisement());
    } else {
      var self = this;
      // Wenn nach 2 sek nix kommt, alles
      // abbrechen
      var timeoutSend = false;
      var timer = setTimeout(function() {
        timeoutSend = true;
        self.jsonpCallback(null, callback, ad);
      }, 2000);
      window.adCallback = function(data) {
        clearTimeout(timer);
        // Wenn der Timeout noch nicht gesendet
        // worden ist, die Daten parsen
        if (!timeoutSend) {
          window.adCallback = null;
          self.jsonpCallback(data, callback, ad);
        }
      };
      this.adCallback = window.adCallback;
      $.ajax({
        dataType: 'jsonp',
        jsonp: false,
        cache: true, // cache buster parameter not needed, ASMI and Smartclip have their own
        url: url,
        crossDomain: true,
      });
    }
  },

  jsonpCallback: function(data, callback, ad) {
    var ad = this.parseJsonpResult(data, ad);
    if (ad.wrapperUrl != null && ad.wrapperUrl.length > 0) {
      var url = ad.wrapperUrl;
      ad.wrapperUrl = null;
      this.loadAd(url, callback, ad);
    } else {
      callback(ad);
    }
  },

  parseJsonpResult: function(data, ad) {
    try {
      var responseDoc = new DOMParser().parseFromString(data["contents"], 'text/xml');
      var parser = ParserFactory.getParser(responseDoc.firstChild, ad);
      return parser.parse(responseDoc.firstChild);
    } catch(e) {
      return new Advertisement();
    }
  }

});

/*
 * Tracking Factory Class
 */
var TrackingFactory = klass({
    initialize: function(){
        //
    },
    createTracker: function(_options) {
        this.trackerType = (_options.type ? _options.type : '');
        switch (this.trackerType) {
            case 'ga' :
                if (typeof _options.accountString == 'undefined' || _options.accountString == '') {
                    return new NoTracker(_options, "There is no account string given for google analytics!");
                }
                return new GATracker(_options);
            default   :
                return new NoTracker(_options, "No tracker type specified!");
        }
    }
});

/*
 * Empty Tracker Class
 * 
 * Provides all necessary public methods to avoid not handled JavaScript errors in using apps
 */
var NoTracker = klass({
    initialize: function(_options, _message) {
        Logger.log("--------- TRACKER -----------------------------------------");
        Logger.log("Failed to initialize any specific tracker!");
        Logger.log("INFO: " + _message);
        Logger.log("-- Possible options:");
        Logger.log("---- Google Analytics:");
        Logger.log("------ (mandatory) type: 'ga'");
        Logger.log("------ (mandatory) accountString: 'UA-xxxxxxxx-x'");
        Logger.log("-- Given options:");
        for (option in _options) {
            Logger.log("-- " + option + ": " + _options[option]);
        }
        Logger.log("-----------------------------------------------------------");
    },
    // track page request
    trackPage: function(_pageURL) {
        Logger.log("WARNING: tracker is not set up!");
    },
    // track event
    trackEvent: function(_eventCategory, _eventAction, _eventLabel) {
        Logger.log("WARNING: tracker is not set up!");
    }
});

/*
 * Google Analytics Tracker Class
 * 
 * For possible parameters, see:
 * https://developers.google.com/analytics/resources/articles/gaTrackingTroubleshooting#gifParameters
 */
var GATracker = klass({
    initialize: function(_options) {
        this.accountString  = _options.accountString;
        this.anonymizedIP   = (_options.anonymizedIP ? _options.anonymizedIP : false); 
        this.encoding       = "UTF-8";
        this.version        = "5.3.2";
        this.domainHash     = "1";
        // __utma:
        this.uniqueID       = (Math.floor(Math.random(10)*100000) + '00145214523');
        this.timeFirstVisit = new Date().getTime();
        this.timePrevVisit  = new Date().getTime();
        this.sessionCount   = '15';
        // __utmz:
        this.timeCookieSet  = new Date().getTime();
        this.sessionNo      = '1';
        this.campaignNo     = '1';
        this.campaignSrc    = '(direct)';
        this.campaignName   = '(direct)';
        this.campaignMedium = '(none)';
        
        this.urlBasics     = "https://ssl.google-analytics.com/__utm.gif?" + 
            "utmac=" + this.accountString + "&" + 
            //"utmdt=" + this.pageTitle + "&" + 
            "utmcs=" + this.encoding + "&" + 
            "utmwv=" + this.version +
            (this.anonymizedIP ? "&aip=1" : "");
    },
    // builds a fake ga cookie (utmcc)
    // __utma : [Domain hash].[Unique ID].[Timestamp first visited the site].[Timestamp previous visit].[Timestamp current visit].[Number of sessions started]
    // __utmz : [Domain Hash].[Timestamp when cookie was set].[Session number].[Campaign number].utmcsr=[Campaign source]|utmccn=[Campaign name]|utmcmd=[Campaign medium]
    getCookieString: function() {
        var utma = "__utma%3D" + this.domainHash + "." + 
            this.uniqueID + "." + this.timeFirstVisit + "." + 
            this.timePrevVisit + "." + (new Date().getTime()) + "." + this.sessionCount + "%3B%2B";
        
        var utmz = "__utmz%3D" + this.domainHash + "." + 
            this.timeCookieSet + "." + this.sessionNo + "." + this.campaignNo + "." + 
            "utmcsr%3D" + this.campaignSrc + "%7Cutmccn%3D" + this.campaignName + 
            "%7Cutmccn%3D" + this.campaignMedium + "%3B";
        
        return "&utmcc=" + utma + utmz;
    },
    // builds a string with all parameters to use
    // in a tracking call (event or page tracking parameters not included!)
    // utmn   : Unique ID generated for each GIF request to prevent caching of the GIF image
    // utmhid : A random number used to link the GA GIF request with AdSense
    getTrackingBaseURL: function() {
        var randomId = Math.floor(Math.random(10)*100000);
        var baseURL = this.urlBasics + 
            this.getCookieString() + 
            "&utmn=" + randomId + 
            "&utmhid=" + randomId;
        return baseURL;
    },
    sendTracking: function(_trackingURL) {
        Logger.log("GATracker.sendTracking to " + _trackingURL);
        var trackingImage = document.createElement("img"); 
        trackingImage.src = _trackingURL;
    },
    // getCustomVarString
    // format for a max of 5 custom variables
    // slot must be within 1-5
    // scope must be 1 (visit-level), 2 (session-level) or 3(page-level), default)=3
    // "&utme=8(slot1!name1*slot2!name2)9(slot1!value1*slot2!value2)11(slot1!scope1*2!scope2)";
    // 8,9,11 are constants (like 5 for setting event details)
    // more variables can be added with *, GA default scope is 3 = "page level"
    getCustomVarString: function(_custom_vars) {
        Logger.log("GATracker.getCustomVarString");
        if(_custom_vars){
            var slots_names = "";
            var slots_values = "";
            var slots_scopes = "";
            for (var i = 0; i < _custom_vars.length; i++) {
                var seperator = (i == _custom_vars.length-1 ? '' : '*');
                var slot = _custom_vars[i].slot;
                var name = _custom_vars[i].name;
                var value = _custom_vars[i].value;
                var scope = (_custom_vars[i].scope ? _custom_vars[i].scope : 3);
                slots_names += slot + '!'+ name + seperator;
                slots_values += slot + '!'+ value + seperator;
                slots_scopes += slot + '!'+ scope + seperator;
            };
            return encodeURIComponent("8("+slots_names+")9("+slots_values+")11("+slots_scopes+")");
        }
        return '';
    },
    // track page request
    trackPage: function(_options) {
        var url = (_options.url ? _options.url : 'undefined');
        var title = (_options.title ? _options.title : 'undefined');
        var custom_vars = (_options.custom_vars ? "&utme="+this.getCustomVarString(_options.custom_vars) : '');
        
        var trackingURL = this.getTrackingBaseURL()+ "&utmp=" + url + "&utmdt=" + title + custom_vars;
        this.sendTracking(trackingURL);
    },
    // track event
    trackEvent: function(_options) {
        var category = (_options.category ? _options.category : 'undefined');
        var action = (_options.action ? _options.action : 'undefined');
        var label = (_options.label ? _options.label : false);
        var pageTitle = (_options.pageTitle ? _options.pageTitle : 'Event');
        
        var custom_vars = (_options.custom_vars ? this.getCustomVarString(_options.custom_vars) : '');
        var eventString = "5(" + category + "*" + action + (label ? ("*" + label) : "") + ")";

        var trackingURL = this.getTrackingBaseURL() + "&utmt=event&utme=" + encodeURIComponent(eventString)+custom_vars + "&utmdt=" + pageTitle;
        // with 
        //var trackingURL = this.getTrackingBaseURL() + "&utmt=event" + "&utmdt=" + pageTitle;

        this.sendTracking(trackingURL);
    }
});