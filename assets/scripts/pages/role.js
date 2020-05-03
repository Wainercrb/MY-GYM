import { mapState } from 'vuex'
import DynamicForm from '~/components/global/dynamicForm'
import DynamicTable from '~/components/global/dynamicTable'
import { EventBus } from '~/assets/scripts/vue-helpers/eventBus'
import roleFormJson from '~/assets/forms/role.json'

const STATES = {
  submiting: 'ROLE-SUBMITING',
  updating: 'ROLE-UPDATING',
  deleting: 'ROLE-DELETING',
  disabling: 'ROLE-DISABLING'
}

export default {
  layout: 'admin',
  components: {
    DynamicForm,
    DynamicTable
  },
  computed: mapState({
    roles: (state) => state.modules.role.all,
    thead: (state) => state.modules.role.thead
  }),
  data() {
    return {
      myForm: roleFormJson,
      states: STATES,
      currentRole: {}
    }
  },
  created() {
    this.$store.dispatch('modules/role/initTable')
    this.$store.dispatch('modules/role/getAll')
  },
  mounted() {
    this.initListeners()
  },
  methods: {
    initListeners() {
      EventBus.$on(this.states.submiting, (data) => {
        const updateObj = {
          id: this.currentRole._id,
          oldData: this.currentRole,
          data
        }
        this.$store.dispatch('modules/role/update', updateObj)
      })
      EventBus.$on(this.states.updating, (role) => {
        this.myForm = []
        this.currentRole = role
        roleFormJson.forEach((item) => {
          const match = role[item.name]
          if (match) {
            item.value = match
          }
          this.myForm.push(item)
        })
      })
      EventBus.$on(this.states.deleting, (data) => {})
    }
  }
}
