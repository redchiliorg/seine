/**
 * @description Convert polar coordinates to cartesian.
 * @param {number} centerX
 * @param {number} centerY
 * @param {number} radius
 * @param {number} angleInDegrees
 * @returns {[number, number]}
 */
export function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return [
    centerX + radius * Math.cos(angleInRadians),
    centerY + radius * Math.sin(angleInRadians),
  ];
}

/**
 * @description Build svg path of circle segment.
 * @param {number} x coordinate of central point
 * @param {number} y coordinate of central point
 * @param {number} radius of circle
 * @param {number} startAngle of segment in degrees
 * @param {number} endAngle of segment in degrees
 * @returns {string}
 */
export function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

  return `M ${start[0]} ${start[1]} A ${radius} ${radius} 0 ${arcSweep} 0${
    end[0]
  } ${end[1]} L ${x} ${y} L ${start[0]} ${start[1]}`;
}
