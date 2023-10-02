class Graph {
	constructor(points, segments) {
		this.points = points;
		this.segments = segments;
	}

	addPoint(point) {
		this.points.push(point);
	}

	addSegment(segment) {
		this.segments.push(segment);
	}

	removeAllSegments() {
		this.segments.length = 0;
	}

	draw(ctx) {
		for(const point of this.points) {
			point.draw(ctx);
		}

		for(const segment of this.segments) {
			segment.draw(ctx);
		}
	}
}