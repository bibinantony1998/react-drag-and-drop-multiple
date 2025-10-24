# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-10-24

### 🎉 Major Release - Breaking Changes

This is a complete rewrite of the library with significant improvements!

### ✨ Added

- **Native HTML5 drag-and-drop implementation** - No external drag-drop libraries needed
- **React 18 & 19 support** - Works seamlessly with both React 18 and React 19
- **StrictMode compatibility** - Works perfectly with React's StrictMode in both versions
- **HOC/Wrapper Pattern** 🎉 - **MAJOR FEATURE!** Custom `renderItem` prop lets you render ANYTHING inside draggable items
- **Full customization** 🎨 - Build Kanban boards, task lists, file managers, shopping carts with your own components
- **Flexible API** - Library handles drag-drop logic, you control the UI completely
- **Custom drag preview** 🎨 - Beautiful SVG badge when dragging multiple items showing count
- **Rich animations** ✨ - Pulse animations for multi-item drag, smooth hover effects
- **Enhanced visual feedback** 🌈 - Purple borders for selected items, green drop indicators
- **Smart hover effects** 🎯 - Hover animations persist on selected items
- Better **visual feedback** during drag operations (hover effects, drag indicators)
- Improved **TypeScript support** with React 19 types
- **Vite** development environment for faster builds
- Modern **ES modules** support

### 🔥 Removed

- **BREAKING:** Removed `react-beautiful-dnd` dependency (deprecated library)
- **BREAKING:** Removed `@types/react-beautiful-dnd` dependency
- No longer requires `--legacy-peer-deps` for installation
- Removed outdated web-vitals dependency

### 🛠️ Changed

- **BREAKING:** Minimum React version is now **18.0.0** (supports 18.x and 19.x)
- **BREAKING:** Minimum React-DOM version is now **18.0.0** (supports 18.x and 19.x)
- Migrated from Create React App to **Vite**
- Updated to **TypeScript 5.7**
- Complete internal rewrite using native browser APIs
- Improved drag-and-drop performance
- Better bundle size (lighter without react-beautiful-dnd)

### 🐛 Fixed

- Fixed StrictMode compatibility issues
- Fixed React 19 compatibility issues
- Fixed "isDropDisabled must be a boolean" error
- Removed peer dependency conflicts
- Fixed double-rendering issues in StrictMode

### 📚 Documentation

- Updated README with new features and usage
- Added CHANGELOG.md
- Added MIGRATION.md with upgrade guide
- Added FIXES.md documenting known issues and solutions
- Added INSTALL.md with installation instructions

### Migration from 1.x

If you're upgrading from version 1.x:

1. **Update React to 18.x or 19.x:**

   ```bash
   # Option 1: Stay on React 18 (recommended for most users)
   npm install react@18 react-dom@18

   # Option 2: Upgrade to React 19
   npm install react@19 react-dom@19
   ```

2. **Update your imports** (no changes needed - API is the same!)

3. **You can now use StrictMode** (previously not compatible):

   ```jsx
   root.render(
     <StrictMode>
       <DragDropComponent {...props} />
     </StrictMode>
   );
   ```

4. **Enjoy better performance** and no deprecated dependencies!

The component API remains the same, so no code changes are needed in your implementation.

## [1.0.1] - Previous Release

- Used react-beautiful-dnd
- React 16-18 support
- StrictMode incompatible
- Required --legacy-peer-deps for React 18+

---

For more details, see the [README.md](README.md) and [MIGRATION.md](MIGRATION.md).
