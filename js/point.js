class Point {
	constructor(x, y, { size, debugText, debugTextOffset = 10 } = {}) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.debugText = debugText;
		this.debugTextOffset = debugTextOffset;
	}

	equals(point) {
		return this.x == point.x && this.y == point.y;
	}

	draw(ctx, {size = 18, color = 'black', isSelected = false, isHovered = false} = {}) {
		ctx.beginPath();
		ctx.fillStyle = 'white';

		if(isSelected) {
			ctx.arc(this.x, this.y, (this.size || size) / 3, 0, 2 * Math.PI);
		} else if(isHovered) {
			ctx.arc(this.x, this.y, (this.size || size) / 5, 0, 2 * Math.PI);
		} else {
			ctx.fillStyle = color;
			ctx.arc(this.x, this.y, (this.size || size) / 2, 0, 2 * Math.PI);
		}

		if(this.debugText) {
			ctx.fillText(this.debugText, this.x + this.debugTextOffset, this.y - this.debugTextOffset);	
		}

		ctx.fill();
	}
}