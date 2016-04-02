import './lib/message';
import 'points';

import Flock from './lib/flock';
import loop from './lib/rafLoop';
import drawLinks from './lib/drawLinks';

let width, height, flock, elements;
initialize();

function initialize() {
  const containerEl = document.createElement('div');
  containerEl.className = 'container';
  document.body.appendChild(containerEl);

  onResize();
  window.addEventListener('resize', onResize);

  elements = flock.boids.map(boid => {
    const el = document.createElement('div');
    el.innerHTML = boid.name;
    el.className = 'title' + (boid.type ? ' work' : '' );
    containerEl.appendChild(el);
    return el;
  });

  loop.add(tick);
}

function tick() {
  flock.tick();
  drawLinks(flock.boids);

  flock.boids.forEach((boid, index) => {
    const point = boid.averagePosition;
    elements[index].style.transform = `translate(calc(${point.x}px - 50%), calc(${point.y}px - 50%))`;
  });
}

function onResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  flock = new Flock(10, [width, height]);
}
