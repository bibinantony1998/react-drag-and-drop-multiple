# Installation Guide

## Quick Start

Since this project has been updated to React 19, you'll need to install dependencies with the `--legacy-peer-deps` flag due to `react-beautiful-dnd` not officially supporting React 19 yet:

```bash
npm install --legacy-peer-deps
```

## Why `--legacy-peer-deps`?

The library depends on `react-beautiful-dnd@13.1.1`, which only officially supports React versions up to 18.x. However, it still works with React 19 in most cases.

## Alternative: Using `.npmrc`

An `.npmrc` file is included in the project with:

```
legacy-peer-deps=true
```

This means you can also just run:

```bash
npm install
```

And it will automatically use the legacy peer deps resolution.

## After Installation

1. **Start development server:**

   ```bash
   npm run dev
   # or
   npm start
   ```

2. **Build the library:**

   ```bash
   npm run build
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

## Troubleshooting

### If you see peer dependency errors:

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### If the dev server fails to start:

- Ensure port 3000 is available
- Try a different port: `npm run dev -- --port 3001`

### If builds fail:

- Clear caches: `rm -rf node_modules/.vite dist build`
- Reinstall: `npm install --legacy-peer-deps`

## Important: StrictMode Compatibility

⚠️ **Do not use React StrictMode** with this library. `react-beautiful-dnd` has compatibility issues with React 18+ StrictMode, and the drag and drop functionality will not work properly.

When using this library, make sure your root render does not wrap the component in `<StrictMode>`:

```jsx
// ❌ Don't do this
root.render(
  <StrictMode>
    <DragDropComponent {...props} />
  </StrictMode>
);

// ✅ Do this instead
root.render(<DragDropComponent {...props} />);
```

See issue: https://github.com/atlassian/react-beautiful-dnd/issues/2399

## Future Considerations

`react-beautiful-dnd` is deprecated. For long-term maintenance, consider migrating to:

- **[@dnd-kit/core](https://dndkit.com/)** - Modern, performant, React 19 compatible, StrictMode friendly
- **[react-dnd](https://react-dnd.github.io/react-dnd/)** - Another actively maintained alternative

Both alternatives offer better TypeScript support, better performance, StrictMode compatibility, and active maintenance.
