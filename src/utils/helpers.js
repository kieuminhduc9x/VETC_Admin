export const makeQueryString = function (data) {
  if (data === undefined) {
    data = {}
  }
  return Object.keys(data).map(k => {
    if (data[k] === null) {
      data[k] = ''
    }
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&')
}

// Validate a number in a range
export function numberRangeValidator (rule, value, callback) {
  if (value) {
    const numberRexg = new RegExp(/^([0-9]+)(\.([0-9]+)?)?$/, 'gi')
    if (numberRexg.test(value) === false) {
      callback(new Error('Không đúng định dạng'))
    } else {
      value = String(value).replace(/,/gi, '')
      value = rule.type === 'Float' ? parseFloat(value).toFixed(2) : parseInt(value, 10)
      const from = rule.from || 0
      const to = rule.to || 1
      if (!(value >= from && value <= to)) {
        callback(new Error(rule.message || 'Giá trị phải nằm trong khoảng ' + from + ' đến ' + to))
      }
    }
  }
  callback()
}

// requiredIf validator
export function requiredIfValidator (rule, value, callback) {
  let condition = !!rule.requiredIf
  if (typeof rule.requiredIf === 'function') {
    condition = rule.requiredIf()
  }
  if (condition === true && !value) {
    callback(new Error(rule.message || rule.field + ' là trường bắt buộc'))
  } else {
    callback()
  }
}

export function phoneValidator (rule, value, callback) {
  if (value) {
    const reg1 = new RegExp('^[0+][0-9]+$', 'g')
    if (reg1.test(value) === false) {
      callback(new Error(' Số điện thoại nhập sai định dạng'))
    } else {
      if (value.toString().trim().length === 10) {
        callback()
      } else {
        callback(new Error('Số điện thoại nhập sai định dạng'))
      }
    }
  }
  callback()
}

// Validator input number
export function numberValidator (rule, value, callback) {
  if (value) {
    const reg = new RegExp('^[1-9]+$', 'g')
    const reg1 = new RegExp('^[1-9]{1,5}$', 'g')
    // value = rule.type === 'Int' ? parseInt(value, 10) : parseFloat(value)
    if (reg.test(value) === false) {
      callback(new Error(' Chỉ cho nhập số nguyên dương lớn hơn 0'))
    } else if (reg1.test(value) === false) {
      callback(new Error(' Số nhập tối đa 5 ký tự'))
    } else {
      callback()
    }
  }
  callback()
}
export function checkZeroValidator (rule, value, callback) {
  if (value) {
    const reg = new RegExp('^[0-9]+$', 'g')
    if (reg.test(value) === false) {
      callback(new Error('Số lượng Chỉ cho nhập số nguyên dương'))
    } else if (Number(value) <= 0) {
      callback(new Error(' Số lượng phải lớn hơn 0'))
    } else {
      callback()
    }
  }
  callback()
}
export function checkPositiveValidator (rule, value, callback) {
  if (value) {
    const reg = new RegExp('^[0-9]+$', 'g')
    if (reg.test(value) === false) {
      callback(new Error(' Chỉ cho nhập số nguyên dương'))
    } else if (Number(value) <= 0) {
      callback(new Error('Số tháng tính phi phải lớn hơn 0'))
    } else {
      callback()
    }
  }
  callback()
}
export function numberValidators (rule, value, callback) {
  if (value) {
    const reg = new RegExp('^[0-9]+$', 'g')
    const reg1 = new RegExp('^[0-9]{1,10}$', 'g')
    value = rule.type === 'Int' ? parseInt(value, 10) : parseFloat(value)
    if (reg.test(value) === false) {
      callback(new Error(' Chỉ cho phép nhập ký tự số'))
    } else if (reg1.test(value) === false) {
      callback(new Error('Nhập tối đa 10 ký tự'))
    } else {
      callback()
    }
  }
  callback()
}
export function numberRequired (rule, value, callback) {
  if (value) {
    const reg = new RegExp('^-?[0-9,.]+$', 'g')
    // value = rule.type === 'Int' ? parseInt(value, 10) : parseFloat(value)
    if (reg.test(value) === false) {
      callback(new Error(' Chỉ cho phép nhập ký tự số'))
    } else {
      callback()
    }
  }
  callback()
}
export function numberRequiredThanZero (rule, value, callback) {
  if (value) {
    if (value <= 0) {
      callback(new Error(' Giá trị phải lớn hơn 0'))
    }
  }
  callback()
}
export function numberRequired100 (rule, value, callback) {
  if (value) {
    const reg = new RegExp('^-?[0-9]+$', 'g')
    if (reg.test(value) === false) {
      callback(new Error(' Chỉ cho phép nhập ký tự số'))
    } else if (Number(value) > 100) {
      callback(new Error('Không nhập quá 100%'))
    } else {
      callback()
    }
  }
  callback()
}
export function numberRequiredInt (rule, value, callback) {
  if (value) {
    if (Number(value) <= 0) {
      callback(new Error('Chỉ cho phép nhập số lớn hơn 0'))
    } else {
      callback()
    }
  }
  callback()
}
export function numberRequiredFloat (rule, value, callback) {
  if (value) {
    const reg = new RegExp('^\\d*\\.?\\d*$', 'g')
    if (reg.test(value) === false) {
      callback(new Error(' Chỉ cho phép nhập ký tự số'))
    } else {
      callback()
    }
  }
  callback()
}
export function numberRequiredMaxLength (rule, value, callback) {
  if (value) {
    const reg = new RegExp('^[0-9]+$', 'g')
    const reg1 = new RegExp('^[0-9]{1,10}$', 'g')
    // value = rule.type === 'Int' ? parseInt(value, 10) : parseFloat(value)
    if (reg.test(String(value)) === false) {
      callback(new Error(' Chỉ cho phép nhập ký tự số'))
    } else if (reg1.test(String(value)) === false) {
      callback(new Error('Nhập tối đa 10 ký tự'))
    } else {
      callback()
    }
  }
  callback()
}
export function numberRequiredMaxLengths (rule, value, callback) {
  if (value) {
    const reg = new RegExp('^[0-9]+$', 'g')
    const reg1 = new RegExp('^[0-9]{1,15}$', 'g')
    // value = rule.type === 'Int' ? parseInt(value, 10) : parseFloat(value)
    if (reg.test(String(value)) === false) {
      callback(new Error(' Chỉ cho phép nhập ký tự số'))
    } else if (reg1.test(String(value)) === false) {
      callback(new Error('Nhập tối đa 15 ký tự'))
    } else {
      callback()
    }
  }
  callback()
}
export function phoneMinLengths (rule, value, callback) {
  if (value) {
    const reg = new RegExp('^[0-9]+$', 'g')
    const reg1 = new RegExp('^[0-9]{1,15}$', 'g')
    const reg2 = new RegExp('^[0-9]{1,9}$', 'g')
    // value = rule.type === 'Int' ? parseInt(value, 10) : parseFloat(value)
    if (reg.test(String(value)) === false) {
      callback(new Error(' Chỉ cho phép nhập ký tự số'))
    } else if (reg1.test(String(value)) === false) {
      callback(new Error('Nhập tối đa 15 ký tự'))
    } else if (reg2.test(String(value)) === true) {
      callback(new Error('Nhập tối thiểu 10 ký tự'))
    } else {
      callback()
    }
  }
  callback()
}
export function inputNumberPapers (rule, value, callback) {
  if (value) {
    const reg = new RegExp('^[a-zA-Z0-9]+$', 'g')
    // value = rule.type === 'Int' ? parseInt(value, 10) : parseFloat(value)
    if (reg.test(value) === false) {
      callback(new Error(' Không cho phép tiếng việt và dấu cách'))
    } else {
      callback()
    }
  }
  callback()
}
export function inputNumberSpecialCharacters (rule, value, callback) {
  if (value) {
    const reg = new RegExp(/^[a-zA-Z0-9_-]+$/g, 'g')
    // value = rule.type === 'Int' ? parseInt(value, 10) : parseFloat(value)
    if (reg.test(value) === false) {
      callback(new Error(' Không cho phép tiếng việt và dấu cách'))
    } else {
      callback()
    }
  }
  callback()
}

export function inputNumberPapersSpace (rule, value, callback) {
  if (value) {
    const reg = new RegExp('^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};\':"\\\\|,.<>\\/?]*$', 'g')
    // value = rule.type === 'Int' ? parseInt(value, 10) : parseFloat(value)
    if (reg.test(value) === false) {
      callback(new Error(' Không được phép nhập dấu cách và chữ tiếng việt'))
    } else {
      callback()
    }
  }
  callback()
}
export function inputNumberPapersUnderlined (rule, value, callback) {
  if (value) {
    const reg = new RegExp('^[a-zA-Z0-9]+$', 'g')
    // value = rule.type === 'Int' ? parseInt(value, 10) : parseFloat(value)
    if (reg.test(value) === false) {
      callback(new Error(' Chỉ cho phép nhập ký tự số , ký tự tiếng anh'))
    } else {
      callback()
    }
  }
  callback()
}
export function checkDay (rule, value, callback) {
  if (value) {
    if (Number(value) > 30) {
      callback(new Error('Thời hạn không quá 30 ngày'))
    } else if (Number(value) <= 0) {
      callback(new Error('Thời hạn phải lớn hơn 0'))
    } else {
      callback()
    }
  }
  callback()
}

export function trimString (str) {
  if (typeof str !== 'object') {
    return String(str).trim()
  }
  return str
}

// Vailidate Email
export function checkEmail (rule, value, callback) {
  if (value) {
    const reg = new RegExp('^([A-Za-z0-9_\\-.])+@([A-Za-z0-9_\\-.])+\\.([A-Za-z]{2,4})$', 'g')
    if (reg.test(value) === false) {
      callback(new Error('Email không đúng định dạng'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// Validate địa chỉ Ip
export function checkIP (rule, value, callback) {
  if (value) {
    const reg = new RegExp('^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$', 'g')
    if (reg.test(value) === false) {
      callback(new Error('IP không đúng định dạng'))
    } else {
      callback()
    }
  }
  callback()
}

// Check validate password
export function validatePassword (rule, value, callback) {
  if (value) {
    const reg = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{6,})')
    if (reg.test(value) === false) {
      callback(new Error('Mật khẩu phải ít nhất 6 ký tự bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// validate các field khi nhập
export function checkCode (rule, value, callback) {
  if (value) {
    const reg = new RegExp(/^[a-zA-Z0-9_]+$/g, 'g')
    if (reg.test(value) === false) {
      callback(new Error('Chỉ được phép nhập ký tự chữ, số và _'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
