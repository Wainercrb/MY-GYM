import { mapState } from 'vuex'
import DynamicForm from '~/components/global/dynamicForm'
import DynamicTable from '~/components/global/dynamicTable'
import { tableThead, form } from '~/assets/components/role.json'

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
      form: [],
      role: null,
      orderIsAsc: true,
      tableIsLoading: true,
      formIsLoading: true,
      tableThead
    }
  },
  created() {
    this.$store.dispatch('modules/role/getAll')
  },
  mounted() {
    this.form = form
    this.formIsLoading = false
    this.tableIsLoading = false
  },
  methods: {
    submit(role) {
      if (!Object.keys(this.role).length) {
        this.setStoreAction(role, 'save')
        return
      }
      const fullRole = formatUpdateRole(this.role, role)
      this.setStoreAction(fullRole, 'update')
    },
    editRole(role) {
      this.rebuildForm(role)
      this.role = role
    },
    deleteRole(role) {
      this.tableIsLoading = true
      this.$store
        .dispatch('modules/role/delete', role)
        .then(() => (this.tableIsLoading = false))
        .catch(this.printError)
    },
    reset() {
      this.role = null
      this.form = form
      this.formIsLoading = false
      this.tableIsLoading = false
    },
    setStoreAction(role, action) {
      this.formIsLoading = true
      this.tableIsLoading = true
      this.$store
        .dispatch(`modules/role/${action}`, role)
        .then(this.reset)
        .catch(this.printError)
    },
    sortRecord(data) {
      if (data.sort) {
        this.tableIsLoading = true
        data.orderIsAsc = this.orderIsAsc
        this.$store
          .dispatch('modules/role/sorting', data)
          .then(() => {
            this.tableIsLoading = false
            this.orderIsAsc = !this.orderIsAsc
          })
          .catch(this.printError)
      }
    },
    rebuildForm(role) {
      this.form = []
      form.forEach((item) => {
        const match = role[item.name]
        if (match) {
          item.value = match
        }
        this.form.push(item)
      })
    },
    printError(error) {
      this.reset()
      console.error(error)
    }
  }
}

function formatUpdateRole(updateRole, formRole) {
  return {
    ...formRole,
    _id: updateRole._id,
    createdAt: updateRole.createdAt
  }
}
