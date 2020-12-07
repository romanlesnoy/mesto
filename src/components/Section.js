export class Section {
    constructor( container){
        this._container = container;
    }

    addItem (element) {
        this._container.prepend(element);
    }
}