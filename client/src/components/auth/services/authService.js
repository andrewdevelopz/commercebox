/**
 * @overview: This is a service for all authentication/user actions that will be needed for the application.
 */

export const loadToken = () => {
  const token = localStorage.getItem('id_token')
  return token
}

export const storeUserLocalStorage = (token) => {
  // Store the json web token into local storage
  localStorage.setItem('id_token', token)
}

export const clearUserLocalStorage = () => {
  // Clear local storage
  localStorage.clear()
}
