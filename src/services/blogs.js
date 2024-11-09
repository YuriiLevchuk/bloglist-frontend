import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {token = `Bearer ${newToken}`}

const getAll = async() => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async(newBlog) => {
  const headers = { headers: { Authorization: token } }

  const res = await axios.post(baseUrl, newBlog, headers)
  return res.data
}

export default { 
  setToken,
  getAll,
  create
}