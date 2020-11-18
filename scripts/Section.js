export class Section {
    constructor({items, renderer}, container){
        this._items = items,
        this._renderer = renderer,
        this._container = container;
    }

    clear() {
        this._container.textContent = '';
    }

    render () {
        this.clear();
        this._items.forEach(element => {
            this._renderer(element)
        });
    }

    addItem (element) {
        console.log(element);
        this._container.prepend(element);
    }
}