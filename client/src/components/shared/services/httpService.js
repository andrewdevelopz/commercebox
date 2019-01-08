/**
 * @overview: This is a service for all http actions that will be needed for the application.
 */

const root = 'http://localhost:3000/api'

// All http calls to the auth route
export const fetchAuth = (path, method, data, headers) => {
  return fetch(`${root}/auth/${path}`, {
    method: method.toUpperCase(),
    body: JSON.stringify(data),
    headers: headers
  }).then(res => res.json())
    .then(response => {
      return response
    })
  .catch(err => console.log(err))
}
