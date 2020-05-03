export default {
  props: ['data', 'thead', 'title'],
  methods: {
    editRecord(item) {
      console.log('edit', item)
    },
    updateRecord(item) {},
    deleteRecord(item) {}
  }
}
