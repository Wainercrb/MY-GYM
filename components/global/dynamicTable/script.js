import { EventBus } from '~/assets/scripts/vue-helpers/eventBus'

export default {
  props: ['data', 'tableThead', 'title', 'states'],
  data() {
    return {
      item: {},
      isLoading: true,
      sortTypes: {},
      orderIsAsc: true
    }
  },
  computed: {
    showLoading() {
      if (!this.data || !this.isLoading) {
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
    editRecord(thead) {
      EventBus.$emit(this.states.updating.action, thead)
    },
    deleteRecord(thead) {
      EventBus.$emit(this.states.deleting.action, thead)
    },
    sortRecord(thead) {
      if (thead.sort) {
        thead.orderIsAsc = this.orderIsAsc
        EventBus.$emit(this.states.sorting.action, thead)
        this.orderIsAsc = !this.orderIsAsc
      }
    }
  }
}
