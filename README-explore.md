Explore section implementation

Files changed
- `src/components/explore/ExploreItems.jsx`

APIs used
- Base endpoint: https://us-central1-nft-cloud-functions.cloudfunctions.net/explore
- Filtered endpoint example: https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low
- Author endpoint example: https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=73855012

Goal
- Replace static markup with a data-driven UI that fetches items from the API, supports client-side filter selection (via query param), and shows a live countdown per item when an expiry is present.

Precise steps performed

1. Inspect the API
- Called the endpoint to inspect example items. Each item contains the following fields used in the component: `id`, `authorId`, `authorImage`, `nftImage`, `nftId`, `title`, `price`, `likes`, `expiryDate`.
- Noted: `expiryDate` may be `null` for some items (treated as "No expiry").

2. Component conversion
- Edited `src/components/explore/ExploreItems.jsx` to convert the static placeholder into a functional component that fetches data.
- Added React hooks: `useState` for `items`, `loading`, `error`, `filter`, and `now`; `useEffect` for data loading and for updating `now` every second.

3. Fetch logic (safe and abortable)
- Built a URL that includes the selected filter as a query parameter when set: `const url = filter ? `${API_BASE}?filter=${filter}` : API_BASE`.
- Used `fetch(url, { signal: controller.signal })` with `AbortController` inside `useEffect` so any in-flight request is cancelled on component unmount or filter change.
- On success: `setItems(data)` and `setLoading(false)`.
- On error: ignore `AbortError`, otherwise set `error` and `loading=false`.

4. Filter UI (accessible)
- Converted the plain `select` to a controlled element backed by `filter` state.
- Added `aria-label` and a visually hidden label to ensure screen readers understand the control.
- Changing the select updates `filter`, which triggers the `useEffect` to re-fetch using the filter query param.

5. Live countdown
- Added a `now` state updated every second with `setInterval(() => setNow(Date.now()), 1000)` in a `useEffect` (cleanup clears interval on unmount).
- For each item compute remaining seconds: `remaining = item.expiryDate ? Math.max(0, Math.floor((item.expiryDate - now) / 1000)) : null`.
- Implemented `formatRemaining(seconds)` helper:
  - Returns `"No expiry"` when `seconds == null`.
  - Returns `"Expired"` when `seconds <= 0`.
  - Otherwise returns a compact string `"{h}h {m}m {s}s"`.
- Rendered formatted countdown in the markup: `<div className="de_countdown">{formatRemaining(remaining)}</div>`.

6. Rendering
- Re-used existing CSS classes and markup structure to preserve layout.
- Images use the `authorImage` and `nftImage` values from the API.
- Price, title, and likes are rendered from the API fields.

7. Accessibility and behavior
- `select` has `aria-label` and is keyboard-focusable.
- All interactive elements use native controls (`<button>`, `<a>`, `<select>`).
- Interval is cleaned up on unmount to avoid memory leaks.

How to test locally
1. Start the dev server:

```bash
npm start
```

2. Open `http://localhost:3000` and navigate to the Explore page. The list should be populated from the API.
3. Use the filter dropdown to select `Most liked` — the component will fetch `?filter=likes_high_to_low` and show sorted items.
4. Verify countdown behavior:
  - Items with `expiryDate` show a live `h m s` countdown.
  - Items with `expiryDate: null` show `No expiry`.
  - When countdown reaches zero it shows `Expired`.

Notes and possible improvements
- Pagination / Load more: currently the component requests the full endpoint result. Add server-side pagination or a `page` param + `Load more` handler to fetch more items.
- Localization: `formatRemaining` returns English text; consider i18n for other locales.
- Performance: If the list grows large, consider updating countdowns less frequently or using a virtualized list.
- Unit tests: Add tests for `formatRemaining()` to assert formatting edge cases (null, 0, >3600, etc.).

Files changed
- `src/components/explore/ExploreItems.jsx`

If you want, I can:
- Add unit tests for the countdown helper and component behavior.
- Implement `Load more` pagination.
- Push the README into the project root as `README-explore.md` (already created).
