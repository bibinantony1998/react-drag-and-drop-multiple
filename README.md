## react-drag-drop-kanban | A React component by **Bibin Antony**

A highly customizable, multiple-column drag-and-drop board component built with the **native HTML5 drag-and-drop API**.

**Key Features:** 
- Uses native HTML5 drag-and-drop—fully compatible with React 18/19 and StrictMode!
- **Board Dragging:** Drag and reorder entire columns seamlessly!
- **Custom Rendering:** Render absolutely anything inside the drag items using the `renderItem` prop.

Just send a JSON array to create draggable and droppable columns. The component will dynamically render the columns based on the provided data structure.

## Demo

[Live demo](https://bibinantony1998.github.io/react-drag-and-drop-multiple/)

### Installation

```bash
npm install react-drag-drop-kanban
```

<sup>\* Requires `react` and `react-dom` version 18+ or 19+ as peer dependencies</sup>

**Compatible with:**
- ✅ React 18.0.0+
- ✅ React 19.0.0+
- ✅ Works with both React 18 and React 19 APIs
- ✅ StrictMode compatible in both versions

---

### Features

✅ **Zero external drag-drop dependencies** - Uses native HTML5 APIs  
✅ **React 18 & 19 compatible** - Works seamlessly with modern React  
✅ **Board Dragging** - Reorder entire boards/columns by dragging them  
✅ **Custom Rendering** - Full control over item rendering with `renderItem`  
✅ **Multiple item selection** - Select and drag multiple items at once  
✅ **Custom drag preview** - Beautiful SVG badge shows item count when dragging multiple items  
✅ **Rich animations** - Smooth hover effects, pulse animations, and visual feedback  
✅ **Cross-column dragging** - Move items between different columns  
✅ **Lightweight** - No heavy dependencies

### Visual Features

🎨 **Custom Multi-Drag Badge** - When dragging multiple items, see a stunning SVG badge with:
- Stacked cards icon
- Item count in a sleek badge
- Beautiful shadow effects

🎯 **Smart Hover Effects** - Hover animations work on both selected and unselected items

✨ **Multi-Drag Animation** - All selected items pulse during drag operations

🌈 **Visual Feedback** - Clear indicators for selected items, drop zones (for both items and boards), and drag states

---

### Usage

```jsx
import DragDropComponent from "react-drag-drop-kanban";

const data = [
  {
    id: "1",
    name: "Todo",
    data: [
      {
        id: "1",
        title: "Design System",
        description: "Create component library",
        priority: "high",
        assignee: "John Doe",
      },
      {
        id: "2",
        title: "API Integration",
        description: "Connect backend endpoints",
        priority: "medium",
        assignee: "Jane Smith",
      }
    ],
  },
  {
    id: "2",
    name: "In Progress",
    data: [
      {
        id: "3",
        title: "Authentication",
        description: "Implement OAuth2",
        priority: "high",
        assignee: "Alice Brown",
      }
    ],
  }
];

// Define your custom render function to render anything you want!
const renderTaskCard = (item, index, listId) => (
  <div style={{ padding: "16px", backgroundColor: "white", borderRadius: "8px", border: "1px solid #e0e0e0" }}>
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>👤 {item.assignee}</span>
      <span style={{ color: item.priority === "high" ? "#ff4757" : "#2ed573" }}>
        {item.priority}
      </span>
    </div>
  </div>
);

const App = () => (
  <DragDropComponent
    data={data}
    renderItem={renderTaskCard}
    onChange={(newData) => console.log(newData)}
    width="100%"
    height="600px"
    multiple={true} // Enable multi-drag
    boardDraggable={true} // Enable dragging entire columns
    title={true}
  />
);

export default App;
```

**You can render:**
- 📋 Kanban cards with rich content
- ✅ Task items with checkboxes and metadata
- 📁 File manager items with icons
- 🛒 Shopping cart products with images
- 👥 User cards with avatars
- **Anything you can imagine!**

---

### Props

| Prop Name        | Type                                     | Default Value | Description                                                                                  |
| ---------------- | ---------------------------------------- | ------------- | -------------------------------------------------------------------------------------------- |
| `data`           | array                                    | **required**  | Array of lists with items to display                                                         |
| `onChange`       | function                                 | **required**  | Callback function that receives updated data when items or boards are moved                  |
| `width`          | number/string                            | `"100%"`      | Width of the component                                                                       |
| `height`         | number/string                            | `"100%"`      | Height of the component                                                                      |
| `renderItem`     | `(item, index, listId) => ReactNode`     | optional      | Custom render function for each item - render anything you want!                             |
| `boardDraggable` | boolean                                  | false         | Enable dragging and reordering entire columns/boards                                         |
| `multiple`       | boolean                                  | false         | Enable multi-select mode (select and drag multiple items at once using checkboxes)           |
| `title`          | boolean                                  | false         | Show list titles                                                                             |
| `centerTitle`    | boolean                                  | false         | Center-align list titles                                                                     |
| `draggerImg`     | boolean                                  | false         | Show drag handle image on items (only used when fallback rendering is active)                |
| `children`       | ReactNode                                | optional      | Legacy prop - use `renderItem` instead for custom rendering                                  |

---

[Bibin Antony](https://github.com/bibinantony1998)
