# Custom Drag Features

## Overview

The library now includes enhanced visual feedback for drag-and-drop operations, especially when dragging multiple items.

## Features

### 1. Custom Drag Image for Multiple Items

When dragging multiple selected items, instead of showing just one item being dragged, a custom SVG badge appears showing:

- **Stacked cards icon** - Visual representation of multiple items
- **Count badge** - Red circle showing the exact number of items being dragged
- **Gradient background** - Beautiful purple gradient (#667eea → #764ba2)

#### Technical Implementation

```tsx
// Custom drag image is created dynamically
const createMultiDragImage = (count: number): HTMLElement => {
  // Creates an 80x80px circular badge
  // With SVG stacked cards and count
  // Uses setDragImage() API
};
```

The drag image is:

- Created when dragging starts (if multiple items selected)
- Positioned off-screen during creation
- Set as the drag image using `setDragImage(element, offsetX, offsetY)`
- Automatically cleaned up after drag starts

### 2. Hover Animation on Selected Items

Selected items (checked) now maintain their hover animation:

**Behavior:**

- ✅ Hover effect works on unselected items
- ✅ Hover effect **also works** on selected items
- ✅ Selected items have a purple border/highlight
- ✅ Hovering selected items enhances the highlight

**CSS Implementation:**

```css
/* Always scale on hover */
.drag_item_wrapper:hover {
  transform: scale(1.02);
  z-index: 10;
}

/* Selected items get purple border */
.drag_item_container input:checked ~ .drag_item_content::before {
  border: 3px solid #667eea;
  background: rgba(102, 126, 234, 0.05);
}

/* Hover enhances selected items */
.drag_item_container input:checked ~ .drag_item_content:hover::before {
  background: rgba(102, 126, 234, 0.1);
  border-color: #764ba2;
}
```

### 3. Multi-Item Drag Animation

When dragging multiple items, **all selected items** pulse with an animation:

**Visual Feedback:**

- All selected items slightly reduce in size (scale 0.95)
- They pulse gently during the drag
- Opacity reduced to 0.6 for ghosting effect
- Animation runs at 0.6s intervals

**CSS Animation:**

```css
.drag_item_wrapper.multi-dragging {
  opacity: 0.6;
  transform: scale(0.95);
  animation: pulse 0.6s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(0.98);
  }
}
```

## User Experience Flow

### Single Item Drag

1. User hovers over item → Item scales up (1.02x)
2. User starts dragging → Item becomes semi-transparent (0.5 opacity)
3. User drags → Default drag preview follows cursor
4. User drops → Item returns to normal state

### Multiple Items Drag

1. User selects items with checkboxes → Items get purple border
2. User hovers selected items → Still scales up (maintains hover)
3. User starts dragging one selected item:
   - ✨ **Custom SVG badge appears** with count
   - All selected items pulse with animation
   - All selected items become semi-transparent
4. User drags → Custom badge follows cursor
5. User drops → All items return to normal, unselected

## Visual Indicators

| State               | Visual Feedback                           |
| ------------------- | ----------------------------------------- |
| Default             | Normal appearance                         |
| Hover               | Scale(1.02), slightly larger              |
| Selected            | Purple border (3px solid #667eea)         |
| Selected + Hover    | Enhanced purple border                    |
| Dragging (single)   | 0.5 opacity                               |
| Dragging (multiple) | Custom SVG badge + pulse animation on all |
| Drop target         | Green border-top (3px solid #4CAF50)      |

## Browser Support

All features use standard web APIs supported in modern browsers:

- ✅ **setDragImage()** - All modern browsers
- ✅ **SVG** - Universal support
- ✅ **CSS Animations** - All browsers
- ✅ **Pseudo-elements** - All browsers

## Performance

- **Lightweight** - No image files, pure SVG
- **Efficient** - Created on-demand, cleaned up immediately
- **Smooth** - Hardware-accelerated CSS animations
- **No layout shift** - Positioned off-screen during creation

## Customization

Want to customize the drag badge? Edit the `createMultiDragImage()` function:

```tsx
// Change colors
container.style.background = "your-gradient";

// Change size
container.style.width = "100px";
container.style.height = "100px";

// Change badge color
badge.setAttribute("fill", "#your-color");

// Modify the icon
// Edit the rect elements for different shapes
```

## Accessibility Notes

While the visual feedback is great for sighted users, consider adding:

- ARIA announcements for screen readers
- Keyboard shortcuts for multi-select
- Audio feedback for successful drops

## Future Enhancements

Potential improvements:

- [ ] Customizable drag image via props
- [ ] Animated item counter (count up effect)
- [ ] Different icons based on item type
- [ ] Sound effects on drop (optional)
- [ ] Haptic feedback on mobile devices

## Examples

### Dragging 1 Item

- Shows default drag preview (the item itself)
- No custom badge

### Dragging 2 Items

- Custom badge appears: "2" in red circle
- Both items pulse

### Dragging 5+ Items

- Custom badge appears: "5" (or more)
- All selected items pulse
- Clear visual feedback of bulk operation

## Code Reference

Main implementation files:

- `src/lib/index.tsx` - Drag handlers and custom image creation
- `src/lib/react-drag-drop-style.css` - Visual styles and animations

Key functions:

- `handleDragStart()` - Detects multi-drag and creates custom image
- `createMultiDragImage()` - Generates the SVG badge
- `handleDragEnd()` - Cleans up visual states
