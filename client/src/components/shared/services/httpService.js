/**
 * @overview: This is a service for all http actions that will be needed for the application.
 */

const root = 'http://localhost:2995/api';

/**
 * Make http calls to a specific route
 * 
 * @param {*} route - the api route we are calling to e.g. Auth, Inventory, Orders, etc.
 * @param {*} path - the path we are calling to within the specific route
 * @param {*} method - the http method being used
 * @param {*} headers - the http headers to be used
 * @param {*} data - the data/body that is sent in the http request
 */
export const fetchAll = async (route, path, method, headers, data = {}) => {
    let res;
    if (method === 'get') {
        res = await fetch(`${root}/${route}/${path}`, {
            method: method.toUpperCase(),
            headers: headers
        });
    } else {
        res = await fetch(`${root}/${route}/${path}`, {
            method: method.toUpperCase(),
            body: JSON.stringify(data),
            headers: headers
        });
    }
    return res;
}

// All http calls to the auth route
export const fetchAuth = async (path, method, headers, data = {}) => {
    let res;
    if (method === 'get') {
        res = await fetch(`${root}/auth/${path}`, {
            method: method.toUpperCase(),
            headers: headers
        });
    } else {
        res = await fetch(`${root}/auth/${path}`, {
            method: method.toUpperCase(),
            body: JSON.stringify(data),
            headers: headers
        });
    }
    return res;
}

// All http calls to the inventory route
export const fetchInventory = async (path, method, headers, data = null) => {
    let res;
    if (method === 'get') {
        res = await fetch(`${root}/inventory/${path}`, {
            method: method.toUpperCase(),
            headers: headers
        });
    } else {
        res = await fetch(`${root}/inventory/${path}`, {
            method: method.toUpperCase(),
            body: JSON.stringify(data),
            headers: headers
        });
    }
    return res;
}
