import fitCanvas from 'canvas-fit';
import voronoi from 'd3-voronoi';

let width, height;
const v = voronoi.voronoi();
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const ratio = window.devicePixelRatio || 1;
document.body.appendChild(canvas);
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function shorten([point1, point2]) {
  const p1 = point1.clone();
  const p2 = point2.clone();
  const padding = 50;
  const delta = p2
    .clone()
    .subtract(p1)
    .normalize(padding);
  p1.add(delta);
  p2.subtract(delta);
  return [p1, p2];
}

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
  const links = v(boids.map(boid => boid.position.toArray()))
    .edges
    .filter(edge => edge.right)
    .map(edge => [
      boids[edge.left.index],
      boids[edge.right.index]
    ])
    .filter(([a, b]) => {
      const dis = a.averagePosition.distanceSq(b.averagePosition);
      return a.name !== b.name
        && dis < (height * 80)
        && dis > 10000;
    });

  ctx.clearRect(0, 0, width, height);
  links.map(boids => {
    let [a, b] = boids;
    const sameType = a.type === b.type;
    if (a.name === b.name) return;
    let points = boids.map(boid => boid.averagePosition);
    points = shorten(points);
    drawLine(points, sameType ? 1 : 8);
  });
}
