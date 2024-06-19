import {$authHost, $host} from "./index";



export const createModel = async (title,brand_id) => {
     const {data} = await $authHost.post('api/model', {title,brand_id});
     return data;
}

export const fetchModels = async () => {
     const {data} = await $host.get('api/model');
     return data
}

export const fetchModelsForBrand = async (brand_id) => {
     const {data} = await $host.get('api/model?brand_id=' + brand_id);
     return data
}

export const updateModel = async (id, title,brand_id) => {
     const {data} = await $authHost.put('api/model/' + id, {title,brand_id});
     return data;
}

export const deleteModel = async (id) => {
     const {data} = await $authHost.delete(`api/model/${id}`);
     return data;
}

