const baseURL = process.env.API_BASE_URL
export default {
  async getAll(axios, cb) {
    const roles = await axios.$get(`${baseURL}/identification-card-types`)
    cb(roles)
  },
  async save(overwriteData, axios, cb) {
    const role = await axios.$post(
      `${baseURL}/identification-card-types`,
      overwriteData
    )
    cb(role)
  }
}
