import Point from '@studiomoniker/point';

export default class Boid {
  constructor ({ position, maxSpeed, maxForce, radius, wallMargin }) {
    this.acceleration = new Point();
    this.velocity = Point.randomVector();
    this.position = position.clone();
    this.averagePosition = position.clone();
    this.radius = radius;
    this.maxSpeed = maxSpeed;
    this.maxSpeedSq = maxSpeed * maxSpeed;
    this.maxForce = maxForce;
    this.desiredSeperation = 100 * 100;
    this.wallMargin = wallMargin || 0;
  }

  tick(boids, size) {
    this.flock(boids);
    this.update();
    this.bounceBorder(size);
  }

  // We accumulate a new acceleration each time based on three rules
  flock(boids) {
    const separation = this.separationVector(boids);
    const alignment = this.alignmentVector(boids);
    const cohesion = this.cohesionVector(boids);

    separation.multiplyNum(2.0);
    alignment.multiplyNum(1.0);
    cohesion.multiplyNum(1.0);

    this.acceleration
      .add(separation)
      .add(alignment)
      .add(cohesion);
  }

  update() {
    // Update velocity
    this.acceleration
      .limitLength(this.maxForce);
    this.velocity
      .add(this.acceleration)
      .limitLength(this.maxSpeed);
    this.position.add(this.velocity);
    this.averagePosition.mix(this.position, 0.2);
    // Reset acceleration to 0 each cycle
    this.acceleration.zero();
  }

  predictVectorTo(boid) {
    var lookAheadTime = this.position.getDistanceSquared(boid.position) / this.maxSpeedSq;

    return boid.velocity.clone()
      .multiplyNum(lookAheadTime);
  }

  pursueBoid(boid) {
    var predictedTarget = this.predictVectorTo(boid).add(boid.position);
    this.arrive(predictedTarget);
    return this;
  }

  evadeBoid(boid) {
    var predictedTarget = this.predictVectorTo(boid).add(boid.position);
    this.flee(predictedTarget);
    return this;
  }

  flee(target) {
    const vector = this.seekVector(target).inverse();
    this.acceleration.add(vector);
  }

  arrive(target) {
    const vector = this.steerVector(target, true);
    this.acceleration.add(vector);
  }

  bounceBorder(size) {
    const position = this.position;
    const radius = this.radius;
    if (position.x < radius + this.wallMargin)
      this.velocity.addX(1);
    if (position.y < radius + this.wallMargin)
      this.velocity.addY(1);
    if (position.x > size.x - radius - this.wallMargin)
      this.velocity.addX(-1);
    if (position.y > size.y - radius - this.wallMargin)
      this.velocity.addY(-1);
  }

  seekVector(target) {
    return this.position.getVector(target)
      .normalize(this.maxSpeed)
      .subtract(this.velocity)
      .limitLength(this.maxForce);
  }

  // A method that calculates a steering vector towards a target
  // Takes a second argument, if true, it slows down as it approaches
  // the target
  steerVector(target, slowdown) {
    const desired = this.position.vector(target);
    const distance = desired.length;
    // Two options for desired vector magnitude
    // (1 -- based on distance, 2 -- maxSpeed)

    // This damping is somewhat arbitrary:
    desired.normalize(
      (slowdown && distance < 100)
        ? this.maxSpeed * (distance / 100)
        : this.maxSpeed
    );

    // Steering = Desired minus Velocity
    return desired
      .subtract(this.velocity)
      .limitLength(this.maxForce); // Limit to maximum steering force
  }

  isSame(boid) {
    return this.name === boid.name && this.maxForce > boid.maxForce;
  }

  // Checks for nearby boids and steers away
  separationVector(boids) {
    let sum = new Point();
    let count = 0;
    const vector = new Point();
    // For every boid in the system, check if it's too close
    for (let i = 0, l = boids.length; i < l; i++) {
      const other = boids[i];
      vector.copy(this.position).subtract(other.position);
      let distance = vector.getLengthSquared();
      let same = this.isSame(other);
      if (same && distance < this.desiredSeperation * 2) {
        this.evadeBoid(other);
      // If the distance is greater than 0 and less than an arbitrary amount
      // (0 when you are yourself)
 
      } else if (distance > 0 && distance < this.desiredSeperation) {
        // Calculate vector pointing away from neighbor
        sum.add(vector.normalize());
        count++;
      }
    }
    // Average -- divide by how many
    if (count > 0)
      sum.divideNum(count);
    if (!sum.isZero()) {
      // Implement Reynolds: Steering = Desired - Velocity
      sum
        .normalize(this.maxSpeed)
        .subtract(this.velocity)
        .limitLength(this.maxForce);
    }
    return sum;
  }

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  alignmentVector(boids) {
    let sum = new Point();
    let count = 0;
    for (let i = 0, l = boids.length; i < l; i++) {
      const other = boids[i];
      let distance = this.position.getDistanceSquared(other.position);
      if (distance > 0 && distance < this.desiredSeperation) {
        sum.add(other.velocity);
        count++;
      }
    }

    if (count > 0)
      sum.divideNum(count);
    if (!sum.isZero()) {
      // Implement Reynolds: Steering = Desired - Velocity
      sum
        .normalize(this.maxSpeed)
        .subtract(this.velocity)
        .limitLength(this.maxForce);
    }
    return sum;
  }

  // Cohesion
  // For the average location (i.e. center) of all nearby boids,
  // calculate steering vector towards that location
  cohesionVector(boids) {
    let sum = new Point();
    let count = 0;
    for (let i = 0, l = boids.length; i < l; i++) {
      const other = boids[i];
      const distance = this.position.getDistanceSquared(other.position);
      if (other !== this && distance < this.desiredSeperation) {
        sum.add(other.position);
        count++;
      }
    }
    if (count > 0) {
      sum.divideNum(count);
      // Steer towards the location
      return this.seekVector(sum);
    }
    return sum;
  }
}