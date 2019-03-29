/**
 * @overview: This is a service for all http actions that will be needed for the application.
 */

const root = 'http://localhost:3000/api';

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
    return res.json();
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
    return res.json();
}
