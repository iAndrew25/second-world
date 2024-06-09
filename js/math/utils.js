function getDistance(point1, point2) {
	const a = point1.x - point2.x;
	const b = point1.y - point2.y;

	return Math.sqrt( a*a + b*b );
}
