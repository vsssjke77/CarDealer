import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";


export const registration = async (username, password, role) => {
    const {data} = await $host.post('api/user/registration', {username, password, role});
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}

export const login = async (username, password) => {
    const {data} = await $host.post('api/user/login', {username, password});
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}

export const check = async () => {
    try {
        const {data} = await $authHost.get('api/user/auth');
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token);
    } catch (e) {
        throw new Error(e.response?.data?.message || "Ошибка при аутентификации");
    }


}


