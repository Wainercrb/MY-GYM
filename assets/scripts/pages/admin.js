import { mapState, mapActions } from 'vuex'

export default {
  layout: 'admin',
  computed: mapState({
    products: (state) => state.modules.user.users
  }),
  methods: mapActions('modules/user', ['addProductToCart']),
  created() {
    this.$store.dispatch('modules/user/getAllProducts')
  }
}
