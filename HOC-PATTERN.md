# Higher-Order Component (HOC) Pattern

## Overview

The library now functions as a **powerful wrapper/HOC** that handles all drag-and-drop logic while letting you render **anything** inside the draggable items.

## The Pattern

### What It Does

**The library handles:**

- ✅ Drag-and-drop mechanics
- ✅ Multi-selection logic
- ✅ State management
- ✅ Visual feedback (drag preview, selection indicators)
- ✅ Cross-column dragging
- ✅ Touch and mouse events

**You provide:**

- 🎨 Custom rendering logic
- 🎨 Your own UI components
- 🎨 Business logic and interactions
- 🎨 Styling and branding

### Architecture

```
┌─────────────────────────────────────────────┐
│   Your Application                           │
│   ┌───────────────────────────────────────┐ │
│   │  Custom Components & Business Logic   │ │
│   │  - TaskCard                          │ │
│   │  - ProductCard                       │ │
│   │  - FileItem                          │ │
│   │  - UserAvatar                        │ │
│   └───────────────────────────────────────┘ │
│                    ↓                         │
│   ┌───────────────────────────────────────┐ │
│   │  DragDropComponent (HOC Wrapper)     │ │
│   │  - Handles all drag-drop logic       │ │
│   │  - Wraps your components             │ │
│   │  - Provides drag functionality       │ │
│   └───────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

## Implementation Examples

### Example 1: Kanban Board Component

```tsx
// Your custom task component
const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="task-card">
      {isEditing ? (
        <input
          value={task.title}
          onChange={(e) => onUpdate({ ...task, title: e.target.value })}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <h3 onClick={() => setIsEditing(true)}>{task.title}</h3>
      )}

      <p>{task.description}</p>

      <div className="task-footer">
        <img src={task.assignee.avatar} alt={task.assignee.name} />
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

// Wrap with drag-drop functionality
const KanbanBoard = () => {
  const [boardData, setBoardData] = useState(initialData);

  const handleUpdate = (taskId, updates) => {
    // Your update logic
  };

  const handleDelete = (taskId) => {
    // Your delete logic
  };

  return (
    <DragDropComponent
      data={boardData}
      onChange={setBoardData}
      renderItem={(task, index, listId) => (
        <TaskCard
          task={task}
          onUpdate={(updates) => handleUpdate(task.id, updates)}
          onDelete={() => handleDelete(task.id)}
        />
      )}
      multiple
      title
      width="100%"
      height="100vh"
    />
  );
};
```

### Example 2: E-commerce Shopping Cart

```tsx
const ProductCard = ({ product, onQuantityChange, onRemove }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h4>{product.name}</h4>
        <p className="price">${product.price}</p>
        <div className="quantity">
          <button onClick={() => onQuantityChange(product.id, -1)}>-</button>
          <span>{product.quantity}</span>
          <button onClick={() => onQuantityChange(product.id, 1)}>+</button>
        </div>
        <button onClick={() => onRemove(product.id)}>Remove</button>
      </div>
    </div>
  );
};

const ShoppingCart = () => {
  const [categories, setCategories] = useState([
    { id: "cart", name: "In Cart", data: [] },
    { id: "wishlist", name: "Wishlist", data: [] },
    { id: "removed", name: "Removed", data: [] },
  ]);

  return (
    <DragDropComponent
      data={categories}
      onChange={setCategories}
      renderItem={(product, index, listId) => (
        <ProductCard
          product={product}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      )}
      multiple
      title
    />
  );
};
```

### Example 3: File Manager with Context Menu

```tsx
const FileItem = ({ file, onRename, onDelete, onDownload }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useOnClickOutside(menuRef, () => setShowMenu(false));

  return (
    <div
      className="file-item"
      onContextMenu={(e) => {
        e.preventDefault();
        setShowMenu(true);
      }}
    >
      <FileIcon type={file.type} />
      <span>{file.name}</span>
      <span className="size">{formatBytes(file.size)}</span>

      {showMenu && (
        <div ref={menuRef} className="context-menu">
          <button onClick={() => onRename(file.id)}>Rename</button>
          <button onClick={() => onDownload(file.id)}>Download</button>
          <button onClick={() => onDelete(file.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

const FileManager = () => {
  const [folders, setFolders] = useState(folderStructure);

  return (
    <DragDropComponent
      data={folders}
      onChange={setFolders}
      renderItem={(file, index, listId) => (
        <FileItem
          file={file}
          onRename={handleRename}
          onDelete={handleDelete}
          onDownload={handleDownload}
        />
      )}
      multiple
      title
    />
  );
};
```

### Example 4: Team Management with Avatars

```tsx
const TeamMemberCard = ({ member, onEditRole, onRemove }) => {
  const [isOnline, setIsOnline] = useState(member.isOnline);

  useEffect(() => {
    // Subscribe to online status
    const unsubscribe = subscribeToStatus(member.id, setIsOnline);
    return unsubscribe;
  }, [member.id]);

  return (
    <div className="member-card">
      <div className="avatar-container">
        <img src={member.avatar} alt={member.name} />
        <span className={`status ${isOnline ? "online" : "offline"}`} />
      </div>

      <div className="member-info">
        <h4>{member.name}</h4>
        <p>{member.email}</p>
        <select
          value={member.role}
          onChange={(e) => onEditRole(member.id, e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
      </div>

      <button onClick={() => onRemove(member.id)}>Remove</button>
    </div>
  );
};

const TeamManager = () => {
  const [teams, setTeams] = useState(teamData);

  return (
    <DragDropComponent
      data={teams}
      onChange={setTeams}
      renderItem={(member, index, listId) => (
        <TeamMemberCard
          member={member}
          onEditRole={handleRoleChange}
          onRemove={handleRemoveMember}
        />
      )}
      multiple
      title
    />
  );
};
```

## Advanced Patterns

### Pattern 1: Render Props

```tsx
const MyApp = () => (
  <DragDropComponent
    data={data}
    renderItem={(item, index, listId) => (
      <CustomComponent item={item}>
        {(props) => <AnotherComponent {...props} />}
      </CustomComponent>
    )}
  />
);
```

### Pattern 2: Component Composition

```tsx
const renderComplexItem = (item, index, listId) => {
  return (
    <ItemWrapper>
      <ItemHeader title={item.title} />
      <ItemBody content={item.content} />
      <ItemFooter actions={item.actions} metadata={item.metadata} />
    </ItemWrapper>
  );
};
```

### Pattern 3: Conditional Components

```tsx
const renderItem = (item, index, listId) => {
  switch (item.type) {
    case "task":
      return <TaskCard task={item} />;
    case "note":
      return <NoteCard note={item} />;
    case "event":
      return <EventCard event={item} />;
    default:
      return <DefaultCard item={item} />;
  }
};
```

### Pattern 4: HOC with State Management

```tsx
import { useDispatch, useSelector } from "react-redux";

const ConnectedKanban = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (newData) => {
    dispatch(updateTasks(newData));
    // Optional: sync with backend
    api.saveTasks(newData);
  };

  return (
    <DragDropComponent
      data={tasks}
      onChange={handleChange}
      renderItem={(task) => (
        <ConnectedTaskCard
          taskId={task.id}
          // Component automatically gets data from Redux
        />
      )}
    />
  );
};
```

## Benefits of This Pattern

### 1. Separation of Concerns

```
Drag-drop logic (library)  ←→  UI/Business logic (your code)
```

### 2. Reusability

Use the same drag-drop wrapper with different content:

- Task boards
- Shopping carts
- File managers
- Team dashboards
- Any list-based UI!

### 3. Testability

Test your components independently:

```tsx
// Test your component without drag-drop
<TaskCard task={mockTask} onUpdate={mockUpdate} />

// Test with drag-drop in integration tests
<DragDropComponent
  data={mockData}
  renderItem={(task) => <TaskCard task={task} />}
/>
```

### 4. Flexibility

Change UI without touching drag-drop logic:

```tsx
// Version 1: Simple cards
renderItem={(item) => <SimpleCard item={item} />}

// Version 2: Rich cards (same drag-drop logic!)
renderItem={(item) => <RichCard item={item} />}
```

## TypeScript Support

Full type safety with generics:

```typescript
interface Task {
  id: string;
  title: string;
  assignee: string;
}

interface TaskList {
  id: string;
  name: string;
  data: Task[];
}

const MyKanban = () => {
  const [data, setData] = useState<TaskList[]>(initialData);

  const renderTask = (task: Task, index: number, listId: string): ReactNode => {
    return <TaskCard task={task} />;
  };

  return (
    <DragDropComponent
      data={data}
      onChange={setData}
      renderItem={renderTask}
      {...props}
    />
  );
};
```

## Best Practices

### 1. Keep Render Functions Pure

```tsx
// ✅ Good: Pure function
const renderItem = (item) => <Card item={item} />;

// ❌ Avoid: Side effects in render
const renderItem = (item) => {
  console.log(item); // Side effect!
  api.logView(item.id); // Side effect!
  return <Card item={item} />;
};
```

### 2. Memoize for Performance

```tsx
const TaskCard = React.memo(({ task }) => {
  return <div>{task.title}</div>;
});

const renderItem = useCallback((task) => <TaskCard task={task} />, []);
```

### 3. Handle All Edge Cases

```tsx
const renderItem = (item, index, listId) => {
  if (!item) return <EmptyPlaceholder />;
  if (item.error) return <ErrorCard error={item.error} />;
  if (item.loading) return <LoadingSkeleton />;

  return <ItemCard item={item} />;
};
```

## Migration from Old API

### Before (v1.x)

```tsx
<DragDropComponent data={data}>
  <CustomContent /> // Limited customization
</DragDropComponent>
```

### After (v2.x)

```tsx
<DragDropComponent
  data={data}
  renderItem={(item) => (
    <CustomContent item={item} /> // Full control!
  )}
/>
```

## Summary

The HOC/wrapper pattern makes this library:

- 🎯 **Focused** - Library does drag-drop, you do UI
- 🔧 **Flexible** - Render anything you want
- 🧪 **Testable** - Easy to test in isolation
- 🎨 **Customizable** - Full styling control
- 📦 **Reusable** - One library, infinite UIs

Perfect for building professional drag-and-drop interfaces as an **npm package**! 🚀
