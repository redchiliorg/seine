/** Функция вычисления координат угла */
export function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return [
    centerX + radius * Math.cos(angleInRadians),
    centerY + radius * Math.sin(angleInRadians),
  ];
}

/** Функция вычисления координат для параметра d в пути у диаграмм */
export function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

  return (
    `M ${start[0]} ${start[1]} A ${radius} ${radius} 0 ${arcSweep} 0` +
    `${end[0]} ${end[1]} L ${x} ${y} L ${start[0]} ${start[1]}`
  );
}
