/**
 * @overview: This is a service for all http actions that will be needed for the application.
 */

const root = 'http://localhost:3000/api'

// All http calls to the auth route
export const fetchAuth = async (path, method, data, headers) => {
    const res = await fetch(`${root}/auth/${path}`, {
        method: method.toUpperCase(),
        body: JSON.stringify(data),
        headers: headers
    })

    return res.json()
}
