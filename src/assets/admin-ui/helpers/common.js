export function getWindowSize () {
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

export function getElementSize (el, isFragment) {
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  function getSize (el) {
    return {
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
  let temp = getSize(el)
  if (temp.width || temp.height) return temp
  // clone the el
  let copy = el.cloneNode(true)
  // ste some style to minimize the influence to the document
  copy.setAttribute('style', 'visibility: hidden; display: block !important; position: absolute !important;')
  let res = null
  // insert it to document
  if (isFragment) document.body.appendChild(copy)
  else console.log(el) && el.parentNode.insertBefore(copy, el)
  res = getSize(copy)
  // remove it
  if (isFragment) document.body.removeChild(copy)
  else el.parentNode.removeChild(copy)
  return res
}

export function deepCopy (obj) {
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  if (!(obj instanceof Array || obj instanceof Object)) throw new Error('can only deepCopy Array or Object')
  return JSON.parse(JSON.stringify(obj))
}

export let isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1

export function mousewheel (element, handler) {
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:
  if (element && element.addEventListener) {
    element.addEventListener(isFirefox ? 'DOMMouseScroll' : 'mousewheel', handler)
  }
}

export function isEmptyString (str) {
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:
  return str === '' || /^\s+$/g.test(str)
}

if (!window.adminUiNameSpace) window.adminUiNameSpace = {}
export let namespace = {
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:
  set: function (key, value) {
    window.adminUiNameSpace[key] = value
    return window.adminUiNameSpace[key]
  },
  get: function (key) {
    return window.adminUiNameSpace[key]
  },
  delete: function (key) {
    return delete window.adminUiNameSpace[key]
  }
}

function getError (action, option, xhr) {
  let msg
  if (xhr.response) {
    msg = `${xhr.status} ${xhr.response.error || xhr.response}`
  } else if (xhr.responseText) {
    msg = `${xhr.status} ${xhr.responseText}`
  } else {
    msg = `fail to post ${action} ${xhr.status}`
  }

  const err = new Error(msg)
  err.status = xhr.status
  err.method = 'post'
  err.url = action
  return err
}

function getBody (xhr) {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

export function upload (option) {
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914

  // Modifier:

  // copy from element but change the file upload api
  // ### option
  // * option.action // submit url
  // * option.data // submit data
  // * option.withCredentials // indicates whether or not cross-site Access-Control requests should be made using credentials such as cookies or authorization headers
  // * option.headers // change or set headers

  // ### files
  // * option.files

  // ### events
  // * option.onProgress(e)
  // * option.onError(e)
  // * option.onSuccess()

  if (typeof window.XMLHttpRequest === 'undefined') {
    return
  }

  const xhr = new window.XMLHttpRequest()
  const action = option.action

  if (xhr.upload) {
    xhr.upload.onprogress = function progress (e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100
      }
      option.onProgress(e)
    }
  }

  const formData = new window.FormData()

  if (option.data) {
    Object.keys(option.data).map(key => {
      formData.append(key, option.data[key])
    })
  }
  // support multi files
  if (option.files && typeof option.files === 'object') {
    for (let name in option.files) {
      formData.append(name, option.files[name])
    }
  }

  xhr.onerror = function error (e) {
    option.onError(e)
  }

  xhr.onload = function onload () {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr))
    }

    option.onSuccess(getBody(xhr))
  }

  xhr.open('post', action, true)

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  const headers = option.headers || {}

  for (let item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item])
    }
  }
  xhr.send(formData)
  return xhr
}
