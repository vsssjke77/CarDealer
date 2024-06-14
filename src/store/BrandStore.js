import {makeAutoObservable} from "mobx";

export default class BrandStore{
    constructor() {
        this._brands = []
        makeAutoObservable(this);
    }

    setBrands(brands) {
        this._brands = brands;
    }

    get brands() {
        return this._brands.slice().sort((a, b) => a.id - b.id);
    }
    getBrandTitleById(id) {
        const brand = this._brands.find(brand => brand.id === id);
        return brand ? brand.title : null;
    }

}