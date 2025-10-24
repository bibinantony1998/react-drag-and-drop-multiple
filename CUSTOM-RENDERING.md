# Custom Rendering Guide

## Overview

The library provides a powerful `renderItem` prop that lets you render **any custom content** inside draggable items. This makes the library incredibly flexible for building Kanban boards, task lists, file managers, shopping carts, and more!

## Basic Usage

### The `renderItem` Prop

```tsx
<DragDropComponent
  data={yourData}
  renderItem={(item, index, listId) => {
    // Return any JSX you want!
    return <YourCustomComponent item={item} />;
  }}
  onChange={handleChange}
  width="100%"
  height="100%"
  multiple
  title
/>
```

### Function Signature

```typescript
renderItem?: (item: any, index: number, listId: string) => ReactNode
```

**Parameters:**

- `item` - The data object for this specific item
- `index` - Position of the item in its list (0-based)
- `listId` - ID of the list containing this item

**Returns:** Any valid React node (JSX, component, string, etc.)

## Examples

### Example 1: Simple Task Card

```tsx
const data = [
  {
    id: "1",
    name: "Todo",
    data: [
      { id: "1", title: "Buy groceries", completed: false },
      { id: "2", title: "Walk the dog", completed: true },
    ],
  },
];

const renderTask = (item) => (
  <div
    style={{
      padding: "10px",
      backgroundColor: item.completed ? "#e8f5e9" : "white",
      border: "1px solid #ddd",
      borderRadius: "4px",
    }}
  >
    <input type="checkbox" checked={item.completed} readOnly />
    <span style={{ marginLeft: "8px" }}>{item.title}</span>
  </div>
);

<DragDropComponent data={data} renderItem={renderTask} {...otherProps} />;
```

### Example 2: Rich Content Card (Kanban Board)

```tsx
const renderKanbanCard = (item, index, listId) => {
  const priorityColors = {
    high: "#ff4757",
    medium: "#ffa502",
    low: "#2ed573",
  };

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "white",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        marginBottom: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "16px" }}>{item.title}</h3>
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "12px",
            fontSize: "11px",
            fontWeight: "600",
            color: "white",
            backgroundColor: priorityColors[item.priority],
          }}
        >
          {item.priority.toUpperCase()}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "14px",
          color: "#666",
          margin: "0 0 12px 0",
        }}
      >
        {item.description}
      </p>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
          color: "#999",
        }}
      >
        <span>👤 {item.assignee}</span>
        <span>📅 {item.dueDate}</span>
      </div>

      {/* Tags */}
      {item.tags && (
        <div style={{ marginTop: "8px" }}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                display: "inline-block",
                padding: "2px 8px",
                marginRight: "4px",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
                fontSize: "11px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
```

### Example 3: Product Card (E-commerce)

```tsx
const renderProduct = (product) => (
  <div
    style={{
      padding: "12px",
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",
      textAlign: "center",
    }}
  >
    <img
      src={product.imageUrl}
      alt={product.name}
      style={{
        width: "100%",
        height: "120px",
        objectFit: "cover",
        borderRadius: "4px",
        marginBottom: "8px",
      }}
    />
    <h4 style={{ margin: "0 0 8px 0", fontSize: "14px" }}>{product.name}</h4>
    <div
      style={{
        fontSize: "18px",
        fontWeight: "bold",
        color: "#2ed573",
      }}
    >
      ${product.price}
    </div>
    {product.inStock ? (
      <span style={{ color: "#2ed573", fontSize: "12px" }}>✓ In Stock</span>
    ) : (
      <span style={{ color: "#ff4757", fontSize: "12px" }}>✗ Out of Stock</span>
    )}
  </div>
);
```

### Example 4: File Manager

```tsx
const renderFile = (file) => {
  const getFileIcon = (type) => {
    const icons = {
      pdf: "📄",
      image: "🖼️",
      video: "🎥",
      audio: "🎵",
      folder: "📁",
    };
    return icons[type] || "📝";
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div
      style={{
        padding: "12px",
        backgroundColor: "white",
        border: "1px solid #e0e0e0",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        marginBottom: "8px",
      }}
    >
      <span style={{ fontSize: "32px", marginRight: "12px" }}>
        {getFileIcon(file.type)}
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "500", marginBottom: "4px" }}>
          {file.name}
        </div>
        <div style={{ fontSize: "12px", color: "#999" }}>
          {formatFileSize(file.size)} • Modified {file.modifiedDate}
        </div>
      </div>
    </div>
  );
};
```

### Example 5: User Avatar List

```tsx
const renderUser = (user, index) => (
  <div
    style={{
      padding: "12px",
      backgroundColor: "white",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
    }}
  >
    <img
      src={user.avatarUrl}
      alt={user.name}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        marginRight: "12px",
        objectFit: "cover",
      }}
    />
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: "600", marginBottom: "4px" }}>{user.name}</div>
      <div style={{ fontSize: "13px", color: "#666" }}>{user.role}</div>
      {user.online && (
        <span
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            backgroundColor: "#2ed573",
            borderRadius: "50%",
            marginRight: "6px",
          }}
        />
      )}
      <span
        style={{ fontSize: "12px", color: user.online ? "#2ed573" : "#999" }}
      >
        {user.online ? "Online" : "Offline"}
      </span>
    </div>
  </div>
);
```

## Using Custom Components

You can also use full React components:

```tsx
// Define your component
const TaskCard = ({ item, index, listId }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="task-card">
      <h3 onClick={() => setIsExpanded(!isExpanded)}>{item.title}</h3>
      {isExpanded && (
        <div className="task-details">
          <p>{item.description}</p>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

// Use it
<DragDropComponent
  data={data}
  renderItem={(item, index, listId) => (
    <TaskCard item={item} index={index} listId={listId} />
  )}
  {...otherProps}
/>;
```

## Accessing List Context

The `listId` parameter lets you customize rendering based on which list the item is in:

```tsx
const renderItem = (item, index, listId) => {
  const listStyles = {
    todo: { backgroundColor: "#fff3cd" },
    "in-progress": { backgroundColor: "#cfe2ff" },
    done: { backgroundColor: "#d1e7dd" },
  };

  return (
    <div
      style={{
        ...listStyles[listId],
        padding: "10px",
        borderRadius: "4px",
      }}
    >
      {item.title}
      {listId === "done" && <span>✓</span>}
    </div>
  );
};
```

## Styling Tips

### Use Inline Styles

For simple styling, inline styles work great and keep everything in one place.

### Use CSS Modules

```tsx
import styles from "./TaskCard.module.css";

const renderTask = (item) => (
  <div className={styles.taskCard}>
    <h3 className={styles.title}>{item.title}</h3>
  </div>
);
```

### Use Styled Components

```tsx
import styled from "styled-components";

const TaskCard = styled.div`
  padding: 16px;
  background: white;
  border-radius: 8px;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const renderTask = (item) => (
  <TaskCard>
    <h3>{item.title}</h3>
  </TaskCard>
);
```

## Event Handling

You can add event handlers to your custom rendered items:

```tsx
const renderTask = (item, index, listId) => {
  const handleClick = (e) => {
    // Prevent checkbox click from propagating
    e.stopPropagation();
    console.log("Clicked item:", item);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    // Your delete logic
  };

  return (
    <div onClick={handleClick}>
      <h3>{item.title}</h3>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
```

## Common Patterns

### Conditional Rendering

```tsx
const renderItem = (item) => {
  if (item.type === "task") {
    return <TaskCard item={item} />;
  }
  if (item.type === "note") {
    return <NoteCard item={item} />;
  }
  return <DefaultCard item={item} />;
};
```

### With State Management

```tsx
const MyApp = () => {
  const [items, setItems] = useState(initialData);

  const renderItem = (item, index, listId) => (
    <TaskCard
      item={item}
      onUpdate={(updatedItem) => {
        // Update your state
        const newItems = updateItemInState(items, updatedItem);
        setItems(newItems);
      }}
    />
  );

  return (
    <DragDropComponent
      data={items}
      renderItem={renderItem}
      onChange={setItems}
    />
  );
};
```

## Backward Compatibility

If you don't provide `renderItem`, the library falls back to the default rendering:

```tsx
// Old way (still works!)
<DragDropComponent
  data={data}
  draggerImg
  // No renderItem - uses default Card component
/>

// New way (recommended!)
<DragDropComponent
  data={data}
  renderItem={(item) => <YourCustomCard item={item} />}
/>
```

## Best Practices

### 1. Keep It Simple

Don't overcomplicate your render function. If it gets too long, extract it to a separate component.

### 2. Memoize When Needed

For performance, use `React.memo` on complex components:

```tsx
const TaskCard = React.memo(({ item }) => {
  // Complex rendering logic
  return <div>{item.title}</div>;
});
```

### 3. Handle All Data Types

Make sure your render function can handle all possible data structures:

```tsx
const renderItem = (item) => {
  if (!item) return null;
  if (!item.title) return <div>Invalid item</div>;

  return <TaskCard item={item} />;
};
```

### 4. Provide Visual Feedback

Add hover states and transitions for better UX:

```tsx
const renderItem = (item) => (
  <div
    style={{
      transition: "all 0.2s ease",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
      },
    }}
  >
    {item.title}
  </div>
);
```

## Complete Example

Here's a full working example:

```tsx
import { useState } from "react";
import DragDropComponent from "react-drag-and-drop-multiple-dynamic-column";

function KanbanBoard() {
  const [boards, setBoards] = useState([
    {
      id: "todo",
      name: "To Do",
      data: [
        {
          id: "1",
          title: "Design mockups",
          priority: "high",
          assignee: "John",
        },
      ],
    },
    {
      id: "doing",
      name: "In Progress",
      data: [],
    },
    {
      id: "done",
      name: "Done",
      data: [],
    },
  ]);

  const renderCard = (item, index, listId) => (
    <div
      style={{
        padding: "16px",
        backgroundColor: "white",
        borderRadius: "8px",
        marginBottom: "8px",
        border: "1px solid #e0e0e0",
      }}
    >
      <h3>{item.title}</h3>
      <div>
        <span
          style={{
            color: item.priority === "high" ? "#ff4757" : "#2ed573",
          }}
        >
          {item.priority}
        </span>
        <span> • {item.assignee}</span>
      </div>
    </div>
  );

  return (
    <DragDropComponent
      data={boards}
      renderItem={renderCard}
      onChange={(newData) => {
        setBoards(newData);
        // Optional: Save to backend
        // saveToAPI(newData);
      }}
      width="100%"
      height="600px"
      multiple
      title
      centerTitle
    />
  );
}
```

## TypeScript Support

The library is fully typed. Your render function will have proper type inference:

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
}

const renderTask: (item: Task, index: number, listId: string) => ReactNode = (
  item,
  index,
  listId
) => {
  // TypeScript knows item is of type Task
  return <div>{item.title}</div>;
};
```

## Summary

The `renderItem` prop gives you **complete control** over how your items look and behave. Use it to build:

- 📋 Kanban boards
- ✅ Task lists
- 📁 File managers
- 🛒 Shopping carts
- 👥 User management
- And anything else you can imagine!

The library handles all the complex drag-and-drop logic, while you focus on making beautiful, custom UI! 🎨
