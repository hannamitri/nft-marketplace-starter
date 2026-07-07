Item Details feature

Files changed
- `src/pages/ItemDetails.jsx`

Summary
- Implemented the Item Details page that shows a single NFT's image, metadata, owner and creator information, and pricing information.

What I implemented

1. Scroll behavior
- Added a `useEffect` that runs `window.scrollTo(0, 0)` on mount so the page always starts at the top when navigated to.

2. Visual layout
- Left column: renders the NFT image using `src/images/nftImage.jpg` with classes `img-fluid img-rounded nft-image`.
- Right column: renders the item title, description, view and like counts, owner and creator blocks, and the price block.

3. Owner / Creator blocks
- Each block shows a thumbnail, check icon, and a link to the `Author` page (via `react-router` `Link`).

4. Price
- Price is displayed with an Ethereum icon (`src/images/ethereum.svg`) and a numeric price value.

Testing locally

1. Start the dev server:

```bash
npm start
```

2. Open `http://localhost:3000/item-details` (or navigate to the Item Details route in the app) and verify:
- The page scrolls to the top on load.
- The NFT image, title, description, views and likes are visible.
- Owner and Creator blocks show thumbnails and link to the author page.
- Price block displays the ETH icon and price.

Notes & possible improvements

- Data-driven content: currently the page uses static placeholder images and text. Replace with API-driven data to render real NFT details.
- Countdown / availability: if items have expiry or auction state, add a live countdown and bidding UI.
- Accessibility: add `alt` text for images and ensure heading order is semantic.
- Tests: add unit tests for any helper logic and integration/visual tests to ensure layout renders correctly.

Files changed
- `src/pages/ItemDetails.jsx`

If you'd like, I can convert this page to fetch item details from the API, add a README entry into the PR description, or commit & push this README and open a PR — which would you like me to do next?
