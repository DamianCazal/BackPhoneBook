import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = (date) => {
  return axios
    .post(baseUrl, date)
    .then(response => response.data)
}

const deletePerson = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response.data)
}

const update = (id, data) => {
  return axios
    .put(`${baseUrl}/${id}`, data)
    .then(response => response.data)
}

export default { getAll, create, deletePerson, update }