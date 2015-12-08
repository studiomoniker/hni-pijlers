(function() {
  var selectors = {
    green: {
      backgroundColor: [
        '.domain-hni.not-front #page:before',
        '.domain-hni .page-section-image-slider .content:before',
        '.domain-hni.page-home .cover-container',
        '.homepage-announcement-wrapper',
        '.agenda-mobile-header',
        '.agenda-activities .agenda-large-header',
        '.page-header-nav',
        '.corporate-magazine-front.not-front #page-wrapper.scrolled-down:before',
        '#block-magazine-related-magazines',
      ]
    },
    light_green: {
      backgroundColor: [
        '#sliding-popup .popup-content div#popup-buttons .agree-button:hover',
        '.domain-hni',
        '.domain-magazine',
        '#ui-datepicker-div',
        '.agenda-magazines .agenda-large-header',
        '.domain-hni.not-front .hni-header-button-menu',
        '.domain-hni.not-front .hni-header-processed .section',
        '.breadcrumb-wrapper .breadcrumb a',
        '.domain-hni .scroll-hint .scroll-hint-content',
      ]
    }
  };

  var rmultiDash = /([A-Z])/g;
  var toProperty = function(key) {
    return key.replace(rmultiDash, "-$1").toLowerCase()
  };

  var randomNumber = function(min, max) {
    var p = Math.random();

    return min + (max - min) * p;
  };

  var easing = function(p) {
    return Math.pow(p, 2);
  };
  var swing = function(p) {
    if (p < 0.25) {
      return easing(p * 4) / 2;
    }
    if (p < 0.75) {
      return 1 - (easing((p * -4) + 2) / 2);
    }
    return easing((p * 4) - 4) / 2;
  };

  var between = function(min, max, p) {
    return min + (max - min) * p;
  };

  var generate_css = function() {
    var now = new Date();
    var p_h = swing((now.getTime() % 3600000) / 3600000);
    var p_s = swing(((now.getTime() + 150000) % 1605000) / 1605000);
    var p_v = swing(( (((now.getHours() * 60) + now.getMinutes()) * 60 + now.getSeconds()) % 86400) / 86400);

    var green_hsv = {
      h: between(80, 160, p_h),
      s: between(30, 100, p_s),
      v: between(50, 100, p_v)
    };

    var green = tinycolor(green_hsv);

    var colors = {
      green: green.toHexString(),
      light_green: tinycolor.mix('white', green, 30).toHexString()
    };

    var css = [];

    var color, property, selector, i;
    for (color in selectors) {
      for (property in selectors[color]) {
        css.push(
          selectors[color][property].join(",\n") + " {\n  " +
            toProperty(property) + ": " + colors[color] + ";\n" +
          "}"
        );
      }
    }

    return css.join("\n\n");
  };

  var css_element = document.createElement('style');
  css_element.type = 'text/css';
  css_element.textContent = generate_css();

  document.getElementsByTagName('head')[0].appendChild(css_element);
  window.setInterval(function() {
    css_element.textContent = generate_css();
  }, 1000);
}());
