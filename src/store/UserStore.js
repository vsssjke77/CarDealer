import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._id = undefined;
        this._isAuth = false;
        this._user = {};
        this._role = '';
        makeAutoObservable(this);
    }

    setId(id){
        this._id = id;
    }
    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }
    setRole(role) {
        this._role = role;
    }


    get id(){
        return this._id;
    }
    get isAuth() {
        return this._isAuth;
    }
    get isAdmin(){
        return this.role === "ADMIN";
    }
    get role(){
        return this._role;
    }
    get user(){
        return this._user;
    }
}