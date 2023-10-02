class WorldEditor {
	constructor(canvas, graph) {
		this.graph = graph;
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

		this.#addEventListeners();
	}

	#addEventListeners() {
		this.#handleOnMouseMove();
		this.#handleOnMouseDown();
	}

	#handleOnMouseDown() {
		this.canvas.addEventListener('mousedown', ({offsetX, offsetY}) => {
			const point = new Point(offsetX, offsetY);
			
			this.graph.addPoint(point);
		});
	}

	#handleOnMouseMove() {
		this.canvas.addEventListener('mousemove', ({offsetX, offsetY}) => {
			// const point = new Point(offsetX, offsetY);
			// console.log("point", point);

			// this.graph.addPoint(point);
			// console.log("event", offsetX, offsetY);
		});
	}

	run() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.graph.draw(this.ctx);

		requestAnimationFrame(this.run.bind(this));
	}
}