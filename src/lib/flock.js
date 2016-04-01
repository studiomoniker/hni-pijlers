import Point from './point';

let count = 0;
const margin = new Point(30, 30);
const marginNum = 30;
export default class Flock {
  constructor (amount, size, types) {
    this.boids = [];
    this.size = Point.fromArray(size);
    for (let i = 0; i < 8; i++) {
       let kind = types[i % 4];
       let boid = new Boid({
        position: new Point((i + 0.5) / 8, 0.25 + (i % 2 ? 0.1 : -0.1))
            .multiply(this.size.clone().subtract(margin.clone().multiplyNum(2)))
            .add(margin),
        maxSpeed: kind.work
            ? 0.3 + Math.random() / 8
            : 0.5 + Math.random() / 8,
        maxForce: kind.work
            ? Math.random() / 10 + 0.5
            : 5 + Math.random(),
        radius: 10,
        type: kind.work,
        name: kind.name
       });
       this.boids.push(boid);
    }
    for (let i = 0; i < 6; i++) {
       let kind = types[(i % 3 + 4)];
       let boid = new Boid({
        position: new Point((i + 0.5) / 6, 0.75 + (i % 2 ? 0.1 : -0.1))
            .multiply(this.size.clone().subtract(margin.clone().multiplyNum(2)))
            .add(margin),
        maxSpeed: kind.work ? 0.3 + Math.random() / 8 : 0.5,
        maxForce: kind.work ? Math.random() / 10 + 0.5 : 5 + Math.random(),
        radius: 10,
        type: kind.work,
        name: kind.name
       });
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

class Boid {
  constructor ({position, maxSpeed, maxForce, radius, type, name}) {
    const strength = Math.random() * 0.5;
    this.acceleration = new Point();
    this.vector = Point.random().multiplyNum(2).subtractNum(1);
    this.position = position;
    this.averagePosition = position.clone();
    this.radius = radius;
    this.maxSpeed = maxSpeed + strength;
    this.maxForce = maxForce + strength;
    this.desiredSeperation = 100;
    this.type = type;
    this.name = name;
  }

  tick(boids, size, mousePos) {
    this.flock(boids);
    this.borders(size);
    this.update(mousePos);
  }

  // We accumulate a new acceleration each time based on three rules
  flock(boids) {
    const separation = this.separate(boids).multiplyNum(3);
    const alignment = this.align(boids).multiplyNum(2);
    const cohesion = this.cohesion(boids);
    this.acceleration
      .add(separation)
      .add(alignment)
      .add(cohesion);
  }

  update(mousePos) {
    // Update velocity
    this.vector.add(this.acceleration);
    // Limit speed (vector#limit?)
    this.vector.limitLength(this.maxSpeed);
    if (mousePos && this.position.isClose(mousePos, 100))
      this.vector.divideNum(5);
    this.position.add(this.vector);
    this.averagePosition.mix(this.position, 0.2);
    // Reset acceleration to 0 each cycle
    this.acceleration.zero();
  }

  seek(target) {
    this.acceleration.add(this.steer(target, false));
  }

  arrive(target) {
    this.acceleration.add(this.steer(target, true));
  }

  same(other) {
    return this.type === other.type;
  }

  borders(size) {
    const position = this.position;
    const titleMargin = 30;
    const radius = this.radius;
    if (position.x < radius + marginNum)
      this.vector.addX(1);
    if (position.y < radius + marginNum + titleMargin)
      this.vector.addY(1);
    if (position.x > size.x - radius - marginNum)
      this.vector.addX(-1);
    if (position.y > size.y - radius - marginNum)
      this.vector.addY(-1);
  }

  // A method that calculates a steering vector towards a target
  // Takes a second argument, if true, it slows down as it approaches
  // the target
  steer(target, slowdown) {
    const desired = target.clone().subtract(this.position);
    const distance = desired.length();
    // Two options for desired vector magnitude
    // (1 -- based on distance, 2 -- maxSpeed)
    if (slowdown && distance < 100) {
      // This damping is somewhat arbitrary:
      desired
        .normalize()
        .multiplyNum(
          (slowdown && distance < 100)
            ? this.maxSpeed * (distance / 100)
            : this.maxSpeed
        );
    } else {
      desired.normalize(this.maxSpeed);
    }

    return desired
      .subtract(this.vector)
      .limitLength(this.maxForce);
  }

  separate(boids) {
    let steer = new Point();
    let count = 0;
    const vector = new Point();
    // For every boid in the system, check if it's too close
    for (let i = 0, l = boids.length; i < l; i++) {
      const other = boids[i];
      vector.copy(this.position).subtract(other.position);
      let distance = vector.length();
      if (!this.same(other)) {
        distance /= 1.5;
      } else {
        distance *= 1;
      }
    if (distance > 0 && distance < this.desiredSeperation) {
          // Calculate vector pointing away from neighbor
        steer.add(vector.normalize(1 / distance));
        count++;
      }
    }
    // Average -- divide by how many
    if (count > 0)
      steer.divideNum(count);
    if (!steer.isZero()) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer
        .normalize()
        .multiplyNum(this.maxSpeed)
        .subtract(this.vector)
        .limitLength(this.maxForce);
    }
    return steer;
  }

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  align(boids) {
    let steer = new Point();
    let count = 0;
    for (let i = 0, l = boids.length; i < l; i++) {
      let neighborDist = 100 * 100;
      const other = boids[i];
      let distance = this.position.distanceSq(other.position);
      if (!this.same(other))
        distance *= 0.3;
      if (distance > 0 && distance < neighborDist) {
        steer.add(other.vector);
        count++;
      }
    }

    if (count > 0)
      steer.divideNum(count);
    if (!steer.isZero()) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer
        .normalize()
        .multiplyNum(this.maxSpeed)
        .subtract(this.vector)
        .limitLength(this.maxForce);
    }
    return steer;
  }

  // Cohesion
  // For the average location (i.e. center) of all nearby boids,
  // calculate steering vector towards that location
  cohesion(boids) {
    let sum = new Point();
    let count = 0;
    for (let i = 0, l = boids.length; i < l; i++) {
      let neighborDist = 100 * 100;
      const other = boids[i];
      if (this.same(other))
        neighborDist *= 1 + this.strength;
      const distance = this.position.distanceSq(other.position);
      if (distance > 0 && distance < neighborDist) {
        sum.add(other.position);
        count++;
      }
    }
    if (count > 0) {
      sum.divideNum(count);
      // Steer towards the location
      return this.steer(sum, false);
    }
    return sum;
  }
}
