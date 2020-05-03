import { mapState, mapActions } from 'vuex'
import DynamicForm from '~/components/global/dynamicForm'
import DynamicTable from '~/components/global/dynamicTable'
import { EventBus } from '~/assets/scripts/vue-helpers/eventBus'
import roleFormJson from '~/assets/forms/role.json'

const EVENT_BUS_LISTENER = 'EventBusRole'

export default {
  layout: 'admin',
  components: {
    DynamicForm,
    DynamicTable
  },
  computed: mapState({
    roles: (state) => state.modules.role.roles,
    thead: (state) => state.modules.role.thead
  }),
  data() {
    return {
      myForm: roleFormJson
    }
  },
  methods: mapActions('modules/user', ['addProductToCart']),
  created() {
    this.$store.dispatch('modules/role/initTable')
    this.$store.dispatch('modules/role/getAllRoles')
  },
  mounted() {
    EventBus.$on(EVENT_BUS_LISTENER, (data) => {
      this.$store.dispatch('modules/role/saveRole', data)
    })
  }
}
