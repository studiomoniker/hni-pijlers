const sqrt = Math.sqrt;
const POSITIONX = 0;
const POSITIONY = 1;
const SPEEDX = 2;
const SPEEDY = 3;
const ACCELERATIONX = 4;
const ACCELERATIONY = 5;

export default class Boids {
  constructor(opts={}) {
    this.speedLimitRoot = opts.speedLimit || 0;
    this.accelerationLimitRoot = opts.accelerationLimit || 1;
    this.speedLimit = Math.pow(this.speedLimitRoot, 2);
    this.accelerationLimit = Math.pow(this.accelerationLimitRoot, 2);
    this.separationDistance = Math.pow(opts.separationDistance || 60, 2);
    this.alignmentDistance = Math.pow(opts.alignmentDistance || 180, 2);
    this.cohesionDistance = Math.pow(opts.cohesionDistance || 180, 2);
    this.separationForce = opts.separationForce || 0.15;
    this.cohesionForce = opts.cohesionForce || 0.1;
    this.alignmentForce = opts.alignmentForce || opts.alignment || 0.25;
    this.attractors = opts.attractors || [];
    this.boids = opts.boids.map((boid) => [
      boid[0], boid[1], // position
      0, 0, // speed
      0, 0 // acceleration
    ]);
    this.size = opts.size;
    console.log(this.size);
  }

  tick() {
    var boids = this.boids;
    var sepDist = this.separationDistance;
    var sepForce = this.separationForce;
    var cohDist = this.cohesionDistance;
    var cohForce = this.cohesionForce;
    var aliDist = this.alignmentDistance;
    var aliForce = this.alignmentForce;
    var speedLimit = this.speedLimit;
    var accelerationLimit = this.accelerationLimit;
    var accelerationLimitRoot = this.accelerationLimitRoot;
    var speedLimitRoot = this.speedLimitRoot;
    var boidCount = boids.length;
    var current;
    var sforceX, sforceY;
    var cforceX, cforceY;
    var aforceX, aforceY;
    var spareX, spareY;
    var attractors = this.attractors;
    var attractorCount = attractors.length;
    var distSquared;
    var boid;
    var length;
    var target;
    var ratio;
    var attractor;
    var radius = 1;
    var [width, height] = this.size;

    current = boidCount;
    while (current--) {
      sforceX = sforceY = cforceX = cforceY = aforceX = aforceY = 0;
      boid = boids[current];

      // Attractors
      target = attractorCount;
      while (target--) {
        attractor = attractors[target];
        spareX = boid[0] - attractor[0];
        spareY = boid[1] - attractor[1];
        distSquared = spareX*spareX + spareY*spareY;

        if (distSquared < attractor[2] * attractor[2]) {
          length = sqrt(spareX * spareX + spareY * spareY);
          boid[SPEEDX] -= (attractor[3] * spareX / length) || 0;
          boid[SPEEDY] -= (attractor[3] * spareY / length) || 0;
        }
      }

      target = boidCount;
      while (target--) {
        if (target === current) continue;
        spareX = boid[0] - boids[target][0];
        spareY = boid[1] - boids[target][1];
        distSquared = spareX * spareX + spareY * spareY;

        if (distSquared < sepDist) {
          sforceX += spareX;
          sforceY += spareY;
        } else {
          if (distSquared < cohDist) {
            cforceX += spareX;
            cforceY += spareY;
          }
          if (distSquared < aliDist) {
            aforceX += boids[target][SPEEDX];
            aforceY += boids[target][SPEEDY];
          }
        }
      }

      // Separation
      length = sqrt(sforceX * sforceX + sforceY * sforceY);
      boid[ACCELERATIONX] += (sepForce * sforceX / length) || 0;
      boid[ACCELERATIONY] += (sepForce * sforceY / length) || 0;
      // Cohesion
      length = sqrt(cforceX * cforceX + cforceY * cforceY);
      boid[ACCELERATIONX] -= (cohForce * cforceX / length) || 0;
      boid[ACCELERATIONY] -= (cohForce * cforceY / length) || 0;
      // Alignment
      length = sqrt(aforceX * aforceX + aforceY * aforceY);
      boid[ACCELERATIONX] -= (aliForce * aforceX / length) || 0;
      boid[ACCELERATIONY] -= (aliForce * aforceY / length) || 0;
    }

    // Apply speed/acceleration for
    // this tick
    current = boidCount;
    while (current--) {
      boid = boids[current];
      if (accelerationLimit) {
        distSquared = boid[ACCELERATIONX] * boid[ACCELERATIONX] + boid[ACCELERATIONY] * boid[ACCELERATIONY];
        if (distSquared > accelerationLimit) {
          ratio = accelerationLimitRoot / sqrt(distSquared);
          boid[ACCELERATIONX] *= ratio;
          boid[ACCELERATIONY] *= ratio;
        }
      }

      boid[SPEEDX] += boid[ACCELERATIONX];
      boid[SPEEDY] += boid[ACCELERATIONY];

      if (speedLimit) {
        distSquared = boid[SPEEDX] * boid[SPEEDX] + boid[SPEEDY] * boid[SPEEDY];
        if (distSquared > speedLimit) {
          ratio = speedLimitRoot / sqrt(distSquared);
          boid[SPEEDX] *= ratio;
          boid[SPEEDY] *= ratio;
        }
      }

      boid[POSITIONX] += boid[SPEEDX];
      boid[POSITIONY] += boid[SPEEDY];
    }

    current = boidCount;
    while (current--) {
      boid = boids[current];
      if (boid[POSITIONX] < -radius)         boid[POSITIONX] =  width  + radius;
      if (boid[POSITIONY] < -radius)         boid[POSITIONY] =  height + radius;
      if (boid[POSITIONX] > width + radius)  boid[POSITIONX] = -width  - radius;
      if (boid[POSITIONY] > height + radius) boid[POSITIONY] = -height - radius;
      if (boid[POSITIONX] < -radius)         boid[POSITIONX] =  width  + radius;
      if (boid[POSITIONY] < -radius)         boid[POSITIONY] =  height + radius;
      if (boid[POSITIONX] > width + radius)  boid[POSITIONX] = -width  - radius;
      if (boid[POSITIONY] > height + radius) boid[POSITIONY] = -height - radius;
    }

    // if (boid[POSITIONX] < -radius) vector.x = size.width + radius;
    // if (boid[POSITIONY]y < -radius) vector.y = size.height + radius;
    // if (boid[POSITIONX] > size.width + radius) vector.x = -size.width -radius;
    // if (boid[POSITIONY]y > size.height + radius) vector.y = -size.height -radius;
    // if (!vector.isZero()) {
    //   this.position += vector;
    //   var segments = this.path.segments;
    //   for (var i = 0; i < this.amount; i++) {
    //     segments[i].point += vector;
    //   }
    // }

  }
}