// import './lib/message';
import voronoi from 'd3-voronoi';
import Flock from './lib/flock';
import loop from './lib/rafLoop';
import Point from './lib/point';

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

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
    name: 'digitale\ncultuur',
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

let width = window.innerWidth;
let height = window.innerHeight;
let flock = new Flock(10, [width, height], concepts);

window.addEventListener('resize', function() {
  width = window.innerWidth;
  height = window.innerHeight;
  flock = new Flock(10, [width, height], concepts);
});

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

class Link extends React.Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return <path
      key={'a' + this.props.key}
      className={this.props.className}
      d={`M ${shorten(this.props.points).map(p => [p.x, p.y]).join(' L ')}`} />
  }
}

class Title extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { index, point, className } = this.props;
    let cName = 'title';
    if (cName)
      cName += ' ' + className;
    return <div className={cName} style={{transform: `translate(-50%, -50%)`}} >{this.props.children}</div>
  }
}

class Transform extends React.Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { point } = this.props;
    return <div style={{transform: `translate(${point.x}px, ${point.y}px)`}} >{this.props.children}</div>
  }
}


class Drawing extends React.Component {
  constructor() {
    super();
    this.state = { boids: [] };
    loop.add(() => {
      flock.tick(this.state.mouse);
      this.setState({
        boids: flock.boids
      });
    });
  }

  onMouseMove(event) {
    this.setState({
      mouse: new Point(event.clientX, event.clientY)
    });
  }

  render() {
    const { boids } = this.state;
    const links = v(boids.map(boid => [boid.averagePosition.x, boid.averagePosition.y])).edges
      .filter(edge => edge.right)
      .map(edge => [edge.left.index, edge.right.index]);
    return <div>
      <svg onMouseMove={this.onMouseMove.bind(this)}>
        {
          links
          .map(link => {
            return link.map(index => boids[index]);
          })
          .filter(([a, b]) => {
            const dis = a.averagePosition.distanceSq(b.averagePosition);
            return a.name !== b.name
              && dis < (height * 80)
              && dis > 10000;
          })
          .map((link, index) => {
            const a = link[0];
            const b = link[1];
            var linkClass = classNames({
              connected: a.type !== b.type,
              same: a === b
            });
            return <Link key={index} points={link.map(boid => boid.averagePosition)} className={linkClass} />
          })
        }
      </svg>
      <div style={{zIndex: 2}}>
      { boids.map((boid, index) => {
        let className = '';
        if (boid.type)
          className = 'work';
        return <Transform key={index} point={boid.averagePosition} index={index} >
            <Title key={index} className={className}>{boid.name}</Title>
          </Transform>
        })
      }
      </div>

    </div>;
  }
}

let el = document.querySelector('.container');
function render() {
  ReactDOM.render(<Drawing />, el);
}

render();

