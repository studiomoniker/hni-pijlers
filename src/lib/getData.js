function redirectParent(url) {
  parent.postMessage('{"status": "redirect", "domain_path": "' + url + '"}', '*');
}

function getTitleData(callback) {

  // Somehow determines if we're on the homepage. no idea what they came up here...
  function isHomepage() {
    var match = RegExp('[?&]homepage=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  // Receive data having title and subtitle and put in on the page
  window.addEventListener('message', function (e) {
    var msg = JSON.parse(e.data);
    if (msg.domain_path !== undefined) {
      msg.isHomepage = isHomepage();
      callback(msg);
    }
  });

  // Create unique cover id
  var coverId = (window.location.pathname).split('/')[4];

  // Send information to parent saying that loading of the iframe is ready
  parent.postMessage('{"status": "ready", "coverId": "' + coverId + '"}', '*');
}
