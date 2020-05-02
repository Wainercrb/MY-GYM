import { mapState, mapActions } from 'vuex'
import DynamicForm from '~/components/admin/dynamicForm'
import { EventBus } from '~/assets/scripts/vue-helpers/eventBus'

const EVENT_BUS_LISTENER = 'EventBusRole'

export default {
  layout: 'admin',
  components: {
    DynamicForm
  },
  computed: mapState({
    products: (state) => state.modules.user.users
  }),
  data() {
    return {
      myForm: [
        {
          ele: 'input',
          className: 'dn-form__input uno',
          placeHolder: 'uno',
          value: '',
          eleType: 'isEmail',
          name: 'email1'
        },
        {
          ele: 'input',
          className: 'dn-form__input uno',
          placeHolder: 'uno',
          value: '',
          eleType: 'isEmail',
          name: 'email2'
        },
        {
          ele: 'button-ready',
          className: 'dn-form__btn uno',
          text: 'uno'
        }
      ]
    }
  },
  methods: mapActions('modules/user', ['addProductToCart']),
  created() {
    this.$store.dispatch('modules/user/getAllProducts')
  },
  mounted() {
    EventBus.$on(EVENT_BUS_LISTENER, (data) => {
      console.log('is this the data', data)
    })
  }
}
