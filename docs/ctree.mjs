var al = Object.defineProperty;
var cl = (e, t, n) => t in e ? al(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ke = (e, t, n) => (cl(e, typeof t != "symbol" ? t + "" : t, n), n);
function Kt(e, t) {
  const n = /* @__PURE__ */ Object.create(null), o = e.split(",");
  for (let s = 0; s < o.length; s++)
    n[o[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
function on(e) {
  if (P(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = ve(o) ? pl(o) : on(o);
      if (s)
        for (const r in s)
          t[r] = s[r];
    }
    return t;
  } else {
    if (ve(e))
      return e;
    if (ae(e))
      return e;
  }
}
const dl = /;(?![^(]*\))/g, ul = /:([^]+)/, fl = /\/\*.*?\*\//gs;
function pl(e) {
  const t = {};
  return e.replace(fl, "").split(dl).forEach((n) => {
    if (n) {
      const o = n.split(ul);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function G(e) {
  let t = "";
  if (ve(e))
    t = e;
  else if (P(e))
    for (let n = 0; n < e.length; n++) {
      const o = G(e[n]);
      o && (t += o + " ");
    }
  else if (ae(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function fo(e) {
  if (!e)
    return null;
  let { class: t, style: n } = e;
  return t && !ve(t) && (e.class = G(t)), n && (e.style = on(n)), e;
}
const hl = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", gl = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", ml = /* @__PURE__ */ Kt(hl), vl = /* @__PURE__ */ Kt(gl), _l = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", bl = /* @__PURE__ */ Kt(_l);
function jr(e) {
  return !!e || e === "";
}
function yl(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = !0;
  for (let o = 0; n && o < e.length; o++)
    n = Fo(e[o], t[o]);
  return n;
}
function Fo(e, t) {
  if (e === t)
    return !0;
  let n = qs(e), o = qs(t);
  if (n || o)
    return n && o ? e.getTime() === t.getTime() : !1;
  if (n = Rn(e), o = Rn(t), n || o)
    return e === t;
  if (n = P(e), o = P(t), n || o)
    return n && o ? yl(e, t) : !1;
  if (n = ae(e), o = ae(t), n || o) {
    if (!n || !o)
      return !1;
    const s = Object.keys(e).length, r = Object.keys(t).length;
    if (s !== r)
      return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i), a = t.hasOwnProperty(i);
      if (l && !a || !l && a || !Fo(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function Nl(e, t) {
  return e.findIndex((n) => Fo(n, t));
}
const Ie = (e) => ve(e) ? e : e == null ? "" : P(e) || ae(e) && (e.toString === Ur || !z(e.toString)) ? JSON.stringify(e, Br, 2) : String(e), Br = (e, t) => t && t.__v_isRef ? Br(e, t.value) : Xt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [o, s]) => (n[`${o} =>`] = s, n), {})
} : xo(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : ae(t) && !P(t) && !Wr(t) ? String(t) : t, pe = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, yn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Me = () => {
}, Hr = () => !1, El = /^on[^a-z]/, Yn = (e) => El.test(e), No = (e) => e.startsWith("onUpdate:"), Ee = Object.assign, $s = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Cl = Object.prototype.hasOwnProperty, te = (e, t) => Cl.call(e, t), P = Array.isArray, Xt = (e) => Jn(e) === "[object Map]", xo = (e) => Jn(e) === "[object Set]", qs = (e) => Jn(e) === "[object Date]", z = (e) => typeof e == "function", ve = (e) => typeof e == "string", Rn = (e) => typeof e == "symbol", ae = (e) => e !== null && typeof e == "object", Vs = (e) => ae(e) && z(e.then) && z(e.catch), Ur = Object.prototype.toString, Jn = (e) => Ur.call(e), Ss = (e) => Jn(e).slice(8, -1), Wr = (e) => Jn(e) === "[object Object]", Ts = (e) => ve(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, po = /* @__PURE__ */ Kt(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), kl = /* @__PURE__ */ Kt("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"), Mo = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, wl = /-(\w)/g, dt = Mo((e) => e.replace(wl, (t, n) => n ? n.toUpperCase() : "")), Dl = /\B([A-Z])/g, Ft = Mo((e) => e.replace(Dl, "-$1").toLowerCase()), sn = Mo((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ot = Mo((e) => e ? `on${sn(e)}` : ""), jn = (e, t) => !Object.is(e, t), gn = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Eo = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Co = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Ol = (e) => {
  const t = ve(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let zs;
const qr = () => zs || (zs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ls(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Qe;
class $l {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = Qe, !t && Qe && (this.index = (Qe.scopes || (Qe.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Qe;
      try {
        return Qe = this, t();
      } finally {
        Qe = n;
      }
    } else
      process.env.NODE_ENV !== "production" && ls("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Qe = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Qe = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++)
        this.effects[n].stop();
      for (n = 0, o = this.cleanups.length; n < o; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, o = this.scopes.length; n < o; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Vl(e, t = Qe) {
  t && t.active && t.effects.push(e);
}
function Sl() {
  return Qe;
}
const Bn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, zr = (e) => (e.w & xt) > 0, Yr = (e) => (e.n & xt) > 0, Tl = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= xt;
}, Al = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let o = 0; o < t.length; o++) {
      const s = t[o];
      zr(s) && !Yr(s) ? s.delete(e) : t[n++] = s, s.w &= ~xt, s.n &= ~xt;
    }
    t.length = n;
  }
}, as = /* @__PURE__ */ new WeakMap();
let In = 0, xt = 1;
const cs = 30;
let Re;
const Zt = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), ds = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class As {
  constructor(t, n = null, o) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Vl(this, o);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = Re, n = It;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = Re, Re = this, It = !0, xt = 1 << ++In, In <= cs ? Tl(this) : Ys(this), this.fn();
    } finally {
      In <= cs && Al(this), xt = 1 << --In, Re = this.parent, It = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    Re === this ? this.deferStop = !0 : this.active && (Ys(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Ys(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let It = !0;
const Jr = [];
function ln() {
  Jr.push(It), It = !1;
}
function an() {
  const e = Jr.pop();
  It = e === void 0 ? !0 : e;
}
function je(e, t, n) {
  if (It && Re) {
    let o = as.get(e);
    o || as.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || o.set(n, s = Bn());
    const r = process.env.NODE_ENV !== "production" ? { effect: Re, target: e, type: t, key: n } : void 0;
    us(s, r);
  }
}
function us(e, t) {
  let n = !1;
  In <= cs ? Yr(e) || (e.n |= xt, n = !zr(e)) : n = !e.has(Re), n && (e.add(Re), Re.deps.push(e), process.env.NODE_ENV !== "production" && Re.onTrack && Re.onTrack(Object.assign({ effect: Re }, t)));
}
function yt(e, t, n, o, s, r) {
  const i = as.get(e);
  if (!i)
    return;
  let l = [];
  if (t === "clear")
    l = [...i.values()];
  else if (n === "length" && P(e)) {
    const d = Number(o);
    i.forEach((p, f) => {
      (f === "length" || f >= d) && l.push(p);
    });
  } else
    switch (n !== void 0 && l.push(i.get(n)), t) {
      case "add":
        P(e) ? Ts(n) && l.push(i.get("length")) : (l.push(i.get(Zt)), Xt(e) && l.push(i.get(ds)));
        break;
      case "delete":
        P(e) || (l.push(i.get(Zt)), Xt(e) && l.push(i.get(ds)));
        break;
      case "set":
        Xt(e) && l.push(i.get(Zt));
        break;
    }
  const a = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: o, oldValue: s, oldTarget: r } : void 0;
  if (l.length === 1)
    l[0] && (process.env.NODE_ENV !== "production" ? vn(l[0], a) : vn(l[0]));
  else {
    const d = [];
    for (const p of l)
      p && d.push(...p);
    process.env.NODE_ENV !== "production" ? vn(Bn(d), a) : vn(Bn(d));
  }
}
function vn(e, t) {
  const n = P(e) ? e : [...e];
  for (const o of n)
    o.computed && Js(o, t);
  for (const o of n)
    o.computed || Js(o, t);
}
function Js(e, t) {
  (e !== Re || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(Ee({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const Il = /* @__PURE__ */ Kt("__proto__,__v_isRef,__isVue"), Xr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Rn)
), Fl = /* @__PURE__ */ Lo(), xl = /* @__PURE__ */ Lo(!1, !0), Ml = /* @__PURE__ */ Lo(!0), Ll = /* @__PURE__ */ Lo(!0, !0), Xs = /* @__PURE__ */ Kl();
function Kl() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const o = J(this);
      for (let r = 0, i = this.length; r < i; r++)
        je(o, "get", r + "");
      const s = o[t](...n);
      return s === -1 || s === !1 ? o[t](...n.map(J)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      ln();
      const o = J(this)[t].apply(this, n);
      return an(), o;
    };
  }), e;
}
function Pl(e) {
  const t = J(this);
  return je(t, "has", e), t.hasOwnProperty(e);
}
function Lo(e = !1, t = !1) {
  return function(o, s, r) {
    if (s === "__v_isReactive")
      return !e;
    if (s === "__v_isReadonly")
      return e;
    if (s === "__v_isShallow")
      return t;
    if (s === "__v_raw" && r === (e ? t ? si : oi : t ? ni : ti).get(o))
      return o;
    const i = P(o);
    if (!e) {
      if (i && te(Xs, s))
        return Reflect.get(Xs, s, r);
      if (s === "hasOwnProperty")
        return Pl;
    }
    const l = Reflect.get(o, s, r);
    return (Rn(s) ? Xr.has(s) : Il(s)) || (e || je(o, "get", s), t) ? l : Te(l) ? i && Ts(s) ? l : l.value : ae(l) ? e ? ri(l) : Nt(l) : l;
  };
}
const Rl = /* @__PURE__ */ Zr(), jl = /* @__PURE__ */ Zr(!0);
function Zr(e = !1) {
  return function(n, o, s, r) {
    let i = n[o];
    if (Mt(i) && Te(i) && !Te(s))
      return !1;
    if (!e && (!ko(s) && !Mt(s) && (i = J(i), s = J(s)), !P(n) && Te(i) && !Te(s)))
      return i.value = s, !0;
    const l = P(n) && Ts(o) ? Number(o) < n.length : te(n, o), a = Reflect.set(n, o, s, r);
    return n === J(r) && (l ? jn(s, i) && yt(n, "set", o, s, i) : yt(n, "add", o, s)), a;
  };
}
function Bl(e, t) {
  const n = te(e, t), o = e[t], s = Reflect.deleteProperty(e, t);
  return s && n && yt(e, "delete", t, void 0, o), s;
}
function Hl(e, t) {
  const n = Reflect.has(e, t);
  return (!Rn(t) || !Xr.has(t)) && je(e, "has", t), n;
}
function Ul(e) {
  return je(e, "iterate", P(e) ? "length" : Zt), Reflect.ownKeys(e);
}
const Gr = {
  get: Fl,
  set: Rl,
  deleteProperty: Bl,
  has: Hl,
  ownKeys: Ul
}, Qr = {
  get: Ml,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && ls(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && ls(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, Wl = /* @__PURE__ */ Ee({}, Gr, {
  get: xl,
  set: jl
}), ql = /* @__PURE__ */ Ee({}, Qr, {
  get: Ll
}), Is = (e) => e, Ko = (e) => Reflect.getPrototypeOf(e);
function so(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const s = J(e), r = J(t);
  n || (t !== r && je(s, "get", t), je(s, "get", r));
  const { has: i } = Ko(s), l = o ? Is : n ? Fs : Hn;
  if (i.call(s, t))
    return l(e.get(t));
  if (i.call(s, r))
    return l(e.get(r));
  e !== s && e.get(t);
}
function ro(e, t = !1) {
  const n = this.__v_raw, o = J(n), s = J(e);
  return t || (e !== s && je(o, "has", e), je(o, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function io(e, t = !1) {
  return e = e.__v_raw, !t && je(J(e), "iterate", Zt), Reflect.get(e, "size", e);
}
function Zs(e) {
  e = J(e);
  const t = J(this);
  return Ko(t).has.call(t, e) || (t.add(e), yt(t, "add", e, e)), this;
}
function Gs(e, t) {
  t = J(t);
  const n = J(this), { has: o, get: s } = Ko(n);
  let r = o.call(n, e);
  r ? process.env.NODE_ENV !== "production" && ei(n, o, e) : (e = J(e), r = o.call(n, e));
  const i = s.call(n, e);
  return n.set(e, t), r ? jn(t, i) && yt(n, "set", e, t, i) : yt(n, "add", e, t), this;
}
function Qs(e) {
  const t = J(this), { has: n, get: o } = Ko(t);
  let s = n.call(t, e);
  s ? process.env.NODE_ENV !== "production" && ei(t, n, e) : (e = J(e), s = n.call(t, e));
  const r = o ? o.call(t, e) : void 0, i = t.delete(e);
  return s && yt(t, "delete", e, void 0, r), i;
}
function er() {
  const e = J(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? Xt(e) ? new Map(e) : new Set(e) : void 0, o = e.clear();
  return t && yt(e, "clear", void 0, void 0, n), o;
}
function lo(e, t) {
  return function(o, s) {
    const r = this, i = r.__v_raw, l = J(i), a = t ? Is : e ? Fs : Hn;
    return !e && je(l, "iterate", Zt), i.forEach((d, p) => o.call(s, a(d), a(p), r));
  };
}
function ao(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, r = J(s), i = Xt(r), l = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, d = s[e](...o), p = n ? Is : t ? Fs : Hn;
    return !t && je(r, "iterate", a ? ds : Zt), {
      // iterator protocol
      next() {
        const { value: f, done: g } = d.next();
        return g ? { value: f, done: g } : {
          value: l ? [p(f[0]), p(f[1])] : p(f),
          done: g
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function kt(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${sn(e)} operation ${n}failed: target is readonly.`, J(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function zl() {
  const e = {
    get(r) {
      return so(this, r);
    },
    get size() {
      return io(this);
    },
    has: ro,
    add: Zs,
    set: Gs,
    delete: Qs,
    clear: er,
    forEach: lo(!1, !1)
  }, t = {
    get(r) {
      return so(this, r, !1, !0);
    },
    get size() {
      return io(this);
    },
    has: ro,
    add: Zs,
    set: Gs,
    delete: Qs,
    clear: er,
    forEach: lo(!1, !0)
  }, n = {
    get(r) {
      return so(this, r, !0);
    },
    get size() {
      return io(this, !0);
    },
    has(r) {
      return ro.call(this, r, !0);
    },
    add: kt(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: kt(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: kt(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: kt(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: lo(!0, !1)
  }, o = {
    get(r) {
      return so(this, r, !0, !0);
    },
    get size() {
      return io(this, !0);
    },
    has(r) {
      return ro.call(this, r, !0);
    },
    add: kt(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: kt(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: kt(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: kt(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: lo(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = ao(r, !1, !1), n[r] = ao(r, !0, !1), t[r] = ao(r, !1, !0), o[r] = ao(r, !0, !0);
  }), [
    e,
    n,
    t,
    o
  ];
}
const [Yl, Jl, Xl, Zl] = /* @__PURE__ */ zl();
function Po(e, t) {
  const n = t ? e ? Zl : Xl : e ? Jl : Yl;
  return (o, s, r) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(te(n, s) && s in o ? n : o, s, r);
}
const Gl = {
  get: /* @__PURE__ */ Po(!1, !1)
}, Ql = {
  get: /* @__PURE__ */ Po(!1, !0)
}, ea = {
  get: /* @__PURE__ */ Po(!0, !1)
}, ta = {
  get: /* @__PURE__ */ Po(!0, !0)
};
function ei(e, t, n) {
  const o = J(n);
  if (o !== n && t.call(e, o)) {
    const s = Ss(e);
    console.warn(`Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const ti = /* @__PURE__ */ new WeakMap(), ni = /* @__PURE__ */ new WeakMap(), oi = /* @__PURE__ */ new WeakMap(), si = /* @__PURE__ */ new WeakMap();
function na(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function oa(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : na(Ss(e));
}
function Nt(e) {
  return Mt(e) ? e : Ro(e, !1, Gr, Gl, ti);
}
function sa(e) {
  return Ro(e, !1, Wl, Ql, ni);
}
function ri(e) {
  return Ro(e, !0, Qr, ea, oi);
}
function _n(e) {
  return Ro(e, !0, ql, ta, si);
}
function Ro(e, t, n, o, s) {
  if (!ae(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = s.get(e);
  if (r)
    return r;
  const i = oa(e);
  if (i === 0)
    return e;
  const l = new Proxy(e, i === 2 ? o : n);
  return s.set(e, l), l;
}
function Gt(e) {
  return Mt(e) ? Gt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Mt(e) {
  return !!(e && e.__v_isReadonly);
}
function ko(e) {
  return !!(e && e.__v_isShallow);
}
function fs(e) {
  return Gt(e) || Mt(e);
}
function J(e) {
  const t = e && e.__v_raw;
  return t ? J(t) : e;
}
function ii(e) {
  return Eo(e, "__v_skip", !0), e;
}
const Hn = (e) => ae(e) ? Nt(e) : e, Fs = (e) => ae(e) ? ri(e) : e;
function li(e) {
  It && Re && (e = J(e), process.env.NODE_ENV !== "production" ? us(e.dep || (e.dep = Bn()), {
    target: e,
    type: "get",
    key: "value"
  }) : us(e.dep || (e.dep = Bn())));
}
function ai(e, t) {
  e = J(e);
  const n = e.dep;
  n && (process.env.NODE_ENV !== "production" ? vn(n, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : vn(n));
}
function Te(e) {
  return !!(e && e.__v_isRef === !0);
}
function j(e) {
  return ra(e, !1);
}
function ra(e, t) {
  return Te(e) ? e : new ia(e, t);
}
class ia {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : J(t), this._value = n ? t : Hn(t);
  }
  get value() {
    return li(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || ko(t) || Mt(t);
    t = n ? t : J(t), jn(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Hn(t), ai(this, t));
  }
}
function la(e) {
  return Te(e) ? e.value : e;
}
const aa = {
  get: (e, t, n) => la(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return Te(s) && !Te(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function ci(e) {
  return Gt(e) ? e : new Proxy(e, aa);
}
var di;
class ca {
  constructor(t, n, o, s) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[di] = !1, this._dirty = !0, this.effect = new As(t, () => {
      this._dirty || (this._dirty = !0, ai(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = o;
  }
  get value() {
    const t = J(this);
    return li(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
di = "__v_isReadonly";
function da(e, t, n = !1) {
  let o, s;
  const r = z(e);
  r ? (o = e, s = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : Me) : (o = e.get, s = e.set);
  const i = new ca(o, s, r || !s, n);
  return process.env.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
const Qt = [];
function ho(e) {
  Qt.push(e);
}
function go() {
  Qt.pop();
}
function C(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  ln();
  const n = Qt.length ? Qt[Qt.length - 1].component : null, o = n && n.appContext.config.warnHandler, s = ua();
  if (o)
    _t(o, n, 11, [
      e + t.join(""),
      n && n.proxy,
      s.map(({ vnode: r }) => `at <${Yo(n, r.type)}>`).join(`
`),
      s
    ]);
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    s.length && r.push(`
`, ...fa(s)), console.warn(...r);
  }
  an();
}
function ua() {
  let e = Qt[Qt.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const o = e.component && e.component.parent;
    e = o && o.vnode;
  }
  return t;
}
function fa(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...pa(n));
  }), t;
}
function pa({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, s = ` at <${Yo(e.component, e.type, o)}`, r = ">" + n;
  return e.props ? [s, ...ha(e.props), r] : [s + r];
}
function ha(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...ui(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function ui(e, t, n) {
  return ve(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : Te(t) ? (t = ui(e, J(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : z(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = J(t), n ? t : [`${e}=`, t]);
}
function ga(e, t) {
  process.env.NODE_ENV !== "production" && e !== void 0 && (typeof e != "number" ? C(`${t} is not a valid number - got ${JSON.stringify(e)}.`) : isNaN(e) && C(`${t} is NaN - the duration expression might be incorrect.`));
}
const xs = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function _t(e, t, n, o) {
  let s;
  try {
    s = o ? e(...o) : e();
  } catch (r) {
    jo(r, t, n);
  }
  return s;
}
function Ze(e, t, n, o) {
  if (z(e)) {
    const r = _t(e, t, n, o);
    return r && Vs(r) && r.catch((i) => {
      jo(i, t, n);
    }), r;
  }
  const s = [];
  for (let r = 0; r < e.length; r++)
    s.push(Ze(e[r], t, n, o));
  return s;
}
function jo(e, t, n, o = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const i = t.proxy, l = process.env.NODE_ENV !== "production" ? xs[n] : n;
    for (; r; ) {
      const d = r.ec;
      if (d) {
        for (let p = 0; p < d.length; p++)
          if (d[p](e, i, l) === !1)
            return;
      }
      r = r.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      _t(a, null, 10, [e, i, l]);
      return;
    }
  }
  ma(e, n, s, o);
}
function ma(e, t, n, o = !0) {
  if (process.env.NODE_ENV !== "production") {
    const s = xs[t];
    if (n && ho(n), C(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && go(), o)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let Un = !1, ps = !1;
const Le = [];
let it = 0;
const Nn = [];
let st = null, $t = 0;
const fi = /* @__PURE__ */ Promise.resolve();
let Ms = null;
const va = 100;
function pi(e) {
  const t = Ms || fi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function _a(e) {
  let t = it + 1, n = Le.length;
  for (; t < n; ) {
    const o = t + n >>> 1;
    Wn(Le[o]) < e ? t = o + 1 : n = o;
  }
  return t;
}
function Bo(e) {
  (!Le.length || !Le.includes(e, Un && e.allowRecurse ? it + 1 : it)) && (e.id == null ? Le.push(e) : Le.splice(_a(e.id), 0, e), hi());
}
function hi() {
  !Un && !ps && (ps = !0, Ms = fi.then(vi));
}
function ba(e) {
  const t = Le.indexOf(e);
  t > it && Le.splice(t, 1);
}
function gi(e) {
  P(e) ? Nn.push(...e) : (!st || !st.includes(e, e.allowRecurse ? $t + 1 : $t)) && Nn.push(e), hi();
}
function tr(e, t = Un ? it + 1 : 0) {
  for (process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()); t < Le.length; t++) {
    const n = Le[t];
    if (n && n.pre) {
      if (process.env.NODE_ENV !== "production" && Ls(e, n))
        continue;
      Le.splice(t, 1), t--, n();
    }
  }
}
function mi(e) {
  if (Nn.length) {
    const t = [...new Set(Nn)];
    if (Nn.length = 0, st) {
      st.push(...t);
      return;
    }
    for (st = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), st.sort((n, o) => Wn(n) - Wn(o)), $t = 0; $t < st.length; $t++)
      process.env.NODE_ENV !== "production" && Ls(e, st[$t]) || st[$t]();
    st = null, $t = 0;
  }
}
const Wn = (e) => e.id == null ? 1 / 0 : e.id, ya = (e, t) => {
  const n = Wn(e) - Wn(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function vi(e) {
  ps = !1, Un = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Le.sort(ya);
  const t = process.env.NODE_ENV !== "production" ? (n) => Ls(e, n) : Me;
  try {
    for (it = 0; it < Le.length; it++) {
      const n = Le[it];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        _t(
          n,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    it = 0, Le.length = 0, mi(e), Un = !1, Ms = null, (Le.length || Nn.length) && vi(e);
  }
}
function Ls(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > va) {
      const o = t.ownerInstance, s = o && Hs(o.type);
      return C(`Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
let en = !1;
const mn = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (qr().__VUE_HMR_RUNTIME__ = {
  createRecord: Qo(_i),
  rerender: Qo(Ca),
  reload: Qo(ka)
});
const rn = /* @__PURE__ */ new Map();
function Na(e) {
  const t = e.type.__hmrId;
  let n = rn.get(t);
  n || (_i(t, e.type), n = rn.get(t)), n.instances.add(e);
}
function Ea(e) {
  rn.get(e.type.__hmrId).instances.delete(e);
}
function _i(e, t) {
  return rn.has(e) ? !1 : (rn.set(e, {
    initialDef: Mn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Mn(e) {
  return tl(e) ? e.__vccOpts : e;
}
function Ca(e, t) {
  const n = rn.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, Mn(o.type).render = t), o.renderCache = [], en = !0, o.update(), en = !1;
  }));
}
function ka(e, t) {
  const n = rn.get(e);
  if (!n)
    return;
  t = Mn(t), nr(n.initialDef, t);
  const o = [...n.instances];
  for (const s of o) {
    const r = Mn(s.type);
    mn.has(r) || (r !== n.initialDef && nr(r, t), mn.add(r)), s.appContext.optionsCache.delete(s.type), s.ceReload ? (mn.add(r), s.ceReload(t.styles), mn.delete(r)) : s.parent ? Bo(s.parent.update) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  gi(() => {
    for (const s of o)
      mn.delete(Mn(s.type));
  });
}
function nr(e, t) {
  Ee(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Qo(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let lt, Fn = [], hs = !1;
function Xn(e, ...t) {
  lt ? lt.emit(e, ...t) : hs || Fn.push({ event: e, args: t });
}
function bi(e, t) {
  var n, o;
  lt = e, lt ? (lt.enabled = !0, Fn.forEach(({ event: s, args: r }) => lt.emit(s, ...r)), Fn = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  !(!((o = (n = window.navigator) === null || n === void 0 ? void 0 : n.userAgent) === null || o === void 0) && o.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    bi(r, t);
  }), setTimeout(() => {
    lt || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, hs = !0, Fn = []);
  }, 3e3)) : (hs = !0, Fn = []);
}
function wa(e, t) {
  Xn("app:init", e, t, {
    Fragment: Se,
    Text: Qn,
    Comment: Fe,
    Static: _o
  });
}
function Da(e) {
  Xn("app:unmount", e);
}
const Oa = /* @__PURE__ */ Ks(
  "component:added"
  /* DevtoolsHooks.COMPONENT_ADDED */
), yi = /* @__PURE__ */ Ks(
  "component:updated"
  /* DevtoolsHooks.COMPONENT_UPDATED */
), $a = /* @__PURE__ */ Ks(
  "component:removed"
  /* DevtoolsHooks.COMPONENT_REMOVED */
), Va = (e) => {
  lt && typeof lt.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !lt.cleanupBuffer(e) && $a(e);
};
function Ks(e) {
  return (t) => {
    Xn(e, t.appContext.app, t.uid, t.parent ? t.parent.uid : void 0, t);
  };
}
const Sa = /* @__PURE__ */ Ni(
  "perf:start"
  /* DevtoolsHooks.PERFORMANCE_START */
), Ta = /* @__PURE__ */ Ni(
  "perf:end"
  /* DevtoolsHooks.PERFORMANCE_END */
);
function Ni(e) {
  return (t, n, o) => {
    Xn(e, t.appContext.app, t.uid, t, n, o);
  };
}
function Aa(e, t, n) {
  Xn("component:emit", e.appContext.app, e, t, n);
}
function Ia(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const o = e.vnode.props || pe;
  if (process.env.NODE_ENV !== "production") {
    const { emitsOptions: p, propsOptions: [f] } = e;
    if (p)
      if (!(t in p))
        (!f || !(Ot(t) in f)) && C(`Component emitted event "${t}" but it is neither declared in the emits option nor as an "${Ot(t)}" prop.`);
      else {
        const g = p[t];
        z(g) && (g(...n) || C(`Invalid event arguments: event validation failed for event "${t}".`));
      }
  }
  let s = n;
  const r = t.startsWith("update:"), i = r && t.slice(7);
  if (i && i in o) {
    const p = `${i === "modelValue" ? "model" : i}Modifiers`, { number: f, trim: g } = o[p] || pe;
    g && (s = n.map((D) => ve(D) ? D.trim() : D)), f && (s = n.map(Co));
  }
  if (process.env.NODE_ENV !== "production" && Aa(e, t, s), process.env.NODE_ENV !== "production") {
    const p = t.toLowerCase();
    p !== t && o[Ot(p)] && C(`Event "${p}" is emitted in component ${Yo(e, e.type)} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${Ft(t)}" instead of "${t}".`);
  }
  let l, a = o[l = Ot(t)] || // also try camelCase event handler (#2249)
  o[l = Ot(dt(t))];
  !a && r && (a = o[l = Ot(Ft(t))]), a && Ze(a, e, 6, s);
  const d = o[l + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ze(d, e, 6, s);
  }
}
function Ei(e, t, n = !1) {
  const o = t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const r = e.emits;
  let i = {}, l = !1;
  if (!z(e)) {
    const a = (d) => {
      const p = Ei(d, t, !0);
      p && (l = !0, Ee(i, p));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !r && !l ? (ae(e) && o.set(e, null), null) : (P(r) ? r.forEach((a) => i[a] = null) : Ee(i, r), ae(e) && o.set(e, i), i);
}
function Ho(e, t) {
  return !e || !Yn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), te(e, t[0].toLowerCase() + t.slice(1)) || te(e, Ft(t)) || te(e, t));
}
let Ae = null, Uo = null;
function wo(e) {
  const t = Ae;
  return Ae = e, Uo = e && e.type.__scopeId || null, t;
}
function Ci(e) {
  Uo = e;
}
function ki() {
  Uo = null;
}
function Lt(e, t = Ae, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && hr(-1);
    const r = wo(t);
    let i;
    try {
      i = e(...s);
    } finally {
      wo(r), o._d && hr(1);
    }
    return process.env.NODE_ENV !== "production" && yi(t), i;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
let gs = !1;
function Do() {
  gs = !0;
}
function es(e) {
  const { type: t, vnode: n, proxy: o, withProxy: s, props: r, propsOptions: [i], slots: l, attrs: a, emit: d, render: p, renderCache: f, data: g, setupState: D, ctx: A, inheritAttrs: V } = e;
  let Y, H;
  const Z = wo(e);
  process.env.NODE_ENV !== "production" && (gs = !1);
  try {
    if (n.shapeFlag & 4) {
      const Q = s || o;
      Y = et(p.call(Q, Q, f, r, D, g, A)), H = a;
    } else {
      const Q = t;
      process.env.NODE_ENV !== "production" && a === r && Do(), Y = et(Q.length > 1 ? Q(r, process.env.NODE_ENV !== "production" ? {
        get attrs() {
          return Do(), a;
        },
        slots: l,
        emit: d
      } : { attrs: a, slots: l, emit: d }) : Q(
        r,
        null
        /* we know it doesn't need it */
      )), H = t.props ? a : xa(a);
    }
  } catch (Q) {
    Kn.length = 0, jo(
      Q,
      e,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ), Y = he(Fe);
  }
  let R = Y, B;
  if (process.env.NODE_ENV !== "production" && Y.patchFlag > 0 && Y.patchFlag & 2048 && ([R, B] = Fa(Y)), H && V !== !1) {
    const Q = Object.keys(H), { shapeFlag: Ce } = R;
    if (Q.length) {
      if (Ce & 7)
        i && Q.some(No) && (H = Ma(H, i)), R = ft(R, H);
      else if (process.env.NODE_ENV !== "production" && !gs && R.type !== Fe) {
        const ne = Object.keys(a), U = [], ee = [];
        for (let oe = 0, ue = ne.length; oe < ue; oe++) {
          const _ = ne[oe];
          Yn(_) ? No(_) || U.push(_[2].toLowerCase() + _.slice(3)) : ee.push(_);
        }
        ee.length && C(`Extraneous non-props attributes (${ee.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`), U.length && C(`Extraneous non-emits event listeners (${U.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !or(R) && C("Runtime directive used on component with non-element root node. The directives will not function as intended."), R = ft(R), R.dirs = R.dirs ? R.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !or(R) && C("Component inside <Transition> renders non-element root node that cannot be animated."), R.transition = n.transition), process.env.NODE_ENV !== "production" && B ? B(R) : Y = R, wo(Z), Y;
}
const Fa = (e) => {
  const t = e.children, n = e.dynamicChildren, o = wi(t);
  if (!o)
    return [e, void 0];
  const s = t.indexOf(o), r = n ? n.indexOf(o) : -1, i = (l) => {
    t[s] = l, n && (r > -1 ? n[r] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [et(o), i];
};
function wi(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    if (Cn(o)) {
      if (o.type !== Fe || o.children === "v-if") {
        if (t)
          return;
        t = o;
      }
    } else
      return;
  }
  return t;
}
const xa = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Yn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ma = (e, t) => {
  const n = {};
  for (const o in e)
    (!No(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
}, or = (e) => e.shapeFlag & 7 || e.type === Fe;
function La(e, t, n) {
  const { props: o, children: s, component: r } = e, { props: i, children: l, patchFlag: a } = t, d = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (s || l) && en || t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return o ? sr(o, i, d) : !!i;
    if (a & 8) {
      const p = t.dynamicProps;
      for (let f = 0; f < p.length; f++) {
        const g = p[f];
        if (i[g] !== o[g] && !Ho(d, g))
          return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : o === i ? !1 : o ? i ? sr(o, i, d) : !0 : !!i;
  return !1;
}
function sr(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const r = o[s];
    if (t[r] !== e[r] && !Ho(n, r))
      return !0;
  }
  return !1;
}
function Ka({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Pa = (e) => e.__isSuspense;
function Ra(e, t) {
  t && t.pendingBranch ? P(e) ? t.effects.push(...e) : t.effects.push(e) : gi(e);
}
function ja(e, t) {
  if (!Ne)
    process.env.NODE_ENV !== "production" && C("provide() can only be used inside setup().");
  else {
    let n = Ne.provides;
    const o = Ne.parent && Ne.parent.provides;
    o === n && (n = Ne.provides = Object.create(o)), n[e] = t;
  }
}
function mo(e, t, n = !1) {
  const o = Ne || Ae;
  if (o) {
    const s = o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && z(t) ? t.call(o.proxy) : t;
    process.env.NODE_ENV !== "production" && C(`injection "${String(e)}" not found.`);
  } else
    process.env.NODE_ENV !== "production" && C("inject() can only be used inside setup() or functional components.");
}
const co = {};
function At(e, t, n) {
  return process.env.NODE_ENV !== "production" && !z(t) && C("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."), Di(e, t, n);
}
function Di(e, t, { immediate: n, deep: o, flush: s, onTrack: r, onTrigger: i } = pe) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && C('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), o !== void 0 && C('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const l = (B) => {
    C("Invalid watch source: ", B, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, a = Sl() === (Ne == null ? void 0 : Ne.scope) ? Ne : null;
  let d, p = !1, f = !1;
  if (Te(e) ? (d = () => e.value, p = ko(e)) : Gt(e) ? (d = () => e, o = !0) : P(e) ? (f = !0, p = e.some((B) => Gt(B) || ko(B)), d = () => e.map((B) => {
    if (Te(B))
      return B.value;
    if (Gt(B))
      return Jt(B);
    if (z(B))
      return _t(
        B,
        a,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    process.env.NODE_ENV !== "production" && l(B);
  })) : z(e) ? t ? d = () => _t(
    e,
    a,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : d = () => {
    if (!(a && a.isUnmounted))
      return g && g(), Ze(e, a, 3, [D]);
  } : (d = Me, process.env.NODE_ENV !== "production" && l(e)), t && o) {
    const B = d;
    d = () => Jt(B());
  }
  let g, D = (B) => {
    g = Z.onStop = () => {
      _t(
        B,
        a,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, A;
  if (zn)
    if (D = Me, t ? n && Ze(t, a, 3, [
      d(),
      f ? [] : void 0,
      D
    ]) : d(), s === "sync") {
      const B = jc();
      A = B.__watcherHandles || (B.__watcherHandles = []);
    } else
      return Me;
  let V = f ? new Array(e.length).fill(co) : co;
  const Y = () => {
    if (Z.active)
      if (t) {
        const B = Z.run();
        (o || p || (f ? B.some((Q, Ce) => jn(Q, V[Ce])) : jn(B, V))) && (g && g(), Ze(t, a, 3, [
          B,
          // pass undefined as the old value when it's changed for the first time
          V === co ? void 0 : f && V[0] === co ? [] : V,
          D
        ]), V = B);
      } else
        Z.run();
  };
  Y.allowRecurse = !!t;
  let H;
  s === "sync" ? H = Y : s === "post" ? H = () => Ue(Y, a && a.suspense) : (Y.pre = !0, a && (Y.id = a.uid), H = () => Bo(Y));
  const Z = new As(d, H);
  process.env.NODE_ENV !== "production" && (Z.onTrack = r, Z.onTrigger = i), t ? n ? Y() : V = Z.run() : s === "post" ? Ue(Z.run.bind(Z), a && a.suspense) : Z.run();
  const R = () => {
    Z.stop(), a && a.scope && $s(a.scope.effects, Z);
  };
  return A && A.push(R), R;
}
function Ba(e, t, n) {
  const o = this.proxy, s = ve(e) ? e.includes(".") ? Oi(o, e) : () => o[e] : e.bind(o, o);
  let r;
  z(t) ? r = t : (r = t.handler, n = t);
  const i = Ne;
  wn(this);
  const l = Di(s, r.bind(o), n);
  return i ? wn(i) : nn(), l;
}
function Oi(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
function Jt(e, t) {
  if (!ae(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), Te(e))
    Jt(e.value, t);
  else if (P(e))
    for (let n = 0; n < e.length; n++)
      Jt(e[n], t);
  else if (xo(e) || Xt(e))
    e.forEach((n) => {
      Jt(n, t);
    });
  else if (Wr(e))
    for (const n in e)
      Jt(e[n], t);
  return e;
}
function Ha() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Gn(() => {
    e.isMounted = !0;
  }), Ai(() => {
    e.isUnmounting = !0;
  }), e;
}
const Je = [Function, Array], Ua = {
  name: "BaseTransition",
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: Je,
    onEnter: Je,
    onAfterEnter: Je,
    onEnterCancelled: Je,
    // leave
    onBeforeLeave: Je,
    onLeave: Je,
    onAfterLeave: Je,
    onLeaveCancelled: Je,
    // appear
    onBeforeAppear: Je,
    onAppear: Je,
    onAfterAppear: Je,
    onAppearCancelled: Je
  },
  setup(e, { slots: t }) {
    const n = bn(), o = Ha();
    let s;
    return () => {
      const r = t.default && Si(t.default(), !0);
      if (!r || !r.length)
        return;
      let i = r[0];
      if (r.length > 1) {
        let V = !1;
        for (const Y of r)
          if (Y.type !== Fe) {
            if (process.env.NODE_ENV !== "production" && V) {
              C("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
              break;
            }
            if (i = Y, V = !0, process.env.NODE_ENV === "production")
              break;
          }
      }
      const l = J(e), { mode: a } = l;
      if (process.env.NODE_ENV !== "production" && a && a !== "in-out" && a !== "out-in" && a !== "default" && C(`invalid <transition> mode: ${a}`), o.isLeaving)
        return ts(i);
      const d = rr(i);
      if (!d)
        return ts(i);
      const p = ms(d, l, o, n);
      vs(d, p);
      const f = n.subTree, g = f && rr(f);
      let D = !1;
      const { getTransitionKey: A } = d.type;
      if (A) {
        const V = A();
        s === void 0 ? s = V : V !== s && (s = V, D = !0);
      }
      if (g && g.type !== Fe && (!Wt(d, g) || D)) {
        const V = ms(g, l, o, n);
        if (vs(g, V), a === "out-in")
          return o.isLeaving = !0, V.afterLeave = () => {
            o.isLeaving = !1, n.update.active !== !1 && n.update();
          }, ts(i);
        a === "in-out" && d.type !== Fe && (V.delayLeave = (Y, H, Z) => {
          const R = Vi(o, g);
          R[String(g.key)] = g, Y._leaveCb = () => {
            H(), Y._leaveCb = void 0, delete p.delayedLeave;
          }, p.delayedLeave = Z;
        });
      }
      return i;
    };
  }
}, $i = Ua;
function Vi(e, t) {
  const { leavingVNodes: n } = e;
  let o = n.get(t.type);
  return o || (o = /* @__PURE__ */ Object.create(null), n.set(t.type, o)), o;
}
function ms(e, t, n, o) {
  const { appear: s, mode: r, persisted: i = !1, onBeforeEnter: l, onEnter: a, onAfterEnter: d, onEnterCancelled: p, onBeforeLeave: f, onLeave: g, onAfterLeave: D, onLeaveCancelled: A, onBeforeAppear: V, onAppear: Y, onAfterAppear: H, onAppearCancelled: Z } = t, R = String(e.key), B = Vi(n, e), Q = (U, ee) => {
    U && Ze(U, o, 9, ee);
  }, Ce = (U, ee) => {
    const oe = ee[1];
    Q(U, ee), P(U) ? U.every((ue) => ue.length <= 1) && oe() : U.length <= 1 && oe();
  }, ne = {
    mode: r,
    persisted: i,
    beforeEnter(U) {
      let ee = l;
      if (!n.isMounted)
        if (s)
          ee = V || l;
        else
          return;
      U._leaveCb && U._leaveCb(
        !0
        /* cancelled */
      );
      const oe = B[R];
      oe && Wt(e, oe) && oe.el._leaveCb && oe.el._leaveCb(), Q(ee, [U]);
    },
    enter(U) {
      let ee = a, oe = d, ue = p;
      if (!n.isMounted)
        if (s)
          ee = Y || a, oe = H || d, ue = Z || p;
        else
          return;
      let _ = !1;
      const L = U._enterCb = (fe) => {
        _ || (_ = !0, fe ? Q(ue, [U]) : Q(oe, [U]), ne.delayedLeave && ne.delayedLeave(), U._enterCb = void 0);
      };
      ee ? Ce(ee, [U, L]) : L();
    },
    leave(U, ee) {
      const oe = String(e.key);
      if (U._enterCb && U._enterCb(
        !0
        /* cancelled */
      ), n.isUnmounting)
        return ee();
      Q(f, [U]);
      let ue = !1;
      const _ = U._leaveCb = (L) => {
        ue || (ue = !0, ee(), L ? Q(A, [U]) : Q(D, [U]), U._leaveCb = void 0, B[oe] === e && delete B[oe]);
      };
      B[oe] = e, g ? Ce(g, [U, _]) : _();
    },
    clone(U) {
      return ms(U, t, n, o);
    }
  };
  return ne;
}
function ts(e) {
  if (Zn(e))
    return e = ft(e), e.children = null, e;
}
function rr(e) {
  return Zn(e) ? e.children ? e.children[0] : void 0 : e;
}
function vs(e, t) {
  e.shapeFlag & 6 && e.component ? vs(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Si(e, t = !1, n) {
  let o = [], s = 0;
  for (let r = 0; r < e.length; r++) {
    let i = e[r];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : r);
    i.type === Se ? (i.patchFlag & 128 && s++, o = o.concat(Si(i.children, t, l))) : (t || i.type !== Fe) && o.push(l != null ? ft(i, { key: l }) : i);
  }
  if (s > 1)
    for (let r = 0; r < o.length; r++)
      o[r].patchFlag = -2;
  return o;
}
function We(e) {
  return z(e) ? { setup: e, name: e.name } : e;
}
const Ln = (e) => !!e.type.__asyncLoader, Zn = (e) => e.type.__isKeepAlive;
function Wa(e, t) {
  Ti(e, "a", t);
}
function qa(e, t) {
  Ti(e, "da", t);
}
function Ti(e, t, n = Ne) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Wo(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      Zn(s.parent.vnode) && za(o, t, n, s), s = s.parent;
  }
}
function za(e, t, n, o) {
  const s = Wo(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  Ii(() => {
    $s(o[t], s);
  }, n);
}
function Wo(e, t, n = Ne, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      ln(), wn(n);
      const l = Ze(t, n, e, i);
      return nn(), an(), l;
    });
    return o ? s.unshift(r) : s.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const s = Ot(xs[e].replace(/ hook$/, ""));
    C(`${s} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const Et = (e) => (t, n = Ne) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!zn || e === "sp") && Wo(e, (...o) => t(...o), n)
), Ya = Et(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
), Gn = Et(
  "m"
  /* LifecycleHooks.MOUNTED */
), Ja = Et(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
), Xa = Et(
  "u"
  /* LifecycleHooks.UPDATED */
), Ai = Et(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
), Ii = Et(
  "um"
  /* LifecycleHooks.UNMOUNTED */
), Za = Et(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
), Ga = Et(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
), Qa = Et(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function ec(e, t = Ne) {
  Wo("ec", e, t);
}
function Fi(e) {
  kl(e) && C("Do not use built-in directive ids as custom directive id: " + e);
}
function at(e, t) {
  const n = Ae;
  if (n === null)
    return process.env.NODE_ENV !== "production" && C("withDirectives can only be used inside render functions."), e;
  const o = zo(n) || n.proxy, s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, l, a, d = pe] = t[r];
    i && (z(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Jt(l), s.push({
      dir: i,
      instance: o,
      value: l,
      oldValue: void 0,
      arg: a,
      modifiers: d
    }));
  }
  return e;
}
function Rt(e, t, n, o) {
  const s = e.dirs, r = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    r && (l.oldValue = r[i].value);
    let a = l.dir[o];
    a && (ln(), Ze(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), an());
  }
}
const Oo = "components";
function Ge(e, t) {
  return Li(Oo, e, !0, t) || e;
}
const xi = Symbol();
function Mi(e) {
  return ve(e) ? Li(Oo, e, !1) || e : e || xi;
}
function Li(e, t, n = !0, o = !1) {
  const s = Ae || Ne;
  if (s) {
    const r = s.type;
    if (e === Oo) {
      const l = Hs(
        r,
        !1
        /* do not include inferred name to avoid breaking existing code */
      );
      if (l && (l === t || l === dt(t) || l === sn(dt(t))))
        return r;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      ir(s[e] || r[e], t) || // global registration
      ir(s.appContext[e], t)
    );
    if (!i && o)
      return r;
    if (process.env.NODE_ENV !== "production" && n && !i) {
      const l = e === Oo ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      C(`Failed to resolve ${e.slice(0, -1)}: ${t}${l}`);
    }
    return i;
  } else
    process.env.NODE_ENV !== "production" && C(`resolve${sn(e.slice(0, -1))} can only be used in render() or setup().`);
}
function ir(e, t) {
  return e && (e[t] || e[dt(t)] || e[sn(dt(t))]);
}
function En(e, t, n, o) {
  let s;
  const r = n && n[o];
  if (P(e) || ve(e)) {
    s = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      s[i] = t(e[i], i, void 0, r && r[i]);
  } else if (typeof e == "number") {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && C(`The v-for range expect an integer value but got ${e}.`), s = new Array(e);
    for (let i = 0; i < e; i++)
      s[i] = t(i + 1, i, void 0, r && r[i]);
  } else if (ae(e))
    if (e[Symbol.iterator])
      s = Array.from(e, (i, l) => t(i, l, void 0, r && r[l]));
    else {
      const i = Object.keys(e);
      s = new Array(i.length);
      for (let l = 0, a = i.length; l < a; l++) {
        const d = i[l];
        s[l] = t(e[d], d, l, r && r[l]);
      }
    }
  else
    s = [];
  return n && (n[o] = s), s;
}
function Ki(e, t) {
  for (let n = 0; n < t.length; n++) {
    const o = t[n];
    if (P(o))
      for (let s = 0; s < o.length; s++)
        e[o[s].name] = o[s].fn;
    else
      o && (e[o.name] = o.key ? (...s) => {
        const r = o.fn(...s);
        return r && (r.key = o.key), r;
      } : o.fn);
  }
  return e;
}
function ct(e, t, n = {}, o, s) {
  if (Ae.isCE || Ae.parent && Ln(Ae.parent) && Ae.parent.isCE)
    return t !== "default" && (n.name = t), he("slot", n, o && o());
  let r = e[t];
  process.env.NODE_ENV !== "production" && r && r.length > 1 && (C("SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."), r = () => []), r && r._c && (r._d = !1), ie();
  const i = r && Pi(r(n)), l = ut(
    Se,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`
    },
    i || (o ? o() : []),
    i && e._ === 1 ? 64 : -2
    /* PatchFlags.BAIL */
  );
  return !s && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), r && r._c && (r._d = !0), l;
}
function Pi(e) {
  return e.some((t) => Cn(t) ? !(t.type === Fe || t.type === Se && !Pi(t.children)) : !0) ? e : null;
}
function _s(e, t) {
  const n = {};
  if (process.env.NODE_ENV !== "production" && !ae(e))
    return C("v-on with no argument expects an object value."), n;
  for (const o in e)
    n[t && /[A-Z]/.test(o) ? `on:${o}` : Ot(o)] = e[o];
  return n;
}
const bs = (e) => e ? Qi(e) ? zo(e) || e.proxy : bs(e.parent) : null, tn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Ee(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? _n(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? _n(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? _n(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? _n(e.refs) : e.refs,
    $parent: (e) => bs(e.parent),
    $root: (e) => bs(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Rs(e),
    $forceUpdate: (e) => e.f || (e.f = () => Bo(e.update)),
    $nextTick: (e) => e.n || (e.n = pi.bind(e.proxy)),
    $watch: (e) => Ba.bind(e)
  })
), Ps = (e) => e === "_" || e === "$", ns = (e, t) => e !== pe && !e.__isScriptSetup && te(e, t), Ri = {
  get({ _: e }, t) {
    const { ctx: n, setupState: o, data: s, props: r, accessCache: i, type: l, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let d;
    if (t[0] !== "$") {
      const D = i[t];
      if (D !== void 0)
        switch (D) {
          case 1:
            return o[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (ns(o, t))
          return i[t] = 1, o[t];
        if (s !== pe && te(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && te(d, t)
        )
          return i[t] = 3, r[t];
        if (n !== pe && te(n, t))
          return i[t] = 4, n[t];
        ys && (i[t] = 0);
      }
    }
    const p = tn[t];
    let f, g;
    if (p)
      return t === "$attrs" && (je(e, "get", t), process.env.NODE_ENV !== "production" && Do()), p(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== pe && te(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      g = a.config.globalProperties, te(g, t)
    )
      return g[t];
    process.env.NODE_ENV !== "production" && Ae && (!ve(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== pe && Ps(t[0]) && te(s, t) ? C(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === Ae && C(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: r } = e;
    return ns(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && te(s, t) ? (C(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== pe && te(o, t) ? (o[t] = n, !0) : te(e.props, t) ? (process.env.NODE_ENV !== "production" && C(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && C(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(r, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : r[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: s, propsOptions: r } }, i) {
    let l;
    return !!n[i] || e !== pe && te(e, i) || ns(t, i) || (l = r[0]) && te(l, i) || te(o, i) || te(tn, i) || te(s.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : te(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Ri.ownKeys = (e) => (C("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function tc(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(tn).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => tn[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: Me
    });
  }), t;
}
function nc(e) {
  const { ctx: t, propsOptions: [n] } = e;
  n && Object.keys(n).forEach((o) => {
    Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[o],
      set: Me
    });
  });
}
function oc(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(J(n)).forEach((o) => {
    if (!n.__isScriptSetup) {
      if (Ps(o[0])) {
        C(`setup() return property ${JSON.stringify(o)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(t, o, {
        enumerable: !0,
        configurable: !0,
        get: () => n[o],
        set: Me
      });
    }
  });
}
function sc() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? C(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let ys = !0;
function rc(e) {
  const t = Rs(e), n = e.proxy, o = e.ctx;
  ys = !1, t.beforeCreate && lr(
    t.beforeCreate,
    e,
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  );
  const {
    // state
    data: s,
    computed: r,
    methods: i,
    watch: l,
    provide: a,
    inject: d,
    // lifecycle
    created: p,
    beforeMount: f,
    mounted: g,
    beforeUpdate: D,
    updated: A,
    activated: V,
    deactivated: Y,
    beforeDestroy: H,
    beforeUnmount: Z,
    destroyed: R,
    unmounted: B,
    render: Q,
    renderTracked: Ce,
    renderTriggered: ne,
    errorCaptured: U,
    serverPrefetch: ee,
    // public API
    expose: oe,
    inheritAttrs: ue,
    // assets
    components: _,
    directives: L,
    filters: fe
  } = t, we = process.env.NODE_ENV !== "production" ? sc() : null;
  if (process.env.NODE_ENV !== "production") {
    const [N] = e.propsOptions;
    if (N)
      for (const M in N)
        we("Props", M);
  }
  if (d && ic(d, o, we, e.appContext.config.unwrapInjectedRef), i)
    for (const N in i) {
      const M = i[N];
      z(M) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(o, N, {
        value: M.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : o[N] = M.bind(n), process.env.NODE_ENV !== "production" && we("Methods", N)) : process.env.NODE_ENV !== "production" && C(`Method "${N}" has type "${typeof M}" in the component definition. Did you reference the function correctly?`);
    }
  if (s) {
    process.env.NODE_ENV !== "production" && !z(s) && C("The data option must be a function. Plain object usage is no longer supported.");
    const N = s.call(n, n);
    if (process.env.NODE_ENV !== "production" && Vs(N) && C("data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."), !ae(N))
      process.env.NODE_ENV !== "production" && C("data() should return an object.");
    else if (e.data = Nt(N), process.env.NODE_ENV !== "production")
      for (const M in N)
        we("Data", M), Ps(M[0]) || Object.defineProperty(o, M, {
          configurable: !0,
          enumerable: !0,
          get: () => N[M],
          set: Me
        });
  }
  if (ys = !0, r)
    for (const N in r) {
      const M = r[N], ce = z(M) ? M.bind(n, n) : z(M.get) ? M.get.bind(n, n) : Me;
      process.env.NODE_ENV !== "production" && ce === Me && C(`Computed property "${N}" has no getter.`);
      const me = !z(M) && z(M.set) ? M.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        C(`Write operation failed: computed property "${N}" is readonly.`);
      } : Me, T = W({
        get: ce,
        set: me
      });
      Object.defineProperty(o, N, {
        enumerable: !0,
        configurable: !0,
        get: () => T.value,
        set: (F) => T.value = F
      }), process.env.NODE_ENV !== "production" && we("Computed", N);
    }
  if (l)
    for (const N in l)
      ji(l[N], o, n, N);
  if (a) {
    const N = z(a) ? a.call(n) : a;
    Reflect.ownKeys(N).forEach((M) => {
      ja(M, N[M]);
    });
  }
  p && lr(
    p,
    e,
    "c"
    /* LifecycleHooks.CREATED */
  );
  function ge(N, M) {
    P(M) ? M.forEach((ce) => N(ce.bind(n))) : M && N(M.bind(n));
  }
  if (ge(Ya, f), ge(Gn, g), ge(Ja, D), ge(Xa, A), ge(Wa, V), ge(qa, Y), ge(ec, U), ge(Qa, Ce), ge(Ga, ne), ge(Ai, Z), ge(Ii, B), ge(Za, ee), P(oe))
    if (oe.length) {
      const N = e.exposed || (e.exposed = {});
      oe.forEach((M) => {
        Object.defineProperty(N, M, {
          get: () => n[M],
          set: (ce) => n[M] = ce
        });
      });
    } else
      e.exposed || (e.exposed = {});
  Q && e.render === Me && (e.render = Q), ue != null && (e.inheritAttrs = ue), _ && (e.components = _), L && (e.directives = L);
}
function ic(e, t, n = Me, o = !1) {
  P(e) && (e = Ns(e));
  for (const s in e) {
    const r = e[s];
    let i;
    ae(r) ? "default" in r ? i = mo(
      r.from || s,
      r.default,
      !0
      /* treat default function as factory */
    ) : i = mo(r.from || s) : i = mo(r), Te(i) ? o ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : (process.env.NODE_ENV !== "production" && C(`injected property "${s}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`), t[s] = i) : t[s] = i, process.env.NODE_ENV !== "production" && n("Inject", s);
  }
}
function lr(e, t, n) {
  Ze(P(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function ji(e, t, n, o) {
  const s = o.includes(".") ? Oi(n, o) : () => n[o];
  if (ve(e)) {
    const r = t[e];
    z(r) ? At(s, r) : process.env.NODE_ENV !== "production" && C(`Invalid watch handler specified by key "${e}"`, r);
  } else if (z(e))
    At(s, e.bind(n));
  else if (ae(e))
    if (P(e))
      e.forEach((r) => ji(r, t, n, o));
    else {
      const r = z(e.handler) ? e.handler.bind(n) : t[e.handler];
      z(r) ? At(s, r, e) : process.env.NODE_ENV !== "production" && C(`Invalid watch handler specified by key "${e.handler}"`, r);
    }
  else
    process.env.NODE_ENV !== "production" && C(`Invalid watch option: "${o}"`, e);
}
function Rs(e) {
  const t = e.type, { mixins: n, extends: o } = t, { mixins: s, optionsCache: r, config: { optionMergeStrategies: i } } = e.appContext, l = r.get(t);
  let a;
  return l ? a = l : !s.length && !n && !o ? a = t : (a = {}, s.length && s.forEach((d) => $o(a, d, i, !0)), $o(a, t, i)), ae(t) && r.set(t, a), a;
}
function $o(e, t, n, o = !1) {
  const { mixins: s, extends: r } = t;
  r && $o(e, r, n, !0), s && s.forEach((i) => $o(e, i, n, !0));
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && C('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const l = lc[i] || n && n[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const lc = {
  data: ar,
  props: Ut,
  emits: Ut,
  // objects
  methods: Ut,
  computed: Ut,
  // lifecycle
  beforeCreate: Pe,
  created: Pe,
  beforeMount: Pe,
  mounted: Pe,
  beforeUpdate: Pe,
  updated: Pe,
  beforeDestroy: Pe,
  beforeUnmount: Pe,
  destroyed: Pe,
  unmounted: Pe,
  activated: Pe,
  deactivated: Pe,
  errorCaptured: Pe,
  serverPrefetch: Pe,
  // assets
  components: Ut,
  directives: Ut,
  // watch
  watch: cc,
  // provide / inject
  provide: ar,
  inject: ac
};
function ar(e, t) {
  return t ? e ? function() {
    return Ee(z(e) ? e.call(this, this) : e, z(t) ? t.call(this, this) : t);
  } : t : e;
}
function ac(e, t) {
  return Ut(Ns(e), Ns(t));
}
function Ns(e) {
  if (P(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Pe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ut(e, t) {
  return e ? Ee(Ee(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function cc(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Ee(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = Pe(e[o], t[o]);
  return n;
}
function dc(e, t, n, o = !1) {
  const s = {}, r = {};
  Eo(r, qo, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Bi(e, t, s, r);
  for (const i in e.propsOptions[0])
    i in s || (s[i] = void 0);
  process.env.NODE_ENV !== "production" && Ui(t || {}, s, e), n ? e.props = o ? s : sa(s) : e.type.props ? e.props = s : e.props = r, e.attrs = r;
}
function uc(e) {
  for (; e; ) {
    if (e.type.__hmrId)
      return !0;
    e = e.parent;
  }
}
function fc(e, t, n, o) {
  const { props: s, attrs: r, vnode: { patchFlag: i } } = e, l = J(s), [a] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && uc(e)) && (o || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const p = e.vnode.dynamicProps;
      for (let f = 0; f < p.length; f++) {
        let g = p[f];
        if (Ho(e.emitsOptions, g))
          continue;
        const D = t[g];
        if (a)
          if (te(r, g))
            D !== r[g] && (r[g] = D, d = !0);
          else {
            const A = dt(g);
            s[A] = Es(
              a,
              l,
              A,
              D,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          D !== r[g] && (r[g] = D, d = !0);
      }
    }
  } else {
    Bi(e, t, s, r) && (d = !0);
    let p;
    for (const f in l)
      (!t || // for camelCase
      !te(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((p = Ft(f)) === f || !te(t, p))) && (a ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[p] !== void 0) && (s[f] = Es(
        a,
        l,
        f,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete s[f]);
    if (r !== l)
      for (const f in r)
        (!t || !te(t, f)) && (delete r[f], d = !0);
  }
  d && yt(e, "set", "$attrs"), process.env.NODE_ENV !== "production" && Ui(t || {}, s, e);
}
function Bi(e, t, n, o) {
  const [s, r] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let a in t) {
      if (po(a))
        continue;
      const d = t[a];
      let p;
      s && te(s, p = dt(a)) ? !r || !r.includes(p) ? n[p] = d : (l || (l = {}))[p] = d : Ho(e.emitsOptions, a) || (!(a in o) || d !== o[a]) && (o[a] = d, i = !0);
    }
  if (r) {
    const a = J(n), d = l || pe;
    for (let p = 0; p < r.length; p++) {
      const f = r[p];
      n[f] = Es(s, a, f, d[f], e, !te(d, f));
    }
  }
  return i;
}
function Es(e, t, n, o, s, r) {
  const i = e[n];
  if (i != null) {
    const l = te(i, "default");
    if (l && o === void 0) {
      const a = i.default;
      if (i.type !== Function && z(a)) {
        const { propsDefaults: d } = s;
        n in d ? o = d[n] : (wn(s), o = d[n] = a.call(null, t), nn());
      } else
        o = a;
    }
    i[
      0
      /* BooleanFlags.shouldCast */
    ] && (r && !l ? o = !1 : i[
      1
      /* BooleanFlags.shouldCastTrue */
    ] && (o === "" || o === Ft(n)) && (o = !0));
  }
  return o;
}
function Hi(e, t, n = !1) {
  const o = t.propsCache, s = o.get(e);
  if (s)
    return s;
  const r = e.props, i = {}, l = [];
  let a = !1;
  if (!z(e)) {
    const p = (f) => {
      a = !0;
      const [g, D] = Hi(f, t, !0);
      Ee(i, g), D && l.push(...D);
    };
    !n && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p);
  }
  if (!r && !a)
    return ae(e) && o.set(e, yn), yn;
  if (P(r))
    for (let p = 0; p < r.length; p++) {
      process.env.NODE_ENV !== "production" && !ve(r[p]) && C("props must be strings when using array syntax.", r[p]);
      const f = dt(r[p]);
      cr(f) && (i[f] = pe);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !ae(r) && C("invalid props options", r);
    for (const p in r) {
      const f = dt(p);
      if (cr(f)) {
        const g = r[p], D = i[f] = P(g) || z(g) ? { type: g } : Object.assign({}, g);
        if (D) {
          const A = ur(Boolean, D.type), V = ur(String, D.type);
          D[
            0
            /* BooleanFlags.shouldCast */
          ] = A > -1, D[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = V < 0 || A < V, (A > -1 || te(D, "default")) && l.push(f);
        }
      }
    }
  }
  const d = [i, l];
  return ae(e) && o.set(e, d), d;
}
function cr(e) {
  return e[0] !== "$" ? !0 : (process.env.NODE_ENV !== "production" && C(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function Cs(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function dr(e, t) {
  return Cs(e) === Cs(t);
}
function ur(e, t) {
  return P(t) ? t.findIndex((n) => dr(n, e)) : z(t) && dr(t, e) ? 0 : -1;
}
function Ui(e, t, n) {
  const o = J(t), s = n.propsOptions[0];
  for (const r in s) {
    let i = s[r];
    i != null && pc(r, o[r], i, !te(e, r) && !te(e, Ft(r)));
  }
}
function pc(e, t, n, o) {
  const { type: s, required: r, validator: i } = n;
  if (r && o) {
    C('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !n.required)) {
    if (s != null && s !== !0) {
      let l = !1;
      const a = P(s) ? s : [s], d = [];
      for (let p = 0; p < a.length && !l; p++) {
        const { valid: f, expectedType: g } = gc(t, a[p]);
        d.push(g || ""), l = f;
      }
      if (!l) {
        C(mc(e, t, d));
        return;
      }
    }
    i && !i(t) && C('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const hc = /* @__PURE__ */ Kt("String,Number,Boolean,Function,Symbol,BigInt");
function gc(e, t) {
  let n;
  const o = Cs(t);
  if (hc(o)) {
    const s = typeof e;
    n = s === o.toLowerCase(), !n && s === "object" && (n = e instanceof t);
  } else
    o === "Object" ? n = ae(e) : o === "Array" ? n = P(e) : o === "null" ? n = e === null : n = e instanceof t;
  return {
    valid: n,
    expectedType: o
  };
}
function mc(e, t, n) {
  let o = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(sn).join(" | ")}`;
  const s = n[0], r = Ss(t), i = fr(t, s), l = fr(t, r);
  return n.length === 1 && pr(s) && !vc(s, r) && (o += ` with value ${i}`), o += `, got ${r} `, pr(r) && (o += `with value ${l}.`), o;
}
function fr(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function pr(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function vc(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Wi = (e) => e[0] === "_" || e === "$stable", js = (e) => P(e) ? e.map(et) : [et(e)], _c = (e, t, n) => {
  if (t._n)
    return t;
  const o = Lt((...s) => (process.env.NODE_ENV !== "production" && Ne && C(`Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`), js(t(...s))), n);
  return o._c = !1, o;
}, qi = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (Wi(s))
      continue;
    const r = e[s];
    if (z(r))
      t[s] = _c(s, r, o);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && C(`Non-function value encountered for slot "${s}". Prefer function slots for better performance.`);
      const i = js(r);
      t[s] = () => i;
    }
  }
}, zi = (e, t) => {
  process.env.NODE_ENV !== "production" && !Zn(e.vnode) && C("Non-function value encountered for default slot. Prefer function slots for better performance.");
  const n = js(t);
  e.slots.default = () => n;
}, bc = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = J(t), Eo(t, "_", n)) : qi(t, e.slots = {});
  } else
    e.slots = {}, t && zi(e, t);
  Eo(e.slots, qo, 1);
}, yc = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let r = !0, i = pe;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? process.env.NODE_ENV !== "production" && en ? Ee(s, t) : n && l === 1 ? r = !1 : (Ee(s, t), !n && l === 1 && delete s._) : (r = !t.$stable, qi(t, s)), i = t;
  } else
    t && (zi(e, t), i = { default: 1 });
  if (r)
    for (const l in s)
      !Wi(l) && !(l in i) && delete s[l];
};
function Yi() {
  return {
    app: null,
    config: {
      isNativeTag: Hr,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Nc = 0;
function Ec(e, t) {
  return function(o, s = null) {
    z(o) || (o = Object.assign({}, o)), s != null && !ae(s) && (process.env.NODE_ENV !== "production" && C("root props passed to app.mount() must be an object."), s = null);
    const r = Yi(), i = /* @__PURE__ */ new Set();
    let l = !1;
    const a = r.app = {
      _uid: Nc++,
      _component: o,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: vr,
      get config() {
        return r.config;
      },
      set config(d) {
        process.env.NODE_ENV !== "production" && C("app.config cannot be replaced. Modify individual options instead.");
      },
      use(d, ...p) {
        return i.has(d) ? process.env.NODE_ENV !== "production" && C("Plugin has already been applied to target app.") : d && z(d.install) ? (i.add(d), d.install(a, ...p)) : z(d) ? (i.add(d), d(a, ...p)) : process.env.NODE_ENV !== "production" && C('A plugin must either be a function or an object with an "install" function.'), a;
      },
      mixin(d) {
        return r.mixins.includes(d) ? process.env.NODE_ENV !== "production" && C("Mixin has already been applied to target app" + (d.name ? `: ${d.name}` : "")) : r.mixins.push(d), a;
      },
      component(d, p) {
        return process.env.NODE_ENV !== "production" && ws(d, r.config), p ? (process.env.NODE_ENV !== "production" && r.components[d] && C(`Component "${d}" has already been registered in target app.`), r.components[d] = p, a) : r.components[d];
      },
      directive(d, p) {
        return process.env.NODE_ENV !== "production" && Fi(d), p ? (process.env.NODE_ENV !== "production" && r.directives[d] && C(`Directive "${d}" has already been registered in target app.`), r.directives[d] = p, a) : r.directives[d];
      },
      mount(d, p, f) {
        if (l)
          process.env.NODE_ENV !== "production" && C("App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`");
        else {
          process.env.NODE_ENV !== "production" && d.__vue_app__ && C("There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first.");
          const g = he(o, s);
          return g.appContext = r, process.env.NODE_ENV !== "production" && (r.reload = () => {
            e(ft(g), d, f);
          }), p && t ? t(g, d) : e(g, d, f), l = !0, a._container = d, d.__vue_app__ = a, process.env.NODE_ENV !== "production" && (a._instance = g.component, wa(a, vr)), zo(g.component) || g.component.proxy;
        }
      },
      unmount() {
        l ? (e(null, a._container), process.env.NODE_ENV !== "production" && (a._instance = null, Da(a)), delete a._container.__vue_app__) : process.env.NODE_ENV !== "production" && C("Cannot unmount an app that is not mounted.");
      },
      provide(d, p) {
        return process.env.NODE_ENV !== "production" && d in r.provides && C(`App already provides property with key "${String(d)}". It will be overwritten with the new value.`), r.provides[d] = p, a;
      }
    };
    return a;
  };
}
function ks(e, t, n, o, s = !1) {
  if (P(e)) {
    e.forEach((g, D) => ks(g, t && (P(t) ? t[D] : t), n, o, s));
    return;
  }
  if (Ln(o) && !s)
    return;
  const r = o.shapeFlag & 4 ? zo(o.component) || o.component.proxy : o.el, i = s ? null : r, { i: l, r: a } = e;
  if (process.env.NODE_ENV !== "production" && !l) {
    C("Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.");
    return;
  }
  const d = t && t.r, p = l.refs === pe ? l.refs = {} : l.refs, f = l.setupState;
  if (d != null && d !== a && (ve(d) ? (p[d] = null, te(f, d) && (f[d] = null)) : Te(d) && (d.value = null)), z(a))
    _t(a, l, 12, [i, p]);
  else {
    const g = ve(a), D = Te(a);
    if (g || D) {
      const A = () => {
        if (e.f) {
          const V = g ? te(f, a) ? f[a] : p[a] : a.value;
          s ? P(V) && $s(V, r) : P(V) ? V.includes(r) || V.push(r) : g ? (p[a] = [r], te(f, a) && (f[a] = p[a])) : (a.value = [r], e.k && (p[e.k] = a.value));
        } else
          g ? (p[a] = i, te(f, a) && (f[a] = i)) : D ? (a.value = i, e.k && (p[e.k] = i)) : process.env.NODE_ENV !== "production" && C("Invalid template ref type:", a, `(${typeof a})`);
      };
      i ? (A.id = -1, Ue(A, n)) : A();
    } else
      process.env.NODE_ENV !== "production" && C("Invalid template ref type:", a, `(${typeof a})`);
  }
}
let Vn, St;
function mt(e, t) {
  e.appContext.config.performance && Vo() && St.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && Sa(e, t, Vo() ? St.now() : Date.now());
}
function vt(e, t) {
  if (e.appContext.config.performance && Vo()) {
    const n = `vue-${t}-${e.uid}`, o = n + ":end";
    St.mark(o), St.measure(`<${Yo(e, e.type)}> ${t}`, n, o), St.clearMarks(n), St.clearMarks(o);
  }
  process.env.NODE_ENV !== "production" && Ta(e, t, Vo() ? St.now() : Date.now());
}
function Vo() {
  return Vn !== void 0 || (typeof window < "u" && window.performance ? (Vn = !0, St = window.performance) : Vn = !1), Vn;
}
function Cc() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(`Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
  }
}
const Ue = Ra;
function kc(e) {
  return wc(e);
}
function wc(e, t) {
  Cc();
  const n = qr();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && bi(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const { insert: o, remove: s, patchProp: r, createElement: i, createText: l, createComment: a, setText: d, setElementText: p, parentNode: f, nextSibling: g, setScopeId: D = Me, insertStaticContent: A } = e, V = (c, u, m, b = null, v = null, w = null, $ = !1, k = null, O = process.env.NODE_ENV !== "production" && en ? !1 : !!u.dynamicChildren) => {
    if (c === u)
      return;
    c && !Wt(c, u) && (b = Pt(c), se(c, v, w, !0), c = null), u.patchFlag === -2 && (O = !1, u.dynamicChildren = null);
    const { type: E, ref: x, shapeFlag: I } = u;
    switch (E) {
      case Qn:
        Y(c, u, m, b);
        break;
      case Fe:
        H(c, u, m, b);
        break;
      case _o:
        c == null ? Z(u, m, b, $) : process.env.NODE_ENV !== "production" && R(c, u, m, $);
        break;
      case Se:
        L(c, u, m, b, v, w, $, k, O);
        break;
      default:
        I & 1 ? Ce(c, u, m, b, v, w, $, k, O) : I & 6 ? fe(c, u, m, b, v, w, $, k, O) : I & 64 || I & 128 ? E.process(c, u, m, b, v, w, $, k, O, ht) : process.env.NODE_ENV !== "production" && C("Invalid VNode type:", E, `(${typeof E})`);
    }
    x != null && v && ks(x, c && c.ref, w, u || c, !u);
  }, Y = (c, u, m, b) => {
    if (c == null)
      o(u.el = l(u.children), m, b);
    else {
      const v = u.el = c.el;
      u.children !== c.children && d(v, u.children);
    }
  }, H = (c, u, m, b) => {
    c == null ? o(u.el = a(u.children || ""), m, b) : u.el = c.el;
  }, Z = (c, u, m, b) => {
    [c.el, c.anchor] = A(c.children, u, m, b, c.el, c.anchor);
  }, R = (c, u, m, b) => {
    if (u.children !== c.children) {
      const v = g(c.anchor);
      Q(c), [u.el, u.anchor] = A(u.children, m, v, b);
    } else
      u.el = c.el, u.anchor = c.anchor;
  }, B = ({ el: c, anchor: u }, m, b) => {
    let v;
    for (; c && c !== u; )
      v = g(c), o(c, m, b), c = v;
    o(u, m, b);
  }, Q = ({ el: c, anchor: u }) => {
    let m;
    for (; c && c !== u; )
      m = g(c), s(c), c = m;
    s(u);
  }, Ce = (c, u, m, b, v, w, $, k, O) => {
    $ = $ || u.type === "svg", c == null ? ne(u, m, b, v, w, $, k, O) : oe(c, u, v, w, $, k, O);
  }, ne = (c, u, m, b, v, w, $, k) => {
    let O, E;
    const { type: x, props: I, shapeFlag: K, transition: q, dirs: X } = c;
    if (O = c.el = i(c.type, w, I && I.is, I), K & 8 ? p(O, c.children) : K & 16 && ee(c.children, O, null, b, v, w && x !== "foreignObject", $, k), X && Rt(c, null, b, "created"), U(O, c, c.scopeId, $, b), I) {
      for (const le in I)
        le !== "value" && !po(le) && r(O, le, null, I[le], w, c.children, b, v, Ye);
      "value" in I && r(O, "value", null, I.value), (E = I.onVnodeBeforeMount) && nt(E, b, c);
    }
    process.env.NODE_ENV !== "production" && (Object.defineProperty(O, "__vnode", {
      value: c,
      enumerable: !1
    }), Object.defineProperty(O, "__vueParentComponent", {
      value: b,
      enumerable: !1
    })), X && Rt(c, null, b, "beforeMount");
    const de = (!v || v && !v.pendingBranch) && q && !q.persisted;
    de && q.beforeEnter(O), o(O, u, m), ((E = I && I.onVnodeMounted) || de || X) && Ue(() => {
      E && nt(E, b, c), de && q.enter(O), X && Rt(c, null, b, "mounted");
    }, v);
  }, U = (c, u, m, b, v) => {
    if (m && D(c, m), b)
      for (let w = 0; w < b.length; w++)
        D(c, b[w]);
    if (v) {
      let w = v.subTree;
      if (process.env.NODE_ENV !== "production" && w.patchFlag > 0 && w.patchFlag & 2048 && (w = wi(w.children) || w), u === w) {
        const $ = v.vnode;
        U(c, $, $.scopeId, $.slotScopeIds, v.parent);
      }
    }
  }, ee = (c, u, m, b, v, w, $, k, O = 0) => {
    for (let E = O; E < c.length; E++) {
      const x = c[E] = k ? Vt(c[E]) : et(c[E]);
      V(null, x, u, m, b, v, w, $, k);
    }
  }, oe = (c, u, m, b, v, w, $) => {
    const k = u.el = c.el;
    let { patchFlag: O, dynamicChildren: E, dirs: x } = u;
    O |= c.patchFlag & 16;
    const I = c.props || pe, K = u.props || pe;
    let q;
    m && jt(m, !1), (q = K.onVnodeBeforeUpdate) && nt(q, m, u, c), x && Rt(u, c, m, "beforeUpdate"), m && jt(m, !0), process.env.NODE_ENV !== "production" && en && (O = 0, $ = !1, E = null);
    const X = v && u.type !== "foreignObject";
    if (E ? (ue(c.dynamicChildren, E, k, m, b, X, w), process.env.NODE_ENV !== "production" && m && m.type.__hmrId && vo(c, u)) : $ || ce(c, u, k, null, m, b, X, w, !1), O > 0) {
      if (O & 16)
        _(k, u, I, K, m, b, v);
      else if (O & 2 && I.class !== K.class && r(k, "class", null, K.class, v), O & 4 && r(k, "style", I.style, K.style, v), O & 8) {
        const de = u.dynamicProps;
        for (let le = 0; le < de.length; le++) {
          const _e = de[le], Be = I[_e], gt = K[_e];
          (gt !== Be || _e === "value") && r(k, _e, Be, gt, v, c.children, m, b, Ye);
        }
      }
      O & 1 && c.children !== u.children && p(k, u.children);
    } else
      !$ && E == null && _(k, u, I, K, m, b, v);
    ((q = K.onVnodeUpdated) || x) && Ue(() => {
      q && nt(q, m, u, c), x && Rt(u, c, m, "updated");
    }, b);
  }, ue = (c, u, m, b, v, w, $) => {
    for (let k = 0; k < u.length; k++) {
      const O = c[k], E = u[k], x = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        O.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (O.type === Se || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Wt(O, E) || // - In the case of a component, it could contain anything.
        O.shapeFlag & 70) ? f(O.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      V(O, E, x, null, b, v, w, $, !0);
    }
  }, _ = (c, u, m, b, v, w, $) => {
    if (m !== b) {
      if (m !== pe)
        for (const k in m)
          !po(k) && !(k in b) && r(c, k, m[k], null, $, u.children, v, w, Ye);
      for (const k in b) {
        if (po(k))
          continue;
        const O = b[k], E = m[k];
        O !== E && k !== "value" && r(c, k, E, O, $, u.children, v, w, Ye);
      }
      "value" in b && r(c, "value", m.value, b.value);
    }
  }, L = (c, u, m, b, v, w, $, k, O) => {
    const E = u.el = c ? c.el : l(""), x = u.anchor = c ? c.anchor : l("");
    let { patchFlag: I, dynamicChildren: K, slotScopeIds: q } = u;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (en || I & 2048) && (I = 0, O = !1, K = null), q && (k = k ? k.concat(q) : q), c == null ? (o(E, m, b), o(x, m, b), ee(u.children, m, x, v, w, $, k, O)) : I > 0 && I & 64 && K && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren ? (ue(c.dynamicChildren, K, m, v, w, $, k), process.env.NODE_ENV !== "production" && v && v.type.__hmrId ? vo(c, u) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (u.key != null || v && u === v.subTree) && vo(
        c,
        u,
        !0
        /* shallow */
      )
    )) : ce(c, u, m, x, v, w, $, k, O);
  }, fe = (c, u, m, b, v, w, $, k, O) => {
    u.slotScopeIds = k, c == null ? u.shapeFlag & 512 ? v.ctx.activate(u, m, b, $, O) : we(u, m, b, v, w, $, O) : ge(c, u, O);
  }, we = (c, u, m, b, v, w, $) => {
    const k = c.component = Ac(c, b, v);
    if (process.env.NODE_ENV !== "production" && k.type.__hmrId && Na(k), process.env.NODE_ENV !== "production" && (ho(c), mt(k, "mount")), Zn(c) && (k.ctx.renderer = ht), process.env.NODE_ENV !== "production" && mt(k, "init"), Fc(k), process.env.NODE_ENV !== "production" && vt(k, "init"), k.asyncDep) {
      if (v && v.registerDep(k, N), !c.el) {
        const O = k.subTree = he(Fe);
        H(null, O, u, m);
      }
      return;
    }
    N(k, c, u, m, v, w, $), process.env.NODE_ENV !== "production" && (go(), vt(k, "mount"));
  }, ge = (c, u, m) => {
    const b = u.component = c.component;
    if (La(c, u, m))
      if (b.asyncDep && !b.asyncResolved) {
        process.env.NODE_ENV !== "production" && ho(u), M(b, u, m), process.env.NODE_ENV !== "production" && go();
        return;
      } else
        b.next = u, ba(b.update), b.update();
    else
      u.el = c.el, b.vnode = u;
  }, N = (c, u, m, b, v, w, $) => {
    const k = () => {
      if (c.isMounted) {
        let { next: x, bu: I, u: K, parent: q, vnode: X } = c, de = x, le;
        process.env.NODE_ENV !== "production" && ho(x || c.vnode), jt(c, !1), x ? (x.el = X.el, M(c, x, $)) : x = X, I && gn(I), (le = x.props && x.props.onVnodeBeforeUpdate) && nt(le, q, x, X), jt(c, !0), process.env.NODE_ENV !== "production" && mt(c, "render");
        const _e = es(c);
        process.env.NODE_ENV !== "production" && vt(c, "render");
        const Be = c.subTree;
        c.subTree = _e, process.env.NODE_ENV !== "production" && mt(c, "patch"), V(
          Be,
          _e,
          // parent may have changed if it's in a teleport
          f(Be.el),
          // anchor may have changed if it's in a fragment
          Pt(Be),
          c,
          v,
          w
        ), process.env.NODE_ENV !== "production" && vt(c, "patch"), x.el = _e.el, de === null && Ka(c, _e.el), K && Ue(K, v), (le = x.props && x.props.onVnodeUpdated) && Ue(() => nt(le, q, x, X), v), process.env.NODE_ENV !== "production" && yi(c), process.env.NODE_ENV !== "production" && go();
      } else {
        let x;
        const { el: I, props: K } = u, { bm: q, m: X, parent: de } = c, le = Ln(u);
        if (jt(c, !1), q && gn(q), !le && (x = K && K.onVnodeBeforeMount) && nt(x, de, u), jt(c, !0), I && un) {
          const _e = () => {
            process.env.NODE_ENV !== "production" && mt(c, "render"), c.subTree = es(c), process.env.NODE_ENV !== "production" && vt(c, "render"), process.env.NODE_ENV !== "production" && mt(c, "hydrate"), un(I, c.subTree, c, v, null), process.env.NODE_ENV !== "production" && vt(c, "hydrate");
          };
          le ? u.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !c.isUnmounted && _e()
          ) : _e();
        } else {
          process.env.NODE_ENV !== "production" && mt(c, "render");
          const _e = c.subTree = es(c);
          process.env.NODE_ENV !== "production" && vt(c, "render"), process.env.NODE_ENV !== "production" && mt(c, "patch"), V(null, _e, m, b, c, v, w), process.env.NODE_ENV !== "production" && vt(c, "patch"), u.el = _e.el;
        }
        if (X && Ue(X, v), !le && (x = K && K.onVnodeMounted)) {
          const _e = u;
          Ue(() => nt(x, de, _e), v);
        }
        (u.shapeFlag & 256 || de && Ln(de.vnode) && de.vnode.shapeFlag & 256) && c.a && Ue(c.a, v), c.isMounted = !0, process.env.NODE_ENV !== "production" && Oa(c), u = m = b = null;
      }
    }, O = c.effect = new As(
      k,
      () => Bo(E),
      c.scope
      // track it in component's effect scope
    ), E = c.update = () => O.run();
    E.id = c.uid, jt(c, !0), process.env.NODE_ENV !== "production" && (O.onTrack = c.rtc ? (x) => gn(c.rtc, x) : void 0, O.onTrigger = c.rtg ? (x) => gn(c.rtg, x) : void 0, E.ownerInstance = c), E();
  }, M = (c, u, m) => {
    u.component = c;
    const b = c.vnode.props;
    c.vnode = u, c.next = null, fc(c, u.props, b, m), yc(c, u.children, m), ln(), tr(), an();
  }, ce = (c, u, m, b, v, w, $, k, O = !1) => {
    const E = c && c.children, x = c ? c.shapeFlag : 0, I = u.children, { patchFlag: K, shapeFlag: q } = u;
    if (K > 0) {
      if (K & 128) {
        T(E, I, m, b, v, w, $, k, O);
        return;
      } else if (K & 256) {
        me(E, I, m, b, v, w, $, k, O);
        return;
      }
    }
    q & 8 ? (x & 16 && Ye(E, v, w), I !== E && p(m, I)) : x & 16 ? q & 16 ? T(E, I, m, b, v, w, $, k, O) : Ye(E, v, w, !0) : (x & 8 && p(m, ""), q & 16 && ee(I, m, b, v, w, $, k, O));
  }, me = (c, u, m, b, v, w, $, k, O) => {
    c = c || yn, u = u || yn;
    const E = c.length, x = u.length, I = Math.min(E, x);
    let K;
    for (K = 0; K < I; K++) {
      const q = u[K] = O ? Vt(u[K]) : et(u[K]);
      V(c[K], q, m, null, v, w, $, k, O);
    }
    E > x ? Ye(c, v, w, !0, !1, I) : ee(u, m, b, v, w, $, k, O, I);
  }, T = (c, u, m, b, v, w, $, k, O) => {
    let E = 0;
    const x = u.length;
    let I = c.length - 1, K = x - 1;
    for (; E <= I && E <= K; ) {
      const q = c[E], X = u[E] = O ? Vt(u[E]) : et(u[E]);
      if (Wt(q, X))
        V(q, X, m, null, v, w, $, k, O);
      else
        break;
      E++;
    }
    for (; E <= I && E <= K; ) {
      const q = c[I], X = u[K] = O ? Vt(u[K]) : et(u[K]);
      if (Wt(q, X))
        V(q, X, m, null, v, w, $, k, O);
      else
        break;
      I--, K--;
    }
    if (E > I) {
      if (E <= K) {
        const q = K + 1, X = q < x ? u[q].el : b;
        for (; E <= K; )
          V(null, u[E] = O ? Vt(u[E]) : et(u[E]), m, X, v, w, $, k, O), E++;
      }
    } else if (E > K)
      for (; E <= I; )
        se(c[E], v, w, !0), E++;
    else {
      const q = E, X = E, de = /* @__PURE__ */ new Map();
      for (E = X; E <= K; E++) {
        const $e = u[E] = O ? Vt(u[E]) : et(u[E]);
        $e.key != null && (process.env.NODE_ENV !== "production" && de.has($e.key) && C("Duplicate keys found during update:", JSON.stringify($e.key), "Make sure keys are unique."), de.set($e.key, E));
      }
      let le, _e = 0;
      const Be = K - X + 1;
      let gt = !1, $n = 0;
      const Ct = new Array(Be);
      for (E = 0; E < Be; E++)
        Ct[E] = 0;
      for (E = q; E <= I; E++) {
        const $e = c[E];
        if (_e >= Be) {
          se($e, v, w, !0);
          continue;
        }
        let Ke;
        if ($e.key != null)
          Ke = de.get($e.key);
        else
          for (le = X; le <= K; le++)
            if (Ct[le - X] === 0 && Wt($e, u[le])) {
              Ke = le;
              break;
            }
        Ke === void 0 ? se($e, v, w, !0) : (Ct[Ke - X] = E + 1, Ke >= $n ? $n = Ke : gt = !0, V($e, u[Ke], m, null, v, w, $, k, O), _e++);
      }
      const fn = gt ? Dc(Ct) : yn;
      for (le = fn.length - 1, E = Be - 1; E >= 0; E--) {
        const $e = X + E, Ke = u[$e], pn = $e + 1 < x ? u[$e + 1].el : b;
        Ct[E] === 0 ? V(null, Ke, m, pn, v, w, $, k, O) : gt && (le < 0 || E !== fn[le] ? F(
          Ke,
          m,
          pn,
          2
          /* MoveType.REORDER */
        ) : le--);
      }
    }
  }, F = (c, u, m, b, v = null) => {
    const { el: w, type: $, transition: k, children: O, shapeFlag: E } = c;
    if (E & 6) {
      F(c.component.subTree, u, m, b);
      return;
    }
    if (E & 128) {
      c.suspense.move(u, m, b);
      return;
    }
    if (E & 64) {
      $.move(c, u, m, ht);
      return;
    }
    if ($ === Se) {
      o(w, u, m);
      for (let I = 0; I < O.length; I++)
        F(O[I], u, m, b);
      o(c.anchor, u, m);
      return;
    }
    if ($ === _o) {
      B(c, u, m);
      return;
    }
    if (b !== 2 && E & 1 && k)
      if (b === 0)
        k.beforeEnter(w), o(w, u, m), Ue(() => k.enter(w), v);
      else {
        const { leave: I, delayLeave: K, afterLeave: q } = k, X = () => o(w, u, m), de = () => {
          I(w, () => {
            X(), q && q();
          });
        };
        K ? K(w, X, de) : de();
      }
    else
      o(w, u, m);
  }, se = (c, u, m, b = !1, v = !1) => {
    const { type: w, props: $, ref: k, children: O, dynamicChildren: E, shapeFlag: x, patchFlag: I, dirs: K } = c;
    if (k != null && ks(k, null, m, c, !0), x & 256) {
      u.ctx.deactivate(c);
      return;
    }
    const q = x & 1 && K, X = !Ln(c);
    let de;
    if (X && (de = $ && $.onVnodeBeforeUnmount) && nt(de, u, c), x & 6)
      to(c.component, m, b);
    else {
      if (x & 128) {
        c.suspense.unmount(m, b);
        return;
      }
      q && Rt(c, null, u, "beforeUnmount"), x & 64 ? c.type.remove(c, u, m, v, ht, b) : E && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (w !== Se || I > 0 && I & 64) ? Ye(E, u, m, !1, !0) : (w === Se && I & 384 || !v && x & 16) && Ye(O, u, m), b && ze(c);
    }
    (X && (de = $ && $.onVnodeUnmounted) || q) && Ue(() => {
      de && nt(de, u, c), q && Rt(c, null, u, "unmounted");
    }, m);
  }, ze = (c) => {
    const { type: u, el: m, anchor: b, transition: v } = c;
    if (u === Se) {
      process.env.NODE_ENV !== "production" && c.patchFlag > 0 && c.patchFlag & 2048 && v && !v.persisted ? c.children.forEach(($) => {
        $.type === Fe ? s($.el) : ze($);
      }) : eo(m, b);
      return;
    }
    if (u === _o) {
      Q(c);
      return;
    }
    const w = () => {
      s(m), v && !v.persisted && v.afterLeave && v.afterLeave();
    };
    if (c.shapeFlag & 1 && v && !v.persisted) {
      const { leave: $, delayLeave: k } = v, O = () => $(m, w);
      k ? k(c.el, w, O) : O();
    } else
      w();
  }, eo = (c, u) => {
    let m;
    for (; c !== u; )
      m = g(c), s(c), c = m;
    s(u);
  }, to = (c, u, m) => {
    process.env.NODE_ENV !== "production" && c.type.__hmrId && Ea(c);
    const { bum: b, scope: v, update: w, subTree: $, um: k } = c;
    b && gn(b), v.stop(), w && (w.active = !1, se($, c, u, m)), k && Ue(k, u), Ue(() => {
      c.isUnmounted = !0;
    }, u), u && u.pendingBranch && !u.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === u.pendingId && (u.deps--, u.deps === 0 && u.resolve()), process.env.NODE_ENV !== "production" && Va(c);
  }, Ye = (c, u, m, b = !1, v = !1, w = 0) => {
    for (let $ = w; $ < c.length; $++)
      se(c[$], u, m, b, v);
  }, Pt = (c) => c.shapeFlag & 6 ? Pt(c.component.subTree) : c.shapeFlag & 128 ? c.suspense.next() : g(c.anchor || c.el), On = (c, u, m) => {
    c == null ? u._vnode && se(u._vnode, null, null, !0) : V(u._vnode || null, c, u, null, null, null, m), tr(), mi(), u._vnode = c;
  }, ht = {
    p: V,
    um: se,
    m: F,
    r: ze,
    mt: we,
    mc: ee,
    pc: ce,
    pbc: ue,
    n: Pt,
    o: e
  };
  let dn, un;
  return t && ([dn, un] = t(ht)), {
    render: On,
    hydrate: dn,
    createApp: Ec(On, dn)
  };
}
function jt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function vo(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (P(o) && P(s))
    for (let r = 0; r < o.length; r++) {
      const i = o[r];
      let l = s[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[r] = Vt(s[r]), l.el = i.el), n || vo(i, l)), l.type === Qn && (l.el = i.el), process.env.NODE_ENV !== "production" && l.type === Fe && !l.el && (l.el = i.el);
    }
}
function Dc(e) {
  const t = e.slice(), n = [0];
  let o, s, r, i, l;
  const a = e.length;
  for (o = 0; o < a; o++) {
    const d = e[o];
    if (d !== 0) {
      if (s = n[n.length - 1], e[s] < d) {
        t[o] = s, n.push(o);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        l = r + i >> 1, e[n[l]] < d ? r = l + 1 : i = l;
      d < e[n[r]] && (r > 0 && (t[o] = n[r - 1]), n[r] = o);
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; )
    n[r] = i, i = t[i];
  return n;
}
const Oc = (e) => e.__isTeleport, Se = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), Qn = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), Fe = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0), _o = Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0), Kn = [];
let tt = null;
function ie(e = !1) {
  Kn.push(tt = e ? null : []);
}
function $c() {
  Kn.pop(), tt = Kn[Kn.length - 1] || null;
}
let qn = 1;
function hr(e) {
  qn += e;
}
function Ji(e) {
  return e.dynamicChildren = qn > 0 ? tt || yn : null, $c(), qn > 0 && tt && tt.push(e), e;
}
function be(e, t, n, o, s, r) {
  return Ji(h(
    e,
    t,
    n,
    o,
    s,
    r,
    !0
    /* isBlock */
  ));
}
function ut(e, t, n, o, s) {
  return Ji(he(
    e,
    t,
    n,
    o,
    s,
    !0
    /* isBlock: prevent a block from tracking itself */
  ));
}
function Cn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Wt(e, t) {
  return process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && mn.has(t.type) ? (e.shapeFlag &= -257, t.shapeFlag &= -513, !1) : e.type === t.type && e.key === t.key;
}
const Vc = (...e) => Zi(...e), qo = "__vInternal", Xi = ({ key: e }) => e ?? null, bo = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? ve(e) || Te(e) || z(e) ? { i: Ae, r: e, k: t, f: !!n } : e : null;
function h(e, t = null, n = null, o = 0, s = null, r = e === Se ? 0 : 1, i = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Xi(t),
    ref: t && bo(t),
    scopeId: Uo,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: o,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Ae
  };
  return l ? (Bs(a, n), r & 128 && e.normalize(a)) : n && (a.shapeFlag |= ve(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && C("VNode created with invalid key (NaN). VNode type:", a.type), qn > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  tt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && tt.push(a), a;
}
const he = process.env.NODE_ENV !== "production" ? Vc : Zi;
function Zi(e, t = null, n = null, o = 0, s = null, r = !1) {
  if ((!e || e === xi) && (process.env.NODE_ENV !== "production" && !e && C(`Invalid vnode type when creating vnode: ${e}.`), e = Fe), Cn(e)) {
    const l = ft(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Bs(l, n), qn > 0 && !r && tt && (l.shapeFlag & 6 ? tt[tt.indexOf(e)] = l : tt.push(l)), l.patchFlag |= -2, l;
  }
  if (tl(e) && (e = e.__vccOpts), t) {
    t = Pn(t);
    let { class: l, style: a } = t;
    l && !ve(l) && (t.class = G(l)), ae(a) && (fs(a) && !P(a) && (a = Ee({}, a)), t.style = on(a));
  }
  const i = ve(e) ? 1 : Pa(e) ? 128 : Oc(e) ? 64 : ae(e) ? 4 : z(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && fs(e) && (e = J(e), C("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), h(e, t, n, o, s, i, r, !0);
}
function Pn(e) {
  return e ? fs(e) || qo in e ? Ee({}, e) : e : null;
}
function ft(e, t, n = !1) {
  const { props: o, ref: s, patchFlag: r, children: i } = e, l = t ? kn(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Xi(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? P(s) ? s.concat(bo(t)) : [s, bo(t)] : bo(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && r === -1 && P(i) ? i.map(Gi) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Se ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ft(e.ssContent),
    ssFallback: e.ssFallback && ft(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Gi(e) {
  const t = ft(e);
  return P(e.children) && (t.children = e.children.map(Gi)), t;
}
function Oe(e = " ", t = 0) {
  return he(Qn, null, e, t);
}
function bt(e = "", t = !1) {
  return t ? (ie(), ut(Fe, null, e)) : he(Fe, null, e);
}
function et(e) {
  return e == null || typeof e == "boolean" ? he(Fe) : P(e) ? he(
    Se,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Vt(e) : he(Qn, null, String(e));
}
function Vt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ft(e);
}
function Bs(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (P(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Bs(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(qo in t) ? t._ctx = Ae : s === 3 && Ae && (Ae.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    z(t) ? (t = { default: t, _ctx: Ae }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [Oe(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function kn(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = G([t.class, o.class]));
      else if (s === "style")
        t.style = on([t.style, o.style]);
      else if (Yn(s)) {
        const r = t[s], i = o[s];
        i && r !== i && !(P(r) && r.includes(i)) && (t[s] = r ? [].concat(r, i) : i);
      } else
        s !== "" && (t[s] = o[s]);
  }
  return t;
}
function nt(e, t, n, o = null) {
  Ze(e, t, 7, [
    n,
    o
  ]);
}
const Sc = Yi();
let Tc = 0;
function Ac(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || Sc, r = {
    uid: Tc++,
    vnode: e,
    type: o,
    parent: t,
    appContext: s,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new $l(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Hi(o, s),
    emitsOptions: Ei(o, s),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: pe,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: pe,
    data: pe,
    props: pe,
    attrs: pe,
    slots: pe,
    refs: pe,
    setupState: pe,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return process.env.NODE_ENV !== "production" ? r.ctx = tc(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Ia.bind(null, r), e.ce && e.ce(r), r;
}
let Ne = null;
const bn = () => Ne || Ae, wn = (e) => {
  Ne = e, e.scope.on();
}, nn = () => {
  Ne && Ne.scope.off(), Ne = null;
}, Ic = /* @__PURE__ */ Kt("slot,component");
function ws(e, t) {
  const n = t.isNativeTag || Hr;
  (Ic(e) || n(e)) && C("Do not use built-in or reserved HTML elements as component id: " + e);
}
function Qi(e) {
  return e.vnode.shapeFlag & 4;
}
let zn = !1;
function Fc(e, t = !1) {
  zn = t;
  const { props: n, children: o } = e.vnode, s = Qi(e);
  dc(e, n, s, t), bc(e, o);
  const r = s ? xc(e, t) : void 0;
  return zn = !1, r;
}
function xc(e, t) {
  var n;
  const o = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (o.name && ws(o.name, e.appContext.config), o.components) {
      const r = Object.keys(o.components);
      for (let i = 0; i < r.length; i++)
        ws(r[i], e.appContext.config);
    }
    if (o.directives) {
      const r = Object.keys(o.directives);
      for (let i = 0; i < r.length; i++)
        Fi(r[i]);
    }
    o.compilerOptions && Mc() && C('"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.');
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = ii(new Proxy(e.ctx, Ri)), process.env.NODE_ENV !== "production" && nc(e);
  const { setup: s } = o;
  if (s) {
    const r = e.setupContext = s.length > 1 ? Lc(e) : null;
    wn(e), ln();
    const i = _t(s, e, 0, [process.env.NODE_ENV !== "production" ? _n(e.props) : e.props, r]);
    if (an(), nn(), Vs(i)) {
      if (i.then(nn, nn), t)
        return i.then((l) => {
          gr(e, l, t);
        }).catch((l) => {
          jo(
            l,
            e,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      if (e.asyncDep = i, process.env.NODE_ENV !== "production" && !e.suspense) {
        const l = (n = o.name) !== null && n !== void 0 ? n : "Anonymous";
        C(`Component <${l}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
      }
    } else
      gr(e, i, t);
  } else
    el(e, t);
}
function gr(e, t, n) {
  z(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ae(t) ? (process.env.NODE_ENV !== "production" && Cn(t) && C("setup() should not return VNodes directly - return a render function instead."), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = ci(t), process.env.NODE_ENV !== "production" && oc(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && C(`setup() should return an object. Received: ${t === null ? "null" : typeof t}`), el(e, n);
}
let Ds;
const Mc = () => !Ds;
function el(e, t, n) {
  const o = e.type;
  if (!e.render) {
    if (!t && Ds && !o.render) {
      const s = o.template || Rs(e).template;
      if (s) {
        process.env.NODE_ENV !== "production" && mt(e, "compile");
        const { isCustomElement: r, compilerOptions: i } = e.appContext.config, { delimiters: l, compilerOptions: a } = o, d = Ee(Ee({
          isCustomElement: r,
          delimiters: l
        }, i), a);
        o.render = Ds(s, d), process.env.NODE_ENV !== "production" && vt(e, "compile");
      }
    }
    e.render = o.render || Me;
  }
  wn(e), ln(), rc(e), an(), nn(), process.env.NODE_ENV !== "production" && !o.render && e.render === Me && !t && (o.template ? C(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
    /* should not happen */
  ) : C("Component is missing template or render function."));
}
function mr(e) {
  return new Proxy(e.attrs, process.env.NODE_ENV !== "production" ? {
    get(t, n) {
      return Do(), je(e, "get", "$attrs"), t[n];
    },
    set() {
      return C("setupContext.attrs is readonly."), !1;
    },
    deleteProperty() {
      return C("setupContext.attrs is readonly."), !1;
    }
  } : {
    get(t, n) {
      return je(e, "get", "$attrs"), t[n];
    }
  });
}
function Lc(e) {
  const t = (o) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && C("expose() should be called only once per setup()."), o != null)) {
      let s = typeof o;
      s === "object" && (P(o) ? s = "array" : Te(o) && (s = "ref")), s !== "object" && C(`expose() should be passed a plain object, received ${s}.`);
    }
    e.exposed = o || {};
  };
  let n;
  return process.env.NODE_ENV !== "production" ? Object.freeze({
    get attrs() {
      return n || (n = mr(e));
    },
    get slots() {
      return _n(e.slots);
    },
    get emit() {
      return (o, ...s) => e.emit(o, ...s);
    },
    expose: t
  }) : {
    get attrs() {
      return n || (n = mr(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function zo(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(ci(ii(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in tn)
          return tn[n](e);
      },
      has(t, n) {
        return n in t || n in tn;
      }
    }));
}
const Kc = /(?:^|[-_])(\w)/g, Pc = (e) => e.replace(Kc, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Hs(e, t = !0) {
  return z(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Yo(e, t, n = !1) {
  let o = Hs(t);
  if (!o && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (o = s[1]);
  }
  if (!o && e && e.parent) {
    const s = (r) => {
      for (const i in r)
        if (r[i] === t)
          return i;
    };
    o = s(e.components || e.parent.type.components) || s(e.appContext.components);
  }
  return o ? Pc(o) : n ? "App" : "Anonymous";
}
function tl(e) {
  return z(e) && "__vccOpts" in e;
}
const W = (e, t) => da(e, t, zn);
function qt(e, t, n) {
  const o = arguments.length;
  return o === 2 ? ae(t) && !P(t) ? Cn(t) ? he(e, null, [t]) : he(e, t) : he(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : o === 3 && Cn(n) && (n = [n]), he(e, t, n));
}
const Rc = Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : ""), jc = () => {
  {
    const e = mo(Rc);
    return e || process.env.NODE_ENV !== "production" && C("Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."), e;
  }
};
function os(e) {
  return !!(e && e.__v_isShallow);
}
function Bc() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, o = { style: "color:#9d288c" }, s = {
    header(f) {
      return ae(f) ? f.__isVue ? ["div", e, "VueInstance"] : Te(f) ? [
        "div",
        {},
        ["span", e, p(f)],
        "<",
        l(f.value),
        ">"
      ] : Gt(f) ? [
        "div",
        {},
        ["span", e, os(f) ? "ShallowReactive" : "Reactive"],
        "<",
        l(f),
        `>${Mt(f) ? " (readonly)" : ""}`
      ] : Mt(f) ? [
        "div",
        {},
        ["span", e, os(f) ? "ShallowReadonly" : "Readonly"],
        "<",
        l(f),
        ">"
      ] : null : null;
    },
    hasBody(f) {
      return f && f.__isVue;
    },
    body(f) {
      if (f && f.__isVue)
        return [
          "div",
          {},
          ...r(f.$)
        ];
    }
  };
  function r(f) {
    const g = [];
    f.type.props && f.props && g.push(i("props", J(f.props))), f.setupState !== pe && g.push(i("setup", f.setupState)), f.data !== pe && g.push(i("data", J(f.data)));
    const D = a(f, "computed");
    D && g.push(i("computed", D));
    const A = a(f, "inject");
    return A && g.push(i("injected", A)), g.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: f }]
    ]), g;
  }
  function i(f, g) {
    return g = Ee({}, g), Object.keys(g).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        f
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(g).map((D) => [
          "div",
          {},
          ["span", o, D + ": "],
          l(g[D], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(f, g = !0) {
    return typeof f == "number" ? ["span", t, f] : typeof f == "string" ? ["span", n, JSON.stringify(f)] : typeof f == "boolean" ? ["span", o, f] : ae(f) ? ["object", { object: g ? J(f) : f }] : ["span", n, String(f)];
  }
  function a(f, g) {
    const D = f.type;
    if (z(D))
      return;
    const A = {};
    for (const V in f.ctx)
      d(D, V, g) && (A[V] = f.ctx[V]);
    return A;
  }
  function d(f, g, D) {
    const A = f[D];
    if (P(A) && A.includes(g) || ae(A) && g in A || f.extends && d(f.extends, g, D) || f.mixins && f.mixins.some((V) => d(V, g, D)))
      return !0;
  }
  function p(f) {
    return os(f) ? "ShallowRef" : f.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
const vr = "3.2.47", Hc = "http://www.w3.org/2000/svg", zt = typeof document < "u" ? document : null, _r = zt && /* @__PURE__ */ zt.createElement("template"), Uc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t ? zt.createElementNS(Hc, e) : zt.createElement(e, n ? { is: n } : void 0);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => zt.createTextNode(e),
  createComment: (e) => zt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => zt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, o, s, r) {
    const i = n ? n.previousSibling : t.lastChild;
    if (s && (s === r || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), n), !(s === r || !(s = s.nextSibling)); )
        ;
    else {
      _r.innerHTML = o ? `<svg>${e}</svg>` : e;
      const l = _r.content;
      if (o) {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function Wc(e, t, n) {
  const o = e._vtc;
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function qc(e, t, n) {
  const o = e.style, s = ve(n);
  if (n && !s) {
    if (t && !ve(t))
      for (const r in t)
        n[r] == null && Os(o, r, "");
    for (const r in n)
      Os(o, r, n[r]);
  } else {
    const r = o.display;
    s ? t !== n && (o.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (o.display = r);
  }
}
const zc = /[^\\];\s*$/, br = /\s*!important$/;
function Os(e, t, n) {
  if (P(n))
    n.forEach((o) => Os(e, t, o));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && zc.test(n) && C(`Unexpected semicolon at the end of '${t}' style value: '${n}'`), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Yc(e, t);
    br.test(n) ? e.setProperty(Ft(o), n.replace(br, ""), "important") : e[o] = n;
  }
}
const yr = ["Webkit", "Moz", "ms"], ss = {};
function Yc(e, t) {
  const n = ss[t];
  if (n)
    return n;
  let o = dt(t);
  if (o !== "filter" && o in e)
    return ss[t] = o;
  o = sn(o);
  for (let s = 0; s < yr.length; s++) {
    const r = yr[s] + o;
    if (r in e)
      return ss[t] = r;
  }
  return t;
}
const Nr = "http://www.w3.org/1999/xlink";
function Jc(e, t, n, o, s) {
  if (o && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(Nr, t.slice(6, t.length)) : e.setAttributeNS(Nr, t, n);
  else {
    const r = bl(t);
    n == null || r && !jr(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
  }
}
function Xc(e, t, n, o, s, r, i) {
  if (t === "innerHTML" || t === "textContent") {
    o && i(o, s, r), e[t] = n ?? "";
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && // custom elements may use _value internally
  !e.tagName.includes("-")) {
    e._value = n;
    const a = n ?? "";
    (e.value !== a || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    e.tagName === "OPTION") && (e.value = a), n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = jr(n) : n == null && a === "string" ? (n = "", l = !0) : a === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch (a) {
    process.env.NODE_ENV !== "production" && !l && C(`Failed setting prop "${t}" on <${e.tagName.toLowerCase()}>: value ${n} is invalid.`, a);
  }
  l && e.removeAttribute(t);
}
function Yt(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Zc(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
function Gc(e, t, n, o, s = null) {
  const r = e._vei || (e._vei = {}), i = r[t];
  if (o && i)
    i.value = o;
  else {
    const [l, a] = Qc(t);
    if (o) {
      const d = r[t] = nd(o, s);
      Yt(e, l, d, a);
    } else
      i && (Zc(e, l, i, a), r[t] = void 0);
  }
}
const Er = /(?:Once|Passive|Capture)$/;
function Qc(e) {
  let t;
  if (Er.test(e)) {
    t = {};
    let o;
    for (; o = e.match(Er); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ft(e.slice(2)), t];
}
let rs = 0;
const ed = /* @__PURE__ */ Promise.resolve(), td = () => rs || (ed.then(() => rs = 0), rs = Date.now());
function nd(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    Ze(od(o, n.value), t, 5, [o]);
  };
  return n.value = e, n.attached = td(), n;
}
function od(e, t) {
  if (P(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((o) => (s) => !s._stopped && o && o(s));
  } else
    return t;
}
const Cr = /^on[a-z]/, sd = (e, t, n, o, s = !1, r, i, l, a) => {
  t === "class" ? Wc(e, o, s) : t === "style" ? qc(e, n, o) : Yn(t) ? No(t) || Gc(e, t, n, o, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : rd(e, t, o, s)) ? Xc(e, t, o, r, i, l, a) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), Jc(e, t, o, s));
};
function rd(e, t, n, o) {
  return o ? !!(t === "innerHTML" || t === "textContent" || t in e && Cr.test(t) && z(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Cr.test(t) && ve(n) ? !1 : t in e;
}
const wt = "transition", Sn = "animation", Us = (e, { slots: t }) => qt($i, id(e), t);
Us.displayName = "Transition";
const nl = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Us.props = /* @__PURE__ */ Ee({}, $i.props, nl);
const Bt = (e, t = []) => {
  P(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, kr = (e) => e ? P(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function id(e) {
  const t = {};
  for (const _ in e)
    _ in nl || (t[_] = e[_]);
  if (e.css === !1)
    return t;
  const { name: n = "v", type: o, duration: s, enterFromClass: r = `${n}-enter-from`, enterActiveClass: i = `${n}-enter-active`, enterToClass: l = `${n}-enter-to`, appearFromClass: a = r, appearActiveClass: d = i, appearToClass: p = l, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: g = `${n}-leave-active`, leaveToClass: D = `${n}-leave-to` } = e, A = ld(s), V = A && A[0], Y = A && A[1], { onBeforeEnter: H, onEnter: Z, onEnterCancelled: R, onLeave: B, onLeaveCancelled: Q, onBeforeAppear: Ce = H, onAppear: ne = Z, onAppearCancelled: U = R } = t, ee = (_, L, fe) => {
    Ht(_, L ? p : l), Ht(_, L ? d : i), fe && fe();
  }, oe = (_, L) => {
    _._isLeaving = !1, Ht(_, f), Ht(_, D), Ht(_, g), L && L();
  }, ue = (_) => (L, fe) => {
    const we = _ ? ne : Z, ge = () => ee(L, _, fe);
    Bt(we, [L, ge]), wr(() => {
      Ht(L, _ ? a : r), Dt(L, _ ? p : l), kr(we) || Dr(L, o, V, ge);
    });
  };
  return Ee(t, {
    onBeforeEnter(_) {
      Bt(H, [_]), Dt(_, r), Dt(_, i);
    },
    onBeforeAppear(_) {
      Bt(Ce, [_]), Dt(_, a), Dt(_, d);
    },
    onEnter: ue(!1),
    onAppear: ue(!0),
    onLeave(_, L) {
      _._isLeaving = !0;
      const fe = () => oe(_, L);
      Dt(_, f), dd(), Dt(_, g), wr(() => {
        _._isLeaving && (Ht(_, f), Dt(_, D), kr(B) || Dr(_, o, Y, fe));
      }), Bt(B, [_, fe]);
    },
    onEnterCancelled(_) {
      ee(_, !1), Bt(R, [_]);
    },
    onAppearCancelled(_) {
      ee(_, !0), Bt(U, [_]);
    },
    onLeaveCancelled(_) {
      oe(_), Bt(Q, [_]);
    }
  });
}
function ld(e) {
  if (e == null)
    return null;
  if (ae(e))
    return [is(e.enter), is(e.leave)];
  {
    const t = is(e);
    return [t, t];
  }
}
function is(e) {
  const t = Ol(e);
  return process.env.NODE_ENV !== "production" && ga(t, "<transition> explicit duration"), t;
}
function Dt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e._vtc || (e._vtc = /* @__PURE__ */ new Set())).add(t);
}
function Ht(e, t) {
  t.split(/\s+/).forEach((o) => o && e.classList.remove(o));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function wr(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let ad = 0;
function Dr(e, t, n, o) {
  const s = e._endId = ++ad, r = () => {
    s === e._endId && o();
  };
  if (n)
    return setTimeout(r, n);
  const { type: i, timeout: l, propCount: a } = cd(e, t);
  if (!i)
    return o();
  const d = i + "end";
  let p = 0;
  const f = () => {
    e.removeEventListener(d, g), r();
  }, g = (D) => {
    D.target === e && ++p >= a && f();
  };
  setTimeout(() => {
    p < a && f();
  }, l + 1), e.addEventListener(d, g);
}
function cd(e, t) {
  const n = window.getComputedStyle(e), o = (A) => (n[A] || "").split(", "), s = o(`${wt}Delay`), r = o(`${wt}Duration`), i = Or(s, r), l = o(`${Sn}Delay`), a = o(`${Sn}Duration`), d = Or(l, a);
  let p = null, f = 0, g = 0;
  t === wt ? i > 0 && (p = wt, f = i, g = r.length) : t === Sn ? d > 0 && (p = Sn, f = d, g = a.length) : (f = Math.max(i, d), p = f > 0 ? i > d ? wt : Sn : null, g = p ? p === wt ? r.length : a.length : 0);
  const D = p === wt && /\b(transform|all)(,|$)/.test(o(`${wt}Property`).toString());
  return {
    type: p,
    timeout: f,
    propCount: g,
    hasTransform: D
  };
}
function Or(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, o) => $r(n) + $r(e[o])));
}
function $r(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function dd() {
  return document.body.offsetHeight;
}
const So = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return P(t) ? (n) => gn(t, n) : t;
};
function ud(e) {
  e.target.composing = !0;
}
function Vr(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const xn = {
  created(e, { modifiers: { lazy: t, trim: n, number: o } }, s) {
    e._assign = So(s);
    const r = o || s.props && s.props.type === "number";
    Yt(e, t ? "change" : "input", (i) => {
      if (i.target.composing)
        return;
      let l = e.value;
      n && (l = l.trim()), r && (l = Co(l)), e._assign(l);
    }), n && Yt(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Yt(e, "compositionstart", ud), Yt(e, "compositionend", Vr), Yt(e, "change", Vr));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: o, number: s } }, r) {
    if (e._assign = So(r), e.composing || document.activeElement === e && e.type !== "range" && (n || o && e.value.trim() === t || (s || e.type === "number") && Co(e.value) === t))
      return;
    const i = t ?? "";
    e.value !== i && (e.value = i);
  }
}, fd = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, o) {
    const s = xo(t);
    Yt(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (i) => i.selected).map((i) => n ? Co(To(i)) : To(i));
      e._assign(e.multiple ? s ? new Set(r) : r : r[0]);
    }), e._assign = So(o);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Sr(e, t);
  },
  beforeUpdate(e, t, n) {
    e._assign = So(n);
  },
  updated(e, { value: t }) {
    Sr(e, t);
  }
};
function Sr(e, t) {
  const n = e.multiple;
  if (n && !P(t) && !xo(t)) {
    process.env.NODE_ENV !== "production" && C(`<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(t).slice(8, -1)}.`);
    return;
  }
  for (let o = 0, s = e.options.length; o < s; o++) {
    const r = e.options[o], i = To(r);
    if (n)
      P(t) ? r.selected = Nl(t, i) > -1 : r.selected = t.has(i);
    else if (Fo(To(r), t)) {
      e.selectedIndex !== o && (e.selectedIndex = o);
      return;
    }
  }
  !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
}
function To(e) {
  return "_value" in e ? e._value : e.value;
}
const pd = ["ctrl", "shift", "alt", "meta"], hd = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => pd.some((n) => e[`${n}Key`] && !t.includes(n))
}, ol = (e, t) => (n, ...o) => {
  for (let s = 0; s < t.length; s++) {
    const r = hd[t[s]];
    if (r && r(n, t))
      return;
  }
  return e(n, ...o);
}, Ao = {
  beforeMount(e, { value: t }, { transition: n }) {
    e._vod = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Tn(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: o }) {
    !t != !n && (o ? t ? (o.beforeEnter(e), Tn(e, !0), o.enter(e)) : o.leave(e, () => {
      Tn(e, !1);
    }) : Tn(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Tn(e, t);
  }
};
function Tn(e, t) {
  e.style.display = t ? e._vod : "none";
}
const gd = /* @__PURE__ */ Ee({ patchProp: sd }, Uc);
let Tr;
function md() {
  return Tr || (Tr = kc(gd));
}
const vd = (...e) => {
  const t = md().createApp(...e);
  process.env.NODE_ENV !== "production" && (_d(t), bd(t));
  const { mount: n } = t;
  return t.mount = (o) => {
    const s = yd(o);
    if (!s)
      return;
    const r = t._component;
    !z(r) && !r.render && !r.template && (r.template = s.innerHTML), s.innerHTML = "";
    const i = n(s, !1, s instanceof SVGElement);
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i;
  }, t;
};
function _d(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => ml(t) || vl(t),
    writable: !1
  });
}
function bd(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        C("The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead.");
      }
    });
    const n = e.config.compilerOptions, o = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return C(o), n;
      },
      set() {
        C(o);
      }
    });
  }
}
function yd(e) {
  if (ve(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && C(`Failed to mount app: mount target selector "${e}" returned null.`), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && C('mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'), e;
}
function Nd() {
  Bc();
}
process.env.NODE_ENV !== "production" && Nd();
const Ed = [
  "_level",
  "_filterVisible",
  "_parent",
  "_loading",
  "_loaded",
  "_remote",
  "_keyField",
  "children",
  "setChildren"
];
class Tt {
  //#endregion Properties
  constructor(t, n = null, o = "id", s = !1) {
    /** 节点层级 */
    ke(this, "_level", 0);
    /** 多选是否选中 */
    ke(this, "checked", !1);
    /** 单选是否选中 */
    ke(this, "selected", !1);
    /** 是否半选状态 */
    ke(this, "indeterminate", !1);
    /** 是否禁用 */
    ke(this, "disabled", !1);
    /** 是否展开 */
    ke(this, "expand", !1);
    /** 是否可见 */
    ke(this, "visible", !0);
    /** 过滤后是否可见，如果为 false 则在其他可见情况下也是不可见的 */
    ke(this, "_filterVisible", !0);
    /** 父节点 */
    ke(this, "_parent", null);
    /** 子节点 */
    ke(this, "children", []);
    /** 是否是子节点 */
    ke(this, "isLeaf", !1);
    /** 节点是否正在加载 */
    ke(this, "_loading", !1);
    /** 子节点是否已加载 */
    ke(this, "_loaded", !1);
    this._keyField = o, this._remote = s;
    for (let r in t)
      Ed.indexOf(r) === -1 && (this[r] = t[r]);
    this[o] == null && (this[o] = Math.random().toString(36).substring(2)), this._parent = n, this._parent && (this._level = this._parent._level + 1), this.visible = this._parent === null || this._parent.expand && this._parent.visible, Array.isArray(t.children) && this.setChildren(t.children), this.children.length && (this._loaded = !0), this._remote || (this.isLeaf = !this.children.length);
  }
  /**
   * 设置子节点
   * @param children 子节点数据数组
   */
  setChildren(t) {
    this.children = t.map((n) => new Tt(Object.assign({}, n), this, this._keyField, this._remote));
  }
}
var Io = /* @__PURE__ */ ((e) => (e.none = "none", e.parents = "parents", e.children = "children", e))(Io || {}), sl = /* @__PURE__ */ ((e) => (e["bottom-start"] = "bottom-start", e["bottom-end"] = "bottom-end", e.bottom = "bottom", e["top-start"] = "top-start", e["top-end"] = "top-end", e.top = "top", e))(sl || {}), yo = /* @__PURE__ */ ((e) => (e.top = "top", e.center = "center", e.bottom = "bottom", e))(yo || {}), rt = /* @__PURE__ */ ((e) => (e.before = "before", e.body = "body", e.after = "after", e))(rt || {});
class Cd {
  //#endregion Properties
  constructor(t) {
    //#region Properties
    /** 树数据 */
    ke(this, "data", []);
    /** 扁平化的树数据 */
    ke(this, "flatData", []);
    /** 树数据 map */
    ke(this, "mapData", /* @__PURE__ */ Object.create(null));
    /** 未加载但已选中的节点 key ，每次 flattenData 的时候进行检查，将加载的节点从此数组中剔除 */
    ke(this, "unloadCheckedKeys", []);
    /** 未加载但选中的单选节点 key */
    ke(this, "unloadSelectedKey", null);
    /** 当前单选选中节点 key */
    ke(this, "currentSelectedKey", null);
    /** 事件 listeners */
    ke(this, "listenersMap", {});
    this.options = t;
  }
  setData(t, n = null, o = null) {
    this.data = t.map((s) => new Tt(s, null, this.options.keyField, !!this.options.load));
    for (let s in this.mapData)
      delete this.mapData[s];
    this.currentSelectedKey = null, this.flatData = this.flattenData(this.data), this.setUnloadCheckedKeys(o || []), n && (this.currentSelectedKey = null, this.setUnloadSelectedKey(n)), this.emit("visible-data-change"), this.emit("set-data");
  }
  //#region Set api
  /**
   * 设置单个节点多选选中
   * @param key 设置的节点 key
   * @param value 是否选中
   * @param triggerEvent 是否触发事件
   * @param triggerDataChange 是否触发 `data-change` 事件以通知外部刷新视图
   * @param filtering 是否正在过滤，如果是，则考虑 `filteredNodeCheckable` Prop，用于判断是否是用户点击节点触发的勾选
   */
  setChecked(t, n, o = !0, s = !0, r = !1) {
    const i = this.mapData[t];
    if (!i)
      return this.setUnloadChecked(t, n, o, s);
    i.disabled || i.checked && n || !i.checked && !i.indeterminate && !n || (this.options.cascade ? (this.checkNodeDownward(i, n, r), this.checkNodeUpward(i)) : i.checked = n, o && (i.checked ? this.emit("check", i) : this.emit("uncheck", i)), this.triggerCheckedChange(o, s));
  }
  /**
   * 设置单个未加载节点选中，不公开此 API
   */
  setUnloadChecked(t, n, o = !0, s = !0) {
    const r = this.findIndex(t, this.unloadCheckedKeys);
    n ? r === -1 && this.unloadCheckedKeys.push(t) : r !== -1 && this.unloadCheckedKeys.splice(r, 1), this.triggerCheckedChange(o, s);
  }
  /**
   * 批量选中/取消多选选中节点
   * @param keys 选中的节点 key 数组
   * @param value 是否选中
   * @param triggerEvent 是否触发事件
   */
  setCheckedKeys(t, n, o = !0, s = !0) {
    t.forEach((r) => {
      this.setChecked(r, n, !1, !1);
    }), this.triggerCheckedChange(o, s);
  }
  /**
   * 多选勾选全部节点
   * @param triggerEvent 是否触发事件
   * @param triggerDataChange 是否触发视图刷新
   */
  checkAll(t = !0, n = !0) {
    if (this.options.cascade) {
      const o = (s) => {
        s.forEach((r) => {
          r.disabled ? o(r.children) : this.setChecked(r[this.options.keyField], !0, !1, !1);
        });
      };
      o(this.data);
    } else {
      const o = this.flatData.length;
      for (let s = 0; s < o; s++) {
        const r = this.flatData[s];
        this.setChecked(r[this.options.keyField], !0, !1, !1);
      }
    }
    this.triggerCheckedChange(t, n);
  }
  /**
   * 清除所有多选已选
   * @param triggerEvent 是否触发事件
   * @param triggerDataChange 是否触发视图刷新
   */
  clearChecked(t = !0, n = !0) {
    this.getCheckedNodes().forEach((s) => {
      this.setChecked(s[this.options.keyField], !1, !1, !1);
    }), this.unloadCheckedKeys = [], this.triggerCheckedChange(t, n);
  }
  /**
   * 触发 checked-change 的快捷方法
   * @param triggerEvent 是否触发事件
   * @param triggerDataChange 是否触发视图刷新
   */
  triggerCheckedChange(t = !0, n = !0) {
    t && this.emit("checked-change", this.getCheckedNodes(), this.getCheckedKeys()), n && this.emit("render-data-change");
  }
  /**
   * 设置单选选中
   * @param key 选中节点 key
   * @param value 是否选中
   * @param triggerEvent 是否触发事件
   */
  setSelected(t, n, o = !0, s = !0) {
    const r = this.mapData[t];
    if (!r)
      return this.setUnloadSelected(t, n, o, s);
    r.disabled || r.selected !== n && (t === this.currentSelectedKey ? n || (r.selected = n, this.currentSelectedKey = null) : n && (this.currentSelectedKey === null ? (r.selected = n, this.currentSelectedKey = r[this.options.keyField]) : (this.mapData[this.currentSelectedKey] && (this.mapData[this.currentSelectedKey].selected = !1), r.selected = n, this.currentSelectedKey = r[this.options.keyField])), o && (r.selected ? this.emit("select", r) : this.emit("unselect", r), this.emit("selected-change", this.getSelectedNode(), this.getSelectedKey())), s && this.emit("render-data-change"));
  }
  /**
   * 设置未加载单选选中节点，不公开此 API
   */
  setUnloadSelected(t, n, o = !0, s = !0) {
    n ? (this.currentSelectedKey && this.setSelected(this.currentSelectedKey, !1, !1, !1), this.unloadSelectedKey = t) : this.unloadSelectedKey === t && (this.unloadSelectedKey = null), o && this.emit("selected-change", this.getSelectedNode(), this.getSelectedKey()), s && this.emit("render-data-change");
  }
  /**
   * 清除当前单选选中
   * @param triggerEvent 是否触发事件
   * @param triggerDataChange 是否触发视图刷新
   */
  clearSelected(t = !0, n = !0) {
    this.currentSelectedKey && this.mapData[this.currentSelectedKey] ? this.setSelected(this.currentSelectedKey, !1, t, n) : this.unloadSelectedKey !== null && (this.unloadSelectedKey = null, t && this.emit("selected-change", this.getSelectedNode(), this.getSelectedKey()), n && this.emit("render-data-change"));
  }
  /**
   * 设置节点展开
   * @param key 节点 key
   * @param value 是否展开
   * @param expandParent 展开节点时是否同时展开父节点
   * @param triggerEvent 是否触发事件
   * @param triggerDataChange 是否触发 `data-change` 事件以通知外部刷新视图
   */
  setExpand(t, n, o = !1, s = !0, r = !0) {
    const i = this.mapData[t];
    if (!(!i || !o && i.isLeaf) && i.expand !== n) {
      if (!i.isLeaf) {
        if (typeof this.options.load == "function") {
          if (!i._loaded && !i._loading && n) {
            i._loading = !0, r && this.emit("visible-data-change"), new Promise((a, d) => {
              const p = this.options.load;
              p(i, a, d);
            }).then((a) => {
              if (Array.isArray(a)) {
                const d = this.findIndex(i);
                if (d === -1)
                  return;
                i._loaded = !0, i.expand = n, i.setChildren(a);
                const p = this.getCheckedKeys(), f = this.flattenData(i.children, this.getSelectedKey === null);
                this.flatData.splice(d + 1, 0, ...f), this.setUnloadCheckedKeys(p), this.unloadSelectedKey !== null && this.setUnloadSelectedKey(this.unloadSelectedKey), this.emit("set-data");
              }
            }).catch((a) => {
              let d = a;
              a instanceof Error || (d = new Error(a)), console.error(d);
            }).then(() => {
              i._loading = !1, s && this.emit("expand", i), r && this.emit("visible-data-change");
            });
            return;
          } else if (i._loading)
            return;
        }
        i.expand = n;
        const l = [...i.children];
        for (; l.length; )
          l[0].expand && l[0].children.length && l.push(...l[0].children), l[0]._filterVisible === !1 ? l[0].visible = !1 : l[0].visible = l[0]._parent === null || l[0]._parent.expand && l[0]._parent.visible, l.shift();
        s && this.emit("expand", i), r && this.emit("visible-data-change");
      }
      o && i._parent && n && this.setExpand(i._parent[this.options.keyField], n, o, !1, r);
    }
  }
  /**
   * 批量设置节点展开/折叠
   * @param keys 展开的节点 key 数组
   * @param value 是否展开
   */
  setExpandKeys(t, n, o = !0) {
    t.forEach((s) => {
      this.setExpand(s, n, !1, !1, !1);
    }), o && this.emit("visible-data-change");
  }
  setExpandAll(t, n = !0) {
    this.flatData.forEach((o) => {
      (!this.options.load || o._loaded) && this.setExpand(o[this.options.keyField], t, !1, !1, !1);
    }), n && this.emit("visible-data-change");
  }
  //#endregion Set api
  //#region Get api
  /**
   * 获取多选选中节点
   * @param ignoreMode 忽略模式，可选择忽略父节点或子节点，默认值是 CTree 的 ignoreMode Prop
   */
  getCheckedNodes(t = this.options.ignoreMode) {
    if (t === Io.children) {
      const n = [], o = (s) => {
        s.forEach((r) => {
          r.checked ? n.push(r) : !r.isLeaf && r.indeterminate && o(r.children);
        });
      };
      return o(this.data), n;
    } else
      return this.flatData.filter((n) => t === Io.parents ? n.checked && n.isLeaf : n.checked);
  }
  /**
   * 获取多选选中的节点 key ，包括未加载的 key
   * @param ignoreMode 忽略模式，同 `getCheckedNodes`
   */
  getCheckedKeys(t = this.options.ignoreMode) {
    return this.getCheckedNodes(t).map((n) => n[this.options.keyField]).concat(this.unloadCheckedKeys);
  }
  /**
   * 获取多选半选状态节点
   */
  getIndeterminateNodes() {
    return this.flatData.filter((t) => t.indeterminate);
  }
  /**
   * 获取当前单选选中节点
   */
  getSelectedNode() {
    return this.currentSelectedKey === null ? null : this.mapData[this.currentSelectedKey] || null;
  }
  /**
   * 获取当前单选选中节点 key ，有可能是未加载的选中项
   */
  getSelectedKey() {
    return this.currentSelectedKey || this.unloadSelectedKey || null;
  }
  /**
   * 获取未加载但多选选中的节点
   */
  getUnloadCheckedKeys() {
    return this.unloadCheckedKeys;
  }
  /**
   * 获取展开节点
   */
  getExpandNodes() {
    return this.flatData.filter((t) => !t.isLeaf && t.expand);
  }
  /**
   * 获取展开节点 keys
   */
  getExpandKeys() {
    return this.getExpandNodes().map((t) => t[this.options.keyField]);
  }
  /**
   * 根据节点 key  获取节点
   * @param key 节点 key
   */
  getNode(t) {
    return this.mapData[t] || null;
  }
  //#endregion Get api
  //#region Node transfer api
  // 这边的 referenceKey 都是被执行的节点，比如 insertBefore ，在这里 referenceKey 就是指要插入到 referenceKey 节点前面
  insertBefore(t, n) {
    const o = this.getInsertedNode(t, n);
    if (!o)
      return null;
    this.remove(o[this.options.keyField], !1);
    const r = this.mapData[n]._parent, i = this.findIndex(n, r && r.children), l = this.findIndex(n), a = r && -1 || this.findIndex(n, this.data);
    return this.insertIntoStore(o, r, i, l, a), this.emit("visible-data-change"), o;
  }
  insertAfter(t, n) {
    const o = this.getInsertedNode(t, n);
    if (!o)
      return null;
    this.remove(o[this.options.keyField], !1);
    const s = this.mapData[n], r = s._parent, i = this.findIndex(n, r && r.children) + 1, l = this.flatData.length, a = this.findIndex(n);
    let d = a + 1;
    for (let f = a + 1; f <= l; f++) {
      if (f === l) {
        d = f;
        break;
      }
      if (this.flatData[f]._level <= s._level) {
        d = f;
        break;
      }
    }
    const p = r && -1 || this.findIndex(n, this.data) + 1;
    return this.insertIntoStore(o, r, i, d, p), this.emit("visible-data-change"), o;
  }
  append(t, n) {
    const o = this.mapData[n];
    if (!o.isLeaf) {
      const i = o.children.length;
      return this.insertAfter(t, o.children[i - 1][this.options.keyField]);
    }
    const s = this.getInsertedNode(t, n, !0);
    if (!s)
      return null;
    this.remove(s[this.options.keyField], !1);
    const r = this.findIndex(n) + 1;
    return this.insertIntoStore(s, o, 0, r), this.emit("visible-data-change"), s;
  }
  prepend(t, n) {
    const o = this.mapData[n];
    if (!o.isLeaf)
      return this.insertBefore(t, o.children[0][this.options.keyField]);
    const s = this.getInsertedNode(t, n, !0);
    if (!s)
      return null;
    this.remove(s[this.options.keyField], !1);
    const r = this.findIndex(n) + 1;
    return this.insertIntoStore(s, o, 0, r), this.emit("visible-data-change"), s;
  }
  /**
   * 删除节点
   * @param removedKey 要删除的节点 key
   */
  remove(t, n = !0) {
    const o = this.mapData[t];
    if (!o)
      return null;
    const s = this.findIndex(o);
    if (s === -1)
      return null;
    let r = 1;
    const i = this.flatData.length;
    for (let a = s + 1; a < i && this.flatData[a]._level > o._level; a++)
      r++;
    this.flatData.splice(s, r);
    const l = (a) => {
      const d = this.mapData[a];
      delete this.mapData[a], d.children.forEach((p) => l(p[this.options.keyField]));
    };
    if (l(t), !o._parent) {
      const a = this.findIndex(o, this.data);
      a > -1 && this.data.splice(a, 1);
    }
    if (o._parent) {
      const a = this.findIndex(o, o._parent.children);
      a !== -1 && o._parent.children.splice(a, 1), o._parent.isLeaf = !o._parent.children.length, o._parent.isLeaf && (o._parent.expand = !1, o._parent.indeterminate = !1), this.updateMovingNodeStatus(o);
    }
    return n && this.emit("visible-data-change"), o;
  }
  getInsertedNode(t, n, o = !1) {
    const s = this.mapData[n];
    if (!s)
      return null;
    const r = o ? s : s._parent;
    if (t instanceof Tt)
      return t[this.options.keyField] === n ? null : t;
    if (typeof t == "object") {
      if (t[this.options.keyField] === n)
        return null;
      const i = this.mapData[t[this.options.keyField]];
      return i || new Tt(t, r, this.options.keyField, !!this.options.load);
    } else
      return !this.mapData[t] || t === n ? null : this.mapData[t];
  }
  /**
   * 将一个节点插入 store 记录中
   * @param node 要插入的节点
   * @param parentNode 要插入节点的父节点
   * @param childIndex 如果有父节点，则需提供要插入的节点在同级节点中的顺序
   * @param flatIndex 在 flatData 中的索引
   * @param dataIndex 如果没有父节点，需要提供节点在 data 中的索引
   */
  insertIntoStore(t, n, o, s, r) {
    if (s === -1)
      return;
    o !== -1 && n && n.children.splice(o, 0, t), t._parent = n, n ? (n.isLeaf = !1, this.setExpand(n[this.options.keyField], !0, !1, !1, !1)) : typeof r == "number" && r > -1 && this.data.splice(r, 0, t);
    const i = this.flattenData([t]);
    t._level = n ? n._level + 1 : 0, i.forEach((l) => l._level = l._parent ? l._parent._level + 1 : 0), this.flatData.splice(s, 0, ...i), this.updateMovingNodeStatus(t);
  }
  updateMovingNodeStatus(t) {
    this.checkNodeUpward(t), this.triggerCheckedChange(), t.selected && this.setSelected(t[this.options.keyField], !0);
  }
  //#endregion Node transfer api
  /**
   * 过滤本地节点数据
   * @param keyword 过滤关键词
   * @param filterMethod 过滤方法
   */
  filter(t, n) {
    const o = [];
    this.flatData.forEach((s) => {
      s._filterVisible = s._parent && s._parent._filterVisible || n(t, s), s.visible = s._filterVisible, s._filterVisible && o.push(s);
    }), o.forEach((s) => {
      const r = [];
      let i = s._parent;
      for (; i; )
        r.unshift(i), i = i._parent;
      r.forEach((l) => {
        l._filterVisible = !0, l.visible = (l._parent === null || l._parent.expand && l._parent.visible) && l._filterVisible, this.options.expandOnFilter && this.setExpand(l[this.options.keyField], !0, !1, !1, !1);
      }), s.visible = s._parent === null || s._parent.expand && s._parent.visible;
    }), this.emit("visible-data-change");
  }
  /**
   * 过滤未加载多选节点，对比最终勾选节点是否有变化并触发 checked-change 事件
   * @param keys 全量选中节点 key 数组，包括加载与未加载选中节点
   */
  setUnloadCheckedKeys(t) {
    this.unloadCheckedKeys = t;
    const n = t.concat(), o = this.unloadCheckedKeys.length;
    for (let r = o - 1; r >= 0; r--) {
      const i = this.unloadCheckedKeys[r];
      this.mapData[i] && (this.setChecked(i, !0, !1, !1), this.unloadCheckedKeys.splice(r, 1));
    }
    const s = this.getCheckedKeys();
    s.length === n.length && s.every((r) => n.some((i) => i === r)) || this.emit("checked-change", this.getCheckedNodes(), s);
  }
  /**
   * 过滤未加载单选选中节点，对比是否有变化并触发 selected-change 事件
   * @param key 节点 key
   */
  setUnloadSelectedKey(t) {
    const n = this.getSelectedKey();
    this.mapData[t] ? (this.setSelected(t, !0, !1), this.unloadSelectedKey = null) : (this.currentSelectedKey && this.setSelected(this.currentSelectedKey, !1, !1), this.unloadSelectedKey = t);
    const o = this.getSelectedKey();
    o !== n && this.emit("selected-change", this.getSelectedNode(), o);
  }
  /**
   * 保存扁平化的节点数据 `flatData` 与节点数据 Map `mapData`
   * @param nodes 树状节点数据
   * @param overrideSelected 是否根据数据设置 `selected`
   */
  flattenData(t, n = !0, o = []) {
    const s = t.length;
    for (let r = 0; r < s; r++) {
      const i = t[r], l = i[this.options.keyField];
      if (o.push(i), this.mapData[l])
        throw new Error("[CTree] Duplicate tree node key.");
      this.mapData[l] = i, i.checked && this.options.cascade && (this.checkNodeDownward(i, !0), this.checkNodeUpward(i)), i.selected && n && (this.clearSelected(!1, !1), this.currentSelectedKey = i[this.options.keyField], this.emit("selected-change", i, this.currentSelectedKey)), (this.options.defaultExpandAll || i.expand) && !this.options.load && !i.isLeaf && (i.expand = !1, this.setExpand(i[this.options.keyField], !0, !1, !1, !1)), i.children.length && this.flattenData(i.children, n, o);
    }
    return o;
  }
  //#region Check nodes
  /**
   * 向下勾选/取消勾选节点，包括自身
   * @param node 需要向下勾选的节点
   * @param value 勾选或取消勾选
   * @param filtering 是否正在过滤，如果是，则考虑 `filteredNodeCheckable` Prop
   */
  checkNodeDownward(t, n, o = !1) {
    if (t.children.forEach((s) => {
      this.checkNodeDownward(s, n, o);
    }), t.isLeaf || this.options.load && !t.children.length) {
      if (!t.disabled) {
        if (o && !this.options.filteredNodeCheckable && !t._filterVisible)
          return;
        t.checked = n, t.indeterminate = !1;
      }
    } else
      this.checkParentNode(t);
  }
  /**
   * 向上勾选/取消勾选父节点，不包括自身
   * @param node 需要勾选的节点
   */
  checkNodeUpward(t) {
    let n = t._parent;
    for (; n; )
      this.checkParentNode(n), n = n._parent;
  }
  /**
   * 根据子节点的勾选状态更新当前父节点的勾选状态
   * @param node 需要勾选的节点
   */
  checkParentNode(t) {
    const n = t.children.length;
    if (!n)
      return;
    let o = !1, s = !1, r = !1;
    for (let i = 0; i < n; i++) {
      const l = t.children[i];
      if (l.checked ? o = !0 : s = !0, o && s || l.indeterminate) {
        r = !0, t.checked = !1, t.indeterminate = !0;
        break;
      }
    }
    r || (t.checked = o, t.indeterminate = !1);
  }
  //#endregion Check nodes
  //#region Utils
  /**
   * 搜索节点在指定数组中的位置
   */
  findIndex(t, n = this.flatData) {
    if (n !== null) {
      let o = t instanceof Tt ? t[this.options.keyField] : t;
      const s = n.length;
      for (let r = 0; r < s; r++)
        if (n[0] instanceof Tt) {
          if (o === n[r][this.options.keyField])
            return r;
        } else if (o === n[r])
          return r;
    }
    return -1;
  }
  //#endregion Utils
  //#region Mini EventTarget
  on(t, n) {
    this.listenersMap[t] || (this.listenersMap[t] = []);
    let o = [];
    Array.isArray(n) ? o = n : o = [n], o.forEach((s) => {
      this.listenersMap[t].indexOf(s) === -1 && this.listenersMap[t].push(s);
    });
  }
  off(t, n) {
    if (this.listenersMap[t])
      if (!n)
        this.listenersMap[t] = [];
      else {
        const o = this.listenersMap[t].indexOf(n);
        o > -1 && this.listenersMap[t].splice(o, 1);
      }
  }
  emit(t, ...n) {
    if (!this.listenersMap[t])
      return;
    const o = this.listenersMap[t].length;
    for (let s = 0; s < o; s++)
      this.listenersMap[t][s](...n);
  }
  //#endregion Mini EventTarget
}
const kd = We({
  name: "CLoadingIcon"
}), qe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, wd = { viewBox: "0 0 50 50" }, Dd = /* @__PURE__ */ h("circle", {
  class: "ctree-loading-icon__circle",
  cx: "25",
  cy: "25",
  r: "20",
  fill: "none",
  "stroke-width": "5",
  "stroke-miterlimit": "10"
}, null, -1), Od = [
  Dd
];
function $d(e, t, n, o, s, r) {
  return ie(), be("svg", wd, Od);
}
const rl = /* @__PURE__ */ qe(kd, [["render", $d]]), Ve = "ctree-tree-node", Vd = We({
  name: "CTreeNode",
  components: {
    LoadingIcon: rl
  },
  props: {
    /** 节点数据，注意！！为了性能，不让 Vue 监听过多属性，这个 data 不是完整的 TreeNode ，不包括 _parent 和 children 属性 */
    data: Object,
    /** 节点标题字段 */
    titleField: String,
    /** 节点唯一标识字段 */
    keyField: String,
    /** 节点渲染 render 函数 */
    render: Function,
    /** 是否可多选 */
    checkable: Boolean,
    /** 是否可单选 */
    selectable: Boolean,
    /** 点击已选中节点是否取消选中 */
    unselectOnClick: Boolean,
    /** 是否禁用所有节点 */
    disableAll: Boolean,
    /** 是否可拖拽 */
    draggable: Boolean,
    /** 是否可放置 */
    droppable: Boolean,
    getNode: Function
  },
  setup(e, { emit: t }) {
    var me;
    const n = j(!1), o = j(!1), s = j(!1), r = e.keyField, i = e.getNode, l = e.titleField, a = W(() => {
      var T;
      return [
        `${Ve}__wrapper`,
        {
          [`${Ve}__wrapper_is-leaf`]: (T = e.data) == null ? void 0 : T.isLeaf
        }
      ];
    }), d = W(() => [
      `${Ve}__node-body`,
      {
        [`${Ve}__drop_active`]: n.value
      }
    ]), p = W(() => [
      `${Ve}__drop`,
      {
        [`${Ve}__drop_active`]: o.value
      }
    ]), f = W(() => [
      `${Ve}__drop`,
      {
        [`${Ve}__drop_active`]: s.value
      }
    ]), g = W(() => [
      `${Ve}__square`
    ]), D = W(() => {
      var T;
      return [
        `${Ve}__expand`,
        {
          [`${Ve}__expand_active`]: (T = e.data) == null ? void 0 : T.expand
        }
      ];
    }), A = W(() => [
      `${Ve}__loading-icon`
    ]), V = W(() => {
      var T, F, se;
      return [
        `${Ve}__checkbox`,
        {
          [`${Ve}__checkbox_checked`]: (T = e.data) == null ? void 0 : T.checked,
          [`${Ve}__checkbox_indeterminate`]: (F = e.data) == null ? void 0 : F.indeterminate,
          [`${Ve}__checkbox_disabled`]: e.disableAll || ((se = e.data) == null ? void 0 : se.disabled)
        }
      ];
    }), Y = W(() => {
      var T, F;
      return [
        `${Ve}__title`,
        {
          [`${Ve}__title_selected`]: (T = e.data) == null ? void 0 : T.selected,
          [`${Ve}__title_disabled`]: e.disableAll || ((F = e.data) == null ? void 0 : F.disabled)
        }
      ];
    }), H = W(() => i(e.data ? e.data[r] : "") || {}), Z = W(() => e.checkable), R = ((me = e.data) == null ? void 0 : me.render) || e.render || null, B = W(() => We({
      name: "Render",
      functional: !0,
      render() {
        return typeof R != "function" ? qt("div") : R(H.value);
      }
    })), Q = W(() => {
      var F;
      let T = {};
      return e.draggable && !e.disableAll && !((F = e.data) != null && F.disabled) && (T = {
        dragstart: we
      }), T;
    }), Ce = W(() => {
      let T = {};
      return e.droppable && (T = {
        dragenter: ge.bind(bn()),
        dragover: N.bind(bn()),
        dragleave: M.bind(bn()),
        drop: ce.bind(bn())
      }), T;
    });
    function ne() {
      var T;
      (T = e.data) != null && T.isLeaf || t("expand", H.value);
    }
    function U() {
      var T;
      e.disableAll || (T = e.data) != null && T.disabled || !e.checkable || t("check", H.value);
    }
    function ee() {
      var T, F;
      if (t("click", H.value), e.selectable) {
        if (e.disableAll || (T = e.data) != null && T.disabled || (F = e.data) != null && F.selected && !e.unselectOnClick)
          return;
        t("select", H.value);
      } else
        e.checkable ? U() : ne();
    }
    function oe() {
      t("node-dblclick", H.value);
    }
    function ue() {
      t("node-right-click", H.value);
    }
    const _ = j();
    function L(T) {
      const F = _.value.getBoundingClientRect(), se = F.height, ze = T.clientY - F.top;
      return ze <= se * 0.3 ? rt.before : ze <= se * (0.3 + 0.4) ? rt.body : rt.after;
    }
    function fe(T, F = !1) {
      o.value = !1, n.value = !1, s.value = !1, F || (T === rt.before ? o.value = !0 : T === rt.body ? n.value = !0 : T === rt.after && (s.value = !0));
    }
    function we(T) {
      var F;
      T.dataTransfer && T.dataTransfer.setData("node", JSON.stringify(e.data)), (F = e.data) != null && F.expand && ne(), t("node-dragstart", H.value, T);
    }
    function ge(T) {
      T.preventDefault();
      const F = L(T);
      fe(F), t("node-dragenter", H.value, T, F);
    }
    function N(T) {
      T.preventDefault();
      const F = L(T);
      fe(F), t("node-dragover", H.value, T, F);
    }
    function M(T) {
      const F = L(T);
      fe(F, !0), t("node-dragleave", H.value, T, F);
    }
    function ce(T) {
      const F = L(T);
      fe(F, !0), t("node-drop", H.value, T, F);
    }
    return {
      /** 节点拖拽 dragover */
      dragoverBody: n,
      /** 节点前拖拽 dragover */
      dragoverBefore: o,
      /** 节点后拖拽 dragover */
      dragoverAfter: s,
      wrapperCls: a,
      nodeBodyCls: d,
      dropBeforeCls: p,
      dropAfterCls: f,
      squareCls: g,
      expandCls: D,
      loadingIconCls: A,
      checkboxCls: V,
      titleCls: Y,
      fullData: H,
      showCheckbox: Z,
      renderFunction: R,
      renderComponent: B,
      dragListeners: Q,
      dropListeners: Ce,
      titleField: l,
      handleExpand: ne,
      handleCheck: U,
      handleSelect: ee,
      handleDblclick: oe,
      handleRightClick: ue,
      nodeBody: _
    };
  }
}), Sd = ["draggable"];
function Td(e, t, n, o, s, r) {
  var l, a, d, p;
  const i = Ge("LoadingIcon");
  return ie(), be("div", {
    class: G(e.wrapperCls)
  }, [
    h("div", {
      class: G(e.dropBeforeCls)
    }, null, 2),
    h("div", kn({
      ref: "nodeBody",
      class: e.nodeBodyCls
    }, _s(e.dropListeners, !0)), [
      h("div", {
        class: G(e.squareCls)
      }, [
        at(h("i", {
          class: G(e.expandCls),
          onClick: t[0] || (t[0] = (...f) => e.handleExpand && e.handleExpand(...f))
        }, null, 2), [
          [Ao, !((l = e.data) != null && l.isLeaf) && !((a = e.data) != null && a._loading)]
        ]),
        (d = e.data) != null && d._loading ? (ie(), ut(i, {
          key: 0,
          class: G(e.loadingIconCls)
        }, null, 8, ["class"])) : bt("", !0)
      ], 2),
      e.showCheckbox ? (ie(), be("div", {
        key: 0,
        class: G(e.squareCls)
      }, [
        h("div", {
          class: G(e.checkboxCls),
          onClick: t[1] || (t[1] = (...f) => e.handleCheck && e.handleCheck(...f))
        }, null, 2)
      ], 2)) : bt("", !0),
      h("div", kn({
        class: e.titleCls,
        onClick: t[2] || (t[2] = (...f) => e.handleSelect && e.handleSelect(...f)),
        onDblclick: t[3] || (t[3] = (...f) => e.handleDblclick && e.handleDblclick(...f)),
        onContextmenu: t[4] || (t[4] = (...f) => e.handleRightClick && e.handleRightClick(...f))
      }, _s(e.dragListeners, !0), {
        draggable: e.draggable && !e.disableAll && !((p = e.data) != null && p.disabled)
      }), [
        e.renderFunction ? (ie(), ut(Mi(e.renderComponent), { key: 0 })) : (ie(), be(Se, { key: 1 }, [
          Oe(Ie(e.data ? e.data[e.titleField] : ""), 1)
        ], 64))
      ], 16, Sd)
    ], 16),
    h("div", {
      class: G(e.dropAfterCls)
    }, null, 2)
  ], 2);
}
const Ad = /* @__PURE__ */ qe(Vd, [["render", Td]]), Id = We({
  name: "CTree",
  components: {
    CTreeNode: Ad,
    LoadingIcon: rl
  },
  emits: ["update:modelValue", "node-drop"],
  props: {
    /** 单选模式下为字符串或数字，多选模式下为数组或者以 separator 分隔的字符串。当即可单选又可多选时，value 是多选的值 */
    modelValue: [
      String,
      Number,
      Array
    ],
    /** 传入的树数据。数据量大时，不建议通过 props 传入数据，建议用 `setData` 方法代替 */
    data: {
      type: Array,
      default: () => []
    },
    /** 供未加载且选中节点查询 title 字段值用的列表，格式与 `data` 一致即可 */
    unloadDataList: {
      type: Array,
      default: () => []
    },
    /** 过滤已选时是否在列表后面展示未加载的已选节点 */
    showUnloadCheckedNodes: {
      type: Boolean,
      default: !0
    },
    /** 数据为空时显示的文本 */
    emptyText: {
      type: String,
      default: "暂无数据"
    },
    /** 节点标题字段 */
    titleField: {
      type: String,
      default: "title"
    },
    /** 节点唯一标识字段 */
    keyField: {
      type: String,
      default: "id"
    },
    /** 多选模式下 value 分隔符 */
    separator: {
      type: String,
      default: ","
    },
    /** 是否可多选 */
    checkable: {
      type: Boolean,
      default: !1
    },
    /** 是否可单选 */
    selectable: {
      type: Boolean,
      default: !1
    },
    /** 是否可勾选被过滤节点 */
    filteredNodeCheckable: {
      type: Boolean,
      default: !1
    },
    /** 父子节点是否关联 */
    cascade: {
      type: Boolean,
      default: !0
    },
    /** 是否只启用子节点，当 `多选且父子不关联` 或 `单选` 时有效 */
    enableLeafOnly: {
      type: Boolean,
      default: !1
    },
    /** 是否禁用所有节点 */
    disableAll: {
      type: Boolean,
      default: !1
    },
    /** 是否默认展开所有节点 */
    defaultExpandAll: {
      type: Boolean,
      default: !1
    },
    /**
     * 默认展开的节点 key
     * @deprecated 下一个大版本将废弃，使用 expandedKeys 代替
     */
    defaultExpandedKeys: {
      type: Array,
      default: () => []
    },
    /** 展开的节点，该 Prop 变化时，树组件将会响应，建议配合事件使用 */
    expandedKeys: {
      type: Array,
      default: () => []
    },
    /** 是否可拖拽 */
    draggable: {
      type: Boolean,
      default: !1
    },
    /** 是否可放置 */
    droppable: {
      type: Boolean,
      default: !1
    },
    /** 在放置节点之前执行的方法，返回 true 允许放置， false 可阻止放置 */
    beforeDropMethod: {
      type: Function,
      default: () => () => !0
    },
    /** 忽略模式 */
    ignoreMode: {
      type: String,
      default: Io.none
    },
    /** 异步加载初始化时是否自动加载根节点 */
    autoLoad: {
      type: Boolean,
      default: !0
    },
    /** 异步加载方法 */
    load: Function,
    /** 节点渲染 render 函数 */
    render: Function,
    /** 节点过滤方法 */
    filterMethod: Function,
    /**
     * 过滤时是否展开所有可见节点
     * 有时候可能因为开发者样式设置问题导致虚拟列表失效，而展开数据量又过多从而卡顿
     * 加上这个选项并不是为了解决上述问题，而仅仅作为一个可选项
     */
    expandOnFilter: {
      type: Boolean,
      default: !0
    },
    /** 点击已选中节点是否取消选中 */
    unselectOnClick: {
      type: Boolean,
      default: !0
    },
    /** 是否显示 loading 图标 */
    loading: {
      type: Boolean,
      default: !1
    },
    //#region Render nodes related props
    /** 根据节点最小高度计算数据总高度 */
    nodeMinHeight: {
      type: Number,
      default: 30
    },
    /** 子节点缩进 */
    nodeIndent: {
      type: Number,
      default: 20
    },
    /** 渲染节点数量，可见节点数大于此值且高度超过(容器可视高度能容纳节点数 + bufferNodeAmount)则不会渲染所有可见节点 */
    renderNodeAmount: {
      type: Number,
      default: 100
    },
    /** 当滚动到视野外的节点个数大于此值时刷新渲染节点 */
    bufferNodeAmount: {
      type: Number,
      default: 20
    },
    //#endregion Render nodes related props
    /** 节点根元素的 class ，传入函数以对每个节点定制 class */
    nodeClassName: {
      type: [
        String,
        Object,
        Array,
        Function
      ]
    },
    /**
     * 使用 padding 代替 margin 来展示子节点缩进
     * 此 Prop 是为了方便样式定制，在下个大版本将全部使用 padding
     * @deprecated
     */
    usePadding: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, t) {
    const n = "ctree-tree", o = [
      "expand",
      "select",
      "unselect",
      "selected-change",
      "check",
      "uncheck",
      "checked-change",
      "set-data"
    ], s = [
      "node-drop"
    ], r = (y, S) => {
      if (Array.isArray(y) && Array.isArray(S)) {
        if (y.length === S.length && y.every((re) => S.some((He) => He === re)))
          return !0;
      } else if (y === S)
        return !0;
      return !1;
    };
    let i = Nt([]), l = j([]);
    const a = j(0), d = j(0), p = j(0), f = j(0), g = j(0), D = j(0), A = j(0), V = j(0), Y = j(!1), H = j(Array.isArray(e.modelValue) ? e.modelValue.concat() : e.modelValue), Z = j(void 0), R = j(), B = j(), Q = W(() => ({
      height: `${p}px`
    })), Ce = W(() => ({
      height: `${f}px`
    })), ne = W(() => [
      `${n}__wrapper`
    ]), U = W(() => [
      `${n}__scroll-area`
    ]), ee = W(() => [
      `${n}__block-area`
    ]), oe = W(() => [
      `${n}__empty`
    ]), ue = W(() => [
      `${n}__empty-text_default`
    ]), _ = W(() => [
      `${n}__loading`
    ]), L = W(() => [
      `${n}__loading-wrapper`
    ]), fe = W(() => [
      `${n}__loading-icon`
    ]), we = W(() => [
      `${n}__iframe`
    ]), ge = W(() => {
      let y = {};
      for (let S in t.attrs)
        o.indexOf(S) === -1 && s.indexOf(S) === -1 && (y[S] = t.attrs[S]);
      return y;
    }), N = {
      store: new Cd({
        keyField: e.keyField,
        ignoreMode: e.ignoreMode,
        filteredNodeCheckable: e.filteredNodeCheckable,
        cascade: e.cascade,
        defaultExpandAll: e.defaultExpandAll,
        load: e.load,
        expandOnFilter: e.expandOnFilter
      }),
      blockNodes: []
    };
    At(() => e.modelValue, (y) => {
      if (e.checkable) {
        if (r(y, H.value))
          return;
        let S = [];
        Array.isArray(y) ? S = y.concat() : typeof y == "string" && (S = y === "" ? [] : y.split(e.separator)), N.store.clearChecked(!1, !1), N.store.setCheckedKeys(S, !0);
      } else if (e.selectable) {
        if (y === H.value)
          return;
        const S = N.store.getSelectedKey();
        y !== "" && y != null ? N.store.setSelected(y, !0) : (y === "" || y == null) && S && N.store.setSelected(S, !1);
      }
    }), At(() => e.data, (y) => {
      M(y);
    }), At(() => e.expandedKeys, () => {
      le();
    }), At(() => t.attrs, () => {
      Ke();
    });
    function M(y) {
      pn();
      let S = null, re = null;
      e.checkable ? Array.isArray(e.modelValue) ? S = e.modelValue.concat() : typeof e.modelValue == "string" && (S = e.modelValue === "" ? [] : e.modelValue.split(e.separator)) : e.selectable && !Array.isArray(e.modelValue) && (re = e.modelValue), N.store.setData(y, re, S), le();
    }
    function ce(y, S) {
      N.store.setChecked(y, S);
    }
    function me(y, S) {
      N.store.setCheckedKeys(y, S);
    }
    function T() {
      N.store.checkAll();
    }
    function F() {
      N.store.clearChecked();
    }
    function se(y, S) {
      N.store.setSelected(y, S);
    }
    function ze() {
      N.store.clearSelected();
    }
    function eo(y, S, re = !0) {
      N.store.setExpand(y, S, re);
    }
    function to(y, S) {
      N.store.setExpandKeys(y, S);
    }
    function Ye(y) {
      N.store.setExpandAll(y);
    }
    function Pt(y) {
      return y = y || e.ignoreMode, N.store.getCheckedNodes(y);
    }
    function On(y) {
      return y = y || e.ignoreMode, N.store.getCheckedKeys(y);
    }
    function ht() {
      return N.store.getIndeterminateNodes();
    }
    function dn() {
      return N.store.getSelectedNode();
    }
    function un() {
      return N.store.getSelectedKey();
    }
    function c() {
      return N.store.getExpandNodes();
    }
    function u() {
      return N.store.getExpandKeys();
    }
    function m() {
      return N.store.flatData.filter((y) => y._filterVisible);
    }
    function b(y) {
      return N.store.getNode(y);
    }
    function v() {
      return N.store.data;
    }
    function w() {
      return N.store.flatData;
    }
    function $() {
      return N.store.flatData.length;
    }
    function k(y, S) {
      return N.store.insertBefore(y, S);
    }
    function O(y, S) {
      return N.store.insertAfter(y, S);
    }
    function E(y, S) {
      return N.store.append(y, S);
    }
    function x(y, S) {
      return N.store.prepend(y, S);
    }
    function I(y) {
      return N.store.remove(y);
    }
    function K(y, S) {
      const re = (He, ye) => {
        const De = ye[e.titleField];
        return De == null || !De.toString ? !1 : De.toString().toLowerCase().indexOf(He.toLowerCase()) > -1;
      };
      S = S || e.filterMethod || re, N.store.filter(y, S);
    }
    function q(y) {
      if (!e.checkable)
        return;
      y = y ?? e.showUnloadCheckedNodes;
      const S = N.store.getCheckedNodes();
      if (N.store.filter("", (He, ye) => ye.checked), !y)
        return;
      const re = N.store.getUnloadCheckedKeys();
      if (re.length) {
        const He = re.map((ye) => {
          const De = e.unloadDataList.concat(S);
          let Zo = ye;
          return De.some((Go) => Go[e.keyField] === ye && Go[e.titleField] != null ? (Zo = Go[e.titleField], !0) : !1), new Tt({
            [e.keyField]: ye,
            [e.titleField]: Zo,
            checked: !0,
            isLeaf: !0
          }, null, e.keyField, !!e.load);
        });
        i = He, N.blockNodes.push(...He), no(), hn();
      }
    }
    function X() {
      return Y.value = !0, new Promise((y, S) => {
        e.load && e.load(null, y, S);
      }).then((y) => {
        Array.isArray(y) && M(y);
      }).catch(() => {
      }).then(() => {
        Y.value = !1;
      });
    }
    function de(y, S = yo.top) {
      const re = N.store.mapData[y];
      if (!re || !re.visible)
        return;
      let He = -1;
      for (let De = 0; De < a.value; De++)
        if (N.blockNodes[De][e.keyField] === y) {
          He = De;
          break;
        }
      if (He === -1)
        return;
      let ye = He * e.nodeMinHeight;
      if (S === yo.center) {
        const De = R.value.clientHeight;
        ye = ye - (De - e.nodeMinHeight) / 2;
      } else if (S === yo.bottom) {
        const De = R.value.clientHeight;
        ye = ye - (De - e.nodeMinHeight);
      } else
        typeof S == "number" && (ye = ye - S);
      R.value && (R.value.scrollTop = ye);
    }
    function le() {
      e.expandedKeys.length && (N.store.setExpandAll(!1, !1), N.store.setExpandKeys(e.expandedKeys, !0));
    }
    function _e() {
      if (i.length) {
        const y = N.store.getUnloadCheckedKeys();
        i.forEach((S) => {
          S.checked = y.indexOf(S[e.keyField]) > -1;
        });
      }
    }
    function Be(y) {
      !e.cascade && e.enableLeafOnly && !y.isLeaf || N.store.setChecked(y[e.keyField], y.indeterminate ? !1 : !y.checked, !0, !0, !0);
    }
    function gt(y) {
      e.enableLeafOnly && !y.isLeaf || N.store.setSelected(y[e.keyField], !y.selected);
    }
    function $n(y) {
      N.store.setExpand(y[e.keyField], !y.expand);
    }
    function Ct(y, S, re) {
      if (e.droppable && S.dataTransfer)
        try {
          const ye = JSON.parse(S.dataTransfer.getData("node"))[e.keyField], De = y[e.keyField];
          if (e.beforeDropMethod(ye, De, re)) {
            if (ye === De)
              return;
            re === rt.before ? N.store.insertBefore(ye, De) : re === rt.body || !y.isLeaf && y.expand ? N.store.prepend(ye, De) : re === rt.after && N.store.insertAfter(ye, De), t.emit("node-drop", y, S, re, b(ye));
          }
        } catch (He) {
          throw new Error(He);
        }
    }
    function fn(y, S) {
      if (e.checkable) {
        let re = S;
        Array.isArray(e.modelValue) || (re = re.join(e.separator)), Array.isArray(re) ? H.value = re.concat() : H.value = re, t.emit("update:modelValue", re);
      }
    }
    function $e(y, S) {
      if (e.selectable && !e.checkable) {
        const re = S || "";
        H.value = re, t.emit("update:modelValue", re);
      }
    }
    function Ke() {
      for (let y in t.attrs)
        if (o.indexOf(y) > -1) {
          const S = y;
          N.store.on(S, t.attrs[y]);
        }
    }
    function pn() {
      p.value = 0, f.value = 0, R.value && (R.value.scrollTop = 0);
    }
    function Jo() {
      N.blockNodes = N.store.flatData.filter((y) => y.visible), no(), hn();
    }
    function no() {
      a.value = N.blockNodes.length, d.value = e.nodeMinHeight * a.value;
    }
    function hn() {
      Xo(), oo();
    }
    function Xo() {
      const y = R.value.clientHeight;
      g.value = Math.max(e.renderNodeAmount, Math.ceil(y / e.nodeMinHeight) + e.bufferNodeAmount);
    }
    function oo(y = !1) {
      if (a.value > g.value) {
        const S = R.value.scrollTop, re = Math.floor(S / e.nodeMinHeight);
        A.value = Math.floor(re / e.bufferNodeAmount) * e.bufferNodeAmount;
      } else
        A.value = 0;
      y && D.value === g.value && V.value === A.value || (l.value = N.blockNodes.slice(A.value, A.value + g.value).map((S) => Object.assign({}, S, {
        _parent: null,
        children: []
      })), p.value = A.value * e.nodeMinHeight, f.value = d.value - (p.value + l.value.length * e.nodeMinHeight));
    }
    function Ws() {
      Z.value && window.cancelAnimationFrame(Z.value), D.value = g.value, V.value = A.value, Z.value = window.requestAnimationFrame(oo.bind(bn(), !0));
    }
    const ll = {
      setData: M,
      setChecked: ce,
      setCheckedKeys: me,
      checkAll: T,
      clearChecked: F,
      setSelected: se,
      clearSelected: ze,
      setExpand: eo,
      setExpandKeys: to,
      setExpandAll: Ye,
      getCheckedNodes: Pt,
      getCheckedKeys: On,
      getIndeterminateNodes: ht,
      getSelectedNode: dn,
      getSelectedKey: un,
      getExpandNodes: c,
      getExpandKeys: u,
      getCurrentVisibleNodes: m,
      getTreeData: v,
      getFlatData: w,
      getNodesCount: $,
      insertBefore: k,
      insertAfter: O,
      append: E,
      prepend: x,
      remove: I,
      filter: K,
      showCheckedNodes: q,
      loadRootNodes: X,
      scrollTo: de,
      updateExpandedKeys: le,
      updateUnloadStatus: _e,
      handleTreeScroll: Ws,
      handleNodeCheck: Be,
      handleNodeSelect: gt,
      handleNodeExpand: $n,
      handleNodeDrop: Ct,
      emitCheckableInput: fn,
      emitSelectableInput: $e,
      attachStoreEvents: Ke,
      resetSpaceHeights: pn,
      updateBlockNodes: Jo,
      updateBlockData: no,
      updateRender: hn,
      updateRenderAmount: Xo,
      updateRenderNodes: oo,
      getNode: b
    };
    return Gn(() => {
      N.store.on("visible-data-change", Jo), N.store.on("render-data-change", hn), N.store.on("checked-change", (S, re) => {
        fn(S, re), _e();
      }), N.store.on("selected-change", $e), e.data.length ? (M(e.data), e.defaultExpandedKeys.length && N.store.setExpandKeys(e.defaultExpandedKeys, !0)) : typeof e.load == "function" && e.autoLoad && X();
      const y = B;
      y.contentWindow && y.contentWindow.addEventListener("resize", hn), Ke();
    }), {
      nonReactive: N,
      /** 未加载选中的节点，展示已选时生成，其他情况下没用 */
      unloadCheckedNodes: i,
      /** 可见节点个数 */
      blockLength: a,
      /** 可见节点总高度 */
      blockAreaHeight: d,
      /** 顶部填充高度 */
      topSpaceHeight: p,
      /** 底部填充高度 */
      bottomSpaceHeight: f,
      /** 实际渲染节点个数 */
      renderAmount: g,
      /** renderAmount 缓存 */
      renderAmountCache: D,
      /** 渲染节点（实际渲染节点） */
      renderNodes: l,
      /** 渲染开始下标 */
      renderStart: A,
      /** renderStart 缓存 */
      renderStartCache: V,
      /** 是否正在载入根节点，组件内部调用 load 时会改变此值 */
      isRootLoading: Y,
      /** 缓存的 value ，用于 value 变化时与之做比对 */
      valueCache: H,
      /** 防抖计时器 id */
      debounceTimer: Z,
      topSpaceStyles: Q,
      bottomSpaceStyles: Ce,
      wrapperCls: ne,
      scrollAreaCls: U,
      blockAreaCls: ee,
      emptyCls: oe,
      emptyTextDefaultCls: ue,
      loadingCls: _,
      loadingWrapperCls: L,
      loadingIconCls: fe,
      iframeCls: we,
      treeNodeListeners: ge,
      setData: M,
      setChecked: ce,
      setCheckedKeys: me,
      checkAll: T,
      clearChecked: F,
      setSelected: se,
      clearSelected: ze,
      setExpand: eo,
      setExpandKeys: to,
      setExpandAll: Ye,
      getCheckedNodes: Pt,
      getCheckedKeys: On,
      getIndeterminateNodes: ht,
      getSelectedNode: dn,
      getSelectedKey: un,
      getExpandNodes: c,
      getExpandKeys: u,
      getCurrentVisibleNodes: m,
      getTreeData: v,
      getFlatData: w,
      getNodesCount: $,
      insertBefore: k,
      insertAfter: O,
      append: E,
      prepend: x,
      remove: I,
      filter: K,
      showCheckedNodes: q,
      loadRootNodes: X,
      scrollTo: de,
      updateExpandedKeys: le,
      updateUnloadStatus: _e,
      handleTreeScroll: Ws,
      handleNodeCheck: Be,
      handleNodeSelect: gt,
      handleNodeExpand: $n,
      handleNodeDrop: Ct,
      emitCheckableInput: fn,
      emitSelectableInput: $e,
      attachStoreEvents: Ke,
      resetSpaceHeights: pn,
      updateBlockNodes: Jo,
      updateBlockData: no,
      updateRender: hn,
      updateRenderAmount: Xo,
      updateRenderNodes: oo,
      getNode: b,
      scrollArea: R,
      iframe: B,
      methods: ll
    };
  }
});
function Fd(e, t, n, o, s, r) {
  const i = Ge("CTreeNode"), l = Ge("LoadingIcon");
  return ie(), be("div", {
    class: G(e.wrapperCls)
  }, [
    h("div", {
      ref: "scrollArea",
      class: G(e.scrollAreaCls),
      onScrollPassive: t[0] || (t[0] = ol((...a) => e.handleTreeScroll && e.handleTreeScroll(...a), ["stop"]))
    }, [
      h("div", {
        class: G(e.blockAreaCls)
      }, [
        h("div", {
          style: on(e.topSpaceStyles)
        }, null, 4),
        (ie(!0), be(Se, null, En(e.renderNodes, (a) => (ie(), ut(i, kn(e.$props, {
          key: a[e.keyField],
          data: a,
          getNode: e.getNode
        }, _s(e.treeNodeListeners), {
          class: typeof e.nodeClassName == "function" ? e.nodeClassName(a) : e.nodeClassName,
          style: {
            minHeight: `${e.nodeMinHeight}px`,
            marginLeft: e.usePadding ? null : `${a._level * e.nodeIndent}px`,
            paddingLeft: e.usePadding ? `${a._level * e.nodeIndent}px` : null
          },
          onCheck: e.handleNodeCheck,
          onSelect: e.handleNodeSelect,
          onExpand: e.handleNodeExpand,
          onNodeDrop: e.handleNodeDrop
        }), null, 16, ["data", "getNode", "class", "style", "onCheck", "onSelect", "onExpand", "onNodeDrop"]))), 128)),
        h("div", {
          style: on(e.bottomSpaceStyles)
        }, null, 4)
      ], 2)
    ], 34),
    at(h("div", {
      class: G(e.emptyCls)
    }, [
      h("span", {
        class: G(e.emptyTextDefaultCls)
      }, [
        ct(e.$slots, "empty", {}, () => [
          Oe(Ie(e.emptyText), 1)
        ])
      ], 2)
    ], 2), [
      [Ao, !e.blockLength]
    ]),
    at(h("div", {
      class: G(e.loadingCls)
    }, [
      h("div", {
        class: G(e.loadingWrapperCls)
      }, [
        ct(e.$slots, "loading", {}, () => [
          he(l, {
            class: G(e.loadingIconCls)
          }, null, 8, ["class"])
        ])
      ], 2)
    ], 2), [
      [Ao, e.loading || e.isRootLoading]
    ]),
    h("iframe", {
      ref: "iframe",
      class: G(e.iframeCls)
    }, null, 2)
  ], 2);
}
const Dn = /* @__PURE__ */ qe(Id, [["render", Fd]]), Xe = "ctree-tree-search", uo = "ctree-tree-node", xd = We({
  name: "CTreeSearch",
  inheritAttrs: !1,
  emits: ["checked-change", "search", "set-Data"],
  components: {
    CTree: Dn
  },
  props: {
    /** 兼容 Vue 2.5.16 bug */
    modelValue: [
      String,
      Number,
      Array
    ],
    /** 搜索输入框的 placeholder */
    searchPlaceholder: {
      type: String,
      default: "搜索关键字"
    },
    /** 是否显示全选复选框 */
    showCheckAll: {
      type: Boolean,
      default: !0
    },
    /** 是否显示已选按钮 */
    showCheckedButton: {
      type: Boolean,
      default: !0
    },
    /** 已选按钮文字 */
    checkedButtonText: {
      type: String,
      default: "已选"
    },
    /** 是否显示底部信息 */
    showFooter: {
      type: Boolean,
      default: !0
    },
    //#region Search related
    /** 如果传入此 Prop ，触发 `search` 事件后将会执行此方法，否则会执行组件内置的搜索方法 */
    searchMethod: Function,
    /** 触发搜索的字符长度 */
    searchLength: {
      type: Number,
      default: 1
    },
    /** 禁用搜索功能 */
    searchDisabled: {
      type: Boolean,
      default: !1
    },
    /** 是否远程搜索，传入 `searchMethod` 时无效 */
    searchRemote: {
      type: Boolean,
      default: !1
    },
    /** 搜索防抖时间，单位为毫秒 */
    searchDebounceTime: {
      type: Number,
      default: 300
    }
    //#endregion Search related
  },
  setup(e, { emit: t, attrs: n, expose: o }) {
    const s = Nt({
      checked: !1,
      /** 半选 */
      indeterminate: !1,
      /** 禁用 */
      disabled: !1
    }), r = j(!1), i = j(""), l = j(void 0), a = j(0), d = j(), p = e.modelValue, f = W(() => [
      `${Xe}__wrapper`
    ]), g = W(() => [
      `${Xe}__search`
    ]), D = W(() => [
      `${Xe}__check-all-wrapper`
    ]), A = W(() => [
      `${Xe}__check-all`,
      `${uo}__checkbox`,
      {
        [`${uo}__checkbox_checked`]: s.checked,
        [`${uo}__checkbox_indeterminate`]: s.indeterminate,
        [`${uo}__checkbox_disabled`]: e.searchDisabled || s.disabled
      }
    ]), V = W(() => [
      `${Xe}__input-wrapper`
    ]), Y = W(() => [
      `${Xe}__input`,
      {
        [`${Xe}__input_disabled`]: e.searchDisabled
      }
    ]), H = W(() => [
      `${Xe}__action-wrapper`
    ]), Z = W(() => [
      `${Xe}__checked-button`,
      {
        [`${Xe}__checked-button_active`]: r.value
      }
    ]), R = W(() => [
      `${Xe}__tree-wrapper`
    ]), B = W(() => [
      `${Xe}__footer`
    ]), Q = W(() => "checkable" in n && n.checkable !== !1);
    function Ce() {
      i.value = "";
    }
    function ne() {
      return i.value;
    }
    function U(M) {
      let ce = M;
      return typeof M != "string" && (ce = i.value), new Promise((me, T) => {
        clearTimeout(l.value), l.value = setTimeout(() => {
          if (!(ce.length > 0 && ce.length < e.searchLength))
            if (r.value = !1, t("search", ce), typeof e.searchMethod == "function") {
              const F = e.searchMethod(ce);
              Promise.resolve(F).then(() => {
                L(), me();
              });
            } else
              e.searchRemote ? d.value.methods.loadRootNodes().then(() => {
                L(), me();
              }) : (d.value.methods.filter(ce), L(), me());
        }, e.searchDebounceTime);
      });
    }
    function ee() {
      if (e.searchDisabled || s.disabled)
        return;
      const M = d.value.methods.getCurrentVisibleNodes().map((ce) => ce[d.value.methods.keyField]);
      s.checked || s.indeterminate ? d.value.methods.setCheckedKeys(M, !1) : d.value.methods.setCheckedKeys(M, !0), L();
    }
    function oe() {
      U();
    }
    function ue() {
      const M = () => {
        r.value = !r.value, r.value ? d.value.methods.showCheckedNodes() : d.value.methods.filter(i.value, () => !0), L();
      };
      i.value ? (Ce(), U().then(() => {
        M();
      })) : M();
    }
    function _() {
      fe(), L();
    }
    function L() {
      const M = d.value.methods.getCurrentVisibleNodes(), ce = M.length;
      let me = !1, T = !1, F = !1;
      for (let se = 0; se < ce; se++) {
        const ze = M[se];
        if (ze.checked ? me = !0 : T = !0, me && T || ze.indeterminate) {
          F = !0, s.checked = !1, s.indeterminate = !0;
          break;
        }
      }
      F || (s.checked = me, s.indeterminate = !1);
    }
    function fe() {
      a.value = d.value.methods.getCheckedKeys().length;
    }
    function we(M, ce) {
      L(), t("checked-change", M, ce);
    }
    function ge() {
      t("set-Data"), _();
    }
    return Gn(() => {
      d.value.methods, Q.value && !a.value && _();
    }), {
      modelValue: p,
      setChecked: (M, ce) => {
        d.value.setChecked(M, ce);
      },
      checkAllStatus: s,
      isShowingChecked: r,
      keyword: i,
      debounceTimer: l,
      checkedCount: a,
      wrapperCls: f,
      searchCls: g,
      checkAllWrapperCls: D,
      checkboxCls: A,
      inputWrapperCls: V,
      inputCls: Y,
      actionWrapperCls: H,
      checkedButtonCls: Z,
      treeWrapperCls: R,
      footerCls: B,
      checkable: Q,
      tree: d,
      handleCheckAll: ee,
      handleSearch: oe,
      handleShowChecked: ue,
      updateCheckedCount: fe,
      handleSetData: _,
      updateCheckAllStatus: L,
      getKeyword: ne,
      checkedChange: we,
      setData: ge
    };
  }
}), Md = ["placeholder", "disabled"], Ld = { style: { float: "right" } };
function Kd(e, t, n, o, s, r) {
  const i = Ge("CTree");
  return ie(), be("div", {
    class: G(e.wrapperCls)
  }, [
    h("div", {
      class: G(e.searchCls)
    }, [
      e.showCheckAll && e.checkable ? (ie(), be("div", {
        key: 0,
        class: G(e.checkAllWrapperCls)
      }, [
        h("div", {
          class: G(e.checkboxCls),
          onClick: t[0] || (t[0] = (...l) => e.handleCheckAll && e.handleCheckAll(...l))
        }, null, 2)
      ], 2)) : bt("", !0),
      h("div", {
        class: G(e.inputWrapperCls)
      }, [
        ct(e.$slots, "search-input", {}, () => [
          at(h("input", {
            "onUpdate:modelValue": t[1] || (t[1] = (l) => e.keyword = l),
            type: "text",
            class: G(e.inputCls),
            placeholder: e.searchPlaceholder,
            disabled: e.searchDisabled,
            onInput: t[2] || (t[2] = (...l) => e.handleSearch && e.handleSearch(...l))
          }, null, 42, Md), [
            [xn, e.keyword]
          ])
        ])
      ], 2),
      h("div", {
        class: G(e.actionWrapperCls)
      }, [
        e.showCheckedButton && e.checkable ? (ie(), be("span", {
          key: 0,
          class: G(e.checkedButtonCls),
          onClick: t[3] || (t[3] = (...l) => e.handleShowChecked && e.handleShowChecked(...l))
        }, Ie(e.checkedButtonText), 3)) : bt("", !0),
        ct(e.$slots, "actions")
      ], 2)
    ], 2),
    h("div", {
      class: G(e.treeWrapperCls)
    }, [
      he(i, kn({ ref: "tree" }, e.$attrs, {
        modelValue: e.modelValue,
        "onUpdate:modelValue": [
          t[4] || (t[4] = (l) => e.modelValue = l),
          e.updateCheckedCount
        ],
        "set-data": e.setData,
        "checked-change": e.checkedChange
      }), Ki({ _: 2 }, [
        En(e.$slots, (l, a) => ({
          name: "default",
          fn: Lt((d) => [
            ct(e.$slots, a, fo(Pn(d)))
          ])
        }))
      ]), 1040, ["modelValue", "onUpdate:modelValue", "set-data", "checked-change"])
    ], 2),
    e.showFooter && e.checkable ? (ie(), be("div", {
      key: 0,
      class: G(e.footerCls)
    }, [
      ct(e.$slots, "footer", {}, () => [
        h("span", Ld, "已选 " + Ie(e.checkedCount) + " 个", 1)
      ])
    ], 2)) : bt("", !0)
  ], 2);
}
const il = /* @__PURE__ */ qe(xd, [["render", Kd]]), ot = "ctree-tree-drop", Ar = "ctree-tree-search", Pd = We({
  name: "CTreeDrop",
  inheritAttrs: !1,
  emits: ["clear", "checked-change", "dropdown-visible-change"],
  components: {
    CTreeSearch: il
  },
  props: {
    /** 兼容 Vue 2.5.16 bug */
    modelValue: [
      String,
      Number,
      Array
    ],
    /** 下拉内容高度 */
    dropHeight: {
      type: Number,
      default: 300
    },
    /** 展示输入框 placeholder */
    dropPlaceholder: {
      type: String
    },
    /** 是否禁用 */
    dropDisabled: {
      type: Boolean,
      default: !1
    },
    /** 允许清空 */
    clearable: {
      type: Boolean,
      default: !1
    },
    /** 下拉弹出框位置 */
    placement: {
      type: String,
      default: sl["bottom-start"]
    },
    /** 将下拉 DOM 转移到 body 中 */
    transfer: {
      type: Boolean,
      default: !1
    },
    /** 在下拉框容器上额外添加的 class */
    dropdownClassName: {
      type: [String, Array]
    },
    /** 下拉框容器最小宽度，未指定则默认为展示输入框宽度 */
    dropdownMinWidth: {
      type: Number
    },
    /** 固定下拉框容器宽度，当内容超出最小宽度不会伸长，而是出现横向滚动条 */
    dropdownWidthFixed: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, { attrs: t, emit: n }) {
    const o = j(!1), s = j(0), r = j(""), i = Nt({
      /** 多选选中的节点 */
      checkedNodes: [],
      /** 多选选中的节点 key */
      checkedKeys: [],
      /** 单选选中的节点 */
      selectedNode: null,
      /** 单选选中的节点 key */
      selectedKey: null
    }), l = W(() => [
      `${ot}__wrapper`
    ]), a = W(() => [
      `${ot}__reference`
    ]), d = W(() => [
      `${Ar}__input`,
      `${ot}__display-input`,
      {
        [`${ot}__display-input_focus`]: o.value,
        [`${Ar}__input_disabled`]: e.dropDisabled
      }
    ]), p = W(() => {
      let _ = !1;
      return typeof e.dropPlaceholder == "string" && (A.value ? _ = s.value === 0 : V.value && (_ = r.value === "")), [
        `${ot}__display-input-text`,
        {
          [`${ot}__display-input-placeholder`]: _
        }
      ];
    }), f = W(() => [
      `${ot}__display-icon-drop`,
      {
        [`${ot}__display-icon-drop_active`]: o.value
      }
    ]), g = W(() => [
      `${ot}__display-icon-clear`
    ]), D = W(() => {
      const _ = Array.isArray(e.dropdownClassName) ? e.dropdownClassName : [e.dropdownClassName];
      return [
        `${ot}__dropdown`,
        ..._
      ];
    }), A = W(() => "checkable" in t && t.checkable !== !1), V = W(() => "selectable" in t && t.selectable !== !1), Y = W(() => A.value ? s.value === 0 && typeof e.dropPlaceholder == "string" ? e.dropPlaceholder : `已选 ${s.value} 个` : V.value ? r.value === "" && typeof e.dropPlaceholder == "string" ? e.dropPlaceholder : r.value : e.dropPlaceholder || ""), H = W(() => A.value ? s.value !== 0 : V.value ? r.value !== "" : !1), Z = j(), R = j();
    function B() {
      const _ = Z.value.getBoundingClientRect(), L = _.width, fe = _.height, we = `${typeof e.dropdownMinWidth == "number" ? e.dropdownMinWidth : L}px`;
      R.value.style.minWidth = we, R.value.style.width = e.dropdownWidthFixed ? we : "auto";
      const ge = R.value.getBoundingClientRect(), N = window.getComputedStyle(R.value), M = parseFloat(N.marginLeft) + parseFloat(N.marginRight), ce = parseFloat(N.marginTop) + parseFloat(N.marginBottom), me = ge.width + M, T = ge.height / 0.8 + ce;
      let F = 0, se = 0;
      switch (e.transfer && (F = -999, se = -999), e.placement) {
        case "bottom-start":
          e.transfer ? (F = window.pageYOffset + _.bottom, se = window.pageXOffset + _.left) : F = fe;
          break;
        case "bottom-end":
          e.transfer ? (F = window.pageYOffset + _.bottom, se = window.pageXOffset + _.right - me) : (F = fe, se = L - me);
          break;
        case "bottom":
          e.transfer ? (F = window.pageYOffset + _.bottom, se = window.pageXOffset + _.left + (L - me) / 2) : (F = fe, se = (L - me) / 2);
          break;
        case "top-start":
          e.transfer ? (F = window.pageYOffset + _.top - T, se = window.pageXOffset + _.left) : F = -T;
          break;
        case "top-end":
          e.transfer ? (F = window.pageYOffset + _.top - T, se = window.pageXOffset + _.right - me) : (F = -T, se = L - me);
          break;
        case "top":
          e.transfer ? (F = window.pageYOffset + _.top - T, se = window.pageXOffset + _.left + (L - me) / 2) : (F = -T, se = (L - me) / 2);
          break;
      }
      R.value.style.top = `${F}px`, R.value.style.left = `${se}px`;
    }
    function Q() {
      e.dropDisabled || (o.value = !o.value);
    }
    function Ce(_) {
      !Z.value && !R.value && ne.value || !Z.value.contains(_.target) && !R.value.contains(_.target) && (o.value = !1);
    }
    const ne = j();
    function U() {
      n("clear"), A.value ? ne.value.clearChecked() : V.value && ne.value.clearSelected();
    }
    function ee(_, L) {
      i.checkedNodes = _, i.checkedKeys = L, s.value = L.length, n("checked-change", _, L);
    }
    function oe(_, L) {
      debugger;
      if (i.selectedNode = _, i.selectedKey = L, _) {
        const fe = ne.value.$refs.tree.methods.titleField;
        r.value = _[fe];
      } else
        L ? r.value = L : r.value = "";
      o.value = !1;
    }
    function ue() {
      if (i.checkedNodes = ne.value.$refs.tree.methods.getCheckedNodes(), i.checkedKeys = ne.value.$refs.tree.methods.getCheckedKeys(), i.selectedNode = ne.value.$refs.tree.methods.getSelectedNode(), i.selectedKey = ne.value.$refs.tree.methods.getSelectedKey(), A.value && (s.value = i.checkedKeys.length), V.value && e.modelValue != null) {
        const _ = ne.value.getNode(e.modelValue);
        if (_) {
          const L = ne.value.$refs.tree.titleField;
          r.value = _[L];
        } else
          r.value = e.modelValue;
      }
    }
    return Gn(() => {
      document.addEventListener("click", Ce), e.transfer && document.body.appendChild(R.value), ue();
    }), At(() => o.value, (_) => {
      n("dropdown-visible-change", _), _ ? pi(() => {
        B();
      }) : ne.value.getKeyword() && (ne.value.clearKeyword(), ne.value.search());
    }), {
      dropdownVisible: o,
      checkedCount: s,
      selectedTitle: r,
      slotProps: i,
      wrapperCls: l,
      referenceCls: a,
      displayInputCls: d,
      displayInputTextCls: p,
      dropIconCls: f,
      clearIconCls: g,
      dropdownCls: D,
      checkable: A,
      selectable: V,
      displayValue: Y,
      showClearIcon: H,
      reference: Z,
      dropdown: R,
      treeSearch: ne,
      locateDropdown: B,
      handleRefClick: Q,
      handleDocumentClick: Ce,
      handleClear: U,
      handleCheckedChange: ee,
      handleSelectedChange: oe,
      handleSetData: ue
    };
  }
});
function Rd(e, t, n, o, s, r) {
  const i = Ge("CTreeSearch");
  return ie(), be("div", {
    class: G(e.wrapperCls)
  }, [
    h("div", {
      ref: "reference",
      class: G(e.referenceCls),
      onClick: t[1] || (t[1] = (...l) => e.handleRefClick && e.handleRefClick(...l))
    }, [
      ct(e.$slots, "default", fo(Pn(e.slotProps)), () => [
        h("div", {
          class: G(e.displayInputCls)
        }, [
          h("span", {
            class: G(e.displayInputTextCls)
          }, [
            ct(e.$slots, "display", fo(Pn(e.slotProps)), () => [
              Oe(Ie(e.displayValue), 1)
            ])
          ], 2),
          e.dropDisabled ? bt("", !0) : (ie(), be(Se, { key: 0 }, [
            h("i", {
              class: G(e.dropIconCls)
            }, null, 2),
            e.clearable && e.showClearIcon ? ct(e.$slots, "clear", { key: 0 }, () => [
              h("i", {
                class: G(e.clearIconCls),
                onClick: t[0] || (t[0] = ol((...l) => e.handleClear && e.handleClear(...l), ["stop"]))
              }, null, 2)
            ]) : bt("", !0)
          ], 64))
        ], 2)
      ])
    ], 2),
    he(Us, { name: "ctree-dropdown" }, {
      default: Lt(() => [
        at(h("div", {
          ref: "dropdown",
          class: G(e.dropdownCls),
          style: on({
            height: `${e.dropHeight}px`
          })
        }, [
          he(i, kn({
            ref: "treeSearch",
            modelValue: e.modelValue
          }, e.$attrs, {
            "set-data": e.handleSetData,
            onCheckedChange: e.handleCheckedChange,
            onSelectedChange: e.handleSelectedChange
          }), Ki({ _: 2 }, [
            En(e.$slots, (l, a) => ({
              name: a,
              fn: Lt((d) => [
                ct(e.$slots, a, fo(Pn(d)))
              ])
            }))
          ]), 1040, ["modelValue", "set-data", "onCheckedChange", "onSelectedChange"])
        ], 6), [
          [Ao, e.dropdownVisible]
        ])
      ]),
      _: 3
    })
  ], 2);
}
const jd = /* @__PURE__ */ qe(Pd, [["render", Rd]]);
const Ir = () => Math.random().toString(36).substring(2), cn = ({
  treeDepth: e = 5,
  nodesPerLevel: t,
  sameIdTitle: n = !1,
  inOrder: o = !1,
  forceString: s = !1
} = {}) => {
  let r = [], i = 0, l = 0;
  const a = (d, p = 0) => {
    if (p >= e)
      return;
    const f = t || Math.floor(Math.random() * 100);
    for (let g = 0; g < f; g++) {
      let D = o ? l++ : Ir();
      s && (D = D.toString());
      const A = n ? D : Ir(), V = {
        title: D,
        id: A,
        children: []
      };
      d.push(V), i++, a(V.children, p + 1);
    }
  };
  return a(r), {
    data: r,
    total: i
  };
}, Bd = We({
  name: "Drag",
  components: {
    CTree: Dn
  },
  setup() {
    const e = j(["0"]), t = (s = {}) => cn(Object.assign({
      treeDepth: 3,
      nodesPerLevel: 5,
      sameIdTitle: !0,
      inOrder: !0,
      forceString: !0
    }, s)), n = () => {
      console.log("node drop");
    };
    return {
      data: j(t().data),
      value: e,
      genData: t,
      handleDrop: n
    };
  }
});
function Hd(e, t, n, o, s, r) {
  const i = Ge("CTree");
  return ie(), be("div", null, [
    he(i, {
      modelValue: e.value,
      "onUpdate:modelValue": t[0] || (t[0] = (l) => e.value = l),
      data: e.data,
      checkable: "",
      draggable: "",
      droppable: "",
      onNodeDrop: e.handleDrop
    }, {
      empty: Lt(() => [
        Oe("slot 传进来的暂无数据")
      ]),
      _: 1
    }, 8, ["modelValue", "data", "onNodeDrop"]),
    Oe(" " + Ie(e.value), 1)
  ]);
}
const Fr = /* @__PURE__ */ qe(Bd, [["render", Hd]]), Ud = (e = {}) => cn(Object.assign({
  treeDepth: 3,
  nodesPerLevel: 5,
  sameIdTitle: !0
}, e)), Wd = We({
  name: "Loading",
  components: {
    CTree: Dn
  },
  setup() {
    const e = j(Ud().data), t = j(!1), n = j();
    return {
      basicUsage: e,
      loading: t,
      tree: n
    };
  }
});
function qd(e, t, n, o, s, r) {
  const i = Ge("CTree");
  return ie(), be("div", null, [
    he(i, {
      ref: "tree",
      data: e.basicUsage,
      loading: e.loading
    }, null, 8, ["data", "loading"]),
    h("button", {
      onClick: t[0] || (t[0] = (...l) => e.handleToggle && e.handleToggle(...l))
    }, "Toggle Loading")
  ]);
}
const xr = /* @__PURE__ */ qe(Wd, [["render", qd]]), zd = (e = {}) => cn(Object.assign({
  treeDepth: 3,
  nodesPerLevel: 5,
  sameIdTitle: !0,
  inOrder: !0,
  forceString: !0
}, e)), Yd = We({
  name: "Search",
  components: {
    CTreeSearch: il
  },
  setup(e) {
    const t = Nt(zd().data), n = j("2"), o = j();
    return {
      data: t,
      value: n,
      treeSearch: o,
      setChecked
    };
  }
}), Jd = /* @__PURE__ */ h("span", { slot: "empty" }, "slot 传进来的暂无数据", -1), Xd = /* @__PURE__ */ h("template", { slot: "actions" }, [
  /* @__PURE__ */ h("span", { style: { "margin-left": "5px" } }, "折叠"),
  /* @__PURE__ */ h("span", { style: { "margin-left": "5px" } }, "展开"),
  /* @__PURE__ */ h("span", { style: { "margin-left": "5px" } }, "slot 按钮")
], -1);
function Zd(e, t, n, o, s, r) {
  const i = Ge("CTreeSearch");
  return ie(), ut(i, {
    ref: "treeSearch",
    modelValue: e.value,
    "onUpdate:modelValue": t[0] || (t[0] = (l) => e.value = l),
    data: e.data,
    checkable: "",
    expandOnFilter: !1
  }, {
    default: Lt(() => [
      Jd,
      Xd
    ]),
    _: 1
  }, 8, ["modelValue", "data"]);
}
const Mr = /* @__PURE__ */ qe(Yd, [["render", Zd]]), Gd = (e = {}) => cn(Object.assign({
  treeDepth: 3,
  nodesPerLevel: 5,
  sameIdTitle: !0,
  inOrder: !0,
  forceString: !0
}, e)), Qd = We({
  name: "Drop",
  components: {
    CTreeDrop: jd
  },
  setup() {
    const e = j(Gd().data), t = j("2"), n = j("bottom-start");
    function o() {
      console.log("checked-change");
    }
    return {
      data: e,
      value: t,
      placement: n,
      handleCheckedChange: o
    };
  }
}), eu = { style: { width: "200px" } }, tu = /* @__PURE__ */ h("p", null, "自定义展示 slot ：", -1), nu = { style: { width: "170px", "text-overflow": "ellipsis", overflow: "hidden" } }, ou = { style: { width: "200px" } }, su = /* @__PURE__ */ h("p", null, "默认：", -1);
function ru(e, t, n, o, s, r) {
  const i = Ge("CTreeDrop");
  return ie(), be("div", null, [
    h("div", eu, [
      tu,
      he(i, {
        modelValue: e.value,
        "onUpdate:modelValue": t[0] || (t[0] = (l) => e.value = l),
        data: e.data,
        checkable: "",
        clearable: "",
        "drop-placeholder": "请选择",
        placement: e.placement,
        "dropdown-min-width": 300,
        "dropdown-width-fixed": "",
        onCheckedChange: e.handleCheckedChange
      }, {
        display: Lt((l) => [
          h("div", nu, Ie(l.checkedNodes.map((a) => a.title).join(",")), 1)
        ]),
        _: 1
      }, 8, ["modelValue", "data", "placement", "onCheckedChange"]),
      Oe(" " + Ie(e.value), 1)
    ]),
    h("div", ou, [
      su,
      he(i, {
        modelValue: e.value,
        "onUpdate:modelValue": t[1] || (t[1] = (l) => e.value = l),
        data: e.data,
        checkable: "",
        clearable: "",
        "drop-placeholder": "请选择",
        placement: e.placement,
        "dropdown-min-width": 300,
        "dropdown-width-fixed": "",
        onCheckedChange: e.handleCheckedChange
      }, {
        empty: Lt(() => [
          Oe("slot 传进来的暂无数据")
        ]),
        _: 1
      }, 8, ["modelValue", "data", "placement", "onCheckedChange"]),
      Oe(" " + Ie(e.value), 1)
    ])
  ]);
}
const Lr = /* @__PURE__ */ qe(Qd, [["render", ru]]);
const An = (e = {}) => cn(Object.assign({
  treeDepth: 3,
  nodesPerLevel: 5,
  sameIdTitle: !0
}, e)), iu = (e = 2) => cn({
  treeDepth: 1,
  nodesPerLevel: e,
  inOrder: !0
}), lu = We({
  name: "Feature",
  components: {
    CTree: Dn
  },
  setup() {
    const e = An().data;
    e[0].selected = !0;
    const t = An().data;
    t[0].expand = !0, t[1].children[0].disabled = !0;
    const n = j(""), o = j([t[0].id]), s = j(An().data), r = j(An({ inOrder: !0 }).data), i = j(e), l = j(!0), a = j(t), d = j("none"), p = j(!0), f = j(An().data), g = j([]), D = j(!1);
    return {
      // 基本用法
      basicUsage: s,
      // 数据正确性
      orderData: r,
      // 单选
      selectable: i,
      // selectableValue: selectableData[0].id,
      selectableValue: n,
      // 多选
      showCheckable: l,
      checkable: a,
      checkableValue: o,
      checkableIgnoreMode: d,
      checkableCascade: p,
      // 单选与多选并存
      both: f,
      bothValue: g,
      // 远程
      remoteShow: D,
      remoteLoad: (V, Y, H) => {
        setTimeout(() => {
          Y(iu(V ? 2 : 5).data);
        }, 1e3);
      }
    };
  }
}), xe = (e) => (Ci("data-v-82c4fbe9"), e = e(), ki(), e), au = { class: "container" }, cu = { class: "panel" }, du = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("div", { class: "header" }, "基本用法", -1)), uu = { class: "body" }, fu = { class: "interface" }, pu = { style: { height: "300px" } }, hu = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("div", { class: "desc" }, " 纯展示 ", -1)), gu = { class: "panel" }, mu = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("div", { class: "header" }, "数据正确性验证", -1)), vu = { class: "body" }, _u = { class: "interface" }, bu = { style: { height: "300px" } }, yu = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("div", { class: "desc" }, " 数据正确性 ", -1)), Nu = { class: "panel" }, Eu = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("div", { class: "header" }, "单选", -1)), Cu = { class: "body" }, ku = { class: "interface" }, wu = { style: { height: "300px" } }, Du = { class: "desc" }, Ou = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("br", null, null, -1)), $u = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("br", null, null, -1)), Vu = { class: "panel" }, Su = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("div", { class: "header" }, "多选", -1)), Tu = { class: "body" }, Au = { class: "interface" }, Iu = { style: { height: "300px" } }, Fu = { class: "desc" }, xu = { class: "desc-block" }, Mu = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("p", null, "多选模式。设置 checkable 即可", -1)), Lu = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("br", null, null, -1)), Ku = { class: "desc-block" }, Pu = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("p", null, "设置 ignoreMode 可指定 v-model 与 getCheckedNodes 方法要忽略父节点或者子节点，该 prop 仅初始设置有效", -1)), Ru = ["onClick"], ju = { class: "desc-block" }, Bu = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("p", null, "设置 cascade 可指定父子节点是否级联", -1)), Hu = ["onClick"], Uu = { class: "desc-block" }, Wu = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("p", null, "重置以上选项", -1)), qu = { class: "panel" }, zu = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("div", { class: "header" }, "单选与多选并存", -1)), Yu = { class: "body" }, Ju = { class: "interface" }, Xu = { style: { height: "300px" } }, Zu = { class: "desc" }, Gu = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("br", null, null, -1)), Qu = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("br", null, null, -1)), ef = { class: "panel" }, tf = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("div", { class: "header" }, "远程", -1)), nf = { class: "body" }, of = { class: "interface" }, sf = { style: { height: "300px" } }, rf = { class: "desc" }, lf = /* @__PURE__ */ xe(() => /* @__PURE__ */ h("div", { class: "desc-block" }, [
  /* @__PURE__ */ Oe(" 设置 load 方法可以使用远程加载数据，如果有设置 data ，则 data 数据作为根数据；"),
  /* @__PURE__ */ h("br"),
  /* @__PURE__ */ Oe(" 如果没有传 data ，则初始化时调用 load 方法载入根数据，其中节点参数为 null ")
], -1)), af = { class: "desc-block" };
function cf(e, t, n, o, s, r) {
  const i = Ge("CTree");
  return ie(), be("div", au, [
    h("div", cu, [
      du,
      h("div", uu, [
        h("div", fu, [
          h("div", pu, [
            he(i, {
              data: e.basicUsage,
              nodeClassName: (l) => `generated-class-${l.id}`
            }, null, 8, ["data", "nodeClassName"])
          ])
        ]),
        hu
      ])
    ]),
    h("div", gu, [
      mu,
      h("div", vu, [
        h("div", _u, [
          h("div", bu, [
            he(i, {
              data: e.orderData,
              "default-expand-all": ""
            }, null, 8, ["data"])
          ])
        ]),
        yu
      ])
    ]),
    h("div", Nu, [
      Eu,
      h("div", Cu, [
        h("div", ku, [
          h("div", wu, [
            he(i, {
              modelValue: e.selectableValue,
              "onUpdate:modelValue": [
                t[0] || (t[0] = (l) => e.selectableValue = l),
                t[1] || (t[1] = () => {
                })
              ],
              data: e.selectable,
              selectable: ""
            }, null, 8, ["modelValue", "data"])
          ])
        ]),
        h("div", Du, [
          Oe(" 单选模式。设置 selectable 即可"),
          Ou,
          Oe(" v-model: "),
          $u,
          Oe(" " + Ie(e.selectableValue), 1)
        ])
      ])
    ]),
    h("div", Vu, [
      Su,
      h("div", Tu, [
        h("div", Au, [
          h("div", Iu, [
            e.showCheckable ? (ie(), ut(i, {
              key: 0,
              modelValue: e.checkableValue,
              "onUpdate:modelValue": t[2] || (t[2] = (l) => e.checkableValue = l),
              data: e.checkable,
              checkable: "",
              "ignore-mode": e.checkableIgnoreMode,
              cascade: e.checkableCascade
            }, null, 8, ["modelValue", "data", "ignore-mode", "cascade"])) : bt("", !0)
          ])
        ]),
        h("div", Fu, [
          h("div", xu, [
            Mu,
            Oe(" v-model: "),
            Lu,
            Oe(" " + Ie(e.checkableValue), 1)
          ]),
          h("div", Ku, [
            Pu,
            (ie(), be(Se, null, En(["none", "parents", "children"], (l) => h("button", {
              key: l,
              onClick: (a) => {
                e.checkableIgnoreMode = l, e.showCheckable = !1, e.$nextTick(() => {
                  e.checkableValue = [], e.showCheckable = !0;
                });
              }
            }, Ie(l), 9, Ru)), 64)),
            h("p", null, "当前 ignoreMode: " + Ie(e.checkableIgnoreMode), 1)
          ]),
          h("div", ju, [
            Bu,
            (ie(), be(Se, null, En([!0, !1], (l, a) => h("button", {
              key: a,
              onClick: (d) => {
                e.checkableCascade = l, e.showCheckable = !1, e.$nextTick(() => {
                  e.checkableValue = [], e.showCheckable = !0;
                });
              }
            }, Ie(l), 9, Hu)), 64)),
            h("p", null, "当前 cascade: " + Ie(e.checkableCascade), 1)
          ]),
          h("div", Uu, [
            Wu,
            h("button", {
              onClick: t[3] || (t[3] = (l) => {
                e.showCheckable = !1, e.$nextTick(() => {
                  e.checkableIgnoreMode = "none", e.checkableCascade = !0, e.checkableValue = [], e.showCheckable = !0;
                });
              })
            }, "Reset")
          ])
        ])
      ])
    ]),
    h("div", qu, [
      zu,
      h("div", Yu, [
        h("div", Ju, [
          h("div", Xu, [
            he(i, {
              modelValue: e.bothValue,
              "onUpdate:modelValue": t[4] || (t[4] = (l) => e.bothValue = l),
              data: e.both,
              checkable: "",
              selectable: ""
            }, null, 8, ["modelValue", "data"])
          ])
        ]),
        h("div", Zu, [
          Oe(" 当既可以单选又可以多选时， v-model 绑定的是多选的值"),
          Gu,
          Oe(" v-model: "),
          Qu,
          Oe(" " + Ie(e.bothValue), 1)
        ])
      ])
    ]),
    h("div", ef, [
      tf,
      h("div", nf, [
        h("div", of, [
          h("div", sf, [
            e.remoteShow ? (ie(), ut(i, {
              key: 0,
              load: e.remoteLoad
            }, null, 8, ["load"])) : bt("", !0)
          ])
        ]),
        h("div", rf, [
          lf,
          h("div", af, [
            h("button", {
              onClick: t[5] || (t[5] = (l) => {
                e.remoteShow = !1, e.$nextTick(() => {
                  e.remoteShow = !0;
                });
              })
            }, "加载树组件")
          ])
        ])
      ])
    ])
  ]);
}
const Kr = /* @__PURE__ */ qe(lu, [["render", cf], ["__scopeId", "data-v-82c4fbe9"]]);
const df = {
  "1w": {
    treeDepth: 2,
    nodesPerLevel: 100
  },
  "10w": {
    treeDepth: 2,
    nodesPerLevel: 320
  },
  "20w": {
    treeDepth: 2,
    nodesPerLevel: 450
  },
  "30w": {
    treeDepth: 2,
    nodesPerLevel: 550
  }
}, uf = We({
  name: "Performance",
  components: {
    CTree: Dn
  },
  setup() {
    const e = ref([]), t = ref(!1), n = ref({
      treeDepth: 2,
      nodesPerLevel: 5
    }), o = ref(0), s = ref([]), r = ref(""), i = ref("top"), l = ref(0), a = ref(), d = () => {
      const D = cn(Object.assign({}, n.value, { inOrder: !0, sameIdTitle: !0, forceString: !0 }));
      e.value = D.data, o.value = D.total, t.value = !1;
    };
    return {
      cache: e,
      isTreeSet: t,
      params: n,
      nodeTotal: o,
      treeData: s,
      scrollKey: r,
      scrollVerticalOption: i,
      scrollValue: l,
      handleGenerate: d,
      handleGenerateTotal: (D) => {
        Object.assign(n.value, df[D]), d();
      },
      handleSetData: () => {
        a.value.setData(e.concat()), this.isTreeSet = !0;
      },
      handleScrollToNode: () => {
        a.value.scrollTo(r.value, l.value || i.value);
      }
    };
  },
  created() {
    this.handleGenerate();
  }
}), pt = (e) => (Ci("data-v-3ffef766"), e = e(), ki(), e), ff = { class: "container" }, pf = { class: "tree" }, hf = { class: "control" }, gf = /* @__PURE__ */ pt(() => /* @__PURE__ */ h("div", { class: "desc-block" }, [
  /* @__PURE__ */ h("p", null, "说明：在 Chrome 下表现良好"),
  /* @__PURE__ */ h("p", null, "在火狐浏览器下，因为其异步滚动策略 (scroll-linked) ，在快速滚动时会导致内容空白。"),
  /* @__PURE__ */ h("p", null, "另：浏览器元素/文档是有最大高度限制的，过多数据会导致显示不正常(Chrome 下 100 万条可以正常显示，但是在火狐或 Edge 则不行)")
], -1)), mf = { class: "controls" }, vf = /* @__PURE__ */ pt(() => /* @__PURE__ */ h("label", null, "节点深度：", -1)), _f = { class: "controls" }, bf = /* @__PURE__ */ pt(() => /* @__PURE__ */ h("label", null, "每层节点个数：", -1)), yf = { class: "controls" }, Nf = /* @__PURE__ */ pt(() => /* @__PURE__ */ h("label", null, "总节点个数：", -1)), Ef = { class: "controls" }, Cf = { class: "actions" }, kf = { class: "actions" }, wf = { class: "actions" }, Df = {
  key: 0,
  style: { color: "red" }
}, Of = {
  key: 1,
  style: { color: "green" }
}, $f = { class: "controls" }, Vf = /* @__PURE__ */ pt(() => /* @__PURE__ */ h("label", null, "滚动节点id：", -1)), Sf = { class: "controls" }, Tf = /* @__PURE__ */ pt(() => /* @__PURE__ */ h("label", null, "滚动垂直位置：", -1)), Af = /* @__PURE__ */ pt(() => /* @__PURE__ */ h("option", { value: "top" }, "top", -1)), If = /* @__PURE__ */ pt(() => /* @__PURE__ */ h("option", { value: "center" }, "center", -1)), Ff = /* @__PURE__ */ pt(() => /* @__PURE__ */ h("option", { value: "bottom" }, "bottom", -1)), xf = [
  Af,
  If,
  Ff
], Mf = { class: "controls" }, Lf = /* @__PURE__ */ pt(() => /* @__PURE__ */ h("label", null, "滚动垂直偏移值：", -1)), Kf = { class: "controls" }, Pf = { class: "actions" };
function Rf(e, t, n, o, s, r) {
  const i = Ge("CTree");
  return ie(), be("div", ff, [
    h("div", pf, [
      he(i, {
        ref: "tree",
        data: e.treeData,
        checkable: "",
        selectable: ""
      }, null, 8, ["data"])
    ]),
    h("div", hf, [
      gf,
      h("div", mf, [
        vf,
        at(h("input", {
          "onUpdate:modelValue": t[0] || (t[0] = (l) => e.params.treeDepth = l),
          type: "number"
        }, null, 512), [
          [xn, e.params.treeDepth]
        ])
      ]),
      h("div", _f, [
        bf,
        at(h("input", {
          "onUpdate:modelValue": t[1] || (t[1] = (l) => e.params.nodesPerLevel = l),
          type: "number"
        }, null, 512), [
          [xn, e.params.nodesPerLevel]
        ])
      ]),
      h("div", yf, [
        Nf,
        Oe(" " + Ie(e.nodeTotal), 1)
      ]),
      h("div", Ef, [
        h("div", Cf, [
          h("button", {
            onClick: t[2] || (t[2] = (...l) => e.handleGenerate && e.handleGenerate(...l))
          }, "生成树节点数据"),
          h("button", {
            onClick: t[3] || (t[3] = (l) => e.handleGenerateTotal("1w"))
          }, "1w 节点"),
          h("button", {
            onClick: t[4] || (t[4] = (l) => e.handleGenerateTotal("10w"))
          }, "10w 节点"),
          h("button", {
            onClick: t[5] || (t[5] = (l) => e.handleGenerateTotal("20w"))
          }, "20w 节点"),
          h("button", {
            onClick: t[6] || (t[6] = (l) => e.handleGenerateTotal("30w"))
          }, "30w 节点")
        ]),
        h("div", kf, [
          h("button", {
            onClick: t[7] || (t[7] = (...l) => e.handleSetData && e.handleSetData(...l))
          }, "设置树数据")
        ]),
        h("div", wf, [
          e.isTreeSet ? (ie(), be("span", Of, "树数据已设置")) : (ie(), be("span", Df, "树数据已生成"))
        ])
      ]),
      h("div", $f, [
        Vf,
        at(h("input", {
          "onUpdate:modelValue": t[8] || (t[8] = (l) => e.scrollKey = l),
          type: "text"
        }, null, 512), [
          [xn, e.scrollKey]
        ])
      ]),
      h("div", Sf, [
        Tf,
        at(h("select", {
          "onUpdate:modelValue": t[9] || (t[9] = (l) => e.scrollVerticalOption = l)
        }, xf, 512), [
          [fd, e.scrollVerticalOption]
        ])
      ]),
      h("div", Mf, [
        Lf,
        at(h("input", {
          "onUpdate:modelValue": t[10] || (t[10] = (l) => e.scrollValue = l),
          type: "text"
        }, null, 512), [
          [
            xn,
            e.scrollValue,
            void 0,
            { number: !0 }
          ]
        ])
      ]),
      h("div", Kf, [
        h("div", Pf, [
          h("button", {
            onClick: t[11] || (t[11] = (...l) => e.handleScrollToNode && e.handleScrollToNode(...l))
          }, "滚动到此节点")
        ])
      ])
    ])
  ]);
}
const Pr = /* @__PURE__ */ qe(uf, [["render", Rf], ["__scopeId", "data-v-3ffef766"]]), jf = We({
  name: "InsertRenderTree",
  components: {
    CTree: Dn
  },
  setup() {
    const e = Nt([{}]), t = j(), n = (i) => qt(
      "div",
      {},
      [
        qt("input", { type: "text" }),
        qt("button", { onClick: o.bind(this, i) }, "Add sibling"),
        qt("button", { onClick: s.bind(this, i) }, "Add child"),
        qt("button", { onClick: r.bind(this, i) }, "Remove")
      ]
    ), o = (i) => {
      t.value.insertAfter({}, i.id);
    }, s = (i) => {
      t.value.append({}, i.id);
    }, r = (i) => {
      t.value.remove(i.id);
    };
    return {
      tree: t,
      treeData: e,
      renderTree: n
    };
  }
});
function Bf(e, t, n, o, s, r) {
  const i = Ge("CTree");
  return ie(), ut(i, {
    ref: "tree",
    data: e.treeData,
    render: e.renderTree
  }, null, 8, ["data", "render"]);
}
const Rr = /* @__PURE__ */ qe(jf, [["render", Bf]]), Hf = We({
  components: {
    Loading: xr,
    Search: Mr,
    Drop: Lr,
    Drag: Fr,
    // DropDataChange,
    Feature: Kr,
    Performance: Pr,
    InsertRenderTree: Rr
  },
  setup(e) {
    const n = Nt(Object.keys({
      Feature: Kr,
      Performance: Pr,
      Loading: xr,
      Search: Mr,
      // SearchRemote,
      // SearchRootRemote,
      Drop: Lr,
      // DropRemote,
      Drag: Fr,
      // DropDataChange,
      InsertRenderTree: Rr
    })), o = j(n[0]);
    return {
      tabList: n,
      currentTab: o
    };
  }
});
const Uf = { class: "app" }, Wf = { class: "tab" }, qf = ["onClick"], zf = { class: "tab-panel" };
function Yf(e, t, n, o, s, r) {
  return ie(), be("div", Uf, [
    h("div", Wf, [
      (ie(!0), be(Se, null, En(e.tabList, (i) => (ie(), be("button", {
        key: i,
        class: G({
          active: e.currentTab === i
        }),
        onClick: (l) => e.currentTab = i
      }, Ie(i), 11, qf))), 128))
    ]),
    h("div", zf, [
      (ie(), ut(Mi(e.currentTab)))
    ])
  ]);
}
const Jf = /* @__PURE__ */ qe(Hf, [["render", Yf], ["__scopeId", "data-v-dfb6fc6b"]]);
const Xf = vd(Jf);
Xf.mount("#app");
