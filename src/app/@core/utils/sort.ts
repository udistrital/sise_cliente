export const sortBy = (arr, key, type = "desc") => {
  return type === "desc"
    ? arr.sort((a, b) => a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0)
    : arr.sort((a, b) => a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0)
}
