import {makeAutoObservable} from "mobx";

export default class ModelStore{
    constructor() {
        this._models = []
        this._modelsForBrand = []

        makeAutoObservable(this);
    }

    setModels(model) {
        this._models = model;
    }
    setModelsForBrand(model) {
        this._modelsForBrand = model;
    }

    get models() {
        return this._models.slice().sort((a, b) => a.id - b.id);
    }
    get modelsForBrand() {
        return this._modelsForBrand.slice().sort((a, b) => a.id - b.id);
    }
    getModelTitleById(id) {
        const model = this._models.find(model => model.id === id);
        return model ? model.title : null;
    }

}