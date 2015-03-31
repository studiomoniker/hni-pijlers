new function() {
  function postMessage(data) {
    parent.postMessage(JSON.stringify(data), '*');
  }

  window.addEventListener('message', function (event) {
    var data = JSON.parse(event.data);
    // Ignore messages that do not contain the domain_path property:
    if (!data.domain_path)
      return;

    // Uncomment if this is an institutional cover:
    // document.querySelector('h1').innerHTML = data.title;
    // document.querySelector('h2').innerHTML = data.subtitle;

    // If we are on the homepage, add a link to body to have the parent redirect to the magazine URL:
    var onHomepage = /homepage\=1/.test(window.location.search);
    if (onHomepage) {
      document.body.addEventListener('click', function() {
        // Tell parent to redirect us:
        postMessage({
          status: 'redirect',
          domain_path: data.domain_path
        });
      });
      document.body.style.cursor = 'pointer';
    };
  });

  // Get unique cover id from url:
  // Tell parent that loading of this iframe is ready
  postMessage({
    status: 'ready',
    coverId: (window.location.pathname).split('/')[4]
  });
}
