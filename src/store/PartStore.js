import {makeAutoObservable} from "mobx";

export default class PartStore{
    constructor() {
        this._parts = []
        makeAutoObservable(this);
    }

    setParts(parts) {
        this._parts = parts;
    }

    get parts() {
        return this._parts.slice().sort((a, b) => a.id - b.id);
    }
    getPartNameById(id) {
        const part = this._parts.find(part => part.id === id);
        return part ? part.name : null;
    }

    getPartPriceById(id) {
        const part = this._parts.find(part => part.id === id);
        return part ? part.price : null;
    }

}