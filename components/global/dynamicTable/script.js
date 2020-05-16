export default {
  props: ['data', 'tableThead', 'title', 'pageIsLoading'],
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    showLoading() {
      if (this.isLoading || this.pageIsLoading) {
        return true
      }
      return false
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => (this.isLoading = false), 500)
    })
  }
}
