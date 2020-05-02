import { EventBus } from '~/assets/scripts/vue-helpers/eventBus'

export default {
  data() {
    return {
      menuIsOpen: true
    }
  },
  mounted() {
    EventBus.$on('toggleSideMenu', () => {
      this.menuIsOpen = !this.menuIsOpen
    })
  },
  methods: {
    toggleSideMenu() {
      this.menuIsOpen = !this.menuIsOpen
    }
  }
}
