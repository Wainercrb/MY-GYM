import { EventBus } from '~/assets/scripts/vue-helpers/eventBus'
export default {
  props: ['data', 'thead', 'title', 'states'],
  data() {
    return {
      item: {},
      isLoading: true
    }
  },
  computed: {
    showLoading() {
      if (!this.data || !this.thead) {
        return true
      }
      if (this.data && this.thead && !this.isLoading) {
        return false
      }
      return true
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => (this.isLoading = false), 500)
    })
  },
  methods: {
    editRecord(item) {
      EventBus.$emit(this.states.updating, item)
    },
    deleteRecord(item) {
      EventBus.$emit(this.states.deleting, item)
    }
  }
}
