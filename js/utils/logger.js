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
