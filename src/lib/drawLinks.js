import fitCanvas from 'canvas-fit';
import voronoi from 'd3-voronoi';
import Point from '@studiomoniker/point';

import lineRectangleCollision from './lineRectangleCollision';

let width, height;
let mouse;
let averageMouse = new Point();
const mouseBoid = {
  averagePosition: averageMouse,
  position: averageMouse,
  elSizeMargin: {width: 80, height: 80},
  name: 'mouse',
  elSize: {width: 100, height: 100},
  velocity: new Point(),
  type: true
};

const v = voronoi.voronoi();
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const ratio = window.devicePixelRatio || 1;
document.body.appendChild(canvas);
document.addEventListener('pointermove', function(event) {
  const mouseSize = 0;
  if (mouse) {
    mouse.set(event.clientX + mouseSize, event.clientY + mouseSize);
  } else {
    mouse = new Point(event.clientX + mouseSize, event.clientY + mouseSize);
    averageMouse.set(mouse.x, mouse.y);
  }
});
document.addEventListener('pointerout', function(event) {
  mouse = null;
});

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
  fitCanvas(canvas, window, ratio);
  ctx.scale(ratio, ratio);
  width = canvas.width;
  height = canvas.height;
}

function drawLine([p1, p2], lineWidth) {
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

export default function drawLinks(boids) {
  ctx.clearRect(0, 0, width, height);
  var lastIndex = boids.length;
  if (mouse) {
    averageMouse.mix(mouse, 0.1);
  }

  if (mouse) {
    boids
      .filter(boid => boid.averagePosition.isClose(averageMouse, 50))
      .forEach((boid, index) => index === 0 && boid.position.mix(averageMouse, 0.05));
  }

  v(boids
      .map(boid => boid.position.toArray())
      .concat(
        mouse // if there is a mouse
        && !boids.some(boid => boid.averagePosition.isClose(averageMouse, 60)) // and we aren't too close to a title
          ? [averageMouse.toArray()]
          : []
      )
    )
    .edges
    .filter(edge => edge.right)
    .map(edge => {
      const leftIndex = edge.left.index;
      const rightIndex = edge.right.index;
      const left = (leftIndex === lastIndex)
          ? mouseBoid
          : boids[leftIndex];
      const right = (rightIndex === lastIndex)
          ? mouseBoid
          : boids[rightIndex];
      var combined = [left, right];
      return combined;
    })
    .filter(([a, b]) => {
      const dis = a.averagePosition.getDistanceSquared(b.averagePosition);
      return a.name !== b.name
        && dis < (height * 70)
        && dis > 10000;
    })
    .map(pair => {
      const [a, b] = pair;
      // Don't connect items with the same name:
      if (a.name === b.name) return;
      const points = pair.map(boid => boid.averagePosition);
      // Shorten the lines to fit in a rectangle around the title elements:
      points[0] = lineRectangleCollision(points[1], points[0], points[0], a.elSizeMargin);
      points[1] = lineRectangleCollision(points[0], points[1], points[1], b.elSizeMargin);

      // Make sure none of the lines are crossing titles:
      const collides = boids.some(boid => lineRectangleCollision(points[0], points[1], boid.averagePosition, boid.elSize));
      const sameType = a.type === b.type;
      if (!collides) {
        drawLine(points, sameType ? 1 : 8);
      }
    });
}
