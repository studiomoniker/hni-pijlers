function postMessage(data) {
  window.parent.postMessage(JSON.stringify(data), '*');
}

function redirect(url) {
  postMessage({
    status: 'redirect',
    domain_path: url
  });
}

window.addEventListener('message', function (event) {
  var data = JSON.parse(event.data);
  // Ignore messages that do not contain the domain_path property:
  if (!data.domain_path)
    return;

  // If we are on the homepage, add a link to body to have the parent redirect to the magazine URL:
  var onHomepage = /homepage\=1/.test(window.location.search);
  if (onHomepage) {
    document.body.addEventListener('click', function() {
      redirect(data.domain_path);
    });
  }
});

// Get unique cover id from url:
// Tell parent that loading of this iframe is ready
postMessage({
  status: 'ready',
  coverId: (window.location.pathname).split('/')[4]
});

export { redirect };