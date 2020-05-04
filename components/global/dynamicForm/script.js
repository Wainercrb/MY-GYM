import Validator from 'validator'
import { EventBus } from '~/assets/scripts/vue-helpers/eventBus'

export default {
  props: ['myForm', 'states', 'title'],
  watch: {
    myForm(newVal, oldVal) {
      this.resetValues()
      this.isLoading = true
      this.myForm = newVal
      this.buildElements = []
      this.parentContainer.innerHTML = ''
      this.createFormElements()
    }
  },
  computed: {
    showLoading() {
      if (!this.myForm) {
        return true
      }
      if (this.myForm && !this.isLoading) {
        return false
      }
      return true
    }
  },
  data() {
    return {
      isLoading: true,
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
    createFormElements() {
      this.myForm.forEach(this.buildSingleElement)
      this.createSubmitButton()
      this.isLoading = false
    },
    submitButtonClick() {
      this.formHasError = false
      this.validateFullForm()
      if (!this.formHasError) {
        EventBus.$emit(this.states.submiting, { ...this.data })
        this.resetValues()
      }
    },
    resetValues() {
      this.formHasError = false
      this.buildElements.forEach((ele) => {
        ele.classList.remove('dn-form__ele-error')
        ele.classList.remove('dn-form__ele-ready')
        ele.value = ''
      })
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
    buildSingleElement(item) {
      const element = this.elements[item.ele]
      if (typeof element === 'function') {
        element(item)
      }
    },
    buildFormElements() {
      return {
        input: (item) => {
          const input = document.createElement(item.type)
          const label = this.createLabel(item.labelText, item.labelClass)
          const div = this.createParentDiv(item.parentDivClass)
          input.setAttribute('class', item.className)
          input.setAttribute('placeholder', item.placeHolder)
          input.setAttribute('type', item.eleType)
          input.setAttribute('name', item.name)
          input.setAttribute('value', item.value)
          input.innerHTML = item.value
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
        },
        select: (item) => {
          const input = document.createElement(item.type)
          const label = this.createLabel(item.labelText, item.labelClass)
          const div = this.createParentDiv(item.parentDivClass)
          input.setAttribute('class', item.className)
          input.setAttribute('placeholder', item.placeHolder)
          input.setAttribute('type', item.eleType)
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
          appendOptionsToSelect(input, item.options)
          setSelectValue(input, item)
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
        options.ele.classList.add('dn-form__ele-ready')
        options.ele.classList.remove('dn-form__ele-error')
        return
      }
      this.formHasError = true
      delete this.data[name]
      options.ele.classList.add('dn-form__ele-error')
      options.ele.classList.remove('dn-form__ele-ready')
    }
  }
}

function appendOptionsToSelect(ele, options) {
  options.forEach((option) => {
    const node = document.createElement('option')
    node.value = option.value
    node.text = option.text
    ele.appendChild(node)
  })
}

function setSelectValue(ele, item) {
  const index = item.options.findIndex((option) => {
    return option.value.includes(item.value)
  })
  if (index > -1) {
    ele.selectedIndex = index
  }
}
