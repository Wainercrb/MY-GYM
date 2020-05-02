export default {
  data() {
    return {
      parentContainer: {}
    }
  },
  mounted() {
    this.parentContainer = this.$refs.parentContainer
    this.createInput('input', '', '10')
  },

  methods: {
    createInput(className, placeHolder, value) {
      const inputs = this.frmElements()
      const inputFn = inputs.input
      if (typeof inputFn === 'function') {
        inputFn('input', '', '10')
      }
    },
    frmElements() {
      return {
        input: (className, placeHolder, value) => {
          const input = document.createElement('INPUT')
          input.setAttribute('class', className)
          input.setAttribute('type', 'text')
          input.setAttribute('value', value)
          this.parentContainer.appendChild(input)
        }
      }
    }
  }
}
