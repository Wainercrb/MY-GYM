const baseURL = process.env.API_BASE_URL
export default {
  async getRoles(axios, cb) {
    const roles = await axios.$get(`${baseURL}/roles`)
    cb(roles)
  },
  async saveRole(overwriteRole, axios, cb) {
    const role = await axios.$post(`${baseURL}/roles`, overwriteRole)
    cb(role)
  }
}
