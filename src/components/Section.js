export class Section {
    constructor({items, renderer}, container){
        this._items = items,
        this._renderer = renderer,
        this._container = container;
    }

    render () {
        this._items.forEach(element => {
            this._renderer(element)
        });
    }

    addItem (element) {
        this._container.prepend(element);
    }
}