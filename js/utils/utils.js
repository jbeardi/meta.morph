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
