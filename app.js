export default class App extends HTMLElement{
	constructor() {
		super();
		this.count = 0;

		this.countEl = document.createElement('span');
		this.button = document.createElement('button');
		this.button.textContent = '+';
		this.button.addEventListener('click', e => this.increment());
		this.append(this.countEl, this.button);
	}

	render() {
		this.countEl.textContent = this.count;
	}

	increment() {
		++this.count
		this.render();
	}

	connectedCallback() {
		this.render()
	}
}

customElements.define('el-app', App);