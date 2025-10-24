import { jsx as l, jsxs as E } from "react/jsx-runtime";
import { useState as y } from "react";
const B = (a) => /* @__PURE__ */ l("div", { className: "cursor-pointer drag_item_content", onClick: () => {
  var h;
  (h = document.getElementById(a.inputId)) == null || h.click();
}, children: a.children ? a.children : /* @__PURE__ */ l("main", { className: `drag_item ${a.draggerImg ? "drag_item_drag_img" : ""}`, children: /* @__PURE__ */ l("span", { className: "", children: /* @__PURE__ */ l("div", { children: a.data.value }) }) }) }), M = ({
  children: a,
  id: f,
  title: h,
  centerTitle: u,
  onDrop: b,
  onDragOver: g
}) => /* @__PURE__ */ l("div", { className: "h-100 w-100", children: /* @__PURE__ */ l("div", { className: "h-100", children: /* @__PURE__ */ l("div", { className: "h-100", onDrop: b, onDragOver: g, children: /* @__PURE__ */ E("div", { className: "h-100 drag_box_container", children: [
  h ? /* @__PURE__ */ l(
    "div",
    {
      className: `dragger_title ${u ? "center_title" : ""}`,
      children: h
    }
  ) : "",
  /* @__PURE__ */ l(
    "div",
    {
      className: `drag_box ${h ? "drag_box_on_drag_tittle" : ""}`,
      children: a
    }
  )
] }) }) }) }), J = (a) => {
  const [f, h] = y(a.data), [u, b] = y({ items: [], selectedArray: "" }), [g, v] = y(null), _ = (t, i) => {
    const r = Array.from(t), [e] = r.splice(i, 1);
    return [e, r];
  }, k = (t, i, r, e) => {
    let m = { ...u };
    u.selectedArray !== e && (b({ items: [], selectedArray: e }), m = { items: [], selectedArray: e });
    let d = [];
    if (t.target.checked) {
      let n = [];
      n.push({ ...i, sourceIndex: r }), d = [...m.items, ...n];
    } else {
      let n = [...m.items];
      var s = n.findIndex((o) => o.id === i.id);
      n.splice(s, 1), d = [...n];
    }
    d.sort((n, o) => n.sourceIndex - o.sourceIndex), b({ items: d, selectedArray: e });
  }, N = (t, i, r) => {
    const e = Array.from(t);
    return e.splice(i, 0, r), e;
  }, C = (t, i, r, e) => {
    t.dataTransfer.effectAllowed = "move", t.dataTransfer.setData("text/html", t.currentTarget.innerHTML), t.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        item: i,
        sourceListId: r,
        sourceIndex: e
      })
    );
    const m = u.items.findIndex((d) => d.sourceIndex === e) !== -1 && u.selectedArray === r;
    if (m && u.items.length > 1) {
      const d = S(u.items.length);
      document.body.appendChild(d), t.dataTransfer.setDragImage(d, 40, 40), setTimeout(() => {
        document.body.removeChild(d);
      }, 0);
    }
    t.currentTarget.classList.add("dragging"), m && u.items.length > 1 && u.items.forEach((d) => {
      var n;
      const s = document.getElementById(
        `${r}_${d.sourceIndex}`
      );
      s && ((n = s.closest(".drag_item_wrapper")) == null || n.classList.add("multi-dragging"));
    });
  }, S = (t) => {
    const i = document.createElement("div");
    i.style.cssText = `
      position: absolute;
      top: -1000px;
      left: -1000px;
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
    `;
    const r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    r.setAttribute("width", "70"), r.setAttribute("height", "70"), r.setAttribute("viewBox", "0 0 70 70"), r.style.cssText = "pointer-events: none;";
    const e = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    e.setAttribute("x", "10"), e.setAttribute("y", "10"), e.setAttribute("width", "50"), e.setAttribute("height", "50"), e.setAttribute("rx", "8"), e.setAttribute("fill", "white"), e.setAttribute("stroke", "#e0e0e0"), e.setAttribute("stroke-width", "2"), r.appendChild(e);
    const m = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    ), d = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    d.setAttribute("x", "28"), d.setAttribute("y", "20"), d.setAttribute("width", "22"), d.setAttribute("height", "28"), d.setAttribute("rx", "2"), d.setAttribute("fill", "#f5f5f5"), d.setAttribute("stroke", "#ccc"), d.setAttribute("stroke-width", "1");
    const s = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    s.setAttribute("x", "26"), s.setAttribute("y", "23"), s.setAttribute("width", "22"), s.setAttribute("height", "28"), s.setAttribute("rx", "2"), s.setAttribute("fill", "#fafafa"), s.setAttribute("stroke", "#bbb"), s.setAttribute("stroke-width", "1");
    const n = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    n.setAttribute("x", "24"), n.setAttribute("y", "26"), n.setAttribute("width", "22"), n.setAttribute("height", "28"), n.setAttribute("rx", "2"), n.setAttribute("fill", "white"), n.setAttribute("stroke", "#999"), n.setAttribute("stroke-width", "1.5"), m.appendChild(d), m.appendChild(s), m.appendChild(n), r.appendChild(m);
    const o = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    o.setAttribute("cx", "52"), o.setAttribute("cy", "18"), o.setAttribute("r", "12"), o.setAttribute("fill", "#666"), o.setAttribute("stroke", "white"), o.setAttribute("stroke-width", "2");
    const c = document.createElementNS("http://www.w3.org/2000/svg", "text");
    return c.setAttribute("x", "52"), c.setAttribute("y", "23"), c.setAttribute("text-anchor", "middle"), c.setAttribute("fill", "white"), c.setAttribute("font-size", "13"), c.setAttribute("font-weight", "700"), c.setAttribute("font-family", "system-ui, -apple-system, sans-serif"), c.textContent = t.toString(), r.appendChild(o), r.appendChild(c), i.appendChild(r), i;
  }, L = (t) => {
    t.currentTarget.classList.remove("dragging"), document.querySelectorAll(".multi-dragging").forEach((i) => {
      i.classList.remove("multi-dragging");
    }), v(null);
  }, T = (t, i, r) => {
    t.preventDefault(), t.dataTransfer.dropEffect = "move", v({ listId: i, index: r });
  }, D = (t, i, r) => {
    t.preventDefault(), t.stopPropagation();
    const e = t.dataTransfer.getData("application/json");
    if (!e) return;
    const { sourceListId: m, sourceIndex: d } = JSON.parse(e), s = [...f];
    if (u.items.findIndex((n) => n.sourceIndex === d) !== -1 && u.selectedArray === m)
      u.items.forEach((n, o) => {
        let c = s.findIndex((w) => w.id === m);
        if (c !== -1) {
          const w = s[c].data;
          let A = n.sourceIndex - o;
          const [p, j] = _(
            w,
            A
          );
          s[c].data = j;
          let x = s.findIndex(
            (I) => I.id === i
          );
          if (x !== -1) {
            const I = s[x].data;
            s[x].data = N(
              I,
              r + o,
              p
            );
          }
        }
      }), b({ items: [], selectedArray: "" });
    else {
      let n = s.findIndex((c) => c.id === m);
      const o = s[n].data;
      if (n !== -1) {
        const [c, w] = _(
          o,
          d
        );
        s[n].data = w;
        let A = s.findIndex(
          (p) => p.id === i
        );
        if (A !== -1) {
          const p = s[A].data;
          s[A].data = N(
            p,
            r,
            c
          );
        }
      }
    }
    h(s), v(null), a.onChange(s);
  }, $ = (t, i) => {
    const r = f.find((e) => e.id === i);
    r && D(t, i, r.data.length);
  };
  return /* @__PURE__ */ l("div", { style: { width: a.width, height: a.height }, children: /* @__PURE__ */ l("div", { className: "d-flex h-100 p-2", children: f.map((t) => /* @__PURE__ */ l(
    M,
    {
      centerTitle: a.centerTitle,
      title: a.title ? t.name : "",
      id: t.id,
      onDrop: (i) => $(i, t.id),
      onDragOver: (i) => {
        i.preventDefault(), i.dataTransfer.dropEffect = "move";
      },
      children: t.data.map((i, r) => /* @__PURE__ */ l(
        "div",
        {
          draggable: !0,
          onDragStart: (e) => C(e, i, t.id, r),
          onDragEnd: L,
          onDragOver: (e) => T(e, t.id, r),
          onDrop: (e) => D(e, t.id, r),
          className: `drag_item_wrapper ${(g == null ? void 0 : g.listId) === t.id && (g == null ? void 0 : g.index) === r ? "drag-over" : ""}`,
          children: /* @__PURE__ */ E("div", { className: "drag_item_container", children: [
            /* @__PURE__ */ l(
              "input",
              {
                disabled: !a.multiple,
                id: `${t.id}_${r}`,
                type: "checkbox",
                checked: u.selectedArray === t.id && u.items.findIndex((e) => e.id === i.id) !== -1,
                onChange: (e) => k(e, i, r, t.id)
              }
            ),
            /* @__PURE__ */ l(
              "div",
              {
                className: "drag_item_content",
                onClick: () => {
                  var e;
                  (e = document.getElementById(`${t.id}_${r}`)) == null || e.click();
                },
                children: a.renderItem ? (
                  // Use custom render function if provided
                  a.renderItem(i, r, t.id)
                ) : (
                  // Fallback to default Card component for backward compatibility
                  /* @__PURE__ */ l(
                    B,
                    {
                      draggerImg: a.draggerImg,
                      data: i,
                      inputId: `${t.id}_${r}`,
                      children: a.children ? a.children : null
                    }
                  )
                )
              }
            )
          ] })
        },
        i.id
      ))
    },
    `drop_box_${t.id}`
  )) }) });
};
export {
  J as default
};
//# sourceMappingURL=index.js.map
