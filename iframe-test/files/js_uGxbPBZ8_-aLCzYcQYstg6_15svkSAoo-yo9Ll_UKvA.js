//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map;
Drupal.get_viewport_size = function() {
  var e = window, a = 'inner';
  if (!('innerWidth' in window )) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
};

(function ($) {
  Drupal.behaviors.supportClasses = {
    attach: function(context) {
      if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
        $('html').addClass('touch');
      } else {
        $('html').addClass('no-touch');
      }
    }
  };
}(jQuery));

(function($) {
  var current_viewport = Drupal.get_viewport_size();
  $(window).on('resize', function() {
    var new_viewport = Drupal.get_viewport_size();

    if (current_viewport.width != new_viewport.width) {
      $(window).trigger('hniredraw');
      current_viewport = new_viewport;
      return;
    }

    var current_aspect_ratio = current_viewport.width / current_viewport.height;
    var new_aspect_ratio = new_viewport.width / new_viewport.height;

    if ((current_aspect_ratio < 1 && new_aspect_ratio > 1) || (current_aspect_ratio > 1 && new_aspect_ratio < 1)) {
      $(window).trigger('hniredraw');
      current_viewport = new_viewport;
      return;
    }
  });
}(jQuery));;
(function ($) {
  Drupal.behaviors.hniLabelHeight = {
    attach: function(context) {
      $('.hni-label', context).once('hni-label-height', function() {
        $label = $(this);

        var resizeColumns = function() {
          if( Drupal.get_viewport_size().width > 768 ) {

            // $('.label-column.left').css("min-height", $('.label-column.right').height());
            // $('.label-inner').css("min-height", Drupal.get_viewport_size().height);
          } else {
            $label.find('.label-column').height('auto');
          }
        };

        resizeColumns();
        $(window).resize(resizeColumns);
      });
    }
  };

  Drupal.behaviors.hniLabelSectionHeight = {
    attach: function(context) {
      $('.hni-label', context).once('hni-label-section-height', function() {
        $label = $(this);

        var resizeSections = function() {
          $label.css("min-height", Drupal.get_viewport_size().height);
          $('.label-section', $label).removeAttr('style');

          if( Drupal.get_viewport_size().width < 768 ) {
            (function() {
              $('.label-section-small.empty', $label).remove();
              var height_largest_small_section = 0;

              $('.label-section-small', $label).each(function() {
                var $label_section = $(this);
                if( $label_section.outerHeight() > height_largest_small_section ) {
                  height_largest_small_section = $label_section.outerHeight();
                }
              });

              $('.label-section-small', $label).height(height_largest_small_section);

              if(height_largest_small_section > 0 ) {
                $('.label-section-large', $label).height( height_largest_small_section * 3);
              } else {
                // if there are no small sections set large section to half viewport
                $('.label-section-large', $label).height( Drupal.get_viewport_size().height / 2);
              }
            }());
          } else {
            (function() {
              var height_small_section = $label.height() / 6;
              var count_small_sections = 0;

              $('.label-section-small:not(.empty)', $label).each(function() {
                var $label_section = $(this);
                var current_height = $label_section.height();
                var height_count = Math.ceil(current_height / height_small_section);
                height_count = height_count ? height_count : 1;

                $label_section.height(height_small_section * height_count);
                count_small_sections += height_count;
              });

              var target_count_small_sections = (count_small_sections < 6) ? 6 : ((count_small_sections % 2) ? (count_small_sections + 1) : (count_small_sections));
              var required_empty_small_sections = target_count_small_sections - count_small_sections;
              var current_empty_small_sections = $('.label-section-small.empty', $label).length;
              if (required_empty_small_sections > current_empty_small_sections) {
                for (var i = 0; i < (required_empty_small_sections - current_empty_small_sections); i++) {
                  // add sections if there are les then 6 spaces used
                  $('<div />').addClass('label-section').addClass('label-section-small').addClass('empty').appendTo($('.label-column.left .column-inner', $label));
                };
              } else if (required_empty_small_sections < current_empty_small_sections) {
                // remove unnessesery sections if their spece is used up.
                $('.label-section-small.empty', $label).slice(required_empty_small_sections).remove();
              }

              $('.label-section-small.empty', $label).height(height_small_section);

              $('.label-section-large', $label).height(height_small_section * target_count_small_sections / 2);
            }());
          }
        };

        resizeSections();
        $(window).on('load hniredraw', resizeSections);
      });
    }
  };
}(jQuery));;
(function ($) {
  var grid_blocks;

  var grid_ranges = [
    [undefined, 479], // 24
    [480, 767], // 24
    [768, 1023], // 36
    [1024, 1199], // 48
    [1200, undefined] // ?
  ];

  var current_range = undefined;

  var window_width;
  var grid_height;

  var run_grid = function() {
    window_width = Drupal.get_viewport_size().width;

    var new_range;
    for (var i = 0; i < grid_ranges.length; i++) {
      if ((grid_ranges[i][0] === undefined) || (grid_ranges[i][0] <= window_width)) {
        if ((grid_ranges[i][1] === undefined) || (grid_ranges[i][1] >= window_width)) {
          new_range = i;
          break;
        }
      }
    };

    if (new_range !== undefined) {
      if (new_range !== current_range) {
        current_range = new_range;
        run_grid_range_change();
      } else {
        current_range = new_range;
      }
    }

    if (grid_blocks !== undefined) {

      var grid_count = 24;
      if (window_width >= 768) {
        grid_count = 36;
      }
      if (window_width >= 1024) {
        grid_count = 48;
      }

      grid_height = $('#page-wrapper').width() / grid_count;
      run_grid_based_content();

      grid_blocks.each(function() {
        var $block = $(this);
        var data = $block.data();
        $.each(data, function(key, value) {
          if (value === 'undefined') {
            $block.css(key, '');
          } else {
            // Calculate and assign CSS value based on it's value and height of vertical block
            $block.css(key, (grid_height * value) + 'px');
          }
        });
      });

      $('.dotdotdot').each(function() {
        var $this = $(this);

        if ($this.data('dotdotdot')) {
          $this.trigger('update.dot');
        } else {
          $this.dotdotdot();
        }
      });
    }
  };

  var run_grid_range_change = function() {
    // magazine homepage item
    if (current_range == 4) { // large desktop
      $('.agenda-event .time-date-wrapper').addClass('dotdotdot').data({minHeight: 0, height: 2});
      $('.agenda-event .eventtitle').addClass('dotdotdot').data({minHeight: 0, height: 2.5});
      $('.magazine-event .eventtitle').addClass('dotdotdot').data({minHeight: 0, height: 2.5});
    }

    if (current_range > 1) { // tablet or desktop
      $('.magazine-homepage-item').addClass('hni-grid').data({height: 4});
      $('.magazine-homepage-item').removeData( "marginBottom" );
      $('.container-magazine-homepage-item').addClass('hni-grid').data({height: 4});
      $('.events-next-list').addClass('hni-grid').data({minHeight: 21});
      $('.page-section-news-overview .elenco-section, .page-section-news-overview .body').data({height: 16});
      $('.node-teaser .eventtitle').data({minHeight: 0, height: 3});
      $('.node-teaser .date-loc-wrapper, .node-event.node-teaser .event-arrow').data({minHeight: 0, height: 2});
      $('.node-teaser .header-wrapper').data({minHeight: 0, height: 6});
      $('.themes-wrapper .titles').addClass('hni-grid').data({minHeight: 3});
      $('.programme-tracks .titles').addClass('hni-grid').data({minHeight: 0, marginBottom: 1});
      $('.programme-tracks h1').addClass('hni-grid').data({minHeight: 0, marginBottom: 1, marginTop: 1});
      $('.corporate-magazine-page h1, .corporate-magazine-front h1').addClass('hni-grid').data({minHeight: 0, marginBottom: 1, marginTop: 1});
      $('.homepage-announcement-wrapper').removeData( "height" );
      $('.homepage-announcement-wrapper .h3').addClass('hni-grid').data({height: 2});
      $('.programme-tracks .agenda-magazine-cover-image-link').data({minHeight: 0, height: 14});
    } else { // mobile
      $('.programme-tracks .agenda-magazine-cover-image-link').removeData( "height" ).css('height', 'auto');
      $('.magazine-homepage-item.right-left').data({marginBottom: 1});
      $('.events-next-list').data({minHeight: 0});
      $('.page-section-news-overview .elenco-section, .page-section-news-overview .body').data({height: 16});
      $('.node-teaser .eventtitle').data({minHeight: 2}).css({height: 'auto'});
      $('.node-teaser .date-loc-wrapper, .node-event.node-teaser .event-arrow').data({minHeight: 2}).css({height: 'auto'});
      $('.node-teaser .header-wrapper').data({minHeight: 5}).css({height: 'auto'});
      $('.themes-wrapper .titles').addClass('hni-grid').data({minHeight: 3});
      $('.programme-tracks .titles').addClass('hni-grid').data({minHeight: 0, marginBottom: 1});
      $('.programme-tracks h1').addClass('hni-grid').data({minHeight: 0, marginBottom: 1, marginTop: 1});
      $('.corporate-magazine-page h1, .corporate-magazine-front h1').addClass('hni-grid').data({minHeight: 0, marginBottom: 1, marginTop: 1});
      $('.homepage-announcement-wrapper').removeData( "height" );
      $('.homepage-announcement-wrapper .h3').addClass('hni-grid').data({height: 3});

      if (current_range > 0) { // >= 480
        $('.magazine-homepage-item.left-left').addClass('hni-grid').data({minHeight: 2});
        $('.magazine-homepage-item.left-right').addClass('hni-grid').data({height: 1});
        $('.magazine-homepage-item.right-left').addClass('hni-grid').data({height: 4});
        $('.magazine-homepage-item.right-right').addClass('hni-grid').data({height: 1});
        $('.container-magazine-homepage-item').addClass('hni-grid').data({height: 4});
        $('.programme-tracks .agenda-magazine-cover-image-link').data({minHeight: 0, height: 14});
      } else { // < 480
        $('.magazine-homepage-item.left-left').addClass('hni-grid').data({minHeight: 2});
        $('.magazine-homepage-item.left-right').addClass('hni-grid').data({height: 2});
        $('.magazine-homepage-item.right-left').addClass('hni-grid').data({height: 6});
        $('.magazine-homepage-item.right-right').addClass('hni-grid').data({height: 2});
        $('.container-magazine-homepage-item').addClass('hni-grid').data({height: 6});
      }

      $('.magazine-homepage-item.left-left').removeData( "height" ).css('height', 'auto').addClass('hni-grid').data({marginBottom: 1});
    }
    if (Drupal.get_viewport_size().width > 1200) {
      $('.programme-tracks .agenda-magazine-cover-image-link').data({minHeight: 0, height: 12});
    }
    grid_blocks = $('body .hni-grid');
  };

  var set_amount_grid_blocks = function($element) {
    $element.css('height', 'auto');
    element_height = Math.ceil($element.height() / grid_height);

    return element_height;
  };

  var run_grid_based_content = function() {
    $('.event-full .title').data('height', set_amount_grid_blocks($('.event-full .title')));
    $('.event-full .subtitle').data('height', set_amount_grid_blocks($('.event-full .subtitle')));

    grid_blocks = $('body .hni-grid');
  };

  Drupal.behaviors.hniGrid = {
    attach: function(context) {

      // Set GRID class and data attributes on elements that don't have templates
      $('#content h1, #content .h1, #content h2, #content .h2, #content p, #content ul, #content ol, #content blockquote, .block-menu-block, div.messages, .slider-inline, .partner-item, .partners .hni-item, .field-name-iframe-caption').addClass('hni-grid').attr('data-margin-bottom', 1);
      $('.domain-hni div.messages').addClass('hni-grid').attr('data-margin-top', 1);
      $('.domain-hni .page-header').addClass('hni-grid').attr('data-margin-top', 1)
      $('.slider-full-width, .slider-inline').addClass('hni-grid').attr('data-margin-top', 3);
      $('#main-wrapper #block-locale-language').addClass('hni-grid').attr('data-top', 1);
      $('.field-item-page-section-text, .elenco-section-item .button').addClass('hni-grid').attr('data-margin-top',1).attr('data-margin-bottom',1);
      $('.field-item-page-section-text, .homepage .event-inner-wrapper').addClass('hni-grid').attr('data-padding-bottom',1);
      $('#name-and-slogan #block-locale-language').addClass('hni-grid').attr('data-bottom', 1);
      $('.page-section-media, .homepage-announcements').addClass('hni-grid').attr('data-margin-bottom', 1);
      $('.magazine-homepage-item p, .magazine-homepage-item h2, .elenco-header h1, .elenco-header .h4, .elenco-section-title, .elenco.item h4, .elenco.item h5').removeClass('hni-grid');
      $('.homepage .event-inner h2').attr('data-margin-bottom', 0);
      $('#user-login .form-item, #newsletter-form .form-item, .webform-client-form .form-item, .webform-client-form .form-actions').addClass('hni-grid').attr('data-padding-bottom', 0.5);
      $('#newsletter-form .form-actions').addClass('hni-grid').attr('data-margin-bottom', 2);
      $('.webform-client-form .description').addClass('hni-grid').attr('data-padding-top', 0.5);
      $('.page-section-elenco .field-name-excerpt h2').addClass('fullwidth h5 elenco item surtitle').attr('data-margin-bottom', 0);
      $('.page-section-elenco .field-name-excerpt h3').addClass('h4 elenco item maintitle').attr('data-margin-bottom', 1);
      $('.page-section-elenco .field-name-excerpt p').addClass('h4 hni-grid').attr('data-margin-top', 1);;
      $('.page-section-excerpt').addClass('hni-grid').attr('data-padding-top', 1);
      $('.page-section-excerpt .button-wrapper').removeClass('hni-grid').attr('data-margin-bottom', 0);
      $('.page-section-image-grid .field-name-images .field-item').addClass('hni-grid').attr('data-padding-bottom', 1);
      $('.elenco-section').data({paddingTop: 1});
      $('.page-section-news-overview .elenco-section').data({paddingTop: 0});
      $('.elenco-section.first').data({paddingTop: 0});
      $('.elenco-section-item p').data({marginBottom: 0});
      $('.event-group-current').attr('data-padding-bottom',0);
      $('.page-section-image .field-item').addClass('hni-grid').attr('data-margin-bottom', 1);
      $('.page-section-image-slider').addClass('hni-grid').attr('data-margin-bottom', 1).attr('data-margin-top', 1);
      $('#block-corporate-main-menu .menu').addClass('hni-grid').attr('data-padding-top', 1).attr('data-padding-bottom', 1);
      $('.page-section-image-slider, .themes-wrapper  .agenda-magazine-cover-image-link').addClass('hni-grid').attr('data-margin-bottom', 1).attr('data-margin-top', 1);
      $('.programme-tracks .agenda-magazine-cover-image-link').addClass('hni-grid').attr('data-padding-bottom', 1).attr('data-padding-top', 1);
      $('.programme-tracks .item.text').addClass('hni-grid').attr('data-margin-bottom', 1);
      $('#block-corporate-main-menu li').addClass('hni-grid').attr('data-padding-bottom', 1);
      $('.hni-header .region').addClass('hni-grid').attr('data-padding-top', 1);
      $('.hni-header #block-corporate-social, .hni-header .block-search, .hni-header .border, .hni-header .block-locale').addClass('hni-grid').attr('data-bottom', 1);
      $('ul.tabs').attr('data-padding-top', 0.5);
      $('.events-next, .theme h2').attr('data-margin-top', '1');
      $('#search-form').addClass('hni-grid').attr('data-margin-bottom', 1).attr('data-padding-top', 1);
      $('.page-section-image-gallery form, .theme>h1').addClass('hni-grid').attr('data-margin-bottom', 2).attr('data-margin-top', 1);
      $('.page-section-image-gallery .form-item').addClass('hni-grid').attr('data-margin-bottom', 0.5);
      $('#user-login').addClass('hni-grid').attr('data-margin-bottom', 2);
      $('.homepage-announcement-wrapper').first().attr('data-margin-right', 1);
      $('.homepage-announcement-wrapper .h3, .elenco-section .maintitle.h4').addClass('hni-grid').attr('data-margin-bottom', 1);
      $('.field-name-iframe-caption').addClass('hni-grid').attr('data-padding-top', 0.5);
      $('.sponsor-list').removeClass('hni-grid');
      $('.elenco-section .related-magazine-title.h4').addClass('hni-grid').attr('data-margin-bottom', 0.5);
      grid_blocks = $('body .hni-grid');
      run_grid();
    }
  };

  $(window).bind('load resize', run_grid);
}(jQuery));
;
(function ($) {
  Drupal.behaviors.coverPosition = {
    attach: function(context) {
      setItemHeight();

      $(window).on('load hniredraw', function() {
        setItemHeight();
      });
      $(window).on('resize', function() {
        setItemHeight(true);
      });

      // iPad, iPhone and iPod fix for search
      //if(navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPod/i) != null || navigator.userAgent.match(/iPhone/i) != null){
        (function() {
          var currentTop = 0, 
              scrollActive = false, 
              setTop;

          $(window).on('scroll', function() {
            currentTop = $(window).scrollTop();
            if (scrollActive) {
              $('#search-block-form input[type="text"]').blur();
              scrollActive = false;
            }
          });

          $('#search-block-form input[type="text"]').on('focus', function() {
            var viewport = Drupal.get_viewport_size();
            if (viewport.width < 1024) {
              setTop = currentTop;
              setTimeout(function (){
                scrollActive = true;
              }, 1000);
            }
          });

          $('#search-block-form input[type="text"]').focusout(function() {
            $(window).scrollTop(setTop, 0);
          });
        })();
      //}

      // scrolled down on magazine cover
      $('.corporate-magazine-front, .domain-magazine.front', context).once('hni-magazine-cover', function() {
        $this = $(this);

        if ($(window).scrollTop() > 0) {
          $this.find('#page-wrapper').addClass('scrolled-down');
          $this.find('.hidden-menu').removeClass('hidden-menu');
        } else {
          $this.find('#page-wrapper').addClass('hide-scrolled-bg');
          $this.find('.hni-header .section, .breadcrumb-wrapper').removeClass('show-scrolled');
        }

        $(window).on('scroll', function() {
          if ($(this).scrollTop() > 0 ) {
            $this.find('#page-wrapper').removeClass('hide-scrolled-bg');
            $this.find('.hni-header:not(.expanded) .hidden-menu').addClass('show-scrolled');
            $this.find('.hni-header .section').addClass('show-scrolled');
            $this.find('.breadcrumb-wrapper').fadeIn(600);
            window.setTimeout(function() {
              $this.find('#page-wrapper').addClass('scrolled-down');
            }, 10);
          } else {
            $this.find('#page-wrapper').removeClass('scrolled-down')
            $this.find('.hni-header:not(.expanded) .section').removeClass('show-scrolled')
            $this.find('.breadcrumb-wrapper').fadeOut(600);
            window.setTimeout(function() {
              if(!$this.find('#page-wrapper').hasClass('scrolled-down')) {
                $this.find('#page-wrapper').addClass('hide-scrolled-bg');
              }
            }, 750);
          }
        });
      });

      // scrolled down on magazine cover (from HNI corporate home)
      $('.magazine-scrolled.corporate-magazine-front,.magazine-scrolled.domain-magazine.front', context).once('hni-magazine-cover-scroll', function() {
        $(window).load(function(){
          if ($(window).scrollTop() <= $('#page').offset().top) {
            $('html, body').animate({
              scrollTop: $('#page').offset().top
            }, 2000);
          }
        });
      });

      $('html, body').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', function(e){
        if ( e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel') {
          $('html, body').stop();
        }
      });

      function setItemHeight(only_magazine) {
        if (only_magazine) {
          $('.domain-magazine .cover-container, .domain-magazine .cover-container has-cover').height(Drupal.get_viewport_size().height);
        } else {
          $('.cover-container, .cover-container has-cover, .homepage-announcement-wrapper').height(Drupal.get_viewport_size().height);

          if( Drupal.get_viewport_size().width >= 768 ) {
            grid_count = 36;
            if (Drupal.get_viewport_size().width >= 1024) {
              grid_count = 48;
            }

            var grid_height = $('#page-wrapper').width() / grid_count;

            $('.homepage .event-wrapper').height(Drupal.get_viewport_size().height);
            $('.homepage .event-wrapper .event-image').css('max-height', $('.homepage .event-inner.right').height());
            $('.homepage .event-inner.left').css('padding-right', '' + grid_height + 'px');
            $('.homepage .event-inner.right').css('padding-left', '' + grid_height + 'px');
          } else {
            $('.homepage .event-wrapper').css('height', 'auto');
            $('.homepage .event-wrapper .event-image').css('max-height', 'none');
            $('.homepage .event-inner.left').css('padding-right', 0);
            $('.homepage .event-inner.right').css('padding-left', 0);
          }
        }
      }
    }
  };
}(jQuery));;
(function ($) {

  // Helper function to generate a unique identifier for sections and items.
  // These identifiers are called guid all over the code and are only used
  // internally, so they are never exposed to the DOM or the user.
  var generateGuid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  };

  // Returns the sum of all items in an array
  // Because Array.prototype.reduce is not available in all browsers and summing
  // arrays is a pretty common operation in Elenco (mostly for calculation sums
  // of heights), we created a helper function to do this.
  var sumArray = function(arr) {
    var result = 0;

    for (var i = 0; i < arr.length; i++) {
      result += arr[i];
    }

    return result;
  };

  // Figure out the current distribution of sections and items over the columns.
  // This returns an array of columns. Every column is an array of sections.
  // Every section is an object with several properties. `guid` contains the
  // unique identifier of the section and `height` the total height of the
  // section, including the header. `items` contains a list of items. `splitted`
  // is either true or false. If it is true, then this should be the last item
  // in the column and the next column should start with a section with the
  // same `guid` and also `splitted` = true. The items array contains the only
  // the items that are in the current part of the section. The `height`
  // property of the first splitted section contains the header and the items in
  // the first column, for the section splitted section it only contains the
  // items in the second column. Every item is an object with a `guid` and a
  // `height` property.
  var getCurrentState = function($page_section) {
    var currentState = [];

    // keep a variable to know whether we are in a splitted section or not
    var splitted_guid;

    // loop over the columns
    $('.field-name-elenco-sections', $page_section).each(function () {
      var $column = $(this);
      var column = [];

      // loop over the sections
      $('.elenco-section', $column).each(function() {
        var $section = $(this);

        // this variable will contain the guid of the section
        var guid;

        // if a section is splitted, it has the .elenco-section-splitted class
        var splitted = $section.hasClass('elenco-section-splitted');

        if (splitted) {
          if (splitted_guid === undefined) {
            // if the section is splitted and we are currently not in a splitted
            // section for the previous column

            // generate a new guid
            guid = generateGuid();
            // and mark that we entered a splitted section
            splitted_guid = guid;
          } else {
            // if the section is splitted and we are currenlty in a splitted
            // section, then take over the guid for the previous column
            guid = splitted_guid;
          }
        } else {
          // if the section is not splitted

          // generate a new guid
          guid = generateGuid();
          // and mark that
          splitted_guid = undefined;
        }

        var items = [];

        // loop over the items
        $('.elenco-section-item', $section).each(function() {
          var $item = $(this);

          // add the items to the items array
          items.push({
            guid: generateGuid(),
            height: $item.height()
          });
        });

        // add the section to the column
        column.push({
          guid: guid,
          splitted: splitted,
          height: $section.height(),
          items: items
        });
      });

      // add the column to the state
      currentState.push(column);
    });

    return currentState;
  };

  // This function merges the columns to essentially one column (see
  // `getCurrentState` for how a column is constructed) without splitted
  // sections.
  var flattenState = function(currentState) {
    // clone the current state
    currentState = $.extend(true, [], currentState);

    var flatState = [];

    // keep if we currently are in a splitted section
    var splitted = false;

    // loop over the columns
    $.each(currentState, function(i, column) {
      // loop over the sections
      $.each(column, function(j, section) {
        if (section.splitted) {
          if (splitted) {
            // if the section is splitted and the previous section was splitted
            // too

            // loop over the items
            $.each(section.items, function(k, item) {
              // push the item in the previous section
              flatState[flatState.length-1].items.push(item);
              // update the height of the previous section
              flatState[flatState.length-1].height += item.height;
            });
          } else {
            // if the section is spliited and the previous section was not
            // splitted

            // mark this section as not splitted
            section.splitted = false;

            // push the section into the state
            flatState.push(section);

            // mark that this section was splitted, so the next splitted section
            // will get in the first half of this if/else construct.
            splitted = true;
          }
        } else {
          // if this section is not splitted

          // push the section into the state
          flatState.push(section);

          // mark that this section was not splitted
          splitted = false;
        }
      });
    });

    return flatState;
  };

  // This function determines how the sections and items should be distrubuted
  // over the columns, given the flattened state and the amount of columns we
  // want (in this case always 2)
  var determineDesiredState = function(flatState, columns) {
    var desiredState = [];

    // clone the flattened state, so we can shift sections out
    var sectionsLeft = $.extend(true, [], flatState);

    // calculate the total height of all sections
    var total = sumArray($.map(flatState, function(section) {
      return section.height;
    }));

    // calculate the average column length
    var column_cap = total / columns;

    // some variables that are required in the following loops
    var column, column_height, section, items_total, item;

    // loop over the columns
    for (var i = 0; i < columns; i++) {
      // construct an empty column
      column = [];
      column_height = 0;

      while (
        // if we have any sections available
        sectionsLeft.length > 0
        &&
        (
          // we're on the last column
          (i == (columns - 1))
          ||

          // We want to add the full section
          (
            // We want to add the full section if adding the section to this
            // column would make the difference between this column's height
            // and the next columns average height smaller or if it stays the
            // same
            Math.abs(
              // current column height with this section added
              (column_height + sectionsLeft[0].height)
              -
              // next columns average with this section added to this column
              (
                sumArray($.map(sectionsLeft.slice(1), function(section) {
                  return section.height;
                })) / (columns - 1 - i)
              )
            )
            <=
            Math.abs(
              column_height
              -
              // next columns average without this section added to this column
              (
                sumArray($.map(sectionsLeft, function(section) {
                  return section.height;
                })) / (columns - 1 - i)
              )
            )
          )
          ||
          // We want to add the section splitted
          (
            // we have at least two items
            sectionsLeft[0].items.length > 1
            &&
            // adding this full section would exceed the column cap
            (column_height + sectionsLeft[0].height) > column_cap
            &&
            // adding this section with only the first item would make the
            // difference between this column and the next columns average
            // smaller
            (
              Math.abs(
                // current column with this section with only its first item
                // added
                (
                  // current column height
                  column_height +
                  // full section height
                  sectionsLeft[0].height -
                  // total item height for all but the first item
                  sumArray(
                    $.map(sectionsLeft[0].items.slice(1), function(item) {
                      return item.height;
                    })
                  )
                )
                -
                // next columns average with this section with only the first
                // item added to this column
                (
                  (
                    // total item height for all but the first item
                    sumArray(
                      $.map(sectionsLeft[0].items.slice(1), function(item) {
                        return item.height;
                      })
                    ) +
                    // total height of all next sections
                    sumArray(
                      $.map(sectionsLeft.slice(1), function(section) {
                        return section.height;
                      })
                    )
                  ) / (columns - 1 - i)
                )
              )
              <=
              Math.abs(
                // current column height (without anything added)
                column_height
                -
                // next columns average without this section added to this
                // column
                (
                  sumArray($.map(sectionsLeft, function(section) {
                    return section.height;
                  })) / (columns - 1 - i)
                )
              )
            )
            &&
            // adding this section with all items except the last would make the
            // difference between this column and the next columns average
            // smaller then adding the full section
            (
              Math.abs(
                // current column with this section with all but the last item
                // added
                (
                  // current column height
                  column_height +
                  // full section height
                  sectionsLeft[0].height -
                  // the height of the last item
                  sumArray(
                    $.map(sectionsLeft[0].items.slice(-1), function(item) {
                      return item.height;
                    })
                  )
                )
                -
                // next columns average with this section with all but the last
                // item added to this column
                (
                  (
                    // height of the last item
                    sumArray(
                      $.map(sectionsLeft[0].items.slice(-1), function(item) {
                        return item.height;
                      })
                    ) +
                    // total height of all next sections
                    sumArray(
                      $.map(sectionsLeft.slice(1), function(section) {
                        return section.height;
                      })
                    )
                  ) / (columns - 1 - i)
                )
              ) <
              Math.abs(
                // current column with this section added
                (
                  // current column height
                  column_height +
                  // full section height
                  sectionsLeft[0].height
                )
                -
                // next columns average with this section added to this column
                (
                  sumArray(
                    $.map(sectionsLeft.slice(1), function(section) {
                      return section.height;
                    })
                  ) / (columns - 1 - i)
                )
              )
            )
          )
        )
      ) { // of sections while condition

        // figure out if we should split
        if (
          // we're not in the last column
          (i < columns - 1)
          &&
          // we have at least two items
          sectionsLeft[0].items.length > 1
          &&
          // adding this full section would exceed the column cap
          (column_height + sectionsLeft[0].height) > column_cap
          &&
          // adding this section with only the first item would make the
          // difference between this column and the next columns average
          // smaller
          (
            Math.abs(
              // current column with this section with only its first item added
              (
                // current column height
                column_height +
                // full section height
                sectionsLeft[0].height -
                // total item height for all but the first item
                sumArray(
                  $.map(sectionsLeft[0].items.slice(1), function(item) {
                    return item.height;
                  })
                )
              )
              -
              // next columns average with this section with only the first
              // item added to this column
              (
                (
                  // total item height for all but the first item
                  sumArray(
                    $.map(sectionsLeft[0].items.slice(1), function(item) {
                      return item.height;
                    })
                  ) +
                  // total height of all next sections
                  sumArray(
                    $.map(sectionsLeft.slice(1), function(section) {
                      return section.height;
                    })
                  )
                ) / (columns - 1 - i)
              )
            )
            <=
            Math.abs(
              // current column height (without anything added)
              column_height
              -
              // next columns average without this section added to this
              // column
              (
                sumArray($.map(sectionsLeft, function(section) {
                  return section.height;
                })) / (columns - 1 - i)
              )
            )
          )
          &&
          // adding this section with all items except the last would make the
          // difference between this column and the next columns average
          // smaller then adding the full section
          (
            Math.abs(
              // current column with this section with all but the last item
              // added
              (
                // current column height
                column_height +
                // full section height
                sectionsLeft[0].height -
                // the height of the last item
                sumArray(
                  $.map(sectionsLeft[0].items.slice(-1), function(item) {
                    return item.height;
                  })
                )
              )
              -
              // next columns average with this section with all but the last
              // item added to this column
              (
                (
                  // height of the last item
                  sumArray(
                    $.map(sectionsLeft[0].items.slice(-1), function(item) {
                      return item.height;
                    })
                  ) +
                  // total height of all next sections
                  sumArray(
                    $.map(sectionsLeft.slice(1), function(section) {
                      return section.height;
                    })
                  )
                ) / (columns - 1 - i)
              )
            ) <
            Math.abs(
              // current column with this section added
              (
                // current column height
                column_height +
                // full section height
                sectionsLeft[0].height
              )
              -
              // next columns average with this section added to this column
              (
                sumArray(
                  $.map(sectionsLeft.slice(1), function(section) {
                    return section.height;
                  })
                ) / (columns - 1 - i)
              )
            )
          )
        ) { // end of splitting condition

          // total height of the items in the section
          items_total = sumArray(
            $.map(sectionsLeft[0].items, function(item) {
              return item.height;
            })
          );

          // create an empty section
          section = {
            guid: sectionsLeft[0].guid,
            // the header height (section height without the items)
            height: sectionsLeft[0].height - items_total,
            items: [],
            // mark as a splitted section
            splitted: true,
          };

          // also mark the left section as splitted
          sectionsLeft[0].splitted = true;
          // the left section has no header, so the height is just the items
          sectionsLeft[0].height = items_total;

          // add the section height (just the header at this point) to the
          // column height
          column_height += section.height;

          // add the first item from the section into the new section
          item = sectionsLeft[0].items.shift();
          section.items.push(item);

          // update the section height and the column height with the height of
          // the added item
          section.height += item.height;
          column_height += item.height;

          // substract the item height from the left section height
          sectionsLeft[0].height -= item.height;

          // try to add more items to the new section
          while (
            // if we have any items to add left
            sectionsLeft[0].items.length > 0
            &&
            // adding this item would make the difference between this column
            // and the next columns average smaller
            (
              Math.abs(
                // current column with this section added
                (
                  // current column height
                  column_height
                  +
                  // item height
                  sectionsLeft[0].items[0].height
                )
                -
                // next columns average with this item added to this column
                (
                  (
                    // the total height of the next items
                    sumArray(
                      $.map(sectionsLeft[0].items.slice(1), function(item) {
                        return item.height;
                      })
                    ) +
                    // the total height of the next sections
                    sumArray(
                      $.map(sectionsLeft.slice(1), function(section) {
                        return section.height;
                      })
                    )
                  ) / (columns - 1 - i)
                )
              )
              <
              Math.abs(
                // current column height (with nothing added)
                column_height
                -
                // next columns average without the rest of this section added
                // to this column
                (
                  sumArray($.map(sectionsLeft, function(section) {
                    return section.height;
                  })) / (columns - 1 - i)
                )
              )
            )
          ) { // end of items while condition

            // add the first item from the section into the new section
            item = sectionsLeft[0].items.shift();
            section.items.push(item);

            // update the section height and the column height with the height
            // of the added item
            section.height += item.height;
            column_height += item.height;

            // substract the item height from the left section height
            sectionsLeft[0].height -= item.height;
          }

          // push the newly created section into the current column
          column.push(section);
        } else { // else for the splitted condition
          // We add the full section to the column

          // Get the section from the sectionsLeft array
          section = sectionsLeft.shift();
          // update the column height
          column_height += section.height;
          // push the section into the current column
          column.push(section);
        }
      }

      // push the column in the desired state
      desiredState.push(column);
    };

    return desiredState;
  };

  // Figure out which DOM operations we should do to get from the currentState
  // to the desiredState. The return value is an array of operations. Every
  // operation is an object with a `method` property. All other properties are
  // optional and can be method specific, although currently all operation
  // methods use a `from` and a `to` property, which both are integers and
  // interpreted as zero-indexed column indexes.
  var figureOutOperations = function(currentState, desiredState) {
    var operations = [];

    // clone the current state, so we can alter it until we reached the desired
    // state
    var newCurrentState = $.extend(true, [], currentState);

    // some variables that are required in the following loops
    var desiredFirstGuid, desiredLastGuid,
        desiredFirstItemGuid, desiredLastItemGuid,
        i, section, item;

    // loop over the columns
    for (i = 0; i < newCurrentState.length; i++) {
      // find out what the guid of the first section in this column should be
      desiredFirstGuid = (
        (desiredState[i].length > 0) ?
        desiredState[i][0].guid :
        undefined
      );
      // find out what the guid of the last section in this column should be
      desiredLastGuid = (
        (desiredState[i].length > 0) ?
        desiredState[i][desiredState[i].length - 1].guid :
        undefined
      );
      // find out what the guid of the first item in this column should be
      desiredFirstItemGuid = (
        (desiredState[i].length > 0 && desiredState[i][0].items.length > 0) ?
        desiredState[i][0].items[0].guid :
        undefined
      );
      // find out what the guid of the last item in this column should be
      desiredLastItemGuid = (
        (
          desiredState[i].length > 0 &&
          desiredState[i][desiredState[i].length - 1].items.length > 0
        ) ?
        desiredState[i][desiredState[i].length - 1].items[
          desiredState[i][desiredState[i].length - 1].items.length - 1
        ].guid :
        undefined
      );

      // if we are not in the first column
      if (i > 0) {
        // while the first section in this column has not the desired guid
        while (
          // if there is a section in this column
          newCurrentState[i].length > 0
          &&
          // the first section's guid is not the desired first guid
          newCurrentState[i][0].guid != desiredFirstGuid
        ) {
          // shift the section out
          section = newCurrentState[i].shift();

          // if this section is a splitted section
          if (section.splitted) {
            // push all the items from the section into the last section of
            // the previous column
            while(section.items.length > 0) {
              item = section.items.shift();
              newCurrentState[i-1][
                newCurrentState[i-1].length - 1
              ].items.push(item);
            }
            // mark the last section of the previous column as not splitted
            newCurrentState[i-1][
              newCurrentState[i-1].length - 1
            ].splitted = false;

            // schedule a DOM operation to do the same
            operations.push({
              method: 'mergeFirstToLast',
              from: i,
              to: i-1
            });
          } else { // else of the splitted condition
            // push the section as the last item of the previous column
            newCurrentState[i-1].push(section);

            // schedule a DOM operation to do the same
            operations.push({
              method: 'moveFirstToLast',
              from: i,
              to: i-1
            });
          }
        }

        // if we reached the desired first section, but it should be splitted
        if (
          // if we have a first section
          newCurrentState[i][0] !== undefined
          &&
          // if this first section is the desired first section
          newCurrentState[i][0].guid == desiredFirstGuid
          &&
          // the first section should be splitted
          desiredState[i][0].splitted
        ) {
          // if we get here, the column before us already handled their stuff,
          // so we should not need to push items from the previous column to
          // ours, but we might we need to push items back

          // if the section is currently not splitted
          if (!newCurrentState[i][0].splitted) {
            // create a splitted section in the previous column
            newCurrentState[i-1].push({
              guid: newCurrentState[i][0].guid,
              items: [],
              splitted: true
            });
            // mark the section as splitted
            newCurrentState[i][0].splitted = true;

            // schedule a DOM operation to do the same
            operations.push({
              method: 'splitFirstToLast',
              from: i,
              to: i-1
            });
          }

          // while the first item in this column has not the desired guid
          while (
            // if there are items in the first section of this column
            newCurrentState[i][0].items.length > 0
            &&
            // if the first item in the first section of this column has not
            // the desired guid
            newCurrentState[i][0].items[0].guid != desiredFirstItemGuid
          ) {
            // shift the item out
            item = newCurrentState[i][0].items.shift();

            // push the item into the last section of the previous column
            newCurrentState[i-1][
              newCurrentState[i-1].length - 1
            ].items.push(item);

            // schedule a DOM operation to do the same
            operations.push({
              method: 'moveItemFirstToLast',
              from: i,
              to: i-1
            });
          }

        }
      }

      // if a are not in the last column
      if (i < (newCurrentState.length - 1)) {
        // while the last section in this column has not the desired guid
        while (
          // if we have sections
          newCurrentState[i].length > 0
          &&
          // if the last section has not the desired guid
          newCurrentState[i][
            newCurrentState[i].length - 1
          ].guid != desiredLastGuid
        ) {
          // pop the section out
          section = newCurrentState[i].pop();

          // if the section is splitted
          if (section.splitted) {
            // push all the items from the section into the first section of
            // the next column
            while(section.items.length > 0) {
              item = section.items.pop();
              newCurrentState[i+1][0].items.unshift(item);
            }
            // mark the first section of the next column as not splitted
            newCurrentState[i+1][0].splitted = false;

            // schedule a DOM operation to do the same
            operations.push({
              method: 'mergeLastToFirst',
              from: i,
              to: i+1
            });
          } else { // else of the splitted condition
            // push the section as first of the next column
            newCurrentState[i+1].unshift(section);

            // schedule a DOM operation to do the same
            operations.push({
              method: 'moveLastToFirst',
              from: i,
              to: i+1
            });
          }
        }

        // if we reached the desired last section, but it should be splitted
        if (
          // if we have sections
          newCurrentState[i].length > 0
          &&
          // if the last section has the desired guid
          newCurrentState[i][
            newCurrentState[i].length - 1
          ].guid == desiredLastGuid
          &&
          // if the last section should be splitted
          desiredState[i][desiredState[i].length - 1].splitted
        ) {
          // if the section is currently not splitted
          if (!newCurrentState[i][newCurrentState[i].length - 1].splitted) {
            // create a splitted section in the next column
            newCurrentState[i+1].unshift({
              guid: newCurrentState[i][newCurrentState[i].length - 1].guid,
              items: [],
              splitted: true
            });
            // mark the section as splitted
            newCurrentState[i][newCurrentState[i].length - 1].splitted = true;

            // schedule a DOM operation to do the same
            operations.push({
              method: 'splitLastToFirst',
              from: i,
              to: i+1
            });
          }

          // while the first item in this column has not the desired guid
          while (
            // if we have items in the last section of the column
            newCurrentState[i][newCurrentState[i].length - 1].items.length > 0
            &&
            // if the last item in the last section has not the desired guid
            newCurrentState[i][newCurrentState[i].length - 1].items[
              newCurrentState[i][newCurrentState[i].length - 1].items.length - 1
            ].guid != desiredLastItemGuid
          ) {
            // pop the item out
            item = newCurrentState[i][
              newCurrentState[i].length - 1
            ].items.pop();
            // push the item into the first section of the next column
            newCurrentState[i+1][0].items.unshift(item);

            // schedule a DOM operation to do the same
            operations.push({
              method: 'moveItemLastToFirst',
              from: i,
              to: i+1
            });
          }
        }
      }
    }

    return operations;
  };

  // This object contains the available DOM operations
  var elencoOperations = {
    // Move a section at the beginning of a column to the end of another column
    moveFirstToLast: function(operation, $page_section) {
      // target the section
      var section =
        // the column where the section comes from
        $('.field-name-elenco-sections', $page_section).eq(operation.from)
        // the first section
        .find('.elenco-section').first();

      // detach section from DOM
      section.detach();

      // the column where the section should go to
      $('.field-name-elenco-sections', $page_section).eq(operation.to)
        // append the section
        .append(section);
    },

    // Move a section at the end of a column to the beginning of another column
    moveLastToFirst: function(operation, $page_section) {
      // target the section
      var section =
        // the column where the section comes from
        $('.field-name-elenco-sections', $page_section).eq(operation.from)
        // the last section
        .find('.elenco-section').last();

      // detach section from DOM
      section.detach();

      // the column where the section should go to
      $('.field-name-elenco-sections', $page_section).eq(operation.to)
        // prepend the section
        .prepend(section);
    },

    // Move an item at the beginning of a column to the end of another column
    moveItemFirstToLast: function(operation, $page_section) {
      // target the item
      var item =
        // the column where the item comes from
        $('.field-name-elenco-sections', $page_section).eq(operation.from)
        // the first section
        .find('.elenco-section').first()
        // the first item
        .find('.elenco-section-item').first();

      // detach item from DOM
      item.detach();

      // the column where the item should go to
      $('.field-name-elenco-sections', $page_section).eq(operation.to)
        // the last section
        .find('.elenco-section').last()
        // append the item
        .append(item);
    },

    // Move an item at the end of a column to the beginning of another column
    moveItemLastToFirst: function(operation, $page_section) {
      // target the item
      var item =
        // the column where the item comes from
        $('.field-name-elenco-sections', $page_section).eq(operation.from)
        // the last section
        .find('.elenco-section').last()
        // the last item
        .find('.elenco-section-item').last();

      // detach item from DOM
      item.detach();

      // the column where the item should go to
      $('.field-name-elenco-sections', $page_section).eq(operation.to)
        // the first section
        .find('.elenco-section').first()
        // prepend the item
        .prepend(item);
    },

    // Split a section at the beginning of a column to the end of another column
    splitFirstToLast: function(operation, $page_section) {
      // target the section
      var section =
        // the column where the section comes from
        $('.field-name-elenco-sections', $page_section).eq(operation.from)
        // the first section
        .find('.elenco-section').first();

      // mark the section as splitted
      section.addClass('elenco-section-splitted');

      // clone the section to a new section
      var new_section = section.clone();
      // remove all the contents of the cloned section
      $('> *', new_section).remove();

      // the column where the section should go to
      $('.field-name-elenco-sections', $page_section).eq(operation.to)
        // append the cloned section
        .append(new_section);

      // move the header from section to the cloned section
      new_section.append(
        $('> *:not(.elenco-section-item)', section).detach()
      );
    },

    // Split a section at the end of a column to the beginning of another column
    splitLastToFirst: function(operation, $page_section) {
      // target the section
      var section =
        // the column where the section comes from
        $('.field-name-elenco-sections', $page_section).eq(operation.from)
        // the last section
        .find('.elenco-section').last();

      // mark the section as splitted
      section.addClass('elenco-section-splitted');

      // clone the section to a new section
      var new_section = section.clone();
      // remove all the contents of the cloned section
      $('> *', new_section).remove();

      // the column where the section should go to
      $('.field-name-elenco-sections', $page_section).eq(operation.to)
        // prepend the cloned section
        .prepend(new_section);
    },

    // Merge a section at the beginning of a column to the end of another column
    mergeFirstToLast: function(operation, $page_section) {
      // target the section
      var section =
        // the column where the section comes from
        $('.field-name-elenco-sections', $page_section).eq(operation.from)
        // the first section
        .find('.elenco-section').first();

      // target the target section
      var target_section =
        // the column where the section should go to
        $('.field-name-elenco-sections', $page_section).eq(operation.to)
        // the last section
        .find('.elenco-section').last();

      // move all items from the section to the target section
      target_section.append($('.elenco-section-item', section).detach());

      // unmark the target section as splitted
      target_section.removeClass('elenco-section-splitted');

      // remove the section
      section.remove();
    },

    // Merge a section at the end of a column to the beginning of another column
    mergeLastToFirst: function(operation, $page_section) {
      // target the section
      var section =
        // the column where the section comes from
        $('.field-name-elenco-sections', $page_section).eq(operation.from)
        // the last section
        .find('.elenco-section').last();

      // target the target section
      var target_section =
        // the column where the section should go to
        $('.field-name-elenco-sections', $page_section).eq(operation.to)
        // the first section
        .find('.elenco-section').first();

      // move all the items from the target section to the section
      section.append($('.elenco-section-item', target_section).detach());

      // remove the target section
      target_section.remove();

      // the colum where the section should go to
      $('.field-name-elenco-sections', $page_section).eq(operation.to)
        // prepend the section
        .prepend(section);
    }
  };

  // Helper function to execute an operation. Passes the call through to
  // elencoOperations.{method}
  var executeOperation = function(operation, $page_section) {
    elencoOperations[operation.method](operation, $page_section);
  };

  // Helper function to restore some classes on the sections and columns after
  // the DOM is altered
  var fixUpLastAndFirstClasses = function($page_section) {
    // variable to store the column heights
    var heights = [];

    // loop over the columns
    $('.field-name-elenco-sections', $page_section).each(function() {
      var $column = $(this);

      // remove first and last classes
      $('.elenco-section', $column).removeClass('first').removeClass('last');

      // add the first class on the first section
      $('.elenco-section', $column).first().addClass('first');

      // add the last class on the last section
      $('.elenco-section', $column).last().addClass('last');

      // remove the longest class from the column
      $column.removeClass('elenco-longest');

      // store the column height
      heights.push($column.height());
    });

    // find the longest column
    var max = heights[0];
    var maxIndex = 0;
    for (var i = 1; i < heights.length; i++) {
      if (heights[i] > max) {
        maxIndex = i;
        max = heights[i];
      }
    }

    // target the longests column
    $('.field-name-elenco-sections', $page_section).eq(maxIndex)
      // add the longest class
      .addClass('elenco-longest');
  };

  // Balance the sections
  var balanceSections = function($page_section) {
    // Find out how the current distribution of sections and items over columns
    // is
    var currentState = getCurrentState($page_section);

    // Flatten the currentState to one column
    var flatState = flattenState(currentState);

    // Find out how the distribution of section of items over columns should be
    var desiredState = determineDesiredState(flatState, currentState.length);

    // Find out how to get from the currentState to the desiredState
    var operations = figureOutOperations(currentState, desiredState);

    // if we have operations to execute
    if (operations.length > 0) {
      // execute all operations
      $.each(operations, function(index, operation) {
        executeOperation(operation, $page_section);
      });

      // Fix the classes
      fixUpLastAndFirstClasses($page_section);
      // Fire the drupal behaviors (most importantly, the grid)
      Drupal.attachBehaviors($page_section);
    } else {
      // if we have no operations to execute, but this is our first run
      if ($('.elenco-longest', $page_section).length == 0) {
        // run the fixup helper anyway
        fixUpLastAndFirstClasses($page_section);
      }
    }
  };

  // Wrapper around balanceSections that makes sure it is running only once at
  // a time. If lockedBalanceSections is called, it will set a lock which will
  // be release after running balanceSections is finished. If
  // lockedBalanceSections is called while locked, it will rerun balanceSections
  // after the current run is finished.
  var lockedBalanceSections = function($page_section) {
    // if the page section is currently marked as locked, schedule a new run
    // after the current and break out of this function
    if ($page_section.data('elencoLocked')) {
      $page_section.data('elencoScheduled', true);
      return;
    }

    // lock the page section
    $page_section.data('elencoLocked', true);

    // handle the running and scheduling
    var run = function() {
      balanceSections($page_section);

      // if a new run is scheduled, don't unlock, but unschedule the new run and
      // start the runner again.
      if ($page_section.data('elencoScheduled')) {
        $page_section.data('elencoScheduled', false);
        window.setTimeout(run, 0);
        return;
      }

      // unlock the page section
      $page_section.data('elencoLocked', false);
    };

    // call the runner
    window.setTimeout(run, 0);
  };

  // Register as Drupal behavior
  Drupal.behaviors.elenco = {
    attach: function(context) {
      $('.page-section-elenco', context).once('elenco', function() {
        var $page_section = $(this);

        if (!$('.field-name-elenco-sections', $page_section).length) {
          return;
        }

        // If we only have one column
        if ($('.field-name-elenco-sections', $page_section).length == 1) {
          // Add a first class on this column
          $('.field-name-elenco-sections', $page_section).addClass('first');
          var elencoLength = $('.elenco-section-item').length
          // Create a second column with a last class
          $('<div />')
            .addClass('field-name-elenco-sections')
            .addClass('last')
            .addClass( 'items-' + elencoLength )
            .insertAfter($('.field-name-elenco-sections', $page_section));

          // If we have only one section, add the single class.
          if ($('.page-section-elenco-section', $page_section).length == 1) {
            $page_section.addClass('elenco-single');
          }
        }

        // run the balancer
        lockedBalanceSections($page_section);

        $(window).bind('load resize', function() {
          // fire the balancer when images are load or the window is resized
          lockedBalanceSections($page_section);
        });
      });
    }
  };
}(jQuery));
;
(function ($) {
  Drupal.behaviors.mediasize = {
    attach: function(context) {
      $(".media-vimeo-video iframe, .media-youtube-video iframe, .media-soundcloud-audio iframe", context).once('mediasize', function() {
        var video = this;
        var $video = $(video);
        var $container = $video.parent();

        var aspect_ratio = video.height / video.width;
        $video.removeAttr('height').removeAttr('width');

        var fix_size = function() {
          var width = $container.width();
          $video.width(width).height(width * aspect_ratio);
        };

        $(window).resize(fix_size);
        fix_size();
      });
    }
  };
}(jQuery));
;
(function ($) {
  // corporate header
  Drupal.behaviors.header = {
    attach: function(context) {

      $('.domain-hni #header > .section').height($(document).height());
      setheaderheight();

      $(window).on('hniredraw', function() {
        setheaderheight();
      });

      function setheaderheight() {
        var viewport = Drupal.get_viewport_size();
        $('.domain-hni #name-and-slogan').height(viewport.height);
        $('.hni-header .section').height(viewport.height);
      }
      $('.menu a').addClass('needsclick');
    }
  };

  // magazine header
  Drupal.behaviors.stickyHeader = {
    attach: function(context) {
      $('.corporate-magazine-front .page-header-nav, .domain-magazine .block-menu-block', context).once('sticky-header', function() {
        var $menu = $(this);
        var parameters = Array( $menu, 'fixed-menu', getoriginalposition( $menu ) );

        setfixedheader(parameters);
        $(window).on('scroll', function() {
          setfixedheader(parameters);
        });

        setoriginalposition(parameters);
        $(window).on('hniredraw', function() {
          setoriginalposition(parameters);
        });
      });
    }
  };

  // agenda header
  Drupal.behaviors.mobileHeader = {
    attach: function(context) {
      $('.agenda-tab-menu', context).once('agenda-tab', function() {
        $this = $(this);

        var prev_href = $('.agenda-group-prev').attr('href');
        var next_href = $('.agenda-group-next').attr('href');

        if( Drupal.get_viewport_size().width < 768 ) {
          var href_hash = window.location.hash;

          if( href_hash != '' && ( href_hash == '#activities' || href_hash == '#activiteiten' ) ) {
            $('.agenda-magazines .inner-container').hide();
            $('.agenda-activities .inner-container').show();

            $('.agenda-group-prev').attr('href', prev_href + '/' + href_hash );
            $('.agenda-group-next').attr('href', next_href + '/'  + href_hash );

            $('.tab-link').removeClass('active');
            $('.activities-tab-link').addClass('active');
          }
        }

        $this.find('.tab-link').click( function(e) {
          if( Drupal.get_viewport_size().width < 768 ) {
            e.preventDefault();

            $link = $(this);
            if( $link.hasClass('magazines-tab-link') ) {
              $('.agenda-magazines .inner-container').show();
              $('.agenda-activities .inner-container').hide();

              $('.agenda-group-prev').attr('href', prev_href);
              $('.agenda-group-next').attr('href', next_href);
            } else {
              $('.agenda-magazines .inner-container').hide();
              $('.agenda-activities .inner-container').show();

              $('.agenda-group-prev').attr('href', prev_href + '/#' + $('.activities-tab-link').text().toLowerCase() );
              $('.agenda-group-next').attr('href', next_href + '/#' + $('.activities-tab-link').text().toLowerCase() );
            }

            $('.tab-link').removeClass('active');
            $link.addClass('active');

            $('.dotdotdot').each(function() {
              var $this = $(this);

              if ($this.data('dotdotdot')) {
                $this.trigger('update.dot');
              } else {
                $this.dotdotdot();
              }
            });
          }
        });
      });
    }
  };

  Drupal.behaviors.agendaMobileHeader = {
    attach: function(context) {
      $('.agenda-mobile-header', context).once('agenda-mobile-header', function() {
        $self = $(this);

        if( Drupal.get_viewport_size().width < 768 ) { setfixedheaderoffset($self); }
        $(window).on('hniredraw', function() {
          if( Drupal.get_viewport_size().width < 768 ) { setfixedheaderoffset($('.agenda-mobile-header', context)); }
        });
      });
    }
  };

  Drupal.behaviors.agendaHeader = {
    attach: function(context) {
      $('.agenda-large-header', context).once('agenda-large-header', function() {
        var $self = $(this);

        if( Drupal.get_viewport_size().width >= 768 ) { setfixedheaderoffset($self); }
        $(window).on('hniredraw', function() {
          if( Drupal.get_viewport_size().width >= 768 ) { setfixedheaderoffset($('.agenda-large-header', context)); }
        });
      });
    }
  };

  // magazine, navagatie binnen magazine
  Drupal.behaviors.pageNavHeader = {
    attach: function(context) {
      $('.page-header-nav', context).once('page-header-nav', function() {
        var $self = $(this);

        setfixedheaderoffset($self);
        $(window).on('hniredraw', function() {
          setfixedheaderoffset($('.page-header-nav', context));
        });
      });
    }
  };

  function setoriginalposition(parameters) {
    var $fixed_element    = parameters[0]; // element that needs to become fixed
    var fixed_class       = parameters[1]; // class that the element receives when fixed
    var original_position = parameters[2];

    if( ! $fixed_element.hasClass(fixed_class) ) {
      original_position = $fixed_element.offset().top;
    } else {
      $fixed_element.removeClass(fixed_class);
      original_position = $fixed_element.offset().top;
      $fixed_element.addClass(fixed_class);
      setfixedheaderoffset($fixed_element);
    }
  }

  function getoriginalposition($element) {
    return $element.offset().top;
  }

  function setfixedheader(parameters) {
    var $fixed_element    = parameters[0]; // element that needs to become fixed
    var fixed_class       = parameters[1]; // class that the element receives when fixed
    var original_position = parameters[2];

    if( ! $fixed_element.hasClass(fixed_class) && $(window).scrollTop() >= $fixed_element.offset().top ) {
      $fixed_element.addClass(fixed_class);
      setfixedheaderoffset($fixed_element);
    } else if( $fixed_element.hasClass(fixed_class) && $(window).scrollTop() < original_position ) {
      $fixed_element.removeClass(fixed_class);
      $('#main-wrapper').removeAttr('style');
    }
  }

  function setfixedheaderoffset($element) {
    $('#main-wrapper').css('padding-top', $element.outerHeight(true));
  }

  $(function() {
    FastClick.attach(document.body);
  });

  var scroll_if_anchor = function(href) {
    href = typeof(href) == "string" ? href : $(href).attr("href");

    // If href missing, ignore
    if(!href) return;

    // You could easily calculate this dynamically if you prefer
    var fromTop = 100;

    // If our Href points to a valid, non-empty anchor, and is on the same page (e.g. #foo)
    // Legacy jQuery and IE7 may have issues: http://stackoverflow.com/q/1593174
    var $target = $("a[name='" + href.substring(1).replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0') + "']");

    // Older browsers without pushState might flicker here, as they momentarily
    // jump to the wrong position (IE < 10)
    if($target.length) {
      $('html, body').animate({ scrollTop: $target.offset().top - fromTop });
    }
  }
  
  // Intercept all anchor clicks
  $(document).ready(function() {
    $("body .node a[href^='#']").click(function (e) {
      e.preventDefault();
      scroll_if_anchor(this);
    });
  });

}(jQuery));;
(function ($) {
  Drupal.behaviors.search = {
    attach: function(context) {
      $('#search-form .form-submit').addClass('button');
      var setMinSearchHight = function() {
        $('.search-height').css("min-height", Drupal.get_viewport_size().height);
      };
      setMinSearchHight();
      $(window).resize(setMinSearchHight);
    }
  };

  Drupal.behaviors.searchSubmit = {
    attach: function(context) {
      $('#search-block-form .form-submit', context).once('search-submit', function() {
        $self = $(this);

        $self.on('click', function(e) {
          if( $('#search-block-form .form-text').val().length == 0 ) {
            e.preventDefault();
            $('#search-block-form .form-text').focus();
          }
        });
      });
    }
  };
}(jQuery));
;
(function ($) {
  Drupal.behaviors.hniHeader = {
    attach: function(context) {
      $('.hni-header', context).once('hni-header', function() {
        $header = $(this);

        if( $('body').hasClass('domain-hni') || $('body').hasClass('not-front') && $('body').hasClass('domain-magazine') ) {
          $('.hni-header-button-menu').removeClass('hidden-menu');
        }

        var open = false;
        if ($('body').hasClass('hni-header-expand') && Drupal.get_viewport_size().width >= 1024) {
          open = true;
        }

        var open_close_fixup = function() {
          if (open) {
            $header.addClass('expanded');
            $('.hni-header-button-menu.hidden-menu').hide(0);
          } else {
            $header.removeClass('expanded');
            $('.hni-header-button-menu.hidden-menu').show(0);
          }
        }

        open_close_fixup();

        $('.hni-header-button-menu a').click(function(e) {
          open = true;
          open_close_fixup();
          e.preventDefault();
        });
        $('.hni-header-button-close a').click(function(e) {
          open = false;
          open_close_fixup();
          e.preventDefault();
        });

        $('.menu-block-corporate_main_menu', $header).each(function() {
          var $menu_wrapper = $(this);
          var $menu = $('> ul.menu', $menu_wrapper);

          var $active_link = undefined;
          var unhover_pending = false;

          var fixup = function() {
            if ($active_link === undefined) {
              $('> li', $menu).removeClass('hover');
              $menu.removeClass('hovering');
              unhover_pending = false;
            } else {
              $active_link.addClass('hover');
              $active_link.siblings().removeClass('hover');
              $menu.addClass('hovering');
              unhover_pending = false;
            }
          };

          var schedule_unhover = function() {
            unhover_pending = true;
            window.setTimeout(function() {
              if (unhover_pending) {
                $active_link = undefined;
                fixup();
              }
            }, 100);
          };

          $('> li', $menu).each(function() {
            var $menu_link = $(this);

            var hover = function () {
              $active_link = $menu_link;
              fixup();
            };

            $('a, .menu, .menu li', $menu_link).mouseover(hover);
          });

          $menu_wrapper.mouseleave(schedule_unhover);
        });
      });
    }
  };
}(jQuery));;
(function ($) {
  Drupal.behaviors.magazinesIframe = {
    attach: function(context) {
      $('.page-section-iframe', context).once('magazines-iframe', function() {
        var $this = $(this);
        var touch = $('html').hasClass('touch');
        var src = Drupal.settings.magazines_iframes[$this.attr('id')];

        var activate_iframe = function() {
          if ($('iframe', $this).length > 0) {
            return;
          }

          var $iframe = $('<iframe />').attr('src', src);
          $iframe.appendTo($('> .content', $this));

          $('.field-name-image, .activate-button', $this).hide();
        };

        if ($this.hasClass('iframe-mode-full-width')) {
          var ratios = [
            ['iframe-ratio-4-3', 4, 3],
            ['iframe-ratio-16-9', 16, 9],
            ['iframe-ratio-1-2', 1, 2],
            ['iframe-ratio-2-1', 2, 1],
            ['iframe-ratio-1-1', 1, 1]
          ];
          var ratio = _.find(ratios, function(r) {
            return $this.hasClass(r[0]);
          });

          if (ratio !== undefined) {
            var resize = function() {
              var viewport = Drupal.get_viewport_size();
              var width = $this.width();

              var max_width = width;
              var max_height =
                viewport.height -
                22 * 3 - // 22 = line-height of image-caption
                parseInt( ( $('#wrapper').width() / 24 ) / 2, 10);

              var width_from_max_height = max_height / ratio[2] * ratio[1];
              var height_from_max_width = max_width  / ratio[1] * ratio[2];

              if (width_from_max_height <= max_width) {
                $('.content', $this).css({
                  width:  '' + width_from_max_height + 'px',
                  height: '' + max_height            + 'px',
                  paddingBottom: 'inherit',
                  margin: '0 auto',
                  overflow: 'hidden'
                });
              } else {
                $('.content', $this).css({
                  width:  '' + max_width             + 'px',
                  height: '' + height_from_max_width + 'px',
                  paddingBottom: 'inherit',
                  margin: '0 auto',
                  overflow: 'hidden'
                });
              }
            };

            $(window).on('resize', resize);
            resize();
          }
        }

        if (!touch) {
          activate_iframe();
        } else {
          $('.activate-button span', $this).click(function(e) {
            e.preventDefault();
            activate_iframe();
          });
        }
      });
    }
  };
}(jQuery));
;
(function ($) {
  Drupal.behaviors.scrollhint = {
    attach: function(context) {
      $('.scroll-hint', context).once('scroll-hint', function() {
        var $hint = $(this);

        var onscrollHandler = function() {
          $('.scroll-hint').removeClass('animate');
          $(window).off('scroll', onscrollHandler);
        };

        if($(window).scrollTop() == 0 ) {
          $hint.addClass('animate');
          $(window).on('scroll', onscrollHandler);
        }

        $('.scroll-hint-content').click( function(){
           if ( $('body').hasClass('corporate-magazine-front') || $('body').hasClass('domain-magazine') ) {
              $('html, body').animate({ scrollTop: $('#page').offset().top }, 2000);
           } else {
              $('html, body').animate({ scrollTop: $(window).height() / 2 }, 500); 
           }           
        });

      });
    }
  };
}(jQuery));
;
