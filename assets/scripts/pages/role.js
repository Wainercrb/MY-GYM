import { mapState } from 'vuex'
import DynamicForm from '~/components/global/dynamicForm'
import DynamicTable from '~/components/global/dynamicTable'
import { EventBus } from '~/assets/scripts/vue-helpers/eventBus'
import { tableThead, form, states } from '~/assets/components/role.json'

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
      states,
      tableThead,
      currentState: states.submiting
    }
  },
  created() {
    this.$store.dispatch('modules/role/getAll')
  },
  mounted() {
    this.initListeners()
  },
  beforeDestroy() {
    EventBus.$off(this.states.submiting.action, this.initListeners)
    EventBus.$off(this.states.updating.action, this.initListeners)
    EventBus.$off(this.states.deleting.action, this.initListeners)
    EventBus.$off(this.states.sorting.action, this.initListeners)
  },
  methods: {
    initListeners() {
      EventBus.$on(this.states.submiting.action, (role) => {
        this.callStoreAction(role)
        this.currentState = this.states.submiting
      })
      EventBus.$on(this.states.updating.action, (role) => {
        this.currentState = this.states.updating
        this.$store.dispatch('modules/role/setCurrent', role)
        this.rebuildFormStructure(role)
      })
      EventBus.$on(this.states.sorting.action, (thead) => {
        this.$store.dispatch('modules/role/sorting', thead)
      })
      EventBus.$on(this.states.deleting.action, (role) => {
        Promise.all([
          this.$store.dispatch('modules/role/setCurrent', role),
          this.$store.dispatch('modules/role/delete', role)
        ])
      })
    },
    rebuildFormStructure(role) {
      this.form = []
      form.forEach((item) => {
        const match = role[item.name]
        if (match) {
          item.value = match
        }
        this.form.push(item)
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
