import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('token')) },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async blog => {
  const config = {
    headers: { Authorization: 'Bearer ' + JSON.parse(window.localStorage.getItem('token')) },
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: 'Bearer ' + JSON.parse(window.localStorage.getItem('token')) },
  }
  const request = axios.patch(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: 'Bearer ' + JSON.parse(window.localStorage.getItem('token')) },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}
export default { getAll, setToken, create, update,remove }