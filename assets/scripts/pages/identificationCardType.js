import { mapState } from 'vuex'
import DynamicForm from '~/components/global/dynamicForm'
import DynamicTable from '~/components/global/dynamicTable'
import { EventBus } from '~/assets/scripts/vue-helpers/eventBus'
import identificationCardTypeFormJson from '~/assets/forms/identificationCardType.json'

const EVENT_BUS_LISTENER = 'EventBusRole'

export default {
  layout: 'admin',
  components: {
    DynamicForm,
    DynamicTable
  },
  computed: mapState({
    identificationCards: (state) => state.modules.identificationCardType.all,
    thead: (state) => state.modules.identificationCardType.thead
  }),
  data() {
    return {
      myForm: identificationCardTypeFormJson
    }
  },
  created() {
    this.$store.dispatch('modules/identificationCardType/initTable')
    this.$store.dispatch('modules/identificationCardType/getAll')
  },
  mounted() {
    EventBus.$on(EVENT_BUS_LISTENER, (data) => {
      this.$store.dispatch('modules/identificationCardType/save', data)
    })
  }
}
