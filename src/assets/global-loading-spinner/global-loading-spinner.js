import Vue from 'vue'
import loadingSpinner from './src/global-loading-spinner'

function getSpinner () {
  window.globalLoadingSpinnerInstance = window.globalLoadingSpinnerInstance || new (Vue.extend(loadingSpinner))({
    el: document.createElement('div')
  })
  return window.globalLoadingSpinnerInstance
}

let instance = getSpinner()
console.log(instance)

export default {
  on: function () {
    document.body.appendChild(instance.$el)
  },
  off: function () {
    document.body.removeChild(instance.$el)
  }
}
