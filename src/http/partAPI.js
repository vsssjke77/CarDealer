import {$authHost, $host} from "./index";



export const createPart = async (name, price) => {
     const {data} = await $authHost.post('api/part', {name, price});
     return data;
}

export const fetchParts = async () => {
     const {data} = await $host.get('api/part');
     return data
}

export const fetchOnePart = async (id) => {
     const {data} = await $authHost.get('api/part' + id);
     return data;
}
export const updatePart = async (id,name,price) => {
     const {data} = await $authHost.put(`api/part/${id}`,{name,price});
     return data;
}
export const deletePart = async (id) => {
     const {data} = await $authHost.delete(`api/part/${id}`);
     return data;
}


