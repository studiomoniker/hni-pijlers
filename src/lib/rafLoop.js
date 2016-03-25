var running = true;
var looping = false;
var functions = [];

function stop() {
  running = false;
  return rafLoop;
}

function start() {
  running = true;
  looping = true;
  window.requestAnimationFrame(loop);
  return rafLoop;
}

function loop() {
  functions.forEach(func => func());
  if (running)
    window.requestAnimationFrame(loop);
  return rafLoop;
}

function add(func) {
  if (!functions)
    functions = [];
  functions.push(func);
  if (running && !looping)
    start();
  return rafLoop;
}

function remove(func) {
  var index = functions.indexOf(func);
  if (index !== -1)
    functions.splice(index, 1);
  return rafLoop;
}

var rafLoop = { stop, start, add, remove };

export default rafLoop;
