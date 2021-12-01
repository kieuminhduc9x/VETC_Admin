/**
 * codePoint - an integer containing a Unicode code point
 * return - the number of bytes required to store the code point in UTF-8
 */
function utf8Len (codePoint) {
  if (codePoint >= 0xD800 && codePoint <= 0xDFFF) { return 0 }
  if (codePoint < 0) return 0
  if (codePoint <= 0x7F) return 1
  if (codePoint <= 0x7FF) return 2
  if (codePoint <= 0xFFFF) return 3
  if (codePoint <= 0x1FFFFF) return 4
  if (codePoint <= 0x3FFFFFF) return 5
  if (codePoint <= 0x7FFFFFFF) return 6
  return 0
}

function isHighSurrogate (codeUnit) {
  return codeUnit >= 0xD800 && codeUnit <= 0xDBFF
}

function isLowSurrogate (codeUnit) {
  return codeUnit >= 0xDC00 && codeUnit <= 0xDFFF
}

/**
     * Transforms UTF-16 surrogate pairs to a code point.
     * See RFC2781
     */
function toCodepoint (highCodeUnit, lowCodeUnit) {
  if (!isHighSurrogate(highCodeUnit)) return 0
  if (!isLowSurrogate(lowCodeUnit)) return 0
  highCodeUnit = (0x3FF & highCodeUnit) << 10
  var u = highCodeUnit | (0x3FF & lowCodeUnit)
  return u + 0x10000
}

/**
     * Counts the length in bytes of a string when encoded as UTF-8.
     * str - a string
     * return - the length as an integer
     */
export default function utf8ByteCount (str) {
  if (!str) return 0
  var count = 0
  for (var i = 0; i < str.length; i++) {
    var ch = str.charCodeAt(i)
    if (isHighSurrogate(ch)) {
      var high = ch
      var low = str.charCodeAt(++i)
      count += utf8Len(toCodepoint(high, low))
    } else {
      count += utf8Len(ch)
    }
  }
  return count
}
