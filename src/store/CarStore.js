import {makeAutoObservable} from "mobx";


export default class CarStore{
    constructor() {
        this._cars = []
        this._filters = {};
        this._statuses =
            ['available',
                'maintenance',
                'sold']
        makeAutoObservable(this);
    }


    setCars(cars) {
        this._cars = cars;
    }
    setFilters(filters) {
        this._filters = filters;
    }
    clearFilters(){
        this._filters = {};
    }

    get cars() {
        return this._cars.slice().sort((a, b) => a.id - b.id);
    }
    get filters() {
        return this._filters;
    }
    get statuses(){
        return this._statuses
    }
    async addCar(car){
        console.log(car);
        this._cars.push(car);
        console.log(this._cars);
    }

    async editCarById(carToEdit) {
        try {
            this._cars = this._cars.map(car => car.id === carToEdit.id ? carToEdit : car);

        } catch (error) {
            console.error("Failed to update car:", error);
        }
    }


}