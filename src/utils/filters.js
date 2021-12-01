import numeral from 'numeral'
import Vue from 'vue'

Vue.filter('numberFormat', function (value) {
  if (!value) return ''
  return numeral(value).format('0,0')
})
