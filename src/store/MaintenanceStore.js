import {makeAutoObservable} from "mobx";

export default class MaintenanceStore{
    constructor() {
        this._maintanances = []
        makeAutoObservable(this);
    }

    setMaintenance(maintenances) {
        this._maintenances = maintenances;
    }

    get maintenances() {
        return this._maintanances;
    }

    getAllMaintenancesByCarId(carId) {
        const all = this._maintanances.filter(maintenance => maintenance.car_id === carId);
        return all ? all : [];
    }

}