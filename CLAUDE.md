# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@acrool/react-router-hash` 是一個基於 React Router v6 的擴充套件，讓開發者能在 History Route（pathname）之外，同時使用 URL hash（`#`）作為額外的路由層，常見用途是 CSR lightbox / modal 路由。

Peer dependencies: `react >=18 <20`, `react-router-dom 6.x`

## Commands

```bash
# 開發（watch mode，輸出至 dist/）
yarn dev

# 建置（清除 dist → tsc → vite build）
yarn build

# Lint + 自動修復
yarn lint:fix

# 執行測試
yarn test

# 執行單一測試檔（Jest pattern）
yarn test --testPathPattern="utils"

# 版本發布
yarn release:patch   # patch
yarn release:minor   # minor
yarn release:major   # major
yarn release:alpha   # prerelease alpha
```

## Architecture

### Library source (`src/`)

```
src/
  index.ts           # 公開 API 進入點
  context.ts         # HashRouteContext、HashOutletContext（React context）
  utils.ts           # invariant / warning / joinPaths 工具函式
  hooks.tsx          # useHashOutlet、useHashOutletContext、useHashParams、useHashPathname
  HashRoute/         # <HashRoute> 元件 + createRoutesFromChildren()
  HashRoutes/        # <HashRoutes> 元件 + useHashRoutes() hook
  HashOutlet/        # <HashOutlet> 元件
```

**核心運作原理**：`useHashRoutes`（在 `HashRoutes.tsx`）讀取 `location.hash`（而非 `location.pathname`），透過 `react-router-dom` 的 `matchRoutes` 進行比對，再用自定義的 `HashRouteContext` 渲染匹配結果（模仿 React Router 的 `useRoutes` / `Routes` 實作）。

**Context 層級**：
- `HashRouteContext`：持有當前 outlet 及 matches 陣列（對應 React Router 的 `RouteContext`）
- `HashOutletContext`：透過 `<HashOutlet context={...}>` 傳遞資料給子元件（對應 `OutletContext`）

### Example app (`example/`)

獨立的 Vite + React 專案，使用本地 `@acrool/react-router-hash` 套件作為示範。需在 `example/` 目錄下獨立執行 `yarn` 與 `yarn dev`。

### Build

使用 Vite 的 library mode，輸出單一 ES module（`dist/acrool-react-router-hash.es.js`）與型別定義（`dist/index.d.ts`）。`react`、`react-dom`、`react-router-dom`、`history` 均標記為 external。

### Tests

Jest + `@swc/jest`（transform）+ `jest-environment-jsdom`。測試檔放在 `__tests__/` 目錄，副檔名為 `.spec.ts` 或 `.test.ts`。

## Code Style

- 縮排：4 spaces
- 引號：single quotes
- 介面（interface）成員分隔符：不加分號（`none`）
- Type 成員分隔符：逗號
- Import 排序：`simple-import-sort` 外掛（會警告但不報錯）
