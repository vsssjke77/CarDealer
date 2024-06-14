import {$authHost, $host} from "./index";



export const createBrand = async (title) => {
     const {data} = await $authHost.post('api/brand', {title});
     return data;
}

export const fetchBrands = async () => {
     const {data} = await $host.get('api/brand');
     return data
}

export const updateBrand = async (id, title) => {
     const {data} = await $authHost.put('api/brand/' + id, {title});
     return data;
}

export const deleteBrand = async (id) => {
     const {data} = await $authHost.delete(`api/brand/${id}`);
     return data;
}

