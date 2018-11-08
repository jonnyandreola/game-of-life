import Coordinates from "./Coordinates.js";

export default class Cell extends Coordinates {
	constructor(props) {
		super(props)
		this._isAlive = props.isAlive
		this.hadLife = props.isAlive
	}

	set isAlive(value) {
		this._isAlive = value
		if (value) {
			this.hadLife = true
		}
	}

	get isAlive() {
		return this._isAlive
	}

	draw(land) {
		land.fillStyle = this.isAlive ? '#000000' : this.hadLife ? '#cccccc' : 'white'
		land.fillRect(this.drawX, this.drawY, this.size, this.size)
	}
}