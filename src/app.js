import './lib/message';
import voronoi from 'd3-voronoi';
import yo from 'yo-yo';

const v = voronoi.voronoi();

const points = [];
const width = window.innerWidth;
const height = window.innerHeight;

for (var x = 0; x < 6; x++) {
  for (var y = 0; y < 6; y++) {
    points.push([(x) / 5 * width, (y) / 5 * height]);
  }
}

const el = render(points, onMouseMove);
document.body.appendChild(el);

function shorten(point1, point2) {
  const length = [
    point2[0] - point1[0],
    point2[1] - point1[1]
  ];
  return [
    [
      point1[0] + length[0] * 0.2,
      point1[1] + length[1] * 0.2
    ],
    [
      point2[0] - length[0] * 0.2,
      point2[1] - length[1] * 0.2
    ]
  ];
}

function render (points, onmove) {
  const triangles = v.triangles(points);
  return yo`<div>
    <svg onmousemove=${onmove}>
      ${triangles.map(triangle => triangle.map((point, index) => {
        let nextPoint = triangle[(index + 1) % 3];
        [point, nextPoint] = shorten(point, nextPoint);
        return yo`<line
          x1="${point[0]}" y1="${point[1]}" 
          x2="${nextPoint[0]}" y2="${nextPoint[1]}" />`;
      }))}
    </svg>
  </div>`;
}

function onMouseMove (event) {
  points[0] = [event.offsetX, event.offsetY];
  // construct a new list and efficiently diff+morph it into the one in the DOM
  const newList = render(points, onMouseMove);
  yo.update(el, newList);
}
