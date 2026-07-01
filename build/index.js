import { jsx as u, jsxs as L } from "react/jsx-runtime";
import { useState as _ } from "react";
const z = (n) => /* @__PURE__ */ u("div", { className: "cursor-pointer drag_item_content", onClick: () => {
  var f;
  (f = document.getElementById(n.inputId)) == null || f.click();
}, children: n.children ? n.children : /* @__PURE__ */ u("main", { className: `drag_item ${n.draggerImg ? "drag_item_drag_img" : ""}`, children: /* @__PURE__ */ u("span", { className: "", children: /* @__PURE__ */ u("div", { children: n.data.value }) }) }) }), G = ({
  children: n,
  id: w,
  title: f,
  centerTitle: g,
  onDrop: v,
  onDragOver: b,
  draggable: x,
  onDragStart: I,
  onDragEnd: D,
  isDragged: N,
  isDragOver: A
}) => /* @__PURE__ */ u("div", { className: `h-100 w-100 ${N ? "dragging-board" : ""} ${A ? "board-drag-over" : ""}`, children: /* @__PURE__ */ u("div", { className: "h-100", children: /* @__PURE__ */ u("div", { className: "h-100", onDrop: v, onDragOver: b, children: /* @__PURE__ */ L(
  "div",
  {
    className: "h-100 drag_box_container",
    draggable: x,
    onDragStart: I,
    onDragEnd: D,
    children: [
      f ? /* @__PURE__ */ u(
        "div",
        {
          className: `dragger_title ${g ? "center_title" : ""}`,
          children: f
        }
      ) : "",
      /* @__PURE__ */ u(
        "div",
        {
          className: `drag_box ${f ? "drag_box_on_drag_tittle" : ""}`,
          children: n
        }
      )
    ]
  }
) }) }) }), K = (n) => {
  const [w, f] = _(n.data), [g, v] = _({ items: [], selectedArray: "" }), [b, x] = _(null), [I, D] = _(null), [N, A] = _(null), k = (t, e) => {
    const i = Array.from(t), [r] = i.splice(e, 1);
    return [r, i];
  }, $ = (t, e, i, r) => {
    let o = { ...g };
    g.selectedArray !== r && (v({ items: [], selectedArray: r }), o = { items: [], selectedArray: r });
    let a = [];
    if (t.target.checked) {
      let s = [];
      s.push({ ...e, sourceIndex: i }), a = [...o.items, ...s];
    } else {
      let s = [...o.items];
      var l = s.findIndex((d) => d.id === e.id);
      s.splice(l, 1), a = [...s];
    }
    a.sort((s, d) => s.sourceIndex - d.sourceIndex), v({ items: a, selectedArray: r });
  }, T = (t, e, i) => {
    const r = Array.from(t);
    return r.splice(e, 0, i), r;
  }, B = (t, e, i, r) => {
    t.stopPropagation(), t.dataTransfer.effectAllowed = "move", t.dataTransfer.setData("text/html", t.currentTarget.innerHTML), t.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        item: e,
        sourceListId: i,
        sourceIndex: r
      })
    );
    const o = g.items.findIndex((a) => a.sourceIndex === r) !== -1 && g.selectedArray === i;
    if (o && g.items.length > 1) {
      const a = j(g.items.length);
      document.body.appendChild(a), t.dataTransfer.setDragImage(a, 40, 40), setTimeout(() => {
        document.body.removeChild(a);
      }, 0);
    }
    t.currentTarget.classList.add("dragging"), o && g.items.length > 1 && g.items.forEach((a) => {
      var s;
      const l = document.getElementById(
        `${i}_${a.sourceIndex}`
      );
      l && ((s = l.closest(".drag_item_wrapper")) == null || s.classList.add("multi-dragging"));
    });
  }, j = (t) => {
    const e = document.createElement("div");
    e.style.cssText = `
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
    const i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    i.setAttribute("width", "70"), i.setAttribute("height", "70"), i.setAttribute("viewBox", "0 0 70 70"), i.style.cssText = "pointer-events: none;";
    const r = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    r.setAttribute("x", "10"), r.setAttribute("y", "10"), r.setAttribute("width", "50"), r.setAttribute("height", "50"), r.setAttribute("rx", "8"), r.setAttribute("fill", "white"), r.setAttribute("stroke", "#e0e0e0"), r.setAttribute("stroke-width", "2"), i.appendChild(r);
    const o = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    ), a = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    a.setAttribute("x", "28"), a.setAttribute("y", "20"), a.setAttribute("width", "22"), a.setAttribute("height", "28"), a.setAttribute("rx", "2"), a.setAttribute("fill", "#f5f5f5"), a.setAttribute("stroke", "#ccc"), a.setAttribute("stroke-width", "1");
    const l = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    l.setAttribute("x", "26"), l.setAttribute("y", "23"), l.setAttribute("width", "22"), l.setAttribute("height", "28"), l.setAttribute("rx", "2"), l.setAttribute("fill", "#fafafa"), l.setAttribute("stroke", "#bbb"), l.setAttribute("stroke-width", "1");
    const s = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    s.setAttribute("x", "24"), s.setAttribute("y", "26"), s.setAttribute("width", "22"), s.setAttribute("height", "28"), s.setAttribute("rx", "2"), s.setAttribute("fill", "white"), s.setAttribute("stroke", "#999"), s.setAttribute("stroke-width", "1.5"), o.appendChild(a), o.appendChild(l), o.appendChild(s), i.appendChild(o);
    const d = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    d.setAttribute("cx", "52"), d.setAttribute("cy", "18"), d.setAttribute("r", "12"), d.setAttribute("fill", "#666"), d.setAttribute("stroke", "white"), d.setAttribute("stroke-width", "2");
    const c = document.createElementNS("http://www.w3.org/2000/svg", "text");
    return c.setAttribute("x", "52"), c.setAttribute("y", "23"), c.setAttribute("text-anchor", "middle"), c.setAttribute("fill", "white"), c.setAttribute("font-size", "13"), c.setAttribute("font-weight", "700"), c.setAttribute("font-family", "system-ui, -apple-system, sans-serif"), c.textContent = t.toString(), i.appendChild(d), i.appendChild(c), e.appendChild(i), e;
  }, O = (t) => {
    t.currentTarget.classList.remove("dragging"), document.querySelectorAll(".multi-dragging").forEach((e) => {
      e.classList.remove("multi-dragging");
    }), x(null);
  }, J = (t, e, i) => {
    t.preventDefault(), t.dataTransfer.dropEffect = "move", x({ listId: e, index: i });
  }, S = (t, e, i) => {
    t.preventDefault(), t.stopPropagation();
    const r = t.dataTransfer.getData("application/json");
    if (!r) return;
    const o = JSON.parse(r);
    if (o.type === "board") {
      const d = o.sourceListId;
      if (d === e) return;
      const c = [...w], h = c.findIndex((m) => m.id === d), p = c.findIndex((m) => m.id === e);
      if (h !== -1 && p !== -1) {
        const [m] = c.splice(h, 1);
        c.splice(p, 0, m), f(c), n.onChange(c);
      }
      A(null), D(null);
      return;
    }
    const { sourceListId: a, sourceIndex: l } = o, s = [...w];
    if (g.items.findIndex((d) => d.sourceIndex === l) !== -1 && g.selectedArray === a)
      g.items.forEach((d, c) => {
        let h = s.findIndex((p) => p.id === a);
        if (h !== -1) {
          const p = s[h].data;
          let m = d.sourceIndex - c;
          const [y, q] = k(
            p,
            m
          );
          s[h].data = q;
          let E = s.findIndex(
            (C) => C.id === e
          );
          if (E !== -1) {
            const C = s[E].data;
            s[E].data = T(
              C,
              i + c,
              y
            );
          }
        }
      }), v({ items: [], selectedArray: "" });
    else {
      let d = s.findIndex((h) => h.id === a);
      const c = s[d].data;
      if (d !== -1) {
        const [h, p] = k(
          c,
          l
        );
        s[d].data = p;
        let m = s.findIndex(
          (y) => y.id === e
        );
        if (m !== -1) {
          const y = s[m].data;
          s[m].data = T(
            y,
            i,
            h
          );
        }
      }
    }
    f(s), x(null), n.onChange(s);
  }, M = (t, e) => {
    A(null);
    const i = t.dataTransfer.getData("application/json");
    if (i && JSON.parse(i).type === "board") {
      S(t, e, 0);
      return;
    }
    const r = w.find((o) => o.id === e);
    r && S(t, e, r.data.length);
  }, P = (t, e) => {
    if (!n.boardDraggable) {
      t.preventDefault();
      return;
    }
    t.dataTransfer.effectAllowed = "move", t.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type: "board", sourceListId: e })
    ), D(e);
  }, F = (t) => {
    D(null), A(null);
  };
  return /* @__PURE__ */ u("div", { style: { width: n.width, height: n.height }, children: /* @__PURE__ */ u("div", { className: "d-flex h-100 p-2", children: w.map((t) => /* @__PURE__ */ u(
    G,
    {
      centerTitle: n.centerTitle,
      title: n.title ? t.name : "",
      id: t.id,
      draggable: n.boardDraggable,
      onDragStart: (e) => P(e, t.id),
      onDragEnd: F,
      isDragged: I === t.id,
      isDragOver: N === t.id,
      onDrop: (e) => M(e, t.id),
      onDragOver: (e) => {
        e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "move", I && I !== t.id && A(t.id);
      },
      children: t.data.map((e, i) => /* @__PURE__ */ u(
        "div",
        {
          draggable: !0,
          onDragStart: (r) => B(r, e, t.id, i),
          onDragEnd: O,
          onDragOver: (r) => J(r, t.id, i),
          onDrop: (r) => S(r, t.id, i),
          className: `drag_item_wrapper ${(b == null ? void 0 : b.listId) === t.id && (b == null ? void 0 : b.index) === i ? "drag-over" : ""}`,
          children: /* @__PURE__ */ L("div", { className: "drag_item_container", children: [
            /* @__PURE__ */ u(
              "input",
              {
                disabled: !n.multiple,
                id: `${t.id}_${i}`,
                type: "checkbox",
                checked: g.selectedArray === t.id && g.items.findIndex((r) => r.id === e.id) !== -1,
                onChange: (r) => $(r, e, i, t.id)
              }
            ),
            /* @__PURE__ */ u(
              "div",
              {
                className: "drag_item_content",
                onClick: () => {
                  var r;
                  (r = document.getElementById(`${t.id}_${i}`)) == null || r.click();
                },
                children: n.renderItem ? (
                  // Use custom render function if provided
                  n.renderItem(e, i, t.id)
                ) : (
                  // Fallback to default Card component for backward compatibility
                  /* @__PURE__ */ u(
                    z,
                    {
                      draggerImg: n.draggerImg,
                      data: e,
                      inputId: `${t.id}_${i}`,
                      children: n.children ? n.children : null
                    }
                  )
                )
              }
            )
          ] })
        },
        e.id
      ))
    },
    `drop_box_${t.id}`
  )) }) });
};
export {
  K as default
};
//# sourceMappingURL=index.js.map
