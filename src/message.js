new function() {
  var doc = document;
  var win = window;
  var location = window.location;
  var body = doc.body;
  function redirectParent(url) {
    parent.postMessage('{"status": "redirect", "domain_path": "' + url + '"}', '*');
  }

  function getData(callback) {

    // Somehow determines if we're on the homepage. no idea what they came up here...
    function isHomepage() {
      var match = RegExp('[?&]homepage=([^&]*)').exec(location.search);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    // Receive data having title and subtitle and put in on the page
    window.addEventListener('message', function (e) {
      var data = JSON.parse(e.data);
      if (data.domain_path !== undefined) {
        data.isHomepage = isHomepage();
        callback(msg);
      }
    });

    // Create unique cover id
    var coverId = (location.pathname).split('/')[4];

    // Send information to parent saying that loading of the iframe is ready
    parent.postMessage('{"status": "ready", "coverId": "' + coverId + '"}', '*');
  }


  getData(function (data) {
    // Uncomment if this is an institutional cover:
    // document.querySelector('h1').innerHTML = msg.title;
    // document.querySelector('h2').innerHTML = msg.subtitle;
    
    // Add link to body to have the parent redirect to the magazine URL
    if (data.isHomepage) {
      body.addEventListener('click', function() {
        redirectParent(data.domain_path);
      });
      body.style.cursor = 'pointer';
    }
  });
}