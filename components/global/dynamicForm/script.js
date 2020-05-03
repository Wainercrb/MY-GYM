import Validator from 'validator'
import { EventBus } from '~/assets/scripts/vue-helpers/eventBus'

export default {
  props: ['myForm', 'eventBusEvent', 'title'],
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
    createLabel(labelText, labelClass) {
      const label = document.createElement('LABEL')
      const text = document.createTextNode(labelText)
      label.setAttribute('for', labelText)
      label.setAttribute('class', labelClass)
      label.appendChild(text)
      return label
    },
    createParentDiv(divClass) {
      const div = document.createElement('DIV')
      div.setAttribute('class', divClass)
      return div
    },
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
        const name = ele.getAttribute('name')
        const findEle = this.myForm.find((item) => item.name === ele.name)
        this.appendInputStats({
          ele,
          name,
          value,
          validatorType: findEle.validatorType,
          validateOptions: findEle.validateOptions
        })
      })
    },
    createFormElements() {
      this.myForm.forEach(this.buildSingleElement)
      this.createSubmitButton()
    },
    buildSingleElement(item) {
      const element = this.elements[item.ele]
      if (typeof element === 'function') {
        element(item)
      }
    },
    buildFormElements() {
      return {
        input: (item) => {
          const input = document.createElement('INPUT')
          const label = this.createLabel(item.labelText, item.labelClass)
          const div = this.createParentDiv(item.parentDivClass)
          input.setAttribute('class', item.className)
          input.setAttribute('placeholder', item.placeHolder)
          input.setAttribute('type', item.type)
          input.setAttribute('name', item.name)
          input.setAttribute('value', item.value)
          input.addEventListener('change', (event) => {
            const value = event.target.value
            const name = event.target.name
            this.appendInputStats({
              ele: input,
              name,
              value,
              validatorType: item.validatorType,
              validateOptions: item.validateOptions
            })
          })
          this.buildElements.push(input)
          div.appendChild(label)
          div.appendChild(input)
          this.parentContainer.appendChild(div)
        }
      }
    },
    appendInputStats(options) {
      const validator = Validator[options.validatorType]
      const isValid = validator(options.value, options.validateOptions)
      if (isValid) {
        this.data[options.name] = options.value
        options.ele.classList.add('dn-form__input-ready')
        options.ele.classList.remove('dn-form__input-error')
        return
      }
      this.formHasError = true
      delete this.data[name]
      options.ele.classList.add('dn-form__input-error')
      options.ele.classList.remove('dn-form__input-ready')
    }
  }
}
