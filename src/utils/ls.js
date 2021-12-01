export default {
  ls: window.localStorage,
  set: function (key, value) {
    this.ls.setItem(key, JSON.stringify(value))
  },
  get: function (key, def) {
    const value = this.ls.getItem(key)
    if (JSON.parse(value)) {
      return JSON.parse(value)
    }
    return def
  }
}
