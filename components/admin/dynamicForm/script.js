import Validator from 'validator'
import { EventBus } from '~/assets/scripts/vue-helpers/eventBus'

export default {
  props: ['myForm', 'eventBusEvent'],
  data() {
    return {
      formHasError: false,
      parentContainer: {},
      buildElements: [],
      elements: {},
      data: {}
    }
  },
  created() {
    this.elements = this.buildFormElements()
  },
  mounted() {
    this.parentContainer = this.$refs.parentContainer
    this.createFormElements()
  },
  methods: {
    createSubmitButton() {
      const findButton = this.myForm.find((element) => {
        return element.ele.includes('button-ready')
      })
      if (findButton) {
        const button = document.createElement('BUTTON')
        button.setAttribute('class', findButton.className)
        button.innerHTML = findButton.text
        button.addEventListener('click', () => this.submitButtonClick())
        this.parentContainer.appendChild(button)
      }
    },
    submitButtonClick() {
      this.formHasError = false
      this.validateFullForm()
      if (!this.formHasError) {
        EventBus.$emit(this.eventBusEvent, { data: this.data })
      }
    },
    validateFullForm() {
      this.buildElements.forEach((ele) => {
        const value = ele.value
        const type = ele.getAttribute('eletype')
        const name = ele.getAttribute('name')
        this.appendInputStats(ele, name, value, type)
      })
    },
    createFormElements() {
      this.myForm.forEach(this.buildSingleElement)
      this.createSubmitButton()
    },
    buildSingleElement(item) {
      const element = this.elements[item.ele]
      if (typeof element === 'function') {
        element(
          item.className,
          item.name,
          item.placeHolder,
          item.value,
          item.eleType
        )
      }
    },
    buildFormElements() {
      return {
        input: (className, name, placeHolder, value, eleType) => {
          const input = document.createElement('INPUT')
          input.setAttribute('class', className)
          input.setAttribute('placeholder', placeHolder)
          input.setAttribute('type', 'text')
          input.setAttribute('value', value)
          input.setAttribute('eleType', eleType)
          input.setAttribute('name', name)
          input.addEventListener('change', (event) => {
            const value = event.target.value
            const name = event.target.name
            this.appendInputStats(input, name, value, eleType)
          })
          this.buildElements.push(input)
          this.parentContainer.appendChild(input)
        }
      }
    },
    appendInputStats(ele, name, value, eleType) {
      const validator = Validator[eleType]
      const isValid = validator(value)
      if (isValid) {
        this.data[name] = value
        ele.classList.add('dn-form__input-ready')
        ele.classList.remove('dn-form__input-error')
        return
      }
      this.formHasError = true
      delete this.data[name]
      ele.classList.add('dn-form__input-error')
      ele.classList.remove('dn-form__input-ready')
    }
  }
}
