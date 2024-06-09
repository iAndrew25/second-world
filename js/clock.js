class Clock {
	constructor(canvas, size, offsets) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

		this.graph = null;
		this.size = size;
		this.offsets = offsets;
		this.points = [];
		this.segments = [];

		this.#generatePoints();
		this.#generateSegments();

		this.graph = new Graph(this.points, this.segments);
	}

	#generatePoints() {
		const numbersOnClock = 60;
		const numbersOffset = numbersOnClock/4;

		for (let i = 1; i <= numbersOnClock; i++) {
			const angle = (i - numbersOffset) * (Math.PI * 2) / numbersOnClock;
			const x = this.offsets.x + this.size / 2 * Math.cos(angle);
			const y = this.offsets.y + this.size / 2 * Math.sin(angle);
			const size = i % 5 === 0 ? 16 : 4;

			if(i === numbersOnClock) {
				this.points.unshift(new Point(x, y, {size}));
			} else {
				this.points.push(new Point(x, y, {size}));
			}
		}

		// center point
		this.points.push(new Point(this.canvas.width / 2, this.canvas.height / 2));
	}

	#generateSegments() {
		const date = new Date();

		const hourIndex = (date.getHours() % 12) * 5;
		const minutesIndex = date.getMinutes();
		const secondsIndex = date.getSeconds();

		this.segments.push(new Segment(this.points[60], this.points[hourIndex], 8));
		this.segments.push(new Segment(this.points[hourIndex], this.points[minutesIndex], 4));
		this.segments.push(new Segment(this.points[minutesIndex], this.points[secondsIndex], 2));
	}

	run() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.graph.removeAllSegments();
		this.#generateSegments();
		this.graph.draw(this.ctx);

		requestAnimationFrame(this.run.bind(this));		
	}
}