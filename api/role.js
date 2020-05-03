const baseURL = process.env.API_BASE_URL
export default {
  async getAll(axios, cb) {
    const roles = await axios.$get(`${baseURL}/roles`)
    cb(roles)
  },
  async save(newRole, axios, cb) {
    const role = await axios.$post(`${baseURL}/roles`, newRole)
    cb(role)
  }
}
