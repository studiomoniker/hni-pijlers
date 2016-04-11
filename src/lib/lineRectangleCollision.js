module.exports = lineRectangleCollision;

// The Liang-Barsky algorithm for line-rectangle collisions
// https://gist.github.com/ChickenProp/3194723
function lineRectangleCollision(lineP1, lineP2, rectCenter, rectSize) {
  var x = lineP1.x;
  var y = lineP1.y;
  var vx = lineP2.x - x;
  var vy = lineP2.y - y;
  var p = [-vx, vx, -vy, vy];
  var left = rectCenter.x - rectSize.width * 0.5;
  var top = rectCenter.y - rectSize.height * 0.5;
  var q = [
    x - left,
    (left + rectSize.width) - x,
    y - top,
    (top + rectSize.height) - y
  ];
  var u1 = Number.NEGATIVE_INFINITY;
  var u2 = Number.POSITIVE_INFINITY;

  for (var i = 0; i < 4; i++) {
    if (p[i] === 0) {
      if (q[i] < 0)
        return false;
    } else {
      var t = q[i] / p[i];
      if (p[i] < 0 && u1 < t)
        u1 = t;
      else if (p[i] > 0 && u2 > t)
        u2 = t;
    }
  }

  if (u1 > u2 || u1 > 1 || u1 < 0)
    return false;

  return {
    x: x + u1 * vx,
    y: y + u1 * vy
  };
}
