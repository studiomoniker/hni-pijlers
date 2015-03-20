getTitleData(function (msg) {
  document.querySelector('h1').innerHTML = msg.title;
  document.querySelector('h2').innerHTML = msg.subtitle;
  
  // Add link to body to have the parent redirect to the magazine URL
  if (msg.isHomepage) {
    document.body.addEventListener('click', function() {
      redirectParent(msg.domain_path);
    });
    document.body.style.cursor = 'pointer';
  }
});
