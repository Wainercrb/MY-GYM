import { mapState } from 'vuex'
import DynamicForm from '~/components/global/dynamicForm'
import DynamicTable from '~/components/global/dynamicTable'
import { EventBus } from '~/assets/scripts/vue-helpers/eventBus'
import { tableThead, form } from '~/assets/components/role.json'

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
    roles: (state) => state.modules.role.all
  }),
  data() {
    return {
      form,
      tableThead,
      states: STATES,
      currentState: STATES.submiting,
      currentRole: null,
      formTitle: 'Nuevo Rol'
    }
  },
  created() {
    this.$store.dispatch('modules/role/getAll')
  },
  mounted() {
    this.initListeners()
  },
  beforeDestroy() {
    EventBus.$off(this.states.submiting, this.initListeners)
    EventBus.$off(this.states.updating, this.initListeners)
    EventBus.$off(this.states.deleting, this.initListeners)
  },
  methods: {
    initListeners() {
      EventBus.$on(this.states.submiting, (role) => {
        this.callStoreAction(role)
        this.currentState = this.states.submiting
        this.formTitle = 'Nuevo Rol'
      })
      EventBus.$on(this.states.updating, (role) => {
        this.formTitle = 'Editando Rol'
        this.currentState = this.states.updating
        this.$store.dispatch('modules/role/setCurrent', role)
        this.rebuildForm(role)
      })
      EventBus.$on(this.states.deleting, (role) => {
        Promise.all([
          this.$store.dispatch('modules/role/setCurrent', role),
          this.$store.dispatch('modules/role/delete', role)
        ])
      })
    },
    rebuildForm(role) {
      this.myForm = []
      this.currentRole = role
      form.forEach((item) => {
        const match = role[item.name]
        if (match) {
          item.value = match
        }
        this.myForm.push(item)
      })
    },
    callStoreAction(role) {
      switch (this.currentState) {
        case this.states.submiting:
          this.$store.dispatch('modules/role/save', role)
          break
        case this.states.updating:
          this.$store.dispatch('modules/role/update', role)
          break
        default:
          break
      }
    }
  }
}
