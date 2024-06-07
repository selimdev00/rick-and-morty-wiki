export default (url, opts) => {
  return useFetch(`${useRuntimeConfig().public.BASE_URL}${url}`, opts)
}
