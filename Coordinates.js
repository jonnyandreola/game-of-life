export default class Coordinates {
	constructor(props) {
		this.x = props.x
		this.y = props.y
		this.size = props.size
		this.drawX = this.x * this.size
		this.drawY = this.y * this.size
		this.neighbors = this.getNeighbors()
	}

	getNeighbors() {
		let xAxis = [this.x - 1, this.x, this.x + 1]
		let yAxis = [this.y - 1, this.y, this.y + 1]
		let neighbors = []

		for (let y = 0; y < 3; y++) {
			for (let x = 0; x < 3; x++) {
				// exclude itself
				if (y !== this.x || x !== this.y) {
					neighbors.push({x: yAxis[y], y: xAxis[x]})
				}

			}
		}

		return neighbors
	}
}