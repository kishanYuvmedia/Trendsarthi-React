import {axiosRequest} from "./axios-base";

export const findById = (model, id, filter = {}) => {
    return axiosRequest(
        'GET',
        [model, ':id',].join('/'),
        filter,
        undefined,
        { id }
    )
}
export const find = (model, filter = {}) => {
    return axiosRequest("GET", model, filter)
}

export const create = (model, data) => {
    //console.log(data)
    return axiosRequest("POST", model,undefined, data)
}
export const findOne = (model, filter = {}) => {
    return axiosRequest(
        'GET',
        [model, 'findOne'].join('/'),
        filter
    )
}
export const updateAll = (model, filter = {}, data) => {
    //console.log(data)
    return axiosRequest(
        'POST',
        [model, 'update'].join('/'),
        filter,
        data
    );
}
export const deleteById = (model, id) => {
    return axiosRequest(
        'DELETE',
        [model, id].join('/'),
        undefined,
        undefined,
        { id }
    );
}

export const count = (model,id, where = {}) => {
    return axiosRequest(
        'GET',
        [model, 'count'].join('/'),
        where,
        undefined,
        { id },
        true
    );
}

export const updateAttributes = (model, id, data) => {
    return axiosRequest(
        'PUT',
        [model, ':id'].join('/'),
        undefined,
        data,
        { id }
    )
}

export const upsertPatch = (model,data = {}) => {
    return axiosRequest(
        'PATCH',
        model,
        undefined,
        data
    );
}


export const upsertWithWhere = (model,where = {}, data = {}) => {
    return axiosRequest(
        'POST',
        [model, 'upsertWithWhere'].join('/'),
        where,
        data,
        undefined,
        true,
    )
}


export const replaceOrCreate = (model,data = {}) => {
    return axiosRequest(
        'POST',
        [model, 'replaceOrCreate'].join('/'),
        undefined,
        data
    )
}

export const replaceById = (model,id, data = {}) => {
    return axiosRequest(
        'POST',
        [model, ':id', 'replace'].join('/'),
        undefined,
        data,
        { id }
    )
}
