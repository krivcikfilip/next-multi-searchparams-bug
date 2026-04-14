# Bug: Client navigation skips re-render for multi-value searchParams

## Reproduce

1. `npm install && npm run dev`
2. Click **"+ red"** → URL: `/?color=red` → shows 2 items ✅
3. Click **"+ blue"** → URL: `/?color=red&color=blue` → shows 4 items ✅
4. Click **"✕ red"** → URL: `/?color=blue` → **still shows 4 items** ❌ (expected: 2)

## Cause

`createSegmentFromRouteTree()` in [ppr-navigations.ts](https://github.com/vercel/next.js/blob/canary/packages/next/src/client/components/router-reducer/ppr-navigations.ts) uses `Object.fromEntries(new URLSearchParams(search))` for cache keys. `Object.fromEntries` keeps only the last value per key, so `?color=red&color=blue` and `?color=blue` produce the same key `{color:"blue"}` → cache hit → stale UI.
