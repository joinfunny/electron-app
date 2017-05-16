/**
 * Created by yongsheng.kuang on 2016/4/1.
 */
/**
 * 弹出热图入口
 */
(function(window, undefined) {
  var param = window.location.href.split('ptengine=')[1].slice(0, 33);
  PT_URL = param.slice(0, 1);
  PT_KEY = param.slice(1);
  //热图各个组件库的容器
  window.PT_OVERLAY_MAP = {
    scriptLoadedHandlers: [], //热图全部所需的js加载完成后的处理(防止组件B依赖组件A,但是B缺先加载完成,导致A不能够被B正常使用)
    loaded: function() {
      var length = window.PT_OVERLAY_MAP.scriptLoadedHandlers.length;
      for (var i = 0; i < length; i++) {
        window.PT_OVERLAY_MAP.scriptLoadedHandlers[i]();
      }
    }
  };


  var domains = {};

  domains.webDomain_dev_en = 'http://localhost:3000';
  domains.webDomain_test_en = 'https://reportv3test.ptengine.com';
  domains.webDomain_pre_en = 'https://testreportv3.ptengine.com';
  domains.webDomain_prod_en = 'https://reportv3.ptengine.com';
  domains.webDomain_dev_jp = 'http://localhost:3100';
  domains.webDomain_test_jp = 'https://reportv3test.ptengine.jp';
  domains.webDomain_pre_jp = 'https://testreportv3.ptengine.jp';
  domains.webDomain_prod_jp = 'https://reportv3.ptengine.jp';
  domains.webDomain_dev_zh = 'http://localhost:3200';
  domains.webDomain_test_zh = 'https://reportv3test.ptengine.cn';
  domains.webDomain_pre_zh = 'https://testreport.ptengine.cn';
  domains.webDomain_prod_zh = 'https://report.ptengine.cn';

  /**
   * 当前网站 的host type
   *  '0':旧版日本(新版不会生成)
   *  '1':新版日本
   *  '2':旧版海外(新版不会生成)
   *  '3':新版海外
   *  '6':新版日本测试
   *  '7':新版海外测试
   *  '8':新版日本预上线
   *  '9':新版海外预上线
   *  'A':新版日本开发
   *  'B':新版海外开发
   *  'a':新版中国线上
   *  'b':新版中国预上线
   *  'c':新版中国测试
   *  'd':新版中国开发
   * @private
   */
  var mappingHost = {
    webDomain_prod_jp: '1',
    webDomain_prod_en: '3',
    webDomain_test_jp: '6',
    webDomain_test_en: '7',
    webDomain_pre_jp: '8',
    webDomain_pre_en: '9',
    webDomain_dev_jp: 'A',
    webDomain_dev_en: 'B',
    webDomain_prod_zh: 'a',
    webDomain_pre_zh: 'b',
    webDomain_test_zh: 'c',
    webDomain_dev_zh: 'd'
  };
  var domain = '';

  for (var key in mappingHost) {
    var value = mappingHost[key];
    if (value == PT_URL) {
      domain = domains[key];
    }
  }

  var importUrl = ''; //js,css 资源base 路径
  var ptDataUrl = ''; //数据路径

  importUrl = domain;
  ptDataUrl = domain + "/pagescene/getHeatMapJsonp.pt";


  /*!
   * jQuery JavaScript Library v2.1.4
   * http://jquery.com/
   *
   * Includes Sizzle.js
   * http://sizzlejs.com/
   *
   * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
   * Released under the MIT license
   * http://jquery.org/license
   *
   * Date: 2015-04-28T16:01Z
   */
  var jQuery = (function(window, undefined) {
    var arr = [];

    var slice = arr.slice;

    var concat = arr.concat;

    var push = arr.push;

    var indexOf = arr.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var support = {};


    var
      // Use the correct document accordingly with window argument (sandbox)
      document = window.document,

      version = "2.1.4",

      // Define a local copy of jQuery
      jQuery = function(selector, context) {
        // The jQuery object is actually just the init constructor 'enhanced'
        // Need init if jQuery is called (just allow error to be thrown if not included)
        return new jQuery.fn.init(selector, context);
      },

      // Support: Android<4.1
      // Make sure we trim BOM and NBSP
      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

      // Matches dashed string for camelizing
      rmsPrefix = /^-ms-/,
      rdashAlpha = /-([\da-z])/gi,

      // Used by jQuery.camelCase as callback to replace()
      fcamelCase = function(all, letter) {
        return letter.toUpperCase();
      };

    jQuery.fn = jQuery.prototype = {
      // The current version of jQuery being used
      jquery: version,

      constructor: jQuery,

      // Start with an empty selector
      selector: "",

      // The default length of a jQuery object is 0
      length: 0,

      toArray: function() {
        return slice.call(this);
      },

      // Get the Nth element in the matched element set OR
      // Get the whole matched element set as a clean array
      get: function(num) {
        return num != null ?

          // Return just the one element from the set
          (num < 0 ? this[num + this.length] : this[num]) :

          // Return all the elements in a clean array
          slice.call(this);
      },

      // Take an array of elements and push it onto the stack
      // (returning the new matched element set)
      pushStack: function(elems) {

        // Build a new jQuery matched element set
        var ret = jQuery.merge(this.constructor(), elems);

        // Add the old object onto the stack (as a reference)
        ret.prevObject = this;
        ret.context = this.context;

        // Return the newly-formed element set
        return ret;
      },

      // Execute a callback for every element in the matched set.
      // (You can seed the arguments with an array of args, but this is
      // only used internally.)
      each: function(callback, args) {
        return jQuery.each(this, callback, args);
      },

      map: function(callback) {
        return this.pushStack(jQuery.map(this, function(elem, i) {
          return callback.call(elem, i, elem);
        }));
      },

      slice: function() {
        return this.pushStack(slice.apply(this, arguments));
      },

      first: function() {
        return this.eq(0);
      },

      last: function() {
        return this.eq(-1);
      },

      eq: function(i) {
        var len = this.length,
          j = +i + (i < 0 ? len : 0);
        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
      },

      end: function() {
        return this.prevObject || this.constructor(null);
      },

      // For internal use only.
      // Behaves like an Array's method, not like a jQuery method.
      push: push,
      sort: arr.sort,
      splice: arr.splice
    };

    jQuery.extend = jQuery.fn.extend = function() {
      var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

      // Handle a deep copy situation
      if (typeof target === "boolean") {
        deep = target;

        // Skip the boolean and the target
        target = arguments[i] || {};
        i++;
      }

      // Handle case when target is a string or something (possible in deep copy)
      if (typeof target !== "object" && !jQuery.isFunction(target)) {
        target = {};
      }

      // Extend jQuery itself if only one argument is passed
      if (i === length) {
        target = this;
        i--;
      }

      for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
          // Extend the base object
          for (name in options) {
            src = target[name];
            copy = options[name];

            // Prevent never-ending loop
            if (target === copy) {
              continue;
            }

            // Recurse if we're merging plain objects or arrays
            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && jQuery.isArray(src) ? src : [];

              } else {
                clone = src && jQuery.isPlainObject(src) ? src : {};
              }

              // Never move original objects, clone them
              target[name] = jQuery.extend(deep, clone, copy);

              // Don't bring in undefined values
            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      }

      // Return the modified object
      return target;
    };

    jQuery.extend({
      // Unique for each copy of jQuery on the page
      expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

      // Assume jQuery is ready without the ready module
      isReady: true,

      error: function(msg) {
        throw new Error(msg);
      },

      noop: function() {},

      isFunction: function(obj) {
        return jQuery.type(obj) === "function";
      },

      isArray: Array.isArray,

      isWindow: function(obj) {
        return obj != null && obj === obj.window;
      },

      isNumeric: function(obj) {
        // parseFloat NaNs numeric-cast false positives (null|true|false|"")
        // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
        // subtraction forces infinities to NaN
        // adding 1 corrects loss of precision from parseFloat (#15100)
        return !jQuery.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
      },

      isPlainObject: function(obj) {
        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
          return false;
        }

        if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
          return false;
        }

        // If the function hasn't returned already, we're confident that
        // |obj| is a plain object, created by {} or constructed with new Object
        return true;
      },

      isEmptyObject: function(obj) {
        var name;
        for (name in obj) {
          return false;
        }
        return true;
      },

      type: function(obj) {
        if (obj == null) {
          return obj + "";
        }
        // Support: Android<4.0, iOS<6 (functionish RegExp)
        return typeof obj === "object" || typeof obj === "function" ?
          class2type[toString.call(obj)] || "object" :
          typeof obj;
      },

      // Evaluates a script in a global context
      globalEval: function(code) {
        var script,
          indirect = eval;

        code = jQuery.trim(code);

        if (code) {
          // If the code includes a valid, prologue position
          // strict mode pragma, execute code by injecting a
          // script tag into the document.
          if (code.indexOf("use strict") === 1) {
            script = document.createElement("script");
            script.text = code;
            document.head.appendChild(script).parentNode.removeChild(script);
          } else {
            // Otherwise, avoid the DOM node creation, insertion
            // and removal by using an indirect global eval
            indirect(code);
          }
        }
      },

      // Convert dashed to camelCase; used by the css and data modules
      // Support: IE9-11+
      // Microsoft forgot to hump their vendor prefix (#9572)
      camelCase: function(string) {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
      },

      nodeName: function(elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
      },

      // args is for internal usage only
      each: function(obj, callback, args) {
        var value,
          i = 0,
          length = obj.length,
          isArray = isArraylike(obj);

        if (args) {
          if (isArray) {
            for (; i < length; i++) {
              value = callback.apply(obj[i], args);

              if (value === false) {
                break;
              }
            }
          } else {
            for (i in obj) {
              value = callback.apply(obj[i], args);

              if (value === false) {
                break;
              }
            }
          }

          // A special, fast, case for the most common use of each
        } else {
          if (isArray) {
            for (; i < length; i++) {
              value = callback.call(obj[i], i, obj[i]);

              if (value === false) {
                break;
              }
            }
          } else {
            for (i in obj) {
              value = callback.call(obj[i], i, obj[i]);

              if (value === false) {
                break;
              }
            }
          }
        }

        return obj;
      },

      // Support: Android<4.1
      trim: function(text) {
        return text == null ?
          "" :
          (text + "").replace(rtrim, "");
      },

      // results is for internal usage only
      makeArray: function(arr, results) {
        var ret = results || [];

        if (arr != null) {
          if (isArraylike(Object(arr))) {
            jQuery.merge(ret,
              typeof arr === "string" ? [arr] : arr
            );
          } else {
            push.call(ret, arr);
          }
        }

        return ret;
      },

      inArray: function(elem, arr, i) {
        return arr == null ? -1 : indexOf.call(arr, elem, i);
      },

      merge: function(first, second) {
        var len = +second.length,
          j = 0,
          i = first.length;

        for (; j < len; j++) {
          first[i++] = second[j];
        }

        first.length = i;

        return first;
      },

      grep: function(elems, callback, invert) {
        var callbackInverse,
          matches = [],
          i = 0,
          length = elems.length,
          callbackExpect = !invert;

        // Go through the array, only saving the items
        // that pass the validator function
        for (; i < length; i++) {
          callbackInverse = !callback(elems[i], i);
          if (callbackInverse !== callbackExpect) {
            matches.push(elems[i]);
          }
        }

        return matches;
      },

      // arg is for internal usage only
      map: function(elems, callback, arg) {
        var value,
          i = 0,
          length = elems.length,
          isArray = isArraylike(elems),
          ret = [];

        // Go through the array, translating each of the items to their new values
        if (isArray) {
          for (; i < length; i++) {
            value = callback(elems[i], i, arg);

            if (value != null) {
              ret.push(value);
            }
          }

          // Go through every key on the object,
        } else {
          for (i in elems) {
            value = callback(elems[i], i, arg);

            if (value != null) {
              ret.push(value);
            }
          }
        }

        // Flatten any nested arrays
        return concat.apply([], ret);
      },

      // A global GUID counter for objects
      guid: 1,

      // Bind a function to a context, optionally partially applying any
      // arguments.
      proxy: function(fn, context) {
        var tmp, args, proxy;

        if (typeof context === "string") {
          tmp = fn[context];
          context = fn;
          fn = tmp;
        }

        // Quick check to determine if target is callable, in the spec
        // this throws a TypeError, but we will just return undefined.
        if (!jQuery.isFunction(fn)) {
          return undefined;
        }

        // Simulated bind
        args = slice.call(arguments, 2);
        proxy = function() {
          return fn.apply(context || this, args.concat(slice.call(arguments)));
        };

        // Set the guid of unique handler to the same of original handler, so it can be removed
        proxy.guid = fn.guid = fn.guid || jQuery.guid++;

        return proxy;
      },

      now: Date.now,

      // jQuery.support is not used in Core but other projects attach their
      // properties to it so it needs to exist.
      support: support
    });

    // Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
      class2type["[object " + name + "]"] = name.toLowerCase();
    });

    function isArraylike(obj) {

      // Support: iOS 8.2 (not reproducible in simulator)
      // `in` check used to prevent JIT error (gh-2145)
      // hasOwn isn't used here due to false negatives
      // regarding Nodelist length in IE
      var length = "length" in obj && obj.length,
        type = jQuery.type(obj);

      if (type === "function" || jQuery.isWindow(obj)) {
        return false;
      }

      if (obj.nodeType === 1 && length) {
        return true;
      }

      return type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in obj;
    }

    var Sizzle =
      /*!
       * Sizzle CSS Selector Engine v2.2.0-pre
       * http://sizzlejs.com/
       *
       * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
       * Released under the MIT license
       * http://jquery.org/license
       *
       * Date: 2014-12-16
       */
      (function(window) {

        var i,
          support,
          Expr,
          getText,
          isXML,
          tokenize,
          compile,
          select,
          outermostContext,
          sortInput,
          hasDuplicate,

          // Local document vars
          setDocument,
          document,
          docElem,
          documentIsHTML,
          rbuggyQSA,
          rbuggyMatches,
          matches,
          contains,

          // Instance-specific data
          expando = "sizzle" + 1 * new Date(),
          preferredDoc = window.document,
          dirruns = 0,
          done = 0,
          classCache = createCache(),
          tokenCache = createCache(),
          compilerCache = createCache(),
          sortOrder = function(a, b) {
            if (a === b) {
              hasDuplicate = true;
            }
            return 0;
          },

          // General-purpose constants
          MAX_NEGATIVE = 1 << 31,

          // Instance methods
          hasOwn = ({}).hasOwnProperty,
          arr = [],
          pop = arr.pop,
          push_native = arr.push,
          push = arr.push,
          slice = arr.slice,
          // Use a stripped-down indexOf as it's faster than native
          // http://jsperf.com/thor-indexof-vs-for/5
          indexOf = function(list, elem) {
            var i = 0,
              len = list.length;
            for (; i < len; i++) {
              if (list[i] === elem) {
                return i;
              }
            }
            return -1;
          },

          booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

          // Regular expressions

          // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
          whitespace = "[\\x20\\t\\r\\n\\f]",
          // http://www.w3.org/TR/css3-syntax/#characters
          characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

          // Loosely modeled on CSS identifier characters
          // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
          // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
          identifier = characterEncoding.replace("w", "w#"),

          // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
          attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
          // Operator (capture 2)
          "*([*^$|!~]?=)" + whitespace +
          // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
          "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
          "*\\]",

          pseudos = ":(" + characterEncoding + ")(?:\\((" +
          // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
          // 1. quoted (capture 3; capture 4 or capture 5)
          "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
          // 2. simple (capture 6)
          "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
          // 3. anything else (capture 2)
          ".*" +
          ")\\)|)",

          // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
          rwhitespace = new RegExp(whitespace + "+", "g"),
          rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

          rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
          rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),

          rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),

          rpseudo = new RegExp(pseudos),
          ridentifier = new RegExp("^" + identifier + "$"),

          matchExpr = {
            "ID": new RegExp("^#(" + characterEncoding + ")"),
            "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
            "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            "ATTR": new RegExp("^" + attributes),
            "PSEUDO": new RegExp("^" + pseudos),
            "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
              "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
              "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            "bool": new RegExp("^(?:" + booleans + ")$", "i"),
            // For use in libraries implementing .is()
            // We use this for POS matching in `select`
            "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
          },

          rinputs = /^(?:input|select|textarea|button)$/i,
          rheader = /^h\d$/i,

          rnative = /^[^{]+\{\s*\[native \w/,

          // Easily-parseable/retrievable ID or TAG or CLASS selectors
          rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

          rsibling = /[+~]/,
          rescape = /'|\\/g,

          // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
          runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
          funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 0x10000;
            // NaN means non-codepoint
            // Support: Firefox<24
            // Workaround erroneous numeric interpretation of +"0x"
            return high !== high || escapedWhitespace ?
              escaped :
              high < 0 ?
              // BMP codepoint
              String.fromCharCode(high + 0x10000) :
              // Supplemental Plane codepoint (surrogate pair)
              String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
          },

          // Used for iframes
          // See setDocument()
          // Removing the function wrapper causes a "Permission Denied"
          // error in IE
          unloadHandler = function() {
            setDocument();
          };

        // Optimize for push.apply( _, NodeList )
        try {
          push.apply(
            (arr = slice.call(preferredDoc.childNodes)),
            preferredDoc.childNodes
          );
          // Support: Android<4.0
          // Detect silently failing push.apply
          arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
          push = {
            apply: arr.length ?

              // Leverage slice if possible
              function(target, els) {
                push_native.apply(target, slice.call(els));
              } :

              // Support: IE<9
              // Otherwise append directly
              function(target, els) {
                var j = target.length,
                  i = 0;
                // Can't trust NodeList.length
                while ((target[j++] = els[i++])) {}
                target.length = j - 1;
              }
          };
        }

        function Sizzle(selector, context, results, seed) {
          var match, elem, m, nodeType,
            // QSA vars
            i, groups, old, nid, newContext, newSelector;

          if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
            setDocument(context);
          }

          context = context || document;
          results = results || [];
          nodeType = context.nodeType;

          if (typeof selector !== "string" || !selector ||
            nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

            return results;
          }

          if (!seed && documentIsHTML) {

            // Try to shortcut find operations when possible (e.g., not under DocumentFragment)
            if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
              // Speed-up: Sizzle("#ID")
              if ((m = match[1])) {
                if (nodeType === 9) {
                  elem = context.getElementById(m);
                  // Check parentNode to catch when Blackberry 4.6 returns
                  // nodes that are no longer in the document (jQuery #6963)
                  if (elem && elem.parentNode) {
                    // Handle the case where IE, Opera, and Webkit return items
                    // by name instead of ID
                    if (elem.id === m) {
                      results.push(elem);
                      return results;
                    }
                  } else {
                    return results;
                  }
                } else {
                  // Context is not a document
                  if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
                    contains(context, elem) && elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                }

                // Speed-up: Sizzle("TAG")
              } else if (match[2]) {
                push.apply(results, context.getElementsByTagName(selector));
                return results;

                // Speed-up: Sizzle(".CLASS")
              } else if ((m = match[3]) && support.getElementsByClassName) {
                push.apply(results, context.getElementsByClassName(m));
                return results;
              }
            }

            // QSA path
            if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
              nid = old = expando;
              newContext = context;
              newSelector = nodeType !== 1 && selector;

              // qSA works strangely on Element-rooted queries
              // We can work around this by specifying an extra ID on the root
              // and working up from there (Thanks to Andrew Dupont for the technique)
              // IE 8 doesn't work on object elements
              if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                groups = tokenize(selector);

                if ((old = context.getAttribute("id"))) {
                  nid = old.replace(rescape, "\\$&");
                } else {
                  context.setAttribute("id", nid);
                }
                nid = "[id='" + nid + "'] ";

                i = groups.length;
                while (i--) {
                  groups[i] = nid + toSelector(groups[i]);
                }
                newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                newSelector = groups.join(",");
              }

              if (newSelector) {
                try {
                  push.apply(results,
                    newContext.querySelectorAll(newSelector)
                  );
                  return results;
                } catch (qsaError) {} finally {
                  if (!old) {
                    context.removeAttribute("id");
                  }
                }
              }
            }
          }

          // All others
          return select(selector.replace(rtrim, "$1"), context, results, seed);
        }

        /**
         * Create key-value caches of limited size
         * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
         *    property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
         *    deleting the oldest entry
         */
        function createCache() {
          var keys = [];

          function cache(key, value) {
            // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
            if (keys.push(key + " ") > Expr.cacheLength) {
              // Only keep the most recent entries
              delete cache[keys.shift()];
            }
            return (cache[key + " "] = value);
          }

          return cache;
        }

        /**
         * Mark a function for special use by Sizzle
         * @param {Function} fn The function to mark
         */
        function markFunction(fn) {
          fn[expando] = true;
          return fn;
        }

        /**
         * Support testing using an element
         * @param {Function} fn Passed the created div and expects a boolean result
         */
        function assert(fn) {
          var div = document.createElement("div");

          try {
            return !!fn(div);
          } catch (e) {
            return false;
          } finally {
            // Remove from its parent by default
            if (div.parentNode) {
              div.parentNode.removeChild(div);
            }
            // release memory in IE
            div = null;
          }
        }

        /**
         * Adds the same handler for all of the specified attrs
         * @param {String} attrs Pipe-separated list of attributes
         * @param {Function} handler The method that will be applied
         */
        function addHandle(attrs, handler) {
          var arr = attrs.split("|"),
            i = attrs.length;

          while (i--) {
            Expr.attrHandle[arr[i]] = handler;
          }
        }

        /**
         * Checks document order of two siblings
         * @param {Element} a
         * @param {Element} b
         * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
         */
        function siblingCheck(a, b) {
          var cur = b && a,
            diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
            (~b.sourceIndex || MAX_NEGATIVE) -
            (~a.sourceIndex || MAX_NEGATIVE);

          // Use IE sourceIndex if available on both nodes
          if (diff) {
            return diff;
          }

          // Check if b follows a
          if (cur) {
            while ((cur = cur.nextSibling)) {
              if (cur === b) {
                return -1;
              }
            }
          }

          return a ? 1 : -1;
        }

        /**
         * Returns a function to use in pseudos for input types
         * @param {String} type
         */
        function createInputPseudo(type) {
          return function(elem) {
            var name = elem.nodeName.toLowerCase();
            return name === "input" && elem.type === type;
          };
        }

        /**
         * Returns a function to use in pseudos for buttons
         * @param {String} type
         */
        function createButtonPseudo(type) {
          return function(elem) {
            var name = elem.nodeName.toLowerCase();
            return (name === "input" || name === "button") && elem.type === type;
          };
        }

        /**
         * Returns a function to use in pseudos for positionals
         * @param {Function} fn
         */
        function createPositionalPseudo(fn) {
          return markFunction(function(argument) {
            argument = +argument;
            return markFunction(function(seed, matches) {
              var j,
                matchIndexes = fn([], seed.length, argument),
                i = matchIndexes.length;

              // Match elements found at the specified indexes
              while (i--) {
                if (seed[(j = matchIndexes[i])]) {
                  seed[j] = !(matches[j] = seed[j]);
                }
              }
            });
          });
        }

        /**
         * Checks a node for validity as a Sizzle context
         * @param {Element|Object=} context
         * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
         */
        function testContext(context) {
          return context && typeof context.getElementsByTagName !== "undefined" && context;
        }

        // Expose support vars for convenience
        support = Sizzle.support = {};

        /**
         * Detects XML nodes
         * @param {Element|Object} elem An element or a document
         * @returns {Boolean} True iff elem is a non-HTML XML node
         */
        isXML = Sizzle.isXML = function(elem) {
          // documentElement is verified for cases where it doesn't yet exist
          // (such as loading iframes in IE - #4833)
          var documentElement = elem && (elem.ownerDocument || elem).documentElement;
          return documentElement ? documentElement.nodeName !== "HTML" : false;
        };

        /**
         * Sets document-related variables once based on the current document
         * @param {Element|Object} [doc] An element or document object to use to set the document
         * @returns {Object} Returns the current document
         */
        setDocument = Sizzle.setDocument = function(node) {
          var hasCompare, parent,
            doc = node ? node.ownerDocument || node : preferredDoc;

          // If no document and documentElement is available, return
          if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
            return document;
          }

          // Set our document
          document = doc;
          docElem = doc.documentElement;
          parent = doc.defaultView;

          // Support: IE>8
          // If iframe document is assigned to "document" variable and if iframe has been reloaded,
          // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
          // IE6-8 do not support the defaultView property so parent will be undefined
          if (parent && parent !== parent.top) {
            // IE11 does not have attachEvent, so all must suffer
            if (parent.addEventListener) {
              parent.addEventListener("unload", unloadHandler, false);
            } else if (parent.attachEvent) {
              parent.attachEvent("onunload", unloadHandler);
            }
          }

          /* Support tests
           ---------------------------------------------------------------------- */
          documentIsHTML = !isXML(doc);

          /* Attributes
           ---------------------------------------------------------------------- */

          // Support: IE<8
          // Verify that getAttribute really returns attributes and not properties
          // (excepting IE8 booleans)
          support.attributes = assert(function(div) {
            div.className = "i";
            return !div.getAttribute("className");
          });

          /* getElement(s)By*
           ---------------------------------------------------------------------- */

          // Check if getElementsByTagName("*") returns only elements
          support.getElementsByTagName = assert(function(div) {
            div.appendChild(doc.createComment(""));
            return !div.getElementsByTagName("*").length;
          });

          // Support: IE<9
          support.getElementsByClassName = rnative.test(doc.getElementsByClassName);

          // Support: IE<10
          // Check if getElementById returns elements by name
          // The broken getElementById methods don't pick up programatically-set names,
          // so use a roundabout getElementsByName test
          support.getById = assert(function(div) {
            docElem.appendChild(div).id = expando;
            return !doc.getElementsByName || !doc.getElementsByName(expando).length;
          });

          // ID find and filter
          if (support.getById) {
            Expr.find["ID"] = function(id, context) {
              if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                var m = context.getElementById(id);
                // Check parentNode to catch when Blackberry 4.6 returns
                // nodes that are no longer in the document #6963
                return m && m.parentNode ? [m] : [];
              }
            };
            Expr.filter["ID"] = function(id) {
              var attrId = id.replace(runescape, funescape);
              return function(elem) {
                return elem.getAttribute("id") === attrId;
              };
            };
          } else {
            // Support: IE6/7
            // getElementById is not reliable as a find shortcut
            delete Expr.find["ID"];

            Expr.filter["ID"] = function(id) {
              var attrId = id.replace(runescape, funescape);
              return function(elem) {
                var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                return node && node.value === attrId;
              };
            };
          }

          // Tag
          Expr.find["TAG"] = support.getElementsByTagName ?
            function(tag, context) {
              if (typeof context.getElementsByTagName !== "undefined") {
                return context.getElementsByTagName(tag);

                // DocumentFragment nodes don't have gEBTN
              } else if (support.qsa) {
                return context.querySelectorAll(tag);
              }
            } :

            function(tag, context) {
              var elem,
                tmp = [],
                i = 0,
                // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                results = context.getElementsByTagName(tag);

              // Filter out possible comments
              if (tag === "*") {
                while ((elem = results[i++])) {
                  if (elem.nodeType === 1) {
                    tmp.push(elem);
                  }
                }

                return tmp;
              }
              return results;
            };

          // Class
          Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
            if (documentIsHTML) {
              return context.getElementsByClassName(className);
            }
          };

          /* QSA/matchesSelector
           ---------------------------------------------------------------------- */

          // QSA and matchesSelector support

          // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
          rbuggyMatches = [];

          // qSa(:focus) reports false when true (Chrome 21)
          // We allow this because of a bug in IE8/9 that throws an error
          // whenever `document.activeElement` is accessed on an iframe
          // So, we allow :focus to pass through QSA all the time to avoid the IE error
          // See http://bugs.jquery.com/ticket/13378
          rbuggyQSA = [];

          if ((support.qsa = rnative.test(doc.querySelectorAll))) {
            // Build QSA regex
            // Regex strategy adopted from Diego Perini
            assert(function(div) {
              // Select is set to empty string on purpose
              // This is to test IE's treatment of not explicitly
              // setting a boolean content attribute,
              // since its presence should be enough
              // http://bugs.jquery.com/ticket/12359
              docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" +
                "<select id='" + expando + "-\f]' msallowcapture=''>" +
                "<option selected=''></option></select>";

              // Support: IE8, Opera 11-12.16
              // Nothing should be selected when empty strings follow ^= or $= or *=
              // The test attribute must be unknown in Opera but "safe" for WinRT
              // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
              if (div.querySelectorAll("[msallowcapture^='']").length) {
                rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
              }

              // Support: IE8
              // Boolean attributes and "value" are not treated correctly
              if (!div.querySelectorAll("[selected]").length) {
                rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
              }

              // Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
              if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
                rbuggyQSA.push("~=");
              }

              // Webkit/Opera - :checked should return selected option elements
              // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
              // IE8 throws error here and will not see later tests
              if (!div.querySelectorAll(":checked").length) {
                rbuggyQSA.push(":checked");
              }

              // Support: Safari 8+, iOS 8+
              // https://bugs.webkit.org/show_bug.cgi?id=136851
              // In-page `selector#id sibing-combinator selector` fails
              if (!div.querySelectorAll("a#" + expando + "+*").length) {
                rbuggyQSA.push(".#.+[+~]");
              }
            });

            assert(function(div) {
              // Support: Windows 8 Native Apps
              // The type and name attributes are restricted during .innerHTML assignment
              var input = doc.createElement("input");
              input.setAttribute("type", "hidden");
              div.appendChild(input).setAttribute("name", "D");

              // Support: IE8
              // Enforce case-sensitivity of name attribute
              if (div.querySelectorAll("[name=d]").length) {
                rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
              }

              // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
              // IE8 throws error here and will not see later tests
              if (!div.querySelectorAll(":enabled").length) {
                rbuggyQSA.push(":enabled", ":disabled");
              }

              // Opera 10-11 does not throw on post-comma invalid pseudos
              div.querySelectorAll("*,:x");
              rbuggyQSA.push(",.*:");
            });
          }

          if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
              docElem.webkitMatchesSelector ||
              docElem.mozMatchesSelector ||
              docElem.oMatchesSelector ||
              docElem.msMatchesSelector)))) {

            assert(function(div) {
              // Check to see if it's possible to do matchesSelector
              // on a disconnected node (IE 9)
              support.disconnectedMatch = matches.call(div, "div");

              // This should fail with an exception
              // Gecko does not error, returns false instead
              matches.call(div, "[s!='']:x");
              rbuggyMatches.push("!=", pseudos);
            });
          }

          rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
          rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

          /* Contains
           ---------------------------------------------------------------------- */
          hasCompare = rnative.test(docElem.compareDocumentPosition);

          // Element contains another
          // Purposefully does not implement inclusive descendent
          // As in, an element does not contain itself
          contains = hasCompare || rnative.test(docElem.contains) ?
            function(a, b) {
              var adown = a.nodeType === 9 ? a.documentElement : a,
                bup = b && b.parentNode;
              return a === bup || !!(bup && bup.nodeType === 1 && (
                adown.contains ?
                adown.contains(bup) :
                a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
              ));
            } :
            function(a, b) {
              if (b) {
                while ((b = b.parentNode)) {
                  if (b === a) {
                    return true;
                  }
                }
              }
              return false;
            };

          /* Sorting
           ---------------------------------------------------------------------- */

          // Document order sorting
          sortOrder = hasCompare ?
            function(a, b) {

              // Flag for duplicate removal
              if (a === b) {
                hasDuplicate = true;
                return 0;
              }

              // Sort on method existence if only one input has compareDocumentPosition
              var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
              if (compare) {
                return compare;
              }

              // Calculate position if both inputs belong to the same document
              compare = (a.ownerDocument || a) === (b.ownerDocument || b) ?
                a.compareDocumentPosition(b) :

                // Otherwise we know they are disconnected
                1;

              // Disconnected nodes
              if (compare & 1 ||
                (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {

                // Choose the first element that is related to our preferred document
                if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                  return -1;
                }
                if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                  return 1;
                }

                // Maintain original order
                return sortInput ?
                  (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                  0;
              }

              return compare & 4 ? -1 : 1;
            } :
            function(a, b) {
              // Exit early if the nodes are identical
              if (a === b) {
                hasDuplicate = true;
                return 0;
              }

              var cur,
                i = 0,
                aup = a.parentNode,
                bup = b.parentNode,
                ap = [a],
                bp = [b];

              // Parentless nodes are either documents or disconnected
              if (!aup || !bup) {
                return a === doc ? -1 :
                  b === doc ? 1 :
                  aup ? -1 :
                  bup ? 1 :
                  sortInput ?
                  (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                  0;

                // If the nodes are siblings, we can do a quick check
              } else if (aup === bup) {
                return siblingCheck(a, b);
              }

              // Otherwise we need full lists of their ancestors for comparison
              cur = a;
              while ((cur = cur.parentNode)) {
                ap.unshift(cur);
              }
              cur = b;
              while ((cur = cur.parentNode)) {
                bp.unshift(cur);
              }

              // Walk down the tree looking for a discrepancy
              while (ap[i] === bp[i]) {
                i++;
              }

              return i ?
                // Do a sibling check if the nodes have a common ancestor
                siblingCheck(ap[i], bp[i]) :

                // Otherwise nodes in our document sort first
                ap[i] === preferredDoc ? -1 :
                bp[i] === preferredDoc ? 1 :
                0;
            };

          return doc;
        };

        Sizzle.matches = function(expr, elements) {
          return Sizzle(expr, null, null, elements);
        };

        Sizzle.matchesSelector = function(elem, expr) {
          // Set document vars if needed
          if ((elem.ownerDocument || elem) !== document) {
            setDocument(elem);
          }

          // Make sure that attribute selectors are quoted
          expr = expr.replace(rattributeQuotes, "='$1']");

          if (support.matchesSelector && documentIsHTML &&
            (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
            (!rbuggyQSA || !rbuggyQSA.test(expr))) {

            try {
              var ret = matches.call(elem, expr);

              // IE 9's matchesSelector returns false on disconnected nodes
              if (ret || support.disconnectedMatch ||
                // As well, disconnected nodes are said to be in a document
                // fragment in IE 9
                elem.document && elem.document.nodeType !== 11) {
                return ret;
              }
            } catch (e) {}
          }

          return Sizzle(expr, document, null, [elem]).length > 0;
        };

        Sizzle.contains = function(context, elem) {
          // Set document vars if needed
          if ((context.ownerDocument || context) !== document) {
            setDocument(context);
          }
          return contains(context, elem);
        };

        Sizzle.attr = function(elem, name) {
          // Set document vars if needed
          if ((elem.ownerDocument || elem) !== document) {
            setDocument(elem);
          }

          var fn = Expr.attrHandle[name.toLowerCase()],
            // Don't get fooled by Object.prototype properties (jQuery #13807)
            val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
            fn(elem, name, !documentIsHTML) :
            undefined;

          return val !== undefined ?
            val :
            support.attributes || !documentIsHTML ?
            elem.getAttribute(name) :
            (val = elem.getAttributeNode(name)) && val.specified ?
            val.value :
            null;
        };

        Sizzle.error = function(msg) {
          throw new Error("Syntax error, unrecognized expression: " + msg);
        };

        /**
         * Document sorting and removing duplicates
         * @param {ArrayLike} results
         */
        Sizzle.uniqueSort = function(results) {
          var elem,
            duplicates = [],
            j = 0,
            i = 0;

          // Unless we *know* we can detect duplicates, assume their presence
          hasDuplicate = !support.detectDuplicates;
          sortInput = !support.sortStable && results.slice(0);
          results.sort(sortOrder);

          if (hasDuplicate) {
            while ((elem = results[i++])) {
              if (elem === results[i]) {
                j = duplicates.push(i);
              }
            }
            while (j--) {
              results.splice(duplicates[j], 1);
            }
          }

          // Clear input after sorting to release objects
          // See https://github.com/jquery/sizzle/pull/225
          sortInput = null;

          return results;
        };

        /**
         * Utility function for retrieving the text value of an array of DOM nodes
         * @param {Array|Element} elem
         */
        getText = Sizzle.getText = function(elem) {
          var node,
            ret = "",
            i = 0,
            nodeType = elem.nodeType;

          if (!nodeType) {
            // If no nodeType, this is expected to be an array
            while ((node = elem[i++])) {
              // Do not traverse comment nodes
              ret += getText(node);
            }
          } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
            // Use textContent for elements
            // innerText usage removed for consistency of new lines (jQuery #11153)
            if (typeof elem.textContent === "string") {
              return elem.textContent;
            } else {
              // Traverse its children
              for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                ret += getText(elem);
              }
            }
          } else if (nodeType === 3 || nodeType === 4) {
            return elem.nodeValue;
          }
          // Do not include comment or processing instruction nodes

          return ret;
        };

        Expr = Sizzle.selectors = {

          // Can be adjusted by the user
          cacheLength: 50,

          createPseudo: markFunction,

          match: matchExpr,

          attrHandle: {},

          find: {},

          relative: {
            ">": {
              dir: "parentNode",
              first: true
            },
            " ": {
              dir: "parentNode"
            },
            "+": {
              dir: "previousSibling",
              first: true
            },
            "~": {
              dir: "previousSibling"
            }
          },

          preFilter: {
            "ATTR": function(match) {
              match[1] = match[1].replace(runescape, funescape);

              // Move the given value to match[3] whether quoted or unquoted
              match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

              if (match[2] === "~=") {
                match[3] = " " + match[3] + " ";
              }

              return match.slice(0, 4);
            },

            "CHILD": function(match) {
              /* matches from matchExpr["CHILD"]
               1 type (only|nth|...)
               2 what (child|of-type)
               3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
               4 xn-component of xn+y argument ([+-]?\d*n|)
               5 sign of xn-component
               6 x of xn-component
               7 sign of y-component
               8 y of y-component
               */
              match[1] = match[1].toLowerCase();

              if (match[1].slice(0, 3) === "nth") {
                // nth-* requires argument
                if (!match[3]) {
                  Sizzle.error(match[0]);
                }

                // numeric x and y parameters for Expr.filter.CHILD
                // remember that false/true cast respectively to 0/1
                match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                match[5] = +((match[7] + match[8]) || match[3] === "odd");

                // other types prohibit arguments
              } else if (match[3]) {
                Sizzle.error(match[0]);
              }

              return match;
            },

            "PSEUDO": function(match) {
              var excess,
                unquoted = !match[6] && match[2];

              if (matchExpr["CHILD"].test(match[0])) {
                return null;
              }

              // Accept quoted arguments as-is
              if (match[3]) {
                match[2] = match[4] || match[5] || "";

                // Strip excess characters from unquoted arguments
              } else if (unquoted && rpseudo.test(unquoted) &&
                // Get excess from tokenize (recursively)
                (excess = tokenize(unquoted, true)) &&
                // advance to the next closing parenthesis
                (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

                // excess is a negative index
                match[0] = match[0].slice(0, excess);
                match[2] = unquoted.slice(0, excess);
              }

              // Return only captures needed by the pseudo filter method (type and argument)
              return match.slice(0, 3);
            }
          },

          filter: {

            "TAG": function(nodeNameSelector) {
              var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
              return nodeNameSelector === "*" ?
                function() {
                  return true;
                } :
                function(elem) {
                  return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                };
            },

            "CLASS": function(className) {
              var pattern = classCache[className + " "];

              return pattern ||
                (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
                classCache(className, function(elem) {
                  return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
                });
            },

            "ATTR": function(name, operator, check) {
              return function(elem) {
                var result = Sizzle.attr(elem, name);

                if (result == null) {
                  return operator === "!=";
                }
                if (!operator) {
                  return true;
                }

                result += "";

                return operator === "=" ? result === check :
                  operator === "!=" ? result !== check :
                  operator === "^=" ? check && result.indexOf(check) === 0 :
                  operator === "*=" ? check && result.indexOf(check) > -1 :
                  operator === "$=" ? check && result.slice(-check.length) === check :
                  operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 :
                  operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                  false;
              };
            },

            "CHILD": function(type, what, argument, first, last) {
              var simple = type.slice(0, 3) !== "nth",
                forward = type.slice(-4) !== "last",
                ofType = what === "of-type";

              return first === 1 && last === 0 ?

                // Shortcut for :nth-*(n)
                function(elem) {
                  return !!elem.parentNode;
                } :

                function(elem, context, xml) {
                  var cache, outerCache, node, diff, nodeIndex, start,
                    dir = simple !== forward ? "nextSibling" : "previousSibling",
                    parent = elem.parentNode,
                    name = ofType && elem.nodeName.toLowerCase(),
                    useCache = !xml && !ofType;

                  if (parent) {

                    // :(first|last|only)-(child|of-type)
                    if (simple) {
                      while (dir) {
                        node = elem;
                        while ((node = node[dir])) {
                          if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                            return false;
                          }
                        }
                        // Reverse direction for :only-* (if we haven't yet done so)
                        start = dir = type === "only" && !start && "nextSibling";
                      }
                      return true;
                    }

                    start = [forward ? parent.firstChild : parent.lastChild];

                    // non-xml :nth-child(...) stores cache data on `parent`
                    if (forward && useCache) {
                      // Seek `elem` from a previously-cached index
                      outerCache = parent[expando] || (parent[expando] = {});
                      cache = outerCache[type] || [];
                      nodeIndex = cache[0] === dirruns && cache[1];
                      diff = cache[0] === dirruns && cache[2];
                      node = nodeIndex && parent.childNodes[nodeIndex];

                      while ((node = ++nodeIndex && node && node[dir] ||

                          // Fallback to seeking `elem` from the start
                          (diff = nodeIndex = 0) || start.pop())) {

                        // When found, cache indexes on `parent` and break
                        if (node.nodeType === 1 && ++diff && node === elem) {
                          outerCache[type] = [dirruns, nodeIndex, diff];
                          break;
                        }
                      }

                      // Use previously-cached element index if available
                    } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                      diff = cache[1];

                      // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                    } else {
                      // Use the same loop as above to seek `elem` from the start
                      while ((node = ++nodeIndex && node && node[dir] ||
                          (diff = nodeIndex = 0) || start.pop())) {

                        if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                          // Cache the index of each encountered element
                          if (useCache) {
                            (node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
                          }

                          if (node === elem) {
                            break;
                          }
                        }
                      }
                    }

                    // Incorporate the offset, then check against cycle size
                    diff -= last;
                    return diff === first || (diff % first === 0 && diff / first >= 0);
                  }
                };
            },

            "PSEUDO": function(pseudo, argument) {
              // pseudo-class names are case-insensitive
              // http://www.w3.org/TR/selectors/#pseudo-classes
              // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
              // Remember that setFilters inherits from pseudos
              var args,
                fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
                Sizzle.error("unsupported pseudo: " + pseudo);

              // The user may use createPseudo to indicate that
              // arguments are needed to create the filter function
              // just as Sizzle does
              if (fn[expando]) {
                return fn(argument);
              }

              // But maintain support for old signatures
              if (fn.length > 1) {
                args = [pseudo, pseudo, "", argument];
                return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                  markFunction(function(seed, matches) {
                    var idx,
                      matched = fn(seed, argument),
                      i = matched.length;
                    while (i--) {
                      idx = indexOf(seed, matched[i]);
                      seed[idx] = !(matches[idx] = matched[i]);
                    }
                  }) :
                  function(elem) {
                    return fn(elem, 0, args);
                  };
              }

              return fn;
            }
          },

          pseudos: {
            // Potentially complex pseudos
            "not": markFunction(function(selector) {
              // Trim the selector passed to compile
              // to avoid treating leading and trailing
              // spaces as combinators
              var input = [],
                results = [],
                matcher = compile(selector.replace(rtrim, "$1"));

              return matcher[expando] ?
                markFunction(function(seed, matches, context, xml) {
                  var elem,
                    unmatched = matcher(seed, null, xml, []),
                    i = seed.length;

                  // Match elements unmatched by `matcher`
                  while (i--) {
                    if ((elem = unmatched[i])) {
                      seed[i] = !(matches[i] = elem);
                    }
                  }
                }) :
                function(elem, context, xml) {
                  input[0] = elem;
                  matcher(input, null, xml, results);
                  // Don't keep the element (issue #299)
                  input[0] = null;
                  return !results.pop();
                };
            }),

            "has": markFunction(function(selector) {
              return function(elem) {
                return Sizzle(selector, elem).length > 0;
              };
            }),

            "contains": markFunction(function(text) {
              text = text.replace(runescape, funescape);
              return function(elem) {
                return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
              };
            }),

            // "Whether an element is represented by a :lang() selector
            // is based solely on the element's language value
            // being equal to the identifier C,
            // or beginning with the identifier C immediately followed by "-".
            // The matching of C against the element's language value is performed case-insensitively.
            // The identifier C does not have to be a valid language name."
            // http://www.w3.org/TR/selectors/#lang-pseudo
            "lang": markFunction(function(lang) {
              // lang value must be a valid identifier
              if (!ridentifier.test(lang || "")) {
                Sizzle.error("unsupported lang: " + lang);
              }
              lang = lang.replace(runescape, funescape).toLowerCase();
              return function(elem) {
                var elemLang;
                do {
                  if ((elemLang = documentIsHTML ?
                      elem.lang :
                      elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {

                    elemLang = elemLang.toLowerCase();
                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                  }
                } while ((elem = elem.parentNode) && elem.nodeType === 1);
                return false;
              };
            }),

            // Miscellaneous
            "target": function(elem) {
              var hash = window.location && window.location.hash;
              return hash && hash.slice(1) === elem.id;
            },

            "root": function(elem) {
              return elem === docElem;
            },

            "focus": function(elem) {
              return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
            },

            // Boolean properties
            "enabled": function(elem) {
              return elem.disabled === false;
            },

            "disabled": function(elem) {
              return elem.disabled === true;
            },

            "checked": function(elem) {
              // In CSS3, :checked should return both checked and selected elements
              // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
              var nodeName = elem.nodeName.toLowerCase();
              return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
            },

            "selected": function(elem) {
              // Accessing this property makes selected-by-default
              // options in Safari work properly
              if (elem.parentNode) {
                elem.parentNode.selectedIndex;
              }

              return elem.selected === true;
            },

            // Contents
            "empty": function(elem) {
              // http://www.w3.org/TR/selectors/#empty-pseudo
              // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
              //   but not by others (comment: 8; processing instruction: 7; etc.)
              // nodeType < 6 works because attributes (2) do not appear as children
              for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                if (elem.nodeType < 6) {
                  return false;
                }
              }
              return true;
            },

            "parent": function(elem) {
              return !Expr.pseudos["empty"](elem);
            },

            // Element/input types
            "header": function(elem) {
              return rheader.test(elem.nodeName);
            },

            "input": function(elem) {
              return rinputs.test(elem.nodeName);
            },

            "button": function(elem) {
              var name = elem.nodeName.toLowerCase();
              return name === "input" && elem.type === "button" || name === "button";
            },

            "text": function(elem) {
              var attr;
              return elem.nodeName.toLowerCase() === "input" &&
                elem.type === "text" &&

                // Support: IE<8
                // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
            },

            // Position-in-collection
            "first": createPositionalPseudo(function() {
              return [0];
            }),

            "last": createPositionalPseudo(function(matchIndexes, length) {
              return [length - 1];
            }),

            "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
              return [argument < 0 ? argument + length : argument];
            }),

            "even": createPositionalPseudo(function(matchIndexes, length) {
              var i = 0;
              for (; i < length; i += 2) {
                matchIndexes.push(i);
              }
              return matchIndexes;
            }),

            "odd": createPositionalPseudo(function(matchIndexes, length) {
              var i = 1;
              for (; i < length; i += 2) {
                matchIndexes.push(i);
              }
              return matchIndexes;
            }),

            "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
              var i = argument < 0 ? argument + length : argument;
              for (; --i >= 0;) {
                matchIndexes.push(i);
              }
              return matchIndexes;
            }),

            "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
              var i = argument < 0 ? argument + length : argument;
              for (; ++i < length;) {
                matchIndexes.push(i);
              }
              return matchIndexes;
            })
          }
        };

        Expr.pseudos["nth"] = Expr.pseudos["eq"];

        // Add button/input type pseudos
        for (i in {
            radio: true,
            checkbox: true,
            file: true,
            password: true,
            image: true
          }) {
          Expr.pseudos[i] = createInputPseudo(i);
        }
        for (i in {
            submit: true,
            reset: true
          }) {
          Expr.pseudos[i] = createButtonPseudo(i);
        }

        // Easy API for creating new setFilters
        function setFilters() {}

        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();

        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
          var matched, match, tokens, type,
            soFar, groups, preFilters,
            cached = tokenCache[selector + " "];

          if (cached) {
            return parseOnly ? 0 : cached.slice(0);
          }

          soFar = selector;
          groups = [];
          preFilters = Expr.preFilter;

          while (soFar) {

            // Comma and first run
            if (!matched || (match = rcomma.exec(soFar))) {
              if (match) {
                // Don't consume trailing commas as valid
                soFar = soFar.slice(match[0].length) || soFar;
              }
              groups.push((tokens = []));
            }

            matched = false;

            // Combinators
            if ((match = rcombinators.exec(soFar))) {
              matched = match.shift();
              tokens.push({
                value: matched,
                // Cast descendant combinators to space
                type: match[0].replace(rtrim, " ")
              });
              soFar = soFar.slice(matched.length);
            }

            // Filters
            for (type in Expr.filter) {
              if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                  (match = preFilters[type](match)))) {
                matched = match.shift();
                tokens.push({
                  value: matched,
                  type: type,
                  matches: match
                });
                soFar = soFar.slice(matched.length);
              }
            }

            if (!matched) {
              break;
            }
          }

          // Return the length of the invalid excess
          // if we're just parsing
          // Otherwise, throw an error or return tokens
          return parseOnly ?
            soFar.length :
            soFar ?
            Sizzle.error(selector) :
            // Cache the tokens
            tokenCache(selector, groups).slice(0);
        };

        function toSelector(tokens) {
          var i = 0,
            len = tokens.length,
            selector = "";
          for (; i < len; i++) {
            selector += tokens[i].value;
          }
          return selector;
        }

        function addCombinator(matcher, combinator, base) {
          var dir = combinator.dir,
            checkNonElements = base && dir === "parentNode",
            doneName = done++;

          return combinator.first ?
            // Check against closest ancestor/preceding element
            function(elem, context, xml) {
              while ((elem = elem[dir])) {
                if (elem.nodeType === 1 || checkNonElements) {
                  return matcher(elem, context, xml);
                }
              }
            } :

            // Check against all ancestor/preceding elements
            function(elem, context, xml) {
              var oldCache, outerCache,
                newCache = [dirruns, doneName];

              // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
              if (xml) {
                while ((elem = elem[dir])) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    if (matcher(elem, context, xml)) {
                      return true;
                    }
                  }
                }
              } else {
                while ((elem = elem[dir])) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    outerCache = elem[expando] || (elem[expando] = {});
                    if ((oldCache = outerCache[dir]) &&
                      oldCache[0] === dirruns && oldCache[1] === doneName) {

                      // Assign to newCache so results back-propagate to previous elements
                      return (newCache[2] = oldCache[2]);
                    } else {
                      // Reuse newcache so results back-propagate to previous elements
                      outerCache[dir] = newCache;

                      // A match means we're done; a fail means we have to keep checking
                      if ((newCache[2] = matcher(elem, context, xml))) {
                        return true;
                      }
                    }
                  }
                }
              }
            };
        }

        function elementMatcher(matchers) {
          return matchers.length > 1 ?
            function(elem, context, xml) {
              var i = matchers.length;
              while (i--) {
                if (!matchers[i](elem, context, xml)) {
                  return false;
                }
              }
              return true;
            } :
            matchers[0];
        }

        function multipleContexts(selector, contexts, results) {
          var i = 0,
            len = contexts.length;
          for (; i < len; i++) {
            Sizzle(selector, contexts[i], results);
          }
          return results;
        }

        function condense(unmatched, map, filter, context, xml) {
          var elem,
            newUnmatched = [],
            i = 0,
            len = unmatched.length,
            mapped = map != null;

          for (; i < len; i++) {
            if ((elem = unmatched[i])) {
              if (!filter || filter(elem, context, xml)) {
                newUnmatched.push(elem);
                if (mapped) {
                  map.push(i);
                }
              }
            }
          }

          return newUnmatched;
        }

        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
          if (postFilter && !postFilter[expando]) {
            postFilter = setMatcher(postFilter);
          }
          if (postFinder && !postFinder[expando]) {
            postFinder = setMatcher(postFinder, postSelector);
          }
          return markFunction(function(seed, results, context, xml) {
            var temp, i, elem,
              preMap = [],
              postMap = [],
              preexisting = results.length,

              // Get initial elements from seed or context
              elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

              // Prefilter to get matcher input, preserving a map for seed-results synchronization
              matcherIn = preFilter && (seed || !selector) ?
              condense(elems, preMap, preFilter, context, xml) :
              elems,

              matcherOut = matcher ?
              // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
              postFinder || (seed ? preFilter : preexisting || postFilter) ?

              // ...intermediate processing is necessary
              [] :

              // ...otherwise use results directly
              results :
              matcherIn;

            // Find primary matches
            if (matcher) {
              matcher(matcherIn, matcherOut, context, xml);
            }

            // Apply postFilter
            if (postFilter) {
              temp = condense(matcherOut, postMap);
              postFilter(temp, [], context, xml);

              // Un-match failing elements by moving them back to matcherIn
              i = temp.length;
              while (i--) {
                if ((elem = temp[i])) {
                  matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                }
              }
            }

            if (seed) {
              if (postFinder || preFilter) {
                if (postFinder) {
                  // Get the final matcherOut by condensing this intermediate into postFinder contexts
                  temp = [];
                  i = matcherOut.length;
                  while (i--) {
                    if ((elem = matcherOut[i])) {
                      // Restore matcherIn since elem is not yet a final match
                      temp.push((matcherIn[i] = elem));
                    }
                  }
                  postFinder(null, (matcherOut = []), temp, xml);
                }

                // Move matched elements from seed to results to keep them synchronized
                i = matcherOut.length;
                while (i--) {
                  if ((elem = matcherOut[i]) &&
                    (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

                    seed[temp] = !(results[temp] = elem);
                  }
                }
              }

              // Add elements to results, through postFinder if defined
            } else {
              matcherOut = condense(
                matcherOut === results ?
                matcherOut.splice(preexisting, matcherOut.length) :
                matcherOut
              );
              if (postFinder) {
                postFinder(null, results, matcherOut, xml);
              } else {
                push.apply(results, matcherOut);
              }
            }
          });
        }

        function matcherFromTokens(tokens) {
          var checkContext, matcher, j,
            len = tokens.length,
            leadingRelative = Expr.relative[tokens[0].type],
            implicitRelative = leadingRelative || Expr.relative[" "],
            i = leadingRelative ? 1 : 0,

            // The foundational matcher ensures that elements are reachable from top-level context(s)
            matchContext = addCombinator(function(elem) {
              return elem === checkContext;
            }, implicitRelative, true),
            matchAnyContext = addCombinator(function(elem) {
              return indexOf(checkContext, elem) > -1;
            }, implicitRelative, true),
            matchers = [function(elem, context, xml) {
              var ret = (!leadingRelative && (xml || context !== outermostContext)) || (
                (checkContext = context).nodeType ?
                matchContext(elem, context, xml) :
                matchAnyContext(elem, context, xml));
              // Avoid hanging onto element (issue #299)
              checkContext = null;
              return ret;
            }];

          for (; i < len; i++) {
            if ((matcher = Expr.relative[tokens[i].type])) {
              matchers = [addCombinator(elementMatcher(matchers), matcher)];
            } else {
              matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

              // Return special upon seeing a positional matcher
              if (matcher[expando]) {
                // Find the next relative operator (if any) for proper handling
                j = ++i;
                for (; j < len; j++) {
                  if (Expr.relative[tokens[j].type]) {
                    break;
                  }
                }
                return setMatcher(
                  i > 1 && elementMatcher(matchers),
                  i > 1 && toSelector(
                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                    tokens.slice(0, i - 1).concat({
                      value: tokens[i - 2].type === " " ? "*" : ""
                    })
                  ).replace(rtrim, "$1"),
                  matcher,
                  i < j && matcherFromTokens(tokens.slice(i, j)),
                  j < len && matcherFromTokens((tokens = tokens.slice(j))),
                  j < len && toSelector(tokens)
                );
              }
              matchers.push(matcher);
            }
          }

          return elementMatcher(matchers);
        }

        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
          var bySet = setMatchers.length > 0,
            byElement = elementMatchers.length > 0,
            superMatcher = function(seed, context, xml, results, outermost) {
              var elem, j, matcher,
                matchedCount = 0,
                i = "0",
                unmatched = seed && [],
                setMatched = [],
                contextBackup = outermostContext,
                // We must always have either seed elements or outermost context
                elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                // Use integer dirruns iff this is the outermost matcher
                dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                len = elems.length;

              if (outermost) {
                outermostContext = context !== document && context;
              }

              // Add elements passing elementMatchers directly to results
              // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
              // Support: IE<9, Safari
              // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
              for (; i !== len && (elem = elems[i]) != null; i++) {
                if (byElement && elem) {
                  j = 0;
                  while ((matcher = elementMatchers[j++])) {
                    if (matcher(elem, context, xml)) {
                      results.push(elem);
                      break;
                    }
                  }
                  if (outermost) {
                    dirruns = dirrunsUnique;
                  }
                }

                // Track unmatched elements for set filters
                if (bySet) {
                  // They will have gone through all possible matchers
                  if ((elem = !matcher && elem)) {
                    matchedCount--;
                  }

                  // Lengthen the array for every element, matched or not
                  if (seed) {
                    unmatched.push(elem);
                  }
                }
              }

              // Apply set filters to unmatched elements
              matchedCount += i;
              if (bySet && i !== matchedCount) {
                j = 0;
                while ((matcher = setMatchers[j++])) {
                  matcher(unmatched, setMatched, context, xml);
                }

                if (seed) {
                  // Reintegrate element matches to eliminate the need for sorting
                  if (matchedCount > 0) {
                    while (i--) {
                      if (!(unmatched[i] || setMatched[i])) {
                        setMatched[i] = pop.call(results);
                      }
                    }
                  }

                  // Discard index placeholder values to get only actual matches
                  setMatched = condense(setMatched);
                }

                // Add matches to results
                push.apply(results, setMatched);

                // Seedless set matches succeeding multiple successful matchers stipulate sorting
                if (outermost && !seed && setMatched.length > 0 &&
                  (matchedCount + setMatchers.length) > 1) {

                  Sizzle.uniqueSort(results);
                }
              }

              // Override manipulation of globals by nested matchers
              if (outermost) {
                dirruns = dirrunsUnique;
                outermostContext = contextBackup;
              }

              return unmatched;
            };

          return bySet ?
            markFunction(superMatcher) :
            superMatcher;
        }

        compile = Sizzle.compile = function(selector, match /* Internal Use Only */ ) {
          var i,
            setMatchers = [],
            elementMatchers = [],
            cached = compilerCache[selector + " "];

          if (!cached) {
            // Generate a function of recursive functions that can be used to check each element
            if (!match) {
              match = tokenize(selector);
            }
            i = match.length;
            while (i--) {
              cached = matcherFromTokens(match[i]);
              if (cached[expando]) {
                setMatchers.push(cached);
              } else {
                elementMatchers.push(cached);
              }
            }

            // Cache the compiled function
            cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

            // Save selector and tokenization
            cached.selector = selector;
          }
          return cached;
        };

        /**
         * A low-level selection function that works with Sizzle's compiled
         *  selector functions
         * @param {String|Function} selector A selector or a pre-compiled
         *  selector function built with Sizzle.compile
         * @param {Element} context
         * @param {Array} [results]
         * @param {Array} [seed] A set of elements to match against
         */
        select = Sizzle.select = function(selector, context, results, seed) {
          var i, tokens, token, type, find,
            compiled = typeof selector === "function" && selector,
            match = !seed && tokenize((selector = compiled.selector || selector));

          results = results || [];

          // Try to minimize operations if there is no seed and only one group
          if (match.length === 1) {

            // Take a shortcut and set the context if the root selector is an ID
            tokens = match[0] = match[0].slice(0);
            if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
              support.getById && context.nodeType === 9 && documentIsHTML &&
              Expr.relative[tokens[1].type]) {

              context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
              if (!context) {
                return results;

                // Precompiled matchers will still verify ancestry, so step up a level
              } else if (compiled) {
                context = context.parentNode;
              }

              selector = selector.slice(tokens.shift().value.length);
            }

            // Fetch a seed set for right-to-left matching
            i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
            while (i--) {
              token = tokens[i];

              // Abort if we hit a combinator
              if (Expr.relative[(type = token.type)]) {
                break;
              }
              if ((find = Expr.find[type])) {
                // Search, expanding context for leading sibling combinators
                if ((seed = find(
                    token.matches[0].replace(runescape, funescape),
                    rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                  ))) {

                  // If seed is empty or no tokens remain, we can return early
                  tokens.splice(i, 1);
                  selector = seed.length && toSelector(tokens);
                  if (!selector) {
                    push.apply(results, seed);
                    return results;
                  }

                  break;
                }
              }
            }
          }

          // Compile and execute a filtering function if one is not provided
          // Provide `match` to avoid retokenization if we modified the selector above
          (compiled || compile(selector, match))(
            seed,
            context, !documentIsHTML,
            results,
            rsibling.test(selector) && testContext(context.parentNode) || context
          );
          return results;
        };

        // One-time assignments

        // Sort stability
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

        // Support: Chrome 14-35+
        // Always assume duplicates if they aren't passed to the comparison function
        support.detectDuplicates = !!hasDuplicate;

        // Initialize against the default document
        setDocument();

        // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
        // Detached nodes confoundingly follow *each other*
        support.sortDetached = assert(function(div1) {
          // Should return 1, but returns 4 (following)
          return div1.compareDocumentPosition(document.createElement("div")) & 1;
        });

        // Support: IE<8
        // Prevent attribute/property "interpolation"
        // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
        if (!assert(function(div) {
            div.innerHTML = "<a href='#'></a>";
            return div.firstChild.getAttribute("href") === "#";
          })) {
          addHandle("type|href|height|width", function(elem, name, isXML) {
            if (!isXML) {
              return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
            }
          });
        }

        // Support: IE<9
        // Use defaultValue in place of getAttribute("value")
        if (!support.attributes || !assert(function(div) {
            div.innerHTML = "<input/>";
            div.firstChild.setAttribute("value", "");
            return div.firstChild.getAttribute("value") === "";
          })) {
          addHandle("value", function(elem, name, isXML) {
            if (!isXML && elem.nodeName.toLowerCase() === "input") {
              return elem.defaultValue;
            }
          });
        }

        // Support: IE<9
        // Use getAttributeNode to fetch booleans when getAttribute lies
        if (!assert(function(div) {
            return div.getAttribute("disabled") == null;
          })) {
          addHandle(booleans, function(elem, name, isXML) {
            var val;
            if (!isXML) {
              return elem[name] === true ? name.toLowerCase() :
                (val = elem.getAttributeNode(name)) && val.specified ?
                val.value :
                null;
            }
          });
        }

        return Sizzle;

      })(window);


    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;


    var rneedsContext = jQuery.expr.match.needsContext;

    var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);


    var risSimple = /^.[^:#\[\.,]*$/;

    // Implement the identical functionality for filter and not
    function winnow(elements, qualifier, not) {
      if (jQuery.isFunction(qualifier)) {
        return jQuery.grep(elements, function(elem, i) {
          /* jshint -W018 */
          return !!qualifier.call(elem, i, elem) !== not;
        });

      }

      if (qualifier.nodeType) {
        return jQuery.grep(elements, function(elem) {
          return (elem === qualifier) !== not;
        });

      }

      if (typeof qualifier === "string") {
        if (risSimple.test(qualifier)) {
          return jQuery.filter(qualifier, elements, not);
        }

        qualifier = jQuery.filter(qualifier, elements);
      }

      return jQuery.grep(elements, function(elem) {
        return (indexOf.call(qualifier, elem) >= 0) !== not;
      });
    }

    jQuery.filter = function(expr, elems, not) {
      var elem = elems[0];

      if (not) {
        expr = ":not(" + expr + ")";
      }

      return elems.length === 1 && elem.nodeType === 1 ?
        jQuery.find.matchesSelector(elem, expr) ? [elem] : [] :
        jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
          return elem.nodeType === 1;
        }));
    };

    jQuery.fn.extend({
      find: function(selector) {
        var i,
          len = this.length,
          ret = [],
          self = this;

        if (typeof selector !== "string") {
          return this.pushStack(jQuery(selector).filter(function() {
            for (i = 0; i < len; i++) {
              if (jQuery.contains(self[i], this)) {
                return true;
              }
            }
          }));
        }

        for (i = 0; i < len; i++) {
          jQuery.find(selector, self[i], ret);
        }

        // Needed because $( selector, context ) becomes $( context ).find( selector )
        ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
        ret.selector = this.selector ? this.selector + " " + selector : selector;
        return ret;
      },
      filter: function(selector) {
        return this.pushStack(winnow(this, selector || [], false));
      },
      not: function(selector) {
        return this.pushStack(winnow(this, selector || [], true));
      },
      is: function(selector) {
        return !!winnow(
          this,

          // If this is a positional/relative selector, check membership in the returned set
          // so $("p:first").is("p:last") won't return true for a doc with two "p".
          typeof selector === "string" && rneedsContext.test(selector) ?
          jQuery(selector) :
          selector || [],
          false
        ).length;
      }
    });


    // Initialize a jQuery object


    // A central reference to the root jQuery(document)
    var rootjQuery,

      // A simple way to check for HTML strings
      // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
      // Strict HTML recognition (#11290: must start with <)
      rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

      init = jQuery.fn.init = function(selector, context) {
        var match, elem;

        // HANDLE: $(""), $(null), $(undefined), $(false)
        if (!selector) {
          return this;
        }

        // Handle HTML strings
        if (typeof selector === "string") {
          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            // Assume that strings that start and end with <> are HTML and skip the regex check
            match = [null, selector, null];

          } else {
            match = rquickExpr.exec(selector);
          }

          // Match html or make sure no context is specified for #id
          if (match && (match[1] || !context)) {

            // HANDLE: $(html) -> $(array)
            if (match[1]) {
              context = context instanceof jQuery ? context[0] : context;

              // Option to run scripts is true for back-compat
              // Intentionally let the error be thrown if parseHTML is not present
              jQuery.merge(this, jQuery.parseHTML(
                match[1],
                context && context.nodeType ? context.ownerDocument || context : document,
                true
              ));

              // HANDLE: $(html, props)
              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                for (match in context) {
                  // Properties of context are called as methods if possible
                  if (jQuery.isFunction(this[match])) {
                    this[match](context[match]);

                    // ...and otherwise set as attributes
                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }

              return this;

              // HANDLE: $(#id)
            } else {
              elem = document.getElementById(match[2]);

              // Support: Blackberry 4.6
              // gEBID returns nodes no longer in the document (#6963)
              if (elem && elem.parentNode) {
                // Inject the element directly into the jQuery object
                this.length = 1;
                this[0] = elem;
              }

              this.context = document;
              this.selector = selector;
              return this;
            }

            // HANDLE: $(expr, $(...))
          } else if (!context || context.jquery) {
            return (context || rootjQuery).find(selector);

            // HANDLE: $(expr, context)
            // (which is just equivalent to: $(context).find(expr)
          } else {
            return this.constructor(context).find(selector);
          }

          // HANDLE: $(DOMElement)
        } else if (selector.nodeType) {
          this.context = this[0] = selector;
          this.length = 1;
          return this;

          // HANDLE: $(function)
          // Shortcut for document ready
        } else if (jQuery.isFunction(selector)) {
          return typeof rootjQuery.ready !== "undefined" ?
            rootjQuery.ready(selector) :
            // Execute immediately if ready is not present
            selector(jQuery);
        }

        if (selector.selector !== undefined) {
          this.selector = selector.selector;
          this.context = selector.context;
        }

        return jQuery.makeArray(selector, this);
      };

    // Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

    // Initialize central reference
    rootjQuery = jQuery(document);


    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
      // Methods guaranteed to produce a unique set when starting from a unique set
      guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };

    jQuery.extend({
      dir: function(elem, dir, until) {
        var matched = [],
          truncate = until !== undefined;

        while ((elem = elem[dir]) && elem.nodeType !== 9) {
          if (elem.nodeType === 1) {
            if (truncate && jQuery(elem).is(until)) {
              break;
            }
            matched.push(elem);
          }
        }
        return matched;
      },

      sibling: function(n, elem) {
        var matched = [];

        for (; n; n = n.nextSibling) {
          if (n.nodeType === 1 && n !== elem) {
            matched.push(n);
          }
        }

        return matched;
      }
    });

    jQuery.fn.extend({
      has: function(target) {
        var targets = jQuery(target, this),
          l = targets.length;

        return this.filter(function() {
          var i = 0;
          for (; i < l; i++) {
            if (jQuery.contains(this, targets[i])) {
              return true;
            }
          }
        });
      },

      closest: function(selectors, context) {
        var cur,
          i = 0,
          l = this.length,
          matched = [],
          pos = rneedsContext.test(selectors) || typeof selectors !== "string" ?
          jQuery(selectors, context || this.context) :
          0;

        for (; i < l; i++) {
          for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
            // Always skip document fragments
            if (cur.nodeType < 11 && (pos ?
                pos.index(cur) > -1 :

                // Don't pass non-elements to Sizzle
                cur.nodeType === 1 &&
                jQuery.find.matchesSelector(cur, selectors))) {

              matched.push(cur);
              break;
            }
          }
        }

        return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
      },

      // Determine the position of an element within the set
      index: function(elem) {

        // No argument, return index in parent
        if (!elem) {
          return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
        }

        // Index in selector
        if (typeof elem === "string") {
          return indexOf.call(jQuery(elem), this[0]);
        }

        // Locate the position of the desired element
        return indexOf.call(this,

          // If it receives a jQuery object, the first element is used
          elem.jquery ? elem[0] : elem
        );
      },

      add: function(selector, context) {
        return this.pushStack(
          jQuery.unique(
            jQuery.merge(this.get(), jQuery(selector, context))
          )
        );
      },

      addBack: function(selector) {
        return this.add(selector == null ?
          this.prevObject : this.prevObject.filter(selector)
        );
      }
    });

    function sibling(cur, dir) {
      while ((cur = cur[dir]) && cur.nodeType !== 1) {}
      return cur;
    }

    jQuery.each({
      parent: function(elem) {
        var parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
      },
      parents: function(elem) {
        return jQuery.dir(elem, "parentNode");
      },
      parentsUntil: function(elem, i, until) {
        return jQuery.dir(elem, "parentNode", until);
      },
      next: function(elem) {
        return sibling(elem, "nextSibling");
      },
      prev: function(elem) {
        return sibling(elem, "previousSibling");
      },
      nextAll: function(elem) {
        return jQuery.dir(elem, "nextSibling");
      },
      prevAll: function(elem) {
        return jQuery.dir(elem, "previousSibling");
      },
      nextUntil: function(elem, i, until) {
        return jQuery.dir(elem, "nextSibling", until);
      },
      prevUntil: function(elem, i, until) {
        return jQuery.dir(elem, "previousSibling", until);
      },
      siblings: function(elem) {
        return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
      },
      children: function(elem) {
        return jQuery.sibling(elem.firstChild);
      },
      contents: function(elem) {
        return elem.contentDocument || jQuery.merge([], elem.childNodes);
      }
    }, function(name, fn) {
      jQuery.fn[name] = function(until, selector) {
        var matched = jQuery.map(this, fn, until);

        if (name.slice(-5) !== "Until") {
          selector = until;
        }

        if (selector && typeof selector === "string") {
          matched = jQuery.filter(selector, matched);
        }

        if (this.length > 1) {
          // Remove duplicates
          if (!guaranteedUnique[name]) {
            jQuery.unique(matched);
          }

          // Reverse order for parents* and prev-derivatives
          if (rparentsprev.test(name)) {
            matched.reverse();
          }
        }

        return this.pushStack(matched);
      };
    });
    var rnotwhite = (/\S+/g);


    // String to Object options format cache
    var optionsCache = {};

    // Convert String-formatted options into Object-formatted ones and store in cache
    function createOptions(options) {
      var object = optionsCache[options] = {};
      jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
        object[flag] = true;
      });
      return object;
    }

    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function(options) {

      // Convert options from String-formatted to Object-formatted if needed
      // (we check in cache first)
      options = typeof options === "string" ?
        (optionsCache[options] || createOptions(options)) :
        jQuery.extend({}, options);

      var // Last fire value (for non-forgettable lists)
        memory,
        // Flag to know if list was already fired
        fired,
        // Flag to know if list is currently firing
        firing,
        // First callback to fire (used internally by add and fireWith)
        firingStart,
        // End of the loop when firing
        firingLength,
        // Index of currently firing callback (modified by remove if needed)
        firingIndex,
        // Actual callback list
        list = [],
        // Stack of fire calls for repeatable lists
        stack = !options.once && [],
        // Fire callbacks
        fire = function(data) {
          memory = options.memory && data;
          fired = true;
          firingIndex = firingStart || 0;
          firingStart = 0;
          firingLength = list.length;
          firing = true;
          for (; list && firingIndex < firingLength; firingIndex++) {
            if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
              memory = false; // To prevent further calls using add
              break;
            }
          }
          firing = false;
          if (list) {
            if (stack) {
              if (stack.length) {
                fire(stack.shift());
              }
            } else if (memory) {
              list = [];
            } else {
              self.disable();
            }
          }
        },
        // Actual Callbacks object
        self = {
          // Add a callback or a collection of callbacks to the list
          add: function() {
            if (list) {
              // First, we save the current length
              var start = list.length;
              (function add(args) {
                jQuery.each(args, function(_, arg) {
                  var type = jQuery.type(arg);
                  if (type === "function") {
                    if (!options.unique || !self.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && type !== "string") {
                    // Inspect recursively
                    add(arg);
                  }
                });
              })(arguments);
              // Do we need to add the callbacks to the
              // current firing batch?
              if (firing) {
                firingLength = list.length;
                // With memory, if we're not firing then
                // we should call right away
              } else if (memory) {
                firingStart = start;
                fire(memory);
              }
            }
            return this;
          },
          // Remove a callback from the list
          remove: function() {
            if (list) {
              jQuery.each(arguments, function(_, arg) {
                var index;
                while ((index = jQuery.inArray(arg, list, index)) > -1) {
                  list.splice(index, 1);
                  // Handle firing indexes
                  if (firing) {
                    if (index <= firingLength) {
                      firingLength--;
                    }
                    if (index <= firingIndex) {
                      firingIndex--;
                    }
                  }
                }
              });
            }
            return this;
          },
          // Check if a given callback is in the list.
          // If no argument is given, return whether or not list has callbacks attached.
          has: function(fn) {
            return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
          },
          // Remove all callbacks from the list
          empty: function() {
            list = [];
            firingLength = 0;
            return this;
          },
          // Have the list do nothing anymore
          disable: function() {
            list = stack = memory = undefined;
            return this;
          },
          // Is it disabled?
          disabled: function() {
            return !list;
          },
          // Lock the list in its current state
          lock: function() {
            stack = undefined;
            if (!memory) {
              self.disable();
            }
            return this;
          },
          // Is it locked?
          locked: function() {
            return !stack;
          },
          // Call all callbacks with the given context and arguments
          fireWith: function(context, args) {
            if (list && (!fired || stack)) {
              args = args || [];
              args = [context, args.slice ? args.slice() : args];
              if (firing) {
                stack.push(args);
              } else {
                fire(args);
              }
            }
            return this;
          },
          // Call all the callbacks with the given arguments
          fire: function() {
            self.fireWith(this, arguments);
            return this;
          },
          // To know if the callbacks have already been called at least once
          fired: function() {
            return !!fired;
          }
        };

      return self;
    };


    jQuery.extend({

      Deferred: function(func) {
        var tuples = [
            // action, add listener, listener list, final state
            ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
            ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
            ["notify", "progress", jQuery.Callbacks("memory")]
          ],
          state = "pending",
          promise = {
            state: function() {
              return state;
            },
            always: function() {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            then: function( /* fnDone, fnFail, fnProgress */ ) {
              var fns = arguments;
              return jQuery.Deferred(function(newDefer) {
                jQuery.each(tuples, function(i, tuple) {
                  var fn = jQuery.isFunction(fns[i]) && fns[i];
                  // deferred[ done | fail | progress ] for forwarding actions to newDefer
                  deferred[tuple[1]](function() {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && jQuery.isFunction(returned.promise)) {
                      returned.promise()
                        .done(newDefer.resolve)
                        .fail(newDefer.reject)
                        .progress(newDefer.notify);
                    } else {
                      newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            // Get a promise for this deferred
            // If obj is provided, the promise aspect is added to the object
            promise: function(obj) {
              return obj != null ? jQuery.extend(obj, promise) : promise;
            }
          },
          deferred = {};

        // Keep pipe for back-compat
        promise.pipe = promise.then;

        // Add list-specific methods
        jQuery.each(tuples, function(i, tuple) {
          var list = tuple[2],
            stateString = tuple[3];

          // promise[ done | fail | progress ] = list.add
          promise[tuple[1]] = list.add;

          // Handle state
          if (stateString) {
            list.add(function() {
              // state = [ resolved | rejected ]
              state = stateString;

              // [ reject_list | resolve_list ].disable; progress_list.lock
            }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
          }

          // deferred[ resolve | reject | notify ]
          deferred[tuple[0]] = function() {
            deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
            return this;
          };
          deferred[tuple[0] + "With"] = list.fireWith;
        });

        // Make the deferred a promise
        promise.promise(deferred);

        // Call given func if any
        if (func) {
          func.call(deferred, deferred);
        }

        // All done!
        return deferred;
      },

      // Deferred helper
      when: function(subordinate /* , ..., subordinateN */ ) {
        var i = 0,
          resolveValues = slice.call(arguments),
          length = resolveValues.length,

          // the count of uncompleted subordinates
          remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,

          // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
          deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

          // Update function for both resolve and progress values
          updateFunc = function(i, contexts, values) {
            return function(value) {
              contexts[i] = this;
              values[i] = arguments.length > 1 ? slice.call(arguments) : value;
              if (values === progressValues) {
                deferred.notifyWith(contexts, values);
              } else if (!(--remaining)) {
                deferred.resolveWith(contexts, values);
              }
            };
          },

          progressValues, progressContexts, resolveContexts;

        // Add listeners to Deferred subordinates; treat others as resolved
        if (length > 1) {
          progressValues = new Array(length);
          progressContexts = new Array(length);
          resolveContexts = new Array(length);
          for (; i < length; i++) {
            if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
              resolveValues[i].promise()
                .done(updateFunc(i, resolveContexts, resolveValues))
                .fail(deferred.reject)
                .progress(updateFunc(i, progressContexts, progressValues));
            } else {
              --remaining;
            }
          }
        }

        // If we're not waiting on anything, resolve the master
        if (!remaining) {
          deferred.resolveWith(resolveContexts, resolveValues);
        }

        return deferred.promise();
      }
    });


    // The deferred used on DOM ready
    var readyList;

    jQuery.fn.ready = function(fn) {
      // Add the callback
      jQuery.ready.promise().done(fn);

      return this;
    };

    jQuery.extend({
      // Is the DOM ready to be used? Set to true once it occurs.
      isReady: false,

      // A counter to track how many items to wait for before
      // the ready event fires. See #6781
      readyWait: 1,

      // Hold (or release) the ready event
      holdReady: function(hold) {
        if (hold) {
          jQuery.readyWait++;
        } else {
          jQuery.ready(true);
        }
      },

      // Handle when the DOM is ready
      ready: function(wait) {

        // Abort if there are pending holds or we're already ready
        if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
          return;
        }

        // Remember that the DOM is ready
        jQuery.isReady = true;

        // If a normal DOM Ready event fired, decrement, and wait if need be
        if (wait !== true && --jQuery.readyWait > 0) {
          return;
        }

        // If there are functions bound, to execute
        readyList.resolveWith(document, [jQuery]);

        // Trigger any bound ready events
        if (jQuery.fn.triggerHandler) {
          jQuery(document).triggerHandler("ready");
          jQuery(document).off("ready");
        }
      }
    });

    /**
     * The ready event handler and self cleanup method
     */
    function completed() {
      document.removeEventListener("DOMContentLoaded", completed, false);
      window.removeEventListener("load", completed, false);
      jQuery.ready();
    }

    jQuery.ready.promise = function(obj) {
      if (!readyList) {

        readyList = jQuery.Deferred();

        // Catch cases where $(document).ready() is called after the browser event has already occurred.
        // We once tried to use readyState "interactive" here, but it caused issues like the one
        // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
        if (document.readyState === "complete") {
          // Handle it asynchronously to allow scripts the opportunity to delay ready
          setTimeout(jQuery.ready);

        } else {

          // Use the handy event callback
          document.addEventListener("DOMContentLoaded", completed, false);

          // A fallback to window.onload, that will always work
          window.addEventListener("load", completed, false);
        }
      }
      return readyList.promise(obj);
    };

    // Kick off the DOM ready check even if the user does not
    jQuery.ready.promise();


    // Multifunctional method to get and set values of a collection
    // The value/s can optionally be executed if it's a function
    var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
      var i = 0,
        len = elems.length,
        bulk = key == null;

      // Sets many values
      if (jQuery.type(key) === "object") {
        chainable = true;
        for (i in key) {
          jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
        }

        // Sets one value
      } else if (value !== undefined) {
        chainable = true;

        if (!jQuery.isFunction(value)) {
          raw = true;
        }

        if (bulk) {
          // Bulk operations run against the entire set
          if (raw) {
            fn.call(elems, value);
            fn = null;

            // ...except when executing function values
          } else {
            bulk = fn;
            fn = function(elem, key, value) {
              return bulk.call(jQuery(elem), value);
            };
          }
        }

        if (fn) {
          for (; i < len; i++) {
            fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
          }
        }
      }

      return chainable ?
        elems :

        // Gets
        bulk ?
        fn.call(elems) :
        len ? fn(elems[0], key) : emptyGet;
    };


    /**
     * Determines whether an object can have data
     */
    jQuery.acceptData = function(owner) {
      // Accepts only:
      //  - Node
      //    - Node.ELEMENT_NODE
      //    - Node.DOCUMENT_NODE
      //  - Object
      //    - Any
      /* jshint -W018 */
      return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
    };


    function Data() {
      // Support: Android<4,
      // Old WebKit does not have Object.preventExtensions/freeze method,
      // return new empty object instead with no [[set]] accessor
      Object.defineProperty(this.cache = {}, 0, {
        get: function() {
          return {};
        }
      });

      this.expando = jQuery.expando + Data.uid++;
    }

    Data.uid = 1;
    Data.accepts = jQuery.acceptData;

    Data.prototype = {
      key: function(owner) {
        // We can accept data for non-element nodes in modern browsers,
        // but we should not, see #8335.
        // Always return the key for a frozen object.
        if (!Data.accepts(owner)) {
          return 0;
        }

        var descriptor = {},
          // Check if the owner object already has a cache key
          unlock = owner[this.expando];

        // If not, create one
        if (!unlock) {
          unlock = Data.uid++;

          // Secure it in a non-enumerable, non-writable property
          try {
            descriptor[this.expando] = {
              value: unlock
            };
            Object.defineProperties(owner, descriptor);

            // Support: Android<4
            // Fallback to a less secure definition
          } catch (e) {
            descriptor[this.expando] = unlock;
            jQuery.extend(owner, descriptor);
          }
        }

        // Ensure the cache object
        if (!this.cache[unlock]) {
          this.cache[unlock] = {};
        }

        return unlock;
      },
      set: function(owner, data, value) {
        var prop,
          // There may be an unlock assigned to this node,
          // if there is no entry for this "owner", create one inline
          // and set the unlock as though an owner entry had always existed
          unlock = this.key(owner),
          cache = this.cache[unlock];

        // Handle: [ owner, key, value ] args
        if (typeof data === "string") {
          cache[data] = value;

          // Handle: [ owner, { properties } ] args
        } else {
          // Fresh assignments by object are shallow copied
          if (jQuery.isEmptyObject(cache)) {
            jQuery.extend(this.cache[unlock], data);
            // Otherwise, copy the properties one-by-one to the cache object
          } else {
            for (prop in data) {
              cache[prop] = data[prop];
            }
          }
        }
        return cache;
      },
      get: function(owner, key) {
        // Either a valid cache is found, or will be created.
        // New caches will be created and the unlock returned,
        // allowing direct access to the newly created
        // empty data object. A valid owner object must be provided.
        var cache = this.cache[this.key(owner)];

        return key === undefined ?
          cache : cache[key];
      },
      access: function(owner, key, value) {
        var stored;
        // In cases where either:
        //
        //   1. No key was specified
        //   2. A string key was specified, but no value provided
        //
        // Take the "read" path and allow the get method to determine
        // which value to return, respectively either:
        //
        //   1. The entire cache object
        //   2. The data stored at the key
        //
        if (key === undefined ||
          ((key && typeof key === "string") && value === undefined)) {

          stored = this.get(owner, key);

          return stored !== undefined ?
            stored : this.get(owner, jQuery.camelCase(key));
        }

        // [*]When the key is not a string, or both a key and value
        // are specified, set or extend (existing objects) with either:
        //
        //   1. An object of properties
        //   2. A key and value
        //
        this.set(owner, key, value);

        // Since the "set" path can have two possible entry points
        // return the expected data based on which path was taken[*]
        return value !== undefined ? value : key;
      },
      remove: function(owner, key) {
        var i, name, camel,
          unlock = this.key(owner),
          cache = this.cache[unlock];

        if (key === undefined) {
          this.cache[unlock] = {};

        } else {
          // Support array or space separated string of keys
          if (jQuery.isArray(key)) {
            // If "name" is an array of keys...
            // When data is initially created, via ("key", "val") signature,
            // keys will be converted to camelCase.
            // Since there is no way to tell _how_ a key was added, remove
            // both plain key and camelCase key. #12786
            // This will only penalize the array argument path.
            name = key.concat(key.map(jQuery.camelCase));
          } else {
            camel = jQuery.camelCase(key);
            // Try the string as a key before any manipulation
            if (key in cache) {
              name = [key, camel];
            } else {
              // If a key with the spaces exists, use it.
              // Otherwise, create an array by matching non-whitespace
              name = camel;
              name = name in cache ? [name] : (name.match(rnotwhite) || []);
            }
          }

          i = name.length;
          while (i--) {
            delete cache[name[i]];
          }
        }
      },
      hasData: function(owner) {
        return !jQuery.isEmptyObject(
          this.cache[owner[this.expando]] || {}
        );
      },
      discard: function(owner) {
        if (owner[this.expando]) {
          delete this.cache[owner[this.expando]];
        }
      }
    };
    var data_priv = new Data();

    var data_user = new Data();


    //	Implementation Summary
    //
    //	1. Enforce API surface and semantic compatibility with 1.9.x branch
    //	2. Improve the module's maintainability by reducing the storage
    //		paths to a single mechanism.
    //	3. Use the same single mechanism to support "private" and "user" data.
    //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
    //	5. Avoid exposing implementation details on user objects (eg. expando properties)
    //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      rmultiDash = /([A-Z])/g;

    function dataAttr(elem, key, data) {
      var name;

      // If nothing was found internally, try to fetch any
      // data from the HTML5 data-* attribute
      if (data === undefined && elem.nodeType === 1) {
        name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
        data = elem.getAttribute(name);

        if (typeof data === "string") {
          try {
            data = data === "true" ? true :
              data === "false" ? false :
              data === "null" ? null :
              // Only convert to a number if it doesn't change the string
              +data + "" === data ? +data :
              rbrace.test(data) ? jQuery.parseJSON(data) :
              data;
          } catch (e) {}

          // Make sure we set the data so it isn't changed later
          data_user.set(elem, key, data);
        } else {
          data = undefined;
        }
      }
      return data;
    }

    jQuery.extend({
      hasData: function(elem) {
        return data_user.hasData(elem) || data_priv.hasData(elem);
      },

      data: function(elem, name, data) {
        return data_user.access(elem, name, data);
      },

      removeData: function(elem, name) {
        data_user.remove(elem, name);
      },

      // TODO: Now that all calls to _data and _removeData have been replaced
      // with direct calls to data_priv methods, these can be deprecated.
      _data: function(elem, name, data) {
        return data_priv.access(elem, name, data);
      },

      _removeData: function(elem, name) {
        data_priv.remove(elem, name);
      }
    });

    jQuery.fn.extend({
      data: function(key, value) {
        var i, name, data,
          elem = this[0],
          attrs = elem && elem.attributes;

        // Gets all values
        if (key === undefined) {
          if (this.length) {
            data = data_user.get(elem);

            if (elem.nodeType === 1 && !data_priv.get(elem, "hasDataAttrs")) {
              i = attrs.length;
              while (i--) {

                // Support: IE11+
                // The attrs elements can be null (#14894)
                if (attrs[i]) {
                  name = attrs[i].name;
                  if (name.indexOf("data-") === 0) {
                    name = jQuery.camelCase(name.slice(5));
                    dataAttr(elem, name, data[name]);
                  }
                }
              }
              data_priv.set(elem, "hasDataAttrs", true);
            }
          }

          return data;
        }

        // Sets multiple values
        if (typeof key === "object") {
          return this.each(function() {
            data_user.set(this, key);
          });
        }

        return access(this, function(value) {
          var data,
            camelKey = jQuery.camelCase(key);

          // The calling jQuery object (element matches) is not empty
          // (and therefore has an element appears at this[ 0 ]) and the
          // `value` parameter was not undefined. An empty jQuery object
          // will result in `undefined` for elem = this[ 0 ] which will
          // throw an exception if an attempt to read a data cache is made.
          if (elem && value === undefined) {
            // Attempt to get data from the cache
            // with the key as-is
            data = data_user.get(elem, key);
            if (data !== undefined) {
              return data;
            }

            // Attempt to get data from the cache
            // with the key camelized
            data = data_user.get(elem, camelKey);
            if (data !== undefined) {
              return data;
            }

            // Attempt to "discover" the data in
            // HTML5 custom data-* attrs
            data = dataAttr(elem, camelKey, undefined);
            if (data !== undefined) {
              return data;
            }

            // We tried really hard, but the data doesn't exist.
            return;
          }

          // Set the data...
          this.each(function() {
            // First, attempt to store a copy or reference of any
            // data that might've been store with a camelCased key.
            var data = data_user.get(this, camelKey);

            // For HTML5 data-* attribute interop, we have to
            // store property names with dashes in a camelCase form.
            // This might not apply to all properties...*
            data_user.set(this, camelKey, value);

            // *... In the case of properties that might _actually_
            // have dashes, we need to also store a copy of that
            // unchanged property.
            if (key.indexOf("-") !== -1 && data !== undefined) {
              data_user.set(this, key, value);
            }
          });
        }, null, value, arguments.length > 1, null, true);
      },

      removeData: function(key) {
        return this.each(function() {
          data_user.remove(this, key);
        });
      }
    });


    jQuery.extend({
      queue: function(elem, type, data) {
        var queue;

        if (elem) {
          type = (type || "fx") + "queue";
          queue = data_priv.get(elem, type);

          // Speed up dequeue by getting out quickly if this is just a lookup
          if (data) {
            if (!queue || jQuery.isArray(data)) {
              queue = data_priv.access(elem, type, jQuery.makeArray(data));
            } else {
              queue.push(data);
            }
          }
          return queue || [];
        }
      },

      dequeue: function(elem, type) {
        type = type || "fx";

        var queue = jQuery.queue(elem, type),
          startLength = queue.length,
          fn = queue.shift(),
          hooks = jQuery._queueHooks(elem, type),
          next = function() {
            jQuery.dequeue(elem, type);
          };

        // If the fx queue is dequeued, always remove the progress sentinel
        if (fn === "inprogress") {
          fn = queue.shift();
          startLength--;
        }

        if (fn) {

          // Add a progress sentinel to prevent the fx queue from being
          // automatically dequeued
          if (type === "fx") {
            queue.unshift("inprogress");
          }

          // Clear up the last queue stop function
          delete hooks.stop;
          fn.call(elem, next, hooks);
        }

        if (!startLength && hooks) {
          hooks.empty.fire();
        }
      },

      // Not public - generate a queueHooks object, or return the current one
      _queueHooks: function(elem, type) {
        var key = type + "queueHooks";
        return data_priv.get(elem, key) || data_priv.access(elem, key, {
          empty: jQuery.Callbacks("once memory").add(function() {
            data_priv.remove(elem, [type + "queue", key]);
          })
        });
      }
    });

    jQuery.fn.extend({
      queue: function(type, data) {
        var setter = 2;

        if (typeof type !== "string") {
          data = type;
          type = "fx";
          setter--;
        }

        if (arguments.length < setter) {
          return jQuery.queue(this[0], type);
        }

        return data === undefined ?
          this :
          this.each(function() {
            var queue = jQuery.queue(this, type, data);

            // Ensure a hooks for this queue
            jQuery._queueHooks(this, type);

            if (type === "fx" && queue[0] !== "inprogress") {
              jQuery.dequeue(this, type);
            }
          });
      },
      dequeue: function(type) {
        return this.each(function() {
          jQuery.dequeue(this, type);
        });
      },
      clearQueue: function(type) {
        return this.queue(type || "fx", []);
      },
      // Get a promise resolved when queues of a certain type
      // are emptied (fx is the type by default)
      promise: function(type, obj) {
        var tmp,
          count = 1,
          defer = jQuery.Deferred(),
          elements = this,
          i = this.length,
          resolve = function() {
            if (!(--count)) {
              defer.resolveWith(elements, [elements]);
            }
          };

        if (typeof type !== "string") {
          obj = type;
          type = undefined;
        }
        type = type || "fx";

        while (i--) {
          tmp = data_priv.get(elements[i], type + "queueHooks");
          if (tmp && tmp.empty) {
            count++;
            tmp.empty.add(resolve);
          }
        }
        resolve();
        return defer.promise(obj);
      }
    });
    var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

    var cssExpand = ["Top", "Right", "Bottom", "Left"];

    var isHidden = function(elem, el) {
      // isHidden might be called from jQuery#filter function;
      // in that case, element will be second argument
      elem = el || elem;
      return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
    };

    var rcheckableType = (/^(?:checkbox|radio)$/i);


    (function() {
      var fragment = document.createDocumentFragment(),
        div = fragment.appendChild(document.createElement("div")),
        input = document.createElement("input");

      // Support: Safari<=5.1
      // Check state lost if the name is set (#11217)
      // Support: Windows Web Apps (WWA)
      // `name` and `type` must use .setAttribute for WWA (#14901)
      input.setAttribute("type", "radio");
      input.setAttribute("checked", "checked");
      input.setAttribute("name", "t");

      div.appendChild(input);

      // Support: Safari<=5.1, Android<4.2
      // Older WebKit doesn't clone checked state correctly in fragments
      support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

      // Support: IE<=11+
      // Make sure textarea (and checkbox) defaultValue is properly cloned
      div.innerHTML = "<textarea>x</textarea>";
      support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
    })();
    var strundefined = typeof undefined;


    support.focusinBubbles = "onfocusin" in window;


    var
      rkeyEvent = /^key/,
      rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
      rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
      rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

    function returnTrue() {
      return true;
    }

    function returnFalse() {
      return false;
    }

    function safeActiveElement() {
      try {
        return document.activeElement;
      } catch (err) {}
    }

    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {

      global: {},

      add: function(elem, types, handler, data, selector) {

        var handleObjIn, eventHandle, tmp,
          events, t, handleObj,
          special, handlers, type, namespaces, origType,
          elemData = data_priv.get(elem);

        // Don't attach events to noData or text/comment nodes (but allow plain objects)
        if (!elemData) {
          return;
        }

        // Caller can pass in an object of custom data in lieu of the handler
        if (handler.handler) {
          handleObjIn = handler;
          handler = handleObjIn.handler;
          selector = handleObjIn.selector;
        }

        // Make sure that the handler has a unique ID, used to find/remove it later
        if (!handler.guid) {
          handler.guid = jQuery.guid++;
        }

        // Init the element's event structure and main handler, if this is the first
        if (!(events = elemData.events)) {
          events = elemData.events = {};
        }
        if (!(eventHandle = elemData.handle)) {
          eventHandle = elemData.handle = function(e) {
            // Discard the second event of a jQuery.event.trigger() and
            // when an event is called after a page has unloaded
            return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
              jQuery.event.dispatch.apply(elem, arguments) : undefined;
          };
        }

        // Handle multiple events separated by a space
        types = (types || "").match(rnotwhite) || [""];
        t = types.length;
        while (t--) {
          tmp = rtypenamespace.exec(types[t]) || [];
          type = origType = tmp[1];
          namespaces = (tmp[2] || "").split(".").sort();

          // There *must* be a type, no attaching namespace-only handlers
          if (!type) {
            continue;
          }

          // If event changes its type, use the special event handlers for the changed type
          special = jQuery.event.special[type] || {};

          // If selector defined, determine special event api type, otherwise given type
          type = (selector ? special.delegateType : special.bindType) || type;

          // Update special based on newly reset type
          special = jQuery.event.special[type] || {};

          // handleObj is passed to all event handlers
          handleObj = jQuery.extend({
            type: type,
            origType: origType,
            data: data,
            handler: handler,
            guid: handler.guid,
            selector: selector,
            needsContext: selector && jQuery.expr.match.needsContext.test(selector),
            namespace: namespaces.join(".")
          }, handleObjIn);

          // Init the event handler queue if we're the first
          if (!(handlers = events[type])) {
            handlers = events[type] = [];
            handlers.delegateCount = 0;

            // Only use addEventListener if the special events handler returns false
            if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
              if (elem.addEventListener) {
                elem.addEventListener(type, eventHandle, false);
              }
            }
          }

          if (special.add) {
            special.add.call(elem, handleObj);

            if (!handleObj.handler.guid) {
              handleObj.handler.guid = handler.guid;
            }
          }

          // Add to the element's handler list, delegates in front
          if (selector) {
            handlers.splice(handlers.delegateCount++, 0, handleObj);
          } else {
            handlers.push(handleObj);
          }

          // Keep track of which events have ever been used, for event optimization
          jQuery.event.global[type] = true;
        }

      },

      // Detach an event or set of events from an element
      remove: function(elem, types, handler, selector, mappedTypes) {

        var j, origCount, tmp,
          events, t, handleObj,
          special, handlers, type, namespaces, origType,
          elemData = data_priv.hasData(elem) && data_priv.get(elem);

        if (!elemData || !(events = elemData.events)) {
          return;
        }

        // Once for each type.namespace in types; type may be omitted
        types = (types || "").match(rnotwhite) || [""];
        t = types.length;
        while (t--) {
          tmp = rtypenamespace.exec(types[t]) || [];
          type = origType = tmp[1];
          namespaces = (tmp[2] || "").split(".").sort();

          // Unbind all events (on this namespace, if provided) for the element
          if (!type) {
            for (type in events) {
              jQuery.event.remove(elem, type + types[t], handler, selector, true);
            }
            continue;
          }

          special = jQuery.event.special[type] || {};
          type = (selector ? special.delegateType : special.bindType) || type;
          handlers = events[type] || [];
          tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

          // Remove matching events
          origCount = j = handlers.length;
          while (j--) {
            handleObj = handlers[j];

            if ((mappedTypes || origType === handleObj.origType) &&
              (!handler || handler.guid === handleObj.guid) &&
              (!tmp || tmp.test(handleObj.namespace)) &&
              (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
              handlers.splice(j, 1);

              if (handleObj.selector) {
                handlers.delegateCount--;
              }
              if (special.remove) {
                special.remove.call(elem, handleObj);
              }
            }
          }

          // Remove generic event handler if we removed something and no more handlers exist
          // (avoids potential for endless recursion during removal of special event handlers)
          if (origCount && !handlers.length) {
            if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
              jQuery.removeEvent(elem, type, elemData.handle);
            }

            delete events[type];
          }
        }

        // Remove the expando if it's no longer used
        if (jQuery.isEmptyObject(events)) {
          delete elemData.handle;
          data_priv.remove(elem, "events");
        }
      },

      trigger: function(event, data, elem, onlyHandlers) {

        var i, cur, tmp, bubbleType, ontype, handle, special,
          eventPath = [elem || document],
          type = hasOwn.call(event, "type") ? event.type : event,
          namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

        cur = tmp = elem = elem || document;

        // Don't do events on text and comment nodes
        if (elem.nodeType === 3 || elem.nodeType === 8) {
          return;
        }

        // focus/blur morphs to focusin/out; ensure we're not firing them right now
        if (rfocusMorph.test(type + jQuery.event.triggered)) {
          return;
        }

        if (type.indexOf(".") >= 0) {
          // Namespaced trigger; create a regexp to match event type in handle()
          namespaces = type.split(".");
          type = namespaces.shift();
          namespaces.sort();
        }
        ontype = type.indexOf(":") < 0 && "on" + type;

        // Caller can pass in a jQuery.Event object, Object, or just an event type string
        event = event[jQuery.expando] ?
          event :
          new jQuery.Event(type, typeof event === "object" && event);

        // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
        event.isTrigger = onlyHandlers ? 2 : 3;
        event.namespace = namespaces.join(".");
        event.namespace_re = event.namespace ?
          new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
          null;

        // Clean up the event in case it is being reused
        event.result = undefined;
        if (!event.target) {
          event.target = elem;
        }

        // Clone any incoming data and prepend the event, creating the handler arg list
        data = data == null ? [event] :
          jQuery.makeArray(data, [event]);

        // Allow special events to draw outside the lines
        special = jQuery.event.special[type] || {};
        if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
          return;
        }

        // Determine event propagation path in advance, per W3C events spec (#9951)
        // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
        if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

          bubbleType = special.delegateType || type;
          if (!rfocusMorph.test(bubbleType + type)) {
            cur = cur.parentNode;
          }
          for (; cur; cur = cur.parentNode) {
            eventPath.push(cur);
            tmp = cur;
          }

          // Only add window if we got to document (e.g., not plain obj or detached DOM)
          if (tmp === (elem.ownerDocument || document)) {
            eventPath.push(tmp.defaultView || tmp.parentWindow || window);
          }
        }

        // Fire handlers on the event path
        i = 0;
        while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

          event.type = i > 1 ?
            bubbleType :
            special.bindType || type;

          // jQuery handler
          handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle");
          if (handle) {
            handle.apply(cur, data);
          }

          // Native handler
          handle = ontype && cur[ontype];
          if (handle && handle.apply && jQuery.acceptData(cur)) {
            event.result = handle.apply(cur, data);
            if (event.result === false) {
              event.preventDefault();
            }
          }
        }
        event.type = type;

        // If nobody prevented the default action, do it now
        if (!onlyHandlers && !event.isDefaultPrevented()) {

          if ((!special._default || special._default.apply(eventPath.pop(), data) === false) &&
            jQuery.acceptData(elem)) {

            // Call a native DOM method on the target with the same name name as the event.
            // Don't do default actions on window, that's where global variables be (#6170)
            if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

              // Don't re-trigger an onFOO event when we call its FOO() method
              tmp = elem[ontype];

              if (tmp) {
                elem[ontype] = null;
              }

              // Prevent re-triggering of the same event, since we already bubbled it above
              jQuery.event.triggered = type;
              elem[type]();
              jQuery.event.triggered = undefined;

              if (tmp) {
                elem[ontype] = tmp;
              }
            }
          }
        }

        return event.result;
      },

      dispatch: function(event) {

        // Make a writable jQuery.Event from the native event object
        event = jQuery.event.fix(event);

        var i, j, ret, matched, handleObj,
          handlerQueue = [],
          args = slice.call(arguments),
          handlers = (data_priv.get(this, "events") || {})[event.type] || [],
          special = jQuery.event.special[event.type] || {};

        // Use the fix-ed jQuery.Event rather than the (read-only) native event
        args[0] = event;
        event.delegateTarget = this;

        // Call the preDispatch hook for the mapped type, and let it bail if desired
        if (special.preDispatch && special.preDispatch.call(this, event) === false) {
          return;
        }

        // Determine handlers
        handlerQueue = jQuery.event.handlers.call(this, event, handlers);

        // Run delegates first; they may want to stop propagation beneath us
        i = 0;
        while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
          event.currentTarget = matched.elem;

          j = 0;
          while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

            // Triggered event must either 1) have no namespace, or 2) have namespace(s)
            // a subset or equal to those in the bound event (both can have no namespace).
            if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {

              event.handleObj = handleObj;
              event.data = handleObj.data;

              ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler)
                .apply(matched.elem, args);

              if (ret !== undefined) {
                if ((event.result = ret) === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }
            }
          }
        }

        // Call the postDispatch hook for the mapped type
        if (special.postDispatch) {
          special.postDispatch.call(this, event);
        }

        return event.result;
      },

      handlers: function(event, handlers) {
        var i, matches, sel, handleObj,
          handlerQueue = [],
          delegateCount = handlers.delegateCount,
          cur = event.target;

        // Find delegate handlers
        // Black-hole SVG <use> instance trees (#13180)
        // Avoid non-left-click bubbling in Firefox (#3861)
        if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {

          for (; cur !== this; cur = cur.parentNode || this) {

            // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
            if (cur.disabled !== true || event.type !== "click") {
              matches = [];
              for (i = 0; i < delegateCount; i++) {
                handleObj = handlers[i];

                // Don't conflict with Object.prototype properties (#13203)
                sel = handleObj.selector + " ";

                if (matches[sel] === undefined) {
                  matches[sel] = handleObj.needsContext ?
                    jQuery(sel, this).index(cur) >= 0 :
                    jQuery.find(sel, this, null, [cur]).length;
                }
                if (matches[sel]) {
                  matches.push(handleObj);
                }
              }
              if (matches.length) {
                handlerQueue.push({
                  elem: cur,
                  handlers: matches
                });
              }
            }
          }
        }

        // Add the remaining (directly-bound) handlers
        if (delegateCount < handlers.length) {
          handlerQueue.push({
            elem: this,
            handlers: handlers.slice(delegateCount)
          });
        }

        return handlerQueue;
      },

      // Includes some event props shared by KeyEvent and MouseEvent
      props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

      fixHooks: {},

      keyHooks: {
        props: "char charCode key keyCode".split(" "),
        filter: function(event, original) {

          // Add which for key events
          if (event.which == null) {
            event.which = original.charCode != null ? original.charCode : original.keyCode;
          }

          return event;
        }
      },

      mouseHooks: {
        props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
        filter: function(event, original) {
          var eventDoc, doc, body,
            button = original.button;

          // Calculate pageX/Y if missing and clientX/Y available
          if (event.pageX == null && original.clientX != null) {
            eventDoc = event.target.ownerDocument || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
          }

          // Add which for click: 1 === left; 2 === middle; 3 === right
          // Note: button is not normalized, so don't use it
          if (!event.which && button !== undefined) {
            event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
          }

          return event;
        }
      },

      fix: function(event) {
        if (event[jQuery.expando]) {
          return event;
        }

        // Create a writable copy of the event object and normalize some properties
        var i, prop, copy,
          type = event.type,
          originalEvent = event,
          fixHook = this.fixHooks[type];

        if (!fixHook) {
          this.fixHooks[type] = fixHook =
            rmouseEvent.test(type) ? this.mouseHooks :
            rkeyEvent.test(type) ? this.keyHooks : {};
        }
        copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

        event = new jQuery.Event(originalEvent);

        i = copy.length;
        while (i--) {
          prop = copy[i];
          event[prop] = originalEvent[prop];
        }

        // Support: Cordova 2.5 (WebKit) (#13255)
        // All events should have a target; Cordova deviceready doesn't
        if (!event.target) {
          event.target = document;
        }

        // Support: Safari 6.0+, Chrome<28
        // Target should not be a text node (#504, #13143)
        if (event.target.nodeType === 3) {
          event.target = event.target.parentNode;
        }

        return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
      },

      special: {
        load: {
          // Prevent triggered image.load events from bubbling to window.load
          noBubble: true
        },
        focus: {
          // Fire native event if possible so blur/focus sequence is correct
          trigger: function() {
            if (this !== safeActiveElement() && this.focus) {
              this.focus();
              return false;
            }
          },
          delegateType: "focusin"
        },
        blur: {
          trigger: function() {
            if (this === safeActiveElement() && this.blur) {
              this.blur();
              return false;
            }
          },
          delegateType: "focusout"
        },
        click: {
          // For checkbox, fire native event so checked state will be right
          trigger: function() {
            if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
              this.click();
              return false;
            }
          },

          // For cross-browser consistency, don't fire native .click() on links
          _default: function(event) {
            return jQuery.nodeName(event.target, "a");
          }
        },

        beforeunload: {
          postDispatch: function(event) {

            // Support: Firefox 20+
            // Firefox doesn't alert if the returnValue field is not set.
            if (event.result !== undefined && event.originalEvent) {
              event.originalEvent.returnValue = event.result;
            }
          }
        }
      },

      simulate: function(type, elem, event, bubble) {
        // Piggyback on a donor event to simulate a different one.
        // Fake originalEvent to avoid donor's stopPropagation, but if the
        // simulated event prevents default then we do the same on the donor.
        var e = jQuery.extend(
          new jQuery.Event(),
          event, {
            type: type,
            isSimulated: true,
            originalEvent: {}
          }
        );
        if (bubble) {
          jQuery.event.trigger(e, null, elem);
        } else {
          jQuery.event.dispatch.call(elem, e);
        }
        if (e.isDefaultPrevented()) {
          event.preventDefault();
        }
      }
    };

    jQuery.removeEvent = function(elem, type, handle) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type, handle, false);
      }
    };

    jQuery.Event = function(src, props) {
      // Allow instantiation without the 'new' keyword
      if (!(this instanceof jQuery.Event)) {
        return new jQuery.Event(src, props);
      }

      // Event object
      if (src && src.type) {
        this.originalEvent = src;
        this.type = src.type;

        // Events bubbling up the document may have been marked as prevented
        // by a handler lower down the tree; reflect the correct value.
        this.isDefaultPrevented = src.defaultPrevented ||
          src.defaultPrevented === undefined &&
          // Support: Android<4.0
          src.returnValue === false ?
          returnTrue :
          returnFalse;

        // Event type
      } else {
        this.type = src;
      }

      // Put explicitly provided properties onto the event object
      if (props) {
        jQuery.extend(this, props);
      }

      // Create a timestamp if incoming event doesn't have one
      this.timeStamp = src && src.timeStamp || jQuery.now();

      // Mark it as fixed
      this[jQuery.expando] = true;
    };

    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
      isDefaultPrevented: returnFalse,
      isPropagationStopped: returnFalse,
      isImmediatePropagationStopped: returnFalse,

      preventDefault: function() {
        var e = this.originalEvent;

        this.isDefaultPrevented = returnTrue;

        if (e && e.preventDefault) {
          e.preventDefault();
        }
      },
      stopPropagation: function() {
        var e = this.originalEvent;

        this.isPropagationStopped = returnTrue;

        if (e && e.stopPropagation) {
          e.stopPropagation();
        }
      },
      stopImmediatePropagation: function() {
        var e = this.originalEvent;

        this.isImmediatePropagationStopped = returnTrue;

        if (e && e.stopImmediatePropagation) {
          e.stopImmediatePropagation();
        }

        this.stopPropagation();
      }
    };

    // Create mouseenter/leave events using mouseover/out and event-time checks
    // Support: Chrome 15+
    jQuery.each({
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      pointerenter: "pointerover",
      pointerleave: "pointerout"
    }, function(orig, fix) {
      jQuery.event.special[orig] = {
        delegateType: fix,
        bindType: fix,

        handle: function(event) {
          var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj;

          // For mousenter/leave call the handler if related is outside the target.
          // NB: No relatedTarget if the mouse left/entered the browser window
          if (!related || (related !== target && !jQuery.contains(target, related))) {
            event.type = handleObj.origType;
            ret = handleObj.handler.apply(this, arguments);
            event.type = fix;
          }
          return ret;
        }
      };
    });

    // Support: Firefox, Chrome, Safari
    // Create "bubbling" focus and blur events
    if (!support.focusinBubbles) {
      jQuery.each({
        focus: "focusin",
        blur: "focusout"
      }, function(orig, fix) {

        // Attach a single capturing handler on the document while someone wants focusin/focusout
        var handler = function(event) {
          jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
        };

        jQuery.event.special[fix] = {
          setup: function() {
            var doc = this.ownerDocument || this,
              attaches = data_priv.access(doc, fix);

            if (!attaches) {
              doc.addEventListener(orig, handler, true);
            }
            data_priv.access(doc, fix, (attaches || 0) + 1);
          },
          teardown: function() {
            var doc = this.ownerDocument || this,
              attaches = data_priv.access(doc, fix) - 1;

            if (!attaches) {
              doc.removeEventListener(orig, handler, true);
              data_priv.remove(doc, fix);

            } else {
              data_priv.access(doc, fix, attaches);
            }
          }
        };
      });
    }

    jQuery.fn.extend({

      on: function(types, selector, data, fn, /*INTERNAL*/ one) {
        var origFn, type;

        // Types can be a map of types/handlers
        if (typeof types === "object") {
          // ( types-Object, selector, data )
          if (typeof selector !== "string") {
            // ( types-Object, data )
            data = data || selector;
            selector = undefined;
          }
          for (type in types) {
            this.on(type, selector, data, types[type], one);
          }
          return this;
        }

        if (data == null && fn == null) {
          // ( types, fn )
          fn = selector;
          data = selector = undefined;
        } else if (fn == null) {
          if (typeof selector === "string") {
            // ( types, selector, fn )
            fn = data;
            data = undefined;
          } else {
            // ( types, data, fn )
            fn = data;
            data = selector;
            selector = undefined;
          }
        }
        if (fn === false) {
          fn = returnFalse;
        } else if (!fn) {
          return this;
        }

        if (one === 1) {
          origFn = fn;
          fn = function(event) {
            // Can use an empty set, since event contains the info
            jQuery().off(event);
            return origFn.apply(this, arguments);
          };
          // Use same guid so caller can remove using origFn
          fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
        }
        return this.each(function() {
          jQuery.event.add(this, types, fn, data, selector);
        });
      },
      one: function(types, selector, data, fn) {
        return this.on(types, selector, data, fn, 1);
      },
      off: function(types, selector, fn) {
        var handleObj, type;
        if (types && types.preventDefault && types.handleObj) {
          // ( event )  dispatched jQuery.Event
          handleObj = types.handleObj;
          jQuery(types.delegateTarget).off(
            handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
            handleObj.selector,
            handleObj.handler
          );
          return this;
        }
        if (typeof types === "object") {
          // ( types-object [, selector] )
          for (type in types) {
            this.off(type, selector, types[type]);
          }
          return this;
        }
        if (selector === false || typeof selector === "function") {
          // ( types [, fn] )
          fn = selector;
          selector = undefined;
        }
        if (fn === false) {
          fn = returnFalse;
        }
        return this.each(function() {
          jQuery.event.remove(this, types, fn, selector);
        });
      },

      trigger: function(type, data) {
        return this.each(function() {
          jQuery.event.trigger(type, data, this);
        });
      },
      triggerHandler: function(type, data) {
        var elem = this[0];
        if (elem) {
          return jQuery.event.trigger(type, data, elem, true);
        }
      }
    });


    var
      rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
      rtagName = /<([\w:]+)/,
      rhtml = /<|&#?\w+;/,
      rnoInnerhtml = /<(?:script|style|link)/i,
      // checked="checked" or checked
      rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
      rscriptType = /^$|\/(?:java|ecma)script/i,
      rscriptTypeMasked = /^true\/(.*)/,
      rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

      // We have to close these tags to support XHTML (#13200)
      wrapMap = {

        // Support: IE9
        option: [1, "<select multiple='multiple'>", "</select>"],

        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

        _default: [0, "", ""]
      };

    // Support: IE9
    wrapMap.optgroup = wrapMap.option;

    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;

    // Support: 1.x compatibility
    // Manipulating tables requires a tbody
    function manipulationTarget(elem, content) {
      return jQuery.nodeName(elem, "table") &&
        jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ?

        elem.getElementsByTagName("tbody")[0] ||
        elem.appendChild(elem.ownerDocument.createElement("tbody")) :
        elem;
    }

    // Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript(elem) {
      elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
      return elem;
    }

    function restoreScript(elem) {
      var match = rscriptTypeMasked.exec(elem.type);

      if (match) {
        elem.type = match[1];
      } else {
        elem.removeAttribute("type");
      }

      return elem;
    }

    // Mark scripts as having already been evaluated
    function setGlobalEval(elems, refElements) {
      var i = 0,
        l = elems.length;

      for (; i < l; i++) {
        data_priv.set(
          elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval")
        );
      }
    }

    function cloneCopyEvent(src, dest) {
      var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

      if (dest.nodeType !== 1) {
        return;
      }

      // 1. Copy private data: events, handlers, etc.
      if (data_priv.hasData(src)) {
        pdataOld = data_priv.access(src);
        pdataCur = data_priv.set(dest, pdataOld);
        events = pdataOld.events;

        if (events) {
          delete pdataCur.handle;
          pdataCur.events = {};

          for (type in events) {
            for (i = 0, l = events[type].length; i < l; i++) {
              jQuery.event.add(dest, type, events[type][i]);
            }
          }
        }
      }

      // 2. Copy user data
      if (data_user.hasData(src)) {
        udataOld = data_user.access(src);
        udataCur = jQuery.extend({}, udataOld);

        data_user.set(dest, udataCur);
      }
    }

    function getAll(context, tag) {
      var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") :
        context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];

      return tag === undefined || tag && jQuery.nodeName(context, tag) ?
        jQuery.merge([context], ret) :
        ret;
    }

    // Fix IE bugs, see support tests
    function fixInput(src, dest) {
      var nodeName = dest.nodeName.toLowerCase();

      // Fails to persist the checked state of a cloned checkbox or radio button.
      if (nodeName === "input" && rcheckableType.test(src.type)) {
        dest.checked = src.checked;

        // Fails to return the selected option to the default selected state when cloning options
      } else if (nodeName === "input" || nodeName === "textarea") {
        dest.defaultValue = src.defaultValue;
      }
    }

    jQuery.extend({
      clone: function(elem, dataAndEvents, deepDataAndEvents) {
        var i, l, srcElements, destElements,
          clone = elem.cloneNode(true),
          inPage = jQuery.contains(elem.ownerDocument, elem);

        // Fix IE cloning issues
        if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

          // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
          destElements = getAll(clone);
          srcElements = getAll(elem);

          for (i = 0, l = srcElements.length; i < l; i++) {
            fixInput(srcElements[i], destElements[i]);
          }
        }

        // Copy the events from the original to the clone
        if (dataAndEvents) {
          if (deepDataAndEvents) {
            srcElements = srcElements || getAll(elem);
            destElements = destElements || getAll(clone);

            for (i = 0, l = srcElements.length; i < l; i++) {
              cloneCopyEvent(srcElements[i], destElements[i]);
            }
          } else {
            cloneCopyEvent(elem, clone);
          }
        }

        // Preserve script evaluation history
        destElements = getAll(clone, "script");
        if (destElements.length > 0) {
          setGlobalEval(destElements, !inPage && getAll(elem, "script"));
        }

        // Return the cloned set
        return clone;
      },

      buildFragment: function(elems, context, scripts, selection) {
        var elem, tmp, tag, wrap, contains, j,
          fragment = context.createDocumentFragment(),
          nodes = [],
          i = 0,
          l = elems.length;

        for (; i < l; i++) {
          elem = elems[i];

          if (elem || elem === 0) {

            // Add nodes directly
            if (jQuery.type(elem) === "object") {
              // Support: QtWebKit, PhantomJS
              // push.apply(_, arraylike) throws on ancient WebKit
              jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

              // Convert non-html into a text node
            } else if (!rhtml.test(elem)) {
              nodes.push(context.createTextNode(elem));

              // Convert html into DOM nodes
            } else {
              tmp = tmp || fragment.appendChild(context.createElement("div"));

              // Deserialize a standard representation
              tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
              wrap = wrapMap[tag] || wrapMap._default;
              tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];

              // Descend through wrappers to the right content
              j = wrap[0];
              while (j--) {
                tmp = tmp.lastChild;
              }

              // Support: QtWebKit, PhantomJS
              // push.apply(_, arraylike) throws on ancient WebKit
              jQuery.merge(nodes, tmp.childNodes);

              // Remember the top-level container
              tmp = fragment.firstChild;

              // Ensure the created nodes are orphaned (#12392)
              tmp.textContent = "";
            }
          }
        }

        // Remove wrapper from fragment
        fragment.textContent = "";

        i = 0;
        while ((elem = nodes[i++])) {

          // #4087 - If origin and destination elements are the same, and this is
          // that element, do not do anything
          if (selection && jQuery.inArray(elem, selection) !== -1) {
            continue;
          }

          contains = jQuery.contains(elem.ownerDocument, elem);

          // Append to fragment
          tmp = getAll(fragment.appendChild(elem), "script");

          // Preserve script evaluation history
          if (contains) {
            setGlobalEval(tmp);
          }

          // Capture executables
          if (scripts) {
            j = 0;
            while ((elem = tmp[j++])) {
              if (rscriptType.test(elem.type || "")) {
                scripts.push(elem);
              }
            }
          }
        }

        return fragment;
      },

      cleanData: function(elems) {
        var data, elem, type, key,
          special = jQuery.event.special,
          i = 0;

        for (;
          (elem = elems[i]) !== undefined; i++) {
          if (jQuery.acceptData(elem)) {
            key = elem[data_priv.expando];

            if (key && (data = data_priv.cache[key])) {
              if (data.events) {
                for (type in data.events) {
                  if (special[type]) {
                    jQuery.event.remove(elem, type);

                    // This is a shortcut to avoid jQuery.event.remove's overhead
                  } else {
                    jQuery.removeEvent(elem, type, data.handle);
                  }
                }
              }
              if (data_priv.cache[key]) {
                // Discard any remaining `private` data
                delete data_priv.cache[key];
              }
            }
          }
          // Discard any remaining `user` data
          delete data_user.cache[elem[data_user.expando]];
        }
      }
    });

    jQuery.fn.extend({
      text: function(value) {
        return access(this, function(value) {
          return value === undefined ?
            jQuery.text(this) :
            this.empty().each(function() {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                this.textContent = value;
              }
            });
        }, null, value, arguments.length);
      },

      append: function() {
        return this.domManip(arguments, function(elem) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var target = manipulationTarget(this, elem);
            target.appendChild(elem);
          }
        });
      },

      prepend: function() {
        return this.domManip(arguments, function(elem) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var target = manipulationTarget(this, elem);
            target.insertBefore(elem, target.firstChild);
          }
        });
      },

      before: function() {
        return this.domManip(arguments, function(elem) {
          if (this.parentNode) {
            this.parentNode.insertBefore(elem, this);
          }
        });
      },

      after: function() {
        return this.domManip(arguments, function(elem) {
          if (this.parentNode) {
            this.parentNode.insertBefore(elem, this.nextSibling);
          }
        });
      },

      remove: function(selector, keepData /* Internal Use Only */ ) {
        var elem,
          elems = selector ? jQuery.filter(selector, this) : this,
          i = 0;

        for (;
          (elem = elems[i]) != null; i++) {
          if (!keepData && elem.nodeType === 1) {
            jQuery.cleanData(getAll(elem));
          }

          if (elem.parentNode) {
            if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
              setGlobalEval(getAll(elem, "script"));
            }
            elem.parentNode.removeChild(elem);
          }
        }

        return this;
      },

      empty: function() {
        var elem,
          i = 0;

        for (;
          (elem = this[i]) != null; i++) {
          if (elem.nodeType === 1) {

            // Prevent memory leaks
            jQuery.cleanData(getAll(elem, false));

            // Remove any remaining nodes
            elem.textContent = "";
          }
        }

        return this;
      },

      clone: function(dataAndEvents, deepDataAndEvents) {
        dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
        deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

        return this.map(function() {
          return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
        });
      },

      html: function(value) {
        return access(this, function(value) {
          var elem = this[0] || {},
            i = 0,
            l = this.length;

          if (value === undefined && elem.nodeType === 1) {
            return elem.innerHTML;
          }

          // See if we can take a shortcut and just use innerHTML
          if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

            value = value.replace(rxhtmlTag, "<$1></$2>");

            try {
              for (; i < l; i++) {
                elem = this[i] || {};

                // Remove element nodes and prevent memory leaks
                if (elem.nodeType === 1) {
                  jQuery.cleanData(getAll(elem, false));
                  elem.innerHTML = value;
                }
              }

              elem = 0;

              // If using innerHTML throws an exception, use the fallback method
            } catch (e) {}
          }

          if (elem) {
            this.empty().append(value);
          }
        }, null, value, arguments.length);
      },

      replaceWith: function() {
        var arg = arguments[0];

        // Make the changes, replacing each context element with the new content
        this.domManip(arguments, function(elem) {
          arg = this.parentNode;

          jQuery.cleanData(getAll(this));

          if (arg) {
            arg.replaceChild(elem, this);
          }
        });

        // Force removal if there was no new content (e.g., from empty arguments)
        return arg && (arg.length || arg.nodeType) ? this : this.remove();
      },

      detach: function(selector) {
        return this.remove(selector, true);
      },

      domManip: function(args, callback) {

        // Flatten any nested arrays
        args = concat.apply([], args);

        var fragment, first, scripts, hasScripts, node, doc,
          i = 0,
          l = this.length,
          set = this,
          iNoClone = l - 1,
          value = args[0],
          isFunction = jQuery.isFunction(value);

        // We can't cloneNode fragments that contain checked, in WebKit
        if (isFunction ||
          (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
          return this.each(function(index) {
            var self = set.eq(index);
            if (isFunction) {
              args[0] = value.call(this, index, self.html());
            }
            self.domManip(args, callback);
          });
        }

        if (l) {
          fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
          first = fragment.firstChild;

          if (fragment.childNodes.length === 1) {
            fragment = first;
          }

          if (first) {
            scripts = jQuery.map(getAll(fragment, "script"), disableScript);
            hasScripts = scripts.length;

            // Use the original fragment for the last item instead of the first because it can end up
            // being emptied incorrectly in certain situations (#8070).
            for (; i < l; i++) {
              node = fragment;

              if (i !== iNoClone) {
                node = jQuery.clone(node, true, true);

                // Keep references to cloned scripts for later restoration
                if (hasScripts) {
                  // Support: QtWebKit
                  // jQuery.merge because push.apply(_, arraylike) throws
                  jQuery.merge(scripts, getAll(node, "script"));
                }
              }

              callback.call(this[i], node, i);
            }

            if (hasScripts) {
              doc = scripts[scripts.length - 1].ownerDocument;

              // Reenable scripts
              jQuery.map(scripts, restoreScript);

              // Evaluate executable scripts on first document insertion
              for (i = 0; i < hasScripts; i++) {
                node = scripts[i];
                if (rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node)) {

                  if (node.src) {
                    // Optional AJAX dependency, but won't run scripts if not present
                    if (jQuery._evalUrl) {
                      jQuery._evalUrl(node.src);
                    }
                  } else {
                    jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
                  }
                }
              }
            }
          }
        }

        return this;
      }
    });

    jQuery.each({
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
    }, function(name, original) {
      jQuery.fn[name] = function(selector) {
        var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0;

        for (; i <= last; i++) {
          elems = i === last ? this : this.clone(true);
          jQuery(insert[i])[original](elems);

          // Support: QtWebKit
          // .get() because push.apply(_, arraylike) throws
          push.apply(ret, elems.get());
        }

        return this.pushStack(ret);
      };
    });


    var iframe,
      elemdisplay = {};

    /**
     * Retrieve the actual display of a element
     * @param {String} name nodeName of the element
     * @param {Object} doc Document object
     */
    // Called only from within defaultDisplay
    function actualDisplay(name, doc) {
      var style,
        elem = jQuery(doc.createElement(name)).appendTo(doc.body),

        // getDefaultComputedStyle might be reliably used only on attached element
        display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ?

        // Use of this method is a temporary fix (more like optimization) until something better comes along,
        // since it was removed from specification and supported only in FF
        style.display : jQuery.css(elem[0], "display");

      // We don't have any data stored on the element,
      // so use "detach" method as fast way to get rid of the element
      elem.detach();

      return display;
    }

    /**
     * Try to determine the default display value of an element
     * @param {String} nodeName
     */
    function defaultDisplay(nodeName) {
      var doc = document,
        display = elemdisplay[nodeName];

      if (!display) {
        display = actualDisplay(nodeName, doc);

        // If the simple way fails, read from inside an iframe
        if (display === "none" || !display) {

          // Use the already-created iframe if possible
          iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);

          // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
          doc = iframe[0].contentDocument;

          // Support: IE
          doc.write();
          doc.close();

          display = actualDisplay(nodeName, doc);
          iframe.detach();
        }

        // Store the correct default display
        elemdisplay[nodeName] = display;
      }

      return display;
    }

    var rmargin = (/^margin/);

    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

    var getStyles = function(elem) {
      // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
      // IE throws on elements created in popups
      // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
      if (elem.ownerDocument.defaultView.opener) {
        return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
      }

      return window.getComputedStyle(elem, null);
    };


    function curCSS(elem, name, computed) {
      var width, minWidth, maxWidth, ret,
        style = elem.style;

      computed = computed || getStyles(elem);

      // Support: IE9
      // getPropertyValue is only needed for .css('filter') (#12537)
      if (computed) {
        ret = computed.getPropertyValue(name) || computed[name];
      }

      if (computed) {

        if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
          ret = jQuery.style(elem, name);
        }

        // Support: iOS < 6
        // A tribute to the "awesome hack by Dean Edwards"
        // iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
        // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
        if (rnumnonpx.test(ret) && rmargin.test(name)) {

          // Remember the original values
          width = style.width;
          minWidth = style.minWidth;
          maxWidth = style.maxWidth;

          // Put in the new values to get a computed value out
          style.minWidth = style.maxWidth = style.width = ret;
          ret = computed.width;

          // Revert the changed values
          style.width = width;
          style.minWidth = minWidth;
          style.maxWidth = maxWidth;
        }
      }

      return ret !== undefined ?
        // Support: IE
        // IE returns zIndex value as an integer.
        ret + "" :
        ret;
    }


    function addGetHookIf(conditionFn, hookFn) {
      // Define the hook, we'll check on the first run if it's really needed.
      return {
        get: function() {
          if (conditionFn()) {
            // Hook not needed (or it's not possible to use it due
            // to missing dependency), remove it.
            delete this.get;
            return;
          }

          // Hook needed; redefine it so that the support test is not executed again.
          return (this.get = hookFn).apply(this, arguments);
        }
      };
    }


    (function() {
      var pixelPositionVal, boxSizingReliableVal,
        docElem = document.documentElement,
        container = document.createElement("div"),
        div = document.createElement("div");

      if (!div.style) {
        return;
      }

      // Support: IE9-11+
      // Style of cloned element affects source element cloned (#8908)
      div.style.backgroundClip = "content-box";
      div.cloneNode(true).style.backgroundClip = "";
      support.clearCloneStyle = div.style.backgroundClip === "content-box";

      container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
        "position:absolute";
      container.appendChild(div);

      // Executing both pixelPosition & boxSizingReliable tests require only one layout
      // so they're executed at the same time to save the second computation.
      function computePixelPositionAndBoxSizingReliable() {
        div.style.cssText =
          // Support: Firefox<29, Android 2.3
          // Vendor-prefix box-sizing
          "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
          "box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
          "border:1px;padding:1px;width:4px;position:absolute";
        div.innerHTML = "";
        docElem.appendChild(container);

        var divStyle = window.getComputedStyle(div, null);
        pixelPositionVal = divStyle.top !== "1%";
        boxSizingReliableVal = divStyle.width === "4px";

        docElem.removeChild(container);
      }

      // Support: node.js jsdom
      // Don't assume that getComputedStyle is a property of the global object
      if (window.getComputedStyle) {
        jQuery.extend(support, {
          pixelPosition: function() {

            // This test is executed only once but we still do memoizing
            // since we can use the boxSizingReliable pre-computing.
            // No need to check if the test was already performed, though.
            computePixelPositionAndBoxSizingReliable();
            return pixelPositionVal;
          },
          boxSizingReliable: function() {
            if (boxSizingReliableVal == null) {
              computePixelPositionAndBoxSizingReliable();
            }
            return boxSizingReliableVal;
          },
          reliableMarginRight: function() {

            // Support: Android 2.3
            // Check if div with explicit width and no margin-right incorrectly
            // gets computed margin-right based on width of container. (#3333)
            // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
            // This support function is only executed once so no memoizing is needed.
            var ret,
              marginDiv = div.appendChild(document.createElement("div"));

            // Reset CSS: box-sizing; display; margin; border; padding
            marginDiv.style.cssText = div.style.cssText =
              // Support: Firefox<29, Android 2.3
              // Vendor-prefix box-sizing
              "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
              "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
            marginDiv.style.marginRight = marginDiv.style.width = "0";
            div.style.width = "1px";
            docElem.appendChild(container);

            ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight);

            docElem.removeChild(container);
            div.removeChild(marginDiv);

            return ret;
          }
        });
      }
    })();


    // A method for quickly swapping in/out CSS properties to get correct calculations.
    jQuery.swap = function(elem, options, callback, args) {
      var ret, name,
        old = {};

      // Remember the old values, and insert the new ones
      for (name in options) {
        old[name] = elem.style[name];
        elem.style[name] = options[name];
      }

      ret = callback.apply(elem, args || []);

      // Revert the old values
      for (name in options) {
        elem.style[name] = old[name];
      }

      return ret;
    };


    var
      // Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
      // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
      rdisplayswap = /^(none|table(?!-c[ea]).+)/,
      rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
      rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),

      cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
      },
      cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
      },

      cssPrefixes = ["Webkit", "O", "Moz", "ms"];

    // Return a css property mapped to a potentially vendor prefixed property
    function vendorPropName(style, name) {

      // Shortcut for names that are not vendor prefixed
      if (name in style) {
        return name;
      }

      // Check for vendor prefixed names
      var capName = name[0].toUpperCase() + name.slice(1),
        origName = name,
        i = cssPrefixes.length;

      while (i--) {
        name = cssPrefixes[i] + capName;
        if (name in style) {
          return name;
        }
      }

      return origName;
    }

    function setPositiveNumber(elem, value, subtract) {
      var matches = rnumsplit.exec(value);
      return matches ?
        // Guard against undefined "subtract", e.g., when used as in cssHooks
        Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") :
        value;
    }

    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
      var i = extra === (isBorderBox ? "border" : "content") ?
        // If we already have the right measurement, avoid augmentation
        4 :
        // Otherwise initialize for horizontal or vertical properties
        name === "width" ? 1 : 0,

        val = 0;

      for (; i < 4; i += 2) {
        // Both box models exclude margin, so add it if we want it
        if (extra === "margin") {
          val += jQuery.css(elem, extra + cssExpand[i], true, styles);
        }

        if (isBorderBox) {
          // border-box includes padding, so remove it if we want content
          if (extra === "content") {
            val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
          }

          // At this point, extra isn't border nor margin, so remove border
          if (extra !== "margin") {
            val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
          }
        } else {
          // At this point, extra isn't content, so add padding
          val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

          // At this point, extra isn't content nor padding, so add border
          if (extra !== "padding") {
            val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
          }
        }
      }

      return val;
    }

    function getWidthOrHeight(elem, name, extra) {

      // Start with offset property, which is equivalent to the border-box value
      var valueIsBorderBox = true,
        val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
        styles = getStyles(elem),
        isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

      // Some non-html elements return undefined for offsetWidth, so check for null/undefined
      // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
      // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
      if (val <= 0 || val == null) {
        // Fall back to computed then uncomputed css if necessary
        val = curCSS(elem, name, styles);
        if (val < 0 || val == null) {
          val = elem.style[name];
        }

        // Computed unit is not pixels. Stop here and return.
        if (rnumnonpx.test(val)) {
          return val;
        }

        // Check for style in case a browser which returns unreliable values
        // for getComputedStyle silently falls back to the reliable elem.style
        valueIsBorderBox = isBorderBox &&
          (support.boxSizingReliable() || val === elem.style[name]);

        // Normalize "", auto, and prepare for extra
        val = parseFloat(val) || 0;
      }

      // Use the active box-sizing model to add/subtract irrelevant styles
      return (val +
        augmentWidthOrHeight(
          elem,
          name,
          extra || (isBorderBox ? "border" : "content"),
          valueIsBorderBox,
          styles
        )
      ) + "px";
    }

    function showHide(elements, show) {
      var display, elem, hidden,
        values = [],
        index = 0,
        length = elements.length;

      for (; index < length; index++) {
        elem = elements[index];
        if (!elem.style) {
          continue;
        }

        values[index] = data_priv.get(elem, "olddisplay");
        display = elem.style.display;
        if (show) {
          // Reset the inline display of this element to learn if it is
          // being hidden by cascaded rules or not
          if (!values[index] && display === "none") {
            elem.style.display = "";
          }

          // Set elements which have been overridden with display: none
          // in a stylesheet to whatever the default browser style is
          // for such an element
          if (elem.style.display === "" && isHidden(elem)) {
            values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
          }
        } else {
          hidden = isHidden(elem);

          if (display !== "none" || !hidden) {
            data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
          }
        }
      }

      // Set the display of most of the elements in a second loop
      // to avoid the constant reflow
      for (index = 0; index < length; index++) {
        elem = elements[index];
        if (!elem.style) {
          continue;
        }
        if (!show || elem.style.display === "none" || elem.style.display === "") {
          elem.style.display = show ? values[index] || "" : "none";
        }
      }

      return elements;
    }

    jQuery.extend({

      // Add in style property hooks for overriding the default
      // behavior of getting and setting a style property
      cssHooks: {
        opacity: {
          get: function(elem, computed) {
            if (computed) {

              // We should always get a number back from opacity
              var ret = curCSS(elem, "opacity");
              return ret === "" ? "1" : ret;
            }
          }
        }
      },

      // Don't automatically add "px" to these possibly-unitless properties
      cssNumber: {
        "columnCount": true,
        "fillOpacity": true,
        "flexGrow": true,
        "flexShrink": true,
        "fontWeight": true,
        "lineHeight": true,
        "opacity": true,
        "order": true,
        "orphans": true,
        "widows": true,
        "zIndex": true,
        "zoom": true
      },

      // Add in properties whose names you wish to fix before
      // setting or getting the value
      cssProps: {
        "float": "cssFloat"
      },

      // Get and set the style property on a DOM Node
      style: function(elem, name, value, extra) {

        // Don't set styles on text and comment nodes
        if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
          return;
        }

        // Make sure that we're working with the right name
        var ret, type, hooks,
          origName = jQuery.camelCase(name),
          style = elem.style;

        name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));

        // Gets hook for the prefixed version, then unprefixed version
        hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

        // Check if we're setting a value
        if (value !== undefined) {
          type = typeof value;

          // Convert "+=" or "-=" to relative numbers (#7345)
          if (type === "string" && (ret = rrelNum.exec(value))) {
            value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
            // Fixes bug #9237
            type = "number";
          }

          // Make sure that null and NaN values aren't set (#7116)
          if (value == null || value !== value) {
            return;
          }

          // If a number, add 'px' to the (except for certain CSS properties)
          if (type === "number" && !jQuery.cssNumber[origName]) {
            value += "px";
          }

          // Support: IE9-11+
          // background-* props affect original clone's values
          if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
            style[name] = "inherit";
          }

          // If a hook was provided, use that value, otherwise just set the specified value
          if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
            style[name] = value;
          }

        } else {
          // If a hook was provided get the non-computed value from there
          if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
            return ret;
          }

          // Otherwise just get the value from the style object
          return style[name];
        }
      },

      css: function(elem, name, extra, styles) {
        var val, num, hooks,
          origName = jQuery.camelCase(name);

        // Make sure that we're working with the right name
        name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));

        // Try prefixed name followed by the unprefixed name
        hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

        // If a hook was provided get the computed value from there
        if (hooks && "get" in hooks) {
          val = hooks.get(elem, true, extra);
        }

        // Otherwise, if a way to get the computed value exists, use that
        if (val === undefined) {
          val = curCSS(elem, name, styles);
        }

        // Convert "normal" to computed value
        if (val === "normal" && name in cssNormalTransform) {
          val = cssNormalTransform[name];
        }

        // Make numeric if forced or a qualifier was provided and val looks numeric
        if (extra === "" || extra) {
          num = parseFloat(val);
          return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
        }
        return val;
      }
    });

    jQuery.each(["height", "width"], function(i, name) {
      jQuery.cssHooks[name] = {
        get: function(elem, computed, extra) {
          if (computed) {

            // Certain elements can have dimension info if we invisibly show them
            // but it must have a current display style that would benefit
            return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ?
              jQuery.swap(elem, cssShow, function() {
                return getWidthOrHeight(elem, name, extra);
              }) :
              getWidthOrHeight(elem, name, extra);
          }
        },

        set: function(elem, value, extra) {
          var styles = extra && getStyles(elem);
          return setPositiveNumber(elem, value, extra ?
            augmentWidthOrHeight(
              elem,
              name,
              extra,
              jQuery.css(elem, "boxSizing", false, styles) === "border-box",
              styles
            ) : 0
          );
        }
      };
    });

    // Support: Android 2.3
    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight,
      function(elem, computed) {
        if (computed) {
          return jQuery.swap(elem, {
              "display": "inline-block"
            },
            curCSS, [elem, "marginRight"]);
        }
      }
    );

    // These hooks are used by animate to expand properties
    jQuery.each({
      margin: "",
      padding: "",
      border: "Width"
    }, function(prefix, suffix) {
      jQuery.cssHooks[prefix + suffix] = {
        expand: function(value) {
          var i = 0,
            expanded = {},

            // Assumes a single number if not a string
            parts = typeof value === "string" ? value.split(" ") : [value];

          for (; i < 4; i++) {
            expanded[prefix + cssExpand[i] + suffix] =
              parts[i] || parts[i - 2] || parts[0];
          }

          return expanded;
        }
      };

      if (!rmargin.test(prefix)) {
        jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
      }
    });

    jQuery.fn.extend({
      css: function(name, value) {
        return access(this, function(elem, name, value) {
          var styles, len,
            map = {},
            i = 0;

          if (jQuery.isArray(name)) {
            styles = getStyles(elem);
            len = name.length;

            for (; i < len; i++) {
              map[name[i]] = jQuery.css(elem, name[i], false, styles);
            }

            return map;
          }

          return value !== undefined ?
            jQuery.style(elem, name, value) :
            jQuery.css(elem, name);
        }, name, value, arguments.length > 1);
      },
      show: function() {
        return showHide(this, true);
      },
      hide: function() {
        return showHide(this);
      },
      toggle: function(state) {
        if (typeof state === "boolean") {
          return state ? this.show() : this.hide();
        }

        return this.each(function() {
          if (isHidden(this)) {
            jQuery(this).show();
          } else {
            jQuery(this).hide();
          }
        });
      }
    });


    function Tween(elem, options, prop, end, easing) {
      return new Tween.prototype.init(elem, options, prop, end, easing);
    }

    jQuery.Tween = Tween;

    Tween.prototype = {
      constructor: Tween,
      init: function(elem, options, prop, end, easing, unit) {
        this.elem = elem;
        this.prop = prop;
        this.easing = easing || "swing";
        this.options = options;
        this.start = this.now = this.cur();
        this.end = end;
        this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
      },
      cur: function() {
        var hooks = Tween.propHooks[this.prop];

        return hooks && hooks.get ?
          hooks.get(this) :
          Tween.propHooks._default.get(this);
      },
      run: function(percent) {
        var eased,
          hooks = Tween.propHooks[this.prop];

        if (this.options.duration) {
          this.pos = eased = jQuery.easing[this.easing](
            percent, this.options.duration * percent, 0, 1, this.options.duration
          );
        } else {
          this.pos = eased = percent;
        }
        this.now = (this.end - this.start) * eased + this.start;

        if (this.options.step) {
          this.options.step.call(this.elem, this.now, this);
        }

        if (hooks && hooks.set) {
          hooks.set(this);
        } else {
          Tween.propHooks._default.set(this);
        }
        return this;
      }
    };

    Tween.prototype.init.prototype = Tween.prototype;

    Tween.propHooks = {
      _default: {
        get: function(tween) {
          var result;

          if (tween.elem[tween.prop] != null &&
            (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
            return tween.elem[tween.prop];
          }

          // Passing an empty string as a 3rd parameter to .css will automatically
          // attempt a parseFloat and fallback to a string if the parse fails.
          // Simple values such as "10px" are parsed to Float;
          // complex values such as "rotate(1rad)" are returned as-is.
          result = jQuery.css(tween.elem, tween.prop, "");
          // Empty strings, null, undefined and "auto" are converted to 0.
          return !result || result === "auto" ? 0 : result;
        },
        set: function(tween) {
          // Use step hook for back compat.
          // Use cssHook if its there.
          // Use .style if available and use plain properties where available.
          if (jQuery.fx.step[tween.prop]) {
            jQuery.fx.step[tween.prop](tween);
          } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
            jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
          } else {
            tween.elem[tween.prop] = tween.now;
          }
        }
      }
    };

    // Support: IE9
    // Panic based approach to setting things on disconnected nodes
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
      set: function(tween) {
        if (tween.elem.nodeType && tween.elem.parentNode) {
          tween.elem[tween.prop] = tween.now;
        }
      }
    };

    jQuery.easing = {
      linear: function(p) {
        return p;
      },
      swing: function(p) {
        return 0.5 - Math.cos(p * Math.PI) / 2;
      }
    };

    jQuery.fx = Tween.prototype.init;

    // Back Compat <1.8 extension point
    jQuery.fx.step = {};


    var
      fxNow, timerId,
      rfxtypes = /^(?:toggle|show|hide)$/,
      rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
      rrun = /queueHooks$/,
      animationPrefilters = [defaultPrefilter],
      tweeners = {
        "*": [function(prop, value) {
          var tween = this.createTween(prop, value),
            target = tween.cur(),
            parts = rfxnum.exec(value),
            unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),

            // Starting value computation is required for potential unit mismatches
            start = (jQuery.cssNumber[prop] || unit !== "px" && +target) &&
            rfxnum.exec(jQuery.css(tween.elem, prop)),
            scale = 1,
            maxIterations = 20;

          if (start && start[3] !== unit) {
            // Trust units reported by jQuery.css
            unit = unit || start[3];

            // Make sure we update the tween properties later on
            parts = parts || [];

            // Iteratively approximate from a nonzero starting point
            start = +target || 1;

            do {
              // If previous iteration zeroed out, double until we get *something*.
              // Use string for doubling so we don't accidentally see scale as unchanged below
              scale = scale || ".5";

              // Adjust and apply
              start = start / scale;
              jQuery.style(tween.elem, prop, start + unit);

              // Update scale, tolerating zero or NaN from tween.cur(),
              // break the loop if scale is unchanged or perfect, or if we've just had enough
            } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
          }

          // Update tween properties
          if (parts) {
            start = tween.start = +start || +target || 0;
            tween.unit = unit;
            // If a +=/-= token was provided, we're doing a relative animation
            tween.end = parts[1] ?
              start + (parts[1] + 1) * parts[2] :
              +parts[2];
          }

          return tween;
        }]
      };

    // Animations created synchronously will run synchronously
    function createFxNow() {
      setTimeout(function() {
        fxNow = undefined;
      });
      return (fxNow = jQuery.now());
    }

    // Generate parameters to create a standard animation
    function genFx(type, includeWidth) {
      var which,
        i = 0,
        attrs = {
          height: type
        };

      // If we include width, step value is 1 to do all cssExpand values,
      // otherwise step value is 2 to skip over Left and Right
      includeWidth = includeWidth ? 1 : 0;
      for (; i < 4; i += 2 - includeWidth) {
        which = cssExpand[i];
        attrs["margin" + which] = attrs["padding" + which] = type;
      }

      if (includeWidth) {
        attrs.opacity = attrs.width = type;
      }

      return attrs;
    }

    function createTween(value, prop, animation) {
      var tween,
        collection = (tweeners[prop] || []).concat(tweeners["*"]),
        index = 0,
        length = collection.length;
      for (; index < length; index++) {
        if ((tween = collection[index].call(animation, prop, value))) {

          // We're done with this property
          return tween;
        }
      }
    }

    function defaultPrefilter(elem, props, opts) {
      /* jshint validthis: true */
      var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
        anim = this,
        orig = {},
        style = elem.style,
        hidden = elem.nodeType && isHidden(elem),
        dataShow = data_priv.get(elem, "fxshow");

      // Handle queue: false promises
      if (!opts.queue) {
        hooks = jQuery._queueHooks(elem, "fx");
        if (hooks.unqueued == null) {
          hooks.unqueued = 0;
          oldfire = hooks.empty.fire;
          hooks.empty.fire = function() {
            if (!hooks.unqueued) {
              oldfire();
            }
          };
        }
        hooks.unqueued++;

        anim.always(function() {
          // Ensure the complete handler is called before this completes
          anim.always(function() {
            hooks.unqueued--;
            if (!jQuery.queue(elem, "fx").length) {
              hooks.empty.fire();
            }
          });
        });
      }

      // Height/width overflow pass
      if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
        // Make sure that nothing sneaks out
        // Record all 3 overflow attributes because IE9-10 do not
        // change the overflow attribute when overflowX and
        // overflowY are set to the same value
        opts.overflow = [style.overflow, style.overflowX, style.overflowY];

        // Set display property to inline-block for height/width
        // animations on inline elements that are having width/height animated
        display = jQuery.css(elem, "display");

        // Test default display if display is currently "none"
        checkDisplay = display === "none" ?
          data_priv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;

        if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
          style.display = "inline-block";
        }
      }

      if (opts.overflow) {
        style.overflow = "hidden";
        anim.always(function() {
          style.overflow = opts.overflow[0];
          style.overflowX = opts.overflow[1];
          style.overflowY = opts.overflow[2];
        });
      }

      // show/hide pass
      for (prop in props) {
        value = props[prop];
        if (rfxtypes.exec(value)) {
          delete props[prop];
          toggle = toggle || value === "toggle";
          if (value === (hidden ? "hide" : "show")) {

            // If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
            if (value === "show" && dataShow && dataShow[prop] !== undefined) {
              hidden = true;
            } else {
              continue;
            }
          }
          orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);

          // Any non-fx value stops us from restoring the original display value
        } else {
          display = undefined;
        }
      }

      if (!jQuery.isEmptyObject(orig)) {
        if (dataShow) {
          if ("hidden" in dataShow) {
            hidden = dataShow.hidden;
          }
        } else {
          dataShow = data_priv.access(elem, "fxshow", {});
        }

        // Store state if its toggle - enables .stop().toggle() to "reverse"
        if (toggle) {
          dataShow.hidden = !hidden;
        }
        if (hidden) {
          jQuery(elem).show();
        } else {
          anim.done(function() {
            jQuery(elem).hide();
          });
        }
        anim.done(function() {
          var prop;

          data_priv.remove(elem, "fxshow");
          for (prop in orig) {
            jQuery.style(elem, prop, orig[prop]);
          }
        });
        for (prop in orig) {
          tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

          if (!(prop in dataShow)) {
            dataShow[prop] = tween.start;
            if (hidden) {
              tween.end = tween.start;
              tween.start = prop === "width" || prop === "height" ? 1 : 0;
            }
          }
        }

        // If this is a noop like .hide().hide(), restore an overwritten display value
      } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
        style.display = display;
      }
    }

    function propFilter(props, specialEasing) {
      var index, name, easing, value, hooks;

      // camelCase, specialEasing and expand cssHook pass
      for (index in props) {
        name = jQuery.camelCase(index);
        easing = specialEasing[name];
        value = props[index];
        if (jQuery.isArray(value)) {
          easing = value[1];
          value = props[index] = value[0];
        }

        if (index !== name) {
          props[name] = value;
          delete props[index];
        }

        hooks = jQuery.cssHooks[name];
        if (hooks && "expand" in hooks) {
          value = hooks.expand(value);
          delete props[name];

          // Not quite $.extend, this won't overwrite existing keys.
          // Reusing 'index' because we have the correct "name"
          for (index in value) {
            if (!(index in props)) {
              props[index] = value[index];
              specialEasing[index] = easing;
            }
          }
        } else {
          specialEasing[name] = easing;
        }
      }
    }

    function Animation(elem, properties, options) {
      var result,
        stopped,
        index = 0,
        length = animationPrefilters.length,
        deferred = jQuery.Deferred().always(function() {
          // Don't match elem in the :animated selector
          delete tick.elem;
        }),
        tick = function() {
          if (stopped) {
            return false;
          }
          var currentTime = fxNow || createFxNow(),
            remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
            // Support: Android 2.3
            // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
            temp = remaining / animation.duration || 0,
            percent = 1 - temp,
            index = 0,
            length = animation.tweens.length;

          for (; index < length; index++) {
            animation.tweens[index].run(percent);
          }

          deferred.notifyWith(elem, [animation, percent, remaining]);

          if (percent < 1 && length) {
            return remaining;
          } else {
            deferred.resolveWith(elem, [animation]);
            return false;
          }
        },
        animation = deferred.promise({
          elem: elem,
          props: jQuery.extend({}, properties),
          opts: jQuery.extend(true, {
            specialEasing: {}
          }, options),
          originalProperties: properties,
          originalOptions: options,
          startTime: fxNow || createFxNow(),
          duration: options.duration,
          tweens: [],
          createTween: function(prop, end) {
            var tween = jQuery.Tween(elem, animation.opts, prop, end,
              animation.opts.specialEasing[prop] || animation.opts.easing);
            animation.tweens.push(tween);
            return tween;
          },
          stop: function(gotoEnd) {
            var index = 0,
              // If we are going to the end, we want to run all the tweens
              // otherwise we skip this part
              length = gotoEnd ? animation.tweens.length : 0;
            if (stopped) {
              return this;
            }
            stopped = true;
            for (; index < length; index++) {
              animation.tweens[index].run(1);
            }

            // Resolve when we played the last frame; otherwise, reject
            if (gotoEnd) {
              deferred.resolveWith(elem, [animation, gotoEnd]);
            } else {
              deferred.rejectWith(elem, [animation, gotoEnd]);
            }
            return this;
          }
        }),
        props = animation.props;

      propFilter(props, animation.opts.specialEasing);

      for (; index < length; index++) {
        result = animationPrefilters[index].call(animation, elem, props, animation.opts);
        if (result) {
          return result;
        }
      }

      jQuery.map(props, createTween, animation);

      if (jQuery.isFunction(animation.opts.start)) {
        animation.opts.start.call(elem, animation);
      }

      jQuery.fx.timer(
        jQuery.extend(tick, {
          elem: elem,
          anim: animation,
          queue: animation.opts.queue
        })
      );

      // attach callbacks from options
      return animation.progress(animation.opts.progress)
        .done(animation.opts.done, animation.opts.complete)
        .fail(animation.opts.fail)
        .always(animation.opts.always);
    }

    jQuery.Animation = jQuery.extend(Animation, {

      tweener: function(props, callback) {
        if (jQuery.isFunction(props)) {
          callback = props;
          props = ["*"];
        } else {
          props = props.split(" ");
        }

        var prop,
          index = 0,
          length = props.length;

        for (; index < length; index++) {
          prop = props[index];
          tweeners[prop] = tweeners[prop] || [];
          tweeners[prop].unshift(callback);
        }
      },

      prefilter: function(callback, prepend) {
        if (prepend) {
          animationPrefilters.unshift(callback);
        } else {
          animationPrefilters.push(callback);
        }
      }
    });

    jQuery.speed = function(speed, easing, fn) {
      var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
        complete: fn || !fn && easing ||
          jQuery.isFunction(speed) && speed,
        duration: speed,
        easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
      };

      opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
        opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

      // Normalize opt.queue - true/undefined/null -> "fx"
      if (opt.queue == null || opt.queue === true) {
        opt.queue = "fx";
      }

      // Queueing
      opt.old = opt.complete;

      opt.complete = function() {
        if (jQuery.isFunction(opt.old)) {
          opt.old.call(this);
        }

        if (opt.queue) {
          jQuery.dequeue(this, opt.queue);
        }
      };

      return opt;
    };

    jQuery.fn.extend({
      fadeTo: function(speed, to, easing, callback) {

        // Show any hidden elements after setting opacity to 0
        return this.filter(isHidden).css("opacity", 0).show()

          // Animate to the value specified
          .end().animate({
            opacity: to
          }, speed, easing, callback);
      },
      animate: function(prop, speed, easing, callback) {
        var empty = jQuery.isEmptyObject(prop),
          optall = jQuery.speed(speed, easing, callback),
          doAnimation = function() {
            // Operate on a copy of prop so per-property easing won't be lost
            var anim = Animation(this, jQuery.extend({}, prop), optall);

            // Empty animations, or finishing resolves immediately
            if (empty || data_priv.get(this, "finish")) {
              anim.stop(true);
            }
          };
        doAnimation.finish = doAnimation;

        return empty || optall.queue === false ?
          this.each(doAnimation) :
          this.queue(optall.queue, doAnimation);
      },
      stop: function(type, clearQueue, gotoEnd) {
        var stopQueue = function(hooks) {
          var stop = hooks.stop;
          delete hooks.stop;
          stop(gotoEnd);
        };

        if (typeof type !== "string") {
          gotoEnd = clearQueue;
          clearQueue = type;
          type = undefined;
        }
        if (clearQueue && type !== false) {
          this.queue(type || "fx", []);
        }

        return this.each(function() {
          var dequeue = true,
            index = type != null && type + "queueHooks",
            timers = jQuery.timers,
            data = data_priv.get(this);

          if (index) {
            if (data[index] && data[index].stop) {
              stopQueue(data[index]);
            }
          } else {
            for (index in data) {
              if (data[index] && data[index].stop && rrun.test(index)) {
                stopQueue(data[index]);
              }
            }
          }

          for (index = timers.length; index--;) {
            if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
              timers[index].anim.stop(gotoEnd);
              dequeue = false;
              timers.splice(index, 1);
            }
          }

          // Start the next in the queue if the last step wasn't forced.
          // Timers currently will call their complete callbacks, which
          // will dequeue but only if they were gotoEnd.
          if (dequeue || !gotoEnd) {
            jQuery.dequeue(this, type);
          }
        });
      },
      finish: function(type) {
        if (type !== false) {
          type = type || "fx";
        }
        return this.each(function() {
          var index,
            data = data_priv.get(this),
            queue = data[type + "queue"],
            hooks = data[type + "queueHooks"],
            timers = jQuery.timers,
            length = queue ? queue.length : 0;

          // Enable finishing flag on private data
          data.finish = true;

          // Empty the queue first
          jQuery.queue(this, type, []);

          if (hooks && hooks.stop) {
            hooks.stop.call(this, true);
          }

          // Look for any active animations, and finish them
          for (index = timers.length; index--;) {
            if (timers[index].elem === this && timers[index].queue === type) {
              timers[index].anim.stop(true);
              timers.splice(index, 1);
            }
          }

          // Look for any animations in the old queue and finish them
          for (index = 0; index < length; index++) {
            if (queue[index] && queue[index].finish) {
              queue[index].finish.call(this);
            }
          }

          // Turn off finishing flag
          delete data.finish;
        });
      }
    });

    jQuery.each(["toggle", "show", "hide"], function(i, name) {
      var cssFn = jQuery.fn[name];
      jQuery.fn[name] = function(speed, easing, callback) {
        return speed == null || typeof speed === "boolean" ?
          cssFn.apply(this, arguments) :
          this.animate(genFx(name, true), speed, easing, callback);
      };
    });

    // Generate shortcuts for custom animations
    jQuery.each({
      slideDown: genFx("show"),
      slideUp: genFx("hide"),
      slideToggle: genFx("toggle"),
      fadeIn: {
        opacity: "show"
      },
      fadeOut: {
        opacity: "hide"
      },
      fadeToggle: {
        opacity: "toggle"
      }
    }, function(name, props) {
      jQuery.fn[name] = function(speed, easing, callback) {
        return this.animate(props, speed, easing, callback);
      };
    });

    jQuery.timers = [];
    jQuery.fx.tick = function() {
      var timer,
        i = 0,
        timers = jQuery.timers;

      fxNow = jQuery.now();

      for (; i < timers.length; i++) {
        timer = timers[i];
        // Checks the timer has not already been removed
        if (!timer() && timers[i] === timer) {
          timers.splice(i--, 1);
        }
      }

      if (!timers.length) {
        jQuery.fx.stop();
      }
      fxNow = undefined;
    };

    jQuery.fx.timer = function(timer) {
      jQuery.timers.push(timer);
      if (timer()) {
        jQuery.fx.start();
      } else {
        jQuery.timers.pop();
      }
    };

    jQuery.fx.interval = 13;

    jQuery.fx.start = function() {
      if (!timerId) {
        timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
      }
    };

    jQuery.fx.stop = function() {
      clearInterval(timerId);
      timerId = null;
    };

    jQuery.fx.speeds = {
      slow: 600,
      fast: 200,
      // Default speed
      _default: 400
    };


    // Based off of the plugin by Clint Helfers, with permission.
    // http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function(time, type) {
      time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
      type = type || "fx";

      return this.queue(type, function(next, hooks) {
        var timeout = setTimeout(next, time);
        hooks.stop = function() {
          clearTimeout(timeout);
        };
      });
    };


    (function() {
      var input = document.createElement("input"),
        select = document.createElement("select"),
        opt = select.appendChild(document.createElement("option"));

      input.type = "checkbox";

      // Support: iOS<=5.1, Android<=4.2+
      // Default value for a checkbox should be "on"
      support.checkOn = input.value !== "";

      // Support: IE<=11+
      // Must access selectedIndex to make default options select
      support.optSelected = opt.selected;

      // Support: Android<=2.3
      // Options inside disabled selects are incorrectly marked as disabled
      select.disabled = true;
      support.optDisabled = !opt.disabled;

      // Support: IE<=11+
      // An input loses its value after becoming a radio
      input = document.createElement("input");
      input.value = "t";
      input.type = "radio";
      support.radioValue = input.value === "t";
    })();


    var nodeHook, boolHook,
      attrHandle = jQuery.expr.attrHandle;

    jQuery.fn.extend({
      attr: function(name, value) {
        return access(this, jQuery.attr, name, value, arguments.length > 1);
      },

      removeAttr: function(name) {
        return this.each(function() {
          jQuery.removeAttr(this, name);
        });
      }
    });

    jQuery.extend({
      attr: function(elem, name, value) {
        var hooks, ret,
          nType = elem.nodeType;

        // don't get/set attributes on text, comment and attribute nodes
        if (!elem || nType === 3 || nType === 8 || nType === 2) {
          return;
        }

        // Fallback to prop when attributes are not supported
        if (typeof elem.getAttribute === strundefined) {
          return jQuery.prop(elem, name, value);
        }

        // All attributes are lowercase
        // Grab necessary hook if one is defined
        if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
          name = name.toLowerCase();
          hooks = jQuery.attrHooks[name] ||
            (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
        }

        if (value !== undefined) {

          if (value === null) {
            jQuery.removeAttr(elem, name);

          } else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
            return ret;

          } else {
            elem.setAttribute(name, value + "");
            return value;
          }

        } else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
          return ret;

        } else {
          ret = jQuery.find.attr(elem, name);

          // Non-existent attributes return null, we normalize to undefined
          return ret == null ?
            undefined :
            ret;
        }
      },

      removeAttr: function(elem, value) {
        var name, propName,
          i = 0,
          attrNames = value && value.match(rnotwhite);

        if (attrNames && elem.nodeType === 1) {
          while ((name = attrNames[i++])) {
            propName = jQuery.propFix[name] || name;

            // Boolean attributes get special treatment (#10870)
            if (jQuery.expr.match.bool.test(name)) {
              // Set corresponding property to false
              elem[propName] = false;
            }

            elem.removeAttribute(name);
          }
        }
      },

      attrHooks: {
        type: {
          set: function(elem, value) {
            if (!support.radioValue && value === "radio" &&
              jQuery.nodeName(elem, "input")) {
              var val = elem.value;
              elem.setAttribute("type", value);
              if (val) {
                elem.value = val;
              }
              return value;
            }
          }
        }
      }
    });

    // Hooks for boolean attributes
    boolHook = {
      set: function(elem, value, name) {
        if (value === false) {
          // Remove boolean attributes when set to false
          jQuery.removeAttr(elem, name);
        } else {
          elem.setAttribute(name, name);
        }
        return name;
      }
    };
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
      var getter = attrHandle[name] || jQuery.find.attr;

      attrHandle[name] = function(elem, name, isXML) {
        var ret, handle;
        if (!isXML) {
          // Avoid an infinite loop by temporarily removing this function from the getter
          handle = attrHandle[name];
          attrHandle[name] = ret;
          ret = getter(elem, name, isXML) != null ?
            name.toLowerCase() :
            null;
          attrHandle[name] = handle;
        }
        return ret;
      };
    });


    var rfocusable = /^(?:input|select|textarea|button)$/i;

    jQuery.fn.extend({
      prop: function(name, value) {
        return access(this, jQuery.prop, name, value, arguments.length > 1);
      },

      removeProp: function(name) {
        return this.each(function() {
          delete this[jQuery.propFix[name] || name];
        });
      }
    });

    jQuery.extend({
      propFix: {
        "for": "htmlFor",
        "class": "className"
      },

      prop: function(elem, name, value) {
        var ret, hooks, notxml,
          nType = elem.nodeType;

        // Don't get/set properties on text, comment and attribute nodes
        if (!elem || nType === 3 || nType === 8 || nType === 2) {
          return;
        }

        notxml = nType !== 1 || !jQuery.isXMLDoc(elem);

        if (notxml) {
          // Fix name and attach hooks
          name = jQuery.propFix[name] || name;
          hooks = jQuery.propHooks[name];
        }

        if (value !== undefined) {
          return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ?
            ret :
            (elem[name] = value);

        } else {
          return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ?
            ret :
            elem[name];
        }
      },

      propHooks: {
        tabIndex: {
          get: function(elem) {
            return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ?
              elem.tabIndex :
              -1;
          }
        }
      }
    });

    if (!support.optSelected) {
      jQuery.propHooks.selected = {
        get: function(elem) {
          var parent = elem.parentNode;
          if (parent && parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
          return null;
        }
      };
    }

    jQuery.each([
      "tabIndex",
      "readOnly",
      "maxLength",
      "cellSpacing",
      "cellPadding",
      "rowSpan",
      "colSpan",
      "useMap",
      "frameBorder",
      "contentEditable"
    ], function() {
      jQuery.propFix[this.toLowerCase()] = this;
    });


    var rclass = /[\t\r\n\f]/g;

    jQuery.fn.extend({
      addClass: function(value) {
        var classes, elem, cur, clazz, j, finalValue,
          proceed = typeof value === "string" && value,
          i = 0,
          len = this.length;

        if (jQuery.isFunction(value)) {
          return this.each(function(j) {
            jQuery(this).addClass(value.call(this, j, this.className));
          });
        }

        if (proceed) {
          // The disjunction here is for better compressibility (see removeClass)
          classes = (value || "").match(rnotwhite) || [];

          for (; i < len; i++) {
            elem = this[i];
            cur = elem.nodeType === 1 && (elem.className ?
              (" " + elem.className + " ").replace(rclass, " ") :
              " "
            );

            if (cur) {
              j = 0;
              while ((clazz = classes[j++])) {
                if (cur.indexOf(" " + clazz + " ") < 0) {
                  cur += clazz + " ";
                }
              }

              // only assign if different to avoid unneeded rendering.
              finalValue = jQuery.trim(cur);
              if (elem.className !== finalValue) {
                elem.className = finalValue;
              }
            }
          }
        }

        return this;
      },

      removeClass: function(value) {
        var classes, elem, cur, clazz, j, finalValue,
          proceed = arguments.length === 0 || typeof value === "string" && value,
          i = 0,
          len = this.length;

        if (jQuery.isFunction(value)) {
          return this.each(function(j) {
            jQuery(this).removeClass(value.call(this, j, this.className));
          });
        }
        if (proceed) {
          classes = (value || "").match(rnotwhite) || [];

          for (; i < len; i++) {
            elem = this[i];
            // This expression is here for better compressibility (see addClass)
            cur = elem.nodeType === 1 && (elem.className ?
              (" " + elem.className + " ").replace(rclass, " ") :
              ""
            );

            if (cur) {
              j = 0;
              while ((clazz = classes[j++])) {
                // Remove *all* instances
                while (cur.indexOf(" " + clazz + " ") >= 0) {
                  cur = cur.replace(" " + clazz + " ", " ");
                }
              }

              // Only assign if different to avoid unneeded rendering.
              finalValue = value ? jQuery.trim(cur) : "";
              if (elem.className !== finalValue) {
                elem.className = finalValue;
              }
            }
          }
        }

        return this;
      },

      toggleClass: function(value, stateVal) {
        var type = typeof value;

        if (typeof stateVal === "boolean" && type === "string") {
          return stateVal ? this.addClass(value) : this.removeClass(value);
        }

        if (jQuery.isFunction(value)) {
          return this.each(function(i) {
            jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
          });
        }

        return this.each(function() {
          if (type === "string") {
            // Toggle individual class names
            var className,
              i = 0,
              self = jQuery(this),
              classNames = value.match(rnotwhite) || [];

            while ((className = classNames[i++])) {
              // Check each className given, space separated list
              if (self.hasClass(className)) {
                self.removeClass(className);
              } else {
                self.addClass(className);
              }
            }

            // Toggle whole class name
          } else if (type === strundefined || type === "boolean") {
            if (this.className) {
              // store className if set
              data_priv.set(this, "__className__", this.className);
            }

            // If the element has a class name or if we're passed `false`,
            // then remove the whole classname (if there was one, the above saved it).
            // Otherwise bring back whatever was previously saved (if anything),
            // falling back to the empty string if nothing was stored.
            this.className = this.className || value === false ? "" : data_priv.get(this, "__className__") || "";
          }
        });
      },

      hasClass: function(selector) {
        var className = " " + selector + " ",
          i = 0,
          l = this.length;
        for (; i < l; i++) {
          if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
            return true;
          }
        }

        return false;
      }
    });


    var rreturn = /\r/g;

    jQuery.fn.extend({
      val: function(value) {
        var hooks, ret, isFunction,
          elem = this[0];

        if (!arguments.length) {
          if (elem) {
            hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

            if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
              return ret;
            }

            ret = elem.value;

            return typeof ret === "string" ?
              // Handle most common string cases
              ret.replace(rreturn, "") :
              // Handle cases where value is null/undef or number
              ret == null ? "" : ret;
          }

          return;
        }

        isFunction = jQuery.isFunction(value);

        return this.each(function(i) {
          var val;

          if (this.nodeType !== 1) {
            return;
          }

          if (isFunction) {
            val = value.call(this, i, jQuery(this).val());
          } else {
            val = value;
          }

          // Treat null/undefined as ""; convert numbers to string
          if (val == null) {
            val = "";

          } else if (typeof val === "number") {
            val += "";

          } else if (jQuery.isArray(val)) {
            val = jQuery.map(val, function(value) {
              return value == null ? "" : value + "";
            });
          }

          hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

          // If set returns undefined, fall back to normal setting
          if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
            this.value = val;
          }
        });
      }
    });

    jQuery.extend({
      valHooks: {
        option: {
          get: function(elem) {
            var val = jQuery.find.attr(elem, "value");
            return val != null ?
              val :
              // Support: IE10-11+
              // option.text throws exceptions (#14686, #14858)
              jQuery.trim(jQuery.text(elem));
          }
        },
        select: {
          get: function(elem) {
            var value, option,
              options = elem.options,
              index = elem.selectedIndex,
              one = elem.type === "select-one" || index < 0,
              values = one ? null : [],
              max = one ? index + 1 : options.length,
              i = index < 0 ?
              max :
              one ? index : 0;

            // Loop through all the selected options
            for (; i < max; i++) {
              option = options[i];

              // IE6-9 doesn't update selected after form reset (#2551)
              if ((option.selected || i === index) &&
                // Don't return options that are disabled or in a disabled optgroup
                (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
                (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {

                // Get the specific value for the option
                value = jQuery(option).val();

                // We don't need an array for one selects
                if (one) {
                  return value;
                }

                // Multi-Selects return an array
                values.push(value);
              }
            }

            return values;
          },

          set: function(elem, value) {
            var optionSet, option,
              options = elem.options,
              values = jQuery.makeArray(value),
              i = options.length;

            while (i--) {
              option = options[i];
              if ((option.selected = jQuery.inArray(option.value, values) >= 0)) {
                optionSet = true;
              }
            }

            // Force browsers to behave consistently when non-matching value is set
            if (!optionSet) {
              elem.selectedIndex = -1;
            }
            return values;
          }
        }
      }
    });

    // Radios and checkboxes getter/setter
    jQuery.each(["radio", "checkbox"], function() {
      jQuery.valHooks[this] = {
        set: function(elem, value) {
          if (jQuery.isArray(value)) {
            return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
          }
        }
      };
      if (!support.checkOn) {
        jQuery.valHooks[this].get = function(elem) {
          return elem.getAttribute("value") === null ? "on" : elem.value;
        };
      }
    });


    // Return jQuery for attributes-only inclusion


    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
      "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
      "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {

      // Handle event binding
      jQuery.fn[name] = function(data, fn) {
        return arguments.length > 0 ?
          this.on(name, null, data, fn) :
          this.trigger(name);
      };
    });

    jQuery.fn.extend({
      hover: function(fnOver, fnOut) {
        return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
      },

      bind: function(types, data, fn) {
        return this.on(types, null, data, fn);
      },
      unbind: function(types, fn) {
        return this.off(types, null, fn);
      },

      delegate: function(selector, types, data, fn) {
        return this.on(types, selector, data, fn);
      },
      undelegate: function(selector, types, fn) {
        // ( namespace ) or ( selector, types [, fn] )
        return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
      }
    });


    var nonce = jQuery.now();

    var rquery = (/\?/);


    // Support: Android 2.3
    // Workaround failure to string-cast null input
    jQuery.parseJSON = function(data) {
      return JSON.parse(data + "");
    };


    // Cross-browser xml parsing
    jQuery.parseXML = function(data) {
      var xml, tmp;
      if (!data || typeof data !== "string") {
        return null;
      }

      // Support: IE9
      try {
        tmp = new DOMParser();
        xml = tmp.parseFromString(data, "text/xml");
      } catch (e) {
        xml = undefined;
      }

      if (!xml || xml.getElementsByTagName("parsererror").length) {
        jQuery.error("Invalid XML: " + data);
      }
      return xml;
    };


    var
      rhash = /#.*$/,
      rts = /([?&])_=[^&]*/,
      rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
      // #7653, #8125, #8152: local protocol detection
      rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      rnoContent = /^(?:GET|HEAD)$/,
      rprotocol = /^\/\//,
      rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

      /* Prefilters
       * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
       * 2) These are called:
       *    - BEFORE asking for a transport
       *    - AFTER param serialization (s.data is a string if s.processData is true)
       * 3) key is the dataType
       * 4) the catchall symbol "*" can be used
       * 5) execution will start with transport dataType and THEN continue down to "*" if needed
       */
      prefilters = {},

      /* Transports bindings
       * 1) key is the dataType
       * 2) the catchall symbol "*" can be used
       * 3) selection will start with transport dataType and THEN go to "*" if needed
       */
      transports = {},

      // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
      allTypes = "*/".concat("*"),

      // Document location
      ajaxLocation = window.location.href,

      // Segment location into parts
      ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

    // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports(structure) {

      // dataTypeExpression is optional and defaults to "*"
      return function(dataTypeExpression, func) {

        if (typeof dataTypeExpression !== "string") {
          func = dataTypeExpression;
          dataTypeExpression = "*";
        }

        var dataType,
          i = 0,
          dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

        if (jQuery.isFunction(func)) {
          // For each dataType in the dataTypeExpression
          while ((dataType = dataTypes[i++])) {
            // Prepend if requested
            if (dataType[0] === "+") {
              dataType = dataType.slice(1) || "*";
              (structure[dataType] = structure[dataType] || []).unshift(func);

              // Otherwise append
            } else {
              (structure[dataType] = structure[dataType] || []).push(func);
            }
          }
        }
      };
    }

    // Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

      var inspected = {},
        seekingTransport = (structure === transports);

      function inspect(dataType) {
        var selected;
        inspected[dataType] = true;
        jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
          var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
          if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
            options.dataTypes.unshift(dataTypeOrTransport);
            inspect(dataTypeOrTransport);
            return false;
          } else if (seekingTransport) {
            return !(selected = dataTypeOrTransport);
          }
        });
        return selected;
      }

      return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }

    // A special extend for ajax options
    // that takes "flat" options (not to be deep extended)
    // Fixes #9887
    function ajaxExtend(target, src) {
      var key, deep,
        flatOptions = jQuery.ajaxSettings.flatOptions || {};

      for (key in src) {
        if (src[key] !== undefined) {
          (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
        }
      }
      if (deep) {
        jQuery.extend(true, target, deep);
      }

      return target;
    }

    /* Handles responses to an ajax request:
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses(s, jqXHR, responses) {

      var ct, type, finalDataType, firstDataType,
        contents = s.contents,
        dataTypes = s.dataTypes;

      // Remove auto dataType and get content-type in the process
      while (dataTypes[0] === "*") {
        dataTypes.shift();
        if (ct === undefined) {
          ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
        }
      }

      // Check if we're dealing with a known content-type
      if (ct) {
        for (type in contents) {
          if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
          }
        }
      }

      // Check to see if we have a response for the expected dataType
      if (dataTypes[0] in responses) {
        finalDataType = dataTypes[0];
      } else {
        // Try convertible dataTypes
        for (type in responses) {
          if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
            finalDataType = type;
            break;
          }
          if (!firstDataType) {
            firstDataType = type;
          }
        }
        // Or just use first one
        finalDataType = finalDataType || firstDataType;
      }

      // If we found a dataType
      // We add the dataType to the list if needed
      // and return the corresponding response
      if (finalDataType) {
        if (finalDataType !== dataTypes[0]) {
          dataTypes.unshift(finalDataType);
        }
        return responses[finalDataType];
      }
    }

    /* Chain conversions given the request and the original response
     * Also sets the responseXXX fields on the jqXHR instance
     */
    function ajaxConvert(s, response, jqXHR, isSuccess) {
      var conv2, current, conv, tmp, prev,
        converters = {},
        // Work with a copy of dataTypes in case we need to modify it for conversion
        dataTypes = s.dataTypes.slice();

      // Create converters map with lowercased keys
      if (dataTypes[1]) {
        for (conv in s.converters) {
          converters[conv.toLowerCase()] = s.converters[conv];
        }
      }

      current = dataTypes.shift();

      // Convert to each sequential dataType
      while (current) {

        if (s.responseFields[current]) {
          jqXHR[s.responseFields[current]] = response;
        }

        // Apply the dataFilter if provided
        if (!prev && isSuccess && s.dataFilter) {
          response = s.dataFilter(response, s.dataType);
        }

        prev = current;
        current = dataTypes.shift();

        if (current) {

          // There's only work to do if current dataType is non-auto
          if (current === "*") {

            current = prev;

            // Convert response if prev dataType is non-auto and differs from current
          } else if (prev !== "*" && prev !== current) {

            // Seek a direct converter
            conv = converters[prev + " " + current] || converters["* " + current];

            // If none found, seek a pair
            if (!conv) {
              for (conv2 in converters) {

                // If conv2 outputs current
                tmp = conv2.split(" ");
                if (tmp[1] === current) {

                  // If prev can be converted to accepted input
                  conv = converters[prev + " " + tmp[0]] ||
                    converters["* " + tmp[0]];
                  if (conv) {
                    // Condense equivalence converters
                    if (conv === true) {
                      conv = converters[conv2];

                      // Otherwise, insert the intermediate dataType
                    } else if (converters[conv2] !== true) {
                      current = tmp[0];
                      dataTypes.unshift(tmp[1]);
                    }
                    break;
                  }
                }
              }
            }

            // Apply converter (if not an equivalence)
            if (conv !== true) {

              // Unless errors are allowed to bubble, catch and return them
              if (conv && s["throws"]) {
                response = conv(response);
              } else {
                try {
                  response = conv(response);
                } catch (e) {
                  return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                  };
                }
              }
            }
          }
        }
      }

      return {
        state: "success",
        data: response
      };
    }

    jQuery.extend({

      // Counter for holding the number of active queries
      active: 0,

      // Last-Modified header cache for next request
      lastModified: {},
      etag: {},

      ajaxSettings: {
        url: ajaxLocation,
        type: "GET",
        isLocal: rlocalProtocol.test(ajaxLocParts[1]),
        global: true,
        processData: true,
        async: true,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        /*
         timeout: 0,
         data: null,
         dataType: null,
         username: null,
         password: null,
         cache: null,
         throws: false,
         traditional: false,
         headers: {},
         */

        accepts: {
          "*": allTypes,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript"
        },

        contents: {
          xml: /xml/,
          html: /html/,
          json: /json/
        },

        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON"
        },

        // Data converters
        // Keys separate source (or catchall "*") and destination types with a single space
        converters: {

          // Convert anything to text
          "* text": String,

          // Text to html (true = no transformation)
          "text html": true,

          // Evaluate text as a json expression
          "text json": jQuery.parseJSON,

          // Parse text as xml
          "text xml": jQuery.parseXML
        },

        // For options that shouldn't be deep extended:
        // you can add your own custom options here if
        // and when you create one that shouldn't be
        // deep extended (see ajaxExtend)
        flatOptions: {
          url: true,
          context: true
        }
      },

      // Creates a full fledged settings object into target
      // with both ajaxSettings and settings fields.
      // If target is omitted, writes into ajaxSettings.
      ajaxSetup: function(target, settings) {
        return settings ?

          // Building a settings object
          ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

          // Extending ajaxSettings
          ajaxExtend(jQuery.ajaxSettings, target);
      },

      ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
      ajaxTransport: addToPrefiltersOrTransports(transports),

      // Main method
      ajax: function(url, options) {

        // If url is an object, simulate pre-1.5 signature
        if (typeof url === "object") {
          options = url;
          url = undefined;
        }

        // Force options to be an object
        options = options || {};

        var transport,
          // URL without anti-cache param
          cacheURL,
          // Response headers
          responseHeadersString,
          responseHeaders,
          // timeout handle
          timeoutTimer,
          // Cross-domain detection vars
          parts,
          // To know if global events are to be dispatched
          fireGlobals,
          // Loop variable
          i,
          // Create the final options object
          s = jQuery.ajaxSetup({}, options),
          // Callbacks context
          callbackContext = s.context || s,
          // Context for global events is callbackContext if it is a DOM node or jQuery collection
          globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ?
          jQuery(callbackContext) :
          jQuery.event,
          // Deferreds
          deferred = jQuery.Deferred(),
          completeDeferred = jQuery.Callbacks("once memory"),
          // Status-dependent callbacks
          statusCode = s.statusCode || {},
          // Headers (they are sent all at once)
          requestHeaders = {},
          requestHeadersNames = {},
          // The jqXHR state
          state = 0,
          // Default abort message
          strAbort = "canceled",
          // Fake xhr
          jqXHR = {
            readyState: 0,

            // Builds headers hashtable if needed
            getResponseHeader: function(key) {
              var match;
              if (state === 2) {
                if (!responseHeaders) {
                  responseHeaders = {};
                  while ((match = rheaders.exec(responseHeadersString))) {
                    responseHeaders[match[1].toLowerCase()] = match[2];
                  }
                }
                match = responseHeaders[key.toLowerCase()];
              }
              return match == null ? null : match;
            },

            // Raw string
            getAllResponseHeaders: function() {
              return state === 2 ? responseHeadersString : null;
            },

            // Caches the header
            setRequestHeader: function(name, value) {
              var lname = name.toLowerCase();
              if (!state) {
                name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                requestHeaders[name] = value;
              }
              return this;
            },

            // Overrides response content-type header
            overrideMimeType: function(type) {
              if (!state) {
                s.mimeType = type;
              }
              return this;
            },

            // Status-dependent callbacks
            statusCode: function(map) {
              var code;
              if (map) {
                if (state < 2) {
                  for (code in map) {
                    // Lazy-add the new callback in a way that preserves old ones
                    statusCode[code] = [statusCode[code], map[code]];
                  }
                } else {
                  // Execute the appropriate callbacks
                  jqXHR.always(map[jqXHR.status]);
                }
              }
              return this;
            },

            // Cancel the request
            abort: function(statusText) {
              var finalText = statusText || strAbort;
              if (transport) {
                transport.abort(finalText);
              }
              done(0, finalText);
              return this;
            }
          };

        // Attach deferreds
        deferred.promise(jqXHR).complete = completeDeferred.add;
        jqXHR.success = jqXHR.done;
        jqXHR.error = jqXHR.fail;

        // Remove hash character (#7531: and string promotion)
        // Add protocol if not provided (prefilters might expect it)
        // Handle falsy url in the settings object (#10093: consistency with old signature)
        // We also use the url parameter if available
        s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "")
          .replace(rprotocol, ajaxLocParts[1] + "//");

        // Alias method option to type as per ticket #12004
        s.type = options.method || options.type || s.method || s.type;

        // Extract dataTypes list
        s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

        // A cross-domain request is in order when we have a protocol:host:port mismatch
        if (s.crossDomain == null) {
          parts = rurl.exec(s.url.toLowerCase());
          s.crossDomain = !!(parts &&
            (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] ||
              (parts[3] || (parts[1] === "http:" ? "80" : "443")) !==
              (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))
          );
        }

        // Convert data if not already a string
        if (s.data && s.processData && typeof s.data !== "string") {
          s.data = jQuery.param(s.data, s.traditional);
        }

        // Apply prefilters
        inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

        // If request was aborted inside a prefilter, stop there
        if (state === 2) {
          return jqXHR;
        }

        // We can fire global events as of now if asked to
        // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
        fireGlobals = jQuery.event && s.global;

        // Watch for a new set of requests
        if (fireGlobals && jQuery.active++ === 0) {
          jQuery.event.trigger("ajaxStart");
        }

        // Uppercase the type
        s.type = s.type.toUpperCase();

        // Determine if request has content
        s.hasContent = !rnoContent.test(s.type);

        // Save the URL in case we're toying with the If-Modified-Since
        // and/or If-None-Match header later on
        cacheURL = s.url;

        // More options handling for requests with no content
        if (!s.hasContent) {

          // If data is available, append data to url
          if (s.data) {
            cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
            // #9682: remove data so that it's not used in an eventual retry
            delete s.data;
          }

          // Add anti-cache in url if needed
          if (s.cache === false) {
            s.url = rts.test(cacheURL) ?

              // If there is already a '_' parameter, set its value
              cacheURL.replace(rts, "$1_=" + nonce++) :

              // Otherwise add one to the end
              cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
          }
        }

        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
        if (s.ifModified) {
          if (jQuery.lastModified[cacheURL]) {
            jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
          }
          if (jQuery.etag[cacheURL]) {
            jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
          }
        }

        // Set the correct header, if data is being sent
        if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
          jqXHR.setRequestHeader("Content-Type", s.contentType);
        }

        // Set the Accepts header for the server, depending on the dataType
        jqXHR.setRequestHeader(
          "Accept",
          s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
          s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
          s.accepts["*"]
        );

        // Check for headers option
        for (i in s.headers) {
          jqXHR.setRequestHeader(i, s.headers[i]);
        }

        // Allow custom headers/mimetypes and early abort
        if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
          // Abort if not done already and return
          return jqXHR.abort();
        }

        // Aborting is no longer a cancellation
        strAbort = "abort";

        // Install callbacks on deferreds
        for (i in {
            success: 1,
            error: 1,
            complete: 1
          }) {
          jqXHR[i](s[i]);
        }

        // Get transport
        transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

        // If no transport, we auto-abort
        if (!transport) {
          done(-1, "No Transport");
        } else {
          jqXHR.readyState = 1;

          // Send global event
          if (fireGlobals) {
            globalEventContext.trigger("ajaxSend", [jqXHR, s]);
          }
          // Timeout
          if (s.async && s.timeout > 0) {
            timeoutTimer = setTimeout(function() {
              jqXHR.abort("timeout");
            }, s.timeout);
          }

          try {
            state = 1;
            transport.send(requestHeaders, done);
          } catch (e) {
            // Propagate exception as error if not done
            if (state < 2) {
              done(-1, e);
              // Simply rethrow otherwise
            } else {
              throw e;
            }
          }
        }

        // Callback for when everything is done
        function done(status, nativeStatusText, responses, headers) {
          var isSuccess, success, error, response, modified,
            statusText = nativeStatusText;

          // Called once
          if (state === 2) {
            return;
          }

          // State is "done" now
          state = 2;

          // Clear timeout if it exists
          if (timeoutTimer) {
            clearTimeout(timeoutTimer);
          }

          // Dereference transport for early garbage collection
          // (no matter how long the jqXHR object will be used)
          transport = undefined;

          // Cache response headers
          responseHeadersString = headers || "";

          // Set readyState
          jqXHR.readyState = status > 0 ? 4 : 0;

          // Determine if successful
          isSuccess = status >= 200 && status < 300 || status === 304;

          // Get response data
          if (responses) {
            response = ajaxHandleResponses(s, jqXHR, responses);
          }

          // Convert no matter what (that way responseXXX fields are always set)
          response = ajaxConvert(s, response, jqXHR, isSuccess);

          // If successful, handle type chaining
          if (isSuccess) {

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if (s.ifModified) {
              modified = jqXHR.getResponseHeader("Last-Modified");
              if (modified) {
                jQuery.lastModified[cacheURL] = modified;
              }
              modified = jqXHR.getResponseHeader("etag");
              if (modified) {
                jQuery.etag[cacheURL] = modified;
              }
            }

            // if no content
            if (status === 204 || s.type === "HEAD") {
              statusText = "nocontent";

              // if not modified
            } else if (status === 304) {
              statusText = "notmodified";

              // If we have data, let's convert it
            } else {
              statusText = response.state;
              success = response.data;
              error = response.error;
              isSuccess = !error;
            }
          } else {
            // Extract error from statusText and normalize for non-aborts
            error = statusText;
            if (status || !statusText) {
              statusText = "error";
              if (status < 0) {
                status = 0;
              }
            }
          }

          // Set data for the fake xhr object
          jqXHR.status = status;
          jqXHR.statusText = (nativeStatusText || statusText) + "";

          // Success/Error
          if (isSuccess) {
            deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
          } else {
            deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
          }

          // Status-dependent callbacks
          jqXHR.statusCode(statusCode);
          statusCode = undefined;

          if (fireGlobals) {
            globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
          }

          // Complete
          completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

          if (fireGlobals) {
            globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
            // Handle the global AJAX counter
            if (!(--jQuery.active)) {
              jQuery.event.trigger("ajaxStop");
            }
          }
        }

        return jqXHR;
      },

      getJSON: function(url, data, callback) {
        return jQuery.get(url, data, callback, "json");
      },

      getScript: function(url, callback) {
        return jQuery.get(url, undefined, callback, "script");
      }
    });

    jQuery.each(["get", "post"], function(i, method) {
      jQuery[method] = function(url, data, callback, type) {
        // Shift arguments if data argument was omitted
        if (jQuery.isFunction(data)) {
          type = type || callback;
          callback = data;
          data = undefined;
        }

        return jQuery.ajax({
          url: url,
          type: method,
          dataType: type,
          data: data,
          success: callback
        });
      };
    });


    jQuery._evalUrl = function(url) {
      return jQuery.ajax({
        url: url,
        type: "GET",
        dataType: "script",
        async: false,
        global: false,
        "throws": true
      });
    };


    jQuery.fn.extend({
      wrapAll: function(html) {
        var wrap;

        if (jQuery.isFunction(html)) {
          return this.each(function(i) {
            jQuery(this).wrapAll(html.call(this, i));
          });
        }

        if (this[0]) {

          // The elements to wrap the target around
          wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

          if (this[0].parentNode) {
            wrap.insertBefore(this[0]);
          }

          wrap.map(function() {
            var elem = this;

            while (elem.firstElementChild) {
              elem = elem.firstElementChild;
            }

            return elem;
          }).append(this);
        }

        return this;
      },

      wrapInner: function(html) {
        if (jQuery.isFunction(html)) {
          return this.each(function(i) {
            jQuery(this).wrapInner(html.call(this, i));
          });
        }

        return this.each(function() {
          var self = jQuery(this),
            contents = self.contents();

          if (contents.length) {
            contents.wrapAll(html);

          } else {
            self.append(html);
          }
        });
      },

      wrap: function(html) {
        var isFunction = jQuery.isFunction(html);

        return this.each(function(i) {
          jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
        });
      },

      unwrap: function() {
        return this.parent().each(function() {
          if (!jQuery.nodeName(this, "body")) {
            jQuery(this).replaceWith(this.childNodes);
          }
        }).end();
      }
    });


    jQuery.expr.filters.hidden = function(elem) {
      // Support: Opera <= 12.12
      // Opera reports offsetWidths and offsetHeights less than zero on some elements
      return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
    };
    jQuery.expr.filters.visible = function(elem) {
      return !jQuery.expr.filters.hidden(elem);
    };


    var r20 = /%20/g,
      rbracket = /\[\]$/,
      rCRLF = /\r?\n/g,
      rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
      rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams(prefix, obj, traditional, add) {
      var name;

      if (jQuery.isArray(obj)) {
        // Serialize array item.
        jQuery.each(obj, function(i, v) {
          if (traditional || rbracket.test(prefix)) {
            // Treat each array item as a scalar.
            add(prefix, v);

          } else {
            // Item is non-scalar (array or object), encode its numeric index.
            buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
          }
        });

      } else if (!traditional && jQuery.type(obj) === "object") {
        // Serialize object item.
        for (name in obj) {
          buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
        }

      } else {
        // Serialize scalar item.
        add(prefix, obj);
      }
    }

    // Serialize an array of form elements or a set of
    // key/values into a query string
    jQuery.param = function(a, traditional) {
      var prefix,
        s = [],
        add = function(key, value) {
          // If value is a function, invoke it and return its value
          value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
          s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };

      // Set traditional to true for jQuery <= 1.3.2 behavior.
      if (traditional === undefined) {
        traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
      }

      // If an array was passed in, assume that it is an array of form elements.
      if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
        // Serialize the form elements
        jQuery.each(a, function() {
          add(this.name, this.value);
        });

      } else {
        // If traditional, encode the "old" way (the way 1.3.2 or older
        // did it), otherwise encode params recursively.
        for (prefix in a) {
          buildParams(prefix, a[prefix], traditional, add);
        }
      }

      // Return the resulting serialization
      return s.join("&").replace(r20, "+");
    };

    jQuery.fn.extend({
      serialize: function() {
        return jQuery.param(this.serializeArray());
      },
      serializeArray: function() {
        return this.map(function() {
            // Can add propHook for "elements" to filter or add form elements
            var elements = jQuery.prop(this, "elements");
            return elements ? jQuery.makeArray(elements) : this;
          })
          .filter(function() {
            var type = this.type;

            // Use .is( ":disabled" ) so that fieldset[disabled] works
            return this.name && !jQuery(this).is(":disabled") &&
              rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
              (this.checked || !rcheckableType.test(type));
          })
          .map(function(i, elem) {
            var val = jQuery(this).val();

            return val == null ?
              null :
              jQuery.isArray(val) ?
              jQuery.map(val, function(val) {
                return {
                  name: elem.name,
                  value: val.replace(rCRLF, "\r\n")
                };
              }) : {
                name: elem.name,
                value: val.replace(rCRLF, "\r\n")
              };
          }).get();
      }
    });


    jQuery.ajaxSettings.xhr = function() {
      try {
        return new XMLHttpRequest();
      } catch (e) {}
    };

    var xhrId = 0,
      xhrCallbacks = {},
      xhrSuccessStatus = {
        // file protocol always yields status code 0, assume 200
        0: 200,
        // Support: IE9
        // #1450: sometimes IE returns 1223 when it should be 204
        1223: 204
      },
      xhrSupported = jQuery.ajaxSettings.xhr();

    // Support: IE9
    // Open requests must be manually aborted on unload (#5280)
    // See https://support.microsoft.com/kb/2856746 for more info
    if (window.attachEvent) {
      window.attachEvent("onunload", function() {
        for (var key in xhrCallbacks) {
          xhrCallbacks[key]();
        }
      });
    }

    support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
    support.ajax = xhrSupported = !!xhrSupported;

    jQuery.ajaxTransport(function(options) {
      var callback;

      // Cross domain only allowed if supported through XMLHttpRequest
      if (support.cors || xhrSupported && !options.crossDomain) {
        return {
          send: function(headers, complete) {
            var i,
              xhr = options.xhr(),
              id = ++xhrId;

            xhr.open(options.type, options.url, options.async, options.username, options.password);

            // Apply custom fields if provided
            if (options.xhrFields) {
              for (i in options.xhrFields) {
                xhr[i] = options.xhrFields[i];
              }
            }

            // Override mime type if needed
            if (options.mimeType && xhr.overrideMimeType) {
              xhr.overrideMimeType(options.mimeType);
            }

            // X-Requested-With header
            // For cross-domain requests, seeing as conditions for a preflight are
            // akin to a jigsaw puzzle, we simply never set it to be sure.
            // (it can always be set on a per-request basis or even using ajaxSetup)
            // For same-domain requests, won't change header if already provided.
            if (!options.crossDomain && !headers["X-Requested-With"]) {
              headers["X-Requested-With"] = "XMLHttpRequest";
            }

            // Set headers
            for (i in headers) {
              xhr.setRequestHeader(i, headers[i]);
            }

            // Callback
            callback = function(type) {
              return function() {
                if (callback) {
                  delete xhrCallbacks[id];
                  callback = xhr.onload = xhr.onerror = null;

                  if (type === "abort") {
                    xhr.abort();
                  } else if (type === "error") {
                    complete(
                      // file: protocol always yields status 0; see #8605, #14207
                      xhr.status,
                      xhr.statusText
                    );
                  } else {
                    complete(
                      xhrSuccessStatus[xhr.status] || xhr.status,
                      xhr.statusText,
                      // Support: IE9
                      // Accessing binary-data responseText throws an exception
                      // (#11426)
                      typeof xhr.responseText === "string" ? {
                        text: xhr.responseText
                      } : undefined,
                      xhr.getAllResponseHeaders()
                    );
                  }
                }
              };
            };

            // Listen to events
            xhr.onload = callback();
            xhr.onerror = callback("error");

            // Create the abort callback
            callback = xhrCallbacks[id] = callback("abort");

            try {
              // Do send the request (this may raise an exception)
              xhr.send(options.hasContent && options.data || null);
            } catch (e) {
              // #14683: Only rethrow if this hasn't been notified as an error yet
              if (callback) {
                throw e;
              }
            }
          },

          abort: function() {
            if (callback) {
              callback();
            }
          }
        };
      }
    });


    // Install script dataType
    jQuery.ajaxSetup({
      accepts: {
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
      },
      contents: {
        script: /(?:java|ecma)script/
      },
      converters: {
        "text script": function(text) {
          jQuery.globalEval(text);
          return text;
        }
      }
    });

    // Handle cache's special case and crossDomain
    jQuery.ajaxPrefilter("script", function(s) {
      if (s.cache === undefined) {
        s.cache = false;
      }
      if (s.crossDomain) {
        s.type = "GET";
      }
    });

    // Bind script tag hack transport
    jQuery.ajaxTransport("script", function(s) {
      // This transport only deals with cross domain requests
      if (s.crossDomain) {
        var script, callback;
        return {
          send: function(_, complete) {
            script = jQuery("<script>").prop({
              async: true,
              charset: s.scriptCharset,
              src: s.url
            }).on(
              "load error",
              callback = function(evt) {
                script.remove();
                callback = null;
                if (evt) {
                  complete(evt.type === "error" ? 404 : 200, evt.type);
                }
              }
            );
            document.head.appendChild(script[0]);
          },
          abort: function() {
            if (callback) {
              callback();
            }
          }
        };
      }
    });


    var oldCallbacks = [],
      rjsonp = /(=)\?(?=&|$)|\?\?/;

    // Default jsonp settings
    jQuery.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function() {
        var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
        this[callback] = true;
        return callback;
      }
    });

    // Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {

      var callbackName, overwritten, responseContainer,
        jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
          "url" :
          typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data"
        );

      // Handle iff the expected data type is "jsonp" or we have a parameter to set
      if (jsonProp || s.dataTypes[0] === "jsonp") {

        // Get callback name, remembering preexisting value associated with it
        callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ?
          s.jsonpCallback() :
          s.jsonpCallback;

        // Insert callback into url or form data
        if (jsonProp) {
          s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
        } else if (s.jsonp !== false) {
          s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
        }

        // Use data converter to retrieve json after script execution
        s.converters["script json"] = function() {
          if (!responseContainer) {
            jQuery.error(callbackName + " was not called");
          }
          return responseContainer[0];
        };

        // force json dataType
        s.dataTypes[0] = "json";

        // Install callback
        overwritten = window[callbackName];
        window[callbackName] = function() {
          responseContainer = arguments;
        };

        // Clean-up function (fires after converters)
        jqXHR.always(function() {
          // Restore preexisting value
          window[callbackName] = overwritten;

          // Save back as free
          if (s[callbackName]) {
            // make sure that re-using the options doesn't screw things around
            s.jsonpCallback = originalSettings.jsonpCallback;

            // save the callback name for future use
            oldCallbacks.push(callbackName);
          }

          // Call if it was a function and we have a response
          if (responseContainer && jQuery.isFunction(overwritten)) {
            overwritten(responseContainer[0]);
          }

          responseContainer = overwritten = undefined;
        });

        // Delegate to script
        return "script";
      }
    });


    // data: string of html
    // context (optional): If specified, the fragment will be created in this context, defaults to document
    // keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function(data, context, keepScripts) {
      if (!data || typeof data !== "string") {
        return null;
      }
      if (typeof context === "boolean") {
        keepScripts = context;
        context = false;
      }
      context = context || document;

      var parsed = rsingleTag.exec(data),
        scripts = !keepScripts && [];

      // Single tag
      if (parsed) {
        return [context.createElement(parsed[1])];
      }

      parsed = jQuery.buildFragment([data], context, scripts);

      if (scripts && scripts.length) {
        jQuery(scripts).remove();
      }

      return jQuery.merge([], parsed.childNodes);
    };


    // Keep a copy of the old load method
    var _load = jQuery.fn.load;

    /**
     * Load a url into a page
     */
    jQuery.fn.load = function(url, params, callback) {
      if (typeof url !== "string" && _load) {
        return _load.apply(this, arguments);
      }

      var selector, type, response,
        self = this,
        off = url.indexOf(" ");

      if (off >= 0) {
        selector = jQuery.trim(url.slice(off));
        url = url.slice(0, off);
      }

      // If it's a function
      if (jQuery.isFunction(params)) {

        // We assume that it's the callback
        callback = params;
        params = undefined;

        // Otherwise, build a param string
      } else if (params && typeof params === "object") {
        type = "POST";
      }

      // If we have elements to modify, make the request
      if (self.length > 0) {
        jQuery.ajax({
          url: url,

          // if "type" variable is undefined, then "GET" method will be used
          type: type,
          dataType: "html",
          data: params
        }).done(function(responseText) {

          // Save response for use in complete callback
          response = arguments;

          self.html(selector ?

            // If a selector was specified, locate the right elements in a dummy div
            // Exclude scripts to avoid IE 'Permission Denied' errors
            jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

            // Otherwise use the full result
            responseText);

        }).complete(callback && function(jqXHR, status) {
          self.each(callback, response || [jqXHR.responseText, status, jqXHR]);
        });
      }

      return this;
    };


    // Attach a bunch of functions for handling common AJAX events
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
      jQuery.fn[type] = function(fn) {
        return this.on(type, fn);
      };
    });


    jQuery.expr.filters.animated = function(elem) {
      return jQuery.grep(jQuery.timers, function(fn) {
        return elem === fn.elem;
      }).length;
    };


    var docElem = window.document.documentElement;

    /**
     * Gets a window from an element
     */
    function getWindow(elem) {
      return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    jQuery.offset = {
      setOffset: function(elem, options, i) {
        var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
          position = jQuery.css(elem, "position"),
          curElem = jQuery(elem),
          props = {};

        // Set position first, in-case top/left are set even on static elem
        if (position === "static") {
          elem.style.position = "relative";
        }

        curOffset = curElem.offset();
        curCSSTop = jQuery.css(elem, "top");
        curCSSLeft = jQuery.css(elem, "left");
        calculatePosition = (position === "absolute" || position === "fixed") &&
          (curCSSTop + curCSSLeft).indexOf("auto") > -1;

        // Need to be able to calculate position if either
        // top or left is auto and position is either absolute or fixed
        if (calculatePosition) {
          curPosition = curElem.position();
          curTop = curPosition.top;
          curLeft = curPosition.left;

        } else {
          curTop = parseFloat(curCSSTop) || 0;
          curLeft = parseFloat(curCSSLeft) || 0;
        }

        if (jQuery.isFunction(options)) {
          options = options.call(elem, i, curOffset);
        }

        if (options.top != null) {
          props.top = (options.top - curOffset.top) + curTop;
        }
        if (options.left != null) {
          props.left = (options.left - curOffset.left) + curLeft;
        }

        if ("using" in options) {
          options.using.call(elem, props);

        } else {
          curElem.css(props);
        }
      }
    };

    jQuery.fn.extend({
      offset: function(options) {
        if (arguments.length) {
          return options === undefined ?
            this :
            this.each(function(i) {
              jQuery.offset.setOffset(this, options, i);
            });
        }

        var docElem, win,
          elem = this[0],
          box = {
            top: 0,
            left: 0
          },
          doc = elem && elem.ownerDocument;

        if (!doc) {
          return;
        }

        docElem = doc.documentElement;

        // Make sure it's not a disconnected DOM node
        if (!jQuery.contains(docElem, elem)) {
          return box;
        }

        // Support: BlackBerry 5, iOS 3 (original iPhone)
        // If we don't have gBCR, just use 0,0 rather than error
        if (typeof elem.getBoundingClientRect !== strundefined) {
          box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
          top: box.top + win.pageYOffset - docElem.clientTop,
          left: box.left + win.pageXOffset - docElem.clientLeft
        };
      },

      position: function() {
        if (!this[0]) {
          return;
        }

        var offsetParent, offset,
          elem = this[0],
          parentOffset = {
            top: 0,
            left: 0
          };

        // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
        if (jQuery.css(elem, "position") === "fixed") {
          // Assume getBoundingClientRect is there when computed position is fixed
          offset = elem.getBoundingClientRect();

        } else {
          // Get *real* offsetParent
          offsetParent = this.offsetParent();

          // Get correct offsets
          offset = this.offset();
          if (!jQuery.nodeName(offsetParent[0], "html")) {
            parentOffset = offsetParent.offset();
          }

          // Add offsetParent borders
          parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
          parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
        }

        // Subtract parent offsets and element margins
        return {
          top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
          left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
        };
      },

      offsetParent: function() {
        return this.map(function() {
          var offsetParent = this.offsetParent || docElem;

          while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
            offsetParent = offsetParent.offsetParent;
          }

          return offsetParent || docElem;
        });
      }
    });

    // Create scrollLeft and scrollTop methods
    jQuery.each({
      scrollLeft: "pageXOffset",
      scrollTop: "pageYOffset"
    }, function(method, prop) {
      var top = "pageYOffset" === prop;

      jQuery.fn[method] = function(val) {
        return access(this, function(elem, method, val) {
          var win = getWindow(elem);

          if (val === undefined) {
            return win ? win[prop] : elem[method];
          }

          if (win) {
            win.scrollTo(!top ? val : window.pageXOffset,
              top ? val : window.pageYOffset
            );

          } else {
            elem[method] = val;
          }
        }, method, val, arguments.length, null);
      };
    });

    // Support: Safari<7+, Chrome<37+
    // Add the top/left cssHooks using jQuery.fn.position
    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
    // Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
    // getComputedStyle returns percent when specified for top/left/bottom/right;
    // rather than make the css module depend on the offset module, just check for it here
    jQuery.each(["top", "left"], function(i, prop) {
      jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,
        function(elem, computed) {
          if (computed) {
            computed = curCSS(elem, prop);
            // If curCSS returns percentage, fallback to offset
            return rnumnonpx.test(computed) ?
              jQuery(elem).position()[prop] + "px" :
              computed;
          }
        }
      );
    });


    // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each({
      Height: "height",
      Width: "width"
    }, function(name, type) {
      jQuery.each({
        padding: "inner" + name,
        content: type,
        "": "outer" + name
      }, function(defaultExtra, funcName) {
        // Margin is only for outerHeight, outerWidth
        jQuery.fn[funcName] = function(margin, value) {
          var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
            extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

          return access(this, function(elem, type, value) {
            var doc;

            if (jQuery.isWindow(elem)) {
              // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
              // isn't a whole lot we can do. See pull request at this URL for discussion:
              // https://github.com/jquery/jquery/pull/764
              return elem.document.documentElement["client" + name];
            }

            // Get document width or height
            if (elem.nodeType === 9) {
              doc = elem.documentElement;

              // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
              // whichever is greatest
              return Math.max(
                elem.body["scroll" + name], doc["scroll" + name],
                elem.body["offset" + name], doc["offset" + name],
                doc["client" + name]
              );
            }

            return value === undefined ?
              // Get width or height on the element, requesting but not forcing parseFloat
              jQuery.css(elem, type, extra) :

              // Set width or height on the element
              jQuery.style(elem, type, value, extra);
          }, type, chainable ? margin : undefined, chainable, null);
        };
      });
    });


    // The number of elements contained in the matched element set
    jQuery.fn.size = function() {
      return this.length;
    };

    jQuery.fn.andSelf = jQuery.fn.addBack;
    return jQuery;
  })(window);

  /*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
   * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
   * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
   *
   * Version: 1.3.6
   *
   */
  (function($) {

    $.fn.extend({
      slimScroll: function(options) {

        var defaults = {

          // width in pixels of the visible scroll area
          width: 'auto',

          // height in pixels of the visible scroll area
          height: '250px',

          // width in pixels of the scrollbar and rail
          size: '7px',

          // scrollbar color, accepts any hex/color value
          color: '#000',

          // scrollbar position - left/right
          position: 'right',

          // distance in pixels between the side edge and the scrollbar
          distance: '1px',

          // default scroll position on load - top / bottom / $('selector')
          start: 'top',

          // sets scrollbar opacity
          opacity: .4,

          // enables always-on mode for the scrollbar
          alwaysVisible: false,

          // check if we should hide the scrollbar when user is hovering over
          disableFadeOut: false,

          // sets visibility of the rail
          railVisible: false,

          // sets rail color
          railColor: '#333',

          // sets rail opacity
          railOpacity: .2,

          // whether  we should use jQuery UI Draggable to enable bar dragging
          railDraggable: true,

          // defautlt CSS class of the slimscroll rail
          railClass: 'slimScrollRail',

          // defautlt CSS class of the slimscroll bar
          barClass: 'slimScrollBar',

          // defautlt CSS class of the slimscroll wrapper
          wrapperClass: 'slimScrollDiv',

          // check if mousewheel should scroll the window if we reach top/bottom
          allowPageScroll: false,

          // scroll amount applied to each mouse wheel step
          wheelStep: 20,

          // scroll amount applied when user is using gestures
          touchScrollStep: 200,

          // sets border radius
          borderRadius: '7px',

          // sets border radius of the rail
          railBorderRadius: '7px'
        };

        var o = $.extend(defaults, options);

        // do it for every element that matches selector
        this.each(function() {

          var isOverPanel, isOverBar, isDragg, queueHide, touchDif,
            barHeight, percentScroll, lastScroll,
            divS = '<div></div>',
            minBarHeight = 30,
            releaseScroll = false

          isOverPanel = true; //设置默认为true,否则,当用户鼠标已经再当前元素上时,设置了滚动条,则不能触发滚动(by yongsheng.kuang)

          // used in event handlers and for better minification
          var me = $(this);

          // ensure we are not binding it again
          if (me.parent().hasClass(o.wrapperClass)) {
            // start from last bar position
            var offset = me.scrollTop();

            // find bar and rail
            bar = me.closest('.' + o.barClass);
            rail = me.closest('.' + o.railClass);

            getBarHeight();

            // check if we should scroll existing instance
            if ($.isPlainObject(options)) {
              // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
              if ('height' in options && options.height == 'auto') {
                me.parent().css('height', 'auto');
                me.css('height', 'auto');
                var height = me.parent().parent().height();
                me.parent().css('height', height);
                me.css('height', height);
              }

              if ('scrollTo' in options) {
                // jump to a static point
                offset = parseInt(o.scrollTo);
              } else if ('scrollBy' in options) {
                // jump by value pixels
                offset += parseInt(o.scrollBy);
              } else if ('destroy' in options) {
                //在destroy 的时候,bar 和 rail不能正常的找到的话,需要处理 [modified by yongsheng.kuang]
                if (me.parent().hasClass(o.wrapperClass)) {
                  bar = me.parent().find('.' + o.barClass);
                  rail = me.parent().find('.' + o.railClass);
                }
                // remove slimscroll elements
                bar.remove();
                rail.remove();
                me.unwrap();
                me.removeAttr("style");
                return;
              }

              // scroll content by the given offset
              scrollContent(offset, false, true);
            }

            return;
          } else if ($.isPlainObject(options)) {
            if ('destroy' in options) {
              return;
            }
          }

          // optionally set height to the parent's height
          o.height = (o.height == 'auto') ? me.parent().height() : o.height;

          // wrap content
          var wrapper = $(divS)
            .addClass(o.wrapperClass)
            .css({
              position: 'relative',
              overflow: 'hidden',
              width: o.width,
              height: o.height
            });

          // update style for the div
          me.css({
            overflow: 'hidden',
            width: o.width,
            height: o.height
          });

          // create scrollbar rail
          var rail = $(divS)
            .addClass(o.railClass)
            .css({
              width: o.size,
              height: '100%',
              position: 'absolute',
              top: 0,
              display: (o.alwaysVisible && o.railVisible) ? 'block' : 'none',
              'border-radius': o.railBorderRadius,
              background: o.railColor,
              opacity: o.railOpacity,
              zIndex: o.zIndex ? o.zIndex : 99
            });

          // create scrollbar
          var bar = $(divS)
            .addClass(o.barClass)
            .css({
              background: o.color,
              width: o.size,
              position: 'absolute',
              top: 0,
              opacity: o.opacity,
              display: o.alwaysVisible ? 'block' : 'none',
              'border-radius': o.borderRadius,
              BorderRadius: o.borderRadius,
              MozBorderRadius: o.borderRadius,
              WebkitBorderRadius: o.borderRadius,
              zIndex: o.zIndex ? o.zIndex : 99
            });

          // set position
          var posCss = (o.position == 'right') ? {
            right: o.distance
          } : {
            left: o.distance
          };
          rail.css(posCss);
          bar.css(posCss);

          // wrap it
          me.wrap(wrapper);

          // append to parent div
          me.parent().append(bar);
          me.parent().append(rail);

          // make it draggable and no longer dependent on the jqueryUI
          if (o.railDraggable) {
            bar.bind("mousedown", function(e) {
              var $doc = $(document);
              isDragg = true;
              t = parseFloat(bar.css('top'));
              pageY = e.pageY;

              $doc.bind("mousemove.slimscroll", function(e) {
                currTop = t + e.pageY - pageY;
                bar.css('top', currTop);
                scrollContent(0, bar.position().top, false); // scroll content
              });

              $doc.bind("mouseup.slimscroll", function(e) {
                isDragg = false;
                hideBar();
                $doc.unbind('.slimscroll');
              });
              return false;
            }).bind("selectstart.slimscroll", function(e) {
              e.stopPropagation();
              e.preventDefault();
              return false;
            });
          }

          // on rail over
          rail.hover(function() {
            showBar();
          }, function() {
            hideBar();
          });

          // on bar over
          bar.hover(function() {
            isOverBar = true;
          }, function() {
            isOverBar = false;
          });

          // show on parent mouseover
          me.hover(function() {
            isOverPanel = true;
            showBar();
            hideBar();
          }, function() {
            isOverPanel = false;
            hideBar();
          });

          // support for mobile
          me.bind('touchstart', function(e, b) {
            if (e.originalEvent.touches.length) {
              // record where touch started
              touchDif = e.originalEvent.touches[0].pageY;
            }
          });

          me.bind('touchmove', function(e) {
            // prevent scrolling the page if necessary
            if (!releaseScroll) {
              e.originalEvent.preventDefault();
            }
            if (e.originalEvent.touches.length) {
              // see how far user swiped
              var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
              // scroll content
              scrollContent(diff, true);
              touchDif = e.originalEvent.touches[0].pageY;
            }
          });

          // set up initial height
          getBarHeight();

          // check start position
          if (o.start === 'bottom') {
            // scroll content to bottom
            bar.css({
              top: me.outerHeight() - bar.outerHeight()
            });
            scrollContent(0, true);
          } else if (o.start !== 'top') {
            // assume jQuery selector
            scrollContent($(o.start).position().top, null, true);

            // make sure bar stays hidden
            if (!o.alwaysVisible) {
              bar.hide();
            }
          }

          // attach scroll events
          attachWheel(this);

          function _onWheel(e) {
            // use mouse wheel only when mouse is over
            if (!isOverPanel) {
              return;
            }

            var e = e || window.event;

            var delta = 0;
            if (e.wheelDelta) {
              delta = -e.wheelDelta / 120;
            }
            if (e.detail) {
              delta = e.detail / 3;
            }

            var target = e.target || e.srcTarget || e.srcElement;
            if ($(target).closest('.' + o.wrapperClass).is(me.parent())) {
              // scroll content
              scrollContent(delta, true);
            }

            // stop window scroll
            if (e.preventDefault && !releaseScroll) {
              e.preventDefault();
            }
            if (!releaseScroll) {
              e.returnValue = false;
            }
          }

          function scrollContent(y, isWheel, isJump) {
            releaseScroll = false;
            var delta = y;
            var maxTop = me.outerHeight() - bar.outerHeight();

            if (isWheel) {
              // move bar with mouse wheel
              delta = parseInt(bar.css('top')) + y * parseInt(o.wheelStep) / 100 * bar.outerHeight();

              // move bar, make sure it doesn't go out
              delta = Math.min(Math.max(delta, 0), maxTop);

              // if scrolling down, make sure a fractional change to the
              // scroll position isn't rounded away when the scrollbar's CSS is set
              // this flooring of delta would happened automatically when
              // bar.css is set below, but we floor here for clarity
              delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);

              // scroll the scrollbar
              bar.css({
                top: delta + 'px'
              });
            }

            // calculate actual scroll amount
            percentScroll = parseInt(bar.css('top')) / (me.outerHeight() - bar.outerHeight());
            delta = percentScroll * (me[0].scrollHeight - me.outerHeight());

            if (isJump) {
              delta = y;
              var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
              offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
              bar.css({
                top: offsetTop + 'px'
              });
            }

            // scroll content
            me.scrollTop(delta);

            // fire scrolling event
            me.trigger('slimscrolling', ~~delta);

            // ensure bar is visible
            showBar();

            // trigger hide when scroll is stopped
            hideBar();
          }

          function attachWheel(target) {
            if (window.addEventListener) {
              target.addEventListener('DOMMouseScroll', _onWheel, false);
              target.addEventListener('mousewheel', _onWheel, false);
            } else {
              document.attachEvent("onmousewheel", _onWheel)
            }
          }

          function getBarHeight() {
            // calculate scrollbar height and make sure it is not too small
            barHeight = Math.max((me.outerHeight() / me[0].scrollHeight) * me.outerHeight(), minBarHeight);
            bar.css({
              height: barHeight + 'px'
            });

            // hide scrollbar if content is not long enough
            var display = barHeight == me.outerHeight() ? 'none' : 'block';
            bar.css({
              display: display
            });
          }

          function showBar() {
            // recalculate bar height
            getBarHeight();
            clearTimeout(queueHide);

            // when bar reached top or bottom
            if (percentScroll == ~~percentScroll) {
              //release wheel
              releaseScroll = o.allowPageScroll;

              // publish approporiate event
              if (lastScroll != percentScroll) {
                var msg = (~~percentScroll == 0) ? 'top' : 'bottom';
                me.trigger('slimscroll', msg);
              }
            } else {
              releaseScroll = false;
            }
            lastScroll = percentScroll;

            // show only when required
            if (barHeight >= me.outerHeight()) {
              //allow window scroll
              releaseScroll = true;
              return;
            }
            bar.stop(true, true).fadeIn('fast');
            if (o.railVisible) {
              rail.stop(true, true).fadeIn('fast');
            }
          }

          function hideBar() {
            // only hide when options allow it
            if (!o.alwaysVisible) {
              queueHide = setTimeout(function() {
                if (!(o.disableFadeOut && isOverPanel) && !isOverBar && !isDragg) {
                  bar.fadeOut('slow');
                  rail.fadeOut('slow');
                }
              }, 1000);
            }
          }

        });

        // maintain chainability
        return this;
      }
    });

    $.fn.extend({
      slimscroll: $.fn.slimScroll,
      // 手动改变滚动条位置
      slimscrollTop: function(top) {
        var bar = $(this).siblings(".slimScrollBar"),
          len = $(this).find('li').length,
          topPath = $(this).find('li').outerHeight(true) * len - $(this).outerHeight(),
          barPath = $(this).outerHeight() - bar.outerHeight(),
          barTop = top * barPath / topPath;
        $(this).scrollTop(top);
        bar.css({
          top: barTop
        });
      }

    });

  })(jQuery);

  /*!
   * Draggabilly PACKAGED v2.1.0
   * Make that shiz draggable
   * http://draggabilly.desandro.com
   * MIT license
   */

  /**
   * Bridget makes jQuery widgets
   * v2.0.0
   * MIT license
   */

  /* jshint browser: true, strict: true, undef: true, unused: true */

  (function(window, factory) {

    /* globals define: false, module: false, require: false */

    if (typeof define == 'function' && define.amd) {
      // AMD
      define('jquery-bridget/jquery-bridget', ['jquery'], function(jQuery) {
        factory(window, jQuery);
      });
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS
      module.exports = factory(
        window,
        require('jquery')
      );
    } else {
      // browser global
      window.jQueryBridget = factory(
        window,
        window.jQuery
      );
    }

  }(window, function factory(window, jQuery) {


    // ----- utils ----- //

    var arraySlice = Array.prototype.slice;

    // helper function for logging errors
    // $.error breaks jQuery chaining
    var console = window.console;
    var logError = typeof console == 'undefined' ? function() {} :
      function(message) {
        console.error(message);
      };

    // ----- jQueryBridget ----- //

    function jQueryBridget(namespace, PluginClass, $) {
      $ = $ || jQuery || window.jQuery;
      if (!$) {
        return;
      }

      // add option method -> $().plugin('option', {...})
      if (!PluginClass.prototype.option) {
        // option setter
        PluginClass.prototype.option = function(opts) {
          // bail out if not an object
          if (!$.isPlainObject(opts)) {
            return;
          }
          this.options = $.extend(true, this.options, opts);
        };
      }

      // make jQuery plugin
      $.fn[namespace] = function(arg0 /*, arg1 */ ) {
        if (typeof arg0 == 'string') {
          // method call $().plugin( 'methodName', { options } )
          // shift arguments by 1
          var args = arraySlice.call(arguments, 1);
          return methodCall(this, arg0, args);
        }
        // just $().plugin({ options })
        plainCall(this, arg0);
        return this;
      };

      // $().plugin('methodName')
      function methodCall($elems, methodName, args) {
        var returnValue;
        var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

        $elems.each(function(i, elem) {
          // get instance
          var instance = $.data(elem, namespace);
          if (!instance) {
            logError(namespace + ' not initialized. Cannot call methods, i.e. ' +
              pluginMethodStr);
            return;
          }

          var method = instance[methodName];
          if (!method || methodName.charAt(0) == '_') {
            logError(pluginMethodStr + ' is not a valid method');
            return;
          }

          // apply method, get return value
          var value = method.apply(instance, args);
          // set return value if value is returned, use only first value
          returnValue = returnValue === undefined ? value : returnValue;
        });

        return returnValue !== undefined ? returnValue : $elems;
      }

      function plainCall($elems, options) {
        $elems.each(function(i, elem) {
          var instance = $.data(elem, namespace);
          if (instance) {
            // set options & init
            instance.option(options);
            instance._init();
          } else {
            // initialize new instance
            instance = new PluginClass(elem, options);
            $.data(elem, namespace, instance);
          }
        });
      }

      updateJQuery($);

    }

    // ----- updateJQuery ----- //

    // set $.bridget for v1 backwards compatibility
    function updateJQuery($) {
      if (!$ || ($ && $.bridget)) {
        return;
      }
      $.bridget = jQueryBridget;
    }

    updateJQuery(jQuery || window.jQuery);

    // -----  ----- //

    return jQueryBridget;

  }));

  /*!
   * getSize v2.0.2
   * measure size of elements
   * MIT license
   */

  /*jshint browser: true, strict: true, undef: true, unused: true */
  /*global define: false, module: false, console: false */

  (function(window, factory) {

    if (window.PT_OVERLAY_MAP) { //弹出热图用
      window.PT_OVERLAY_MAP.getSize = factory();
    } else if (typeof define == 'function' && define.amd) {
      // AMD
      define('get-size/get-size', [], function() {
        return factory();
      });
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS
      module.exports = factory();
    } else {
      // browser global
      window.getSize = factory();
    }

  })(window, function factory() {


    // -------------------------- helpers -------------------------- //

    // get a number from a string, not a percentage
    function getStyleSize(value) {
      var num = parseFloat(value);
      // not a percent like '100%', and a number
      var isValid = value.indexOf('%') == -1 && !isNaN(num);
      return isValid && num;
    }

    function noop() {}

    var logError = typeof console == 'undefined' ? noop :
      function(message) {
        console.error(message);
      };

    // -------------------------- measurements -------------------------- //

    var measurements = [
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'paddingBottom',
      'marginLeft',
      'marginRight',
      'marginTop',
      'marginBottom',
      'borderLeftWidth',
      'borderRightWidth',
      'borderTopWidth',
      'borderBottomWidth'
    ];

    var measurementsLength = measurements.length;

    function getZeroSize() {
      var size = {
        width: 0,
        height: 0,
        innerWidth: 0,
        innerHeight: 0,
        outerWidth: 0,
        outerHeight: 0
      };
      for (var i = 0; i < measurementsLength; i++) {
        var measurement = measurements[i];
        size[measurement] = 0;
      }
      return size;
    }

    // -------------------------- getStyle -------------------------- //

    /**
     * getStyle, get style of element, check for Firefox bug
     * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
     */
    function getStyle(elem) {
      var style = getComputedStyle(elem);
      if (!style) {
        logError('Style returned ' + style +
          '. Are you running this code in a hidden iframe on Firefox? ' +
          'See http://bit.ly/getsizebug1');
      }
      return style;
    }

    // -------------------------- setup -------------------------- //

    var isSetup = false;

    var isBoxSizeOuter;

    /**
     * setup
     * check isBoxSizerOuter
     * do on first getSize() rather than on page load for Firefox bug
     */
    function setup() {
      // setup once
      if (isSetup) {
        return;
      }
      isSetup = true;

      // -------------------------- box sizing -------------------------- //

      /**
       * WebKit measures the outer-width on style.width on border-box elems
       * IE & Firefox<29 measures the inner-width
       */
      var div = document.createElement('div');
      div.style.width = '200px';
      div.style.padding = '1px 2px 3px 4px';
      div.style.borderStyle = 'solid';
      div.style.borderWidth = '1px 2px 3px 4px';
      div.style.boxSizing = 'border-box';

      var body = document.body || document.documentElement;
      body.appendChild(div);
      var style = getStyle(div);

      getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize(style.width) == 200;
      body.removeChild(div);

    }

    // -------------------------- getSize -------------------------- //

    function getSize(elem) {
      setup();

      // use querySeletor if elem is string
      if (typeof elem == 'string') {
        elem = document.querySelector(elem);
      }

      // do not proceed on non-objects
      if (!elem || typeof elem != 'object' || !elem.nodeType) {
        return;
      }

      var style = getStyle(elem);

      // if hidden, everything is 0
      if (style.display == 'none') {
        return getZeroSize();
      }

      var size = {};
      size.width = elem.offsetWidth;
      size.height = elem.offsetHeight;

      var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

      // get all measurements
      for (var i = 0; i < measurementsLength; i++) {
        var measurement = measurements[i];
        var value = style[measurement];
        var num = parseFloat(value);
        // any 'auto', 'medium' value will be 0
        size[measurement] = !isNaN(num) ? num : 0;
      }

      var paddingWidth = size.paddingLeft + size.paddingRight;
      var paddingHeight = size.paddingTop + size.paddingBottom;
      var marginWidth = size.marginLeft + size.marginRight;
      var marginHeight = size.marginTop + size.marginBottom;
      var borderWidth = size.borderLeftWidth + size.borderRightWidth;
      var borderHeight = size.borderTopWidth + size.borderBottomWidth;

      var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

      // overwrite width and height if we can get it from style
      var styleWidth = getStyleSize(style.width);
      if (styleWidth !== false) {
        size.width = styleWidth +
          // add padding and border unless it's already including it
          (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
      }

      var styleHeight = getStyleSize(style.height);
      if (styleHeight !== false) {
        size.height = styleHeight +
          // add padding and border unless it's already including it
          (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
      }

      size.innerWidth = size.width - (paddingWidth + borderWidth);
      size.innerHeight = size.height - (paddingHeight + borderHeight);

      size.outerWidth = size.width + marginWidth;
      size.outerHeight = size.height + marginHeight;

      return size;
    }

    return getSize;

  });

  /**
   * EvEmitter v1.0.1
   * Lil' event emitter
   * MIT License
   */

  /* jshint unused: true, undef: true, strict: true */

  (function(global, factory) {
    // universal module definition
    /* jshint strict: false */
    /* globals define, module */
    if (window.PT_OVERLAY_MAP) { //弹出热图用
      window.PT_OVERLAY_MAP.EvEmitter = factory();
    } else if (typeof define == 'function' && define.amd) {
      // AMD - RequireJS
      define('ev-emitter/ev-emitter', factory);
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS - Browserify, Webpack
      module.exports = factory();
    } else {
      // Browser globals
      global.EvEmitter = factory();
    }

  }(this, function() {


    function EvEmitter() {}

    var proto = EvEmitter.prototype;

    proto.on = function(eventName, listener) {
      if (!eventName || !listener) {
        return;
      }
      // set events hash
      var events = this._events = this._events || {};
      // set listeners array
      var listeners = events[eventName] = events[eventName] || [];
      // only add once
      if (listeners.indexOf(listener) == -1) {
        listeners.push(listener);
      }

      return this;
    };

    proto.once = function(eventName, listener) {
      if (!eventName || !listener) {
        return;
      }
      // add event
      this.on(eventName, listener);
      // set once flag
      // set onceEvents hash
      var onceEvents = this._onceEvents = this._onceEvents || {};
      // set onceListeners array
      var onceListeners = onceEvents[eventName] = onceEvents[eventName] || [];
      // set flag
      onceListeners[listener] = true;

      return this;
    };

    proto.off = function(eventName, listener) {
      var listeners = this._events && this._events[eventName];
      if (!listeners || !listeners.length) {
        return;
      }
      var index = listeners.indexOf(listener);
      if (index != -1) {
        listeners.splice(index, 1);
      }

      return this;
    };

    proto.emitEvent = function(eventName, args) {
      var listeners = this._events && this._events[eventName];
      if (!listeners || !listeners.length) {
        return;
      }
      var i = 0;
      var listener = listeners[i];
      args = args || [];
      // once stuff
      var onceListeners = this._onceEvents && this._onceEvents[eventName];

      while (listener) {
        var isOnce = onceListeners && onceListeners[listener];
        if (isOnce) {
          // remove listener
          // remove before trigger to prevent recursion
          this.off(eventName, listener);
          // unset once flag
          delete onceListeners[listener];
        }
        // trigger listener
        listener.apply(this, args);
        // get next listener
        i += isOnce ? 0 : 1;
        listener = listeners[i];
      }

      return this;
    };

    return EvEmitter;

  }));

  /*!
   * Unipointer v2.1.0
   * base class for doing one thing with pointer event
   * MIT license
   */

  /*jshint browser: true, undef: true, unused: true, strict: true */

  (function(window, factory) {
    // universal module definition
    /* jshint strict: false */
    /*global define, module, require */
    if (window.PT_OVERLAY_MAP) { //弹出热图用
      window.PT_OVERLAY_MAP.Unipointer = factory(
        window,
        window.PT_OVERLAY_MAP.EvEmitter
      );
    } else if (typeof define == 'function' && define.amd) {
      // AMD
      define('unipointer/unipointer', [
        'ev-emitter/ev-emitter'
      ], function(EvEmitter) {
        return factory(window, EvEmitter);
      });
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS
      module.exports = factory(
        window,
        require('ev-emitter')
      );
    } else {
      // browser global
      window.Unipointer = factory(
        window,
        window.EvEmitter
      );
    }

  }(window, function factory(window, EvEmitter) {


    function noop() {}

    function Unipointer() {}

    // inherit EvEmitter
    var proto = Unipointer.prototype = Object.create(EvEmitter.prototype);

    proto.bindStartEvent = function(elem) {
      this._bindStartEvent(elem, true);
    };

    proto.unbindStartEvent = function(elem) {
      this._bindStartEvent(elem, false);
    };

    /**
     * works as unbinder, as you can ._bindStart( false ) to unbind
     * @param {Boolean} isBind - will unbind if falsey
     */
    proto._bindStartEvent = function(elem, isBind) {
      // munge isBind, default to true
      isBind = isBind === undefined ? true : !!isBind;
      var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';

      if (window.navigator.pointerEnabled) {
        // W3C Pointer Events, IE11. See https://coderwall.com/p/mfreca
        elem[bindMethod]('pointerdown', this);
      } else if (window.navigator.msPointerEnabled) {
        // IE10 Pointer Events
        elem[bindMethod]('MSPointerDown', this);
      } else {
        // listen for both, for devices like Chrome Pixel
        elem[bindMethod]('mousedown', this);
        elem[bindMethod]('touchstart', this);
      }
    };

    // trigger handler methods for events
    proto.handleEvent = function(event) {
      var method = 'on' + event.type;
      if (this[method]) {
        this[method](event);
      }
    };

    // returns the touch that we're keeping track of
    proto.getTouch = function(touches) {
      for (var i = 0; i < touches.length; i++) {
        var touch = touches[i];
        if (touch.identifier == this.pointerIdentifier) {
          return touch;
        }
      }
    };

    // ----- start event ----- //

    proto.onmousedown = function(event) {
      // dismiss clicks from right or middle buttons
      var button = event.button;
      if (button && (button !== 0 && button !== 1)) {
        return;
      }
      this._pointerDown(event, event);
    };

    proto.ontouchstart = function(event) {
      this._pointerDown(event, event.changedTouches[0]);
    };

    proto.onMSPointerDown =
      proto.onpointerdown = function(event) {
        this._pointerDown(event, event);
      };

    /**
     * pointer start
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    proto._pointerDown = function(event, pointer) {
      // dismiss other pointers
      if (this.isPointerDown) {
        return;
      }

      this.isPointerDown = true;
      // save pointer identifier to match up touch events
      this.pointerIdentifier = pointer.pointerId !== undefined ?
        // pointerId for pointer events, touch.indentifier for touch events
        pointer.pointerId : pointer.identifier;

      this.pointerDown(event, pointer);
    };

    proto.pointerDown = function(event, pointer) {
      this._bindPostStartEvents(event);
      this.emitEvent('pointerDown', [event, pointer]);
    };

    // hash of events to be bound after start event
    var postStartEvents = {
      mousedown: ['mousemove', 'mouseup'],
      touchstart: ['touchmove', 'touchend', 'touchcancel'],
      pointerdown: ['pointermove', 'pointerup', 'pointercancel'],
      MSPointerDown: ['MSPointerMove', 'MSPointerUp', 'MSPointerCancel']
    };

    proto._bindPostStartEvents = function(event) {
      if (!event) {
        return;
      }
      // get proper events to match start event
      var events = postStartEvents[event.type];
      // bind events to node
      events.forEach(function(eventName) {
        window.addEventListener(eventName, this);
      }, this);
      // save these arguments
      this._boundPointerEvents = events;
    };

    proto._unbindPostStartEvents = function() {
      // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
      if (!this._boundPointerEvents) {
        return;
      }
      this._boundPointerEvents.forEach(function(eventName) {
        window.removeEventListener(eventName, this);
      }, this);

      delete this._boundPointerEvents;
    };

    // ----- move event ----- //

    proto.onmousemove = function(event) {
      this._pointerMove(event, event);
    };

    proto.onMSPointerMove =
      proto.onpointermove = function(event) {
        if (event.pointerId == this.pointerIdentifier) {
          this._pointerMove(event, event);
        }
      };

    proto.ontouchmove = function(event) {
      var touch = this.getTouch(event.changedTouches);
      if (touch) {
        this._pointerMove(event, touch);
      }
    };

    /**
     * pointer move
     * @param {Event} event
     * @param {Event or Touch} pointer
     * @private
     */
    proto._pointerMove = function(event, pointer) {
      this.pointerMove(event, pointer);
    };

    // public
    proto.pointerMove = function(event, pointer) {
      this.emitEvent('pointerMove', [event, pointer]);
    };

    // ----- end event ----- //


    proto.onmouseup = function(event) {
      this._pointerUp(event, event);
    };

    proto.onMSPointerUp =
      proto.onpointerup = function(event) {
        if (event.pointerId == this.pointerIdentifier) {
          this._pointerUp(event, event);
        }
      };

    proto.ontouchend = function(event) {
      var touch = this.getTouch(event.changedTouches);
      if (touch) {
        this._pointerUp(event, touch);
      }
    };

    /**
     * pointer up
     * @param {Event} event
     * @param {Event or Touch} pointer
     * @private
     */
    proto._pointerUp = function(event, pointer) {
      this._pointerDone();
      this.pointerUp(event, pointer);
    };

    // public
    proto.pointerUp = function(event, pointer) {
      this.emitEvent('pointerUp', [event, pointer]);
    };

    // ----- pointer done ----- //

    // triggered on pointer up & pointer cancel
    proto._pointerDone = function() {
      // reset properties
      this.isPointerDown = false;
      delete this.pointerIdentifier;
      // remove events
      this._unbindPostStartEvents();
      this.pointerDone();
    };

    proto.pointerDone = noop;

    // ----- pointer cancel ----- //

    proto.onMSPointerCancel =
      proto.onpointercancel = function(event) {
        if (event.pointerId == this.pointerIdentifier) {
          this._pointerCancel(event, event);
        }
      };

    proto.ontouchcancel = function(event) {
      var touch = this.getTouch(event.changedTouches);
      if (touch) {
        this._pointerCancel(event, touch);
      }
    };

    /**
     * pointer cancel
     * @param {Event} event
     * @param {Event or Touch} pointer
     * @private
     */
    proto._pointerCancel = function(event, pointer) {
      this._pointerDone();
      this.pointerCancel(event, pointer);
    };

    // public
    proto.pointerCancel = function(event, pointer) {
      this.emitEvent('pointerCancel', [event, pointer]);
    };

    // -----  ----- //

    // utility function for getting x/y coords from event
    Unipointer.getPointerPoint = function(pointer) {
      return {
        x: pointer.pageX,
        y: pointer.pageY
      };
    };

    // -----  ----- //

    return Unipointer;

  }));

  /*!
   * Unidragger v2.1.0
   * Draggable base class
   * MIT license
   */

  /*jshint browser: true, unused: true, undef: true, strict: true */

  (function(window, factory) {
    // universal module definition
    /*jshint strict: false */
    /*globals define, module, require */
    if (window.PT_OVERLAY_MAP) { //弹出热图用
      window.PT_OVERLAY_MAP.Unidragger = factory(
        window,
        window.PT_OVERLAY_MAP.Unipointer
      );
    } else if (typeof define == 'function' && define.amd) {
      // AMD
      define('unidragger/unidragger', [
        'unipointer/unipointer'
      ], function(Unipointer) {
        return factory(window, Unipointer);
      });
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS
      module.exports = factory(
        window,
        require('unipointer')
      );
    } else {
      // browser global
      window.Unidragger = factory(
        window,
        window.Unipointer
      );
    }

  }(window, function factory(window, Unipointer) {



    // -----  ----- //

    function noop() {}

    // -------------------------- Unidragger -------------------------- //

    function Unidragger() {}

    // inherit Unipointer & EvEmitter
    var proto = Unidragger.prototype = Object.create(Unipointer.prototype);

    // ----- bind start ----- //

    proto.bindHandles = function() {
      this._bindHandles(true);
    };

    proto.unbindHandles = function() {
      this._bindHandles(false);
    };

    var navigator = window.navigator;
    /**
     * works as unbinder, as you can .bindHandles( false ) to unbind
     * @param {Boolean} isBind - will unbind if falsey
     */
    proto._bindHandles = function(isBind) {
      // munge isBind, default to true
      isBind = isBind === undefined ? true : !!isBind;
      // extra bind logic
      var binderExtra;
      if (navigator.pointerEnabled) {
        binderExtra = function(handle) {
          // disable scrolling on the element
          handle.style.touchAction = isBind ? 'none' : '';
        };
      } else if (navigator.msPointerEnabled) {
        binderExtra = function(handle) {
          // disable scrolling on the element
          handle.style.msTouchAction = isBind ? 'none' : '';
        };
      } else {
        binderExtra = noop;
      }
      // bind each handle
      var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';
      for (var i = 0; i < this.handles.length; i++) {
        var handle = this.handles[i];
        this._bindStartEvent(handle, isBind);
        binderExtra(handle);
        handle[bindMethod]('click', this);
      }
    };

    // ----- start event ----- //

    /**
     * pointer start
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    proto.pointerDown = function(event, pointer) {
      // dismiss range sliders
      if (event.target.nodeName == 'INPUT' && event.target.type == 'range') {
        // reset pointerDown logic
        this.isPointerDown = false;
        delete this.pointerIdentifier;
        return;
      }

      this._dragPointerDown(event, pointer);
      // kludge to blur focused inputs in dragger
      var focused = document.activeElement;
      if (focused && focused.blur) {
        focused.blur();
      }
      // bind move and end events
      this._bindPostStartEvents(event);
      this.emitEvent('pointerDown', [event, pointer]);
    };

    // base pointer down logic
    proto._dragPointerDown = function(event, pointer) {
      // track to see when dragging starts
      this.pointerDownPoint = Unipointer.getPointerPoint(pointer);

      var canPreventDefault = this.canPreventDefaultOnPointerDown(event, pointer);
      if (canPreventDefault) {
        event.preventDefault();
      }
    };

    // overwriteable method so Flickity can prevent for scrolling
    proto.canPreventDefaultOnPointerDown = function(event) {
      // prevent default, unless touchstart or <select>
      return event.target.nodeName != 'SELECT';
    };

    // ----- move event ----- //

    /**
     * drag move
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    proto.pointerMove = function(event, pointer) {
      var moveVector = this._dragPointerMove(event, pointer);
      this.emitEvent('pointerMove', [event, pointer, moveVector]);
      this._dragMove(event, pointer, moveVector);
    };

    // base pointer move logic
    proto._dragPointerMove = function(event, pointer) {
      var movePoint = Unipointer.getPointerPoint(pointer);
      var moveVector = {
        x: movePoint.x - this.pointerDownPoint.x,
        y: movePoint.y - this.pointerDownPoint.y
      };
      // start drag if pointer has moved far enough to start drag
      if (!this.isDragging && this.hasDragStarted(moveVector)) {
        this._dragStart(event, pointer);
      }
      return moveVector;
    };

    // condition if pointer has moved far enough to start drag
    proto.hasDragStarted = function(moveVector) {
      return Math.abs(moveVector.x) > 3 || Math.abs(moveVector.y) > 3;
    };


    // ----- end event ----- //

    /**
     * pointer up
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    proto.pointerUp = function(event, pointer) {
      this.emitEvent('pointerUp', [event, pointer]);
      this._dragPointerUp(event, pointer);
    };

    proto._dragPointerUp = function(event, pointer) {
      if (this.isDragging) {
        this._dragEnd(event, pointer);
      } else {
        // pointer didn't move enough for drag to start
        this._staticClick(event, pointer);
      }
    };

    // -------------------------- drag -------------------------- //

    // dragStart
    proto._dragStart = function(event, pointer) {
      this.isDragging = true;
      this.dragStartPoint = Unipointer.getPointerPoint(pointer);
      // prevent clicks
      this.isPreventingClicks = true;

      this.dragStart(event, pointer);
    };

    proto.dragStart = function(event, pointer) {
      this.emitEvent('dragStart', [event, pointer]);
    };

    // dragMove
    proto._dragMove = function(event, pointer, moveVector) {
      // do not drag if not dragging yet
      if (!this.isDragging) {
        return;
      }

      this.dragMove(event, pointer, moveVector);
    };

    proto.dragMove = function(event, pointer, moveVector) {
      event.preventDefault();
      this.emitEvent('dragMove', [event, pointer, moveVector]);
    };

    // dragEnd
    proto._dragEnd = function(event, pointer) {
      // set flags
      this.isDragging = false;
      // re-enable clicking async
      setTimeout(function() {
        delete this.isPreventingClicks;
      }.bind(this));

      this.dragEnd(event, pointer);
    };

    proto.dragEnd = function(event, pointer) {
      this.emitEvent('dragEnd', [event, pointer]);
    };

    // ----- onclick ----- //

    // handle all clicks and prevent clicks when dragging
    proto.onclick = function(event) {
      if (this.isPreventingClicks) {
        event.preventDefault();
      }
    };

    // ----- staticClick ----- //

    // triggered after pointer down & up with no/tiny movement
    proto._staticClick = function(event, pointer) {
      // ignore emulated mouse up clicks
      if (this.isIgnoringMouseUp && event.type == 'mouseup') {
        return;
      }

      // allow click in <input>s and <textarea>s
      var nodeName = event.target.nodeName;
      if (nodeName == 'INPUT' || nodeName == 'TEXTAREA') {
        event.target.focus();
      }
      this.staticClick(event, pointer);

      // set flag for emulated clicks 300ms after touchend
      if (event.type != 'mouseup') {
        this.isIgnoringMouseUp = true;
        // reset flag after 300ms
        setTimeout(function() {
          delete this.isIgnoringMouseUp;
        }.bind(this), 400);
      }
    };

    proto.staticClick = function(event, pointer) {
      this.emitEvent('staticClick', [event, pointer]);
    };

    // ----- utils ----- //

    Unidragger.getPointerPoint = Unipointer.getPointerPoint;

    // -----  ----- //

    return Unidragger;

  }));

  /*!
   * Draggabilly v2.1.0
   * Make that shiz draggable
   * http://draggabilly.desandro.com
   * MIT license
   */

  /*jshint browser: true, strict: true, undef: true, unused: true */

  (function(window, factory) {
    // universal module definition
    /* jshint strict: false */
    /*globals define, module, require */
    if (window.PT_OVERLAY_MAP) { //弹出热图用
      window.PT_OVERLAY_MAP.Draggabilly = factory(
        window,
        window.PT_OVERLAY_MAP.getSize,
        window.PT_OVERLAY_MAP.Unidragger
      );
    } else if (typeof define == 'function' && define.amd) {
      // AMD
      define([
          'get-size/get-size',
          'unidragger/unidragger'
        ],
        function(getSize, Unidragger) {
          return factory(window, getSize, Unidragger);
        });
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS
      module.exports = factory(
        window,
        require('get-size'),
        require('unidragger')
      );
    } else {
      // browser global
      window.Draggabilly = factory(
        window,
        window.getSize,
        window.Unidragger
      );
    }

  }(window, function factory(window, getSize, Unidragger) {



    // vars
    var document = window.document;

    function noop() {}

    // -------------------------- helpers -------------------------- //

    // extend objects
    function extend(a, b) {
      for (var prop in b) {
        a[prop] = b[prop];
      }
      return a;
    }

    function isElement(obj) {
      return obj instanceof HTMLElement;
    }

    // -------------------------- requestAnimationFrame -------------------------- //

    // get rAF, prefixed, if present
    var requestAnimationFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

    // fallback to setTimeout
    var lastTime = 0;
    if (!requestAnimationFrame) {
      requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = setTimeout(callback, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    // -------------------------- support -------------------------- //

    var docElem = document.documentElement;
    var transformProperty = typeof docElem.style.transform == 'string' ?
      'transform' : 'WebkitTransform';

    var jQuery = window.jQuery;

    // --------------------------  -------------------------- //

    function Draggabilly(element, options) {
      // querySelector if string
      this.element = typeof element == 'string' ?
        document.querySelector(element) : element;

      if (jQuery) {
        this.$element = jQuery(this.element);
      }

      // options
      this.options = extend({}, this.constructor.defaults);
      this.option(options);

      this._create();
    }

    // inherit Unidragger methods
    var proto = Draggabilly.prototype = Object.create(Unidragger.prototype);

    Draggabilly.defaults = {};

    /**
     * set options
     * @param {Object} opts
     */
    proto.option = function(opts) {
      extend(this.options, opts);
    };

    proto._create = function() {

      // properties
      this.position = {};
      this._getPosition();

      this.startPoint = {
        x: 0,
        y: 0
      };
      this.dragPoint = {
        x: 0,
        y: 0
      };

      this.startPosition = extend({}, this.position);

      // set relative positioning
      var style = getComputedStyle(this.element);
      if (style.position != 'relative' && style.position != 'absolute') {
        this.element.style.position = 'relative';
      }

      this.enable();
      this.setHandles();

    };

    /**
     * set this.handles and bind start events to 'em
     */
    proto.setHandles = function() {
      this.handles = this.options.handle ?
        this.element.querySelectorAll(this.options.handle) : [this.element];

      this.bindHandles();
    };

    /**
     * emits events via EvEmitter and jQuery events
     * @param {String} type - name of event
     * @param {Event} event - original event
     * @param {Array} args - extra arguments
     */
    proto.dispatchEvent = function(type, event, args) {
      var emitArgs = [event].concat(args);
      this.emitEvent(type, emitArgs);
      var jQuery = window.jQuery;
      // trigger jQuery event
      if (jQuery && this.$element) {
        if (event) {
          // create jQuery event
          var $event = jQuery.Event(event);
          $event.type = type;
          this.$element.trigger($event, args);
        } else {
          // just trigger with type if no event available
          this.$element.trigger(type, args);
        }
      }
    };

    // -------------------------- position -------------------------- //

    // get x/y position from style
    Draggabilly.prototype._getPosition = function() {
      var style = getComputedStyle(this.element);
      var x = this._getPositionCoord(style.left, 'width');
      var y = this._getPositionCoord(style.top, 'height');
      // clean up 'auto' or other non-integer values
      this.position.x = isNaN(x) ? 0 : x;
      this.position.y = isNaN(y) ? 0 : y;

      this._addTransformPosition(style);
    };

    Draggabilly.prototype._getPositionCoord = function(styleSide, measure) {
      if (styleSide.indexOf('%') != -1) {
        // convert percent into pixel for Safari, #75
        var parentSize = getSize(this.element.parentNode);
        return (parseFloat(styleSide) / 100) * parentSize[measure];
      }

      return parseInt(styleSide, 10);
    };

    // add transform: translate( x, y ) to position
    proto._addTransformPosition = function(style) {
      var transform = style[transformProperty];
      // bail out if value is 'none'
      if (transform.indexOf('matrix') !== 0) {
        return;
      }
      // split matrix(1, 0, 0, 1, x, y)
      var matrixValues = transform.split(',');
      // translate X value is in 12th or 4th position
      var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
      var translateX = parseInt(matrixValues[xIndex], 10);
      // translate Y value is in 13th or 5th position
      var translateY = parseInt(matrixValues[xIndex + 1], 10);
      this.position.x += translateX;
      this.position.y += translateY;
    };

    // -------------------------- events -------------------------- //

    /**
     * pointer start
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    proto.pointerDown = function(event, pointer) {
      this._dragPointerDown(event, pointer);
      // kludge to blur focused inputs in dragger
      var focused = document.activeElement;
      // do not blur body for IE10, metafizzy/flickity#117
      if (focused && focused.blur && focused != document.body) {
        focused.blur();
      }
      // bind move and end events
      this._bindPostStartEvents(event);
      this.element.classList.add('is-pointer-down');
      this.dispatchEvent('pointerDown', event, [pointer]);
    };

    /**
     * drag move
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    proto.pointerMove = function(event, pointer) {
      var moveVector = this._dragPointerMove(event, pointer);
      this.dispatchEvent('pointerMove', event, [pointer, moveVector]);
      this._dragMove(event, pointer, moveVector);
    };

    /**
     * drag start
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    proto.dragStart = function(event, pointer) {
      if (!this.isEnabled) {
        return;
      }
      this._getPosition();
      this.measureContainment();
      // position _when_ drag began
      this.startPosition.x = this.position.x;
      this.startPosition.y = this.position.y;
      // reset left/top style
      this.setLeftTop();

      this.dragPoint.x = 0;
      this.dragPoint.y = 0;

      this.element.classList.add('is-dragging');
      this.dispatchEvent('dragStart', event, [pointer]);
      // start animation
      this.animate();
    };

    proto.measureContainment = function() {
      var containment = this.options.containment;
      if (!containment) {
        return;
      }

      // use element if element
      var container = isElement(containment) ? containment :
        // fallback to querySelector if string
        typeof containment == 'string' ? document.querySelector(containment) :
        // otherwise just `true`, use the parent
        this.element.parentNode;

      var elemSize = getSize(this.element);
      var containerSize = getSize(container);
      var elemRect = this.element.getBoundingClientRect();
      var containerRect = container.getBoundingClientRect();

      var borderSizeX = containerSize.borderLeftWidth + containerSize.borderRightWidth;
      var borderSizeY = containerSize.borderTopWidth + containerSize.borderBottomWidth;

      var position = this.relativeStartPosition = {
        x: elemRect.left - (containerRect.left + containerSize.borderLeftWidth),
        y: elemRect.top - (containerRect.top + containerSize.borderTopWidth)
      };

      this.containSize = {
        width: (containerSize.width - borderSizeX) - position.x - elemSize.width,
        height: (containerSize.height - borderSizeY) - position.y - elemSize.height
      };
    };

    // ----- move event ----- //

    /**
     * drag move
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    proto.dragMove = function(event, pointer, moveVector) {
      if (!this.isEnabled) {
        return;
      }
      var dragX = moveVector.x;
      var dragY = moveVector.y;

      var grid = this.options.grid;
      var gridX = grid && grid[0];
      var gridY = grid && grid[1];

      dragX = applyGrid(dragX, gridX);
      dragY = applyGrid(dragY, gridY);

      dragX = this.containDrag('x', dragX, gridX);
      dragY = this.containDrag('y', dragY, gridY);

      // constrain to axis
      dragX = this.options.axis == 'y' ? 0 : dragX;
      dragY = this.options.axis == 'x' ? 0 : dragY;

      this.position.x = this.startPosition.x + dragX;
      this.position.y = this.startPosition.y + dragY;
      // set dragPoint properties
      this.dragPoint.x = dragX;
      this.dragPoint.y = dragY;

      this.dispatchEvent('dragMove', event, [pointer, moveVector]);
    };

    function applyGrid(value, grid, method) {
      method = method || 'round';
      return grid ? Math[method](value / grid) * grid : value;
    }

    proto.containDrag = function(axis, drag, grid) {
      if (!this.options.containment) {
        return drag;
      }
      var measure = axis == 'x' ? 'width' : 'height';

      var rel = this.relativeStartPosition[axis];
      var min = applyGrid(-rel, grid, 'ceil');
      var max = this.containSize[measure];
      max = applyGrid(max, grid, 'floor');
      return Math.min(max, Math.max(min, drag));
    };

    // ----- end event ----- //

    /**
     * pointer up
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    proto.pointerUp = function(event, pointer) {
      this.element.classList.remove('is-pointer-down');
      this.dispatchEvent('pointerUp', event, [pointer]);
      this._dragPointerUp(event, pointer);
    };

    /**
     * drag end
     * @param {Event} event
     * @param {Event or Touch} pointer
     */
    proto.dragEnd = function(event, pointer) {
      if (!this.isEnabled) {
        return;
      }
      // use top left position when complete
      if (transformProperty) {
        this.element.style[transformProperty] = '';
        this.setLeftTop();
      }
      this.element.classList.remove('is-dragging');
      this.dispatchEvent('dragEnd', event, [pointer]);
    };

    // -------------------------- animation -------------------------- //

    proto.animate = function() {
      // only render and animate if dragging
      if (!this.isDragging) {
        return;
      }

      this.positionDrag();

      var _this = this;
      requestAnimationFrame(function animateFrame() {
        _this.animate();
      });

    };

    // left/top positioning
    proto.setLeftTop = function() {
      this.element.style.left = this.position.x + 'px';
      this.element.style.top = this.position.y + 'px';
    };

    proto.positionDrag = function() {
      this.element.style[transformProperty] = 'translate3d( ' + this.dragPoint.x +
        'px, ' + this.dragPoint.y + 'px, 0)';
    };

    // ----- staticClick ----- //

    proto.staticClick = function(event, pointer) {
      this.dispatchEvent('staticClick', event, [pointer]);
    };

    // ----- methods ----- //

    proto.enable = function() {
      this.isEnabled = true;
    };

    proto.disable = function() {
      this.isEnabled = false;
      if (this.isDragging) {
        this.dragEnd();
      }
    };

    proto.destroy = function() {
      this.disable();
      // reset styles
      this.element.style[transformProperty] = '';
      this.element.style.left = '';
      this.element.style.top = '';
      this.element.style.position = '';
      // unbind handles
      this.unbindHandles();
      // remove jQuery data
      if (this.$element) {
        this.$element.removeData('draggabilly');
      }
    };

    // ----- jQuery bridget ----- //

    // required for jQuery bridget
    proto._init = noop;

    if (jQuery && jQuery.bridget) {
      jQuery.bridget('draggabilly', Draggabilly);
    }

    // -----  ----- //

    return Draggabilly;

  }));
  /**
   * Created by yongsheng.kuang on 2016/1/25.
   */

  (function(window, $, undefined) {
    //grunt-replace-data-api-url-start // 切记: 不可以修改, grunt命令自动修改路径
    var frontend_commonjs = "tzquery1.ptmind.cn"; // 测试用
    //grunt-replace-data-api-url-end

    var reqProtocol = ("https:" == document.location.protocol) ? "https://" : "http://";
    var httpDomainPro = reqProtocol + frontend_commonjs + '/d?jsonp=?&data=';
    //终端设备信息
    var terminalInfos = {
      "All": {
        CSVname: "All",
        pageOrientations: ['A'],
        defaultPageOrientation: 'A'
      },
      "PC": {
        CSVname: "PC",
        pageOrientations: ['A'],
        defaultPageOrientation: 'A',
        filterparam: {
          "name": "dt",
          "op": "include",
          "value": "2",
          "flag": 0
        },
        currentResolution: {
          width: 1024,
          height: 768
        },
        horizontalOrVertical: "all",
        currentUA: "Mozilla/5.0 (compatible; MSIE 10.0, Windows NT 6.2; Trident/6.0)",
        currentUAType: 1
      },
      "Smartphone": {
        CSVname: "Smartphone",
        pageOrientations: ['V', 'H'],
        defaultPageOrientation: 'V',
        filterparam: {
          "name": "dt",
          "op": "include",
          "value": "1",
          "flag": 0
        },
        currentResolution: {
          width: 320,
          height: 480
        },
        currentUA: "Mozilla/5.0 (Linux; U; Android 2.3; en-us) AppleWebKit/999+ (KHTML, like Gecko) Safari/999.9",
        //if(sid == 2709 || sid == 3041 || sid == 3111){
        //    currentUA = "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5";
        //}
        //if(sid == 619){
        //    currentUA = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)";
        //}//@todo 特殊应对
        currentUAType: 2
      },
      "Tablet": {
        CSVname: "Tablet",
        pageOrientations: ['H', 'V'],
        defaultPageOrientation: 'H',
        filterparam: {
          "name": "dt",
          "op": "include",
          "value": "4",
          "flag": 0
        },
        currentResolution: {
          width: 768,
          height: 1024
        },
        currentUA: "Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10",
        currentUAType: 3
      },
      "Other": {
        CSVname: "Other",
        pageOrientations: ['A'],
        defaultPageOrientation: 'A',
        filterparam: {
          "name": "dt",
          "op": "include",
          "value": "0,!~3",
          "flag": 0
        },
        currentResolution: {
          width: 1024,
          height: 768
        },
        horizontalOrVertical: "all",
        currentUA: "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)",
        currentUAType: 1
      }
    };
    //各种分辨率
    var terminalSize = {
      "PC": {
        "A": {
          width: 1024,
          height: 768
        }
      },
      "Smartphone": {
        "H": {
          width: 480,
          height: 320
        },
        "V": {
          width: 320,
          height: 480
        }
      },
      "Tablet": {
        "H": {
          width: 1024,
          height: 768
        },
        "V": {
          width: 768,
          height: 1024
        }
      },
      "Other": {
        "A": {
          width: 1024,
          height: 768
        }
      }
    };

    var tldjs; //获取网页domain的组建:只在系统内有效,在弹出热图和分享时,无效

    /**
     * 热图数据中新组建
     * @param isBattle 是否对比
     * @param getTargetDocument 获取热图底图的document 的方法
     * @param scope
     * @param state
     * @property _events:事件数组
     * @property _data:数据信息(热图数据,。。。)
     * @property _state:状态
     * @property _settings:高级设置
     * @constructor
     */
    function HeatmapCore(isBattle, getTargetDocument, scope, state) {
      var HeatmapCore = this;
      HeatmapCore.isBattle = isBattle;
      HeatmapCore.getTargetDocument = function() {
        var $targetDocument;
        try {
          $targetDocument = getTargetDocument();
        } catch (err) {
          HeatmapCore.setState('frameState', 'error');
        }
        return $targetDocument;
      };
      HeatmapCore._events = {};
      HeatmapCore._data = {
        map: {},
        timestamp: {}
      };
      HeatmapCore.scope = scope;
      HeatmapCore.state = state;
    }

    /**
     * 初始化dataCenter的配置信息,数据,状态,但是不清空 热图高级设置信息(_settings)
     * @property _config:配置信息
     *      terminalInfo:设备信息,
     *      maxPvTerminal:最大Vi的设备(terminal选择all的时候底图展示的terminal),
     *      pageOrientation:屏幕方向,
     *      mapType:热图类型,
     *      lastRequestTerminalParamString:请求terminal统计信息的请求字符串,
     *      colorRate:颜色条,
     *      display:展示的配置,
     *      scale:缩放比率,
     *      refreshPageFunction:刷新的function
     */
    HeatmapCore.prototype.init = function(config) {
      var HeatmapCore = this;
      var defaultConfig = {
        terminalInfo: undefined, //终端，参考terminalInfos
        pageOrientation: undefined, //屏幕方向，V,H
        colorRate: {}, //颜色条0-1之间
        display: {} //显示配置 readline，activeElement，noneActiveElement 参考 display/display.js
      };

      //terminalInfo:终端信息
      //pageOrientation:屏幕方向
      //colorRate:颜色条值
      //display:显示配置(是否显示 阅读线,交互元素,非交互元素)
      //refreshPageFunction:页面通知热图数据更新的function.
      //mapType:热图类型
      HeatmapCore._config = $.extend(defaultConfig, config);
      HeatmapCore._data = {
        map: {},
        timestamp: {}
      };
      HeatmapCore._state = {
        dataState: '', //空：默认状态，requesting：数据申请中，requested：数据加载完成
        frameState: '', //空：默认状态，loading：加载中，loaded：加载完成,error:加载iframe失败
      };

      //url，终端，过滤条件 的变更 需要重新申请数据
      if (HeatmapCore._config.refreshPageFunction) {
        HeatmapCore._config.refreshPageFunction(function() {
          //在热图数据发出申请之前 通知相关组件
          HeatmapCore._emit('refreshPageFunctionInvoked');

          HeatmapCore.requestTerminalInfo().then(function() {
            $.when(
              HeatmapCore._requestServerData({
                'ps_base_compare': HeatmapCore.getRequestParam('ps_base_compare')
              }),
              HeatmapCore._requestServerData({
                'ps_click_map': HeatmapCore.getRequestParam('ps_click_map')
              }),
              HeatmapCore._requestServerData({
                'ps_attention_map': HeatmapCore.getRequestParam('ps_attention_map')
              }),
              HeatmapCore._requestServerData({
                'click_element': HeatmapCore.getRequestParam('click_element')
              }),
              HeatmapCore._requestServerData({
                'ps_readline': HeatmapCore.getRequestParam('ps_readline')
              })
            ).done(function(compareData, clickData, attentionData, analysisData, readlineData) {
              HeatmapCore._data.map.baseCompare = compareData[0].base[0]; //{各种数据}//@todo data[0].base[1] 不知道是什么鬼
              HeatmapCore._data.map.click = clickData[0];
              HeatmapCore._data.map.attention = attentionData[0];
              HeatmapCore._data.map.analysis = analysisData[0]; //点击分布图的数据和点击热图的数据一样
              HeatmapCore._data.map.readline = readlineData[0];
              HeatmapCore.setState('dataState', 'requested');
            }).fail(function() {
              pt.loading('hide', $('.js-heatmap'));
            });
          });
          HeatmapCore.setState('dataState', 'requesting');
        });
      }
    };

    /**
     * 获取热图相关的数据
     * @param key [ps_terminal:终端统计信息，ps_base_compare:统计信息，ps_click_map:点击热图数据，ps_attention_map:注意力数据，click_element:点击分布图,ps_readline:阅读线数据]
     * @result 热图请求参数
     */
    HeatmapCore.prototype.getRequestParam = function(key) {
      var terminalInfo;
      var item = {
        token: pt.token
      }
      if (key === 'ps_click_map' || key === 'ps_attention_map' || key === 'click_element') {
        item.subitem = '10000';
        item.offset = 4;
        item.limit = 1024; //@todo 需要确认
      } else if (key === 'ps_readline') {
        item.subitem = '20';
      }
      if (key !== 'ps_terminal') {
        terminalInfo = this.getTerminalInfo();
      }
      var time, filter, parameter, range;
      if (!this.isBattle) {
        time = {
          starttime: pt.global.starttime,
          endtime: pt.global.endtime,
          timezone: pt.global.timezone,
          timestamp: 1348650055
        };

        filter = {};
        if (pt.global.filterparam) {
          filter = JSON.parse(pt.global.filterparam);
        }
        //获取的不是终端VI信息时，将终端信息添加到fastfilter中
        if (key !== 'ps_terminal') {
          if (!filter.fasterfilter) {
            filter.fasterfilter = [];
          }
          terminalInfo.filterparam && filter.fasterfilter.push(terminalInfo.filterparam);
        }
        range = {
          rangetype: pt.global.rangetype,
          sid: pt.global.sid,
          rangeparam: pt.global.rangeparam
        };
      } else {
        time = {
          starttime: pt.global.starttimecopy,
          endtime: pt.global.endtimecopy,
          timezone: pt.global.timezone,
          timestamp: 1348650055
        };

        filter = {};
        if (pt.global.filterparamcopy) {
          filter = JSON.parse(pt.global.filterparamcopy);
        }
        //获取的不是终端VI信息时，将终端信息添加到fastfilter中
        if (key !== 'ps_terminal') {
          if (!filter.fasterfilter) {
            filter.fasterfilter = [];
          }
          terminalInfo.filterparam && filter.fasterfilter.push(terminalInfo.filterparam);
        }
        range = {
          rangetype: pt.global.rangetypecopy,
          sid: pt.global.sid,
          rangeparam: pt.global.rangeparamcopy
        };
      }
      parameter = this.getParameter();
      //发起请求前
      parameter.merge.paramlist = parameter.merge.paramlist.map(function(p) {
        return encodeURIComponent(p);
      });
      var param = {
        item: item,
        time: time,
        filter: filter,
        parameter: parameter,
        range: range,
        epid: this.getOptimizely() ? this.getOptimizely().epid : '',
        vpid: this.getOptimizely() ? this.getOptimizely().vpid : ''
      };

      //页面组时 ,不需要合参和optimizely
      if (param.range.rangetype === 'group') {
        param.parameter = {
          merge: {
            url: '',
            paramlist: []
          }
        };
        param.epid = '';
        param.vpid = '';
      }
      return param;
    }

    /**
     * 主动通知dataCenter request 热图数据
     */
    HeatmapCore.prototype.requestData = function() {
      if (this._config.refreshPageFunction) {
        this._config.refreshPageFunction();
      }
    };

    /**
     * 热图请求java端代码
     * @param param 请求参数
     * @returns {Promise} 调用ajax后的 promise
     */
    HeatmapCore.prototype._requestServerData = function(param) {
      var HeatmapCore = this;
      //设置请求标记
      for (var key in param) {
        param[key].time.timestamp = (new Date()).getTime();
        HeatmapCore._data.timestamp[key] = param[key].time.timestamp;
      }
      var deferred = $.Deferred();
      $.ajax({
        url: httpDomainPro + encodeURIComponent(JSON.stringify(param)),
        dataType: "json",
        error: function(request, errorCode, obj) {
          //alert(errorCode);
        }
      }).then(function(data) {
        // 数据正常,且请求标记和返回的标记一直时才做处理
        if (data[0] && HeatmapCore._data.timestamp[data[0].fun] === data[0].timestamp) {
          deferred.resolve(data);
        }
      });
      return deferred.promise();
    };

    /**
     * 当DataCenter 内部发生变化时，可以在实例化 的对象中 注册对应的事件，在不同的调用对象中做相应的处理
     * 目前支持的事件有
     * @param names:event的名称，可以通过逗号，空格，或者分号隔开 来注册多个事件
     *      refreshPageFunctionInvoked: refreshPageFunction 方法被调用时的处理
     *      frameLoadReadyCheck:页面加载底图前的准备检查,如果有组件没有准备好,则不继续后续的处理
     *      dataStateChange:数据状态发生变化(requesting,requested)
     *      frameStateChange:frame 的页面状态发生变化(loading,loaded,error)
     *      slaveMapDataState:弹出热图/分享热图 数据状态变化(saving,saved)
     *      mapTypeChange:热图类型变化
     *      refresh:通知其他组件重新绘制
     *      colorRateChange:颜色条发生变化
     *      terminalInit:终端初始化
     *      terminalChange:终端变化
     *      pageOrientationChange:屏幕的纵横变化
     *      pageOrientationInit:屏幕的纵横初始化
     *      optimizelyChange:optimizely 变化
     *      parameterChange:合参信息变化
     *      activeElementChange:点击分布图焦点元素变更
     * @param callback:<Function>HeatmapCore 触发指定事件时的回调函数
     */
    HeatmapCore.prototype.on = function(names, callback) {
      var nameList = names.split(/[\,\s\;]/);
      var index = nameList.length;
      while (index) {
        index--;
        var name = nameList[index];
        if (!this._events[name]) {
          this._events[name] = [];
        }
        this._events[name].push(callback);
      }
    };
    HeatmapCore.prototype.off = function(name, callback) {
      if (!name) {
        this._events = {};
        return;
      }
      var event = this._events[name];
      if (!event) {
        return;
      }
      if (!callback) {
        delete this._events[name];
      } else {
        var length = event.length;
        while (length > 0) {
          length--;
          if (event[length] === callback) {
            event.splice(length, 1);
          }
        }
      }
    };
    HeatmapCore.prototype._emit = function(name, args) {
      var event = this._events[name];
      if (event) {
        var length = event.length;
        var i = 0;
        while (i < length) {
          event[i](args);
          i++;
        }
      }
    };

    /**
     * 是否准备好了页面加载
     * 通过heatmapCore 发布的时间 让需要的组件来通知heatmapCore是否已经准备好了加载热图页
     */
    HeatmapCore.prototype.isFrameLoadReady = function() {
      var isReady = true; //默认是准备好的
      this._emit('frameLoadReadyCheck', function(ready) {
        if (!ready) { //只要有一个组件没有准备好则说明没有准备好
          isReady = false;
        }
      });
      return isReady;
    };

    /**
     * 获取热图数据
     * @param mapType 指定的热图类型
     * @returns {*}
     */
    HeatmapCore.prototype.getMapData = function(mapType) {
      if (!mapType) {
        return this._data.map;
      } else {
        return this._data.map[mapType];
      }
    };

    //设置整个profile的高级设置信息
    HeatmapCore.prototype.setSettings = function(settings) {
      this._settings = settings;
    };

    //获取当前url的热图高级设置
    HeatmapCore.prototype.getHeatmapSetting = function() {
      var HeatmapCore = this;
      var setting;
      var slaveMapData = HeatmapCore.getSlaveMapData();
      if (slaveMapData) {
        setting = slaveMapData.setting;
      } else {
        var url = HeatmapCore.getHeatmapUrl().toLowerCase();
        var terminalCsvname = HeatmapCore.getMapTerminalInfo().CSVname.toLowerCase();
        var terminal = terminalCsvname === 'other' ? 'pc' : terminalCsvname; //其他的设备用pc替代
        var domain = tldjs.getDomain(url);
        var ua; //ua 设置
        var resolution; //分辨率设置
        var settings = HeatmapCore._settings;
        $.each(settings.data, function() {
          var domainSetting = this;
          var currentDomain = domainSetting.domain.toLowerCase().replace('https://', '').replace('http://', '');
          if (currentDomain === domain) {
            var terminalSetting = domainSetting.detail[terminal];
            var isMatch = false;
            //未开启subDomain时,认为是全域匹配
            if (terminalSetting.subDomain.defaultStatus == 0) {
              isMatch = true;
            } else {
              $.each(terminalSetting.subDomain.content, function() {
                var matchType = this.type; //0:包含,1:头匹配
                var matchUrl = this.url.toLowerCase();
                if (matchType === 0 && url.indexOf(matchUrl) > -1) { //包含
                  isMatch = true;
                } else {
                  //头匹配
                  if (url.indexOf(matchUrl) === 0) {
                    isMatch = true;
                  }
                  //移除协议后的头匹配
                  var removeProtocolUrl = url.replace('https://', '').replace('http://', '');
                  if (removeProtocolUrl.indexOf(matchUrl) === 0) {
                    isMatch = true;
                  }
                }
              });
            }

            if (isMatch) {
              ua = terminalSetting.ua.defaultStatus === 1 ? terminalSetting.ua.content : '';
              resolution = terminalSetting.resolution.defaultStatus === 1 ? terminalSetting.resolution.content : undefined;
            }
          }
        });

        ua = ua ? ua : settings.default[terminal].ua.content;
        resolution = resolution ? resolution : settings.default[terminal].resolution.content;
        setting = {
          ua: ua,
          resolution: resolution
        };
      }
      return setting;
    };

    /**
     * 获取当前屏幕方向的点击合计数
     * @returns {number}
     */
    HeatmapCore.prototype.getAllClick = function() {
      if (this._slaveMapData) { //弹出热图用
        return this._slaveMapData.clickCount;
      } else {
        var pageOrientation = this.getPageOrientation(); //屏幕方向
        var countData = this.getMapData('baseCompare');
        var clicks = 0;
        switch (pageOrientation) {
          case 'H':
            clicks = countData.nclick;
            break;
          case 'V':
            clicks = countData.pclick;
            break;
          default:
            clicks = countData.pclick + countData.nclick;
        }
        return clicks;
      }
    };

    HeatmapCore.prototype.getConfig = function(name) {
      if (name) {
        return this._config[name];
      } else {
        return this._config;
      }
    };
    HeatmapCore.prototype.setConfig = function(name, value) {
      if (name) {
        this._config[name] = value;
      } else {
        this._config = value;
      }
    };

    /**
     * dataState:数据状态, frameState:frame页面加载状态
     */
    HeatmapCore.prototype.getState = function(stateName) {
      return this._state[stateName];
    };
    HeatmapCore.prototype.setState = function(stateName, value) {
      this._state[stateName] = value;
      this._emit(stateName + 'Change', value);
    };

    HeatmapCore.prototype.getMapType = function() {
      return this._config.mapType;
    };

    HeatmapCore.prototype.initMapType = function(mapType) {
      this._config.mapType = mapType;
      this._emit('mapTypeInit', mapType);
    };
    HeatmapCore.prototype.setMapType = function(mapType) {
      this._config.mapType = mapType;
      this._emit('mapTypeChange', mapType);
    };

    /**
     * @deprecated 由于分析热图和点击分布列表是强关系，所以不通过heatmapCore 来触发事件
     */
    HeatmapCore.prototype.getActiveElement = function(selector) {
      return this._data.ativeElementSelector;
    };
    /**
     * @deprecated 由于分析热图和点击分布列表是强关系，所以不通过heatmapCore 来触发事件
     */
    HeatmapCore.prototype.setActiveElement = function(selector) {
      this._data.ativeElementSelector = selector;
      this._emit('activeElementChange', selector);
    };


    /**
     * 从服务器获取终端各种终端的点击信息,将最大pv的终端设置为默认终端,
     * 设置为默认终端 ==> 设置默认屏幕方向 ==> 申请数据 ==> 绘制热图
     */
    HeatmapCore.prototype.requestTerminalInfo = function() {
      var HeatmapCore = this;
      var defer = $.Deferred();
      var param = HeatmapCore.getRequestParam('ps_terminal');
      var requestTerminalParamString = JSON.stringify(param);
      //如果terminal的请求参数和上一次一致，则不再请求
      if (requestTerminalParamString != HeatmapCore._config.lastRequestTerminalParamString) {
        HeatmapCore._requestServerData({
            'ps_terminal': param
          })
          .then(function(data) {
            HeatmapCore._processTerminalData(data);
            defer.resolve();
          });
      } else {
        defer.resolve();
      }
      HeatmapCore._config.lastRequestTerminalParamString = requestTerminalParamString; //缓存上一次终端信息的查询条件
      return defer.promise();
    };

    HeatmapCore.prototype.getTerminalInfo = function() {
      return this._config.terminalInfo;
    };
    //获取热图底图的terminal
    HeatmapCore.prototype.getMapTerminalInfo = function() {
      var terminalName = this._config.terminalInfo.CSVname;
      var tmpTerminalInfo = this._config.terminalInfo;
      if (terminalName == 'All') { //数据terminal 为all 的时候，使用最大pv的terminal 作为底图terminal
        tmpTerminalInfo = this._config.maxPvTerminal ? terminalInfos[this._config.maxPvTerminal] : this._config.terminalInfo;
      }
      return tmpTerminalInfo;
    };

    HeatmapCore.prototype.initTerminalInfo = function(terminalName) {
      this._config.terminalInfo = terminalInfos[terminalName];
      this._emit('terminalInit');
    };
    HeatmapCore.prototype.setTerminalInfo = function(terminalName) {
      this._config.terminalInfo = terminalInfos[terminalName];
      this._emit('terminalChange');
    };
    HeatmapCore.prototype._processTerminalData = function(data) {
      var terminalVi = data[0]
      var pcVi = terminalVi.pc;
      var spVi = terminalVi.sp[0].spvi;
      var tlVi = terminalVi.tl[0].tlvi;
      var otherVi = terminalVi.other;
      var maxViTerminalName = '';
      switch (Math.max(pcVi, spVi, tlVi, otherVi)) {
        case pcVi:
          maxViTerminalName = 'PC';
          break;
        case spVi:
          maxViTerminalName = 'Smartphone';
          break;
        case tlVi:
          maxViTerminalName = 'Tablet';
          break;
        case otherVi:
          maxViTerminalName = 'Other';
          break;
        default:
          maxViTerminalName = 'PC';
          break;
      }
      //this._data.terminalVi = terminalVi;
      //this.setTerminalInfo(maxViTerminalName);

      this.setConfig('maxPvTerminal', maxViTerminalName);
      //首次设置terminal信息，需要初始化terminal 为all、
      if (!this.getTerminalInfo()) {
        this.initTerminalInfo(maxViTerminalName);
      }
    };

    HeatmapCore.prototype.getPageOrientation = function() {
      return this._config.pageOrientation;
    };
    /**
     * 初始化pageOrientation的默认值
     * @param pageOrientation
     */
    HeatmapCore.prototype.initPageOrientation = function(pageOrientation) {
      this._config.pageOrientation = pageOrientation;
      this._emit('pageOrientationInit'); //设备和屏幕方向初始化完成
    };
    /**
     * 终端不变的时候 设置pageOrientation
     * @param pageOrientation
     */
    HeatmapCore.prototype.setPageOrientation = function(pageOrientation) {
      this._config.pageOrientation = pageOrientation;
      this.requestData(); //通知DataCenter 刷新数据
      this._emit('pageOrientationChange'); //通知页面调整布局
    };
    /**
     * 获取当前设备，当前 PageOrientation 的宽度
     * @returns
     */
    HeatmapCore.prototype.getTerminalSize = function() {
      return terminalSize[this.getMapTerminalInfo().CSVname][this._config.pageOrientation];
    };

    HeatmapCore.prototype.getColorRate = function() {
      return this._config.colorRate[this.getMapType()];
    };
    HeatmapCore.prototype.initColorRate = function(colorRate) {
      this._config.colorRate[this.getMapType()] = colorRate;
    };
    HeatmapCore.prototype.setColorRate = function(colorRate) {
      this._config.colorRate[this.getMapType()] = colorRate;
      this._emit('colorRateChange');
    };

    HeatmapCore.prototype.initDisplay = function(display) {
      this._config.display[this.getMapType()] = display;
    };
    HeatmapCore.prototype.getDisplay = function() {
      return this._config.display[this.getMapType()];
    };
    HeatmapCore.prototype.setDisplay = function(display) {
      this._config.display[this.getMapType()] = display;
      this._emit('displayChange');
    };

    HeatmapCore.prototype.getOptimizely = function() {
      var optimizely;
      if (this._slaveMapData) {
        optimizely = this._slaveMapData.optimizely;
      } else {
        if (!this.isBattle) {
          optimizely = pt.global.optimizely;
        } else {
          optimizely = pt.global.optimizelycopy;
        }
      }
      return optimizely;
    };
    HeatmapCore.prototype.setOptimizely = function(opt) {
      if (!this.isBattle) {
        pt.global.optimizely = opt;
      } else {
        pt.global.optimizelycopy = opt;
      }
      this.requestData(); //通知DataCenter 刷新数据
      this._emit('optimizelyChange');
    };
    HeatmapCore.prototype.initOptimizely = function() {
      if (!this.isBattle) {
        pt.global.optimizely = '';
      } else {
        pt.global.optimizelycopy = '';
      }
      this._emit('optimizelyInit');
    };

    /**
     * 获取热图对应 页面的缩放比率
     * @param scale 缩放比率
     */
    HeatmapCore.prototype.getScale = function(scale) {
      return this._config.scale;
    };
    /**
     * 设置热图对应 页面的缩放比率
     * @param scale 缩放比率
     */
    HeatmapCore.prototype.setScale = function(scale) {
      this._config.scale = scale;
    };

    /**
     * 获取热图对应的page信息
     * @returns {string}
     * @private
     */
    HeatmapCore.prototype.getPasspage = function() {
      var passpage;
      var slaveMapData = this.getSlaveMapData();
      if (slaveMapData) {
        passpage = slaveMapData.passpage;
      } else {
        var isBattle = this.isBattle;
        if (!isBattle) {
          passpage = {
            url: pt.global.rangeurl,
            title: pt.global.rangetitle,
            pid: pt.global.rangeparam
          };
        } else { //对比热图的
          passpage = {
            url: pt.global.rangeurlcopy,
            title: pt.global.rangetitlecopy,
            pid: pt.global.rangeparamcopy
          };
        }
      }

      return passpage;
    };

    //获取当前热图的 rangetype (page/pagegroup)
    HeatmapCore.prototype.getRangetype = function() {
      var isBattle = this.isBattle;
      var rangetype;
      var slaveMapData = this.getSlaveMapData();
      if (slaveMapData) {
        rangetype = slaveMapData.rangetype;
      } else {
        if (!isBattle) {
          rangetype = pt.global.rangetype;
        } else {
          rangetype = pt.global.rangetypecopy;
        }
      }

      return rangetype;
    };

    /**
     * 获取页面组信息
     * @returns {{rangetype: *, pageGroupName: *, heatmapUrl: *, pid: *}}
     * @private
     */
    HeatmapCore.prototype.getPageGroupInfo = function() {
      var pageGroupInfo;
      var slaveMapData = this.getSlaveMapData();
      if (slaveMapData) {
        pageGroupInfo = slaveMapData.pageGroupInfo;
      } else {
        var isBattle = this.isBattle;
        if (!isBattle) {
          pageGroupInfo = {
            rangetype: pt.global.rangetype,
            pageGroupName: pt.global.rangegroupname,
            heatmapUrl: pt.global.groupheatmapurl,
            pid: pt.global.rangeparam
          }
        } else {
          pageGroupInfo = {
            rangetype: pt.global.rangetypecopy,
            pageGroupName: pt.global.rangegroupnamecopy,
            heatmapUrl: pt.global.groupheatmapurlcopy,
            pid: pt.global.rangeparamcopy
          }
        }
      }
      return pageGroupInfo;
    };

    /**
     * 获取合参信息
     * @returns {merge:{url:'',paramlist:[]}}
     */
    HeatmapCore.prototype.getParameter = function() {
      var parameter;
      var slaveMapData = this.getSlaveMapData();
      if (slaveMapData) {
        parameter = slaveMapData.parameter;
      } else {
        var isBattle = this.isBattle;
        if (!isBattle) {
          parameter = pt.global.parameter;
        } else {
          parameter = pt.global.parametercopy;
        }
      }
      return parameter ? parameter : {
        merge: {
          url: '',
          paramlist: []
        }
      };
    };
    /**
     * 设置合参信息
     * @param parameter
     */
    HeatmapCore.prototype.setParameter = function(parameter) {
      var isBattle = this.isBattle;
      if (!isBattle) {
        pt.global.parameter = parameter;
      } else {
        pt.global.parametercopy = parameter;
      }
      this._emit('parameterChange');
    };


    /**
     * 获取当天热图的url信息
     * @returns {*}
     */
    HeatmapCore.prototype.getHeatmapUrl = function() {
      var pageGroupInfo = this.getPageGroupInfo();
      var passpage = this.getPasspage();
      var url;
      if (this.getRangetype() === 'group') {
        url = pageGroupInfo.heatmapUrl;
      } else {
        url = passpage.url;
      }
      return url;
    };

    /**
     * 重新绘制热图
     */
    HeatmapCore.prototype.refresh = function() {
      if (this._state && this.getState('dataState') === 'requested' && this.getState('frameState') === 'loaded') {
        this._emit('refresh');
      }
    };

    /**
     * 弹出热图 初始化数据
     * @param data
     * @param key slave 热图的数据存储key
     */
    HeatmapCore.prototype.initSlaveMapData = function(data, key) {
      if (key) {
        this._slaveMapDataKey = key;
      }
      this._slaveMapData = {};
      this._config.scale = 1; //弹出热图和分享热图 不需要缩放


      this._state.dataState = 'requested';
      this._state.frameState = 'loaded';

      this._config.terminalInfo = terminalInfos[data.terminalName];
      this._config.maxPvTerminal = data.maxPvTerminal;
      this._config.pageOrientation = data.pageOrientation;
      this._config.mapType = data.mapType;
      this._data.map.readline = data.readline;

      this._slaveMapData.rangetype = data.rangetype;
      this._slaveMapData.scale = data.scale;
      this._slaveMapData.clickCount = data.clickCount;
      this._slaveMapData.containerSize = data.containerSize;
      this._slaveMapData.setting = data.setting;
      this._slaveMapData.uid = data.uid;
      this._slaveMapData.sid = data.sid;
      this._slaveMapData.siteid = data.siteid;
      this._slaveMapData.passpage = data.passpage;
      this._slaveMapData.pageGroupInfo = data.pageGroupInfo;
      this._slaveMapData.overlayUrl = data.overlayUrl;
      this._slaveMapData.optimizely = data.optimizely;

      switch (data.mapType) {
        case 'click':
          this._data.map.click = data.data;
          break;
        case 'attention':
          this._data.map.attention = data.data;
          break;
        case 'analysis':
          this._data.map.analysis = data.data;
          break;
      }
    };

    /**
     * 热图添加loading
     */
    HeatmapCore.prototype.addHeatmapLoading = function(target) {
      $(target).append(pt.loading('hide', $(target)).loading('', '', '', true));
    }
    /**
     * 获取弹出热图设置的数据
     * @returns {{}|*}
     */
    HeatmapCore.prototype.getSlaveMapData = function() {
      return this._slaveMapData;
    };
    //decodeURIComponent用来解码url以正常显示url地址的
    HeatmapCore.decodeURIComponent = function(val) {
      try {
        return decodeURIComponent(val);
      } catch (err) {
        return val;
      }
    };

    /**
     * 给一个数字字符串加上千位分位符
     * @param num       要分割的字符串
     * @param symbol    使用的分割符号 默认为逗号(,)
     * @returns {string}
     */
    HeatmapCore.toThousands = function(num, symbol) {
      symbol = symbol || ",";
      //分割小数点
      var tempArr = num.toString().split(".");

      tempArr[0] = tempArr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + symbol);
      return tempArr.join(".");
    };

    if (window.PT_OVERLAY_MAP) {
      window.PT_OVERLAY_MAP.HeatmapCore = HeatmapCore;
    } else {
      define(['tldjs'], function(pt_tldjs) {
        tldjs = pt_tldjs;
        return HeatmapCore;
      });
    }
  })(window, jQuery);


  /**
   * Created by yongsheng.kuang on 2016/1/22.
   */
  (function(window, $, undefined) {
    var Draggabilly;

    function ColorBar(element, heatmapCore) {
      var ColorBar = this;
      ColorBar._heatmapCore = heatmapCore;
      ColorBar.$element = $(element);
      ColorBar._$colorBarBack = ColorBar.$element.find('.js-color-bar-back');
      ColorBar._$colorBarFront = ColorBar.$element.find('.js-color-bar-front');
      ColorBar._$colorBarPointer = ColorBar.$element.find('.js-color-bar-pointer');

      var colorPoint = new Draggabilly(ColorBar._$colorBarPointer[0], {
        axis: 'x',
        containment: element
      });
      colorPoint.on('dragEnd', function() {
        var x = colorPoint.position.x;
        var barWidth = ColorBar._$colorBarBack.width();
        var value = x / barWidth;
        ColorBar.setValue(value);
      });
      ColorBar.$element.on('click', function(event) {
        if ($(event.target).is('.js-color-bar-pointer')) {
          return;
        }
        var barWidth = ColorBar._$colorBarBack.width();
        var x = event.clientX;
        var left = ColorBar._$colorBarBack.offset().left;
        var pointX = x - left;
        pointX = Math.min(pointX, barWidth);
        pointX = Math.max(pointX, 0);
        var value = pointX / barWidth;
        ColorBar.setValue(value);
      });
      heatmapCore.on('frameStateChange', function(frameState) {
        if (frameState === 'loaded') {
          ColorBar.refresh();
        }
      });
    }

    ColorBar.prototype.init = function() {
      var defaultColorRate = 1;
      var mapType = this._heatmapCore.getMapType();
      if (mapType === 'analysis') {
        defaultColorRate = 0;
        this.$element.addClass('pt-color-bar-right');
      } else {
        this.$element.removeClass('pt-color-bar-right');
      }
      var colorRate = this._heatmapCore.getColorRate(); //获取dataCenter中的colorRate
      this._value = colorRate ? colorRate : defaultColorRate;
      this._setValue(this._value);
      this._heatmapCore.initColorRate(this._value);
    };

    ColorBar.prototype._setValue = function(value) {
      this._value = value;
      var barWidth = this._$colorBarBack.width();
      this._$colorBarFront.css({
        width: barWidth * value
      });
      this._$colorBarPointer.css({
        left: barWidth * value
      });
    };

    //颜色条的大小变化后,需要刷新
    ColorBar.prototype.refresh = function() {
      this._setValue(this._value);
    };

    ColorBar.prototype.setValue = function(value) {
      this._setValue(value);
      this._heatmapCore.setColorRate(value)
    };
    if (window.PT_OVERLAY_MAP) {
      Draggabilly = window.PT_OVERLAY_MAP.Draggabilly;
      window.PT_OVERLAY_MAP.ColorBar = ColorBar;
    } else {
      define(['mod-draggabilly'], function(draggabilly) {
        Draggabilly = draggabilly;
        return ColorBar;
      });
    }
  })(window, jQuery);

  /**
   * Created by yongsheng.kuang on 2016/1/27.
   */
  (function(window, $, undefined) {
    var Draggabilly;

    function Composition(element, heatmapCore, selectActiveElementHandler, clearActiveElementHandler) {
      var Composition = this;
      Composition.$element = $(element);
      Composition._heatmapCore = heatmapCore;
      //todo 是否关闭了提示
      //if('是否关闭了提示'){
      //    Composition.$element.find('.js-guide-tips').removeClass('pt-hide');
      //}
      var hidelayerTag = 'data-pt-plugin-hidelayer-target-composition-' + (Composition._heatmapCore.isBattle ? 'left' : 'right');
      Composition.$element.find('[data-pt-plugin-hidelayer-target]').attr('data-pt-plugin-hidelayer-target', hidelayerTag);
      Composition.$element.find('[data-pt-plugin-hidelayer-target-composition]').attr(hidelayerTag, '');
      Composition.$element.addClass('pt-hide');
      Composition.$element.on('layerChange', function() {
        if (!Composition.$element.find('[data-pt-plugin-hidelayer-target]').is('.pt-plugin-hidelayer-show')) {
          Composition.$element.removeClass('active');
          Composition.$element.find('.js-composition-list').removeClass('active');
          clearActiveElementHandler();
        }
      });
      //todo 待确认
      Composition.$element.on('click', '.js-guide-close', function() {
        //Composition.$element.find('.js-guide-tips').addClass('pt-hide');
      });
      Composition.$element.on('click', '.js-composition-done', function() {
        Composition.$element.removeClass('active');
        Composition.$element.find('[data-pt-plugin-hidelayer-btn]').removeClass('data-pt-plugin-hidelayer-active');

        Composition.$element.find('.pt-plugin-hidelayer-show').removeClass('pt-plugin-hidelayer-show');
        Composition.$element.find('.js-composition-list').removeClass('active');
        clearActiveElementHandler();
      });
      Composition.$element.on('click', '.js-composition-list', function() {
        var $this = $(this);
        Composition.$element.addClass('active');
        $this.siblings().removeClass('active');
        $this.addClass('active');
        var selector = $this.attr('data-selector');
        selectActiveElementHandler(selector);
      });

      //todo 暂时修改为不可移动
      //var compositionList = new Draggabilly(Composition.$element.find('.js-heatmap-composition')[0], {
      //    //handle: '.js-composition-title',
      //    //grid: [ 20, 20 ],
      //    containment: Composition.$element.parents('.js-heatmap-main:first').find('.pt-heatmap-body')[0]
      //});
    }

    /**
     * 绘制点击分布图
     * @param data
     */
    Composition.prototype.render = function(data) {
      var Composition = this;
      Composition.$element.attr('list-status', 'empty');
      Composition.$element.removeClass('active');
      var $list = this.$element.find('.js-composition-content');
      $list.empty();
      //用rate 进行排序
      data = data.sort(function(a, b) {
        return b.rate - a.rate;
      });
      var length = data.length;

      $list.slimScroll({
        destroy: true
      });
      $list.css('height', '');

      var index = 0;
      while (index < length) {
        var elementClickInfo = data[index];
        var htmlArr = [
          '<li class="pt-composition-list js-composition-list" data-selector="' + elementClickInfo.selector + '">',
          //'    <span title="' + elementClickInfo.title + '">' + elementClickInfo.dom + '</span>',//不需要链接,只需要显示title即可
          '    <span title="' + Composition._heatmapCore.constructor.decodeURIComponent(elementClickInfo.title) + '">' + Composition._heatmapCore.constructor.decodeURIComponent(elementClickInfo.title) + '</span>',
          '    <span>' + elementClickInfo.nodeType + '</span>',
          '    <span>' + Composition._heatmapCore.constructor.toThousands(elementClickInfo.clickCount) + '</span>',
          '    <span>' + (elementClickInfo.rate * 100).toFixed(2) + '%</span>',
          '</li>'
        ];
        $list.append(htmlArr.join(''));
        index++;
      }
      if (length > 5) { //点击元素大于5个的时候显示滚动条
        $list.slimScroll({
          height: '140px', //滚动条高度
          color: '#e0e0e0',
          size: '4px', //滚动条宽度
          alwaysVisible: true //滚动条总是可见 不隐藏
        });
      }
      if (length) { //有数据的时候,如果active 的是提示无数据的tip 需要切换到列表
        this.$element.attr('list-status', 'list');
      } else { //没有数据的时候,如果active 的是提示列表  需要切换到无数据的tip
        this.$element.attr('list-status', 'empty');
      }
    };
    Composition.prototype.init = function() {
      this.$element.prev().removeClass('pt-hide'); //显示前一个 分割图标
      this.$element.removeClass('pt-hide');
      this.$element.removeClass('active');
      this.$element.find('.js-heatmap-composition,.js-heatmap-no-composition').css({
        top: '',
        left: ''
      }); //还原默认位置
    };
    Composition.prototype.clear = function() {
      this.$element.prev().addClass('pt-hide'); //隐藏前一个 分割图标
      this.$element.addClass('pt-hide');
      this.$element.removeClass('active');
      this.$element.attr('list-status', 'empty');
      var $list = this.$element.find('.js-composition-content');
      $list.empty();
    };

    if (window.PT_OVERLAY_MAP) {
      Draggabilly = window.PT_OVERLAY_MAP.Draggabilly;
      window.PT_OVERLAY_MAP.Composition = Composition;
    } else {
      define(['mod-draggabilly', 'slimscroll'], function(draggabilly) {
        Draggabilly = draggabilly;
        return Composition;
      });
    }
  })(window, jQuery);

  /**
   * Created by yongsheng.kuang on 2016/1/28.
   */
  (function(window, $, undefined) {
    var mapDisplayDic;
    var defaultDisplays = {
      click: {
        readline: true,
        showHide: false
      },
      attention: {
        readline: true
      },
      analysis: {
        activeElement: true,
        noneActiveElement: false
      }
    };

    function Display(element, heatmapCore) {
      var Display = this;
      Display.$element = $(element);
      Display._tag = !heatmapCore.isBattle ? 'left' : 'right';
      Display.$element.find('[data-pt-plugin-hidelayer-target]').attr('data-pt-plugin-hidelayer-target', 'data-pt-plugin-hidelayer-target-heatmap-display-' + Display._tag);
      Display.$element.find('.pt-dropdown-box').attr('data-pt-plugin-hidelayer-target-heatmap-display-' + Display._tag, '');
      var heatmap_readline = Display.$element.attr('data-i18n-heatmap-readline');
      var interactive_elements = Display.$element.attr('data-i18n-interactive-elements');
      var non_interactive_elements = Display.$element.attr('data-i18n-non_interactive-elements');
      var hideElement = Display.$element.attr('data-i18n-hide_element');
      mapDisplayDic = {
        click: [{
            value: 'readline',
            text: heatmap_readline
          },
          {
            value: 'showHide',
            text: hideElement
          }
        ],
        attention: [{
          value: 'readline',
          text: heatmap_readline
        }],
        analysis: [{
            value: 'activeElement',
            text: interactive_elements
          },
          {
            value: 'noneActiveElement',
            text: non_interactive_elements
          }
        ]
      };

      Display._heatmapCore = heatmapCore;
      Display.$element.on('change', '.js-heatmap-display-list input', function() {
        heatmapCore.setDisplay(Display._getDisplay());
      });


    }

    Display.prototype.init = function() {
      var mapType = this._heatmapCore.getMapType();
      var cacheDisplay = this._heatmapCore.getDisplay();
      var currentDisplay = cacheDisplay ? cacheDisplay : defaultDisplays[mapType];
      var displayDics = mapDisplayDic[mapType];
      this._heatmapCore.initDisplay(currentDisplay);

      var $list = this.$element.find('.js-heatmap-display-list');
      $list.empty();

      var length = displayDics.length;
      var index = 0;
      while (index < length) {
        var displayDic = displayDics[index];
        var isChecked = currentDisplay[displayDic.value];
        var checkString = isChecked ? 'checked="checked"' : '';

        $list.append(
          [
            '<li class="pt-dropdown-list" title="' + displayDic.text + '">',
            '    <span class="pt-checkbox-wrap">',
            '        <input data-value="' + displayDic.value + '" type="checkbox" class="pt-fl" ' + checkString + ' id="js-heatmap-display-' + this._tag + '-' + displayDic.value + '">',
            '        <label for="js-heatmap-display-' + this._tag + '-' + displayDic.value + '">' + displayDic.text + '</label>',
            '    </span>',
            '</li>'
          ].join('')
        );
        index++;
      }
    };

    Display.prototype._getDisplay = function() {
      var $list = this.$element.find('.js-heatmap-display-list');
      var display = {};
      $list.find('input').each(function() {
        var $checkBox = $(this);
        display[$checkBox.attr('data-value')] = $checkBox.is(':checked');
      });
      return display;
    }

    if (window.PT_OVERLAY_MAP) {
      window.PT_OVERLAY_MAP.Display = Display;
    } else {
      define(function() {
        return Display;
      });
    }
  })(window, jQuery);

  /**
   * Created by yongsheng.kuang on 2016/2/5.
   */
  (function(window, $, undefined) {
    function Refresh(element, heatmapCore) {
      var Refresh = this;
      Refresh.$element = $(element);
      Refresh.$element.on('click', function() {
        heatmapCore.refresh();
      });
    }

    if (window.PT_OVERLAY_MAP) {
      window.PT_OVERLAY_MAP.Refresh = Refresh;
    } else {
      define(function() {
        return Refresh;
      });
    }
  })(window, jQuery);

  /*
   * heatmap.js 1.0 -    JavaScript Heatmap Library
   *
   * Copyright (c) 2011, Patrick Wied (http://www.patrick-wied.at)
   * Dual-licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
   * and the Beerware (http://en.wikipedia.org/wiki/Beerware) license.
   */
  (function(window, undefined) {
    var ClickmapFactory = (function() {

      // store object constructor
      // a heatmap contains a store
      // the store has to know about the heatmap in order to trigger heatmap updates when datapoints get added
      var store = function store(hmap) {
        var _ = {
          // data is a two dimensional array
          // a datapoint gets saved as data[point-x-value][point-y-value]
          // the value at [point-x-value][point-y-value] is the occurrence of the datapoint
          data: [],
          // tight coupling of the heatmap object
          heatmap: hmap
        };
        // the max occurrence - the heatmaps radial gradient alpha transition is based on it
        this.max = 1;

        this.get = function(key) {
          return _[key];
        };
        this.set = function(key, value) {
          _[key] = value;
        };
      }; //store

      store.prototype = {
        // function for adding datapoints to the store
        // datapoints are usually defined by x and y but could also contain a third parameter which represents the occurrence
        addDataPoint: function(x, y) {
          if (x < 0 || y < 0)
            return;

          var me = this,
            heatmap = me.get("heatmap"),
            data = me.get("data");

          if (!data[x])
            data[x] = [];

          if (!data[x][y])
            data[x][y] = 0;

          // if count parameter is set increment by count otherwise by 1
          data[x][y] += (arguments.length < 3) ? 1 : arguments[2];

          me.set("data", data);
          // do we have a new maximum?
          if (me.max < data[x][y]) {
            // max changed, we need to redraw all existing(lower) datapoints
            heatmap.get("actx").clearRect(0, 0, heatmap.get("width"), heatmap.get("height"));
            me.setDataSet({
              max: data[x][y],
              data: data
            }, true);
            return;
          }
          heatmap.drawAlpha(x, y, data[x][y], true);
        },
        setDataSet: function(obj, internal) {
          var me = this,
            heatmap = me.get("heatmap"),
            data = [],
            d = obj.data,
            dlen = d.length;
          // clear the heatmap before the data set gets drawn
          heatmap.clear();
          this.max = obj.max;
          // if a legend is set, update it
          heatmap.get("legend") && heatmap.get("legend").update(obj.max);

          if (internal != null && internal) {
            for (var one in d) {
              // jump over undefined indexes
              if (one === undefined)
                continue;
              for (var two in d[one]) {
                if (two === undefined)
                  continue;
                // if both indexes are defined, push the values into the array
                heatmap.drawAlpha(one, two, d[one][two], false);
              }
            }
          } else {
            while (dlen--) {
              var point = d[dlen];
              heatmap.drawAlpha(point.x, point.y, point.v, false);
              if (!data[point.x])
                data[point.x] = [];

              if (!data[point.x][point.y])
                data[point.x][point.y] = 0;

              data[point.x][point.y] = point.v;
            }
          }
          heatmap.colorize();
          this.set("data", d);
        },
        exportDataSet: function() {
          var me = this,
            data = me.get("data"),
            exportData = [];

          for (var one in data) {
            // jump over undefined indexes
            if (one === undefined)
              continue;
            for (var two in data[one]) {
              if (two === undefined)
                continue;
              // if both indexes are defined, push the values into the array
              exportData.push({
                x: parseInt(one, 10),
                y: parseInt(two, 10),
                v: data[one][two]
              });
            }
          }

          return {
            max: me.max,
            data: exportData
          };
        },
        generateRandomDataSet: function(points) {
          var heatmap = this.get("heatmap"),
            w = heatmap.get("width"),
            h = heatmap.get("height");
          var randomset = {},
            max = Math.floor(Math.random() * 1000 + 1);
          randomset.max = max;
          var data = [];
          while (points--) {
            data.push({
              x: Math.floor(Math.random() * w + 1),
              y: Math.floor(Math.random() * h + 1),
              v: Math.floor(Math.random() * max + 1)
            });
          }
          randomset.data = data;
          this.setDataSet(randomset);
        }
      }; //store

      var legend = function legend(config) {
        this.config = config;

        var _ = {
          element: null,
          labelsEl: null,
          gradientCfg: null,
          ctx: null
        };
        this.get = function(key) {
          return _[key];
        };
        this.set = function(key, value) {
          _[key] = value;
        };
        this.init();
      }; //legend

      // heatmap object constructor
      var heatmap = function heatmap(config) {
        // private variables
        var _ = {
          radius: 40,
          element: {},
          canvas: {},
          acanvas: {},
          ctx: {},
          actx: {},
          legend: null,
          visible: true,
          width: 0,
          height: 0,
          max: false,
          gradient: false,
          opacity: 180,
          premultiplyAlpha: false,
          bounds: {
            l: 1000,
            r: 0,
            t: 1000,
            b: 0
          },
          debug: false
        };
        // heatmap store containing the datapoints and information about the maximum
        // accessible via instance.store
        this.store = new store(this);

        this.get = function(key) {
          return _[key];
        };
        this.set = function(key, value) {
          _[key] = value;
        };
        // configure the heatmap when an instance gets created
        this.configure(config);
        // and initialize it
        this.init();
      }; //heatmap

      // public functions
      heatmap.prototype = {
        configure: function(config) {
          var me = this,
            rout, rin;

          me.set("radius", config["radius"] || 40);
          me.set("element", (config.element instanceof Object) ? config.element : document.getElementById(config.element));
          me.set("visible", (config.visible != null) ? config.visible : true);
          me.set("max", config.max || false);
          me.set("gradient", config.gradient || {
            0.45: "rgb(0,0,255)",
            0.55: "rgb(0,255,255)",
            0.65: "rgb(0,255,0)",
            0.95: "yellow",
            1.0: "rgb(255,0,0)"
          }); // default is the common blue to red gradient
          me.set("opacity", parseInt(255 / (100 / config.opacity), 10) || 180);
          me.set("width", config.width || 0);
          me.set("height", config.height || 0);
          me.set("debug", config.debug);

          if (config.legend) {
            var legendCfg = config.legend;
            legendCfg.gradient = me.get("gradient");
            me.set("legend", new legend(legendCfg));
          }

        },
        resize: function() {
          var me = this,
            element = me.get("element"),
            canvas = me.get("canvas"),
            acanvas = me.get("acanvas");
          canvas.width = acanvas.width = me.get("width") || element.style.width.replace(/px/, "") || me.getWidth(element);
          this.set("width", canvas.width);
          canvas.height = acanvas.height = me.get("height") || element.style.height.replace(/px/, "") || me.getHeight(element);
          this.set("height", canvas.height);
        },

        init: function() {
          var me = this,
            canvas = document.createElement("canvas"),
            acanvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            actx = acanvas.getContext("2d"),
            element = me.get("element");


          me.initColorPalette();

          me.set("canvas", canvas);
          me.set("ctx", ctx);
          me.set("acanvas", acanvas);
          me.set("actx", actx);

          me.resize();
          canvas.style.cssText = acanvas.style.cssText = "position:absolute;top:0;left:0;";

          if (!me.get("visible"))
            canvas.style.display = "none";

          element.appendChild(canvas);
          if (me.get("legend")) {
            element.appendChild(me.get("legend").getElement());
          }

          // debugging purposes only
          if (me.get("debug"))
            document.body.appendChild(acanvas);

          actx.shadowOffsetX = 15000;
          actx.shadowOffsetY = 15000;
          actx.shadowBlur = 15;
        },
        initColorPalette: function() {

          var me = this,
            canvas = document.createElement("canvas"),
            gradient = me.get("gradient"),
            ctx, grad, testData;

          canvas.width = "1";
          canvas.height = "256";
          ctx = canvas.getContext("2d");
          grad = ctx.createLinearGradient(0, 0, 1, 256);

          // Test how the browser renders alpha by setting a partially transparent pixel
          // and reading the result.  A good browser will return a value reasonably close
          // to what was set.  Some browsers (e.g. on Android) will return a ridiculously wrong value.
          testData = ctx.getImageData(0, 0, 1, 1);
          testData.data[0] = testData.data[3] = 64; // 25% red & alpha
          testData.data[1] = testData.data[2] = 0; // 0% blue & green
          ctx.putImageData(testData, 0, 0);
          testData = ctx.getImageData(0, 0, 1, 1);
          me.set("premultiplyAlpha", (testData.data[0] < 60 || testData.data[0] > 70));

          for (var x in gradient) {
            grad.addColorStop(x, gradient[x]);
          }

          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, 1, 256);

          me.set("gradient", ctx.getImageData(0, 0, 1, 256).data);
        },
        getWidth: function(element) {
          var width = element.offsetWidth;
          if (element.style.paddingLeft) {
            width += element.style.paddingLeft;
          }
          if (element.style.paddingRight) {
            width += element.style.paddingRight;
          }

          return width;
        },
        getHeight: function(element) {
          var height = element.offsetHeight;
          if (element.style.paddingTop) {
            height += element.style.paddingTop;
          }
          if (element.style.paddingBottom) {
            height += element.style.paddingBottom;
          }

          return height;
        },
        colorize: function(x, y) {
          // get the private variables
          var me = this,
            width = me.get("width"),
            radius = me.get("radius"),
            height = me.get("height"),
            actx = me.get("actx"),
            ctx = me.get("ctx"),
            x2 = radius * 3,
            premultiplyAlpha = me.get("premultiplyAlpha"),
            palette = me.get("gradient"),
            opacity = me.get("opacity"),
            bounds = me.get("bounds"),
            left, top, bottom, right,
            image, imageData, length, alpha, offset, finalAlpha;

          if (x != null && y != null) {
            if (x + x2 > width) {
              x = width - x2;
            }
            if (x < 0) {
              x = 0;
            }
            if (y < 0) {
              y = 0;
            }
            if (y + x2 > height) {
              y = height - x2;
            }
            left = x;
            top = y;
            right = x + x2;
            bottom = y + x2;

          } else {
            if (bounds['l'] < 0) {
              left = 0;
            } else {
              left = bounds['l'];
            }
            if (bounds['r'] > width) {
              right = width;
            } else {
              right = bounds['r'];
            }
            if (bounds['t'] < 0) {
              top = 0;
            } else {
              top = bounds['t'];
            }
            if (bounds['b'] > height) {
              bottom = height;
            } else {
              bottom = bounds['b'];
            }
          }

          image = actx.getImageData(left, top, right - left, bottom - top);
          imageData = image.data;
          length = imageData.length;
          // loop thru the area
          for (var i = 3; i < length; i += 4) {

            // [0] -> r, [1] -> g, [2] -> b, [3] -> alpha
            alpha = imageData[i],
              offset = alpha * 4;

            if (!offset)
              continue;

            // we ve started with i=3
            // set the new r, g and b values
            finalAlpha = (alpha < opacity) ? alpha : opacity;
            imageData[i - 3] = palette[offset];
            imageData[i - 2] = palette[offset + 1];
            imageData[i - 1] = palette[offset + 2];

            if (premultiplyAlpha) {
              // To fix browsers that premultiply incorrectly, we'll pass in a value scaled
              // appropriately so when the multiplication happens the correct value will result.
              imageData[i - 3] /= 255 / finalAlpha;
              imageData[i - 2] /= 255 / finalAlpha;
              imageData[i - 1] /= 255 / finalAlpha;
            }

            // we want the heatmap to have a gradient from transparent to the colors
            // as long as alpha is lower than the defined opacity (maximum), we'll use the alpha value
            imageData[i] = finalAlpha;
          }
          // the rgb data manipulation didn't affect the ImageData object(defined on the top)
          // after the manipulation process we have to set the manipulated data to the ImageData object
          image.data = imageData;
          ctx.putImageData(image, left, top);
        },
        drawAlpha: function(x, y, v, colorize, radius) {
          // storing the variables because they will be often used
          var me = this,
            radius = me.get("radius"),
            ctx = me.get("actx"),
            max = me.get("max"),
            bounds = me.get("bounds"),
            xb = x - (1.5 * radius) >> 0,
            yb = y - (1.5 * radius) >> 0,
            xc = x + (1.5 * radius) >> 0,
            yc = y + (1.5 * radius) >> 0;

          ctx.shadowColor = ('rgba(0,0,0,' + ((v) ? (v / me.store.max) : '0.1') + ')');

          ctx.shadowOffsetX = 15000;
          ctx.shadowOffsetY = 15000;
          ctx.shadowBlur = radius;

          ctx.beginPath();
          ctx.arc(x - 15000, y - 15000, radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();
          if (colorize) {
            // finally colorize the area
            me.colorize(xb, yb);
          } else {
            // or update the boundaries for the area that then should be colorized
            if (xb < bounds["l"]) {
              bounds["l"] = xb;
            }
            if (yb < bounds["t"]) {
              bounds["t"] = yb;
            }
            if (xc > bounds['r']) {
              bounds['r'] = xc;
            }
            if (yc > bounds['b']) {
              bounds['b'] = yc;
            }
          }
        },
        toggleDisplay: function() {
          var me = this,
            visible = me.get("visible"),
            canvas = me.get("canvas");

          if (!visible)
            canvas.style.display = "block";
          else
            canvas.style.display = "none";

          me.set("visible", !visible);
        },
        // dataURL export
        getImageData: function() {
          return this.get("canvas").toDataURL();
        },
        clear: function() {
          var me = this,
            w = me.get("width"),
            h = me.get("height");

          me.store.set("data", []);
          // @TODO: reset stores max to 1
          //me.store.max = 1;
          me.get("ctx").clearRect(0, 0, w, h);
          me.get("actx").clearRect(0, 0, w, h);
        },
        cleanup: function() {
          var me = this;
          me.get("element").removeChild(me.get("canvas"));
        }
      }; //heatmap

      return {
        create: function(config) {
          return new heatmap(config);
        },
        util: {
          mousePosition: function(ev) {
            var x, y;
            if (ev.layerX) { // Firefox
              x = ev.layerX;
              y = ev.layerY;
            } else if (ev.offsetX) { // Opera
              x = ev.offsetX;
              y = ev.offsetY;
            }
            if (typeof(x) == 'undefined')
              return;

            return [x, y];
          }
        }
      }; //return
    })(); //heatmapFactory
    if (window.PT_OVERLAY_MAP) {
      window.PT_OVERLAY_MAP.ClickmapFactory = ClickmapFactory;
    } else {
      define(function() {
        return ClickmapFactory;
      });
    }
  })(window);

  /*
   * heatmap.js 1.0 -    JavaScript Heatmap Library
   *
   * Copyright (c) 2011, Patrick Wied (http://www.patrick-wied.at)
   * Dual-licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
   * and the Beerware (http://en.wikipedia.org/wiki/Beerware) license.
   */
  (function(window, undefined) {
    // heatmapFactory的创建热图实例
    var ScrollmapFactory = (function() {

      // 构造 store 函数
      // 一个heatmap 包含一个store
      // HeatMap的store有添加的数据点时，出发heatmap更新
      var store = function store(hmap) {
        var _ = {
          // 数据是一个二维数组
          // 数据点被保存为数据点的x值和y值
          // the value at [point-x-value][point-y-value] is the occurrence of the datapoint
          data: [],
          // tight coupling of the heatmap object
          heatmap: hmap
        };
        // the max occurrence - the heatmaps radial gradient alpha transition is based on it
        this.max = 1;

        this.get = function(key) {
          return _[key];
        };
        this.set = function(key, value) {
          _[key] = value;
        };
      }

      store.prototype = {
        // function for adding datapoints to the store
        // datapoints are usually defined by x and y but could also contain a third parameter which represents the occurrence
        addDataPoint: function(y, h) {
          if (y < 0 || h < 0)
            return;

          var me = this,
            heatmap = me.get("heatmap"),
            data = me.get("data");

          if (!data[y])
            data[y] = [];

          if (!data[x][y])
            data[x][y] = 0;

          // if count parameter is set increment by count otherwise by 1
          data[x][y] += (arguments.length < 3) ? 1 : arguments[2];

          me.set("data", data);
          // do we have a new maximum?
          if (me.max < data[x][y]) {
            // max changed, we need to redraw all existing(lower) datapoints
            heatmap.get("actx").clearRect(0, 0, heatmap.get("width"), heatmap.get("height"));
            me.setDataSet({
              max: data[x][y],
              data: data
            }, true);
            return;
          }
          heatmap.drawAlpha(y, h, data[x][y], true);
        },
        setDataSet: function(obj, internal) {
          var me = this,
            heatmap = me.get("heatmap"),
            data = [],
            d = obj.data,
            dlen = d.length;
          // clear the heatmap before the data set gets drawn
          heatmap.clear();
          this.max = obj.max;

          // 如果设置了legend, 则更新
          heatmap.get("legend") && heatmap.get("legend").update(obj.max);

          if (internal != null && internal) {
            for (var one in d) {
              // jump over undefined indexes
              if (one === undefined)
                continue;
              for (var two in d[one]) {
                if (two === undefined)
                  continue;
                // if both indexes are defined, push the values into the array
                heatmap.drawAlpha(one, two, d[one][two], false);
              }
            }
          } else {
            while (dlen--) {
              var point = d[dlen];
              heatmap.drawAlpha(point.y, point.h, point.v, false);
              if (!data[point.y])
                data[point.y] = [];

              //if(!data[point.y][point.h])
              //    data[point.y][point.h] = 0;

              data[point.y][point.h] = point.v;
            }
          }
          heatmap.colorize();
          this.set("data", d);
        },
        exportDataSet: function() {
          var me = this,
            data = me.get("data"),
            exportData = [];

          for (var one in data) {
            // jump over undefined indexes
            if (one === undefined)
              continue;
            for (var two in data[one]) {
              if (two === undefined)
                continue;
              // if both indexes are defined, push the values into the array
              exportData.push({
                x: parseInt(one, 10),
                y: parseInt(two, 10),
                v: data[one][two]
              });
            }
          }
          return {
            max: me.max,
            data: exportData
          };
        },
        generateRandomDataSet: function(points) {
          var heatmap = this.get("heatmap"),
            w = heatmap.get("width"),
            h = heatmap.get("height");
          var randomset = {},
            max = Math.floor(Math.random() * 1000 + 1);
          randomset.max = max;
          var data = [];
          while (points--) {
            data.push({
              x: Math.floor(Math.random() * w + 1),
              y: Math.floor(Math.random() * h + 1),
              v: Math.floor(Math.random() * max + 1)
            });
          }
          randomset.data = data;
          this.setDataSet(randomset);
        }
      };

      // heatmap object constructor
      var heatmap = function heatmap(config) {
        // private variables
        var _ = {
          //radius : 40,
          element: {},
          canvas: {},
          acanvas: {},
          ctx: {},
          actx: {},
          legend: null,
          visible: true,
          width: 0,
          height: 0,
          max: false,
          gradient: false,
          opacity: 180,
          premultiplyAlpha: false,
          bounds: {
            l: 0,
            r: 0,
            t: 1000,
            b: 0
          },
          debug: false
        };

        // 储存HeatMap，其中包含的数据点和最大值
        // 通过instance.store访问
        this.store = new store(this);

        this.get = function(key) {
          return _[key];
        };
        this.set = function(key, value) {
          _[key] = value;
        };
        // 配置热图
        this.configure(config);
        // 初始化
        this.init();
      };

      // public functions
      heatmap.prototype = {
        configure: function(config, obj) {
          var me = this,
            rout, rin;

          me.set("element", (config.element instanceof Object) ? config.element : document.getElementById(config.element));
          me.set("visible", (config.visible != null) ? config.visible : true);
          me.set("max", config.max || false);
          me.set("gradient", config.gradient || {
            0.45: "rgb(0,0,255)",
            0.55: "rgb(0,255,255)",
            0.65: "rgb(0,255,0)",
            0.95: "yellow",
            1.0: "rgb(255,0,0)"
          }); //默认情况下是常见的蓝色到红色的渐变
          me.set("opacity", parseInt(255 / (100 / config.opacity), 10) || 180);
          me.set("width", config.width || 0);
          me.set("height", config.height || 0);
          me.set("debug", config.debug);
        },
        resize: function() {
          var me = this,
            element = me.get("element"),
            canvas = me.get("canvas"),
            acanvas = me.get("acanvas");
          canvas.width = acanvas.width = me.get("width") || element.style.width.replace(/px/, "") || me.getWidth(element);
          this.set("width", canvas.width);
          canvas.height = acanvas.height = me.get("height") || element.style.height.replace(/px/, "") || me.getHeight(element);
          this.set("height", canvas.height);
        },

        init: function() {
          var me = this,
            canvas = document.createElement("canvas"),
            acanvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            actx = acanvas.getContext("2d"),
            element = me.get("element");

          me.initColorPalette();

          me.set("canvas", canvas);
          me.set("ctx", ctx);
          me.set("acanvas", acanvas);
          me.set("actx", actx);

          me.resize();
          canvas.style.cssText = acanvas.style.cssText = "position:absolute;top:0;left:0;";

          if (!me.get("visible"))
            canvas.style.display = "none";

          element.appendChild(canvas);
          if (me.get("legend")) {
            element.appendChild(me.get("legend").getElement());
          }

          // debugging purposes only
          if (me.get("debug"))
            document.body.appendChild(acanvas);

          //actx.shadowOffsetX = 15000;
          //actx.shadowOffsetY = 15000;
          //actx.shadowBlur = 15;
        },
        initColorPalette: function() {
          var me = this,
            canvas = document.createElement("canvas"),
            gradient = me.get("gradient"),
            ctx, grad, testData;

          canvas.width = "1";
          canvas.height = "256";
          ctx = canvas.getContext("2d");
          grad = ctx.createLinearGradient(0, 0, 1, 256);

          // Test how the browser renders alpha by setting a partially transparent pixel
          // and reading the result.  A good browser will return a value reasonably close
          // to what was set.  Some browsers (e.g. on Android) will return a ridiculously wrong value.
          testData = ctx.getImageData(0, 0, 1, 256);
          testData.data[0] = testData.data[3] = 64; // 25% red & alpha
          testData.data[1] = testData.data[2] = 0; // 0% blue & green
          ctx.putImageData(testData, 0, 0);
          testData = ctx.getImageData(0, 0, 1, 1);
          me.set("premultiplyAlpha", (testData.data[0] < 60 || testData.data[0] > 70));

          for (var x in gradient) {
            grad.addColorStop(x, gradient[x]);
          }

          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, 1, 256);
          me.set("gradient", ctx.getImageData(0, 0, 1, 256).data);
        },
        getWidth: function(element) {
          var width = element.offsetWidth;
          if (element.style.paddingLeft) {
            width += element.style.paddingLeft;
          }
          if (element.style.paddingRight) {
            width += element.style.paddingRight;
          }
          return width;
        },
        getHeight: function(element) {
          var height = element.offsetHeight;
          if (element.style.paddingTop) {
            height += element.style.paddingTop;
          }
          if (element.style.paddingBottom) {
            height += element.style.paddingBottom;
          }

          return height;
        },
        colorize: function(y, h) {
          // get the private variables
          var me = this,
            width = me.get("width"),
            height = me.get("height"),
            actx = me.get("actx"),
            ctx = me.get("ctx"),
            premultiplyAlpha = me.get("premultiplyAlpha"),
            palette = me.get("gradient"),
            opacity = me.get("opacity"),
            bounds = me.get("bounds"),
            left, top, bottom, right,
            image, imageData, length, alpha, offset, finalAlpha;

          if (y != null && h != null) {
            if (y < 0) {
              x = 0;
            }
            if (h < 0) {
              h = 1;
            }
            left = 0;
            top = y;
            right = 0;
            bottom = h;

          } else {
            left = 0;
            //right = 0;
            if (bounds['r'] > width) {
              right = width;
            } else {
              right = bounds['r'];
            }
            if (bounds['t'] < 0) {
              top = 0;
            } else {
              top = bounds['t'];
            }
            if (bounds['b'] > height) {
              bottom = height;
            } else {
              bottom = bounds['b'];
            }
          }
          image = actx.getImageData(left, top, right, bottom);
          imageData = image.data;
          length = imageData.length;

          // loop thru the area、
          for (var i = 3; i < length; i += 4) {
            // [0] -> r, [1] -> g, [2] -> b, [3] -> alpha
            alpha = imageData[i],
              offset = alpha * 4;

            if (!offset)
              continue;

            // we ve started with i=3
            // set the new r, g and b values
            finalAlpha = (alpha < opacity) ? alpha : opacity;
            imageData[i - 3] = palette[offset];
            imageData[i - 2] = palette[offset + 1];
            imageData[i - 1] = palette[offset + 2];

            if (premultiplyAlpha) {
              // To fix browsers that premultiply incorrectly, we'll pass in a value scaled
              // appropriately so when the multiplication happens the correct value will result.
              imageData[i - 3] /= 255 / finalAlpha;
              imageData[i - 2] /= 255 / finalAlpha;
              imageData[i - 1] /= 255 / finalAlpha;
            }

            // we want the heatmap to have a gradient from transparent to the colors
            // as long as alpha is lower than the defined opacity (maximum), we'll use the alpha value
            imageData[i] = finalAlpha;
          }
          // the rgb data manipulation didn't affect the ImageData object(defined on the top)
          // after the manipulation process we have to set the manipulated data to the ImageData object
          image.data = imageData;
          ctx.putImageData(image, left, top);
        },
        drawAlpha: function(y, h, v, colorize) {
          // storing the variables because they will be often used
          var me = this,
            //radius = me.get("radius"),
            ctx = me.get("actx"),
            max = me.get("max"),
            bounds = me.get("bounds"),
            width = me.get("width");

          ctx.shadowColor = ('rgba(0,0,0,' + ((v) ? (v / me.store.max) : '0.1') + ')');
          ctx.beginPath();

          alpha = v / me.store.max

          var rgr = ctx.createLinearGradient(0, y, 0, y + h);
          rgr.addColorStop(0, 'rgba(0,0,0, 0)');
          rgr.addColorStop(.5, 'rgba(0,0,0, ' + alpha + ')');
          rgr.addColorStop(1, 'rgba(0,0,0, 0)');
          ctx.fillStyle = rgr;
          ctx.fillRect(0, y, width, y + h);
          ctx.closePath();
          ctx.fill();

          if (colorize) {
            // finally colorize the area
            me.colorize(y, h);
          } else {
            // or update the boundaries for the area that then should be colorized
            if (y < bounds["t"]) {
              bounds["t"] = y;
            }
            if (me.get("width") > bounds['r']) {
              bounds['r'] = width;
            }
            bounds['b'] = bounds['b'] + y + h;
          }
        },
        toggleDisplay: function() {
          var me = this,
            visible = me.get("visible"),
            canvas = me.get("canvas");

          if (!visible)
            canvas.style.display = "block";
          else
            canvas.style.display = "none";

          me.set("visible", !visible);
        },
        // dataURL export
        getImageData: function() {
          return this.get("canvas").toDataURL();
        },
        clear: function() {
          var me = this,
            w = me.get("width"),
            h = me.get("height");

          me.store.set("data", []);
          // @TODO: reset stores max to 1
          //me.store.max = 1;
          me.get("ctx").clearRect(0, 0, w, h);
          me.get("actx").clearRect(0, 0, w, h);
        },
        cleanup: function() {
          var me = this;
          me.get("element").removeChild(me.get("canvas"));
        }
      };

      return {
        create: function(config) {
          return new heatmap(config);
        },
        util: {
          mousePosition: function(ev) {
            var x, y;

            if (ev.layerX) { // Firefox
              x = ev.layerX;
              y = ev.layerY;
            } else if (ev.offsetX) { // Opera
              x = ev.offsetX;
              y = ev.offsetY;
            }
            if (typeof(x) == 'undefined')
              return;

            return [x, y];
          }
        }
      };
    })();
    if (window.PT_OVERLAY_MAP) {
      window.PT_OVERLAY_MAP.ScrollmapFactory = ScrollmapFactory;
    } else {
      define(function() {
        return ScrollmapFactory;
      });
    }
  })(window);


  /**
   * Created by yongsheng.kuang on 2016/1/29.
   */
  (function(window, $, undefined) {
    var ELEMENT_SHOW_TEXT_MAX_LENGTH = 20;
    var Composition;

    /**
     * 根据点击百分比,获取点击等级
     * @param rate
     * @returns {string}
     */
    function getRateRank(rate) {
      var rateRank = '';
      if (rate >= 0.15) {
        rateRank = 'a';
      } else if (rate >= 0.1) {
        rateRank = 'b';
      } else if (rate >= 0.05) {
        rateRank = 'c';
      } else if (rate >= 0.01) {
        rateRank = 'd';
      } else {
        rateRank = 'e';
      }
      return rateRank;
    }

    /**
     * 根据元素的大小来设置其tips的等级
     * @param width 元素宽度
     * @param height 元素高度
     * @returns {string} tip等级 a,b,c
     */
    function getTipRank(width, height) {
      var tipRank = '';
      if (width >= 60 && height >= 28) {
        tipRank = 'a';
      } else if (width >= 90 && height >= 14) {
        tipRank = 'b';
      } else if (width >= 56 && height >= 14) {
        tipRank = 'c';
      }
      return tipRank;
    }

    /**
     * clearComment
     * 清楚文本内的注释信息
     */
    function clearComment(text) {
      if (text.indexOf('<!--') > 0 && text.indexOf('-->') > 0) {
        text = text.replace(text.slice(text.indexOf('<!--'), text.indexOf('-->') + 3));
      }
      return text;
    }

    function encodeHtml(s) {
      var REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;
      return (typeof s != "string") ? s :
        s.replace(REGX_HTML_ENCODE,
          function($0) {
            var c = $0.charCodeAt(0),
              r = ["&#"];
            c = (c == 0x20) ? 0xA0 : c;
            r.push(c);
            r.push(";");
            return r.join("");
          });
    }

    /**
     * 根据屏幕方向处理Postion
     * @param pageOrientation 屏幕方向
     * @param position {x:left,y:top}
     * @returns {Number} 处理后的top
     */
    function getPositionByPageOrientation(pageOrientation, position) {
      var returnPosition = position;
      switch (pageOrientation) {
        case 'V':
          returnPosition = position;
          break;
        case 'H':
          returnPosition = {
            x: -1 * position.x,
            y: -1 * position.y
          };
          break;
        default:
          returnPosition = {
            x: Math.abs(position.x),
            y: Math.abs(position.y)
          };
          break;

      }
      return returnPosition;
    }

    /**
     * 从一个数据中 通过指定属性的值获取对应的对象
     * @param arr       数据
     * @param propName  属性名称
     * @param propValue 属性值
     */
    function getObjFromArray(arr, propName, propValue) {
      var length = arr.length;
      for (var i = 0; i < length; i++) {
        if (arr[i][propName] == propValue) {
          return arr[i];
        }
      }
    }

    function AnalysisMap(heatmapCore, config) {
      var AnalysisMap = this;
      AnalysisMap._heatmapCore = heatmapCore;
      AnalysisMap._isActive = false;
      AnalysisMap.$compositionElement = $(config.compositionElement);
      AnalysisMap._composition = new Composition(config.compositionElement, AnalysisMap._heatmapCore, selectActiveElementHandler, clearActiveElementHandler);
      AnalysisMap._linkCssUrl = config.linkCssUrl ? config.linkCssUrl : location.protocol + '//' + location.host;

      AnalysisMap._csv = config.csv;

      //composition 中选择某个元素后,frame页面中对应的元素添加激活状态
      function selectActiveElementHandler(selector) {
        var $frameDocument = heatmapCore.getTargetDocument();
        if ($frameDocument) {
          $frameDocument.find('.ptDataTracked').removeClass('ptDataTracked_blink').removeClass('ptDataTracked_father_blink');
          var $activeElement = $frameDocument.find(selector);
          if ($activeElement.is('.ptDataTracked_father')) {
            $activeElement.addClass('ptDataTracked_father_blink');
          } else {
            $activeElement.addClass('ptDataTracked_blink');
          }
          var scale = AnalysisMap._heatmapCore.getScale();
          var top = parseInt($activeElement.offset().top * scale);

          var $scroll = $(config.scrollElement);
          if ($scroll.is('body')) { //弹出和分享热图
            $scroll.scrollTop(top);
          } else {
            $frameDocument.find('html')[0].scrollTop = top; //设置iframe中元素 在html或者bodyscroll位置
            if ($frameDocument.find('html')[0].scrollTop == 0) { //不是以html滚动的 则设置其在body上滚动
              $frameDocument.find('body')[0].scrollTop = top;
            }
          }

        }
      }

      function clearActiveElementHandler() {
        var $frameDocument = heatmapCore.getTargetDocument();
        if ($frameDocument) {
          $frameDocument.find('.ptDataTracked').removeClass('ptDataTracked_blink').removeClass('ptDataTracked_father_blink');
        }
      }

      AnalysisMap._bindEvent();
    }

    AnalysisMap.prototype._getIsActiveElement = function() {
      var display = this._heatmapCore.getDisplay();
      var isActiveElement = (display.activeElement && display.noneActiveElement) ? 'all' : '';
      if (isActiveElement === '') {
        if (display.activeElement) {
          isActiveElement = true;
        }
        if (display.noneActiveElement) {
          isActiveElement = false;
        }
      }
      return isActiveElement;
    };

    /**
     * 根据颜色条的值,返回对应的点击百分比
     *15%-100%红色; 10%-15%橙色; 5%-10%黄色; 1%-5%青色; 0%-1%蓝色
     * @private
     * @result <Number>
     */
    AnalysisMap.prototype._getColorRatePercent = function() {
      var colorRate = this._heatmapCore.getColorRate();
      var percent = 0;
      //上一个颜色的最大值:A; 当前颜色的最大值:B; 每个颜色跨度所占的比率C
      //percent = A+(B-A)*((colorRate-A)/C);
      if (colorRate < 0.25) {
        percent = 0 + (0.01 - 0) * ((colorRate - 0) / 0.25);
      } else if (colorRate < 0.5) {
        percent = 0.01 + (0.05 - 0.01) * ((colorRate - 0.25) / 0.25)
      } else if (colorRate < 0.75) {
        percent = 0.05 + (0.10 - 0.05) * ((colorRate - 0.5) / 0.25)
      } else if (colorRate < 1) {
        percent = 0.10 + (0.15 - 0.10) * ((colorRate - 0.75) / 0.25)
      } else {
        percent = 0.15;
      }
      return percent;
    };

    /**
     * 获取点击分布图的数据
     * @param isActiveElement 是否为活动元素 true:活动元素，false:非活动元素，all:全部。 其他值时取消全部元素
     */
    AnalysisMap.prototype._processData = function() {
      var AnalysisMap = this;
      var $frameDocument = AnalysisMap._heatmapCore.getTargetDocument();
      if ($frameDocument) {
        var pageOrientation = AnalysisMap._heatmapCore.getPageOrientation();

        var analysisData = [];
        var analysisMapData = AnalysisMap._heatmapCore.getMapData('analysis').click_element;
        var allCount = AnalysisMap._heatmapCore.getAllClick(); //后台返回的点击次数之和.各元素计算完百分比后,会根据百分比重新计算各元素的点击次数

        //将dataCenter中的元素数据处理成对象数组
        var length = analysisMapData.length;
        for (var index = 0; index < length; index++) {
          var data = analysisMapData[index];
          var elementClickInfo = {};
          elementClickInfo.isActiveElement = (data.elementid[0] === '1' ? true : false); //1:活动元素,2:非活动元素,0:遗留问题(现在统一处理为非活动元素,同2)
          elementClickInfo.selector = AnalysisMap._heatmapCore.constructor.decodeURIComponent(data.elementid).substr(1); //选择器
          //根据屏幕方向 计算点击数
          var count = 0;
          switch (pageOrientation) {
            case 'H':
              count = data.ncount;
              break;
            case 'V':
              count = data.pcount;
              break;
            default:
              count = data.pcount + data.ncount;
          }
          elementClickInfo.clickCount = count;
          if (elementClickInfo.clickCount > 0) {
            analysisData.push(elementClickInfo);
          }
        }

        //过滤数据,设置选择器对应的元素的dom信息
        var renderData = [];
        var isActiveElement = AnalysisMap._getIsActiveElement(); //display中设置的是否是显示活动元素
        var colorRatePercent = AnalysisMap._getColorRatePercent();
        var analysisDataLength = analysisData.length;
        for (var index = 0; index < analysisDataLength; index++) {
          try {
            var elementClickInfo = analysisData[index];
            elementClickInfo.rate = elementClickInfo.clickCount / allCount; //占总点击数的百分比
            //只添加 display中设置的元素
            if (isActiveElement === 'all' || isActiveElement === elementClickInfo.isActiveElement) {
              //只添加百分比大于颜色条中设置的元素
              if (elementClickInfo.rate > colorRatePercent) {
                var $element = $frameDocument.find(elementClickInfo.selector);
                if ($element.length !== 1) { //元素不存在,或者元素超过一个的时候
                  continue;
                }
                //判断当前选择器 对应的元素是否已经添加到数组中,如果已经存在 则只合并数据
                var existElementClickInfo = getObjFromArray(renderData, 'element', $element[0]);
                if (existElementClickInfo) {
                  existElementClickInfo.clickCount += elementClickInfo.clickCount;
                  existElementClickInfo.rate += elementClickInfo.rate;
                } else { //当前元素不在数组中时,添加该信息到数组
                  elementClickInfo.element = $element[0]; //缓存元素
                  //元素节点信息
                  elementClickInfo.hasChild = !!$element.children().length;
                  elementClickInfo.nodeName = $element[0].nodeName;
                  var text = clearComment($element.text()).trim().slice(0, 300);
                  elementClickInfo.showText = text ? text.substr(0, ELEMENT_SHOW_TEXT_MAX_LENGTH) : ''; //没有encode html 的text。以便其它组件使用（csv导出）
                  text = encodeHtml(text);
                  switch (elementClickInfo.nodeName) {
                    case 'A':
                      var href = $element[0]['href'];
                      if (href) {
                        text = text.trim() ? text.trim() : href;
                        elementClickInfo.dom = '<a href="' + href + '" target="_blank">' + text + '</a>';
                        elementClickInfo.nodeType = 'URL';
                        elementClickInfo.title = text;
                      } else {
                        elementClickInfo.dom = text ? text : this.getI18nCommon('heatmap_analytics_frame');
                        elementClickInfo.nodeType = this.getI18nCommon('others');
                        elementClickInfo.title = elementClickInfo.dom;
                      }
                      break;
                    case 'Form':
                      elementClickInfo.dom = text;
                      elementClickInfo.nodeType = this.getI18nCommon('heatmap_analytics_form');
                      elementClickInfo.title = elementClickInfo.dom;
                      break;
                    case 'IMG':
                      var src = $element[0]["src"];
                      elementClickInfo.dom = '<a href="' + src + '" target="_blank">' + src + '</a>';
                      elementClickInfo.nodeType = this.getI18nCommon('heatmap_analytics_img');
                      elementClickInfo.title = src;
                      break;
                    default:
                      if (!elementClickInfo.hasChild && elementClickInfo.nodeName !== 'INPUT' && elementClickInfo.nodeName !== 'BUTTON') {
                        // 如果是子节点，并且不属于上面所列类型及input和button，则判断为文本
                        elementClickInfo.dom = text;
                        elementClickInfo.nodeType = this.getI18nCommon('heatmap_analytics_txt');
                        elementClickInfo.title = elementClickInfo.dom;
                      } else {
                        // 如果是非子节点，并且不属于上面所列类型，则判断为框架
                        elementClickInfo.dom = text ? text : this.getI18nCommon('heatmap_analytics_frame');
                        elementClickInfo.nodeType = this.getI18nCommon('others');
                        elementClickInfo.title = elementClickInfo.dom.replace(/(\n)+|(\r\n)+/g, ""); //删除换行
                      }
                      break;
                  }
                  elementClickInfo.showText = elementClickInfo.showText || elementClickInfo.title; //不存在showText 的时候，用title代替
                  renderData.push(elementClickInfo);
                }

              }
            }
          } catch (err) {
            continue; //Error: 点击分布的选择器采集数据有错，则跳过该点
          }
        }

        //selector:选择器,hasChild:是否包含子元素,nodeName:节点名称,nodeType:节点类型,dom:节点文本(a元素的时候,是链接),title:节点文本
        // isActiveElement:是否是活动元素clickCount:点击次数,rate:占总点击数的百分比
        this._data = renderData;
      }
    };

    AnalysisMap.prototype._renderMap = function() {
      var AnalysisMap = this;
      AnalysisMap._clearMap();
      AnalysisMap._addStyleSheet();

      var $frameDocument = AnalysisMap._heatmapCore.getTargetDocument();
      if ($frameDocument) {
        var length = AnalysisMap._data.length;
        for (var i = 0; i < length; i++) {
          try {
            var elementClickInfo = AnalysisMap._data[i];
            var $element = $frameDocument.find(elementClickInfo.selector);

            var width = $element.width() + parseInt($element.css('padding-left')) + parseInt($element.css('padding-right'));
            var height = $element.height() + parseInt($element.css('padding-top')) + parseInt($element.css('padding-bottom'));
            var tipRank = getTipRank(width, height);
            var rateRank = getRateRank(elementClickInfo.rate);
            var r = (elementClickInfo.rate * 100).toFixed(2) + '%';
            var v = AnalysisMap._heatmapCore.constructor.toThousands(elementClickInfo.clickCount);
            if (!elementClickInfo.hasChild) { //最底层元素,不存在子节点的元素
              $element.addClass('ptDataTracked_child');
              if ($element.css('position') === 'static' && !$element.is('body')) {
                $element.css('position', 'relative');
              }
              if (tipRank) {
                $element.addClass('ptDataTracked_tips_' + tipRank);
                switch (tipRank) {
                  case 'a':
                    $element.attr('data-click', r + '\n(' + v + ')'); //可以放下2行,添加换行
                    break;
                  case 'b':
                    $element.attr('data-click', r + '(' + v + ')');
                    break;
                  case 'c':
                    $element.attr('data-click', r);
                    break;
                }
              }
            } else {
              $element.addClass('ptDataTracked_father');
            }

            $element.addClass('ptDataTracked')
              .attr('title', AnalysisMap.getI18nCommon('heatmap_analytics_page') + ' ' + r + "\n" + AnalysisMap.getI18nCommon('clicks') + ' ' + v)
              .attr('data-title', AnalysisMap.getI18nCommon('heatmap_analytics_page') + ' ' + r + "\n" + AnalysisMap.getI18nCommon('clicks') + ' ' + v)
              .attr('data-ratio', r)
              .attr('data-v', v);
            $element.addClass('ptDataTracked_' + rateRank); //根据百分比来添加不同的颜色样式
          } catch (err) {
            continue; //Error: 点击分布的选择器采集数据有错，则跳过该点
          }
        }
      }
    };

    /**
     * 处理数据,绘制分析热图,绘制composition列表,重新设置csv数据
     * @private
     */
    AnalysisMap.prototype._render = function() {
      this._processData();
      this._renderMap();
      this._composition.render(this._data);
      if (this._csv) {
        this._csv.setData({
          minPercent: this._getColorRatePercent(),
          data: this._data,
          isActiveElement: this._getIsActiveElement()
        });
      }
    };

    AnalysisMap.prototype._clearMap = function() {
      var $frameDocument = this._heatmapCore.getTargetDocument();
      if ($frameDocument) {
        $frameDocument.find('.ptDataTracked')
          .removeClass('ptDataTracked')
          .removeClass('ptDataTracked_child')
          .removeClass('ptDataTracked_father')
          .removeClass('ptDataTracked_tips_a')
          .removeClass('ptDataTracked_tips_b')
          .removeClass('ptDataTracked_tips_c')
          .removeClass('ptDataTracked_a')
          .removeClass('ptDataTracked_b')
          .removeClass('ptDataTracked_c')
          .removeClass('ptDataTracked_d')
          .removeClass('ptDataTracked_e')
          .removeClass('ptDataTracked_father_blink')
          .removeClass('ptDataTracked_blink')
          .removeAttr('data-click')
          .removeAttr('title')
          .removeAttr('data-title')
          .removeAttr('data-ratio')
          .removeAttr('data-v');
      }
    };

    //给frame页面添加ptEngine 的样式表
    AnalysisMap.prototype._addStyleSheet = function() {
      var $frameDocument = this._heatmapCore.getTargetDocument();
      if ($frameDocument) {
        //样式文件已经存在的话,就不需要再添加了
        var $stylesheet = $frameDocument.find('#ptDataTracked_stylesheet');
        if ($stylesheet.length) {
          return;
        }
        var fileRef = document.createElement("link");
        fileRef.id = "ptDataTracked_stylesheet";
        fileRef.rel = "stylesheet";
        fileRef.type = "text/css";
        fileRef.href = this._linkCssUrl + '/components/pagescene/ht-components/maps/links.css?' + new Date().getTime();
        fileRef.media = "screen";
        $frameDocument.find('head').append(fileRef);
      }
    };
    //删除frame页面添加的的样式表
    AnalysisMap.prototype._removeStyleSheet = function() {
      var $frameDocument = this._heatmapCore.getTargetDocument();
      if ($frameDocument) {
        $frameDocument.find('head #ptDataTracked_stylesheet').remove();
      }

    };

    AnalysisMap.prototype._bindEvent = function() {
      var AnalysisMap = this;
      AnalysisMap._heatmapCore.on('displayChange,colorRateChange', function() {
        if (!AnalysisMap._isActive) {
          return;
        }
        //样式的变更需要一段时间,所以设置一个0秒的延迟,保证页面样式的变化render完成
        setTimeout(function() {
          AnalysisMap._render();
        });
      });
      AnalysisMap._heatmapCore.on('frameStateChange', function(frameState) {
        if (!AnalysisMap._isActive || frameState !== 'loaded') {
          return;
        }
        //样式的变更需要一段时间,所以设置一个0秒的延迟,保证页面样式的变化render完成
        setTimeout(function() {
          AnalysisMap._render();

        });
      });
      AnalysisMap._heatmapCore.on('refresh', function() {
        var frameState = AnalysisMap._heatmapCore.getState('frameState');
        if (!AnalysisMap._isActive || frameState !== 'loaded') {
          return;
        }
        setTimeout(function() {
          AnalysisMap._render();
        });
      });
    };

    /**
     *初始化化热图组件（显示点击分布图，绑定事件。。。）
     * @param render 在初始化的同时是否绘制热图（从其他图切换到点击热图时，需要render=true）
     */
    AnalysisMap.prototype.init = function(render) {
      var AnalysisMap = this;
      AnalysisMap._isActive = true;
      AnalysisMap._composition.init();

      if (render) {
        //样式的变更需要一段时间,所以设置一个0秒的延迟,保证页面样式的变化render完成
        setTimeout(function() {
          AnalysisMap._render();
        });

      }
    };
    AnalysisMap.prototype.clear = function() {
      this._isActive = false;
      this._clearMap();
      this._composition.clear();
      if (this._csv) {
        this._csv.setData({
          minPercent: 0,
          data: [],
          isActiveElement: ''
        });
      }
      this._data = null;
    };
    AnalysisMap.prototype.getI18nCommon = function(key) {
      return this.$compositionElement.attr('data-i18n-common-' + key);
    };
    if (window.PT_OVERLAY_MAP) {
      window.PT_OVERLAY_MAP.scriptLoadedHandlers.push(function() {
        Composition = window.PT_OVERLAY_MAP.Composition;
      });
      window.PT_OVERLAY_MAP.AnalysisMap = AnalysisMap;
    } else {
      define(['ht-composition'], function(composition) {
        Composition = composition;
        return AnalysisMap;
      });
    }
  })(window, jQuery);


  /**
   * Created by yongsheng.kuang on 2016/1/29.
   */
  (function(window, $, undefined) {
    var ScrollmapFactory;

    /**
     * 根据屏幕方向处理top
     * @param pageOrientation 屏幕方向
     * @param top 高度
     * @returns {Number} 处理后的top
     */
    function getTopByPageOrientation(pageOrientation, top) {
      var returnTop = top;
      switch (pageOrientation) {
        case 'V':
          returnTop = top;
          break;
        case 'H':
          returnTop = -1 * top;
          if (returnTop === 0) { //top===0 时,如果是横屏 则忽略
            returnTop = -1;
          }
          break;
        default:
          returnTop = Math.abs(top);
          break;

      }
      return returnTop;
    }

    function AttentionMap(element, heatmapCore) {
      var AttentionMap = this;
      AttentionMap.$element = $(element);
      AttentionMap._heatmapCore = heatmapCore;

      AttentionMap.$element.addClass('pt-hide');
      AttentionMap._data = null; //处理后的热图数据
      AttentionMap._isActive = false; //是否是激活状态，只有在激活状态时，才做相关事件处理
      AttentionMap._bindEvent();
    }

    /**
     * 将dataCenter中点击热图的数据处理为可绘制的数据
     * @private
     */
    AttentionMap.prototype._processData = function() {
      var currentScale = this._heatmapCore.getScale(); //当前frame和实际页面的缩放比例
      var pageOrientation = this._heatmapCore.getPageOrientation(); //屏幕方向
      var data = [];
      var srcData = this._heatmapCore.getMapData('attention').attention; //dataCenter中的原始数据
      var length = srcData.length;
      for (var i = 0; i < length; i = i + 3) {
        var y = getTopByPageOrientation(pageOrientation, srcData[i]); //注意力纵向高度
        var h = srcData[i + 1]; //注意力用户的窗体高度
        var v = srcData[i + 2]; //加权值
        if (y >= 0) { //y>0 时，表示数据和当前的屏幕方向一致
          // 如果有y值超过20000，则视为将其修正为0，即横竖屏的最上端的值
          y = (y > 20000 ? 0 : y);
          // y值做缩放
          y = y * currentScale;

          // 如果h小于200，视为非正常值，赋默认值320
          // 如果h大于1500，视为非正常值，赋默认值1500
          h = (h < 200 ? 320 : h);
          h = Math.min(h, 1500);
          // h值做缩放
          h = h * currentScale;

          // 在注意力条数超过600条后，首屏的v值缩小，除首屏外的h值缩小
          if (length >= 600) {
            if (y < h) {
              v = v * 0.1;
            } else {
              h = h * 0.6;
            }
          }
          data.push({
            y: y,
            h: h,
            v: v
          });
        }
      }

      // 按v值排序弱化第1,2,3位的v值
      data = data.sort(function(a, b) {
        return b.v - a.v;
      });
      if (data.length > 3) {
        data[2].v = Math.round(data[3].v * 1.3);
      }
      if (data.length > 2) {
        data[1].v = Math.round(data[2].v * 1.2);
      }
      if (data.length > 1) {
        data[0].v = Math.round(data[1].v * 1.1);
      }

      var vMax = data[0] ? data[0].v : 0;
      this._data = {
        max: vMax,
        data: data
      };
    };
    //绘制注意力热图
    AttentionMap.prototype._renderMap = function() {
      if (this._heatmap) { //先清空上一次绘制的注意力热图
        this._heatmap.cleanup();
        this._heatmap = null;
      }
      if (!this._data.data.length) { //没有可绘制的注意力数据时，退出
        return;
      }
      this._heatmap = new ScrollmapFactory.create({
        opacity: 60,
        element: this.$element[0],
        width: this.$element.width(),
        height: Math.min(this.$element.height(), Math.pow(2, 15) - 2) // 支持火狐浏览器 http://jira.ptmind.com/browse/FB-2118
      });
      var max = this._data.max * this._heatmapCore.getColorRate();
      max = (max < 1 ? 1 : max);
      this._heatmap.store.setDataSet({
        max: max,
        data: this._data.data
      });
    };

    AttentionMap.prototype._bindEvent = function() {
      var AttentionMap = this;
      //frame 页面加载完成event 的处理handler
      AttentionMap._heatmapCore.on('frameStateChange', function(frameState) {
        if (!AttentionMap._isActive || frameState !== 'loaded') {
          return;
        }
        //样式的变更需要一段时间,所以设置一个0秒的延迟,保证页面样式的变化render完成
        setTimeout(function() {
          AttentionMap._processData();
          AttentionMap._renderMap();
        });

      });
      //颜色条变更event 的处理handler
      AttentionMap._heatmapCore.on('colorRateChange', function() {
        if (!AttentionMap._isActive) {
          return;
        }
        //样式的变更需要一段时间,所以设置一个0秒的延迟,保证页面样式的变化render完成
        setTimeout(function() {
          AttentionMap._renderMap();
        });
      });

      AttentionMap._heatmapCore.on('refresh', function() {
        var frameState = AttentionMap._heatmapCore.getState('frameState');
        if (!AttentionMap._isActive || frameState !== 'loaded') {
          return;
        }
        //样式的变更需要一段时间,所以设置一个0秒的延迟,保证页面样式的变化render完成
        setTimeout(function() {
          AttentionMap._processData();
          AttentionMap._renderMap();
        });
      });
    };

    /**
     *初始化化热图组件（显示点击热图，绑定事件。。。）
     * @param render 在初始化的同时是否绘制热图（从其他图切换到注意力热图时，需要render=true）
     */
    AttentionMap.prototype.init = function(render) {
      var AttentionMap = this;
      AttentionMap._isActive = true;
      AttentionMap.$element.removeClass('pt-hide');
      if (render) {
        //样式的变更需要一段时间,所以设置一个0秒的延迟,保证页面样式的变化render完成
        setTimeout(function() {
          AttentionMap._processData();
          AttentionMap._renderMap();
        });

      }
    };
    /**
     * 切换到其他图时，需要清空注意力热图
     */
    AttentionMap.prototype.clear = function() {
      this._isActive = false;
      this.$element.addClass('pt-hide');
      this._data = null;
    };

    if (window.PT_OVERLAY_MAP) {
      window.PT_OVERLAY_MAP.scriptLoadedHandlers.push(function() {
        ScrollmapFactory = window.PT_OVERLAY_MAP.ScrollmapFactory;
      });
      window.PT_OVERLAY_MAP.AttentionMap = AttentionMap;
    } else {
      define(['ht-lib-scrollmapFactory'], function(scrollmapFactory) {
        ScrollmapFactory = scrollmapFactory;
        return AttentionMap;
      });
    }
  })(window, jQuery);

  /**
   * Created by yongsheng.kuang on 2016/1/29.
   */
  (function(window, $, undefined) {
    var ClickmapFactory;

    /**
     * 根据数据量来设置radius
     * @param clickCount 点击数
     */
    function computeRadius(clickCount) {
      var radius = 10;
      if (clickCount >= 14000) {
        radius = 5;
      } else if (clickCount >= 12000) {
        radius = 6;
      } else if (clickCount >= 10000) {
        radius = 7;
      } else if (clickCount >= 7000) {
        radius = 8;
      } else if (clickCount >= 5000) {
        radius = 9;
      }
      return radius;
    }

    /**
     * 根据屏幕方向处理Postion
     * @param pageOrientation 屏幕方向
     * @param position {x:left,y:top}
     * @returns {Number} 处理后的top
     */
    function getPositionByPageOrientation(pageOrientation, position) {
      var returnPosition = position;
      switch (pageOrientation) {
        case 'V':
          returnPosition = position;
          break;
        case 'H':
          returnPosition = {
            x: -1 * position.x,
            y: -1 * position.y
          };
          break;
        default:
          returnPosition = {
            x: Math.abs(position.x),
            y: Math.abs(position.y)
          };
          break;

      }
      return returnPosition;
    }


    function ClickMap(element, heatmapCore) {
      var ClickMap = this;
      ClickMap.$element = $(element);
      ClickMap._heatmapCore = heatmapCore;

      ClickMap.$element.addClass('pt-hide');
      ClickMap._data = null; //处理后的热图数据
      ClickMap._isActive = false; //是否是激活状态，只有在激活状态时，才做相关事件处理
      ClickMap._bindEvent();
    }

    /**
     * 将dataCenter中点击热图的数据处理为可绘制的数据
     * @private
     */
    ClickMap.prototype._processData = function() {
      var ClickMap = this;
      var currentScale = ClickMap._heatmapCore.getScale(); //当前frame和实际页面的缩放比例
      var $targetDocument = ClickMap._heatmapCore.getTargetDocument();
      if (!$targetDocument) {
        return;
      }
      var data = [];
      var srcData = ClickMap._heatmapCore.getMapData('click').click; //dataCenter中的原始数据
      var clickCount = 0; //点击总次数
      var pageOrientation = ClickMap._heatmapCore.getPageOrientation();

      var showHide = ClickMap._heatmapCore.getDisplay().showHide;

      $.each(srcData, function(i, v) {
        try {
          var d = v.d; //点击信息:[点击位置x,y,用户浏览器宽度,点击次数,元素坐标x,y]
          var selector = ClickMap._heatmapCore.constructor.decodeURIComponent(v.s.substr(1)); //元素选择器
          var $targetElement = $targetDocument.find(selector);
          var targetPosition = $targetElement.offset(); //点击元素在当前frame中的位置

          var noneElement = !$targetElement.length || !$targetElement.is(':visible') || !targetPosition; //元素是否找不到或者隐藏
          if (noneElement && !showHide) { //热图display中如果设置了不显示 则忽略该元素的所有热点
            return;
          }
          $.each(d, function(index, value) {
            var scale = currentScale;
            var position = getPositionByPageOrientation(pageOrientation, {
              x: value[0],
              y: value[1]
            });
            var x = position.x; //用户点击时，点击点在用户浏览器的位置
            var y = position.y; //用户点击时，点击点在用户浏览器的位置
            //var w = value[2];//用户点击时，在用户浏览器的宽度
            var c = value[3]; //点击的次数
            var ex = value[4]; //用户点击时，元素在用户浏览器的位置
            var ey = value[5]; //用户点击时，元素在用户浏览器的位置
            if (x <= 0 || y <= 0) { //负值表示屏幕的方向不一致
              return;
            }
            var canvas_x, canvas_y;
            if (noneElement) { //找不到或者不可见元素的热点热点位置 = 采集时 点击的位置
              canvas_x = (x * scale).toFixed(0);
              canvas_y = (y * scale).toFixed(0);
            } else { //可见元素 的热点位置 =  (热图底图中元素的位置 - 采集时元素的位置 +采集时 点击的位置)
              canvas_x = ((targetPosition.left - ex + x) * scale).toFixed(0);
              canvas_y = ((targetPosition.top - ey + y) * scale).toFixed(0);
            }
            clickCount += c
            data.push({
              x: canvas_x,
              y: canvas_y,
              v: c
            });
          });
        } catch (err) {
          //发生异常时,继续下一个
        }
      });
      var radius = computeRadius(clickCount);
      var dataLength = data.length;
      var sortedData = data.sort(function(x, y) {
        return x.v - y.v;
      });
      var vMax = dataLength ? sortedData[dataLength - 1].v : 1;
      //var vMin = dataLength? sortedData[0].v:1;
      //if(vMax/vMin > 10){//大于10倍以后，将适时调节调色条位置至60%处
      //    //.....
      //}
      this._data = {
        max: vMax,
        data: data,
        radius: radius
      };
    };

    /**
     * 绘制热图
     * @private
     */
    ClickMap.prototype._renderMap = function() {
      if (this._heatmap) { //先清空上一次绘制的点击热图
        this._heatmap.cleanup();
        this._heatmap = null;
      }
      this._heatmap = new ClickmapFactory.create({
        radius: this._data.radius,
        opacity: 60,
        visible: true,
        element: this.$element[0],
        width: this.$element.width(),
        height: Math.min(this.$element.height(), Math.pow(2, 15) - 2) // 支持火狐浏览器 http://jira.ptmind.com/browse/FB-2118
      });
      var max = this._data.max * this._heatmapCore.getColorRate();
      max = (max < 1 ? 1 : max);
      this._heatmap.store.setDataSet({
        max: max,
        data: this._data.data
      });
    };

    ClickMap.prototype._bindEvent = function() {
      var ClickMap = this;
      //frame 页面加载完成event 的处理handler
      ClickMap._heatmapCore.on('frameStateChange', function(frameState) {
        if (!ClickMap._isActive || frameState !== 'loaded') {
          return;
        }
        //样式的变更需要一段时间,所以设置一个0秒的延迟,保证页面样式的变化render完成
        setTimeout(function() {
          ClickMap._processData();
          ClickMap._renderMap();
        });
      });

      //颜色条变更event 的处理handler
      ClickMap._heatmapCore.on('colorRateChange', function() {
        if (!ClickMap._isActive) {
          return;
        }
        //样式的变更需要一段时间,所以设置一个0秒的延迟,保证页面样式的变化render完成
        setTimeout(function() {
          ClickMap._renderMap();
        });
      });

      //display 变更event 的处理handler
      ClickMap._heatmapCore.on('displayChange', function() {
        if (!ClickMap._isActive) {
          return;
        }
        //样式的变更需要一段时间,所以设置一个0秒的延迟,保证页面样式的变化render完成
        setTimeout(function() {
          ClickMap._processData();
          ClickMap._renderMap();
        });
      });

      ClickMap._heatmapCore.on('refresh', function() {
        var frameState = ClickMap._heatmapCore.getState('frameState');
        if (!ClickMap._isActive || frameState !== 'loaded') {
          return;
        }
        //样式的变更需要一段时间,所以设置一个0秒的延迟,保证页面样式的变化render完成
        setTimeout(function() {
          ClickMap._processData();
          ClickMap._renderMap();
        });
      });
    };

    /**
     *初始化化热图组件（显示点击热图，绑定事件。。。）
     * @param render 在初始化的同时是否绘制热图（从其他图切换到点击热图时，需要render=true）
     */
    ClickMap.prototype.init = function(render) {
      var ClickMap = this;
      ClickMap._isActive = true;
      ClickMap.$element.removeClass('pt-hide');
      if (render) {
        //样式的变更需要一段时间,所以设置一个0秒的延迟,保证页面样式的变化render完成
        setTimeout(function() {
          ClickMap._processData();
          ClickMap._renderMap();
        });
      }
    };
    /**
     * 切换到其他图时，需要清空点击热图
     */
    ClickMap.prototype.clear = function() {
      var ClickMap = this;
      ClickMap._isActive = false;
      ClickMap.$element.addClass('pt-hide');
      if (ClickMap._heatmap) {
        ClickMap._heatmap.cleanup();
        ClickMap._heatmap = null;
      }
      ClickMap._data = null;
    };

    if (window.PT_OVERLAY_MAP) {
      window.PT_OVERLAY_MAP.scriptLoadedHandlers.push(function() {
        ClickmapFactory = window.PT_OVERLAY_MAP.ClickmapFactory;
      });
      window.PT_OVERLAY_MAP.ClickMap = ClickMap;
    } else {
      define(['ht-lib-clickmapFactory'], function(clickmapFactory) {
        ClickmapFactory = clickmapFactory;
        return ClickMap;
      });
    }
  })(window, jQuery);

  /**
   * Created by yongsheng.kuang on 2016/2/4.
   */
  (function(window, $, undefined) {
    /**
     * 根据屏幕方向处理top
     * @param pageOrientation 屏幕方向
     * @param top 高度
     * @returns {Number} 处理后的top
     */
    function getTopByPageOrientation(pageOrientation, top) {
      var returnTop = top;
      switch (pageOrientation) {
        case 'V':
          returnTop = top;
          break;
        case 'H':
          returnTop = -1 * top;
          break;
        default:
          returnTop = Math.abs(top);
          break;

      }
      return returnTop;
    }

    function Readline(element, heatmapCore) {
      var Readline = this;
      Readline.$element = $(element);
      Readline._heatmapCore = heatmapCore;
      Readline.$element.addClass('pt-hide');
      this._bindEvent();
    }

    /**
     * 处理阅读线数据
     * @returns {relineTop:{value:'值',percent:'相对于第一屏值得比率'}}
     * @private
     */
    Readline.prototype._processData = function() {
      var srcData = this._heatmapCore.getMapData('readline').readline; //从服务端获取的原始数据
      var terminalHeight; //设备高度
      var slaveMapData = this._heatmapCore.getSlaveMapData();
      var scale = this._heatmapCore.getScale(); //frame 和热图的缩放比例
      if (slaveMapData && slaveMapData.containerSize) { //弹出热图/分享热图
        //设备高度 ＝ 原热图的容器大小 * (当前缩放比率/原热图缩放比率)
        terminalHeight = slaveMapData.containerSize.height * (scale / slaveMapData.scale);
      } else {
        terminalHeight = this.$element.parents('.js-map-container:first').height(); //设备高度
      }
      var mapHeight = this.$element.height(); //整个热图的高度
      var region = (mapHeight / scale > 1000) ? 103 : 53; // 阅读线间距
      var firstTop = terminalHeight; //第一个readline的top

      var pageOrientationData = []; //当前屏幕方向的数据
      var pageOrientation = this._heatmapCore.getPageOrientation();

      var length = srcData.length;
      var index = 0;
      while (index < length) {
        var top = getTopByPageOrientation(pageOrientation, srcData[index]); //负值的是纵向
        if (top > 0) { //top大于0 表示是当前屏幕的数据
          top = top * scale;
          top = (top > mapHeight ? mapHeight : top); //如果溢出，则算在最后
          pageOrientationData.push({
            top: top,
            value: srcData[index + 1]
          });
        }
        index = index + 2;
      }
      var readlineData = {}; //最终的readline的数据


      //当阅读线的的top 大约上一个阅读线的top,则 全部计算到该阅读区域
      var lastTop = 0;
      var readlineTop = firstTop;
      while (readlineTop < mapHeight) {
        var v = 0;
        $.each(pageOrientationData, function(i, obj) {
          if (obj.top >= lastTop) {
            v = v + obj.value;
          }
        })
        readlineData[readlineTop] = {
          value: v
        }; //将累加的数据添加到当前阅读线
        lastTop = readlineTop; //继续处理下一个阅读线
        readlineTop = readlineTop + region * scale; //继续处理下一个阅读线
      }


      var firstData = readlineData[firstTop];
      for (var key in readlineData) {
        var obj = readlineData[key];
        if (firstData && firstData.value) {
          obj.percent = obj.value / firstData.value;
          obj.percent = (obj.percent > 1 ? 1 : obj.percent); //超过100% 只计算为100%
        }
      }
      return readlineData;
    };
    /**
     * 绘制阅读线
     * @private
     */
    Readline.prototype._renderReadline = function() {
      var Readline = this;
      var $element = Readline.$element;
      $element.empty();
      var display = Readline._heatmapCore.getDisplay(Readline._mapType);
      if (!display.readline) {
        return;
      }
      var readlineData = Readline._processData();
      $.each(readlineData, function(readlineTop, obj) {
        if (obj.percent > 0) { //只绘制阅读线大约0%的
          var percent = (obj.percent * 100).toFixed(0) + '%';
          var textClass = (obj.percent > 0.5 ? 'span-r' : 'span-l')
          var html = [
            '<div class="pt-heatmap-readline" style="top: ' + readlineTop + 'px">',
            '    <div class="pt-heatmap-readline-bg">',
            '        <p style="width: ' + percent + ' ">',
            '        <span class="' + textClass + '">',
            '            <em>' + $element.attr('data-i18n-common-scroll_arrival_rate') + '</em>',
            '            <strong>' + percent + '</strong>',
            '        </span>',
            '        </p>',
            '    </div>',
            '</div>'
          ];
          $element.append(html.join(''));
        }
      });
    };

    /**
     * 绑定事件
     * @private
     */
    Readline.prototype._bindEvent = function() {
      var Readline = this;
      //frame 页面加载完成event 的处理handler
      Readline._heatmapCore.on('frameStateChange', function(frameState) {
        if (!Readline._isActive || frameState !== 'loaded') {
          return;
        }
        //样式的变更需要一段时间,所以设置一个0秒的延迟,保证页面样式的变化render完成
        setTimeout(function() {
          Readline._renderReadline();
        });
      });
      //是否显示readline变更
      Readline._heatmapCore.on('displayChange', function() {
        if (!Readline._isActive) {
          return;
        }
        //样式的变更需要一段时间,所以设置一个0秒的延迟,保证页面样式的变化render完成
        setTimeout(function() {
          Readline._renderReadline();
        });
      });

      Readline._heatmapCore.on('refresh', function() {
        var frameState = Readline._heatmapCore.getState('frameState');
        if (!Readline._isActive || frameState !== 'loaded') {
          return;
        }
        //样式的变更需要一段时间,所以设置一个0秒的延迟,保证页面样式的变化render完成
        setTimeout(function() {
          Readline._renderReadline();
        });
      });
    };

    /**
     *初始化readline组件（根据display的设置决定是否显示readline，绑定事件。。。）
     * @param render 在初始化的同时是否绘制readline（从其他图切换到点击热图/滚动热图时，需要render=true）
     */
    Readline.prototype.init = function(mapType, render) {
      var Readline = this;
      Readline._mapType = mapType;
      Readline._isActive = true;
      Readline.$element.removeClass('pt-hide');

      if (render) {
        //样式的变更需要一段时间,所以设置一个0秒的延迟,保证页面样式的变化render完成
        setTimeout(function() {
          Readline._renderReadline();
        });
      }
    };
    //切换到其他图时，先清空readline
    Readline.prototype.clear = function() {
      this._isActive = false;
      this.$element.addClass('pt-hide');
      this.$element.empty();
    };

    if (window.PT_OVERLAY_MAP) {
      window.PT_OVERLAY_MAP.Readline = Readline;
    } else {
      define(function() {
        return Readline;
      });
    }
  })(window, jQuery);

  var $ = jQuery;
  var cssUrls = [
    //importUrl + '/styles/pt-base.css',
    //importUrl + '/components/pagescene/heatmap/heatmap.css',
    //importUrl + '/components/pagescene/overlay/overlay.css',
    //importUrl + '/components/pagescene/ht-components/readline/readline.css',
    //importUrl + '/components/pagescene/ht-components/toolbar/colorBar.css',
    //importUrl + '/components/pagescene/ht-components/toolbar/composition.css',
    //importUrl + '/components/pagescene/ht-components/toolbar/display.css',
    //importUrl + '/components/pagescene/ht-components/toolbar/toolbar.css'
    importUrl + '/components/pagescene/overlay/pt-overlay.css' //grunt 会将上面的css 合并成pt-overlay.css
  ];

  var cssLength = cssUrls.length;
  for (var i = 0; i < cssLength; i++) {
    loadCss(cssUrls[i]);
  }


  $.when(loadData(), loadHTML()).done(function(dataResult, HTMLResult) {
    var data = dataResult[0];
    var html = HTMLResult[0].htmlTemplate;
    $(document.body).append(html);
    window.PT_OVERLAY_MAP.loaded();
    resetFrame();
    initDropDownList();
    initParamInfo(data);
    heatmapInit(data);
    // 菜单的下拉和收起
    $(".js-pt-heatmap-packup").on("click", packUpToolbar);
    $(".js-pt-heatmap-toolbar-up").on("click", showToolbar);
  }).fail(function() {
    //alert('resources load error!!!');
  });

  function loadCss(url) {
    var fileRef = document.createElement("link");
    fileRef.rel = "stylesheet";
    fileRef.type = "text/css";
    fileRef.href = url;
    fileRef.media = "screen";
    document.head.appendChild(fileRef);
  }

  function loadData() {
    return $.ajax({
      url: ptDataUrl,
      data: {
        heatMapKey: PT_KEY
      },
      dataType: "jsonp",
      jsonp: "ptmindHeatMapDataJsonP"
    });
  }


  function loadHTML() {
    return $.ajax({
      url: importUrl + '/pagescene/getOverlayHtmlTemplate.pt',
      dataType: 'jsonp',
      jsonp: "ptmindHeatMapHtmlTemplateJsonP"
    });
  }

  function resetFrame(callback) {
    //var $body = $(document.body);
    //var $toolbar = $('.js-heatmap-toolbar');
    //if ($body.width() <= 1200) {
    //    $toolbar.addClass('pt-heatmap-overlaymap-little');
    //} else {
    //    $toolbar.removeClass('pt-heatmap-overlaymap-little');
    //}
    var $mapContainer = $('.js-heatmap-overlaymap-container');
    $mapContainer.css('height', 0);

    var size = getPageSize($(document));
    $mapContainer.css('height', size.height);
    if (callback) {
      callback();
    }
  }

  function getPageSize($document) {
    var $body = $document.find('body');
    var $html = $body.parent();
    var bodyWidth = $body[0].scrollWidth || $document[0].documentElement.scrollWidth;
    var bodyHeight = $body[0].scrollHeight || $document[0].documentElement.scrollHeight;
    var htmlWidth = Math.max($html.width(), $html[0].scrollWidth);
    var htmlHeight = Math.max($html.height(), $html[0].scrollHeight);
    var width = Math.max(bodyWidth, htmlWidth);
    var height = Math.max(bodyHeight, htmlHeight);

    return {
      width: width,
      height: height
    }
  }

  function initDropDownList() {
    $(document).on('click', function(e) {
      var $target = $(e.target);
      if ($target.attr('data-pt-plugin-hidelayer') || $target.parents('[data-pt-plugin-hidelayer]').attr('data-pt-plugin-hidelayer')) {
        return;
      }
      var $dropDownTitle = $target.is('.pt-dropdown-title') ? $target : $target.parents('.pt-dropdown-title');
      var $dropBox;
      if ($dropDownTitle.length) {
        $dropBox = $dropDownTitle.siblings('.pt-dropdown-box,.pt-dropdown-panel');
        if ($dropBox.is('.pt-plugin-hidelayer-show')) {
          $dropBox.removeClass('pt-plugin-hidelayer-show');
          $dropDownTitle.removeClass('data-pt-plugin-hidelayer-active');
        } else {
          $('.pt-dropdown-box,.pt-dropdown-panel').removeClass('pt-plugin-hidelayer-show');
          $('.pt-dropdown-title').removeClass('data-pt-plugin-hidelayer-active');

          $dropBox.addClass('pt-plugin-hidelayer-show');
          $dropDownTitle.addClass('data-pt-plugin-hidelayer-active');
        }
      } else {
        $dropBox = $('.pt-dropdown-box,.pt-dropdown-panel').filter('.pt-plugin-hidelayer-show');
        $('.pt-dropdown-box,.pt-dropdown-panel').removeClass('pt-plugin-hidelayer-show');
        $('.pt-dropdown-title').removeClass('data-pt-plugin-hidelayer-active');
      }
      if ($dropBox && $dropBox.length) {
        $dropBox.trigger('layerChange');
      }
    });
  }

  function initParamInfo(data) {
    var time = data.time;
    var startDate = formatDate(parseInt(time.startTime) * 1000, 'yyyy/MM/dd');
    var endDate = formatDate(parseInt(time.endTime) * 1000, 'yyyy/MM/dd');
    var inday = formatDate(time.inTime, 'yyyy/MM/dd');
    var $paramInfo = $('.js-heatmap-overlaymap-param-info');
    var $clicks = $paramInfo.find('.js-heatmap-overlaymap-param-info-clicks');
    var $date = $paramInfo.find('.js-heatmap-overlaymap-param-info-date');
    var $filter = $paramInfo.find('.js-heatmap-overlaymap-param-info-filter');
    var $combination = $paramInfo.find('.js-heatmap-overlaymap-param-info-combination');
    var urlCombine = formatUrlCombine(data.parameter.merge);
    $clicks.find('.js-heatmap-overlaymap-param-info-clicks-text').text(window.PT_OVERLAY_MAP.HeatmapCore.toThousands(data.clickCount));

    if (startDate < inday) {
      if (startDate === endDate) {
        $date.text(startDate);
      } else {
        $date.text(startDate + '~' + endDate);
      }

    } else {
      var inDatetime = formatDate(parseInt(time.inTime), 'yyyy/MM/dd  hh:mm:ss');
      $date.text(inDatetime);
    }

    if (data.filter && data.filter.length) {
      $filter.find('.js-heatmap-overlaymap-param-info-filter-text').text(data.filter.join('&'));
    } else {
      $filter.addClass('pt-hide');
    }
    if (data.rangetype === 'page') {
      if (urlCombine) {
        $combination.find('.js-heatmap-overlaymap-param-info-combination-text').text(window.PT_OVERLAY_MAP.HeatmapCore.decodeURIComponent(urlCombine)).attr('title', window.PT_OVERLAY_MAP.HeatmapCore.decodeURIComponent(urlCombine));
        $combination.removeClass('pt-hide');
      }
    }
  }

  function formatUrlCombine(merge) {
    var mergeParamUrl = merge.url;
    var mergeParamList = merge.paramlist;

    var mergeParam = '';
    if (mergeParamUrl) {
      mergeParam = mergeParamUrl;
    }
    if (mergeParamList) {
      mergeParam = mergeParam + "?";
      for (var i = 0; i < (mergeParamList.length); i++) {
        mergeParam += mergeParamList[i].replace(/\"/g, "") + "&";
      }
      mergeParam = mergeParam.slice(0, mergeParam.length - 1);
    }
    if (mergeParamUrl && (!mergeParamList || !mergeParamList.length)) {
      mergeParam = mergeParam + "*\t(*" + $('.js-heatmap-overlaymap-param-info-combination').attr('data-i18n-common-is_wildcard') + ")";
    }

    return mergeParam;
  }

  function initSwitch(callback) {
    var $switch = $('.js-switch-wrap');
    var $switchSlider = $('.js-switch-slider');
    $switch.click(function() {
      var status = $switchSlider.attr('data-status');
      var newStatus = status === 'on' ? 'off' : 'on';
      $switchSlider.attr('data-status', newStatus);
      if (callback) {
        setTimeout(function() {
          callback(newStatus === 'on' ? true : false);
        }, 500); //switch 按钮动画完成后再callback//todo 可以通过监听动画完成事件来优化
      }
    });
  }

  function heatmapInit(data) {

    var mapType = data.mapType;

    var heatmapCore = new window.PT_OVERLAY_MAP.HeatmapCore(false, function() {
      return $(document);
    });
    heatmapCore.init();
    heatmapCore.initSlaveMapData({
      rangetype: data.rangetype,
      pageOrientation: data.pageOrientation,
      pageGroupInfo: data.pageGroupInfo,
      mapType: mapType,
      scale: data.scale,
      clickCount: data.clickCount,
      containerSize: data.containerSize,
      readline: data.readline,
      data: data.mapData
    });

    heatmapCore.on('refresh', function() {
      $('.js-heatmap-overlaymap-loading').removeClass('pt-hide');
      window.setTimeout(function() {
        resetFrame();
        $('.js-heatmap-overlaymap-loading').addClass('pt-hide');

      }, 1000);
    });
    var colorBar = new window.PT_OVERLAY_MAP.ColorBar('.js-color-bar', heatmapCore);
    var display = new window.PT_OVERLAY_MAP.Display('.js-heatmap-display', heatmapCore);
    var refresh = new window.PT_OVERLAY_MAP.Refresh('.js-heatmap-refresh', heatmapCore);
    var clickMap = new window.PT_OVERLAY_MAP.ClickMap('.js-heatmap-canvas-click', heatmapCore);
    var attentionMap = new window.PT_OVERLAY_MAP.AttentionMap('.js-heatmap-canvas-attention', heatmapCore);
    var analysisMap = new window.PT_OVERLAY_MAP.AnalysisMap(heatmapCore, {
      scrollElement: 'body',
      compositionElement: '.js-heatmap-composition',
      linkCssUrl: importUrl
    });
    var readline = new window.PT_OVERLAY_MAP.Readline('.js-heatmap-readline-container', heatmapCore);

    clickMap.clear();
    attentionMap.clear();
    analysisMap.clear();
    readline.clear();

    colorBar.init();
    display.init();

    switch (mapType) {
      case 'click':
        clickMap.init(true);
        readline.init(mapType, true);
        break;
      case 'attention':
        attentionMap.init(true);
        readline.init(mapType, true);
        break;
      case 'analysis':
        analysisMap.init(true);
        break;
    }

    //窗体大小变化时,重绘热图
    $(window).on('resize', function() {
      throttle(function() {
        colorBar.refresh();
        heatmapCore.refresh();
      });
    });
    //开关热图
    initSwitch(function(effect) {
      if (!effect) {
        clickMap.clear();
        attentionMap.clear();
        analysisMap.clear();
        readline.clear();
      } else {
        switch (mapType) {
          case 'click':
            clickMap.init(true);
            readline.init(mapType, true);
            break;
          case 'attention':
            attentionMap.init(true);
            readline.init(mapType, true);
            break;
          case 'analysis':
            analysisMap.init(true);
            break;
        }
      }
    });
    $('.js-heatmap-overlaymap-loading').addClass('pt-hide');
  }

  // 节流函数
  function throttle(method, context) {
    clearTimeout(method.tid);
    method.tid = setTimeout(function() {
      method.call(context);
    }, 100);
  };


  function formatDate(d, format) {
    var date = new Date(d);
    var o = {
      "M+": date.getMonth() + 1, //month
      "d+": date.getDate(), //day
      "h+": date.getHours(), //hour
      "m+": date.getMinutes(), //minute
      "s+": date.getSeconds(), //second
      "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
      "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  }

  // 菜单下拉收起
  function packUpToolbar() {
    $(".js-heatmap-toolbar").animate({
      top: "-80px"
    }, function() {
      $(".js-pt-heatmap-toolbar-up").addClass("animated bounceInDown");
    });
  }

  function showToolbar() {
    $(".js-pt-heatmap-toolbar-up").removeClass("animated bounceInDown");
    $(".js-pt-heatmap-toolbar-up").fadeOut();

    $(".js-heatmap-toolbar").animate({
      top: 0
    });
  }


  /**
   * Created by yongsheng.kuang on 2016/4/1.
   */
})(window)
