var getUrlVars = function() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
};

var urlVars = getUrlVars();
if (typeof urlVars.title !== 'undefined') {
  var coverTitle = atob(urlVars.title);
} else {
  var coverTitle = 'Title was not passed';
}

if (typeof urlVars.subtitle !== 'undefined') {
  var coverSubtitle = atob(urlVars.subtitle);
} else {
  var coverSubtitle = 'Subtitle was not passed';
}
