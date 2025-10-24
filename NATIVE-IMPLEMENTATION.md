# Native HTML5 Drag-and-Drop Implementation

This document explains how the library implements drag-and-drop using native HTML5 APIs instead of external libraries.

## Why Native?

In version 2.0.0, we completely removed `react-beautiful-dnd` and implemented drag-and-drop using native browser APIs. Here's why:

### Problems with react-beautiful-dnd

- ❌ **Deprecated** - No longer maintained since 2024
- ❌ **React 19 incompatible** - Doesn't officially support React 19
- ❌ **StrictMode issues** - Breaks with React 18+ StrictMode
- ❌ **Large bundle size** - Adds significant weight to your app
- ❌ **Peer dependency conflicts** - Requires `--legacy-peer-deps`

### Benefits of Native Implementation

- ✅ **Zero dependencies** - No external drag-drop libraries
- ✅ **React 19 compatible** - Works perfectly with latest React
- ✅ **StrictMode friendly** - No issues with double-rendering
- ✅ **Smaller bundle** - Significantly lighter
- ✅ **Standard APIs** - Uses well-supported browser features
- ✅ **Future-proof** - No dependency deprecation worries

## How It Works

### HTML5 Drag-and-Drop Events

The implementation uses these native browser events:

1. **`dragstart`** - Fired when dragging begins

   - Sets drag data (item info, source location)
   - Adds visual feedback (opacity change)

2. **`dragend`** - Fired when dragging ends

   - Cleans up visual states
   - Removes temporary classes

3. **`dragover`** - Fired when dragging over a drop zone

   - Prevents default to allow dropping
   - Shows drop indicator

4. **`drop`** - Fired when item is dropped
   - Receives drag data
   - Updates state with new item positions
   - Triggers onChange callback

### Key Implementation Details

#### 1. Making Elements Draggable

```tsx
<div
  draggable // Makes the element draggable
  onDragStart={(e) => handleDragStart(e, item, listId, index)}
  onDragEnd={handleDragEnd}
>
  {/* Your content */}
</div>
```

#### 2. Storing Drag Data

```tsx
const handleDragStart = (e: React.DragEvent, item, listId, index) => {
  // Store data about what's being dragged
  e.dataTransfer.setData(
    "application/json",
    JSON.stringify({
      item,
      sourceListId: listId,
      sourceIndex: index,
    })
  );

  e.dataTransfer.effectAllowed = "move";
};
```

#### 3. Creating Drop Zones

```tsx
<div
  onDrop={(e) => handleDrop(e, destinationListId, destinationIndex)}
  onDragOver={(e) => {
    e.preventDefault(); // Required to allow dropping!
    e.dataTransfer.dropEffect = "move";
  }}
>
  {/* Drop zone content */}
</div>
```

#### 4. Handling the Drop

```tsx
const handleDrop = (e: React.DragEvent, destListId, destIndex) => {
  e.preventDefault();

  // Get the drag data
  const data = JSON.parse(e.dataTransfer.getData("application/json"));

  // Update state - move item from source to destination
  // ... state update logic ...

  // Notify parent component
  props.onChange(updatedData);
};
```

### Multiple Item Selection

The library supports selecting and dragging multiple items:

1. **Selection State** - Tracks which items are selected
2. **Batch Operations** - When dropping, checks if multiple items are selected
3. **Sequential Moving** - Moves all selected items maintaining their order

```tsx
// Check if multiple items are selected
if (selectItems.items.includes(draggedItem)) {
  // Move all selected items
  selectItems.items.forEach((item, i) => {
    // Move each item with adjusted index
  });
} else {
  // Move single item
}
```

### Visual Feedback

CSS classes provide visual feedback during dragging:

```css
/* Being dragged */
.dragging {
  opacity: 0.5;
}

/* Hover effect */
.drag_item_wrapper:hover {
  transform: scale(1.02);
}

/* Drop indicator */
.drag-over {
  border-top: 3px solid #4caf50;
}
```

## Browser Compatibility

The HTML5 Drag-and-Drop API is supported in all modern browsers:

- ✅ Chrome/Edge 4+
- ✅ Firefox 3.5+
- ✅ Safari 3.1+
- ✅ Opera 12+

No polyfills needed for modern browsers!

## Comparison: react-beautiful-dnd vs Native

| Feature        | react-beautiful-dnd | Native HTML5        |
| -------------- | ------------------- | ------------------- |
| Bundle Size    | ~100KB              | 0KB (built-in)      |
| Dependencies   | Yes (deprecated)    | None                |
| React 19       | ❌ Not officially   | ✅ Yes              |
| StrictMode     | ❌ Breaks           | ✅ Works            |
| Maintenance    | ❌ Deprecated       | ✅ Browser standard |
| Performance    | Good                | Excellent           |
| Learning Curve | High                | Medium              |
| Accessibility  | Built-in            | Manual              |

## Accessibility Considerations

While the native implementation works well, there are some accessibility limitations compared to react-beautiful-dnd:

### Current Status

- ✅ Mouse/touch dragging works
- ⚠️ Keyboard navigation not implemented (yet)
- ⚠️ Screen reader support limited

### Future Improvements

Consider adding:

- Keyboard shortcuts (arrow keys + space)
- ARIA labels and roles
- Focus management
- Announcements for screen readers

## Performance

The native implementation is highly performant because:

1. **No Virtual DOM overhead** from external libraries
2. **Browser-optimized** native events
3. **Smaller bundle** = faster initial load
4. **Direct DOM manipulation** for visual feedback

## Testing

The native implementation is tested with:

- ✅ React 19.0.0
- ✅ React StrictMode enabled
- ✅ Vite development server
- ✅ Production builds

## Migration from react-beautiful-dnd

If you're familiar with react-beautiful-dnd, here's how concepts map:

### react-beautiful-dnd → Native

```jsx
// Before: react-beautiful-dnd
<DragDropContext onDragEnd={handleDragEnd}>
  <Droppable droppableId="list">
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        <Draggable draggableId="item-1" index={0}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              Item
            </div>
          )}
        </Draggable>
      </div>
    )}
  </Droppable>
</DragDropContext>

// After: Native
<div
  onDrop={handleDrop}
  onDragOver={(e) => e.preventDefault()}
>
  <div
    draggable
    onDragStart={(e) => handleDragStart(e, item, index)}
    onDragEnd={handleDragEnd}
  >
    Item
  </div>
</div>
```

## Conclusion

The native HTML5 implementation provides:

- Modern React 19 compatibility
- Zero external dependencies
- Better performance
- Smaller bundle size
- Future-proof solution

While some features like keyboard navigation need manual implementation, the core drag-and-drop functionality is solid and production-ready.

## Resources

- [MDN: HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [React 19 Documentation](https://react.dev/)
- [Drag Events Reference](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)
