import { mapState, mapActions } from 'vuex'
import DynamicForm from '~/components/admin/dynamicForm'

export default {
  layout: 'admin',
  components: {
    DynamicForm
  },
  computed: mapState({
    products: (state) => state.modules.user.users
  }),
  methods: mapActions('modules/user', ['addProductToCart']),
  created() {
    this.$store.dispatch('modules/user/getAllProducts')
  }
}
