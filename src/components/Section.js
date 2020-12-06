export class Section {
    constructor(renderer, container){
        this._renderer = renderer,
        this._container = container;
    }

    render (data) {
        data.forEach(element => {
            this._renderer(element);
        });
    }

    addItem (element) {
        this._container.prepend(element);
    }
}