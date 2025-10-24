# Known Issues and Fixes

## Issue #1: Drag and Drop Not Working with React 19

### Problem
After migrating to React 19, the drag and drop functionality stopped working even though the app compiled without errors.

### Root Cause
`react-beautiful-dnd` has known compatibility issues with React 18+ StrictMode, and these issues are exacerbated in React 19. The library was designed for React 16/17 and has not been updated to work with StrictMode's double-rendering behavior in newer React versions.

Reference: https://github.com/atlassian/react-beautiful-dnd/issues/2399

### Solution
**StrictMode has been disabled** in the demo application (`src/index.tsx`).

```jsx
// Before (not working):
root.render(
  <StrictMode>
    <DragDropComponent {...props} />
  </StrictMode>
);

// After (working):
root.render(
  <DragDropComponent {...props} />
);
```

### Impact
- ✅ Drag and drop functionality now works correctly
- ⚠️ Loss of StrictMode benefits (double-rendering checks, deprecation warnings)
- ⚠️ This is a workaround, not a permanent solution

### Recommendations for Users

If you're using this library in your own project:

1. **Do NOT wrap the component in `<StrictMode>`**
2. Consider using the component in a specific part of your app without StrictMode
3. For new projects, consider using modern alternatives:
   - [@dnd-kit/core](https://dndkit.com/) - Modern, performant, StrictMode-compatible
   - [react-dnd](https://react-dnd.github.io/react-dnd/) - Another maintained alternative

## Issue #2: npm install Errors

### Problem
Running `npm install` fails with peer dependency errors:
```
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! peer react@"^16.8.5 || ^17.0.0 || ^18.0.0" from react-beautiful-dnd@13.1.1
```

### Root Cause
`react-beautiful-dnd` doesn't officially support React 19 in its peer dependencies declaration.

### Solution
Two options:

**Option 1: Use the included `.npmrc` file**
```bash
npm install
```

**Option 2: Use the --legacy-peer-deps flag**
```bash
npm install --legacy-peer-deps
```

The project now includes an `.npmrc` file with `legacy-peer-deps=true` to make installation easier.

### Impact
- ✅ Installation now works
- ⚠️ Using legacy peer deps bypasses npm's peer dependency checks
- ⚠️ Library should eventually migrate to a React 19-compatible drag-and-drop solution

## Long-term Solution

### Migrate to @dnd-kit/core

For a permanent fix, the library should be refactored to use [@dnd-kit/core](https://dndkit.com/), which:
- ✅ Officially supports React 18 and 19
- ✅ Works with StrictMode
- ✅ Better performance
- ✅ Better TypeScript support
- ✅ Actively maintained
- ✅ Accessibility built-in

Example migration:
```jsx
// Current (react-beautiful-dnd)
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Future (@dnd-kit/core)
import { DndContext } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
```

## Testing Status

- ✅ Dev server starts successfully
- ✅ Drag and drop functionality works
- ✅ Multiple item selection works
- ✅ Cross-column dragging works
- ⚠️ StrictMode disabled (trade-off for functionality)

## Compatibility Matrix

| React Version | StrictMode | Status | Notes |
|--------------|-----------|--------|-------|
| 16.8+ | No | ✅ Works | Original target version |
| 17.x | No | ✅ Works | Fully compatible |
| 18.x | No | ✅ Works | Works with legacy peer deps |
| 18.x | Yes | ❌ Broken | StrictMode issues |
| 19.x | No | ✅ Works | Requires --legacy-peer-deps |
| 19.x | Yes | ❌ Broken | StrictMode issues |

## Deprecation Notice

⚠️ **Important**: `react-beautiful-dnd` is officially deprecated as of 2024. The Atlassian team has stopped maintaining it.

See: https://github.com/atlassian/react-beautiful-dnd/issues/2672

This means:
- No new features will be added
- No bug fixes will be released
- No React 19 official support
- Security vulnerabilities may not be patched

**Action Required**: Plan a migration to a modern alternative for long-term sustainability.

