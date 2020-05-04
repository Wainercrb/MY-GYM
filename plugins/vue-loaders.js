import Vue from 'vue'
import LoadingAnimation from '../components/global/loadingAnimation'

function install(Vue) {
  const compKeys = Object.keys(this).filter((key) => key !== 'install')
  let ln = compKeys.length

  while (ln--) {
    const component = this[compKeys[ln]]
    Vue.component(component.name, component)
  }
}

const VueLoaders = { LoadingAnimation, install }

Vue.use(VueLoaders)
