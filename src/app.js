// import './lib/message';
import voronoi from 'd3-voronoi';
import Boids from './lib/boids';
import loop from './lib/rafLoop';

import React from 'react';
import ReactDOM from 'react-dom';

const v = voronoi.voronoi();

const width = window.innerWidth;
const height = window.innerHeight;
const borders = [[0, 0], [0, height], [width, height], [width, 0]];
const points = [];
for (var x = 0; x < 6; x++) {
  points.push([Math.random() * width, Math.random() * height]);
}

const flock = new Boids({
  boids: points,          // The amount of boids to use 
  speedLimit: 2,        // Max steps to take per tick 
  accelerationLimit: 1,   // Max acceleration per tick 
  separationDistance: 100, // Radius at which boids avoid others 
  alignmentDistance: 180, // Radius at which boids align with others 
  choesionDistance: 10,  // Radius at which boids approach others 
  separationForce: 0.15,  // Speed to avoid at 
  alignmentForce: 0.25,   // Speed to align with other boids 
  choesionForce: 0.1,     // Speed to move towards other boids 
  attractors: [],
  size: [width, height]
});

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

class Path extends React.Component {
  render() {
    return <path d={`M ${this.props.points.join(' L ')}`} />
  }
}

class Triangle extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { points } = this.props;
    for (let i = 0, l = 3; i < l; i++) {
      const point = points[i];
      const nextPoint = nextProps.points[i];
      if (point[0] !== nextPoint[0] || point[1] !== nextPoint[1])
        return true;
    }
    return false;
  }

  render() {
    const { points } = this.props;
    return <g>
      {
        points.map(
          (point, index) => {
            let nextPoint = points[(index + 1) % 3];
            return <Path key={index} points={shorten(point, nextPoint)} />;
          }
        )
      }
    </g>
  }
}

class Flock extends React.Component {
  render() {
    return <g>
      {this.props.points.map((boid, index) => <circle key={index} transform={`translate(${boid})`} cx="0" cy="0" r="2" fill="black" />)}
    </g>
  }
}

class Drawing extends React.Component {
  constructor() {
    super();
    const points = [];
    for (var x = 0; x < 6; x++) {
      for (var y = 0; y < 6; y++) {
        points.push([x / 5 * width, y / 5 * height]);
      }
    }

    this.state = { points };
    loop.add(() => {
      flock.tick();
      this.setState({
        points: flock.boids.map((boid) => [boid[0], boid[1]])
      });
    });
  }

  onMouseMove(event) {
    let points = this.state.points.slice(0);
    points[0] = [event.clientX, event.clientY];
    this.setState({
      points
    });
  }

  render() {
    const { points } = this.state;
    const triangles = v.triangles(points.concat(borders))
      .filter((points) => {
        for (var i = 0; i < 3; i++) {
          let [x, y] = points[i];
          if (x === 0 || x === width || y === 0 || y === height)
            return false;
        }
        return true;
      });
    return <div>
      <svg onMouseMove={this.onMouseMove.bind(this)}>
        <Flock points={points} />
        {
          triangles.map((points, index) => <Triangle key={index} points={points} />)
        }
      </svg>
    </div>;
  }
}

let el = document.querySelector('.container');
function render() {
  ReactDOM.render(<Drawing />, el);
}

render();

