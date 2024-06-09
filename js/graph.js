class Graph {
	constructor(points, segments) {
		this.points = points;
		this.segments = segments;
	}

	tryAddPoint(point) {
		if(!this.points.some(currentPoint => point.equals(currentPoint))) {
			this.addPoint(point);
		} else {
			console.log('tryAddPoint::failed', this.points, point);
		}
	}

	addPoint(point) {
		this.points.push(point);
	}

	removePoint(point) {
		const pointIndex = this.points.findIndex(currentPoint => currentPoint.equals(point));
		const segments = this.getSegmentsWithPoint(point);

		this.points.splice(pointIndex, 1);

		for(const segment of segments) {
			this.segments.splice(this.segments.indexOf(segment), 1);
		}
	}

	tryAddSegment(segment) {
		if(!this.segments.some(({point1, point2}) => segment.includes(point1) && segment.includes(point2))) {
			this.addSegment(segment);
		} else {
			console.log('tryAddSegment::failed', this.segments, segment);
		}
	}

	addSegment(segment) {
		this.segments.push(segment);
	}

	removeAllSegments() {
		this.segments.length = 0;
	}

	getSegmentsWithPoint(point) {
		const segments = [];

		for(const segment of this.segments) {
			if(segment.includes(point)) {
				segments.push(segment);
			}
		}

		return segments;
	}

	getClosestPoint(location, threshold = Number.MAX_SAFE_INTEGER) {
		let closestPoint = null;
		let distance = Number.MAX_SAFE_INTEGER;

		for(const point of this.points) {
			const currentDistance = getDistance(location, point);

			if(distance > currentDistance && currentDistance < threshold) {
				distance = currentDistance;
				closestPoint = point;
			}
		}

		return closestPoint;
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