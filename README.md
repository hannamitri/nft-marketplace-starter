# Ultraverse — NFT Marketplace Interface

A React frontend concept for an NFT marketplace, featuring collectible cards, collection showcases, an Explore page, an author profile, and an item details page.

The project focuses on component-based page construction, visual styling, and navigation using sample NFT content.

## Live Demo

[View Ultraverse](https://dylan-internship.vercel.app/)

## Interface Features

- Homepage sections for new items, collections, sellers, and categories
- Explore page displaying sample NFT cards
- Author profile and item details page components
- Desktop and mobile navigation
- React Router links between marketplace sections
- Bootstrap-based layout classes and custom CSS
- Local artwork, illustrations, and icon assets

## Tech Stack

- React
- JavaScript and JSX
- React Router
- CSS and Bootstrap styles
- React Icons
- Create React App
- Vercel for the linked demo

## Project Scope

This is a frontend interface concept using static sample content.

The inspected source does not implement:

- NFT purchases or blockchain transactions
- Wallet connection
- Working search or sorting
- Dynamic NFT data
- Functional loading of additional items

Prices, countdowns, likes, and author information are sample display content.

## Run Locally

The current source copy is missing the `App` module imported by `src/index.js`. Restore the application's root component and route configuration before running it.

Once the complete source is available:

```bash
npm ci
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Available Commands

| Command | Purpose |
| --- | --- |
| `npm start` | Start the development server |
| `npm run build` | Create a production build |
| `npm test` | Start the configured test runner |

## Project Structure

```text
src/
├── components/   # Navigation, footer, and marketplace sections
├── pages/        # Home, Explore, Author, and ItemDetails
├── images/       # Local image assets
├── css/          # Stylesheets and bundled fonts
├── index.css     # Application styles
└── index.js      # React entry point

public/           # HTML template and public assets
image-credits.txt # Included image credits
```

## Credits

This project includes third-party design assets and styling resources. See `image-credits.txt` and the relevant asset files for attribution.

The marketplace content is illustrative and does not represent real transactions.
