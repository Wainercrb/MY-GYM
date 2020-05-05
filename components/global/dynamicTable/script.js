import { EventBus } from '~/assets/scripts/vue-helpers/eventBus'
export default {
  props: ['data', 'tableThead', 'title', 'states'],
  data() {
    return {
      item: {},
      isLoading: true,
      sortTypes: {}
    }
  },
  computed: {
    showLoading() {
      if (!this.data || !this.tableThead) {
        return true
      }
      if (this.data && this.tableThead && !this.isLoading) {
        return false
      }
      return true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.sortTypes = this.sortBy()
      setTimeout(() => (this.isLoading = false), 500)
    })
  },
  methods: {
    editRecord(item) {
      EventBus.$emit(this.states.updating, item)
    },
    deleteRecord(item) {
      EventBus.$emit(this.states.deleting, item)
    },
    sortRecord(item) {
      if (!item.sort) {
        return
      }
      const sortTable = this.sortTypes[item.type]
      console.warn('sorting', sortTable)
      if (typeof sortTable === 'function') {
        sortTable(item)
      }
    },
    sortBy() {
      return {
        string: (item) => {
          this.data.sort((a, b) => {
            return a[item.key] > b[item.key]
          })
        },
        date: (item) => {
          console.warn('sort date')
          return item
        }
      }
    }
  }
}
