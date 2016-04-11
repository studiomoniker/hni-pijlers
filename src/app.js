import 'points';

import { redirect } from './lib/message';
import Flock from './lib/flock';
import loop from './lib/rafLoop';
import drawLinks from './lib/drawLinks';

let width, height, flock, elements, containerEl;
onResize();
initializeElements();
loop.add(tick);
window.addEventListener('resize', onResize);

function initializeElements() {
  containerEl = document.createElement('div');
  containerEl.className = 'container hidden';
  document.body.appendChild(containerEl);

  elements = flock.boids.map((boid, index) => {
    const el = document.createElement('div');
    el.innerHTML = boid.name;
    el.className = 'title' + (boid.type ? ' work' : '' );
    // Accessing boids by index, because the boids array is updated on resize:
    el.addEventListener('pointerdown', () => redirect(flock.boids[index].url));
    el.addEventListener('pointerenter', () => flock.boids[index].velocity.multiplyNum(0.1));
    el.addEventListener('pointerleave', () => flock.boids[index].velocity.divideNum(0.1));
    containerEl.appendChild(el);
    return el;
  });

  addElementsToFlock();
}

function tick() {
  flock.tick();
  drawLinks(flock.boids);

  flock.boids.forEach((boid, index) => {
    const point = boid.averagePosition;
    const style = elements[index].style;
    style.transform = style['-webkit-transform'] = `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`;
  });
  // Show elements:
  containerEl.className = 'container';
}

function addElementsToFlock() {
  flock.boids.forEach((boid, index) => {
    const el = elements[index];
    const bounds = el.getBoundingClientRect();
    Object.assign(boid, {
      el,
      elSize: {
        width: bounds.width,
        height: bounds.height
      },
      elSizeMargin: {
        width: bounds.width + 40,
        height: bounds.height + 40
      }
    });
  });
}

function onResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  flock = new Flock(10, [width, height]);
  if (elements) {
    addElementsToFlock();
  }
}
