class WorldEditor {
	constructor(canvas, graph) {
		this.graph = graph;
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

		this.isDragging = false;
		this.selected = null;
		this.hovered = null;

		this.#addEventListeners();
	}

	#addEventListeners() {
		this.#handleOnMouseUp();
		this.#handleOnMouseDown();
		this.#handleOnMouseMove();
		this.#handleOnContextMenu();
	}

	#handleOnMouseDown() {
		this.canvas.addEventListener('mousedown', ({offsetX, offsetY, button}) => {
			if(button === 0) {
				const point = new Point(offsetX, offsetY);
				const selectedPoint = this.graph.getClosestPoint(point, 20);
				this.isDragging = true;

				if(!selectedPoint) {
					this.graph.tryAddPoint(point);

					if(this.selected) {
						this.graph.tryAddSegment(new Segment(point, this.selected))
					}

					this.selected = point;
					this.hovered = point;
				} else {
					if(this.selected) {
						this.graph.tryAddSegment(new Segment(selectedPoint, this.selected))
					}

					this.selected = selectedPoint;
					this.hovered = selectedPoint;
				}
			} else if(button === 2) {
				if(this.hovered == this.selected || !this.selected) {
					this.#removePoint(this.hovered);
				}

				this.selected = null;
			}
		});
	}

	#handleOnMouseUp() {
		this.canvas.addEventListener('mouseup', ({offsetX, offsetY, button}) => {
			this.isDragging = false;
		});
	}	

	#handleOnMouseMove() {
		this.canvas.addEventListener('mousemove', ({offsetX, offsetY}) => {
			this.hovered = this.graph.getClosestPoint({x: offsetX, y: offsetY}, 20);
			
			if(this.isDragging) {
				this.selected.x = offsetX;
				this.selected.y = offsetY;
			}
			// const point = new Point(offsetX, offsetY);
			// console.log("point", point);

			// this.graph.tryAddPoint(point);
			// console.log("event", offsetX, offsetY);
		});
	}

	#handleOnContextMenu() {
		this.canvas.addEventListener('contextmenu', event => {
			event.preventDefault();
		});
	}

	#removePoint(point) {
		this.graph.removePoint(point);
		this.hovered = null;
	}

	run() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.graph.draw(this.ctx);
		this.selected?.draw(this.ctx, {isSelected: true})
		this.hovered?.draw(this.ctx, {isHovered: true});

		requestAnimationFrame(this.run.bind(this));
	}
}