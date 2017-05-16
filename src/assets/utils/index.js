export default {
  setStorage (key, value) {
    window.localStorage.setItem(key, value)
  },
  getStorage (key) {
    return window.localStorage[key]
  },
  delStorage (key) {
    window.localStorage.removeItem(key)
  }
}
