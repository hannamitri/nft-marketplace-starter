Countdown implementation for `NewItems` component

Files changed
- [src/components/home/NewItems.jsx](src/components/home/NewItems.jsx)

Summary
- Implemented a live countdown for each item using the API's `expiryDate` (epoch ms).

Precise steps performed
1. Inspect API response
   - Queried `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems` and confirmed each item contains `expiryDate` as epoch milliseconds.
   - (Quick check performed with a small Node fetch to view the JSON.)

2. Add component state
   - Added `const [now, setNow] = useState(Date.now());` to hold the current timestamp.
   - Kept existing `items`, `loading`, and `error` states for data and UX.

3. Fetch items with abort safety
   - Used `fetch(API, { signal: controller.signal })` inside `useEffect` with an `AbortController`.
   - On success set `items` and `loading=false`; on error set `error` (ignored `AbortError`).

4. Update the time every second
   - Added a `useEffect` that runs `setInterval(() => setNow(Date.now()), 1000)` and returns `clearInterval` in cleanup.
   - This keeps `now` moving so countdowns update in real time.

5. Compute remaining seconds per item
   - For each item compute: `remaining = Math.max(0, Math.floor((item.expiryDate - now) / 1000))`.
   - Using `Math.max(0, ...)` avoids negative values once expired.

6. Format remaining time
   - Implemented `formatRemaining(seconds)`:
     - If `seconds <= 0` return `"Expired"`.
     - Compute hours, minutes, seconds: `h = Math.floor(seconds/3600)`, `m = Math.floor((seconds%3600)/60)`, `s = seconds%60`.
     - Return a short string like `"1h 12m 5s"`.

7. Render the countdown
   - Placed the formatted string in the component markup: `<div className="de_countdown">{formatRemaining(remaining)}</div>`.
   - This updates automatically because `now` changes every second.

8. Cleanup and accessibility notes
   - Interval is cleared on unmount to avoid leaks.
   - `expiryDate` is treated as epoch milliseconds (UTC). Using `Date.now()` is consistent for elapsed time calculations.

How to verify locally
1. Start dev server:

```bash
npm start
```

2. Open `http://localhost:3000` and navigate to the home page. The `New Items` section should show live countdowns.

3. To test API quickly from your machine you can run (used during development):

```bash
node -e "const https=require('https');https.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems',res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{console.log(JSON.parse(d)[0]);});}).on('error',e=>console.error(e.message));"
```

Notes and caveats
- The implementation assumes `expiryDate` is epoch milliseconds (as returned by the API). If API changes to seconds, convert appropriately.
- Rendering uses the existing markup and CSS classes; adjust CSS if layout or truncation issues appear.

If you want, I can also add unit tests around the `formatRemaining` helper and commit the README into the project root as `README-countdown.md` or `docs/COUNTDOWN.md`.
