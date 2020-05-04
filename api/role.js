const baseURL = process.env.API_BASE_URL
export default {
  async getAll(axios, cb) {
    const roles = await axios.$get(`${baseURL}/roles`)
    cb(roles)
  },
  async save(role, axios, cb) {
    const rsRole = await axios.$post(`${baseURL}/roles`, role)
    cb(rsRole)
  },
  async update(role, axios, cb) {
    const id = role._id
    const rsRole = await axios.$put(`${baseURL}/roles/${id}`, role)
    cb(rsRole)
  }
}
