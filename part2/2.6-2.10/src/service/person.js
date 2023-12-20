import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = 'api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id) => {
  const request = axios.patch(`${baseUrl}/${id.id}`,
  {
    "number" : id.number
  })
  request.then(response => response.data)
          .catch(error => {
                    console.log('fail')
                    return error
                  })
  return request
}

const poista = (id)=> {
    const request = axios.delete(`${baseUrl}/${id}`)
    
    return request.then(response => response.data)
                  .catch(error => {
                    console.log('fail')
                    return error
                  })
                  


}
const muuttujat = {
    getAll,
    create,
    update,
    poista
}

export default muuttujat