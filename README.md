# Ultraverse NFT Marketplace — Frontend Simplified Internship Project

A responsive React marketplace interface completed as part of my Frontend Simplified internship work.

**Live project:** https://ultraverse.rebeccaiaaland.com  
**Portfolio:** https://www.rebeccaiaaland.com

## Project context

Frontend Simplified provided the starter project, visual direction, assets, API endpoints, and project requirements. My work focused on turning those requirements into a working responsive application and troubleshooting the behavior across the different views.

This is a learning and implementation project, not an original marketplace product or visual-design claim.

## Notes

The repository is a fork of the Frontend Simplified NFT marketplace starter. Some marketplace actions, such as connecting a real crypto wallet or purchasing an NFT, are demonstration-only and are not implemented as real transactions.

## What I implemented

- Responsive React pages and reusable marketplace components
- API-driven Hot Collections, New Items, Top Sellers, Explore, author, and item-detail experiences
- Loading and skeleton states while remote data is being requested
- Responsive `react-slick` carousels with custom navigation and desktop/tablet/mobile breakpoints
- Live countdown timers for expiring NFT listings
- Explore-page sorting through API filters and incremental “Load more” behavior
- React Router navigation between marketplace, author, and item-detail views
- Responsive card, image, spacing, and button refinements across screen sizes
- Deployment through Vercel

## Technical focus

**React · JavaScript · React Router · Axios · react-slick · CSS · Responsive Design · REST APIs · Loading States · Vercel**

One of the most useful parts of this project was learning how multiple frontend concerns work together: asynchronous data, loading feedback, reusable UI, routing, timers, carousels, and responsive behavior rather than building a single static page.

## Running locally

```bash
npm install
npm run dev
```

The project uses Vite for local development and production builds.

## Build

```bash
npm run build
```


## Testing, Accessibility & CI

### Automated testing

Added automated tests with Vitest and React Testing Library for key Explore-page interactions:

- Search input rendering and user typing
- API sorting by price
- Incremental "Load more" behavior

The current test suite contains 4 passing tests across 2 test files.

```bash
npm test -- --run
```
### Accessibility

Audited the Explore page with Lighthouse and improved the Accessibility score from 82 to 100.

Changes included:

- Added accessible form labeling
- Improved image alternative text
- Corrected heading hierarchy
- Added semantic `<main>` structure
- Improved text color contrast
- Added an accessible label to the newsletter icon link

### Performance

Audited the live Explore page with Lighthouse using a desktop Incognito session.

- Initial Performance baseline: 95
- Identified oversized externally hosted images and legacy starter-project render-blocking resources
- Tested native image lazy loading
- Re-measured after the change and found a performance regression
- Reverted the change rather than keeping an optimization that performed worse
- Final verification remained in Lighthouse's green performance range

Larger image-delivery and legacy-resource changes were intentionally left unchanged because they are tied to the provided internship API and starter-project architecture.

### Continuous integration

Added a GitHub Actions CI workflow that automatically runs on pushes and pull requests to `main`.

The workflow:

- Checks out the repository
- Sets up Node.js
- Installs dependencies with `npm ci`
- Runs the automated test suite
- Verifies the production build

Deployment continues through Vercel.