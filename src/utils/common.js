export function removeUtf8 (val) {
  var str = val
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.replace(/[!@%^*()+=<>?/,.:;'"&#[\]~$_`\-{}|\\]/g, ' ')
  str = str.replace(/ + /g, ' ')
  str = str.trim()
  return str
}

export function deepTrim (obj) {
  if (typeof obj === 'object' && Object.entries(obj).length > 0) {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        const type = typeof obj[prop]
        if (obj[prop] !== null && (type === 'string' || type === 'object')) {
          if (type === 'object') {
            obj[prop] = deepTrim(obj[prop])
          } else {
            obj[prop] = obj[prop].trim()
          }
        }
      }
    }
  }
  return obj
}
export function deepTrim2 (obj) {
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') {
      obj[k] = v.trim()
    } else if (typeof v === 'object') {
    }
  }
}
export function trimSpace (obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] === 'string') {
        obj[prop] = obj[prop].trim()
      } else if (typeof obj[prop] === 'object') {
        trimSpace(obj[prop])
      }
    }
  }
}

export function formatPhone (val) {
  var str = val
  str = str.trim()
  str = str.toLowerCase()
  str = str.replace(/\+/g, '')
  str = str.replace(/84/g, '')
  str = str.replace(/^0/g, '')
  return str
}
