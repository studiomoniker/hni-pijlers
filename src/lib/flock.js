import Point from '@studiomoniker/point';
import Boid from './boid';
import subjects from './subjects';

const margin = 30;
export default class Flock {
  constructor (amount, size) {
    this.boids = [];
    this.size = Point.fromArray(size);
    for (let i = 0; i < 8; i++) {
       let kind = subjects.pijlers[i % 4];
       let boid = new Boid({
        position: new Point((i + 0.5) / 8, 0.25 + (i % 2 ? 0.1 : -0.1))
            .multiply(this.size.clone()
            .subtractNum(margin * 2))
            .addNum(margin),
        maxSpeed: 0.5 + Math.random() / 8,
        maxForce: 5 + Math.random(),
        radius: 10,
        wallMargin: 30
       });
       boid.type = kind.work;
       boid.name = kind.name;
       boid.url = kind.url;
       this.boids.push(boid);
    }
    for (let i = 0; i < 6; i++) {
       let kind = subjects.disciplines[i % 3];
       let boid = new Boid({
        position: new Point((i + 0.5) / 6, 0.75 + (i % 2 ? 0.1 : -0.1))
            .multiply(this.size.clone().subtractNum(margin * 2))
            .addNum(margin),
        maxSpeed: 0.3 + Math.random() / 8,
        maxForce: Math.random() / 10 + 0.5,
        radius: 10,
        wallMargin: 30
       });
       boid.type = kind.work;
       boid.name = kind.name;
       boid.url = kind.url;
       this.boids.push(boid);
    }
  }

  tick(mousePos) {
    this.boids.forEach(boid => boid.tick(this.boids, this.size, mousePos));
  }
}

