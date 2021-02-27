import { AppContext, ref, watch } from 'vue'

export default function pagination(ctx?: AppContext, callback?: (v: unknown) => unknown, autoFetch: boolean = false) {
  const limit = ref(10)
  const page = ref(1)
  const total = ref(100)
  const clear = () => {
    limit.value = 10
    page.value = 1
    total.value = 100
    if (!autoFetch) return
    if (typeof callback === 'function') {
      callback({
        limit: limit.value,
        page: page.value,
        total: total.value
      })
    }
  }
  const changeLimit = (newLimit: number) => {
    limit.value = newLimit
  }
  const changePage = (newPage: number) => {
    page.value = newPage
  }
  const changeTotal = (newTotal: number) => {
    total.value = newTotal
  }
  const pageSizeChange = (...args: []) => {
    console.log('sizeChange', args)
  }
  const currentPageChange = (currPage: number) => {
    page.value = currPage
  }
  watch([limit, page, total], ([l, p, t], [prevLimit, prevPage, prevTotal]) => {
    if (!autoFetch) return
    if (t !== prevTotal) {
      page.value = 1
      return
    }
    if (typeof callback === 'function') {
      callback({
        limit: limit.value,
        page: page.value,
        total: total.value
      })
    }
  })

  return {
    limit,
    page,
    total,
    clear,
    changeLimit,
    changePage,
    changeTotal,
    pageSizeChange,
    currentPageChange
  }
}