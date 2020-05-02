export default {
  async getUsers(cb, axios) {
    const baseURL = process.env.API_BASE_URL
    const users = await axios.$get(`${baseURL}/users`)
    cb(users)
  },

  buyProducts(products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      Math.random() > 0.5 || navigator.webdriver ? cb() : errorCb()
    }, 100)
  }
}
