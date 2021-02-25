import { AppContext, ref, watch } from 'vue'
export default function pagination(ctx: AppContext, callback?: () => unknown, autoFetch: boolean = false) {
  const limit = ref(10)
  const page = ref(1)
  const total = ref(100)
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
      callback()
    }
  })
  return {
    limit,
    page,
    total,
    changeLimit,
    changePage,
    changeTotal,
    pageSizeChange,
    currentPageChange
  }
}