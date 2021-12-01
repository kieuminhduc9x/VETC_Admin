import Vue from 'vue'
import moment from 'moment'
import _find from 'lodash/find'
import * as EmailValidator from 'email-validator'
import { deepTrim, trimSpace, removeUtf8 } from '@/utils/common'
import { API_ERROR_STATUSES } from '@/constants'

var mixin = {
  data: function () {
    return {
      dateFormat: 'YYYY-MM-DD',
      dateSubmitFormat: 'YYYY-MM-DD',
      dateDisplayFormat: ['DD/MM/YYYY', 'DDMMYYYY'],
      datePlaceholderFormat: 'DD/MM/YYYY'
    }
  },
  mounted () {
    this.scrollBarOfTable()
  },
  methods: {
    filterSelectOption (input, option) {
      const txt = removeUtf8(input.toLowerCase())
      const text = removeUtf8(option.componentOptions.children[0].text)
      return (
        text.toLowerCase().indexOf(txt) >= 0
      )
    },
    trimRemove (str) {
      return str + '₫,'
    },
    trimRemove2 (str) {
      return str + ','
    },
    trimRemoveComma (str) {
      return str + ','
    },
    printFile (file) {
      var reader = new FileReader()
      reader.onload = function (evt) {
      }
      reader.readAsText(file)
    },
    removeDuplicate (arr) {
      const newArr = []
      for (let i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
          newArr.push(arr[i])
        }
      }
      return newArr
    },
    removeDuplicates (originalArray, prop) {
      const newArray = []
      const lookupObject = {}

      for (var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i]
      }

      for (i in lookupObject) {
        newArray.push(lookupObject[i])
      }
      return newArray
    },

    arrayEquals (a, b) {
      return Array.isArray(a) &&
                Array.isArray(b) &&
                a.length === b.length &&
                a.every((val, index) => val === b[index])
    },
    getNameByGlobalist (arr, value) {
      if (value) {
        for (const item in arr) {
          if (arr.hasOwnProperty(item) && String(arr[item].value) === String(value)) {
            return arr[item].name
          }
        }
      }
      return null
    },
    handleApiError (err) {
      if (API_ERROR_STATUSES.indexOf(err.response.status) !== -1) {
        if (err.response.data.message) {
          return err.response.data.message
        } else if (err.response.data.error_description) {
          return (err.response.data.error_description)
        }
      }
      return err.message
    },
    utf8ByteCount (str) {
      str = str + ''
      if (!str) return 0
      return str.length
      // return utf8ByteCount(str)
    },
    getText (arr, id, idName, nameType) {
      if (id !== '') {
        for (var i in arr) {
          if (arr.hasOwnProperty(i) && arr[i].idName === id) {
            return arr[i].nameType
          }
        }
      }
      return null
    },
    getNameId (arr, id) {
      if (id !== '') {
        for (var i in arr) {
          if (arr.hasOwnProperty(i) && arr[i].id === id) {
            return arr[i].name
          }
        }
      }
      return null
    },
    handleLoadedData: function (res) {
      return res.data.data
    },
    deepTrimObj (obj) {
      deepTrim(obj)
    },
    handlePaginationData: function (res) {
      if (res.page_meta !== undefined) {
        return {
          total: res.page_meta.total_elements
        }
      }
      return {}
    },
    validateEmail (email) {
      if (!email) {
        console.log(email)
        return true
      }
      if (email.trim().length > 0) {
        return EmailValidator.validate(email)
      }
      return true
    },
    getGlobalCodeName (globalList, code, value) {
      const globalObject = _find(globalList, { code: code, value: value })
      return globalObject ? globalObject.name : ''
    },
    getMomentDateFromString (val, format = 'DD/MM/YYYY') {
      return val ? moment(val, format) : null
    },
    getTableRowIndex (pageSize, currentPage, rowIndex) {
      if (currentPage === 0) {
        currentPage = 1
      }
      return (currentPage - 1) * pageSize + rowIndex + 1
    },
    getNumberFromVueCurrency (value) {
      return value ? value.toString().split(',').join('') / 1 : value
    },
    onKeydownNumber (event) {
      if (!this.checkOnKeyDownNumber()) {
        return true
      }
      const evt = (event) || window.event
      const charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105) || charCode === 190 || charCode === 110 || (charCode >= 37 && charCode <= 40) ||
        charCode === 8 || charCode === 46 || charCode === 35 || charCode === 45 || charCode === 36 || charCode === 33 || charCode === 34 ||
        (charCode === 67 && (event.ctrlKey || event.metaKey)) || (charCode === 86 && (event.ctrlKey || event.metaKey)) || (charCode === 65 && (event.ctrlKey || event.metaKey))) {
        return true
      } else {
        return evt.preventDefault()
      }
    },
    isNumberKey (event) {
      const evt = (event) || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105) || (charCode >= 37 && charCode <= 40) || charCode === 8 || charCode === 46 || charCode === 35 || charCode === 45 || charCode === 36 || charCode === 33 || charCode === 34 || charCode === 188 || charCode === 190 ||
        (charCode === 67 && (event.ctrlKey || event.metaKey)) || (charCode === 86 && (event.ctrlKey || event.metaKey)) || (charCode === 65 && (event.ctrlKey || event.metaKey))) {
        return true
      } else {
        return evt.preventDefault()
      }
    },
    isEnKey (event) {
      const evt = (event) || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105) || (charCode >= 65 && charCode <= 90) || (charCode >= 37 && charCode <= 40) || charCode === 8 || charCode === 46 || charCode === 35 || charCode === 45 || charCode === 36 || charCode === 33 || charCode === 34 || charCode === 188 || charCode === 190 ||
        (charCode === 67 && (event.ctrlKey || event.metaKey)) || (charCode === 86 && (event.ctrlKey || event.metaKey)) || (charCode === 65 && (event.ctrlKey || event.metaKey))) {
        return true
      } else {
        return evt.preventDefault()
      }
    },
    checkOnKeyDownNumber () {
      return this.$browserDetect.isFirefox || this.$browserDetect.isChrome
    },
    fixedColumnOfTable (table, columns) {
      const thTags = table.getElementsByTagName('th')
      if (thTags.length) {
        for (const t in thTags) {
          if (thTags.hasOwnProperty(t)) {
            const th = thTags[t]
            const key = th.getAttribute('key')
            if (key && key.length) {
              for (const col in columns) {
                if (columns.hasOwnProperty(col)) {
                  if (columns[col].dataIndex === key && columns[col].width !== undefined) {
                    if (typeof columns[col].width === 'number') {
                      th.style.width = columns[col].width + 'px'
                    } else {
                      th.style.width = columns[col].width
                    }
                    break
                  }
                }
              }
            }
          }
        }
      }
    },
    scrollBarOfTable () {
      this.$nextTick(function () {
        setTimeout(function () {
          var wrapper1 = document.getElementsByClassName('wrapper1')[0]
          var div1 = document.getElementsByClassName('div1')[0]
          if (wrapper1 !== undefined && div1 !== undefined) {
            var wrapper2 = document.getElementsByClassName('ant-table-body')[0]
            var wrapper3 = document.getElementsByClassName('ant-table-fixed')[0]
            if (wrapper2 !== undefined && wrapper3 !== undefined) {
              div1.style.width = wrapper3.offsetWidth + 'px'
              wrapper1.onscroll = function () {
                wrapper2.scrollLeft = wrapper1.scrollLeft
              }
              wrapper2.onscroll = function () {
                wrapper1.scrollLeft = wrapper2.scrollLeft
              }
            }
          }
        }, 1000)
      })
    },
    formatPrice (value) {
      const val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    formatPrice1 (value) {
      if (value) {
        const val = (value / 1).toFixed(0).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      return '0'
    },
    formatPriceNotZero (value) {
      if (value) {
        const val = (value / 1).toFixed(0).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      return value
    },
    formatPrice2 (value) {
      if (value) {
        const val = (value / 1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      return null
    },
    formatPhone (value) {
      const val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/^[2-9]\d{2}-\d{3}-\d{4}$/g, '.')
    },
    getGlobalName (items, value) {
      if (typeof items === 'object' && items.length > 0) {
        let name = value
        items.forEach(item => {
          if (item.value === value) {
            name = item.name
          }
        })
        return name
      }
      return value
    },
    getProvinceNameByCode (provinces, code) {
      let name = ''
      provinces.forEach(item => {
        if (item.code === code) {
          name = item.name
        }
      })
      return name
    },
    getProvinceNameByAreaCode (provinces, code) {
      let name = ''
      provinces.forEach(item => {
        if (item.areaCode === code) {
          name = item.name
        }
      })
      return name
    },
    getDistrictNameByCode (districts, code) {
      let name = ''
      districts.forEach(item => {
        if (item.code === code) {
          name = item.name
        }
      })
      return name
    },
    getDistrictNameByAreaCode (districts, code) {
      let name = ''
      districts.forEach(item => {
        if (item.areaCode === code) {
          name = item.name
        }
      })
      return name
    },
    getPhoenixNameByCode (phoenixes, code) {
      let name = ''
      phoenixes.forEach(item => {
        if (item.code === code) {
          name = item.name
        }
      })
      return name
    },
    getPhoenixNameByAreaCode (precincts, code) {
      let name = ''
      precincts.forEach(item => {
        if (item.areaCode === code) {
          name = item.name
        }
      })
      return name
    },
    convertToDisplayDate (dateString) {
      if (dateString !== null && dateString !== '') {
        const d = moment(dateString, this.dateSubmitFormat)
        if (d.isValid()) {
          return d.format(this.datePlaceholderFormat)
        } else {
          return moment(dateString).format(this.datePlaceholderFormat)
        }
      } else if (moment.isMoment(dateString)) {
        return dateString.format(this.datePlaceholderFormat)
      }
      return dateString
    },
    convertToSubmitDate (dateString) {
      if (dateString !== null && dateString !== '') {
        const d = moment(dateString, this.datePlaceholderFormat)
        if (d.isValid()) {
          return d.format(this.dateSubmitFormat)
        } else {
          return moment(dateString).format(this.dateSubmitFormat)
        }
      } else if (moment.isMoment(dateString)) {
        return dateString.format(this.dateSubmitFormat)
      }
      return dateString
    },
    isLocalDateTime (dateString) {
      return moment(dateString, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS, true).isValid()
    },
    convertPropToSubmitDate (obj) {
      if (obj === null || obj === '' || typeof (obj) !== 'object') {
        return obj
      }
      const pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/
      for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
          if ((typeof (obj[p]) === 'string' && (pattern.test(obj[p]) || this.isLocalDateTime(obj[p]))) || moment.isMoment(obj[p])) {
            obj[p] = this.convertToSubmitDate(obj[p])
          } else if (typeof (obj[p]) === 'object') {
            obj[p] = this.convertPropToSubmitDate(obj[p])
          }
        }
      }
      return obj
    },
    convertPropToDisplayDate (obj) {
      if (obj === null || obj === '' || typeof (obj) !== 'object') {
        return obj
      }
      const pattern = /^\d{4}-\d{1,2}-\d{1,2}$/
      for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
          if ((typeof (obj[p]) === 'string' && (pattern.test(obj[p]) || this.isLocalDateTime(obj[p]))) || moment.isMoment(obj[p])) {
            obj[p] = this.convertToDisplayDate(obj[p])
          } else if (typeof (obj[p]) === 'object') {
            obj[p] = this.convertPropToDisplayDate(obj[p])
          }
        }
      }
      return obj
    },
    checkMenuPermission (menus, path) {
      const $this = this
      const matchedPaths = menus.filter(function (menuItem) {
        if (menuItem.objectUrl === path) {
          return true
        } else {
          return $this.checkMenuPermission(menuItem.childObjects, path)
        }
      })
      return matchedPaths.length > 0
    },
    getUnique (arr, comp) {
      const unique = arr.map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((e) => arr[e]).map(e => arr[e])
      return unique
    },
    checkComponentPermission (components, code) {
      // const $this = this
      // const matchedComponents = components.filter(function (componentItem) {
      //   if (componentItem.objectCode === code) {
      //     return true
      //   } else {
      //     return $this.checkComponentPermission(componentItem.childObjects, code)
      //   }
      // })
      // return matchedComponents.length > 0
      return true
    },
    gotoListg (txt) {
      this.$router.push({ name: txt })
    },
    hasMenuPermission (routeName) {
      // const $this = this
      // if ($this.$store.state.auth.permissions) {
      //   const menus = [...$this.$store.state.auth.permissions.menus, ...$this.$store.state.auth.permissions.systemMenus].filter(function (menuItem) {
      //     if (!(menuItem.objectUrl === routeName)) {
      //       return $this.checkMenuPermission(menuItem.childObjects, routeName)
      //     }
      //     return true
      //   })
      //   return menus.length > 0
      // }
      return true
    },
    hasAnyMenuPermission (routeNames) {
      while (routeNames.length > 0) {
        const routeName = routeNames.shift()
        if (this.hasMenuPermission(routeName)) {
          return true
        }
      }
      return false
    },
    hasUrlPermission (url) {
      return this.$store.state.auth.permissions.urls.indexOf(url) !== -1
    },
    hasComponentPermission (code) {
      // const $this = this
      // const components = this.$store.state.auth.permissions.components.filter(function (componentItem) {
      //   if (!(componentItem.objectCode === code)) {
      //     return $this.checkComponentPermission(componentItem.childObjects, code)
      //   }
      //   return true
      // })
      // return components.length > 0
      return true
    },
    DeepTrimValue (obj) {
      trimSpace(obj)
    },
    slugify (string, split = '-') {
      let value
      // string = string.toString();
      value = string.replace(/^\s+|\s+$/g, '') // trim
      value = value.toLowerCase()

      // remove accents, swap ñ for n, etc
      const from = 'äëïîöüûñçáàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ·/_,:;'
      const to = 'aeiiouuncaaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd------'
      for (let i = 0, l = from.length; i < l; i++) {
        value = value.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
      }

      value = value.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, split) // collapse whitespace and replace by -
        .replace(/-+/g, split) // collapse dashes

      return value
    }
  }
}
Vue.mixin(mixin)
