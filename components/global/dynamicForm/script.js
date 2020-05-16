import Validator from 'validator'
import {
  createInput,
  createSelect,
  createLabel,
  createParentDiv,
  createSubmitButton
} from './inputs'

export default {
  props: ['form', 'title', 'pageIsLoading'],
  watch: {
    form() {
      this.resetForm()
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
  data() {
    return {
      isLoading: true,
      formHasError: false,
      parentCtn: {},
      buildElements: [],
      elements: {},
      data: {}
    }
  },
  created() {
    this.elements = this.buildFormElements()
  },
  mounted() {
    this.parentCtn = this.$refs.parentCtn
    this.createFormElements()
  },
  methods: {
    submitButtonClick() {
      this.isLoading = true
      this.formHasError = false
      this.validateFullForm()
      if (!this.formHasError) {
        this.$emit('submit', this.data)
      }
    },
    createSubmitButton() {
      const button = createSubmitButton(this.form)
      if (button) {
        button.addEventListener('click', () => this.submitButtonClick())
        this.parentCtn.appendChild(button)
      }
    },
    createFormElements() {
      this.form.forEach(this.buildSingleElement)
      this.createSubmitButton()
      this.stopLoading()
    },
    resetForm() {
      this.formHasError = false
      this.isLoading = true
      this.buildElements = []
      this.parentCtn.innerHTML = ''
      this.createFormElements()
    },
    validateFullForm() {
      this.buildElements.forEach((ele) => {
        const value = ele.value
        const name = ele.getAttribute('name')
        const findEle = this.form.find((item) => item.name === ele.name)
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
        const label = createLabel(item)
        const div = createParentDiv(item)
        const ele = element(item)
        div.appendChild(label)
        div.appendChild(ele)
        this.buildElements.push(ele)
        this.parentCtn.appendChild(div)
      }
    },
    buildFormElements() {
      return {
        input: (item) => {
          const input = createInput(item)
          input.addEventListener('change', (event) =>
            this.addEleListener(event, input, item)
          )
          return input
        },
        select: (item) => {
          const select = createSelect(item)
          select.addEventListener('change', (event) =>
            this.addEleListener(event, select, item)
          )
          return select
        }
      }
    },
    addEleListener(event, select, item) {
      const value = event.target.value
      const name = event.target.name
      this.appendInputStats({
        name,
        value,
        ele: select,
        validatorType: item.validatorType,
        validateOptions: item.validateOptions
      })
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
    },
    stopLoading() {
      setTimeout(() => {
        this.isLoading = false
      }, 200)
    },
    printError(error) {
      console.error(error)
    }
  }
}
