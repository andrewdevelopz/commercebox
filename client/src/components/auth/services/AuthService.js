/**
 * @overview: This is a service for all authentication/user actions that will be needed for the application.
 */

export const register = (user) => {
  return fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => {
      return response
    })
  .catch(err => console.log(err))
}
