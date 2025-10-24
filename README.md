## React drag and drop multiple dynamic column

A multiple column draggable drag and drop component built with **native HTML5 drag-and-drop API**

**✨ New in v2.0:** Now uses native HTML5 drag-and-drop instead of react-beautiful-dnd - fully compatible with React 19 and StrictMode!

Just send a JSON in the given structure to create draggable and droppable column, the column will create as the length of the JSON that pass in props

Now you can add your custom drag item component in drag drop component as children (now, its only one component accepted on single parent, future version will add whole drag drop container and drag item as HOC)

## demo

[Live demo](https://bibinantony1998.github.io/react-drag-and-drop-multiple/)

### Installation

`npm install react-drag-and-drop-multiple-dynamic-column`

<sup>\* Requires `react` and `react-dom` version 18+ or 19+ as peer dependencies</sup>

**Compatible with:**

- ✅ React 18.0.0+
- ✅ React 19.0.0+
- ✅ Works with both React 18 and React 19 APIs
- ✅ StrictMode compatible in both versions

### Features

✅ **Zero external drag-drop dependencies** - Uses native HTML5 APIs  
✅ **React 18 & 19 compatible** - Works with both versions seamlessly  
✅ **StrictMode compatible** - Works perfectly in both React 18 and 19  
✅ **Multiple item selection** - Select and drag multiple items at once  
✅ **Custom drag preview** - Beautiful SVG badge shows count when dragging multiple items  
✅ **Rich animations** - Smooth hover effects, pulse animations, and visual feedback  
✅ **Cross-column dragging** - Move items between different columns  
✅ **Lightweight** - No heavy dependencies

### Visual Features

🎨 **Custom Multi-Drag Badge** - When dragging multiple items, see a stunning SVG badge with:

- Stacked cards icon
- Item count in a red badge
- Beautiful gradient background

🎯 **Smart Hover Effects** - Hover animations work on both selected and unselected items

✨ **Multi-Drag Animation** - All selected items pulse during drag operation

🌈 **Visual Feedback** - Clear indicators for selected items, drop zones, and drag states

### Usage

#### Basic Example (Default Rendering)

```jsx
import DragDropComponent from "react-drag-and-drop-multiple-dynamic-column";

const data = [
  {
    id: "1",
    name: "Drag drop 1",
    data: [
      {
        id: "1",
        value: "Test 1",
      },
      {
        id: "2",
        value: "Test 2",
      },
      {
        id: "3",
        value: "Test 3",
      },
    ],
  },
  {
    id: "2",
    name: "Drag drop 2",
    data: [
      {
        id: "5",
        value: "Test 4",
      },
      {
        id: "6",
        value: "Test 5",
      },
    ],
  },
  {
    id: "3",
    name: "Drag drop 3",
    data: [
      {
        id: "7",
        value: "Test 6",
      },
      {
        id: "8",
        value: "Test 7",
      },
    ],
  },
];

const App = () => (
  <DragDropComponent
    onChange={(data) => console.log(data)}
    width="100%"
    height={"100%"}
    data={data}
    multiple
    draggerImg
    title
  >
    Try your custom drag item html component here
  </DragDropComponent>
);

createRoot(document.getElementById("root")).render(<App />);
```

#### Custom Rendering (NEW! 🎉)

The library now supports **custom rendering** - you can render anything you want inside draggable items!

```jsx
import DragDropComponent from "react-drag-and-drop-multiple-dynamic-column";

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
      // ... more items
    ],
  },
  // ... more lists
];

// Define your custom render function
const renderTaskCard = (item, index, listId) => (
  <div
    style={{
      padding: "16px",
      backgroundColor: "white",
      borderRadius: "8px",
      border: "1px solid #e0e0e0",
    }}
  >
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>👤 {item.assignee}</span>
      <span
        style={{
          color: item.priority === "high" ? "#ff4757" : "#2ed573",
        }}
      >
        {item.priority}
      </span>
    </div>
  </div>
);

// Use it!
<DragDropComponent
  data={data}
  renderItem={renderTaskCard} // 🎉 Custom render!
  onChange={(data) => console.log(data)}
  width="100%"
  height="600px"
  multiple
  title
/>;
```

**You can render:**

- 📋 Kanban cards with rich content
- ✅ Task items with checkboxes and metadata
- 📁 File manager items with icons
- 🛒 Shopping cart products with images
- 👥 User cards with avatars
- **Anything you can imagine!**

📚 **Documentation:**

- [CUSTOM-RENDERING.md](./CUSTOM-RENDERING.md) - Complete API and examples
- [HOC-PATTERN.md](./HOC-PATTERN.md) - Architecture and patterns
- [REACT-COMPATIBILITY.md](./REACT-COMPATIBILITY.md) - React 18 & 19 compatibility guide

```

### Props

| Prop Name   | Type                                              | Default Value | Description                                                                                  |
| ----------- | ------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------- |
| data        | array                                             | required      | Array of lists with items to display                                                         |
| onChange    | function                                          | required      | Callback function that receives updated data when items are moved                            |
| width       | number/string                                     | `0`           | Width of the component                                                                       |
| height      | number/string                                     | `0`           | Height of the component                                                                      |
| **renderItem** | **(item, index, listId) => ReactNode**         | optional      | **🎉 NEW! Custom render function for each item - render anything you want!**                |
| multiple    | boolean                                           | false         | Enable multi-select mode (select and drag multiple items at once)                            |
| title       | boolean                                           | false         | Show list titles                                                                             |
| centerTitle | boolean                                           | false         | Center-align list titles                                                                     |
| draggerImg  | boolean                                           | false         | Show drag handle image on items (only used with default rendering)                           |
| children    | ReactNode                                         | optional      | Legacy prop - use `renderItem` instead for custom rendering                                  |

[Bibin Antony](https://github.com/bibinantony1998)

### Limitations

- The multiple dragging item will not show when dragging (in the hold cursor mode)
```
