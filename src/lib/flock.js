import Point from '@studiomoniker/point';
import Boid from './boid';
import types from './pijlers';

const margin = 30;
export default class Flock {
  constructor (amount, size) {
    this.boids = [];
    this.size = Point.fromArray(size);
    for (let i = 0; i < 8; i++) {
       let kind = types[i % 4];
       let boid = new Boid({
        position: new Point((i + 0.5) / 8, 0.25 + (i % 2 ? 0.1 : -0.1))
            .multiply(this.size.clone()
            .subtractNum(margin * 2))
            .addNum(margin),
        maxSpeed: kind.work
            ? 0.3 + Math.random() / 8
            : 0.5 + Math.random() / 8,
        maxForce: kind.work
            ? Math.random() / 10 + 0.5
            : 5 + Math.random(),
        radius: 10,
        wallMargin: 30
       });
       boid.type = kind.work;
       boid.name = kind.name;
       boid.url = kind.url;
       this.boids.push(boid);
    }
    for (let i = 0; i < 6; i++) {
       let kind = types[(i % 3 + 4)];
       let boid = new Boid({
        position: new Point((i + 0.5) / 6, 0.75 + (i % 2 ? 0.1 : -0.1))
            .multiply(this.size.clone().subtractNum(margin * 2))
            .addNum(margin),
        maxSpeed: kind.work ? 0.3 + Math.random() / 8 : 0.5,
        maxForce: kind.work ? Math.random() / 10 + 0.5 : 5 + Math.random(),
        radius: 10,
        wallMargin: 30
       });
       boid.type = kind.work;
       boid.name = kind.name;
       this.boids.push(boid);
    }
  }

  tick(mousePos) {
    const size = this.size;
    this.boids.forEach(boid => boid.tick(this.boids, size, mousePos));
  }

  get points() {
    return this.boids.map(boid => boid.averagePosition || Point());
  }
}

