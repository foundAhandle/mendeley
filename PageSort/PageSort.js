var REMOTE_URL = "http://collabracode-js.appspot.com/mendeley_proxy/oapi/documents/search/computation;mechanics/?consumer_key=973a9d58c1f8ffe7155e5d5136183ff304dcb3fb6&items=100";

function log(s) {
  if(console && console.log) {
    console.log(s);
  }
}

function loadRemoteRSSHandler(evt) {
  loadRemoteRSS(riverCallback);
}

function loadRemoteRSS(callback) {
  if(!callback) {
    callback = riverCallback;
  }
  var req = new XMLHttpRequest();
  req.open("GET", REMOTE_URL, true);
  req.onreadystatechange = function(aEvt) {
    if(req.readyState == 4) {
      if(req.status == 200) {
        //log(req.responseText);
        var obj = JSON.parse(req.responseText);
        if(obj) {
          if(callback.onsuccess)
            callback.onsuccess(obj);
        } else {
          if(callback.onerror) {
            callback.onerror(req);
          } else {
            log(req);
          }
        }
      } else {
        if(callback.onerror) {
          callback.onerror(req);
        } else {
          log(req);
        }
      }
    }
  };
  req.send(null);
}

function attachButtonEvents() {
  var elem = document.getElementById("load-search-results");
  if(elem) {
    addEvent(elem, "click", loadRemoteRSSHandler);
  }
}

if(window) {
  addEvent(window, "load", attachButtonEvents);
}

