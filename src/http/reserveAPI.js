import {$authHost, $host} from "./index";



export const createReserve = async (start_date,end_date,user_id,car_id) => {
     const {data} = await $authHost.post('api/reserve', {start_date,end_date,user_id,car_id});
     return data;
}

export const fetchReserves = async () => {
     const {data} = await $authHost.get('api/reserve');
     return data
}

export const fetchReservesForUser = async user_id => {
     const {data} = await $authHost.get('api/reserve?user_id=' + user_id);
     return data
}
export const fetchReservesForCar = async (car_id) => {
     const {data} = await $authHost.get('api/reserve?car_id=' + car_id);
     return data
}

export const updateModel = async (id,start_date,end_date,user_id,car_id) => {
     const {data} = await $authHost.put('api/reserve/' + id, {start_date,end_date,user_id,car_id});
     return data;
}

export const deleteReserve = async (id) => {
     const {data} = await $authHost.delete(`api/reserve/${id}`);
     return data;
}

