_pt_sp_2.push('setDomain,rx.top');
_pt_sp_2.push('setServer,0');
_pt_sp_2.push('setEventReport,true'); /*event open*/
(function(da) {
  window["edc7uo"] = -1;

  function Ta() {
    var a = "";
    if (Ua) switch (wa) {
      case "GoogleOptimize":
        window.V && window.V.ga && window.V.ha && (a += gaData.ga + "|p||p|" + gaData.ha + "|p||p|" + wa);
        break;
      default:
        if (typeof optimizely == "object") {
          var b = optimizely.activeExperiments;
          if (b && b.length > 0)
            for (var c = 0; c < b.length; c++) a += c == 0 ? "" : "|o|", a += b[c] + "|p|" + optimizely.data.experiments[b[c]].name.substr(0, 100) + "|p|" + optimizely.variationIdsMap[b[c]][0] + "|p|" + optimizely.variationNamesMap[b[c]].substr(0, 100), a += "|p|" + wa
        }
    }
    return a ? "&op=" + p.g(a, !1) :
      ""
  }

  function Ia() {
    var a = n.getElementsByTagName("a"),
      b = "";
    if (la == "allManual")
      for (var c = 0; c < a.length; c++) {
        if ((b = a[c].getAttribute("href")) && a[c].getAttribute("onclick") && a[c].getAttribute("onclick").indexOf("pt_domain") > -1)
          for (var e = b.toLowerCase(), d = 0; d < v.length; d++)
            if (e.indexOf(v[d]) > -1 && (b.indexOf(location.hostname) < 0 || b.indexOf(location.hostname) > e.indexOf(v[d]))) {
              a[c].setAttribute("href", Va(b));
              break
            }
      } else if (la == "halfManual")
        for (c = 0; c < a.length; c++)
          if ((b = a[c].getAttribute("href")) && b.match(/^https?:\/\//) &&
            b.length < 900) {
            e = b.toLowerCase();
            for (d = 0; d < v.length; d++)
              if (e.indexOf(v[d]) > -1 && (b.indexOf(location.hostname) < 0 || b.indexOf(location.hostname) > e.indexOf(v[d]))) {
                a[c].setAttribute("href", Va(b));
                break
              }
          }
  }

  function Va(a) {
    var b = a.split("#");
    l.o();
    if (l.l) {
      var c = l.e("uid") + "." + l.e("nid") + "." + l.e("vid") + "." + l.e("sact") + "." + l.e("vn") + "." + l.e("pvn") + "." + (m.localStorage && typeof m.localStorage.removeItem == "function" && m.localStorage.getItem(qa) ? m.localStorage.getItem(qa).replace(/\./g, "*_*").replace(/\?/g, "*_wh_*") :
        "");
      if (b.length == 1) a += "#_pt_link=" + c;
      else if (la == "allManual" || la == "halfManual") a = b[0] + (a.indexOf("?") == -1 ? "?" : "&") + "_pt_link=" + c + "#" + b[1]
    }
    return a
  }

  function ma(a, b, c) {
    var c = c ? c : w,
      b = b ? b : R,
      e = (new Date).getTime();
    if (!(a != "vpv" && e - ea < 1E4)) {
      l.o();
      ia = f.w();
      ra = 0;
      ea = S = fa = e;
      a == "pn" ? (x = "1", z = l.e("vn"), ga = l.L(), U = "", u = p.j(o + b + S + "v"), z = +z + 1, t = 1) : (U = l.e("pl"), u = l.e("vid"), t = (t = l.e("pvn")) ? +t + 1 : 1);
      I = p.j(o + u + b + fa + "v");
      U = l.H(w);
      l.s();
      A = "?id=" + q + "." + o + "." + u + "." + c + "." + I + "&stat=" + (a == "pn" ? +z == 0 ? 1 : +z : t) + "." + (s == 1 ? f.i() :
        (f.i() + 1) * s) + "." + ia * s + "." + f.m() + ".0.0" + (a == "pn" ? "" : "." + z) + "&ref=" + (a == "pn" ? "" : "&vref=" + p.g(O, !1)) + "&p=" + p.g(b.replace(/&/g, "*&*"), !1) + "&tl=" + xa + (H ? "&cad=" + H : "") + "&ptif=" + P;
      A += f.u();
      A += Ta();
      for (c = 0; c < C.length; c++) C[c][2] == "cookie" ? (b = D.k(C[c][1])) && (A += "&" + C[c][0] + "=" + p.g(b, !1)) : A += "&" + C[c][0] + "=" + p.g(C[c][1], !1);
      F.p((a == "pn" ? ya : za) + A);
      ra = 0;
      sa && a != "vpv" && (q == "519aa7cd" || q == "4d304c7a") && Ia()
    }
  }

  function mb(a) {
    var b = a.length,
      c = 0;
    if (b > 0)
      for (var e = 0; e < b; e++)
        if (c = a[e].indexOf(","), !nb(a[e].slice(0, c), a[e].slice(c +
            1))) return !1;
    return !0
  }

  function nb(a, b) {
    if (!b) return !1;
    switch (a) {
      case "setServer":
        Ja = b ? +b : 0;
        G = Wa + Xa[Ja];
        ya = G + "/pn";
        za = G + "/pv";
        Ya = G + "/oc";
        Za = G + "/os";
        $a = G + "/hb";
        ta = G + "/te";
        break;
      case "setAdParam":
        ja = "cellant";
        J = (b = b.replace(/^\|*/, "").replace(/\|*$/, "")) ? b.split("|") : "";
        break;
      case "setCamParam":
        ab = b.split(",");
        break;
      case "setURL":
        Ka = b;
        break;
      case "setIgnoreCampaign":
        bb = b.toLowerCase() == "true";
        break;
      case "setVPV":
        La = b.toLowerCase().split(",")[0];
        break;
      case "setVPT":
        Ma = b;
        break;
      case "setAccount":
        q = b.toLowerCase();
        break;
      case "setSID":
        q = b.toLowerCase();
        break;
      case "isTestWeb":
        b == "true" && q != "" && (Na[q] = !0);
        break;
      case "useHttpCookie":
        Aa = b.toLowerCase() == "false" ? !1 : !0;
        break;
      case "setDomain":
        return function() {
          ka = "";
          var a = b.split(",");
          sa = a.length > 1;
          a.sort(function(a, b) {
            return a.replace(/^https?:\/\//, "").length > b.replace(/^https?:\/\//, "").length ? 1 : -1
          });
          for (var c = 0; c < a.length; c++) v.push(a[c].replace(/^https?:\/\//, "")), a[c].match(/https?:\/\//) && a[c].match(/https?:\/\//)[0] != location.protocol + "//" || location.hostname.match(a[c].replace(/^https?:\/\//,
            "")) && (ka = a[c].replace(/^https?:\/\//, ""));
          if (b == "default" || location.href.slice(0, 4) != "http") ka = location.href.toLowerCase().split("://")[1].split("?")[0].split("/")[0], v.push(ka);
          return !0
        }();
      case "setAutoEvent":
        b.split(",").length == 2 && (Ba[b.split(",")[0]] = b.split(",")[1]);
        break;
      case "setEventReport":
        Ca = b == "true";
        break;
      case "setOptimizely":
        try {
          Ua = b.split(",")[0] == "true", b.split(",")[1] && (wa = b.split(",")[1])
        } catch (c) {}
    }
    return !0
  }

  function ob(a) {
    var b = null;
    this.Y = function() {
      if (!b) try {
        b = n.createElement("input"),
          b.type = "hidden", b.addBehavior("#default#userData"), n.body.appendChild(b)
      } catch (a) {
        return !1
      }
      return !0
    };
    this.isEnabled = function() {
      return !0
    };
    this.q = function() {
      var a = new Da;
      a.k(Y) && (a.h(Y, "", {
        f: ""
      }), a.h(cb, "", {
        f: ""
      }))
    };
    this.h = function(c, e, d) {
      if (c == Z) a.h(c, e, d);
      else try {
        if (this.Y()) {
          d = b;
          d.load(c);
          e && d.setAttribute("code", e);
          var f = new Date;
          f.setDate(f.getDate() + 30);
          d.f = f.toUTCString();
          d.save(c)
        }
      } catch (l) {}
    };
    this.k = function(c) {
      if (c == Z) return a.k(c);
      if (this.Y()) try {
        var e = b;
        e.load(c);
        return e.getAttribute("code")
      } catch (d) {
        return null
      }
    }
  }

  function pb() {
    this.isEnabled = function() {
      return m.localStorage && typeof m.localStorage.removeItem == "function"
    };
    this.q = function() {
      var a = new Da;
      a.k(Y) && (a.h(Y, "", {
        f: ""
      }), a.h(cb, "", {
        f: ""
      }))
    };
    this.k = function(a) {
      return m.sessionStorage.getItem(a) || m.localStorage.getItem(a)
    };
    this.h = function(a, b, c) {
      c.f == "" ? (m.sessionStorage.setItem(a, b), m.localStorage.removeItem(a)) : m.localStorage.setItem(a, b)
    }
  }

  function Da() {
    this.isEnabled = function() {
      return T.cookieEnabled
    };
    this.q = function() {};
    this.k = function(a) {
      var b = "";
      this.isEnabled() || (ua = !1);
      if (n.cookie && n.cookie != "")
        for (var c = n.cookie.split(";"), e = 0; e < c.length; e++) {
          var d = p.trim(c[e]);
          if (d.substring(0, a.length + 1) == a + "=" && (a != Y || a == Y && d.indexOf("pt1pt") < 0 && d.indexOf("pt0pt") < 0)) {
            b = d.substring(a.length + 1);
            break
          }
        }
      return b
    };
    this.h = function(a, b, c) {
      if (this.isEnabled()) {
        var e = "";
        if (c.f && (typeof c.f == "number" || c.f.toUTCString)) typeof c.f == "number" ? (e = new Date, e.setTime(e.getTime() + c.f * 864E5)) : e = c.f, e = "; expires=" + e.toUTCString();
        n.cookie = a + "=" + b + e + "; path=/; domain=" +
          ka
      } else ua = !1
    }
  }

  function Ea(a, b) {
    var c = [],
      e, a = a || [],
      b = b || document;
    typeof a === "string" && (a = a.split(/\s|>/));
    if (a.length === 0) return [];
    for (var d = a.shift(); !d && a.length > 0;) d = a.shift();
    if (!d) return [];
    e = a.length !== 0;
    var f = -1,
      l = d.match(/:nth-child\(\d\)/);
    if (l) {
      f = l[0];
      l = d.match(/[^:]*/g)[0];
      f = +f.match(/\d/)[0];
      f = b.children[f - 1];
      if (!f || f.nodeName.toLowerCase() !== l) return [];
      return e ? Ea(a, f) : (c.push(f), c)
    } else {
      var j, l = [],
        m, o, p, n, f = d.match(/[^#\.:\[]*/);
      j = d.match(/#[^.:\[]*/);
      var g = d.match(/\.[^#:\[]*/),
        d = d.match(/\[[^#:\.]*/);
      f && (f = f[0]);
      j && (j = j[0]);
      g && (g = g[0]);
      d && (d = d[0]);
      j && (j = j.replace("#", ""), (m = document.getElementById(j)) && c.push(m));
      f && (j || (c = b.querySelectorAll ? b.querySelectorAll(f) : b.getElementsByTagName(f)));
      g && !j && !f && (c = b.querySelectorAll ? b.querySelectorAll(g) : b.getElementsByClassName ? b.getElementsByClassName(g.replace(/\./g, " ")) : b.getElementsByTagName("*"));
      d && !j && !f && !g && b.querySelectorAll && (c = b.querySelectorAll(d));
      var k = g ? g.split(/\./) : [],
        i = d ? d.split(/\[|]/g) : [],
        h, q, va;
      m = 0;
      for (o = c.length; m < o; m++)
        if (j = c[m], !(f && j.nodeName.toLowerCase() !== f)) {
          va = !0;
          if (g) {
            q = " " + j.className + " ";
            p = 0;
            for (n = k.length; p < n; p++)
              if (k[p] && (h = RegExp("\\s" + k[p] + "\\s"), !h.test(q))) {
                va = !1;
                break
              }
            if (!va) continue
          }
          if (d) {
            p = 0;
            for (n = i.length; p < n; p++)
              if (i[p] && (h = i[p].split("="), h[1] = h[1].replace(/^'|'$/g, ""), (q = j.getAttribute(h[0])) && (q = q.replace(/'/g, "\\'")), q !== h[1])) {
                va = !1;
                break
              }
            if (!va) continue
          }
          l.push(j)
        }
      c = l;
      return e ? Ea(a, c[0]) : c
    }
  }
  window.edc7uo || (window.edc7uo = -1);
  var Xa = ["collect.ptengine.cn", "collect.ptengine.cn"],
    Ja = 0,
    Wa = "https:" == location.protocol ?
    "https://" : "http://",
    G = Wa + Xa[Ja],
    ya = G + "/pn",
    za = G + "/pv",
    Ya = G + "/oc",
    Za = G + "/os",
    $a = G + "/hb",
    ta = G + "/te",
    ka = "",
    db = 18E4,
    Q = 3E4,
    na = 3E5,
    qb = 3E3,
    eb = 1E3,
    ja = "",
    la = !1,
    W = !1,
    Fa = "",
    v = [],
    sa = !1,
    Ka = "",
    La = "",
    Ma = "",
    fb = !1,
    H = "",
    J = [],
    ab = [],
    bb = !1,
    Ca = !1,
    q = "",
    o = "",
    Aa = !0,
    C = [],
    Ba = {},
    $ = [0, 0, ""],
    E = window._pt_sp_2 ? "_pt_sp_2" : "_pt_pe",
    gb = "focus",
    Ga = [],
    Na = {
      "4c92a252": !0
    };
  if (window[E] && !(window[E].join("").indexOf("setAccount") < 0 && window[E].join("").indexOf("setSID") < 0 || window[E].join("").indexOf("setDomain") < 0)) {
    for (var y = 0; y < window[E].length; y++) /setpvtag/i.test(window[E][y]) &&
      (window[E][y] = window[E][y].replace(/setpvtag/i, "setVPV"));
    if (mb(window[E])) {
      var A = "",
        T = navigator,
        n = document,
        m = window,
        N = location,
        f = new function() {
          this.u = function() {
            var a = [];
            this.v() == 1 || this.v() == 4 ? (a.push("." + [this.F(), this.P()].sort()[0]), a.push("." + [this.F(), this.P()].sort()[1])) : (a.push("." + this.F()), a.push("." + this.P()));
            a.push("." + (m.screen.colorDepth || 0));
            a.push("." + this.qa().replace(/\./g, "_"));
            a.push("." + (T.platform || "").replace(/\./g, "_").toLowerCase());
            a.push("." + (T.language || T.Aa || "").replace(/\./g,
              "_").toLowerCase());
            a.push("." + (n.characterSet || n.charset || "").replace(/\./g, "_").toLowerCase());
            return a.join("")
          };
          this.sa = function() {
            try {
              var a = [this.u()];
              a.push("&ua=" + p.g(T.userAgent || "", !1));
              a.push("&bw=" + (n.documentElement.clientWidth || n.body.clientWidth || 0));
              a.push("&bh=" + f.J());
              a.push("&pi=" + f.na());
              a.push("&ts=" + rb);
              var b = a.join("");
              b || (b = (new Date).getTime() + "" + Math.random());
              return b
            } catch (c) {
              return (new Date).getTime() + "" + Math.random()
            }
          };
          this.ra = function() {
            try {
              var a = n.getElementsByTagName("title")[0] &&
                n.getElementsByTagName("title")[0].innerHTML || n.title,
                a = p.trim(a.split("#")[0]);
              Ma && (a = Ma);
              return p.g(a, !1)
            } catch (b) {
              return ""
            }
          };
          this.O = function(a) {
            if (a) {
              for (var a = a.split("?")[0].toLowerCase(), b = 0; b < v.length; b++) {
                var c = a.split("://")[0];
                if (!v[b].match(/^https?:\/\/.*/) && a.indexOf(v[b]) > -1) return 0;
                else if (c == v[b].split("://")[0] && a.indexOf(v[b].split("://")[1]) > -1) return 0
              }
              return 1
            } else return 0
          };
          this.X = function() {
            try {
              var a = {
                  flag: 0,
                  referrer: ""
                },
                b = n.referrer;
              if (b || W && Fa) {
                W && (b = Fa ? Fa : "*" + b + "*");
                var c =
                  b.match(/^(\S+:\/\/)?([^\/|\?|\#]+)(\S*)/);
                a.referrer = c[1].toLowerCase() + c[2].toLowerCase() + c[3];
                if (a.referrer) {
                  a.referrer = a.referrer.split("#")[0].replace(/(^\s*)/g, "").replace(/(\s*$)/g, "");
                  a.referrer.indexOf("?_randomTest") > -1 && (a.referrer = a.referrer.split("?_randomTest")[0]);
                  a.referrer = a.referrer.replace(/\/*$/, "");
                  for (var e = a.referrer.split("?")[0].toLowerCase(), b = 0; b < v.length; b++) {
                    var d = e.split("://")[0];
                    if (!v[b].match(/^https?:\/\/.*/) && e.indexOf(v[b]) > -1) return a;
                    else if (d == v[b].split("://")[0] &&
                      e.indexOf(v[b].split("://")[1]) > -1) return a
                  }
                  W || (a.flag = 1)
                }
              }
              return a
            } catch (f) {
              return a
            }
          };
          this.na = function() {
            var a = "",
              b = T.plugins;
            if (b.length != 0) {
              for (var a = [], c = 0; c < b.length; c++) {
                a[c] = b[c].name + ";" + b[c].description + ";" + b[c].filename + ";";
                for (var e = 0; e < b[c].length; e++) a[c] += "(" + b[c][e].description + ";" + b[c][e].type + ";" + b[c][e].suffixes + ")";
                a[c] += "."
              }
              a = a.sort().join("")
            }
            return a
          };
          this.S = function(a) {
            function b(a, b) {
              var c = b.match(/^https?:\/\//);
              return c ? a.indexOf(c[0]) == 0 && a.indexOf(b.substring(c[0].length)) >
                -1 : a.indexOf(b) > -1
            }
            for (var c = /*window.allPageInfo*/ [
                ['rx.top', true, false, false, 'index.html', true]
              ] || [], e = a, d = 0; d < c.length; d++)
              if (b(a, c[d][0])) {
                c[d][1] && (e = e.replace(/\#[^#|\$|\?]*/g, ""));
                c[d][2] && (e = e.replace(/^(http:\/\/|https:\/\/)?www./, "$1"));
                c[d][3] && (e = e.replace(RegExp("([^#|$|?]*)" + c[d][4] + "(S*)"), "$1$2"));
                break
              }
            return e
          };
          this.ma = function() {
            var a, b = [],
              c = "",
              b = (N.protocol + "//" + N.host).toLowerCase() + N.pathname + N.search + N.hash;
            if (!b) return "";
            v.length > 1 && (a = RegExp(/(\?|\&|\#)_pt_link=([^\&|\#]*)(\&|\#)?/), b.match(a) && (aa = b.match(a)[2], b = b.match(a)[3] ==
              "&" ? b.replace(a, "$1") : b.replace(a, "$3")));
            b = q == "56fbce4e" ? b.replace(/(\?|\&)__SID=\S*/, "") : b;
            b = b.replace(/\?_randomTest=\S*/, "");
            La && (b = La);
            b = this.S(b);
            switch (ja) {
              case "cellant":
                if (J) {
                  var b = b.split("#")[0],
                    e = "";
                  for (a = 0; a < J.length; a++) e = "", b.indexOf("?" + J[a] + "=") > -1 ? e = "?" : b.indexOf("&" + J[a] + "=") > -1 && (e = "&"), e && (fb = !0, H && (H += ","), b = b.split(e + J[a] + "="), c = b[1] ? b[1].split("&")[0] : "", H += J[a] + ":" + c, b = b[0] + e + b[1].slice(c.length + 1));
                  b = b.replace(/\?*$/, "").replace(/\&*$/, "")
                }
                break;
              case "oisix":
                var d = ["utm_referrer",
                  "utm_source", "utm_medium", "utm_term", "utm_content", "utm_campaign", "sessionid", "urlserverid", "SESSIONISNEW", "k", "tk", "KAKUNINJIKAN", "screenmode", "OVRAW", "OVKEY", "OVMTC", "OVADID", "OVKWID", "OVCAMPGID", "OVADGRPID", "SESSIONISNEW", "jid", "KENSAKUMOZIFLG", "KENSAKUMOZIJOUKEN", "searchValue", "param", "faqSearchKeyword", "startNum", "maxDisplayNum", "detail", "mi2", "roadid", "cart", "ref", "hosid", "utm_expid"
                ];
                for (a = 0; a < d.length; a++) e = "", b.indexOf("?" + d[a] + "=") > -1 ? e = "?" : b.indexOf("&" + d[a] + "=") > -1 && (e = "&"), e && (b = b.split(e +
                  d[a] + "="), c = b[1] ? b[1].split("&")[0] : "", b = b[0] + e + b[1].slice(c.length + 1));
                b = b.replace(/\?*$/, "").replace(/\&*$/, "")
            }
            Ka && (b += "#" + Ka);
            b = b.replace(/\/*$/, "");
            q == "4c92a252" && (b = b.replace(/\/([\?|#])/, "$1"));
            return b
          };
          this.wa = function() {
            var a = T.platform.toLowerCase();
            if (a.indexOf("win") > -1) return !0;
            for (var b = ["mac68k", "macppc", "macintosh", "macintel"], c = 0; c < b.length; c++)
              if (a == b[c]) return !0;
            return !1
          };
          this.va = function(a) {
            for (var b = ["AIX", "Amiga", "BeOS", "DragonFly", "FreeBSD", "GNU", "Haiku", "HP-UX", "IRIX", "Joli",
                "Java", "Macintosh", "Minix", "MorphOS", "NetBSD", "OpenBSD", "PClinuxOS", "QNX x86pc", "SunOS", "Ubuntu", "Mint", "Red Hat", "Slackware", "SUSE", "PCLinuxOS", "Debian", "Fedora", "CentOS", "Vine", "Arch Linux", "Gentoo", "Kanotix", "Mandriva"
              ], c = 0; c < b.length; c++)
              if (a.indexOf(b[c]) > -1) return !0;
            return !1
          };
          this.ta = function(a) {
            for (var b = ["Android", "AROS", "Bada", "BlackBerry", "Chromium", "CrOS", "Danger Hiptop", "Inferno", "iPhone", "iPad", "iPod", "Nintendo DS", "Nintendo Wii", "Palm OS", "PLAYSTATION", "Syllable", "SymbOS", "Symbian",
                "Tizen", "webOS", "WebTV", "Windows CE", "Windows Mobile", "Windows Phone", "Xbox"
              ], c = 0; c < b.length; c++)
              if (a.indexOf(b[c]) > -1) return !0;
            return !1
          };
          this.v = function() {
            try {
              var a = T.userAgent;
              if (!a) return 0;
              if (this.wa() || this.va(a))
                if (this.ta(a)) return 3;
                else {
                  if (a.match(/.*MSIE.*Windows NT 6\.2;.*Touch\).*/)) return 4;
                  return 2
                }
              else return a.indexOf("iPad") > -1 || Math.min(f.oa(), m.screen.height) >= 1E3 ? 4 : 1
            } catch (b) {
              return 0
            }
          };
          this.oa = function() {
            try {
              var a = m.screen.width;
              return a ? isNaN(parseInt(a, 10)) ? 0 : parseInt(a, 10) :
                0
            } catch (b) {
              return 0
            }
          };
          this.P = function() {
            try {
              var a = m.screen.height;
              if (this.v() == 1 && a > 2E3 || this.v() == 4 && a > 3E3) a = this.m();
              return a ? isNaN(parseInt(a, 10)) ? 0 : parseInt(a, 10) : 0
            } catch (b) {
              return 0
            }
          };
          this.J = function() {
            try {
              var a = m.innerHeight || n.documentElement.clientHeight || n.body.clientHeight;
              "".indexOf(q) > -1 && (a = m.innerHeight || n.body.clientHeight || n.documentElement.clientHeight);
              return a ? isNaN(parseInt(a, 10)) ? 0 : parseInt(a, 10) : 0
            } catch (b) {
              return 0
            }
          };
          this.i = function() {
            var a = 0;
            try {
              a = n.documentElement.scrollTop ||
                m.pageYOffset, a = isNaN(a) ? 0 : a
            } catch (b) {
              a = 0
            }
            return parseInt(a, 10)
          };
          this.w = function() {
            var a = +this.i() + +this.J();
            return isNaN(a) ? 0 : parseInt(a, 10)
          };
          this.pa = function() {
            var a = n.documentElement.scrollLeft || m.pageXOffset;
            return parseInt(isNaN(a) ? 0 : a, 10)
          };
          this.qa = function() {
            try {
              var a = (new Date).getTimezoneOffset();
              return a || a == 0 ? "GMT" + (a <= 0 ? "+" : "") + a / 60 * -1 : ""
            } catch (b) {
              return ""
            }
          };
          this.D = function(a) {
            return a.target || m.event.srcElement
          };
          this.M = function(a) {
            var b = {
              top: 0,
              left: 0
            };
            if (typeof a.getBoundingClientRect !==
              typeof da) b = n.documentElement, a = a.getBoundingClientRect(), b = {
              top: a.top + (m.pageYOffset || b.scrollTop) - (b.clientTop || 0),
              left: a.left + (m.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
            };
            else {
              b.top += a.offsetTop;
              b.left += a.offsetLeft;
              a.offsetParent && (a = this.M(a.offsetParent), b.top += a.top, b.left += a.left);
              if (b.top < 0) b.top = 0;
              if (b.left < 0) b.left = 0;
              b.top = isNaN(b.top) ? 0 : parseInt(b.top, 10);
              b.left = isNaN(b.left) ? 0 : parseInt(b.left, 10)
            }
            b.top = Math.round(b.top);
            b.left = Math.round(b.left);
            return b
          };
          this.la = function(a) {
            var b = {
              x: 0,
              y: 0
            };
            try {
              b.x = a.touches[0].pageX ? a.touches[0].pageX : a.clientX;
              b.y = a.touches[0].pageY ? a.touches[0].pageY : a.clientY;
              switch (q) {
                case "7ba4a69b":
                  if (a.touches[0].clientY <= 110) b.y = a.touches[0].clientY
              }
              if (!b.x) b.x = 0;
              if (!b.y) b.y = 0
            } catch (c) {}
            b.x = isNaN(b.x) ? 0 : parseInt(b.x, 10);
            b.y = isNaN(b.y) ? 0 : parseInt(b.y, 10);
            return b
          };
          this.W = function(a) {
            var b = parseInt(+a.clientX + +this.pa(), 10),
              a = parseInt(+a.clientY + +this.i(), 10);
            return {
              x: isNaN(b) ? 0 : b,
              y: isNaN(a) ? 0 : a
            }
          };
          this.N = function() {
            var a = parseInt(n.body.scrollWidth,
              10);
            return isNaN(a) ? 0 : a
          };
          this.r = function() {
            var a = parseInt(n.body.scrollHeight, 10);
            return isNaN(a) ? 0 : a
          };
          this.F = function() {
            var a = self.innerWidth || n.body.clientWidth;
            return isNaN(a) ? 0 : parseInt(a, 10)
          };
          this.m = function() {
            try {
              var a = self.innerHeight || n.body.clientHeight;
              return isNaN(a) ? 0 : parseInt(a, 10)
            } catch (b) {
              return 0
            }
          };
          this.ia = function() {
            try {
              var a = n.getElementsByName("viewport")[0].content;
              return a ? a.match("initial-scale=\\d.\\d+").toString().split("=")[1] : 1
            } catch (b) {
              return 1
            }
          }
        },
        p = new function() {
          this.za =
            function(a, b) {
              var c = a.onload;
              a.onload = typeof a.onload != "function" ? b : function() {
                c();
                b()
              }
            };
          this.aa = function(a, b, c) {
            return +b - +a > +c
          };
          this.g = function(a, b) {
            return encodeURIComponent instanceof Function ? b ? encodeURI(a) : encodeURIComponent(a) : escape(a)
          };
          this.U = function(a) {
            var b = "",
              a = a.split("+").join(" ");
            if (decodeURIComponent instanceof Function) try {
              b = decodeURIComponent(a)
            } catch (c) {
              b = unescape(a)
            } else b = unescape(a);
            return b
          };
          this.ua = function(a) {
            return da == a || "null" == a || -1 == a || "" == a
          };
          this.trim = function(a) {
            return a.replace(/(^\s*)/g,
              "").replace(/(\s*$)/g, "")
          };
          this.da = function(a) {
            for (var b = "", c = 0; c < a.length / 6 - 1;) b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/".charAt(parseInt(a.slice(c * 6, (c + 1) * 6), 2).toString(10)), c++;
            if (a = a.slice(c * 6, (c + 1) * 6)) {
              for (var e = a.length, c = 0; c < 6 - e; c++) a += "0";
              b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/".charAt(parseInt(a, 2).toString(10))
            }
            return b
          };
          this.ca = function(a) {
            for (var b = "", c = "", e = 0, d = a.length, f = 0; f < d; f++) {
              for (var c = parseInt(a.charAt(f), 16).toString(2),
                  e = c.length, l = 0; l < 4 - e; l++) c = "0" + c;
              b += c
            }
            return b
          };
          this.j = function(a) {
            return this.da(this.ca(this.T(a)))
          };
          this.T = function(a) {
            function b(a, b) {
              var c, d, e, f, g;
              e = a & 2147483648;
              f = b & 2147483648;
              c = a & 1073741824;
              d = b & 1073741824;
              g = (a & 1073741823) + (b & 1073741823);
              if (c & d) return g ^ 2147483648 ^ e ^ f;
              return c | d ? g & 1073741824 ? g ^ 3221225472 ^ e ^ f : g ^ 1073741824 ^ e ^ f : g ^ e ^ f
            }

            function c(a, c, e, d, f, g, k) {
              a = b(a, b(b(c & e | ~c & d, f), k));
              return b(a << g | a >>> 32 - g, c)
            }

            function e(a, c, e, d, f, g, k) {
              a = b(a, b(b(c & d | e & ~d, f), k));
              return b(a << g | a >>> 32 - g, c)
            }

            function d(a,
              c, e, d, f, g, k) {
              a = b(a, b(b(c ^ e ^ d, f), k));
              return b(a << g | a >>> 32 - g, c)
            }

            function f(a, c, e, d, g, k, h) {
              a = b(a, b(b(e ^ (c | ~d), g), h));
              return b(a << k | a >>> 32 - k, c)
            }

            function l(a) {
              var b = "",
                c = "",
                e;
              for (e = 0; e <= 3; e++) c = a >>> e * 8 & 255, c = "0" + c.toString(16), b += c.substr(c.length - 2, 2);
              return b
            }
            var j = [],
              m, p, o, q, g, k, i, h, j = function(a) {
                var b, c = a.length;
                b = c + 8;
                for (var e = ((b - b % 64) / 64 + 1) * 16, d = Array(e - 1), f = 0, g = 0; g < c;) b = (g - g % 4) / 4, f = g % 4 * 8, d[b] |= a.charCodeAt(g) << f, g++;
                d[(g - g % 4) / 4] |= 128 << g % 4 * 8;
                d[e - 2] = c << 3;
                d[e - 1] = c >>> 29;
                return d
              }(a);
            g = 1732584193;
            k =
              4023233417;
            i = 2562383102;
            h = 271733878;
            for (a = 0; a < j.length; a += 16) m = g, p = k, o = i, q = h, g = c(g, k, i, h, j[a + 0], 7, 3614090360), h = c(h, g, k, i, j[a + 1], 12, 3905402710), i = c(i, h, g, k, j[a + 2], 17, 606105819), k = c(k, i, h, g, j[a + 3], 22, 3250441966), g = c(g, k, i, h, j[a + 4], 7, 4118548399), h = c(h, g, k, i, j[a + 5], 12, 1200080426), i = c(i, h, g, k, j[a + 6], 17, 2821735955), k = c(k, i, h, g, j[a + 7], 22, 4249261313), g = c(g, k, i, h, j[a + 8], 7, 1770035416), h = c(h, g, k, i, j[a + 9], 12, 2336552879), i = c(i, h, g, k, j[a + 10], 17, 4294925233), k = c(k, i, h, g, j[a + 11], 22, 2304563134), g = c(g, k, i, h, j[a + 12],
                7, 1804603682), h = c(h, g, k, i, j[a + 13], 12, 4254626195), i = c(i, h, g, k, j[a + 14], 17, 2792965006), k = c(k, i, h, g, j[a + 15], 22, 1236535329), g = e(g, k, i, h, j[a + 1], 5, 4129170786), h = e(h, g, k, i, j[a + 6], 9, 3225465664), i = e(i, h, g, k, j[a + 11], 14, 643717713), k = e(k, i, h, g, j[a + 0], 20, 3921069994), g = e(g, k, i, h, j[a + 5], 5, 3593408605), h = e(h, g, k, i, j[a + 10], 9, 38016083), i = e(i, h, g, k, j[a + 15], 14, 3634488961), k = e(k, i, h, g, j[a + 4], 20, 3889429448), g = e(g, k, i, h, j[a + 9], 5, 568446438), h = e(h, g, k, i, j[a + 14], 9, 3275163606), i = e(i, h, g, k, j[a + 3], 14, 4107603335), k = e(k, i, h, g, j[a +
                8], 20, 1163531501), g = e(g, k, i, h, j[a + 13], 5, 2850285829), h = e(h, g, k, i, j[a + 2], 9, 4243563512), i = e(i, h, g, k, j[a + 7], 14, 1735328473), k = e(k, i, h, g, j[a + 12], 20, 2368359562), g = d(g, k, i, h, j[a + 5], 4, 4294588738), h = d(h, g, k, i, j[a + 8], 11, 2272392833), i = d(i, h, g, k, j[a + 11], 16, 1839030562), k = d(k, i, h, g, j[a + 14], 23, 4259657740), g = d(g, k, i, h, j[a + 1], 4, 2763975236), h = d(h, g, k, i, j[a + 4], 11, 1272893353), i = d(i, h, g, k, j[a + 7], 16, 4139469664), k = d(k, i, h, g, j[a + 10], 23, 3200236656), g = d(g, k, i, h, j[a + 13], 4, 681279174), h = d(h, g, k, i, j[a + 0], 11, 3936430074), i = d(i, h,
                g, k, j[a + 3], 16, 3572445317), k = d(k, i, h, g, j[a + 6], 23, 76029189), g = d(g, k, i, h, j[a + 9], 4, 3654602809), h = d(h, g, k, i, j[a + 12], 11, 3873151461), i = d(i, h, g, k, j[a + 15], 16, 530742520), k = d(k, i, h, g, j[a + 2], 23, 3299628645), g = f(g, k, i, h, j[a + 0], 6, 4096336452), h = f(h, g, k, i, j[a + 7], 10, 1126891415), i = f(i, h, g, k, j[a + 14], 15, 2878612391), k = f(k, i, h, g, j[a + 5], 21, 4237533241), g = f(g, k, i, h, j[a + 12], 6, 1700485571), h = f(h, g, k, i, j[a + 3], 10, 2399980690), i = f(i, h, g, k, j[a + 10], 15, 4293915773), k = f(k, i, h, g, j[a + 1], 21, 2240044497), g = f(g, k, i, h, j[a + 8], 6, 1873313359), h =
              f(h, g, k, i, j[a + 15], 10, 4264355552), i = f(i, h, g, k, j[a + 6], 15, 2734768916), k = f(k, i, h, g, j[a + 13], 21, 1309151649), g = f(g, k, i, h, j[a + 4], 6, 4149444226), h = f(h, g, k, i, j[a + 11], 10, 3174756917), i = f(i, h, g, k, j[a + 2], 15, 718787259), k = f(k, i, h, g, j[a + 9], 21, 3951481745), g = b(g, m), k = b(k, p), i = b(i, o), h = b(h, q);
            var n;
            32 == "16" && (n = l(k) + l(i));
            32 == "32" && (n = l(g) + l(k) + l(i) + l(h));
            return n
          }
        },
        l = new function() {
          this.l = "";
          this.s = function() {
            if (ua) this.l = this.fa(), D.h(Y, this.l, {
              f: 1E3
            });
            this.o()
          };
          this.o = function() {
            if (ua) this.l = D.k(Y)
          };
          this.ka = function(a) {
            return this.l.indexOf(w) >
              -1 && !p.aa(this.e("sact"), a, 6E4) ? 1 : 0
          };
          this.ja = function(a) {
            if (Oa == 0 && !W) return 1;
            if (p.aa(this.e("sact"), a, db) && !W) return 1;
            if (this.e("to_flag") == 1 && !W) return 1;
            return 0
          };
          this.L = function() {
            var a = this.e("nid");
            a == "1" && (a = 0);
            return a
          };
          this.Q = function() {
            return this.e("pl") == w + "*pt*" + fa
          };
          this.Z = function(a, b) {
            return this.e("vid") != a && +b >= +this.e("sact")
          };
          this.fa = function() {
            var a = Math.floor(U.length / 3800);
            return "uid=" + o + "&nid=" + ga + "&vid=" + u + "&vn=" + z + "&pvn=" + t + "&sact=" + S + "&to_flag=" + ra + (+a > 0 ? "&cn=" + a : "") + "&pl=" +
              U
          };
          this.ea = function() {
            for (var a = ["uid", "nid", "vid", "vn", "sact", "to_flag", "pl"], b = 0; b < a.length; b++)
              if (this.l.indexOf(a[b]) < 0) return !1;
            return !0
          };
          this.e = function(a) {
            try {
              if (a == "pl") return this.l.indexOf(a) != -1 ? this.l.split(a + "=")[1] : "";
              else {
                var b = this.l.indexOf(a) != -1 ? this.l.split(a + "=")[1].split("&")[0] : "";
                a == "pvn" && (b = isNaN(b) ? 0 : b);
                return b
              }
            } catch (c) {
              return ""
            }
          };
          this.H = function(a) {
            return a + "*pt*" + fa
          }
        },
        D = new function() {
          var a = !1;
          this.n = "";
          !Aa && T.userAgent.toLowerCase().match(/msie\s([2-8]+?\.[\d]+)/ig) ?
            this.n = new ob(new Da) : !Aa && m.localStorage && m.sessionStorage && typeof m.localStorage.removeItem == "function" && typeof m.sessionStorage.removeItem == "function" ? (m.sessionStorage.setItem("pt_testsk", "pt_testsv"), m.localStorage.setItem("pt_testlk", "pt_testlv"), m.sessionStorage.getItem("pt_testsk") == "pt_testsv" && m.localStorage.getItem("pt_testlk") == "pt_testlv" ? this.n = new pb : a = !0, m.sessionStorage.removeItem("pt_testsk"), m.localStorage.removeItem("pt_testlk")) : Aa ? this.n = new Da : a = !0;
          a ? (this.q = function() {}, this.isEnabled =
            function() {
              return !1
            }, this.h = function() {}, this.k = function() {
              return ""
            }) : (this.q = function() {
            this.n.q()
          }, this.isEnabled = function() {
            return this.n.isEnabled()
          }, this.h = function(a, c, e) {
            this.n.h(a, c, e)
          }, this.k = function(a) {
            return this.n.k(a)
          })
        },
        F = new function() {
          this.ya = function() {
            var a = window.edc7uo,
              b = "";
            try {
              switch ("heatmap") {
                case "heatmap":
                  if (a == -1) return !0;
                  else {
                    if (a)
                      for (var c = f.S(N.href).replace(/\/*$/, ""), e = c.split("?")[0].replace(/\/*$/, "") == c ? c.split("#")[0].replace(/\/*$/, "") == c ? null : c.split("#")[0].replace(/\/*$/,
                          "") : c.split("?")[0].replace(/\/*$/, ""), d = 0; d < a.length; d++) {
                        if (b = a[d]) b = f.S(b).replace(/\/*$/, ""), b = b.split("?")[0].replace(/\/*$/, "") == b ? b.split("#")[0].replace(/\/*$/, "") == b ? b : b.split("#")[0].replace(/\/*$/, "") : b.split("?")[0].replace(/\/*$/, "");
                        if (c == b || e == b) return !0
                      }
                    return !1
                  }
              }
            } catch (l) {}
          };
          this.z = function(a) {
            if (!(t > 99)) {
              var b = a + "&v=v1.18.2&ts=" + (new Date).getTime(),
                c = document.createElement("script");
              c.setAttribute("src", b);
              document.getElementsByTagName("head")[0].appendChild(c);
              if (Na[q])
                if (q == "4c92a252") {
                  for (var b =
                      o.substr(1, 2) + o.substr(5, 1) + o.substr(8, 1) + o.substr(10, 1) + o.substr(13, 1) + o.substr(15, 1) + o.substr(19, 1), e = c = 0; c < 8;) e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/".indexOf(b.charAt(7 - c)) * Math.pow(64, c), c++;
                  e % 10 == 0 && (b = a.replace(/collect.ptengine.cn/, "tzcj.ptmind.com") + "&v=v1.18.2&ts=" + (new Date).getTime(), c = document.createElement("script"), c.setAttribute("src", b), document.getElementsByTagName("head")[0].appendChild(c))
                } else b = a.replace(/collect.ptengine.cn/, "tzcj.ptmind.com") + "&v=v1.18.2&ts=" +
                  (new Date).getTime(), c = document.createElement("script"), c.setAttribute("src", b), document.getElementsByTagName("head")[0].appendChild(c)
            }
          };
          this.p = function(a) {
            if (!(t > 99) && ((new Image).src = a + "&v=v1.18.2&ts=" + (new Date).getTime(), Na[q]))
              if (q == "4c92a252") {
                for (var b = o.substr(1, 2) + o.substr(5, 1) + o.substr(8, 1) + o.substr(10, 1) + o.substr(13, 1) + o.substr(15, 1) + o.substr(19, 1), c = 0, e = 0; c < 8;) e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/".indexOf(b.charAt(7 - c)) * Math.pow(64, c), c++;
                if (e % 10 == 0)(new Image).src =
                  a.replace(/collect.ptengine.cn/, "tzcj.ptmind.com") + "&v=v1.18.2&ts=" + (new Date).getTime()
              } else(new Image).src = a.replace(/collect.ptengine.cn/, "tzcj.ptmind.com") + "&v=v1.18.2&ts=" + (new Date).getTime()
          };
          this.t = function(a) {
            var b = a.nodeName.toLowerCase();
            if (b == "body" || b == "html") return "body";
            else {
              var c = a.parentNode;
              if (a.getAttribute("id")) return this.t(c) + ">#" + a.getAttribute("id");
              else if ((b == "input" || b == "select" || b == "textarea" || b == "button") && a.getAttribute("name")) return this.t(c) + ">" + b + ":input[name='" +
                a.getAttribute("name") + "']";
              for (var e = [], d = 0; d < c.children.length; d++) {
                var f = c.children[d];
                f.nodeName && f.nodeName.toLowerCase() == b && e.push(f)
              }
              for (d = 0; d < e.length; d++)
                if (e[d] == a) return this.t(c) + ">" + b + ":eq(" + d + ")"
            }
          };
          this.K = function(a) {
            var b = a.nodeName.toLowerCase();
            if (b == "body" || b == "html") return "body";
            else if (a.getAttribute("id")) return "#" + a.getAttribute("id");
            else {
              for (var c = a.parentNode; b == c.nodeName.toLowerCase();) {
                if (c.getAttribute("id")) break;
                c = c.parentNode
              }
              for (var e = c.getElementsByTagName(b); e.length ==
                1;) {
                if (c.getAttribute("id") || c.nodeName.toLowerCase() == "body") break;
                c = c.parentNode;
                e = c.getElementsByTagName(b)
              }
              for (var d = 0; d < e.length; d++)
                if (e[d] == a) {
                  if ((b == "input" || b == "select" || b == "textarea" || b == "button") && a.getAttribute("name")) return this.K(c) + " " + b + ":input[name='" + a.getAttribute("name") + "']";
                  return this.K(c) + " " + b + ":eq(" + (d - 0) + ")"
                }
            }
          };
          this.xa = function(a) {
            for (; a.nodeName.toLowerCase() != "body";)
              if (a.nodeName.toLowerCase() == "a") return a;
              else a = a.parentNode;
            return !1
          }
        },
        L = f.X(),
        sb = f.ia(),
        P = f.v(),
        s =
        m.orientation == da || m.orientation == 0 ? 1 : -1,
        x = "0",
        u = "",
        z = 0,
        t = 0,
        qa = q + "_/",
        y = new Date,
        rb = y.getTime() + "-" + y.getDate(),
        O = "",
        ga = "0",
        R = "",
        hb = "",
        w = "",
        xa = f.ra(),
        I = "",
        U = "",
        ua = D.isEnabled(),
        Pa = "",
        B = "",
        M = "",
        Qa = 0,
        Ra = 0,
        ia = f.w(),
        ba = s == 1 ? ia : 0,
        ca = s != 1 ? ia : 0,
        oa = 0,
        X = y.getTime(),
        fa, S, ea, ib, aa = "",
        Sa = !1,
        Ha = "",
        Oa = 0,
        ra = 0,
        pa = !1,
        Ua = !1,
        wa = "Optimizely",
        jb = !1,
        tb = {
          G: (new Date).getTime() - 1E4,
          ba: function() {
            var a = (new Date).getTime();
            return this.G + 1E3 > a ? !1 : (a - this.G > 1E4 ? this.G = a - 9E3 : this.G += 1E3, !0)
          }
        };
      if (location.href.indexOf("ptengine=") >
        -1) {
        if (E = {
            0: "https://report.ptengine.jp/js/popup/ptpopupheatmap.js",
            1: "https://reportv3.ptengine.jp/components/pagescene/overlay/overlay.js",
            2: "https://report.ptengine.com/js/popup/ptpopupheatmap.js",
            3: "https://reportv3.ptengine.com/components/pagescene/overlay/overlay.js",
            4: "https://demo.ptengine.jp/components/pagescene/heatmap/js/popup/ptpopupheatmap_jp.js",
            5: "https://demo.ptengine.com/components/pagescene/heatmap/js/popup/ptpopupheatmap_en.js",
            6: "https://reportv3test.ptengine.jp/components/pagescene/overlay/overlay.js",
            7: "https://reportv3test.ptengine.com/components/pagescene/overlay/overlay.js",
            8: "https://testreportv3.ptengine.jp/components/pagescene/overlay/overlay.js",
            9: "https://testreportv3.ptengine.com/components/pagescene/overlay/overlay.js",
            A: "http://localhost:3100/components/pagescene/overlay/overlay.js",
            B: "http://localhost:3000/components/pagescene/overlay/overlay.js",
            a: "https://report.ptengine.cn/components/pagescene/overlay/overlay.js",
            b: "https://testreport.ptengine.cn/components/pagescene/overlay/overlay.js",
            c: "https://reportv3test.ptengine.cn/components/pagescene/overlay/overlay.js",
            d: "http://localhost:3200/components/pagescene/overlay/overlay.js"
          }[location.href.split("ptengine=")[1].substring(0, 1)]) y = document.createElement("script"), y.type = "text/javascript", y.async = !0, y.charset = "utf-8", y.src = E, document.body.appendChild(y)
      } else if (function() {
          function a() {
            c = c.replace(/^https?:/, N.protocol);
            var a = document.createElement("script");
            a.type = "text/javascript";
            a.async = !0;
            a.src = c + "/components/event/foreign/dest/event.js";
            n.body.appendChild(a)
          }
          var b = document.referrer || window.name || "",
            c = localStorage.ptengineDomain;
          N.href.indexOf("ptengine-event-explore=open") > -1 && /^https?:\/\/(.*\.ptengine.(com|cn|jp)|localhost).*/gim.test(b) ? (localStorage.ptengineDomain = c = b.match(/https?:\/\/([^\/]+)/i)[0], a()) : opener && c && a()
        }(), ka != "") {
        var Y = "pt_" + q,
          Z = "pt_s_" + q,
          cb = "pt_t_" + q,
          kb = "pt_v_" + q,
          ha = "pt_sc_" + q;
        switch (q) {
          case "7915ceae":
            ja = "CONVERSE"
        }
        if (p.j("ptmind") == "VjjxITmt45nXMldop676zQ") {
          window[E].push = function(a, b) {
            var c = a.split(",");
            switch (c[0]) {
              case "setPVTag":
                try {
                  R = c[2] == "replace" ? c[1] : hb + "#" + (c[1] ? c[1] : ""), w = p.j(R), ma("vpv", R, w)
                } catch (e) {}
                break;
              case "setCustomEvent":
                try {
                  var d = b.eventName ? b.eventName : "",
                    d = p.trim(d);
                  if (Ca == !1 || !d) break;
                  var d = encodeURIComponent(d.substr(0, 20)),
                    f = b.isActiveElement ? b.isActiveElement : 0;
                  t = +t + 1;
                  var m = "?id=" + q + "." + o + "." + u + "." + w + "." + I + "&eid=" + d + ":0:" + f + "&ptif=" + P + "&pvn=" + t;
                  F.z(ta + m)
                } catch (j) {}
                break;
              case "setTrackEvent":
                try {
                  if (Ca == !1) break;
                  if (typeof c[6] == "string" && !N.href.replace(/\/$/, "").match(RegExp(c[6].replace(/^\//,
                      "").replace(/\/$/, "")))) break;
                  typeof c[3] == "undefined" && (c[3] = "");
                  typeof c[4] == "undefined" && (c[4] = "0");
                  c[4] = c[4].replace(/\./g, "e");
                  for (d = 1; d < 5; d++) c[d] = p.U(c[d]);
                  c[1] = c[1].substr(0, 200);
                  c[2] = c[2].substr(0, 200);
                  c[3] = c[3].substr(0, 500);
                  c[4] = c[4].substr(0, 10);
                  for (d = 1; d < 5; d++) c[d] = p.g(c[d]).replace(/\./g, "%2E"), c[d].indexOf(".") > -1 && (c[d] = c[d].split(".").join("%2E"));
                  if (typeof c[7] == "string") Ga.push(c);
                  else {
                    if (o == "" || u == "" || w == "" || I == "") break;
                    if (!tb.ba()) break;
                    t = +t + 1;
                    l.s();
                    m = "?id=" + q + "." + o + "." + u + "." +
                      w + "." + I + "&stat=" + c.slice(1, 5).join(".") + "&ptif=" + P + "&pvn=" + t;
                    F.z(ta + m)
                  }
                } catch (s) {}
                break;
              case "setCustomVar":
                (function() {
                  var a = c[3],
                    b;
                  if (a == "cookie") b = c[4];
                  else if (a == "globalVar") b = window[c[4]];
                  else if (a == "domId") {
                    if (n.getElementById(c[4])) b = n.getElementById(c[4]).innerHTML
                  } else a == "value" && (b = c[4]);
                  b && (c[2] == "ptselfSource" && C.push(["def01", D.k(ha), c[3]]), C.push([c[1], b, c[3]]));
                  if (c[2] == "ptself" || c[2] == "ptselfSource") ma("vpv"), c[2] == "ptselfSource" && C.pop(), C.pop(), c[2] == "ptselfSource" && D.h(ha, "", {
                    f: ""
                  })
                })();
                break;
              case "setFunnelStep":
                try {
                  W = c[1] == "true", Fa = c.length == 3 ? c[2] : ""
                } catch (r) {}
                break;
              case "setCrossDomainLink":
                try {
                  la = c[1] == "allManual" ? "allManual" : c[1] == "halfManual" ? "halfManual" : !1
                } catch (v) {}
                break;
              case "setIframe":
                jb = c[1] == "true";
                break;
              case "RecordSource":
                if (D.k(kb) == u) break;
                m = p.g(location.search.indexOf("utm_") > -1 ? location.href : O ? O.split("://")[1].split("/")[0] : "", !1) || "no referrer";
                d = D.k(ha);
                D.h(ha, d ? d + "," + m : m, {
                  f: 1E3
                });
                D.h(kb, u, {
                  f: 1E3
                });
                break;
              case "ClearSource":
                D.h(ha, "", {
                  f: ""
                });
                break;
              case "setSampleRate":
                try {
                  Ha =
                    c[1]
                } catch (x) {}
            }
          };
          if (window[E].length > 0)
            for (var lb = window[E], y = 0; y < lb.length; y++) window[E].push(lb[y]);
          if (q == "308fd851" || q == "633fdbe6") Q = 6E4;
          (function() {
            function a(a) {
              if (bb) return !1;
              if (location.href.match(/(utm_campaign|utm_source|utm_medium|utm_term|utm_content)/)) return !0;
              for (var b = 0; b < a.length; b++)
                if (location.search.match(RegExp("[?/&](" + a[b] + ")="))) return !0;
              return !1
            }

            function b() {
              for (var a = ["(wap|www|m|m5).baidu.com", "www.baidu.jp", "(hao|so).360.cn", "www.360(soso|sou).com", "(www|m).so.com", "www.google.",
                  "(blogsearch|books|images|news|scholar).google.com", "bing.com", "(search|tw.search).yahoo.com", "www.yahoo.cn", "search.yahoo.co.jp", "(www|jp).ask.com", "(cn|jp).indeed.com", "search.biglobe.ne.jp", "search.(goo|smt.docomo).ne.jp", "search.nifty.com", "websearch.rakuten.co.jp", "www.so-net.ne.jp"
                ], b = 0; b < a.length; b++)
                if (n.referrer.match(RegExp(a[b]))) return !0;
              return !1
            }

            function c(a, b, c) {
              a.addEventListener ? a.addEventListener(b, c, !0) : a.attachEvent && a.attachEvent("on" + b, c)
            }

            function e(a, b) {
              var c = a;
              typeof b == "object" &&
                (c = b);
              var e = "";
              try {
                e = F.K(c)
              } catch (f) {}
              var g = [],
                k;
              if (Ga.length > 0)
                for (var h = 0; h < Ga.length; h++) try {
                  var i = Ga[h];
                  if (i.length >= 10) {
                    var j, l = i[7],
                      m = i[9],
                      l = p.U(l),
                      o = void 0;
                    try {
                      o = document.querySelectorAll ? document.querySelectorAll(l) : Ea(l)
                    } catch (q) {
                      o = Ea(l)
                    }
                    var n = [],
                      r = void 0;
                    if (m === da || m === "") n = o;
                    else
                      for (var s = 0, t = o.length; s < t; s++) r = o[s], p.T(r.text || "") === m && n.push(r);
                    j = n;
                    for (var o = !1, n = 0, u = j.length; n < u; n++)
                      if (o = d(a, j[n])) {
                        g.push(i[3] + ":1:0");
                        break
                      }
                  } else if (typeof jQuery == "function" && jQuery(i[7])[0] == c || typeof jQuery !=
                    "function" && i[7] == e) k = i.slice(1, 5)
                } catch (v) {}
              return {
                R: g,
                $: k
              }
            }

            function d(a, b) {
              if (a === b) return !0;
              else if (a.nodeName.toLowerCase() !== "body") return d(a.parentNode, b);
              return !1
            }

            function y(a) {
              if (!a) return !1;
              var b, c;
              a.R && a.R.length && (b = a.R.join(","));
              a.$ && (c = a.$.join("."));
              return !b && !c ? !1 : {
                C: b ? b : "",
                I: c ? c : ""
              }
            }

            function E() {
              if (/windows|win32/i.test(T.userAgent) && /msie|trident|edge/i.test(T.userAgent)) gb = "click";
              else
                for (var a = 0; a < k.length; a++)
                  for (var b = document.getElementsByTagName(k[a]), d = 0; d < b.length; d++) c(b[d],
                    "focus",
                    function(a) {
                      M = f.D(a);
                      a = e(M);
                      if (a = y(a)) {
                        var b = "",
                          c = P,
                          b = "?id=" + (q + "." + o + "." + u + "." + w + "." + I);
                        a.I && (b += "&stat=" + a.I);
                        a.C && (b += "&eid=" + a.C);
                        t = +t + 1;
                        b += "&pvn=" + t;
                        b += "&ptif=" + c;
                        F.z(ta + b)
                      }
                    })
            }

            function j() {
              if (M != null) {
                var a = M.nodeName.toLowerCase();
                if (a != "html") {
                  var b = 0,
                    c = F.xa(M),
                    d = f.M(M);
                  Qa = d.left;
                  Ra = d.top;
                  b = "";
                  try {
                    b = F.t(M)
                  } catch (g) {}
                  d = (new Date).getTime();
                  if (!(d - ib < qb && a != "a")) {
                    if (typeof c == "object") {
                      var h = c.getAttribute("onclick");
                      if (h && h.indexOf("_pt_sp_2") > -1 && c.onclick && c.onclick.toString().indexOf("_pt_sp_2") ==
                        -1)
                        for (var i = h.split(";"), h = 0; h < i.length; h++)
                          if (i[h].indexOf("setPVTag") > -1 && _pt_sp_2.push(i[h].replace("_pt_sp_2.push('", "").replace('_pt_sp_2.push("', "").replace("')", "").replace('")', "")), i[h].indexOf("setTrackEvent") > -1) {
                            var j = i[h].split(",");
                            j.length == 8 && j.pop();
                            _pt_sp_2.push(j.join("").replace("_pt_sp_2.push('", "").replace('_pt_sp_2.push("', "").replace("')", "").replace('")', ""))
                          }
                      j = "";
                      i = p.g(c.href, !1).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\./g, "%2E");
                      if (c.href != "")
                        if (c.href.match(/mailto:/)) Ba.mailSendings ==
                          "true" && (j = "Mail,Mailto," + i.toLowerCase() + ",0");
                        else if (c.href.toLowerCase().match(/\.(msi|pdf|apk|ipa|jar|umd|jad|epub|mobi|iso|tar|zip|rar|gzip|gz|dmg|doc|docx|xls|xlsx|csv|ppt|pptx|exe|txt|pdf|key|numbers|pages)/)) Ba.fileDownloads == "true" && (h = c.href.toLowerCase().match(/\.(msi|pdf|apk|ipa|jar|umd|jad|epub|mobi|iso|tar|zip|rar|gzip|gz|dmg|doc|docx|xls|xlsx|csv|ppt|pptx|exe|txt|pdf|key|numbers|pages)/)[1], i = i.replace(/(^https?:\/\/)([^/]+)/i, function(a) {
                          return a.toLowerCase()
                        }), j = "Downloads," + h +
                        "," + i + ",0");
                      else if (c.href.toLowerCase().indexOf("http") == 0 && Ba.outboundLinks == "true") {
                        for (var n = !0, h = 0; h < v.length; h++)
                          if (c.href.toLowerCase().indexOf(v[h]) > 0) {
                            n = !1;
                            break
                          }
                        n && (i = i.replace(/(^https?:\/\/)([^/]+)/i, function(a) {
                          return a.toLowerCase()
                        }), j = "Outbound%20Links,Exit," + i + ",0")
                      }
                      j != "" && Ca && _pt_sp_2.push("setTrackEvent," + j + ",false")
                    }
                    var r;
                    (function() {
                      if (gb == "focus")
                        for (var b = 0; b < k.length; b++)
                          if (k[b] == a) return;
                      r = e(M, c)
                    })();
                    if (!(q == "3bfec6ad" && navigator.userAgent.indexOf("MSIE") > -1 && b == ".focus-menu .current ")) {
                      h =
                        0;
                      h = a == "a" || a == "input" || a == "select" || a == "embed" || a == "object" || a == "textarea" || a == "button" ? 1 : M.onclick ? 1 : M.childNodes.length == 0 || M.childNodes.length == 1 && M.childNodes[0].nodeType != 1 ? 2 : 0;
                      h = h + $[2] + p.g(b, !1).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\./g, "%2E");
                      l.o();
                      if (l.e("to_flag") == 1 || !l.Q())
                        if (l.e("to_flag") == 1 || +d - +l.e("sact") > +na) {
                          ma("pn");
                          return
                        } else if (l.Z(u, d)) {
                        ma("pv");
                        return
                      } else b = eb;
                      else if (b = d - ea - oa * Q, b < 0 || b > Q * 1.5) b = Q;
                      U = l.H(w);
                      ib = ea = S = d;
                      t = l.e("pvn");
                      if (pa) clearInterval(window._pt_hb_interval),
                        window._pt_hb_interval = setInterval(function() {
                          G()
                        }, Q), oa = 0;
                      l.s();
                      d = f.w();
                      s = m.orientation == da || m.orientation == 0 ? 1 : -1;
                      s == 1 && d > ba ? ba = d : s != 1 && d > ca && (ca = d);
                      d = q + "." + o + "." + u + "." + w + "." + I;
                      b = +(B.x + $[0]) * s + "." + Math.ceil((B.y + $[1]) * s * sb) + "." + f.F() + "." + f.m() + "." + h + ".0." + (s == 1 ? f.i() : (f.i() + 1) * s) + "." + (s == 1 ? ba : ca * -1) + "." + b + "." + (Qa + $[0]) + "." + (Ra + $[1]);
                      h = P;
                      i = y(r);
                      j = "";
                      i ? (j = "?id=" + d, i.I && (j += "&stat=" + i.I), i.C && (j += "&eid=" + i.C), pa && (j += "&ocstat=" + b), t = +t + 1, j += "&pvn=" + t, j += "&ptif=" + h, F.z(ta + j)) : pa && (Ra = Qa = 0, $ = [0, 0, ""],
                        F.z(Ya + ("?id=" + d + "&stat=" + b + "&ptif=" + h)))
                    }
                  }
                }
              }
            }

            function G() {
              l.o();
              if (l.Q()) {
                if ((new Date).getTime() - ea > na + +Q) {
                  if (sa && (q == "519aa7cd" || q == "4d304c7a"))
                    for (var a = n.getElementsByTagName("a"), b = "", c, d = 0; d < a.length; d++)
                      if (c = a[d].getAttribute("href"))
                        if (b = c.match(/[\#|\?|\&]_pt_link=[^#|^&]*/)) c = c.split(b), b = c[0] + (c[1] ? c[1] : ""), a[d].setAttribute("href", b);
                  clearInterval(window._pt_hb_interval);
                  ra = 1;
                  l.s();
                  if ((oa + 5) * +Q < na) return
                }
                oa++;
                a = f.w();
                s = m.orientation == da || m.orientation == 0 ? 1 : -1;
                s == 1 && a > ba ? ba = a : s != 1 && a >
                  ca && (ca = a);
                F.p($a + ("?id=" + q + "." + o + "." + u + "." + w + "." + I + "&stat=" + (s == 1 ? f.i() : (f.i() + 1) * s) + "." + (s == 1 ? ba : ca * -1) + "." + f.m() + "." + (ra == 1 ? -1 * na + 1 : Q) + "&ptif=" + P))
              }
            }
            if (!N.href.match(/^https?:\/\/.*/) || N.href.indexOf("#_pt_capture") > -1) return !1;
            if ("7918662e".indexOf(q) < 0) {
              var r = /^http[s]?:\/\/((?!datatest).)+\.(miapex|ptengine|ptmind)\.(com|jp|cn)/;
              if (r.test(N.href) || r.test(n.referrer)) return !1
            }
            if (location.href.indexOf("ptengine=") > -1) return !1;
            if (location.href.indexOf("ptengine-event-explore=open") > -1 || n.referrer &&
              n.referrer.indexOf("ptengine-event-explore=open") > -1) return !1;
            F.ya() && (pa = !0);
            switch (P) {
              case 2:
              case 3:
                na = 18E5
            }
            if (ja == "cellant" && (P == 2 || P == 3)) return !1;
            hb = R = f.ma();
            w = p.j(R);
            D.q();
            l.o();
            if (W = l.l && W ? !0 : !1) db = 864E5, L = f.X(), preVID = l.e("vid");
            (function() {
              function a(b) {
                function c(a, b, d) {
                  var e = new Date;
                  e.setTime(e.getTime() - 1E4);
                  document.cookie = a + "='';expires=" + e.toGMTString() + ";domain=" + b + ";path=" + d + ";";
                  document.cookie = a + "='';expires=" + e.toGMTString() + ";domain=" + b + ";path=" + d + "/;"
                }
                c(b, "", "");
                for (var d = document.location.hostname.split("."),
                    e = document.location.pathname.split("/"), f = 0; f < d.length; f++)
                  for (var g = 0; g < e.length; g++) c(b, d.slice(f).join("."), e.slice(0, parseInt(g) + 1).join("/"))
              }
              for (var b = n.cookie.split(";"), c = 0; c < b.length; c++)
                if (b[c] = b[c].split("="), b[c][0].indexOf(Y) > -1) l.l = b[c].slice(1).join("="), a(b[c][0]);
                else if (b[c][0].indexOf(Z) > -1) {
                var d = Z + "=" + b[c].slice(1).join("=") + ";domain=" + ka + ";path=/;";
                a(b[c][0])
              }
              if (d) document.cookie = d
            })();
            p.ua(l.l) || !l.ea() ? (D.h(Z, X, {
              f: ""
            }), l.l = "", (o = p.j(f.sa())) || (o = p.j((new Date).getTime() + "" +
              Math.random())), ga = "1", z = 0, aa ? (r = aa.split("."), o = r[0], ga = r[1], u = r[2], S = r[3], z = r[4], t = r[5], O = r[6].replace(/\*\_\*/g, ".").replace(/\*\_wh\_\*/g, "?"), x = "0") : (x = "1", O = L.referrer)) : a(ab) || b() ? aa ? (r = aa.split("."), o = r[0], ga = r[1], u = r[2], S = r[3], z = r[4], t = r[5], O = r[6].replace(/\*\_\*/g, ".").replace(/\*\_wh\_\*/g, "?"), x = "0") : ((o = l.e("uid")) || (o = p.j((new Date).getTime() + "" + Math.random())), ga = l.L(), z = l.e("vn"), x = "1", O = L.referrer) : (Pa = D.k(Z), Oa = ua ? Pa ? 1 : 0 : -1, aa ? (r = aa.split("."), o = r[0], ga = r[1], u = r[2], S = r[3], z = r[4],
              t = r[5], O = r[6].replace(/\*\_\*/g, ".").replace(/\*\_wh\_\*/g, "?"), U = "", x = "0", D.h(Z, X, {
                f: ""
              })) : ((o = l.e("uid")) || (o = p.j((new Date).getTime() + "" + Math.random())), ga = l.L(), l.ka(X) == 1 && (L = {
                flag: 0,
                referrer: ""
              }), x = L.flag == 1 ? "1" : l.ja(X), ja == "cellant" && fb && (x = "1"), ja == "cellant" && Oa && !H && (H = Pa.split("cad=")[1]) && (H = H.split("&")[0]), z = l.e("vn"), r = l.e("pvn"), t = x == "1" ? 0 : r ? r : 1, U = x == "1" ? "" : l.e("pl"), O = x == "1" ? L.referrer : m.localStorage && typeof m.localStorage.removeItem == "function" ? m.localStorage.getItem(qa) : "", x == "1" &&
              D.h(Z, X, {
                f: ""
              })));
            if (Ha && /^\d+$/.test(Ha)) {
              for (var r = o.substr(1, 2) + o.substr(5, 1) + o.substr(8, 1) + o.substr(10, 1) + o.substr(13, 1) + o.substr(15, 1) + o.substr(19, 1), K = 0, J = 0; K < 8;) J += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-/".indexOf(r.charAt(7 - K)) * Math.pow(64, K), K++;
              if (J % Ha != 0) return
            }
            fa = X;
            S = aa ? S : X;
            ea = X;
            u = aa ? u : x == "1" ? p.j(o + R + S + "v") : l.e("vid");
            W && preVID && u != preVID && (u = preVID);
            z = x == "1" ? +z + 1 : +z == 0 ? 1 : +z;
            t = +t + 1;
            I = p.j(o + u + R + fa + "v");
            U = l.H(w);
            l.s();
            (function() {
              if (jb || q == "7f21ceb9")
                for (var a = document.getElementsByTagName("iframe"),
                    b = 0; b < a.length; b++) a[b].onload = function(b) {
                  return function() {
                    this.contentWindow.document.onclick = function(c) {
                      var d = f.M(a[b]);
                      $[0] = d.left;
                      $[1] = d.top;
                      d = "";
                      try {
                        d = F.t(a[b])
                      } catch (e) {}
                      $[2] = encodeURIComponent(d);
                      B = f.W(c);
                      f.r() > 0 && (B.x <= 0 || B.y <= 0 || B.x > +f.N() || B.y > +f.r()) || (M = f.D(c), j())
                    }
                  }
                }(b)
            })();
            r = window._pt_lt != -1 ? (new Date).getTime() - window._pt_lt : 0;
            r < 0 && (r = 0);
            A = "?id=" + q + "." + o + "." + u + "." + w + "." + I + "&stat=" + (x == "1" ? z : t) + "." + (s == 1 ? f.i() : (f.i() + 1) * s) + "." + ia * s + "." + f.m() + "." + r + "." + (x == "1" ? L.flag : f.O(O)) + (x ==
              "1" ? "" : "." + z) + "&ref=" + p.g(L.referrer.replace(/&/g, "*&*").replace(/\+/g, "*+*"), !1) + (x != "1" ? "&vref=" + p.g(O, !1) : "") + "&p=" + p.g(R.replace(/&/g, "*&*"), !1) + "&tl=" + xa + (H ? "&cad=" + H : "") + "&ptif=" + P;
            A += f.u();
            A += Ta();
            for (K = 0; K < C.length; K++) C[K][2] == "cookie" ? (J = D.k(C[K][1]), ja == "rakuten-sec" ? A += J ? J.slice(5, 10) == "00000" ? "&" + C[K][0] + "=1" : "&" + C[K][0] + "=2" : "&" + C[K][0] + "=0" : J && (A += "&" + C[K][0] + "=" + p.g(J, !1))) : A += "&" + C[K][0] + "=" + p.g(C[K][1], !1);
            x == "1" ? sa && (q == "519aa7cd" || q == "4d304c7a") && la != "allManual" && L.referrer != "" &&
              function(a, b) {
                for (var c = 0; c < v.length; c++)
                  if (a.indexOf(v[c]) > -1 && b.referrer.indexOf(v[c]) > -1) return 0;
                return 1
              }(N.href, L) && f.O(L.referrer) == 0 && !N.href.match(/[\#|\?|\&]_pt_link=[^#|^&]*/) ? (w = p.j(L.referrer), I = p.j(o + u + L.referrer + fa + "v"), A = "?id=" + q + "." + o + "." + u + "." + w + "." + I + "&stat=" + (x == "1" ? z : t) + "." + (s == 1 ? f.i() : (f.i() + 1) * s) + "." + ia * s + "." + f.m() + "." + r + ".0&ref=&p=" + p.g(L.referrer.replace(/&/g, "*&*"), !1) + "&tl=" + xa + (H ? "&cad=" + H : "") + "&ptif=" + P, A += f.u(), F.p(ya + A), w = p.j(R), I = p.j(o + u + R + fa + "v"), t = +t + 1, A = "?id=" + q +
                "." + o + "." + u + "." + w + "." + I + "&stat=" + t + "." + (s == 1 ? f.i() : (f.i() + 1) * s) + "." + ia * s + "." + f.m() + "." + r + "." + f.O(O) + ("." + z) + "&ref=" + p.g(L.referrer.replace(/&/g, "*&*").replace(/\+/g, "*+*"), !1) + "&vref=&p=" + p.g(R.replace(/&/g, "*&*"), !1) + "&tl=" + xa + (H ? "&cad=" + H : "") + "&ptif=" + P, A += f.u(), F.p(za + A)) : F.p(ya + A) : F.p(za + A);
            D.h(Z, "vt=" + X + "&cad=" + H, {
              f: ""
            });
            x == "1" && m.localStorage && typeof m.localStorage.removeItem == "function" && (m.localStorage.removeItem(qa), m.localStorage.setItem(qa, O));
            if (sa && (q == "519aa7cd" || q == "4d304c7a"))
              if (n.readyState ==
                "complete") Ia();
              else {
                var g = m.onload;
                m.onload = function() {
                  g && g();
                  Ia()
                }
              }
            var k = ["input", "textarea", "select", "embed"];
            document.readyState.toLowerCase() === "interactive" || document.readyState.toLowerCase() === "complete" ? E() : document.onreadystatechange = function() {
              document.readyState.toLowerCase() === "complete" && E()
            };
            c(m, "onorientationchange", function() {
              s = m.orientation == da || m.orientation == 0 ? 1 : -1
            });
            c(n, "touchmove", function() {
              Sa = !0
            });
            c(n, "touchstart", function(a) {
              a = a || m.event;
              M = f.D(a);
              B = f.la(a)
            });
            c(n, "click", function(a) {
              a =
                a || m.event;
              B = f.W(a);
              f.r() > 0 && (B.x <= 0 || B.y <= 0 || B.x > +f.N() || B.y > +f.r()) || (M = f.D(a), j())
            });
            c(n, "touchend", function() {
              Sa ? Sa = !1 : B.x <= 0 || B.y <= 0 || B.x == 0 && B.y == 0 || B.x < 0 || B.x > f.N() || B.y > f.r() || j()
            });
            var i = X,
              h, ha = 0;
            c(m, "scroll", function() {
              var a = (new Date).getTime();
              h = a;
              ha = h - i;
              if (!(ha < 1E3)) {
                var b = "";
                l.o();
                if (l.e("to_flag") == 1 || !l.Q())
                  if (l.e("to_flag") == 1 || +a - +l.e("sact") > +na) {
                    ma("pn");
                    return
                  } else if (l.Z(u, a)) {
                  ma("pv");
                  return
                } else b = eb;
                else if (b = a - ea - oa * Q, b < 0 || b > Q * 1.5) b = Q;
                U = l.H(w);
                ea = S = a;
                t = l.e("pvn");
                if (pa) clearInterval(window._pt_hb_interval),
                  window._pt_hb_interval = setInterval(function() {
                    G()
                  }, Q), oa = 0;
                l.s();
                a = f.w();
                s = m.orientation == da || m.orientation == 0 ? 1 : -1;
                s == 1 && a > ba ? ba = a : s != 1 && a > ca && (ca = a);
                (function() {
                  var a = !0;
                  n.body.clientHeight == 0 ? a = !1 : f.i() <= 1 ? a = !1 : f.i() + f.J() + 1 >= f.r() && (a = !1);
                  return a
                })() && pa && F.p(Za + ("?id=" + q + "." + o + "." + u + "." + w + "." + I + "&stat=" + (s == 1 ? f.i() : (f.i() + 1) * s) + "." + (s == 1 ? ba : ca * -1) + "." + (f.m() > 1500 ? 1500 : f.m()) + "." + b + "&ptif=" + P))
              }
              i = h
            });
            window._pt_hb_interval = setInterval(function() {
              G()
            }, Q);
            return !1
          })()
        }
      }
    }
  }
})();
