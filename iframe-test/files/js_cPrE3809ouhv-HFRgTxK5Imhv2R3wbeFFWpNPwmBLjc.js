/*
 * jQuery postMessage - v0.5 - 9/11/2009
 * http://benalman.com/projects/jquery-postmessage-plugin/
 * 
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($){var g,d,j=1,a,b=this,f=!1,h="postMessage",e="addEventListener",c,i=b[h]&&!$.browser.opera;$[h]=function(k,l,m){if(!l){return}k=typeof k==="string"?k:$.param(k);m=m||parent;if(i){m[h](k,l.replace(/([^:]+:\/\/[^\/]+).*/,"$1"))}else{if(l){m.location=l.replace(/#.*$/,"")+"#"+(+new Date)+(j++)+"&"+k}}};$.receiveMessage=c=function(l,m,k){if(i){if(l){a&&c();a=function(n){if((typeof m==="string"&&n.origin!==m)||($.isFunction(m)&&m(n.origin)===f)){return f}l(n)}}if(b[e]){b[l?e:"removeEventListener"]("message",a,f)}else{b[l?"attachEvent":"detachEvent"]("onmessage",a)}}else{g&&clearInterval(g);g=null;if(l){k=typeof m==="number"?m:typeof k==="number"?k:100;g=setInterval(function(){var o=document.location.hash,n=/^#?\d+&/;if(o!==d&&n.test(o)){d=o;l({data:o.replace(n,"")})}},k)}}}})(jQuery);;
// corporate home

(function($) {
  var homepageItems;
  var use_images = true;

  var threshold = 50;

  var redrawHomepageItems = function() {
    var viewport_size = Drupal.get_viewport_size();
    $('.cover-container.no-cover, .cover-container.has-cover').css('height', viewport_size.height);

    use_images = (viewport_size.width < 768);
    var screen_position = (viewport_size.height > viewport_size.width) ? 'Portrait' : 'Landscape';

    if (use_images) {
      homepageItems.each(function() {
        var cover_data = $(this).data();
        url = 'url(' + cover_data['mobile' + screen_position] + ')';

        // Only change background-image when URL different from current value and when url doesn't container undefined
        if( $(this).css('background-image') != url && url.indexOf('undefined') == -1 ) {
          $(this).css('background-image', 'url(' + cover_data['mobile' + screen_position] + ')');
          $(this).find('iframe.magazine-cover-desktop').remove();
        }
      });
    } else {
      homepageItems.css('background-image', 'none');
      toggleHomepageItems();
    }
  };

  var toggleHomepageItems = function() {
    viewport_size = Drupal.get_viewport_size();        
    scroll_top = $(window).scrollTop();

    if (!use_images) {
      homepageItems.each(function() {
        var cover_data = $(this).data();
        var offset = $(this).offset().top - threshold;
        var height = $(this).outerHeight() + threshold * 2;
        var in_view;

        if (offset > scroll_top) {
          // item is either
          // 1. fully in view
          // 2. partially in view (only top is viewed)
          // 3. below the viewport
          in_view = (offset < (scroll_top + viewport_size.height)) ? true : false;
        } else {
          // item is either
          // 1. partially in view (only bottom is viewed)
          // 2. above the viewport
          in_view = ((offset + height) > scroll_top) ? true : false;
        }

        if (in_view) {
          if ($(this).find('iframe.magazine-cover-desktop').length <= 0) {
            $(this).prepend($('<iframe>', {
              src: cover_data.coverUrl + '?homepage=1&title=' + cover_data.titleBase64 + '&subtitle=' + cover_data.subtitleBase64,
              class: 'magazine-cover-desktop ' + cover_data.coverUniqueId
            }));
          }
        } else {
          $(this).find('iframe.magazine-cover-desktop').remove();
        }
      });
    }
  };

  $(window).on('load hniredraw', redrawHomepageItems);
  $(window).on('scroll', toggleHomepageItems);

  Drupal.behaviors.homepageItems = {
    attach: function(context) {
      homepageItems = $('.cover-container.has-cover');
      redrawHomepageItems();

      $.receiveMessage(
        function(e){
          var msg = $.parseJSON(e.data);
          if (msg.status !== undefined) {
            switch (msg.status) {
              case 'ready':
                if (msg.coverId) return;
                // If cover art is ready, a message is sent to the parent
                // In that case the data having title and subtitle is sent to the cover
                msg.coverId = 'hni-boilerplate-simple'
                var cover_url = Drupal.settings.magazines[msg.coverId].cover_url;
                $.postMessage(
                  '{"title": "' + Drupal.settings.magazines[msg.coverId].title + '", "subtitle": "' + Drupal.settings.magazines[msg.coverId].subtitle + '", "domain_path": "' + 'link.html' + '"}',
                  'http://'  + document.location.hostname,
                  $('iframe.' + msg.coverId).get(0).contentWindow
                );
                break;
              case 'redirect':
                window.location = msg.domain_path;
                break;
            }
          }
        }
      );      
    }
  };
}(jQuery));
;
