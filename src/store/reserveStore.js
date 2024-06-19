import {makeAutoObservable} from "mobx";

export default class ReserveStore{
    constructor() {
        this._reserves = []
        this._reservesForCar = []
        this._reservesForUser = []
        makeAutoObservable(this);
    }

    setReserves(reserves) {
        this._reserves = reserves;
    }
    setReservesForCar(reserves) {
            this._reservesForCar = reserves;
        }
    setReservesForUser(reserves) {
        this._reservesForUser = reserves;
    }
    get reserves() {
        return this._reserves.slice().sort((a, b) => a.id - b.id);
    }


    get reservesForCar() {
        return this._reservesForCar.slice().sort((a, b) => a.id - b.id);
    }
    get reservesForUser() {
        return this._reservesForUser.slice().sort((a, b) => a.id - b.id);
    }


    /*getModelTitleById(id) {
        const reserve = this.reserves.find(model => model.id === id);
        return reserve ? reserve.title : null;
    }*/

}