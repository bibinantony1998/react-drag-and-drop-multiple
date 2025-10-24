# React 18 & 19 Compatibility

## Summary

This library is **fully compatible** with both React 18 and React 19! 🎉

## Why It Works Across Versions

The library uses:

- ✅ **Native HTML5 drag-and-drop APIs** - No React version dependency
- ✅ **Standard React hooks** - `useState`, `useCallback`, etc. (stable in both versions)
- ✅ **React 18's `createRoot` API** - Available in both React 18.0.0+ and React 19
- ✅ **Zero external dependencies** - No libraries that break between versions

## Compatibility Matrix

| React Version   | StrictMode | Installation         | Status             |
| --------------- | ---------- | -------------------- | ------------------ |
| 18.0.0 - 18.2.x | ✅ Yes     | Standard npm install | ✅ Fully Supported |
| 18.3.x          | ✅ Yes     | Standard npm install | ✅ Fully Supported |
| 19.0.0+         | ✅ Yes     | Standard npm install | ✅ Fully Supported |

## Installation

### For React 18 Projects

```bash
# If you're on React 18
npm install react-drag-and-drop-multiple-dynamic-column

# No special flags needed!
```

### For React 19 Projects

```bash
# If you're on React 19
npm install react-drag-and-drop-multiple-dynamic-column

# Also no special flags needed!
```

## Usage - React 18

```jsx
import { createRoot } from "react-dom/client"; // Available in React 18!
import DragDropComponent from "react-drag-and-drop-multiple-dynamic-column";

const App = () => (
  <DragDropComponent
    data={yourData}
    renderItem={(item) => <YourComponent item={item} />}
    onChange={handleChange}
    width="100%"
    height="600px"
    multiple
    title
  />
);

// React 18 API (same as React 19!)
const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

## Usage - React 19

```jsx
import { createRoot } from "react-dom/client";
import DragDropComponent from "react-drag-and-drop-multiple-dynamic-column";

const App = () => (
  <DragDropComponent
    data={yourData}
    renderItem={(item) => <YourComponent item={item} />}
    onChange={handleChange}
    width="100%"
    height="600px"
    multiple
    title
  />
);

// React 19 API (identical to React 18!)
const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

## Key Features Work in Both Versions

### ✅ Custom Rendering

```jsx
// Works in React 18 and 19
<DragDropComponent
  renderItem={(item) => (
    <div style={{ padding: "16px" }}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  )}
  {...props}
/>
```

### ✅ Multi-Selection with Custom Drag Badge

- The SVG drag badge works in both versions
- Multi-select functionality works identically
- All animations work in both versions

### ✅ StrictMode

```jsx
// Both versions support StrictMode
import { StrictMode } from "react";

root.render(
  <StrictMode>
    <DragDropComponent {...props} />
  </StrictMode>
);
```

### ✅ All Visual Features

- Hover animations
- Selection borders
- Pulse animations
- Drag preview badges
- **Everything works in both React 18 and 19!**

## What Changed Between React 18 and 19?

**For this library: NOTHING!**

The native HTML5 drag-and-drop APIs and React features we use are stable across both versions.

## Migration Scenarios

### Scenario 1: You're on React 18 (Want to Stay)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-drag-and-drop-multiple-dynamic-column": "^2.0.0"
  }
}
```

**Everything works!** Stay on React 18 as long as you need.

### Scenario 2: You're Upgrading to React 19

```bash
# 1. Upgrade React
npm install react@19 react-dom@19

# 2. Your drag-drop library keeps working!
# No changes needed to your code
```

The library continues to work without any code changes.

### Scenario 3: Monorepo with Mixed Versions

If you have a monorepo with some packages on React 18 and others on React 19, this library works in **both environments** with no issues.

## TypeScript Support

Works with both versions:

```typescript
import { ReactNode } from "react"; // Works in React 18 & 19
import DragDropComponent from "react-drag-and-drop-multiple-dynamic-column";

interface Task {
  id: string;
  title: string;
}

const renderTask = (task: Task): ReactNode => {
  return <div>{task.title}</div>;
};

// TypeScript types work in both React 18 and 19
<DragDropComponent data={tasks} renderItem={renderTask} onChange={setTasks} />;
```

## Testing

The library is tested with:

- ✅ React 18.2.0 (latest React 18)
- ✅ React 19.0.0 (latest React 19)
- ✅ All features verified in both versions

## Why This Matters for npm Package Users

### Maximum Compatibility

- Users don't need to upgrade to React 19 to use your library
- Works with the vast majority of React projects (React 18 is still widely used)
- Future-proof: Ready for React 19 when users upgrade

### No Breaking Changes

- Users can upgrade React versions without changing your library
- Your library doesn't force users to upgrade React
- Smooth migration path

### Industry Standard

Most npm packages support multiple React versions for maximum adoption.

## Common Questions

### Q: Do I need different code for React 18 vs 19?

**A:** No! The API is identical.

### Q: Will features break in React 18?

**A:** No. All features work in both versions.

### Q: Should I upgrade to React 19?

**A:** It's optional. The library works great on React 18.

### Q: What about StrictMode issues?

**A:** Both React 18 and 19 StrictMode work perfectly. We use native APIs that don't have StrictMode issues.

### Q: Will this work with React 17?

**A:** Not recommended. React 18+ is required for the `createRoot` API. React 17 uses the old `ReactDOM.render()` which is deprecated.

## Minimum Requirements

- **React**: 18.0.0 or higher
- **React-DOM**: 18.0.0 or higher
- **Browser**: Modern browsers with HTML5 drag-and-drop support
  - Chrome 4+
  - Firefox 3.5+
  - Safari 3.1+
  - Edge (all versions)

## Conclusion

This library is built to work with **both React 18 and React 19**, giving npm package users:

- ✅ Maximum compatibility
- ✅ No forced upgrades
- ✅ Future-proof code
- ✅ Same features in both versions

**Install once, works everywhere!** 🚀
