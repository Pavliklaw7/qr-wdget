function Es(x, c) {
  for (var h = 0; h < c.length; h++) {
    const w = c[h];
    if (typeof w != "string" && !Array.isArray(w)) {
      for (const E in w)
        if (E !== "default" && !(E in x)) {
          const g = Object.getOwnPropertyDescriptor(w, E);
          g && Object.defineProperty(x, E, g.get ? g : {
            enumerable: !0,
            get: () => w[E]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(x, Symbol.toStringTag, { value: "Module" }));
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qn = globalThis, Br = Qn.ShadowRoot && (Qn.ShadyCSS === void 0 || Qn.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Pr = Symbol(), hi = /* @__PURE__ */ new WeakMap();
let vi = class {
  constructor(c, h, w) {
    if (this._$cssResult$ = !0, w !== Pr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = c, this.t = h;
  }
  get styleSheet() {
    let c = this.o;
    const h = this.t;
    if (Br && c === void 0) {
      const w = h !== void 0 && h.length === 1;
      w && (c = hi.get(h)), c === void 0 && ((this.o = c = new CSSStyleSheet()).replaceSync(this.cssText), w && hi.set(h, c));
    }
    return c;
  }
  toString() {
    return this.cssText;
  }
};
const Cs = (x) => new vi(typeof x == "string" ? x : x + "", void 0, Pr), Lr = (x, ...c) => {
  const h = x.length === 1 ? x[0] : c.reduce((w, E, g) => w + ((b) => {
    if (b._$cssResult$ === !0) return b.cssText;
    if (typeof b == "number") return b;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + b + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(E) + x[g + 1], x[0]);
  return new vi(h, x, Pr);
}, ps = (x, c) => {
  if (Br) x.adoptedStyleSheets = c.map((h) => h instanceof CSSStyleSheet ? h : h.styleSheet);
  else for (const h of c) {
    const w = document.createElement("style"), E = Qn.litNonce;
    E !== void 0 && w.setAttribute("nonce", E), w.textContent = h.cssText, x.appendChild(w);
  }
}, ui = Br ? (x) => x : (x) => x instanceof CSSStyleSheet ? ((c) => {
  let h = "";
  for (const w of c.cssRules) h += w.cssText;
  return Cs(h);
})(x) : x;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ms, defineProperty: Is, getOwnPropertyDescriptor: bs, getOwnPropertyNames: ys, getOwnPropertySymbols: _s, getPrototypeOf: Ss } = Object, kt = globalThis, fi = kt.trustedTypes, Ts = fi ? fi.emptyScript : "", Or = kt.reactiveElementPolyfillSupport, Rn = (x, c) => x, $n = { toAttribute(x, c) {
  switch (c) {
    case Boolean:
      x = x ? Ts : null;
      break;
    case Object:
    case Array:
      x = x == null ? x : JSON.stringify(x);
  }
  return x;
}, fromAttribute(x, c) {
  let h = x;
  switch (c) {
    case Boolean:
      h = x !== null;
      break;
    case Number:
      h = x === null ? null : Number(x);
      break;
    case Object:
    case Array:
      try {
        h = JSON.parse(x);
      } catch {
        h = null;
      }
  }
  return h;
} }, Fr = (x, c) => !ms(x, c), di = { attribute: !0, type: String, converter: $n, reflect: !1, useDefault: !1, hasChanged: Fr };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), kt.litPropertyMetadata ?? (kt.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let cn = class extends HTMLElement {
  static addInitializer(c) {
    this._$Ei(), (this.l ?? (this.l = [])).push(c);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(c, h = di) {
    if (h.state && (h.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(c) && ((h = Object.create(h)).wrapped = !0), this.elementProperties.set(c, h), !h.noAccessor) {
      const w = Symbol(), E = this.getPropertyDescriptor(c, w, h);
      E !== void 0 && Is(this.prototype, c, E);
    }
  }
  static getPropertyDescriptor(c, h, w) {
    const { get: E, set: g } = bs(this.prototype, c) ?? { get() {
      return this[h];
    }, set(b) {
      this[h] = b;
    } };
    return { get: E, set(b) {
      const M = E == null ? void 0 : E.call(this);
      g == null || g.call(this, b), this.requestUpdate(c, M, w);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(c) {
    return this.elementProperties.get(c) ?? di;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Rn("elementProperties"))) return;
    const c = Ss(this);
    c.finalize(), c.l !== void 0 && (this.l = [...c.l]), this.elementProperties = new Map(c.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Rn("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Rn("properties"))) {
      const h = this.properties, w = [...ys(h), ..._s(h)];
      for (const E of w) this.createProperty(E, h[E]);
    }
    const c = this[Symbol.metadata];
    if (c !== null) {
      const h = litPropertyMetadata.get(c);
      if (h !== void 0) for (const [w, E] of h) this.elementProperties.set(w, E);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [h, w] of this.elementProperties) {
      const E = this._$Eu(h, w);
      E !== void 0 && this._$Eh.set(E, h);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(c) {
    const h = [];
    if (Array.isArray(c)) {
      const w = new Set(c.flat(1 / 0).reverse());
      for (const E of w) h.unshift(ui(E));
    } else c !== void 0 && h.push(ui(c));
    return h;
  }
  static _$Eu(c, h) {
    const w = h.attribute;
    return w === !1 ? void 0 : typeof w == "string" ? w : typeof c == "string" ? c.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var c;
    this._$ES = new Promise((h) => this.enableUpdating = h), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (c = this.constructor.l) == null || c.forEach((h) => h(this));
  }
  addController(c) {
    var h;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(c), this.renderRoot !== void 0 && this.isConnected && ((h = c.hostConnected) == null || h.call(c));
  }
  removeController(c) {
    var h;
    (h = this._$EO) == null || h.delete(c);
  }
  _$E_() {
    const c = /* @__PURE__ */ new Map(), h = this.constructor.elementProperties;
    for (const w of h.keys()) this.hasOwnProperty(w) && (c.set(w, this[w]), delete this[w]);
    c.size > 0 && (this._$Ep = c);
  }
  createRenderRoot() {
    const c = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ps(c, this.constructor.elementStyles), c;
  }
  connectedCallback() {
    var c;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (c = this._$EO) == null || c.forEach((h) => {
      var w;
      return (w = h.hostConnected) == null ? void 0 : w.call(h);
    });
  }
  enableUpdating(c) {
  }
  disconnectedCallback() {
    var c;
    (c = this._$EO) == null || c.forEach((h) => {
      var w;
      return (w = h.hostDisconnected) == null ? void 0 : w.call(h);
    });
  }
  attributeChangedCallback(c, h, w) {
    this._$AK(c, w);
  }
  _$ET(c, h) {
    var g;
    const w = this.constructor.elementProperties.get(c), E = this.constructor._$Eu(c, w);
    if (E !== void 0 && w.reflect === !0) {
      const b = (((g = w.converter) == null ? void 0 : g.toAttribute) !== void 0 ? w.converter : $n).toAttribute(h, w.type);
      this._$Em = c, b == null ? this.removeAttribute(E) : this.setAttribute(E, b), this._$Em = null;
    }
  }
  _$AK(c, h) {
    var g, b;
    const w = this.constructor, E = w._$Eh.get(c);
    if (E !== void 0 && this._$Em !== E) {
      const M = w.getPropertyOptions(E), O = typeof M.converter == "function" ? { fromAttribute: M.converter } : ((g = M.converter) == null ? void 0 : g.fromAttribute) !== void 0 ? M.converter : $n;
      this._$Em = E, this[E] = O.fromAttribute(h, M.type) ?? ((b = this._$Ej) == null ? void 0 : b.get(E)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(c, h, w) {
    var E;
    if (c !== void 0) {
      const g = this.constructor, b = this[c];
      if (w ?? (w = g.getPropertyOptions(c)), !((w.hasChanged ?? Fr)(b, h) || w.useDefault && w.reflect && b === ((E = this._$Ej) == null ? void 0 : E.get(c)) && !this.hasAttribute(g._$Eu(c, w)))) return;
      this.C(c, h, w);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(c, h, { useDefault: w, reflect: E, wrapped: g }, b) {
    w && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(c) && (this._$Ej.set(c, b ?? h ?? this[c]), g !== !0 || b !== void 0) || (this._$AL.has(c) || (this.hasUpdated || w || (h = void 0), this._$AL.set(c, h)), E === !0 && this._$Em !== c && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(c));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (h) {
      Promise.reject(h);
    }
    const c = this.scheduleUpdate();
    return c != null && await c, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var w;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [g, b] of this._$Ep) this[g] = b;
        this._$Ep = void 0;
      }
      const E = this.constructor.elementProperties;
      if (E.size > 0) for (const [g, b] of E) {
        const { wrapped: M } = b, O = this[g];
        M !== !0 || this._$AL.has(g) || O === void 0 || this.C(g, void 0, b, O);
      }
    }
    let c = !1;
    const h = this._$AL;
    try {
      c = this.shouldUpdate(h), c ? (this.willUpdate(h), (w = this._$EO) == null || w.forEach((E) => {
        var g;
        return (g = E.hostUpdate) == null ? void 0 : g.call(E);
      }), this.update(h)) : this._$EM();
    } catch (E) {
      throw c = !1, this._$EM(), E;
    }
    c && this._$AE(h);
  }
  willUpdate(c) {
  }
  _$AE(c) {
    var h;
    (h = this._$EO) == null || h.forEach((w) => {
      var E;
      return (E = w.hostUpdated) == null ? void 0 : E.call(w);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(c)), this.updated(c);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(c) {
    return !0;
  }
  update(c) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((h) => this._$ET(h, this[h]))), this._$EM();
  }
  updated(c) {
  }
  firstUpdated(c) {
  }
};
cn.elementStyles = [], cn.shadowRootOptions = { mode: "open" }, cn[Rn("elementProperties")] = /* @__PURE__ */ new Map(), cn[Rn("finalized")] = /* @__PURE__ */ new Map(), Or == null || Or({ ReactiveElement: cn }), (kt.reactiveElementVersions ?? (kt.reactiveElementVersions = [])).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dn = globalThis, Jn = Dn.trustedTypes, xi = Jn ? Jn.createPolicy("lit-html", { createHTML: (x) => x }) : void 0, Bi = "$lit$", Ft = `lit$${Math.random().toFixed(9).slice(2)}$`, Pi = "?" + Ft, Ns = `<${Pi}>`, qt = document, vn = () => qt.createComment(""), Bn = (x) => x === null || typeof x != "object" && typeof x != "function", kr = Array.isArray, Os = (x) => kr(x) || typeof (x == null ? void 0 : x[Symbol.iterator]) == "function", Rr = `[ 	
\f\r]`, Nn = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, gi = /-->/g, wi = />/g, Yt = RegExp(`>|${Rr}(?:([^\\s"'>=/]+)(${Rr}*=${Rr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ai = /'/g, Ei = /"/g, Li = /^(?:script|style|textarea|title)$/i, Rs = (x) => (c, ...h) => ({ _$litType$: x, strings: c, values: h }), Mn = Rs(1), un = Symbol.for("lit-noChange"), Ge = Symbol.for("lit-nothing"), Ci = /* @__PURE__ */ new WeakMap(), Zt = qt.createTreeWalker(qt, 129);
function Fi(x, c) {
  if (!kr(x) || !x.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return xi !== void 0 ? xi.createHTML(c) : c;
}
const Ds = (x, c) => {
  const h = x.length - 1, w = [];
  let E, g = c === 2 ? "<svg>" : c === 3 ? "<math>" : "", b = Nn;
  for (let M = 0; M < h; M++) {
    const O = x[M];
    let m, v, R = -1, ne = 0;
    for (; ne < O.length && (b.lastIndex = ne, v = b.exec(O), v !== null); ) ne = b.lastIndex, b === Nn ? v[1] === "!--" ? b = gi : v[1] !== void 0 ? b = wi : v[2] !== void 0 ? (Li.test(v[2]) && (E = RegExp("</" + v[2], "g")), b = Yt) : v[3] !== void 0 && (b = Yt) : b === Yt ? v[0] === ">" ? (b = E ?? Nn, R = -1) : v[1] === void 0 ? R = -2 : (R = b.lastIndex - v[2].length, m = v[1], b = v[3] === void 0 ? Yt : v[3] === '"' ? Ei : Ai) : b === Ei || b === Ai ? b = Yt : b === gi || b === wi ? b = Nn : (b = Yt, E = void 0);
    const q = b === Yt && x[M + 1].startsWith("/>") ? " " : "";
    g += b === Nn ? O + Ns : R >= 0 ? (w.push(m), O.slice(0, R) + Bi + O.slice(R) + Ft + q) : O + Ft + (R === -2 ? M : q);
  }
  return [Fi(x, g + (x[h] || "<?>") + (c === 2 ? "</svg>" : c === 3 ? "</math>" : "")), w];
};
class Pn {
  constructor({ strings: c, _$litType$: h }, w) {
    let E;
    this.parts = [];
    let g = 0, b = 0;
    const M = c.length - 1, O = this.parts, [m, v] = Ds(c, h);
    if (this.el = Pn.createElement(m, w), Zt.currentNode = this.el.content, h === 2 || h === 3) {
      const R = this.el.content.firstChild;
      R.replaceWith(...R.childNodes);
    }
    for (; (E = Zt.nextNode()) !== null && O.length < M; ) {
      if (E.nodeType === 1) {
        if (E.hasAttributes()) for (const R of E.getAttributeNames()) if (R.endsWith(Bi)) {
          const ne = v[b++], q = E.getAttribute(R).split(Ft), Me = /([.?@])?(.*)/.exec(ne);
          O.push({ type: 1, index: g, name: Me[2], strings: q, ctor: Me[1] === "." ? vs : Me[1] === "?" ? Bs : Me[1] === "@" ? Ps : or }), E.removeAttribute(R);
        } else R.startsWith(Ft) && (O.push({ type: 6, index: g }), E.removeAttribute(R));
        if (Li.test(E.tagName)) {
          const R = E.textContent.split(Ft), ne = R.length - 1;
          if (ne > 0) {
            E.textContent = Jn ? Jn.emptyScript : "";
            for (let q = 0; q < ne; q++) E.append(R[q], vn()), Zt.nextNode(), O.push({ type: 2, index: ++g });
            E.append(R[ne], vn());
          }
        }
      } else if (E.nodeType === 8) if (E.data === Pi) O.push({ type: 2, index: g });
      else {
        let R = -1;
        for (; (R = E.data.indexOf(Ft, R + 1)) !== -1; ) O.push({ type: 7, index: g }), R += Ft.length - 1;
      }
      g++;
    }
  }
  static createElement(c, h) {
    const w = qt.createElement("template");
    return w.innerHTML = c, w;
  }
}
function fn(x, c, h = x, w) {
  var b, M;
  if (c === un) return c;
  let E = w !== void 0 ? (b = h._$Co) == null ? void 0 : b[w] : h._$Cl;
  const g = Bn(c) ? void 0 : c._$litDirective$;
  return (E == null ? void 0 : E.constructor) !== g && ((M = E == null ? void 0 : E._$AO) == null || M.call(E, !1), g === void 0 ? E = void 0 : (E = new g(x), E._$AT(x, h, w)), w !== void 0 ? (h._$Co ?? (h._$Co = []))[w] = E : h._$Cl = E), E !== void 0 && (c = fn(x, E._$AS(x, c.values), E, w)), c;
}
class Ms {
  constructor(c, h) {
    this._$AV = [], this._$AN = void 0, this._$AD = c, this._$AM = h;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(c) {
    const { el: { content: h }, parts: w } = this._$AD, E = ((c == null ? void 0 : c.creationScope) ?? qt).importNode(h, !0);
    Zt.currentNode = E;
    let g = Zt.nextNode(), b = 0, M = 0, O = w[0];
    for (; O !== void 0; ) {
      if (b === O.index) {
        let m;
        O.type === 2 ? m = new Ln(g, g.nextSibling, this, c) : O.type === 1 ? m = new O.ctor(g, O.name, O.strings, this, c) : O.type === 6 && (m = new Ls(g, this, c)), this._$AV.push(m), O = w[++M];
      }
      b !== (O == null ? void 0 : O.index) && (g = Zt.nextNode(), b++);
    }
    return Zt.currentNode = qt, E;
  }
  p(c) {
    let h = 0;
    for (const w of this._$AV) w !== void 0 && (w.strings !== void 0 ? (w._$AI(c, w, h), h += w.strings.length - 2) : w._$AI(c[h])), h++;
  }
}
class Ln {
  get _$AU() {
    var c;
    return ((c = this._$AM) == null ? void 0 : c._$AU) ?? this._$Cv;
  }
  constructor(c, h, w, E) {
    this.type = 2, this._$AH = Ge, this._$AN = void 0, this._$AA = c, this._$AB = h, this._$AM = w, this.options = E, this._$Cv = (E == null ? void 0 : E.isConnected) ?? !0;
  }
  get parentNode() {
    let c = this._$AA.parentNode;
    const h = this._$AM;
    return h !== void 0 && (c == null ? void 0 : c.nodeType) === 11 && (c = h.parentNode), c;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(c, h = this) {
    c = fn(this, c, h), Bn(c) ? c === Ge || c == null || c === "" ? (this._$AH !== Ge && this._$AR(), this._$AH = Ge) : c !== this._$AH && c !== un && this._(c) : c._$litType$ !== void 0 ? this.$(c) : c.nodeType !== void 0 ? this.T(c) : Os(c) ? this.k(c) : this._(c);
  }
  O(c) {
    return this._$AA.parentNode.insertBefore(c, this._$AB);
  }
  T(c) {
    this._$AH !== c && (this._$AR(), this._$AH = this.O(c));
  }
  _(c) {
    this._$AH !== Ge && Bn(this._$AH) ? this._$AA.nextSibling.data = c : this.T(qt.createTextNode(c)), this._$AH = c;
  }
  $(c) {
    var g;
    const { values: h, _$litType$: w } = c, E = typeof w == "number" ? this._$AC(c) : (w.el === void 0 && (w.el = Pn.createElement(Fi(w.h, w.h[0]), this.options)), w);
    if (((g = this._$AH) == null ? void 0 : g._$AD) === E) this._$AH.p(h);
    else {
      const b = new Ms(E, this), M = b.u(this.options);
      b.p(h), this.T(M), this._$AH = b;
    }
  }
  _$AC(c) {
    let h = Ci.get(c.strings);
    return h === void 0 && Ci.set(c.strings, h = new Pn(c)), h;
  }
  k(c) {
    kr(this._$AH) || (this._$AH = [], this._$AR());
    const h = this._$AH;
    let w, E = 0;
    for (const g of c) E === h.length ? h.push(w = new Ln(this.O(vn()), this.O(vn()), this, this.options)) : w = h[E], w._$AI(g), E++;
    E < h.length && (this._$AR(w && w._$AB.nextSibling, E), h.length = E);
  }
  _$AR(c = this._$AA.nextSibling, h) {
    var w;
    for ((w = this._$AP) == null ? void 0 : w.call(this, !1, !0, h); c && c !== this._$AB; ) {
      const E = c.nextSibling;
      c.remove(), c = E;
    }
  }
  setConnected(c) {
    var h;
    this._$AM === void 0 && (this._$Cv = c, (h = this._$AP) == null || h.call(this, c));
  }
}
class or {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(c, h, w, E, g) {
    this.type = 1, this._$AH = Ge, this._$AN = void 0, this.element = c, this.name = h, this._$AM = E, this.options = g, w.length > 2 || w[0] !== "" || w[1] !== "" ? (this._$AH = Array(w.length - 1).fill(new String()), this.strings = w) : this._$AH = Ge;
  }
  _$AI(c, h = this, w, E) {
    const g = this.strings;
    let b = !1;
    if (g === void 0) c = fn(this, c, h, 0), b = !Bn(c) || c !== this._$AH && c !== un, b && (this._$AH = c);
    else {
      const M = c;
      let O, m;
      for (c = g[0], O = 0; O < g.length - 1; O++) m = fn(this, M[w + O], h, O), m === un && (m = this._$AH[O]), b || (b = !Bn(m) || m !== this._$AH[O]), m === Ge ? c = Ge : c !== Ge && (c += (m ?? "") + g[O + 1]), this._$AH[O] = m;
    }
    b && !E && this.j(c);
  }
  j(c) {
    c === Ge ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, c ?? "");
  }
}
class vs extends or {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(c) {
    this.element[this.name] = c === Ge ? void 0 : c;
  }
}
class Bs extends or {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(c) {
    this.element.toggleAttribute(this.name, !!c && c !== Ge);
  }
}
class Ps extends or {
  constructor(c, h, w, E, g) {
    super(c, h, w, E, g), this.type = 5;
  }
  _$AI(c, h = this) {
    if ((c = fn(this, c, h, 0) ?? Ge) === un) return;
    const w = this._$AH, E = c === Ge && w !== Ge || c.capture !== w.capture || c.once !== w.once || c.passive !== w.passive, g = c !== Ge && (w === Ge || E);
    E && this.element.removeEventListener(this.name, this, w), g && this.element.addEventListener(this.name, this, c), this._$AH = c;
  }
  handleEvent(c) {
    var h;
    typeof this._$AH == "function" ? this._$AH.call(((h = this.options) == null ? void 0 : h.host) ?? this.element, c) : this._$AH.handleEvent(c);
  }
}
class Ls {
  constructor(c, h, w) {
    this.element = c, this.type = 6, this._$AN = void 0, this._$AM = h, this.options = w;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(c) {
    fn(this, c);
  }
}
const Dr = Dn.litHtmlPolyfillSupport;
Dr == null || Dr(Pn, Ln), (Dn.litHtmlVersions ?? (Dn.litHtmlVersions = [])).push("3.3.0");
const Fs = (x, c, h) => {
  const w = (h == null ? void 0 : h.renderBefore) ?? c;
  let E = w._$litPart$;
  if (E === void 0) {
    const g = (h == null ? void 0 : h.renderBefore) ?? null;
    w._$litPart$ = E = new Ln(c.insertBefore(vn(), g), g, void 0, h ?? {});
  }
  return E._$AI(x), E;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt = globalThis;
class Kt extends cn {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var h;
    const c = super.createRenderRoot();
    return (h = this.renderOptions).renderBefore ?? (h.renderBefore = c.firstChild), c;
  }
  update(c) {
    const h = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(c), this._$Do = Fs(h, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var c;
    super.connectedCallback(), (c = this._$Do) == null || c.setConnected(!0);
  }
  disconnectedCallback() {
    var c;
    super.disconnectedCallback(), (c = this._$Do) == null || c.setConnected(!1);
  }
  render() {
    return un;
  }
}
var Mi;
Kt._$litElement$ = !0, Kt.finalized = !0, (Mi = jt.litElementHydrateSupport) == null || Mi.call(jt, { LitElement: Kt });
const Mr = jt.litElementPolyfillSupport;
Mr == null || Mr({ LitElement: Kt });
(jt.litElementVersions ?? (jt.litElementVersions = [])).push("4.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ks = { attribute: !0, type: String, converter: $n, reflect: !1, hasChanged: Fr }, Us = (x = ks, c, h) => {
  const { kind: w, metadata: E } = h;
  let g = globalThis.litPropertyMetadata.get(E);
  if (g === void 0 && globalThis.litPropertyMetadata.set(E, g = /* @__PURE__ */ new Map()), w === "setter" && ((x = Object.create(x)).wrapped = !0), g.set(h.name, x), w === "accessor") {
    const { name: b } = h;
    return { set(M) {
      const O = c.get.call(this);
      c.set.call(this, M), this.requestUpdate(b, O, x);
    }, init(M) {
      return M !== void 0 && this.C(b, void 0, x, M), M;
    } };
  }
  if (w === "setter") {
    const { name: b } = h;
    return function(M) {
      const O = this[b];
      c.call(this, M), this.requestUpdate(b, O, x);
    };
  }
  throw Error("Unsupported decorator location: " + w);
};
function Ur(x) {
  return (c, h) => typeof h == "object" ? Us(x, c, h) : ((w, E, g) => {
    const b = E.hasOwnProperty(g);
    return E.constructor.createProperty(g, w), b ? Object.getOwnPropertyDescriptor(E, g) : void 0;
  })(x, c, h);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function dn(x) {
  return Ur({ ...x, state: !0, attribute: !1 });
}
var G;
(function(x) {
  x[x.QR_CODE = 0] = "QR_CODE", x[x.AZTEC = 1] = "AZTEC", x[x.CODABAR = 2] = "CODABAR", x[x.CODE_39 = 3] = "CODE_39", x[x.CODE_93 = 4] = "CODE_93", x[x.CODE_128 = 5] = "CODE_128", x[x.DATA_MATRIX = 6] = "DATA_MATRIX", x[x.MAXICODE = 7] = "MAXICODE", x[x.ITF = 8] = "ITF", x[x.EAN_13 = 9] = "EAN_13", x[x.EAN_8 = 10] = "EAN_8", x[x.PDF_417 = 11] = "PDF_417", x[x.RSS_14 = 12] = "RSS_14", x[x.RSS_EXPANDED = 13] = "RSS_EXPANDED", x[x.UPC_A = 14] = "UPC_A", x[x.UPC_E = 15] = "UPC_E", x[x.UPC_EAN_EXTENSION = 16] = "UPC_EAN_EXTENSION";
})(G || (G = {}));
var pi = /* @__PURE__ */ new Map([
  [G.QR_CODE, "QR_CODE"],
  [G.AZTEC, "AZTEC"],
  [G.CODABAR, "CODABAR"],
  [G.CODE_39, "CODE_39"],
  [G.CODE_93, "CODE_93"],
  [G.CODE_128, "CODE_128"],
  [G.DATA_MATRIX, "DATA_MATRIX"],
  [G.MAXICODE, "MAXICODE"],
  [G.ITF, "ITF"],
  [G.EAN_13, "EAN_13"],
  [G.EAN_8, "EAN_8"],
  [G.PDF_417, "PDF_417"],
  [G.RSS_14, "RSS_14"],
  [G.RSS_EXPANDED, "RSS_EXPANDED"],
  [G.UPC_A, "UPC_A"],
  [G.UPC_E, "UPC_E"],
  [G.UPC_EAN_EXTENSION, "UPC_EAN_EXTENSION"]
]), mi;
(function(x) {
  x[x.UNKNOWN = 0] = "UNKNOWN", x[x.URL = 1] = "URL";
})(mi || (mi = {}));
function Vs(x) {
  return Object.values(G).includes(x);
}
var er;
(function(x) {
  x[x.SCAN_TYPE_CAMERA = 0] = "SCAN_TYPE_CAMERA", x[x.SCAN_TYPE_FILE = 1] = "SCAN_TYPE_FILE";
})(er || (er = {}));
var Hs = function() {
  function x() {
  }
  return x.GITHUB_PROJECT_URL = "https://github.com/mebjas/html5-qrcode", x.SCAN_DEFAULT_FPS = 2, x.DEFAULT_DISABLE_FLIP = !1, x.DEFAULT_REMEMBER_LAST_CAMERA_USED = !0, x.DEFAULT_SUPPORTED_SCAN_TYPE = [
    er.SCAN_TYPE_CAMERA,
    er.SCAN_TYPE_FILE
  ], x;
}(), ki = function() {
  function x(c, h) {
    this.format = c, this.formatName = h;
  }
  return x.prototype.toString = function() {
    return this.formatName;
  }, x.create = function(c) {
    if (!pi.has(c))
      throw "".concat(c, " not in html5QrcodeSupportedFormatsTextMap");
    return new x(c, pi.get(c));
  }, x;
}(), Ii = function() {
  function x() {
  }
  return x.createFromText = function(c) {
    var h = {
      text: c
    };
    return {
      decodedText: c,
      result: h
    };
  }, x.createFromQrcodeResult = function(c) {
    return {
      decodedText: c.text,
      result: c
    };
  }, x;
}(), vr;
(function(x) {
  x[x.UNKWOWN_ERROR = 0] = "UNKWOWN_ERROR", x[x.IMPLEMENTATION_ERROR = 1] = "IMPLEMENTATION_ERROR", x[x.NO_CODE_FOUND_ERROR = 2] = "NO_CODE_FOUND_ERROR";
})(vr || (vr = {}));
var Gs = function() {
  function x() {
  }
  return x.createFrom = function(c) {
    return {
      errorMessage: c,
      type: vr.UNKWOWN_ERROR
    };
  }, x;
}(), Ws = function() {
  function x(c) {
    this.verbose = c;
  }
  return x.prototype.log = function(c) {
    this.verbose && console.log(c);
  }, x.prototype.warn = function(c) {
    this.verbose && console.warn(c);
  }, x.prototype.logError = function(c, h) {
    (this.verbose || h === !0) && console.error(c);
  }, x.prototype.logErrors = function(c) {
    if (c.length === 0)
      throw "Logger#logError called without arguments";
    this.verbose && console.error(c);
  }, x;
}();
function yt(x) {
  return typeof x > "u" || x === null;
}
var hn = function() {
  function x() {
  }
  return x.codeParseError = function(c) {
    return "QR code parse error, error = ".concat(c);
  }, x.errorGettingUserMedia = function(c) {
    return "Error getting userMedia, error = ".concat(c);
  }, x.onlyDeviceSupportedError = function() {
    return "The device doesn't support navigator.mediaDevices , only supported cameraIdOrConfig in this case is deviceId parameter (string).";
  }, x.cameraStreamingNotSupported = function() {
    return "Camera streaming not supported by the browser.";
  }, x.unableToQuerySupportedDevices = function() {
    return "Unable to query supported devices, unknown error.";
  }, x.insecureContextCameraQueryError = function() {
    return "Camera access is only supported in secure context like https or localhost.";
  }, x.scannerPaused = function() {
    return "Scanner paused";
  }, x;
}(), Ui = function() {
  function x() {
  }
  return x.isMediaStreamConstraintsValid = function(c, h) {
    if (typeof c != "object") {
      var w = typeof c;
      return h.logError("videoConstraints should be of type object, the " + "object passed is of type ".concat(w, "."), !0), !1;
    }
    for (var E = [
      "autoGainControl",
      "channelCount",
      "echoCancellation",
      "latency",
      "noiseSuppression",
      "sampleRate",
      "sampleSize",
      "volume"
    ], g = new Set(E), b = Object.keys(c), M = 0, O = b; M < O.length; M++) {
      var m = O[M];
      if (g.has(m))
        return h.logError("".concat(m, " is not supported videoConstaints."), !0), !1;
    }
    return !0;
  }, x;
}(), qn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Xs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x.default : x;
}
var On = { exports: {} }, zs = On.exports, bi;
function Ys() {
  return bi || (bi = 1, function(x, c) {
    (function(h, w) {
      w(c);
    })(zs, function(h) {
      function w(f) {
        return f == null;
      }
      var E = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(f, e) {
        f.__proto__ = e;
      } || function(f, e) {
        for (var t in e) e.hasOwnProperty(t) && (f[t] = e[t]);
      };
      function g(f, e) {
        E(f, e);
        function t() {
          this.constructor = f;
        }
        f.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
      }
      function b(f, e) {
        var t = Object.setPrototypeOf;
        t ? t(f, e) : f.__proto__ = e;
      }
      function M(f, e) {
        e === void 0 && (e = f.constructor);
        var t = Error.captureStackTrace;
        t && t(f, e);
      }
      var O = function(f) {
        g(e, f);
        function e(t) {
          var n = this.constructor, r = f.call(this, t) || this;
          return Object.defineProperty(r, "name", {
            value: n.name,
            enumerable: !1
          }), b(r, n.prototype), M(r), r;
        }
        return e;
      }(Error);
      class m extends O {
        /**
         * Allows Exception to be constructed directly
         * with some message and prototype definition.
         */
        constructor(e = void 0) {
          super(e), this.message = e;
        }
        getKind() {
          return this.constructor.kind;
        }
      }
      m.kind = "Exception";
      class v extends m {
      }
      v.kind = "ArgumentException";
      class R extends m {
      }
      R.kind = "IllegalArgumentException";
      class ne {
        constructor(e) {
          if (this.binarizer = e, e === null)
            throw new R("Binarizer must be non-null.");
        }
        /**
         * @return The width of the bitmap.
         */
        getWidth() {
          return this.binarizer.getWidth();
        }
        /**
         * @return The height of the bitmap.
         */
        getHeight() {
          return this.binarizer.getHeight();
        }
        /**
         * Converts one row of luminance data to 1 bit data. May actually do the conversion, or return
         * cached data. Callers should assume this method is expensive and call it as seldom as possible.
         * This method is intended for decoding 1D barcodes and may choose to apply sharpening.
         *
         * @param y The row to fetch, which must be in [0, bitmap height)
         * @param row An optional preallocated array. If null or too small, it will be ignored.
         *            If used, the Binarizer will call BitArray.clear(). Always use the returned object.
         * @return The array of bits for this row (true means black).
         * @throws NotFoundException if row can't be binarized
         */
        getBlackRow(e, t) {
          return this.binarizer.getBlackRow(e, t);
        }
        /**
         * Converts a 2D array of luminance data to 1 bit. As above, assume this method is expensive
         * and do not call it repeatedly. This method is intended for decoding 2D barcodes and may or
         * may not apply sharpening. Therefore, a row from this matrix may not be identical to one
         * fetched using getBlackRow(), so don't mix and match between them.
         *
         * @return The 2D array of bits for the image (true means black).
         * @throws NotFoundException if image can't be binarized to make a matrix
         */
        getBlackMatrix() {
          return (this.matrix === null || this.matrix === void 0) && (this.matrix = this.binarizer.getBlackMatrix()), this.matrix;
        }
        /**
         * @return Whether this bitmap can be cropped.
         */
        isCropSupported() {
          return this.binarizer.getLuminanceSource().isCropSupported();
        }
        /**
         * Returns a new object with cropped image data. Implementations may keep a reference to the
         * original data rather than a copy. Only callable if isCropSupported() is true.
         *
         * @param left The left coordinate, which must be in [0,getWidth())
         * @param top The top coordinate, which must be in [0,getHeight())
         * @param width The width of the rectangle to crop.
         * @param height The height of the rectangle to crop.
         * @return A cropped version of this object.
         */
        crop(e, t, n, r) {
          const i = this.binarizer.getLuminanceSource().crop(e, t, n, r);
          return new ne(this.binarizer.createBinarizer(i));
        }
        /**
         * @return Whether this bitmap supports counter-clockwise rotation.
         */
        isRotateSupported() {
          return this.binarizer.getLuminanceSource().isRotateSupported();
        }
        /**
         * Returns a new object with rotated image data by 90 degrees counterclockwise.
         * Only callable if {@link #isRotateSupported()} is true.
         *
         * @return A rotated version of this object.
         */
        rotateCounterClockwise() {
          const e = this.binarizer.getLuminanceSource().rotateCounterClockwise();
          return new ne(this.binarizer.createBinarizer(e));
        }
        /**
         * Returns a new object with rotated image data by 45 degrees counterclockwise.
         * Only callable if {@link #isRotateSupported()} is true.
         *
         * @return A rotated version of this object.
         */
        rotateCounterClockwise45() {
          const e = this.binarizer.getLuminanceSource().rotateCounterClockwise45();
          return new ne(this.binarizer.createBinarizer(e));
        }
        /*@Override*/
        toString() {
          try {
            return this.getBlackMatrix().toString();
          } catch {
            return "";
          }
        }
      }
      class q extends m {
        static getChecksumInstance() {
          return new q();
        }
      }
      q.kind = "ChecksumException";
      class Me {
        constructor(e) {
          this.source = e;
        }
        getLuminanceSource() {
          return this.source;
        }
        getWidth() {
          return this.source.getWidth();
        }
        getHeight() {
          return this.source.getHeight();
        }
      }
      class ie {
        // public static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length)
        /**
         * Makes a copy of a array.
         */
        static arraycopy(e, t, n, r, i) {
          for (; i--; )
            n[r++] = e[t++];
        }
        /**
         * Returns the current time in milliseconds.
         */
        static currentTimeMillis() {
          return Date.now();
        }
      }
      class gt extends m {
      }
      gt.kind = "IndexOutOfBoundsException";
      class St extends gt {
        constructor(e = void 0, t = void 0) {
          super(t), this.index = e, this.message = t;
        }
      }
      St.kind = "ArrayIndexOutOfBoundsException";
      class pe {
        /**
         * Assigns the specified int value to each element of the specified array
         * of ints.
         *
         * @param a the array to be filled
         * @param val the value to be stored in all elements of the array
         */
        static fill(e, t) {
          for (let n = 0, r = e.length; n < r; n++)
            e[n] = t;
        }
        /**
         * Assigns the specified int value to each element of the specified
         * range of the specified array of ints.  The range to be filled
         * extends from index {@code fromIndex}, inclusive, to index
         * {@code toIndex}, exclusive.  (If {@code fromIndex==toIndex}, the
         * range to be filled is empty.)
         *
         * @param a the array to be filled
         * @param fromIndex the index of the first element (inclusive) to be
         *        filled with the specified value
         * @param toIndex the index of the last element (exclusive) to be
         *        filled with the specified value
         * @param val the value to be stored in all elements of the array
         * @throws IllegalArgumentException if {@code fromIndex > toIndex}
         * @throws ArrayIndexOutOfBoundsException if {@code fromIndex < 0} or
         *         {@code toIndex > a.length}
         */
        static fillWithin(e, t, n, r) {
          pe.rangeCheck(e.length, t, n);
          for (let i = t; i < n; i++)
            e[i] = r;
        }
        /**
         * Checks that {@code fromIndex} and {@code toIndex} are in
         * the range and throws an exception if they aren't.
         */
        static rangeCheck(e, t, n) {
          if (t > n)
            throw new R("fromIndex(" + t + ") > toIndex(" + n + ")");
          if (t < 0)
            throw new St(t);
          if (n > e)
            throw new St(n);
        }
        static asList(...e) {
          return e;
        }
        static create(e, t, n) {
          return Array.from({ length: e }).map((i) => Array.from({ length: t }).fill(n));
        }
        static createInt32Array(e, t, n) {
          return Array.from({ length: e }).map((i) => Int32Array.from({ length: t }).fill(n));
        }
        static equals(e, t) {
          if (!e || !t || !e.length || !t.length || e.length !== t.length)
            return !1;
          for (let n = 0, r = e.length; n < r; n++)
            if (e[n] !== t[n])
              return !1;
          return !0;
        }
        static hashCode(e) {
          if (e === null)
            return 0;
          let t = 1;
          for (const n of e)
            t = 31 * t + n;
          return t;
        }
        static fillUint8Array(e, t) {
          for (let n = 0; n !== e.length; n++)
            e[n] = t;
        }
        static copyOf(e, t) {
          return e.slice(0, t);
        }
        static copyOfUint8Array(e, t) {
          if (e.length <= t) {
            const n = new Uint8Array(t);
            return n.set(e), n;
          }
          return e.slice(0, t);
        }
        static copyOfRange(e, t, n) {
          const r = n - t, i = new Int32Array(r);
          return ie.arraycopy(e, t, i, 0, r), i;
        }
        /*
        * Returns the index of of the element in a sorted array or (-n-1) where n is the insertion point
        * for the new element.
        * Parameters:
        *     ar - A sorted array
        *     el - An element to search for
        *     comparator - A comparator function. The function takes two arguments: (a, b) and returns:
        *        a negative number  if a is less than b;
        *        0 if a is equal to b;
        *        a positive number of a is greater than b.
        * The array may contain duplicate elements. If there are more than one equal elements in the array,
        * the returned value can be the index of any one of the equal elements.
        *
        * http://jsfiddle.net/aryzhov/pkfst550/
        */
        static binarySearch(e, t, n) {
          n === void 0 && (n = pe.numberComparator);
          let r = 0, i = e.length - 1;
          for (; r <= i; ) {
            const s = i + r >> 1, o = n(t, e[s]);
            if (o > 0)
              r = s + 1;
            else if (o < 0)
              i = s - 1;
            else
              return s;
          }
          return -r - 1;
        }
        static numberComparator(e, t) {
          return e - t;
        }
      }
      class K {
        static numberOfTrailingZeros(e) {
          let t;
          if (e === 0)
            return 32;
          let n = 31;
          return t = e << 16, t !== 0 && (n -= 16, e = t), t = e << 8, t !== 0 && (n -= 8, e = t), t = e << 4, t !== 0 && (n -= 4, e = t), t = e << 2, t !== 0 && (n -= 2, e = t), n - (e << 1 >>> 31);
        }
        static numberOfLeadingZeros(e) {
          if (e === 0)
            return 32;
          let t = 1;
          return e >>> 16 || (t += 16, e <<= 16), e >>> 24 || (t += 8, e <<= 8), e >>> 28 || (t += 4, e <<= 4), e >>> 30 || (t += 2, e <<= 2), t -= e >>> 31, t;
        }
        static toHexString(e) {
          return e.toString(16);
        }
        static toBinaryString(e) {
          return String(parseInt(String(e), 2));
        }
        // Returns the number of one-bits in the two's complement binary representation of the specified int value. This function is sometimes referred to as the population count.
        // Returns:
        // the number of one-bits in the two's complement binary representation of the specified int value.
        static bitCount(e) {
          return e = e - (e >>> 1 & 1431655765), e = (e & 858993459) + (e >>> 2 & 858993459), e = e + (e >>> 4) & 252645135, e = e + (e >>> 8), e = e + (e >>> 16), e & 63;
        }
        static truncDivision(e, t) {
          return Math.trunc(e / t);
        }
        /**
         * Converts A string to an integer.
         * @param s A string to convert into a number.
         * @param radix A value between 2 and 36 that specifies the base of the number in numString. If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal. All other strings are considered decimal.
         */
        static parseInt(e, t = void 0) {
          return parseInt(e, t);
        }
      }
      K.MIN_VALUE_32_BITS = -2147483648, K.MAX_VALUE = Number.MAX_SAFE_INTEGER;
      class le {
        // For testing only
        constructor(e, t) {
          e === void 0 ? (this.size = 0, this.bits = new Int32Array(1)) : (this.size = e, t == null ? this.bits = le.makeArray(e) : this.bits = t);
        }
        getSize() {
          return this.size;
        }
        getSizeInBytes() {
          return Math.floor((this.size + 7) / 8);
        }
        ensureCapacity(e) {
          if (e > this.bits.length * 32) {
            const t = le.makeArray(e);
            ie.arraycopy(this.bits, 0, t, 0, this.bits.length), this.bits = t;
          }
        }
        /**
         * @param i bit to get
         * @return true iff bit i is set
         */
        get(e) {
          return (this.bits[Math.floor(e / 32)] & 1 << (e & 31)) !== 0;
        }
        /**
         * Sets bit i.
         *
         * @param i bit to set
         */
        set(e) {
          this.bits[Math.floor(e / 32)] |= 1 << (e & 31);
        }
        /**
         * Flips bit i.
         *
         * @param i bit to set
         */
        flip(e) {
          this.bits[Math.floor(e / 32)] ^= 1 << (e & 31);
        }
        /**
         * @param from first bit to check
         * @return index of first bit that is set, starting from the given index, or size if none are set
         *  at or beyond this given index
         * @see #getNextUnset(int)
         */
        getNextSet(e) {
          const t = this.size;
          if (e >= t)
            return t;
          const n = this.bits;
          let r = Math.floor(e / 32), i = n[r];
          i &= ~((1 << (e & 31)) - 1);
          const s = n.length;
          for (; i === 0; ) {
            if (++r === s)
              return t;
            i = n[r];
          }
          const o = r * 32 + K.numberOfTrailingZeros(i);
          return o > t ? t : o;
        }
        /**
         * @param from index to start looking for unset bit
         * @return index of next unset bit, or {@code size} if none are unset until the end
         * @see #getNextSet(int)
         */
        getNextUnset(e) {
          const t = this.size;
          if (e >= t)
            return t;
          const n = this.bits;
          let r = Math.floor(e / 32), i = ~n[r];
          i &= ~((1 << (e & 31)) - 1);
          const s = n.length;
          for (; i === 0; ) {
            if (++r === s)
              return t;
            i = ~n[r];
          }
          const o = r * 32 + K.numberOfTrailingZeros(i);
          return o > t ? t : o;
        }
        /**
         * Sets a block of 32 bits, starting at bit i.
         *
         * @param i first bit to set
         * @param newBits the new value of the next 32 bits. Note again that the least-significant bit
         * corresponds to bit i, the next-least-significant to i+1, and so on.
         */
        setBulk(e, t) {
          this.bits[Math.floor(e / 32)] = t;
        }
        /**
         * Sets a range of bits.
         *
         * @param start start of range, inclusive.
         * @param end end of range, exclusive
         */
        setRange(e, t) {
          if (t < e || e < 0 || t > this.size)
            throw new R();
          if (t === e)
            return;
          t--;
          const n = Math.floor(e / 32), r = Math.floor(t / 32), i = this.bits;
          for (let s = n; s <= r; s++) {
            const o = s > n ? 0 : e & 31, l = (2 << (s < r ? 31 : t & 31)) - (1 << o);
            i[s] |= l;
          }
        }
        /**
         * Clears all bits (sets to false).
         */
        clear() {
          const e = this.bits.length, t = this.bits;
          for (let n = 0; n < e; n++)
            t[n] = 0;
        }
        /**
         * Efficient method to check if a range of bits is set, or not set.
         *
         * @param start start of range, inclusive.
         * @param end end of range, exclusive
         * @param value if true, checks that bits in range are set, otherwise checks that they are not set
         * 
         * @return true iff all bits are set or not set in range, according to value argument
         * @throws IllegalArgumentException if end is less than start or the range is not contained in the array
         */
        isRange(e, t, n) {
          if (t < e || e < 0 || t > this.size)
            throw new R();
          if (t === e)
            return !0;
          t--;
          const r = Math.floor(e / 32), i = Math.floor(t / 32), s = this.bits;
          for (let o = r; o <= i; o++) {
            const a = o > r ? 0 : e & 31, u = (2 << (o < i ? 31 : t & 31)) - (1 << a) & 4294967295;
            if ((s[o] & u) !== (n ? u : 0))
              return !1;
          }
          return !0;
        }
        appendBit(e) {
          this.ensureCapacity(this.size + 1), e && (this.bits[Math.floor(this.size / 32)] |= 1 << (this.size & 31)), this.size++;
        }
        /**
         * Appends the least-significant bits, from value, in order from most-significant to
         * least-significant. For example, appending 6 bits from 0x000001E will append the bits
         * 0, 1, 1, 1, 1, 0 in that order.
         *
         * @param value {@code int} containing bits to append
         * @param numBits bits from value to append
         */
        appendBits(e, t) {
          if (t < 0 || t > 32)
            throw new R("Num bits must be between 0 and 32");
          this.ensureCapacity(this.size + t);
          for (let n = t; n > 0; n--)
            this.appendBit((e >> n - 1 & 1) === 1);
        }
        appendBitArray(e) {
          const t = e.size;
          this.ensureCapacity(this.size + t);
          for (let n = 0; n < t; n++)
            this.appendBit(e.get(n));
        }
        xor(e) {
          if (this.size !== e.size)
            throw new R("Sizes don't match");
          const t = this.bits;
          for (let n = 0, r = t.length; n < r; n++)
            t[n] ^= e.bits[n];
        }
        /**
         *
         * @param bitOffset first bit to start writing
         * @param array array to write into. Bytes are written most-significant byte first. This is the opposite
         *  of the internal representation, which is exposed by {@link #getBitArray()}
         * @param offset position in array to start writing
         * @param numBytes how many bytes to write
         */
        toBytes(e, t, n, r) {
          for (let i = 0; i < r; i++) {
            let s = 0;
            for (let o = 0; o < 8; o++)
              this.get(e) && (s |= 1 << 7 - o), e++;
            t[n + i] = /*(byte)*/
            s;
          }
        }
        /**
         * @return underlying array of ints. The first element holds the first 32 bits, and the least
         *         significant bit is bit 0.
         */
        getBitArray() {
          return this.bits;
        }
        /**
         * Reverses all bits in the array.
         */
        reverse() {
          const e = new Int32Array(this.bits.length), t = Math.floor((this.size - 1) / 32), n = t + 1, r = this.bits;
          for (let i = 0; i < n; i++) {
            let s = r[i];
            s = s >> 1 & 1431655765 | (s & 1431655765) << 1, s = s >> 2 & 858993459 | (s & 858993459) << 2, s = s >> 4 & 252645135 | (s & 252645135) << 4, s = s >> 8 & 16711935 | (s & 16711935) << 8, s = s >> 16 & 65535 | (s & 65535) << 16, e[t - i] = /*(int)*/
            s;
          }
          if (this.size !== n * 32) {
            const i = n * 32 - this.size;
            let s = e[0] >>> i;
            for (let o = 1; o < n; o++) {
              const a = e[o];
              s |= a << 32 - i, e[o - 1] = s, s = a >>> i;
            }
            e[n - 1] = s;
          }
          this.bits = e;
        }
        static makeArray(e) {
          return new Int32Array(Math.floor((e + 31) / 32));
        }
        /*@Override*/
        equals(e) {
          if (!(e instanceof le))
            return !1;
          const t = e;
          return this.size === t.size && pe.equals(this.bits, t.bits);
        }
        /*@Override*/
        hashCode() {
          return 31 * this.size + pe.hashCode(this.bits);
        }
        /*@Override*/
        toString() {
          let e = "";
          for (let t = 0, n = this.size; t < n; t++)
            (t & 7) === 0 && (e += " "), e += this.get(t) ? "X" : ".";
          return e;
        }
        /*@Override*/
        clone() {
          return new le(this.size, this.bits.slice());
        }
      }
      var Tt;
      (function(f) {
        f[f.OTHER = 0] = "OTHER", f[f.PURE_BARCODE = 1] = "PURE_BARCODE", f[f.POSSIBLE_FORMATS = 2] = "POSSIBLE_FORMATS", f[f.TRY_HARDER = 3] = "TRY_HARDER", f[f.CHARACTER_SET = 4] = "CHARACTER_SET", f[f.ALLOWED_LENGTHS = 5] = "ALLOWED_LENGTHS", f[f.ASSUME_CODE_39_CHECK_DIGIT = 6] = "ASSUME_CODE_39_CHECK_DIGIT", f[f.ASSUME_GS1 = 7] = "ASSUME_GS1", f[f.RETURN_CODABAR_START_END = 8] = "RETURN_CODABAR_START_END", f[f.NEED_RESULT_POINT_CALLBACK = 9] = "NEED_RESULT_POINT_CALLBACK", f[f.ALLOWED_EAN_EXTENSIONS = 10] = "ALLOWED_EAN_EXTENSIONS";
      })(Tt || (Tt = {}));
      var xe = Tt;
      class U extends m {
        static getFormatInstance() {
          return new U();
        }
      }
      U.kind = "FormatException";
      var de;
      (function(f) {
        f[f.Cp437 = 0] = "Cp437", f[f.ISO8859_1 = 1] = "ISO8859_1", f[f.ISO8859_2 = 2] = "ISO8859_2", f[f.ISO8859_3 = 3] = "ISO8859_3", f[f.ISO8859_4 = 4] = "ISO8859_4", f[f.ISO8859_5 = 5] = "ISO8859_5", f[f.ISO8859_6 = 6] = "ISO8859_6", f[f.ISO8859_7 = 7] = "ISO8859_7", f[f.ISO8859_8 = 8] = "ISO8859_8", f[f.ISO8859_9 = 9] = "ISO8859_9", f[f.ISO8859_10 = 10] = "ISO8859_10", f[f.ISO8859_11 = 11] = "ISO8859_11", f[f.ISO8859_13 = 12] = "ISO8859_13", f[f.ISO8859_14 = 13] = "ISO8859_14", f[f.ISO8859_15 = 14] = "ISO8859_15", f[f.ISO8859_16 = 15] = "ISO8859_16", f[f.SJIS = 16] = "SJIS", f[f.Cp1250 = 17] = "Cp1250", f[f.Cp1251 = 18] = "Cp1251", f[f.Cp1252 = 19] = "Cp1252", f[f.Cp1256 = 20] = "Cp1256", f[f.UnicodeBigUnmarked = 21] = "UnicodeBigUnmarked", f[f.UTF8 = 22] = "UTF8", f[f.ASCII = 23] = "ASCII", f[f.Big5 = 24] = "Big5", f[f.GB18030 = 25] = "GB18030", f[f.EUC_KR = 26] = "EUC_KR";
      })(de || (de = {}));
      class k {
        constructor(e, t, n, ...r) {
          this.valueIdentifier = e, this.name = n, typeof t == "number" ? this.values = Int32Array.from([t]) : this.values = t, this.otherEncodingNames = r, k.VALUE_IDENTIFIER_TO_ECI.set(e, this), k.NAME_TO_ECI.set(n, this);
          const i = this.values;
          for (let s = 0, o = i.length; s !== o; s++) {
            const a = i[s];
            k.VALUES_TO_ECI.set(a, this);
          }
          for (const s of r)
            k.NAME_TO_ECI.set(s, this);
        }
        // CharacterSetECI(value: number /*int*/) {
        //   this(new Int32Array {value})
        // }
        // CharacterSetECI(value: number /*int*/, String... otherEncodingNames) {
        //   this.values = new Int32Array {value}
        //   this.otherEncodingNames = otherEncodingNames
        // }
        // CharacterSetECI(values: Int32Array, String... otherEncodingNames) {
        //   this.values = values
        //   this.otherEncodingNames = otherEncodingNames
        // }
        getValueIdentifier() {
          return this.valueIdentifier;
        }
        getName() {
          return this.name;
        }
        getValue() {
          return this.values[0];
        }
        /**
         * @param value character set ECI value
         * @return {@code CharacterSetECI} representing ECI of given value, or null if it is legal but
         *   unsupported
         * @throws FormatException if ECI value is invalid
         */
        static getCharacterSetECIByValue(e) {
          if (e < 0 || e >= 900)
            throw new U("incorect value");
          const t = k.VALUES_TO_ECI.get(e);
          if (t === void 0)
            throw new U("incorect value");
          return t;
        }
        /**
         * @param name character set ECI encoding name
         * @return CharacterSetECI representing ECI for character encoding, or null if it is legal
         *   but unsupported
         */
        static getCharacterSetECIByName(e) {
          const t = k.NAME_TO_ECI.get(e);
          if (t === void 0)
            throw new U("incorect value");
          return t;
        }
        equals(e) {
          if (!(e instanceof k))
            return !1;
          const t = e;
          return this.getName() === t.getName();
        }
      }
      k.VALUE_IDENTIFIER_TO_ECI = /* @__PURE__ */ new Map(), k.VALUES_TO_ECI = /* @__PURE__ */ new Map(), k.NAME_TO_ECI = /* @__PURE__ */ new Map(), k.Cp437 = new k(de.Cp437, Int32Array.from([0, 2]), "Cp437"), k.ISO8859_1 = new k(de.ISO8859_1, Int32Array.from([1, 3]), "ISO-8859-1", "ISO88591", "ISO8859_1"), k.ISO8859_2 = new k(de.ISO8859_2, 4, "ISO-8859-2", "ISO88592", "ISO8859_2"), k.ISO8859_3 = new k(de.ISO8859_3, 5, "ISO-8859-3", "ISO88593", "ISO8859_3"), k.ISO8859_4 = new k(de.ISO8859_4, 6, "ISO-8859-4", "ISO88594", "ISO8859_4"), k.ISO8859_5 = new k(de.ISO8859_5, 7, "ISO-8859-5", "ISO88595", "ISO8859_5"), k.ISO8859_6 = new k(de.ISO8859_6, 8, "ISO-8859-6", "ISO88596", "ISO8859_6"), k.ISO8859_7 = new k(de.ISO8859_7, 9, "ISO-8859-7", "ISO88597", "ISO8859_7"), k.ISO8859_8 = new k(de.ISO8859_8, 10, "ISO-8859-8", "ISO88598", "ISO8859_8"), k.ISO8859_9 = new k(de.ISO8859_9, 11, "ISO-8859-9", "ISO88599", "ISO8859_9"), k.ISO8859_10 = new k(de.ISO8859_10, 12, "ISO-8859-10", "ISO885910", "ISO8859_10"), k.ISO8859_11 = new k(de.ISO8859_11, 13, "ISO-8859-11", "ISO885911", "ISO8859_11"), k.ISO8859_13 = new k(de.ISO8859_13, 15, "ISO-8859-13", "ISO885913", "ISO8859_13"), k.ISO8859_14 = new k(de.ISO8859_14, 16, "ISO-8859-14", "ISO885914", "ISO8859_14"), k.ISO8859_15 = new k(de.ISO8859_15, 17, "ISO-8859-15", "ISO885915", "ISO8859_15"), k.ISO8859_16 = new k(de.ISO8859_16, 18, "ISO-8859-16", "ISO885916", "ISO8859_16"), k.SJIS = new k(de.SJIS, 20, "SJIS", "Shift_JIS"), k.Cp1250 = new k(de.Cp1250, 21, "Cp1250", "windows-1250"), k.Cp1251 = new k(de.Cp1251, 22, "Cp1251", "windows-1251"), k.Cp1252 = new k(de.Cp1252, 23, "Cp1252", "windows-1252"), k.Cp1256 = new k(de.Cp1256, 24, "Cp1256", "windows-1256"), k.UnicodeBigUnmarked = new k(de.UnicodeBigUnmarked, 25, "UnicodeBigUnmarked", "UTF-16BE", "UnicodeBig"), k.UTF8 = new k(de.UTF8, 26, "UTF8", "UTF-8"), k.ASCII = new k(de.ASCII, Int32Array.from([27, 170]), "ASCII", "US-ASCII"), k.Big5 = new k(de.Big5, 28, "Big5"), k.GB18030 = new k(de.GB18030, 29, "GB18030", "GB2312", "EUC_CN", "GBK"), k.EUC_KR = new k(de.EUC_KR, 30, "EUC_KR", "EUC-KR");
      class Qt extends m {
      }
      Qt.kind = "UnsupportedOperationException";
      class Je {
        /**
         * Decodes some Uint8Array to a string format.
         */
        static decode(e, t) {
          const n = this.encodingName(t);
          return this.customDecoder ? this.customDecoder(e, n) : typeof TextDecoder > "u" || this.shouldDecodeOnFallback(n) ? this.decodeFallback(e, n) : new TextDecoder(n).decode(e);
        }
        /**
         * Checks if the decoding method should use the fallback for decoding
         * once Node TextDecoder doesn't support all encoding formats.
         *
         * @param encodingName
         */
        static shouldDecodeOnFallback(e) {
          return !Je.isBrowser() && e === "ISO-8859-1";
        }
        /**
         * Encodes some string into a Uint8Array.
         */
        static encode(e, t) {
          const n = this.encodingName(t);
          return this.customEncoder ? this.customEncoder(e, n) : typeof TextEncoder > "u" ? this.encodeFallback(e) : new TextEncoder().encode(e);
        }
        static isBrowser() {
          return typeof window < "u" && {}.toString.call(window) === "[object Window]";
        }
        /**
         * Returns the string value from some encoding character set.
         */
        static encodingName(e) {
          return typeof e == "string" ? e : e.getName();
        }
        /**
         * Returns character set from some encoding character set.
         */
        static encodingCharacterSet(e) {
          return e instanceof k ? e : k.getCharacterSetECIByName(e);
        }
        /**
         * Runs a fallback for the native decoding funcion.
         */
        static decodeFallback(e, t) {
          const n = this.encodingCharacterSet(t);
          if (Je.isDecodeFallbackSupported(n)) {
            let r = "";
            for (let i = 0, s = e.length; i < s; i++) {
              let o = e[i].toString(16);
              o.length < 2 && (o = "0" + o), r += "%" + o;
            }
            return decodeURIComponent(r);
          }
          if (n.equals(k.UnicodeBigUnmarked))
            return String.fromCharCode.apply(null, new Uint16Array(e.buffer));
          throw new Qt(`Encoding ${this.encodingName(t)} not supported by fallback.`);
        }
        static isDecodeFallbackSupported(e) {
          return e.equals(k.UTF8) || e.equals(k.ISO8859_1) || e.equals(k.ASCII);
        }
        /**
         * Runs a fallback for the native encoding funcion.
         *
         * @see https://stackoverflow.com/a/17192845/4367683
         */
        static encodeFallback(e) {
          const n = btoa(unescape(encodeURIComponent(e))).split(""), r = [];
          for (let i = 0; i < n.length; i++)
            r.push(n[i].charCodeAt(0));
          return new Uint8Array(r);
        }
      }
      class Q {
        // SHIFT_JIS.equalsIgnoreCase(PLATFORM_DEFAULT_ENCODING) ||
        // EUC_JP.equalsIgnoreCase(PLATFORM_DEFAULT_ENCODING);
        static castAsNonUtf8Char(e, t = null) {
          const n = t ? t.getName() : this.ISO88591;
          return Je.decode(new Uint8Array([e]), n);
        }
        /**
         * @param bytes bytes encoding a string, whose encoding should be guessed
         * @param hints decode hints if applicable
         * @return name of guessed encoding; at the moment will only guess one of:
         *  {@link #SHIFT_JIS}, {@link #UTF8}, {@link #ISO88591}, or the platform
         *  default encoding if none of these can possibly be correct
         */
        static guessEncoding(e, t) {
          if (t != null && t.get(xe.CHARACTER_SET) !== void 0)
            return t.get(xe.CHARACTER_SET).toString();
          const n = e.length;
          let r = !0, i = !0, s = !0, o = 0, a = 0, l = 0, u = 0, d = 0, A = 0, p = 0, I = 0, y = 0, _ = 0, N = 0;
          const L = e.length > 3 && e[0] === /*(byte) */
          239 && e[1] === /*(byte) */
          187 && e[2] === /*(byte) */
          191;
          for (let F = 0; F < n && (r || i || s); F++) {
            const P = e[F] & 255;
            s && (o > 0 ? (P & 128) === 0 ? s = !1 : o-- : (P & 128) !== 0 && ((P & 64) === 0 ? s = !1 : (o++, (P & 32) === 0 ? a++ : (o++, (P & 16) === 0 ? l++ : (o++, (P & 8) === 0 ? u++ : s = !1))))), r && (P > 127 && P < 160 ? r = !1 : P > 159 && (P < 192 || P === 215 || P === 247) && N++), i && (d > 0 ? P < 64 || P === 127 || P > 252 ? i = !1 : d-- : P === 128 || P === 160 || P > 239 ? i = !1 : P > 160 && P < 224 ? (A++, I = 0, p++, p > y && (y = p)) : P > 127 ? (d++, p = 0, I++, I > _ && (_ = I)) : (p = 0, I = 0));
          }
          return s && o > 0 && (s = !1), i && d > 0 && (i = !1), s && (L || a + l + u > 0) ? Q.UTF8 : i && (Q.ASSUME_SHIFT_JIS || y >= 3 || _ >= 3) ? Q.SHIFT_JIS : r && i ? y === 2 && A === 2 || N * 10 >= n ? Q.SHIFT_JIS : Q.ISO88591 : r ? Q.ISO88591 : i ? Q.SHIFT_JIS : s ? Q.UTF8 : Q.PLATFORM_DEFAULT_ENCODING;
        }
        /**
         *
         * @see https://stackoverflow.com/a/13439711/4367683
         *
         * @param append The new string to append.
         * @param args Argumets values to be formated.
         */
        static format(e, ...t) {
          let n = -1;
          function r(s, o, a, l, u, d) {
            if (s === "%%")
              return "%";
            if (t[++n] === void 0)
              return;
            s = l ? parseInt(l.substr(1)) : void 0;
            let A = u ? parseInt(u.substr(1)) : void 0, p;
            switch (d) {
              case "s":
                p = t[n];
                break;
              case "c":
                p = t[n][0];
                break;
              case "f":
                p = parseFloat(t[n]).toFixed(s);
                break;
              case "p":
                p = parseFloat(t[n]).toPrecision(s);
                break;
              case "e":
                p = parseFloat(t[n]).toExponential(s);
                break;
              case "x":
                p = parseInt(t[n]).toString(A || 16);
                break;
              case "d":
                p = parseFloat(parseInt(t[n], A || 10).toPrecision(s)).toFixed(0);
                break;
            }
            p = typeof p == "object" ? JSON.stringify(p) : (+p).toString(A);
            let I = parseInt(a), y = a && a[0] + "" == "0" ? "0" : " ";
            for (; p.length < I; )
              p = o !== void 0 ? p + y : y + p;
            return p;
          }
          let i = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%])/g;
          return e.replace(i, r);
        }
        /**
         *
         */
        static getBytes(e, t) {
          return Je.encode(e, t);
        }
        /**
         * Returns the charcode at the specified index or at index zero.
         */
        static getCharCode(e, t = 0) {
          return e.charCodeAt(t);
        }
        /**
         * Returns char for given charcode
         */
        static getCharAt(e) {
          return String.fromCharCode(e);
        }
      }
      Q.SHIFT_JIS = k.SJIS.getName(), Q.GB2312 = "GB2312", Q.ISO88591 = k.ISO8859_1.getName(), Q.EUC_JP = "EUC_JP", Q.UTF8 = k.UTF8.getName(), Q.PLATFORM_DEFAULT_ENCODING = Q.UTF8, Q.ASSUME_SHIFT_JIS = !1;
      class ge {
        constructor(e = "") {
          this.value = e;
        }
        enableDecoding(e) {
          return this.encoding = e, this;
        }
        append(e) {
          return typeof e == "string" ? this.value += e.toString() : this.encoding ? this.value += Q.castAsNonUtf8Char(e, this.encoding) : this.value += String.fromCharCode(e), this;
        }
        appendChars(e, t, n) {
          for (let r = t; t < t + n; r++)
            this.append(e[r]);
          return this;
        }
        length() {
          return this.value.length;
        }
        charAt(e) {
          return this.value.charAt(e);
        }
        deleteCharAt(e) {
          this.value = this.value.substr(0, e) + this.value.substring(e + 1);
        }
        setCharAt(e, t) {
          this.value = this.value.substr(0, e) + t + this.value.substr(e + 1);
        }
        substring(e, t) {
          return this.value.substring(e, t);
        }
        /**
         * @note helper method for RSS Expanded
         */
        setLengthToZero() {
          this.value = "";
        }
        toString() {
          return this.value;
        }
        insert(e, t) {
          this.value = this.value.substr(0, e) + t + this.value.substr(e + t.length);
        }
      }
      class Fe {
        /**
         * Creates an empty square {@link BitMatrix}.
         *
         * @param dimension height and width
         */
        // public constructor(dimension: number /*int*/) {
        //   this(dimension, dimension)
        // }
        /**
         * Creates an empty {@link BitMatrix}.
         *
         * @param width bit matrix width
         * @param height bit matrix height
         */
        // public constructor(width: number /*int*/, height: number /*int*/) {
        //   if (width < 1 || height < 1) {
        //     throw new IllegalArgumentException("Both dimensions must be greater than 0")
        //   }
        //   this.width = width
        //   this.height = height
        //   this.rowSize = (width + 31) / 32
        //   bits = new int[rowSize * height];
        // }
        constructor(e, t, n, r) {
          if (this.width = e, this.height = t, this.rowSize = n, this.bits = r, t == null && (t = e), this.height = t, e < 1 || t < 1)
            throw new R("Both dimensions must be greater than 0");
          n == null && (n = Math.floor((e + 31) / 32)), this.rowSize = n, r == null && (this.bits = new Int32Array(this.rowSize * this.height));
        }
        /**
         * Interprets a 2D array of booleans as a {@link BitMatrix}, where "true" means an "on" bit.
         *
         * @function parse
         * @param image bits of the image, as a row-major 2D array. Elements are arrays representing rows
         * @return {@link BitMatrix} representation of image
         */
        static parseFromBooleanArray(e) {
          const t = e.length, n = e[0].length, r = new Fe(n, t);
          for (let i = 0; i < t; i++) {
            const s = e[i];
            for (let o = 0; o < n; o++)
              s[o] && r.set(o, i);
          }
          return r;
        }
        /**
         *
         * @function parse
         * @param stringRepresentation
         * @param setString
         * @param unsetString
         */
        static parseFromString(e, t, n) {
          if (e === null)
            throw new R("stringRepresentation cannot be null");
          const r = new Array(e.length);
          let i = 0, s = 0, o = -1, a = 0, l = 0;
          for (; l < e.length; )
            if (e.charAt(l) === `
` || e.charAt(l) === "\r") {
              if (i > s) {
                if (o === -1)
                  o = i - s;
                else if (i - s !== o)
                  throw new R("row lengths do not match");
                s = i, a++;
              }
              l++;
            } else if (e.substring(l, l + t.length) === t)
              l += t.length, r[i] = !0, i++;
            else if (e.substring(l, l + n.length) === n)
              l += n.length, r[i] = !1, i++;
            else
              throw new R("illegal character encountered: " + e.substring(l));
          if (i > s) {
            if (o === -1)
              o = i - s;
            else if (i - s !== o)
              throw new R("row lengths do not match");
            a++;
          }
          const u = new Fe(o, a);
          for (let d = 0; d < i; d++)
            r[d] && u.set(Math.floor(d % o), Math.floor(d / o));
          return u;
        }
        /**
         * <p>Gets the requested bit, where true means black.</p>
         *
         * @param x The horizontal component (i.e. which column)
         * @param y The vertical component (i.e. which row)
         * @return value of given bit in matrix
         */
        get(e, t) {
          const n = t * this.rowSize + Math.floor(e / 32);
          return (this.bits[n] >>> (e & 31) & 1) !== 0;
        }
        /**
         * <p>Sets the given bit to true.</p>
         *
         * @param x The horizontal component (i.e. which column)
         * @param y The vertical component (i.e. which row)
         */
        set(e, t) {
          const n = t * this.rowSize + Math.floor(e / 32);
          this.bits[n] |= 1 << (e & 31) & 4294967295;
        }
        unset(e, t) {
          const n = t * this.rowSize + Math.floor(e / 32);
          this.bits[n] &= ~(1 << (e & 31) & 4294967295);
        }
        /**
         * <p>Flips the given bit.</p>
         *
         * @param x The horizontal component (i.e. which column)
         * @param y The vertical component (i.e. which row)
         */
        flip(e, t) {
          const n = t * this.rowSize + Math.floor(e / 32);
          this.bits[n] ^= 1 << (e & 31) & 4294967295;
        }
        /**
         * Exclusive-or (XOR): Flip the bit in this {@code BitMatrix} if the corresponding
         * mask bit is set.
         *
         * @param mask XOR mask
         */
        xor(e) {
          if (this.width !== e.getWidth() || this.height !== e.getHeight() || this.rowSize !== e.getRowSize())
            throw new R("input matrix dimensions do not match");
          const t = new le(Math.floor(this.width / 32) + 1), n = this.rowSize, r = this.bits;
          for (let i = 0, s = this.height; i < s; i++) {
            const o = i * n, a = e.getRow(i, t).getBitArray();
            for (let l = 0; l < n; l++)
              r[o + l] ^= a[l];
          }
        }
        /**
         * Clears all bits (sets to false).
         */
        clear() {
          const e = this.bits, t = e.length;
          for (let n = 0; n < t; n++)
            e[n] = 0;
        }
        /**
         * <p>Sets a square region of the bit matrix to true.</p>
         *
         * @param left The horizontal position to begin at (inclusive)
         * @param top The vertical position to begin at (inclusive)
         * @param width The width of the region
         * @param height The height of the region
         */
        setRegion(e, t, n, r) {
          if (t < 0 || e < 0)
            throw new R("Left and top must be nonnegative");
          if (r < 1 || n < 1)
            throw new R("Height and width must be at least 1");
          const i = e + n, s = t + r;
          if (s > this.height || i > this.width)
            throw new R("The region must fit inside the matrix");
          const o = this.rowSize, a = this.bits;
          for (let l = t; l < s; l++) {
            const u = l * o;
            for (let d = e; d < i; d++)
              a[u + Math.floor(d / 32)] |= 1 << (d & 31) & 4294967295;
          }
        }
        /**
         * A fast method to retrieve one row of data from the matrix as a BitArray.
         *
         * @param y The row to retrieve
         * @param row An optional caller-allocated BitArray, will be allocated if null or too small
         * @return The resulting BitArray - this reference should always be used even when passing
         *         your own row
         */
        getRow(e, t) {
          t == null || t.getSize() < this.width ? t = new le(this.width) : t.clear();
          const n = this.rowSize, r = this.bits, i = e * n;
          for (let s = 0; s < n; s++)
            t.setBulk(s * 32, r[i + s]);
          return t;
        }
        /**
         * @param y row to set
         * @param row {@link BitArray} to copy from
         */
        setRow(e, t) {
          ie.arraycopy(t.getBitArray(), 0, this.bits, e * this.rowSize, this.rowSize);
        }
        /**
         * Modifies this {@code BitMatrix} to represent the same but rotated 180 degrees
         */
        rotate180() {
          const e = this.getWidth(), t = this.getHeight();
          let n = new le(e), r = new le(e);
          for (let i = 0, s = Math.floor((t + 1) / 2); i < s; i++)
            n = this.getRow(i, n), r = this.getRow(t - 1 - i, r), n.reverse(), r.reverse(), this.setRow(i, r), this.setRow(t - 1 - i, n);
        }
        /**
         * This is useful in detecting the enclosing rectangle of a 'pure' barcode.
         *
         * @return {@code left,top,width,height} enclosing rectangle of all 1 bits, or null if it is all white
         */
        getEnclosingRectangle() {
          const e = this.width, t = this.height, n = this.rowSize, r = this.bits;
          let i = e, s = t, o = -1, a = -1;
          for (let l = 0; l < t; l++)
            for (let u = 0; u < n; u++) {
              const d = r[l * n + u];
              if (d !== 0) {
                if (l < s && (s = l), l > a && (a = l), u * 32 < i) {
                  let A = 0;
                  for (; (d << 31 - A & 4294967295) === 0; )
                    A++;
                  u * 32 + A < i && (i = u * 32 + A);
                }
                if (u * 32 + 31 > o) {
                  let A = 31;
                  for (; !(d >>> A); )
                    A--;
                  u * 32 + A > o && (o = u * 32 + A);
                }
              }
            }
          return o < i || a < s ? null : Int32Array.from([i, s, o - i + 1, a - s + 1]);
        }
        /**
         * This is useful in detecting a corner of a 'pure' barcode.
         *
         * @return {@code x,y} coordinate of top-left-most 1 bit, or null if it is all white
         */
        getTopLeftOnBit() {
          const e = this.rowSize, t = this.bits;
          let n = 0;
          for (; n < t.length && t[n] === 0; )
            n++;
          if (n === t.length)
            return null;
          const r = n / e;
          let i = n % e * 32;
          const s = t[n];
          let o = 0;
          for (; (s << 31 - o & 4294967295) === 0; )
            o++;
          return i += o, Int32Array.from([i, r]);
        }
        getBottomRightOnBit() {
          const e = this.rowSize, t = this.bits;
          let n = t.length - 1;
          for (; n >= 0 && t[n] === 0; )
            n--;
          if (n < 0)
            return null;
          const r = Math.floor(n / e);
          let i = Math.floor(n % e) * 32;
          const s = t[n];
          let o = 31;
          for (; !(s >>> o); )
            o--;
          return i += o, Int32Array.from([i, r]);
        }
        /**
         * @return The width of the matrix
         */
        getWidth() {
          return this.width;
        }
        /**
         * @return The height of the matrix
         */
        getHeight() {
          return this.height;
        }
        /**
         * @return The row size of the matrix
         */
        getRowSize() {
          return this.rowSize;
        }
        /*@Override*/
        equals(e) {
          if (!(e instanceof Fe))
            return !1;
          const t = e;
          return this.width === t.width && this.height === t.height && this.rowSize === t.rowSize && pe.equals(this.bits, t.bits);
        }
        /*@Override*/
        hashCode() {
          let e = this.width;
          return e = 31 * e + this.width, e = 31 * e + this.height, e = 31 * e + this.rowSize, e = 31 * e + pe.hashCode(this.bits), e;
        }
        /**
         * @return string representation using "X" for set and " " for unset bits
         */
        /*@Override*/
        // public toString(): string {
        //   return toString(": "X, "  ")
        // }
        /**
         * @param setString representation of a set bit
         * @param unsetString representation of an unset bit
         * @return string representation of entire matrix utilizing given strings
         */
        // public toString(setString: string = "X ", unsetString: string = "  "): string {
        //   return this.buildToString(setString, unsetString, "\n")
        // }
        /**
         * @param setString representation of a set bit
         * @param unsetString representation of an unset bit
         * @param lineSeparator newline character in string representation
         * @return string representation of entire matrix utilizing given strings and line separator
         * @deprecated call {@link #toString(String,String)} only, which uses \n line separator always
         */
        // @Deprecated
        toString(e = "X ", t = "  ", n = `
`) {
          return this.buildToString(e, t, n);
        }
        buildToString(e, t, n) {
          let r = new ge();
          for (let i = 0, s = this.height; i < s; i++) {
            for (let o = 0, a = this.width; o < a; o++)
              r.append(this.get(o, i) ? e : t);
            r.append(n);
          }
          return r.toString();
        }
        /*@Override*/
        clone() {
          return new Fe(this.width, this.height, this.rowSize, this.bits.slice());
        }
      }
      class D extends m {
        static getNotFoundInstance() {
          return new D();
        }
      }
      D.kind = "NotFoundException";
      class ke extends Me {
        constructor(e) {
          super(e), this.luminances = ke.EMPTY, this.buckets = new Int32Array(ke.LUMINANCE_BUCKETS);
        }
        // Applies simple sharpening to the row data to improve performance of the 1D Readers.
        /*@Override*/
        getBlackRow(e, t) {
          const n = this.getLuminanceSource(), r = n.getWidth();
          t == null || t.getSize() < r ? t = new le(r) : t.clear(), this.initArrays(r);
          const i = n.getRow(e, this.luminances), s = this.buckets;
          for (let a = 0; a < r; a++)
            s[(i[a] & 255) >> ke.LUMINANCE_SHIFT]++;
          const o = ke.estimateBlackPoint(s);
          if (r < 3)
            for (let a = 0; a < r; a++)
              (i[a] & 255) < o && t.set(a);
          else {
            let a = i[0] & 255, l = i[1] & 255;
            for (let u = 1; u < r - 1; u++) {
              const d = i[u + 1] & 255;
              (l * 4 - a - d) / 2 < o && t.set(u), a = l, l = d;
            }
          }
          return t;
        }
        // Does not sharpen the data, as this call is intended to only be used by 2D Readers.
        /*@Override*/
        getBlackMatrix() {
          const e = this.getLuminanceSource(), t = e.getWidth(), n = e.getHeight(), r = new Fe(t, n);
          this.initArrays(t);
          const i = this.buckets;
          for (let a = 1; a < 5; a++) {
            const l = Math.floor(n * a / 5), u = e.getRow(l, this.luminances), d = Math.floor(t * 4 / 5);
            for (let A = Math.floor(t / 5); A < d; A++) {
              const p = u[A] & 255;
              i[p >> ke.LUMINANCE_SHIFT]++;
            }
          }
          const s = ke.estimateBlackPoint(i), o = e.getMatrix();
          for (let a = 0; a < n; a++) {
            const l = a * t;
            for (let u = 0; u < t; u++)
              (o[l + u] & 255) < s && r.set(u, a);
          }
          return r;
        }
        /*@Override*/
        createBinarizer(e) {
          return new ke(e);
        }
        initArrays(e) {
          this.luminances.length < e && (this.luminances = new Uint8ClampedArray(e));
          const t = this.buckets;
          for (let n = 0; n < ke.LUMINANCE_BUCKETS; n++)
            t[n] = 0;
        }
        static estimateBlackPoint(e) {
          const t = e.length;
          let n = 0, r = 0, i = 0;
          for (let u = 0; u < t; u++)
            e[u] > i && (r = u, i = e[u]), e[u] > n && (n = e[u]);
          let s = 0, o = 0;
          for (let u = 0; u < t; u++) {
            const d = u - r, A = e[u] * d * d;
            A > o && (s = u, o = A);
          }
          if (r > s) {
            const u = r;
            r = s, s = u;
          }
          if (s - r <= t / 16)
            throw new D();
          let a = s - 1, l = -1;
          for (let u = s - 1; u > r; u--) {
            const d = u - r, A = d * d * (s - u) * (n - e[u]);
            A > l && (a = u, l = A);
          }
          return a << ke.LUMINANCE_SHIFT;
        }
      }
      ke.LUMINANCE_BITS = 5, ke.LUMINANCE_SHIFT = 8 - ke.LUMINANCE_BITS, ke.LUMINANCE_BUCKETS = 1 << ke.LUMINANCE_BITS, ke.EMPTY = Uint8ClampedArray.from([0]);
      class J extends ke {
        constructor(e) {
          super(e), this.matrix = null;
        }
        /**
         * Calculates the final BitMatrix once for all requests. This could be called once from the
         * constructor instead, but there are some advantages to doing it lazily, such as making
         * profiling easier, and not doing heavy lifting when callers don't expect it.
         */
        /*@Override*/
        getBlackMatrix() {
          if (this.matrix !== null)
            return this.matrix;
          const e = this.getLuminanceSource(), t = e.getWidth(), n = e.getHeight();
          if (t >= J.MINIMUM_DIMENSION && n >= J.MINIMUM_DIMENSION) {
            const r = e.getMatrix();
            let i = t >> J.BLOCK_SIZE_POWER;
            (t & J.BLOCK_SIZE_MASK) !== 0 && i++;
            let s = n >> J.BLOCK_SIZE_POWER;
            (n & J.BLOCK_SIZE_MASK) !== 0 && s++;
            const o = J.calculateBlackPoints(r, i, s, t, n), a = new Fe(t, n);
            J.calculateThresholdForBlock(r, i, s, t, n, o, a), this.matrix = a;
          } else
            this.matrix = super.getBlackMatrix();
          return this.matrix;
        }
        /*@Override*/
        createBinarizer(e) {
          return new J(e);
        }
        /**
         * For each block in the image, calculate the average black point using a 5x5 grid
         * of the blocks around it. Also handles the corner cases (fractional blocks are computed based
         * on the last pixels in the row/column which are also used in the previous block).
         */
        static calculateThresholdForBlock(e, t, n, r, i, s, o) {
          const a = i - J.BLOCK_SIZE, l = r - J.BLOCK_SIZE;
          for (let u = 0; u < n; u++) {
            let d = u << J.BLOCK_SIZE_POWER;
            d > a && (d = a);
            const A = J.cap(u, 2, n - 3);
            for (let p = 0; p < t; p++) {
              let I = p << J.BLOCK_SIZE_POWER;
              I > l && (I = l);
              const y = J.cap(p, 2, t - 3);
              let _ = 0;
              for (let L = -2; L <= 2; L++) {
                const F = s[A + L];
                _ += F[y - 2] + F[y - 1] + F[y] + F[y + 1] + F[y + 2];
              }
              const N = _ / 25;
              J.thresholdBlock(e, I, d, N, r, o);
            }
          }
        }
        static cap(e, t, n) {
          return e < t ? t : e > n ? n : e;
        }
        /**
         * Applies a single threshold to a block of pixels.
         */
        static thresholdBlock(e, t, n, r, i, s) {
          for (let o = 0, a = n * i + t; o < J.BLOCK_SIZE; o++, a += i)
            for (let l = 0; l < J.BLOCK_SIZE; l++)
              (e[a + l] & 255) <= r && s.set(t + l, n + o);
        }
        /**
         * Calculates a single black point for each block of pixels and saves it away.
         * See the following thread for a discussion of this algorithm:
         *  http://groups.google.com/group/zxing/browse_thread/thread/d06efa2c35a7ddc0
         */
        static calculateBlackPoints(e, t, n, r, i) {
          const s = i - J.BLOCK_SIZE, o = r - J.BLOCK_SIZE, a = new Array(n);
          for (let l = 0; l < n; l++) {
            a[l] = new Int32Array(t);
            let u = l << J.BLOCK_SIZE_POWER;
            u > s && (u = s);
            for (let d = 0; d < t; d++) {
              let A = d << J.BLOCK_SIZE_POWER;
              A > o && (A = o);
              let p = 0, I = 255, y = 0;
              for (let N = 0, L = u * r + A; N < J.BLOCK_SIZE; N++, L += r) {
                for (let F = 0; F < J.BLOCK_SIZE; F++) {
                  const P = e[L + F] & 255;
                  p += P, P < I && (I = P), P > y && (y = P);
                }
                if (y - I > J.MIN_DYNAMIC_RANGE)
                  for (N++, L += r; N < J.BLOCK_SIZE; N++, L += r)
                    for (let F = 0; F < J.BLOCK_SIZE; F++)
                      p += e[L + F] & 255;
              }
              let _ = p >> J.BLOCK_SIZE_POWER * 2;
              if (y - I <= J.MIN_DYNAMIC_RANGE && (_ = I / 2, l > 0 && d > 0)) {
                const N = (a[l - 1][d] + 2 * a[l][d - 1] + a[l - 1][d - 1]) / 4;
                I < N && (_ = N);
              }
              a[l][d] = _;
            }
          }
          return a;
        }
      }
      J.BLOCK_SIZE_POWER = 3, J.BLOCK_SIZE = 1 << J.BLOCK_SIZE_POWER, J.BLOCK_SIZE_MASK = J.BLOCK_SIZE - 1, J.MINIMUM_DIMENSION = J.BLOCK_SIZE * 5, J.MIN_DYNAMIC_RANGE = 24;
      class gn {
        constructor(e, t) {
          this.width = e, this.height = t;
        }
        /**
         * @return The width of the bitmap.
         */
        getWidth() {
          return this.width;
        }
        /**
         * @return The height of the bitmap.
         */
        getHeight() {
          return this.height;
        }
        /**
         * @return Whether this subclass supports cropping.
         */
        isCropSupported() {
          return !1;
        }
        /**
         * Returns a new object with cropped image data. Implementations may keep a reference to the
         * original data rather than a copy. Only callable if isCropSupported() is true.
         *
         * @param left The left coordinate, which must be in [0,getWidth())
         * @param top The top coordinate, which must be in [0,getHeight())
         * @param width The width of the rectangle to crop.
         * @param height The height of the rectangle to crop.
         * @return A cropped version of this object.
         */
        crop(e, t, n, r) {
          throw new Qt("This luminance source does not support cropping.");
        }
        /**
         * @return Whether this subclass supports counter-clockwise rotation.
         */
        isRotateSupported() {
          return !1;
        }
        /**
         * Returns a new object with rotated image data by 90 degrees counterclockwise.
         * Only callable if {@link #isRotateSupported()} is true.
         *
         * @return A rotated version of this object.
         */
        rotateCounterClockwise() {
          throw new Qt("This luminance source does not support rotation by 90 degrees.");
        }
        /**
         * Returns a new object with rotated image data by 45 degrees counterclockwise.
         * Only callable if {@link #isRotateSupported()} is true.
         *
         * @return A rotated version of this object.
         */
        rotateCounterClockwise45() {
          throw new Qt("This luminance source does not support rotation by 45 degrees.");
        }
        /*@Override*/
        toString() {
          const e = new Uint8ClampedArray(this.width);
          let t = new ge();
          for (let n = 0; n < this.height; n++) {
            const r = this.getRow(n, e);
            for (let i = 0; i < this.width; i++) {
              const s = r[i] & 255;
              let o;
              s < 64 ? o = "#" : s < 128 ? o = "+" : s < 192 ? o = "." : o = " ", t.append(o);
            }
            t.append(`
`);
          }
          return t.toString();
        }
      }
      class Nt extends gn {
        constructor(e) {
          super(e.getWidth(), e.getHeight()), this.delegate = e;
        }
        /*@Override*/
        getRow(e, t) {
          const n = this.delegate.getRow(e, t), r = this.getWidth();
          for (let i = 0; i < r; i++)
            n[i] = /*(byte)*/
            255 - (n[i] & 255);
          return n;
        }
        /*@Override*/
        getMatrix() {
          const e = this.delegate.getMatrix(), t = this.getWidth() * this.getHeight(), n = new Uint8ClampedArray(t);
          for (let r = 0; r < t; r++)
            n[r] = /*(byte)*/
            255 - (e[r] & 255);
          return n;
        }
        /*@Override*/
        isCropSupported() {
          return this.delegate.isCropSupported();
        }
        /*@Override*/
        crop(e, t, n, r) {
          return new Nt(this.delegate.crop(e, t, n, r));
        }
        /*@Override*/
        isRotateSupported() {
          return this.delegate.isRotateSupported();
        }
        /**
         * @return original delegate {@link LuminanceSource} since invert undoes itself
         */
        /*@Override*/
        invert() {
          return this.delegate;
        }
        /*@Override*/
        rotateCounterClockwise() {
          return new Nt(this.delegate.rotateCounterClockwise());
        }
        /*@Override*/
        rotateCounterClockwise45() {
          return new Nt(this.delegate.rotateCounterClockwise45());
        }
      }
      class Ot extends gn {
        constructor(e) {
          super(e.width, e.height), this.canvas = e, this.tempCanvasElement = null, this.buffer = Ot.makeBufferFromCanvasImageData(e);
        }
        static makeBufferFromCanvasImageData(e) {
          const t = e.getContext("2d").getImageData(0, 0, e.width, e.height);
          return Ot.toGrayscaleBuffer(t.data, e.width, e.height);
        }
        static toGrayscaleBuffer(e, t, n) {
          const r = new Uint8ClampedArray(t * n);
          for (let i = 0, s = 0, o = e.length; i < o; i += 4, s++) {
            let a;
            if (e[i + 3] === 0)
              a = 255;
            else {
              const u = e[i], d = e[i + 1], A = e[i + 2];
              a = 306 * u + 601 * d + 117 * A + 512 >> 10;
            }
            r[s] = a;
          }
          return r;
        }
        getRow(e, t) {
          if (e < 0 || e >= this.getHeight())
            throw new R("Requested row is outside the image: " + e);
          const n = this.getWidth(), r = e * n;
          return t === null ? t = this.buffer.slice(r, r + n) : (t.length < n && (t = new Uint8ClampedArray(n)), t.set(this.buffer.slice(r, r + n))), t;
        }
        getMatrix() {
          return this.buffer;
        }
        isCropSupported() {
          return !0;
        }
        crop(e, t, n, r) {
          return super.crop(e, t, n, r), this;
        }
        /**
         * This is always true, since the image is a gray-scale image.
         *
         * @return true
         */
        isRotateSupported() {
          return !0;
        }
        rotateCounterClockwise() {
          return this.rotate(-90), this;
        }
        rotateCounterClockwise45() {
          return this.rotate(-45), this;
        }
        getTempCanvasElement() {
          if (this.tempCanvasElement === null) {
            const e = this.canvas.ownerDocument.createElement("canvas");
            e.width = this.canvas.width, e.height = this.canvas.height, this.tempCanvasElement = e;
          }
          return this.tempCanvasElement;
        }
        rotate(e) {
          const t = this.getTempCanvasElement(), n = t.getContext("2d"), r = e * Ot.DEGREE_TO_RADIANS, i = this.canvas.width, s = this.canvas.height, o = Math.ceil(Math.abs(Math.cos(r)) * i + Math.abs(Math.sin(r)) * s), a = Math.ceil(Math.abs(Math.sin(r)) * i + Math.abs(Math.cos(r)) * s);
          return t.width = o, t.height = a, n.translate(o / 2, a / 2), n.rotate(r), n.drawImage(this.canvas, i / -2, s / -2), this.buffer = Ot.makeBufferFromCanvasImageData(t), this;
        }
        invert() {
          return new Nt(this);
        }
      }
      Ot.DEGREE_TO_RADIANS = Math.PI / 180;
      class Wr {
        /**
         * Creates an instance of VideoInputDevice.
         *
         * @param {string} deviceId the video input device id
         * @param {string} label the label of the device if available
         */
        constructor(e, t, n) {
          this.deviceId = e, this.label = t, this.kind = "videoinput", this.groupId = n || void 0;
        }
        /** @inheritdoc */
        toJSON() {
          return {
            kind: this.kind,
            groupId: this.groupId,
            deviceId: this.deviceId,
            label: this.label
          };
        }
      }
      var Ke = (globalThis || qn || self || window || void 0) && (globalThis || qn || self || window || void 0).__awaiter || function(f, e, t, n) {
        function r(i) {
          return i instanceof t ? i : new t(function(s) {
            s(i);
          });
        }
        return new (t || (t = Promise))(function(i, s) {
          function o(u) {
            try {
              l(n.next(u));
            } catch (d) {
              s(d);
            }
          }
          function a(u) {
            try {
              l(n.throw(u));
            } catch (d) {
              s(d);
            }
          }
          function l(u) {
            u.done ? i(u.value) : r(u.value).then(o, a);
          }
          l((n = n.apply(f, e || [])).next());
        });
      };
      class Ut {
        /**
         * Creates an instance of BrowserCodeReader.
         * @param {Reader} reader The reader instance to decode the barcode
         * @param {number} [timeBetweenScansMillis=500] the time delay between subsequent successful decode tries
         *
         * @memberOf BrowserCodeReader
         */
        constructor(e, t = 500, n) {
          this.reader = e, this.timeBetweenScansMillis = t, this._hints = n, this._stopContinuousDecode = !1, this._stopAsyncDecode = !1, this._timeBetweenDecodingAttempts = 0;
        }
        /**
         * If navigator is present.
         */
        get hasNavigator() {
          return typeof navigator < "u";
        }
        /**
         * If mediaDevices under navigator is supported.
         */
        get isMediaDevicesSuported() {
          return this.hasNavigator && !!navigator.mediaDevices;
        }
        /**
         * If enumerateDevices under navigator is supported.
         */
        get canEnumerateDevices() {
          return !!(this.isMediaDevicesSuported && navigator.mediaDevices.enumerateDevices);
        }
        /** Time between two decoding tries in milli seconds. */
        get timeBetweenDecodingAttempts() {
          return this._timeBetweenDecodingAttempts;
        }
        /**
         * Change the time span the decoder waits between two decoding tries.
         *
         * @param {number} millis Time between two decoding tries in milli seconds.
         */
        set timeBetweenDecodingAttempts(e) {
          this._timeBetweenDecodingAttempts = e < 0 ? 0 : e;
        }
        /**
         * Sets the hints.
         */
        set hints(e) {
          this._hints = e || null;
        }
        /**
         * Sets the hints.
         */
        get hints() {
          return this._hints;
        }
        /**
         * Lists all the available video input devices.
         */
        listVideoInputDevices() {
          return Ke(this, void 0, void 0, function* () {
            if (!this.hasNavigator)
              throw new Error("Can't enumerate devices, navigator is not present.");
            if (!this.canEnumerateDevices)
              throw new Error("Can't enumerate devices, method not supported.");
            const e = yield navigator.mediaDevices.enumerateDevices(), t = [];
            for (const n of e) {
              const r = n.kind === "video" ? "videoinput" : n.kind;
              if (r !== "videoinput")
                continue;
              const i = n.deviceId || n.id, s = n.label || `Video device ${t.length + 1}`, o = n.groupId, a = { deviceId: i, label: s, kind: r, groupId: o };
              t.push(a);
            }
            return t;
          });
        }
        /**
         * Obtain the list of available devices with type 'videoinput'.
         *
         * @returns {Promise<VideoInputDevice[]>} an array of available video input devices
         *
         * @memberOf BrowserCodeReader
         *
         * @deprecated Use `listVideoInputDevices` instead.
         */
        getVideoInputDevices() {
          return Ke(this, void 0, void 0, function* () {
            return (yield this.listVideoInputDevices()).map((t) => new Wr(t.deviceId, t.label));
          });
        }
        /**
         * Let's you find a device using it's Id.
         */
        findDeviceById(e) {
          return Ke(this, void 0, void 0, function* () {
            const t = yield this.listVideoInputDevices();
            return t ? t.find((n) => n.deviceId === e) : null;
          });
        }
        /**
         * Decodes the barcode from the device specified by deviceId while showing the video in the specified video element.
         *
         * @param deviceId the id of one of the devices obtained after calling getVideoInputDevices. Can be undefined, in this case it will decode from one of the available devices, preffering the main camera (environment facing) if available.
         * @param video the video element in page where to show the video while decoding. Can be either an element id or directly an HTMLVideoElement. Can be undefined, in which case no video will be shown.
         * @returns The decoding result.
         *
         * @memberOf BrowserCodeReader
         *
         * @deprecated Use `decodeOnceFromVideoDevice` instead.
         */
        decodeFromInputVideoDevice(e, t) {
          return Ke(this, void 0, void 0, function* () {
            return yield this.decodeOnceFromVideoDevice(e, t);
          });
        }
        /**
         * In one attempt, tries to decode the barcode from the device specified by deviceId while showing the video in the specified video element.
         *
         * @param deviceId the id of one of the devices obtained after calling getVideoInputDevices. Can be undefined, in this case it will decode from one of the available devices, preffering the main camera (environment facing) if available.
         * @param video the video element in page where to show the video while decoding. Can be either an element id or directly an HTMLVideoElement. Can be undefined, in which case no video will be shown.
         * @returns The decoding result.
         *
         * @memberOf BrowserCodeReader
         */
        decodeOnceFromVideoDevice(e, t) {
          return Ke(this, void 0, void 0, function* () {
            this.reset();
            let n;
            e ? n = { deviceId: { exact: e } } : n = { facingMode: "environment" };
            const r = { video: n };
            return yield this.decodeOnceFromConstraints(r, t);
          });
        }
        /**
         * In one attempt, tries to decode the barcode from a stream obtained from the given constraints while showing the video in the specified video element.
         *
         * @param constraints the media stream constraints to get s valid media stream to decode from
         * @param video the video element in page where to show the video while decoding. Can be either an element id or directly an HTMLVideoElement. Can be undefined, in which case no video will be shown.
         * @returns The decoding result.
         *
         * @memberOf BrowserCodeReader
         */
        decodeOnceFromConstraints(e, t) {
          return Ke(this, void 0, void 0, function* () {
            const n = yield navigator.mediaDevices.getUserMedia(e);
            return yield this.decodeOnceFromStream(n, t);
          });
        }
        /**
         * In one attempt, tries to decode the barcode from a stream obtained from the given constraints while showing the video in the specified video element.
         *
         * @param {MediaStream} [constraints] the media stream constraints to get s valid media stream to decode from
         * @param {string|HTMLVideoElement} [video] the video element in page where to show the video while decoding. Can be either an element id or directly an HTMLVideoElement. Can be undefined, in which case no video will be shown.
         * @returns {Promise<Result>} The decoding result.
         *
         * @memberOf BrowserCodeReader
         */
        decodeOnceFromStream(e, t) {
          return Ke(this, void 0, void 0, function* () {
            this.reset();
            const n = yield this.attachStreamToVideo(e, t);
            return yield this.decodeOnce(n);
          });
        }
        /**
         * Continuously decodes the barcode from the device specified by device while showing the video in the specified video element.
         *
         * @param {string|null} [deviceId] the id of one of the devices obtained after calling getVideoInputDevices. Can be undefined, in this case it will decode from one of the available devices, preffering the main camera (environment facing) if available.
         * @param {string|HTMLVideoElement|null} [video] the video element in page where to show the video while decoding. Can be either an element id or directly an HTMLVideoElement. Can be undefined, in which case no video will be shown.
         * @returns {Promise<void>}
         *
         * @memberOf BrowserCodeReader
         *
         * @deprecated Use `decodeFromVideoDevice` instead.
         */
        decodeFromInputVideoDeviceContinuously(e, t, n) {
          return Ke(this, void 0, void 0, function* () {
            return yield this.decodeFromVideoDevice(e, t, n);
          });
        }
        /**
         * Continuously tries to decode the barcode from the device specified by device while showing the video in the specified video element.
         *
         * @param {string|null} [deviceId] the id of one of the devices obtained after calling getVideoInputDevices. Can be undefined, in this case it will decode from one of the available devices, preffering the main camera (environment facing) if available.
         * @param {string|HTMLVideoElement|null} [video] the video element in page where to show the video while decoding. Can be either an element id or directly an HTMLVideoElement. Can be undefined, in which case no video will be shown.
         * @returns {Promise<void>}
         *
         * @memberOf BrowserCodeReader
         */
        decodeFromVideoDevice(e, t, n) {
          return Ke(this, void 0, void 0, function* () {
            let r;
            e ? r = { deviceId: { exact: e } } : r = { facingMode: "environment" };
            const i = { video: r };
            return yield this.decodeFromConstraints(i, t, n);
          });
        }
        /**
         * Continuously tries to decode the barcode from a stream obtained from the given constraints while showing the video in the specified video element.
         *
         * @param {MediaStream} [constraints] the media stream constraints to get s valid media stream to decode from
         * @param {string|HTMLVideoElement} [video] the video element in page where to show the video while decoding. Can be either an element id or directly an HTMLVideoElement. Can be undefined, in which case no video will be shown.
         * @returns {Promise<Result>} The decoding result.
         *
         * @memberOf BrowserCodeReader
         */
        decodeFromConstraints(e, t, n) {
          return Ke(this, void 0, void 0, function* () {
            const r = yield navigator.mediaDevices.getUserMedia(e);
            return yield this.decodeFromStream(r, t, n);
          });
        }
        /**
         * In one attempt, tries to decode the barcode from a stream obtained from the given constraints while showing the video in the specified video element.
         *
         * @param {MediaStream} [constraints] the media stream constraints to get s valid media stream to decode from
         * @param {string|HTMLVideoElement} [video] the video element in page where to show the video while decoding. Can be either an element id or directly an HTMLVideoElement. Can be undefined, in which case no video will be shown.
         * @returns {Promise<Result>} The decoding result.
         *
         * @memberOf BrowserCodeReader
         */
        decodeFromStream(e, t, n) {
          return Ke(this, void 0, void 0, function* () {
            this.reset();
            const r = yield this.attachStreamToVideo(e, t);
            return yield this.decodeContinuously(r, n);
          });
        }
        /**
         * Breaks the decoding loop.
         */
        stopAsyncDecode() {
          this._stopAsyncDecode = !0;
        }
        /**
         * Breaks the decoding loop.
         */
        stopContinuousDecode() {
          this._stopContinuousDecode = !0;
        }
        /**
         * Sets the new stream and request a new decoding-with-delay.
         *
         * @param stream The stream to be shown in the video element.
         * @param decodeFn A callback for the decode method.
         */
        attachStreamToVideo(e, t) {
          return Ke(this, void 0, void 0, function* () {
            const n = this.prepareVideoElement(t);
            return this.addVideoSource(n, e), this.videoElement = n, this.stream = e, yield this.playVideoOnLoadAsync(n), n;
          });
        }
        /**
         *
         * @param videoElement
         */
        playVideoOnLoadAsync(e) {
          return new Promise((t, n) => this.playVideoOnLoad(e, () => t()));
        }
        /**
         * Binds listeners and callbacks to the videoElement.
         *
         * @param element
         * @param callbackFn
         */
        playVideoOnLoad(e, t) {
          this.videoEndedListener = () => this.stopStreams(), this.videoCanPlayListener = () => this.tryPlayVideo(e), e.addEventListener("ended", this.videoEndedListener), e.addEventListener("canplay", this.videoCanPlayListener), e.addEventListener("playing", t), this.tryPlayVideo(e);
        }
        /**
         * Checks if the given video element is currently playing.
         */
        isVideoPlaying(e) {
          return e.currentTime > 0 && !e.paused && !e.ended && e.readyState > 2;
        }
        /**
         * Just tries to play the video and logs any errors.
         * The play call is only made is the video is not already playing.
         */
        tryPlayVideo(e) {
          return Ke(this, void 0, void 0, function* () {
            if (this.isVideoPlaying(e)) {
              console.warn("Trying to play video that is already playing.");
              return;
            }
            try {
              yield e.play();
            } catch {
              console.warn("It was not possible to play the video.");
            }
          });
        }
        /**
         * Searches and validates a media element.
         */
        getMediaElement(e, t) {
          const n = document.getElementById(e);
          if (!n)
            throw new v(`element with id '${e}' not found`);
          if (n.nodeName.toLowerCase() !== t.toLowerCase())
            throw new v(`element with id '${e}' must be an ${t} element`);
          return n;
        }
        /**
         * Decodes the barcode from an image.
         *
         * @param {(string|HTMLImageElement)} [source] The image element that can be either an element id or the element itself. Can be undefined in which case the decoding will be done from the imageUrl parameter.
         * @param {string} [url]
         * @returns {Promise<Result>} The decoding result.
         *
         * @memberOf BrowserCodeReader
         */
        decodeFromImage(e, t) {
          if (!e && !t)
            throw new v("either imageElement with a src set or an url must be provided");
          return t && !e ? this.decodeFromImageUrl(t) : this.decodeFromImageElement(e);
        }
        /**
         * Decodes the barcode from a video.
         *
         * @param {(string|HTMLImageElement)} [source] The image element that can be either an element id or the element itself. Can be undefined in which case the decoding will be done from the imageUrl parameter.
         * @param {string} [url]
         * @returns {Promise<Result>} The decoding result.
         *
         * @memberOf BrowserCodeReader
         */
        decodeFromVideo(e, t) {
          if (!e && !t)
            throw new v("Either an element with a src set or an URL must be provided");
          return t && !e ? this.decodeFromVideoUrl(t) : this.decodeFromVideoElement(e);
        }
        /**
         * Decodes continuously the barcode from a video.
         *
         * @param {(string|HTMLImageElement)} [source] The image element that can be either an element id or the element itself. Can be undefined in which case the decoding will be done from the imageUrl parameter.
         * @param {string} [url]
         * @returns {Promise<Result>} The decoding result.
         *
         * @memberOf BrowserCodeReader
         *
         * @experimental
         */
        decodeFromVideoContinuously(e, t, n) {
          if (e === void 0 && t === void 0)
            throw new v("Either an element with a src set or an URL must be provided");
          return t && !e ? this.decodeFromVideoUrlContinuously(t, n) : this.decodeFromVideoElementContinuously(e, n);
        }
        /**
         * Decodes something from an image HTML element.
         */
        decodeFromImageElement(e) {
          if (!e)
            throw new v("An image element must be provided.");
          this.reset();
          const t = this.prepareImageElement(e);
          this.imageElement = t;
          let n;
          return this.isImageLoaded(t) ? n = this.decodeOnce(t, !1, !0) : n = this._decodeOnLoadImage(t), n;
        }
        /**
         * Decodes something from an image HTML element.
         */
        decodeFromVideoElement(e) {
          const t = this._decodeFromVideoElementSetup(e);
          return this._decodeOnLoadVideo(t);
        }
        /**
         * Decodes something from an image HTML element.
         */
        decodeFromVideoElementContinuously(e, t) {
          const n = this._decodeFromVideoElementSetup(e);
          return this._decodeOnLoadVideoContinuously(n, t);
        }
        /**
         * Sets up the video source so it can be decoded when loaded.
         *
         * @param source The video source element.
         */
        _decodeFromVideoElementSetup(e) {
          if (!e)
            throw new v("A video element must be provided.");
          this.reset();
          const t = this.prepareVideoElement(e);
          return this.videoElement = t, t;
        }
        /**
         * Decodes an image from a URL.
         */
        decodeFromImageUrl(e) {
          if (!e)
            throw new v("An URL must be provided.");
          this.reset();
          const t = this.prepareImageElement();
          this.imageElement = t;
          const n = this._decodeOnLoadImage(t);
          return t.src = e, n;
        }
        /**
         * Decodes an image from a URL.
         */
        decodeFromVideoUrl(e) {
          if (!e)
            throw new v("An URL must be provided.");
          this.reset();
          const t = this.prepareVideoElement(), n = this.decodeFromVideoElement(t);
          return t.src = e, n;
        }
        /**
         * Decodes an image from a URL.
         *
         * @experimental
         */
        decodeFromVideoUrlContinuously(e, t) {
          if (!e)
            throw new v("An URL must be provided.");
          this.reset();
          const n = this.prepareVideoElement(), r = this.decodeFromVideoElementContinuously(n, t);
          return n.src = e, r;
        }
        _decodeOnLoadImage(e) {
          return new Promise((t, n) => {
            this.imageLoadedListener = () => this.decodeOnce(e, !1, !0).then(t, n), e.addEventListener("load", this.imageLoadedListener);
          });
        }
        _decodeOnLoadVideo(e) {
          return Ke(this, void 0, void 0, function* () {
            return yield this.playVideoOnLoadAsync(e), yield this.decodeOnce(e);
          });
        }
        _decodeOnLoadVideoContinuously(e, t) {
          return Ke(this, void 0, void 0, function* () {
            yield this.playVideoOnLoadAsync(e), this.decodeContinuously(e, t);
          });
        }
        isImageLoaded(e) {
          return !(!e.complete || e.naturalWidth === 0);
        }
        prepareImageElement(e) {
          let t;
          return typeof e > "u" && (t = document.createElement("img"), t.width = 200, t.height = 200), typeof e == "string" && (t = this.getMediaElement(e, "img")), e instanceof HTMLImageElement && (t = e), t;
        }
        /**
         * Sets a HTMLVideoElement for scanning or creates a new one.
         *
         * @param videoSource The HTMLVideoElement to be set.
         */
        prepareVideoElement(e) {
          let t;
          return !e && typeof document < "u" && (t = document.createElement("video"), t.width = 200, t.height = 200), typeof e == "string" && (t = this.getMediaElement(e, "video")), e instanceof HTMLVideoElement && (t = e), t.setAttribute("autoplay", "true"), t.setAttribute("muted", "true"), t.setAttribute("playsinline", "true"), t;
        }
        /**
         * Tries to decode from the video input until it finds some value.
         */
        decodeOnce(e, t = !0, n = !0) {
          this._stopAsyncDecode = !1;
          const r = (i, s) => {
            if (this._stopAsyncDecode) {
              s(new D("Video stream has ended before any code could be detected.")), this._stopAsyncDecode = void 0;
              return;
            }
            try {
              const o = this.decode(e);
              i(o);
            } catch (o) {
              const a = t && o instanceof D, u = (o instanceof q || o instanceof U) && n;
              if (a || u)
                return setTimeout(r, this._timeBetweenDecodingAttempts, i, s);
              s(o);
            }
          };
          return new Promise((i, s) => r(i, s));
        }
        /**
         * Continuously decodes from video input.
         */
        decodeContinuously(e, t) {
          this._stopContinuousDecode = !1;
          const n = () => {
            if (this._stopContinuousDecode) {
              this._stopContinuousDecode = void 0;
              return;
            }
            try {
              const r = this.decode(e);
              t(r, null), setTimeout(n, this.timeBetweenScansMillis);
            } catch (r) {
              t(null, r);
              const i = r instanceof q || r instanceof U, s = r instanceof D;
              (i || s) && setTimeout(n, this._timeBetweenDecodingAttempts);
            }
          };
          n();
        }
        /**
         * Gets the BinaryBitmap for ya! (and decodes it)
         */
        decode(e) {
          const t = this.createBinaryBitmap(e);
          return this.decodeBitmap(t);
        }
        /**
         * Returns true if media element is indeed a {@link HtmlVideoElement}.
         */
        _isHTMLVideoElement(e) {
          return e.videoWidth !== 0;
        }
        /**
         * Overwriting this allows you to manipulate the next frame in anyway
         * you want before decode.
         */
        drawFrameOnCanvas(e, t, n) {
          t || (t = {
            sx: 0,
            sy: 0,
            sWidth: e.videoWidth,
            sHeight: e.videoHeight,
            dx: 0,
            dy: 0,
            dWidth: e.videoWidth,
            dHeight: e.videoHeight
          }), n || (n = this.captureCanvasContext), n.drawImage(
            e,
            t.sx,
            t.sy,
            t.sWidth,
            t.sHeight,
            t.dx,
            t.dy,
            t.dWidth,
            t.dHeight
          );
        }
        /**
         * Ovewriting this allows you to manipulate the snapshot image in anyway
         *  you want before decode.
         */
        drawImageOnCanvas(e, t, n = this.captureCanvasContext) {
          t || (t = {
            sx: 0,
            sy: 0,
            sWidth: e.naturalWidth,
            sHeight: e.naturalHeight,
            dx: 0,
            dy: 0,
            dWidth: e.naturalWidth,
            dHeight: e.naturalHeight
          }), n || (n = this.captureCanvasContext), n.drawImage(
            e,
            t.sx,
            t.sy,
            t.sWidth,
            t.sHeight,
            t.dx,
            t.dy,
            t.dWidth,
            t.dHeight
          );
        }
        /**
         * Creates a binaryBitmap based in some image source.
         *
         * @param mediaElement HTML element containing drawable image source.
         */
        createBinaryBitmap(e) {
          this.getCaptureCanvasContext(e), this._isHTMLVideoElement(e) ? this.drawFrameOnCanvas(e) : this.drawImageOnCanvas(e);
          const t = this.getCaptureCanvas(e), n = new Ot(t), r = new J(n);
          return new ne(r);
        }
        getCaptureCanvasContext(e) {
          if (!this.captureCanvasContext) {
            const n = this.getCaptureCanvas(e).getContext("2d");
            this.captureCanvasContext = n;
          }
          return this.captureCanvasContext;
        }
        getCaptureCanvas(e) {
          if (!this.captureCanvas) {
            const t = this.createCaptureCanvas(e);
            this.captureCanvas = t;
          }
          return this.captureCanvas;
        }
        /**
         * Call the encapsulated readers decode
         */
        decodeBitmap(e) {
          return this.reader.decode(e, this._hints);
        }
        /**
         * 🖌 Prepares the canvas for capture and scan frames.
         */
        createCaptureCanvas(e) {
          if (typeof document > "u")
            return this._destroyCaptureCanvas(), null;
          const t = document.createElement("canvas");
          let n, r;
          return typeof e < "u" && (e instanceof HTMLVideoElement ? (n = e.videoWidth, r = e.videoHeight) : e instanceof HTMLImageElement && (n = e.naturalWidth || e.width, r = e.naturalHeight || e.height)), t.style.width = n + "px", t.style.height = r + "px", t.width = n, t.height = r, t;
        }
        /**
         * Stops the continuous scan and cleans the stream.
         */
        stopStreams() {
          this.stream && (this.stream.getVideoTracks().forEach((e) => e.stop()), this.stream = void 0), this._stopAsyncDecode === !1 && this.stopAsyncDecode(), this._stopContinuousDecode === !1 && this.stopContinuousDecode();
        }
        /**
         * Resets the code reader to the initial state. Cancels any ongoing barcode scanning from video or camera.
         *
         * @memberOf BrowserCodeReader
         */
        reset() {
          this.stopStreams(), this._destroyVideoElement(), this._destroyImageElement(), this._destroyCaptureCanvas();
        }
        _destroyVideoElement() {
          this.videoElement && (typeof this.videoEndedListener < "u" && this.videoElement.removeEventListener("ended", this.videoEndedListener), typeof this.videoPlayingEventListener < "u" && this.videoElement.removeEventListener("playing", this.videoPlayingEventListener), typeof this.videoCanPlayListener < "u" && this.videoElement.removeEventListener("loadedmetadata", this.videoCanPlayListener), this.cleanVideoSource(this.videoElement), this.videoElement = void 0);
        }
        _destroyImageElement() {
          this.imageElement && (this.imageLoadedListener !== void 0 && this.imageElement.removeEventListener("load", this.imageLoadedListener), this.imageElement.src = void 0, this.imageElement.removeAttribute("src"), this.imageElement = void 0);
        }
        /**
         * Cleans canvas references 🖌
         */
        _destroyCaptureCanvas() {
          this.captureCanvasContext = void 0, this.captureCanvas = void 0;
        }
        /**
         * Defines what the videoElement src will be.
         *
         * @param videoElement
         * @param stream
         */
        addVideoSource(e, t) {
          try {
            e.srcObject = t;
          } catch {
            e.src = URL.createObjectURL(t);
          }
        }
        /**
         * Unbinds a HTML video src property.
         *
         * @param videoElement
         */
        cleanVideoSource(e) {
          try {
            e.srcObject = null;
          } catch {
            e.src = "";
          }
          this.videoElement.removeAttribute("src");
        }
      }
      class qe {
        // public constructor(private text: string,
        //               Uint8Array rawBytes,
        //               ResultPoconst resultPoints: Int32Array,
        //               BarcodeFormat format) {
        //   this(text, rawBytes, resultPoints, format, System.currentTimeMillis())
        // }
        // public constructor(text: string,
        //               Uint8Array rawBytes,
        //               ResultPoconst resultPoints: Int32Array,
        //               BarcodeFormat format,
        //               long timestamp) {
        //   this(text, rawBytes, rawBytes == null ? 0 : 8 * rawBytes.length,
        //        resultPoints, format, timestamp)
        // }
        constructor(e, t, n = t == null ? 0 : 8 * t.length, r, i, s = ie.currentTimeMillis()) {
          this.text = e, this.rawBytes = t, this.numBits = n, this.resultPoints = r, this.format = i, this.timestamp = s, this.text = e, this.rawBytes = t, n == null ? this.numBits = t == null ? 0 : 8 * t.length : this.numBits = n, this.resultPoints = r, this.format = i, this.resultMetadata = null, s == null ? this.timestamp = ie.currentTimeMillis() : this.timestamp = s;
        }
        /**
         * @return raw text encoded by the barcode
         */
        getText() {
          return this.text;
        }
        /**
         * @return raw bytes encoded by the barcode, if applicable, otherwise {@code null}
         */
        getRawBytes() {
          return this.rawBytes;
        }
        /**
         * @return how many bits of {@link #getRawBytes()} are valid; typically 8 times its length
         * @since 3.3.0
         */
        getNumBits() {
          return this.numBits;
        }
        /**
         * @return points related to the barcode in the image. These are typically points
         *         identifying finder patterns or the corners of the barcode. The exact meaning is
         *         specific to the type of barcode that was decoded.
         */
        getResultPoints() {
          return this.resultPoints;
        }
        /**
         * @return {@link BarcodeFormat} representing the format of the barcode that was decoded
         */
        getBarcodeFormat() {
          return this.format;
        }
        /**
         * @return {@link Map} mapping {@link ResultMetadataType} keys to values. May be
         *   {@code null}. This contains optional metadata about what was detected about the barcode,
         *   like orientation.
         */
        getResultMetadata() {
          return this.resultMetadata;
        }
        putMetadata(e, t) {
          this.resultMetadata === null && (this.resultMetadata = /* @__PURE__ */ new Map()), this.resultMetadata.set(e, t);
        }
        putAllMetadata(e) {
          e !== null && (this.resultMetadata === null ? this.resultMetadata = e : this.resultMetadata = new Map(e));
        }
        addResultPoints(e) {
          const t = this.resultPoints;
          if (t === null)
            this.resultPoints = e;
          else if (e !== null && e.length > 0) {
            const n = new Array(t.length + e.length);
            ie.arraycopy(t, 0, n, 0, t.length), ie.arraycopy(e, 0, n, t.length, e.length), this.resultPoints = n;
          }
        }
        getTimestamp() {
          return this.timestamp;
        }
        /*@Override*/
        toString() {
          return this.text;
        }
      }
      var ar;
      (function(f) {
        f[f.AZTEC = 0] = "AZTEC", f[f.CODABAR = 1] = "CODABAR", f[f.CODE_39 = 2] = "CODE_39", f[f.CODE_93 = 3] = "CODE_93", f[f.CODE_128 = 4] = "CODE_128", f[f.DATA_MATRIX = 5] = "DATA_MATRIX", f[f.EAN_8 = 6] = "EAN_8", f[f.EAN_13 = 7] = "EAN_13", f[f.ITF = 8] = "ITF", f[f.MAXICODE = 9] = "MAXICODE", f[f.PDF_417 = 10] = "PDF_417", f[f.QR_CODE = 11] = "QR_CODE", f[f.RSS_14 = 12] = "RSS_14", f[f.RSS_EXPANDED = 13] = "RSS_EXPANDED", f[f.UPC_A = 14] = "UPC_A", f[f.UPC_E = 15] = "UPC_E", f[f.UPC_EAN_EXTENSION = 16] = "UPC_EAN_EXTENSION";
      })(ar || (ar = {}));
      var Y = ar, lr;
      (function(f) {
        f[f.OTHER = 0] = "OTHER", f[f.ORIENTATION = 1] = "ORIENTATION", f[f.BYTE_SEGMENTS = 2] = "BYTE_SEGMENTS", f[f.ERROR_CORRECTION_LEVEL = 3] = "ERROR_CORRECTION_LEVEL", f[f.ISSUE_NUMBER = 4] = "ISSUE_NUMBER", f[f.SUGGESTED_PRICE = 5] = "SUGGESTED_PRICE", f[f.POSSIBLE_COUNTRY = 6] = "POSSIBLE_COUNTRY", f[f.UPC_EAN_EXTENSION = 7] = "UPC_EAN_EXTENSION", f[f.PDF417_EXTRA_METADATA = 8] = "PDF417_EXTRA_METADATA", f[f.STRUCTURED_APPEND_SEQUENCE = 9] = "STRUCTURED_APPEND_SEQUENCE", f[f.STRUCTURED_APPEND_PARITY = 10] = "STRUCTURED_APPEND_PARITY";
      })(lr || (lr = {}));
      var Ue = lr;
      class wn {
        // public constructor(rawBytes: Uint8Array,
        //                      text: string,
        //                      List<Uint8Array> byteSegments,
        //                      String ecLevel) {
        //   this(rawBytes, text, byteSegments, ecLevel, -1, -1)
        // }
        constructor(e, t, n, r, i = -1, s = -1) {
          this.rawBytes = e, this.text = t, this.byteSegments = n, this.ecLevel = r, this.structuredAppendSequenceNumber = i, this.structuredAppendParity = s, this.numBits = e == null ? 0 : 8 * e.length;
        }
        /**
         * @return raw bytes representing the result, or {@code null} if not applicable
         */
        getRawBytes() {
          return this.rawBytes;
        }
        /**
         * @return how many bits of {@link #getRawBytes()} are valid; typically 8 times its length
         * @since 3.3.0
         */
        getNumBits() {
          return this.numBits;
        }
        /**
         * @param numBits overrides the number of bits that are valid in {@link #getRawBytes()}
         * @since 3.3.0
         */
        setNumBits(e) {
          this.numBits = e;
        }
        /**
         * @return text representation of the result
         */
        getText() {
          return this.text;
        }
        /**
         * @return list of byte segments in the result, or {@code null} if not applicable
         */
        getByteSegments() {
          return this.byteSegments;
        }
        /**
         * @return name of error correction level used, or {@code null} if not applicable
         */
        getECLevel() {
          return this.ecLevel;
        }
        /**
         * @return number of errors corrected, or {@code null} if not applicable
         */
        getErrorsCorrected() {
          return this.errorsCorrected;
        }
        setErrorsCorrected(e) {
          this.errorsCorrected = e;
        }
        /**
         * @return number of erasures corrected, or {@code null} if not applicable
         */
        getErasures() {
          return this.erasures;
        }
        setErasures(e) {
          this.erasures = e;
        }
        /**
         * @return arbitrary additional metadata
         */
        getOther() {
          return this.other;
        }
        setOther(e) {
          this.other = e;
        }
        hasStructuredAppend() {
          return this.structuredAppendParity >= 0 && this.structuredAppendSequenceNumber >= 0;
        }
        getStructuredAppendParity() {
          return this.structuredAppendParity;
        }
        getStructuredAppendSequenceNumber() {
          return this.structuredAppendSequenceNumber;
        }
      }
      class An {
        /**
         * @return 2 to the power of a in GF(size)
         */
        exp(e) {
          return this.expTable[e];
        }
        /**
         * @return base 2 log of a in GF(size)
         */
        log(e) {
          if (e === 0)
            throw new R();
          return this.logTable[e];
        }
        /**
         * Implements both addition and subtraction -- they are the same in GF(size).
         *
         * @return sum/difference of a and b
         */
        static addOrSubtract(e, t) {
          return e ^ t;
        }
      }
      class et {
        /**
         * @param field the {@link GenericGF} instance representing the field to use
         * to perform computations
         * @param coefficients coefficients as ints representing elements of GF(size), arranged
         * from most significant (highest-power term) coefficient to least significant
         * @throws IllegalArgumentException if argument is null or empty,
         * or if leading coefficient is 0 and this is not a
         * constant polynomial (that is, it is not the monomial "0")
         */
        constructor(e, t) {
          if (t.length === 0)
            throw new R();
          this.field = e;
          const n = t.length;
          if (n > 1 && t[0] === 0) {
            let r = 1;
            for (; r < n && t[r] === 0; )
              r++;
            r === n ? this.coefficients = Int32Array.from([0]) : (this.coefficients = new Int32Array(n - r), ie.arraycopy(t, r, this.coefficients, 0, this.coefficients.length));
          } else
            this.coefficients = t;
        }
        getCoefficients() {
          return this.coefficients;
        }
        /**
         * @return degree of this polynomial
         */
        getDegree() {
          return this.coefficients.length - 1;
        }
        /**
         * @return true iff this polynomial is the monomial "0"
         */
        isZero() {
          return this.coefficients[0] === 0;
        }
        /**
         * @return coefficient of x^degree term in this polynomial
         */
        getCoefficient(e) {
          return this.coefficients[this.coefficients.length - 1 - e];
        }
        /**
         * @return evaluation of this polynomial at a given point
         */
        evaluateAt(e) {
          if (e === 0)
            return this.getCoefficient(0);
          const t = this.coefficients;
          let n;
          if (e === 1) {
            n = 0;
            for (let s = 0, o = t.length; s !== o; s++) {
              const a = t[s];
              n = An.addOrSubtract(n, a);
            }
            return n;
          }
          n = t[0];
          const r = t.length, i = this.field;
          for (let s = 1; s < r; s++)
            n = An.addOrSubtract(i.multiply(e, n), t[s]);
          return n;
        }
        addOrSubtract(e) {
          if (!this.field.equals(e.field))
            throw new R("GenericGFPolys do not have same GenericGF field");
          if (this.isZero())
            return e;
          if (e.isZero())
            return this;
          let t = this.coefficients, n = e.coefficients;
          if (t.length > n.length) {
            const s = t;
            t = n, n = s;
          }
          let r = new Int32Array(n.length);
          const i = n.length - t.length;
          ie.arraycopy(n, 0, r, 0, i);
          for (let s = i; s < n.length; s++)
            r[s] = An.addOrSubtract(t[s - i], n[s]);
          return new et(this.field, r);
        }
        multiply(e) {
          if (!this.field.equals(e.field))
            throw new R("GenericGFPolys do not have same GenericGF field");
          if (this.isZero() || e.isZero())
            return this.field.getZero();
          const t = this.coefficients, n = t.length, r = e.coefficients, i = r.length, s = new Int32Array(n + i - 1), o = this.field;
          for (let a = 0; a < n; a++) {
            const l = t[a];
            for (let u = 0; u < i; u++)
              s[a + u] = An.addOrSubtract(s[a + u], o.multiply(l, r[u]));
          }
          return new et(o, s);
        }
        multiplyScalar(e) {
          if (e === 0)
            return this.field.getZero();
          if (e === 1)
            return this;
          const t = this.coefficients.length, n = this.field, r = new Int32Array(t), i = this.coefficients;
          for (let s = 0; s < t; s++)
            r[s] = n.multiply(i[s], e);
          return new et(n, r);
        }
        multiplyByMonomial(e, t) {
          if (e < 0)
            throw new R();
          if (t === 0)
            return this.field.getZero();
          const n = this.coefficients, r = n.length, i = new Int32Array(r + e), s = this.field;
          for (let o = 0; o < r; o++)
            i[o] = s.multiply(n[o], t);
          return new et(s, i);
        }
        divide(e) {
          if (!this.field.equals(e.field))
            throw new R("GenericGFPolys do not have same GenericGF field");
          if (e.isZero())
            throw new R("Divide by 0");
          const t = this.field;
          let n = t.getZero(), r = this;
          const i = e.getCoefficient(e.getDegree()), s = t.inverse(i);
          for (; r.getDegree() >= e.getDegree() && !r.isZero(); ) {
            const o = r.getDegree() - e.getDegree(), a = t.multiply(r.getCoefficient(r.getDegree()), s), l = e.multiplyByMonomial(o, a), u = t.buildMonomial(o, a);
            n = n.addOrSubtract(u), r = r.addOrSubtract(l);
          }
          return [n, r];
        }
        /*@Override*/
        toString() {
          let e = "";
          for (let t = this.getDegree(); t >= 0; t--) {
            let n = this.getCoefficient(t);
            if (n !== 0) {
              if (n < 0 ? (e += " - ", n = -n) : e.length > 0 && (e += " + "), t === 0 || n !== 1) {
                const r = this.field.log(n);
                r === 0 ? e += "1" : r === 1 ? e += "a" : (e += "a^", e += r);
              }
              t !== 0 && (t === 1 ? e += "x" : (e += "x^", e += t));
            }
          }
          return e;
        }
      }
      class Fn extends m {
      }
      Fn.kind = "ArithmeticException";
      class ce extends An {
        /**
         * Create a representation of GF(size) using the given primitive polynomial.
         *
         * @param primitive irreducible polynomial whose coefficients are represented by
         *  the bits of an int, where the least-significant bit represents the constant
         *  coefficient
         * @param size the size of the field
         * @param b the factor b in the generator polynomial can be 0- or 1-based
         *  (g(x) = (x+a^b)(x+a^(b+1))...(x+a^(b+2t-1))).
         *  In most cases it should be 1, but for QR code it is 0.
         */
        constructor(e, t, n) {
          super(), this.primitive = e, this.size = t, this.generatorBase = n;
          const r = new Int32Array(t);
          let i = 1;
          for (let o = 0; o < t; o++)
            r[o] = i, i *= 2, i >= t && (i ^= e, i &= t - 1);
          this.expTable = r;
          const s = new Int32Array(t);
          for (let o = 0; o < t - 1; o++)
            s[r[o]] = o;
          this.logTable = s, this.zero = new et(this, Int32Array.from([0])), this.one = new et(this, Int32Array.from([1]));
        }
        getZero() {
          return this.zero;
        }
        getOne() {
          return this.one;
        }
        /**
         * @return the monomial representing coefficient * x^degree
         */
        buildMonomial(e, t) {
          if (e < 0)
            throw new R();
          if (t === 0)
            return this.zero;
          const n = new Int32Array(e + 1);
          return n[0] = t, new et(this, n);
        }
        /**
         * @return multiplicative inverse of a
         */
        inverse(e) {
          if (e === 0)
            throw new Fn();
          return this.expTable[this.size - this.logTable[e] - 1];
        }
        /**
         * @return product of a and b in GF(size)
         */
        multiply(e, t) {
          return e === 0 || t === 0 ? 0 : this.expTable[(this.logTable[e] + this.logTable[t]) % (this.size - 1)];
        }
        getSize() {
          return this.size;
        }
        getGeneratorBase() {
          return this.generatorBase;
        }
        /*@Override*/
        toString() {
          return "GF(0x" + K.toHexString(this.primitive) + "," + this.size + ")";
        }
        equals(e) {
          return e === this;
        }
      }
      ce.AZTEC_DATA_12 = new ce(4201, 4096, 1), ce.AZTEC_DATA_10 = new ce(1033, 1024, 1), ce.AZTEC_DATA_6 = new ce(67, 64, 1), ce.AZTEC_PARAM = new ce(19, 16, 1), ce.QR_CODE_FIELD_256 = new ce(285, 256, 0), ce.DATA_MATRIX_FIELD_256 = new ce(301, 256, 1), ce.AZTEC_DATA_8 = ce.DATA_MATRIX_FIELD_256, ce.MAXICODE_FIELD_64 = ce.AZTEC_DATA_6;
      class $t extends m {
      }
      $t.kind = "ReedSolomonException";
      class wt extends m {
      }
      wt.kind = "IllegalStateException";
      class En {
        constructor(e) {
          this.field = e;
        }
        /**
         * <p>Decodes given set of received codewords, which include both data and error-correction
         * codewords. Really, this means it uses Reed-Solomon to detect and correct errors, in-place,
         * in the input.</p>
         *
         * @param received data and error-correction codewords
         * @param twoS number of error-correction codewords available
         * @throws ReedSolomonException if decoding fails for any reason
         */
        decode(e, t) {
          const n = this.field, r = new et(n, e), i = new Int32Array(t);
          let s = !0;
          for (let p = 0; p < t; p++) {
            const I = r.evaluateAt(n.exp(p + n.getGeneratorBase()));
            i[i.length - 1 - p] = I, I !== 0 && (s = !1);
          }
          if (s)
            return;
          const o = new et(n, i), a = this.runEuclideanAlgorithm(n.buildMonomial(t, 1), o, t), l = a[0], u = a[1], d = this.findErrorLocations(l), A = this.findErrorMagnitudes(u, d);
          for (let p = 0; p < d.length; p++) {
            const I = e.length - 1 - n.log(d[p]);
            if (I < 0)
              throw new $t("Bad error location");
            e[I] = ce.addOrSubtract(e[I], A[p]);
          }
        }
        runEuclideanAlgorithm(e, t, n) {
          if (e.getDegree() < t.getDegree()) {
            const p = e;
            e = t, t = p;
          }
          const r = this.field;
          let i = e, s = t, o = r.getZero(), a = r.getOne();
          for (; s.getDegree() >= (n / 2 | 0); ) {
            let p = i, I = o;
            if (i = s, o = a, i.isZero())
              throw new $t("r_{i-1} was zero");
            s = p;
            let y = r.getZero();
            const _ = i.getCoefficient(i.getDegree()), N = r.inverse(_);
            for (; s.getDegree() >= i.getDegree() && !s.isZero(); ) {
              const L = s.getDegree() - i.getDegree(), F = r.multiply(s.getCoefficient(s.getDegree()), N);
              y = y.addOrSubtract(r.buildMonomial(L, F)), s = s.addOrSubtract(i.multiplyByMonomial(L, F));
            }
            if (a = y.multiply(o).addOrSubtract(I), s.getDegree() >= i.getDegree())
              throw new wt("Division algorithm failed to reduce polynomial?");
          }
          const l = a.getCoefficient(0);
          if (l === 0)
            throw new $t("sigmaTilde(0) was zero");
          const u = r.inverse(l), d = a.multiplyScalar(u), A = s.multiplyScalar(u);
          return [d, A];
        }
        findErrorLocations(e) {
          const t = e.getDegree();
          if (t === 1)
            return Int32Array.from([e.getCoefficient(1)]);
          const n = new Int32Array(t);
          let r = 0;
          const i = this.field;
          for (let s = 1; s < i.getSize() && r < t; s++)
            e.evaluateAt(s) === 0 && (n[r] = i.inverse(s), r++);
          if (r !== t)
            throw new $t("Error locator degree does not match number of roots");
          return n;
        }
        findErrorMagnitudes(e, t) {
          const n = t.length, r = new Int32Array(n), i = this.field;
          for (let s = 0; s < n; s++) {
            const o = i.inverse(t[s]);
            let a = 1;
            for (let l = 0; l < n; l++)
              if (s !== l) {
                const u = i.multiply(t[l], o), d = (u & 1) === 0 ? u | 1 : u & -2;
                a = i.multiply(a, d);
              }
            r[s] = i.multiply(e.evaluateAt(o), i.inverse(a)), i.getGeneratorBase() !== 0 && (r[s] = i.multiply(r[s], o));
          }
          return r;
        }
      }
      var We;
      (function(f) {
        f[f.UPPER = 0] = "UPPER", f[f.LOWER = 1] = "LOWER", f[f.MIXED = 2] = "MIXED", f[f.DIGIT = 3] = "DIGIT", f[f.PUNCT = 4] = "PUNCT", f[f.BINARY = 5] = "BINARY";
      })(We || (We = {}));
      class me {
        decode(e) {
          this.ddata = e;
          let t = e.getBits(), n = this.extractBits(t), r = this.correctBits(n), i = me.convertBoolArrayToByteArray(r), s = me.getEncodedData(r), o = new wn(i, s, null, null);
          return o.setNumBits(r.length), o;
        }
        // This method is used for testing the high-level encoder
        static highLevelDecode(e) {
          return this.getEncodedData(e);
        }
        /**
         * Gets the string encoded in the aztec code bits
         *
         * @return the decoded string
         */
        static getEncodedData(e) {
          let t = e.length, n = We.UPPER, r = We.UPPER, i = "", s = 0;
          for (; s < t; )
            if (r === We.BINARY) {
              if (t - s < 5)
                break;
              let o = me.readCode(e, s, 5);
              if (s += 5, o === 0) {
                if (t - s < 11)
                  break;
                o = me.readCode(e, s, 11) + 31, s += 11;
              }
              for (let a = 0; a < o; a++) {
                if (t - s < 8) {
                  s = t;
                  break;
                }
                const l = me.readCode(e, s, 8);
                i += /*(char)*/
                Q.castAsNonUtf8Char(l), s += 8;
              }
              r = n;
            } else {
              let o = r === We.DIGIT ? 4 : 5;
              if (t - s < o)
                break;
              let a = me.readCode(e, s, o);
              s += o;
              let l = me.getCharacter(r, a);
              l.startsWith("CTRL_") ? (n = r, r = me.getTable(l.charAt(5)), l.charAt(6) === "L" && (n = r)) : (i += l, r = n);
            }
          return i;
        }
        /**
         * gets the table corresponding to the char passed
         */
        static getTable(e) {
          switch (e) {
            case "L":
              return We.LOWER;
            case "P":
              return We.PUNCT;
            case "M":
              return We.MIXED;
            case "D":
              return We.DIGIT;
            case "B":
              return We.BINARY;
            case "U":
            default:
              return We.UPPER;
          }
        }
        /**
         * Gets the character (or string) corresponding to the passed code in the given table
         *
         * @param table the table used
         * @param code the code of the character
         */
        static getCharacter(e, t) {
          switch (e) {
            case We.UPPER:
              return me.UPPER_TABLE[t];
            case We.LOWER:
              return me.LOWER_TABLE[t];
            case We.MIXED:
              return me.MIXED_TABLE[t];
            case We.PUNCT:
              return me.PUNCT_TABLE[t];
            case We.DIGIT:
              return me.DIGIT_TABLE[t];
            default:
              throw new wt("Bad table");
          }
        }
        /**
         * <p>Performs RS error correction on an array of bits.</p>
         *
         * @return the corrected array
         * @throws FormatException if the input contains too many errors
         */
        correctBits(e) {
          let t, n;
          this.ddata.getNbLayers() <= 2 ? (n = 6, t = ce.AZTEC_DATA_6) : this.ddata.getNbLayers() <= 8 ? (n = 8, t = ce.AZTEC_DATA_8) : this.ddata.getNbLayers() <= 22 ? (n = 10, t = ce.AZTEC_DATA_10) : (n = 12, t = ce.AZTEC_DATA_12);
          let r = this.ddata.getNbDatablocks(), i = e.length / n;
          if (i < r)
            throw new U();
          let s = e.length % n, o = new Int32Array(i);
          for (let A = 0; A < i; A++, s += n)
            o[A] = me.readCode(e, s, n);
          try {
            new En(t).decode(o, i - r);
          } catch (A) {
            throw new U(A);
          }
          let a = (1 << n) - 1, l = 0;
          for (let A = 0; A < r; A++) {
            let p = o[A];
            if (p === 0 || p === a)
              throw new U();
            (p === 1 || p === a - 1) && l++;
          }
          let u = new Array(r * n - l), d = 0;
          for (let A = 0; A < r; A++) {
            let p = o[A];
            if (p === 1 || p === a - 1)
              u.fill(p > 1, d, d + n - 1), d += n - 1;
            else
              for (let I = n - 1; I >= 0; --I)
                u[d++] = (p & 1 << I) !== 0;
          }
          return u;
        }
        /**
         * Gets the array of bits from an Aztec Code matrix
         *
         * @return the array of bits
         */
        extractBits(e) {
          let t = this.ddata.isCompact(), n = this.ddata.getNbLayers(), r = (t ? 11 : 14) + n * 4, i = new Int32Array(r), s = new Array(this.totalBitsInLayer(n, t));
          if (t)
            for (let o = 0; o < i.length; o++)
              i[o] = o;
          else {
            let o = r + 1 + 2 * K.truncDivision(K.truncDivision(r, 2) - 1, 15), a = r / 2, l = K.truncDivision(o, 2);
            for (let u = 0; u < a; u++) {
              let d = u + K.truncDivision(u, 15);
              i[a - u - 1] = l - d - 1, i[a + u] = l + d + 1;
            }
          }
          for (let o = 0, a = 0; o < n; o++) {
            let l = (n - o) * 4 + (t ? 9 : 12), u = o * 2, d = r - 1 - u;
            for (let A = 0; A < l; A++) {
              let p = A * 2;
              for (let I = 0; I < 2; I++)
                s[a + p + I] = e.get(i[u + I], i[u + A]), s[a + 2 * l + p + I] = e.get(i[u + A], i[d - I]), s[a + 4 * l + p + I] = e.get(i[d - I], i[d - A]), s[a + 6 * l + p + I] = e.get(i[d - A], i[u + I]);
            }
            a += l * 8;
          }
          return s;
        }
        /**
         * Reads a code of given length and at given index in an array of bits
         */
        static readCode(e, t, n) {
          let r = 0;
          for (let i = t; i < t + n; i++)
            r <<= 1, e[i] && (r |= 1);
          return r;
        }
        /**
         * Reads a code of length 8 in an array of bits, padding with zeros
         */
        static readByte(e, t) {
          let n = e.length - t;
          return n >= 8 ? me.readCode(e, t, 8) : me.readCode(e, t, n) << 8 - n;
        }
        /**
         * Packs a bit array into bytes, most significant bit first
         */
        static convertBoolArrayToByteArray(e) {
          let t = new Uint8Array((e.length + 7) / 8);
          for (let n = 0; n < t.length; n++)
            t[n] = me.readByte(e, 8 * n);
          return t;
        }
        totalBitsInLayer(e, t) {
          return ((t ? 88 : 112) + 16 * e) * e;
        }
      }
      me.UPPER_TABLE = [
        "CTRL_PS",
        " ",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "CTRL_LL",
        "CTRL_ML",
        "CTRL_DL",
        "CTRL_BS"
      ], me.LOWER_TABLE = [
        "CTRL_PS",
        " ",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "CTRL_US",
        "CTRL_ML",
        "CTRL_DL",
        "CTRL_BS"
      ], me.MIXED_TABLE = [
        // Module parse failed: Octal literal in strict mode (50:29)
        // so number string were scaped
        "CTRL_PS",
        " ",
        "\\1",
        "\\2",
        "\\3",
        "\\4",
        "\\5",
        "\\6",
        "\\7",
        "\b",
        "	",
        `
`,
        "\\13",
        "\f",
        "\r",
        "\\33",
        "\\34",
        "\\35",
        "\\36",
        "\\37",
        "@",
        "\\",
        "^",
        "_",
        "`",
        "|",
        "~",
        "\\177",
        "CTRL_LL",
        "CTRL_UL",
        "CTRL_PL",
        "CTRL_BS"
      ], me.PUNCT_TABLE = [
        "",
        "\r",
        `\r
`,
        ". ",
        ", ",
        ": ",
        "!",
        '"',
        "#",
        "$",
        "%",
        "&",
        "'",
        "(",
        ")",
        "*",
        "+",
        ",",
        "-",
        ".",
        "/",
        ":",
        ";",
        "<",
        "=",
        ">",
        "?",
        "[",
        "]",
        "{",
        "}",
        "CTRL_UL"
      ], me.DIGIT_TABLE = [
        "CTRL_PS",
        " ",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ",",
        ".",
        "CTRL_UL",
        "CTRL_US"
      ];
      class oe {
        constructor() {
        }
        /**
         * Ends up being a bit faster than {@link Math#round(float)}. This merely rounds its
         * argument to the nearest int, where x.5 rounds up to x+1. Semantics of this shortcut
         * differ slightly from {@link Math#round(float)} in that half rounds down for negative
         * values. -2.5 rounds to -3, not -2. For purposes here it makes no difference.
         *
         * @param d real value to round
         * @return nearest {@code int}
         */
        static round(e) {
          return e === NaN ? 0 : e <= Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : e >= Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : (
            /*(int) */
            e + (e < 0 ? -0.5 : 0.5) | 0
          );
        }
        // TYPESCRIPTPORT: maybe remove round method and call directly Math.round, it looks like it doesn't make sense for js
        /**
         * @param aX point A x coordinate
         * @param aY point A y coordinate
         * @param bX point B x coordinate
         * @param bY point B y coordinate
         * @return Euclidean distance between points A and B
         */
        static distance(e, t, n, r) {
          const i = e - n, s = t - r;
          return (
            /*(float) */
            Math.sqrt(i * i + s * s)
          );
        }
        /**
         * @param aX point A x coordinate
         * @param aY point A y coordinate
         * @param bX point B x coordinate
         * @param bY point B y coordinate
         * @return Euclidean distance between points A and B
         */
        // public static distance(aX: number /*int*/, aY: number /*int*/, bX: number /*int*/, bY: number /*int*/): float {
        //   const xDiff = aX - bX
        //   const yDiff = aY - bY
        //   return (float) Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        // }
        /**
         * @param array values to sum
         * @return sum of values in array
         */
        static sum(e) {
          let t = 0;
          for (let n = 0, r = e.length; n !== r; n++) {
            const i = e[n];
            t += i;
          }
          return t;
        }
      }
      class kn {
        /**
         * SincTS has no difference between int and float, there's all numbers,
         * this is used only to polyfill Java code.
         */
        static floatToIntBits(e) {
          return e;
        }
      }
      kn.MAX_VALUE = Number.MAX_SAFE_INTEGER;
      class W {
        constructor(e, t) {
          this.x = e, this.y = t;
        }
        getX() {
          return this.x;
        }
        getY() {
          return this.y;
        }
        /*@Override*/
        equals(e) {
          if (e instanceof W) {
            const t = e;
            return this.x === t.x && this.y === t.y;
          }
          return !1;
        }
        /*@Override*/
        hashCode() {
          return 31 * kn.floatToIntBits(this.x) + kn.floatToIntBits(this.y);
        }
        /*@Override*/
        toString() {
          return "(" + this.x + "," + this.y + ")";
        }
        /**
         * Orders an array of three ResultPoints in an order [A,B,C] such that AB is less than AC
         * and BC is less than AC, and the angle between BC and BA is less than 180 degrees.
         *
         * @param patterns array of three {@code ResultPoint} to order
         */
        static orderBestPatterns(e) {
          const t = this.distance(e[0], e[1]), n = this.distance(e[1], e[2]), r = this.distance(e[0], e[2]);
          let i, s, o;
          if (n >= t && n >= r ? (s = e[0], i = e[1], o = e[2]) : r >= n && r >= t ? (s = e[1], i = e[0], o = e[2]) : (s = e[2], i = e[0], o = e[1]), this.crossProductZ(i, s, o) < 0) {
            const a = i;
            i = o, o = a;
          }
          e[0] = i, e[1] = s, e[2] = o;
        }
        /**
         * @param pattern1 first pattern
         * @param pattern2 second pattern
         * @return distance between two points
         */
        static distance(e, t) {
          return oe.distance(e.x, e.y, t.x, t.y);
        }
        /**
         * Returns the z component of the cross product between vectors BC and BA.
         */
        static crossProductZ(e, t, n) {
          const r = t.x, i = t.y;
          return (n.x - r) * (e.y - i) - (n.y - i) * (e.x - r);
        }
      }
      class Un {
        constructor(e, t) {
          this.bits = e, this.points = t;
        }
        getBits() {
          return this.bits;
        }
        getPoints() {
          return this.points;
        }
      }
      class Xr extends Un {
        constructor(e, t, n, r, i) {
          super(e, t), this.compact = n, this.nbDatablocks = r, this.nbLayers = i;
        }
        getNbLayers() {
          return this.nbLayers;
        }
        getNbDatablocks() {
          return this.nbDatablocks;
        }
        isCompact() {
          return this.compact;
        }
      }
      class bt {
        // public constructor(private image: BitMatrix) /*throws NotFoundException*/ {
        //   this(image, INIT_SIZE, image.getWidth() / 2, image.getHeight() / 2)
        // }
        /**
         * @param image barcode image to find a rectangle in
         * @param initSize initial size of search area around center
         * @param x x position of search center
         * @param y y position of search center
         * @throws NotFoundException if image is too small to accommodate {@code initSize}
         */
        constructor(e, t, n, r) {
          this.image = e, this.height = e.getHeight(), this.width = e.getWidth(), t == null && (t = bt.INIT_SIZE), n == null && (n = e.getWidth() / 2 | 0), r == null && (r = e.getHeight() / 2 | 0);
          const i = t / 2 | 0;
          if (this.leftInit = n - i, this.rightInit = n + i, this.upInit = r - i, this.downInit = r + i, this.upInit < 0 || this.leftInit < 0 || this.downInit >= this.height || this.rightInit >= this.width)
            throw new D();
        }
        /**
         * <p>
         * Detects a candidate barcode-like rectangular region within an image. It
         * starts around the center of the image, increases the size of the candidate
         * region until it finds a white rectangular region.
         * </p>
         *
         * @return {@link ResultPoint}[] describing the corners of the rectangular
         *         region. The first and last points are opposed on the diagonal, as
         *         are the second and third. The first point will be the topmost
         *         point and the last, the bottommost. The second point will be
         *         leftmost and the third, the rightmost
         * @throws NotFoundException if no Data Matrix Code can be found
         */
        detect() {
          let e = this.leftInit, t = this.rightInit, n = this.upInit, r = this.downInit, i = !1, s = !0, o = !1, a = !1, l = !1, u = !1, d = !1;
          const A = this.width, p = this.height;
          for (; s; ) {
            s = !1;
            let I = !0;
            for (; (I || !a) && t < A; )
              I = this.containsBlackPoint(n, r, t, !1), I ? (t++, s = !0, a = !0) : a || t++;
            if (t >= A) {
              i = !0;
              break;
            }
            let y = !0;
            for (; (y || !l) && r < p; )
              y = this.containsBlackPoint(e, t, r, !0), y ? (r++, s = !0, l = !0) : l || r++;
            if (r >= p) {
              i = !0;
              break;
            }
            let _ = !0;
            for (; (_ || !u) && e >= 0; )
              _ = this.containsBlackPoint(n, r, e, !1), _ ? (e--, s = !0, u = !0) : u || e--;
            if (e < 0) {
              i = !0;
              break;
            }
            let N = !0;
            for (; (N || !d) && n >= 0; )
              N = this.containsBlackPoint(e, t, n, !0), N ? (n--, s = !0, d = !0) : d || n--;
            if (n < 0) {
              i = !0;
              break;
            }
            s && (o = !0);
          }
          if (!i && o) {
            const I = t - e;
            let y = null;
            for (let F = 1; y === null && F < I; F++)
              y = this.getBlackPointOnSegment(e, r - F, e + F, r);
            if (y == null)
              throw new D();
            let _ = null;
            for (let F = 1; _ === null && F < I; F++)
              _ = this.getBlackPointOnSegment(e, n + F, e + F, n);
            if (_ == null)
              throw new D();
            let N = null;
            for (let F = 1; N === null && F < I; F++)
              N = this.getBlackPointOnSegment(t, n + F, t - F, n);
            if (N == null)
              throw new D();
            let L = null;
            for (let F = 1; L === null && F < I; F++)
              L = this.getBlackPointOnSegment(t, r - F, t - F, r);
            if (L == null)
              throw new D();
            return this.centerEdges(L, y, N, _);
          } else
            throw new D();
        }
        getBlackPointOnSegment(e, t, n, r) {
          const i = oe.round(oe.distance(e, t, n, r)), s = (n - e) / i, o = (r - t) / i, a = this.image;
          for (let l = 0; l < i; l++) {
            const u = oe.round(e + l * s), d = oe.round(t + l * o);
            if (a.get(u, d))
              return new W(u, d);
          }
          return null;
        }
        /**
         * recenters the points of a constant distance towards the center
         *
         * @param y bottom most point
         * @param z left most point
         * @param x right most point
         * @param t top most point
         * @return {@link ResultPoint}[] describing the corners of the rectangular
         *         region. The first and last points are opposed on the diagonal, as
         *         are the second and third. The first point will be the topmost
         *         point and the last, the bottommost. The second point will be
         *         leftmost and the third, the rightmost
         */
        centerEdges(e, t, n, r) {
          const i = e.getX(), s = e.getY(), o = t.getX(), a = t.getY(), l = n.getX(), u = n.getY(), d = r.getX(), A = r.getY(), p = bt.CORR;
          return i < this.width / 2 ? [
            new W(d - p, A + p),
            new W(o + p, a + p),
            new W(l - p, u - p),
            new W(i + p, s - p)
          ] : [
            new W(d + p, A + p),
            new W(o + p, a - p),
            new W(l - p, u + p),
            new W(i - p, s - p)
          ];
        }
        /**
         * Determines whether a segment contains a black point
         *
         * @param a          min value of the scanned coordinate
         * @param b          max value of the scanned coordinate
         * @param fixed      value of fixed coordinate
         * @param horizontal set to true if scan must be horizontal, false if vertical
         * @return true if a black point has been found, else false.
         */
        containsBlackPoint(e, t, n, r) {
          const i = this.image;
          if (r) {
            for (let s = e; s <= t; s++)
              if (i.get(s, n))
                return !0;
          } else
            for (let s = e; s <= t; s++)
              if (i.get(n, s))
                return !0;
          return !1;
        }
      }
      bt.INIT_SIZE = 10, bt.CORR = 1;
      class cr {
        /**
         * <p>Checks a set of points that have been transformed to sample points on an image against
         * the image's dimensions to see if the point are even within the image.</p>
         *
         * <p>This method will actually "nudge" the endpoints back onto the image if they are found to be
         * barely (less than 1 pixel) off the image. This accounts for imperfect detection of finder
         * patterns in an image where the QR Code runs all the way to the image border.</p>
         *
         * <p>For efficiency, the method will check points from either end of the line until one is found
         * to be within the image. Because the set of points are assumed to be linear, this is valid.</p>
         *
         * @param image image into which the points should map
         * @param points actual points in x1,y1,...,xn,yn form
         * @throws NotFoundException if an endpoint is lies outside the image boundaries
         */
        static checkAndNudgePoints(e, t) {
          const n = e.getWidth(), r = e.getHeight();
          let i = !0;
          for (let s = 0; s < t.length && i; s += 2) {
            const o = Math.floor(t[s]), a = Math.floor(t[s + 1]);
            if (o < -1 || o > n || a < -1 || a > r)
              throw new D();
            i = !1, o === -1 ? (t[s] = 0, i = !0) : o === n && (t[s] = n - 1, i = !0), a === -1 ? (t[s + 1] = 0, i = !0) : a === r && (t[s + 1] = r - 1, i = !0);
          }
          i = !0;
          for (let s = t.length - 2; s >= 0 && i; s -= 2) {
            const o = Math.floor(t[s]), a = Math.floor(t[s + 1]);
            if (o < -1 || o > n || a < -1 || a > r)
              throw new D();
            i = !1, o === -1 ? (t[s] = 0, i = !0) : o === n && (t[s] = n - 1, i = !0), a === -1 ? (t[s + 1] = 0, i = !0) : a === r && (t[s + 1] = r - 1, i = !0);
          }
        }
      }
      class ft {
        constructor(e, t, n, r, i, s, o, a, l) {
          this.a11 = e, this.a21 = t, this.a31 = n, this.a12 = r, this.a22 = i, this.a32 = s, this.a13 = o, this.a23 = a, this.a33 = l;
        }
        static quadrilateralToQuadrilateral(e, t, n, r, i, s, o, a, l, u, d, A, p, I, y, _) {
          const N = ft.quadrilateralToSquare(e, t, n, r, i, s, o, a);
          return ft.squareToQuadrilateral(l, u, d, A, p, I, y, _).times(N);
        }
        transformPoints(e) {
          const t = e.length, n = this.a11, r = this.a12, i = this.a13, s = this.a21, o = this.a22, a = this.a23, l = this.a31, u = this.a32, d = this.a33;
          for (let A = 0; A < t; A += 2) {
            const p = e[A], I = e[A + 1], y = i * p + a * I + d;
            e[A] = (n * p + s * I + l) / y, e[A + 1] = (r * p + o * I + u) / y;
          }
        }
        transformPointsWithValues(e, t) {
          const n = this.a11, r = this.a12, i = this.a13, s = this.a21, o = this.a22, a = this.a23, l = this.a31, u = this.a32, d = this.a33, A = e.length;
          for (let p = 0; p < A; p++) {
            const I = e[p], y = t[p], _ = i * I + a * y + d;
            e[p] = (n * I + s * y + l) / _, t[p] = (r * I + o * y + u) / _;
          }
        }
        static squareToQuadrilateral(e, t, n, r, i, s, o, a) {
          const l = e - n + i - o, u = t - r + s - a;
          if (l === 0 && u === 0)
            return new ft(n - e, i - n, e, r - t, s - r, t, 0, 0, 1);
          {
            const d = n - i, A = o - i, p = r - s, I = a - s, y = d * I - A * p, _ = (l * I - A * u) / y, N = (d * u - l * p) / y;
            return new ft(n - e + _ * n, o - e + N * o, e, r - t + _ * r, a - t + N * a, t, _, N, 1);
          }
        }
        static quadrilateralToSquare(e, t, n, r, i, s, o, a) {
          return ft.squareToQuadrilateral(e, t, n, r, i, s, o, a).buildAdjoint();
        }
        buildAdjoint() {
          return new ft(this.a22 * this.a33 - this.a23 * this.a32, this.a23 * this.a31 - this.a21 * this.a33, this.a21 * this.a32 - this.a22 * this.a31, this.a13 * this.a32 - this.a12 * this.a33, this.a11 * this.a33 - this.a13 * this.a31, this.a12 * this.a31 - this.a11 * this.a32, this.a12 * this.a23 - this.a13 * this.a22, this.a13 * this.a21 - this.a11 * this.a23, this.a11 * this.a22 - this.a12 * this.a21);
        }
        times(e) {
          return new ft(this.a11 * e.a11 + this.a21 * e.a12 + this.a31 * e.a13, this.a11 * e.a21 + this.a21 * e.a22 + this.a31 * e.a23, this.a11 * e.a31 + this.a21 * e.a32 + this.a31 * e.a33, this.a12 * e.a11 + this.a22 * e.a12 + this.a32 * e.a13, this.a12 * e.a21 + this.a22 * e.a22 + this.a32 * e.a23, this.a12 * e.a31 + this.a22 * e.a32 + this.a32 * e.a33, this.a13 * e.a11 + this.a23 * e.a12 + this.a33 * e.a13, this.a13 * e.a21 + this.a23 * e.a22 + this.a33 * e.a23, this.a13 * e.a31 + this.a23 * e.a32 + this.a33 * e.a33);
        }
      }
      class zr extends cr {
        /*@Override*/
        sampleGrid(e, t, n, r, i, s, o, a, l, u, d, A, p, I, y, _, N, L, F) {
          const P = ft.quadrilateralToQuadrilateral(r, i, s, o, a, l, u, d, A, p, I, y, _, N, L, F);
          return this.sampleGridWithTransform(e, t, n, P);
        }
        /*@Override*/
        sampleGridWithTransform(e, t, n, r) {
          if (t <= 0 || n <= 0)
            throw new D();
          const i = new Fe(t, n), s = new Float32Array(2 * t);
          for (let o = 0; o < n; o++) {
            const a = s.length, l = o + 0.5;
            for (let u = 0; u < a; u += 2)
              s[u] = u / 2 + 0.5, s[u + 1] = l;
            r.transformPoints(s), cr.checkAndNudgePoints(e, s);
            try {
              for (let u = 0; u < a; u += 2)
                e.get(Math.floor(s[u]), Math.floor(s[u + 1])) && i.set(u / 2, o);
            } catch {
              throw new D();
            }
          }
          return i;
        }
      }
      class Rt {
        /**
         * Sets the implementation of GridSampler used by the library. One global
         * instance is stored, which may sound problematic. But, the implementation provided
         * ought to be appropriate for the entire platform, and all uses of this library
         * in the whole lifetime of the JVM. For instance, an Android activity can swap in
         * an implementation that takes advantage of native platform libraries.
         *
         * @param newGridSampler The platform-specific object to install.
         */
        static setGridSampler(e) {
          Rt.gridSampler = e;
        }
        /**
         * @return the current implementation of GridSampler
         */
        static getInstance() {
          return Rt.gridSampler;
        }
      }
      Rt.gridSampler = new zr();
      class Qe {
        constructor(e, t) {
          this.x = e, this.y = t;
        }
        toResultPoint() {
          return new W(this.getX(), this.getY());
        }
        getX() {
          return this.x;
        }
        getY() {
          return this.y;
        }
      }
      class Yr {
        constructor(e) {
          this.EXPECTED_CORNER_BITS = new Int32Array([
            3808,
            476,
            2107,
            1799
          ]), this.image = e;
        }
        detect() {
          return this.detectMirror(!1);
        }
        /**
         * Detects an Aztec Code in an image.
         *
         * @param isMirror if true, image is a mirror-image of original
         * @return {@link AztecDetectorResult} encapsulating results of detecting an Aztec Code
         * @throws NotFoundException if no Aztec Code can be found
         */
        detectMirror(e) {
          let t = this.getMatrixCenter(), n = this.getBullsEyeCorners(t);
          if (e) {
            let s = n[0];
            n[0] = n[2], n[2] = s;
          }
          this.extractParameters(n);
          let r = this.sampleGrid(this.image, n[this.shift % 4], n[(this.shift + 1) % 4], n[(this.shift + 2) % 4], n[(this.shift + 3) % 4]), i = this.getMatrixCornerPoints(n);
          return new Xr(r, i, this.compact, this.nbDataBlocks, this.nbLayers);
        }
        /**
         * Extracts the number of data layers and data blocks from the layer around the bull's eye.
         *
         * @param bullsEyeCorners the array of bull's eye corners
         * @throws NotFoundException in case of too many errors or invalid parameters
         */
        extractParameters(e) {
          if (!this.isValidPoint(e[0]) || !this.isValidPoint(e[1]) || !this.isValidPoint(e[2]) || !this.isValidPoint(e[3]))
            throw new D();
          let t = 2 * this.nbCenterLayers, n = new Int32Array([
            this.sampleLine(e[0], e[1], t),
            this.sampleLine(e[1], e[2], t),
            this.sampleLine(e[2], e[3], t),
            this.sampleLine(e[3], e[0], t)
            // Top
          ]);
          this.shift = this.getRotation(n, t);
          let r = 0;
          for (let s = 0; s < 4; s++) {
            let o = n[(this.shift + s) % 4];
            this.compact ? (r <<= 7, r += o >> 1 & 127) : (r <<= 10, r += (o >> 2 & 992) + (o >> 1 & 31));
          }
          let i = this.getCorrectedParameterData(r, this.compact);
          this.compact ? (this.nbLayers = (i >> 6) + 1, this.nbDataBlocks = (i & 63) + 1) : (this.nbLayers = (i >> 11) + 1, this.nbDataBlocks = (i & 2047) + 1);
        }
        getRotation(e, t) {
          let n = 0;
          e.forEach((r, i, s) => {
            let o = (r >> t - 2 << 1) + (r & 1);
            n = (n << 3) + o;
          }), n = ((n & 1) << 11) + (n >> 1);
          for (let r = 0; r < 4; r++)
            if (K.bitCount(n ^ this.EXPECTED_CORNER_BITS[r]) <= 2)
              return r;
          throw new D();
        }
        /**
         * Corrects the parameter bits using Reed-Solomon algorithm.
         *
         * @param parameterData parameter bits
         * @param compact true if this is a compact Aztec code
         * @throws NotFoundException if the array contains too many errors
         */
        getCorrectedParameterData(e, t) {
          let n, r;
          t ? (n = 7, r = 2) : (n = 10, r = 4);
          let i = n - r, s = new Int32Array(n);
          for (let a = n - 1; a >= 0; --a)
            s[a] = e & 15, e >>= 4;
          try {
            new En(ce.AZTEC_PARAM).decode(s, i);
          } catch {
            throw new D();
          }
          let o = 0;
          for (let a = 0; a < r; a++)
            o = (o << 4) + s[a];
          return o;
        }
        /**
         * Finds the corners of a bull-eye centered on the passed point.
         * This returns the centers of the diagonal points just outside the bull's eye
         * Returns [topRight, bottomRight, bottomLeft, topLeft]
         *
         * @param pCenter Center point
         * @return The corners of the bull-eye
         * @throws NotFoundException If no valid bull-eye can be found
         */
        getBullsEyeCorners(e) {
          let t = e, n = e, r = e, i = e, s = !0;
          for (this.nbCenterLayers = 1; this.nbCenterLayers < 9; this.nbCenterLayers++) {
            let d = this.getFirstDifferent(t, s, 1, -1), A = this.getFirstDifferent(n, s, 1, 1), p = this.getFirstDifferent(r, s, -1, 1), I = this.getFirstDifferent(i, s, -1, -1);
            if (this.nbCenterLayers > 2) {
              let y = this.distancePoint(I, d) * this.nbCenterLayers / (this.distancePoint(i, t) * (this.nbCenterLayers + 2));
              if (y < 0.75 || y > 1.25 || !this.isWhiteOrBlackRectangle(d, A, p, I))
                break;
            }
            t = d, n = A, r = p, i = I, s = !s;
          }
          if (this.nbCenterLayers !== 5 && this.nbCenterLayers !== 7)
            throw new D();
          this.compact = this.nbCenterLayers === 5;
          let o = new W(t.getX() + 0.5, t.getY() - 0.5), a = new W(n.getX() + 0.5, n.getY() + 0.5), l = new W(r.getX() - 0.5, r.getY() + 0.5), u = new W(i.getX() - 0.5, i.getY() - 0.5);
          return this.expandSquare([o, a, l, u], 2 * this.nbCenterLayers - 3, 2 * this.nbCenterLayers);
        }
        /**
         * Finds a candidate center point of an Aztec code from an image
         *
         * @return the center point
         */
        getMatrixCenter() {
          let e, t, n, r;
          try {
            let o = new bt(this.image).detect();
            e = o[0], t = o[1], n = o[2], r = o[3];
          } catch {
            let a = this.image.getWidth() / 2, l = this.image.getHeight() / 2;
            e = this.getFirstDifferent(new Qe(a + 7, l - 7), !1, 1, -1).toResultPoint(), t = this.getFirstDifferent(new Qe(a + 7, l + 7), !1, 1, 1).toResultPoint(), n = this.getFirstDifferent(new Qe(a - 7, l + 7), !1, -1, 1).toResultPoint(), r = this.getFirstDifferent(new Qe(a - 7, l - 7), !1, -1, -1).toResultPoint();
          }
          let i = oe.round((e.getX() + r.getX() + t.getX() + n.getX()) / 4), s = oe.round((e.getY() + r.getY() + t.getY() + n.getY()) / 4);
          try {
            let o = new bt(this.image, 15, i, s).detect();
            e = o[0], t = o[1], n = o[2], r = o[3];
          } catch {
            e = this.getFirstDifferent(new Qe(i + 7, s - 7), !1, 1, -1).toResultPoint(), t = this.getFirstDifferent(new Qe(i + 7, s + 7), !1, 1, 1).toResultPoint(), n = this.getFirstDifferent(new Qe(i - 7, s + 7), !1, -1, 1).toResultPoint(), r = this.getFirstDifferent(new Qe(i - 7, s - 7), !1, -1, -1).toResultPoint();
          }
          return i = oe.round((e.getX() + r.getX() + t.getX() + n.getX()) / 4), s = oe.round((e.getY() + r.getY() + t.getY() + n.getY()) / 4), new Qe(i, s);
        }
        /**
         * Gets the Aztec code corners from the bull's eye corners and the parameters.
         *
         * @param bullsEyeCorners the array of bull's eye corners
         * @return the array of aztec code corners
         */
        getMatrixCornerPoints(e) {
          return this.expandSquare(e, 2 * this.nbCenterLayers, this.getDimension());
        }
        /**
         * Creates a BitMatrix by sampling the provided image.
         * topLeft, topRight, bottomRight, and bottomLeft are the centers of the squares on the
         * diagonal just outside the bull's eye.
         */
        sampleGrid(e, t, n, r, i) {
          let s = Rt.getInstance(), o = this.getDimension(), a = o / 2 - this.nbCenterLayers, l = o / 2 + this.nbCenterLayers;
          return s.sampleGrid(
            e,
            o,
            o,
            a,
            a,
            // topleft
            l,
            a,
            // topright
            l,
            l,
            // bottomright
            a,
            l,
            // bottomleft
            t.getX(),
            t.getY(),
            n.getX(),
            n.getY(),
            r.getX(),
            r.getY(),
            i.getX(),
            i.getY()
          );
        }
        /**
         * Samples a line.
         *
         * @param p1   start point (inclusive)
         * @param p2   end point (exclusive)
         * @param size number of bits
         * @return the array of bits as an int (first bit is high-order bit of result)
         */
        sampleLine(e, t, n) {
          let r = 0, i = this.distanceResultPoint(e, t), s = i / n, o = e.getX(), a = e.getY(), l = s * (t.getX() - e.getX()) / i, u = s * (t.getY() - e.getY()) / i;
          for (let d = 0; d < n; d++)
            this.image.get(oe.round(o + d * l), oe.round(a + d * u)) && (r |= 1 << n - d - 1);
          return r;
        }
        /**
         * @return true if the border of the rectangle passed in parameter is compound of white points only
         *         or black points only
         */
        isWhiteOrBlackRectangle(e, t, n, r) {
          let i = 3;
          e = new Qe(e.getX() - i, e.getY() + i), t = new Qe(t.getX() - i, t.getY() - i), n = new Qe(n.getX() + i, n.getY() - i), r = new Qe(r.getX() + i, r.getY() + i);
          let s = this.getColor(r, e);
          if (s === 0)
            return !1;
          let o = this.getColor(e, t);
          return o !== s || (o = this.getColor(t, n), o !== s) ? !1 : (o = this.getColor(n, r), o === s);
        }
        /**
         * Gets the color of a segment
         *
         * @return 1 if segment more than 90% black, -1 if segment is more than 90% white, 0 else
         */
        getColor(e, t) {
          let n = this.distancePoint(e, t), r = (t.getX() - e.getX()) / n, i = (t.getY() - e.getY()) / n, s = 0, o = e.getX(), a = e.getY(), l = this.image.get(e.getX(), e.getY()), u = Math.ceil(n);
          for (let A = 0; A < u; A++)
            o += r, a += i, this.image.get(oe.round(o), oe.round(a)) !== l && s++;
          let d = s / n;
          return d > 0.1 && d < 0.9 ? 0 : d <= 0.1 === l ? 1 : -1;
        }
        /**
         * Gets the coordinate of the first point with a different color in the given direction
         */
        getFirstDifferent(e, t, n, r) {
          let i = e.getX() + n, s = e.getY() + r;
          for (; this.isValid(i, s) && this.image.get(i, s) === t; )
            i += n, s += r;
          for (i -= n, s -= r; this.isValid(i, s) && this.image.get(i, s) === t; )
            i += n;
          for (i -= n; this.isValid(i, s) && this.image.get(i, s) === t; )
            s += r;
          return s -= r, new Qe(i, s);
        }
        /**
         * Expand the square represented by the corner points by pushing out equally in all directions
         *
         * @param cornerPoints the corners of the square, which has the bull's eye at its center
         * @param oldSide the original length of the side of the square in the target bit matrix
         * @param newSide the new length of the size of the square in the target bit matrix
         * @return the corners of the expanded square
         */
        expandSquare(e, t, n) {
          let r = n / (2 * t), i = e[0].getX() - e[2].getX(), s = e[0].getY() - e[2].getY(), o = (e[0].getX() + e[2].getX()) / 2, a = (e[0].getY() + e[2].getY()) / 2, l = new W(o + r * i, a + r * s), u = new W(o - r * i, a - r * s);
          i = e[1].getX() - e[3].getX(), s = e[1].getY() - e[3].getY(), o = (e[1].getX() + e[3].getX()) / 2, a = (e[1].getY() + e[3].getY()) / 2;
          let d = new W(o + r * i, a + r * s), A = new W(o - r * i, a - r * s);
          return [l, d, u, A];
        }
        isValid(e, t) {
          return e >= 0 && e < this.image.getWidth() && t > 0 && t < this.image.getHeight();
        }
        isValidPoint(e) {
          let t = oe.round(e.getX()), n = oe.round(e.getY());
          return this.isValid(t, n);
        }
        distancePoint(e, t) {
          return oe.distance(e.getX(), e.getY(), t.getX(), t.getY());
        }
        distanceResultPoint(e, t) {
          return oe.distance(e.getX(), e.getY(), t.getX(), t.getY());
        }
        getDimension() {
          return this.compact ? 4 * this.nbLayers + 11 : this.nbLayers <= 4 ? 4 * this.nbLayers + 15 : 4 * this.nbLayers + 2 * (K.truncDivision(this.nbLayers - 4, 8) + 1) + 15;
        }
      }
      class Vn {
        /**
         * Locates and decodes a Data Matrix code in an image.
         *
         * @return a String representing the content encoded by the Data Matrix code
         * @throws NotFoundException if a Data Matrix code cannot be found
         * @throws FormatException if a Data Matrix code cannot be decoded
         */
        decode(e, t = null) {
          let n = null, r = new Yr(e.getBlackMatrix()), i = null, s = null;
          try {
            let u = r.detectMirror(!1);
            i = u.getPoints(), this.reportFoundResultPoints(t, i), s = new me().decode(u);
          } catch (u) {
            n = u;
          }
          if (s == null)
            try {
              let u = r.detectMirror(!0);
              i = u.getPoints(), this.reportFoundResultPoints(t, i), s = new me().decode(u);
            } catch (u) {
              throw n ?? u;
            }
          let o = new qe(s.getText(), s.getRawBytes(), s.getNumBits(), i, Y.AZTEC, ie.currentTimeMillis()), a = s.getByteSegments();
          a != null && o.putMetadata(Ue.BYTE_SEGMENTS, a);
          let l = s.getECLevel();
          return l != null && o.putMetadata(Ue.ERROR_CORRECTION_LEVEL, l), o;
        }
        reportFoundResultPoints(e, t) {
          if (e != null) {
            let n = e.get(xe.NEED_RESULT_POINT_CALLBACK);
            n != null && t.forEach((r, i, s) => {
              n.foundPossibleResultPoint(r);
            });
          }
        }
        // @Override
        reset() {
        }
      }
      class Hi extends Ut {
        /**
         * Creates an instance of BrowserAztecCodeReader.
         * @param {number} [timeBetweenScansMillis=500] the time delay between subsequent decode tries
         *
         * @memberOf BrowserAztecCodeReader
         */
        constructor(e = 500) {
          super(new Vn(), e);
        }
      }
      class ve {
        /*
        @Override
        public Result decode(BinaryBitmap image) throws NotFoundException, FormatException {
          return decode(image, null);
        }
        */
        // Note that we don't try rotation without the try harder flag, even if rotation was supported.
        // @Override
        decode(e, t) {
          try {
            return this.doDecode(e, t);
          } catch {
            if (t && t.get(xe.TRY_HARDER) === !0 && e.isRotateSupported()) {
              const i = e.rotateCounterClockwise(), s = this.doDecode(i, t), o = s.getResultMetadata();
              let a = 270;
              o !== null && o.get(Ue.ORIENTATION) === !0 && (a = a + o.get(Ue.ORIENTATION) % 360), s.putMetadata(Ue.ORIENTATION, a);
              const l = s.getResultPoints();
              if (l !== null) {
                const u = i.getHeight();
                for (let d = 0; d < l.length; d++)
                  l[d] = new W(u - l[d].getY() - 1, l[d].getX());
              }
              return s;
            } else
              throw new D();
          }
        }
        // @Override
        reset() {
        }
        /**
         * We're going to examine rows from the middle outward, searching alternately above and below the
         * middle, and farther out each time. rowStep is the number of rows between each successive
         * attempt above and below the middle. So we'd scan row middle, then middle - rowStep, then
         * middle + rowStep, then middle - (2 * rowStep), etc.
         * rowStep is bigger as the image is taller, but is always at least 1. We've somewhat arbitrarily
         * decided that moving up and down by about 1/16 of the image is pretty good; we try more of the
         * image if "trying harder".
         *
         * @param image The image to decode
         * @param hints Any hints that were requested
         * @return The contents of the decoded barcode
         * @throws NotFoundException Any spontaneous errors which occur
         */
        doDecode(e, t) {
          const n = e.getWidth(), r = e.getHeight();
          let i = new le(n);
          const s = t && t.get(xe.TRY_HARDER) === !0, o = Math.max(1, r >> (s ? 8 : 5));
          let a;
          s ? a = r : a = 15;
          const l = Math.trunc(r / 2);
          for (let u = 0; u < a; u++) {
            const d = Math.trunc((u + 1) / 2), A = (u & 1) === 0, p = l + o * (A ? d : -d);
            if (p < 0 || p >= r)
              break;
            try {
              i = e.getBlackRow(p, i);
            } catch {
              continue;
            }
            for (let I = 0; I < 2; I++) {
              if (I === 1 && (i.reverse(), t && t.get(xe.NEED_RESULT_POINT_CALLBACK) === !0)) {
                const y = /* @__PURE__ */ new Map();
                t.forEach((_, N) => y.set(N, _)), y.delete(xe.NEED_RESULT_POINT_CALLBACK), t = y;
              }
              try {
                const y = this.decodeRow(p, i, t);
                if (I === 1) {
                  y.putMetadata(Ue.ORIENTATION, 180);
                  const _ = y.getResultPoints();
                  _ !== null && (_[0] = new W(n - _[0].getX() - 1, _[0].getY()), _[1] = new W(n - _[1].getX() - 1, _[1].getY()));
                }
                return y;
              } catch {
              }
            }
          }
          throw new D();
        }
        /**
         * Records the size of successive runs of white and black pixels in a row, starting at a given point.
         * The values are recorded in the given array, and the number of runs recorded is equal to the size
         * of the array. If the row starts on a white pixel at the given start point, then the first count
         * recorded is the run of white pixels starting from that point; likewise it is the count of a run
         * of black pixels if the row begin on a black pixels at that point.
         *
         * @param row row to count from
         * @param start offset into row to start at
         * @param counters array into which to record counts
         * @throws NotFoundException if counters cannot be filled entirely from row before running out
         *  of pixels
         */
        static recordPattern(e, t, n) {
          const r = n.length;
          for (let l = 0; l < r; l++)
            n[l] = 0;
          const i = e.getSize();
          if (t >= i)
            throw new D();
          let s = !e.get(t), o = 0, a = t;
          for (; a < i; ) {
            if (e.get(a) !== s)
              n[o]++;
            else {
              if (++o === r)
                break;
              n[o] = 1, s = !s;
            }
            a++;
          }
          if (!(o === r || o === r - 1 && a === i))
            throw new D();
        }
        static recordPatternInReverse(e, t, n) {
          let r = n.length, i = e.get(t);
          for (; t > 0 && r >= 0; )
            e.get(--t) !== i && (r--, i = !i);
          if (r >= 0)
            throw new D();
          ve.recordPattern(e, t + 1, n);
        }
        /**
         * Determines how closely a set of observed counts of runs of black/white values matches a given
         * target pattern. This is reported as the ratio of the total variance from the expected pattern
         * proportions across all pattern elements, to the length of the pattern.
         *
         * @param counters observed counters
         * @param pattern expected pattern
         * @param maxIndividualVariance The most any counter can differ before we give up
         * @return ratio of total variance between counters and pattern compared to total pattern size
         */
        static patternMatchVariance(e, t, n) {
          const r = e.length;
          let i = 0, s = 0;
          for (let l = 0; l < r; l++)
            i += e[l], s += t[l];
          if (i < s)
            return Number.POSITIVE_INFINITY;
          const o = i / s;
          n *= o;
          let a = 0;
          for (let l = 0; l < r; l++) {
            const u = e[l], d = t[l] * o, A = u > d ? u - d : d - u;
            if (A > n)
              return Number.POSITIVE_INFINITY;
            a += A;
          }
          return a / i;
        }
      }
      class V extends ve {
        static findStartPattern(e) {
          const t = e.getSize(), n = e.getNextSet(0);
          let r = 0, i = Int32Array.from([0, 0, 0, 0, 0, 0]), s = n, o = !1;
          const a = 6;
          for (let l = n; l < t; l++)
            if (e.get(l) !== o)
              i[r]++;
            else {
              if (r === a - 1) {
                let u = V.MAX_AVG_VARIANCE, d = -1;
                for (let A = V.CODE_START_A; A <= V.CODE_START_C; A++) {
                  const p = ve.patternMatchVariance(i, V.CODE_PATTERNS[A], V.MAX_INDIVIDUAL_VARIANCE);
                  p < u && (u = p, d = A);
                }
                if (d >= 0 && e.isRange(Math.max(0, s - (l - s) / 2), s, !1))
                  return Int32Array.from([s, l, d]);
                s += i[0] + i[1], i = i.slice(2, i.length - 1), i[r - 1] = 0, i[r] = 0, r--;
              } else
                r++;
              i[r] = 1, o = !o;
            }
          throw new D();
        }
        static decodeCode(e, t, n) {
          ve.recordPattern(e, n, t);
          let r = V.MAX_AVG_VARIANCE, i = -1;
          for (let s = 0; s < V.CODE_PATTERNS.length; s++) {
            const o = V.CODE_PATTERNS[s], a = this.patternMatchVariance(t, o, V.MAX_INDIVIDUAL_VARIANCE);
            a < r && (r = a, i = s);
          }
          if (i >= 0)
            return i;
          throw new D();
        }
        decodeRow(e, t, n) {
          const r = n && n.get(xe.ASSUME_GS1) === !0, i = V.findStartPattern(t), s = i[2];
          let o = 0;
          const a = new Uint8Array(20);
          a[o++] = s;
          let l;
          switch (s) {
            case V.CODE_START_A:
              l = V.CODE_CODE_A;
              break;
            case V.CODE_START_B:
              l = V.CODE_CODE_B;
              break;
            case V.CODE_START_C:
              l = V.CODE_CODE_C;
              break;
            default:
              throw new U();
          }
          let u = !1, d = !1, A = "", p = i[0], I = i[1];
          const y = Int32Array.from([0, 0, 0, 0, 0, 0]);
          let _ = 0, N = 0, L = s, F = 0, P = !0, re = !1, $ = !1;
          for (; !u; ) {
            const ln = d;
            switch (d = !1, _ = N, N = V.decodeCode(t, y, I), a[o++] = N, N !== V.CODE_STOP && (P = !0), N !== V.CODE_STOP && (F++, L += F * N), p = I, I += y.reduce((ws, As) => ws + As, 0), N) {
              case V.CODE_START_A:
              case V.CODE_START_B:
              case V.CODE_START_C:
                throw new U();
            }
            switch (l) {
              case V.CODE_CODE_A:
                if (N < 64)
                  $ === re ? A += String.fromCharCode(32 + N) : A += String.fromCharCode(32 + N + 128), $ = !1;
                else if (N < 96)
                  $ === re ? A += String.fromCharCode(N - 64) : A += String.fromCharCode(N + 64), $ = !1;
                else
                  switch (N !== V.CODE_STOP && (P = !1), N) {
                    case V.CODE_FNC_1:
                      r && (A.length === 0 ? A += "]C1" : A += "");
                      break;
                    case V.CODE_FNC_2:
                    case V.CODE_FNC_3:
                      break;
                    case V.CODE_FNC_4_A:
                      !re && $ ? (re = !0, $ = !1) : re && $ ? (re = !1, $ = !1) : $ = !0;
                      break;
                    case V.CODE_SHIFT:
                      d = !0, l = V.CODE_CODE_B;
                      break;
                    case V.CODE_CODE_B:
                      l = V.CODE_CODE_B;
                      break;
                    case V.CODE_CODE_C:
                      l = V.CODE_CODE_C;
                      break;
                    case V.CODE_STOP:
                      u = !0;
                      break;
                  }
                break;
              case V.CODE_CODE_B:
                if (N < 96)
                  $ === re ? A += String.fromCharCode(32 + N) : A += String.fromCharCode(32 + N + 128), $ = !1;
                else
                  switch (N !== V.CODE_STOP && (P = !1), N) {
                    case V.CODE_FNC_1:
                      r && (A.length === 0 ? A += "]C1" : A += "");
                      break;
                    case V.CODE_FNC_2:
                    case V.CODE_FNC_3:
                      break;
                    case V.CODE_FNC_4_B:
                      !re && $ ? (re = !0, $ = !1) : re && $ ? (re = !1, $ = !1) : $ = !0;
                      break;
                    case V.CODE_SHIFT:
                      d = !0, l = V.CODE_CODE_A;
                      break;
                    case V.CODE_CODE_A:
                      l = V.CODE_CODE_A;
                      break;
                    case V.CODE_CODE_C:
                      l = V.CODE_CODE_C;
                      break;
                    case V.CODE_STOP:
                      u = !0;
                      break;
                  }
                break;
              case V.CODE_CODE_C:
                if (N < 100)
                  N < 10 && (A += "0"), A += N;
                else
                  switch (N !== V.CODE_STOP && (P = !1), N) {
                    case V.CODE_FNC_1:
                      r && (A.length === 0 ? A += "]C1" : A += "");
                      break;
                    case V.CODE_CODE_A:
                      l = V.CODE_CODE_A;
                      break;
                    case V.CODE_CODE_B:
                      l = V.CODE_CODE_B;
                      break;
                    case V.CODE_STOP:
                      u = !0;
                      break;
                  }
                break;
            }
            ln && (l = l === V.CODE_CODE_A ? V.CODE_CODE_B : V.CODE_CODE_A);
          }
          const it = I - p;
          if (I = t.getNextUnset(I), !t.isRange(I, Math.min(t.getSize(), I + (I - p) / 2), !1))
            throw new D();
          if (L -= F * _, L % 103 !== _)
            throw new q();
          const xt = A.length;
          if (xt === 0)
            throw new D();
          xt > 0 && P && (l === V.CODE_CODE_C ? A = A.substring(0, xt - 2) : A = A.substring(0, xt - 1));
          const st = (i[1] + i[0]) / 2, Ce = p + it / 2, Ye = a.length, ot = new Uint8Array(Ye);
          for (let ln = 0; ln < Ye; ln++)
            ot[ln] = a[ln];
          const an = [new W(st, e), new W(Ce, e)];
          return new qe(A, ot, 0, an, Y.CODE_128, (/* @__PURE__ */ new Date()).getTime());
        }
      }
      V.CODE_PATTERNS = [
        Int32Array.from([2, 1, 2, 2, 2, 2]),
        Int32Array.from([2, 2, 2, 1, 2, 2]),
        Int32Array.from([2, 2, 2, 2, 2, 1]),
        Int32Array.from([1, 2, 1, 2, 2, 3]),
        Int32Array.from([1, 2, 1, 3, 2, 2]),
        Int32Array.from([1, 3, 1, 2, 2, 2]),
        Int32Array.from([1, 2, 2, 2, 1, 3]),
        Int32Array.from([1, 2, 2, 3, 1, 2]),
        Int32Array.from([1, 3, 2, 2, 1, 2]),
        Int32Array.from([2, 2, 1, 2, 1, 3]),
        Int32Array.from([2, 2, 1, 3, 1, 2]),
        Int32Array.from([2, 3, 1, 2, 1, 2]),
        Int32Array.from([1, 1, 2, 2, 3, 2]),
        Int32Array.from([1, 2, 2, 1, 3, 2]),
        Int32Array.from([1, 2, 2, 2, 3, 1]),
        Int32Array.from([1, 1, 3, 2, 2, 2]),
        Int32Array.from([1, 2, 3, 1, 2, 2]),
        Int32Array.from([1, 2, 3, 2, 2, 1]),
        Int32Array.from([2, 2, 3, 2, 1, 1]),
        Int32Array.from([2, 2, 1, 1, 3, 2]),
        Int32Array.from([2, 2, 1, 2, 3, 1]),
        Int32Array.from([2, 1, 3, 2, 1, 2]),
        Int32Array.from([2, 2, 3, 1, 1, 2]),
        Int32Array.from([3, 1, 2, 1, 3, 1]),
        Int32Array.from([3, 1, 1, 2, 2, 2]),
        Int32Array.from([3, 2, 1, 1, 2, 2]),
        Int32Array.from([3, 2, 1, 2, 2, 1]),
        Int32Array.from([3, 1, 2, 2, 1, 2]),
        Int32Array.from([3, 2, 2, 1, 1, 2]),
        Int32Array.from([3, 2, 2, 2, 1, 1]),
        Int32Array.from([2, 1, 2, 1, 2, 3]),
        Int32Array.from([2, 1, 2, 3, 2, 1]),
        Int32Array.from([2, 3, 2, 1, 2, 1]),
        Int32Array.from([1, 1, 1, 3, 2, 3]),
        Int32Array.from([1, 3, 1, 1, 2, 3]),
        Int32Array.from([1, 3, 1, 3, 2, 1]),
        Int32Array.from([1, 1, 2, 3, 1, 3]),
        Int32Array.from([1, 3, 2, 1, 1, 3]),
        Int32Array.from([1, 3, 2, 3, 1, 1]),
        Int32Array.from([2, 1, 1, 3, 1, 3]),
        Int32Array.from([2, 3, 1, 1, 1, 3]),
        Int32Array.from([2, 3, 1, 3, 1, 1]),
        Int32Array.from([1, 1, 2, 1, 3, 3]),
        Int32Array.from([1, 1, 2, 3, 3, 1]),
        Int32Array.from([1, 3, 2, 1, 3, 1]),
        Int32Array.from([1, 1, 3, 1, 2, 3]),
        Int32Array.from([1, 1, 3, 3, 2, 1]),
        Int32Array.from([1, 3, 3, 1, 2, 1]),
        Int32Array.from([3, 1, 3, 1, 2, 1]),
        Int32Array.from([2, 1, 1, 3, 3, 1]),
        Int32Array.from([2, 3, 1, 1, 3, 1]),
        Int32Array.from([2, 1, 3, 1, 1, 3]),
        Int32Array.from([2, 1, 3, 3, 1, 1]),
        Int32Array.from([2, 1, 3, 1, 3, 1]),
        Int32Array.from([3, 1, 1, 1, 2, 3]),
        Int32Array.from([3, 1, 1, 3, 2, 1]),
        Int32Array.from([3, 3, 1, 1, 2, 1]),
        Int32Array.from([3, 1, 2, 1, 1, 3]),
        Int32Array.from([3, 1, 2, 3, 1, 1]),
        Int32Array.from([3, 3, 2, 1, 1, 1]),
        Int32Array.from([3, 1, 4, 1, 1, 1]),
        Int32Array.from([2, 2, 1, 4, 1, 1]),
        Int32Array.from([4, 3, 1, 1, 1, 1]),
        Int32Array.from([1, 1, 1, 2, 2, 4]),
        Int32Array.from([1, 1, 1, 4, 2, 2]),
        Int32Array.from([1, 2, 1, 1, 2, 4]),
        Int32Array.from([1, 2, 1, 4, 2, 1]),
        Int32Array.from([1, 4, 1, 1, 2, 2]),
        Int32Array.from([1, 4, 1, 2, 2, 1]),
        Int32Array.from([1, 1, 2, 2, 1, 4]),
        Int32Array.from([1, 1, 2, 4, 1, 2]),
        Int32Array.from([1, 2, 2, 1, 1, 4]),
        Int32Array.from([1, 2, 2, 4, 1, 1]),
        Int32Array.from([1, 4, 2, 1, 1, 2]),
        Int32Array.from([1, 4, 2, 2, 1, 1]),
        Int32Array.from([2, 4, 1, 2, 1, 1]),
        Int32Array.from([2, 2, 1, 1, 1, 4]),
        Int32Array.from([4, 1, 3, 1, 1, 1]),
        Int32Array.from([2, 4, 1, 1, 1, 2]),
        Int32Array.from([1, 3, 4, 1, 1, 1]),
        Int32Array.from([1, 1, 1, 2, 4, 2]),
        Int32Array.from([1, 2, 1, 1, 4, 2]),
        Int32Array.from([1, 2, 1, 2, 4, 1]),
        Int32Array.from([1, 1, 4, 2, 1, 2]),
        Int32Array.from([1, 2, 4, 1, 1, 2]),
        Int32Array.from([1, 2, 4, 2, 1, 1]),
        Int32Array.from([4, 1, 1, 2, 1, 2]),
        Int32Array.from([4, 2, 1, 1, 1, 2]),
        Int32Array.from([4, 2, 1, 2, 1, 1]),
        Int32Array.from([2, 1, 2, 1, 4, 1]),
        Int32Array.from([2, 1, 4, 1, 2, 1]),
        Int32Array.from([4, 1, 2, 1, 2, 1]),
        Int32Array.from([1, 1, 1, 1, 4, 3]),
        Int32Array.from([1, 1, 1, 3, 4, 1]),
        Int32Array.from([1, 3, 1, 1, 4, 1]),
        Int32Array.from([1, 1, 4, 1, 1, 3]),
        Int32Array.from([1, 1, 4, 3, 1, 1]),
        Int32Array.from([4, 1, 1, 1, 1, 3]),
        Int32Array.from([4, 1, 1, 3, 1, 1]),
        Int32Array.from([1, 1, 3, 1, 4, 1]),
        Int32Array.from([1, 1, 4, 1, 3, 1]),
        Int32Array.from([3, 1, 1, 1, 4, 1]),
        Int32Array.from([4, 1, 1, 1, 3, 1]),
        Int32Array.from([2, 1, 1, 4, 1, 2]),
        Int32Array.from([2, 1, 1, 2, 1, 4]),
        Int32Array.from([2, 1, 1, 2, 3, 2]),
        Int32Array.from([2, 3, 3, 1, 1, 1, 2])
      ], V.MAX_AVG_VARIANCE = 0.25, V.MAX_INDIVIDUAL_VARIANCE = 0.7, V.CODE_SHIFT = 98, V.CODE_CODE_C = 99, V.CODE_CODE_B = 100, V.CODE_CODE_A = 101, V.CODE_FNC_1 = 102, V.CODE_FNC_2 = 97, V.CODE_FNC_3 = 96, V.CODE_FNC_4_A = 101, V.CODE_FNC_4_B = 100, V.CODE_START_A = 103, V.CODE_START_B = 104, V.CODE_START_C = 105, V.CODE_STOP = 106;
      class Be extends ve {
        /**
         * Creates a reader that assumes all encoded data is data, and does not treat the final
         * character as a check digit. It will not decoded "extended Code 39" sequences.
         */
        // public Code39Reader() {
        //   this(false);
        // }
        /**
         * Creates a reader that can be configured to check the last character as a check digit.
         * It will not decoded "extended Code 39" sequences.
         *
         * @param usingCheckDigit if true, treat the last data character as a check digit, not
         * data, and verify that the checksum passes.
         */
        // public Code39Reader(boolean usingCheckDigit) {
        //   this(usingCheckDigit, false);
        // }
        /**
         * Creates a reader that can be configured to check the last character as a check digit,
         * or optionally attempt to decode "extended Code 39" sequences that are used to encode
         * the full ASCII character set.
         *
         * @param usingCheckDigit if true, treat the last data character as a check digit, not
         * data, and verify that the checksum passes.
         * @param extendedMode if true, will attempt to decode extended Code 39 sequences in the
         * text.
         */
        constructor(e = !1, t = !1) {
          super(), this.usingCheckDigit = e, this.extendedMode = t, this.decodeRowResult = "", this.counters = new Int32Array(9);
        }
        decodeRow(e, t, n) {
          let r = this.counters;
          r.fill(0), this.decodeRowResult = "";
          let i = Be.findAsteriskPattern(t, r), s = t.getNextSet(i[1]), o = t.getSize(), a, l;
          do {
            Be.recordPattern(t, s, r);
            let y = Be.toNarrowWidePattern(r);
            if (y < 0)
              throw new D();
            a = Be.patternToChar(y), this.decodeRowResult += a, l = s;
            for (let _ of r)
              s += _;
            s = t.getNextSet(s);
          } while (a !== "*");
          this.decodeRowResult = this.decodeRowResult.substring(0, this.decodeRowResult.length - 1);
          let u = 0;
          for (let y of r)
            u += y;
          let d = s - l - u;
          if (s !== o && d * 2 < u)
            throw new D();
          if (this.usingCheckDigit) {
            let y = this.decodeRowResult.length - 1, _ = 0;
            for (let N = 0; N < y; N++)
              _ += Be.ALPHABET_STRING.indexOf(this.decodeRowResult.charAt(N));
            if (this.decodeRowResult.charAt(y) !== Be.ALPHABET_STRING.charAt(_ % 43))
              throw new q();
            this.decodeRowResult = this.decodeRowResult.substring(0, y);
          }
          if (this.decodeRowResult.length === 0)
            throw new D();
          let A;
          this.extendedMode ? A = Be.decodeExtended(this.decodeRowResult) : A = this.decodeRowResult;
          let p = (i[1] + i[0]) / 2, I = l + u / 2;
          return new qe(A, null, 0, [new W(p, e), new W(I, e)], Y.CODE_39, (/* @__PURE__ */ new Date()).getTime());
        }
        static findAsteriskPattern(e, t) {
          let n = e.getSize(), r = e.getNextSet(0), i = 0, s = r, o = !1, a = t.length;
          for (let l = r; l < n; l++)
            if (e.get(l) !== o)
              t[i]++;
            else {
              if (i === a - 1) {
                if (this.toNarrowWidePattern(t) === Be.ASTERISK_ENCODING && e.isRange(Math.max(0, s - Math.floor((l - s) / 2)), s, !1))
                  return [s, l];
                s += t[0] + t[1], t.copyWithin(0, 2, 2 + i - 1), t[i - 1] = 0, t[i] = 0, i--;
              } else
                i++;
              t[i] = 1, o = !o;
            }
          throw new D();
        }
        // For efficiency, returns -1 on failure. Not throwing here saved as many as 700 exceptions
        // per image when using some of our blackbox images.
        static toNarrowWidePattern(e) {
          let t = e.length, n = 0, r;
          do {
            let i = 2147483647;
            for (let a of e)
              a < i && a > n && (i = a);
            n = i, r = 0;
            let s = 0, o = 0;
            for (let a = 0; a < t; a++) {
              let l = e[a];
              l > n && (o |= 1 << t - 1 - a, r++, s += l);
            }
            if (r === 3) {
              for (let a = 0; a < t && r > 0; a++) {
                let l = e[a];
                if (l > n && (r--, l * 2 >= s))
                  return -1;
              }
              return o;
            }
          } while (r > 3);
          return -1;
        }
        static patternToChar(e) {
          for (let t = 0; t < Be.CHARACTER_ENCODINGS.length; t++)
            if (Be.CHARACTER_ENCODINGS[t] === e)
              return Be.ALPHABET_STRING.charAt(t);
          if (e === Be.ASTERISK_ENCODING)
            return "*";
          throw new D();
        }
        static decodeExtended(e) {
          let t = e.length, n = "";
          for (let r = 0; r < t; r++) {
            let i = e.charAt(r);
            if (i === "+" || i === "$" || i === "%" || i === "/") {
              let s = e.charAt(r + 1), o = "\0";
              switch (i) {
                case "+":
                  if (s >= "A" && s <= "Z")
                    o = String.fromCharCode(s.charCodeAt(0) + 32);
                  else
                    throw new U();
                  break;
                case "$":
                  if (s >= "A" && s <= "Z")
                    o = String.fromCharCode(s.charCodeAt(0) - 64);
                  else
                    throw new U();
                  break;
                case "%":
                  if (s >= "A" && s <= "E")
                    o = String.fromCharCode(s.charCodeAt(0) - 38);
                  else if (s >= "F" && s <= "J")
                    o = String.fromCharCode(s.charCodeAt(0) - 11);
                  else if (s >= "K" && s <= "O")
                    o = String.fromCharCode(s.charCodeAt(0) + 16);
                  else if (s >= "P" && s <= "T")
                    o = String.fromCharCode(s.charCodeAt(0) + 43);
                  else if (s === "U")
                    o = "\0";
                  else if (s === "V")
                    o = "@";
                  else if (s === "W")
                    o = "`";
                  else if (s === "X" || s === "Y" || s === "Z")
                    o = "";
                  else
                    throw new U();
                  break;
                case "/":
                  if (s >= "A" && s <= "O")
                    o = String.fromCharCode(s.charCodeAt(0) - 32);
                  else if (s === "Z")
                    o = ":";
                  else
                    throw new U();
                  break;
              }
              n += o, r++;
            } else
              n += i;
          }
          return n;
        }
      }
      Be.ALPHABET_STRING = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%", Be.CHARACTER_ENCODINGS = [
        52,
        289,
        97,
        352,
        49,
        304,
        112,
        37,
        292,
        100,
        265,
        73,
        328,
        25,
        280,
        88,
        13,
        268,
        76,
        28,
        259,
        67,
        322,
        19,
        274,
        82,
        7,
        262,
        70,
        22,
        385,
        193,
        448,
        145,
        400,
        208,
        133,
        388,
        196,
        168,
        162,
        138,
        42
        // /-%
      ], Be.ASTERISK_ENCODING = 148;
      class Ae extends ve {
        constructor() {
          super(...arguments), this.narrowLineWidth = -1;
        }
        // See ITFWriter.PATTERNS
        /*
        
          /!**
           * Patterns of Wide / Narrow lines to indicate each digit
           *!/
          */
        decodeRow(e, t, n) {
          let r = this.decodeStart(t), i = this.decodeEnd(t), s = new ge();
          Ae.decodeMiddle(t, r[1], i[0], s);
          let o = s.toString(), a = null;
          n != null && (a = n.get(xe.ALLOWED_LENGTHS)), a == null && (a = Ae.DEFAULT_ALLOWED_LENGTHS);
          let l = o.length, u = !1, d = 0;
          for (let I of a) {
            if (l === I) {
              u = !0;
              break;
            }
            I > d && (d = I);
          }
          if (!u && l > d && (u = !0), !u)
            throw new U();
          const A = [new W(r[1], e), new W(i[0], e)];
          return new qe(
            o,
            null,
            // no natural byte representation for these barcodes
            0,
            A,
            Y.ITF,
            (/* @__PURE__ */ new Date()).getTime()
          );
        }
        /*
        /!**
         * @param row          row of black/white values to search
         * @param payloadStart offset of start pattern
         * @param resultString {@link StringBuilder} to append decoded chars to
         * @throws NotFoundException if decoding could not complete successfully
         *!/*/
        static decodeMiddle(e, t, n, r) {
          let i = new Int32Array(10), s = new Int32Array(5), o = new Int32Array(5);
          for (i.fill(0), s.fill(0), o.fill(0); t < n; ) {
            ve.recordPattern(e, t, i);
            for (let l = 0; l < 5; l++) {
              let u = 2 * l;
              s[l] = i[u], o[l] = i[u + 1];
            }
            let a = Ae.decodeDigit(s);
            r.append(a.toString()), a = this.decodeDigit(o), r.append(a.toString()), i.forEach(function(l) {
              t += l;
            });
          }
        }
        /*/!**
         * Identify where the start of the middle / payload section starts.
         *
         * @param row row of black/white values to search
         * @return Array, containing index of start of 'start block' and end of
         *         'start block'
         *!/*/
        decodeStart(e) {
          let t = Ae.skipWhiteSpace(e), n = Ae.findGuardPattern(e, t, Ae.START_PATTERN);
          return this.narrowLineWidth = (n[1] - n[0]) / 4, this.validateQuietZone(e, n[0]), n;
        }
        /*/!**
         * The start & end patterns must be pre/post fixed by a quiet zone. This
         * zone must be at least 10 times the width of a narrow line.  Scan back until
         * we either get to the start of the barcode or match the necessary number of
         * quiet zone pixels.
         *
         * Note: Its assumed the row is reversed when using this method to find
         * quiet zone after the end pattern.
         *
         * ref: http://www.barcode-1.net/i25code.html
         *
         * @param row bit array representing the scanned barcode.
         * @param startPattern index into row of the start or end pattern.
         * @throws NotFoundException if the quiet zone cannot be found
         *!/*/
        validateQuietZone(e, t) {
          let n = this.narrowLineWidth * 10;
          n = n < t ? n : t;
          for (let r = t - 1; n > 0 && r >= 0 && !e.get(r); r--)
            n--;
          if (n !== 0)
            throw new D();
        }
        /*
        /!**
         * Skip all whitespace until we get to the first black line.
         *
         * @param row row of black/white values to search
         * @return index of the first black line.
         * @throws NotFoundException Throws exception if no black lines are found in the row
         *!/*/
        static skipWhiteSpace(e) {
          const t = e.getSize(), n = e.getNextSet(0);
          if (n === t)
            throw new D();
          return n;
        }
        /*/!**
         * Identify where the end of the middle / payload section ends.
         *
         * @param row row of black/white values to search
         * @return Array, containing index of start of 'end block' and end of 'end
         *         block'
         *!/*/
        decodeEnd(e) {
          e.reverse();
          try {
            let t = Ae.skipWhiteSpace(e), n;
            try {
              n = Ae.findGuardPattern(e, t, Ae.END_PATTERN_REVERSED[0]);
            } catch (i) {
              i instanceof D && (n = Ae.findGuardPattern(e, t, Ae.END_PATTERN_REVERSED[1]));
            }
            this.validateQuietZone(e, n[0]);
            let r = n[0];
            return n[0] = e.getSize() - n[1], n[1] = e.getSize() - r, n;
          } finally {
            e.reverse();
          }
        }
        /*
        /!**
         * @param row       row of black/white values to search
         * @param rowOffset position to start search
         * @param pattern   pattern of counts of number of black and white pixels that are
         *                  being searched for as a pattern
         * @return start/end horizontal offset of guard pattern, as an array of two
         *         ints
         * @throws NotFoundException if pattern is not found
         *!/*/
        static findGuardPattern(e, t, n) {
          let r = n.length, i = new Int32Array(r), s = e.getSize(), o = !1, a = 0, l = t;
          i.fill(0);
          for (let u = t; u < s; u++)
            if (e.get(u) !== o)
              i[a]++;
            else {
              if (a === r - 1) {
                if (ve.patternMatchVariance(i, n, Ae.MAX_INDIVIDUAL_VARIANCE) < Ae.MAX_AVG_VARIANCE)
                  return [l, u];
                l += i[0] + i[1], ie.arraycopy(i, 2, i, 0, a - 1), i[a - 1] = 0, i[a] = 0, a--;
              } else
                a++;
              i[a] = 1, o = !o;
            }
          throw new D();
        }
        /*/!**
         * Attempts to decode a sequence of ITF black/white lines into single
         * digit.
         *
         * @param counters the counts of runs of observed black/white/black/... values
         * @return The decoded digit
         * @throws NotFoundException if digit cannot be decoded
         *!/*/
        static decodeDigit(e) {
          let t = Ae.MAX_AVG_VARIANCE, n = -1, r = Ae.PATTERNS.length;
          for (let i = 0; i < r; i++) {
            let s = Ae.PATTERNS[i], o = ve.patternMatchVariance(e, s, Ae.MAX_INDIVIDUAL_VARIANCE);
            o < t ? (t = o, n = i) : o === t && (n = -1);
          }
          if (n >= 0)
            return n % 10;
          throw new D();
        }
      }
      Ae.PATTERNS = [
        Int32Array.from([1, 1, 2, 2, 1]),
        Int32Array.from([2, 1, 1, 1, 2]),
        Int32Array.from([1, 2, 1, 1, 2]),
        Int32Array.from([2, 2, 1, 1, 1]),
        Int32Array.from([1, 1, 2, 1, 2]),
        Int32Array.from([2, 1, 2, 1, 1]),
        Int32Array.from([1, 2, 2, 1, 1]),
        Int32Array.from([1, 1, 1, 2, 2]),
        Int32Array.from([2, 1, 1, 2, 1]),
        Int32Array.from([1, 2, 1, 2, 1]),
        Int32Array.from([1, 1, 3, 3, 1]),
        Int32Array.from([3, 1, 1, 1, 3]),
        Int32Array.from([1, 3, 1, 1, 3]),
        Int32Array.from([3, 3, 1, 1, 1]),
        Int32Array.from([1, 1, 3, 1, 3]),
        Int32Array.from([3, 1, 3, 1, 1]),
        Int32Array.from([1, 3, 3, 1, 1]),
        Int32Array.from([1, 1, 1, 3, 3]),
        Int32Array.from([3, 1, 1, 3, 1]),
        Int32Array.from([1, 3, 1, 3, 1])
        // 9
      ], Ae.MAX_AVG_VARIANCE = 0.38, Ae.MAX_INDIVIDUAL_VARIANCE = 0.5, Ae.DEFAULT_ALLOWED_LENGTHS = [6, 8, 10, 12, 14], Ae.START_PATTERN = Int32Array.from([1, 1, 1, 1]), Ae.END_PATTERN_REVERSED = [
        Int32Array.from([1, 1, 2]),
        Int32Array.from([1, 1, 3])
        // 3x
      ];
      class Te extends ve {
        constructor() {
          super(...arguments), this.decodeRowStringBuffer = "";
        }
        static findStartGuardPattern(e) {
          let t = !1, n, r = 0, i = Int32Array.from([0, 0, 0]);
          for (; !t; ) {
            i = Int32Array.from([0, 0, 0]), n = Te.findGuardPattern(e, r, !1, this.START_END_PATTERN, i);
            let s = n[0];
            r = n[1];
            let o = s - (r - s);
            o >= 0 && (t = e.isRange(o, s, !1));
          }
          return n;
        }
        static checkChecksum(e) {
          return Te.checkStandardUPCEANChecksum(e);
        }
        static checkStandardUPCEANChecksum(e) {
          let t = e.length;
          if (t === 0)
            return !1;
          let n = parseInt(e.charAt(t - 1), 10);
          return Te.getStandardUPCEANChecksum(e.substring(0, t - 1)) === n;
        }
        static getStandardUPCEANChecksum(e) {
          let t = e.length, n = 0;
          for (let r = t - 1; r >= 0; r -= 2) {
            let i = e.charAt(r).charCodeAt(0) - 48;
            if (i < 0 || i > 9)
              throw new U();
            n += i;
          }
          n *= 3;
          for (let r = t - 2; r >= 0; r -= 2) {
            let i = e.charAt(r).charCodeAt(0) - 48;
            if (i < 0 || i > 9)
              throw new U();
            n += i;
          }
          return (1e3 - n) % 10;
        }
        static decodeEnd(e, t) {
          return Te.findGuardPattern(e, t, !1, Te.START_END_PATTERN, new Int32Array(Te.START_END_PATTERN.length).fill(0));
        }
        /**
         * @throws NotFoundException
         */
        static findGuardPatternWithoutCounters(e, t, n, r) {
          return this.findGuardPattern(e, t, n, r, new Int32Array(r.length));
        }
        /**
         * @param row row of black/white values to search
         * @param rowOffset position to start search
         * @param whiteFirst if true, indicates that the pattern specifies white/black/white/...
         * pixel counts, otherwise, it is interpreted as black/white/black/...
         * @param pattern pattern of counts of number of black and white pixels that are being
         * searched for as a pattern
         * @param counters array of counters, as long as pattern, to re-use
         * @return start/end horizontal offset of guard pattern, as an array of two ints
         * @throws NotFoundException if pattern is not found
         */
        static findGuardPattern(e, t, n, r, i) {
          let s = e.getSize();
          t = n ? e.getNextUnset(t) : e.getNextSet(t);
          let o = 0, a = t, l = r.length, u = n;
          for (let d = t; d < s; d++)
            if (e.get(d) !== u)
              i[o]++;
            else {
              if (o === l - 1) {
                if (ve.patternMatchVariance(i, r, Te.MAX_INDIVIDUAL_VARIANCE) < Te.MAX_AVG_VARIANCE)
                  return Int32Array.from([a, d]);
                a += i[0] + i[1];
                let A = i.slice(2, i.length - 1);
                for (let p = 0; p < o - 1; p++)
                  i[p] = A[p];
                i[o - 1] = 0, i[o] = 0, o--;
              } else
                o++;
              i[o] = 1, u = !u;
            }
          throw new D();
        }
        static decodeDigit(e, t, n, r) {
          this.recordPattern(e, n, t);
          let i = this.MAX_AVG_VARIANCE, s = -1, o = r.length;
          for (let a = 0; a < o; a++) {
            let l = r[a], u = ve.patternMatchVariance(t, l, Te.MAX_INDIVIDUAL_VARIANCE);
            u < i && (i = u, s = a);
          }
          if (s >= 0)
            return s;
          throw new D();
        }
      }
      Te.MAX_AVG_VARIANCE = 0.48, Te.MAX_INDIVIDUAL_VARIANCE = 0.7, Te.START_END_PATTERN = Int32Array.from([1, 1, 1]), Te.MIDDLE_PATTERN = Int32Array.from([1, 1, 1, 1, 1]), Te.END_PATTERN = Int32Array.from([1, 1, 1, 1, 1, 1]), Te.L_PATTERNS = [
        Int32Array.from([3, 2, 1, 1]),
        Int32Array.from([2, 2, 2, 1]),
        Int32Array.from([2, 1, 2, 2]),
        Int32Array.from([1, 4, 1, 1]),
        Int32Array.from([1, 1, 3, 2]),
        Int32Array.from([1, 2, 3, 1]),
        Int32Array.from([1, 1, 1, 4]),
        Int32Array.from([1, 3, 1, 2]),
        Int32Array.from([1, 2, 1, 3]),
        Int32Array.from([3, 1, 1, 2])
      ];
      class Cn {
        constructor() {
          this.CHECK_DIGIT_ENCODINGS = [24, 20, 18, 17, 12, 6, 3, 10, 9, 5], this.decodeMiddleCounters = Int32Array.from([0, 0, 0, 0]), this.decodeRowStringBuffer = "";
        }
        decodeRow(e, t, n) {
          let r = this.decodeRowStringBuffer, i = this.decodeMiddle(t, n, r), s = r.toString(), o = Cn.parseExtensionString(s), a = [
            new W((n[0] + n[1]) / 2, e),
            new W(i, e)
          ], l = new qe(s, null, 0, a, Y.UPC_EAN_EXTENSION, (/* @__PURE__ */ new Date()).getTime());
          return o != null && l.putAllMetadata(o), l;
        }
        decodeMiddle(e, t, n) {
          let r = this.decodeMiddleCounters;
          r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 0;
          let i = e.getSize(), s = t[1], o = 0;
          for (let l = 0; l < 5 && s < i; l++) {
            let u = Te.decodeDigit(
              e,
              r,
              s,
              Te.L_AND_G_PATTERNS
            );
            n += String.fromCharCode(48 + u % 10);
            for (let d of r)
              s += d;
            u >= 10 && (o |= 1 << 4 - l), l !== 4 && (s = e.getNextSet(s), s = e.getNextUnset(s));
          }
          if (n.length !== 5)
            throw new D();
          let a = this.determineCheckDigit(o);
          if (Cn.extensionChecksum(n.toString()) !== a)
            throw new D();
          return s;
        }
        static extensionChecksum(e) {
          let t = e.length, n = 0;
          for (let r = t - 2; r >= 0; r -= 2)
            n += e.charAt(r).charCodeAt(0) - 48;
          n *= 3;
          for (let r = t - 1; r >= 0; r -= 2)
            n += e.charAt(r).charCodeAt(0) - 48;
          return n *= 3, n % 10;
        }
        determineCheckDigit(e) {
          for (let t = 0; t < 10; t++)
            if (e === this.CHECK_DIGIT_ENCODINGS[t])
              return t;
          throw new D();
        }
        static parseExtensionString(e) {
          if (e.length !== 5)
            return null;
          let t = Cn.parseExtension5String(e);
          return t == null ? null : /* @__PURE__ */ new Map([[Ue.SUGGESTED_PRICE, t]]);
        }
        static parseExtension5String(e) {
          let t;
          switch (e.charAt(0)) {
            case "0":
              t = "£";
              break;
            case "5":
              t = "$";
              break;
            case "9":
              switch (e) {
                case "90000":
                  return null;
                case "99991":
                  return "0.00";
                case "99990":
                  return "Used";
              }
              t = "";
              break;
            default:
              t = "";
              break;
          }
          let n = parseInt(e.substring(1)), r = (n / 100).toString(), i = n % 100, s = i < 10 ? "0" + i : i.toString();
          return t + r + "." + s;
        }
      }
      class hr {
        constructor() {
          this.decodeMiddleCounters = Int32Array.from([0, 0, 0, 0]), this.decodeRowStringBuffer = "";
        }
        decodeRow(e, t, n) {
          let r = this.decodeRowStringBuffer, i = this.decodeMiddle(t, n, r), s = r.toString(), o = hr.parseExtensionString(s), a = [
            new W((n[0] + n[1]) / 2, e),
            new W(i, e)
          ], l = new qe(s, null, 0, a, Y.UPC_EAN_EXTENSION, (/* @__PURE__ */ new Date()).getTime());
          return o != null && l.putAllMetadata(o), l;
        }
        decodeMiddle(e, t, n) {
          let r = this.decodeMiddleCounters;
          r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 0;
          let i = e.getSize(), s = t[1], o = 0;
          for (let a = 0; a < 2 && s < i; a++) {
            let l = Te.decodeDigit(e, r, s, Te.L_AND_G_PATTERNS);
            n += String.fromCharCode(48 + l % 10);
            for (let u of r)
              s += u;
            l >= 10 && (o |= 1 << 1 - a), a !== 1 && (s = e.getNextSet(s), s = e.getNextUnset(s));
          }
          if (n.length !== 2)
            throw new D();
          if (parseInt(n.toString()) % 4 !== o)
            throw new D();
          return s;
        }
        static parseExtensionString(e) {
          return e.length !== 2 ? null : /* @__PURE__ */ new Map([[Ue.ISSUE_NUMBER, parseInt(e)]]);
        }
      }
      class Zr {
        static decodeRow(e, t, n) {
          let r = Te.findGuardPattern(
            t,
            n,
            !1,
            this.EXTENSION_START_PATTERN,
            new Int32Array(this.EXTENSION_START_PATTERN.length).fill(0)
          );
          try {
            return new Cn().decodeRow(e, t, r);
          } catch {
            return new hr().decodeRow(e, t, r);
          }
        }
      }
      Zr.EXTENSION_START_PATTERN = Int32Array.from([1, 1, 2]);
      class he extends Te {
        constructor() {
          super(), this.decodeRowStringBuffer = "", he.L_AND_G_PATTERNS = he.L_PATTERNS.map((e) => Int32Array.from(e));
          for (let e = 10; e < 20; e++) {
            let t = he.L_PATTERNS[e - 10], n = new Int32Array(t.length);
            for (let r = 0; r < t.length; r++)
              n[r] = t[t.length - r - 1];
            he.L_AND_G_PATTERNS[e] = n;
          }
        }
        decodeRow(e, t, n) {
          let r = he.findStartGuardPattern(t), i = n == null ? null : n.get(xe.NEED_RESULT_POINT_CALLBACK);
          if (i != null) {
            const P = new W((r[0] + r[1]) / 2, e);
            i.foundPossibleResultPoint(P);
          }
          let s = this.decodeMiddle(t, r, this.decodeRowStringBuffer), o = s.rowOffset, a = s.resultString;
          if (i != null) {
            const P = new W(o, e);
            i.foundPossibleResultPoint(P);
          }
          let l = this.decodeEnd(t, o);
          if (i != null) {
            const P = new W((l[0] + l[1]) / 2, e);
            i.foundPossibleResultPoint(P);
          }
          let u = l[1], d = u + (u - l[0]);
          if (d >= t.getSize() || !t.isRange(u, d, !1))
            throw new D();
          let A = a.toString();
          if (A.length < 8)
            throw new U();
          if (!he.checkChecksum(A))
            throw new q();
          let p = (r[1] + r[0]) / 2, I = (l[1] + l[0]) / 2, y = this.getBarcodeFormat(), _ = [new W(p, e), new W(I, e)], N = new qe(A, null, 0, _, y, (/* @__PURE__ */ new Date()).getTime()), L = 0;
          try {
            let P = Zr.decodeRow(e, t, l[1]);
            N.putMetadata(Ue.UPC_EAN_EXTENSION, P.getText()), N.putAllMetadata(P.getResultMetadata()), N.addResultPoints(P.getResultPoints()), L = P.getText().length;
          } catch {
          }
          let F = n == null ? null : n.get(xe.ALLOWED_EAN_EXTENSIONS);
          if (F != null) {
            let P = !1;
            for (let re in F)
              if (L.toString() === re) {
                P = !0;
                break;
              }
            if (!P)
              throw new D();
          }
          return N;
        }
        decodeEnd(e, t) {
          return he.findGuardPattern(
            e,
            t,
            !1,
            he.START_END_PATTERN,
            new Int32Array(he.START_END_PATTERN.length).fill(0)
          );
        }
        static checkChecksum(e) {
          return he.checkStandardUPCEANChecksum(e);
        }
        static checkStandardUPCEANChecksum(e) {
          let t = e.length;
          if (t === 0)
            return !1;
          let n = parseInt(e.charAt(t - 1), 10);
          return he.getStandardUPCEANChecksum(e.substring(0, t - 1)) === n;
        }
        static getStandardUPCEANChecksum(e) {
          let t = e.length, n = 0;
          for (let r = t - 1; r >= 0; r -= 2) {
            let i = e.charAt(r).charCodeAt(0) - 48;
            if (i < 0 || i > 9)
              throw new U();
            n += i;
          }
          n *= 3;
          for (let r = t - 2; r >= 0; r -= 2) {
            let i = e.charAt(r).charCodeAt(0) - 48;
            if (i < 0 || i > 9)
              throw new U();
            n += i;
          }
          return (1e3 - n) % 10;
        }
      }
      class Vt extends he {
        constructor() {
          super(), this.decodeMiddleCounters = Int32Array.from([0, 0, 0, 0]);
        }
        decodeMiddle(e, t, n) {
          let r = this.decodeMiddleCounters;
          r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 0;
          let i = e.getSize(), s = t[1], o = 0;
          for (let l = 0; l < 6 && s < i; l++) {
            let u = he.decodeDigit(e, r, s, he.L_AND_G_PATTERNS);
            n += String.fromCharCode(48 + u % 10);
            for (let d of r)
              s += d;
            u >= 10 && (o |= 1 << 5 - l);
          }
          n = Vt.determineFirstDigit(n, o), s = he.findGuardPattern(
            e,
            s,
            !0,
            he.MIDDLE_PATTERN,
            new Int32Array(he.MIDDLE_PATTERN.length).fill(0)
          )[1];
          for (let l = 0; l < 6 && s < i; l++) {
            let u = he.decodeDigit(e, r, s, he.L_PATTERNS);
            n += String.fromCharCode(48 + u);
            for (let d of r)
              s += d;
          }
          return { rowOffset: s, resultString: n };
        }
        getBarcodeFormat() {
          return Y.EAN_13;
        }
        static determineFirstDigit(e, t) {
          for (let n = 0; n < 10; n++)
            if (t === this.FIRST_DIGIT_ENCODINGS[n])
              return e = String.fromCharCode(48 + n) + e, e;
          throw new D();
        }
      }
      Vt.FIRST_DIGIT_ENCODINGS = [0, 11, 13, 14, 19, 25, 28, 21, 22, 26];
      class jr extends he {
        constructor() {
          super(), this.decodeMiddleCounters = Int32Array.from([0, 0, 0, 0]);
        }
        decodeMiddle(e, t, n) {
          const r = this.decodeMiddleCounters;
          r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 0;
          let i = e.getSize(), s = t[1];
          for (let a = 0; a < 4 && s < i; a++) {
            let l = he.decodeDigit(e, r, s, he.L_PATTERNS);
            n += String.fromCharCode(48 + l);
            for (let u of r)
              s += u;
          }
          s = he.findGuardPattern(e, s, !0, he.MIDDLE_PATTERN, new Int32Array(he.MIDDLE_PATTERN.length).fill(0))[1];
          for (let a = 0; a < 4 && s < i; a++) {
            let l = he.decodeDigit(e, r, s, he.L_PATTERNS);
            n += String.fromCharCode(48 + l);
            for (let u of r)
              s += u;
          }
          return { rowOffset: s, resultString: n };
        }
        getBarcodeFormat() {
          return Y.EAN_8;
        }
      }
      class Kr extends he {
        constructor() {
          super(...arguments), this.ean13Reader = new Vt();
        }
        // @Override
        getBarcodeFormat() {
          return Y.UPC_A;
        }
        // Note that we don't try rotation without the try harder flag, even if rotation was supported.
        // @Override
        decode(e, t) {
          return this.maybeReturnResult(this.ean13Reader.decode(e));
        }
        // @Override
        decodeRow(e, t, n) {
          return this.maybeReturnResult(this.ean13Reader.decodeRow(e, t, n));
        }
        // @Override
        decodeMiddle(e, t, n) {
          return this.ean13Reader.decodeMiddle(e, t, n);
        }
        maybeReturnResult(e) {
          let t = e.getText();
          if (t.charAt(0) === "0") {
            let n = new qe(t.substring(1), null, null, e.getResultPoints(), Y.UPC_A);
            return e.getResultMetadata() != null && n.putAllMetadata(e.getResultMetadata()), n;
          } else
            throw new D();
        }
        reset() {
          this.ean13Reader.reset();
        }
      }
      class dt extends he {
        constructor() {
          super(), this.decodeMiddleCounters = new Int32Array(4);
        }
        /**
         * @throws NotFoundException
         */
        // @Override
        decodeMiddle(e, t, n) {
          const r = this.decodeMiddleCounters.map((l) => l);
          r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 0;
          const i = e.getSize();
          let s = t[1], o = 0;
          for (let l = 0; l < 6 && s < i; l++) {
            const u = dt.decodeDigit(
              e,
              r,
              s,
              dt.L_AND_G_PATTERNS
            );
            n += String.fromCharCode(48 + u % 10);
            for (let d of r)
              s += d;
            u >= 10 && (o |= 1 << 5 - l);
          }
          let a = dt.determineNumSysAndCheckDigit(
            n,
            o
          );
          return { rowOffset: s, resultString: a };
        }
        /**
         * @throws NotFoundException
         */
        // @Override
        decodeEnd(e, t) {
          return dt.findGuardPatternWithoutCounters(
            e,
            t,
            !0,
            dt.MIDDLE_END_PATTERN
          );
        }
        /**
         * @throws FormatException
         */
        // @Override
        checkChecksum(e) {
          return he.checkChecksum(dt.convertUPCEtoUPCA(e));
        }
        /**
         * @throws NotFoundException
         */
        static determineNumSysAndCheckDigit(e, t) {
          for (let n = 0; n <= 1; n++)
            for (let r = 0; r < 10; r++)
              if (t === this.NUMSYS_AND_CHECK_DIGIT_PATTERNS[n][r]) {
                let i = String.fromCharCode(48 + n), s = String.fromCharCode(48 + r);
                return i + e + s;
              }
          throw D.getNotFoundInstance();
        }
        // @Override
        getBarcodeFormat() {
          return Y.UPC_E;
        }
        /**
         * Expands a UPC-E value back into its full, equivalent UPC-A code value.
         *
         * @param upce UPC-E code as string of digits
         * @return equivalent UPC-A code as string of digits
         */
        static convertUPCEtoUPCA(e) {
          const t = e.slice(1, 7).split("").map((i) => i.charCodeAt(0)), n = new ge(
            /*12*/
          );
          n.append(e.charAt(0));
          let r = t[5];
          switch (r) {
            case 0:
            case 1:
            case 2:
              n.appendChars(t, 0, 2), n.append(r), n.append("0000"), n.appendChars(t, 2, 3);
              break;
            case 3:
              n.appendChars(t, 0, 3), n.append("00000"), n.appendChars(t, 3, 2);
              break;
            case 4:
              n.appendChars(t, 0, 4), n.append("00000"), n.append(t[4]);
              break;
            default:
              n.appendChars(t, 0, 5), n.append("0000"), n.append(r);
              break;
          }
          return e.length >= 8 && n.append(e.charAt(7)), n.toString();
        }
      }
      dt.MIDDLE_END_PATTERN = Int32Array.from([1, 1, 1, 1, 1, 1]), dt.NUMSYS_AND_CHECK_DIGIT_PATTERNS = [
        Int32Array.from([56, 52, 50, 49, 44, 38, 35, 42, 41, 37]),
        Int32Array.from([7, 11, 13, 14, 19, 25, 28, 21, 22, 26])
      ];
      class ur extends ve {
        constructor(e) {
          super();
          let t = e == null ? null : e.get(xe.POSSIBLE_FORMATS), n = [];
          w(t) ? (n.push(new Vt()), n.push(new Kr()), n.push(new jr()), n.push(new dt())) : (t.indexOf(Y.EAN_13) > -1 && n.push(new Vt()), t.indexOf(Y.UPC_A) > -1 && n.push(new Kr()), t.indexOf(Y.EAN_8) > -1 && n.push(new jr()), t.indexOf(Y.UPC_E) > -1 && n.push(new dt())), this.readers = n;
        }
        decodeRow(e, t, n) {
          for (let r of this.readers)
            try {
              const i = r.decodeRow(e, t, n), s = i.getBarcodeFormat() === Y.EAN_13 && i.getText().charAt(0) === "0", o = n == null ? null : n.get(xe.POSSIBLE_FORMATS), a = o == null || o.includes(Y.UPC_A);
              if (s && a) {
                const l = i.getRawBytes(), u = new qe(
                  i.getText().substring(1),
                  l,
                  l ? l.length : null,
                  i.getResultPoints(),
                  Y.UPC_A
                );
                return u.putAllMetadata(i.getResultMetadata()), u;
              }
              return i;
            } catch {
            }
          throw new D();
        }
        reset() {
          for (let e of this.readers)
            e.reset();
        }
      }
      class Ze extends ve {
        constructor() {
          super(), this.decodeFinderCounters = new Int32Array(4), this.dataCharacterCounters = new Int32Array(8), this.oddRoundingErrors = new Array(4), this.evenRoundingErrors = new Array(4), this.oddCounts = new Array(this.dataCharacterCounters.length / 2), this.evenCounts = new Array(this.dataCharacterCounters.length / 2);
        }
        getDecodeFinderCounters() {
          return this.decodeFinderCounters;
        }
        getDataCharacterCounters() {
          return this.dataCharacterCounters;
        }
        getOddRoundingErrors() {
          return this.oddRoundingErrors;
        }
        getEvenRoundingErrors() {
          return this.evenRoundingErrors;
        }
        getOddCounts() {
          return this.oddCounts;
        }
        getEvenCounts() {
          return this.evenCounts;
        }
        parseFinderValue(e, t) {
          for (let n = 0; n < t.length; n++)
            if (ve.patternMatchVariance(e, t[n], Ze.MAX_INDIVIDUAL_VARIANCE) < Ze.MAX_AVG_VARIANCE)
              return n;
          throw new D();
        }
        /**
         * @param array values to sum
         * @return sum of values
         * @deprecated call {@link MathUtils#sum(int[])}
         */
        static count(e) {
          return oe.sum(new Int32Array(e));
        }
        static increment(e, t) {
          let n = 0, r = t[0];
          for (let i = 1; i < e.length; i++)
            t[i] > r && (r = t[i], n = i);
          e[n]++;
        }
        static decrement(e, t) {
          let n = 0, r = t[0];
          for (let i = 1; i < e.length; i++)
            t[i] < r && (r = t[i], n = i);
          e[n]--;
        }
        static isFinderPattern(e) {
          let t = e[0] + e[1], n = t + e[2] + e[3], r = t / n;
          if (r >= Ze.MIN_FINDER_PATTERN_RATIO && r <= Ze.MAX_FINDER_PATTERN_RATIO) {
            let i = Number.MAX_SAFE_INTEGER, s = Number.MIN_SAFE_INTEGER;
            for (let o of e)
              o > s && (s = o), o < i && (i = o);
            return s < 10 * i;
          }
          return !1;
        }
      }
      Ze.MAX_AVG_VARIANCE = 0.2, Ze.MAX_INDIVIDUAL_VARIANCE = 0.45, Ze.MIN_FINDER_PATTERN_RATIO = 9.5 / 12, Ze.MAX_FINDER_PATTERN_RATIO = 12.5 / 14;
      class Jt {
        constructor(e, t) {
          this.value = e, this.checksumPortion = t;
        }
        getValue() {
          return this.value;
        }
        getChecksumPortion() {
          return this.checksumPortion;
        }
        toString() {
          return this.value + "(" + this.checksumPortion + ")";
        }
        equals(e) {
          if (!(e instanceof Jt))
            return !1;
          const t = e;
          return this.value === t.value && this.checksumPortion === t.checksumPortion;
        }
        hashCode() {
          return this.value ^ this.checksumPortion;
        }
      }
      class Hn {
        constructor(e, t, n, r, i) {
          this.value = e, this.startEnd = t, this.value = e, this.startEnd = t, this.resultPoints = new Array(), this.resultPoints.push(new W(n, i)), this.resultPoints.push(new W(r, i));
        }
        getValue() {
          return this.value;
        }
        getStartEnd() {
          return this.startEnd;
        }
        getResultPoints() {
          return this.resultPoints;
        }
        equals(e) {
          if (!(e instanceof Hn))
            return !1;
          const t = e;
          return this.value === t.value;
        }
        hashCode() {
          return this.value;
        }
      }
      class At {
        constructor() {
        }
        static getRSSvalue(e, t, n) {
          let r = 0;
          for (let a of e)
            r += a;
          let i = 0, s = 0, o = e.length;
          for (let a = 0; a < o - 1; a++) {
            let l;
            for (l = 1, s |= 1 << a; l < e[a]; l++, s &= ~(1 << a)) {
              let u = At.combins(r - l - 1, o - a - 2);
              if (n && s === 0 && r - l - (o - a - 1) >= o - a - 1 && (u -= At.combins(r - l - (o - a), o - a - 2)), o - a - 1 > 1) {
                let d = 0;
                for (let A = r - l - (o - a - 2); A > t; A--)
                  d += At.combins(r - l - A - 1, o - a - 3);
                u -= d * (o - 1 - a);
              } else r - l > t && u--;
              i += u;
            }
            r -= l;
          }
          return i;
        }
        static combins(e, t) {
          let n, r;
          e - t > t ? (r = t, n = e - t) : (r = e - t, n = t);
          let i = 1, s = 1;
          for (let o = e; o > n; o--)
            i *= o, s <= r && (i /= s, s++);
          for (; s <= r; )
            i /= s, s++;
          return i;
        }
      }
      class Gi {
        static buildBitArray(e) {
          let t = e.length * 2 - 1;
          e[e.length - 1].getRightChar() == null && (t -= 1);
          let n = 12 * t, r = new le(n), i = 0, o = e[0].getRightChar().getValue();
          for (let a = 11; a >= 0; --a)
            (o & 1 << a) != 0 && r.set(i), i++;
          for (let a = 1; a < e.length; ++a) {
            let l = e[a], u = l.getLeftChar().getValue();
            for (let d = 11; d >= 0; --d)
              (u & 1 << d) != 0 && r.set(i), i++;
            if (l.getRightChar() != null) {
              let d = l.getRightChar().getValue();
              for (let A = 11; A >= 0; --A)
                (d & 1 << A) != 0 && r.set(i), i++;
            }
          }
          return r;
        }
      }
      class Ht {
        constructor(e, t) {
          t ? this.decodedInformation = null : (this.finished = e, this.decodedInformation = t);
        }
        getDecodedInformation() {
          return this.decodedInformation;
        }
        isFinished() {
          return this.finished;
        }
      }
      class fr {
        constructor(e) {
          this.newPosition = e;
        }
        getNewPosition() {
          return this.newPosition;
        }
      }
      class tt extends fr {
        constructor(e, t) {
          super(e), this.value = t;
        }
        getValue() {
          return this.value;
        }
        isFNC1() {
          return this.value === tt.FNC1;
        }
      }
      tt.FNC1 = "$";
      class Gt extends fr {
        constructor(e, t, n) {
          super(e), n ? (this.remaining = !0, this.remainingValue = this.remainingValue) : (this.remaining = !1, this.remainingValue = 0), this.newString = t;
        }
        getNewString() {
          return this.newString;
        }
        isRemaining() {
          return this.remaining;
        }
        getRemainingValue() {
          return this.remainingValue;
        }
      }
      class lt extends fr {
        constructor(e, t, n) {
          if (super(e), t < 0 || t > 10 || n < 0 || n > 10)
            throw new U();
          this.firstDigit = t, this.secondDigit = n;
        }
        getFirstDigit() {
          return this.firstDigit;
        }
        getSecondDigit() {
          return this.secondDigit;
        }
        getValue() {
          return this.firstDigit * 10 + this.secondDigit;
        }
        isFirstDigitFNC1() {
          return this.firstDigit === lt.FNC1;
        }
        isSecondDigitFNC1() {
          return this.secondDigit === lt.FNC1;
        }
        isAnyFNC1() {
          return this.firstDigit === lt.FNC1 || this.secondDigit === lt.FNC1;
        }
      }
      lt.FNC1 = 10;
      class H {
        constructor() {
        }
        static parseFieldsInGeneralPurpose(e) {
          if (!e)
            return null;
          if (e.length < 2)
            throw new D();
          let t = e.substring(0, 2);
          for (let i of H.TWO_DIGIT_DATA_LENGTH)
            if (i[0] === t)
              return i[1] === H.VARIABLE_LENGTH ? H.processVariableAI(2, i[2], e) : H.processFixedAI(2, i[1], e);
          if (e.length < 3)
            throw new D();
          let n = e.substring(0, 3);
          for (let i of H.THREE_DIGIT_DATA_LENGTH)
            if (i[0] === n)
              return i[1] === H.VARIABLE_LENGTH ? H.processVariableAI(3, i[2], e) : H.processFixedAI(3, i[1], e);
          for (let i of H.THREE_DIGIT_PLUS_DIGIT_DATA_LENGTH)
            if (i[0] === n)
              return i[1] === H.VARIABLE_LENGTH ? H.processVariableAI(4, i[2], e) : H.processFixedAI(4, i[1], e);
          if (e.length < 4)
            throw new D();
          let r = e.substring(0, 4);
          for (let i of H.FOUR_DIGIT_DATA_LENGTH)
            if (i[0] === r)
              return i[1] === H.VARIABLE_LENGTH ? H.processVariableAI(4, i[2], e) : H.processFixedAI(4, i[1], e);
          throw new D();
        }
        static processFixedAI(e, t, n) {
          if (n.length < e)
            throw new D();
          let r = n.substring(0, e);
          if (n.length < e + t)
            throw new D();
          let i = n.substring(e, e + t), s = n.substring(e + t), o = "(" + r + ")" + i, a = H.parseFieldsInGeneralPurpose(s);
          return a == null ? o : o + a;
        }
        static processVariableAI(e, t, n) {
          let r = n.substring(0, e), i;
          n.length < e + t ? i = n.length : i = e + t;
          let s = n.substring(e, i), o = n.substring(i), a = "(" + r + ")" + s, l = H.parseFieldsInGeneralPurpose(o);
          return l == null ? a : a + l;
        }
      }
      H.VARIABLE_LENGTH = [], H.TWO_DIGIT_DATA_LENGTH = [
        ["00", 18],
        ["01", 14],
        ["02", 14],
        ["10", H.VARIABLE_LENGTH, 20],
        ["11", 6],
        ["12", 6],
        ["13", 6],
        ["15", 6],
        ["17", 6],
        ["20", 2],
        ["21", H.VARIABLE_LENGTH, 20],
        ["22", H.VARIABLE_LENGTH, 29],
        ["30", H.VARIABLE_LENGTH, 8],
        ["37", H.VARIABLE_LENGTH, 8],
        // internal company codes
        ["90", H.VARIABLE_LENGTH, 30],
        ["91", H.VARIABLE_LENGTH, 30],
        ["92", H.VARIABLE_LENGTH, 30],
        ["93", H.VARIABLE_LENGTH, 30],
        ["94", H.VARIABLE_LENGTH, 30],
        ["95", H.VARIABLE_LENGTH, 30],
        ["96", H.VARIABLE_LENGTH, 30],
        ["97", H.VARIABLE_LENGTH, 3],
        ["98", H.VARIABLE_LENGTH, 30],
        ["99", H.VARIABLE_LENGTH, 30]
      ], H.THREE_DIGIT_DATA_LENGTH = [
        // Same format as above
        ["240", H.VARIABLE_LENGTH, 30],
        ["241", H.VARIABLE_LENGTH, 30],
        ["242", H.VARIABLE_LENGTH, 6],
        ["250", H.VARIABLE_LENGTH, 30],
        ["251", H.VARIABLE_LENGTH, 30],
        ["253", H.VARIABLE_LENGTH, 17],
        ["254", H.VARIABLE_LENGTH, 20],
        ["400", H.VARIABLE_LENGTH, 30],
        ["401", H.VARIABLE_LENGTH, 30],
        ["402", 17],
        ["403", H.VARIABLE_LENGTH, 30],
        ["410", 13],
        ["411", 13],
        ["412", 13],
        ["413", 13],
        ["414", 13],
        ["420", H.VARIABLE_LENGTH, 20],
        ["421", H.VARIABLE_LENGTH, 15],
        ["422", 3],
        ["423", H.VARIABLE_LENGTH, 15],
        ["424", 3],
        ["425", 3],
        ["426", 3]
      ], H.THREE_DIGIT_PLUS_DIGIT_DATA_LENGTH = [
        // Same format as above
        ["310", 6],
        ["311", 6],
        ["312", 6],
        ["313", 6],
        ["314", 6],
        ["315", 6],
        ["316", 6],
        ["320", 6],
        ["321", 6],
        ["322", 6],
        ["323", 6],
        ["324", 6],
        ["325", 6],
        ["326", 6],
        ["327", 6],
        ["328", 6],
        ["329", 6],
        ["330", 6],
        ["331", 6],
        ["332", 6],
        ["333", 6],
        ["334", 6],
        ["335", 6],
        ["336", 6],
        ["340", 6],
        ["341", 6],
        ["342", 6],
        ["343", 6],
        ["344", 6],
        ["345", 6],
        ["346", 6],
        ["347", 6],
        ["348", 6],
        ["349", 6],
        ["350", 6],
        ["351", 6],
        ["352", 6],
        ["353", 6],
        ["354", 6],
        ["355", 6],
        ["356", 6],
        ["357", 6],
        ["360", 6],
        ["361", 6],
        ["362", 6],
        ["363", 6],
        ["364", 6],
        ["365", 6],
        ["366", 6],
        ["367", 6],
        ["368", 6],
        ["369", 6],
        ["390", H.VARIABLE_LENGTH, 15],
        ["391", H.VARIABLE_LENGTH, 18],
        ["392", H.VARIABLE_LENGTH, 15],
        ["393", H.VARIABLE_LENGTH, 18],
        ["703", H.VARIABLE_LENGTH, 30]
      ], H.FOUR_DIGIT_DATA_LENGTH = [
        // Same format as above
        ["7001", 13],
        ["7002", H.VARIABLE_LENGTH, 30],
        ["7003", 10],
        ["8001", 14],
        ["8002", H.VARIABLE_LENGTH, 20],
        ["8003", H.VARIABLE_LENGTH, 30],
        ["8004", H.VARIABLE_LENGTH, 30],
        ["8005", 6],
        ["8006", 18],
        ["8007", H.VARIABLE_LENGTH, 30],
        ["8008", H.VARIABLE_LENGTH, 12],
        ["8018", 18],
        ["8020", H.VARIABLE_LENGTH, 25],
        ["8100", 6],
        ["8101", 10],
        ["8102", 2],
        ["8110", H.VARIABLE_LENGTH, 70],
        ["8200", H.VARIABLE_LENGTH, 70]
      ];
      class en {
        constructor(e) {
          this.buffer = new ge(), this.information = e;
        }
        decodeAllCodes(e, t) {
          let n = t, r = null;
          do {
            let i = this.decodeGeneralPurposeField(n, r), s = H.parseFieldsInGeneralPurpose(i.getNewString());
            if (s != null && e.append(s), i.isRemaining() ? r = "" + i.getRemainingValue() : r = null, n === i.getNewPosition())
              break;
            n = i.getNewPosition();
          } while (!0);
          return e.toString();
        }
        isStillNumeric(e) {
          if (e + 7 > this.information.getSize())
            return e + 4 <= this.information.getSize();
          for (let t = e; t < e + 3; ++t)
            if (this.information.get(t))
              return !0;
          return this.information.get(e + 3);
        }
        decodeNumeric(e) {
          if (e + 7 > this.information.getSize()) {
            let i = this.extractNumericValueFromBitArray(e, 4);
            return i === 0 ? new lt(this.information.getSize(), lt.FNC1, lt.FNC1) : new lt(this.information.getSize(), i - 1, lt.FNC1);
          }
          let t = this.extractNumericValueFromBitArray(e, 7), n = (t - 8) / 11, r = (t - 8) % 11;
          return new lt(e + 7, n, r);
        }
        extractNumericValueFromBitArray(e, t) {
          return en.extractNumericValueFromBitArray(this.information, e, t);
        }
        static extractNumericValueFromBitArray(e, t, n) {
          let r = 0;
          for (let i = 0; i < n; ++i)
            e.get(t + i) && (r |= 1 << n - i - 1);
          return r;
        }
        decodeGeneralPurposeField(e, t) {
          this.buffer.setLengthToZero(), t != null && this.buffer.append(t), this.current.setPosition(e);
          let n = this.parseBlocks();
          return n != null && n.isRemaining() ? new Gt(this.current.getPosition(), this.buffer.toString(), n.getRemainingValue()) : new Gt(this.current.getPosition(), this.buffer.toString());
        }
        parseBlocks() {
          let e, t;
          do {
            let n = this.current.getPosition();
            if (this.current.isAlpha() ? (t = this.parseAlphaBlock(), e = t.isFinished()) : this.current.isIsoIec646() ? (t = this.parseIsoIec646Block(), e = t.isFinished()) : (t = this.parseNumericBlock(), e = t.isFinished()), !(n !== this.current.getPosition()) && !e)
              break;
          } while (!e);
          return t.getDecodedInformation();
        }
        parseNumericBlock() {
          for (; this.isStillNumeric(this.current.getPosition()); ) {
            let e = this.decodeNumeric(this.current.getPosition());
            if (this.current.setPosition(e.getNewPosition()), e.isFirstDigitFNC1()) {
              let t;
              return e.isSecondDigitFNC1() ? t = new Gt(this.current.getPosition(), this.buffer.toString()) : t = new Gt(this.current.getPosition(), this.buffer.toString(), e.getSecondDigit()), new Ht(!0, t);
            }
            if (this.buffer.append(e.getFirstDigit()), e.isSecondDigitFNC1()) {
              let t = new Gt(this.current.getPosition(), this.buffer.toString());
              return new Ht(!0, t);
            }
            this.buffer.append(e.getSecondDigit());
          }
          return this.isNumericToAlphaNumericLatch(this.current.getPosition()) && (this.current.setAlpha(), this.current.incrementPosition(4)), new Ht(!1);
        }
        parseIsoIec646Block() {
          for (; this.isStillIsoIec646(this.current.getPosition()); ) {
            let e = this.decodeIsoIec646(this.current.getPosition());
            if (this.current.setPosition(e.getNewPosition()), e.isFNC1()) {
              let t = new Gt(this.current.getPosition(), this.buffer.toString());
              return new Ht(!0, t);
            }
            this.buffer.append(e.getValue());
          }
          return this.isAlphaOr646ToNumericLatch(this.current.getPosition()) ? (this.current.incrementPosition(3), this.current.setNumeric()) : this.isAlphaTo646ToAlphaLatch(this.current.getPosition()) && (this.current.getPosition() + 5 < this.information.getSize() ? this.current.incrementPosition(5) : this.current.setPosition(this.information.getSize()), this.current.setAlpha()), new Ht(!1);
        }
        parseAlphaBlock() {
          for (; this.isStillAlpha(this.current.getPosition()); ) {
            let e = this.decodeAlphanumeric(this.current.getPosition());
            if (this.current.setPosition(e.getNewPosition()), e.isFNC1()) {
              let t = new Gt(this.current.getPosition(), this.buffer.toString());
              return new Ht(!0, t);
            }
            this.buffer.append(e.getValue());
          }
          return this.isAlphaOr646ToNumericLatch(this.current.getPosition()) ? (this.current.incrementPosition(3), this.current.setNumeric()) : this.isAlphaTo646ToAlphaLatch(this.current.getPosition()) && (this.current.getPosition() + 5 < this.information.getSize() ? this.current.incrementPosition(5) : this.current.setPosition(this.information.getSize()), this.current.setIsoIec646()), new Ht(!1);
        }
        isStillIsoIec646(e) {
          if (e + 5 > this.information.getSize())
            return !1;
          let t = this.extractNumericValueFromBitArray(e, 5);
          if (t >= 5 && t < 16)
            return !0;
          if (e + 7 > this.information.getSize())
            return !1;
          let n = this.extractNumericValueFromBitArray(e, 7);
          if (n >= 64 && n < 116)
            return !0;
          if (e + 8 > this.information.getSize())
            return !1;
          let r = this.extractNumericValueFromBitArray(e, 8);
          return r >= 232 && r < 253;
        }
        decodeIsoIec646(e) {
          let t = this.extractNumericValueFromBitArray(e, 5);
          if (t === 15)
            return new tt(e + 5, tt.FNC1);
          if (t >= 5 && t < 15)
            return new tt(e + 5, "0" + (t - 5));
          let n = this.extractNumericValueFromBitArray(e, 7);
          if (n >= 64 && n < 90)
            return new tt(e + 7, "" + (n + 1));
          if (n >= 90 && n < 116)
            return new tt(e + 7, "" + (n + 7));
          let r = this.extractNumericValueFromBitArray(e, 8), i;
          switch (r) {
            case 232:
              i = "!";
              break;
            case 233:
              i = '"';
              break;
            case 234:
              i = "%";
              break;
            case 235:
              i = "&";
              break;
            case 236:
              i = "'";
              break;
            case 237:
              i = "(";
              break;
            case 238:
              i = ")";
              break;
            case 239:
              i = "*";
              break;
            case 240:
              i = "+";
              break;
            case 241:
              i = ",";
              break;
            case 242:
              i = "-";
              break;
            case 243:
              i = ".";
              break;
            case 244:
              i = "/";
              break;
            case 245:
              i = ":";
              break;
            case 246:
              i = ";";
              break;
            case 247:
              i = "<";
              break;
            case 248:
              i = "=";
              break;
            case 249:
              i = ">";
              break;
            case 250:
              i = "?";
              break;
            case 251:
              i = "_";
              break;
            case 252:
              i = " ";
              break;
            default:
              throw new U();
          }
          return new tt(e + 8, i);
        }
        isStillAlpha(e) {
          if (e + 5 > this.information.getSize())
            return !1;
          let t = this.extractNumericValueFromBitArray(e, 5);
          if (t >= 5 && t < 16)
            return !0;
          if (e + 6 > this.information.getSize())
            return !1;
          let n = this.extractNumericValueFromBitArray(e, 6);
          return n >= 16 && n < 63;
        }
        decodeAlphanumeric(e) {
          let t = this.extractNumericValueFromBitArray(e, 5);
          if (t === 15)
            return new tt(e + 5, tt.FNC1);
          if (t >= 5 && t < 15)
            return new tt(e + 5, "0" + (t - 5));
          let n = this.extractNumericValueFromBitArray(e, 6);
          if (n >= 32 && n < 58)
            return new tt(e + 6, "" + (n + 33));
          let r;
          switch (n) {
            case 58:
              r = "*";
              break;
            case 59:
              r = ",";
              break;
            case 60:
              r = "-";
              break;
            case 61:
              r = ".";
              break;
            case 62:
              r = "/";
              break;
            default:
              throw new wt("Decoding invalid alphanumeric value: " + n);
          }
          return new tt(e + 6, r);
        }
        isAlphaTo646ToAlphaLatch(e) {
          if (e + 1 > this.information.getSize())
            return !1;
          for (let t = 0; t < 5 && t + e < this.information.getSize(); ++t)
            if (t === 2) {
              if (!this.information.get(e + 2))
                return !1;
            } else if (this.information.get(e + t))
              return !1;
          return !0;
        }
        isAlphaOr646ToNumericLatch(e) {
          if (e + 3 > this.information.getSize())
            return !1;
          for (let t = e; t < e + 3; ++t)
            if (this.information.get(t))
              return !1;
          return !0;
        }
        isNumericToAlphaNumericLatch(e) {
          if (e + 1 > this.information.getSize())
            return !1;
          for (let t = 0; t < 4 && t + e < this.information.getSize(); ++t)
            if (this.information.get(e + t))
              return !1;
          return !0;
        }
      }
      class dr {
        constructor(e) {
          this.information = e, this.generalDecoder = new en(e);
        }
        getInformation() {
          return this.information;
        }
        getGeneralDecoder() {
          return this.generalDecoder;
        }
      }
      class nt extends dr {
        constructor(e) {
          super(e);
        }
        encodeCompressedGtin(e, t) {
          e.append("(01)");
          let n = e.length();
          e.append("9"), this.encodeCompressedGtinWithoutAI(e, t, n);
        }
        encodeCompressedGtinWithoutAI(e, t, n) {
          for (let r = 0; r < 4; ++r) {
            let i = this.getGeneralDecoder().extractNumericValueFromBitArray(t + 10 * r, 10);
            i / 100 === 0 && e.append("0"), i / 10 === 0 && e.append("0"), e.append(i);
          }
          nt.appendCheckDigit(e, n);
        }
        static appendCheckDigit(e, t) {
          let n = 0;
          for (let r = 0; r < 13; r++) {
            let i = e.charAt(r + t).charCodeAt(0) - 48;
            n += (r & 1) === 0 ? 3 * i : i;
          }
          n = 10 - n % 10, n === 10 && (n = 0), e.append(n);
        }
      }
      nt.GTIN_SIZE = 40;
      class tn extends nt {
        // the second one is the encodation method, and the other two are for the variable length
        constructor(e) {
          super(e);
        }
        parseInformation() {
          let e = new ge();
          e.append("(01)");
          let t = e.length(), n = this.getGeneralDecoder().extractNumericValueFromBitArray(tn.HEADER_SIZE, 4);
          return e.append(n), this.encodeCompressedGtinWithoutAI(e, tn.HEADER_SIZE + 4, t), this.getGeneralDecoder().decodeAllCodes(e, tn.HEADER_SIZE + 44);
        }
      }
      tn.HEADER_SIZE = 4;
      class Gn extends dr {
        constructor(e) {
          super(e);
        }
        parseInformation() {
          let e = new ge();
          return this.getGeneralDecoder().decodeAllCodes(e, Gn.HEADER_SIZE);
        }
      }
      Gn.HEADER_SIZE = 5;
      class Wn extends nt {
        constructor(e) {
          super(e);
        }
        encodeCompressedWeight(e, t, n) {
          let r = this.getGeneralDecoder().extractNumericValueFromBitArray(t, n);
          this.addWeightCode(e, r);
          let i = this.checkWeight(r), s = 1e5;
          for (let o = 0; o < 5; ++o)
            i / s === 0 && e.append("0"), s /= 10;
          e.append(i);
        }
      }
      class Et extends Wn {
        constructor(e) {
          super(e);
        }
        parseInformation() {
          if (this.getInformation().getSize() != Et.HEADER_SIZE + Wn.GTIN_SIZE + Et.WEIGHT_SIZE)
            throw new D();
          let e = new ge();
          return this.encodeCompressedGtin(e, Et.HEADER_SIZE), this.encodeCompressedWeight(e, Et.HEADER_SIZE + Wn.GTIN_SIZE, Et.WEIGHT_SIZE), e.toString();
        }
      }
      Et.HEADER_SIZE = 5, Et.WEIGHT_SIZE = 15;
      class Wi extends Et {
        constructor(e) {
          super(e);
        }
        addWeightCode(e, t) {
          e.append("(3103)");
        }
        checkWeight(e) {
          return e;
        }
      }
      class Xi extends Et {
        constructor(e) {
          super(e);
        }
        addWeightCode(e, t) {
          t < 1e4 ? e.append("(3202)") : e.append("(3203)");
        }
        checkWeight(e) {
          return e < 1e4 ? e : e - 1e4;
        }
      }
      class Ct extends nt {
        constructor(e) {
          super(e);
        }
        parseInformation() {
          if (this.getInformation().getSize() < Ct.HEADER_SIZE + nt.GTIN_SIZE)
            throw new D();
          let e = new ge();
          this.encodeCompressedGtin(e, Ct.HEADER_SIZE);
          let t = this.getGeneralDecoder().extractNumericValueFromBitArray(Ct.HEADER_SIZE + nt.GTIN_SIZE, Ct.LAST_DIGIT_SIZE);
          e.append("(392"), e.append(t), e.append(")");
          let n = this.getGeneralDecoder().decodeGeneralPurposeField(Ct.HEADER_SIZE + nt.GTIN_SIZE + Ct.LAST_DIGIT_SIZE, null);
          return e.append(n.getNewString()), e.toString();
        }
      }
      Ct.HEADER_SIZE = 8, Ct.LAST_DIGIT_SIZE = 2;
      class $e extends nt {
        constructor(e) {
          super(e);
        }
        parseInformation() {
          if (this.getInformation().getSize() < $e.HEADER_SIZE + nt.GTIN_SIZE)
            throw new D();
          let e = new ge();
          this.encodeCompressedGtin(e, $e.HEADER_SIZE);
          let t = this.getGeneralDecoder().extractNumericValueFromBitArray($e.HEADER_SIZE + nt.GTIN_SIZE, $e.LAST_DIGIT_SIZE);
          e.append("(393"), e.append(t), e.append(")");
          let n = this.getGeneralDecoder().extractNumericValueFromBitArray($e.HEADER_SIZE + nt.GTIN_SIZE + $e.LAST_DIGIT_SIZE, $e.FIRST_THREE_DIGITS_SIZE);
          n / 100 == 0 && e.append("0"), n / 10 == 0 && e.append("0"), e.append(n);
          let r = this.getGeneralDecoder().decodeGeneralPurposeField($e.HEADER_SIZE + nt.GTIN_SIZE + $e.LAST_DIGIT_SIZE + $e.FIRST_THREE_DIGITS_SIZE, null);
          return e.append(r.getNewString()), e.toString();
        }
      }
      $e.HEADER_SIZE = 8, $e.LAST_DIGIT_SIZE = 2, $e.FIRST_THREE_DIGITS_SIZE = 10;
      class _e extends Wn {
        constructor(e, t, n) {
          super(e), this.dateCode = n, this.firstAIdigits = t;
        }
        parseInformation() {
          if (this.getInformation().getSize() != _e.HEADER_SIZE + _e.GTIN_SIZE + _e.WEIGHT_SIZE + _e.DATE_SIZE)
            throw new D();
          let e = new ge();
          return this.encodeCompressedGtin(e, _e.HEADER_SIZE), this.encodeCompressedWeight(e, _e.HEADER_SIZE + _e.GTIN_SIZE, _e.WEIGHT_SIZE), this.encodeCompressedDate(e, _e.HEADER_SIZE + _e.GTIN_SIZE + _e.WEIGHT_SIZE), e.toString();
        }
        encodeCompressedDate(e, t) {
          let n = this.getGeneralDecoder().extractNumericValueFromBitArray(t, _e.DATE_SIZE);
          if (n == 38400)
            return;
          e.append("("), e.append(this.dateCode), e.append(")");
          let r = n % 32;
          n /= 32;
          let i = n % 12 + 1;
          n /= 12;
          let s = n;
          s / 10 == 0 && e.append("0"), e.append(s), i / 10 == 0 && e.append("0"), e.append(i), r / 10 == 0 && e.append("0"), e.append(r);
        }
        addWeightCode(e, t) {
          e.append("("), e.append(this.firstAIdigits), e.append(t / 1e5), e.append(")");
        }
        checkWeight(e) {
          return e % 1e5;
        }
      }
      _e.HEADER_SIZE = 8, _e.WEIGHT_SIZE = 20, _e.DATE_SIZE = 16;
      function qr(f) {
        try {
          if (f.get(1))
            return new tn(f);
          if (!f.get(2))
            return new Gn(f);
          switch (en.extractNumericValueFromBitArray(f, 1, 4)) {
            case 4:
              return new Wi(f);
            case 5:
              return new Xi(f);
          }
          switch (en.extractNumericValueFromBitArray(f, 1, 5)) {
            case 12:
              return new Ct(f);
            case 13:
              return new $e(f);
          }
          switch (en.extractNumericValueFromBitArray(f, 1, 7)) {
            case 56:
              return new _e(f, "310", "11");
            case 57:
              return new _e(f, "320", "11");
            case 58:
              return new _e(f, "310", "13");
            case 59:
              return new _e(f, "320", "13");
            case 60:
              return new _e(f, "310", "15");
            case 61:
              return new _e(f, "320", "15");
            case 62:
              return new _e(f, "310", "17");
            case 63:
              return new _e(f, "320", "17");
          }
        } catch (e) {
          throw console.log(e), new wt("unknown decoder: " + f);
        }
      }
      class Dt {
        constructor(e, t, n, r) {
          this.leftchar = e, this.rightchar = t, this.finderpattern = n, this.maybeLast = r;
        }
        mayBeLast() {
          return this.maybeLast;
        }
        getLeftChar() {
          return this.leftchar;
        }
        getRightChar() {
          return this.rightchar;
        }
        getFinderPattern() {
          return this.finderpattern;
        }
        mustBeLast() {
          return this.rightchar == null;
        }
        toString() {
          return "[ " + this.leftchar + ", " + this.rightchar + " : " + (this.finderpattern == null ? "null" : this.finderpattern.getValue()) + " ]";
        }
        static equals(e, t) {
          return e instanceof Dt ? Dt.equalsOrNull(e.leftchar, t.leftchar) && Dt.equalsOrNull(e.rightchar, t.rightchar) && Dt.equalsOrNull(e.finderpattern, t.finderpattern) : !1;
        }
        static equalsOrNull(e, t) {
          return e === null ? t === null : Dt.equals(e, t);
        }
        hashCode() {
          return this.leftchar.getValue() ^ this.rightchar.getValue() ^ this.finderpattern.getValue();
        }
      }
      class xr {
        constructor(e, t, n) {
          this.pairs = e, this.rowNumber = t, this.wasReversed = n;
        }
        getPairs() {
          return this.pairs;
        }
        getRowNumber() {
          return this.rowNumber;
        }
        isReversed() {
          return this.wasReversed;
        }
        // check implementation
        isEquivalent(e) {
          return this.checkEqualitity(this, e);
        }
        // @Override
        toString() {
          return "{ " + this.pairs + " }";
        }
        /**
         * Two rows are equal if they contain the same pairs in the same order.
         */
        // @Override
        // check implementation
        equals(e, t) {
          return e instanceof xr ? this.checkEqualitity(e, t) && e.wasReversed === t.wasReversed : !1;
        }
        checkEqualitity(e, t) {
          if (!e || !t)
            return;
          let n;
          return e.forEach((r, i) => {
            t.forEach((s) => {
              r.getLeftChar().getValue() === s.getLeftChar().getValue() && r.getRightChar().getValue() === s.getRightChar().getValue() && r.getFinderPatter().getValue() === s.getFinderPatter().getValue() && (n = !0);
            });
          }), n;
        }
      }
      class B extends Ze {
        constructor(e) {
          super(...arguments), this.pairs = new Array(B.MAX_PAIRS), this.rows = new Array(), this.startEnd = [2], this.verbose = e === !0;
        }
        decodeRow(e, t, n) {
          this.pairs.length = 0, this.startFromEven = !1;
          try {
            return B.constructResult(this.decodeRow2pairs(e, t));
          } catch (r) {
            this.verbose && console.log(r);
          }
          return this.pairs.length = 0, this.startFromEven = !0, B.constructResult(this.decodeRow2pairs(e, t));
        }
        reset() {
          this.pairs.length = 0, this.rows.length = 0;
        }
        // Not private for testing
        decodeRow2pairs(e, t) {
          let n = !1;
          for (; !n; )
            try {
              this.pairs.push(this.retrieveNextPair(t, this.pairs, e));
            } catch (i) {
              if (i instanceof D) {
                if (!this.pairs.length)
                  throw new D();
                n = !0;
              }
            }
          if (this.checkChecksum())
            return this.pairs;
          let r;
          if (this.rows.length ? r = !0 : r = !1, this.storeRow(e, !1), r) {
            let i = this.checkRowsBoolean(!1);
            if (i != null || (i = this.checkRowsBoolean(!0), i != null))
              return i;
          }
          throw new D();
        }
        // Need to Verify
        checkRowsBoolean(e) {
          if (this.rows.length > 25)
            return this.rows.length = 0, null;
          this.pairs.length = 0, e && (this.rows = this.rows.reverse());
          let t = null;
          try {
            t = this.checkRows(new Array(), 0);
          } catch (n) {
            this.verbose && console.log(n);
          }
          return e && (this.rows = this.rows.reverse()), t;
        }
        // Try to construct a valid rows sequence
        // Recursion is used to implement backtracking
        checkRows(e, t) {
          for (let n = t; n < this.rows.length; n++) {
            let r = this.rows[n];
            this.pairs.length = 0;
            for (let s of e)
              this.pairs.push(s.getPairs());
            if (this.pairs.push(r.getPairs()), !B.isValidSequence(this.pairs))
              continue;
            if (this.checkChecksum())
              return this.pairs;
            let i = new Array(e);
            i.push(r);
            try {
              return this.checkRows(i, n + 1);
            } catch (s) {
              this.verbose && console.log(s);
            }
          }
          throw new D();
        }
        // Whether the pairs form a valid find pattern sequence,
        // either complete or a prefix
        static isValidSequence(e) {
          for (let t of B.FINDER_PATTERN_SEQUENCES) {
            if (e.length > t.length)
              continue;
            let n = !0;
            for (let r = 0; r < e.length; r++)
              if (e[r].getFinderPattern().getValue() != t[r]) {
                n = !1;
                break;
              }
            if (n)
              return !0;
          }
          return !1;
        }
        storeRow(e, t) {
          let n = 0, r = !1, i = !1;
          for (; n < this.rows.length; ) {
            let s = this.rows[n];
            if (s.getRowNumber() > e) {
              i = s.isEquivalent(this.pairs);
              break;
            }
            r = s.isEquivalent(this.pairs), n++;
          }
          i || r || B.isPartialRow(this.pairs, this.rows) || (this.rows.push(n, new xr(this.pairs, e, t)), this.removePartialRows(this.pairs, this.rows));
        }
        // Remove all the rows that contains only specified pairs
        removePartialRows(e, t) {
          for (let n of t)
            if (n.getPairs().length !== e.length) {
              for (let r of n.getPairs())
                for (let i of e)
                  if (Dt.equals(r, i))
                    break;
            }
        }
        // Returns true when one of the rows already contains all the pairs
        static isPartialRow(e, t) {
          for (let n of t) {
            let r = !0;
            for (let i of e) {
              let s = !1;
              for (let o of n.getPairs())
                if (i.equals(o)) {
                  s = !0;
                  break;
                }
              if (!s) {
                r = !1;
                break;
              }
            }
            if (r)
              return !0;
          }
          return !1;
        }
        // Only used for unit testing
        getRows() {
          return this.rows;
        }
        // Not private for unit testing
        static constructResult(e) {
          let t = Gi.buildBitArray(e), r = qr(t).parseInformation(), i = e[0].getFinderPattern().getResultPoints(), s = e[e.length - 1].getFinderPattern().getResultPoints(), o = [i[0], i[1], s[0], s[1]];
          return new qe(r, null, null, o, Y.RSS_EXPANDED, null);
        }
        checkChecksum() {
          let e = this.pairs.get(0), t = e.getLeftChar(), n = e.getRightChar();
          if (n == null)
            return !1;
          let r = n.getChecksumPortion(), i = 2;
          for (let o = 1; o < this.pairs.size(); ++o) {
            let a = this.pairs.get(o);
            r += a.getLeftChar().getChecksumPortion(), i++;
            let l = a.getRightChar();
            l != null && (r += l.getChecksumPortion(), i++);
          }
          return r %= 211, 211 * (i - 4) + r == t.getValue();
        }
        static getNextSecondBar(e, t) {
          let n;
          return e.get(t) ? (n = e.getNextUnset(t), n = e.getNextSet(n)) : (n = e.getNextSet(t), n = e.getNextUnset(n)), n;
        }
        // not private for testing
        retrieveNextPair(e, t, n) {
          let r = t.length % 2 == 0;
          this.startFromEven && (r = !r);
          let i, s = !0, o = -1;
          do
            this.findNextPair(e, t, o), i = this.parseFoundFinderPattern(e, n, r), i == null ? o = B.getNextSecondBar(e, this.startEnd[0]) : s = !1;
          while (s);
          let a = this.decodeDataCharacter(e, i, r, !0);
          if (!this.isEmptyPair(t) && t[t.length - 1].mustBeLast())
            throw new D();
          let l;
          try {
            l = this.decodeDataCharacter(e, i, r, !1);
          } catch (u) {
            l = null, this.verbose && console.log(u);
          }
          return new Dt(a, l, i, !0);
        }
        isEmptyPair(e) {
          return e.length === 0;
        }
        findNextPair(e, t, n) {
          let r = this.getDecodeFinderCounters();
          r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 0;
          let i = e.getSize(), s;
          n >= 0 ? s = n : this.isEmptyPair(t) ? s = 0 : s = t[t.length - 1].getFinderPattern().getStartEnd()[1];
          let o = t.length % 2 != 0;
          this.startFromEven && (o = !o);
          let a = !1;
          for (; s < i && (a = !e.get(s), !!a); )
            s++;
          let l = 0, u = s;
          for (let d = s; d < i; d++)
            if (e.get(d) != a)
              r[l]++;
            else {
              if (l == 3) {
                if (o && B.reverseCounters(r), B.isFinderPattern(r)) {
                  this.startEnd[0] = u, this.startEnd[1] = d;
                  return;
                }
                o && B.reverseCounters(r), u += r[0] + r[1], r[0] = r[2], r[1] = r[3], r[2] = 0, r[3] = 0, l--;
              } else
                l++;
              r[l] = 1, a = !a;
            }
          throw new D();
        }
        static reverseCounters(e) {
          let t = e.length;
          for (let n = 0; n < t / 2; ++n) {
            let r = e[n];
            e[n] = e[t - n - 1], e[t - n - 1] = r;
          }
        }
        parseFoundFinderPattern(e, t, n) {
          let r, i, s;
          if (n) {
            let l = this.startEnd[0] - 1;
            for (; l >= 0 && !e.get(l); )
              l--;
            l++, r = this.startEnd[0] - l, i = l, s = this.startEnd[1];
          } else
            i = this.startEnd[0], s = e.getNextUnset(this.startEnd[1] + 1), r = s - this.startEnd[1];
          let o = this.getDecodeFinderCounters();
          ie.arraycopy(o, 0, o, 1, o.length - 1), o[0] = r;
          let a;
          try {
            a = this.parseFinderValue(o, B.FINDER_PATTERNS);
          } catch {
            return null;
          }
          return new Hn(a, [i, s], i, s, t);
        }
        decodeDataCharacter(e, t, n, r) {
          let i = this.getDataCharacterCounters();
          for (let Ce = 0; Ce < i.length; Ce++)
            i[Ce] = 0;
          if (r)
            B.recordPatternInReverse(e, t.getStartEnd()[0], i);
          else {
            B.recordPattern(e, t.getStartEnd()[1], i);
            for (let Ce = 0, Ye = i.length - 1; Ce < Ye; Ce++, Ye--) {
              let ot = i[Ce];
              i[Ce] = i[Ye], i[Ye] = ot;
            }
          }
          let s = 17, o = oe.sum(new Int32Array(i)) / s, a = (t.getStartEnd()[1] - t.getStartEnd()[0]) / 15;
          if (Math.abs(o - a) / a > 0.3)
            throw new D();
          let l = this.getOddCounts(), u = this.getEvenCounts(), d = this.getOddRoundingErrors(), A = this.getEvenRoundingErrors();
          for (let Ce = 0; Ce < i.length; Ce++) {
            let Ye = 1 * i[Ce] / o, ot = Ye + 0.5;
            if (ot < 1) {
              if (Ye < 0.3)
                throw new D();
              ot = 1;
            } else if (ot > 8) {
              if (Ye > 8.7)
                throw new D();
              ot = 8;
            }
            let an = Ce / 2;
            (Ce & 1) == 0 ? (l[an] = ot, d[an] = Ye - ot) : (u[an] = ot, A[an] = Ye - ot);
          }
          this.adjustOddEvenCounts(s);
          let p = 4 * t.getValue() + (n ? 0 : 2) + (r ? 0 : 1) - 1, I = 0, y = 0;
          for (let Ce = l.length - 1; Ce >= 0; Ce--) {
            if (B.isNotA1left(t, n, r)) {
              let Ye = B.WEIGHTS[p][2 * Ce];
              y += l[Ce] * Ye;
            }
            I += l[Ce];
          }
          let _ = 0;
          for (let Ce = u.length - 1; Ce >= 0; Ce--)
            if (B.isNotA1left(t, n, r)) {
              let Ye = B.WEIGHTS[p][2 * Ce + 1];
              _ += u[Ce] * Ye;
            }
          let N = y + _;
          if ((I & 1) != 0 || I > 13 || I < 4)
            throw new D();
          let L = (13 - I) / 2, F = B.SYMBOL_WIDEST[L], P = 9 - F, re = At.getRSSvalue(l, F, !0), $ = At.getRSSvalue(u, P, !1), it = B.EVEN_TOTAL_SUBSET[L], xt = B.GSUM[L], st = re * it + $ + xt;
          return new Jt(st, N);
        }
        static isNotA1left(e, t, n) {
          return !(e.getValue() == 0 && t && n);
        }
        adjustOddEvenCounts(e) {
          let t = oe.sum(new Int32Array(this.getOddCounts())), n = oe.sum(new Int32Array(this.getEvenCounts())), r = !1, i = !1;
          t > 13 ? i = !0 : t < 4 && (r = !0);
          let s = !1, o = !1;
          n > 13 ? o = !0 : n < 4 && (s = !0);
          let a = t + n - e, l = (t & 1) == 1, u = (n & 1) == 0;
          if (a == 1)
            if (l) {
              if (u)
                throw new D();
              i = !0;
            } else {
              if (!u)
                throw new D();
              o = !0;
            }
          else if (a == -1)
            if (l) {
              if (u)
                throw new D();
              r = !0;
            } else {
              if (!u)
                throw new D();
              s = !0;
            }
          else if (a == 0) {
            if (l) {
              if (!u)
                throw new D();
              t < n ? (r = !0, o = !0) : (i = !0, s = !0);
            } else if (u)
              throw new D();
          } else
            throw new D();
          if (r) {
            if (i)
              throw new D();
            B.increment(this.getOddCounts(), this.getOddRoundingErrors());
          }
          if (i && B.decrement(this.getOddCounts(), this.getOddRoundingErrors()), s) {
            if (o)
              throw new D();
            B.increment(this.getEvenCounts(), this.getOddRoundingErrors());
          }
          o && B.decrement(this.getEvenCounts(), this.getEvenRoundingErrors());
        }
      }
      B.SYMBOL_WIDEST = [7, 5, 4, 3, 1], B.EVEN_TOTAL_SUBSET = [4, 20, 52, 104, 204], B.GSUM = [0, 348, 1388, 2948, 3988], B.FINDER_PATTERNS = [
        Int32Array.from([1, 8, 4, 1]),
        Int32Array.from([3, 6, 4, 1]),
        Int32Array.from([3, 4, 6, 1]),
        Int32Array.from([3, 2, 8, 1]),
        Int32Array.from([2, 6, 5, 1]),
        Int32Array.from([2, 2, 9, 1])
        // F
      ], B.WEIGHTS = [
        [1, 3, 9, 27, 81, 32, 96, 77],
        [20, 60, 180, 118, 143, 7, 21, 63],
        [189, 145, 13, 39, 117, 140, 209, 205],
        [193, 157, 49, 147, 19, 57, 171, 91],
        [62, 186, 136, 197, 169, 85, 44, 132],
        [185, 133, 188, 142, 4, 12, 36, 108],
        [113, 128, 173, 97, 80, 29, 87, 50],
        [150, 28, 84, 41, 123, 158, 52, 156],
        [46, 138, 203, 187, 139, 206, 196, 166],
        [76, 17, 51, 153, 37, 111, 122, 155],
        [43, 129, 176, 106, 107, 110, 119, 146],
        [16, 48, 144, 10, 30, 90, 59, 177],
        [109, 116, 137, 200, 178, 112, 125, 164],
        [70, 210, 208, 202, 184, 130, 179, 115],
        [134, 191, 151, 31, 93, 68, 204, 190],
        [148, 22, 66, 198, 172, 94, 71, 2],
        [6, 18, 54, 162, 64, 192, 154, 40],
        [120, 149, 25, 75, 14, 42, 126, 167],
        [79, 26, 78, 23, 69, 207, 199, 175],
        [103, 98, 83, 38, 114, 131, 182, 124],
        [161, 61, 183, 127, 170, 88, 53, 159],
        [55, 165, 73, 8, 24, 72, 5, 15],
        [45, 135, 194, 160, 58, 174, 100, 89]
      ], B.FINDER_PAT_A = 0, B.FINDER_PAT_B = 1, B.FINDER_PAT_C = 2, B.FINDER_PAT_D = 3, B.FINDER_PAT_E = 4, B.FINDER_PAT_F = 5, B.FINDER_PATTERN_SEQUENCES = [
        [B.FINDER_PAT_A, B.FINDER_PAT_A],
        [B.FINDER_PAT_A, B.FINDER_PAT_B, B.FINDER_PAT_B],
        [B.FINDER_PAT_A, B.FINDER_PAT_C, B.FINDER_PAT_B, B.FINDER_PAT_D],
        [B.FINDER_PAT_A, B.FINDER_PAT_E, B.FINDER_PAT_B, B.FINDER_PAT_D, B.FINDER_PAT_C],
        [B.FINDER_PAT_A, B.FINDER_PAT_E, B.FINDER_PAT_B, B.FINDER_PAT_D, B.FINDER_PAT_D, B.FINDER_PAT_F],
        [B.FINDER_PAT_A, B.FINDER_PAT_E, B.FINDER_PAT_B, B.FINDER_PAT_D, B.FINDER_PAT_E, B.FINDER_PAT_F, B.FINDER_PAT_F],
        [B.FINDER_PAT_A, B.FINDER_PAT_A, B.FINDER_PAT_B, B.FINDER_PAT_B, B.FINDER_PAT_C, B.FINDER_PAT_C, B.FINDER_PAT_D, B.FINDER_PAT_D],
        [B.FINDER_PAT_A, B.FINDER_PAT_A, B.FINDER_PAT_B, B.FINDER_PAT_B, B.FINDER_PAT_C, B.FINDER_PAT_C, B.FINDER_PAT_D, B.FINDER_PAT_E, B.FINDER_PAT_E],
        [B.FINDER_PAT_A, B.FINDER_PAT_A, B.FINDER_PAT_B, B.FINDER_PAT_B, B.FINDER_PAT_C, B.FINDER_PAT_C, B.FINDER_PAT_D, B.FINDER_PAT_E, B.FINDER_PAT_F, B.FINDER_PAT_F],
        [B.FINDER_PAT_A, B.FINDER_PAT_A, B.FINDER_PAT_B, B.FINDER_PAT_B, B.FINDER_PAT_C, B.FINDER_PAT_D, B.FINDER_PAT_D, B.FINDER_PAT_E, B.FINDER_PAT_E, B.FINDER_PAT_F, B.FINDER_PAT_F]
      ], B.MAX_PAIRS = 11;
      class zi extends Jt {
        constructor(e, t, n) {
          super(e, t), this.count = 0, this.finderPattern = n;
        }
        getFinderPattern() {
          return this.finderPattern;
        }
        getCount() {
          return this.count;
        }
        incrementCount() {
          this.count++;
        }
      }
      class Ne extends Ze {
        constructor() {
          super(...arguments), this.possibleLeftPairs = [], this.possibleRightPairs = [];
        }
        decodeRow(e, t, n) {
          const r = this.decodePair(t, !1, e, n);
          Ne.addOrTally(this.possibleLeftPairs, r), t.reverse();
          let i = this.decodePair(t, !0, e, n);
          Ne.addOrTally(this.possibleRightPairs, i), t.reverse();
          for (let s of this.possibleLeftPairs)
            if (s.getCount() > 1) {
              for (let o of this.possibleRightPairs)
                if (o.getCount() > 1 && Ne.checkChecksum(s, o))
                  return Ne.constructResult(s, o);
            }
          throw new D();
        }
        static addOrTally(e, t) {
          if (t == null)
            return;
          let n = !1;
          for (let r of e)
            if (r.getValue() === t.getValue()) {
              r.incrementCount(), n = !0;
              break;
            }
          n || e.push(t);
        }
        reset() {
          this.possibleLeftPairs.length = 0, this.possibleRightPairs.length = 0;
        }
        static constructResult(e, t) {
          let n = 4537077 * e.getValue() + t.getValue(), r = new String(n).toString(), i = new ge();
          for (let l = 13 - r.length; l > 0; l--)
            i.append("0");
          i.append(r);
          let s = 0;
          for (let l = 0; l < 13; l++) {
            let u = i.charAt(l).charCodeAt(0) - 48;
            s += (l & 1) === 0 ? 3 * u : u;
          }
          s = 10 - s % 10, s === 10 && (s = 0), i.append(s.toString());
          let o = e.getFinderPattern().getResultPoints(), a = t.getFinderPattern().getResultPoints();
          return new qe(i.toString(), null, 0, [o[0], o[1], a[0], a[1]], Y.RSS_14, (/* @__PURE__ */ new Date()).getTime());
        }
        static checkChecksum(e, t) {
          let n = (e.getChecksumPortion() + 16 * t.getChecksumPortion()) % 79, r = 9 * e.getFinderPattern().getValue() + t.getFinderPattern().getValue();
          return r > 72 && r--, r > 8 && r--, n === r;
        }
        decodePair(e, t, n, r) {
          try {
            let i = this.findFinderPattern(e, t), s = this.parseFoundFinderPattern(e, n, t, i), o = r == null ? null : r.get(xe.NEED_RESULT_POINT_CALLBACK);
            if (o != null) {
              let u = (i[0] + i[1]) / 2;
              t && (u = e.getSize() - 1 - u), o.foundPossibleResultPoint(new W(u, n));
            }
            let a = this.decodeDataCharacter(e, s, !0), l = this.decodeDataCharacter(e, s, !1);
            return new zi(1597 * a.getValue() + l.getValue(), a.getChecksumPortion() + 4 * l.getChecksumPortion(), s);
          } catch {
            return null;
          }
        }
        decodeDataCharacter(e, t, n) {
          let r = this.getDataCharacterCounters();
          for (let _ = 0; _ < r.length; _++)
            r[_] = 0;
          if (n)
            ve.recordPatternInReverse(e, t.getStartEnd()[0], r);
          else {
            ve.recordPattern(e, t.getStartEnd()[1] + 1, r);
            for (let _ = 0, N = r.length - 1; _ < N; _++, N--) {
              let L = r[_];
              r[_] = r[N], r[N] = L;
            }
          }
          let i = n ? 16 : 15, s = oe.sum(new Int32Array(r)) / i, o = this.getOddCounts(), a = this.getEvenCounts(), l = this.getOddRoundingErrors(), u = this.getEvenRoundingErrors();
          for (let _ = 0; _ < r.length; _++) {
            let N = r[_] / s, L = Math.floor(N + 0.5);
            L < 1 ? L = 1 : L > 8 && (L = 8);
            let F = Math.floor(_ / 2);
            (_ & 1) === 0 ? (o[F] = L, l[F] = N - L) : (a[F] = L, u[F] = N - L);
          }
          this.adjustOddEvenCounts(n, i);
          let d = 0, A = 0;
          for (let _ = o.length - 1; _ >= 0; _--)
            A *= 9, A += o[_], d += o[_];
          let p = 0, I = 0;
          for (let _ = a.length - 1; _ >= 0; _--)
            p *= 9, p += a[_], I += a[_];
          let y = A + 3 * p;
          if (n) {
            if ((d & 1) !== 0 || d > 12 || d < 4)
              throw new D();
            let _ = (12 - d) / 2, N = Ne.OUTSIDE_ODD_WIDEST[_], L = 9 - N, F = At.getRSSvalue(o, N, !1), P = At.getRSSvalue(a, L, !0), re = Ne.OUTSIDE_EVEN_TOTAL_SUBSET[_], $ = Ne.OUTSIDE_GSUM[_];
            return new Jt(F * re + P + $, y);
          } else {
            if ((I & 1) !== 0 || I > 10 || I < 4)
              throw new D();
            let _ = (10 - I) / 2, N = Ne.INSIDE_ODD_WIDEST[_], L = 9 - N, F = At.getRSSvalue(o, N, !0), P = At.getRSSvalue(a, L, !1), re = Ne.INSIDE_ODD_TOTAL_SUBSET[_], $ = Ne.INSIDE_GSUM[_];
            return new Jt(P * re + F + $, y);
          }
        }
        findFinderPattern(e, t) {
          let n = this.getDecodeFinderCounters();
          n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0;
          let r = e.getSize(), i = !1, s = 0;
          for (; s < r && (i = !e.get(s), t !== i); )
            s++;
          let o = 0, a = s;
          for (let l = s; l < r; l++)
            if (e.get(l) !== i)
              n[o]++;
            else {
              if (o === 3) {
                if (Ze.isFinderPattern(n))
                  return [a, l];
                a += n[0] + n[1], n[0] = n[2], n[1] = n[3], n[2] = 0, n[3] = 0, o--;
              } else
                o++;
              n[o] = 1, i = !i;
            }
          throw new D();
        }
        parseFoundFinderPattern(e, t, n, r) {
          let i = e.get(r[0]), s = r[0] - 1;
          for (; s >= 0 && i !== e.get(s); )
            s--;
          s++;
          const o = r[0] - s, a = this.getDecodeFinderCounters(), l = new Int32Array(a.length);
          ie.arraycopy(a, 0, l, 1, a.length - 1), l[0] = o;
          const u = this.parseFinderValue(l, Ne.FINDER_PATTERNS);
          let d = s, A = r[1];
          return n && (d = e.getSize() - 1 - d, A = e.getSize() - 1 - A), new Hn(u, [s, r[1]], d, A, t);
        }
        adjustOddEvenCounts(e, t) {
          let n = oe.sum(new Int32Array(this.getOddCounts())), r = oe.sum(new Int32Array(this.getEvenCounts())), i = !1, s = !1, o = !1, a = !1;
          e ? (n > 12 ? s = !0 : n < 4 && (i = !0), r > 12 ? a = !0 : r < 4 && (o = !0)) : (n > 11 ? s = !0 : n < 5 && (i = !0), r > 10 ? a = !0 : r < 4 && (o = !0));
          let l = n + r - t, u = (n & 1) === (e ? 1 : 0), d = (r & 1) === 1;
          if (l === 1)
            if (u) {
              if (d)
                throw new D();
              s = !0;
            } else {
              if (!d)
                throw new D();
              a = !0;
            }
          else if (l === -1)
            if (u) {
              if (d)
                throw new D();
              i = !0;
            } else {
              if (!d)
                throw new D();
              o = !0;
            }
          else if (l === 0) {
            if (u) {
              if (!d)
                throw new D();
              n < r ? (i = !0, a = !0) : (s = !0, o = !0);
            } else if (d)
              throw new D();
          } else
            throw new D();
          if (i) {
            if (s)
              throw new D();
            Ze.increment(this.getOddCounts(), this.getOddRoundingErrors());
          }
          if (s && Ze.decrement(this.getOddCounts(), this.getOddRoundingErrors()), o) {
            if (a)
              throw new D();
            Ze.increment(this.getEvenCounts(), this.getOddRoundingErrors());
          }
          a && Ze.decrement(this.getEvenCounts(), this.getEvenRoundingErrors());
        }
      }
      Ne.OUTSIDE_EVEN_TOTAL_SUBSET = [1, 10, 34, 70, 126], Ne.INSIDE_ODD_TOTAL_SUBSET = [4, 20, 48, 81], Ne.OUTSIDE_GSUM = [0, 161, 961, 2015, 2715], Ne.INSIDE_GSUM = [0, 336, 1036, 1516], Ne.OUTSIDE_ODD_WIDEST = [8, 6, 4, 3, 1], Ne.INSIDE_ODD_WIDEST = [2, 4, 6, 8], Ne.FINDER_PATTERNS = [
        Int32Array.from([3, 8, 2, 1]),
        Int32Array.from([3, 5, 5, 1]),
        Int32Array.from([3, 3, 7, 1]),
        Int32Array.from([3, 1, 9, 1]),
        Int32Array.from([2, 7, 4, 1]),
        Int32Array.from([2, 5, 6, 1]),
        Int32Array.from([2, 3, 8, 1]),
        Int32Array.from([1, 5, 7, 1]),
        Int32Array.from([1, 3, 9, 1])
      ];
      class nn extends ve {
        constructor(e, t) {
          super(), this.readers = [], this.verbose = t === !0;
          const n = e ? e.get(xe.POSSIBLE_FORMATS) : null, r = e && e.get(xe.ASSUME_CODE_39_CHECK_DIGIT) !== void 0;
          n ? ((n.includes(Y.EAN_13) || n.includes(Y.UPC_A) || n.includes(Y.EAN_8) || n.includes(Y.UPC_E)) && this.readers.push(new ur(e)), n.includes(Y.CODE_39) && this.readers.push(new Be(r)), n.includes(Y.CODE_128) && this.readers.push(new V()), n.includes(Y.ITF) && this.readers.push(new Ae()), n.includes(Y.RSS_14) && this.readers.push(new Ne()), n.includes(Y.RSS_EXPANDED) && this.readers.push(new B(this.verbose))) : (this.readers.push(new ur(e)), this.readers.push(new Be()), this.readers.push(new ur(e)), this.readers.push(new V()), this.readers.push(new Ae()), this.readers.push(new Ne()), this.readers.push(new B(this.verbose)));
        }
        // @Override
        decodeRow(e, t, n) {
          for (let r = 0; r < this.readers.length; r++)
            try {
              return this.readers[r].decodeRow(e, t, n);
            } catch {
            }
          throw new D();
        }
        // @Override
        reset() {
          this.readers.forEach((e) => e.reset());
        }
      }
      class Yi extends Ut {
        /**
         * Creates an instance of BrowserBarcodeReader.
         * @param {number} [timeBetweenScansMillis=500] the time delay between subsequent decode tries
         * @param {Map<DecodeHintType, any>} hints
         */
        constructor(e = 500, t) {
          super(new nn(t), e, t);
        }
      }
      class fe {
        constructor(e, t, n) {
          this.ecCodewords = e, this.ecBlocks = [t], n && this.ecBlocks.push(n);
        }
        getECCodewords() {
          return this.ecCodewords;
        }
        getECBlocks() {
          return this.ecBlocks;
        }
      }
      class ue {
        constructor(e, t) {
          this.count = e, this.dataCodewords = t;
        }
        getCount() {
          return this.count;
        }
        getDataCodewords() {
          return this.dataCodewords;
        }
      }
      class se {
        constructor(e, t, n, r, i, s) {
          this.versionNumber = e, this.symbolSizeRows = t, this.symbolSizeColumns = n, this.dataRegionSizeRows = r, this.dataRegionSizeColumns = i, this.ecBlocks = s;
          let o = 0;
          const a = s.getECCodewords(), l = s.getECBlocks();
          for (let u of l)
            o += u.getCount() * (u.getDataCodewords() + a);
          this.totalCodewords = o;
        }
        getVersionNumber() {
          return this.versionNumber;
        }
        getSymbolSizeRows() {
          return this.symbolSizeRows;
        }
        getSymbolSizeColumns() {
          return this.symbolSizeColumns;
        }
        getDataRegionSizeRows() {
          return this.dataRegionSizeRows;
        }
        getDataRegionSizeColumns() {
          return this.dataRegionSizeColumns;
        }
        getTotalCodewords() {
          return this.totalCodewords;
        }
        getECBlocks() {
          return this.ecBlocks;
        }
        /**
         * <p>Deduces version information from Data Matrix dimensions.</p>
         *
         * @param numRows Number of rows in modules
         * @param numColumns Number of columns in modules
         * @return Version for a Data Matrix Code of those dimensions
         * @throws FormatException if dimensions do correspond to a valid Data Matrix size
         */
        static getVersionForDimensions(e, t) {
          if ((e & 1) !== 0 || (t & 1) !== 0)
            throw new U();
          for (let n of se.VERSIONS)
            if (n.symbolSizeRows === e && n.symbolSizeColumns === t)
              return n;
          throw new U();
        }
        //  @Override
        toString() {
          return "" + this.versionNumber;
        }
        /**
         * See ISO 16022:2006 5.5.1 Table 7
         */
        static buildVersions() {
          return [
            new se(1, 10, 10, 8, 8, new fe(5, new ue(1, 3))),
            new se(2, 12, 12, 10, 10, new fe(7, new ue(1, 5))),
            new se(3, 14, 14, 12, 12, new fe(10, new ue(1, 8))),
            new se(4, 16, 16, 14, 14, new fe(12, new ue(1, 12))),
            new se(5, 18, 18, 16, 16, new fe(14, new ue(1, 18))),
            new se(6, 20, 20, 18, 18, new fe(18, new ue(1, 22))),
            new se(7, 22, 22, 20, 20, new fe(20, new ue(1, 30))),
            new se(8, 24, 24, 22, 22, new fe(24, new ue(1, 36))),
            new se(9, 26, 26, 24, 24, new fe(28, new ue(1, 44))),
            new se(10, 32, 32, 14, 14, new fe(36, new ue(1, 62))),
            new se(11, 36, 36, 16, 16, new fe(42, new ue(1, 86))),
            new se(12, 40, 40, 18, 18, new fe(48, new ue(1, 114))),
            new se(13, 44, 44, 20, 20, new fe(56, new ue(1, 144))),
            new se(14, 48, 48, 22, 22, new fe(68, new ue(1, 174))),
            new se(15, 52, 52, 24, 24, new fe(42, new ue(2, 102))),
            new se(16, 64, 64, 14, 14, new fe(56, new ue(2, 140))),
            new se(17, 72, 72, 16, 16, new fe(36, new ue(4, 92))),
            new se(18, 80, 80, 18, 18, new fe(48, new ue(4, 114))),
            new se(19, 88, 88, 20, 20, new fe(56, new ue(4, 144))),
            new se(20, 96, 96, 22, 22, new fe(68, new ue(4, 174))),
            new se(21, 104, 104, 24, 24, new fe(56, new ue(6, 136))),
            new se(22, 120, 120, 18, 18, new fe(68, new ue(6, 175))),
            new se(23, 132, 132, 20, 20, new fe(62, new ue(8, 163))),
            new se(24, 144, 144, 22, 22, new fe(62, new ue(8, 156), new ue(2, 155))),
            new se(25, 8, 18, 6, 16, new fe(7, new ue(1, 5))),
            new se(26, 8, 32, 6, 14, new fe(11, new ue(1, 10))),
            new se(27, 12, 26, 10, 24, new fe(14, new ue(1, 16))),
            new se(28, 12, 36, 10, 16, new fe(18, new ue(1, 22))),
            new se(29, 16, 36, 14, 16, new fe(24, new ue(1, 32))),
            new se(30, 16, 48, 14, 22, new fe(28, new ue(1, 49)))
          ];
        }
      }
      se.VERSIONS = se.buildVersions();
      class gr {
        /**
         * @param bitMatrix {@link BitMatrix} to parse
         * @throws FormatException if dimension is < 8 or > 144 or not 0 mod 2
         */
        constructor(e) {
          const t = e.getHeight();
          if (t < 8 || t > 144 || (t & 1) !== 0)
            throw new U();
          this.version = gr.readVersion(e), this.mappingBitMatrix = this.extractDataRegion(e), this.readMappingMatrix = new Fe(this.mappingBitMatrix.getWidth(), this.mappingBitMatrix.getHeight());
        }
        getVersion() {
          return this.version;
        }
        /**
         * <p>Creates the version object based on the dimension of the original bit matrix from
         * the datamatrix code.</p>
         *
         * <p>See ISO 16022:2006 Table 7 - ECC 200 symbol attributes</p>
         *
         * @param bitMatrix Original {@link BitMatrix} including alignment patterns
         * @return {@link Version} encapsulating the Data Matrix Code's "version"
         * @throws FormatException if the dimensions of the mapping matrix are not valid
         * Data Matrix dimensions.
         */
        static readVersion(e) {
          const t = e.getHeight(), n = e.getWidth();
          return se.getVersionForDimensions(t, n);
        }
        /**
         * <p>Reads the bits in the {@link BitMatrix} representing the mapping matrix (No alignment patterns)
         * in the correct order in order to reconstitute the codewords bytes contained within the
         * Data Matrix Code.</p>
         *
         * @return bytes encoded within the Data Matrix Code
         * @throws FormatException if the exact number of bytes expected is not read
         */
        readCodewords() {
          const e = new Int8Array(this.version.getTotalCodewords());
          let t = 0, n = 4, r = 0;
          const i = this.mappingBitMatrix.getHeight(), s = this.mappingBitMatrix.getWidth();
          let o = !1, a = !1, l = !1, u = !1;
          do
            if (n === i && r === 0 && !o)
              e[t++] = this.readCorner1(i, s) & 255, n -= 2, r += 2, o = !0;
            else if (n === i - 2 && r === 0 && (s & 3) !== 0 && !a)
              e[t++] = this.readCorner2(i, s) & 255, n -= 2, r += 2, a = !0;
            else if (n === i + 4 && r === 2 && (s & 7) === 0 && !l)
              e[t++] = this.readCorner3(i, s) & 255, n -= 2, r += 2, l = !0;
            else if (n === i - 2 && r === 0 && (s & 7) === 4 && !u)
              e[t++] = this.readCorner4(i, s) & 255, n -= 2, r += 2, u = !0;
            else {
              do
                n < i && r >= 0 && !this.readMappingMatrix.get(r, n) && (e[t++] = this.readUtah(n, r, i, s) & 255), n -= 2, r += 2;
              while (n >= 0 && r < s);
              n += 1, r += 3;
              do
                n >= 0 && r < s && !this.readMappingMatrix.get(r, n) && (e[t++] = this.readUtah(n, r, i, s) & 255), n += 2, r -= 2;
              while (n < i && r >= 0);
              n += 3, r += 1;
            }
          while (n < i || r < s);
          if (t !== this.version.getTotalCodewords())
            throw new U();
          return e;
        }
        /**
         * <p>Reads a bit of the mapping matrix accounting for boundary wrapping.</p>
         *
         * @param row Row to read in the mapping matrix
         * @param column Column to read in the mapping matrix
         * @param numRows Number of rows in the mapping matrix
         * @param numColumns Number of columns in the mapping matrix
         * @return value of the given bit in the mapping matrix
         */
        readModule(e, t, n, r) {
          return e < 0 && (e += n, t += 4 - (n + 4 & 7)), t < 0 && (t += r, e += 4 - (r + 4 & 7)), this.readMappingMatrix.set(t, e), this.mappingBitMatrix.get(t, e);
        }
        /**
         * <p>Reads the 8 bits of the standard Utah-shaped pattern.</p>
         *
         * <p>See ISO 16022:2006, 5.8.1 Figure 6</p>
         *
         * @param row Current row in the mapping matrix, anchored at the 8th bit (LSB) of the pattern
         * @param column Current column in the mapping matrix, anchored at the 8th bit (LSB) of the pattern
         * @param numRows Number of rows in the mapping matrix
         * @param numColumns Number of columns in the mapping matrix
         * @return byte from the utah shape
         */
        readUtah(e, t, n, r) {
          let i = 0;
          return this.readModule(e - 2, t - 2, n, r) && (i |= 1), i <<= 1, this.readModule(e - 2, t - 1, n, r) && (i |= 1), i <<= 1, this.readModule(e - 1, t - 2, n, r) && (i |= 1), i <<= 1, this.readModule(e - 1, t - 1, n, r) && (i |= 1), i <<= 1, this.readModule(e - 1, t, n, r) && (i |= 1), i <<= 1, this.readModule(e, t - 2, n, r) && (i |= 1), i <<= 1, this.readModule(e, t - 1, n, r) && (i |= 1), i <<= 1, this.readModule(e, t, n, r) && (i |= 1), i;
        }
        /**
         * <p>Reads the 8 bits of the special corner condition 1.</p>
         *
         * <p>See ISO 16022:2006, Figure F.3</p>
         *
         * @param numRows Number of rows in the mapping matrix
         * @param numColumns Number of columns in the mapping matrix
         * @return byte from the Corner condition 1
         */
        readCorner1(e, t) {
          let n = 0;
          return this.readModule(e - 1, 0, e, t) && (n |= 1), n <<= 1, this.readModule(e - 1, 1, e, t) && (n |= 1), n <<= 1, this.readModule(e - 1, 2, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 2, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(1, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(2, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(3, t - 1, e, t) && (n |= 1), n;
        }
        /**
         * <p>Reads the 8 bits of the special corner condition 2.</p>
         *
         * <p>See ISO 16022:2006, Figure F.4</p>
         *
         * @param numRows Number of rows in the mapping matrix
         * @param numColumns Number of columns in the mapping matrix
         * @return byte from the Corner condition 2
         */
        readCorner2(e, t) {
          let n = 0;
          return this.readModule(e - 3, 0, e, t) && (n |= 1), n <<= 1, this.readModule(e - 2, 0, e, t) && (n |= 1), n <<= 1, this.readModule(e - 1, 0, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 4, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 3, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 2, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(1, t - 1, e, t) && (n |= 1), n;
        }
        /**
         * <p>Reads the 8 bits of the special corner condition 3.</p>
         *
         * <p>See ISO 16022:2006, Figure F.5</p>
         *
         * @param numRows Number of rows in the mapping matrix
         * @param numColumns Number of columns in the mapping matrix
         * @return byte from the Corner condition 3
         */
        readCorner3(e, t) {
          let n = 0;
          return this.readModule(e - 1, 0, e, t) && (n |= 1), n <<= 1, this.readModule(e - 1, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 3, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 2, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(1, t - 3, e, t) && (n |= 1), n <<= 1, this.readModule(1, t - 2, e, t) && (n |= 1), n <<= 1, this.readModule(1, t - 1, e, t) && (n |= 1), n;
        }
        /**
         * <p>Reads the 8 bits of the special corner condition 4.</p>
         *
         * <p>See ISO 16022:2006, Figure F.6</p>
         *
         * @param numRows Number of rows in the mapping matrix
         * @param numColumns Number of columns in the mapping matrix
         * @return byte from the Corner condition 4
         */
        readCorner4(e, t) {
          let n = 0;
          return this.readModule(e - 3, 0, e, t) && (n |= 1), n <<= 1, this.readModule(e - 2, 0, e, t) && (n |= 1), n <<= 1, this.readModule(e - 1, 0, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 2, e, t) && (n |= 1), n <<= 1, this.readModule(0, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(1, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(2, t - 1, e, t) && (n |= 1), n <<= 1, this.readModule(3, t - 1, e, t) && (n |= 1), n;
        }
        /**
         * <p>Extracts the data region from a {@link BitMatrix} that contains
         * alignment patterns.</p>
         *
         * @param bitMatrix Original {@link BitMatrix} with alignment patterns
         * @return BitMatrix that has the alignment patterns removed
         */
        extractDataRegion(e) {
          const t = this.version.getSymbolSizeRows(), n = this.version.getSymbolSizeColumns();
          if (e.getHeight() !== t)
            throw new R("Dimension of bitMatrix must match the version size");
          const r = this.version.getDataRegionSizeRows(), i = this.version.getDataRegionSizeColumns(), s = t / r | 0, o = n / i | 0, a = s * r, l = o * i, u = new Fe(l, a);
          for (let d = 0; d < s; ++d) {
            const A = d * r;
            for (let p = 0; p < o; ++p) {
              const I = p * i;
              for (let y = 0; y < r; ++y) {
                const _ = d * (r + 2) + 1 + y, N = A + y;
                for (let L = 0; L < i; ++L) {
                  const F = p * (i + 2) + 1 + L;
                  if (e.get(F, _)) {
                    const P = I + L;
                    u.set(P, N);
                  }
                }
              }
            }
          }
          return u;
        }
      }
      class wr {
        constructor(e, t) {
          this.numDataCodewords = e, this.codewords = t;
        }
        /**
         * <p>When Data Matrix Codes use multiple data blocks, they actually interleave the bytes of each of them.
         * That is, the first byte of data block 1 to n is written, then the second bytes, and so on. This
         * method will separate the data into original blocks.</p>
         *
         * @param rawCodewords bytes as read directly from the Data Matrix Code
         * @param version version of the Data Matrix Code
         * @return DataBlocks containing original bytes, "de-interleaved" from representation in the
         *         Data Matrix Code
         */
        static getDataBlocks(e, t) {
          const n = t.getECBlocks();
          let r = 0;
          const i = n.getECBlocks();
          for (let y of i)
            r += y.getCount();
          const s = new Array(r);
          let o = 0;
          for (let y of i)
            for (let _ = 0; _ < y.getCount(); _++) {
              const N = y.getDataCodewords(), L = n.getECCodewords() + N;
              s[o++] = new wr(N, new Uint8Array(L));
            }
          const l = s[0].codewords.length - n.getECCodewords(), u = l - 1;
          let d = 0;
          for (let y = 0; y < u; y++)
            for (let _ = 0; _ < o; _++)
              s[_].codewords[y] = e[d++];
          const A = t.getVersionNumber() === 24, p = A ? 8 : o;
          for (let y = 0; y < p; y++)
            s[y].codewords[l - 1] = e[d++];
          const I = s[0].codewords.length;
          for (let y = l; y < I; y++)
            for (let _ = 0; _ < o; _++) {
              const N = A ? (_ + 8) % o : _, L = A && N > 7 ? y - 1 : y;
              s[N].codewords[L] = e[d++];
            }
          if (d !== e.length)
            throw new R();
          return s;
        }
        getNumDataCodewords() {
          return this.numDataCodewords;
        }
        getCodewords() {
          return this.codewords;
        }
      }
      class Ar {
        /**
         * @param bytes bytes from which this will read bits. Bits will be read from the first byte first.
         * Bits are read within a byte from most-significant to least-significant bit.
         */
        constructor(e) {
          this.bytes = e, this.byteOffset = 0, this.bitOffset = 0;
        }
        /**
         * @return index of next bit in current byte which would be read by the next call to {@link #readBits(int)}.
         */
        getBitOffset() {
          return this.bitOffset;
        }
        /**
         * @return index of next byte in input byte array which would be read by the next call to {@link #readBits(int)}.
         */
        getByteOffset() {
          return this.byteOffset;
        }
        /**
         * @param numBits number of bits to read
         * @return int representing the bits read. The bits will appear as the least-significant
         *         bits of the int
         * @throws IllegalArgumentException if numBits isn't in [1,32] or more than is available
         */
        readBits(e) {
          if (e < 1 || e > 32 || e > this.available())
            throw new R("" + e);
          let t = 0, n = this.bitOffset, r = this.byteOffset;
          const i = this.bytes;
          if (n > 0) {
            const s = 8 - n, o = e < s ? e : s, a = s - o, l = 255 >> 8 - o << a;
            t = (i[r] & l) >> a, e -= o, n += o, n === 8 && (n = 0, r++);
          }
          if (e > 0) {
            for (; e >= 8; )
              t = t << 8 | i[r] & 255, r++, e -= 8;
            if (e > 0) {
              const s = 8 - e, o = 255 >> s << s;
              t = t << e | (i[r] & o) >> s, n += e;
            }
          }
          return this.bitOffset = n, this.byteOffset = r, t;
        }
        /**
         * @return number of bits that can be read successfully
         */
        available() {
          return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
        }
      }
      var Pe;
      (function(f) {
        f[f.PAD_ENCODE = 0] = "PAD_ENCODE", f[f.ASCII_ENCODE = 1] = "ASCII_ENCODE", f[f.C40_ENCODE = 2] = "C40_ENCODE", f[f.TEXT_ENCODE = 3] = "TEXT_ENCODE", f[f.ANSIX12_ENCODE = 4] = "ANSIX12_ENCODE", f[f.EDIFACT_ENCODE = 5] = "EDIFACT_ENCODE", f[f.BASE256_ENCODE = 6] = "BASE256_ENCODE";
      })(Pe || (Pe = {}));
      class Mt {
        static decode(e) {
          const t = new Ar(e), n = new ge(), r = new ge(), i = new Array();
          let s = Pe.ASCII_ENCODE;
          do
            if (s === Pe.ASCII_ENCODE)
              s = this.decodeAsciiSegment(t, n, r);
            else {
              switch (s) {
                case Pe.C40_ENCODE:
                  this.decodeC40Segment(t, n);
                  break;
                case Pe.TEXT_ENCODE:
                  this.decodeTextSegment(t, n);
                  break;
                case Pe.ANSIX12_ENCODE:
                  this.decodeAnsiX12Segment(t, n);
                  break;
                case Pe.EDIFACT_ENCODE:
                  this.decodeEdifactSegment(t, n);
                  break;
                case Pe.BASE256_ENCODE:
                  this.decodeBase256Segment(t, n, i);
                  break;
                default:
                  throw new U();
              }
              s = Pe.ASCII_ENCODE;
            }
          while (s !== Pe.PAD_ENCODE && t.available() > 0);
          return r.length() > 0 && n.append(r.toString()), new wn(e, n.toString(), i.length === 0 ? null : i, null);
        }
        /**
         * See ISO 16022:2006, 5.2.3 and Annex C, Table C.2
         */
        static decodeAsciiSegment(e, t, n) {
          let r = !1;
          do {
            let i = e.readBits(8);
            if (i === 0)
              throw new U();
            if (i <= 128)
              return r && (i += 128), t.append(String.fromCharCode(i - 1)), Pe.ASCII_ENCODE;
            if (i === 129)
              return Pe.PAD_ENCODE;
            if (i <= 229) {
              const s = i - 130;
              s < 10 && t.append("0"), t.append("" + s);
            } else
              switch (i) {
                case 230:
                  return Pe.C40_ENCODE;
                case 231:
                  return Pe.BASE256_ENCODE;
                case 232:
                  t.append("");
                  break;
                case 233:
                // Structured Append
                case 234:
                  break;
                case 235:
                  r = !0;
                  break;
                case 236:
                  t.append("[)>05"), n.insert(0, "");
                  break;
                case 237:
                  t.append("[)>06"), n.insert(0, "");
                  break;
                case 238:
                  return Pe.ANSIX12_ENCODE;
                case 239:
                  return Pe.TEXT_ENCODE;
                case 240:
                  return Pe.EDIFACT_ENCODE;
                case 241:
                  break;
                default:
                  if (i !== 254 || e.available() !== 0)
                    throw new U();
                  break;
              }
          } while (e.available() > 0);
          return Pe.ASCII_ENCODE;
        }
        /**
         * See ISO 16022:2006, 5.2.5 and Annex C, Table C.1
         */
        static decodeC40Segment(e, t) {
          let n = !1;
          const r = [];
          let i = 0;
          do {
            if (e.available() === 8)
              return;
            const s = e.readBits(8);
            if (s === 254)
              return;
            this.parseTwoBytes(s, e.readBits(8), r);
            for (let o = 0; o < 3; o++) {
              const a = r[o];
              switch (i) {
                case 0:
                  if (a < 3)
                    i = a + 1;
                  else if (a < this.C40_BASIC_SET_CHARS.length) {
                    const l = this.C40_BASIC_SET_CHARS[a];
                    n ? (t.append(String.fromCharCode(l.charCodeAt(0) + 128)), n = !1) : t.append(l);
                  } else
                    throw new U();
                  break;
                case 1:
                  n ? (t.append(String.fromCharCode(a + 128)), n = !1) : t.append(String.fromCharCode(a)), i = 0;
                  break;
                case 2:
                  if (a < this.C40_SHIFT2_SET_CHARS.length) {
                    const l = this.C40_SHIFT2_SET_CHARS[a];
                    n ? (t.append(String.fromCharCode(l.charCodeAt(0) + 128)), n = !1) : t.append(l);
                  } else
                    switch (a) {
                      case 27:
                        t.append("");
                        break;
                      case 30:
                        n = !0;
                        break;
                      default:
                        throw new U();
                    }
                  i = 0;
                  break;
                case 3:
                  n ? (t.append(String.fromCharCode(a + 224)), n = !1) : t.append(String.fromCharCode(a + 96)), i = 0;
                  break;
                default:
                  throw new U();
              }
            }
          } while (e.available() > 0);
        }
        /**
         * See ISO 16022:2006, 5.2.6 and Annex C, Table C.2
         */
        static decodeTextSegment(e, t) {
          let n = !1, r = [], i = 0;
          do {
            if (e.available() === 8)
              return;
            const s = e.readBits(8);
            if (s === 254)
              return;
            this.parseTwoBytes(s, e.readBits(8), r);
            for (let o = 0; o < 3; o++) {
              const a = r[o];
              switch (i) {
                case 0:
                  if (a < 3)
                    i = a + 1;
                  else if (a < this.TEXT_BASIC_SET_CHARS.length) {
                    const l = this.TEXT_BASIC_SET_CHARS[a];
                    n ? (t.append(String.fromCharCode(l.charCodeAt(0) + 128)), n = !1) : t.append(l);
                  } else
                    throw new U();
                  break;
                case 1:
                  n ? (t.append(String.fromCharCode(a + 128)), n = !1) : t.append(String.fromCharCode(a)), i = 0;
                  break;
                case 2:
                  if (a < this.TEXT_SHIFT2_SET_CHARS.length) {
                    const l = this.TEXT_SHIFT2_SET_CHARS[a];
                    n ? (t.append(String.fromCharCode(l.charCodeAt(0) + 128)), n = !1) : t.append(l);
                  } else
                    switch (a) {
                      case 27:
                        t.append("");
                        break;
                      case 30:
                        n = !0;
                        break;
                      default:
                        throw new U();
                    }
                  i = 0;
                  break;
                case 3:
                  if (a < this.TEXT_SHIFT3_SET_CHARS.length) {
                    const l = this.TEXT_SHIFT3_SET_CHARS[a];
                    n ? (t.append(String.fromCharCode(l.charCodeAt(0) + 128)), n = !1) : t.append(l), i = 0;
                  } else
                    throw new U();
                  break;
                default:
                  throw new U();
              }
            }
          } while (e.available() > 0);
        }
        /**
         * See ISO 16022:2006, 5.2.7
         */
        static decodeAnsiX12Segment(e, t) {
          const n = [];
          do {
            if (e.available() === 8)
              return;
            const r = e.readBits(8);
            if (r === 254)
              return;
            this.parseTwoBytes(r, e.readBits(8), n);
            for (let i = 0; i < 3; i++) {
              const s = n[i];
              switch (s) {
                case 0:
                  t.append("\r");
                  break;
                case 1:
                  t.append("*");
                  break;
                case 2:
                  t.append(">");
                  break;
                case 3:
                  t.append(" ");
                  break;
                default:
                  if (s < 14)
                    t.append(String.fromCharCode(s + 44));
                  else if (s < 40)
                    t.append(String.fromCharCode(s + 51));
                  else
                    throw new U();
                  break;
              }
            }
          } while (e.available() > 0);
        }
        static parseTwoBytes(e, t, n) {
          let r = (e << 8) + t - 1, i = Math.floor(r / 1600);
          n[0] = i, r -= i * 1600, i = Math.floor(r / 40), n[1] = i, n[2] = r - i * 40;
        }
        /**
         * See ISO 16022:2006, 5.2.8 and Annex C Table C.3
         */
        static decodeEdifactSegment(e, t) {
          do {
            if (e.available() <= 16)
              return;
            for (let n = 0; n < 4; n++) {
              let r = e.readBits(6);
              if (r === 31) {
                const i = 8 - e.getBitOffset();
                i !== 8 && e.readBits(i);
                return;
              }
              (r & 32) === 0 && (r |= 64), t.append(String.fromCharCode(r));
            }
          } while (e.available() > 0);
        }
        /**
         * See ISO 16022:2006, 5.2.9 and Annex B, B.2
         */
        static decodeBase256Segment(e, t, n) {
          let r = 1 + e.getByteOffset();
          const i = this.unrandomize255State(e.readBits(8), r++);
          let s;
          if (i === 0 ? s = e.available() / 8 | 0 : i < 250 ? s = i : s = 250 * (i - 249) + this.unrandomize255State(e.readBits(8), r++), s < 0)
            throw new U();
          const o = new Uint8Array(s);
          for (let a = 0; a < s; a++) {
            if (e.available() < 8)
              throw new U();
            o[a] = this.unrandomize255State(e.readBits(8), r++);
          }
          n.push(o);
          try {
            t.append(Je.decode(o, Q.ISO88591));
          } catch (a) {
            throw new wt("Platform does not support required encoding: " + a.message);
          }
        }
        /**
         * See ISO 16022:2006, Annex B, B.2
         */
        static unrandomize255State(e, t) {
          const n = 149 * t % 255 + 1, r = e - n;
          return r >= 0 ? r : r + 256;
        }
      }
      Mt.C40_BASIC_SET_CHARS = [
        "*",
        "*",
        "*",
        " ",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ], Mt.C40_SHIFT2_SET_CHARS = [
        "!",
        '"',
        "#",
        "$",
        "%",
        "&",
        "'",
        "(",
        ")",
        "*",
        "+",
        ",",
        "-",
        ".",
        "/",
        ":",
        ";",
        "<",
        "=",
        ">",
        "?",
        "@",
        "[",
        "\\",
        "]",
        "^",
        "_"
      ], Mt.TEXT_BASIC_SET_CHARS = [
        "*",
        "*",
        "*",
        " ",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ], Mt.TEXT_SHIFT2_SET_CHARS = Mt.C40_SHIFT2_SET_CHARS, Mt.TEXT_SHIFT3_SET_CHARS = [
        "`",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "{",
        "|",
        "}",
        "~",
        ""
      ];
      class Zi {
        constructor() {
          this.rsDecoder = new En(ce.DATA_MATRIX_FIELD_256);
        }
        /**
         * <p>Decodes a Data Matrix Code represented as a {@link BitMatrix}. A 1 or "true" is taken
         * to mean a black module.</p>
         *
         * @param bits booleans representing white/black Data Matrix Code modules
         * @return text and bytes encoded within the Data Matrix Code
         * @throws FormatException if the Data Matrix Code cannot be decoded
         * @throws ChecksumException if error correction fails
         */
        decode(e) {
          const t = new gr(e), n = t.getVersion(), r = t.readCodewords(), i = wr.getDataBlocks(r, n);
          let s = 0;
          for (let l of i)
            s += l.getNumDataCodewords();
          const o = new Uint8Array(s), a = i.length;
          for (let l = 0; l < a; l++) {
            const u = i[l], d = u.getCodewords(), A = u.getNumDataCodewords();
            this.correctErrors(d, A);
            for (let p = 0; p < A; p++)
              o[p * a + l] = d[p];
          }
          return Mt.decode(o);
        }
        /**
         * <p>Given data and error-correction codewords received, possibly corrupted by errors, attempts to
         * correct the errors in-place using Reed-Solomon error correction.</p>
         *
         * @param codewordBytes data and error correction codewords
         * @param numDataCodewords number of codewords that are data bytes
         * @throws ChecksumException if error correction fails
         */
        correctErrors(e, t) {
          const n = new Int32Array(e);
          try {
            this.rsDecoder.decode(n, e.length - t);
          } catch {
            throw new q();
          }
          for (let r = 0; r < t; r++)
            e[r] = n[r];
        }
      }
      class De {
        constructor(e) {
          this.image = e, this.rectangleDetector = new bt(this.image);
        }
        /**
         * <p>Detects a Data Matrix Code in an image.</p>
         *
         * @return {@link DetectorResult} encapsulating results of detecting a Data Matrix Code
         * @throws NotFoundException if no Data Matrix Code can be found
         */
        detect() {
          const e = this.rectangleDetector.detect();
          let t = this.detectSolid1(e);
          if (t = this.detectSolid2(t), t[3] = this.correctTopRight(t), !t[3])
            throw new D();
          t = this.shiftToModuleCenter(t);
          const n = t[0], r = t[1], i = t[2], s = t[3];
          let o = this.transitionsBetween(n, s) + 1, a = this.transitionsBetween(i, s) + 1;
          (o & 1) === 1 && (o += 1), (a & 1) === 1 && (a += 1), 4 * o < 7 * a && 4 * a < 7 * o && (o = a = Math.max(o, a));
          let l = De.sampleGrid(this.image, n, r, i, s, o, a);
          return new Un(l, [n, r, i, s]);
        }
        static shiftPoint(e, t, n) {
          let r = (t.getX() - e.getX()) / (n + 1), i = (t.getY() - e.getY()) / (n + 1);
          return new W(e.getX() + r, e.getY() + i);
        }
        static moveAway(e, t, n) {
          let r = e.getX(), i = e.getY();
          return r < t ? r -= 1 : r += 1, i < n ? i -= 1 : i += 1, new W(r, i);
        }
        /**
         * Detect a solid side which has minimum transition.
         */
        detectSolid1(e) {
          let t = e[0], n = e[1], r = e[3], i = e[2], s = this.transitionsBetween(t, n), o = this.transitionsBetween(n, r), a = this.transitionsBetween(r, i), l = this.transitionsBetween(i, t), u = s, d = [i, t, n, r];
          return u > o && (u = o, d[0] = t, d[1] = n, d[2] = r, d[3] = i), u > a && (u = a, d[0] = n, d[1] = r, d[2] = i, d[3] = t), u > l && (d[0] = r, d[1] = i, d[2] = t, d[3] = n), d;
        }
        /**
         * Detect a second solid side next to first solid side.
         */
        detectSolid2(e) {
          let t = e[0], n = e[1], r = e[2], i = e[3], s = this.transitionsBetween(t, i), o = De.shiftPoint(n, r, (s + 1) * 4), a = De.shiftPoint(r, n, (s + 1) * 4), l = this.transitionsBetween(o, t), u = this.transitionsBetween(a, i);
          return l < u ? (e[0] = t, e[1] = n, e[2] = r, e[3] = i) : (e[0] = n, e[1] = r, e[2] = i, e[3] = t), e;
        }
        /**
         * Calculates the corner position of the white top right module.
         */
        correctTopRight(e) {
          let t = e[0], n = e[1], r = e[2], i = e[3], s = this.transitionsBetween(t, i), o = this.transitionsBetween(n, i), a = De.shiftPoint(t, n, (o + 1) * 4), l = De.shiftPoint(r, n, (s + 1) * 4);
          s = this.transitionsBetween(a, i), o = this.transitionsBetween(l, i);
          let u = new W(i.getX() + (r.getX() - n.getX()) / (s + 1), i.getY() + (r.getY() - n.getY()) / (s + 1)), d = new W(i.getX() + (t.getX() - n.getX()) / (o + 1), i.getY() + (t.getY() - n.getY()) / (o + 1));
          if (!this.isValid(u))
            return this.isValid(d) ? d : null;
          if (!this.isValid(d))
            return u;
          let A = this.transitionsBetween(a, u) + this.transitionsBetween(l, u), p = this.transitionsBetween(a, d) + this.transitionsBetween(l, d);
          return A > p ? u : d;
        }
        /**
         * Shift the edge points to the module center.
         */
        shiftToModuleCenter(e) {
          let t = e[0], n = e[1], r = e[2], i = e[3], s = this.transitionsBetween(t, i) + 1, o = this.transitionsBetween(r, i) + 1, a = De.shiftPoint(t, n, o * 4), l = De.shiftPoint(r, n, s * 4);
          s = this.transitionsBetween(a, i) + 1, o = this.transitionsBetween(l, i) + 1, (s & 1) === 1 && (s += 1), (o & 1) === 1 && (o += 1);
          let u = (t.getX() + n.getX() + r.getX() + i.getX()) / 4, d = (t.getY() + n.getY() + r.getY() + i.getY()) / 4;
          t = De.moveAway(t, u, d), n = De.moveAway(n, u, d), r = De.moveAway(r, u, d), i = De.moveAway(i, u, d);
          let A, p;
          return a = De.shiftPoint(t, n, o * 4), a = De.shiftPoint(a, i, s * 4), A = De.shiftPoint(n, t, o * 4), A = De.shiftPoint(A, r, s * 4), l = De.shiftPoint(r, i, o * 4), l = De.shiftPoint(l, n, s * 4), p = De.shiftPoint(i, r, o * 4), p = De.shiftPoint(p, t, s * 4), [a, A, l, p];
        }
        isValid(e) {
          return e.getX() >= 0 && e.getX() < this.image.getWidth() && e.getY() > 0 && e.getY() < this.image.getHeight();
        }
        static sampleGrid(e, t, n, r, i, s, o) {
          return Rt.getInstance().sampleGrid(e, s, o, 0.5, 0.5, s - 0.5, 0.5, s - 0.5, o - 0.5, 0.5, o - 0.5, t.getX(), t.getY(), i.getX(), i.getY(), r.getX(), r.getY(), n.getX(), n.getY());
        }
        /**
         * Counts the number of black/white transitions between two points, using something like Bresenham's algorithm.
         */
        transitionsBetween(e, t) {
          let n = Math.trunc(e.getX()), r = Math.trunc(e.getY()), i = Math.trunc(t.getX()), s = Math.trunc(t.getY()), o = Math.abs(s - r) > Math.abs(i - n);
          if (o) {
            let y = n;
            n = r, r = y, y = i, i = s, s = y;
          }
          let a = Math.abs(i - n), l = Math.abs(s - r), u = -a / 2, d = r < s ? 1 : -1, A = n < i ? 1 : -1, p = 0, I = this.image.get(o ? r : n, o ? n : r);
          for (let y = n, _ = r; y !== i; y += A) {
            let N = this.image.get(o ? _ : y, o ? y : _);
            if (N !== I && (p++, I = N), u += l, u > 0) {
              if (_ === s)
                break;
              _ += d, u -= a;
            }
          }
          return p;
        }
      }
      class vt {
        constructor() {
          this.decoder = new Zi();
        }
        /**
         * Locates and decodes a Data Matrix code in an image.
         *
         * @return a String representing the content encoded by the Data Matrix code
         * @throws NotFoundException if a Data Matrix code cannot be found
         * @throws FormatException if a Data Matrix code cannot be decoded
         * @throws ChecksumException if error correction fails
         */
        // @Override
        // public Result decode(BinaryBitmap image) throws NotFoundException, ChecksumException, FormatException {
        //   return decode(image, null);
        // }
        // @Override
        decode(e, t = null) {
          let n, r;
          if (t != null && t.has(xe.PURE_BARCODE)) {
            const l = vt.extractPureBits(e.getBlackMatrix());
            n = this.decoder.decode(l), r = vt.NO_POINTS;
          } else {
            const l = new De(e.getBlackMatrix()).detect();
            n = this.decoder.decode(l.getBits()), r = l.getPoints();
          }
          const i = n.getRawBytes(), s = new qe(n.getText(), i, 8 * i.length, r, Y.DATA_MATRIX, ie.currentTimeMillis()), o = n.getByteSegments();
          o != null && s.putMetadata(Ue.BYTE_SEGMENTS, o);
          const a = n.getECLevel();
          return a != null && s.putMetadata(Ue.ERROR_CORRECTION_LEVEL, a), s;
        }
        // @Override
        reset() {
        }
        /**
         * This method detects a code in a "pure" image -- that is, pure monochrome image
         * which contains only an unrotated, unskewed, image of a code, with some white border
         * around it. This is a specialized method that works exceptionally fast in this special
         * case.
         *
         * @see com.google.zxing.qrcode.QRCodeReader#extractPureBits(BitMatrix)
         */
        static extractPureBits(e) {
          const t = e.getTopLeftOnBit(), n = e.getBottomRightOnBit();
          if (t == null || n == null)
            throw new D();
          const r = this.moduleSize(t, e);
          let i = t[1];
          const s = n[1];
          let o = t[0];
          const l = (n[0] - o + 1) / r, u = (s - i + 1) / r;
          if (l <= 0 || u <= 0)
            throw new D();
          const d = r / 2;
          i += d, o += d;
          const A = new Fe(l, u);
          for (let p = 0; p < u; p++) {
            const I = i + p * r;
            for (let y = 0; y < l; y++)
              e.get(o + y * r, I) && A.set(y, p);
          }
          return A;
        }
        static moduleSize(e, t) {
          const n = t.getWidth();
          let r = e[0];
          const i = e[1];
          for (; r < n && t.get(r, i); )
            r++;
          if (r === n)
            throw new D();
          const s = r - e[0];
          if (s === 0)
            throw new D();
          return s;
        }
      }
      vt.NO_POINTS = [];
      class ji extends Ut {
        /**
         * Creates an instance of BrowserQRCodeReader.
         * @param {number} [timeBetweenScansMillis=500] the time delay between subsequent decode tries
         */
        constructor(e = 500) {
          super(new vt(), e);
        }
      }
      var rn;
      (function(f) {
        f[f.L = 0] = "L", f[f.M = 1] = "M", f[f.Q = 2] = "Q", f[f.H = 3] = "H";
      })(rn || (rn = {}));
      class Ie {
        constructor(e, t, n) {
          this.value = e, this.stringValue = t, this.bits = n, Ie.FOR_BITS.set(n, this), Ie.FOR_VALUE.set(e, this);
        }
        getValue() {
          return this.value;
        }
        getBits() {
          return this.bits;
        }
        static fromString(e) {
          switch (e) {
            case "L":
              return Ie.L;
            case "M":
              return Ie.M;
            case "Q":
              return Ie.Q;
            case "H":
              return Ie.H;
            default:
              throw new v(e + "not available");
          }
        }
        toString() {
          return this.stringValue;
        }
        equals(e) {
          if (!(e instanceof Ie))
            return !1;
          const t = e;
          return this.value === t.value;
        }
        /**
         * @param bits int containing the two bits encoding a QR Code's error correction level
         * @return ErrorCorrectionLevel representing the encoded error correction level
         */
        static forBits(e) {
          if (e < 0 || e >= Ie.FOR_BITS.size)
            throw new R();
          return Ie.FOR_BITS.get(e);
        }
      }
      Ie.FOR_BITS = /* @__PURE__ */ new Map(), Ie.FOR_VALUE = /* @__PURE__ */ new Map(), Ie.L = new Ie(rn.L, "L", 1), Ie.M = new Ie(rn.M, "M", 0), Ie.Q = new Ie(rn.Q, "Q", 3), Ie.H = new Ie(rn.H, "H", 2);
      class je {
        constructor(e) {
          this.errorCorrectionLevel = Ie.forBits(e >> 3 & 3), this.dataMask = /*(byte) */
          e & 7;
        }
        static numBitsDiffering(e, t) {
          return K.bitCount(e ^ t);
        }
        /**
         * @param maskedFormatInfo1 format info indicator, with mask still applied
         * @param maskedFormatInfo2 second copy of same info; both are checked at the same time
         *  to establish best match
         * @return information about the format it specifies, or {@code null}
         *  if doesn't seem to match any known pattern
         */
        static decodeFormatInformation(e, t) {
          const n = je.doDecodeFormatInformation(e, t);
          return n !== null ? n : je.doDecodeFormatInformation(e ^ je.FORMAT_INFO_MASK_QR, t ^ je.FORMAT_INFO_MASK_QR);
        }
        static doDecodeFormatInformation(e, t) {
          let n = Number.MAX_SAFE_INTEGER, r = 0;
          for (const i of je.FORMAT_INFO_DECODE_LOOKUP) {
            const s = i[0];
            if (s === e || s === t)
              return new je(i[1]);
            let o = je.numBitsDiffering(e, s);
            o < n && (r = i[1], n = o), e !== t && (o = je.numBitsDiffering(t, s), o < n && (r = i[1], n = o));
          }
          return n <= 3 ? new je(r) : null;
        }
        getErrorCorrectionLevel() {
          return this.errorCorrectionLevel;
        }
        getDataMask() {
          return this.dataMask;
        }
        /*@Override*/
        hashCode() {
          return this.errorCorrectionLevel.getBits() << 3 | this.dataMask;
        }
        /*@Override*/
        equals(e) {
          if (!(e instanceof je))
            return !1;
          const t = e;
          return this.errorCorrectionLevel === t.errorCorrectionLevel && this.dataMask === t.dataMask;
        }
      }
      je.FORMAT_INFO_MASK_QR = 21522, je.FORMAT_INFO_DECODE_LOOKUP = [
        Int32Array.from([21522, 0]),
        Int32Array.from([20773, 1]),
        Int32Array.from([24188, 2]),
        Int32Array.from([23371, 3]),
        Int32Array.from([17913, 4]),
        Int32Array.from([16590, 5]),
        Int32Array.from([20375, 6]),
        Int32Array.from([19104, 7]),
        Int32Array.from([30660, 8]),
        Int32Array.from([29427, 9]),
        Int32Array.from([32170, 10]),
        Int32Array.from([30877, 11]),
        Int32Array.from([26159, 12]),
        Int32Array.from([25368, 13]),
        Int32Array.from([27713, 14]),
        Int32Array.from([26998, 15]),
        Int32Array.from([5769, 16]),
        Int32Array.from([5054, 17]),
        Int32Array.from([7399, 18]),
        Int32Array.from([6608, 19]),
        Int32Array.from([1890, 20]),
        Int32Array.from([597, 21]),
        Int32Array.from([3340, 22]),
        Int32Array.from([2107, 23]),
        Int32Array.from([13663, 24]),
        Int32Array.from([12392, 25]),
        Int32Array.from([16177, 26]),
        Int32Array.from([14854, 27]),
        Int32Array.from([9396, 28]),
        Int32Array.from([8579, 29]),
        Int32Array.from([11994, 30]),
        Int32Array.from([11245, 31])
      ];
      class S {
        constructor(e, ...t) {
          this.ecCodewordsPerBlock = e, this.ecBlocks = t;
        }
        getECCodewordsPerBlock() {
          return this.ecCodewordsPerBlock;
        }
        getNumBlocks() {
          let e = 0;
          const t = this.ecBlocks;
          for (const n of t)
            e += n.getCount();
          return e;
        }
        getTotalECCodewords() {
          return this.ecCodewordsPerBlock * this.getNumBlocks();
        }
        getECBlocks() {
          return this.ecBlocks;
        }
      }
      class C {
        constructor(e, t) {
          this.count = e, this.dataCodewords = t;
        }
        getCount() {
          return this.count;
        }
        getDataCodewords() {
          return this.dataCodewords;
        }
      }
      class X {
        constructor(e, t, ...n) {
          this.versionNumber = e, this.alignmentPatternCenters = t, this.ecBlocks = n;
          let r = 0;
          const i = n[0].getECCodewordsPerBlock(), s = n[0].getECBlocks();
          for (const o of s)
            r += o.getCount() * (o.getDataCodewords() + i);
          this.totalCodewords = r;
        }
        getVersionNumber() {
          return this.versionNumber;
        }
        getAlignmentPatternCenters() {
          return this.alignmentPatternCenters;
        }
        getTotalCodewords() {
          return this.totalCodewords;
        }
        getDimensionForVersion() {
          return 17 + 4 * this.versionNumber;
        }
        getECBlocksForLevel(e) {
          return this.ecBlocks[e.getValue()];
        }
        /**
         * <p>Deduces version information purely from QR Code dimensions.</p>
         *
         * @param dimension dimension in modules
         * @return Version for a QR Code of that dimension
         * @throws FormatException if dimension is not 1 mod 4
         */
        static getProvisionalVersionForDimension(e) {
          if (e % 4 !== 1)
            throw new U();
          try {
            return this.getVersionForNumber((e - 17) / 4);
          } catch {
            throw new U();
          }
        }
        static getVersionForNumber(e) {
          if (e < 1 || e > 40)
            throw new R();
          return X.VERSIONS[e - 1];
        }
        static decodeVersionInformation(e) {
          let t = Number.MAX_SAFE_INTEGER, n = 0;
          for (let r = 0; r < X.VERSION_DECODE_INFO.length; r++) {
            const i = X.VERSION_DECODE_INFO[r];
            if (i === e)
              return X.getVersionForNumber(r + 7);
            const s = je.numBitsDiffering(e, i);
            s < t && (n = r + 7, t = s);
          }
          return t <= 3 ? X.getVersionForNumber(n) : null;
        }
        /**
         * See ISO 18004:2006 Annex E
         */
        buildFunctionPattern() {
          const e = this.getDimensionForVersion(), t = new Fe(e);
          t.setRegion(0, 0, 9, 9), t.setRegion(e - 8, 0, 8, 9), t.setRegion(0, e - 8, 9, 8);
          const n = this.alignmentPatternCenters.length;
          for (let r = 0; r < n; r++) {
            const i = this.alignmentPatternCenters[r] - 2;
            for (let s = 0; s < n; s++)
              r === 0 && (s === 0 || s === n - 1) || r === n - 1 && s === 0 || t.setRegion(this.alignmentPatternCenters[s] - 2, i, 5, 5);
          }
          return t.setRegion(6, 9, 1, e - 17), t.setRegion(9, 6, e - 17, 1), this.versionNumber > 6 && (t.setRegion(e - 11, 0, 3, 6), t.setRegion(0, e - 11, 6, 3)), t;
        }
        /*@Override*/
        toString() {
          return "" + this.versionNumber;
        }
      }
      X.VERSION_DECODE_INFO = Int32Array.from([
        31892,
        34236,
        39577,
        42195,
        48118,
        51042,
        55367,
        58893,
        63784,
        68472,
        70749,
        76311,
        79154,
        84390,
        87683,
        92361,
        96236,
        102084,
        102881,
        110507,
        110734,
        117786,
        119615,
        126325,
        127568,
        133589,
        136944,
        141498,
        145311,
        150283,
        152622,
        158308,
        161089,
        167017
      ]), X.VERSIONS = [
        new X(1, new Int32Array(0), new S(7, new C(1, 19)), new S(10, new C(1, 16)), new S(13, new C(1, 13)), new S(17, new C(1, 9))),
        new X(2, Int32Array.from([6, 18]), new S(10, new C(1, 34)), new S(16, new C(1, 28)), new S(22, new C(1, 22)), new S(28, new C(1, 16))),
        new X(3, Int32Array.from([6, 22]), new S(15, new C(1, 55)), new S(26, new C(1, 44)), new S(18, new C(2, 17)), new S(22, new C(2, 13))),
        new X(4, Int32Array.from([6, 26]), new S(20, new C(1, 80)), new S(18, new C(2, 32)), new S(26, new C(2, 24)), new S(16, new C(4, 9))),
        new X(5, Int32Array.from([6, 30]), new S(26, new C(1, 108)), new S(24, new C(2, 43)), new S(18, new C(2, 15), new C(2, 16)), new S(22, new C(2, 11), new C(2, 12))),
        new X(6, Int32Array.from([6, 34]), new S(18, new C(2, 68)), new S(16, new C(4, 27)), new S(24, new C(4, 19)), new S(28, new C(4, 15))),
        new X(7, Int32Array.from([6, 22, 38]), new S(20, new C(2, 78)), new S(18, new C(4, 31)), new S(18, new C(2, 14), new C(4, 15)), new S(26, new C(4, 13), new C(1, 14))),
        new X(8, Int32Array.from([6, 24, 42]), new S(24, new C(2, 97)), new S(22, new C(2, 38), new C(2, 39)), new S(22, new C(4, 18), new C(2, 19)), new S(26, new C(4, 14), new C(2, 15))),
        new X(9, Int32Array.from([6, 26, 46]), new S(30, new C(2, 116)), new S(22, new C(3, 36), new C(2, 37)), new S(20, new C(4, 16), new C(4, 17)), new S(24, new C(4, 12), new C(4, 13))),
        new X(10, Int32Array.from([6, 28, 50]), new S(18, new C(2, 68), new C(2, 69)), new S(26, new C(4, 43), new C(1, 44)), new S(24, new C(6, 19), new C(2, 20)), new S(28, new C(6, 15), new C(2, 16))),
        new X(11, Int32Array.from([6, 30, 54]), new S(20, new C(4, 81)), new S(30, new C(1, 50), new C(4, 51)), new S(28, new C(4, 22), new C(4, 23)), new S(24, new C(3, 12), new C(8, 13))),
        new X(12, Int32Array.from([6, 32, 58]), new S(24, new C(2, 92), new C(2, 93)), new S(22, new C(6, 36), new C(2, 37)), new S(26, new C(4, 20), new C(6, 21)), new S(28, new C(7, 14), new C(4, 15))),
        new X(13, Int32Array.from([6, 34, 62]), new S(26, new C(4, 107)), new S(22, new C(8, 37), new C(1, 38)), new S(24, new C(8, 20), new C(4, 21)), new S(22, new C(12, 11), new C(4, 12))),
        new X(14, Int32Array.from([6, 26, 46, 66]), new S(30, new C(3, 115), new C(1, 116)), new S(24, new C(4, 40), new C(5, 41)), new S(20, new C(11, 16), new C(5, 17)), new S(24, new C(11, 12), new C(5, 13))),
        new X(15, Int32Array.from([6, 26, 48, 70]), new S(22, new C(5, 87), new C(1, 88)), new S(24, new C(5, 41), new C(5, 42)), new S(30, new C(5, 24), new C(7, 25)), new S(24, new C(11, 12), new C(7, 13))),
        new X(16, Int32Array.from([6, 26, 50, 74]), new S(24, new C(5, 98), new C(1, 99)), new S(28, new C(7, 45), new C(3, 46)), new S(24, new C(15, 19), new C(2, 20)), new S(30, new C(3, 15), new C(13, 16))),
        new X(17, Int32Array.from([6, 30, 54, 78]), new S(28, new C(1, 107), new C(5, 108)), new S(28, new C(10, 46), new C(1, 47)), new S(28, new C(1, 22), new C(15, 23)), new S(28, new C(2, 14), new C(17, 15))),
        new X(18, Int32Array.from([6, 30, 56, 82]), new S(30, new C(5, 120), new C(1, 121)), new S(26, new C(9, 43), new C(4, 44)), new S(28, new C(17, 22), new C(1, 23)), new S(28, new C(2, 14), new C(19, 15))),
        new X(19, Int32Array.from([6, 30, 58, 86]), new S(28, new C(3, 113), new C(4, 114)), new S(26, new C(3, 44), new C(11, 45)), new S(26, new C(17, 21), new C(4, 22)), new S(26, new C(9, 13), new C(16, 14))),
        new X(20, Int32Array.from([6, 34, 62, 90]), new S(28, new C(3, 107), new C(5, 108)), new S(26, new C(3, 41), new C(13, 42)), new S(30, new C(15, 24), new C(5, 25)), new S(28, new C(15, 15), new C(10, 16))),
        new X(21, Int32Array.from([6, 28, 50, 72, 94]), new S(28, new C(4, 116), new C(4, 117)), new S(26, new C(17, 42)), new S(28, new C(17, 22), new C(6, 23)), new S(30, new C(19, 16), new C(6, 17))),
        new X(22, Int32Array.from([6, 26, 50, 74, 98]), new S(28, new C(2, 111), new C(7, 112)), new S(28, new C(17, 46)), new S(30, new C(7, 24), new C(16, 25)), new S(24, new C(34, 13))),
        new X(23, Int32Array.from([6, 30, 54, 78, 102]), new S(30, new C(4, 121), new C(5, 122)), new S(28, new C(4, 47), new C(14, 48)), new S(30, new C(11, 24), new C(14, 25)), new S(30, new C(16, 15), new C(14, 16))),
        new X(24, Int32Array.from([6, 28, 54, 80, 106]), new S(30, new C(6, 117), new C(4, 118)), new S(28, new C(6, 45), new C(14, 46)), new S(30, new C(11, 24), new C(16, 25)), new S(30, new C(30, 16), new C(2, 17))),
        new X(25, Int32Array.from([6, 32, 58, 84, 110]), new S(26, new C(8, 106), new C(4, 107)), new S(28, new C(8, 47), new C(13, 48)), new S(30, new C(7, 24), new C(22, 25)), new S(30, new C(22, 15), new C(13, 16))),
        new X(26, Int32Array.from([6, 30, 58, 86, 114]), new S(28, new C(10, 114), new C(2, 115)), new S(28, new C(19, 46), new C(4, 47)), new S(28, new C(28, 22), new C(6, 23)), new S(30, new C(33, 16), new C(4, 17))),
        new X(27, Int32Array.from([6, 34, 62, 90, 118]), new S(30, new C(8, 122), new C(4, 123)), new S(28, new C(22, 45), new C(3, 46)), new S(30, new C(8, 23), new C(26, 24)), new S(30, new C(12, 15), new C(28, 16))),
        new X(28, Int32Array.from([6, 26, 50, 74, 98, 122]), new S(30, new C(3, 117), new C(10, 118)), new S(28, new C(3, 45), new C(23, 46)), new S(30, new C(4, 24), new C(31, 25)), new S(30, new C(11, 15), new C(31, 16))),
        new X(29, Int32Array.from([6, 30, 54, 78, 102, 126]), new S(30, new C(7, 116), new C(7, 117)), new S(28, new C(21, 45), new C(7, 46)), new S(30, new C(1, 23), new C(37, 24)), new S(30, new C(19, 15), new C(26, 16))),
        new X(30, Int32Array.from([6, 26, 52, 78, 104, 130]), new S(30, new C(5, 115), new C(10, 116)), new S(28, new C(19, 47), new C(10, 48)), new S(30, new C(15, 24), new C(25, 25)), new S(30, new C(23, 15), new C(25, 16))),
        new X(31, Int32Array.from([6, 30, 56, 82, 108, 134]), new S(30, new C(13, 115), new C(3, 116)), new S(28, new C(2, 46), new C(29, 47)), new S(30, new C(42, 24), new C(1, 25)), new S(30, new C(23, 15), new C(28, 16))),
        new X(32, Int32Array.from([6, 34, 60, 86, 112, 138]), new S(30, new C(17, 115)), new S(28, new C(10, 46), new C(23, 47)), new S(30, new C(10, 24), new C(35, 25)), new S(30, new C(19, 15), new C(35, 16))),
        new X(33, Int32Array.from([6, 30, 58, 86, 114, 142]), new S(30, new C(17, 115), new C(1, 116)), new S(28, new C(14, 46), new C(21, 47)), new S(30, new C(29, 24), new C(19, 25)), new S(30, new C(11, 15), new C(46, 16))),
        new X(34, Int32Array.from([6, 34, 62, 90, 118, 146]), new S(30, new C(13, 115), new C(6, 116)), new S(28, new C(14, 46), new C(23, 47)), new S(30, new C(44, 24), new C(7, 25)), new S(30, new C(59, 16), new C(1, 17))),
        new X(35, Int32Array.from([6, 30, 54, 78, 102, 126, 150]), new S(30, new C(12, 121), new C(7, 122)), new S(28, new C(12, 47), new C(26, 48)), new S(30, new C(39, 24), new C(14, 25)), new S(30, new C(22, 15), new C(41, 16))),
        new X(36, Int32Array.from([6, 24, 50, 76, 102, 128, 154]), new S(30, new C(6, 121), new C(14, 122)), new S(28, new C(6, 47), new C(34, 48)), new S(30, new C(46, 24), new C(10, 25)), new S(30, new C(2, 15), new C(64, 16))),
        new X(37, Int32Array.from([6, 28, 54, 80, 106, 132, 158]), new S(30, new C(17, 122), new C(4, 123)), new S(28, new C(29, 46), new C(14, 47)), new S(30, new C(49, 24), new C(10, 25)), new S(30, new C(24, 15), new C(46, 16))),
        new X(38, Int32Array.from([6, 32, 58, 84, 110, 136, 162]), new S(30, new C(4, 122), new C(18, 123)), new S(28, new C(13, 46), new C(32, 47)), new S(30, new C(48, 24), new C(14, 25)), new S(30, new C(42, 15), new C(32, 16))),
        new X(39, Int32Array.from([6, 26, 54, 82, 110, 138, 166]), new S(30, new C(20, 117), new C(4, 118)), new S(28, new C(40, 47), new C(7, 48)), new S(30, new C(43, 24), new C(22, 25)), new S(30, new C(10, 15), new C(67, 16))),
        new X(40, Int32Array.from([6, 30, 58, 86, 114, 142, 170]), new S(30, new C(19, 118), new C(6, 119)), new S(28, new C(18, 47), new C(31, 48)), new S(30, new C(34, 24), new C(34, 25)), new S(30, new C(20, 15), new C(61, 16)))
      ];
      var Ve;
      (function(f) {
        f[f.DATA_MASK_000 = 0] = "DATA_MASK_000", f[f.DATA_MASK_001 = 1] = "DATA_MASK_001", f[f.DATA_MASK_010 = 2] = "DATA_MASK_010", f[f.DATA_MASK_011 = 3] = "DATA_MASK_011", f[f.DATA_MASK_100 = 4] = "DATA_MASK_100", f[f.DATA_MASK_101 = 5] = "DATA_MASK_101", f[f.DATA_MASK_110 = 6] = "DATA_MASK_110", f[f.DATA_MASK_111 = 7] = "DATA_MASK_111";
      })(Ve || (Ve = {}));
      class ct {
        // See ISO 18004:2006 6.8.1
        constructor(e, t) {
          this.value = e, this.isMasked = t;
        }
        // End of enum constants.
        /**
         * <p>Implementations of this method reverse the data masking process applied to a QR Code and
         * make its bits ready to read.</p>
         *
         * @param bits representation of QR Code bits
         * @param dimension dimension of QR Code, represented by bits, being unmasked
         */
        unmaskBitMatrix(e, t) {
          for (let n = 0; n < t; n++)
            for (let r = 0; r < t; r++)
              this.isMasked(n, r) && e.flip(r, n);
        }
      }
      ct.values = /* @__PURE__ */ new Map([
        /**
         * 000: mask bits for which (x + y) mod 2 == 0
         */
        [Ve.DATA_MASK_000, new ct(Ve.DATA_MASK_000, (f, e) => (f + e & 1) === 0)],
        /**
         * 001: mask bits for which x mod 2 == 0
         */
        [Ve.DATA_MASK_001, new ct(Ve.DATA_MASK_001, (f, e) => (f & 1) === 0)],
        /**
         * 010: mask bits for which y mod 3 == 0
         */
        [Ve.DATA_MASK_010, new ct(Ve.DATA_MASK_010, (f, e) => e % 3 === 0)],
        /**
         * 011: mask bits for which (x + y) mod 3 == 0
         */
        [Ve.DATA_MASK_011, new ct(Ve.DATA_MASK_011, (f, e) => (f + e) % 3 === 0)],
        /**
         * 100: mask bits for which (x/2 + y/3) mod 2 == 0
         */
        [Ve.DATA_MASK_100, new ct(Ve.DATA_MASK_100, (f, e) => (Math.floor(f / 2) + Math.floor(e / 3) & 1) === 0)],
        /**
         * 101: mask bits for which xy mod 2 + xy mod 3 == 0
         * equivalently, such that xy mod 6 == 0
         */
        [Ve.DATA_MASK_101, new ct(Ve.DATA_MASK_101, (f, e) => f * e % 6 === 0)],
        /**
         * 110: mask bits for which (xy mod 2 + xy mod 3) mod 2 == 0
         * equivalently, such that xy mod 6 < 3
         */
        [Ve.DATA_MASK_110, new ct(Ve.DATA_MASK_110, (f, e) => f * e % 6 < 3)],
        /**
         * 111: mask bits for which ((x+y)mod 2 + xy mod 3) mod 2 == 0
         * equivalently, such that (x + y + xy mod 3) mod 2 == 0
         */
        [Ve.DATA_MASK_111, new ct(Ve.DATA_MASK_111, (f, e) => (f + e + f * e % 3 & 1) === 0)]
      ]);
      class Ki {
        /**
         * @param bitMatrix {@link BitMatrix} to parse
         * @throws FormatException if dimension is not >= 21 and 1 mod 4
         */
        constructor(e) {
          const t = e.getHeight();
          if (t < 21 || (t & 3) !== 1)
            throw new U();
          this.bitMatrix = e;
        }
        /**
         * <p>Reads format information from one of its two locations within the QR Code.</p>
         *
         * @return {@link FormatInformation} encapsulating the QR Code's format info
         * @throws FormatException if both format information locations cannot be parsed as
         * the valid encoding of format information
         */
        readFormatInformation() {
          if (this.parsedFormatInfo !== null && this.parsedFormatInfo !== void 0)
            return this.parsedFormatInfo;
          let e = 0;
          for (let i = 0; i < 6; i++)
            e = this.copyBit(i, 8, e);
          e = this.copyBit(7, 8, e), e = this.copyBit(8, 8, e), e = this.copyBit(8, 7, e);
          for (let i = 5; i >= 0; i--)
            e = this.copyBit(8, i, e);
          const t = this.bitMatrix.getHeight();
          let n = 0;
          const r = t - 7;
          for (let i = t - 1; i >= r; i--)
            n = this.copyBit(8, i, n);
          for (let i = t - 8; i < t; i++)
            n = this.copyBit(i, 8, n);
          if (this.parsedFormatInfo = je.decodeFormatInformation(e, n), this.parsedFormatInfo !== null)
            return this.parsedFormatInfo;
          throw new U();
        }
        /**
         * <p>Reads version information from one of its two locations within the QR Code.</p>
         *
         * @return {@link Version} encapsulating the QR Code's version
         * @throws FormatException if both version information locations cannot be parsed as
         * the valid encoding of version information
         */
        readVersion() {
          if (this.parsedVersion !== null && this.parsedVersion !== void 0)
            return this.parsedVersion;
          const e = this.bitMatrix.getHeight(), t = Math.floor((e - 17) / 4);
          if (t <= 6)
            return X.getVersionForNumber(t);
          let n = 0;
          const r = e - 11;
          for (let s = 5; s >= 0; s--)
            for (let o = e - 9; o >= r; o--)
              n = this.copyBit(o, s, n);
          let i = X.decodeVersionInformation(n);
          if (i !== null && i.getDimensionForVersion() === e)
            return this.parsedVersion = i, i;
          n = 0;
          for (let s = 5; s >= 0; s--)
            for (let o = e - 9; o >= r; o--)
              n = this.copyBit(s, o, n);
          if (i = X.decodeVersionInformation(n), i !== null && i.getDimensionForVersion() === e)
            return this.parsedVersion = i, i;
          throw new U();
        }
        copyBit(e, t, n) {
          return (this.isMirror ? this.bitMatrix.get(t, e) : this.bitMatrix.get(e, t)) ? n << 1 | 1 : n << 1;
        }
        /**
         * <p>Reads the bits in the {@link BitMatrix} representing the finder pattern in the
         * correct order in order to reconstruct the codewords bytes contained within the
         * QR Code.</p>
         *
         * @return bytes encoded within the QR Code
         * @throws FormatException if the exact number of bytes expected is not read
         */
        readCodewords() {
          const e = this.readFormatInformation(), t = this.readVersion(), n = ct.values.get(e.getDataMask()), r = this.bitMatrix.getHeight();
          n.unmaskBitMatrix(this.bitMatrix, r);
          const i = t.buildFunctionPattern();
          let s = !0;
          const o = new Uint8Array(t.getTotalCodewords());
          let a = 0, l = 0, u = 0;
          for (let d = r - 1; d > 0; d -= 2) {
            d === 6 && d--;
            for (let A = 0; A < r; A++) {
              const p = s ? r - 1 - A : A;
              for (let I = 0; I < 2; I++)
                i.get(d - I, p) || (u++, l <<= 1, this.bitMatrix.get(d - I, p) && (l |= 1), u === 8 && (o[a++] = /*(byte) */
                l, u = 0, l = 0));
            }
            s = !s;
          }
          if (a !== t.getTotalCodewords())
            throw new U();
          return o;
        }
        /**
         * Revert the mask removal done while reading the code words. The bit matrix should revert to its original state.
         */
        remask() {
          if (this.parsedFormatInfo === null)
            return;
          const e = ct.values[this.parsedFormatInfo.getDataMask()], t = this.bitMatrix.getHeight();
          e.unmaskBitMatrix(this.bitMatrix, t);
        }
        /**
         * Prepare the parser for a mirrored operation.
         * This flag has effect only on the {@link #readFormatInformation()} and the
         * {@link #readVersion()}. Before proceeding with {@link #readCodewords()} the
         * {@link #mirror()} method should be called.
         *
         * @param mirror Whether to read version and format information mirrored.
         */
        setMirror(e) {
          this.parsedVersion = null, this.parsedFormatInfo = null, this.isMirror = e;
        }
        /** Mirror the bit matrix in order to attempt a second reading. */
        mirror() {
          const e = this.bitMatrix;
          for (let t = 0, n = e.getWidth(); t < n; t++)
            for (let r = t + 1, i = e.getHeight(); r < i; r++)
              e.get(t, r) !== e.get(r, t) && (e.flip(r, t), e.flip(t, r));
        }
      }
      class Er {
        constructor(e, t) {
          this.numDataCodewords = e, this.codewords = t;
        }
        /**
         * <p>When QR Codes use multiple data blocks, they are actually interleaved.
         * That is, the first byte of data block 1 to n is written, then the second bytes, and so on. This
         * method will separate the data into original blocks.</p>
         *
         * @param rawCodewords bytes as read directly from the QR Code
         * @param version version of the QR Code
         * @param ecLevel error-correction level of the QR Code
         * @return DataBlocks containing original bytes, "de-interleaved" from representation in the
         *         QR Code
         */
        static getDataBlocks(e, t, n) {
          if (e.length !== t.getTotalCodewords())
            throw new R();
          const r = t.getECBlocksForLevel(n);
          let i = 0;
          const s = r.getECBlocks();
          for (const I of s)
            i += I.getCount();
          const o = new Array(i);
          let a = 0;
          for (const I of s)
            for (let y = 0; y < I.getCount(); y++) {
              const _ = I.getDataCodewords(), N = r.getECCodewordsPerBlock() + _;
              o[a++] = new Er(_, new Uint8Array(N));
            }
          const l = o[0].codewords.length;
          let u = o.length - 1;
          for (; u >= 0 && o[u].codewords.length !== l; )
            u--;
          u++;
          const d = l - r.getECCodewordsPerBlock();
          let A = 0;
          for (let I = 0; I < d; I++)
            for (let y = 0; y < a; y++)
              o[y].codewords[I] = e[A++];
          for (let I = u; I < a; I++)
            o[I].codewords[d] = e[A++];
          const p = o[0].codewords.length;
          for (let I = d; I < p; I++)
            for (let y = 0; y < a; y++) {
              const _ = y < u ? I : I + 1;
              o[y].codewords[_] = e[A++];
            }
          return o;
        }
        getNumDataCodewords() {
          return this.numDataCodewords;
        }
        getCodewords() {
          return this.codewords;
        }
      }
      var ht;
      (function(f) {
        f[f.TERMINATOR = 0] = "TERMINATOR", f[f.NUMERIC = 1] = "NUMERIC", f[f.ALPHANUMERIC = 2] = "ALPHANUMERIC", f[f.STRUCTURED_APPEND = 3] = "STRUCTURED_APPEND", f[f.BYTE = 4] = "BYTE", f[f.ECI = 5] = "ECI", f[f.KANJI = 6] = "KANJI", f[f.FNC1_FIRST_POSITION = 7] = "FNC1_FIRST_POSITION", f[f.FNC1_SECOND_POSITION = 8] = "FNC1_SECOND_POSITION", f[f.HANZI = 9] = "HANZI";
      })(ht || (ht = {}));
      class z {
        constructor(e, t, n, r) {
          this.value = e, this.stringValue = t, this.characterCountBitsForVersions = n, this.bits = r, z.FOR_BITS.set(r, this), z.FOR_VALUE.set(e, this);
        }
        /**
         * @param bits four bits encoding a QR Code data mode
         * @return Mode encoded by these bits
         * @throws IllegalArgumentException if bits do not correspond to a known mode
         */
        static forBits(e) {
          const t = z.FOR_BITS.get(e);
          if (t === void 0)
            throw new R();
          return t;
        }
        /**
         * @param version version in question
         * @return number of bits used, in this QR Code symbol {@link Version}, to encode the
         *         count of characters that will follow encoded in this Mode
         */
        getCharacterCountBits(e) {
          const t = e.getVersionNumber();
          let n;
          return t <= 9 ? n = 0 : t <= 26 ? n = 1 : n = 2, this.characterCountBitsForVersions[n];
        }
        getValue() {
          return this.value;
        }
        getBits() {
          return this.bits;
        }
        equals(e) {
          if (!(e instanceof z))
            return !1;
          const t = e;
          return this.value === t.value;
        }
        toString() {
          return this.stringValue;
        }
      }
      z.FOR_BITS = /* @__PURE__ */ new Map(), z.FOR_VALUE = /* @__PURE__ */ new Map(), z.TERMINATOR = new z(ht.TERMINATOR, "TERMINATOR", Int32Array.from([0, 0, 0]), 0), z.NUMERIC = new z(ht.NUMERIC, "NUMERIC", Int32Array.from([10, 12, 14]), 1), z.ALPHANUMERIC = new z(ht.ALPHANUMERIC, "ALPHANUMERIC", Int32Array.from([9, 11, 13]), 2), z.STRUCTURED_APPEND = new z(ht.STRUCTURED_APPEND, "STRUCTURED_APPEND", Int32Array.from([0, 0, 0]), 3), z.BYTE = new z(ht.BYTE, "BYTE", Int32Array.from([8, 16, 16]), 4), z.ECI = new z(ht.ECI, "ECI", Int32Array.from([0, 0, 0]), 7), z.KANJI = new z(ht.KANJI, "KANJI", Int32Array.from([8, 10, 12]), 8), z.FNC1_FIRST_POSITION = new z(ht.FNC1_FIRST_POSITION, "FNC1_FIRST_POSITION", Int32Array.from([0, 0, 0]), 5), z.FNC1_SECOND_POSITION = new z(ht.FNC1_SECOND_POSITION, "FNC1_SECOND_POSITION", Int32Array.from([0, 0, 0]), 9), z.HANZI = new z(ht.HANZI, "HANZI", Int32Array.from([8, 10, 12]), 13);
      class Se {
        static decode(e, t, n, r) {
          const i = new Ar(e);
          let s = new ge();
          const o = new Array();
          let a = -1, l = -1;
          try {
            let u = null, d = !1, A;
            do {
              if (i.available() < 4)
                A = z.TERMINATOR;
              else {
                const p = i.readBits(4);
                A = z.forBits(p);
              }
              switch (A) {
                case z.TERMINATOR:
                  break;
                case z.FNC1_FIRST_POSITION:
                case z.FNC1_SECOND_POSITION:
                  d = !0;
                  break;
                case z.STRUCTURED_APPEND:
                  if (i.available() < 16)
                    throw new U();
                  a = i.readBits(8), l = i.readBits(8);
                  break;
                case z.ECI:
                  const p = Se.parseECIValue(i);
                  if (u = k.getCharacterSetECIByValue(p), u === null)
                    throw new U();
                  break;
                case z.HANZI:
                  const I = i.readBits(4), y = i.readBits(A.getCharacterCountBits(t));
                  I === Se.GB2312_SUBSET && Se.decodeHanziSegment(i, s, y);
                  break;
                default:
                  const _ = i.readBits(A.getCharacterCountBits(t));
                  switch (A) {
                    case z.NUMERIC:
                      Se.decodeNumericSegment(i, s, _);
                      break;
                    case z.ALPHANUMERIC:
                      Se.decodeAlphanumericSegment(i, s, _, d);
                      break;
                    case z.BYTE:
                      Se.decodeByteSegment(i, s, _, u, o, r);
                      break;
                    case z.KANJI:
                      Se.decodeKanjiSegment(i, s, _);
                      break;
                    default:
                      throw new U();
                  }
                  break;
              }
            } while (A !== z.TERMINATOR);
          } catch {
            throw new U();
          }
          return new wn(e, s.toString(), o.length === 0 ? null : o, n === null ? null : n.toString(), a, l);
        }
        /**
         * See specification GBT 18284-2000
         */
        static decodeHanziSegment(e, t, n) {
          if (n * 13 > e.available())
            throw new U();
          const r = new Uint8Array(2 * n);
          let i = 0;
          for (; n > 0; ) {
            const s = e.readBits(13);
            let o = s / 96 << 8 & 4294967295 | s % 96;
            o < 959 ? o += 41377 : o += 42657, r[i] = /*(byte) */
            o >> 8 & 255, r[i + 1] = /*(byte) */
            o & 255, i += 2, n--;
          }
          try {
            t.append(Je.decode(r, Q.GB2312));
          } catch (s) {
            throw new U(s);
          }
        }
        static decodeKanjiSegment(e, t, n) {
          if (n * 13 > e.available())
            throw new U();
          const r = new Uint8Array(2 * n);
          let i = 0;
          for (; n > 0; ) {
            const s = e.readBits(13);
            let o = s / 192 << 8 & 4294967295 | s % 192;
            o < 7936 ? o += 33088 : o += 49472, r[i] = /*(byte) */
            o >> 8, r[i + 1] = /*(byte) */
            o, i += 2, n--;
          }
          try {
            t.append(Je.decode(r, Q.SHIFT_JIS));
          } catch (s) {
            throw new U(s);
          }
        }
        static decodeByteSegment(e, t, n, r, i, s) {
          if (8 * n > e.available())
            throw new U();
          const o = new Uint8Array(n);
          for (let l = 0; l < n; l++)
            o[l] = /*(byte) */
            e.readBits(8);
          let a;
          r === null ? a = Q.guessEncoding(o, s) : a = r.getName();
          try {
            t.append(Je.decode(o, a));
          } catch (l) {
            throw new U(l);
          }
          i.push(o);
        }
        static toAlphaNumericChar(e) {
          if (e >= Se.ALPHANUMERIC_CHARS.length)
            throw new U();
          return Se.ALPHANUMERIC_CHARS[e];
        }
        static decodeAlphanumericSegment(e, t, n, r) {
          const i = t.length();
          for (; n > 1; ) {
            if (e.available() < 11)
              throw new U();
            const s = e.readBits(11);
            t.append(Se.toAlphaNumericChar(Math.floor(s / 45))), t.append(Se.toAlphaNumericChar(s % 45)), n -= 2;
          }
          if (n === 1) {
            if (e.available() < 6)
              throw new U();
            t.append(Se.toAlphaNumericChar(e.readBits(6)));
          }
          if (r)
            for (let s = i; s < t.length(); s++)
              t.charAt(s) === "%" && (s < t.length() - 1 && t.charAt(s + 1) === "%" ? t.deleteCharAt(s + 1) : t.setCharAt(s, ""));
        }
        static decodeNumericSegment(e, t, n) {
          for (; n >= 3; ) {
            if (e.available() < 10)
              throw new U();
            const r = e.readBits(10);
            if (r >= 1e3)
              throw new U();
            t.append(Se.toAlphaNumericChar(Math.floor(r / 100))), t.append(Se.toAlphaNumericChar(Math.floor(r / 10) % 10)), t.append(Se.toAlphaNumericChar(r % 10)), n -= 3;
          }
          if (n === 2) {
            if (e.available() < 7)
              throw new U();
            const r = e.readBits(7);
            if (r >= 100)
              throw new U();
            t.append(Se.toAlphaNumericChar(Math.floor(r / 10))), t.append(Se.toAlphaNumericChar(r % 10));
          } else if (n === 1) {
            if (e.available() < 4)
              throw new U();
            const r = e.readBits(4);
            if (r >= 10)
              throw new U();
            t.append(Se.toAlphaNumericChar(r));
          }
        }
        static parseECIValue(e) {
          const t = e.readBits(8);
          if ((t & 128) === 0)
            return t & 127;
          if ((t & 192) === 128) {
            const n = e.readBits(8);
            return (t & 63) << 8 & 4294967295 | n;
          }
          if ((t & 224) === 192) {
            const n = e.readBits(16);
            return (t & 31) << 16 & 4294967295 | n;
          }
          throw new U();
        }
      }
      Se.ALPHANUMERIC_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:", Se.GB2312_SUBSET = 1;
      class Qr {
        constructor(e) {
          this.mirrored = e;
        }
        /**
         * @return true if the QR Code was mirrored.
         */
        isMirrored() {
          return this.mirrored;
        }
        /**
         * Apply the result points' order correction due to mirroring.
         *
         * @param points Array of points to apply mirror correction to.
         */
        applyMirroredCorrection(e) {
          if (!this.mirrored || e === null || e.length < 3)
            return;
          const t = e[0];
          e[0] = e[2], e[2] = t;
        }
      }
      class qi {
        constructor() {
          this.rsDecoder = new En(ce.QR_CODE_FIELD_256);
        }
        // public decode(image: boolean[][]): DecoderResult /*throws ChecksumException, FormatException*/ {
        //   return decode(image, null)
        // }
        /**
         * <p>Convenience method that can decode a QR Code represented as a 2D array of booleans.
         * "true" is taken to mean a black module.</p>
         *
         * @param image booleans representing white/black QR Code modules
         * @param hints decoding hints that should be used to influence decoding
         * @return text and bytes encoded within the QR Code
         * @throws FormatException if the QR Code cannot be decoded
         * @throws ChecksumException if error correction fails
         */
        decodeBooleanArray(e, t) {
          return this.decodeBitMatrix(Fe.parseFromBooleanArray(e), t);
        }
        // public decodeBitMatrix(bits: BitMatrix): DecoderResult /*throws ChecksumException, FormatException*/ {
        //   return decode(bits, null)
        // }
        /**
         * <p>Decodes a QR Code represented as a {@link BitMatrix}. A 1 or "true" is taken to mean a black module.</p>
         *
         * @param bits booleans representing white/black QR Code modules
         * @param hints decoding hints that should be used to influence decoding
         * @return text and bytes encoded within the QR Code
         * @throws FormatException if the QR Code cannot be decoded
         * @throws ChecksumException if error correction fails
         */
        decodeBitMatrix(e, t) {
          const n = new Ki(e);
          let r = null;
          try {
            return this.decodeBitMatrixParser(n, t);
          } catch (i) {
            r = i;
          }
          try {
            n.remask(), n.setMirror(!0), n.readVersion(), n.readFormatInformation(), n.mirror();
            const i = this.decodeBitMatrixParser(n, t);
            return i.setOther(new Qr(!0)), i;
          } catch (i) {
            throw r !== null ? r : i;
          }
        }
        decodeBitMatrixParser(e, t) {
          const n = e.readVersion(), r = e.readFormatInformation().getErrorCorrectionLevel(), i = e.readCodewords(), s = Er.getDataBlocks(i, n, r);
          let o = 0;
          for (const u of s)
            o += u.getNumDataCodewords();
          const a = new Uint8Array(o);
          let l = 0;
          for (const u of s) {
            const d = u.getCodewords(), A = u.getNumDataCodewords();
            this.correctErrors(d, A);
            for (let p = 0; p < A; p++)
              a[l++] = d[p];
          }
          return Se.decode(a, n, r, t);
        }
        /**
         * <p>Given data and error-correction codewords received, possibly corrupted by errors, attempts to
         * correct the errors in-place using Reed-Solomon error correction.</p>
         *
         * @param codewordBytes data and error correction codewords
         * @param numDataCodewords number of codewords that are data bytes
         * @throws ChecksumException if error correction fails
         */
        correctErrors(e, t) {
          const n = new Int32Array(e);
          try {
            this.rsDecoder.decode(n, e.length - t);
          } catch {
            throw new q();
          }
          for (let r = 0; r < t; r++)
            e[r] = /*(byte) */
            n[r];
        }
      }
      class Cr extends W {
        constructor(e, t, n) {
          super(e, t), this.estimatedModuleSize = n;
        }
        /**
         * <p>Determines if this alignment pattern "about equals" an alignment pattern at the stated
         * position and size -- meaning, it is at nearly the same center with nearly the same size.</p>
         */
        aboutEquals(e, t, n) {
          if (Math.abs(t - this.getY()) <= e && Math.abs(n - this.getX()) <= e) {
            const r = Math.abs(e - this.estimatedModuleSize);
            return r <= 1 || r <= this.estimatedModuleSize;
          }
          return !1;
        }
        /**
         * Combines this object's current estimate of a finder pattern position and module size
         * with a new estimate. It returns a new {@code FinderPattern} containing an average of the two.
         */
        combineEstimate(e, t, n) {
          const r = (this.getX() + t) / 2, i = (this.getY() + e) / 2, s = (this.estimatedModuleSize + n) / 2;
          return new Cr(r, i, s);
        }
      }
      class Xn {
        /**
         * <p>Creates a finder that will look in a portion of the whole image.</p>
         *
         * @param image image to search
         * @param startX left column from which to start searching
         * @param startY top row from which to start searching
         * @param width width of region to search
         * @param height height of region to search
         * @param moduleSize estimated module size so far
         */
        constructor(e, t, n, r, i, s, o) {
          this.image = e, this.startX = t, this.startY = n, this.width = r, this.height = i, this.moduleSize = s, this.resultPointCallback = o, this.possibleCenters = [], this.crossCheckStateCount = new Int32Array(3);
        }
        /**
         * <p>This method attempts to find the bottom-right alignment pattern in the image. It is a bit messy since
         * it's pretty performance-critical and so is written to be fast foremost.</p>
         *
         * @return {@link AlignmentPattern} if found
         * @throws NotFoundException if not found
         */
        find() {
          const e = this.startX, t = this.height, n = this.width, r = e + n, i = this.startY + t / 2, s = new Int32Array(3), o = this.image;
          for (let a = 0; a < t; a++) {
            const l = i + ((a & 1) === 0 ? Math.floor((a + 1) / 2) : -Math.floor((a + 1) / 2));
            s[0] = 0, s[1] = 0, s[2] = 0;
            let u = e;
            for (; u < r && !o.get(u, l); )
              u++;
            let d = 0;
            for (; u < r; ) {
              if (o.get(u, l))
                if (d === 1)
                  s[1]++;
                else if (d === 2) {
                  if (this.foundPatternCross(s)) {
                    const A = this.handlePossibleCenter(s, l, u);
                    if (A !== null)
                      return A;
                  }
                  s[0] = s[2], s[1] = 1, s[2] = 0, d = 1;
                } else
                  s[++d]++;
              else
                d === 1 && d++, s[d]++;
              u++;
            }
            if (this.foundPatternCross(s)) {
              const A = this.handlePossibleCenter(s, l, r);
              if (A !== null)
                return A;
            }
          }
          if (this.possibleCenters.length !== 0)
            return this.possibleCenters[0];
          throw new D();
        }
        /**
         * Given a count of black/white/black pixels just seen and an end position,
         * figures the location of the center of this black/white/black run.
         */
        static centerFromEnd(e, t) {
          return t - e[2] - e[1] / 2;
        }
        /**
         * @param stateCount count of black/white/black pixels just read
         * @return true iff the proportions of the counts is close enough to the 1/1/1 ratios
         *         used by alignment patterns to be considered a match
         */
        foundPatternCross(e) {
          const t = this.moduleSize, n = t / 2;
          for (let r = 0; r < 3; r++)
            if (Math.abs(t - e[r]) >= n)
              return !1;
          return !0;
        }
        /**
         * <p>After a horizontal scan finds a potential alignment pattern, this method
         * "cross-checks" by scanning down vertically through the center of the possible
         * alignment pattern to see if the same proportion is detected.</p>
         *
         * @param startI row where an alignment pattern was detected
         * @param centerJ center of the section that appears to cross an alignment pattern
         * @param maxCount maximum reasonable number of modules that should be
         * observed in any reading state, based on the results of the horizontal scan
         * @return vertical center of alignment pattern, or {@link Float#NaN} if not found
         */
        crossCheckVertical(e, t, n, r) {
          const i = this.image, s = i.getHeight(), o = this.crossCheckStateCount;
          o[0] = 0, o[1] = 0, o[2] = 0;
          let a = e;
          for (; a >= 0 && i.get(t, a) && o[1] <= n; )
            o[1]++, a--;
          if (a < 0 || o[1] > n)
            return NaN;
          for (; a >= 0 && !i.get(t, a) && o[0] <= n; )
            o[0]++, a--;
          if (o[0] > n)
            return NaN;
          for (a = e + 1; a < s && i.get(t, a) && o[1] <= n; )
            o[1]++, a++;
          if (a === s || o[1] > n)
            return NaN;
          for (; a < s && !i.get(t, a) && o[2] <= n; )
            o[2]++, a++;
          if (o[2] > n)
            return NaN;
          const l = o[0] + o[1] + o[2];
          return 5 * Math.abs(l - r) >= 2 * r ? NaN : this.foundPatternCross(o) ? Xn.centerFromEnd(o, a) : NaN;
        }
        /**
         * <p>This is called when a horizontal scan finds a possible alignment pattern. It will
         * cross check with a vertical scan, and if successful, will see if this pattern had been
         * found on a previous horizontal scan. If so, we consider it confirmed and conclude we have
         * found the alignment pattern.</p>
         *
         * @param stateCount reading state module counts from horizontal scan
         * @param i row where alignment pattern may be found
         * @param j end of possible alignment pattern in row
         * @return {@link AlignmentPattern} if we have found the same pattern twice, or null if not
         */
        handlePossibleCenter(e, t, n) {
          const r = e[0] + e[1] + e[2], i = Xn.centerFromEnd(e, n), s = this.crossCheckVertical(
            t,
            /*(int) */
            i,
            2 * e[1],
            r
          );
          if (!isNaN(s)) {
            const o = (e[0] + e[1] + e[2]) / 3;
            for (const l of this.possibleCenters)
              if (l.aboutEquals(o, s, i))
                return l.combineEstimate(s, i, o);
            const a = new Cr(i, s, o);
            this.possibleCenters.push(a), this.resultPointCallback !== null && this.resultPointCallback !== void 0 && this.resultPointCallback.foundPossibleResultPoint(a);
          }
          return null;
        }
      }
      class pr extends W {
        // FinderPattern(posX: number/*float*/, posY: number/*float*/, estimatedModuleSize: number/*float*/) {
        //   this(posX, posY, estimatedModuleSize, 1)
        // }
        constructor(e, t, n, r) {
          super(e, t), this.estimatedModuleSize = n, this.count = r, r === void 0 && (this.count = 1);
        }
        getEstimatedModuleSize() {
          return this.estimatedModuleSize;
        }
        getCount() {
          return this.count;
        }
        /*
        void incrementCount() {
          this.count++
        }
         */
        /**
         * <p>Determines if this finder pattern "about equals" a finder pattern at the stated
         * position and size -- meaning, it is at nearly the same center with nearly the same size.</p>
         */
        aboutEquals(e, t, n) {
          if (Math.abs(t - this.getY()) <= e && Math.abs(n - this.getX()) <= e) {
            const r = Math.abs(e - this.estimatedModuleSize);
            return r <= 1 || r <= this.estimatedModuleSize;
          }
          return !1;
        }
        /**
         * Combines this object's current estimate of a finder pattern position and module size
         * with a new estimate. It returns a new {@code FinderPattern} containing a weighted average
         * based on count.
         */
        combineEstimate(e, t, n) {
          const r = this.count + 1, i = (this.count * this.getX() + t) / r, s = (this.count * this.getY() + e) / r, o = (this.count * this.estimatedModuleSize + n) / r;
          return new pr(i, s, o, r);
        }
      }
      class Qi {
        constructor(e) {
          this.bottomLeft = e[0], this.topLeft = e[1], this.topRight = e[2];
        }
        getBottomLeft() {
          return this.bottomLeft;
        }
        getTopLeft() {
          return this.topLeft;
        }
        getTopRight() {
          return this.topRight;
        }
      }
      class He {
        /**
         * <p>Creates a finder that will search the image for three finder patterns.</p>
         *
         * @param image image to search
         */
        // public constructor(image: BitMatrix) {
        //   this(image, null)
        // }
        constructor(e, t) {
          this.image = e, this.resultPointCallback = t, this.possibleCenters = [], this.crossCheckStateCount = new Int32Array(5), this.resultPointCallback = t;
        }
        getImage() {
          return this.image;
        }
        getPossibleCenters() {
          return this.possibleCenters;
        }
        find(e) {
          const t = e != null && e.get(xe.TRY_HARDER) !== void 0, n = e != null && e.get(xe.PURE_BARCODE) !== void 0, r = this.image, i = r.getHeight(), s = r.getWidth();
          let o = Math.floor(3 * i / (4 * He.MAX_MODULES));
          (o < He.MIN_SKIP || t) && (o = He.MIN_SKIP);
          let a = !1;
          const l = new Int32Array(5);
          for (let d = o - 1; d < i && !a; d += o) {
            l[0] = 0, l[1] = 0, l[2] = 0, l[3] = 0, l[4] = 0;
            let A = 0;
            for (let p = 0; p < s; p++)
              if (r.get(p, d))
                (A & 1) === 1 && A++, l[A]++;
              else if ((A & 1) === 0)
                if (A === 4)
                  if (He.foundPatternCross(l)) {
                    if (this.handlePossibleCenter(l, d, p, n) === !0)
                      if (o = 2, this.hasSkipped === !0)
                        a = this.haveMultiplyConfirmedCenters();
                      else {
                        const y = this.findRowSkip();
                        y > l[2] && (d += y - l[2] - o, p = s - 1);
                      }
                    else {
                      l[0] = l[2], l[1] = l[3], l[2] = l[4], l[3] = 1, l[4] = 0, A = 3;
                      continue;
                    }
                    A = 0, l[0] = 0, l[1] = 0, l[2] = 0, l[3] = 0, l[4] = 0;
                  } else
                    l[0] = l[2], l[1] = l[3], l[2] = l[4], l[3] = 1, l[4] = 0, A = 3;
                else
                  l[++A]++;
              else
                l[A]++;
            He.foundPatternCross(l) && this.handlePossibleCenter(l, d, s, n) === !0 && (o = l[0], this.hasSkipped && (a = this.haveMultiplyConfirmedCenters()));
          }
          const u = this.selectBestPatterns();
          return W.orderBestPatterns(u), new Qi(u);
        }
        /**
         * Given a count of black/white/black/white/black pixels just seen and an end position,
         * figures the location of the center of this run.
         */
        static centerFromEnd(e, t) {
          return t - e[4] - e[3] - e[2] / 2;
        }
        /**
         * @param stateCount count of black/white/black/white/black pixels just read
         * @return true iff the proportions of the counts is close enough to the 1/1/3/1/1 ratios
         *         used by finder patterns to be considered a match
         */
        static foundPatternCross(e) {
          let t = 0;
          for (let i = 0; i < 5; i++) {
            const s = e[i];
            if (s === 0)
              return !1;
            t += s;
          }
          if (t < 7)
            return !1;
          const n = t / 7, r = n / 2;
          return Math.abs(n - e[0]) < r && Math.abs(n - e[1]) < r && Math.abs(3 * n - e[2]) < 3 * r && Math.abs(n - e[3]) < r && Math.abs(n - e[4]) < r;
        }
        getCrossCheckStateCount() {
          const e = this.crossCheckStateCount;
          return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e;
        }
        /**
         * After a vertical and horizontal scan finds a potential finder pattern, this method
         * "cross-cross-cross-checks" by scanning down diagonally through the center of the possible
         * finder pattern to see if the same proportion is detected.
         *
         * @param startI row where a finder pattern was detected
         * @param centerJ center of the section that appears to cross a finder pattern
         * @param maxCount maximum reasonable number of modules that should be
         *  observed in any reading state, based on the results of the horizontal scan
         * @param originalStateCountTotal The original state count total.
         * @return true if proportions are withing expected limits
         */
        crossCheckDiagonal(e, t, n, r) {
          const i = this.getCrossCheckStateCount();
          let s = 0;
          const o = this.image;
          for (; e >= s && t >= s && o.get(t - s, e - s); )
            i[2]++, s++;
          if (e < s || t < s)
            return !1;
          for (; e >= s && t >= s && !o.get(t - s, e - s) && i[1] <= n; )
            i[1]++, s++;
          if (e < s || t < s || i[1] > n)
            return !1;
          for (; e >= s && t >= s && o.get(t - s, e - s) && i[0] <= n; )
            i[0]++, s++;
          if (i[0] > n)
            return !1;
          const a = o.getHeight(), l = o.getWidth();
          for (s = 1; e + s < a && t + s < l && o.get(t + s, e + s); )
            i[2]++, s++;
          if (e + s >= a || t + s >= l)
            return !1;
          for (; e + s < a && t + s < l && !o.get(t + s, e + s) && i[3] < n; )
            i[3]++, s++;
          if (e + s >= a || t + s >= l || i[3] >= n)
            return !1;
          for (; e + s < a && t + s < l && o.get(t + s, e + s) && i[4] < n; )
            i[4]++, s++;
          if (i[4] >= n)
            return !1;
          const u = i[0] + i[1] + i[2] + i[3] + i[4];
          return Math.abs(u - r) < 2 * r && He.foundPatternCross(i);
        }
        /**
         * <p>After a horizontal scan finds a potential finder pattern, this method
         * "cross-checks" by scanning down vertically through the center of the possible
         * finder pattern to see if the same proportion is detected.</p>
         *
         * @param startI row where a finder pattern was detected
         * @param centerJ center of the section that appears to cross a finder pattern
         * @param maxCount maximum reasonable number of modules that should be
         * observed in any reading state, based on the results of the horizontal scan
         * @return vertical center of finder pattern, or {@link Float#NaN} if not found
         */
        crossCheckVertical(e, t, n, r) {
          const i = this.image, s = i.getHeight(), o = this.getCrossCheckStateCount();
          let a = e;
          for (; a >= 0 && i.get(t, a); )
            o[2]++, a--;
          if (a < 0)
            return NaN;
          for (; a >= 0 && !i.get(t, a) && o[1] <= n; )
            o[1]++, a--;
          if (a < 0 || o[1] > n)
            return NaN;
          for (; a >= 0 && i.get(t, a) && o[0] <= n; )
            o[0]++, a--;
          if (o[0] > n)
            return NaN;
          for (a = e + 1; a < s && i.get(t, a); )
            o[2]++, a++;
          if (a === s)
            return NaN;
          for (; a < s && !i.get(t, a) && o[3] < n; )
            o[3]++, a++;
          if (a === s || o[3] >= n)
            return NaN;
          for (; a < s && i.get(t, a) && o[4] < n; )
            o[4]++, a++;
          if (o[4] >= n)
            return NaN;
          const l = o[0] + o[1] + o[2] + o[3] + o[4];
          return 5 * Math.abs(l - r) >= 2 * r ? NaN : He.foundPatternCross(o) ? He.centerFromEnd(o, a) : NaN;
        }
        /**
         * <p>Like {@link #crossCheckVertical(int, int, int, int)}, and in fact is basically identical,
         * except it reads horizontally instead of vertically. This is used to cross-cross
         * check a vertical cross check and locate the real center of the alignment pattern.</p>
         */
        crossCheckHorizontal(e, t, n, r) {
          const i = this.image, s = i.getWidth(), o = this.getCrossCheckStateCount();
          let a = e;
          for (; a >= 0 && i.get(a, t); )
            o[2]++, a--;
          if (a < 0)
            return NaN;
          for (; a >= 0 && !i.get(a, t) && o[1] <= n; )
            o[1]++, a--;
          if (a < 0 || o[1] > n)
            return NaN;
          for (; a >= 0 && i.get(a, t) && o[0] <= n; )
            o[0]++, a--;
          if (o[0] > n)
            return NaN;
          for (a = e + 1; a < s && i.get(a, t); )
            o[2]++, a++;
          if (a === s)
            return NaN;
          for (; a < s && !i.get(a, t) && o[3] < n; )
            o[3]++, a++;
          if (a === s || o[3] >= n)
            return NaN;
          for (; a < s && i.get(a, t) && o[4] < n; )
            o[4]++, a++;
          if (o[4] >= n)
            return NaN;
          const l = o[0] + o[1] + o[2] + o[3] + o[4];
          return 5 * Math.abs(l - r) >= r ? NaN : He.foundPatternCross(o) ? He.centerFromEnd(o, a) : NaN;
        }
        /**
         * <p>This is called when a horizontal scan finds a possible alignment pattern. It will
         * cross check with a vertical scan, and if successful, will, ah, cross-cross-check
         * with another horizontal scan. This is needed primarily to locate the real horizontal
         * center of the pattern in cases of extreme skew.
         * And then we cross-cross-cross check with another diagonal scan.</p>
         *
         * <p>If that succeeds the finder pattern location is added to a list that tracks
         * the number of times each location has been nearly-matched as a finder pattern.
         * Each additional find is more evidence that the location is in fact a finder
         * pattern center
         *
         * @param stateCount reading state module counts from horizontal scan
         * @param i row where finder pattern may be found
         * @param j end of possible finder pattern in row
         * @param pureBarcode true if in "pure barcode" mode
         * @return true if a finder pattern candidate was found this time
         */
        handlePossibleCenter(e, t, n, r) {
          const i = e[0] + e[1] + e[2] + e[3] + e[4];
          let s = He.centerFromEnd(e, n), o = this.crossCheckVertical(
            t,
            /*(int) */
            Math.floor(s),
            e[2],
            i
          );
          if (!isNaN(o) && (s = this.crossCheckHorizontal(
            /*(int) */
            Math.floor(s),
            /*(int) */
            Math.floor(o),
            e[2],
            i
          ), !isNaN(s) && (!r || this.crossCheckDiagonal(
            /*(int) */
            Math.floor(o),
            /*(int) */
            Math.floor(s),
            e[2],
            i
          )))) {
            const a = i / 7;
            let l = !1;
            const u = this.possibleCenters;
            for (let d = 0, A = u.length; d < A; d++) {
              const p = u[d];
              if (p.aboutEquals(a, o, s)) {
                u[d] = p.combineEstimate(o, s, a), l = !0;
                break;
              }
            }
            if (!l) {
              const d = new pr(s, o, a);
              u.push(d), this.resultPointCallback !== null && this.resultPointCallback !== void 0 && this.resultPointCallback.foundPossibleResultPoint(d);
            }
            return !0;
          }
          return !1;
        }
        /**
         * @return number of rows we could safely skip during scanning, based on the first
         *         two finder patterns that have been located. In some cases their position will
         *         allow us to infer that the third pattern must lie below a certain point farther
         *         down in the image.
         */
        findRowSkip() {
          if (this.possibleCenters.length <= 1)
            return 0;
          let t = null;
          for (const n of this.possibleCenters)
            if (n.getCount() >= He.CENTER_QUORUM)
              if (t == null)
                t = n;
              else
                return this.hasSkipped = !0, /*(int) */
                Math.floor((Math.abs(t.getX() - n.getX()) - Math.abs(t.getY() - n.getY())) / 2);
          return 0;
        }
        /**
         * @return true iff we have found at least 3 finder patterns that have been detected
         *         at least {@link #CENTER_QUORUM} times each, and, the estimated module size of the
         *         candidates is "pretty similar"
         */
        haveMultiplyConfirmedCenters() {
          let e = 0, t = 0;
          const n = this.possibleCenters.length;
          for (const s of this.possibleCenters)
            s.getCount() >= He.CENTER_QUORUM && (e++, t += s.getEstimatedModuleSize());
          if (e < 3)
            return !1;
          const r = t / n;
          let i = 0;
          for (const s of this.possibleCenters)
            i += Math.abs(s.getEstimatedModuleSize() - r);
          return i <= 0.05 * t;
        }
        /**
         * @return the 3 best {@link FinderPattern}s from our list of candidates. The "best" are
         *         those that have been detected at least {@link #CENTER_QUORUM} times, and whose module
         *         size differs from the average among those patterns the least
         * @throws NotFoundException if 3 such finder patterns do not exist
         */
        selectBestPatterns() {
          const e = this.possibleCenters.length;
          if (e < 3)
            throw new D();
          const t = this.possibleCenters;
          let n;
          if (e > 3) {
            let r = 0, i = 0;
            for (const a of this.possibleCenters) {
              const l = a.getEstimatedModuleSize();
              r += l, i += l * l;
            }
            n = r / e;
            let s = Math.sqrt(i / e - n * n);
            t.sort(
              /**
               * <p>Orders by furthest from average</p>
               */
              // FurthestFromAverageComparator implements Comparator<FinderPattern>
              (a, l) => {
                const u = Math.abs(l.getEstimatedModuleSize() - n), d = Math.abs(a.getEstimatedModuleSize() - n);
                return u < d ? -1 : u > d ? 1 : 0;
              }
            );
            const o = Math.max(0.2 * n, s);
            for (let a = 0; a < t.length && t.length > 3; a++) {
              const l = t[a];
              Math.abs(l.getEstimatedModuleSize() - n) > o && (t.splice(a, 1), a--);
            }
          }
          if (t.length > 3) {
            let r = 0;
            for (const i of t)
              r += i.getEstimatedModuleSize();
            n = r / t.length, t.sort(
              /**
               * <p>Orders by {@link FinderPattern#getCount()}, descending.</p>
               */
              // CenterComparator implements Comparator<FinderPattern>
              (i, s) => {
                if (s.getCount() === i.getCount()) {
                  const o = Math.abs(s.getEstimatedModuleSize() - n), a = Math.abs(i.getEstimatedModuleSize() - n);
                  return o < a ? 1 : o > a ? -1 : 0;
                } else
                  return s.getCount() - i.getCount();
              }
            ), t.splice(3);
          }
          return [
            t[0],
            t[1],
            t[2]
          ];
        }
      }
      He.CENTER_QUORUM = 2, He.MIN_SKIP = 3, He.MAX_MODULES = 57;
      class pn {
        constructor(e) {
          this.image = e;
        }
        getImage() {
          return this.image;
        }
        getResultPointCallback() {
          return this.resultPointCallback;
        }
        /**
         * <p>Detects a QR Code in an image.</p>
         *
         * @return {@link DetectorResult} encapsulating results of detecting a QR Code
         * @throws NotFoundException if QR Code cannot be found
         * @throws FormatException if a QR Code cannot be decoded
         */
        // public detect(): DetectorResult /*throws NotFoundException, FormatException*/ {
        //   return detect(null)
        // }
        /**
         * <p>Detects a QR Code in an image.</p>
         *
         * @param hints optional hints to detector
         * @return {@link DetectorResult} encapsulating results of detecting a QR Code
         * @throws NotFoundException if QR Code cannot be found
         * @throws FormatException if a QR Code cannot be decoded
         */
        detect(e) {
          this.resultPointCallback = e == null ? null : (
            /*(ResultPointCallback) */
            e.get(xe.NEED_RESULT_POINT_CALLBACK)
          );
          const n = new He(this.image, this.resultPointCallback).find(e);
          return this.processFinderPatternInfo(n);
        }
        processFinderPatternInfo(e) {
          const t = e.getTopLeft(), n = e.getTopRight(), r = e.getBottomLeft(), i = this.calculateModuleSize(t, n, r);
          if (i < 1)
            throw new D("No pattern found in proccess finder.");
          const s = pn.computeDimension(t, n, r, i), o = X.getProvisionalVersionForDimension(s), a = o.getDimensionForVersion() - 7;
          let l = null;
          if (o.getAlignmentPatternCenters().length > 0) {
            const p = n.getX() - t.getX() + r.getX(), I = n.getY() - t.getY() + r.getY(), y = 1 - 3 / a, _ = (
              /*(int) */
              Math.floor(t.getX() + y * (p - t.getX()))
            ), N = (
              /*(int) */
              Math.floor(t.getY() + y * (I - t.getY()))
            );
            for (let L = 4; L <= 16; L <<= 1)
              try {
                l = this.findAlignmentInRegion(i, _, N, L);
                break;
              } catch (F) {
                if (!(F instanceof D))
                  throw F;
              }
          }
          const u = pn.createTransform(t, n, r, l, s), d = pn.sampleGrid(this.image, u, s);
          let A;
          return l === null ? A = [r, t, n] : A = [r, t, n, l], new Un(d, A);
        }
        static createTransform(e, t, n, r, i) {
          const s = i - 3.5;
          let o, a, l, u;
          return r !== null ? (o = r.getX(), a = r.getY(), l = s - 3, u = l) : (o = t.getX() - e.getX() + n.getX(), a = t.getY() - e.getY() + n.getY(), l = s, u = s), ft.quadrilateralToQuadrilateral(3.5, 3.5, s, 3.5, l, u, 3.5, s, e.getX(), e.getY(), t.getX(), t.getY(), o, a, n.getX(), n.getY());
        }
        static sampleGrid(e, t, n) {
          return Rt.getInstance().sampleGridWithTransform(e, n, n, t);
        }
        /**
         * <p>Computes the dimension (number of modules on a size) of the QR Code based on the position
         * of the finder patterns and estimated module size.</p>
         */
        static computeDimension(e, t, n, r) {
          const i = oe.round(W.distance(e, t) / r), s = oe.round(W.distance(e, n) / r);
          let o = Math.floor((i + s) / 2) + 7;
          switch (o & 3) {
            // mod 4
            case 0:
              o++;
              break;
            // 1? do nothing
            case 2:
              o--;
              break;
            case 3:
              throw new D("Dimensions could be not found.");
          }
          return o;
        }
        /**
         * <p>Computes an average estimated module size based on estimated derived from the positions
         * of the three finder patterns.</p>
         *
         * @param topLeft detected top-left finder pattern center
         * @param topRight detected top-right finder pattern center
         * @param bottomLeft detected bottom-left finder pattern center
         * @return estimated module size
         */
        calculateModuleSize(e, t, n) {
          return (this.calculateModuleSizeOneWay(e, t) + this.calculateModuleSizeOneWay(e, n)) / 2;
        }
        /**
         * <p>Estimates module size based on two finder patterns -- it uses
         * {@link #sizeOfBlackWhiteBlackRunBothWays(int, int, int, int)} to figure the
         * width of each, measuring along the axis between their centers.</p>
         */
        calculateModuleSizeOneWay(e, t) {
          const n = this.sizeOfBlackWhiteBlackRunBothWays(
            /*(int) */
            Math.floor(e.getX()),
            /*(int) */
            Math.floor(e.getY()),
            /*(int) */
            Math.floor(t.getX()),
            /*(int) */
            Math.floor(t.getY())
          ), r = this.sizeOfBlackWhiteBlackRunBothWays(
            /*(int) */
            Math.floor(t.getX()),
            /*(int) */
            Math.floor(t.getY()),
            /*(int) */
            Math.floor(e.getX()),
            /*(int) */
            Math.floor(e.getY())
          );
          return isNaN(n) ? r / 7 : isNaN(r) ? n / 7 : (n + r) / 14;
        }
        /**
         * See {@link #sizeOfBlackWhiteBlackRun(int, int, int, int)}; computes the total width of
         * a finder pattern by looking for a black-white-black run from the center in the direction
         * of another point (another finder pattern center), and in the opposite direction too.
         */
        sizeOfBlackWhiteBlackRunBothWays(e, t, n, r) {
          let i = this.sizeOfBlackWhiteBlackRun(e, t, n, r), s = 1, o = e - (n - e);
          o < 0 ? (s = e / /*(float) */
          (e - o), o = 0) : o >= this.image.getWidth() && (s = (this.image.getWidth() - 1 - e) / /*(float) */
          (o - e), o = this.image.getWidth() - 1);
          let a = (
            /*(int) */
            Math.floor(t - (r - t) * s)
          );
          return s = 1, a < 0 ? (s = t / /*(float) */
          (t - a), a = 0) : a >= this.image.getHeight() && (s = (this.image.getHeight() - 1 - t) / /*(float) */
          (a - t), a = this.image.getHeight() - 1), o = /*(int) */
          Math.floor(e + (o - e) * s), i += this.sizeOfBlackWhiteBlackRun(e, t, o, a), i - 1;
        }
        /**
         * <p>This method traces a line from a point in the image, in the direction towards another point.
         * It begins in a black region, and keeps going until it finds white, then black, then white again.
         * It reports the distance from the start to this point.</p>
         *
         * <p>This is used when figuring out how wide a finder pattern is, when the finder pattern
         * may be skewed or rotated.</p>
         */
        sizeOfBlackWhiteBlackRun(e, t, n, r) {
          const i = Math.abs(r - t) > Math.abs(n - e);
          if (i) {
            let p = e;
            e = t, t = p, p = n, n = r, r = p;
          }
          const s = Math.abs(n - e), o = Math.abs(r - t);
          let a = -s / 2;
          const l = e < n ? 1 : -1, u = t < r ? 1 : -1;
          let d = 0;
          const A = n + l;
          for (let p = e, I = t; p !== A; p += l) {
            const y = i ? I : p, _ = i ? p : I;
            if (d === 1 === this.image.get(y, _)) {
              if (d === 2)
                return oe.distance(p, I, e, t);
              d++;
            }
            if (a += o, a > 0) {
              if (I === r)
                break;
              I += u, a -= s;
            }
          }
          return d === 2 ? oe.distance(n + l, r, e, t) : NaN;
        }
        /**
         * <p>Attempts to locate an alignment pattern in a limited region of the image, which is
         * guessed to contain it. This method uses {@link AlignmentPattern}.</p>
         *
         * @param overallEstModuleSize estimated module size so far
         * @param estAlignmentX x coordinate of center of area probably containing alignment pattern
         * @param estAlignmentY y coordinate of above
         * @param allowanceFactor number of pixels in all directions to search from the center
         * @return {@link AlignmentPattern} if found, or null otherwise
         * @throws NotFoundException if an unexpected error occurs during detection
         */
        findAlignmentInRegion(e, t, n, r) {
          const i = (
            /*(int) */
            Math.floor(r * e)
          ), s = Math.max(0, t - i), o = Math.min(this.image.getWidth() - 1, t + i);
          if (o - s < e * 3)
            throw new D("Alignment top exceeds estimated module size.");
          const a = Math.max(0, n - i), l = Math.min(this.image.getHeight() - 1, n + i);
          if (l - a < e * 3)
            throw new D("Alignment bottom exceeds estimated module size.");
          return new Xn(this.image, s, a, o - s, l - a, e, this.resultPointCallback).find();
        }
      }
      class Bt {
        constructor() {
          this.decoder = new qi();
        }
        getDecoder() {
          return this.decoder;
        }
        /**
         * Locates and decodes a QR code in an image.
         *
         * @return a representing: string the content encoded by the QR code
         * @throws NotFoundException if a QR code cannot be found
         * @throws FormatException if a QR code cannot be decoded
         * @throws ChecksumException if error correction fails
         */
        /*@Override*/
        // public decode(image: BinaryBitmap): Result /*throws NotFoundException, ChecksumException, FormatException */ {
        //   return this.decode(image, null)
        // }
        /*@Override*/
        decode(e, t) {
          let n, r;
          if (t != null && t.get(xe.PURE_BARCODE) !== void 0) {
            const a = Bt.extractPureBits(e.getBlackMatrix());
            n = this.decoder.decodeBitMatrix(a, t), r = Bt.NO_POINTS;
          } else {
            const a = new pn(e.getBlackMatrix()).detect(t);
            n = this.decoder.decodeBitMatrix(a.getBits(), t), r = a.getPoints();
          }
          n.getOther() instanceof Qr && n.getOther().applyMirroredCorrection(r);
          const i = new qe(n.getText(), n.getRawBytes(), void 0, r, Y.QR_CODE, void 0), s = n.getByteSegments();
          s !== null && i.putMetadata(Ue.BYTE_SEGMENTS, s);
          const o = n.getECLevel();
          return o !== null && i.putMetadata(Ue.ERROR_CORRECTION_LEVEL, o), n.hasStructuredAppend() && (i.putMetadata(Ue.STRUCTURED_APPEND_SEQUENCE, n.getStructuredAppendSequenceNumber()), i.putMetadata(Ue.STRUCTURED_APPEND_PARITY, n.getStructuredAppendParity())), i;
        }
        /*@Override*/
        reset() {
        }
        /**
         * This method detects a code in a "pure" image -- that is, pure monochrome image
         * which contains only an unrotated, unskewed, image of a code, with some white border
         * around it. This is a specialized method that works exceptionally fast in this special
         * case.
         *
         * @see com.google.zxing.datamatrix.DataMatrixReader#extractPureBits(BitMatrix)
         */
        static extractPureBits(e) {
          const t = e.getTopLeftOnBit(), n = e.getBottomRightOnBit();
          if (t === null || n === null)
            throw new D();
          const r = this.moduleSize(t, e);
          let i = t[1], s = n[1], o = t[0], a = n[0];
          if (o >= a || i >= s)
            throw new D();
          if (s - i !== a - o && (a = o + (s - i), a >= e.getWidth()))
            throw new D();
          const l = Math.round((a - o + 1) / r), u = Math.round((s - i + 1) / r);
          if (l <= 0 || u <= 0)
            throw new D();
          if (u !== l)
            throw new D();
          const d = (
            /*(int) */
            Math.floor(r / 2)
          );
          i += d, o += d;
          const A = o + /*(int) */
          Math.floor((l - 1) * r) - a;
          if (A > 0) {
            if (A > d)
              throw new D();
            o -= A;
          }
          const p = i + /*(int) */
          Math.floor((u - 1) * r) - s;
          if (p > 0) {
            if (p > d)
              throw new D();
            i -= p;
          }
          const I = new Fe(l, u);
          for (let y = 0; y < u; y++) {
            const _ = i + /*(int) */
            Math.floor(y * r);
            for (let N = 0; N < l; N++)
              e.get(o + /*(int) */
              Math.floor(N * r), _) && I.set(N, y);
          }
          return I;
        }
        static moduleSize(e, t) {
          const n = t.getHeight(), r = t.getWidth();
          let i = e[0], s = e[1], o = !0, a = 0;
          for (; i < r && s < n; ) {
            if (o !== t.get(i, s)) {
              if (++a === 5)
                break;
              o = !o;
            }
            i++, s++;
          }
          if (i === r || s === n)
            throw new D();
          return (i - e[0]) / 7;
        }
      }
      Bt.NO_POINTS = new Array();
      class j {
        PDF417Common() {
        }
        /**
         * @param moduleBitCount values to sum
         * @return sum of values
         * @deprecated call {@link MathUtils#sum(int[])}
         */
        // @Deprecated
        static getBitCountSum(e) {
          return oe.sum(e);
        }
        static toIntArray(e) {
          if (e == null || !e.length)
            return j.EMPTY_INT_ARRAY;
          const t = new Int32Array(e.length);
          let n = 0;
          for (const r of e)
            t[n++] = r;
          return t;
        }
        /**
         * @param symbol encoded symbol to translate to a codeword
         * @return the codeword corresponding to the symbol.
         */
        static getCodeword(e) {
          const t = pe.binarySearch(j.SYMBOL_TABLE, e & 262143);
          return t < 0 ? -1 : (j.CODEWORD_TABLE[t] - 1) % j.NUMBER_OF_CODEWORDS;
        }
      }
      j.NUMBER_OF_CODEWORDS = 929, j.MAX_CODEWORDS_IN_BARCODE = j.NUMBER_OF_CODEWORDS - 1, j.MIN_ROWS_IN_BARCODE = 3, j.MAX_ROWS_IN_BARCODE = 90, j.MODULES_IN_CODEWORD = 17, j.MODULES_IN_STOP_PATTERN = 18, j.BARS_IN_MODULE = 8, j.EMPTY_INT_ARRAY = new Int32Array([]), j.SYMBOL_TABLE = Int32Array.from([
        66142,
        66170,
        66206,
        66236,
        66290,
        66292,
        66350,
        66382,
        66396,
        66454,
        66470,
        66476,
        66594,
        66600,
        66614,
        66626,
        66628,
        66632,
        66640,
        66654,
        66662,
        66668,
        66682,
        66690,
        66718,
        66720,
        66748,
        66758,
        66776,
        66798,
        66802,
        66804,
        66820,
        66824,
        66832,
        66846,
        66848,
        66876,
        66880,
        66936,
        66950,
        66956,
        66968,
        66992,
        67006,
        67022,
        67036,
        67042,
        67044,
        67048,
        67062,
        67118,
        67150,
        67164,
        67214,
        67228,
        67256,
        67294,
        67322,
        67350,
        67366,
        67372,
        67398,
        67404,
        67416,
        67438,
        67474,
        67476,
        67490,
        67492,
        67496,
        67510,
        67618,
        67624,
        67650,
        67656,
        67664,
        67678,
        67686,
        67692,
        67706,
        67714,
        67716,
        67728,
        67742,
        67744,
        67772,
        67782,
        67788,
        67800,
        67822,
        67826,
        67828,
        67842,
        67848,
        67870,
        67872,
        67900,
        67904,
        67960,
        67974,
        67992,
        68016,
        68030,
        68046,
        68060,
        68066,
        68068,
        68072,
        68086,
        68104,
        68112,
        68126,
        68128,
        68156,
        68160,
        68216,
        68336,
        68358,
        68364,
        68376,
        68400,
        68414,
        68448,
        68476,
        68494,
        68508,
        68536,
        68546,
        68548,
        68552,
        68560,
        68574,
        68582,
        68588,
        68654,
        68686,
        68700,
        68706,
        68708,
        68712,
        68726,
        68750,
        68764,
        68792,
        68802,
        68804,
        68808,
        68816,
        68830,
        68838,
        68844,
        68858,
        68878,
        68892,
        68920,
        68976,
        68990,
        68994,
        68996,
        69e3,
        69008,
        69022,
        69024,
        69052,
        69062,
        69068,
        69080,
        69102,
        69106,
        69108,
        69142,
        69158,
        69164,
        69190,
        69208,
        69230,
        69254,
        69260,
        69272,
        69296,
        69310,
        69326,
        69340,
        69386,
        69394,
        69396,
        69410,
        69416,
        69430,
        69442,
        69444,
        69448,
        69456,
        69470,
        69478,
        69484,
        69554,
        69556,
        69666,
        69672,
        69698,
        69704,
        69712,
        69726,
        69754,
        69762,
        69764,
        69776,
        69790,
        69792,
        69820,
        69830,
        69836,
        69848,
        69870,
        69874,
        69876,
        69890,
        69918,
        69920,
        69948,
        69952,
        70008,
        70022,
        70040,
        70064,
        70078,
        70094,
        70108,
        70114,
        70116,
        70120,
        70134,
        70152,
        70174,
        70176,
        70264,
        70384,
        70412,
        70448,
        70462,
        70496,
        70524,
        70542,
        70556,
        70584,
        70594,
        70600,
        70608,
        70622,
        70630,
        70636,
        70664,
        70672,
        70686,
        70688,
        70716,
        70720,
        70776,
        70896,
        71136,
        71180,
        71192,
        71216,
        71230,
        71264,
        71292,
        71360,
        71416,
        71452,
        71480,
        71536,
        71550,
        71554,
        71556,
        71560,
        71568,
        71582,
        71584,
        71612,
        71622,
        71628,
        71640,
        71662,
        71726,
        71732,
        71758,
        71772,
        71778,
        71780,
        71784,
        71798,
        71822,
        71836,
        71864,
        71874,
        71880,
        71888,
        71902,
        71910,
        71916,
        71930,
        71950,
        71964,
        71992,
        72048,
        72062,
        72066,
        72068,
        72080,
        72094,
        72096,
        72124,
        72134,
        72140,
        72152,
        72174,
        72178,
        72180,
        72206,
        72220,
        72248,
        72304,
        72318,
        72416,
        72444,
        72456,
        72464,
        72478,
        72480,
        72508,
        72512,
        72568,
        72588,
        72600,
        72624,
        72638,
        72654,
        72668,
        72674,
        72676,
        72680,
        72694,
        72726,
        72742,
        72748,
        72774,
        72780,
        72792,
        72814,
        72838,
        72856,
        72880,
        72894,
        72910,
        72924,
        72930,
        72932,
        72936,
        72950,
        72966,
        72972,
        72984,
        73008,
        73022,
        73056,
        73084,
        73102,
        73116,
        73144,
        73156,
        73160,
        73168,
        73182,
        73190,
        73196,
        73210,
        73226,
        73234,
        73236,
        73250,
        73252,
        73256,
        73270,
        73282,
        73284,
        73296,
        73310,
        73318,
        73324,
        73346,
        73348,
        73352,
        73360,
        73374,
        73376,
        73404,
        73414,
        73420,
        73432,
        73454,
        73498,
        73518,
        73522,
        73524,
        73550,
        73564,
        73570,
        73572,
        73576,
        73590,
        73800,
        73822,
        73858,
        73860,
        73872,
        73886,
        73888,
        73916,
        73944,
        73970,
        73972,
        73992,
        74014,
        74016,
        74044,
        74048,
        74104,
        74118,
        74136,
        74160,
        74174,
        74210,
        74212,
        74216,
        74230,
        74244,
        74256,
        74270,
        74272,
        74360,
        74480,
        74502,
        74508,
        74544,
        74558,
        74592,
        74620,
        74638,
        74652,
        74680,
        74690,
        74696,
        74704,
        74726,
        74732,
        74782,
        74784,
        74812,
        74992,
        75232,
        75288,
        75326,
        75360,
        75388,
        75456,
        75512,
        75576,
        75632,
        75646,
        75650,
        75652,
        75664,
        75678,
        75680,
        75708,
        75718,
        75724,
        75736,
        75758,
        75808,
        75836,
        75840,
        75896,
        76016,
        76256,
        76736,
        76824,
        76848,
        76862,
        76896,
        76924,
        76992,
        77048,
        77296,
        77340,
        77368,
        77424,
        77438,
        77536,
        77564,
        77572,
        77576,
        77584,
        77600,
        77628,
        77632,
        77688,
        77702,
        77708,
        77720,
        77744,
        77758,
        77774,
        77788,
        77870,
        77902,
        77916,
        77922,
        77928,
        77966,
        77980,
        78008,
        78018,
        78024,
        78032,
        78046,
        78060,
        78074,
        78094,
        78136,
        78192,
        78206,
        78210,
        78212,
        78224,
        78238,
        78240,
        78268,
        78278,
        78284,
        78296,
        78322,
        78324,
        78350,
        78364,
        78448,
        78462,
        78560,
        78588,
        78600,
        78622,
        78624,
        78652,
        78656,
        78712,
        78726,
        78744,
        78768,
        78782,
        78798,
        78812,
        78818,
        78820,
        78824,
        78838,
        78862,
        78876,
        78904,
        78960,
        78974,
        79072,
        79100,
        79296,
        79352,
        79368,
        79376,
        79390,
        79392,
        79420,
        79424,
        79480,
        79600,
        79628,
        79640,
        79664,
        79678,
        79712,
        79740,
        79772,
        79800,
        79810,
        79812,
        79816,
        79824,
        79838,
        79846,
        79852,
        79894,
        79910,
        79916,
        79942,
        79948,
        79960,
        79982,
        79988,
        80006,
        80024,
        80048,
        80062,
        80078,
        80092,
        80098,
        80100,
        80104,
        80134,
        80140,
        80176,
        80190,
        80224,
        80252,
        80270,
        80284,
        80312,
        80328,
        80336,
        80350,
        80358,
        80364,
        80378,
        80390,
        80396,
        80408,
        80432,
        80446,
        80480,
        80508,
        80576,
        80632,
        80654,
        80668,
        80696,
        80752,
        80766,
        80776,
        80784,
        80798,
        80800,
        80828,
        80844,
        80856,
        80878,
        80882,
        80884,
        80914,
        80916,
        80930,
        80932,
        80936,
        80950,
        80962,
        80968,
        80976,
        80990,
        80998,
        81004,
        81026,
        81028,
        81040,
        81054,
        81056,
        81084,
        81094,
        81100,
        81112,
        81134,
        81154,
        81156,
        81160,
        81168,
        81182,
        81184,
        81212,
        81216,
        81272,
        81286,
        81292,
        81304,
        81328,
        81342,
        81358,
        81372,
        81380,
        81384,
        81398,
        81434,
        81454,
        81458,
        81460,
        81486,
        81500,
        81506,
        81508,
        81512,
        81526,
        81550,
        81564,
        81592,
        81602,
        81604,
        81608,
        81616,
        81630,
        81638,
        81644,
        81702,
        81708,
        81722,
        81734,
        81740,
        81752,
        81774,
        81778,
        81780,
        82050,
        82078,
        82080,
        82108,
        82180,
        82184,
        82192,
        82206,
        82208,
        82236,
        82240,
        82296,
        82316,
        82328,
        82352,
        82366,
        82402,
        82404,
        82408,
        82440,
        82448,
        82462,
        82464,
        82492,
        82496,
        82552,
        82672,
        82694,
        82700,
        82712,
        82736,
        82750,
        82784,
        82812,
        82830,
        82882,
        82884,
        82888,
        82896,
        82918,
        82924,
        82952,
        82960,
        82974,
        82976,
        83004,
        83008,
        83064,
        83184,
        83424,
        83468,
        83480,
        83504,
        83518,
        83552,
        83580,
        83648,
        83704,
        83740,
        83768,
        83824,
        83838,
        83842,
        83844,
        83848,
        83856,
        83872,
        83900,
        83910,
        83916,
        83928,
        83950,
        83984,
        84e3,
        84028,
        84032,
        84088,
        84208,
        84448,
        84928,
        85040,
        85054,
        85088,
        85116,
        85184,
        85240,
        85488,
        85560,
        85616,
        85630,
        85728,
        85756,
        85764,
        85768,
        85776,
        85790,
        85792,
        85820,
        85824,
        85880,
        85894,
        85900,
        85912,
        85936,
        85966,
        85980,
        86048,
        86080,
        86136,
        86256,
        86496,
        86976,
        88160,
        88188,
        88256,
        88312,
        88560,
        89056,
        89200,
        89214,
        89312,
        89340,
        89536,
        89592,
        89608,
        89616,
        89632,
        89664,
        89720,
        89840,
        89868,
        89880,
        89904,
        89952,
        89980,
        89998,
        90012,
        90040,
        90190,
        90204,
        90254,
        90268,
        90296,
        90306,
        90308,
        90312,
        90334,
        90382,
        90396,
        90424,
        90480,
        90494,
        90500,
        90504,
        90512,
        90526,
        90528,
        90556,
        90566,
        90572,
        90584,
        90610,
        90612,
        90638,
        90652,
        90680,
        90736,
        90750,
        90848,
        90876,
        90884,
        90888,
        90896,
        90910,
        90912,
        90940,
        90944,
        91e3,
        91014,
        91020,
        91032,
        91056,
        91070,
        91086,
        91100,
        91106,
        91108,
        91112,
        91126,
        91150,
        91164,
        91192,
        91248,
        91262,
        91360,
        91388,
        91584,
        91640,
        91664,
        91678,
        91680,
        91708,
        91712,
        91768,
        91888,
        91928,
        91952,
        91966,
        92e3,
        92028,
        92046,
        92060,
        92088,
        92098,
        92100,
        92104,
        92112,
        92126,
        92134,
        92140,
        92188,
        92216,
        92272,
        92384,
        92412,
        92608,
        92664,
        93168,
        93200,
        93214,
        93216,
        93244,
        93248,
        93304,
        93424,
        93664,
        93720,
        93744,
        93758,
        93792,
        93820,
        93888,
        93944,
        93980,
        94008,
        94064,
        94078,
        94084,
        94088,
        94096,
        94110,
        94112,
        94140,
        94150,
        94156,
        94168,
        94246,
        94252,
        94278,
        94284,
        94296,
        94318,
        94342,
        94348,
        94360,
        94384,
        94398,
        94414,
        94428,
        94440,
        94470,
        94476,
        94488,
        94512,
        94526,
        94560,
        94588,
        94606,
        94620,
        94648,
        94658,
        94660,
        94664,
        94672,
        94686,
        94694,
        94700,
        94714,
        94726,
        94732,
        94744,
        94768,
        94782,
        94816,
        94844,
        94912,
        94968,
        94990,
        95004,
        95032,
        95088,
        95102,
        95112,
        95120,
        95134,
        95136,
        95164,
        95180,
        95192,
        95214,
        95218,
        95220,
        95244,
        95256,
        95280,
        95294,
        95328,
        95356,
        95424,
        95480,
        95728,
        95758,
        95772,
        95800,
        95856,
        95870,
        95968,
        95996,
        96008,
        96016,
        96030,
        96032,
        96060,
        96064,
        96120,
        96152,
        96176,
        96190,
        96220,
        96226,
        96228,
        96232,
        96290,
        96292,
        96296,
        96310,
        96322,
        96324,
        96328,
        96336,
        96350,
        96358,
        96364,
        96386,
        96388,
        96392,
        96400,
        96414,
        96416,
        96444,
        96454,
        96460,
        96472,
        96494,
        96498,
        96500,
        96514,
        96516,
        96520,
        96528,
        96542,
        96544,
        96572,
        96576,
        96632,
        96646,
        96652,
        96664,
        96688,
        96702,
        96718,
        96732,
        96738,
        96740,
        96744,
        96758,
        96772,
        96776,
        96784,
        96798,
        96800,
        96828,
        96832,
        96888,
        97008,
        97030,
        97036,
        97048,
        97072,
        97086,
        97120,
        97148,
        97166,
        97180,
        97208,
        97220,
        97224,
        97232,
        97246,
        97254,
        97260,
        97326,
        97330,
        97332,
        97358,
        97372,
        97378,
        97380,
        97384,
        97398,
        97422,
        97436,
        97464,
        97474,
        97476,
        97480,
        97488,
        97502,
        97510,
        97516,
        97550,
        97564,
        97592,
        97648,
        97666,
        97668,
        97672,
        97680,
        97694,
        97696,
        97724,
        97734,
        97740,
        97752,
        97774,
        97830,
        97836,
        97850,
        97862,
        97868,
        97880,
        97902,
        97906,
        97908,
        97926,
        97932,
        97944,
        97968,
        97998,
        98012,
        98018,
        98020,
        98024,
        98038,
        98618,
        98674,
        98676,
        98838,
        98854,
        98874,
        98892,
        98904,
        98926,
        98930,
        98932,
        98968,
        99006,
        99042,
        99044,
        99048,
        99062,
        99166,
        99194,
        99246,
        99286,
        99350,
        99366,
        99372,
        99386,
        99398,
        99416,
        99438,
        99442,
        99444,
        99462,
        99504,
        99518,
        99534,
        99548,
        99554,
        99556,
        99560,
        99574,
        99590,
        99596,
        99608,
        99632,
        99646,
        99680,
        99708,
        99726,
        99740,
        99768,
        99778,
        99780,
        99784,
        99792,
        99806,
        99814,
        99820,
        99834,
        99858,
        99860,
        99874,
        99880,
        99894,
        99906,
        99920,
        99934,
        99962,
        99970,
        99972,
        99976,
        99984,
        99998,
        1e5,
        100028,
        100038,
        100044,
        100056,
        100078,
        100082,
        100084,
        100142,
        100174,
        100188,
        100246,
        100262,
        100268,
        100306,
        100308,
        100390,
        100396,
        100410,
        100422,
        100428,
        100440,
        100462,
        100466,
        100468,
        100486,
        100504,
        100528,
        100542,
        100558,
        100572,
        100578,
        100580,
        100584,
        100598,
        100620,
        100656,
        100670,
        100704,
        100732,
        100750,
        100792,
        100802,
        100808,
        100816,
        100830,
        100838,
        100844,
        100858,
        100888,
        100912,
        100926,
        100960,
        100988,
        101056,
        101112,
        101148,
        101176,
        101232,
        101246,
        101250,
        101252,
        101256,
        101264,
        101278,
        101280,
        101308,
        101318,
        101324,
        101336,
        101358,
        101362,
        101364,
        101410,
        101412,
        101416,
        101430,
        101442,
        101448,
        101456,
        101470,
        101478,
        101498,
        101506,
        101508,
        101520,
        101534,
        101536,
        101564,
        101580,
        101618,
        101620,
        101636,
        101640,
        101648,
        101662,
        101664,
        101692,
        101696,
        101752,
        101766,
        101784,
        101838,
        101858,
        101860,
        101864,
        101934,
        101938,
        101940,
        101966,
        101980,
        101986,
        101988,
        101992,
        102030,
        102044,
        102072,
        102082,
        102084,
        102088,
        102096,
        102138,
        102166,
        102182,
        102188,
        102214,
        102220,
        102232,
        102254,
        102282,
        102290,
        102292,
        102306,
        102308,
        102312,
        102326,
        102444,
        102458,
        102470,
        102476,
        102488,
        102514,
        102516,
        102534,
        102552,
        102576,
        102590,
        102606,
        102620,
        102626,
        102632,
        102646,
        102662,
        102668,
        102704,
        102718,
        102752,
        102780,
        102798,
        102812,
        102840,
        102850,
        102856,
        102864,
        102878,
        102886,
        102892,
        102906,
        102936,
        102974,
        103008,
        103036,
        103104,
        103160,
        103224,
        103280,
        103294,
        103298,
        103300,
        103312,
        103326,
        103328,
        103356,
        103366,
        103372,
        103384,
        103406,
        103410,
        103412,
        103472,
        103486,
        103520,
        103548,
        103616,
        103672,
        103920,
        103992,
        104048,
        104062,
        104160,
        104188,
        104194,
        104196,
        104200,
        104208,
        104224,
        104252,
        104256,
        104312,
        104326,
        104332,
        104344,
        104368,
        104382,
        104398,
        104412,
        104418,
        104420,
        104424,
        104482,
        104484,
        104514,
        104520,
        104528,
        104542,
        104550,
        104570,
        104578,
        104580,
        104592,
        104606,
        104608,
        104636,
        104652,
        104690,
        104692,
        104706,
        104712,
        104734,
        104736,
        104764,
        104768,
        104824,
        104838,
        104856,
        104910,
        104930,
        104932,
        104936,
        104968,
        104976,
        104990,
        104992,
        105020,
        105024,
        105080,
        105200,
        105240,
        105278,
        105312,
        105372,
        105410,
        105412,
        105416,
        105424,
        105446,
        105518,
        105524,
        105550,
        105564,
        105570,
        105572,
        105576,
        105614,
        105628,
        105656,
        105666,
        105672,
        105680,
        105702,
        105722,
        105742,
        105756,
        105784,
        105840,
        105854,
        105858,
        105860,
        105864,
        105872,
        105888,
        105932,
        105970,
        105972,
        106006,
        106022,
        106028,
        106054,
        106060,
        106072,
        106100,
        106118,
        106124,
        106136,
        106160,
        106174,
        106190,
        106210,
        106212,
        106216,
        106250,
        106258,
        106260,
        106274,
        106276,
        106280,
        106306,
        106308,
        106312,
        106320,
        106334,
        106348,
        106394,
        106414,
        106418,
        106420,
        106566,
        106572,
        106610,
        106612,
        106630,
        106636,
        106648,
        106672,
        106686,
        106722,
        106724,
        106728,
        106742,
        106758,
        106764,
        106776,
        106800,
        106814,
        106848,
        106876,
        106894,
        106908,
        106936,
        106946,
        106948,
        106952,
        106960,
        106974,
        106982,
        106988,
        107032,
        107056,
        107070,
        107104,
        107132,
        107200,
        107256,
        107292,
        107320,
        107376,
        107390,
        107394,
        107396,
        107400,
        107408,
        107422,
        107424,
        107452,
        107462,
        107468,
        107480,
        107502,
        107506,
        107508,
        107544,
        107568,
        107582,
        107616,
        107644,
        107712,
        107768,
        108016,
        108060,
        108088,
        108144,
        108158,
        108256,
        108284,
        108290,
        108292,
        108296,
        108304,
        108318,
        108320,
        108348,
        108352,
        108408,
        108422,
        108428,
        108440,
        108464,
        108478,
        108494,
        108508,
        108514,
        108516,
        108520,
        108592,
        108640,
        108668,
        108736,
        108792,
        109040,
        109536,
        109680,
        109694,
        109792,
        109820,
        110016,
        110072,
        110084,
        110088,
        110096,
        110112,
        110140,
        110144,
        110200,
        110320,
        110342,
        110348,
        110360,
        110384,
        110398,
        110432,
        110460,
        110478,
        110492,
        110520,
        110532,
        110536,
        110544,
        110558,
        110658,
        110686,
        110714,
        110722,
        110724,
        110728,
        110736,
        110750,
        110752,
        110780,
        110796,
        110834,
        110836,
        110850,
        110852,
        110856,
        110864,
        110878,
        110880,
        110908,
        110912,
        110968,
        110982,
        111e3,
        111054,
        111074,
        111076,
        111080,
        111108,
        111112,
        111120,
        111134,
        111136,
        111164,
        111168,
        111224,
        111344,
        111372,
        111422,
        111456,
        111516,
        111554,
        111556,
        111560,
        111568,
        111590,
        111632,
        111646,
        111648,
        111676,
        111680,
        111736,
        111856,
        112096,
        112152,
        112224,
        112252,
        112320,
        112440,
        112514,
        112516,
        112520,
        112528,
        112542,
        112544,
        112588,
        112686,
        112718,
        112732,
        112782,
        112796,
        112824,
        112834,
        112836,
        112840,
        112848,
        112870,
        112890,
        112910,
        112924,
        112952,
        113008,
        113022,
        113026,
        113028,
        113032,
        113040,
        113054,
        113056,
        113100,
        113138,
        113140,
        113166,
        113180,
        113208,
        113264,
        113278,
        113376,
        113404,
        113416,
        113424,
        113440,
        113468,
        113472,
        113560,
        113614,
        113634,
        113636,
        113640,
        113686,
        113702,
        113708,
        113734,
        113740,
        113752,
        113778,
        113780,
        113798,
        113804,
        113816,
        113840,
        113854,
        113870,
        113890,
        113892,
        113896,
        113926,
        113932,
        113944,
        113968,
        113982,
        114016,
        114044,
        114076,
        114114,
        114116,
        114120,
        114128,
        114150,
        114170,
        114194,
        114196,
        114210,
        114212,
        114216,
        114242,
        114244,
        114248,
        114256,
        114270,
        114278,
        114306,
        114308,
        114312,
        114320,
        114334,
        114336,
        114364,
        114380,
        114420,
        114458,
        114478,
        114482,
        114484,
        114510,
        114524,
        114530,
        114532,
        114536,
        114842,
        114866,
        114868,
        114970,
        114994,
        114996,
        115042,
        115044,
        115048,
        115062,
        115130,
        115226,
        115250,
        115252,
        115278,
        115292,
        115298,
        115300,
        115304,
        115318,
        115342,
        115394,
        115396,
        115400,
        115408,
        115422,
        115430,
        115436,
        115450,
        115478,
        115494,
        115514,
        115526,
        115532,
        115570,
        115572,
        115738,
        115758,
        115762,
        115764,
        115790,
        115804,
        115810,
        115812,
        115816,
        115830,
        115854,
        115868,
        115896,
        115906,
        115912,
        115920,
        115934,
        115942,
        115948,
        115962,
        115996,
        116024,
        116080,
        116094,
        116098,
        116100,
        116104,
        116112,
        116126,
        116128,
        116156,
        116166,
        116172,
        116184,
        116206,
        116210,
        116212,
        116246,
        116262,
        116268,
        116282,
        116294,
        116300,
        116312,
        116334,
        116338,
        116340,
        116358,
        116364,
        116376,
        116400,
        116414,
        116430,
        116444,
        116450,
        116452,
        116456,
        116498,
        116500,
        116514,
        116520,
        116534,
        116546,
        116548,
        116552,
        116560,
        116574,
        116582,
        116588,
        116602,
        116654,
        116694,
        116714,
        116762,
        116782,
        116786,
        116788,
        116814,
        116828,
        116834,
        116836,
        116840,
        116854,
        116878,
        116892,
        116920,
        116930,
        116936,
        116944,
        116958,
        116966,
        116972,
        116986,
        117006,
        117048,
        117104,
        117118,
        117122,
        117124,
        117136,
        117150,
        117152,
        117180,
        117190,
        117196,
        117208,
        117230,
        117234,
        117236,
        117304,
        117360,
        117374,
        117472,
        117500,
        117506,
        117508,
        117512,
        117520,
        117536,
        117564,
        117568,
        117624,
        117638,
        117644,
        117656,
        117680,
        117694,
        117710,
        117724,
        117730,
        117732,
        117736,
        117750,
        117782,
        117798,
        117804,
        117818,
        117830,
        117848,
        117874,
        117876,
        117894,
        117936,
        117950,
        117966,
        117986,
        117988,
        117992,
        118022,
        118028,
        118040,
        118064,
        118078,
        118112,
        118140,
        118172,
        118210,
        118212,
        118216,
        118224,
        118238,
        118246,
        118266,
        118306,
        118312,
        118338,
        118352,
        118366,
        118374,
        118394,
        118402,
        118404,
        118408,
        118416,
        118430,
        118432,
        118460,
        118476,
        118514,
        118516,
        118574,
        118578,
        118580,
        118606,
        118620,
        118626,
        118628,
        118632,
        118678,
        118694,
        118700,
        118730,
        118738,
        118740,
        118830,
        118834,
        118836,
        118862,
        118876,
        118882,
        118884,
        118888,
        118902,
        118926,
        118940,
        118968,
        118978,
        118980,
        118984,
        118992,
        119006,
        119014,
        119020,
        119034,
        119068,
        119096,
        119152,
        119166,
        119170,
        119172,
        119176,
        119184,
        119198,
        119200,
        119228,
        119238,
        119244,
        119256,
        119278,
        119282,
        119284,
        119324,
        119352,
        119408,
        119422,
        119520,
        119548,
        119554,
        119556,
        119560,
        119568,
        119582,
        119584,
        119612,
        119616,
        119672,
        119686,
        119692,
        119704,
        119728,
        119742,
        119758,
        119772,
        119778,
        119780,
        119784,
        119798,
        119920,
        119934,
        120032,
        120060,
        120256,
        120312,
        120324,
        120328,
        120336,
        120352,
        120384,
        120440,
        120560,
        120582,
        120588,
        120600,
        120624,
        120638,
        120672,
        120700,
        120718,
        120732,
        120760,
        120770,
        120772,
        120776,
        120784,
        120798,
        120806,
        120812,
        120870,
        120876,
        120890,
        120902,
        120908,
        120920,
        120946,
        120948,
        120966,
        120972,
        120984,
        121008,
        121022,
        121038,
        121058,
        121060,
        121064,
        121078,
        121100,
        121112,
        121136,
        121150,
        121184,
        121212,
        121244,
        121282,
        121284,
        121288,
        121296,
        121318,
        121338,
        121356,
        121368,
        121392,
        121406,
        121440,
        121468,
        121536,
        121592,
        121656,
        121730,
        121732,
        121736,
        121744,
        121758,
        121760,
        121804,
        121842,
        121844,
        121890,
        121922,
        121924,
        121928,
        121936,
        121950,
        121958,
        121978,
        121986,
        121988,
        121992,
        122e3,
        122014,
        122016,
        122044,
        122060,
        122098,
        122100,
        122116,
        122120,
        122128,
        122142,
        122144,
        122172,
        122176,
        122232,
        122246,
        122264,
        122318,
        122338,
        122340,
        122344,
        122414,
        122418,
        122420,
        122446,
        122460,
        122466,
        122468,
        122472,
        122510,
        122524,
        122552,
        122562,
        122564,
        122568,
        122576,
        122598,
        122618,
        122646,
        122662,
        122668,
        122694,
        122700,
        122712,
        122738,
        122740,
        122762,
        122770,
        122772,
        122786,
        122788,
        122792,
        123018,
        123026,
        123028,
        123042,
        123044,
        123048,
        123062,
        123098,
        123146,
        123154,
        123156,
        123170,
        123172,
        123176,
        123190,
        123202,
        123204,
        123208,
        123216,
        123238,
        123244,
        123258,
        123290,
        123314,
        123316,
        123402,
        123410,
        123412,
        123426,
        123428,
        123432,
        123446,
        123458,
        123464,
        123472,
        123486,
        123494,
        123500,
        123514,
        123522,
        123524,
        123528,
        123536,
        123552,
        123580,
        123590,
        123596,
        123608,
        123630,
        123634,
        123636,
        123674,
        123698,
        123700,
        123740,
        123746,
        123748,
        123752,
        123834,
        123914,
        123922,
        123924,
        123938,
        123944,
        123958,
        123970,
        123976,
        123984,
        123998,
        124006,
        124012,
        124026,
        124034,
        124036,
        124048,
        124062,
        124064,
        124092,
        124102,
        124108,
        124120,
        124142,
        124146,
        124148,
        124162,
        124164,
        124168,
        124176,
        124190,
        124192,
        124220,
        124224,
        124280,
        124294,
        124300,
        124312,
        124336,
        124350,
        124366,
        124380,
        124386,
        124388,
        124392,
        124406,
        124442,
        124462,
        124466,
        124468,
        124494,
        124508,
        124514,
        124520,
        124558,
        124572,
        124600,
        124610,
        124612,
        124616,
        124624,
        124646,
        124666,
        124694,
        124710,
        124716,
        124730,
        124742,
        124748,
        124760,
        124786,
        124788,
        124818,
        124820,
        124834,
        124836,
        124840,
        124854,
        124946,
        124948,
        124962,
        124964,
        124968,
        124982,
        124994,
        124996,
        125e3,
        125008,
        125022,
        125030,
        125036,
        125050,
        125058,
        125060,
        125064,
        125072,
        125086,
        125088,
        125116,
        125126,
        125132,
        125144,
        125166,
        125170,
        125172,
        125186,
        125188,
        125192,
        125200,
        125216,
        125244,
        125248,
        125304,
        125318,
        125324,
        125336,
        125360,
        125374,
        125390,
        125404,
        125410,
        125412,
        125416,
        125430,
        125444,
        125448,
        125456,
        125472,
        125504,
        125560,
        125680,
        125702,
        125708,
        125720,
        125744,
        125758,
        125792,
        125820,
        125838,
        125852,
        125880,
        125890,
        125892,
        125896,
        125904,
        125918,
        125926,
        125932,
        125978,
        125998,
        126002,
        126004,
        126030,
        126044,
        126050,
        126052,
        126056,
        126094,
        126108,
        126136,
        126146,
        126148,
        126152,
        126160,
        126182,
        126202,
        126222,
        126236,
        126264,
        126320,
        126334,
        126338,
        126340,
        126344,
        126352,
        126366,
        126368,
        126412,
        126450,
        126452,
        126486,
        126502,
        126508,
        126522,
        126534,
        126540,
        126552,
        126574,
        126578,
        126580,
        126598,
        126604,
        126616,
        126640,
        126654,
        126670,
        126684,
        126690,
        126692,
        126696,
        126738,
        126754,
        126756,
        126760,
        126774,
        126786,
        126788,
        126792,
        126800,
        126814,
        126822,
        126828,
        126842,
        126894,
        126898,
        126900,
        126934,
        127126,
        127142,
        127148,
        127162,
        127178,
        127186,
        127188,
        127254,
        127270,
        127276,
        127290,
        127302,
        127308,
        127320,
        127342,
        127346,
        127348,
        127370,
        127378,
        127380,
        127394,
        127396,
        127400,
        127450,
        127510,
        127526,
        127532,
        127546,
        127558,
        127576,
        127598,
        127602,
        127604,
        127622,
        127628,
        127640,
        127664,
        127678,
        127694,
        127708,
        127714,
        127716,
        127720,
        127734,
        127754,
        127762,
        127764,
        127778,
        127784,
        127810,
        127812,
        127816,
        127824,
        127838,
        127846,
        127866,
        127898,
        127918,
        127922,
        127924,
        128022,
        128038,
        128044,
        128058,
        128070,
        128076,
        128088,
        128110,
        128114,
        128116,
        128134,
        128140,
        128152,
        128176,
        128190,
        128206,
        128220,
        128226,
        128228,
        128232,
        128246,
        128262,
        128268,
        128280,
        128304,
        128318,
        128352,
        128380,
        128398,
        128412,
        128440,
        128450,
        128452,
        128456,
        128464,
        128478,
        128486,
        128492,
        128506,
        128522,
        128530,
        128532,
        128546,
        128548,
        128552,
        128566,
        128578,
        128580,
        128584,
        128592,
        128606,
        128614,
        128634,
        128642,
        128644,
        128648,
        128656,
        128670,
        128672,
        128700,
        128716,
        128754,
        128756,
        128794,
        128814,
        128818,
        128820,
        128846,
        128860,
        128866,
        128868,
        128872,
        128886,
        128918,
        128934,
        128940,
        128954,
        128978,
        128980,
        129178,
        129198,
        129202,
        129204,
        129238,
        129258,
        129306,
        129326,
        129330,
        129332,
        129358,
        129372,
        129378,
        129380,
        129384,
        129398,
        129430,
        129446,
        129452,
        129466,
        129482,
        129490,
        129492,
        129562,
        129582,
        129586,
        129588,
        129614,
        129628,
        129634,
        129636,
        129640,
        129654,
        129678,
        129692,
        129720,
        129730,
        129732,
        129736,
        129744,
        129758,
        129766,
        129772,
        129814,
        129830,
        129836,
        129850,
        129862,
        129868,
        129880,
        129902,
        129906,
        129908,
        129930,
        129938,
        129940,
        129954,
        129956,
        129960,
        129974,
        130010
      ]), j.CODEWORD_TABLE = Int32Array.from([
        2627,
        1819,
        2622,
        2621,
        1813,
        1812,
        2729,
        2724,
        2723,
        2779,
        2774,
        2773,
        902,
        896,
        908,
        868,
        865,
        861,
        859,
        2511,
        873,
        871,
        1780,
        835,
        2493,
        825,
        2491,
        842,
        837,
        844,
        1764,
        1762,
        811,
        810,
        809,
        2483,
        807,
        2482,
        806,
        2480,
        815,
        814,
        813,
        812,
        2484,
        817,
        816,
        1745,
        1744,
        1742,
        1746,
        2655,
        2637,
        2635,
        2626,
        2625,
        2623,
        2628,
        1820,
        2752,
        2739,
        2737,
        2728,
        2727,
        2725,
        2730,
        2785,
        2783,
        2778,
        2777,
        2775,
        2780,
        787,
        781,
        747,
        739,
        736,
        2413,
        754,
        752,
        1719,
        692,
        689,
        681,
        2371,
        678,
        2369,
        700,
        697,
        694,
        703,
        1688,
        1686,
        642,
        638,
        2343,
        631,
        2341,
        627,
        2338,
        651,
        646,
        643,
        2345,
        654,
        652,
        1652,
        1650,
        1647,
        1654,
        601,
        599,
        2322,
        596,
        2321,
        594,
        2319,
        2317,
        611,
        610,
        608,
        606,
        2324,
        603,
        2323,
        615,
        614,
        612,
        1617,
        1616,
        1614,
        1612,
        616,
        1619,
        1618,
        2575,
        2538,
        2536,
        905,
        901,
        898,
        909,
        2509,
        2507,
        2504,
        870,
        867,
        864,
        860,
        2512,
        875,
        872,
        1781,
        2490,
        2489,
        2487,
        2485,
        1748,
        836,
        834,
        832,
        830,
        2494,
        827,
        2492,
        843,
        841,
        839,
        845,
        1765,
        1763,
        2701,
        2676,
        2674,
        2653,
        2648,
        2656,
        2634,
        2633,
        2631,
        2629,
        1821,
        2638,
        2636,
        2770,
        2763,
        2761,
        2750,
        2745,
        2753,
        2736,
        2735,
        2733,
        2731,
        1848,
        2740,
        2738,
        2786,
        2784,
        591,
        588,
        576,
        569,
        566,
        2296,
        1590,
        537,
        534,
        526,
        2276,
        522,
        2274,
        545,
        542,
        539,
        548,
        1572,
        1570,
        481,
        2245,
        466,
        2242,
        462,
        2239,
        492,
        485,
        482,
        2249,
        496,
        494,
        1534,
        1531,
        1528,
        1538,
        413,
        2196,
        406,
        2191,
        2188,
        425,
        419,
        2202,
        415,
        2199,
        432,
        430,
        427,
        1472,
        1467,
        1464,
        433,
        1476,
        1474,
        368,
        367,
        2160,
        365,
        2159,
        362,
        2157,
        2155,
        2152,
        378,
        377,
        375,
        2166,
        372,
        2165,
        369,
        2162,
        383,
        381,
        379,
        2168,
        1419,
        1418,
        1416,
        1414,
        385,
        1411,
        384,
        1423,
        1422,
        1420,
        1424,
        2461,
        802,
        2441,
        2439,
        790,
        786,
        783,
        794,
        2409,
        2406,
        2403,
        750,
        742,
        738,
        2414,
        756,
        753,
        1720,
        2367,
        2365,
        2362,
        2359,
        1663,
        693,
        691,
        684,
        2373,
        680,
        2370,
        702,
        699,
        696,
        704,
        1690,
        1687,
        2337,
        2336,
        2334,
        2332,
        1624,
        2329,
        1622,
        640,
        637,
        2344,
        634,
        2342,
        630,
        2340,
        650,
        648,
        645,
        2346,
        655,
        653,
        1653,
        1651,
        1649,
        1655,
        2612,
        2597,
        2595,
        2571,
        2568,
        2565,
        2576,
        2534,
        2529,
        2526,
        1787,
        2540,
        2537,
        907,
        904,
        900,
        910,
        2503,
        2502,
        2500,
        2498,
        1768,
        2495,
        1767,
        2510,
        2508,
        2506,
        869,
        866,
        863,
        2513,
        876,
        874,
        1782,
        2720,
        2713,
        2711,
        2697,
        2694,
        2691,
        2702,
        2672,
        2670,
        2664,
        1828,
        2678,
        2675,
        2647,
        2646,
        2644,
        2642,
        1823,
        2639,
        1822,
        2654,
        2652,
        2650,
        2657,
        2771,
        1855,
        2765,
        2762,
        1850,
        1849,
        2751,
        2749,
        2747,
        2754,
        353,
        2148,
        344,
        342,
        336,
        2142,
        332,
        2140,
        345,
        1375,
        1373,
        306,
        2130,
        299,
        2128,
        295,
        2125,
        319,
        314,
        311,
        2132,
        1354,
        1352,
        1349,
        1356,
        262,
        257,
        2101,
        253,
        2096,
        2093,
        274,
        273,
        267,
        2107,
        263,
        2104,
        280,
        278,
        275,
        1316,
        1311,
        1308,
        1320,
        1318,
        2052,
        202,
        2050,
        2044,
        2040,
        219,
        2063,
        212,
        2060,
        208,
        2055,
        224,
        221,
        2066,
        1260,
        1258,
        1252,
        231,
        1248,
        229,
        1266,
        1264,
        1261,
        1268,
        155,
        1998,
        153,
        1996,
        1994,
        1991,
        1988,
        165,
        164,
        2007,
        162,
        2006,
        159,
        2003,
        2e3,
        172,
        171,
        169,
        2012,
        166,
        2010,
        1186,
        1184,
        1182,
        1179,
        175,
        1176,
        173,
        1192,
        1191,
        1189,
        1187,
        176,
        1194,
        1193,
        2313,
        2307,
        2305,
        592,
        589,
        2294,
        2292,
        2289,
        578,
        572,
        568,
        2297,
        580,
        1591,
        2272,
        2267,
        2264,
        1547,
        538,
        536,
        529,
        2278,
        525,
        2275,
        547,
        544,
        541,
        1574,
        1571,
        2237,
        2235,
        2229,
        1493,
        2225,
        1489,
        478,
        2247,
        470,
        2244,
        465,
        2241,
        493,
        488,
        484,
        2250,
        498,
        495,
        1536,
        1533,
        1530,
        1539,
        2187,
        2186,
        2184,
        2182,
        1432,
        2179,
        1430,
        2176,
        1427,
        414,
        412,
        2197,
        409,
        2195,
        405,
        2193,
        2190,
        426,
        424,
        421,
        2203,
        418,
        2201,
        431,
        429,
        1473,
        1471,
        1469,
        1466,
        434,
        1477,
        1475,
        2478,
        2472,
        2470,
        2459,
        2457,
        2454,
        2462,
        803,
        2437,
        2432,
        2429,
        1726,
        2443,
        2440,
        792,
        789,
        785,
        2401,
        2399,
        2393,
        1702,
        2389,
        1699,
        2411,
        2408,
        2405,
        745,
        741,
        2415,
        758,
        755,
        1721,
        2358,
        2357,
        2355,
        2353,
        1661,
        2350,
        1660,
        2347,
        1657,
        2368,
        2366,
        2364,
        2361,
        1666,
        690,
        687,
        2374,
        683,
        2372,
        701,
        698,
        705,
        1691,
        1689,
        2619,
        2617,
        2610,
        2608,
        2605,
        2613,
        2593,
        2588,
        2585,
        1803,
        2599,
        2596,
        2563,
        2561,
        2555,
        1797,
        2551,
        1795,
        2573,
        2570,
        2567,
        2577,
        2525,
        2524,
        2522,
        2520,
        1786,
        2517,
        1785,
        2514,
        1783,
        2535,
        2533,
        2531,
        2528,
        1788,
        2541,
        2539,
        906,
        903,
        911,
        2721,
        1844,
        2715,
        2712,
        1838,
        1836,
        2699,
        2696,
        2693,
        2703,
        1827,
        1826,
        1824,
        2673,
        2671,
        2669,
        2666,
        1829,
        2679,
        2677,
        1858,
        1857,
        2772,
        1854,
        1853,
        1851,
        1856,
        2766,
        2764,
        143,
        1987,
        139,
        1986,
        135,
        133,
        131,
        1984,
        128,
        1983,
        125,
        1981,
        138,
        137,
        136,
        1985,
        1133,
        1132,
        1130,
        112,
        110,
        1974,
        107,
        1973,
        104,
        1971,
        1969,
        122,
        121,
        119,
        117,
        1977,
        114,
        1976,
        124,
        1115,
        1114,
        1112,
        1110,
        1117,
        1116,
        84,
        83,
        1953,
        81,
        1952,
        78,
        1950,
        1948,
        1945,
        94,
        93,
        91,
        1959,
        88,
        1958,
        85,
        1955,
        99,
        97,
        95,
        1961,
        1086,
        1085,
        1083,
        1081,
        1078,
        100,
        1090,
        1089,
        1087,
        1091,
        49,
        47,
        1917,
        44,
        1915,
        1913,
        1910,
        1907,
        59,
        1926,
        56,
        1925,
        53,
        1922,
        1919,
        66,
        64,
        1931,
        61,
        1929,
        1042,
        1040,
        1038,
        71,
        1035,
        70,
        1032,
        68,
        1048,
        1047,
        1045,
        1043,
        1050,
        1049,
        12,
        10,
        1869,
        1867,
        1864,
        1861,
        21,
        1880,
        19,
        1877,
        1874,
        1871,
        28,
        1888,
        25,
        1886,
        22,
        1883,
        982,
        980,
        977,
        974,
        32,
        30,
        991,
        989,
        987,
        984,
        34,
        995,
        994,
        992,
        2151,
        2150,
        2147,
        2146,
        2144,
        356,
        355,
        354,
        2149,
        2139,
        2138,
        2136,
        2134,
        1359,
        343,
        341,
        338,
        2143,
        335,
        2141,
        348,
        347,
        346,
        1376,
        1374,
        2124,
        2123,
        2121,
        2119,
        1326,
        2116,
        1324,
        310,
        308,
        305,
        2131,
        302,
        2129,
        298,
        2127,
        320,
        318,
        316,
        313,
        2133,
        322,
        321,
        1355,
        1353,
        1351,
        1357,
        2092,
        2091,
        2089,
        2087,
        1276,
        2084,
        1274,
        2081,
        1271,
        259,
        2102,
        256,
        2100,
        252,
        2098,
        2095,
        272,
        269,
        2108,
        266,
        2106,
        281,
        279,
        277,
        1317,
        1315,
        1313,
        1310,
        282,
        1321,
        1319,
        2039,
        2037,
        2035,
        2032,
        1203,
        2029,
        1200,
        1197,
        207,
        2053,
        205,
        2051,
        201,
        2049,
        2046,
        2043,
        220,
        218,
        2064,
        215,
        2062,
        211,
        2059,
        228,
        226,
        223,
        2069,
        1259,
        1257,
        1254,
        232,
        1251,
        230,
        1267,
        1265,
        1263,
        2316,
        2315,
        2312,
        2311,
        2309,
        2314,
        2304,
        2303,
        2301,
        2299,
        1593,
        2308,
        2306,
        590,
        2288,
        2287,
        2285,
        2283,
        1578,
        2280,
        1577,
        2295,
        2293,
        2291,
        579,
        577,
        574,
        571,
        2298,
        582,
        581,
        1592,
        2263,
        2262,
        2260,
        2258,
        1545,
        2255,
        1544,
        2252,
        1541,
        2273,
        2271,
        2269,
        2266,
        1550,
        535,
        532,
        2279,
        528,
        2277,
        546,
        543,
        549,
        1575,
        1573,
        2224,
        2222,
        2220,
        1486,
        2217,
        1485,
        2214,
        1482,
        1479,
        2238,
        2236,
        2234,
        2231,
        1496,
        2228,
        1492,
        480,
        477,
        2248,
        473,
        2246,
        469,
        2243,
        490,
        487,
        2251,
        497,
        1537,
        1535,
        1532,
        2477,
        2476,
        2474,
        2479,
        2469,
        2468,
        2466,
        2464,
        1730,
        2473,
        2471,
        2453,
        2452,
        2450,
        2448,
        1729,
        2445,
        1728,
        2460,
        2458,
        2456,
        2463,
        805,
        804,
        2428,
        2427,
        2425,
        2423,
        1725,
        2420,
        1724,
        2417,
        1722,
        2438,
        2436,
        2434,
        2431,
        1727,
        2444,
        2442,
        793,
        791,
        788,
        795,
        2388,
        2386,
        2384,
        1697,
        2381,
        1696,
        2378,
        1694,
        1692,
        2402,
        2400,
        2398,
        2395,
        1703,
        2392,
        1701,
        2412,
        2410,
        2407,
        751,
        748,
        744,
        2416,
        759,
        757,
        1807,
        2620,
        2618,
        1806,
        1805,
        2611,
        2609,
        2607,
        2614,
        1802,
        1801,
        1799,
        2594,
        2592,
        2590,
        2587,
        1804,
        2600,
        2598,
        1794,
        1793,
        1791,
        1789,
        2564,
        2562,
        2560,
        2557,
        1798,
        2554,
        1796,
        2574,
        2572,
        2569,
        2578,
        1847,
        1846,
        2722,
        1843,
        1842,
        1840,
        1845,
        2716,
        2714,
        1835,
        1834,
        1832,
        1830,
        1839,
        1837,
        2700,
        2698,
        2695,
        2704,
        1817,
        1811,
        1810,
        897,
        862,
        1777,
        829,
        826,
        838,
        1760,
        1758,
        808,
        2481,
        1741,
        1740,
        1738,
        1743,
        2624,
        1818,
        2726,
        2776,
        782,
        740,
        737,
        1715,
        686,
        679,
        695,
        1682,
        1680,
        639,
        628,
        2339,
        647,
        644,
        1645,
        1643,
        1640,
        1648,
        602,
        600,
        597,
        595,
        2320,
        593,
        2318,
        609,
        607,
        604,
        1611,
        1610,
        1608,
        1606,
        613,
        1615,
        1613,
        2328,
        926,
        924,
        892,
        886,
        899,
        857,
        850,
        2505,
        1778,
        824,
        823,
        821,
        819,
        2488,
        818,
        2486,
        833,
        831,
        828,
        840,
        1761,
        1759,
        2649,
        2632,
        2630,
        2746,
        2734,
        2732,
        2782,
        2781,
        570,
        567,
        1587,
        531,
        527,
        523,
        540,
        1566,
        1564,
        476,
        467,
        463,
        2240,
        486,
        483,
        1524,
        1521,
        1518,
        1529,
        411,
        403,
        2192,
        399,
        2189,
        423,
        416,
        1462,
        1457,
        1454,
        428,
        1468,
        1465,
        2210,
        366,
        363,
        2158,
        360,
        2156,
        357,
        2153,
        376,
        373,
        370,
        2163,
        1410,
        1409,
        1407,
        1405,
        382,
        1402,
        380,
        1417,
        1415,
        1412,
        1421,
        2175,
        2174,
        777,
        774,
        771,
        784,
        732,
        725,
        722,
        2404,
        743,
        1716,
        676,
        674,
        668,
        2363,
        665,
        2360,
        685,
        1684,
        1681,
        626,
        624,
        622,
        2335,
        620,
        2333,
        617,
        2330,
        641,
        635,
        649,
        1646,
        1644,
        1642,
        2566,
        928,
        925,
        2530,
        2527,
        894,
        891,
        888,
        2501,
        2499,
        2496,
        858,
        856,
        854,
        851,
        1779,
        2692,
        2668,
        2665,
        2645,
        2643,
        2640,
        2651,
        2768,
        2759,
        2757,
        2744,
        2743,
        2741,
        2748,
        352,
        1382,
        340,
        337,
        333,
        1371,
        1369,
        307,
        300,
        296,
        2126,
        315,
        312,
        1347,
        1342,
        1350,
        261,
        258,
        250,
        2097,
        246,
        2094,
        271,
        268,
        264,
        1306,
        1301,
        1298,
        276,
        1312,
        1309,
        2115,
        203,
        2048,
        195,
        2045,
        191,
        2041,
        213,
        209,
        2056,
        1246,
        1244,
        1238,
        225,
        1234,
        222,
        1256,
        1253,
        1249,
        1262,
        2080,
        2079,
        154,
        1997,
        150,
        1995,
        147,
        1992,
        1989,
        163,
        160,
        2004,
        156,
        2001,
        1175,
        1174,
        1172,
        1170,
        1167,
        170,
        1164,
        167,
        1185,
        1183,
        1180,
        1177,
        174,
        1190,
        1188,
        2025,
        2024,
        2022,
        587,
        586,
        564,
        559,
        556,
        2290,
        573,
        1588,
        520,
        518,
        512,
        2268,
        508,
        2265,
        530,
        1568,
        1565,
        461,
        457,
        2233,
        450,
        2230,
        446,
        2226,
        479,
        471,
        489,
        1526,
        1523,
        1520,
        397,
        395,
        2185,
        392,
        2183,
        389,
        2180,
        2177,
        410,
        2194,
        402,
        422,
        1463,
        1461,
        1459,
        1456,
        1470,
        2455,
        799,
        2433,
        2430,
        779,
        776,
        773,
        2397,
        2394,
        2390,
        734,
        728,
        724,
        746,
        1717,
        2356,
        2354,
        2351,
        2348,
        1658,
        677,
        675,
        673,
        670,
        667,
        688,
        1685,
        1683,
        2606,
        2589,
        2586,
        2559,
        2556,
        2552,
        927,
        2523,
        2521,
        2518,
        2515,
        1784,
        2532,
        895,
        893,
        890,
        2718,
        2709,
        2707,
        2689,
        2687,
        2684,
        2663,
        2662,
        2660,
        2658,
        1825,
        2667,
        2769,
        1852,
        2760,
        2758,
        142,
        141,
        1139,
        1138,
        134,
        132,
        129,
        126,
        1982,
        1129,
        1128,
        1126,
        1131,
        113,
        111,
        108,
        105,
        1972,
        101,
        1970,
        120,
        118,
        115,
        1109,
        1108,
        1106,
        1104,
        123,
        1113,
        1111,
        82,
        79,
        1951,
        75,
        1949,
        72,
        1946,
        92,
        89,
        86,
        1956,
        1077,
        1076,
        1074,
        1072,
        98,
        1069,
        96,
        1084,
        1082,
        1079,
        1088,
        1968,
        1967,
        48,
        45,
        1916,
        42,
        1914,
        39,
        1911,
        1908,
        60,
        57,
        54,
        1923,
        50,
        1920,
        1031,
        1030,
        1028,
        1026,
        67,
        1023,
        65,
        1020,
        62,
        1041,
        1039,
        1036,
        1033,
        69,
        1046,
        1044,
        1944,
        1943,
        1941,
        11,
        9,
        1868,
        7,
        1865,
        1862,
        1859,
        20,
        1878,
        16,
        1875,
        13,
        1872,
        970,
        968,
        966,
        963,
        29,
        960,
        26,
        23,
        983,
        981,
        978,
        975,
        33,
        971,
        31,
        990,
        988,
        985,
        1906,
        1904,
        1902,
        993,
        351,
        2145,
        1383,
        331,
        330,
        328,
        326,
        2137,
        323,
        2135,
        339,
        1372,
        1370,
        294,
        293,
        291,
        289,
        2122,
        286,
        2120,
        283,
        2117,
        309,
        303,
        317,
        1348,
        1346,
        1344,
        245,
        244,
        242,
        2090,
        239,
        2088,
        236,
        2085,
        2082,
        260,
        2099,
        249,
        270,
        1307,
        1305,
        1303,
        1300,
        1314,
        189,
        2038,
        186,
        2036,
        183,
        2033,
        2030,
        2026,
        206,
        198,
        2047,
        194,
        216,
        1247,
        1245,
        1243,
        1240,
        227,
        1237,
        1255,
        2310,
        2302,
        2300,
        2286,
        2284,
        2281,
        565,
        563,
        561,
        558,
        575,
        1589,
        2261,
        2259,
        2256,
        2253,
        1542,
        521,
        519,
        517,
        514,
        2270,
        511,
        533,
        1569,
        1567,
        2223,
        2221,
        2218,
        2215,
        1483,
        2211,
        1480,
        459,
        456,
        453,
        2232,
        449,
        474,
        491,
        1527,
        1525,
        1522,
        2475,
        2467,
        2465,
        2451,
        2449,
        2446,
        801,
        800,
        2426,
        2424,
        2421,
        2418,
        1723,
        2435,
        780,
        778,
        775,
        2387,
        2385,
        2382,
        2379,
        1695,
        2375,
        1693,
        2396,
        735,
        733,
        730,
        727,
        749,
        1718,
        2616,
        2615,
        2604,
        2603,
        2601,
        2584,
        2583,
        2581,
        2579,
        1800,
        2591,
        2550,
        2549,
        2547,
        2545,
        1792,
        2542,
        1790,
        2558,
        929,
        2719,
        1841,
        2710,
        2708,
        1833,
        1831,
        2690,
        2688,
        2686,
        1815,
        1809,
        1808,
        1774,
        1756,
        1754,
        1737,
        1736,
        1734,
        1739,
        1816,
        1711,
        1676,
        1674,
        633,
        629,
        1638,
        1636,
        1633,
        1641,
        598,
        1605,
        1604,
        1602,
        1600,
        605,
        1609,
        1607,
        2327,
        887,
        853,
        1775,
        822,
        820,
        1757,
        1755,
        1584,
        524,
        1560,
        1558,
        468,
        464,
        1514,
        1511,
        1508,
        1519,
        408,
        404,
        400,
        1452,
        1447,
        1444,
        417,
        1458,
        1455,
        2208,
        364,
        361,
        358,
        2154,
        1401,
        1400,
        1398,
        1396,
        374,
        1393,
        371,
        1408,
        1406,
        1403,
        1413,
        2173,
        2172,
        772,
        726,
        723,
        1712,
        672,
        669,
        666,
        682,
        1678,
        1675,
        625,
        623,
        621,
        618,
        2331,
        636,
        632,
        1639,
        1637,
        1635,
        920,
        918,
        884,
        880,
        889,
        849,
        848,
        847,
        846,
        2497,
        855,
        852,
        1776,
        2641,
        2742,
        2787,
        1380,
        334,
        1367,
        1365,
        301,
        297,
        1340,
        1338,
        1335,
        1343,
        255,
        251,
        247,
        1296,
        1291,
        1288,
        265,
        1302,
        1299,
        2113,
        204,
        196,
        192,
        2042,
        1232,
        1230,
        1224,
        214,
        1220,
        210,
        1242,
        1239,
        1235,
        1250,
        2077,
        2075,
        151,
        148,
        1993,
        144,
        1990,
        1163,
        1162,
        1160,
        1158,
        1155,
        161,
        1152,
        157,
        1173,
        1171,
        1168,
        1165,
        168,
        1181,
        1178,
        2021,
        2020,
        2018,
        2023,
        585,
        560,
        557,
        1585,
        516,
        509,
        1562,
        1559,
        458,
        447,
        2227,
        472,
        1516,
        1513,
        1510,
        398,
        396,
        393,
        390,
        2181,
        386,
        2178,
        407,
        1453,
        1451,
        1449,
        1446,
        420,
        1460,
        2209,
        769,
        764,
        720,
        712,
        2391,
        729,
        1713,
        664,
        663,
        661,
        659,
        2352,
        656,
        2349,
        671,
        1679,
        1677,
        2553,
        922,
        919,
        2519,
        2516,
        885,
        883,
        881,
        2685,
        2661,
        2659,
        2767,
        2756,
        2755,
        140,
        1137,
        1136,
        130,
        127,
        1125,
        1124,
        1122,
        1127,
        109,
        106,
        102,
        1103,
        1102,
        1100,
        1098,
        116,
        1107,
        1105,
        1980,
        80,
        76,
        73,
        1947,
        1068,
        1067,
        1065,
        1063,
        90,
        1060,
        87,
        1075,
        1073,
        1070,
        1080,
        1966,
        1965,
        46,
        43,
        40,
        1912,
        36,
        1909,
        1019,
        1018,
        1016,
        1014,
        58,
        1011,
        55,
        1008,
        51,
        1029,
        1027,
        1024,
        1021,
        63,
        1037,
        1034,
        1940,
        1939,
        1937,
        1942,
        8,
        1866,
        4,
        1863,
        1,
        1860,
        956,
        954,
        952,
        949,
        946,
        17,
        14,
        969,
        967,
        964,
        961,
        27,
        957,
        24,
        979,
        976,
        972,
        1901,
        1900,
        1898,
        1896,
        986,
        1905,
        1903,
        350,
        349,
        1381,
        329,
        327,
        324,
        1368,
        1366,
        292,
        290,
        287,
        284,
        2118,
        304,
        1341,
        1339,
        1337,
        1345,
        243,
        240,
        237,
        2086,
        233,
        2083,
        254,
        1297,
        1295,
        1293,
        1290,
        1304,
        2114,
        190,
        187,
        184,
        2034,
        180,
        2031,
        177,
        2027,
        199,
        1233,
        1231,
        1229,
        1226,
        217,
        1223,
        1241,
        2078,
        2076,
        584,
        555,
        554,
        552,
        550,
        2282,
        562,
        1586,
        507,
        506,
        504,
        502,
        2257,
        499,
        2254,
        515,
        1563,
        1561,
        445,
        443,
        441,
        2219,
        438,
        2216,
        435,
        2212,
        460,
        454,
        475,
        1517,
        1515,
        1512,
        2447,
        798,
        797,
        2422,
        2419,
        770,
        768,
        766,
        2383,
        2380,
        2376,
        721,
        719,
        717,
        714,
        731,
        1714,
        2602,
        2582,
        2580,
        2548,
        2546,
        2543,
        923,
        921,
        2717,
        2706,
        2705,
        2683,
        2682,
        2680,
        1771,
        1752,
        1750,
        1733,
        1732,
        1731,
        1735,
        1814,
        1707,
        1670,
        1668,
        1631,
        1629,
        1626,
        1634,
        1599,
        1598,
        1596,
        1594,
        1603,
        1601,
        2326,
        1772,
        1753,
        1751,
        1581,
        1554,
        1552,
        1504,
        1501,
        1498,
        1509,
        1442,
        1437,
        1434,
        401,
        1448,
        1445,
        2206,
        1392,
        1391,
        1389,
        1387,
        1384,
        359,
        1399,
        1397,
        1394,
        1404,
        2171,
        2170,
        1708,
        1672,
        1669,
        619,
        1632,
        1630,
        1628,
        1773,
        1378,
        1363,
        1361,
        1333,
        1328,
        1336,
        1286,
        1281,
        1278,
        248,
        1292,
        1289,
        2111,
        1218,
        1216,
        1210,
        197,
        1206,
        193,
        1228,
        1225,
        1221,
        1236,
        2073,
        2071,
        1151,
        1150,
        1148,
        1146,
        152,
        1143,
        149,
        1140,
        145,
        1161,
        1159,
        1156,
        1153,
        158,
        1169,
        1166,
        2017,
        2016,
        2014,
        2019,
        1582,
        510,
        1556,
        1553,
        452,
        448,
        1506,
        1500,
        394,
        391,
        387,
        1443,
        1441,
        1439,
        1436,
        1450,
        2207,
        765,
        716,
        713,
        1709,
        662,
        660,
        657,
        1673,
        1671,
        916,
        914,
        879,
        878,
        877,
        882,
        1135,
        1134,
        1121,
        1120,
        1118,
        1123,
        1097,
        1096,
        1094,
        1092,
        103,
        1101,
        1099,
        1979,
        1059,
        1058,
        1056,
        1054,
        77,
        1051,
        74,
        1066,
        1064,
        1061,
        1071,
        1964,
        1963,
        1007,
        1006,
        1004,
        1002,
        999,
        41,
        996,
        37,
        1017,
        1015,
        1012,
        1009,
        52,
        1025,
        1022,
        1936,
        1935,
        1933,
        1938,
        942,
        940,
        938,
        935,
        932,
        5,
        2,
        955,
        953,
        950,
        947,
        18,
        943,
        15,
        965,
        962,
        958,
        1895,
        1894,
        1892,
        1890,
        973,
        1899,
        1897,
        1379,
        325,
        1364,
        1362,
        288,
        285,
        1334,
        1332,
        1330,
        241,
        238,
        234,
        1287,
        1285,
        1283,
        1280,
        1294,
        2112,
        188,
        185,
        181,
        178,
        2028,
        1219,
        1217,
        1215,
        1212,
        200,
        1209,
        1227,
        2074,
        2072,
        583,
        553,
        551,
        1583,
        505,
        503,
        500,
        513,
        1557,
        1555,
        444,
        442,
        439,
        436,
        2213,
        455,
        451,
        1507,
        1505,
        1502,
        796,
        763,
        762,
        760,
        767,
        711,
        710,
        708,
        706,
        2377,
        718,
        715,
        1710,
        2544,
        917,
        915,
        2681,
        1627,
        1597,
        1595,
        2325,
        1769,
        1749,
        1747,
        1499,
        1438,
        1435,
        2204,
        1390,
        1388,
        1385,
        1395,
        2169,
        2167,
        1704,
        1665,
        1662,
        1625,
        1623,
        1620,
        1770,
        1329,
        1282,
        1279,
        2109,
        1214,
        1207,
        1222,
        2068,
        2065,
        1149,
        1147,
        1144,
        1141,
        146,
        1157,
        1154,
        2013,
        2011,
        2008,
        2015,
        1579,
        1549,
        1546,
        1495,
        1487,
        1433,
        1431,
        1428,
        1425,
        388,
        1440,
        2205,
        1705,
        658,
        1667,
        1664,
        1119,
        1095,
        1093,
        1978,
        1057,
        1055,
        1052,
        1062,
        1962,
        1960,
        1005,
        1003,
        1e3,
        997,
        38,
        1013,
        1010,
        1932,
        1930,
        1927,
        1934,
        941,
        939,
        936,
        933,
        6,
        930,
        3,
        951,
        948,
        944,
        1889,
        1887,
        1884,
        1881,
        959,
        1893,
        1891,
        35,
        1377,
        1360,
        1358,
        1327,
        1325,
        1322,
        1331,
        1277,
        1275,
        1272,
        1269,
        235,
        1284,
        2110,
        1205,
        1204,
        1201,
        1198,
        182,
        1195,
        179,
        1213,
        2070,
        2067,
        1580,
        501,
        1551,
        1548,
        440,
        437,
        1497,
        1494,
        1490,
        1503,
        761,
        709,
        707,
        1706,
        913,
        912,
        2198,
        1386,
        2164,
        2161,
        1621,
        1766,
        2103,
        1208,
        2058,
        2054,
        1145,
        1142,
        2005,
        2002,
        1999,
        2009,
        1488,
        1429,
        1426,
        2200,
        1698,
        1659,
        1656,
        1975,
        1053,
        1957,
        1954,
        1001,
        998,
        1924,
        1921,
        1918,
        1928,
        937,
        934,
        931,
        1879,
        1876,
        1873,
        1870,
        945,
        1885,
        1882,
        1323,
        1273,
        1270,
        2105,
        1202,
        1199,
        1196,
        1211,
        2061,
        2057,
        1576,
        1543,
        1540,
        1484,
        1481,
        1478,
        1491,
        1700
      ]);
      class $i {
        constructor(e, t) {
          this.bits = e, this.points = t;
        }
        getBits() {
          return this.bits;
        }
        getPoints() {
          return this.points;
        }
      }
      class ee {
        /**
         * <p>Detects a PDF417 Code in an image. Only checks 0 and 180 degree rotations.</p>
         *
         * @param image barcode image to decode
         * @param hints optional hints to detector
         * @param multiple if true, then the image is searched for multiple codes. If false, then at most one code will
         * be found and returned
         * @return {@link PDF417DetectorResult} encapsulating results of detecting a PDF417 code
         * @throws NotFoundException if no PDF417 Code can be found
         */
        static detectMultiple(e, t, n) {
          let r = e.getBlackMatrix(), i = ee.detect(n, r);
          return i.length || (r = r.clone(), r.rotate180(), i = ee.detect(n, r)), new $i(r, i);
        }
        /**
         * Detects PDF417 codes in an image. Only checks 0 degree rotation
         * @param multiple if true, then the image is searched for multiple codes. If false, then at most one code will
         * be found and returned
         * @param bitMatrix bit matrix to detect barcodes in
         * @return List of ResultPoint arrays containing the coordinates of found barcodes
         */
        static detect(e, t) {
          const n = new Array();
          let r = 0, i = 0, s = !1;
          for (; r < t.getHeight(); ) {
            const o = ee.findVertices(t, r, i);
            if (o[0] == null && o[3] == null) {
              if (!s)
                break;
              s = !1, i = 0;
              for (const a of n)
                a[1] != null && (r = Math.trunc(Math.max(r, a[1].getY()))), a[3] != null && (r = Math.max(r, Math.trunc(a[3].getY())));
              r += ee.ROW_STEP;
              continue;
            }
            if (s = !0, n.push(o), !e)
              break;
            o[2] != null ? (i = Math.trunc(o[2].getX()), r = Math.trunc(o[2].getY())) : (i = Math.trunc(o[4].getX()), r = Math.trunc(o[4].getY()));
          }
          return n;
        }
        /**
         * Locate the vertices and the codewords area of a black blob using the Start
         * and Stop patterns as locators.
         *
         * @param matrix the scanned barcode image.
         * @return an array containing the vertices:
         *           vertices[0] x, y top left barcode
         *           vertices[1] x, y bottom left barcode
         *           vertices[2] x, y top right barcode
         *           vertices[3] x, y bottom right barcode
         *           vertices[4] x, y top left codeword area
         *           vertices[5] x, y bottom left codeword area
         *           vertices[6] x, y top right codeword area
         *           vertices[7] x, y bottom right codeword area
         */
        static findVertices(e, t, n) {
          const r = e.getHeight(), i = e.getWidth(), s = new Array(8);
          return ee.copyToResult(s, ee.findRowsWithPattern(e, r, i, t, n, ee.START_PATTERN), ee.INDEXES_START_PATTERN), s[4] != null && (n = Math.trunc(s[4].getX()), t = Math.trunc(s[4].getY())), ee.copyToResult(s, ee.findRowsWithPattern(e, r, i, t, n, ee.STOP_PATTERN), ee.INDEXES_STOP_PATTERN), s;
        }
        static copyToResult(e, t, n) {
          for (let r = 0; r < n.length; r++)
            e[n[r]] = t[r];
        }
        static findRowsWithPattern(e, t, n, r, i, s) {
          const o = new Array(4);
          let a = !1;
          const l = new Int32Array(s.length);
          for (; r < t; r += ee.ROW_STEP) {
            let d = ee.findGuardPattern(e, i, r, n, !1, s, l);
            if (d != null) {
              for (; r > 0; ) {
                const A = ee.findGuardPattern(e, i, --r, n, !1, s, l);
                if (A != null)
                  d = A;
                else {
                  r++;
                  break;
                }
              }
              o[0] = new W(d[0], r), o[1] = new W(d[1], r), a = !0;
              break;
            }
          }
          let u = r + 1;
          if (a) {
            let d = 0, A = Int32Array.from([Math.trunc(o[0].getX()), Math.trunc(o[1].getX())]);
            for (; u < t; u++) {
              const p = ee.findGuardPattern(e, A[0], u, n, !1, s, l);
              if (p != null && Math.abs(A[0] - p[0]) < ee.MAX_PATTERN_DRIFT && Math.abs(A[1] - p[1]) < ee.MAX_PATTERN_DRIFT)
                A = p, d = 0;
              else {
                if (d > ee.SKIPPED_ROW_COUNT_MAX)
                  break;
                d++;
              }
            }
            u -= d + 1, o[2] = new W(A[0], u), o[3] = new W(A[1], u);
          }
          return u - r < ee.BARCODE_MIN_HEIGHT && pe.fill(o, null), o;
        }
        /**
         * @param matrix row of black/white values to search
         * @param column x position to start search
         * @param row y position to start search
         * @param width the number of pixels to search on this row
         * @param pattern pattern of counts of number of black and white pixels that are
         *                 being searched for as a pattern
         * @param counters array of counters, as long as pattern, to re-use
         * @return start/end horizontal offset of guard pattern, as an array of two ints.
         */
        static findGuardPattern(e, t, n, r, i, s, o) {
          pe.fillWithin(o, 0, o.length, 0);
          let a = t, l = 0;
          for (; e.get(a, n) && a > 0 && l++ < ee.MAX_PIXEL_DRIFT; )
            a--;
          let u = a, d = 0, A = s.length;
          for (let p = i; u < r; u++)
            if (e.get(u, n) !== p)
              o[d]++;
            else {
              if (d === A - 1) {
                if (ee.patternMatchVariance(o, s, ee.MAX_INDIVIDUAL_VARIANCE) < ee.MAX_AVG_VARIANCE)
                  return new Int32Array([a, u]);
                a += o[0] + o[1], ie.arraycopy(o, 2, o, 0, d - 1), o[d - 1] = 0, o[d] = 0, d--;
              } else
                d++;
              o[d] = 1, p = !p;
            }
          return d === A - 1 && ee.patternMatchVariance(o, s, ee.MAX_INDIVIDUAL_VARIANCE) < ee.MAX_AVG_VARIANCE ? new Int32Array([a, u - 1]) : null;
        }
        /**
         * Determines how closely a set of observed counts of runs of black/white
         * values matches a given target pattern. This is reported as the ratio of
         * the total variance from the expected pattern proportions across all
         * pattern elements, to the length of the pattern.
         *
         * @param counters observed counters
         * @param pattern expected pattern
         * @param maxIndividualVariance The most any counter can differ before we give up
         * @return ratio of total variance between counters and pattern compared to total pattern size
         */
        static patternMatchVariance(e, t, n) {
          let r = e.length, i = 0, s = 0;
          for (let l = 0; l < r; l++)
            i += e[l], s += t[l];
          if (i < s)
            return (
              /*Float.POSITIVE_INFINITY*/
              1 / 0
            );
          let o = i / s;
          n *= o;
          let a = 0;
          for (let l = 0; l < r; l++) {
            let u = e[l], d = t[l] * o, A = u > d ? u - d : d - u;
            if (A > n)
              return (
                /*Float.POSITIVE_INFINITY*/
                1 / 0
              );
            a += A;
          }
          return a / i;
        }
      }
      ee.INDEXES_START_PATTERN = Int32Array.from([0, 4, 1, 5]), ee.INDEXES_STOP_PATTERN = Int32Array.from([6, 2, 7, 3]), ee.MAX_AVG_VARIANCE = 0.42, ee.MAX_INDIVIDUAL_VARIANCE = 0.8, ee.START_PATTERN = Int32Array.from([8, 1, 1, 1, 1, 1, 1, 3]), ee.STOP_PATTERN = Int32Array.from([7, 1, 1, 3, 1, 1, 1, 2, 1]), ee.MAX_PIXEL_DRIFT = 3, ee.MAX_PATTERN_DRIFT = 5, ee.SKIPPED_ROW_COUNT_MAX = 25, ee.ROW_STEP = 5, ee.BARCODE_MIN_HEIGHT = 10;
      class Xe {
        constructor(e, t) {
          if (t.length === 0)
            throw new R();
          this.field = e;
          let n = (
            /*int*/
            t.length
          );
          if (n > 1 && t[0] === 0) {
            let r = (
              /*int*/
              1
            );
            for (; r < n && t[r] === 0; )
              r++;
            r === n ? this.coefficients = new Int32Array([0]) : (this.coefficients = new Int32Array(n - r), ie.arraycopy(t, r, this.coefficients, 0, this.coefficients.length));
          } else
            this.coefficients = t;
        }
        getCoefficients() {
          return this.coefficients;
        }
        /**
         * @return degree of this polynomial
         */
        getDegree() {
          return this.coefficients.length - 1;
        }
        /**
         * @return true iff this polynomial is the monomial "0"
         */
        isZero() {
          return this.coefficients[0] === 0;
        }
        /**
         * @return coefficient of x^degree term in this polynomial
         */
        getCoefficient(e) {
          return this.coefficients[this.coefficients.length - 1 - e];
        }
        /**
         * @return evaluation of this polynomial at a given point
         */
        evaluateAt(e) {
          if (e === 0)
            return this.getCoefficient(0);
          if (e === 1) {
            let r = (
              /*int*/
              0
            );
            for (let i of this.coefficients)
              r = this.field.add(r, i);
            return r;
          }
          let t = (
            /*int*/
            this.coefficients[0]
          ), n = (
            /*int*/
            this.coefficients.length
          );
          for (let r = 1; r < n; r++)
            t = this.field.add(this.field.multiply(e, t), this.coefficients[r]);
          return t;
        }
        add(e) {
          if (!this.field.equals(e.field))
            throw new R("ModulusPolys do not have same ModulusGF field");
          if (this.isZero())
            return e;
          if (e.isZero())
            return this;
          let t = this.coefficients, n = e.coefficients;
          if (t.length > n.length) {
            let s = t;
            t = n, n = s;
          }
          let r = new Int32Array(n.length), i = (
            /*int*/
            n.length - t.length
          );
          ie.arraycopy(n, 0, r, 0, i);
          for (let s = i; s < n.length; s++)
            r[s] = this.field.add(t[s - i], n[s]);
          return new Xe(this.field, r);
        }
        subtract(e) {
          if (!this.field.equals(e.field))
            throw new R("ModulusPolys do not have same ModulusGF field");
          return e.isZero() ? this : this.add(e.negative());
        }
        multiply(e) {
          return e instanceof Xe ? this.multiplyOther(e) : this.multiplyScalar(e);
        }
        multiplyOther(e) {
          if (!this.field.equals(e.field))
            throw new R("ModulusPolys do not have same ModulusGF field");
          if (this.isZero() || e.isZero())
            return new Xe(this.field, new Int32Array([0]));
          let t = this.coefficients, n = (
            /*int*/
            t.length
          ), r = e.coefficients, i = (
            /*int*/
            r.length
          ), s = new Int32Array(n + i - 1);
          for (let o = 0; o < n; o++) {
            let a = (
              /*int*/
              t[o]
            );
            for (let l = 0; l < i; l++)
              s[o + l] = this.field.add(s[o + l], this.field.multiply(a, r[l]));
          }
          return new Xe(this.field, s);
        }
        negative() {
          let e = (
            /*int*/
            this.coefficients.length
          ), t = new Int32Array(e);
          for (let n = 0; n < e; n++)
            t[n] = this.field.subtract(0, this.coefficients[n]);
          return new Xe(this.field, t);
        }
        multiplyScalar(e) {
          if (e === 0)
            return new Xe(this.field, new Int32Array([0]));
          if (e === 1)
            return this;
          let t = (
            /*int*/
            this.coefficients.length
          ), n = new Int32Array(t);
          for (let r = 0; r < t; r++)
            n[r] = this.field.multiply(this.coefficients[r], e);
          return new Xe(this.field, n);
        }
        multiplyByMonomial(e, t) {
          if (e < 0)
            throw new R();
          if (t === 0)
            return new Xe(this.field, new Int32Array([0]));
          let n = (
            /*int*/
            this.coefficients.length
          ), r = new Int32Array(n + e);
          for (let i = 0; i < n; i++)
            r[i] = this.field.multiply(this.coefficients[i], t);
          return new Xe(this.field, r);
        }
        /*
          ModulusPoly[] divide(other: ModulusPoly) {
            if (!field.equals(other.field)) {
              throw new IllegalArgumentException("ModulusPolys do not have same ModulusGF field");
            }
            if (other.isZero()) {
              throw new IllegalArgumentException("Divide by 0");
            }
        
            let quotient: ModulusPoly = field.getZero();
            let remainder: ModulusPoly = this;
        
            let denominatorLeadingTerm: /*int/ number = other.getCoefficient(other.getDegree());
            let inverseDenominatorLeadingTerm: /*int/ number = field.inverse(denominatorLeadingTerm);
        
            while (remainder.getDegree() >= other.getDegree() && !remainder.isZero()) {
              let degreeDifference: /*int/ number = remainder.getDegree() - other.getDegree();
              let scale: /*int/ number = field.multiply(remainder.getCoefficient(remainder.getDegree()), inverseDenominatorLeadingTerm);
              let term: ModulusPoly = other.multiplyByMonomial(degreeDifference, scale);
              let iterationQuotient: ModulusPoly = field.buildMonomial(degreeDifference, scale);
              quotient = quotient.add(iterationQuotient);
              remainder = remainder.subtract(term);
            }
        
            return new ModulusPoly[] { quotient, remainder };
          }
          */
        // @Override
        toString() {
          let e = new ge(
            /*8 * this.getDegree()*/
          );
          for (let t = this.getDegree(); t >= 0; t--) {
            let n = (
              /*int*/
              this.getCoefficient(t)
            );
            n !== 0 && (n < 0 ? (e.append(" - "), n = -n) : e.length() > 0 && e.append(" + "), (t === 0 || n !== 1) && e.append(n), t !== 0 && (t === 1 ? e.append("x") : (e.append("x^"), e.append(t))));
          }
          return e.toString();
        }
      }
      class Ji {
        add(e, t) {
          return (e + t) % this.modulus;
        }
        subtract(e, t) {
          return (this.modulus + e - t) % this.modulus;
        }
        exp(e) {
          return this.expTable[e];
        }
        log(e) {
          if (e === 0)
            throw new R();
          return this.logTable[e];
        }
        inverse(e) {
          if (e === 0)
            throw new Fn();
          return this.expTable[this.modulus - this.logTable[e] - 1];
        }
        multiply(e, t) {
          return e === 0 || t === 0 ? 0 : this.expTable[(this.logTable[e] + this.logTable[t]) % (this.modulus - 1)];
        }
        getSize() {
          return this.modulus;
        }
        equals(e) {
          return e === this;
        }
      }
      class mr extends Ji {
        // private /*final*/ modulus: /*int*/ number;
        constructor(e, t) {
          super(), this.modulus = e, this.expTable = new Int32Array(e), this.logTable = new Int32Array(e);
          let n = (
            /*int*/
            1
          );
          for (let r = 0; r < e; r++)
            this.expTable[r] = n, n = n * t % e;
          for (let r = 0; r < e - 1; r++)
            this.logTable[this.expTable[r]] = r;
          this.zero = new Xe(this, new Int32Array([0])), this.one = new Xe(this, new Int32Array([1]));
        }
        getZero() {
          return this.zero;
        }
        getOne() {
          return this.one;
        }
        buildMonomial(e, t) {
          if (e < 0)
            throw new R();
          if (t === 0)
            return this.zero;
          let n = new Int32Array(e + 1);
          return n[0] = t, new Xe(this, n);
        }
      }
      mr.PDF417_GF = new mr(j.NUMBER_OF_CODEWORDS, 3);
      class $r {
        constructor() {
          this.field = mr.PDF417_GF;
        }
        /**
         * @param received received codewords
         * @param numECCodewords number of those codewords used for EC
         * @param erasures location of erasures
         * @return number of errors
         * @throws ChecksumException if errors cannot be corrected, maybe because of too many errors
         */
        decode(e, t, n) {
          let r = new Xe(this.field, e), i = new Int32Array(t), s = !1;
          for (let I = t; I > 0; I--) {
            let y = r.evaluateAt(this.field.exp(I));
            i[t - I] = y, y !== 0 && (s = !0);
          }
          if (!s)
            return 0;
          let o = this.field.getOne();
          if (n != null)
            for (const I of n) {
              let y = this.field.exp(e.length - 1 - I), _ = new Xe(this.field, new Int32Array([this.field.subtract(0, y), 1]));
              o = o.multiply(_);
            }
          let a = new Xe(this.field, i), l = this.runEuclideanAlgorithm(this.field.buildMonomial(t, 1), a, t), u = l[0], d = l[1], A = this.findErrorLocations(u), p = this.findErrorMagnitudes(d, u, A);
          for (let I = 0; I < A.length; I++) {
            let y = e.length - 1 - this.field.log(A[I]);
            if (y < 0)
              throw q.getChecksumInstance();
            e[y] = this.field.subtract(e[y], p[I]);
          }
          return A.length;
        }
        /**
         *
         * @param ModulusPoly
         * @param a
         * @param ModulusPoly
         * @param b
         * @param int
         * @param R
         * @throws ChecksumException
         */
        runEuclideanAlgorithm(e, t, n) {
          if (e.getDegree() < t.getDegree()) {
            let A = e;
            e = t, t = A;
          }
          let r = e, i = t, s = this.field.getZero(), o = this.field.getOne();
          for (; i.getDegree() >= Math.round(n / 2); ) {
            let A = r, p = s;
            if (r = i, s = o, r.isZero())
              throw q.getChecksumInstance();
            i = A;
            let I = this.field.getZero(), y = r.getCoefficient(r.getDegree()), _ = this.field.inverse(y);
            for (; i.getDegree() >= r.getDegree() && !i.isZero(); ) {
              let N = i.getDegree() - r.getDegree(), L = this.field.multiply(i.getCoefficient(i.getDegree()), _);
              I = I.add(this.field.buildMonomial(N, L)), i = i.subtract(r.multiplyByMonomial(N, L));
            }
            o = I.multiply(s).subtract(p).negative();
          }
          let a = o.getCoefficient(0);
          if (a === 0)
            throw q.getChecksumInstance();
          let l = this.field.inverse(a), u = o.multiply(l), d = i.multiply(l);
          return [u, d];
        }
        /**
         *
         * @param errorLocator
         * @throws ChecksumException
         */
        findErrorLocations(e) {
          let t = e.getDegree(), n = new Int32Array(t), r = 0;
          for (let i = 1; i < this.field.getSize() && r < t; i++)
            e.evaluateAt(i) === 0 && (n[r] = this.field.inverse(i), r++);
          if (r !== t)
            throw q.getChecksumInstance();
          return n;
        }
        findErrorMagnitudes(e, t, n) {
          let r = t.getDegree(), i = new Int32Array(r);
          for (let l = 1; l <= r; l++)
            i[r - l] = this.field.multiply(l, t.getCoefficient(l));
          let s = new Xe(this.field, i), o = n.length, a = new Int32Array(o);
          for (let l = 0; l < o; l++) {
            let u = this.field.inverse(n[l]), d = this.field.subtract(0, e.evaluateAt(u)), A = this.field.inverse(s.evaluateAt(u));
            a[l] = this.field.multiply(d, A);
          }
          return a;
        }
      }
      class Wt {
        constructor(e, t, n, r, i) {
          e instanceof Wt ? this.constructor_2(e) : this.constructor_1(e, t, n, r, i);
        }
        /**
         *
         * @param image
         * @param topLeft
         * @param bottomLeft
         * @param topRight
         * @param bottomRight
         *
         * @throws NotFoundException
         */
        constructor_1(e, t, n, r, i) {
          const s = t == null || n == null, o = r == null || i == null;
          if (s && o)
            throw new D();
          s ? (t = new W(0, r.getY()), n = new W(0, i.getY())) : o && (r = new W(e.getWidth() - 1, t.getY()), i = new W(e.getWidth() - 1, n.getY())), this.image = e, this.topLeft = t, this.bottomLeft = n, this.topRight = r, this.bottomRight = i, this.minX = Math.trunc(Math.min(t.getX(), n.getX())), this.maxX = Math.trunc(Math.max(r.getX(), i.getX())), this.minY = Math.trunc(Math.min(t.getY(), r.getY())), this.maxY = Math.trunc(Math.max(n.getY(), i.getY()));
        }
        constructor_2(e) {
          this.image = e.image, this.topLeft = e.getTopLeft(), this.bottomLeft = e.getBottomLeft(), this.topRight = e.getTopRight(), this.bottomRight = e.getBottomRight(), this.minX = e.getMinX(), this.maxX = e.getMaxX(), this.minY = e.getMinY(), this.maxY = e.getMaxY();
        }
        /**
         * @throws NotFoundException
         */
        static merge(e, t) {
          return e == null ? t : t == null ? e : new Wt(e.image, e.topLeft, e.bottomLeft, t.topRight, t.bottomRight);
        }
        /**
         * @throws NotFoundException
         */
        addMissingRows(e, t, n) {
          let r = this.topLeft, i = this.bottomLeft, s = this.topRight, o = this.bottomRight;
          if (e > 0) {
            let a = n ? this.topLeft : this.topRight, l = Math.trunc(a.getY() - e);
            l < 0 && (l = 0);
            let u = new W(a.getX(), l);
            n ? r = u : s = u;
          }
          if (t > 0) {
            let a = n ? this.bottomLeft : this.bottomRight, l = Math.trunc(a.getY() + t);
            l >= this.image.getHeight() && (l = this.image.getHeight() - 1);
            let u = new W(a.getX(), l);
            n ? i = u : o = u;
          }
          return new Wt(this.image, r, i, s, o);
        }
        getMinX() {
          return this.minX;
        }
        getMaxX() {
          return this.maxX;
        }
        getMinY() {
          return this.minY;
        }
        getMaxY() {
          return this.maxY;
        }
        getTopLeft() {
          return this.topLeft;
        }
        getTopRight() {
          return this.topRight;
        }
        getBottomLeft() {
          return this.bottomLeft;
        }
        getBottomRight() {
          return this.bottomRight;
        }
      }
      class es {
        constructor(e, t, n, r) {
          this.columnCount = e, this.errorCorrectionLevel = r, this.rowCountUpperPart = t, this.rowCountLowerPart = n, this.rowCount = t + n;
        }
        getColumnCount() {
          return this.columnCount;
        }
        getErrorCorrectionLevel() {
          return this.errorCorrectionLevel;
        }
        getRowCount() {
          return this.rowCount;
        }
        getRowCountUpperPart() {
          return this.rowCountUpperPart;
        }
        getRowCountLowerPart() {
          return this.rowCountLowerPart;
        }
      }
      class mn {
        constructor() {
          this.buffer = "";
        }
        /**
         *
         * @see https://stackoverflow.com/a/13439711/4367683
         *
         * @param str
         * @param arr
         */
        static form(e, t) {
          let n = -1;
          function r(s, o, a, l, u, d) {
            if (s === "%%")
              return "%";
            if (t[++n] === void 0)
              return;
            s = l ? parseInt(l.substr(1)) : void 0;
            let A = u ? parseInt(u.substr(1)) : void 0, p;
            switch (d) {
              case "s":
                p = t[n];
                break;
              case "c":
                p = t[n][0];
                break;
              case "f":
                p = parseFloat(t[n]).toFixed(s);
                break;
              case "p":
                p = parseFloat(t[n]).toPrecision(s);
                break;
              case "e":
                p = parseFloat(t[n]).toExponential(s);
                break;
              case "x":
                p = parseInt(t[n]).toString(A || 16);
                break;
              case "d":
                p = parseFloat(parseInt(t[n], A || 10).toPrecision(s)).toFixed(0);
                break;
            }
            p = typeof p == "object" ? JSON.stringify(p) : (+p).toString(A);
            let I = parseInt(a), y = a && a[0] + "" == "0" ? "0" : " ";
            for (; p.length < I; )
              p = o !== void 0 ? p + y : y + p;
            return p;
          }
          let i = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%])/g;
          return e.replace(i, r);
        }
        /**
         *
         * @param append The new string to append.
         * @param args Argumets values to be formated.
         */
        format(e, ...t) {
          this.buffer += mn.form(e, t);
        }
        /**
         * Returns the Formatter string value.
         */
        toString() {
          return this.buffer;
        }
      }
      class In {
        constructor(e) {
          this.boundingBox = new Wt(e), this.codewords = new Array(e.getMaxY() - e.getMinY() + 1);
        }
        /*final*/
        getCodewordNearby(e) {
          let t = this.getCodeword(e);
          if (t != null)
            return t;
          for (let n = 1; n < In.MAX_NEARBY_DISTANCE; n++) {
            let r = this.imageRowToCodewordIndex(e) - n;
            if (r >= 0 && (t = this.codewords[r], t != null) || (r = this.imageRowToCodewordIndex(e) + n, r < this.codewords.length && (t = this.codewords[r], t != null)))
              return t;
          }
          return null;
        }
        /*final int*/
        imageRowToCodewordIndex(e) {
          return e - this.boundingBox.getMinY();
        }
        /*final void*/
        setCodeword(e, t) {
          this.codewords[this.imageRowToCodewordIndex(e)] = t;
        }
        /*final*/
        getCodeword(e) {
          return this.codewords[this.imageRowToCodewordIndex(e)];
        }
        /*final*/
        getBoundingBox() {
          return this.boundingBox;
        }
        /*final*/
        getCodewords() {
          return this.codewords;
        }
        // @Override
        toString() {
          const e = new mn();
          let t = 0;
          for (const n of this.codewords) {
            if (n == null) {
              e.format("%3d:    |   %n", t++);
              continue;
            }
            e.format("%3d: %3d|%3d%n", t++, n.getRowNumber(), n.getValue());
          }
          return e.toString();
        }
      }
      In.MAX_NEARBY_DISTANCE = 5;
      class bn {
        constructor() {
          this.values = /* @__PURE__ */ new Map();
        }
        /**
         * Add an occurrence of a value
         */
        setValue(e) {
          e = Math.trunc(e);
          let t = this.values.get(e);
          t == null && (t = 0), t++, this.values.set(e, t);
        }
        /**
         * Determines the maximum occurrence of a set value and returns all values which were set with this occurrence.
         * @return an array of int, containing the values with the highest occurrence, or null, if no value was set
         */
        getValue() {
          let e = -1, t = new Array();
          for (const [n, r] of this.values.entries()) {
            const i = {
              getKey: () => n,
              getValue: () => r
            };
            i.getValue() > e ? (e = i.getValue(), t = [], t.push(i.getKey())) : i.getValue() === e && t.push(i.getKey());
          }
          return j.toIntArray(t);
        }
        getConfidence(e) {
          return this.values.get(e);
        }
      }
      class Jr extends In {
        constructor(e, t) {
          super(e), this._isLeft = t;
        }
        setRowNumbers() {
          for (let e of this.getCodewords())
            e != null && e.setRowNumberAsRowIndicatorColumn();
        }
        // TODO implement properly
        // TODO maybe we should add missing codewords to store the correct row number to make
        // finding row numbers for other columns easier
        // use row height count to make detection of invalid row numbers more reliable
        adjustCompleteIndicatorColumnRowNumbers(e) {
          let t = this.getCodewords();
          this.setRowNumbers(), this.removeIncorrectCodewords(t, e);
          let n = this.getBoundingBox(), r = this._isLeft ? n.getTopLeft() : n.getTopRight(), i = this._isLeft ? n.getBottomLeft() : n.getBottomRight(), s = this.imageRowToCodewordIndex(Math.trunc(r.getY())), o = this.imageRowToCodewordIndex(Math.trunc(i.getY())), a = -1, l = 1, u = 0;
          for (let d = s; d < o; d++) {
            if (t[d] == null)
              continue;
            let A = t[d], p = A.getRowNumber() - a;
            if (p === 0)
              u++;
            else if (p === 1)
              l = Math.max(l, u), u = 1, a = A.getRowNumber();
            else if (p < 0 || A.getRowNumber() >= e.getRowCount() || p > d)
              t[d] = null;
            else {
              let I;
              l > 2 ? I = (l - 2) * p : I = p;
              let y = I >= d;
              for (let _ = 1; _ <= I && !y; _++)
                y = t[d - _] != null;
              y ? t[d] = null : (a = A.getRowNumber(), u = 1);
            }
          }
        }
        getRowHeights() {
          let e = this.getBarcodeMetadata();
          if (e == null)
            return null;
          this.adjustIncompleteIndicatorColumnRowNumbers(e);
          let t = new Int32Array(e.getRowCount());
          for (let n of this.getCodewords())
            if (n != null) {
              let r = n.getRowNumber();
              if (r >= t.length)
                continue;
              t[r]++;
            }
          return t;
        }
        // TODO maybe we should add missing codewords to store the correct row number to make
        // finding row numbers for other columns easier
        // use row height count to make detection of invalid row numbers more reliable
        adjustIncompleteIndicatorColumnRowNumbers(e) {
          let t = this.getBoundingBox(), n = this._isLeft ? t.getTopLeft() : t.getTopRight(), r = this._isLeft ? t.getBottomLeft() : t.getBottomRight(), i = this.imageRowToCodewordIndex(Math.trunc(n.getY())), s = this.imageRowToCodewordIndex(Math.trunc(r.getY())), o = this.getCodewords(), a = -1;
          for (let l = i; l < s; l++) {
            if (o[l] == null)
              continue;
            let u = o[l];
            u.setRowNumberAsRowIndicatorColumn();
            let d = u.getRowNumber() - a;
            d === 0 || (d === 1 ? a = u.getRowNumber() : u.getRowNumber() >= e.getRowCount() ? o[l] = null : a = u.getRowNumber());
          }
        }
        getBarcodeMetadata() {
          let e = this.getCodewords(), t = new bn(), n = new bn(), r = new bn(), i = new bn();
          for (let o of e) {
            if (o == null)
              continue;
            o.setRowNumberAsRowIndicatorColumn();
            let a = o.getValue() % 30, l = o.getRowNumber();
            switch (this._isLeft || (l += 2), l % 3) {
              case 0:
                n.setValue(a * 3 + 1);
                break;
              case 1:
                i.setValue(a / 3), r.setValue(a % 3);
                break;
              case 2:
                t.setValue(a + 1);
                break;
            }
          }
          if (t.getValue().length === 0 || n.getValue().length === 0 || r.getValue().length === 0 || i.getValue().length === 0 || t.getValue()[0] < 1 || n.getValue()[0] + r.getValue()[0] < j.MIN_ROWS_IN_BARCODE || n.getValue()[0] + r.getValue()[0] > j.MAX_ROWS_IN_BARCODE)
            return null;
          let s = new es(t.getValue()[0], n.getValue()[0], r.getValue()[0], i.getValue()[0]);
          return this.removeIncorrectCodewords(e, s), s;
        }
        removeIncorrectCodewords(e, t) {
          for (let n = 0; n < e.length; n++) {
            let r = e[n];
            if (e[n] == null)
              continue;
            let i = r.getValue() % 30, s = r.getRowNumber();
            if (s > t.getRowCount()) {
              e[n] = null;
              continue;
            }
            switch (this._isLeft || (s += 2), s % 3) {
              case 0:
                i * 3 + 1 !== t.getRowCountUpperPart() && (e[n] = null);
                break;
              case 1:
                (Math.trunc(i / 3) !== t.getErrorCorrectionLevel() || i % 3 !== t.getRowCountLowerPart()) && (e[n] = null);
                break;
              case 2:
                i + 1 !== t.getColumnCount() && (e[n] = null);
                break;
            }
          }
        }
        isLeft() {
          return this._isLeft;
        }
        // @Override
        toString() {
          return "IsLeft: " + this._isLeft + `
` + super.toString();
        }
      }
      class yn {
        constructor(e, t) {
          this.ADJUST_ROW_NUMBER_SKIP = 2, this.barcodeMetadata = e, this.barcodeColumnCount = e.getColumnCount(), this.boundingBox = t, this.detectionResultColumns = new Array(this.barcodeColumnCount + 2);
        }
        getDetectionResultColumns() {
          this.adjustIndicatorColumnRowNumbers(this.detectionResultColumns[0]), this.adjustIndicatorColumnRowNumbers(this.detectionResultColumns[this.barcodeColumnCount + 1]);
          let e = j.MAX_CODEWORDS_IN_BARCODE, t;
          do
            t = e, e = this.adjustRowNumbersAndGetCount();
          while (e > 0 && e < t);
          return this.detectionResultColumns;
        }
        adjustIndicatorColumnRowNumbers(e) {
          e != null && e.adjustCompleteIndicatorColumnRowNumbers(this.barcodeMetadata);
        }
        // TODO ensure that no detected codewords with unknown row number are left
        // we should be able to estimate the row height and use it as a hint for the row number
        // we should also fill the rows top to bottom and bottom to top
        /**
         * @return number of codewords which don't have a valid row number. Note that the count is not accurate as codewords
         * will be counted several times. It just serves as an indicator to see when we can stop adjusting row numbers
         */
        adjustRowNumbersAndGetCount() {
          let e = this.adjustRowNumbersByRow();
          if (e === 0)
            return 0;
          for (let t = 1; t < this.barcodeColumnCount + 1; t++) {
            let n = this.detectionResultColumns[t].getCodewords();
            for (let r = 0; r < n.length; r++)
              n[r] != null && (n[r].hasValidRowNumber() || this.adjustRowNumbers(t, r, n));
          }
          return e;
        }
        adjustRowNumbersByRow() {
          return this.adjustRowNumbersFromBothRI(), this.adjustRowNumbersFromLRI() + this.adjustRowNumbersFromRRI();
        }
        adjustRowNumbersFromBothRI() {
          if (this.detectionResultColumns[0] == null || this.detectionResultColumns[this.barcodeColumnCount + 1] == null)
            return;
          let e = this.detectionResultColumns[0].getCodewords(), t = this.detectionResultColumns[this.barcodeColumnCount + 1].getCodewords();
          for (let n = 0; n < e.length; n++)
            if (e[n] != null && t[n] != null && e[n].getRowNumber() === t[n].getRowNumber())
              for (let r = 1; r <= this.barcodeColumnCount; r++) {
                let i = this.detectionResultColumns[r].getCodewords()[n];
                i != null && (i.setRowNumber(e[n].getRowNumber()), i.hasValidRowNumber() || (this.detectionResultColumns[r].getCodewords()[n] = null));
              }
        }
        adjustRowNumbersFromRRI() {
          if (this.detectionResultColumns[this.barcodeColumnCount + 1] == null)
            return 0;
          let e = 0, t = this.detectionResultColumns[this.barcodeColumnCount + 1].getCodewords();
          for (let n = 0; n < t.length; n++) {
            if (t[n] == null)
              continue;
            let r = t[n].getRowNumber(), i = 0;
            for (let s = this.barcodeColumnCount + 1; s > 0 && i < this.ADJUST_ROW_NUMBER_SKIP; s--) {
              let o = this.detectionResultColumns[s].getCodewords()[n];
              o != null && (i = yn.adjustRowNumberIfValid(r, i, o), o.hasValidRowNumber() || e++);
            }
          }
          return e;
        }
        adjustRowNumbersFromLRI() {
          if (this.detectionResultColumns[0] == null)
            return 0;
          let e = 0, t = this.detectionResultColumns[0].getCodewords();
          for (let n = 0; n < t.length; n++) {
            if (t[n] == null)
              continue;
            let r = t[n].getRowNumber(), i = 0;
            for (let s = 1; s < this.barcodeColumnCount + 1 && i < this.ADJUST_ROW_NUMBER_SKIP; s++) {
              let o = this.detectionResultColumns[s].getCodewords()[n];
              o != null && (i = yn.adjustRowNumberIfValid(r, i, o), o.hasValidRowNumber() || e++);
            }
          }
          return e;
        }
        static adjustRowNumberIfValid(e, t, n) {
          return n == null || n.hasValidRowNumber() || (n.isValidRowNumber(e) ? (n.setRowNumber(e), t = 0) : ++t), t;
        }
        adjustRowNumbers(e, t, n) {
          if (!this.detectionResultColumns[e - 1])
            return;
          let r = n[t], i = this.detectionResultColumns[e - 1].getCodewords(), s = i;
          this.detectionResultColumns[e + 1] != null && (s = this.detectionResultColumns[e + 1].getCodewords());
          let o = new Array(14);
          o[2] = i[t], o[3] = s[t], t > 0 && (o[0] = n[t - 1], o[4] = i[t - 1], o[5] = s[t - 1]), t > 1 && (o[8] = n[t - 2], o[10] = i[t - 2], o[11] = s[t - 2]), t < n.length - 1 && (o[1] = n[t + 1], o[6] = i[t + 1], o[7] = s[t + 1]), t < n.length - 2 && (o[9] = n[t + 2], o[12] = i[t + 2], o[13] = s[t + 2]);
          for (let a of o)
            if (yn.adjustRowNumber(r, a))
              return;
        }
        /**
         * @return true, if row number was adjusted, false otherwise
         */
        static adjustRowNumber(e, t) {
          return t == null ? !1 : t.hasValidRowNumber() && t.getBucket() === e.getBucket() ? (e.setRowNumber(t.getRowNumber()), !0) : !1;
        }
        getBarcodeColumnCount() {
          return this.barcodeColumnCount;
        }
        getBarcodeRowCount() {
          return this.barcodeMetadata.getRowCount();
        }
        getBarcodeECLevel() {
          return this.barcodeMetadata.getErrorCorrectionLevel();
        }
        setBoundingBox(e) {
          this.boundingBox = e;
        }
        getBoundingBox() {
          return this.boundingBox;
        }
        setDetectionResultColumn(e, t) {
          this.detectionResultColumns[e] = t;
        }
        getDetectionResultColumn(e) {
          return this.detectionResultColumns[e];
        }
        // @Override
        toString() {
          let e = this.detectionResultColumns[0];
          e == null && (e = this.detectionResultColumns[this.barcodeColumnCount + 1]);
          let t = new mn();
          for (let n = 0; n < e.getCodewords().length; n++) {
            t.format("CW %3d:", n);
            for (let r = 0; r < this.barcodeColumnCount + 2; r++) {
              if (this.detectionResultColumns[r] == null) {
                t.format("    |   ");
                continue;
              }
              let i = this.detectionResultColumns[r].getCodewords()[n];
              if (i == null) {
                t.format("    |   ");
                continue;
              }
              t.format(" %3d|%3d", i.getRowNumber(), i.getValue());
            }
            t.format("%n");
          }
          return t.toString();
        }
      }
      class _n {
        constructor(e, t, n, r) {
          this.rowNumber = _n.BARCODE_ROW_UNKNOWN, this.startX = Math.trunc(e), this.endX = Math.trunc(t), this.bucket = Math.trunc(n), this.value = Math.trunc(r);
        }
        hasValidRowNumber() {
          return this.isValidRowNumber(this.rowNumber);
        }
        isValidRowNumber(e) {
          return e !== _n.BARCODE_ROW_UNKNOWN && this.bucket === e % 3 * 3;
        }
        setRowNumberAsRowIndicatorColumn() {
          this.rowNumber = Math.trunc(Math.trunc(this.value / 30) * 3 + Math.trunc(this.bucket / 3));
        }
        getWidth() {
          return this.endX - this.startX;
        }
        getStartX() {
          return this.startX;
        }
        getEndX() {
          return this.endX;
        }
        getBucket() {
          return this.bucket;
        }
        getValue() {
          return this.value;
        }
        getRowNumber() {
          return this.rowNumber;
        }
        setRowNumber(e) {
          this.rowNumber = e;
        }
        //   @Override
        toString() {
          return this.rowNumber + "|" + this.value;
        }
      }
      _n.BARCODE_ROW_UNKNOWN = -1;
      class rt {
        /* @note
         * this action have to be performed before first use of class
         * - static constructor
         * working with 32bit float (based from Java logic)
        */
        static initialize() {
          for (let e = 0; e < j.SYMBOL_TABLE.length; e++) {
            let t = j.SYMBOL_TABLE[e], n = t & 1;
            for (let r = 0; r < j.BARS_IN_MODULE; r++) {
              let i = 0;
              for (; (t & 1) === n; )
                i += 1, t >>= 1;
              n = t & 1, rt.RATIOS_TABLE[e] || (rt.RATIOS_TABLE[e] = new Array(j.BARS_IN_MODULE)), rt.RATIOS_TABLE[e][j.BARS_IN_MODULE - r - 1] = Math.fround(i / j.MODULES_IN_CODEWORD);
            }
          }
          this.bSymbolTableReady = !0;
        }
        static getDecodedValue(e) {
          let t = rt.getDecodedCodewordValue(rt.sampleBitCounts(e));
          return t !== -1 ? t : rt.getClosestDecodedValue(e);
        }
        static sampleBitCounts(e) {
          let t = oe.sum(e), n = new Int32Array(j.BARS_IN_MODULE), r = 0, i = 0;
          for (let s = 0; s < j.MODULES_IN_CODEWORD; s++) {
            let o = t / (2 * j.MODULES_IN_CODEWORD) + s * t / j.MODULES_IN_CODEWORD;
            i + e[r] <= o && (i += e[r], r++), n[r]++;
          }
          return n;
        }
        static getDecodedCodewordValue(e) {
          let t = rt.getBitValue(e);
          return j.getCodeword(t) === -1 ? -1 : t;
        }
        static getBitValue(e) {
          let t = (
            /*long*/
            0
          );
          for (let n = 0; n < e.length; n++)
            for (let r = 0; r < e[n]; r++)
              t = t << 1 | (n % 2 === 0 ? 1 : 0);
          return Math.trunc(t);
        }
        // working with 32bit float (as in Java)
        static getClosestDecodedValue(e) {
          let t = oe.sum(e), n = new Array(j.BARS_IN_MODULE);
          if (t > 1)
            for (let s = 0; s < n.length; s++)
              n[s] = Math.fround(e[s] / t);
          let r = kn.MAX_VALUE, i = -1;
          this.bSymbolTableReady || rt.initialize();
          for (let s = 0; s < rt.RATIOS_TABLE.length; s++) {
            let o = 0, a = rt.RATIOS_TABLE[s];
            for (let l = 0; l < j.BARS_IN_MODULE; l++) {
              let u = Math.fround(a[l] - n[l]);
              if (o += Math.fround(u * u), o >= r)
                break;
            }
            o < r && (r = o, i = j.SYMBOL_TABLE[s]);
          }
          return i;
        }
      }
      rt.bSymbolTableReady = !1, rt.RATIOS_TABLE = new Array(j.SYMBOL_TABLE.length).map((f) => new Array(j.BARS_IN_MODULE));
      class ei {
        constructor() {
          this.segmentCount = -1, this.fileSize = -1, this.timestamp = -1, this.checksum = -1;
        }
        /**
         * The Segment ID represents the segment of the whole file distributed over different symbols.
         *
         * @return File segment index
         */
        getSegmentIndex() {
          return this.segmentIndex;
        }
        setSegmentIndex(e) {
          this.segmentIndex = e;
        }
        /**
         * Is the same for each related PDF417 symbol
         *
         * @return File ID
         */
        getFileId() {
          return this.fileId;
        }
        setFileId(e) {
          this.fileId = e;
        }
        /**
         * @return always null
         * @deprecated use dedicated already parsed fields
         */
        //   @Deprecated
        getOptionalData() {
          return this.optionalData;
        }
        /**
         * @param optionalData old optional data format as int array
         * @deprecated parse and use new fields
         */
        //   @Deprecated
        setOptionalData(e) {
          this.optionalData = e;
        }
        /**
         * @return true if it is the last segment
         */
        isLastSegment() {
          return this.lastSegment;
        }
        setLastSegment(e) {
          this.lastSegment = e;
        }
        /**
         * @return count of segments, -1 if not set
         */
        getSegmentCount() {
          return this.segmentCount;
        }
        setSegmentCount(e) {
          this.segmentCount = e;
        }
        getSender() {
          return this.sender || null;
        }
        setSender(e) {
          this.sender = e;
        }
        getAddressee() {
          return this.addressee || null;
        }
        setAddressee(e) {
          this.addressee = e;
        }
        /**
         * Filename of the encoded file
         *
         * @return filename
         */
        getFileName() {
          return this.fileName;
        }
        setFileName(e) {
          this.fileName = e;
        }
        /**
         * filesize in bytes of the encoded file
         *
         * @return filesize in bytes, -1 if not set
         */
        getFileSize() {
          return this.fileSize;
        }
        setFileSize(e) {
          this.fileSize = e;
        }
        /**
         * 16-bit CRC checksum using CCITT-16
         *
         * @return crc checksum, -1 if not set
         */
        getChecksum() {
          return this.checksum;
        }
        setChecksum(e) {
          this.checksum = e;
        }
        /**
         * unix epock timestamp, elapsed seconds since 1970-01-01
         *
         * @return elapsed seconds, -1 if not set
         */
        getTimestamp() {
          return this.timestamp;
        }
        setTimestamp(e) {
          this.timestamp = e;
        }
      }
      class ti {
        /**
         * Parses a string to a number, since JS has no really Int64.
         *
         * @param num Numeric string.
         * @param radix Destination radix.
         */
        static parseLong(e, t = void 0) {
          return parseInt(e, t);
        }
      }
      class ni extends m {
      }
      ni.kind = "NullPointerException";
      class ts {
        /**
         * Writes <code>b.length</code> bytes from the specified byte array
         * to this output stream. The general contract for <code>write(b)</code>
         * is that it should have exactly the same effect as the call
         * <code>write(b, 0, b.length)</code>.
         *
         * @param      b   the data.
         * @exception  IOException  if an I/O error occurs.
         * @see        java.io.OutputStream#write(byte[], int, int)
         */
        writeBytes(e) {
          this.writeBytesOffset(e, 0, e.length);
        }
        /**
         * Writes <code>len</code> bytes from the specified byte array
         * starting at offset <code>off</code> to this output stream.
         * The general contract for <code>write(b, off, len)</code> is that
         * some of the bytes in the array <code>b</code> are written to the
         * output stream in order; element <code>b[off]</code> is the first
         * byte written and <code>b[off+len-1]</code> is the last byte written
         * by this operation.
         * <p>
         * The <code>write</code> method of <code>OutputStream</code> calls
         * the write method of one argument on each of the bytes to be
         * written out. Subclasses are encouraged to override this method and
         * provide a more efficient implementation.
         * <p>
         * If <code>b</code> is <code>null</code>, a
         * <code>NullPointerException</code> is thrown.
         * <p>
         * If <code>off</code> is negative, or <code>len</code> is negative, or
         * <code>off+len</code> is greater than the length of the array
         * <code>b</code>, then an <tt>IndexOutOfBoundsException</tt> is thrown.
         *
         * @param      b     the data.
         * @param      off   the start offset in the data.
         * @param      len   the number of bytes to write.
         * @exception  IOException  if an I/O error occurs. In particular,
         *             an <code>IOException</code> is thrown if the output
         *             stream is closed.
         */
        writeBytesOffset(e, t, n) {
          if (e == null)
            throw new ni();
          if (t < 0 || t > e.length || n < 0 || t + n > e.length || t + n < 0)
            throw new gt();
          if (n === 0)
            return;
          for (let r = 0; r < n; r++)
            this.write(e[t + r]);
        }
        /**
         * Flushes this output stream and forces any buffered output bytes
         * to be written out. The general contract of <code>flush</code> is
         * that calling it is an indication that, if any bytes previously
         * written have been buffered by the implementation of the output
         * stream, such bytes should immediately be written to their
         * intended destination.
         * <p>
         * If the intended destination of this stream is an abstraction provided by
         * the underlying operating system, for example a file, then flushing the
         * stream guarantees only that bytes previously written to the stream are
         * passed to the operating system for writing; it does not guarantee that
         * they are actually written to a physical device such as a disk drive.
         * <p>
         * The <code>flush</code> method of <code>OutputStream</code> does nothing.
         *
         * @exception  IOException  if an I/O error occurs.
         */
        flush() {
        }
        /**
         * Closes this output stream and releases any system resources
         * associated with this stream. The general contract of <code>close</code>
         * is that it closes the output stream. A closed stream cannot perform
         * output operations and cannot be reopened.
         * <p>
         * The <code>close</code> method of <code>OutputStream</code> does nothing.
         *
         * @exception  IOException  if an I/O error occurs.
         */
        close() {
        }
      }
      class ns extends m {
      }
      class rs extends ts {
        /**
         * Creates a new byte array output stream. The buffer capacity is
         * initially 32 bytes, though its size increases if necessary.
         */
        // public constructor() {
        //     this(32);
        // }
        /**
         * Creates a new byte array output stream, with a buffer capacity of
         * the specified size, in bytes.
         *
         * @param   size   the initial size.
         * @exception  IllegalArgumentException if size is negative.
         */
        constructor(e = 32) {
          if (super(), this.count = 0, e < 0)
            throw new R("Negative initial size: " + e);
          this.buf = new Uint8Array(e);
        }
        /**
         * Increases the capacity if necessary to ensure that it can hold
         * at least the number of elements specified by the minimum
         * capacity argument.
         *
         * @param minCapacity the desired minimum capacity
         * @throws OutOfMemoryError if {@code minCapacity < 0}.  This is
         * interpreted as a request for the unsatisfiably large capacity
         * {@code (long) Integer.MAX_VALUE + (minCapacity - Integer.MAX_VALUE)}.
         */
        ensureCapacity(e) {
          e - this.buf.length > 0 && this.grow(e);
        }
        /**
         * Increases the capacity to ensure that it can hold at least the
         * number of elements specified by the minimum capacity argument.
         *
         * @param minCapacity the desired minimum capacity
         */
        grow(e) {
          let n = this.buf.length << 1;
          if (n - e < 0 && (n = e), n < 0) {
            if (e < 0)
              throw new ns();
            n = K.MAX_VALUE;
          }
          this.buf = pe.copyOfUint8Array(this.buf, n);
        }
        /**
         * Writes the specified byte to this byte array output stream.
         *
         * @param   b   the byte to be written.
         */
        write(e) {
          this.ensureCapacity(this.count + 1), this.buf[this.count] = /*(byte)*/
          e, this.count += 1;
        }
        /**
         * Writes <code>len</code> bytes from the specified byte array
         * starting at offset <code>off</code> to this byte array output stream.
         *
         * @param   b     the data.
         * @param   off   the start offset in the data.
         * @param   len   the number of bytes to write.
         */
        writeBytesOffset(e, t, n) {
          if (t < 0 || t > e.length || n < 0 || t + n - e.length > 0)
            throw new gt();
          this.ensureCapacity(this.count + n), ie.arraycopy(e, t, this.buf, this.count, n), this.count += n;
        }
        /**
         * Writes the complete contents of this byte array output stream to
         * the specified output stream argument, as if by calling the output
         * stream's write method using <code>out.write(buf, 0, count)</code>.
         *
         * @param      out   the output stream to which to write the data.
         * @exception  IOException  if an I/O error occurs.
         */
        writeTo(e) {
          e.writeBytesOffset(this.buf, 0, this.count);
        }
        /**
         * Resets the <code>count</code> field of this byte array output
         * stream to zero, so that all currently accumulated output in the
         * output stream is discarded. The output stream can be used again,
         * reusing the already allocated buffer space.
         *
         * @see     java.io.ByteArrayInputStream#count
         */
        reset() {
          this.count = 0;
        }
        /**
         * Creates a newly allocated byte array. Its size is the current
         * size of this output stream and the valid contents of the buffer
         * have been copied into it.
         *
         * @return  the current contents of this output stream, as a byte array.
         * @see     java.io.ByteArrayOutputStream#size()
         */
        toByteArray() {
          return pe.copyOfUint8Array(this.buf, this.count);
        }
        /**
         * Returns the current size of the buffer.
         *
         * @return  the value of the <code>count</code> field, which is the number
         *          of valid bytes in this output stream.
         * @see     java.io.ByteArrayOutputStream#count
         */
        size() {
          return this.count;
        }
        toString(e) {
          return e ? typeof e == "string" ? this.toString_string(e) : this.toString_number(e) : this.toString_void();
        }
        /**
         * Converts the buffer's contents into a string decoding bytes using the
         * platform's default character set. The length of the new <tt>String</tt>
         * is a function of the character set, and hence may not be equal to the
         * size of the buffer.
         *
         * <p> This method always replaces malformed-input and unmappable-character
         * sequences with the default replacement string for the platform's
         * default character set. The {@linkplain java.nio.charset.CharsetDecoder}
         * class should be used when more control over the decoding process is
         * required.
         *
         * @return String decoded from the buffer's contents.
         * @since  JDK1.1
         */
        toString_void() {
          return new String(
            this.buf
            /*, 0, this.count*/
          ).toString();
        }
        /**
         * Converts the buffer's contents into a string by decoding the bytes using
         * the specified {@link java.nio.charset.Charset charsetName}. The length of
         * the new <tt>String</tt> is a function of the charset, and hence may not be
         * equal to the length of the byte array.
         *
         * <p> This method always replaces malformed-input and unmappable-character
         * sequences with this charset's default replacement string. The {@link
         * java.nio.charset.CharsetDecoder} class should be used when more control
         * over the decoding process is required.
         *
         * @param  charsetName  the name of a supported
         *              {@linkplain java.nio.charset.Charset </code>charset<code>}
         * @return String decoded from the buffer's contents.
         * @exception  UnsupportedEncodingException
         *             If the named charset is not supported
         * @since   JDK1.1
         */
        toString_string(e) {
          return new String(
            this.buf
            /*, 0, this.count, charsetName*/
          ).toString();
        }
        /**
         * Creates a newly allocated string. Its size is the current size of
         * the output stream and the valid contents of the buffer have been
         * copied into it. Each character <i>c</i> in the resulting string is
         * constructed from the corresponding element <i>b</i> in the byte
         * array such that:
         * <blockquote><pre>
         *     c == (char)(((hibyte &amp; 0xff) &lt;&lt; 8) | (b &amp; 0xff))
         * </pre></blockquote>
         *
         * @deprecated This method does not properly convert bytes into characters.
         * As of JDK&nbsp;1.1, the preferred way to do this is via the
         * <code>toString(String enc)</code> method, which takes an encoding-name
         * argument, or the <code>toString()</code> method, which uses the
         * platform's default character encoding.
         *
         * @param      hibyte    the high byte of each resulting Unicode character.
         * @return     the current contents of the output stream, as a string.
         * @see        java.io.ByteArrayOutputStream#size()
         * @see        java.io.ByteArrayOutputStream#toString(String)
         * @see        java.io.ByteArrayOutputStream#toString()
         */
        // @Deprecated
        toString_number(e) {
          return new String(
            this.buf
            /*, hibyte, 0, this.count*/
          ).toString();
        }
        /**
         * Closing a <tt>ByteArrayOutputStream</tt> has no effect. The methods in
         * this class can be called after the stream has been closed without
         * generating an <tt>IOException</tt>.
         * <p>
         *
         * @throws IOException
         */
        close() {
        }
      }
      var we;
      (function(f) {
        f[f.ALPHA = 0] = "ALPHA", f[f.LOWER = 1] = "LOWER", f[f.MIXED = 2] = "MIXED", f[f.PUNCT = 3] = "PUNCT", f[f.ALPHA_SHIFT = 4] = "ALPHA_SHIFT", f[f.PUNCT_SHIFT = 5] = "PUNCT_SHIFT";
      })(we || (we = {}));
      function ri() {
        if (typeof window < "u")
          return window.BigInt || null;
        if (typeof qn < "u")
          return qn.BigInt || null;
        if (typeof self < "u")
          return self.BigInt || null;
        throw new Error("Can't search globals for BigInt!");
      }
      let zn;
      function Pt(f) {
        if (typeof zn > "u" && (zn = ri()), zn === null)
          throw new Error("BigInt is not supported!");
        return zn(f);
      }
      function is() {
        let f = [];
        f[0] = Pt(1);
        let e = Pt(900);
        f[1] = e;
        for (let t = 2; t < 16; t++)
          f[t] = f[t - 1] * e;
        return f;
      }
      class T {
        //   private DecodedBitStreamParser() {
        // }
        /**
         *
         * @param codewords
         * @param ecLevel
         *
         * @throws FormatException
         */
        static decode(e, t) {
          let n = new ge(""), r = k.ISO8859_1;
          n.enableDecoding(r);
          let i = 1, s = e[i++], o = new ei();
          for (; i < e[0]; ) {
            switch (s) {
              case T.TEXT_COMPACTION_MODE_LATCH:
                i = T.textCompaction(e, i, n);
                break;
              case T.BYTE_COMPACTION_MODE_LATCH:
              case T.BYTE_COMPACTION_MODE_LATCH_6:
                i = T.byteCompaction(s, e, r, i, n);
                break;
              case T.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                n.append(
                  /*(char)*/
                  e[i++]
                );
                break;
              case T.NUMERIC_COMPACTION_MODE_LATCH:
                i = T.numericCompaction(e, i, n);
                break;
              case T.ECI_CHARSET:
                k.getCharacterSetECIByValue(e[i++]);
                break;
              case T.ECI_GENERAL_PURPOSE:
                i += 2;
                break;
              case T.ECI_USER_DEFINED:
                i++;
                break;
              case T.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
                i = T.decodeMacroBlock(e, i, o);
                break;
              case T.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
              case T.MACRO_PDF417_TERMINATOR:
                throw new U();
              default:
                i--, i = T.textCompaction(e, i, n);
                break;
            }
            if (i < e.length)
              s = e[i++];
            else
              throw U.getFormatInstance();
          }
          if (n.length() === 0)
            throw U.getFormatInstance();
          let a = new wn(null, n.toString(), null, t);
          return a.setOther(o), a;
        }
        /**
         *
         * @param int
         * @param param1
         * @param codewords
         * @param int
         * @param codeIndex
         * @param PDF417ResultMetadata
         * @param resultMetadata
         *
         * @throws FormatException
         */
        // @SuppressWarnings("deprecation")
        static decodeMacroBlock(e, t, n) {
          if (t + T.NUMBER_OF_SEQUENCE_CODEWORDS > e[0])
            throw U.getFormatInstance();
          let r = new Int32Array(T.NUMBER_OF_SEQUENCE_CODEWORDS);
          for (let o = 0; o < T.NUMBER_OF_SEQUENCE_CODEWORDS; o++, t++)
            r[o] = e[t];
          n.setSegmentIndex(K.parseInt(T.decodeBase900toBase10(r, T.NUMBER_OF_SEQUENCE_CODEWORDS)));
          let i = new ge();
          t = T.textCompaction(e, t, i), n.setFileId(i.toString());
          let s = -1;
          for (e[t] === T.BEGIN_MACRO_PDF417_OPTIONAL_FIELD && (s = t + 1); t < e[0]; )
            switch (e[t]) {
              case T.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
                switch (t++, e[t]) {
                  case T.MACRO_PDF417_OPTIONAL_FIELD_FILE_NAME:
                    let o = new ge();
                    t = T.textCompaction(e, t + 1, o), n.setFileName(o.toString());
                    break;
                  case T.MACRO_PDF417_OPTIONAL_FIELD_SENDER:
                    let a = new ge();
                    t = T.textCompaction(e, t + 1, a), n.setSender(a.toString());
                    break;
                  case T.MACRO_PDF417_OPTIONAL_FIELD_ADDRESSEE:
                    let l = new ge();
                    t = T.textCompaction(e, t + 1, l), n.setAddressee(l.toString());
                    break;
                  case T.MACRO_PDF417_OPTIONAL_FIELD_SEGMENT_COUNT:
                    let u = new ge();
                    t = T.numericCompaction(e, t + 1, u), n.setSegmentCount(K.parseInt(u.toString()));
                    break;
                  case T.MACRO_PDF417_OPTIONAL_FIELD_TIME_STAMP:
                    let d = new ge();
                    t = T.numericCompaction(e, t + 1, d), n.setTimestamp(ti.parseLong(d.toString()));
                    break;
                  case T.MACRO_PDF417_OPTIONAL_FIELD_CHECKSUM:
                    let A = new ge();
                    t = T.numericCompaction(e, t + 1, A), n.setChecksum(K.parseInt(A.toString()));
                    break;
                  case T.MACRO_PDF417_OPTIONAL_FIELD_FILE_SIZE:
                    let p = new ge();
                    t = T.numericCompaction(e, t + 1, p), n.setFileSize(ti.parseLong(p.toString()));
                    break;
                  default:
                    throw U.getFormatInstance();
                }
                break;
              case T.MACRO_PDF417_TERMINATOR:
                t++, n.setLastSegment(!0);
                break;
              default:
                throw U.getFormatInstance();
            }
          if (s !== -1) {
            let o = t - s;
            n.isLastSegment() && o--, n.setOptionalData(pe.copyOfRange(e, s, s + o));
          }
          return t;
        }
        /**
         * Text Compaction mode (see 5.4.1.5) permits all printable ASCII characters to be
         * encoded, i.e. values 32 - 126 inclusive in accordance with ISO/IEC 646 (IRV), as
         * well as selected control characters.
         *
         * @param codewords The array of codewords (data + error)
         * @param codeIndex The current index into the codeword array.
         * @param result    The decoded data is appended to the result.
         * @return The next index into the codeword array.
         */
        static textCompaction(e, t, n) {
          let r = new Int32Array((e[0] - t) * 2), i = new Int32Array((e[0] - t) * 2), s = 0, o = !1;
          for (; t < e[0] && !o; ) {
            let a = e[t++];
            if (a < T.TEXT_COMPACTION_MODE_LATCH)
              r[s] = a / 30, r[s + 1] = a % 30, s += 2;
            else
              switch (a) {
                case T.TEXT_COMPACTION_MODE_LATCH:
                  r[s++] = T.TEXT_COMPACTION_MODE_LATCH;
                  break;
                case T.BYTE_COMPACTION_MODE_LATCH:
                case T.BYTE_COMPACTION_MODE_LATCH_6:
                case T.NUMERIC_COMPACTION_MODE_LATCH:
                case T.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
                case T.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
                case T.MACRO_PDF417_TERMINATOR:
                  t--, o = !0;
                  break;
                case T.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                  r[s] = T.MODE_SHIFT_TO_BYTE_COMPACTION_MODE, a = e[t++], i[s] = a, s++;
                  break;
              }
          }
          return T.decodeTextCompaction(r, i, s, n), t;
        }
        /**
         * The Text Compaction mode includes all the printable ASCII characters
         * (i.e. values from 32 to 126) and three ASCII control characters: HT or tab
         * (9: e), LF or line feed (10: e), and CR or carriage
         * return (13: e). The Text Compaction mode also includes various latch
         * and shift characters which are used exclusively within the mode. The Text
         * Compaction mode encodes up to 2 characters per codeword. The compaction rules
         * for converting data into PDF417 codewords are defined in 5.4.2.2. The sub-mode
         * switches are defined in 5.4.2.3.
         *
         * @param textCompactionData The text compaction data.
         * @param byteCompactionData The byte compaction data if there
         *                           was a mode shift.
         * @param length             The size of the text compaction and byte compaction data.
         * @param result             The decoded data is appended to the result.
         */
        static decodeTextCompaction(e, t, n, r) {
          let i = we.ALPHA, s = we.ALPHA, o = 0;
          for (; o < n; ) {
            let a = e[o], l = (
              /*char*/
              ""
            );
            switch (i) {
              case we.ALPHA:
                if (a < 26)
                  l = /*(char)('A' + subModeCh) */
                  String.fromCharCode(65 + a);
                else
                  switch (a) {
                    case 26:
                      l = " ";
                      break;
                    case T.LL:
                      i = we.LOWER;
                      break;
                    case T.ML:
                      i = we.MIXED;
                      break;
                    case T.PS:
                      s = i, i = we.PUNCT_SHIFT;
                      break;
                    case T.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                      r.append(
                        /*(char)*/
                        t[o]
                      );
                      break;
                    case T.TEXT_COMPACTION_MODE_LATCH:
                      i = we.ALPHA;
                      break;
                  }
                break;
              case we.LOWER:
                if (a < 26)
                  l = /*(char)('a' + subModeCh)*/
                  String.fromCharCode(97 + a);
                else
                  switch (a) {
                    case 26:
                      l = " ";
                      break;
                    case T.AS:
                      s = i, i = we.ALPHA_SHIFT;
                      break;
                    case T.ML:
                      i = we.MIXED;
                      break;
                    case T.PS:
                      s = i, i = we.PUNCT_SHIFT;
                      break;
                    case T.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                      r.append(
                        /*(char)*/
                        t[o]
                      );
                      break;
                    case T.TEXT_COMPACTION_MODE_LATCH:
                      i = we.ALPHA;
                      break;
                  }
                break;
              case we.MIXED:
                if (a < T.PL)
                  l = T.MIXED_CHARS[a];
                else
                  switch (a) {
                    case T.PL:
                      i = we.PUNCT;
                      break;
                    case 26:
                      l = " ";
                      break;
                    case T.LL:
                      i = we.LOWER;
                      break;
                    case T.AL:
                      i = we.ALPHA;
                      break;
                    case T.PS:
                      s = i, i = we.PUNCT_SHIFT;
                      break;
                    case T.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                      r.append(
                        /*(char)*/
                        t[o]
                      );
                      break;
                    case T.TEXT_COMPACTION_MODE_LATCH:
                      i = we.ALPHA;
                      break;
                  }
                break;
              case we.PUNCT:
                if (a < T.PAL)
                  l = T.PUNCT_CHARS[a];
                else
                  switch (a) {
                    case T.PAL:
                      i = we.ALPHA;
                      break;
                    case T.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                      r.append(
                        /*(char)*/
                        t[o]
                      );
                      break;
                    case T.TEXT_COMPACTION_MODE_LATCH:
                      i = we.ALPHA;
                      break;
                  }
                break;
              case we.ALPHA_SHIFT:
                if (i = s, a < 26)
                  l = /*(char)('A' + subModeCh)*/
                  String.fromCharCode(65 + a);
                else
                  switch (a) {
                    case 26:
                      l = " ";
                      break;
                    case T.TEXT_COMPACTION_MODE_LATCH:
                      i = we.ALPHA;
                      break;
                  }
                break;
              case we.PUNCT_SHIFT:
                if (i = s, a < T.PAL)
                  l = T.PUNCT_CHARS[a];
                else
                  switch (a) {
                    case T.PAL:
                      i = we.ALPHA;
                      break;
                    case T.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:
                      r.append(
                        /*(char)*/
                        t[o]
                      );
                      break;
                    case T.TEXT_COMPACTION_MODE_LATCH:
                      i = we.ALPHA;
                      break;
                  }
                break;
            }
            l !== "" && r.append(l), o++;
          }
        }
        /**
         * Byte Compaction mode (see 5.4.3) permits all 256 possible 8-bit byte values to be encoded.
         * This includes all ASCII characters value 0 to 127 inclusive and provides for international
         * character set support.
         *
         * @param mode      The byte compaction mode i.e. 901 or 924
         * @param codewords The array of codewords (data + error)
         * @param encoding  Currently active character encoding
         * @param codeIndex The current index into the codeword array.
         * @param result    The decoded data is appended to the result.
         * @return The next index into the codeword array.
         */
        static byteCompaction(e, t, n, r, i) {
          let s = new rs(), o = 0, a = (
            /*long*/
            0
          ), l = !1;
          switch (e) {
            case T.BYTE_COMPACTION_MODE_LATCH:
              let u = new Int32Array(6), d = t[r++];
              for (; r < t[0] && !l; )
                switch (u[o++] = d, a = 900 * a + d, d = t[r++], d) {
                  case T.TEXT_COMPACTION_MODE_LATCH:
                  case T.BYTE_COMPACTION_MODE_LATCH:
                  case T.NUMERIC_COMPACTION_MODE_LATCH:
                  case T.BYTE_COMPACTION_MODE_LATCH_6:
                  case T.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
                  case T.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
                  case T.MACRO_PDF417_TERMINATOR:
                    r--, l = !0;
                    break;
                  default:
                    if (o % 5 === 0 && o > 0) {
                      for (let A = 0; A < 6; ++A)
                        s.write(
                          /*(byte)*/
                          Number(Pt(a) >> Pt(8 * (5 - A)))
                        );
                      a = 0, o = 0;
                    }
                    break;
                }
              r === t[0] && d < T.TEXT_COMPACTION_MODE_LATCH && (u[o++] = d);
              for (let A = 0; A < o; A++)
                s.write(
                  /*(byte)*/
                  u[A]
                );
              break;
            case T.BYTE_COMPACTION_MODE_LATCH_6:
              for (; r < t[0] && !l; ) {
                let A = t[r++];
                if (A < T.TEXT_COMPACTION_MODE_LATCH)
                  o++, a = 900 * a + A;
                else
                  switch (A) {
                    case T.TEXT_COMPACTION_MODE_LATCH:
                    case T.BYTE_COMPACTION_MODE_LATCH:
                    case T.NUMERIC_COMPACTION_MODE_LATCH:
                    case T.BYTE_COMPACTION_MODE_LATCH_6:
                    case T.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
                    case T.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
                    case T.MACRO_PDF417_TERMINATOR:
                      r--, l = !0;
                      break;
                  }
                if (o % 5 === 0 && o > 0) {
                  for (let p = 0; p < 6; ++p)
                    s.write(
                      /*(byte)*/
                      Number(Pt(a) >> Pt(8 * (5 - p)))
                    );
                  a = 0, o = 0;
                }
              }
              break;
          }
          return i.append(Je.decode(s.toByteArray(), n)), r;
        }
        /**
         * Numeric Compaction mode (see 5.4.4) permits efficient encoding of numeric data strings.
         *
         * @param codewords The array of codewords (data + error)
         * @param codeIndex The current index into the codeword array.
         * @param result    The decoded data is appended to the result.
         * @return The next index into the codeword array.
         *
         * @throws FormatException
         */
        static numericCompaction(e, t, n) {
          let r = 0, i = !1, s = new Int32Array(T.MAX_NUMERIC_CODEWORDS);
          for (; t < e[0] && !i; ) {
            let o = e[t++];
            if (t === e[0] && (i = !0), o < T.TEXT_COMPACTION_MODE_LATCH)
              s[r] = o, r++;
            else
              switch (o) {
                case T.TEXT_COMPACTION_MODE_LATCH:
                case T.BYTE_COMPACTION_MODE_LATCH:
                case T.BYTE_COMPACTION_MODE_LATCH_6:
                case T.BEGIN_MACRO_PDF417_CONTROL_BLOCK:
                case T.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:
                case T.MACRO_PDF417_TERMINATOR:
                  t--, i = !0;
                  break;
              }
            (r % T.MAX_NUMERIC_CODEWORDS === 0 || o === T.NUMERIC_COMPACTION_MODE_LATCH || i) && r > 0 && (n.append(T.decodeBase900toBase10(s, r)), r = 0);
          }
          return t;
        }
        /**
         * Convert a list of Numeric Compacted codewords from Base 900 to Base 10.
         *
         * @param codewords The array of codewords
         * @param count     The number of codewords
         * @return The decoded string representing the Numeric data.
         *
         * EXAMPLE
         * Encode the fifteen digit numeric string 000213298174000
         * Prefix the numeric string with a 1 and set the initial value of
         * t = 1 000 213 298 174 000
         * Calculate codeword 0
         * d0 = 1 000 213 298 174 000 mod 900 = 200
         *
         * t = 1 000 213 298 174 000 div 900 = 1 111 348 109 082
         * Calculate codeword 1
         * d1 = 1 111 348 109 082 mod 900 = 282
         *
         * t = 1 111 348 109 082 div 900 = 1 234 831 232
         * Calculate codeword 2
         * d2 = 1 234 831 232 mod 900 = 632
         *
         * t = 1 234 831 232 div 900 = 1 372 034
         * Calculate codeword 3
         * d3 = 1 372 034 mod 900 = 434
         *
         * t = 1 372 034 div 900 = 1 524
         * Calculate codeword 4
         * d4 = 1 524 mod 900 = 624
         *
         * t = 1 524 div 900 = 1
         * Calculate codeword 5
         * d5 = 1 mod 900 = 1
         * t = 1 div 900 = 0
         * Codeword sequence is: 1, 624, 434, 632, 282, 200
         *
         * Decode the above codewords involves
         *   1 x 900 power of 5 + 624 x 900 power of 4 + 434 x 900 power of 3 +
         * 632 x 900 power of 2 + 282 x 900 power of 1 + 200 x 900 power of 0 = 1000213298174000
         *
         * Remove leading 1 =>  Result is 000213298174000
         *
         * @throws FormatException
         */
        static decodeBase900toBase10(e, t) {
          let n = Pt(0);
          for (let i = 0; i < t; i++)
            n += T.EXP900[t - i - 1] * Pt(e[i]);
          let r = n.toString();
          if (r.charAt(0) !== "1")
            throw new U();
          return r.substring(1);
        }
      }
      T.TEXT_COMPACTION_MODE_LATCH = 900, T.BYTE_COMPACTION_MODE_LATCH = 901, T.NUMERIC_COMPACTION_MODE_LATCH = 902, T.BYTE_COMPACTION_MODE_LATCH_6 = 924, T.ECI_USER_DEFINED = 925, T.ECI_GENERAL_PURPOSE = 926, T.ECI_CHARSET = 927, T.BEGIN_MACRO_PDF417_CONTROL_BLOCK = 928, T.BEGIN_MACRO_PDF417_OPTIONAL_FIELD = 923, T.MACRO_PDF417_TERMINATOR = 922, T.MODE_SHIFT_TO_BYTE_COMPACTION_MODE = 913, T.MAX_NUMERIC_CODEWORDS = 15, T.MACRO_PDF417_OPTIONAL_FIELD_FILE_NAME = 0, T.MACRO_PDF417_OPTIONAL_FIELD_SEGMENT_COUNT = 1, T.MACRO_PDF417_OPTIONAL_FIELD_TIME_STAMP = 2, T.MACRO_PDF417_OPTIONAL_FIELD_SENDER = 3, T.MACRO_PDF417_OPTIONAL_FIELD_ADDRESSEE = 4, T.MACRO_PDF417_OPTIONAL_FIELD_FILE_SIZE = 5, T.MACRO_PDF417_OPTIONAL_FIELD_CHECKSUM = 6, T.PL = 25, T.LL = 27, T.AS = 27, T.ML = 28, T.AL = 28, T.PS = 29, T.PAL = 29, T.PUNCT_CHARS = `;<>@[\\]_\`~!\r	,:
-.$/"|*()?{}'`, T.MIXED_CHARS = "0123456789&\r	,:#-.$/+%*=^", T.EXP900 = ri() ? is() : [], T.NUMBER_OF_SEQUENCE_CODEWORDS = 2;
      class te {
        constructor() {
        }
        /**
         * @TODO don't pass in minCodewordWidth and maxCodewordWidth, pass in barcode columns for start and stop pattern
         *
         * columns. That way width can be deducted from the pattern column.
         * This approach also allows to detect more details about the barcode, e.g. if a bar type (white or black) is wider
         * than it should be. This can happen if the scanner used a bad blackpoint.
         *
         * @param BitMatrix
         * @param image
         * @param ResultPoint
         * @param imageTopLeft
         * @param ResultPoint
         * @param imageBottomLeft
         * @param ResultPoint
         * @param imageTopRight
         * @param ResultPoint
         * @param imageBottomRight
         * @param int
         * @param minCodewordWidth
         * @param int
         * @param maxCodewordWidth
         *
         * @throws NotFoundException
         * @throws FormatException
         * @throws ChecksumException
         */
        static decode(e, t, n, r, i, s, o) {
          let a = new Wt(e, t, n, r, i), l = null, u = null, d;
          for (let I = !0; ; I = !1) {
            if (t != null && (l = te.getRowIndicatorColumn(e, a, t, !0, s, o)), r != null && (u = te.getRowIndicatorColumn(e, a, r, !1, s, o)), d = te.merge(l, u), d == null)
              throw D.getNotFoundInstance();
            let y = d.getBoundingBox();
            if (I && y != null && (y.getMinY() < a.getMinY() || y.getMaxY() > a.getMaxY()))
              a = y;
            else
              break;
          }
          d.setBoundingBox(a);
          let A = d.getBarcodeColumnCount() + 1;
          d.setDetectionResultColumn(0, l), d.setDetectionResultColumn(A, u);
          let p = l != null;
          for (let I = 1; I <= A; I++) {
            let y = p ? I : A - I;
            if (d.getDetectionResultColumn(y) !== /* null */
            void 0)
              continue;
            let _;
            y === 0 || y === A ? _ = new Jr(a, y === 0) : _ = new In(a), d.setDetectionResultColumn(y, _);
            let N = -1, L = N;
            for (let F = a.getMinY(); F <= a.getMaxY(); F++) {
              if (N = te.getStartColumn(d, y, F, p), N < 0 || N > a.getMaxX()) {
                if (L === -1)
                  continue;
                N = L;
              }
              let P = te.detectCodeword(e, a.getMinX(), a.getMaxX(), p, N, F, s, o);
              P != null && (_.setCodeword(F, P), L = N, s = Math.min(s, P.getWidth()), o = Math.max(o, P.getWidth()));
            }
          }
          return te.createDecoderResult(d);
        }
        /**
         *
         * @param leftRowIndicatorColumn
         * @param rightRowIndicatorColumn
         *
         * @throws NotFoundException
         */
        static merge(e, t) {
          if (e == null && t == null)
            return null;
          let n = te.getBarcodeMetadata(e, t);
          if (n == null)
            return null;
          let r = Wt.merge(te.adjustBoundingBox(e), te.adjustBoundingBox(t));
          return new yn(n, r);
        }
        /**
         *
         * @param rowIndicatorColumn
         *
         * @throws NotFoundException
         */
        static adjustBoundingBox(e) {
          if (e == null)
            return null;
          let t = e.getRowHeights();
          if (t == null)
            return null;
          let n = te.getMax(t), r = 0;
          for (let o of t)
            if (r += n - o, o > 0)
              break;
          let i = e.getCodewords();
          for (let o = 0; r > 0 && i[o] == null; o++)
            r--;
          let s = 0;
          for (let o = t.length - 1; o >= 0 && (s += n - t[o], !(t[o] > 0)); o--)
            ;
          for (let o = i.length - 1; s > 0 && i[o] == null; o--)
            s--;
          return e.getBoundingBox().addMissingRows(r, s, e.isLeft());
        }
        static getMax(e) {
          let t = -1;
          for (let n of e)
            t = Math.max(t, n);
          return t;
        }
        static getBarcodeMetadata(e, t) {
          let n;
          if (e == null || (n = e.getBarcodeMetadata()) == null)
            return t == null ? null : t.getBarcodeMetadata();
          let r;
          return t == null || (r = t.getBarcodeMetadata()) == null ? n : n.getColumnCount() !== r.getColumnCount() && n.getErrorCorrectionLevel() !== r.getErrorCorrectionLevel() && n.getRowCount() !== r.getRowCount() ? null : n;
        }
        static getRowIndicatorColumn(e, t, n, r, i, s) {
          let o = new Jr(t, r);
          for (let a = 0; a < 2; a++) {
            let l = a === 0 ? 1 : -1, u = Math.trunc(Math.trunc(n.getX()));
            for (let d = Math.trunc(Math.trunc(n.getY())); d <= t.getMaxY() && d >= t.getMinY(); d += l) {
              let A = te.detectCodeword(e, 0, e.getWidth(), r, u, d, i, s);
              A != null && (o.setCodeword(d, A), r ? u = A.getStartX() : u = A.getEndX());
            }
          }
          return o;
        }
        /**
         *
         * @param detectionResult
         * @param BarcodeValue
         * @param param2
         * @param param3
         * @param barcodeMatrix
         *
         * @throws NotFoundException
         */
        static adjustCodewordCount(e, t) {
          let n = t[0][1], r = n.getValue(), i = e.getBarcodeColumnCount() * e.getBarcodeRowCount() - te.getNumberOfECCodeWords(e.getBarcodeECLevel());
          if (r.length === 0) {
            if (i < 1 || i > j.MAX_CODEWORDS_IN_BARCODE)
              throw D.getNotFoundInstance();
            n.setValue(i);
          } else r[0] !== i && n.setValue(i);
        }
        /**
         *
         * @param detectionResult
         *
         * @throws FormatException
         * @throws ChecksumException
         * @throws NotFoundException
         */
        static createDecoderResult(e) {
          let t = te.createBarcodeMatrix(e);
          te.adjustCodewordCount(e, t);
          let n = new Array(), r = new Int32Array(e.getBarcodeRowCount() * e.getBarcodeColumnCount()), i = (
            /*List<int[]>*/
            []
          ), s = (
            /*Collection<Integer>*/
            new Array()
          );
          for (let a = 0; a < e.getBarcodeRowCount(); a++)
            for (let l = 0; l < e.getBarcodeColumnCount(); l++) {
              let u = t[a][l + 1].getValue(), d = a * e.getBarcodeColumnCount() + l;
              u.length === 0 ? n.push(d) : u.length === 1 ? r[d] = u[0] : (s.push(d), i.push(u));
            }
          let o = new Array(i.length);
          for (let a = 0; a < o.length; a++)
            o[a] = i[a];
          return te.createDecoderResultFromAmbiguousValues(e.getBarcodeECLevel(), r, j.toIntArray(n), j.toIntArray(s), o);
        }
        /**
         * This method deals with the fact, that the decoding process doesn't always yield a single most likely value. The
         * current error correction implementation doesn't deal with erasures very well, so it's better to provide a value
         * for these ambiguous codewords instead of treating it as an erasure. The problem is that we don't know which of
         * the ambiguous values to choose. We try decode using the first value, and if that fails, we use another of the
         * ambiguous values and try to decode again. This usually only happens on very hard to read and decode barcodes,
         * so decoding the normal barcodes is not affected by this.
         *
         * @param erasureArray contains the indexes of erasures
         * @param ambiguousIndexes array with the indexes that have more than one most likely value
         * @param ambiguousIndexValues two dimensional array that contains the ambiguous values. The first dimension must
         * be the same length as the ambiguousIndexes array
         *
         * @throws FormatException
         * @throws ChecksumException
         */
        static createDecoderResultFromAmbiguousValues(e, t, n, r, i) {
          let s = new Int32Array(r.length), o = 100;
          for (; o-- > 0; ) {
            for (let a = 0; a < s.length; a++)
              t[r[a]] = i[a][s[a]];
            try {
              return te.decodeCodewords(t, e, n);
            } catch (a) {
              if (!(a instanceof q))
                throw a;
            }
            if (s.length === 0)
              throw q.getChecksumInstance();
            for (let a = 0; a < s.length; a++)
              if (s[a] < i[a].length - 1) {
                s[a]++;
                break;
              } else if (s[a] = 0, a === s.length - 1)
                throw q.getChecksumInstance();
          }
          throw q.getChecksumInstance();
        }
        static createBarcodeMatrix(e) {
          let t = Array.from({ length: e.getBarcodeRowCount() }, () => new Array(e.getBarcodeColumnCount() + 2));
          for (let r = 0; r < t.length; r++)
            for (let i = 0; i < t[r].length; i++)
              t[r][i] = new bn();
          let n = 0;
          for (let r of e.getDetectionResultColumns()) {
            if (r != null) {
              for (let i of r.getCodewords())
                if (i != null) {
                  let s = i.getRowNumber();
                  if (s >= 0) {
                    if (s >= t.length)
                      continue;
                    t[s][n].setValue(i.getValue());
                  }
                }
            }
            n++;
          }
          return t;
        }
        static isValidBarcodeColumn(e, t) {
          return t >= 0 && t <= e.getBarcodeColumnCount() + 1;
        }
        static getStartColumn(e, t, n, r) {
          let i = r ? 1 : -1, s = null;
          if (te.isValidBarcodeColumn(e, t - i) && (s = e.getDetectionResultColumn(t - i).getCodeword(n)), s != null)
            return r ? s.getEndX() : s.getStartX();
          if (s = e.getDetectionResultColumn(t).getCodewordNearby(n), s != null)
            return r ? s.getStartX() : s.getEndX();
          if (te.isValidBarcodeColumn(e, t - i) && (s = e.getDetectionResultColumn(t - i).getCodewordNearby(n)), s != null)
            return r ? s.getEndX() : s.getStartX();
          let o = 0;
          for (; te.isValidBarcodeColumn(e, t - i); ) {
            t -= i;
            for (let a of e.getDetectionResultColumn(t).getCodewords())
              if (a != null)
                return (r ? a.getEndX() : a.getStartX()) + i * o * (a.getEndX() - a.getStartX());
            o++;
          }
          return r ? e.getBoundingBox().getMinX() : e.getBoundingBox().getMaxX();
        }
        static detectCodeword(e, t, n, r, i, s, o, a) {
          i = te.adjustCodewordStartColumn(e, t, n, r, i, s);
          let l = te.getModuleBitCount(e, t, n, r, i, s);
          if (l == null)
            return null;
          let u, d = oe.sum(l);
          if (r)
            u = i + d;
          else {
            for (let I = 0; I < l.length / 2; I++) {
              let y = l[I];
              l[I] = l[l.length - 1 - I], l[l.length - 1 - I] = y;
            }
            u = i, i = u - d;
          }
          if (!te.checkCodewordSkew(d, o, a))
            return null;
          let A = rt.getDecodedValue(l), p = j.getCodeword(A);
          return p === -1 ? null : new _n(i, u, te.getCodewordBucketNumber(A), p);
        }
        static getModuleBitCount(e, t, n, r, i, s) {
          let o = i, a = new Int32Array(8), l = 0, u = r ? 1 : -1, d = r;
          for (; (r ? o < n : o >= t) && l < a.length; )
            e.get(o, s) === d ? (a[l]++, o += u) : (l++, d = !d);
          return l === a.length || o === (r ? n : t) && l === a.length - 1 ? a : null;
        }
        static getNumberOfECCodeWords(e) {
          return 2 << e;
        }
        static adjustCodewordStartColumn(e, t, n, r, i, s) {
          let o = i, a = r ? -1 : 1;
          for (let l = 0; l < 2; l++) {
            for (; (r ? o >= t : o < n) && r === e.get(o, s); ) {
              if (Math.abs(i - o) > te.CODEWORD_SKEW_SIZE)
                return i;
              o += a;
            }
            a = -a, r = !r;
          }
          return o;
        }
        static checkCodewordSkew(e, t, n) {
          return t - te.CODEWORD_SKEW_SIZE <= e && e <= n + te.CODEWORD_SKEW_SIZE;
        }
        /**
         * @throws FormatException,
         * @throws ChecksumException
         */
        static decodeCodewords(e, t, n) {
          if (e.length === 0)
            throw U.getFormatInstance();
          let r = 1 << t + 1, i = te.correctErrors(e, n, r);
          te.verifyCodewordCount(e, r);
          let s = T.decode(e, "" + t);
          return s.setErrorsCorrected(i), s.setErasures(n.length), s;
        }
        /**
         * <p>Given data and error-correction codewords received, possibly corrupted by errors, attempts to
         * correct the errors in-place.</p>
         *
         * @param codewords   data and error correction codewords
         * @param erasures positions of any known erasures
         * @param numECCodewords number of error correction codewords that are available in codewords
         * @throws ChecksumException if error correction fails
         */
        static correctErrors(e, t, n) {
          if (t != null && t.length > n / 2 + te.MAX_ERRORS || n < 0 || n > te.MAX_EC_CODEWORDS)
            throw q.getChecksumInstance();
          return te.errorCorrection.decode(e, n, t);
        }
        /**
         * Verify that all is OK with the codeword array.
         * @throws FormatException
         */
        static verifyCodewordCount(e, t) {
          if (e.length < 4)
            throw U.getFormatInstance();
          let n = e[0];
          if (n > e.length)
            throw U.getFormatInstance();
          if (n === 0)
            if (t < e.length)
              e[0] = e.length - t;
            else
              throw U.getFormatInstance();
        }
        static getBitCountForCodeword(e) {
          let t = new Int32Array(8), n = 0, r = t.length - 1;
          for (; !((e & 1) !== n && (n = e & 1, r--, r < 0)); )
            t[r]++, e >>= 1;
          return t;
        }
        static getCodewordBucketNumber(e) {
          return e instanceof Int32Array ? this.getCodewordBucketNumber_Int32Array(e) : this.getCodewordBucketNumber_number(e);
        }
        static getCodewordBucketNumber_number(e) {
          return te.getCodewordBucketNumber(te.getBitCountForCodeword(e));
        }
        static getCodewordBucketNumber_Int32Array(e) {
          return (e[0] - e[2] + e[4] - e[6] + 9) % 9;
        }
        static toString(e) {
          let t = new mn();
          for (let n = 0; n < e.length; n++) {
            t.format("Row %2d: ", n);
            for (let r = 0; r < e[n].length; r++) {
              let i = e[n][r];
              i.getValue().length === 0 ? t.format("        ", null) : t.format("%4d(%2d)", i.getValue()[0], i.getConfidence(i.getValue()[0]));
            }
            t.format("%n");
          }
          return t.toString();
        }
      }
      te.CODEWORD_SKEW_SIZE = 2, te.MAX_ERRORS = 3, te.MAX_EC_CODEWORDS = 512, te.errorCorrection = new $r();
      class ze {
        // private static /*final Result[]*/ EMPTY_RESULT_ARRAY: Result[] = new Result([0]);
        /**
         * Locates and decodes a PDF417 code in an image.
         *
         * @return a String representing the content encoded by the PDF417 code
         * @throws NotFoundException if a PDF417 code cannot be found,
         * @throws FormatException if a PDF417 cannot be decoded
         * @throws ChecksumException
         */
        // @Override
        decode(e, t = null) {
          let n = ze.decode(e, t, !1);
          if (n == null || n.length === 0 || n[0] == null)
            throw D.getNotFoundInstance();
          return n[0];
        }
        /**
         *
         * @param BinaryBitmap
         * @param image
         * @throws NotFoundException
         */
        //   @Override
        decodeMultiple(e, t = null) {
          try {
            return ze.decode(e, t, !0);
          } catch (n) {
            throw n instanceof U || n instanceof q ? D.getNotFoundInstance() : n;
          }
        }
        /**
         *
         * @param image
         * @param hints
         * @param multiple
         *
         * @throws NotFoundException
         * @throws FormatExceptionß
         * @throws ChecksumException
         */
        static decode(e, t, n) {
          const r = new Array(), i = ee.detectMultiple(e, t, n);
          for (const s of i.getPoints()) {
            const o = te.decode(i.getBits(), s[4], s[5], s[6], s[7], ze.getMinCodewordWidth(s), ze.getMaxCodewordWidth(s)), a = new qe(o.getText(), o.getRawBytes(), void 0, s, Y.PDF_417);
            a.putMetadata(Ue.ERROR_CORRECTION_LEVEL, o.getECLevel());
            const l = o.getOther();
            l != null && a.putMetadata(Ue.PDF417_EXTRA_METADATA, l), r.push(a);
          }
          return r.map((s) => s);
        }
        static getMaxWidth(e, t) {
          return e == null || t == null ? 0 : Math.trunc(Math.abs(e.getX() - t.getX()));
        }
        static getMinWidth(e, t) {
          return e == null || t == null ? K.MAX_VALUE : Math.trunc(Math.abs(e.getX() - t.getX()));
        }
        static getMaxCodewordWidth(e) {
          return Math.floor(Math.max(Math.max(ze.getMaxWidth(e[0], e[4]), ze.getMaxWidth(e[6], e[2]) * j.MODULES_IN_CODEWORD / j.MODULES_IN_STOP_PATTERN), Math.max(ze.getMaxWidth(e[1], e[5]), ze.getMaxWidth(e[7], e[3]) * j.MODULES_IN_CODEWORD / j.MODULES_IN_STOP_PATTERN)));
        }
        static getMinCodewordWidth(e) {
          return Math.floor(Math.min(Math.min(ze.getMinWidth(e[0], e[4]), ze.getMinWidth(e[6], e[2]) * j.MODULES_IN_CODEWORD / j.MODULES_IN_STOP_PATTERN), Math.min(ze.getMinWidth(e[1], e[5]), ze.getMinWidth(e[7], e[3]) * j.MODULES_IN_CODEWORD / j.MODULES_IN_STOP_PATTERN)));
        }
        // @Override
        reset() {
        }
      }
      class Yn extends m {
      }
      Yn.kind = "ReaderException";
      class ii {
        /**
         * Creates an instance of this class
         * 
         * @param {Boolean} verbose if 'true' logs will be dumped to console, otherwise hidden.
         * @param hints The hints to use, clearing the previous state.
         */
        constructor(e, t) {
          this.verbose = e === !0, t && this.setHints(t);
        }
        /**
         * This version of decode honors the intent of Reader.decode(BinaryBitmap) in that it
         * passes null as a hint to the decoders. However, that makes it inefficient to call repeatedly.
         * Use setHints() followed by decodeWithState() for continuous scan applications.
         *
         * @param image The pixel data to decode
         * @return The contents of the image
         *
         * @throws NotFoundException Any errors which occurred
         */
        /*@Override*/
        // public decode(image: BinaryBitmap): Result {
        //   setHints(null)
        //   return decodeInternal(image)
        // }
        /**
         * Decode an image using the hints provided. Does not honor existing state.
         *
         * @param image The pixel data to decode
         * @param hints The hints to use, clearing the previous state.
         * @return The contents of the image
         *
         * @throws NotFoundException Any errors which occurred
         */
        /*@Override*/
        decode(e, t) {
          return t && this.setHints(t), this.decodeInternal(e);
        }
        /**
         * Decode an image using the state set up by calling setHints() previously. Continuous scan
         * clients will get a <b>large</b> speed increase by using this instead of decode().
         *
         * @param image The pixel data to decode
         * @return The contents of the image
         *
         * @throws NotFoundException Any errors which occurred
         */
        decodeWithState(e) {
          return (this.readers === null || this.readers === void 0) && this.setHints(null), this.decodeInternal(e);
        }
        /**
         * This method adds state to the MultiFormatReader. By setting the hints once, subsequent calls
         * to decodeWithState(image) can reuse the same set of readers without reallocating memory. This
         * is important for performance in continuous scan clients.
         *
         * @param hints The set of hints to use for subsequent calls to decode(image)
         */
        setHints(e) {
          this.hints = e;
          const t = !w(e) && e.get(xe.TRY_HARDER) === !0, n = w(e) ? null : e.get(xe.POSSIBLE_FORMATS), r = new Array();
          if (!w(n)) {
            const i = n.some((s) => s === Y.UPC_A || s === Y.UPC_E || s === Y.EAN_13 || s === Y.EAN_8 || s === Y.CODABAR || s === Y.CODE_39 || s === Y.CODE_93 || s === Y.CODE_128 || s === Y.ITF || s === Y.RSS_14 || s === Y.RSS_EXPANDED);
            i && !t && r.push(new nn(e, this.verbose)), n.includes(Y.QR_CODE) && r.push(new Bt()), n.includes(Y.DATA_MATRIX) && r.push(new vt()), n.includes(Y.AZTEC) && r.push(new Vn()), n.includes(Y.PDF_417) && r.push(new ze()), i && t && r.push(new nn(e, this.verbose));
          }
          r.length === 0 && (t || r.push(new nn(e, this.verbose)), r.push(new Bt()), r.push(new vt()), r.push(new Vn()), r.push(new ze()), t && r.push(new nn(e, this.verbose))), this.readers = r;
        }
        /*@Override*/
        reset() {
          if (this.readers !== null)
            for (const e of this.readers)
              e.reset();
        }
        /**
         * @throws NotFoundException
         */
        decodeInternal(e) {
          if (this.readers === null)
            throw new Yn("No readers where selected, nothing can be read.");
          for (const t of this.readers)
            try {
              return t.decode(e, this.hints);
            } catch (n) {
              if (n instanceof Yn)
                continue;
            }
          throw new D("No MultiFormat Readers were able to detect the code.");
        }
      }
      class ss extends Ut {
        constructor(e = null, t = 500) {
          const n = new ii();
          n.setHints(e), super(n, t);
        }
        /**
         * Overwrite decodeBitmap to call decodeWithState, which will pay
         * attention to the hints set in the constructor function
         */
        decodeBitmap(e) {
          return this.reader.decodeWithState(e);
        }
      }
      class os extends Ut {
        /**
         * Creates an instance of BrowserPDF417Reader.
         * @param {number} [timeBetweenScansMillis=500] the time delay between subsequent decode tries
         */
        constructor(e = 500) {
          super(new ze(), e);
        }
      }
      class as extends Ut {
        /**
         * Creates an instance of BrowserQRCodeReader.
         * @param {number} [timeBetweenScansMillis=500] the time delay between subsequent decode tries
         */
        constructor(e = 500) {
          super(new Bt(), e);
        }
      }
      var Ir;
      (function(f) {
        f[f.ERROR_CORRECTION = 0] = "ERROR_CORRECTION", f[f.CHARACTER_SET = 1] = "CHARACTER_SET", f[f.DATA_MATRIX_SHAPE = 2] = "DATA_MATRIX_SHAPE", f[f.MIN_SIZE = 3] = "MIN_SIZE", f[f.MAX_SIZE = 4] = "MAX_SIZE", f[f.MARGIN = 5] = "MARGIN", f[f.PDF417_COMPACT = 6] = "PDF417_COMPACT", f[f.PDF417_COMPACTION = 7] = "PDF417_COMPACTION", f[f.PDF417_DIMENSIONS = 8] = "PDF417_DIMENSIONS", f[f.AZTEC_LAYERS = 9] = "AZTEC_LAYERS", f[f.QR_VERSION = 10] = "QR_VERSION";
      })(Ir || (Ir = {}));
      var Le = Ir;
      class br {
        /**
         * A reed solomon error-correcting encoding constructor is created by
         * passing as Galois Field with of size equal to the number of code
         * words (symbols) in the alphabet (the number of values in each
         * element of arrays that are encoded/decoded).
         * @param field A galois field with a number of elements equal to the size
         * of the alphabet of symbols to encode.
         */
        constructor(e) {
          this.field = e, this.cachedGenerators = [], this.cachedGenerators.push(new et(e, Int32Array.from([1])));
        }
        buildGenerator(e) {
          const t = this.cachedGenerators;
          if (e >= t.length) {
            let n = t[t.length - 1];
            const r = this.field;
            for (let i = t.length; i <= e; i++) {
              const s = n.multiply(new et(r, Int32Array.from([1, r.exp(i - 1 + r.getGeneratorBase())])));
              t.push(s), n = s;
            }
          }
          return t[e];
        }
        /**
         * <p>Encode a sequence of code words (symbols) using Reed-Solomon to allow decoders
         * to detect and correct errors that may have been introduced when the resulting
         * data is stored or transmitted.</p>
         *
         * @param toEncode array used for both and output. Caller initializes the array with
         * the code words (symbols) to be encoded followed by empty elements allocated to make
         * space for error-correction code words in the encoded output. The array contains
         * the encdoded output when encode returns. Code words are encoded as numbers from
         * 0 to n-1, where n is the number of possible code words (symbols), as determined
         * by the size of the Galois Field passed in the constructor of this object.
         * @param ecBytes the number of elements reserved in the array (first parameter)
         * to store error-correction code words. Thus, the number of code words (symbols)
         * to encode in the first parameter is thus toEncode.length - ecBytes.
         * Note, the use of "bytes" in the name of this parameter is misleading, as there may
         * be more or fewer than 256 symbols being encoded, as determined by the number of
         * elements in the Galois Field passed as a constructor to this object.
         * @throws IllegalArgumentException thrown in response to validation errros.
         */
        encode(e, t) {
          if (t === 0)
            throw new R("No error correction bytes");
          const n = e.length - t;
          if (n <= 0)
            throw new R("No data bytes provided");
          const r = this.buildGenerator(t), i = new Int32Array(n);
          ie.arraycopy(e, 0, i, 0, n);
          let s = new et(this.field, i);
          s = s.multiplyByMonomial(t, 1);
          const a = s.divide(r)[1].getCoefficients(), l = t - a.length;
          for (let u = 0; u < l; u++)
            e[n + u] = 0;
          ie.arraycopy(a, 0, e, n + l, a.length);
        }
      }
      class Oe {
        constructor() {
        }
        /**
         * Apply mask penalty rule 1 and return the penalty. Find repetitive cells with the same color and
         * give penalty to them. Example: 00000 or 11111.
         */
        static applyMaskPenaltyRule1(e) {
          return Oe.applyMaskPenaltyRule1Internal(e, !0) + Oe.applyMaskPenaltyRule1Internal(e, !1);
        }
        /**
         * Apply mask penalty rule 2 and return the penalty. Find 2x2 blocks with the same color and give
         * penalty to them. This is actually equivalent to the spec's rule, which is to find MxN blocks and give a
         * penalty proportional to (M-1)x(N-1), because this is the number of 2x2 blocks inside such a block.
         */
        static applyMaskPenaltyRule2(e) {
          let t = 0;
          const n = e.getArray(), r = e.getWidth(), i = e.getHeight();
          for (let s = 0; s < i - 1; s++) {
            const o = n[s];
            for (let a = 0; a < r - 1; a++) {
              const l = o[a];
              l === o[a + 1] && l === n[s + 1][a] && l === n[s + 1][a + 1] && t++;
            }
          }
          return Oe.N2 * t;
        }
        /**
         * Apply mask penalty rule 3 and return the penalty. Find consecutive runs of 1:1:3:1:1:4
         * starting with black, or 4:1:1:3:1:1 starting with white, and give penalty to them.  If we
         * find patterns like 000010111010000, we give penalty once.
         */
        static applyMaskPenaltyRule3(e) {
          let t = 0;
          const n = e.getArray(), r = e.getWidth(), i = e.getHeight();
          for (let s = 0; s < i; s++)
            for (let o = 0; o < r; o++) {
              const a = n[s];
              o + 6 < r && a[o] === 1 && a[o + 1] === 0 && a[o + 2] === 1 && a[o + 3] === 1 && a[o + 4] === 1 && a[o + 5] === 0 && a[o + 6] === 1 && (Oe.isWhiteHorizontal(a, o - 4, o) || Oe.isWhiteHorizontal(a, o + 7, o + 11)) && t++, s + 6 < i && n[s][o] === 1 && n[s + 1][o] === 0 && n[s + 2][o] === 1 && n[s + 3][o] === 1 && n[s + 4][o] === 1 && n[s + 5][o] === 0 && n[s + 6][o] === 1 && (Oe.isWhiteVertical(n, o, s - 4, s) || Oe.isWhiteVertical(n, o, s + 7, s + 11)) && t++;
            }
          return t * Oe.N3;
        }
        static isWhiteHorizontal(e, t, n) {
          t = Math.max(t, 0), n = Math.min(n, e.length);
          for (let r = t; r < n; r++)
            if (e[r] === 1)
              return !1;
          return !0;
        }
        static isWhiteVertical(e, t, n, r) {
          n = Math.max(n, 0), r = Math.min(r, e.length);
          for (let i = n; i < r; i++)
            if (e[i][t] === 1)
              return !1;
          return !0;
        }
        /**
         * Apply mask penalty rule 4 and return the penalty. Calculate the ratio of dark cells and give
         * penalty if the ratio is far from 50%. It gives 10 penalty for 5% distance.
         */
        static applyMaskPenaltyRule4(e) {
          let t = 0;
          const n = e.getArray(), r = e.getWidth(), i = e.getHeight();
          for (let a = 0; a < i; a++) {
            const l = n[a];
            for (let u = 0; u < r; u++)
              l[u] === 1 && t++;
          }
          const s = e.getHeight() * e.getWidth();
          return Math.floor(Math.abs(t * 2 - s) * 10 / s) * Oe.N4;
        }
        /**
         * Return the mask bit for "getMaskPattern" at "x" and "y". See 8.8 of JISX0510:2004 for mask
         * pattern conditions.
         */
        static getDataMaskBit(e, t, n) {
          let r, i;
          switch (e) {
            case 0:
              r = n + t & 1;
              break;
            case 1:
              r = n & 1;
              break;
            case 2:
              r = t % 3;
              break;
            case 3:
              r = (n + t) % 3;
              break;
            case 4:
              r = Math.floor(n / 2) + Math.floor(t / 3) & 1;
              break;
            case 5:
              i = n * t, r = (i & 1) + i % 3;
              break;
            case 6:
              i = n * t, r = (i & 1) + i % 3 & 1;
              break;
            case 7:
              i = n * t, r = i % 3 + (n + t & 1) & 1;
              break;
            default:
              throw new R("Invalid mask pattern: " + e);
          }
          return r === 0;
        }
        /**
         * Helper function for applyMaskPenaltyRule1. We need this for doing this calculation in both
         * vertical and horizontal orders respectively.
         */
        static applyMaskPenaltyRule1Internal(e, t) {
          let n = 0;
          const r = t ? e.getHeight() : e.getWidth(), i = t ? e.getWidth() : e.getHeight(), s = e.getArray();
          for (let o = 0; o < r; o++) {
            let a = 0, l = -1;
            for (let u = 0; u < i; u++) {
              const d = t ? s[o][u] : s[u][o];
              d === l ? a++ : (a >= 5 && (n += Oe.N1 + (a - 5)), a = 1, l = d);
            }
            a >= 5 && (n += Oe.N1 + (a - 5));
          }
          return n;
        }
      }
      Oe.N1 = 3, Oe.N2 = 3, Oe.N3 = 40, Oe.N4 = 10;
      class Zn {
        constructor(e, t) {
          this.width = e, this.height = t;
          const n = new Array(t);
          for (let r = 0; r !== t; r++)
            n[r] = new Uint8Array(e);
          this.bytes = n;
        }
        getHeight() {
          return this.height;
        }
        getWidth() {
          return this.width;
        }
        get(e, t) {
          return this.bytes[t][e];
        }
        /**
         * @return an internal representation as bytes, in row-major order. array[y][x] represents point (x,y)
         */
        getArray() {
          return this.bytes;
        }
        // TYPESCRIPTPORT: preffer to let two methods instead of override to avoid type comparison inside
        setNumber(e, t, n) {
          this.bytes[t][e] = n;
        }
        // public set(x: number /*int*/, y: number /*int*/, value: number /*int*/): void {
        //   bytes[y][x] = (byte) value
        // }
        setBoolean(e, t, n) {
          this.bytes[t][e] = /*(byte) */
          n ? 1 : 0;
        }
        clear(e) {
          for (const t of this.bytes)
            pe.fill(t, e);
        }
        equals(e) {
          if (!(e instanceof Zn))
            return !1;
          const t = e;
          if (this.width !== t.width || this.height !== t.height)
            return !1;
          for (let n = 0, r = this.height; n < r; ++n) {
            const i = this.bytes[n], s = t.bytes[n];
            for (let o = 0, a = this.width; o < a; ++o)
              if (i[o] !== s[o])
                return !1;
          }
          return !0;
        }
        /*@Override*/
        toString() {
          const e = new ge();
          for (let t = 0, n = this.height; t < n; ++t) {
            const r = this.bytes[t];
            for (let i = 0, s = this.width; i < s; ++i)
              switch (r[i]) {
                case 0:
                  e.append(" 0");
                  break;
                case 1:
                  e.append(" 1");
                  break;
                default:
                  e.append("  ");
                  break;
              }
            e.append(`
`);
          }
          return e.toString();
        }
      }
      class Xt {
        constructor() {
          this.maskPattern = -1;
        }
        getMode() {
          return this.mode;
        }
        getECLevel() {
          return this.ecLevel;
        }
        getVersion() {
          return this.version;
        }
        getMaskPattern() {
          return this.maskPattern;
        }
        getMatrix() {
          return this.matrix;
        }
        /*@Override*/
        toString() {
          const e = new ge();
          return e.append(`<<
`), e.append(" mode: "), e.append(this.mode ? this.mode.toString() : "null"), e.append(`
 ecLevel: `), e.append(this.ecLevel ? this.ecLevel.toString() : "null"), e.append(`
 version: `), e.append(this.version ? this.version.toString() : "null"), e.append(`
 maskPattern: `), e.append(this.maskPattern.toString()), this.matrix ? (e.append(`
 matrix:
`), e.append(this.matrix.toString())) : e.append(`
 matrix: null
`), e.append(`>>
`), e.toString();
        }
        setMode(e) {
          this.mode = e;
        }
        setECLevel(e) {
          this.ecLevel = e;
        }
        setVersion(e) {
          this.version = e;
        }
        setMaskPattern(e) {
          this.maskPattern = e;
        }
        setMatrix(e) {
          this.matrix = e;
        }
        // Check if "mask_pattern" is valid.
        static isValidMaskPattern(e) {
          return e >= 0 && e < Xt.NUM_MASK_PATTERNS;
        }
      }
      Xt.NUM_MASK_PATTERNS = 8;
      class Ee extends m {
      }
      Ee.kind = "WriterException";
      class Z {
        constructor() {
        }
        // Set all cells to -1 (TYPESCRIPTPORT: 255).  -1 (TYPESCRIPTPORT: 255) means that the cell is empty (not set yet).
        //
        // JAVAPORT: We shouldn't need to do this at all. The code should be rewritten to begin encoding
        // with the ByteMatrix initialized all to zero.
        static clearMatrix(e) {
          e.clear(
            /*(byte) */
            /*-1*/
            255
          );
        }
        // Build 2D matrix of QR Code from "dataBits" with "ecLevel", "version" and "getMaskPattern". On
        // success, store the result in "matrix" and return true.
        static buildMatrix(e, t, n, r, i) {
          Z.clearMatrix(i), Z.embedBasicPatterns(n, i), Z.embedTypeInfo(t, r, i), Z.maybeEmbedVersionInfo(n, i), Z.embedDataBits(e, r, i);
        }
        // Embed basic patterns. On success, modify the matrix and return true.
        // The basic patterns are:
        // - Position detection patterns
        // - Timing patterns
        // - Dark dot at the left bottom corner
        // - Position adjustment patterns, if need be
        static embedBasicPatterns(e, t) {
          Z.embedPositionDetectionPatternsAndSeparators(t), Z.embedDarkDotAtLeftBottomCorner(t), Z.maybeEmbedPositionAdjustmentPatterns(e, t), Z.embedTimingPatterns(t);
        }
        // Embed type information. On success, modify the matrix.
        static embedTypeInfo(e, t, n) {
          const r = new le();
          Z.makeTypeInfoBits(e, t, r);
          for (let i = 0, s = r.getSize(); i < s; ++i) {
            const o = r.get(r.getSize() - 1 - i), a = Z.TYPE_INFO_COORDINATES[i], l = a[0], u = a[1];
            if (n.setBoolean(l, u, o), i < 8) {
              const d = n.getWidth() - i - 1;
              n.setBoolean(d, 8, o);
            } else {
              const A = n.getHeight() - 7 + (i - 8);
              n.setBoolean(8, A, o);
            }
          }
        }
        // Embed version information if need be. On success, modify the matrix and return true.
        // See 8.10 of JISX0510:2004 (p.47) for how to embed version information.
        static maybeEmbedVersionInfo(e, t) {
          if (e.getVersionNumber() < 7)
            return;
          const n = new le();
          Z.makeVersionInfoBits(e, n);
          let r = 6 * 3 - 1;
          for (let i = 0; i < 6; ++i)
            for (let s = 0; s < 3; ++s) {
              const o = n.get(r);
              r--, t.setBoolean(i, t.getHeight() - 11 + s, o), t.setBoolean(t.getHeight() - 11 + s, i, o);
            }
        }
        // Embed "dataBits" using "getMaskPattern". On success, modify the matrix and return true.
        // For debugging purposes, it skips masking process if "getMaskPattern" is -1(TYPESCRIPTPORT: 255).
        // See 8.7 of JISX0510:2004 (p.38) for how to embed data bits.
        static embedDataBits(e, t, n) {
          let r = 0, i = -1, s = n.getWidth() - 1, o = n.getHeight() - 1;
          for (; s > 0; ) {
            for (s === 6 && (s -= 1); o >= 0 && o < n.getHeight(); ) {
              for (let a = 0; a < 2; ++a) {
                const l = s - a;
                if (!Z.isEmpty(n.get(l, o)))
                  continue;
                let u;
                r < e.getSize() ? (u = e.get(r), ++r) : u = !1, t !== 255 && Oe.getDataMaskBit(t, l, o) && (u = !u), n.setBoolean(l, o, u);
              }
              o += i;
            }
            i = -i, o += i, s -= 2;
          }
          if (r !== e.getSize())
            throw new Ee("Not all bits consumed: " + r + "/" + e.getSize());
        }
        // Return the position of the most significant bit set (one: to) in the "value". The most
        // significant bit is position 32. If there is no bit set, return 0. Examples:
        // - findMSBSet(0) => 0
        // - findMSBSet(1) => 1
        // - findMSBSet(255) => 8
        static findMSBSet(e) {
          return 32 - K.numberOfLeadingZeros(e);
        }
        // Calculate BCH (Bose-Chaudhuri-Hocquenghem) code for "value" using polynomial "poly". The BCH
        // code is used for encoding type information and version information.
        // Example: Calculation of version information of 7.
        // f(x) is created from 7.
        //   - 7 = 000111 in 6 bits
        //   - f(x) = x^2 + x^1 + x^0
        // g(x) is given by the standard (p. 67)
        //   - g(x) = x^12 + x^11 + x^10 + x^9 + x^8 + x^5 + x^2 + 1
        // Multiply f(x) by x^(18 - 6)
        //   - f'(x) = f(x) * x^(18 - 6)
        //   - f'(x) = x^14 + x^13 + x^12
        // Calculate the remainder of f'(x) / g(x)
        //         x^2
        //         __________________________________________________
        //   g(x) )x^14 + x^13 + x^12
        //         x^14 + x^13 + x^12 + x^11 + x^10 + x^7 + x^4 + x^2
        //         --------------------------------------------------
        //                              x^11 + x^10 + x^7 + x^4 + x^2
        //
        // The remainder is x^11 + x^10 + x^7 + x^4 + x^2
        // Encode it in binary: 110010010100
        // The return value is 0xc94 (1100 1001 0100)
        //
        // Since all coefficients in the polynomials are 1 or 0, we can do the calculation by bit
        // operations. We don't care if coefficients are positive or negative.
        static calculateBCHCode(e, t) {
          if (t === 0)
            throw new R("0 polynomial");
          const n = Z.findMSBSet(t);
          for (e <<= n - 1; Z.findMSBSet(e) >= n; )
            e ^= t << Z.findMSBSet(e) - n;
          return e;
        }
        // Make bit vector of type information. On success, store the result in "bits" and return true.
        // Encode error correction level and mask pattern. See 8.9 of
        // JISX0510:2004 (p.45) for details.
        static makeTypeInfoBits(e, t, n) {
          if (!Xt.isValidMaskPattern(t))
            throw new Ee("Invalid mask pattern");
          const r = e.getBits() << 3 | t;
          n.appendBits(r, 5);
          const i = Z.calculateBCHCode(r, Z.TYPE_INFO_POLY);
          n.appendBits(i, 10);
          const s = new le();
          if (s.appendBits(Z.TYPE_INFO_MASK_PATTERN, 15), n.xor(s), n.getSize() !== 15)
            throw new Ee("should not happen but we got: " + n.getSize());
        }
        // Make bit vector of version information. On success, store the result in "bits" and return true.
        // See 8.10 of JISX0510:2004 (p.45) for details.
        static makeVersionInfoBits(e, t) {
          t.appendBits(e.getVersionNumber(), 6);
          const n = Z.calculateBCHCode(e.getVersionNumber(), Z.VERSION_INFO_POLY);
          if (t.appendBits(n, 12), t.getSize() !== 18)
            throw new Ee("should not happen but we got: " + t.getSize());
        }
        // Check if "value" is empty.
        static isEmpty(e) {
          return e === 255;
        }
        static embedTimingPatterns(e) {
          for (let t = 8; t < e.getWidth() - 8; ++t) {
            const n = (t + 1) % 2;
            Z.isEmpty(e.get(t, 6)) && e.setNumber(t, 6, n), Z.isEmpty(e.get(6, t)) && e.setNumber(6, t, n);
          }
        }
        // Embed the lonely dark dot at left bottom corner. JISX0510:2004 (p.46)
        static embedDarkDotAtLeftBottomCorner(e) {
          if (e.get(8, e.getHeight() - 8) === 0)
            throw new Ee();
          e.setNumber(8, e.getHeight() - 8, 1);
        }
        static embedHorizontalSeparationPattern(e, t, n) {
          for (let r = 0; r < 8; ++r) {
            if (!Z.isEmpty(n.get(e + r, t)))
              throw new Ee();
            n.setNumber(e + r, t, 0);
          }
        }
        static embedVerticalSeparationPattern(e, t, n) {
          for (let r = 0; r < 7; ++r) {
            if (!Z.isEmpty(n.get(e, t + r)))
              throw new Ee();
            n.setNumber(e, t + r, 0);
          }
        }
        static embedPositionAdjustmentPattern(e, t, n) {
          for (let r = 0; r < 5; ++r) {
            const i = Z.POSITION_ADJUSTMENT_PATTERN[r];
            for (let s = 0; s < 5; ++s)
              n.setNumber(e + s, t + r, i[s]);
          }
        }
        static embedPositionDetectionPattern(e, t, n) {
          for (let r = 0; r < 7; ++r) {
            const i = Z.POSITION_DETECTION_PATTERN[r];
            for (let s = 0; s < 7; ++s)
              n.setNumber(e + s, t + r, i[s]);
          }
        }
        // Embed position detection patterns and surrounding vertical/horizontal separators.
        static embedPositionDetectionPatternsAndSeparators(e) {
          const t = Z.POSITION_DETECTION_PATTERN[0].length;
          Z.embedPositionDetectionPattern(0, 0, e), Z.embedPositionDetectionPattern(e.getWidth() - t, 0, e), Z.embedPositionDetectionPattern(0, e.getWidth() - t, e);
          const n = 8;
          Z.embedHorizontalSeparationPattern(0, n - 1, e), Z.embedHorizontalSeparationPattern(e.getWidth() - n, n - 1, e), Z.embedHorizontalSeparationPattern(0, e.getWidth() - n, e);
          const r = 7;
          Z.embedVerticalSeparationPattern(r, 0, e), Z.embedVerticalSeparationPattern(e.getHeight() - r - 1, 0, e), Z.embedVerticalSeparationPattern(r, e.getHeight() - r, e);
        }
        // Embed position adjustment patterns if need be.
        static maybeEmbedPositionAdjustmentPatterns(e, t) {
          if (e.getVersionNumber() < 2)
            return;
          const n = e.getVersionNumber() - 1, r = Z.POSITION_ADJUSTMENT_PATTERN_COORDINATE_TABLE[n];
          for (let i = 0, s = r.length; i !== s; i++) {
            const o = r[i];
            if (o >= 0)
              for (let a = 0; a !== s; a++) {
                const l = r[a];
                l >= 0 && Z.isEmpty(t.get(l, o)) && Z.embedPositionAdjustmentPattern(l - 2, o - 2, t);
              }
          }
        }
      }
      Z.POSITION_DETECTION_PATTERN = Array.from([
        Int32Array.from([1, 1, 1, 1, 1, 1, 1]),
        Int32Array.from([1, 0, 0, 0, 0, 0, 1]),
        Int32Array.from([1, 0, 1, 1, 1, 0, 1]),
        Int32Array.from([1, 0, 1, 1, 1, 0, 1]),
        Int32Array.from([1, 0, 1, 1, 1, 0, 1]),
        Int32Array.from([1, 0, 0, 0, 0, 0, 1]),
        Int32Array.from([1, 1, 1, 1, 1, 1, 1])
      ]), Z.POSITION_ADJUSTMENT_PATTERN = Array.from([
        Int32Array.from([1, 1, 1, 1, 1]),
        Int32Array.from([1, 0, 0, 0, 1]),
        Int32Array.from([1, 0, 1, 0, 1]),
        Int32Array.from([1, 0, 0, 0, 1]),
        Int32Array.from([1, 1, 1, 1, 1])
      ]), Z.POSITION_ADJUSTMENT_PATTERN_COORDINATE_TABLE = Array.from([
        Int32Array.from([-1, -1, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 18, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 22, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 26, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 30, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 34, -1, -1, -1, -1, -1]),
        Int32Array.from([6, 22, 38, -1, -1, -1, -1]),
        Int32Array.from([6, 24, 42, -1, -1, -1, -1]),
        Int32Array.from([6, 26, 46, -1, -1, -1, -1]),
        Int32Array.from([6, 28, 50, -1, -1, -1, -1]),
        Int32Array.from([6, 30, 54, -1, -1, -1, -1]),
        Int32Array.from([6, 32, 58, -1, -1, -1, -1]),
        Int32Array.from([6, 34, 62, -1, -1, -1, -1]),
        Int32Array.from([6, 26, 46, 66, -1, -1, -1]),
        Int32Array.from([6, 26, 48, 70, -1, -1, -1]),
        Int32Array.from([6, 26, 50, 74, -1, -1, -1]),
        Int32Array.from([6, 30, 54, 78, -1, -1, -1]),
        Int32Array.from([6, 30, 56, 82, -1, -1, -1]),
        Int32Array.from([6, 30, 58, 86, -1, -1, -1]),
        Int32Array.from([6, 34, 62, 90, -1, -1, -1]),
        Int32Array.from([6, 28, 50, 72, 94, -1, -1]),
        Int32Array.from([6, 26, 50, 74, 98, -1, -1]),
        Int32Array.from([6, 30, 54, 78, 102, -1, -1]),
        Int32Array.from([6, 28, 54, 80, 106, -1, -1]),
        Int32Array.from([6, 32, 58, 84, 110, -1, -1]),
        Int32Array.from([6, 30, 58, 86, 114, -1, -1]),
        Int32Array.from([6, 34, 62, 90, 118, -1, -1]),
        Int32Array.from([6, 26, 50, 74, 98, 122, -1]),
        Int32Array.from([6, 30, 54, 78, 102, 126, -1]),
        Int32Array.from([6, 26, 52, 78, 104, 130, -1]),
        Int32Array.from([6, 30, 56, 82, 108, 134, -1]),
        Int32Array.from([6, 34, 60, 86, 112, 138, -1]),
        Int32Array.from([6, 30, 58, 86, 114, 142, -1]),
        Int32Array.from([6, 34, 62, 90, 118, 146, -1]),
        Int32Array.from([6, 30, 54, 78, 102, 126, 150]),
        Int32Array.from([6, 24, 50, 76, 102, 128, 154]),
        Int32Array.from([6, 28, 54, 80, 106, 132, 158]),
        Int32Array.from([6, 32, 58, 84, 110, 136, 162]),
        Int32Array.from([6, 26, 54, 82, 110, 138, 166]),
        Int32Array.from([6, 30, 58, 86, 114, 142, 170])
      ]), Z.TYPE_INFO_COORDINATES = Array.from([
        Int32Array.from([8, 0]),
        Int32Array.from([8, 1]),
        Int32Array.from([8, 2]),
        Int32Array.from([8, 3]),
        Int32Array.from([8, 4]),
        Int32Array.from([8, 5]),
        Int32Array.from([8, 7]),
        Int32Array.from([8, 8]),
        Int32Array.from([7, 8]),
        Int32Array.from([5, 8]),
        Int32Array.from([4, 8]),
        Int32Array.from([3, 8]),
        Int32Array.from([2, 8]),
        Int32Array.from([1, 8]),
        Int32Array.from([0, 8])
      ]), Z.VERSION_INFO_POLY = 7973, Z.TYPE_INFO_POLY = 1335, Z.TYPE_INFO_MASK_PATTERN = 21522;
      class ls {
        constructor(e, t) {
          this.dataBytes = e, this.errorCorrectionBytes = t;
        }
        getDataBytes() {
          return this.dataBytes;
        }
        getErrorCorrectionBytes() {
          return this.errorCorrectionBytes;
        }
      }
      class be {
        // TYPESCRIPTPORT: changed to UTF8, the default for js
        constructor() {
        }
        // The mask penalty calculation is complicated.  See Table 21 of JISX0510:2004 (p.45) for details.
        // Basically it applies four rules and summate all penalties.
        static calculateMaskPenalty(e) {
          return Oe.applyMaskPenaltyRule1(e) + Oe.applyMaskPenaltyRule2(e) + Oe.applyMaskPenaltyRule3(e) + Oe.applyMaskPenaltyRule4(e);
        }
        /**
         * @param content text to encode
         * @param ecLevel error correction level to use
         * @return {@link QRCode} representing the encoded QR code
         * @throws WriterException if encoding can't succeed, because of for example invalid content
         *   or configuration
         */
        // public static encode(content: string, ecLevel: ErrorCorrectionLevel): QRCode /*throws WriterException*/ {
        //   return encode(content, ecLevel, null)
        // }
        static encode(e, t, n = null) {
          let r = be.DEFAULT_BYTE_MODE_ENCODING;
          const i = n !== null && n.get(Le.CHARACTER_SET) !== void 0;
          i && (r = n.get(Le.CHARACTER_SET).toString());
          const s = this.chooseMode(e, r), o = new le();
          if (s === z.BYTE && (i || be.DEFAULT_BYTE_MODE_ENCODING !== r)) {
            const F = k.getCharacterSetECIByName(r);
            F !== void 0 && this.appendECI(F, o);
          }
          this.appendModeInfo(s, o);
          const a = new le();
          this.appendBytes(e, s, a, r);
          let l;
          if (n !== null && n.get(Le.QR_VERSION) !== void 0) {
            const F = Number.parseInt(n.get(Le.QR_VERSION).toString(), 10);
            l = X.getVersionForNumber(F);
            const P = this.calculateBitsNeeded(s, o, a, l);
            if (!this.willFit(P, l, t))
              throw new Ee("Data too big for requested version");
          } else
            l = this.recommendVersion(t, s, o, a);
          const u = new le();
          u.appendBitArray(o);
          const d = s === z.BYTE ? a.getSizeInBytes() : e.length;
          this.appendLengthInfo(d, l, s, u), u.appendBitArray(a);
          const A = l.getECBlocksForLevel(t), p = l.getTotalCodewords() - A.getTotalECCodewords();
          this.terminateBits(p, u);
          const I = this.interleaveWithECBytes(u, l.getTotalCodewords(), p, A.getNumBlocks()), y = new Xt();
          y.setECLevel(t), y.setMode(s), y.setVersion(l);
          const _ = l.getDimensionForVersion(), N = new Zn(_, _), L = this.chooseMaskPattern(I, t, l, N);
          return y.setMaskPattern(L), Z.buildMatrix(I, t, l, L, N), y.setMatrix(N), y;
        }
        /**
         * Decides the smallest version of QR code that will contain all of the provided data.
         *
         * @throws WriterException if the data cannot fit in any version
         */
        static recommendVersion(e, t, n, r) {
          const i = this.calculateBitsNeeded(t, n, r, X.getVersionForNumber(1)), s = this.chooseVersion(i, e), o = this.calculateBitsNeeded(t, n, r, s);
          return this.chooseVersion(o, e);
        }
        static calculateBitsNeeded(e, t, n, r) {
          return t.getSize() + e.getCharacterCountBits(r) + n.getSize();
        }
        /**
         * @return the code point of the table used in alphanumeric mode or
         *  -1 if there is no corresponding code in the table.
         */
        static getAlphanumericCode(e) {
          return e < be.ALPHANUMERIC_TABLE.length ? be.ALPHANUMERIC_TABLE[e] : -1;
        }
        // public static chooseMode(content: string): Mode {
        //   return chooseMode(content, null);
        // }
        /**
         * Choose the best mode by examining the content. Note that 'encoding' is used as a hint;
         * if it is Shift_JIS, and the input is only double-byte Kanji, then we return {@link Mode#KANJI}.
         */
        static chooseMode(e, t = null) {
          if (k.SJIS.getName() === t && this.isOnlyDoubleByteKanji(e))
            return z.KANJI;
          let n = !1, r = !1;
          for (let i = 0, s = e.length; i < s; ++i) {
            const o = e.charAt(i);
            if (be.isDigit(o))
              n = !0;
            else if (this.getAlphanumericCode(o.charCodeAt(0)) !== -1)
              r = !0;
            else
              return z.BYTE;
          }
          return r ? z.ALPHANUMERIC : n ? z.NUMERIC : z.BYTE;
        }
        static isOnlyDoubleByteKanji(e) {
          let t;
          try {
            t = Je.encode(e, k.SJIS);
          } catch {
            return !1;
          }
          const n = t.length;
          if (n % 2 !== 0)
            return !1;
          for (let r = 0; r < n; r += 2) {
            const i = t[r] & 255;
            if ((i < 129 || i > 159) && (i < 224 || i > 235))
              return !1;
          }
          return !0;
        }
        static chooseMaskPattern(e, t, n, r) {
          let i = Number.MAX_SAFE_INTEGER, s = -1;
          for (let o = 0; o < Xt.NUM_MASK_PATTERNS; o++) {
            Z.buildMatrix(e, t, n, o, r);
            let a = this.calculateMaskPenalty(r);
            a < i && (i = a, s = o);
          }
          return s;
        }
        static chooseVersion(e, t) {
          for (let n = 1; n <= 40; n++) {
            const r = X.getVersionForNumber(n);
            if (be.willFit(e, r, t))
              return r;
          }
          throw new Ee("Data too big");
        }
        /**
         * @return true if the number of input bits will fit in a code with the specified version and
         * error correction level.
         */
        static willFit(e, t, n) {
          const r = t.getTotalCodewords(), s = t.getECBlocksForLevel(n).getTotalECCodewords(), o = r - s, a = (e + 7) / 8;
          return o >= a;
        }
        /**
         * Terminate bits as described in 8.4.8 and 8.4.9 of JISX0510:2004 (p.24).
         */
        static terminateBits(e, t) {
          const n = e * 8;
          if (t.getSize() > n)
            throw new Ee("data bits cannot fit in the QR Code" + t.getSize() + " > " + n);
          for (let s = 0; s < 4 && t.getSize() < n; ++s)
            t.appendBit(!1);
          const r = t.getSize() & 7;
          if (r > 0)
            for (let s = r; s < 8; s++)
              t.appendBit(!1);
          const i = e - t.getSizeInBytes();
          for (let s = 0; s < i; ++s)
            t.appendBits((s & 1) === 0 ? 236 : 17, 8);
          if (t.getSize() !== n)
            throw new Ee("Bits size does not equal capacity");
        }
        /**
         * Get number of data bytes and number of error correction bytes for block id "blockID". Store
         * the result in "numDataBytesInBlock", and "numECBytesInBlock". See table 12 in 8.5.1 of
         * JISX0510:2004 (p.30)
         */
        static getNumDataBytesAndNumECBytesForBlockID(e, t, n, r, i, s) {
          if (r >= n)
            throw new Ee("Block ID too large");
          const o = e % n, a = n - o, l = Math.floor(e / n), u = l + 1, d = Math.floor(t / n), A = d + 1, p = l - d, I = u - A;
          if (p !== I)
            throw new Ee("EC bytes mismatch");
          if (n !== a + o)
            throw new Ee("RS blocks mismatch");
          if (e !== (d + p) * a + (A + I) * o)
            throw new Ee("Total bytes mismatch");
          r < a ? (i[0] = d, s[0] = p) : (i[0] = A, s[0] = I);
        }
        /**
         * Interleave "bits" with corresponding error correction bytes. On success, store the result in
         * "result". The interleave rule is complicated. See 8.6 of JISX0510:2004 (p.37) for details.
         */
        static interleaveWithECBytes(e, t, n, r) {
          if (e.getSizeInBytes() !== n)
            throw new Ee("Number of bits and data bytes does not match");
          let i = 0, s = 0, o = 0;
          const a = new Array();
          for (let u = 0; u < r; ++u) {
            const d = new Int32Array(1), A = new Int32Array(1);
            be.getNumDataBytesAndNumECBytesForBlockID(t, n, r, u, d, A);
            const p = d[0], I = new Uint8Array(p);
            e.toBytes(8 * i, I, 0, p);
            const y = be.generateECBytes(I, A[0]);
            a.push(new ls(I, y)), s = Math.max(s, p), o = Math.max(o, y.length), i += d[0];
          }
          if (n !== i)
            throw new Ee("Data bytes does not match offset");
          const l = new le();
          for (let u = 0; u < s; ++u)
            for (const d of a) {
              const A = d.getDataBytes();
              u < A.length && l.appendBits(A[u], 8);
            }
          for (let u = 0; u < o; ++u)
            for (const d of a) {
              const A = d.getErrorCorrectionBytes();
              u < A.length && l.appendBits(A[u], 8);
            }
          if (t !== l.getSizeInBytes())
            throw new Ee("Interleaving error: " + t + " and " + l.getSizeInBytes() + " differ.");
          return l;
        }
        static generateECBytes(e, t) {
          const n = e.length, r = new Int32Array(n + t);
          for (let s = 0; s < n; s++)
            r[s] = e[s] & 255;
          new br(ce.QR_CODE_FIELD_256).encode(r, t);
          const i = new Uint8Array(t);
          for (let s = 0; s < t; s++)
            i[s] = /*(byte) */
            r[n + s];
          return i;
        }
        /**
         * Append mode info. On success, store the result in "bits".
         */
        static appendModeInfo(e, t) {
          t.appendBits(e.getBits(), 4);
        }
        /**
         * Append length info. On success, store the result in "bits".
         */
        static appendLengthInfo(e, t, n, r) {
          const i = n.getCharacterCountBits(t);
          if (e >= 1 << i)
            throw new Ee(e + " is bigger than " + ((1 << i) - 1));
          r.appendBits(e, i);
        }
        /**
         * Append "bytes" in "mode" mode (encoding) into "bits". On success, store the result in "bits".
         */
        static appendBytes(e, t, n, r) {
          switch (t) {
            case z.NUMERIC:
              be.appendNumericBytes(e, n);
              break;
            case z.ALPHANUMERIC:
              be.appendAlphanumericBytes(e, n);
              break;
            case z.BYTE:
              be.append8BitBytes(e, n, r);
              break;
            case z.KANJI:
              be.appendKanjiBytes(e, n);
              break;
            default:
              throw new Ee("Invalid mode: " + t);
          }
        }
        static getDigit(e) {
          return e.charCodeAt(0) - 48;
        }
        static isDigit(e) {
          const t = be.getDigit(e);
          return t >= 0 && t <= 9;
        }
        static appendNumericBytes(e, t) {
          const n = e.length;
          let r = 0;
          for (; r < n; ) {
            const i = be.getDigit(e.charAt(r));
            if (r + 2 < n) {
              const s = be.getDigit(e.charAt(r + 1)), o = be.getDigit(e.charAt(r + 2));
              t.appendBits(i * 100 + s * 10 + o, 10), r += 3;
            } else if (r + 1 < n) {
              const s = be.getDigit(e.charAt(r + 1));
              t.appendBits(i * 10 + s, 7), r += 2;
            } else
              t.appendBits(i, 4), r++;
          }
        }
        static appendAlphanumericBytes(e, t) {
          const n = e.length;
          let r = 0;
          for (; r < n; ) {
            const i = be.getAlphanumericCode(e.charCodeAt(r));
            if (i === -1)
              throw new Ee();
            if (r + 1 < n) {
              const s = be.getAlphanumericCode(e.charCodeAt(r + 1));
              if (s === -1)
                throw new Ee();
              t.appendBits(i * 45 + s, 11), r += 2;
            } else
              t.appendBits(i, 6), r++;
          }
        }
        static append8BitBytes(e, t, n) {
          let r;
          try {
            r = Je.encode(e, n);
          } catch (i) {
            throw new Ee(i);
          }
          for (let i = 0, s = r.length; i !== s; i++) {
            const o = r[i];
            t.appendBits(o, 8);
          }
        }
        /**
         * @throws WriterException
         */
        static appendKanjiBytes(e, t) {
          let n;
          try {
            n = Je.encode(e, k.SJIS);
          } catch (i) {
            throw new Ee(i);
          }
          const r = n.length;
          for (let i = 0; i < r; i += 2) {
            const s = n[i] & 255, o = n[i + 1] & 255, a = s << 8 & 4294967295 | o;
            let l = -1;
            if (a >= 33088 && a <= 40956 ? l = a - 33088 : a >= 57408 && a <= 60351 && (l = a - 49472), l === -1)
              throw new Ee("Invalid byte sequence");
            const u = (l >> 8) * 192 + (l & 255);
            t.appendBits(u, 13);
          }
        }
        static appendECI(e, t) {
          t.appendBits(z.ECI.getBits(), 4), t.appendBits(e.getValue(), 8);
        }
      }
      be.ALPHANUMERIC_TABLE = Int32Array.from([
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        36,
        -1,
        -1,
        -1,
        37,
        38,
        -1,
        -1,
        -1,
        -1,
        39,
        40,
        -1,
        41,
        42,
        43,
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        44,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        -1,
        -1,
        -1,
        -1,
        -1
      ]), be.DEFAULT_BYTE_MODE_ENCODING = k.UTF8.getName();
      class zt {
        /**
         * Writes and renders a QRCode SVG element.
         *
         * @param contents
         * @param width
         * @param height
         * @param hints
         */
        write(e, t, n, r = null) {
          if (e.length === 0)
            throw new R("Found empty contents");
          if (t < 0 || n < 0)
            throw new R("Requested dimensions are too small: " + t + "x" + n);
          let i = Ie.L, s = zt.QUIET_ZONE_SIZE;
          r !== null && (r.get(Le.ERROR_CORRECTION) !== void 0 && (i = Ie.fromString(r.get(Le.ERROR_CORRECTION).toString())), r.get(Le.MARGIN) !== void 0 && (s = Number.parseInt(r.get(Le.MARGIN).toString(), 10)));
          const o = be.encode(e, i, r);
          return this.renderResult(o, t, n, s);
        }
        /**
         * Renders the result and then appends it to the DOM.
         */
        writeToDom(e, t, n, r, i = null) {
          typeof e == "string" && (e = document.querySelector(e));
          const s = this.write(t, n, r, i);
          e && e.appendChild(s);
        }
        /**
         * Note that the input matrix uses 0 == white, 1 == black.
         * The output matrix uses 0 == black, 255 == white (i.e. an 8 bit greyscale bitmap).
         */
        renderResult(e, t, n, r) {
          const i = e.getMatrix();
          if (i === null)
            throw new wt();
          const s = i.getWidth(), o = i.getHeight(), a = s + r * 2, l = o + r * 2, u = Math.max(t, a), d = Math.max(n, l), A = Math.min(Math.floor(u / a), Math.floor(d / l)), p = Math.floor((u - s * A) / 2), I = Math.floor((d - o * A) / 2), y = this.createSVGElement(u, d);
          for (let _ = 0, N = I; _ < o; _++, N += A)
            for (let L = 0, F = p; L < s; L++, F += A)
              if (i.get(L, _) === 1) {
                const P = this.createSvgRectElement(F, N, A, A);
                y.appendChild(P);
              }
          return y;
        }
        /**
         * Creates a SVG element.
         *
         * @param w SVG's width attribute
         * @param h SVG's height attribute
         */
        createSVGElement(e, t) {
          const n = document.createElementNS(zt.SVG_NS, "svg");
          return n.setAttributeNS(null, "height", e.toString()), n.setAttributeNS(null, "width", t.toString()), n;
        }
        /**
         * Creates a SVG rect element.
         *
         * @param x Element's x coordinate
         * @param y Element's y coordinate
         * @param w Element's width attribute
         * @param h Element's height attribute
         */
        createSvgRectElement(e, t, n, r) {
          const i = document.createElementNS(zt.SVG_NS, "rect");
          return i.setAttributeNS(null, "x", e.toString()), i.setAttributeNS(null, "y", t.toString()), i.setAttributeNS(null, "height", n.toString()), i.setAttributeNS(null, "width", r.toString()), i.setAttributeNS(null, "fill", "#000000"), i;
        }
      }
      zt.QUIET_ZONE_SIZE = 4, zt.SVG_NS = "http://www.w3.org/2000/svg";
      class sn {
        /*@Override*/
        // public encode(contents: string, format: BarcodeFormat, width: number /*int*/, height: number /*int*/): BitMatrix
        //     /*throws WriterException */ {
        //   return encode(contents, format, width, height, null)
        // }
        /*@Override*/
        encode(e, t, n, r, i) {
          if (e.length === 0)
            throw new R("Found empty contents");
          if (t !== Y.QR_CODE)
            throw new R("Can only encode QR_CODE, but got " + t);
          if (n < 0 || r < 0)
            throw new R(`Requested dimensions are too small: ${n}x${r}`);
          let s = Ie.L, o = sn.QUIET_ZONE_SIZE;
          i !== null && (i.get(Le.ERROR_CORRECTION) !== void 0 && (s = Ie.fromString(i.get(Le.ERROR_CORRECTION).toString())), i.get(Le.MARGIN) !== void 0 && (o = Number.parseInt(i.get(Le.MARGIN).toString(), 10)));
          const a = be.encode(e, s, i);
          return sn.renderResult(a, n, r, o);
        }
        // Note that the input matrix uses 0 == white, 1 == black, while the output matrix uses
        // 0 == black, 255 == white (i.e. an 8 bit greyscale bitmap).
        static renderResult(e, t, n, r) {
          const i = e.getMatrix();
          if (i === null)
            throw new wt();
          const s = i.getWidth(), o = i.getHeight(), a = s + r * 2, l = o + r * 2, u = Math.max(t, a), d = Math.max(n, l), A = Math.min(Math.floor(u / a), Math.floor(d / l)), p = Math.floor((u - s * A) / 2), I = Math.floor((d - o * A) / 2), y = new Fe(u, d);
          for (let _ = 0, N = I; _ < o; _++, N += A)
            for (let L = 0, F = p; L < s; L++, F += A)
              i.get(L, _) === 1 && y.setRegion(F, N, A, A);
          return y;
        }
      }
      sn.QUIET_ZONE_SIZE = 4;
      class cs {
        /*@Override*/
        // public encode(contents: string,
        //                         format: BarcodeFormat,
        //                         width: number /*int*/,
        //                         height: number /*int*/): BitMatrix /*throws WriterException */ {
        //   return encode(contents, format, width, height, null)
        // }
        /*@Override*/
        encode(e, t, n, r, i) {
          let s;
          switch (t) {
            // case BarcodeFormat.EAN_8:
            //   writer = new EAN8Writer()
            //   break
            // case BarcodeFormat.UPC_E:
            //   writer = new UPCEWriter()
            //   break
            // case BarcodeFormat.EAN_13:
            //   writer = new EAN13Writer()
            //   break
            // case BarcodeFormat.UPC_A:
            //   writer = new UPCAWriter()
            //   break
            case Y.QR_CODE:
              s = new sn();
              break;
            // case BarcodeFormat.CODE_39:
            //   writer = new Code39Writer()
            //   break
            // case BarcodeFormat.CODE_93:
            //   writer = new Code93Writer()
            //   break
            // case BarcodeFormat.CODE_128:
            //   writer = new Code128Writer()
            //   break
            // case BarcodeFormat.ITF:
            //   writer = new ITFWriter()
            //   break
            // case BarcodeFormat.PDF_417:
            //   writer = new PDF417Writer()
            //   break
            // case BarcodeFormat.CODABAR:
            //   writer = new CodaBarWriter()
            //   break
            // case BarcodeFormat.DATA_MATRIX:
            //   writer = new DataMatrixWriter()
            //   break
            // case BarcodeFormat.AZTEC:
            //   writer = new AztecWriter()
            //   break
            default:
              throw new R("No encoder available for format " + t);
          }
          return s.encode(e, t, n, r, i);
        }
      }
      class pt extends gn {
        constructor(e, t, n, r, i, s, o, a) {
          if (super(s, o), this.yuvData = e, this.dataWidth = t, this.dataHeight = n, this.left = r, this.top = i, r + s > t || i + o > n)
            throw new R("Crop rectangle does not fit within image data.");
          a && this.reverseHorizontal(s, o);
        }
        /*@Override*/
        getRow(e, t) {
          if (e < 0 || e >= this.getHeight())
            throw new R("Requested row is outside the image: " + e);
          const n = this.getWidth();
          (t == null || t.length < n) && (t = new Uint8ClampedArray(n));
          const r = (e + this.top) * this.dataWidth + this.left;
          return ie.arraycopy(this.yuvData, r, t, 0, n), t;
        }
        /*@Override*/
        getMatrix() {
          const e = this.getWidth(), t = this.getHeight();
          if (e === this.dataWidth && t === this.dataHeight)
            return this.yuvData;
          const n = e * t, r = new Uint8ClampedArray(n);
          let i = this.top * this.dataWidth + this.left;
          if (e === this.dataWidth)
            return ie.arraycopy(this.yuvData, i, r, 0, n), r;
          for (let s = 0; s < t; s++) {
            const o = s * e;
            ie.arraycopy(this.yuvData, i, r, o, e), i += this.dataWidth;
          }
          return r;
        }
        /*@Override*/
        isCropSupported() {
          return !0;
        }
        /*@Override*/
        crop(e, t, n, r) {
          return new pt(this.yuvData, this.dataWidth, this.dataHeight, this.left + e, this.top + t, n, r, !1);
        }
        renderThumbnail() {
          const e = this.getWidth() / pt.THUMBNAIL_SCALE_FACTOR, t = this.getHeight() / pt.THUMBNAIL_SCALE_FACTOR, n = new Int32Array(e * t), r = this.yuvData;
          let i = this.top * this.dataWidth + this.left;
          for (let s = 0; s < t; s++) {
            const o = s * e;
            for (let a = 0; a < e; a++) {
              const l = r[i + a * pt.THUMBNAIL_SCALE_FACTOR] & 255;
              n[o + a] = 4278190080 | l * 65793;
            }
            i += this.dataWidth * pt.THUMBNAIL_SCALE_FACTOR;
          }
          return n;
        }
        /**
         * @return width of image from {@link #renderThumbnail()}
         */
        getThumbnailWidth() {
          return this.getWidth() / pt.THUMBNAIL_SCALE_FACTOR;
        }
        /**
         * @return height of image from {@link #renderThumbnail()}
         */
        getThumbnailHeight() {
          return this.getHeight() / pt.THUMBNAIL_SCALE_FACTOR;
        }
        reverseHorizontal(e, t) {
          const n = this.yuvData;
          for (let r = 0, i = this.top * this.dataWidth + this.left; r < t; r++, i += this.dataWidth) {
            const s = i + e / 2;
            for (let o = i, a = i + e - 1; o < s; o++, a--) {
              const l = n[o];
              n[o] = n[a], n[a] = l;
            }
          }
        }
        invert() {
          return new Nt(this);
        }
      }
      pt.THUMBNAIL_SCALE_FACTOR = 2;
      class yr extends gn {
        constructor(e, t, n, r, i, s, o) {
          if (super(t, n), this.dataWidth = r, this.dataHeight = i, this.left = s, this.top = o, e.BYTES_PER_ELEMENT === 4) {
            const a = t * n, l = new Uint8ClampedArray(a);
            for (let u = 0; u < a; u++) {
              const d = e[u], A = d >> 16 & 255, p = d >> 7 & 510, I = d & 255;
              l[u] = /*(byte) */
              (A + p + I) / 4 & 255;
            }
            this.luminances = l;
          } else
            this.luminances = e;
          if (r === void 0 && (this.dataWidth = t), i === void 0 && (this.dataHeight = n), s === void 0 && (this.left = 0), o === void 0 && (this.top = 0), this.left + t > this.dataWidth || this.top + n > this.dataHeight)
            throw new R("Crop rectangle does not fit within image data.");
        }
        /*@Override*/
        getRow(e, t) {
          if (e < 0 || e >= this.getHeight())
            throw new R("Requested row is outside the image: " + e);
          const n = this.getWidth();
          (t == null || t.length < n) && (t = new Uint8ClampedArray(n));
          const r = (e + this.top) * this.dataWidth + this.left;
          return ie.arraycopy(this.luminances, r, t, 0, n), t;
        }
        /*@Override*/
        getMatrix() {
          const e = this.getWidth(), t = this.getHeight();
          if (e === this.dataWidth && t === this.dataHeight)
            return this.luminances;
          const n = e * t, r = new Uint8ClampedArray(n);
          let i = this.top * this.dataWidth + this.left;
          if (e === this.dataWidth)
            return ie.arraycopy(this.luminances, i, r, 0, n), r;
          for (let s = 0; s < t; s++) {
            const o = s * e;
            ie.arraycopy(this.luminances, i, r, o, e), i += this.dataWidth;
          }
          return r;
        }
        /*@Override*/
        isCropSupported() {
          return !0;
        }
        /*@Override*/
        crop(e, t, n, r) {
          return new yr(this.luminances, n, r, this.dataWidth, this.dataHeight, this.left + e, this.top + t);
        }
        invert() {
          return new Nt(this);
        }
      }
      class si extends k {
        static forName(e) {
          return this.getCharacterSetECIByName(e);
        }
      }
      class _r {
      }
      _r.ISO_8859_1 = k.ISO8859_1;
      class oi {
        /**
         * @return {@code true} if compact instead of full mode
         */
        isCompact() {
          return this.compact;
        }
        setCompact(e) {
          this.compact = e;
        }
        /**
         * @return size in pixels (width and height)
         */
        getSize() {
          return this.size;
        }
        setSize(e) {
          this.size = e;
        }
        /**
         * @return number of levels
         */
        getLayers() {
          return this.layers;
        }
        setLayers(e) {
          this.layers = e;
        }
        /**
         * @return number of data codewords
         */
        getCodeWords() {
          return this.codeWords;
        }
        setCodeWords(e) {
          this.codeWords = e;
        }
        /**
         * @return the symbol image
         */
        getMatrix() {
          return this.matrix;
        }
        setMatrix(e) {
          this.matrix = e;
        }
      }
      class ai {
        /**
         * The singletonList(T) method is used to return an immutable list containing only the specified object.
         */
        static singletonList(e) {
          return [e];
        }
        /**
         * The min(Collection<? extends T>, Comparator<? super T>) method is used to return the minimum element of the given collection, according to the order induced by the specified comparator.
         */
        static min(e, t) {
          return e.sort(t)[0];
        }
      }
      class hs {
        constructor(e) {
          this.previous = e;
        }
        getPrevious() {
          return this.previous;
        }
      }
      class on extends hs {
        constructor(e, t, n) {
          super(e), this.value = t, this.bitCount = n;
        }
        /**
         * @Override
         */
        appendTo(e, t) {
          e.appendBits(this.value, this.bitCount);
        }
        add(e, t) {
          return new on(this, e, t);
        }
        addBinaryShift(e, t) {
          return console.warn("addBinaryShift on SimpleToken, this simply returns a copy of this token"), new on(this, e, t);
        }
        /**
         * @Override
         */
        toString() {
          let e = this.value & (1 << this.bitCount) - 1;
          return e |= 1 << this.bitCount, "<" + K.toBinaryString(e | 1 << this.bitCount).substring(1) + ">";
        }
      }
      class Sr extends on {
        constructor(e, t, n) {
          super(e, 0, 0), this.binaryShiftStart = t, this.binaryShiftByteCount = n;
        }
        /**
         * @Override
         */
        appendTo(e, t) {
          for (let n = 0; n < this.binaryShiftByteCount; n++)
            (n === 0 || n === 31 && this.binaryShiftByteCount <= 62) && (e.appendBits(31, 5), this.binaryShiftByteCount > 62 ? e.appendBits(this.binaryShiftByteCount - 31, 16) : n === 0 ? e.appendBits(Math.min(this.binaryShiftByteCount, 31), 5) : e.appendBits(this.binaryShiftByteCount - 31, 5)), e.appendBits(t[this.binaryShiftStart + n], 8);
        }
        addBinaryShift(e, t) {
          return new Sr(this, e, t);
        }
        /**
         * @Override
         */
        toString() {
          return "<" + this.binaryShiftStart + "::" + (this.binaryShiftStart + this.binaryShiftByteCount - 1) + ">";
        }
      }
      function us(f, e, t) {
        return new Sr(f, e, t);
      }
      function Sn(f, e, t) {
        return new on(f, e, t);
      }
      const fs = [
        "UPPER",
        "LOWER",
        "DIGIT",
        "MIXED",
        "PUNCT"
      ], Lt = 0, jn = 1, ut = 2, li = 3, mt = 4, ds = new on(null, 0, 0), Tr = [
        Int32Array.from([
          0,
          (5 << 16) + 28,
          (5 << 16) + 30,
          (5 << 16) + 29,
          656318
          // UPPER -> MIXED -> PUNCT
        ]),
        Int32Array.from([
          (9 << 16) + 480 + 14,
          0,
          (5 << 16) + 30,
          (5 << 16) + 29,
          656318
          // LOWER -> MIXED -> PUNCT
        ]),
        Int32Array.from([
          (4 << 16) + 14,
          (9 << 16) + 448 + 28,
          0,
          (9 << 16) + 448 + 29,
          932798
          // DIGIT -> UPPER -> MIXED -> PUNCT
        ]),
        Int32Array.from([
          (5 << 16) + 29,
          (5 << 16) + 28,
          656318,
          0,
          (5 << 16) + 30
          // MIXED -> PUNCT
        ]),
        Int32Array.from([
          (5 << 16) + 31,
          656380,
          656382,
          656381,
          0
        ])
      ];
      function xs(f) {
        for (let e of f)
          pe.fill(e, -1);
        return f[Lt][mt] = 0, f[jn][mt] = 0, f[jn][Lt] = 28, f[li][mt] = 0, f[ut][mt] = 0, f[ut][Lt] = 15, f;
      }
      const ci = xs(pe.createInt32Array(6, 6));
      class It {
        constructor(e, t, n, r) {
          this.token = e, this.mode = t, this.binaryShiftByteCount = n, this.bitCount = r;
        }
        getMode() {
          return this.mode;
        }
        getToken() {
          return this.token;
        }
        getBinaryShiftByteCount() {
          return this.binaryShiftByteCount;
        }
        getBitCount() {
          return this.bitCount;
        }
        // Create a new state representing this state with a latch to a (not
        // necessary different) mode, and then a code.
        latchAndAppend(e, t) {
          let n = this.bitCount, r = this.token;
          if (e !== this.mode) {
            let s = Tr[this.mode][e];
            r = Sn(r, s & 65535, s >> 16), n += s >> 16;
          }
          let i = e === ut ? 4 : 5;
          return r = Sn(r, t, i), new It(r, e, 0, n + i);
        }
        // Create a new state representing this state, with a temporary shift
        // to a different mode to output a single value.
        shiftAndAppend(e, t) {
          let n = this.token, r = this.mode === ut ? 4 : 5;
          return n = Sn(n, ci[this.mode][e], r), n = Sn(n, t, 5), new It(n, this.mode, 0, this.bitCount + r + 5);
        }
        // Create a new state representing this state, but an additional character
        // output in Binary Shift mode.
        addBinaryShiftChar(e) {
          let t = this.token, n = this.mode, r = this.bitCount;
          if (this.mode === mt || this.mode === ut) {
            let o = Tr[n][Lt];
            t = Sn(t, o & 65535, o >> 16), r += o >> 16, n = Lt;
          }
          let i = this.binaryShiftByteCount === 0 || this.binaryShiftByteCount === 31 ? 18 : this.binaryShiftByteCount === 62 ? 9 : 8, s = new It(t, n, this.binaryShiftByteCount + 1, r + i);
          return s.binaryShiftByteCount === 2078 && (s = s.endBinaryShift(e + 1)), s;
        }
        // Create the state identical to this one, but we are no longer in
        // Binary Shift mode.
        endBinaryShift(e) {
          if (this.binaryShiftByteCount === 0)
            return this;
          let t = this.token;
          return t = us(t, e - this.binaryShiftByteCount, this.binaryShiftByteCount), new It(t, this.mode, 0, this.bitCount);
        }
        // Returns true if "this" state is better (equal: or) to be in than "that"
        // state under all possible circumstances.
        isBetterThanOrEqualTo(e) {
          let t = this.bitCount + (Tr[this.mode][e.mode] >> 16);
          return this.binaryShiftByteCount < e.binaryShiftByteCount ? t += It.calculateBinaryShiftCost(e) - It.calculateBinaryShiftCost(this) : this.binaryShiftByteCount > e.binaryShiftByteCount && e.binaryShiftByteCount > 0 && (t += 10), t <= e.bitCount;
        }
        toBitArray(e) {
          let t = [];
          for (let r = this.endBinaryShift(e.length).token; r !== null; r = r.getPrevious())
            t.unshift(r);
          let n = new le();
          for (const r of t)
            r.appendTo(n, e);
          return n;
        }
        /**
         * @Override
         */
        toString() {
          return Q.format("%s bits=%d bytes=%d", fs[this.mode], this.bitCount, this.binaryShiftByteCount);
        }
        static calculateBinaryShiftCost(e) {
          return e.binaryShiftByteCount > 62 ? 21 : e.binaryShiftByteCount > 31 ? 20 : e.binaryShiftByteCount > 0 ? 10 : 0;
        }
      }
      It.INITIAL_STATE = new It(ds, Lt, 0, 0);
      function gs(f) {
        const e = Q.getCharCode(" "), t = Q.getCharCode("."), n = Q.getCharCode(",");
        f[Lt][e] = 1;
        const r = Q.getCharCode("Z"), i = Q.getCharCode("A");
        for (let A = i; A <= r; A++)
          f[Lt][A] = A - i + 2;
        f[jn][e] = 1;
        const s = Q.getCharCode("z"), o = Q.getCharCode("a");
        for (let A = o; A <= s; A++)
          f[jn][A] = A - o + 2;
        f[ut][e] = 1;
        const a = Q.getCharCode("9"), l = Q.getCharCode("0");
        for (let A = l; A <= a; A++)
          f[ut][A] = A - l + 2;
        f[ut][n] = 12, f[ut][t] = 13;
        const u = [
          "\0",
          " ",
          "",
          "",
          "",
          "",
          "",
          "",
          "\x07",
          "\b",
          "	",
          `
`,
          "\v",
          "\f",
          "\r",
          "\x1B",
          "",
          "",
          "",
          "",
          "@",
          "\\",
          "^",
          "_",
          "`",
          "|",
          "~",
          ""
        ];
        for (let A = 0; A < u.length; A++)
          f[li][Q.getCharCode(u[A])] = A;
        const d = [
          "\0",
          "\r",
          "\0",
          "\0",
          "\0",
          "\0",
          "!",
          "'",
          "#",
          "$",
          "%",
          "&",
          "'",
          "(",
          ")",
          "*",
          "+",
          ",",
          "-",
          ".",
          "/",
          ":",
          ";",
          "<",
          "=",
          ">",
          "?",
          "[",
          "]",
          "{",
          "}"
        ];
        for (let A = 0; A < d.length; A++)
          Q.getCharCode(d[A]) > 0 && (f[mt][Q.getCharCode(d[A])] = A);
        return f;
      }
      const Nr = gs(pe.createInt32Array(5, 256));
      class Tn {
        constructor(e) {
          this.text = e;
        }
        /**
         * @return text represented by this encoder encoded as a {@link BitArray}
         */
        encode() {
          const e = Q.getCharCode(" "), t = Q.getCharCode(`
`);
          let n = ai.singletonList(It.INITIAL_STATE);
          for (let i = 0; i < this.text.length; i++) {
            let s, o = i + 1 < this.text.length ? this.text[i + 1] : 0;
            switch (this.text[i]) {
              case Q.getCharCode("\r"):
                s = o === t ? 2 : 0;
                break;
              case Q.getCharCode("."):
                s = o === e ? 3 : 0;
                break;
              case Q.getCharCode(","):
                s = o === e ? 4 : 0;
                break;
              case Q.getCharCode(":"):
                s = o === e ? 5 : 0;
                break;
              default:
                s = 0;
            }
            s > 0 ? (n = Tn.updateStateListForPair(n, i, s), i++) : n = this.updateStateListForChar(n, i);
          }
          return ai.min(n, (i, s) => i.getBitCount() - s.getBitCount()).toBitArray(this.text);
        }
        // We update a set of states for a new character by updating each state
        // for the new character, merging the results, and then removing the
        // non-optimal states.
        updateStateListForChar(e, t) {
          const n = [];
          for (let r of e)
            this.updateStateForChar(r, t, n);
          return Tn.simplifyStates(n);
        }
        // Return a set of states that represent the possible ways of updating this
        // state for the next character.  The resulting set of states are added to
        // the "result" list.
        updateStateForChar(e, t, n) {
          let r = this.text[t] & 255, i = Nr[e.getMode()][r] > 0, s = null;
          for (let o = 0; o <= mt; o++) {
            let a = Nr[o][r];
            if (a > 0) {
              if (s == null && (s = e.endBinaryShift(t)), !i || o === e.getMode() || o === ut) {
                const l = s.latchAndAppend(o, a);
                n.push(l);
              }
              if (!i && ci[e.getMode()][o] >= 0) {
                const l = s.shiftAndAppend(o, a);
                n.push(l);
              }
            }
          }
          if (e.getBinaryShiftByteCount() > 0 || Nr[e.getMode()][r] === 0) {
            let o = e.addBinaryShiftChar(t);
            n.push(o);
          }
        }
        static updateStateListForPair(e, t, n) {
          const r = [];
          for (let i of e)
            this.updateStateForPair(i, t, n, r);
          return this.simplifyStates(r);
        }
        static updateStateForPair(e, t, n, r) {
          let i = e.endBinaryShift(t);
          if (r.push(i.latchAndAppend(mt, n)), e.getMode() !== mt && r.push(i.shiftAndAppend(mt, n)), n === 3 || n === 4) {
            let s = i.latchAndAppend(ut, 16 - n).latchAndAppend(ut, 1);
            r.push(s);
          }
          if (e.getBinaryShiftByteCount() > 0) {
            let s = e.addBinaryShiftChar(t).addBinaryShiftChar(t + 1);
            r.push(s);
          }
        }
        static simplifyStates(e) {
          let t = [];
          for (const n of e) {
            let r = !0;
            for (const i of t) {
              if (i.isBetterThanOrEqualTo(n)) {
                r = !1;
                break;
              }
              n.isBetterThanOrEqualTo(i) && (t = t.filter((s) => s !== i));
            }
            r && t.push(n);
          }
          return t;
        }
      }
      class ae {
        constructor() {
        }
        /**
         * Encodes the given binary content as an Aztec symbol
         *
         * @param data input data string
         * @return Aztec symbol matrix with metadata
         */
        static encodeBytes(e) {
          return ae.encode(e, ae.DEFAULT_EC_PERCENT, ae.DEFAULT_AZTEC_LAYERS);
        }
        /**
         * Encodes the given binary content as an Aztec symbol
         *
         * @param data input data string
         * @param minECCPercent minimal percentage of error check words (According to ISO/IEC 24778:2008,
         *                      a minimum of 23% + 3 words is recommended)
         * @param userSpecifiedLayers if non-zero, a user-specified value for the number of layers
         * @return Aztec symbol matrix with metadata
         */
        static encode(e, t, n) {
          let r = new Tn(e).encode(), i = K.truncDivision(r.getSize() * t, 100) + 11, s = r.getSize() + i, o, a, l, u, d;
          if (n !== ae.DEFAULT_AZTEC_LAYERS) {
            if (o = n < 0, a = Math.abs(n), a > (o ? ae.MAX_NB_BITS_COMPACT : ae.MAX_NB_BITS))
              throw new R(Q.format("Illegal value %s for layers", n));
            l = ae.totalBitsInLayer(a, o), u = ae.WORD_SIZE[a];
            let P = l - l % u;
            if (d = ae.stuffBits(r, u), d.getSize() + i > P)
              throw new R("Data to large for user specified layer");
            if (o && d.getSize() > u * 64)
              throw new R("Data to large for user specified layer");
          } else {
            u = 0, d = null;
            for (let P = 0; ; P++) {
              if (P > ae.MAX_NB_BITS)
                throw new R("Data too large for an Aztec code");
              if (o = P <= 3, a = o ? P + 1 : P, l = ae.totalBitsInLayer(a, o), s > l)
                continue;
              (d == null || u !== ae.WORD_SIZE[a]) && (u = ae.WORD_SIZE[a], d = ae.stuffBits(r, u));
              let re = l - l % u;
              if (!(o && d.getSize() > u * 64) && d.getSize() + i <= re)
                break;
            }
          }
          let A = ae.generateCheckWords(d, l, u), p = d.getSize() / u, I = ae.generateModeMessage(o, a, p), y = (o ? 11 : 14) + a * 4, _ = new Int32Array(y), N;
          if (o) {
            N = y;
            for (let P = 0; P < _.length; P++)
              _[P] = P;
          } else {
            N = y + 1 + 2 * K.truncDivision(K.truncDivision(y, 2) - 1, 15);
            let P = K.truncDivision(y, 2), re = K.truncDivision(N, 2);
            for (let $ = 0; $ < P; $++) {
              let it = $ + K.truncDivision($, 15);
              _[P - $ - 1] = re - it - 1, _[P + $] = re + it + 1;
            }
          }
          let L = new Fe(N);
          for (let P = 0, re = 0; P < a; P++) {
            let $ = (a - P) * 4 + (o ? 9 : 12);
            for (let it = 0; it < $; it++) {
              let xt = it * 2;
              for (let st = 0; st < 2; st++)
                A.get(re + xt + st) && L.set(_[P * 2 + st], _[P * 2 + it]), A.get(re + $ * 2 + xt + st) && L.set(_[P * 2 + it], _[y - 1 - P * 2 - st]), A.get(re + $ * 4 + xt + st) && L.set(_[y - 1 - P * 2 - st], _[y - 1 - P * 2 - it]), A.get(re + $ * 6 + xt + st) && L.set(_[y - 1 - P * 2 - it], _[P * 2 + st]);
            }
            re += $ * 8;
          }
          if (ae.drawModeMessage(L, o, N, I), o)
            ae.drawBullsEye(L, K.truncDivision(N, 2), 5);
          else {
            ae.drawBullsEye(L, K.truncDivision(N, 2), 7);
            for (let P = 0, re = 0; P < K.truncDivision(y, 2) - 1; P += 15, re += 16)
              for (let $ = K.truncDivision(N, 2) & 1; $ < N; $ += 2)
                L.set(K.truncDivision(N, 2) - re, $), L.set(K.truncDivision(N, 2) + re, $), L.set($, K.truncDivision(N, 2) - re), L.set($, K.truncDivision(N, 2) + re);
          }
          let F = new oi();
          return F.setCompact(o), F.setSize(N), F.setLayers(a), F.setCodeWords(p), F.setMatrix(L), F;
        }
        static drawBullsEye(e, t, n) {
          for (let r = 0; r < n; r += 2)
            for (let i = t - r; i <= t + r; i++)
              e.set(i, t - r), e.set(i, t + r), e.set(t - r, i), e.set(t + r, i);
          e.set(t - n, t - n), e.set(t - n + 1, t - n), e.set(t - n, t - n + 1), e.set(t + n, t - n), e.set(t + n, t - n + 1), e.set(t + n, t + n - 1);
        }
        static generateModeMessage(e, t, n) {
          let r = new le();
          return e ? (r.appendBits(t - 1, 2), r.appendBits(n - 1, 6), r = ae.generateCheckWords(r, 28, 4)) : (r.appendBits(t - 1, 5), r.appendBits(n - 1, 11), r = ae.generateCheckWords(r, 40, 4)), r;
        }
        static drawModeMessage(e, t, n, r) {
          let i = K.truncDivision(n, 2);
          if (t)
            for (let s = 0; s < 7; s++) {
              let o = i - 3 + s;
              r.get(s) && e.set(o, i - 5), r.get(s + 7) && e.set(i + 5, o), r.get(20 - s) && e.set(o, i + 5), r.get(27 - s) && e.set(i - 5, o);
            }
          else
            for (let s = 0; s < 10; s++) {
              let o = i - 5 + s + K.truncDivision(s, 5);
              r.get(s) && e.set(o, i - 7), r.get(s + 10) && e.set(i + 7, o), r.get(29 - s) && e.set(o, i + 7), r.get(39 - s) && e.set(i - 7, o);
            }
        }
        static generateCheckWords(e, t, n) {
          let r = e.getSize() / n, i = new br(ae.getGF(n)), s = K.truncDivision(t, n), o = ae.bitsToWords(e, n, s);
          i.encode(o, s - r);
          let a = t % n, l = new le();
          l.appendBits(0, a);
          for (const u of Array.from(o))
            l.appendBits(u, n);
          return l;
        }
        static bitsToWords(e, t, n) {
          let r = new Int32Array(n), i, s;
          for (i = 0, s = e.getSize() / t; i < s; i++) {
            let o = 0;
            for (let a = 0; a < t; a++)
              o |= e.get(i * t + a) ? 1 << t - a - 1 : 0;
            r[i] = o;
          }
          return r;
        }
        static getGF(e) {
          switch (e) {
            case 4:
              return ce.AZTEC_PARAM;
            case 6:
              return ce.AZTEC_DATA_6;
            case 8:
              return ce.AZTEC_DATA_8;
            case 10:
              return ce.AZTEC_DATA_10;
            case 12:
              return ce.AZTEC_DATA_12;
            default:
              throw new R("Unsupported word size " + e);
          }
        }
        static stuffBits(e, t) {
          let n = new le(), r = e.getSize(), i = (1 << t) - 2;
          for (let s = 0; s < r; s += t) {
            let o = 0;
            for (let a = 0; a < t; a++)
              (s + a >= r || e.get(s + a)) && (o |= 1 << t - 1 - a);
            (o & i) === i ? (n.appendBits(o & i, t), s--) : (o & i) === 0 ? (n.appendBits(o | 1, t), s--) : n.appendBits(o, t);
          }
          return n;
        }
        static totalBitsInLayer(e, t) {
          return ((t ? 88 : 112) + 16 * e) * e;
        }
      }
      ae.DEFAULT_EC_PERCENT = 33, ae.DEFAULT_AZTEC_LAYERS = 0, ae.MAX_NB_BITS = 32, ae.MAX_NB_BITS_COMPACT = 4, ae.WORD_SIZE = Int32Array.from([
        4,
        6,
        6,
        8,
        8,
        8,
        8,
        8,
        8,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        12,
        12,
        12,
        12,
        12,
        12,
        12,
        12,
        12,
        12
      ]);
      class Kn {
        // @Override
        encode(e, t, n, r) {
          return this.encodeWithHints(e, t, n, r, null);
        }
        // @Override
        encodeWithHints(e, t, n, r, i) {
          let s = _r.ISO_8859_1, o = ae.DEFAULT_EC_PERCENT, a = ae.DEFAULT_AZTEC_LAYERS;
          return i != null && (i.has(Le.CHARACTER_SET) && (s = si.forName(i.get(Le.CHARACTER_SET).toString())), i.has(Le.ERROR_CORRECTION) && (o = K.parseInt(i.get(Le.ERROR_CORRECTION).toString())), i.has(Le.AZTEC_LAYERS) && (a = K.parseInt(i.get(Le.AZTEC_LAYERS).toString()))), Kn.encodeLayers(e, t, n, r, s, o, a);
        }
        static encodeLayers(e, t, n, r, i, s, o) {
          if (t !== Y.AZTEC)
            throw new R("Can only encode AZTEC, but got " + t);
          let a = ae.encode(Q.getBytes(e, i), s, o);
          return Kn.renderResult(a, n, r);
        }
        static renderResult(e, t, n) {
          let r = e.getMatrix();
          if (r == null)
            throw new wt();
          let i = r.getWidth(), s = r.getHeight(), o = Math.max(t, i), a = Math.max(n, s), l = Math.min(o / i, a / s), u = (o - i * l) / 2, d = (a - s * l) / 2, A = new Fe(o, a);
          for (let p = 0, I = d; p < s; p++, I += l)
            for (let y = 0, _ = u; y < i; y++, _ += l)
              r.get(y, p) && A.setRegion(_, I, l, l);
          return A;
        }
      }
      h.AbstractExpandedDecoder = dr, h.ArgumentException = v, h.ArithmeticException = Fn, h.AztecCode = oi, h.AztecCodeReader = Vn, h.AztecCodeWriter = Kn, h.AztecDecoder = me, h.AztecDetector = Yr, h.AztecDetectorResult = Xr, h.AztecEncoder = ae, h.AztecHighLevelEncoder = Tn, h.AztecPoint = Qe, h.BarcodeFormat = Y, h.Binarizer = Me, h.BinaryBitmap = ne, h.BitArray = le, h.BitMatrix = Fe, h.BitSource = Ar, h.BrowserAztecCodeReader = Hi, h.BrowserBarcodeReader = Yi, h.BrowserCodeReader = Ut, h.BrowserDatamatrixCodeReader = ji, h.BrowserMultiFormatReader = ss, h.BrowserPDF417Reader = os, h.BrowserQRCodeReader = as, h.BrowserQRCodeSvgWriter = zt, h.CharacterSetECI = k, h.ChecksumException = q, h.Code128Reader = V, h.Code39Reader = Be, h.DataMatrixDecodedBitStreamParser = Mt, h.DataMatrixReader = vt, h.DecodeHintType = xe, h.DecoderResult = wn, h.DefaultGridSampler = zr, h.DetectorResult = Un, h.EAN13Reader = Vt, h.EncodeHintType = Le, h.Exception = m, h.FormatException = U, h.GenericGF = ce, h.GenericGFPoly = et, h.GlobalHistogramBinarizer = ke, h.GridSampler = cr, h.GridSamplerInstance = Rt, h.HTMLCanvasElementLuminanceSource = Ot, h.HybridBinarizer = J, h.ITFReader = Ae, h.IllegalArgumentException = R, h.IllegalStateException = wt, h.InvertedLuminanceSource = Nt, h.LuminanceSource = gn, h.MathUtils = oe, h.MultiFormatOneDReader = nn, h.MultiFormatReader = ii, h.MultiFormatWriter = cs, h.NotFoundException = D, h.OneDReader = ve, h.PDF417DecodedBitStreamParser = T, h.PDF417DecoderErrorCorrection = $r, h.PDF417Reader = ze, h.PDF417ResultMetadata = ei, h.PerspectiveTransform = ft, h.PlanarYUVLuminanceSource = pt, h.QRCodeByteMatrix = Zn, h.QRCodeDataMask = ct, h.QRCodeDecodedBitStreamParser = Se, h.QRCodeDecoderErrorCorrectionLevel = Ie, h.QRCodeDecoderFormatInformation = je, h.QRCodeEncoder = be, h.QRCodeEncoderQRCode = Xt, h.QRCodeMaskUtil = Oe, h.QRCodeMatrixUtil = Z, h.QRCodeMode = z, h.QRCodeReader = Bt, h.QRCodeVersion = X, h.QRCodeWriter = sn, h.RGBLuminanceSource = yr, h.RSS14Reader = Ne, h.RSSExpandedReader = B, h.ReaderException = Yn, h.ReedSolomonDecoder = En, h.ReedSolomonEncoder = br, h.ReedSolomonException = $t, h.Result = qe, h.ResultMetadataType = Ue, h.ResultPoint = W, h.StringUtils = Q, h.UnsupportedOperationException = Qt, h.VideoInputDevice = Wr, h.WhiteRectangleDetector = bt, h.WriterException = Ee, h.ZXingArrays = pe, h.ZXingCharset = si, h.ZXingInteger = K, h.ZXingStandardCharsets = _r, h.ZXingStringBuilder = ge, h.ZXingStringEncoding = Je, h.ZXingSystem = ie, h.createAbstractExpandedDecoder = qr, Object.defineProperty(h, "__esModule", { value: !0 });
    });
  }(On, On.exports)), On.exports;
}
var ye = Ys();
const Zs = /* @__PURE__ */ Xs(ye), js = /* @__PURE__ */ Es({
  __proto__: null,
  default: Zs
}, [ye]);
var yi = function() {
  function x(c, h, w) {
    if (this.formatMap = /* @__PURE__ */ new Map([
      [G.QR_CODE, ye.BarcodeFormat.QR_CODE],
      [G.AZTEC, ye.BarcodeFormat.AZTEC],
      [G.CODABAR, ye.BarcodeFormat.CODABAR],
      [G.CODE_39, ye.BarcodeFormat.CODE_39],
      [G.CODE_93, ye.BarcodeFormat.CODE_93],
      [
        G.CODE_128,
        ye.BarcodeFormat.CODE_128
      ],
      [
        G.DATA_MATRIX,
        ye.BarcodeFormat.DATA_MATRIX
      ],
      [
        G.MAXICODE,
        ye.BarcodeFormat.MAXICODE
      ],
      [G.ITF, ye.BarcodeFormat.ITF],
      [G.EAN_13, ye.BarcodeFormat.EAN_13],
      [G.EAN_8, ye.BarcodeFormat.EAN_8],
      [G.PDF_417, ye.BarcodeFormat.PDF_417],
      [G.RSS_14, ye.BarcodeFormat.RSS_14],
      [
        G.RSS_EXPANDED,
        ye.BarcodeFormat.RSS_EXPANDED
      ],
      [G.UPC_A, ye.BarcodeFormat.UPC_A],
      [G.UPC_E, ye.BarcodeFormat.UPC_E],
      [
        G.UPC_EAN_EXTENSION,
        ye.BarcodeFormat.UPC_EAN_EXTENSION
      ]
    ]), this.reverseFormatMap = this.createReverseFormatMap(), !js)
      throw "Use html5qrcode.min.js without edit, ZXing not found.";
    this.verbose = h, this.logger = w;
    var E = this.createZXingFormats(c), g = /* @__PURE__ */ new Map();
    g.set(ye.DecodeHintType.POSSIBLE_FORMATS, E), g.set(ye.DecodeHintType.TRY_HARDER, !1), this.hints = g;
  }
  return x.prototype.decodeAsync = function(c) {
    var h = this;
    return new Promise(function(w, E) {
      try {
        w(h.decode(c));
      } catch (g) {
        E(g);
      }
    });
  }, x.prototype.decode = function(c) {
    var h = new ye.MultiFormatReader(this.verbose, this.hints), w = new ye.HTMLCanvasElementLuminanceSource(c), E = new ye.BinaryBitmap(new ye.HybridBinarizer(w)), g = h.decode(E);
    return {
      text: g.text,
      format: ki.create(this.toHtml5QrcodeSupportedFormats(g.format)),
      debugData: this.createDebugData()
    };
  }, x.prototype.createReverseFormatMap = function() {
    var c = /* @__PURE__ */ new Map();
    return this.formatMap.forEach(function(h, w, E) {
      c.set(h, w);
    }), c;
  }, x.prototype.toHtml5QrcodeSupportedFormats = function(c) {
    if (!this.reverseFormatMap.has(c))
      throw "reverseFormatMap doesn't have ".concat(c);
    return this.reverseFormatMap.get(c);
  }, x.prototype.createZXingFormats = function(c) {
    for (var h = [], w = 0, E = c; w < E.length; w++) {
      var g = E[w];
      this.formatMap.has(g) ? h.push(this.formatMap.get(g)) : this.logger.logError("".concat(g, " is not supported by") + "ZXingHtml5QrcodeShim");
    }
    return h;
  }, x.prototype.createDebugData = function() {
    return { decoderName: "zxing-js" };
  }, x;
}(), Ks = function(x, c, h, w) {
  function E(g) {
    return g instanceof h ? g : new h(function(b) {
      b(g);
    });
  }
  return new (h || (h = Promise))(function(g, b) {
    function M(v) {
      try {
        m(w.next(v));
      } catch (R) {
        b(R);
      }
    }
    function O(v) {
      try {
        m(w.throw(v));
      } catch (R) {
        b(R);
      }
    }
    function m(v) {
      v.done ? g(v.value) : E(v.value).then(M, O);
    }
    m((w = w.apply(x, c || [])).next());
  });
}, qs = function(x, c) {
  var h = { label: 0, sent: function() {
    if (g[0] & 1) throw g[1];
    return g[1];
  }, trys: [], ops: [] }, w, E, g, b;
  return b = { next: M(0), throw: M(1), return: M(2) }, typeof Symbol == "function" && (b[Symbol.iterator] = function() {
    return this;
  }), b;
  function M(m) {
    return function(v) {
      return O([m, v]);
    };
  }
  function O(m) {
    if (w) throw new TypeError("Generator is already executing.");
    for (; b && (b = 0, m[0] && (h = 0)), h; ) try {
      if (w = 1, E && (g = m[0] & 2 ? E.return : m[0] ? E.throw || ((g = E.return) && g.call(E), 0) : E.next) && !(g = g.call(E, m[1])).done) return g;
      switch (E = 0, g && (m = [m[0] & 2, g.value]), m[0]) {
        case 0:
        case 1:
          g = m;
          break;
        case 4:
          return h.label++, { value: m[1], done: !1 };
        case 5:
          h.label++, E = m[1], m = [0];
          continue;
        case 7:
          m = h.ops.pop(), h.trys.pop();
          continue;
        default:
          if (g = h.trys, !(g = g.length > 0 && g[g.length - 1]) && (m[0] === 6 || m[0] === 2)) {
            h = 0;
            continue;
          }
          if (m[0] === 3 && (!g || m[1] > g[0] && m[1] < g[3])) {
            h.label = m[1];
            break;
          }
          if (m[0] === 6 && h.label < g[1]) {
            h.label = g[1], g = m;
            break;
          }
          if (g && h.label < g[2]) {
            h.label = g[2], h.ops.push(m);
            break;
          }
          g[2] && h.ops.pop(), h.trys.pop();
          continue;
      }
      m = c.call(x, h);
    } catch (v) {
      m = [6, v], E = 0;
    } finally {
      w = g = 0;
    }
    if (m[0] & 5) throw m[1];
    return { value: m[0] ? m[1] : void 0, done: !0 };
  }
}, _i = function() {
  function x(c, h, w) {
    if (this.formatMap = /* @__PURE__ */ new Map([
      [G.QR_CODE, "qr_code"],
      [G.AZTEC, "aztec"],
      [G.CODABAR, "codabar"],
      [G.CODE_39, "code_39"],
      [G.CODE_93, "code_93"],
      [G.CODE_128, "code_128"],
      [G.DATA_MATRIX, "data_matrix"],
      [G.ITF, "itf"],
      [G.EAN_13, "ean_13"],
      [G.EAN_8, "ean_8"],
      [G.PDF_417, "pdf417"],
      [G.UPC_A, "upc_a"],
      [G.UPC_E, "upc_e"]
    ]), this.reverseFormatMap = this.createReverseFormatMap(), !x.isSupported())
      throw "Use html5qrcode.min.js without edit, Use BarcodeDetectorDelegate only if it isSupported();";
    this.verbose = h, this.logger = w;
    var E = this.createBarcodeDetectorFormats(c);
    if (this.detector = new BarcodeDetector(E), !this.detector)
      throw "BarcodeDetector detector not supported";
  }
  return x.isSupported = function() {
    if (!("BarcodeDetector" in window))
      return !1;
    var c = new BarcodeDetector({ formats: ["qr_code"] });
    return typeof c < "u";
  }, x.prototype.decodeAsync = function(c) {
    return Ks(this, void 0, void 0, function() {
      var h, w;
      return qs(this, function(E) {
        switch (E.label) {
          case 0:
            return [4, this.detector.detect(c)];
          case 1:
            if (h = E.sent(), !h || h.length === 0)
              throw "No barcode or QR code detected.";
            return w = this.selectLargestBarcode(h), [2, {
              text: w.rawValue,
              format: ki.create(this.toHtml5QrcodeSupportedFormats(w.format)),
              debugData: this.createDebugData()
            }];
        }
      });
    });
  }, x.prototype.selectLargestBarcode = function(c) {
    for (var h = null, w = 0, E = 0, g = c; E < g.length; E++) {
      var b = g[E], M = b.boundingBox.width * b.boundingBox.height;
      M > w && (w = M, h = b);
    }
    if (!h)
      throw "No largest barcode found";
    return h;
  }, x.prototype.createBarcodeDetectorFormats = function(c) {
    for (var h = [], w = 0, E = c; w < E.length; w++) {
      var g = E[w];
      this.formatMap.has(g) ? h.push(this.formatMap.get(g)) : this.logger.warn("".concat(g, " is not supported by") + "BarcodeDetectorDelegate");
    }
    return { formats: h };
  }, x.prototype.toHtml5QrcodeSupportedFormats = function(c) {
    if (!this.reverseFormatMap.has(c))
      throw "reverseFormatMap doesn't have ".concat(c);
    return this.reverseFormatMap.get(c);
  }, x.prototype.createReverseFormatMap = function() {
    var c = /* @__PURE__ */ new Map();
    return this.formatMap.forEach(function(h, w, E) {
      c.set(h, w);
    }), c;
  }, x.prototype.createDebugData = function() {
    return { decoderName: "BarcodeDetector" };
  }, x;
}(), Si = function(x, c, h, w) {
  function E(g) {
    return g instanceof h ? g : new h(function(b) {
      b(g);
    });
  }
  return new (h || (h = Promise))(function(g, b) {
    function M(v) {
      try {
        m(w.next(v));
      } catch (R) {
        b(R);
      }
    }
    function O(v) {
      try {
        m(w.throw(v));
      } catch (R) {
        b(R);
      }
    }
    function m(v) {
      v.done ? g(v.value) : E(v.value).then(M, O);
    }
    m((w = w.apply(x, c || [])).next());
  });
}, Ti = function(x, c) {
  var h = { label: 0, sent: function() {
    if (g[0] & 1) throw g[1];
    return g[1];
  }, trys: [], ops: [] }, w, E, g, b;
  return b = { next: M(0), throw: M(1), return: M(2) }, typeof Symbol == "function" && (b[Symbol.iterator] = function() {
    return this;
  }), b;
  function M(m) {
    return function(v) {
      return O([m, v]);
    };
  }
  function O(m) {
    if (w) throw new TypeError("Generator is already executing.");
    for (; b && (b = 0, m[0] && (h = 0)), h; ) try {
      if (w = 1, E && (g = m[0] & 2 ? E.return : m[0] ? E.throw || ((g = E.return) && g.call(E), 0) : E.next) && !(g = g.call(E, m[1])).done) return g;
      switch (E = 0, g && (m = [m[0] & 2, g.value]), m[0]) {
        case 0:
        case 1:
          g = m;
          break;
        case 4:
          return h.label++, { value: m[1], done: !1 };
        case 5:
          h.label++, E = m[1], m = [0];
          continue;
        case 7:
          m = h.ops.pop(), h.trys.pop();
          continue;
        default:
          if (g = h.trys, !(g = g.length > 0 && g[g.length - 1]) && (m[0] === 6 || m[0] === 2)) {
            h = 0;
            continue;
          }
          if (m[0] === 3 && (!g || m[1] > g[0] && m[1] < g[3])) {
            h.label = m[1];
            break;
          }
          if (m[0] === 6 && h.label < g[1]) {
            h.label = g[1], g = m;
            break;
          }
          if (g && h.label < g[2]) {
            h.label = g[2], h.ops.push(m);
            break;
          }
          g[2] && h.ops.pop(), h.trys.pop();
          continue;
      }
      m = c.call(x, h);
    } catch (v) {
      m = [6, v], E = 0;
    } finally {
      w = g = 0;
    }
    if (m[0] & 5) throw m[1];
    return { value: m[0] ? m[1] : void 0, done: !0 };
  }
}, Qs = function() {
  function x(c, h, w, E) {
    this.EXECUTIONS_TO_REPORT_PERFORMANCE = 100, this.executions = 0, this.executionResults = [], this.wasPrimaryDecoderUsedInLastDecode = !1, this.verbose = w, h && _i.isSupported() ? (this.primaryDecoder = new _i(c, w, E), this.secondaryDecoder = new yi(c, w, E)) : this.primaryDecoder = new yi(c, w, E);
  }
  return x.prototype.decodeAsync = function(c) {
    return Si(this, void 0, void 0, function() {
      var h;
      return Ti(this, function(w) {
        switch (w.label) {
          case 0:
            h = performance.now(), w.label = 1;
          case 1:
            return w.trys.push([1, , 3, 4]), [4, this.getDecoder().decodeAsync(c)];
          case 2:
            return [2, w.sent()];
          case 3:
            return this.possiblyLogPerformance(h), [7];
          case 4:
            return [2];
        }
      });
    });
  }, x.prototype.decodeRobustlyAsync = function(c) {
    return Si(this, void 0, void 0, function() {
      var h, w;
      return Ti(this, function(E) {
        switch (E.label) {
          case 0:
            h = performance.now(), E.label = 1;
          case 1:
            return E.trys.push([1, 3, 4, 5]), [4, this.primaryDecoder.decodeAsync(c)];
          case 2:
            return [2, E.sent()];
          case 3:
            if (w = E.sent(), this.secondaryDecoder)
              return [2, this.secondaryDecoder.decodeAsync(c)];
            throw w;
          case 4:
            return this.possiblyLogPerformance(h), [7];
          case 5:
            return [2];
        }
      });
    });
  }, x.prototype.getDecoder = function() {
    return this.secondaryDecoder ? this.wasPrimaryDecoderUsedInLastDecode === !1 ? (this.wasPrimaryDecoderUsedInLastDecode = !0, this.primaryDecoder) : (this.wasPrimaryDecoderUsedInLastDecode = !1, this.secondaryDecoder) : this.primaryDecoder;
  }, x.prototype.possiblyLogPerformance = function(c) {
    if (this.verbose) {
      var h = performance.now() - c;
      this.executionResults.push(h), this.executions++, this.possiblyFlushPerformanceReport();
    }
  }, x.prototype.possiblyFlushPerformanceReport = function() {
    if (!(this.executions < this.EXECUTIONS_TO_REPORT_PERFORMANCE)) {
      for (var c = 0, h = 0, w = this.executionResults; h < w.length; h++) {
        var E = w[h];
        c += E;
      }
      var g = c / this.executionResults.length;
      console.log("".concat(g, " ms for ").concat(this.executionResults.length, " last runs.")), this.executions = 0, this.executionResults = [];
    }
  }, x;
}(), Vr = /* @__PURE__ */ function() {
  var x = function(c, h) {
    return x = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(w, E) {
      w.__proto__ = E;
    } || function(w, E) {
      for (var g in E) Object.prototype.hasOwnProperty.call(E, g) && (w[g] = E[g]);
    }, x(c, h);
  };
  return function(c, h) {
    if (typeof h != "function" && h !== null)
      throw new TypeError("Class extends value " + String(h) + " is not a constructor or null");
    x(c, h);
    function w() {
      this.constructor = c;
    }
    c.prototype = h === null ? Object.create(h) : (w.prototype = h.prototype, new w());
  };
}(), tr = function(x, c, h, w) {
  function E(g) {
    return g instanceof h ? g : new h(function(b) {
      b(g);
    });
  }
  return new (h || (h = Promise))(function(g, b) {
    function M(v) {
      try {
        m(w.next(v));
      } catch (R) {
        b(R);
      }
    }
    function O(v) {
      try {
        m(w.throw(v));
      } catch (R) {
        b(R);
      }
    }
    function m(v) {
      v.done ? g(v.value) : E(v.value).then(M, O);
    }
    m((w = w.apply(x, c || [])).next());
  });
}, nr = function(x, c) {
  var h = { label: 0, sent: function() {
    if (g[0] & 1) throw g[1];
    return g[1];
  }, trys: [], ops: [] }, w, E, g, b;
  return b = { next: M(0), throw: M(1), return: M(2) }, typeof Symbol == "function" && (b[Symbol.iterator] = function() {
    return this;
  }), b;
  function M(m) {
    return function(v) {
      return O([m, v]);
    };
  }
  function O(m) {
    if (w) throw new TypeError("Generator is already executing.");
    for (; b && (b = 0, m[0] && (h = 0)), h; ) try {
      if (w = 1, E && (g = m[0] & 2 ? E.return : m[0] ? E.throw || ((g = E.return) && g.call(E), 0) : E.next) && !(g = g.call(E, m[1])).done) return g;
      switch (E = 0, g && (m = [m[0] & 2, g.value]), m[0]) {
        case 0:
        case 1:
          g = m;
          break;
        case 4:
          return h.label++, { value: m[1], done: !1 };
        case 5:
          h.label++, E = m[1], m = [0];
          continue;
        case 7:
          m = h.ops.pop(), h.trys.pop();
          continue;
        default:
          if (g = h.trys, !(g = g.length > 0 && g[g.length - 1]) && (m[0] === 6 || m[0] === 2)) {
            h = 0;
            continue;
          }
          if (m[0] === 3 && (!g || m[1] > g[0] && m[1] < g[3])) {
            h.label = m[1];
            break;
          }
          if (m[0] === 6 && h.label < g[1]) {
            h.label = g[1], g = m;
            break;
          }
          if (g && h.label < g[2]) {
            h.label = g[2], h.ops.push(m);
            break;
          }
          g[2] && h.ops.pop(), h.trys.pop();
          continue;
      }
      m = c.call(x, h);
    } catch (v) {
      m = [6, v], E = 0;
    } finally {
      w = g = 0;
    }
    if (m[0] & 5) throw m[1];
    return { value: m[0] ? m[1] : void 0, done: !0 };
  }
}, Vi = function() {
  function x(c, h) {
    this.name = c, this.track = h;
  }
  return x.prototype.isSupported = function() {
    return this.track.getCapabilities ? this.name in this.track.getCapabilities() : !1;
  }, x.prototype.apply = function(c) {
    var h = {};
    h[this.name] = c;
    var w = { advanced: [h] };
    return this.track.applyConstraints(w);
  }, x.prototype.value = function() {
    var c = this.track.getSettings();
    if (this.name in c) {
      var h = c[this.name];
      return h;
    }
    return null;
  }, x;
}(), $s = function(x) {
  Vr(c, x);
  function c(h, w) {
    return x.call(this, h, w) || this;
  }
  return c.prototype.min = function() {
    return this.getCapabilities().min;
  }, c.prototype.max = function() {
    return this.getCapabilities().max;
  }, c.prototype.step = function() {
    return this.getCapabilities().step;
  }, c.prototype.apply = function(h) {
    var w = {};
    w[this.name] = h;
    var E = { advanced: [w] };
    return this.track.applyConstraints(E);
  }, c.prototype.getCapabilities = function() {
    this.failIfNotSupported();
    var h = this.track.getCapabilities(), w = h[this.name];
    return {
      min: w.min,
      max: w.max,
      step: w.step
    };
  }, c.prototype.failIfNotSupported = function() {
    if (!this.isSupported())
      throw new Error("".concat(this.name, " capability not supported"));
  }, c;
}(Vi), Js = function(x) {
  Vr(c, x);
  function c(h) {
    return x.call(this, "zoom", h) || this;
  }
  return c;
}($s), eo = function(x) {
  Vr(c, x);
  function c(h) {
    return x.call(this, "torch", h) || this;
  }
  return c;
}(Vi), to = function() {
  function x(c) {
    this.track = c;
  }
  return x.prototype.zoomFeature = function() {
    return new Js(this.track);
  }, x.prototype.torchFeature = function() {
    return new eo(this.track);
  }, x;
}(), no = function() {
  function x(c, h, w) {
    this.isClosed = !1, this.parentElement = c, this.mediaStream = h, this.callbacks = w, this.surface = this.createVideoElement(this.parentElement.clientWidth), c.append(this.surface);
  }
  return x.prototype.createVideoElement = function(c) {
    var h = document.createElement("video");
    return h.style.width = "".concat(c, "px"), h.style.display = "block", h.muted = !0, h.setAttribute("muted", "true"), h.playsInline = !0, h;
  }, x.prototype.setupSurface = function() {
    var c = this;
    this.surface.onabort = function() {
      throw "RenderedCameraImpl video surface onabort() called";
    }, this.surface.onerror = function() {
      throw "RenderedCameraImpl video surface onerror() called";
    };
    var h = function() {
      var w = c.surface.clientWidth, E = c.surface.clientHeight;
      c.callbacks.onRenderSurfaceReady(w, E), c.surface.removeEventListener("playing", h);
    };
    this.surface.addEventListener("playing", h), this.surface.srcObject = this.mediaStream, this.surface.play();
  }, x.create = function(c, h, w, E) {
    return tr(this, void 0, void 0, function() {
      var g, b;
      return nr(this, function(M) {
        switch (M.label) {
          case 0:
            return g = new x(c, h, E), w.aspectRatio ? (b = {
              aspectRatio: w.aspectRatio
            }, [4, g.getFirstTrackOrFail().applyConstraints(b)]) : [3, 2];
          case 1:
            M.sent(), M.label = 2;
          case 2:
            return g.setupSurface(), [2, g];
        }
      });
    });
  }, x.prototype.failIfClosed = function() {
    if (this.isClosed)
      throw "The RenderedCamera has already been closed.";
  }, x.prototype.getFirstTrackOrFail = function() {
    if (this.failIfClosed(), this.mediaStream.getVideoTracks().length === 0)
      throw "No video tracks found";
    return this.mediaStream.getVideoTracks()[0];
  }, x.prototype.pause = function() {
    this.failIfClosed(), this.surface.pause();
  }, x.prototype.resume = function(c) {
    this.failIfClosed();
    var h = this, w = function() {
      setTimeout(c, 200), h.surface.removeEventListener("playing", w);
    };
    this.surface.addEventListener("playing", w), this.surface.play();
  }, x.prototype.isPaused = function() {
    return this.failIfClosed(), this.surface.paused;
  }, x.prototype.getSurface = function() {
    return this.failIfClosed(), this.surface;
  }, x.prototype.getRunningTrackCapabilities = function() {
    return this.getFirstTrackOrFail().getCapabilities();
  }, x.prototype.getRunningTrackSettings = function() {
    return this.getFirstTrackOrFail().getSettings();
  }, x.prototype.applyVideoConstraints = function(c) {
    return tr(this, void 0, void 0, function() {
      return nr(this, function(h) {
        if ("aspectRatio" in c)
          throw "Changing 'aspectRatio' in run-time is not yet supported.";
        return [2, this.getFirstTrackOrFail().applyConstraints(c)];
      });
    });
  }, x.prototype.close = function() {
    if (this.isClosed)
      return Promise.resolve();
    var c = this;
    return new Promise(function(h, w) {
      var E = c.mediaStream.getVideoTracks(), g = E.length, b = 0;
      c.mediaStream.getVideoTracks().forEach(function(M) {
        c.mediaStream.removeTrack(M), M.stop(), ++b, b >= g && (c.isClosed = !0, c.parentElement.removeChild(c.surface), h());
      });
    });
  }, x.prototype.getCapabilities = function() {
    return new to(this.getFirstTrackOrFail());
  }, x;
}(), ro = function() {
  function x(c) {
    this.mediaStream = c;
  }
  return x.prototype.render = function(c, h, w) {
    return tr(this, void 0, void 0, function() {
      return nr(this, function(E) {
        return [2, no.create(c, this.mediaStream, h, w)];
      });
    });
  }, x.create = function(c) {
    return tr(this, void 0, void 0, function() {
      var h, w;
      return nr(this, function(E) {
        switch (E.label) {
          case 0:
            if (!navigator.mediaDevices)
              throw "navigator.mediaDevices not supported";
            return h = {
              audio: !1,
              video: c
            }, [4, navigator.mediaDevices.getUserMedia(h)];
          case 1:
            return w = E.sent(), [2, new x(w)];
        }
      });
    });
  }, x;
}(), Ni = function(x, c, h, w) {
  function E(g) {
    return g instanceof h ? g : new h(function(b) {
      b(g);
    });
  }
  return new (h || (h = Promise))(function(g, b) {
    function M(v) {
      try {
        m(w.next(v));
      } catch (R) {
        b(R);
      }
    }
    function O(v) {
      try {
        m(w.throw(v));
      } catch (R) {
        b(R);
      }
    }
    function m(v) {
      v.done ? g(v.value) : E(v.value).then(M, O);
    }
    m((w = w.apply(x, c || [])).next());
  });
}, Oi = function(x, c) {
  var h = { label: 0, sent: function() {
    if (g[0] & 1) throw g[1];
    return g[1];
  }, trys: [], ops: [] }, w, E, g, b;
  return b = { next: M(0), throw: M(1), return: M(2) }, typeof Symbol == "function" && (b[Symbol.iterator] = function() {
    return this;
  }), b;
  function M(m) {
    return function(v) {
      return O([m, v]);
    };
  }
  function O(m) {
    if (w) throw new TypeError("Generator is already executing.");
    for (; b && (b = 0, m[0] && (h = 0)), h; ) try {
      if (w = 1, E && (g = m[0] & 2 ? E.return : m[0] ? E.throw || ((g = E.return) && g.call(E), 0) : E.next) && !(g = g.call(E, m[1])).done) return g;
      switch (E = 0, g && (m = [m[0] & 2, g.value]), m[0]) {
        case 0:
        case 1:
          g = m;
          break;
        case 4:
          return h.label++, { value: m[1], done: !1 };
        case 5:
          h.label++, E = m[1], m = [0];
          continue;
        case 7:
          m = h.ops.pop(), h.trys.pop();
          continue;
        default:
          if (g = h.trys, !(g = g.length > 0 && g[g.length - 1]) && (m[0] === 6 || m[0] === 2)) {
            h = 0;
            continue;
          }
          if (m[0] === 3 && (!g || m[1] > g[0] && m[1] < g[3])) {
            h.label = m[1];
            break;
          }
          if (m[0] === 6 && h.label < g[1]) {
            h.label = g[1], g = m;
            break;
          }
          if (g && h.label < g[2]) {
            h.label = g[2], h.ops.push(m);
            break;
          }
          g[2] && h.ops.pop(), h.trys.pop();
          continue;
      }
      m = c.call(x, h);
    } catch (v) {
      m = [6, v], E = 0;
    } finally {
      w = g = 0;
    }
    if (m[0] & 5) throw m[1];
    return { value: m[0] ? m[1] : void 0, done: !0 };
  }
}, io = function() {
  function x() {
  }
  return x.failIfNotSupported = function() {
    return Ni(this, void 0, void 0, function() {
      return Oi(this, function(c) {
        if (!navigator.mediaDevices)
          throw "navigator.mediaDevices not supported";
        return [2, new x()];
      });
    });
  }, x.prototype.create = function(c) {
    return Ni(this, void 0, void 0, function() {
      return Oi(this, function(h) {
        return [2, ro.create(c)];
      });
    });
  }, x;
}(), so = function(x, c, h, w) {
  function E(g) {
    return g instanceof h ? g : new h(function(b) {
      b(g);
    });
  }
  return new (h || (h = Promise))(function(g, b) {
    function M(v) {
      try {
        m(w.next(v));
      } catch (R) {
        b(R);
      }
    }
    function O(v) {
      try {
        m(w.throw(v));
      } catch (R) {
        b(R);
      }
    }
    function m(v) {
      v.done ? g(v.value) : E(v.value).then(M, O);
    }
    m((w = w.apply(x, c || [])).next());
  });
}, oo = function(x, c) {
  var h = { label: 0, sent: function() {
    if (g[0] & 1) throw g[1];
    return g[1];
  }, trys: [], ops: [] }, w, E, g, b;
  return b = { next: M(0), throw: M(1), return: M(2) }, typeof Symbol == "function" && (b[Symbol.iterator] = function() {
    return this;
  }), b;
  function M(m) {
    return function(v) {
      return O([m, v]);
    };
  }
  function O(m) {
    if (w) throw new TypeError("Generator is already executing.");
    for (; b && (b = 0, m[0] && (h = 0)), h; ) try {
      if (w = 1, E && (g = m[0] & 2 ? E.return : m[0] ? E.throw || ((g = E.return) && g.call(E), 0) : E.next) && !(g = g.call(E, m[1])).done) return g;
      switch (E = 0, g && (m = [m[0] & 2, g.value]), m[0]) {
        case 0:
        case 1:
          g = m;
          break;
        case 4:
          return h.label++, { value: m[1], done: !1 };
        case 5:
          h.label++, E = m[1], m = [0];
          continue;
        case 7:
          m = h.ops.pop(), h.trys.pop();
          continue;
        default:
          if (g = h.trys, !(g = g.length > 0 && g[g.length - 1]) && (m[0] === 6 || m[0] === 2)) {
            h = 0;
            continue;
          }
          if (m[0] === 3 && (!g || m[1] > g[0] && m[1] < g[3])) {
            h.label = m[1];
            break;
          }
          if (m[0] === 6 && h.label < g[1]) {
            h.label = g[1], g = m;
            break;
          }
          if (g && h.label < g[2]) {
            h.label = g[2], h.ops.push(m);
            break;
          }
          g[2] && h.ops.pop(), h.trys.pop();
          continue;
      }
      m = c.call(x, h);
    } catch (v) {
      m = [6, v], E = 0;
    } finally {
      w = g = 0;
    }
    if (m[0] & 5) throw m[1];
    return { value: m[0] ? m[1] : void 0, done: !0 };
  }
}, ao = function() {
  function x() {
  }
  return x.retrieve = function() {
    if (navigator.mediaDevices)
      return x.getCamerasFromMediaDevices();
    var c = MediaStreamTrack;
    return MediaStreamTrack && c.getSources ? x.getCamerasFromMediaStreamTrack() : x.rejectWithError();
  }, x.rejectWithError = function() {
    var c = hn.unableToQuerySupportedDevices();
    return x.isHttpsOrLocalhost() || (c = hn.insecureContextCameraQueryError()), Promise.reject(c);
  }, x.isHttpsOrLocalhost = function() {
    if (location.protocol === "https:")
      return !0;
    var c = location.host.split(":")[0];
    return c === "127.0.0.1" || c === "localhost";
  }, x.getCamerasFromMediaDevices = function() {
    return so(this, void 0, void 0, function() {
      var c, h, w, E, g, b, M;
      return oo(this, function(O) {
        switch (O.label) {
          case 0:
            return c = function(m) {
              for (var v = m.getVideoTracks(), R = 0, ne = v; R < ne.length; R++) {
                var q = ne[R];
                q.enabled = !1, q.stop(), m.removeTrack(q);
              }
            }, [4, navigator.mediaDevices.getUserMedia({ audio: !1, video: !0 })];
          case 1:
            return h = O.sent(), [4, navigator.mediaDevices.enumerateDevices()];
          case 2:
            for (w = O.sent(), E = [], g = 0, b = w; g < b.length; g++)
              M = b[g], M.kind === "videoinput" && E.push({
                id: M.deviceId,
                label: M.label
              });
            return c(h), [2, E];
        }
      });
    });
  }, x.getCamerasFromMediaStreamTrack = function() {
    return new Promise(function(c, h) {
      var w = function(g) {
        for (var b = [], M = 0, O = g; M < O.length; M++) {
          var m = O[M];
          m.kind === "video" && b.push({
            id: m.id,
            label: m.label
          });
        }
        c(b);
      }, E = MediaStreamTrack;
      E.getSources(w);
    });
  }, x;
}(), Re;
(function(x) {
  x[x.UNKNOWN = 0] = "UNKNOWN", x[x.NOT_STARTED = 1] = "NOT_STARTED", x[x.SCANNING = 2] = "SCANNING", x[x.PAUSED = 3] = "PAUSED";
})(Re || (Re = {}));
var lo = function() {
  function x() {
    this.state = Re.NOT_STARTED, this.onGoingTransactionNewState = Re.UNKNOWN;
  }
  return x.prototype.directTransition = function(c) {
    this.failIfTransitionOngoing(), this.validateTransition(c), this.state = c;
  }, x.prototype.startTransition = function(c) {
    return this.failIfTransitionOngoing(), this.validateTransition(c), this.onGoingTransactionNewState = c, this;
  }, x.prototype.execute = function() {
    if (this.onGoingTransactionNewState === Re.UNKNOWN)
      throw "Transaction is already cancelled, cannot execute().";
    var c = this.onGoingTransactionNewState;
    this.onGoingTransactionNewState = Re.UNKNOWN, this.directTransition(c);
  }, x.prototype.cancel = function() {
    if (this.onGoingTransactionNewState === Re.UNKNOWN)
      throw "Transaction is already cancelled, cannot cancel().";
    this.onGoingTransactionNewState = Re.UNKNOWN;
  }, x.prototype.getState = function() {
    return this.state;
  }, x.prototype.failIfTransitionOngoing = function() {
    if (this.onGoingTransactionNewState !== Re.UNKNOWN)
      throw "Cannot transition to a new state, already under transition";
  }, x.prototype.validateTransition = function(c) {
    switch (this.state) {
      case Re.UNKNOWN:
        throw "Transition from unknown is not allowed";
      case Re.NOT_STARTED:
        this.failIfNewStateIs(c, [Re.PAUSED]);
        break;
      case Re.SCANNING:
        break;
      case Re.PAUSED:
        break;
    }
  }, x.prototype.failIfNewStateIs = function(c, h) {
    for (var w = 0, E = h; w < E.length; w++) {
      var g = E[w];
      if (c === g)
        throw "Cannot transition from ".concat(this.state, " to ").concat(c);
    }
  }, x;
}(), co = function() {
  function x(c) {
    this.stateManager = c;
  }
  return x.prototype.startTransition = function(c) {
    return this.stateManager.startTransition(c);
  }, x.prototype.directTransition = function(c) {
    this.stateManager.directTransition(c);
  }, x.prototype.getState = function() {
    return this.stateManager.getState();
  }, x.prototype.canScanFile = function() {
    return this.stateManager.getState() === Re.NOT_STARTED;
  }, x.prototype.isScanning = function() {
    return this.stateManager.getState() !== Re.NOT_STARTED;
  }, x.prototype.isStrictlyScanning = function() {
    return this.stateManager.getState() === Re.SCANNING;
  }, x.prototype.isPaused = function() {
    return this.stateManager.getState() === Re.PAUSED;
  }, x;
}(), ho = function() {
  function x() {
  }
  return x.create = function() {
    return new co(new lo());
  }, x;
}(), uo = /* @__PURE__ */ function() {
  var x = function(c, h) {
    return x = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(w, E) {
      w.__proto__ = E;
    } || function(w, E) {
      for (var g in E) Object.prototype.hasOwnProperty.call(E, g) && (w[g] = E[g]);
    }, x(c, h);
  };
  return function(c, h) {
    if (typeof h != "function" && h !== null)
      throw new TypeError("Class extends value " + String(h) + " is not a constructor or null");
    x(c, h);
    function w() {
      this.constructor = c;
    }
    c.prototype = h === null ? Object.create(h) : (w.prototype = h.prototype, new w());
  };
}(), at = function(x) {
  uo(c, x);
  function c() {
    return x !== null && x.apply(this, arguments) || this;
  }
  return c.DEFAULT_WIDTH = 300, c.DEFAULT_WIDTH_OFFSET = 2, c.FILE_SCAN_MIN_HEIGHT = 300, c.FILE_SCAN_HIDDEN_CANVAS_PADDING = 100, c.MIN_QR_BOX_SIZE = 50, c.SHADED_LEFT = 1, c.SHADED_RIGHT = 2, c.SHADED_TOP = 3, c.SHADED_BOTTOM = 4, c.SHADED_REGION_ELEMENT_ID = "qr-shaded-region", c.VERBOSE = !1, c.BORDER_SHADER_DEFAULT_COLOR = "#ffffff", c.BORDER_SHADER_MATCH_COLOR = "rgb(90, 193, 56)", c;
}(Hs), fo = function() {
  function x(c, h) {
    this.logger = h, this.fps = at.SCAN_DEFAULT_FPS, c ? (c.fps && (this.fps = c.fps), this.disableFlip = c.disableFlip === !0, this.qrbox = c.qrbox, this.aspectRatio = c.aspectRatio, this.videoConstraints = c.videoConstraints) : this.disableFlip = at.DEFAULT_DISABLE_FLIP;
  }
  return x.prototype.isMediaStreamConstraintsValid = function() {
    return this.videoConstraints ? Ui.isMediaStreamConstraintsValid(this.videoConstraints, this.logger) : (this.logger.logError("Empty videoConstraints", !0), !1);
  }, x.prototype.isShadedBoxEnabled = function() {
    return !yt(this.qrbox);
  }, x.create = function(c, h) {
    return new x(c, h);
  }, x;
}(), Ri = function() {
  function x(c, h) {
    if (this.element = null, this.canvasElement = null, this.scannerPausedUiElement = null, this.hasBorderShaders = null, this.borderShaders = null, this.qrMatch = null, this.renderedCamera = null, this.qrRegion = null, this.context = null, this.lastScanImageFile = null, this.isScanning = !1, !document.getElementById(c))
      throw "HTML Element with id=".concat(c, " not found");
    this.elementId = c, this.verbose = !1;
    var w;
    typeof h == "boolean" ? this.verbose = h === !0 : h && (w = h, this.verbose = w.verbose === !0, w.experimentalFeatures), this.logger = new Ws(this.verbose), this.qrcode = new Qs(this.getSupportedFormats(h), this.getUseBarCodeDetectorIfSupported(w), this.verbose, this.logger), this.foreverScanTimeout, this.shouldScan = !0, this.stateManagerProxy = ho.create();
  }
  return x.prototype.start = function(c, h, w, E) {
    var g = this;
    if (!c)
      throw "cameraIdOrConfig is required";
    if (!w || typeof w != "function")
      throw "qrCodeSuccessCallback is required and should be a function.";
    var b;
    E ? b = E : b = this.verbose ? this.logger.log : function() {
    };
    var M = fo.create(h, this.logger);
    this.clearElement();
    var O = !1;
    M.videoConstraints && (M.isMediaStreamConstraintsValid() ? O = !0 : this.logger.logError("'videoConstraints' is not valid 'MediaStreamConstraints, it will be ignored.'", !0));
    var m = O, v = document.getElementById(this.elementId);
    v.clientWidth ? v.clientWidth : at.DEFAULT_WIDTH, v.style.position = "relative", this.shouldScan = !0, this.element = v;
    var R = this, ne = this.stateManagerProxy.startTransition(Re.SCANNING);
    return new Promise(function(q, Me) {
      var ie = m ? M.videoConstraints : R.createVideoConstraints(c);
      if (!ie) {
        ne.cancel(), Me("videoConstraints should be defined");
        return;
      }
      var gt = {};
      (!m || M.aspectRatio) && (gt.aspectRatio = M.aspectRatio);
      var St = {
        onRenderSurfaceReady: function(pe, K) {
          R.setupUi(pe, K, M), R.isScanning = !0, R.foreverScan(M, w, b);
        }
      };
      io.failIfNotSupported().then(function(pe) {
        pe.create(ie).then(function(K) {
          return K.render(g.element, gt, St).then(function(le) {
            R.renderedCamera = le, ne.execute(), q(null);
          }).catch(function(le) {
            ne.cancel(), Me(le);
          });
        }).catch(function(K) {
          ne.cancel(), Me(hn.errorGettingUserMedia(K));
        });
      }).catch(function(pe) {
        ne.cancel(), Me(hn.cameraStreamingNotSupported());
      });
    });
  }, x.prototype.pause = function(c) {
    if (!this.stateManagerProxy.isStrictlyScanning())
      throw "Cannot pause, scanner is not scanning.";
    this.stateManagerProxy.directTransition(Re.PAUSED), this.showPausedState(), (yt(c) || c !== !0) && (c = !1), c && this.renderedCamera && this.renderedCamera.pause();
  }, x.prototype.resume = function() {
    if (!this.stateManagerProxy.isPaused())
      throw "Cannot result, scanner is not paused.";
    if (!this.renderedCamera)
      throw "renderedCamera doesn't exist while trying resume()";
    var c = this, h = function() {
      c.stateManagerProxy.directTransition(Re.SCANNING), c.hidePausedState();
    };
    if (!this.renderedCamera.isPaused()) {
      h();
      return;
    }
    this.renderedCamera.resume(function() {
      h();
    });
  }, x.prototype.getState = function() {
    return this.stateManagerProxy.getState();
  }, x.prototype.stop = function() {
    var c = this;
    if (!this.stateManagerProxy.isScanning())
      throw "Cannot stop, scanner is not running or paused.";
    var h = this.stateManagerProxy.startTransition(Re.NOT_STARTED);
    this.shouldScan = !1, this.foreverScanTimeout && clearTimeout(this.foreverScanTimeout);
    var w = function() {
      if (c.element) {
        var g = document.getElementById(at.SHADED_REGION_ELEMENT_ID);
        g && c.element.removeChild(g);
      }
    }, E = this;
    return this.renderedCamera.close().then(function() {
      return E.renderedCamera = null, E.element && (E.element.removeChild(E.canvasElement), E.canvasElement = null), w(), E.qrRegion && (E.qrRegion = null), E.context && (E.context = null), h.execute(), E.hidePausedState(), E.isScanning = !1, Promise.resolve();
    });
  }, x.prototype.scanFile = function(c, h) {
    return this.scanFileV2(c, h).then(function(w) {
      return w.decodedText;
    });
  }, x.prototype.scanFileV2 = function(c, h) {
    var w = this;
    if (!c || !(c instanceof File))
      throw "imageFile argument is mandatory and should be instance of File. Use 'event.target.files[0]'.";
    if (yt(h) && (h = !0), !this.stateManagerProxy.canScanFile())
      throw "Cannot start file scan - ongoing camera scan";
    return new Promise(function(E, g) {
      w.possiblyCloseLastScanImageFile(), w.clearElement(), w.lastScanImageFile = URL.createObjectURL(c);
      var b = new Image();
      b.onload = function() {
        var M = b.width, O = b.height, m = document.getElementById(w.elementId), v = m.clientWidth ? m.clientWidth : at.DEFAULT_WIDTH, R = Math.max(m.clientHeight ? m.clientHeight : O, at.FILE_SCAN_MIN_HEIGHT), ne = w.computeCanvasDrawConfig(M, O, v, R);
        if (h) {
          var q = w.createCanvasElement(v, R, "qr-canvas-visible");
          q.style.display = "inline-block", m.appendChild(q);
          var Me = q.getContext("2d");
          if (!Me)
            throw "Unable to get 2d context from canvas";
          Me.canvas.width = v, Me.canvas.height = R, Me.drawImage(b, 0, 0, M, O, ne.x, ne.y, ne.width, ne.height);
        }
        var ie = at.FILE_SCAN_HIDDEN_CANVAS_PADDING, gt = Math.max(b.width, ne.width), St = Math.max(b.height, ne.height), pe = gt + 2 * ie, K = St + 2 * ie, le = w.createCanvasElement(pe, K);
        m.appendChild(le);
        var Tt = le.getContext("2d");
        if (!Tt)
          throw "Unable to get 2d context from canvas";
        Tt.canvas.width = pe, Tt.canvas.height = K, Tt.drawImage(b, 0, 0, M, O, ie, ie, gt, St);
        try {
          w.qrcode.decodeRobustlyAsync(le).then(function(xe) {
            E(Ii.createFromQrcodeResult(xe));
          }).catch(g);
        } catch (xe) {
          g("QR code parse error, error = ".concat(xe));
        }
      }, b.onerror = g, b.onabort = g, b.onstalled = g, b.onsuspend = g, b.src = URL.createObjectURL(c);
    });
  }, x.prototype.clear = function() {
    this.clearElement();
  }, x.getCameras = function() {
    return ao.retrieve();
  }, x.prototype.getRunningTrackCapabilities = function() {
    return this.getRenderedCameraOrFail().getRunningTrackCapabilities();
  }, x.prototype.getRunningTrackSettings = function() {
    return this.getRenderedCameraOrFail().getRunningTrackSettings();
  }, x.prototype.getRunningTrackCameraCapabilities = function() {
    return this.getRenderedCameraOrFail().getCapabilities();
  }, x.prototype.applyVideoConstraints = function(c) {
    if (c) {
      if (!Ui.isMediaStreamConstraintsValid(c, this.logger))
        throw "invalid videoConstaints passed, check logs for more details";
    } else throw "videoConstaints is required argument.";
    return this.getRenderedCameraOrFail().applyVideoConstraints(c);
  }, x.prototype.getRenderedCameraOrFail = function() {
    if (this.renderedCamera == null)
      throw "Scanning is not in running state, call this API only when QR code scanning using camera is in running state.";
    return this.renderedCamera;
  }, x.prototype.getSupportedFormats = function(c) {
    var h = [
      G.QR_CODE,
      G.AZTEC,
      G.CODABAR,
      G.CODE_39,
      G.CODE_93,
      G.CODE_128,
      G.DATA_MATRIX,
      G.MAXICODE,
      G.ITF,
      G.EAN_13,
      G.EAN_8,
      G.PDF_417,
      G.RSS_14,
      G.RSS_EXPANDED,
      G.UPC_A,
      G.UPC_E,
      G.UPC_EAN_EXTENSION
    ];
    if (!c || typeof c == "boolean" || !c.formatsToSupport)
      return h;
    if (!Array.isArray(c.formatsToSupport))
      throw "configOrVerbosityFlag.formatsToSupport should be undefined or an array.";
    if (c.formatsToSupport.length === 0)
      throw "Atleast 1 formatsToSupport is needed.";
    for (var w = [], E = 0, g = c.formatsToSupport; E < g.length; E++) {
      var b = g[E];
      Vs(b) ? w.push(b) : this.logger.warn("Invalid format: ".concat(b, " passed in config, ignoring."));
    }
    if (w.length === 0)
      throw "None of formatsToSupport match supported values.";
    return w;
  }, x.prototype.getUseBarCodeDetectorIfSupported = function(c) {
    if (yt(c))
      return !0;
    if (!yt(c.useBarCodeDetectorIfSupported))
      return c.useBarCodeDetectorIfSupported !== !1;
    if (yt(c.experimentalFeatures))
      return !0;
    var h = c.experimentalFeatures;
    return yt(h.useBarCodeDetectorIfSupported) ? !0 : h.useBarCodeDetectorIfSupported !== !1;
  }, x.prototype.validateQrboxSize = function(c, h, w) {
    var E = this, g = w.qrbox;
    this.validateQrboxConfig(g);
    var b = this.toQrdimensions(c, h, g), M = function(m) {
      if (m < at.MIN_QR_BOX_SIZE)
        throw "minimum size of 'config.qrbox' dimension value is" + " ".concat(at.MIN_QR_BOX_SIZE, "px.");
    }, O = function(m) {
      return m > c && (E.logger.warn("`qrbox.width` or `qrbox` is larger than the width of the root element. The width will be truncated to the width of root element."), m = c), m;
    };
    M(b.width), M(b.height), b.width = O(b.width);
  }, x.prototype.validateQrboxConfig = function(c) {
    if (typeof c != "number" && typeof c != "function" && (c.width === void 0 || c.height === void 0))
      throw "Invalid instance of QrDimensions passed for 'config.qrbox'. Both 'width' and 'height' should be set.";
  }, x.prototype.toQrdimensions = function(c, h, w) {
    if (typeof w == "number")
      return { width: w, height: w };
    if (typeof w == "function")
      try {
        return w(c, h);
      } catch (E) {
        throw new Error("qrbox config was passed as a function but it failed with unknown error" + E);
      }
    return w;
  }, x.prototype.setupUi = function(c, h, w) {
    w.isShadedBoxEnabled() && this.validateQrboxSize(c, h, w);
    var E = yt(w.qrbox) ? { width: c, height: h } : w.qrbox;
    this.validateQrboxConfig(E);
    var g = this.toQrdimensions(c, h, E);
    g.height > h && this.logger.warn("[Html5Qrcode] config.qrbox has height that isgreater than the height of the video stream. Shading will be ignored");
    var b = w.isShadedBoxEnabled() && g.height <= h, M = {
      x: 0,
      y: 0,
      width: c,
      height: h
    }, O = b ? this.getShadedRegionBounds(c, h, g) : M, m = this.createCanvasElement(O.width, O.height), v = { willReadFrequently: !0 }, R = m.getContext("2d", v);
    R.canvas.width = O.width, R.canvas.height = O.height, this.element.append(m), b && this.possiblyInsertShadingElement(this.element, c, h, g), this.createScannerPausedUiElement(this.element), this.qrRegion = O, this.context = R, this.canvasElement = m;
  }, x.prototype.createScannerPausedUiElement = function(c) {
    var h = document.createElement("div");
    h.innerText = hn.scannerPaused(), h.style.display = "none", h.style.position = "absolute", h.style.top = "0px", h.style.zIndex = "1", h.style.background = "rgba(9, 9, 9, 0.46)", h.style.color = "#FFECEC", h.style.textAlign = "center", h.style.width = "100%", c.appendChild(h), this.scannerPausedUiElement = h;
  }, x.prototype.scanContext = function(c, h) {
    var w = this;
    return this.stateManagerProxy.isPaused() ? Promise.resolve(!1) : this.qrcode.decodeAsync(this.canvasElement).then(function(E) {
      return c(E.text, Ii.createFromQrcodeResult(E)), w.possiblyUpdateShaders(!0), !0;
    }).catch(function(E) {
      w.possiblyUpdateShaders(!1);
      var g = hn.codeParseError(E);
      return h(g, Gs.createFrom(g)), !1;
    });
  }, x.prototype.foreverScan = function(c, h, w) {
    var E = this;
    if (this.shouldScan && this.renderedCamera) {
      var g = this.renderedCamera.getSurface(), b = g.videoWidth / g.clientWidth, M = g.videoHeight / g.clientHeight;
      if (!this.qrRegion)
        throw "qrRegion undefined when localMediaStream is ready.";
      var O = this.qrRegion.width * b, m = this.qrRegion.height * M, v = this.qrRegion.x * b, R = this.qrRegion.y * M;
      this.context.drawImage(g, v, R, O, m, 0, 0, this.qrRegion.width, this.qrRegion.height);
      var ne = function() {
        E.foreverScanTimeout = setTimeout(function() {
          E.foreverScan(c, h, w);
        }, E.getTimeoutFps(c.fps));
      };
      this.scanContext(h, w).then(function(q) {
        !q && c.disableFlip !== !0 ? (E.context.translate(E.context.canvas.width, 0), E.context.scale(-1, 1), E.scanContext(h, w).finally(function() {
          ne();
        })) : ne();
      }).catch(function(q) {
        E.logger.logError("Error happend while scanning context", q), ne();
      });
    }
  }, x.prototype.createVideoConstraints = function(c) {
    if (typeof c == "string")
      return { deviceId: { exact: c } };
    if (typeof c == "object") {
      var h = "facingMode", w = "deviceId", E = { user: !0, environment: !0 }, g = "exact", b = function(Me) {
        if (Me in E)
          return !0;
        throw "config has invalid 'facingMode' value = " + "'".concat(Me, "'");
      }, M = Object.keys(c);
      if (M.length !== 1)
        throw "'cameraIdOrConfig' object should have exactly 1 key," + " if passed as an object, found ".concat(M.length, " keys");
      var O = Object.keys(c)[0];
      if (O !== h && O !== w)
        throw "Only '".concat(h, "' and '").concat(w, "' ") + " are supported for 'cameraIdOrConfig'";
      if (O === h) {
        var m = c.facingMode;
        if (typeof m == "string") {
          if (b(m))
            return { facingMode: m };
        } else if (typeof m == "object")
          if (g in m) {
            if (b(m["".concat(g)]))
              return {
                facingMode: {
                  exact: m["".concat(g)]
                }
              };
          } else
            throw "'facingMode' should be string or object with" + " ".concat(g, " as key.");
        else {
          var v = typeof m;
          throw "Invalid type of 'facingMode' = ".concat(v);
        }
      } else {
        var R = c.deviceId;
        if (typeof R == "string")
          return { deviceId: R };
        if (typeof R == "object") {
          if (g in R)
            return {
              deviceId: { exact: R["".concat(g)] }
            };
          throw "'deviceId' should be string or object with" + " ".concat(g, " as key.");
        } else {
          var ne = typeof R;
          throw "Invalid type of 'deviceId' = ".concat(ne);
        }
      }
    }
    var q = typeof c;
    throw "Invalid type of 'cameraIdOrConfig' = ".concat(q);
  }, x.prototype.computeCanvasDrawConfig = function(c, h, w, E) {
    if (c <= w && h <= E) {
      var g = (w - c) / 2, b = (E - h) / 2;
      return {
        x: g,
        y: b,
        width: c,
        height: h
      };
    } else {
      var M = c, O = h;
      return c > w && (h = w / c * h, c = w), h > E && (c = E / h * c, h = E), this.logger.log("Image downsampled from " + "".concat(M, "X").concat(O) + " to ".concat(c, "X").concat(h, ".")), this.computeCanvasDrawConfig(c, h, w, E);
    }
  }, x.prototype.clearElement = function() {
    if (this.stateManagerProxy.isScanning())
      throw "Cannot clear while scan is ongoing, close it first.";
    var c = document.getElementById(this.elementId);
    c && (c.innerHTML = "");
  }, x.prototype.possiblyUpdateShaders = function(c) {
    this.qrMatch !== c && (this.hasBorderShaders && this.borderShaders && this.borderShaders.length && this.borderShaders.forEach(function(h) {
      h.style.backgroundColor = c ? at.BORDER_SHADER_MATCH_COLOR : at.BORDER_SHADER_DEFAULT_COLOR;
    }), this.qrMatch = c);
  }, x.prototype.possiblyCloseLastScanImageFile = function() {
    this.lastScanImageFile && (URL.revokeObjectURL(this.lastScanImageFile), this.lastScanImageFile = null);
  }, x.prototype.createCanvasElement = function(c, h, w) {
    var E = c, g = h, b = document.createElement("canvas");
    return b.style.width = "".concat(E, "px"), b.style.height = "".concat(g, "px"), b.style.display = "none", b.id = yt(w) ? "qr-canvas" : w, b;
  }, x.prototype.getShadedRegionBounds = function(c, h, w) {
    if (w.width > c || w.height > h)
      throw "'config.qrbox' dimensions should not be greater than the dimensions of the root HTML element.";
    return {
      x: (c - w.width) / 2,
      y: (h - w.height) / 2,
      width: w.width,
      height: w.height
    };
  }, x.prototype.possiblyInsertShadingElement = function(c, h, w, E) {
    if (!(h - E.width < 1 || w - E.height < 1)) {
      var g = document.createElement("div");
      g.style.position = "absolute";
      var b = (h - E.width) / 2, M = (w - E.height) / 2;
      if (g.style.borderLeft = "".concat(b, "px solid rgba(0, 0, 0, 0.48)"), g.style.borderRight = "".concat(b, "px solid rgba(0, 0, 0, 0.48)"), g.style.borderTop = "".concat(M, "px solid rgba(0, 0, 0, 0.48)"), g.style.borderBottom = "".concat(M, "px solid rgba(0, 0, 0, 0.48)"), g.style.boxSizing = "border-box", g.style.top = "0px", g.style.bottom = "0px", g.style.left = "0px", g.style.right = "0px", g.id = "".concat(at.SHADED_REGION_ELEMENT_ID), h - E.width < 11 || w - E.height < 11)
        this.hasBorderShaders = !1;
      else {
        var O = 5, m = 40;
        this.insertShaderBorders(g, m, O, -O, null, 0, !0), this.insertShaderBorders(g, m, O, -O, null, 0, !1), this.insertShaderBorders(g, m, O, null, -O, 0, !0), this.insertShaderBorders(g, m, O, null, -O, 0, !1), this.insertShaderBorders(g, O, m + O, -O, null, -O, !0), this.insertShaderBorders(g, O, m + O, null, -O, -O, !0), this.insertShaderBorders(g, O, m + O, -O, null, -O, !1), this.insertShaderBorders(g, O, m + O, null, -O, -O, !1), this.hasBorderShaders = !0;
      }
      c.append(g);
    }
  }, x.prototype.insertShaderBorders = function(c, h, w, E, g, b, M) {
    var O = document.createElement("div");
    O.style.position = "absolute", O.style.backgroundColor = at.BORDER_SHADER_DEFAULT_COLOR, O.style.width = "".concat(h, "px"), O.style.height = "".concat(w, "px"), E !== null && (O.style.top = "".concat(E, "px")), g !== null && (O.style.bottom = "".concat(g, "px")), M ? O.style.left = "".concat(b, "px") : O.style.right = "".concat(b, "px"), this.borderShaders || (this.borderShaders = []), this.borderShaders.push(O), c.appendChild(O);
  }, x.prototype.showPausedState = function() {
    if (!this.scannerPausedUiElement)
      throw "[internal error] scanner paused UI element not found";
    this.scannerPausedUiElement.style.display = "block";
  }, x.prototype.hidePausedState = function() {
    if (!this.scannerPausedUiElement)
      throw "[internal error] scanner paused UI element not found";
    this.scannerPausedUiElement.style.display = "none";
  }, x.prototype.getTimeoutFps = function(c) {
    return 1e3 / c;
  }, x;
}(), Di;
(function(x) {
  x[x.STATUS_DEFAULT = 0] = "STATUS_DEFAULT", x[x.STATUS_SUCCESS = 1] = "STATUS_SUCCESS", x[x.STATUS_WARNING = 2] = "STATUS_WARNING", x[x.STATUS_REQUESTING_PERMISSION = 3] = "STATUS_REQUESTING_PERMISSION";
})(Di || (Di = {}));
const xo = Lr`
  .circle {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-self: center;
    margin: 0 auto;
    width: fit-content;
    border-radius: 50px;
    background-color: transparent;
    border: 2px solid #ffffff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    padding: 2px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  :host(:active) {
    transform: scale(0.95);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .circle.disabled {
    opacity: 0.6;
    cursor: auto;
  }

  .circle__inner {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #ffffff;
  }

  :host(:hover) {
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.3);
  }
`;
var go = Object.defineProperty, wo = (x, c, h, w) => {
  for (var E = void 0, g = x.length - 1, b; g >= 0; g--)
    (b = x[g]) && (E = b(c, h, E) || E);
  return E && go(c, h, E), E;
};
const Hr = class Hr extends Kt {
  constructor() {
    super(...arguments), this.disabled = !1;
  }
  render() {
    return Mn`
      <div
        class="circle ${this.disabled ? "disabled" : ""}"
        @click="${() => this.dispatchEvent(new Event("on-click"))}"
      >
        <div class="circle__inner"></div>
      </div>
    `;
  }
};
Hr.styles = xo;
let rr = Hr;
wo([
  Ur({ type: Boolean })
], rr.prototype, "disabled");
customElements.define("camera-button", rr);
const Ao = Lr`
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    --c: no-repeat linear-gradient(white 0 0);
    background: var(--c), var(--c), var(--c), var(--c);
    background-size: 21px 21px;
    animation: l5 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
  }
  @keyframes l5 {
    0% {
      background-position:
        0 0,
        100% 0,
        100% 100%,
        0 100%;
    }
    33% {
      background-position:
        0 0,
        100% 0,
        100% 100%,
        0 100%;
      width: 60px;
      height: 60px;
    }
    66% {
      background-position:
        100% 0,
        100% 100%,
        0 100%,
        0 0;
      width: 60px;
      height: 60px;
    }
    100% {
      background-position:
        100% 0,
        100% 100%,
        0 100%,
        0 0;
    }
  }
`;
var Eo = Object.defineProperty, Co = (x, c, h, w) => {
  for (var E = void 0, g = x.length - 1, b; g >= 0; g--)
    (b = x[g]) && (E = b(c, h, E) || E);
  return E && Eo(c, h, E), E;
};
const Gr = class Gr extends Kt {
  constructor() {
    super(...arguments), this.disabled = !1;
  }
  render() {
    return Mn` <div class="loader"></div> `;
  }
};
Gr.styles = Ao;
let ir = Gr;
Co([
  Ur({ type: Boolean })
], ir.prototype, "disabled");
customElements.define("camera-loader", ir);
const po = Lr`
  :host {
    display: block;
    position: fixed;
    width: 100%;
    height: 100vh;
    max-width: 600px;
  }

  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal.show {
    display: flex;
  }

  .modal-content {
    position: relative;
    width: 100%;
    max-width: 600px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: #000;
  }

  #scanner,
  #scanner video,
  #scanner canvas {
    display: block; /* по умолчанию <video> inline */
    width: 100% !important;
    height: 100% !important;
    object-fit: cover; /* чтобы видео не искажалось */
  }

  #preview {
    display: block;
    max-width: 100%;
    margin: 10px auto;
  }

  .controls,
  .close-button {
    z-index: 999;
  }

  .controls {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;
    padding: 10px;
    background: rgba(0, 0, 0, 0.8);
  }

  .controls__button {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    background: none;
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }

  .controls__button:disabled {
    color: gray;
    pointer-events: none;
  }

  .controls__button:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .controls__file {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .controls__icon {
    width: 24px;
  }

  .controls__text {
    font-size: 12px;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
  }

  .scan-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    background: rgba(0, 255, 0, 0.3);
    border: 2px solid #00ff00;
    z-index: 999;
  }

  .scan-overlay.show {
    display: block;
    animation: scanAnimation 1s ease-out;
  }

  .notify {
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 0.5rem;

    border-radius: 25px;
    border: 1px solid green;

    background-color: lightgreen;
    z-index: 999;

    font-family: 'roboto';
  }

  .notify.hidden {
    display: none;
  }
  .notify.success {
    background: #28a745;
  }
  .notify.warning {
    background: #ffc107;
    color: #000;
  }
  .notify.danger {
    background: #dc3545;
  }

  .notify__message {
    max-width: 420px;
    margin: 0;
  }

  .uploaded-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 100%;
    margin-top: 10px;
    z-index: 997;
  }

  @keyframes scanAnimation {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
`;
var mo = Object.defineProperty, xn = (x, c, h, w) => {
  for (var E = void 0, g = x.length - 1, b; g >= 0; g--)
    (b = x[g]) && (E = b(c, h, E) || E);
  return E && mo(c, h, E), E;
};
const sr = class sr extends Kt {
  constructor() {
    super(...arguments), this.showScanner = !1, this.previewImg = null, this.cameras = [], this.camIndex = 0, this.lastResult = "", this.notify = {
      display: !1,
      type: "success",
      message: ""
    }, this.scanner = null;
  }
  update(c) {
    super.update(c), c.has("showScanner") && this.showScanner && (this.scanner = new Ri("scanner"), Ri.getCameras().then((h) => {
      this.cameras = h;
      const w = h.find((E) => /back|rear|environment/i.test(E.label));
      this.camIndex = h.indexOf(w || h[0]), this._startCamera();
    }).catch((h) => this._showNotification("No cameras: " + h, "danger")));
  }
  _startCamera() {
    var h;
    const c = this.cameras[this.camIndex].id;
    (h = this.scanner) == null || h.start(
      { deviceId: { exact: c } },
      { aspectRatio: 10 / 16, fps: 2, qrbox: { height: 600, width: 400 } },
      (w) => {
        this.lastResult = w, this._showNotification("Decoded: " + w, "success");
      },
      (w) => {
        this.lastResult = "";
      }
    ).catch((w) => {
      this._showNotification("Camera start failed: " + w, "danger");
    });
  }
  _onSwitch() {
    var c;
    (c = this.scanner) == null || c.stop().then(() => {
      this.camIndex = (this.camIndex + 1) % this.cameras.length, this._startCamera();
    });
  }
  _onClose() {
    var c;
    (c = this.scanner) == null || c.stop().then(() => {
      this._showNotification("Camera stopped", "warning");
    }), this.showScanner = !1;
  }
  async _onUpload(c) {
    var E, g, b;
    await ((E = this.scanner) == null ? void 0 : E.stop().then(() => {
      this._showNotification("Camera stopped", "warning");
    }));
    const h = c.target, w = (g = h == null ? void 0 : h.files) == null ? void 0 : g[0];
    w && (this.previewImg = URL.createObjectURL(w), (b = this.scanner) == null || b.scanFile(w, !0).then((M) => {
      this._onHandleData(M), this._showNotification("Decoded: " + M, "success");
    }).catch((M) => {
      this._showNotification("No QR in image", "danger");
    }), setTimeout(() => {
      this.previewImg = null, this._startCamera();
    }, 5e3));
  }
  async _onHandleData(c) {
    console.log(c);
  }
  async _showNotification(c, h = "success") {
    this.notify.message = c, this.notify.type = h, this.notify.display = !0, setTimeout(() => {
      this.notify.display = !1;
    }, 5e3);
  }
  _onSnapshot() {
    const c = document.getElementById("scanner");
    c == null || c.classList.add("flash"), setTimeout(() => c == null ? void 0 : c.classList.remove("flash"), 150), this.lastResult ? (this._onHandleData(this.lastResult), this._showNotification("Last: " + this.lastResult, "success")) : this._showNotification("No code detected yet", "warning");
  }
  render() {
    return Mn`
      <div class="modal ${this.showScanner ? "show" : ""}">
        <div class="modal-content">
          <button class="close-button" @click="${this._onClose}">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.1667 5.83171C14.3048 5.96984 14.3824 6.15721 14.3824 6.35254C14.3824 6.54787 14.3048 6.73524 14.1667 6.87338L11.0417 9.99836L14.1667 13.1234C14.3048 13.2615 14.3824 13.4489 14.3824 13.6442C14.3824 13.8396 14.3048 14.0269 14.1667 14.165C14.0285 14.3032 13.8412 14.3808 13.6459 14.3808C13.4505 14.3808 13.2631 14.3032 13.125 14.165L10 11.04L6.87502 14.165C6.73684 14.3032 6.5495 14.3808 6.35418 14.3808C6.15882 14.3808 5.97147 14.3032 5.83335 14.165C5.69522 14.0269 5.61757 13.8396 5.61762 13.6442C5.61762 13.4489 5.69517 13.2615 5.83335 13.1234L8.95835 9.99836L5.83335 6.87336C5.69521 6.73522 5.61758 6.5479 5.61761 6.35252C5.6176 6.15719 5.69517 5.96987 5.83335 5.83169C5.97147 5.69356 6.1588 5.61599 6.35418 5.61596C6.54951 5.61598 6.73688 5.69355 6.87502 5.83169L10 8.95669L13.125 5.83171C13.2631 5.69358 13.4505 5.61599 13.6458 5.61598C13.8412 5.61596 14.0285 5.69359 14.1667 5.83171Z"
                fill="#fff"
              />
            </svg>
          </button>

          <div
            class="notify ${this.notify.type} ${this.notify.display ? "" : "hidden"}"
            role="alert"
          >
            <p class="notify__message">${this.notify.message}</p>
          </div>

          ${this.previewImg ? Mn`
                <img id="preview" alt="Preview" src="${this.previewImg}" />
              ` : Mn` <slot name="scanner"></slot> `}

          <div class="controls">
            <button class="controls__button">
              <input
                type="file"
                class="controls__file"
                @change="${this._onUpload}"
                accept="image/*"
              />
              <div class="controls__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    fill="currentColor"
                    d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"
                  />
                </svg>
              </div>
              <p class="controls__text">Upload</p>
            </button>

            <camera-button
              .disabled="${!this.lastResult}"
              @on-click="${this._onSnapshot}"
            ></camera-button>

            <button
              class="controls__button"
              ?disabled="${this.cameras.length < 1}"
              @click="${this._onSwitch}"
            >
              <div class="controls__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96l160 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32l0 32L160 64C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96l-160 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-32 160 0c88.4 0 160-71.6 160-160z"
                  />
                </svg>
              </div>
              <p class="controls__text">Switch Camera</p>
            </button>
          </div>

          <div class="scan-overlay"></div>
        </div>
      </div>
    `;
  }
};
sr.styles = po, sr.properties = {
  showScanner: { type: Boolean }
};
let _t = sr;
xn([
  dn()
], _t.prototype, "showScanner");
xn([
  dn()
], _t.prototype, "previewImg");
xn([
  dn()
], _t.prototype, "cameras");
xn([
  dn()
], _t.prototype, "camIndex");
xn([
  dn()
], _t.prototype, "lastResult");
xn([
  dn()
], _t.prototype, "notify");
customElements.define("qr-widget", _t);
