function sortByType() {
  return {
    string: (thead, data) => {
      const sort = data.sort((a, b) => {
        if (a[thead.key] < b[thead.key]) {
          return -1
        }
        if (a[thead.key] > b[thead.key]) {
          return 1
        }
        return 0
      })
      if (!thead.orderIsAsc) {
        return sort.reverse()
      }
      return sort
    },
    date: (thead, data) => {
      const sort = data.sort((a, b) => {
        const dataA = new Date(a[thead.key])
        const dataB = new Date(b[thead.key])
        return dataB - dataA
      })
      if (!thead.orderIsAsc) {
        return sort.reverse()
      }
      return sort
    }
  }
}

export { sortByType }
