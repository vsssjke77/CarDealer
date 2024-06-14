import {$authHost, $host} from "./index";



export const createMaintenance = async (install_date, count, car_id, part_id) => {
     const {data} = await $authHost.post('api/maintenance', {install_date, count, car_id, part_id});
     return data;
}

export const fetchMaintenances = async () => {
     const {data} = await $host.get('api/maintenance');
     return data
}

export const fetchMaintenancesForCar = async (car_id) => {
     const {data} = await $authHost.get('api/maintenance?car_id=' + car_id);
     return data;
}
export const updateMaintenance = async (id,install_date,count,car_id,part_id) => {

     const {data} = await $authHost.put(`api/maintenance/${id}` , {install_date, count, car_id, part_id});
     return data;
}
export const deleteMaintenance = async (id) => {
     const {data} = await $authHost.delete('api/maintenance/' + id);
     return data;
}


