import Cell from './Cell.js'

export default class Board extends HTMLElement {
	constructor() {
		super()

		this.landWidth = 300
		this.landHeight = 200
		this.cellSize = 4
		this.lifeProbability = 0.01
		this.speed = 16
		this.cells = this.populate()

		this.landCanvas = document.createElement('canvas')
		this.landCanvas.width = this.landWidth * this.cellSize
		this.landCanvas.height = this.landHeight * this.cellSize
		this.append(this.landCanvas)
		this.land = this.landCanvas.getContext('2d')
	}

	populate() {
		const rows = []
		for (let r = 0; r < this.landHeight; r++) {
			const cells = []
			for (let c = 0; c < this.landWidth; c++) {
				cells.push(new Cell({
					isAlive: this.getRandomAlive(),
					size: this.cellSize,
					x: c,
					y: r
				}))
			}
			rows.push(cells)
		}

		return rows
	}

	getRandomAlive() {
		return Math.random() <= this.lifeProbability
	}

	eachCell(callback) {
		for (let r = 0; r < this.landHeight; r++) {
			for (let c = 0; c < this.landWidth; c++) {
				callback(this.cells[r][c])
			}
		}
	}

	updateGeneration(cell) {
		let neighbors = cell.neighbors;
		let aliveNeighbors = 0

		neighbors.forEach(n => {

			// exclude off land neighbors
			if (n.x < 0 || n.y < 0 || n.x >= this.landHeight || n.y >= this.landWidth) {
				return
			}

			if (this.cells[n.x][n.y].isAlive) {
				aliveNeighbors++
			}
		});

		// For a space that isAlive:
		// Each cell with one or no neighbors dies, as if by solitude.
		// Each cell with four or more neighbors dies, as if by overpopulation.
		if (cell.isAlive && (aliveNeighbors > 3 || aliveNeighbors < 2)) {
			cell.isAlive = false
		}

		// For a space that is no isAlive
		// Each cell with three neighbors becomes populated.
		else if (!cell.isAlive && aliveNeighbors === 3) {
			cell.isAlive = true
		}
	}

	draw() {
		this.eachCell(cell => {
			this.updateGeneration(cell)
			cell.draw(this.land)
		})
	}

	cycle() {
		this.draw()
		requestAnimationFrame(() => this.cycle())
	}

	connectedCallback() {
		this.cycle()
	}
}

customElements.define('game-life', Board)