// import './lib/message';
import voronoi from 'd3-voronoi';
import Flock from './lib/flock';
import loop from './lib/rafLoop';
import drawLinks from './lib/drawLinks';

let width, height, flock, containerEl;
const v = voronoi.voronoi();
const concepts = [
  {
    name: 'R&D'
  },
  {
    name: 'Museum'
  },
   {
    name: 'Agentschap'
  },
   {
    name: 'Rijksarchief'
  },
  {
    name: 'digitale<br/>cultuur',
    work: true
  },
  {
    name: 'design',
    work: true
  },
  {
    name: 'architectuur',
    work: true
  }
];
initialize();

function initialize() {
  containerEl = document.createElement('div');
  containerEl.className = 'container';
  document.body.appendChild(containerEl);

  onResize();
  window.addEventListener('resize', onResize);

  flock.boids.forEach(boid => {
    const el = document.createElement('div');
    el.innerHTML = boid.name;
    el.className = 'title' + (boid.type ? ' work' : '' );
    containerEl.appendChild(el);
    boid.el = el;
  });

  loop.add(tick);
}

function tick() {
  flock.tick();

  const links = v(flock.boids.map(boid => boid.position.toArray()))
    .edges
    .filter(edge => edge.right)
    .map(edge => [flock.boids[edge.left.index], flock.boids[edge.right.index]])
    .filter(([a, b]) => {
      const dis = a.averagePosition.distanceSq(b.averagePosition);
      return a.name !== b.name
        && dis < (height * 80)
        && dis > 10000;
    });
  drawLinks(links);

  flock.boids.forEach(boid => {
    const point = boid.averagePosition;
    boid.el.style.transform = `translate3d(calc(${point.x}px - 50%), calc(${point.y}px - 50%), 0)`;
  });
}

function onResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  var oldBoids = flock && flock.boids;
  flock = new Flock(10, [width, height], concepts);
  if (oldBoids)
    oldBoids.map((boid, index) => flock.boids[index].el = boid.el);
}
