import {$authHost, $host} from "./index";



export const createCar = async (car) => {
     const {data} = await $authHost.post('api/car', car);
     return data;
}

export const fetchCars = async () => {
     const {data} = await $host.get('api/car');
     return data
}
export const fetchCarsForUser = async (user_id) => {
     const {data} = await $host.get('api/car?user_id=' + user_id);
     return data
}

export const fetchOneCar = async (id) => {
     const {data} = await $host.get('api/car/' + id);
     return data;
}

export const updateCar = async (id, car) => {
     const {data} = await $authHost.put(`api/car/${id}`, car);
     return data;
}

export const deleteCar = async (id,car) => {
     const {data} = await $authHost.delete(`api/car/${id}`, car);
     return data;
}


