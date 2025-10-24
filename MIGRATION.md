# Migration to Vite and React 19

This document outlines the changes made to migrate the project from Create React App (CRA) to Vite and upgrade to React 19.

## Major Changes

### 1. Build Tool Migration (CRA → Vite)

#### Removed Dependencies

- `react-scripts` - CRA build tool
- `web-vitals` - Performance measurement (can be re-added if needed)

#### Added Dependencies

- `vite` (v6.0.5) - Modern build tool
- `@vitejs/plugin-react` (v4.3.4) - React plugin for Vite
- `vitest` (v2.1.8) - Testing framework (Vite-native alternative to Jest)

#### Configuration Files

- **Added**: `vite.config.ts` - Vite configuration
- **Added**: `tsconfig.node.json` - TypeScript config for Node files (Vite config)
- **Updated**: `tsconfig.json` - Updated for Vite compatibility with bundler module resolution
- **Updated**: `rollup.config.js` - Converted to ES modules syntax

### 2. React 19 Upgrade

#### Updated Dependencies

- `react`: ^18.x → ^19.0.0
- `react-dom`: ^18.x → ^19.0.0
- `@types/react`: ^18.x → ^19.0.6
- `@types/react-dom`: ^18.x → ^19.0.2

#### API Changes

- Updated `src/index.tsx` to use React 19's `createRoot` API
- Changed from `ReactDOM.render()` to `createRoot().render()`
- Updated imports: `import { StrictMode } from "react"` instead of `import React from "react"`

### 3. File Structure Changes

#### Moved/Renamed Files

- `public/index.html` → `index.html` (moved to root - Vite requirement)
- `src/react-app-env.d.ts` → `src/vite-env.d.ts` (renamed and updated)

#### Removed Files

- `src/reportWebVitals.ts` - CRA-specific performance monitoring
- `src/setupTests.ts` - Jest-specific setup (replaced with Vitest)

#### Updated Files

- `index.html` - Removed CRA-specific placeholders (`%PUBLIC_URL%`)
- Added direct script import: `<script type="module" src="/src/index.tsx"></script>`

### 4. Package.json Changes

#### Scripts Updated

```json
{
  "dev": "vite", // Development server
  "start": "vite", // Alias for dev
  "build": "rm -rf build && rollup -c", // Library build (unchanged)
  "build:demo": "vite build", // Demo app build
  "preview": "vite preview", // Preview production build
  "test": "vitest" // Testing with Vitest
}
```

#### Module System

- Added `"type": "module"` to enable ES modules

#### Peer Dependencies

- Updated to require React 19+: `"react": ">=19.0.0"`

### 5. Updated Rollup Configuration

- Converted from CommonJS to ES modules
- Updated all Rollup plugins to latest versions
- Added proper format specification: `format: "esm"`
- Added `react/jsx-runtime` to external dependencies

### 6. TypeScript Configuration

#### Key Changes in `tsconfig.json`

- `target`: "es5" → "ES2020"
- `moduleResolution`: "node" → "bundler"
- Added `useDefineForClassFields: true`
- Added `noUnusedLocals` and `noUnusedParameters` for stricter linting
- Added reference to `tsconfig.node.json`

### 7. Development Dependencies Updates

All development dependencies have been updated to their latest versions:

- Testing Library packages updated for React 19 compatibility
- TypeScript upgraded to v5.7.2
- Rollup and related plugins updated
- PostCSS and Sass updated

## How to Use

### Installation

⚠️ **Important**: Due to `react-beautiful-dnd` not officially supporting React 19, you need to install with the `--legacy-peer-deps` flag:

```bash
npm install --legacy-peer-deps
```

**Note**: An `.npmrc` file has been added to the project with `legacy-peer-deps=true`, so regular `npm install` should work. However, if you encounter peer dependency issues, use the flag above.

### About react-beautiful-dnd Deprecation

This library currently depends on `react-beautiful-dnd`, which is now deprecated. While it still works with React 19 using legacy peer deps, consider migrating to modern alternatives like:

- [@dnd-kit/core](https://dndkit.com/) - Modern, performant, and actively maintained
- [react-dnd](https://react-dnd.github.io/react-dnd/) - Another popular alternative

### ⚠️ Important: StrictMode Compatibility

**StrictMode has been disabled** in the demo app because `react-beautiful-dnd` has known compatibility issues with React 18+ StrictMode (and React 19). The drag and drop functionality will not work properly with StrictMode enabled.

If you're using this library in your own project, **do not wrap the component in `<StrictMode>`**. See issue: https://github.com/atlassian/react-beautiful-dnd/issues/2399

### Development

```bash
npm run dev
# or
npm start
```

The dev server will start at `http://localhost:3000`

### Building the Library

```bash
npm run build
```

### Building the Demo

```bash
npm run build:demo
```

### Testing

```bash
npm test
```

### Preview Production Build

```bash
npm run preview
```

## Breaking Changes

### For Library Users

1. **React Version Requirement**: The library now requires React 19 or higher
2. **Import Changes**: Ensure you're using the new React 19 API (`createRoot` instead of `render`)

### For Contributors

1. **Development Server**: Use `npm run dev` or `npm start` instead of the old CRA commands
2. **Build Output**: Demo builds now go to `dist/` folder (Vite default) while library builds remain in `build/`
3. **Testing**: Use Vitest instead of Jest (similar API, but some differences may exist)
4. **Environment Variables**: Vite uses `import.meta.env` instead of `process.env`

## Benefits of This Migration

1. **Faster Development**: Vite's HMR is significantly faster than CRA
2. **Modern Build Tool**: Better tree-shaking and optimization
3. **Latest React**: Access to React 19 features and improvements
4. **Better DX**: Faster builds, better error messages, instant server start
5. **Smaller Bundle**: Better optimization leads to smaller production bundles
6. **Modern Syntax**: Full ES modules support throughout the project

## Troubleshooting

### If you encounter module resolution issues:

- Clear `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`

### If the dev server doesn't start:

- Check that port 3000 is available
- Try: `npm run dev -- --port 3001` to use a different port

### If tests fail:

- Vitest has a similar API to Jest, but check the [Vitest documentation](https://vitest.dev/) for any differences

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React 19 Documentation](https://react.dev/)
- [Vitest Documentation](https://vitest.dev/)
