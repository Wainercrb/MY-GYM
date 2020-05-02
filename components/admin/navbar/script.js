import { EventBus } from '~/assets/scripts/vue-helpers/eventBus'

export default {
  methods: {
    toggleSideMenu() {
      EventBus.$emit('toggleSideMenu')
    }
  }
}
