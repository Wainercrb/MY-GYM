import { EventBus } from '~/assets/scripts/vue-helpers/eventBus'
export default {
  props: ['data', 'thead', 'title', 'states'],
  data() {
    return {
      item: {}
    }
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
