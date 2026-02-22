# Music Streaming App (Vue 3)

A **mobile-first music streaming web app** built with Vue 3. This is a **portfolio/demo project** showcasing front-end skills in building a full SPA with recommendation, playback, search, and user auth.

> **Disclaimer:** This is a personal demo for portfolio purposes only. It is not affiliated with, endorsed by, or connected to any commercial music service.

---

## Tech Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vue Router 4** (hash history)
- **Vuex 4** (modular store)
- **Vant 4** (mobile UI components)
- **Axios** (HTTP client)
- **Less** (styles)
- **Vue CLI 5**

---

## Features

### Implemented

- **Home** — Tabs: Recommend, Music (playlists by category)
- **Recommend** — Daily picks, new songs, playlists, exclusive content
- **Music** — Browse by language (Chinese, English, Japanese, Korean)
- **Playback** — Play/pause, progress, mini player, full detail page with lyrics
- **Search** — Search songs and navigate to results
- **Rankings** — Soaring, New, Original, Hot charts with list and detail pages
- **Playlists** — Playlist list and playlist detail with track list
- **Login** — Phone + SMS verification code, 60s resend countdown, auth state persisted
- **Side menu** — “Please log in” / “Log out” based on auth; back to home from login

### Reserved for future

- Podcast, Audiobook, and “Free listen” sections (placeholder copy)
- Roaming and Notes pages (placeholder copy)

---

## Project structure

This repo is the **frontend only**. The app gets music data from a separate **backend API** (see below).

```
src/
├── views/          # Page components (Home, Login, Search, Detail, etc.)
├── components/     # Reusable UI (PlayControl, BottomNav, PopupPage, etc.)
├── store/          # Vuex modules (music, UserInfo, MusicRank, etc.)
├── request/        # API client and endpoints (baseURL: dev → localhost:3000, prod → public API)
└── router/         # Route config
```

---

## Backend API

The frontend talks to a **Node.js API** that provides music data (playlists, search, login, etc.). You have two options:

1. **Use the deployed API (for live demo)**  
   The production build points to a Vercel-deployed API: **[neteasecloudmusicapi-main-seven.vercel.app](https://neteasecloudmusicapi-main-seven.vercel.app/)**. No need to run the backend locally for the live site. (Vercel project: [linqiaojuns-projects/neteasecloudmusicapi-main](https://vercel.com/linqiaojuns-projects/neteasecloudmusicapi-main).)

2. **Run the API locally (for development)**  
   Use the Node.js API repo: **[Juneleonn/neteasecloudmusicapi-main](https://github.com/Juneleonn/neteasecloudmusicapi-main)**. Clone it, install, and start it:

   ```bash
   git clone https://github.com/Juneleonn/neteasecloudmusicapi-main.git
   cd neteasecloudmusicapi-main
   npm install
   node app.js
   ```

   It runs at **http://localhost:3000** by default. The frontend in development mode uses this URL automatically.

---

## Getting started

### Prerequisites

- Node.js 14+
- npm or yarn

### Option A: Frontend only (uses public API in production)

If you only care about running the **built** app or deploying it, you don’t need the backend. Just build and deploy the frontend (see [Deployment](#deployment) below).

For **local development** with real data, use Option B.

### Option B: Full stack (frontend + local API)

1. **Start the backend API** (clone and run in its own folder):

   ```bash
   git clone https://github.com/Juneleonn/neteasecloudmusicapi-main.git
   cd neteasecloudmusicapi-main
   npm install
   node app.js
   ```

   Leave it running. You should see something like: `server running @ http://localhost:3000`.

2. **Start the frontend** (this repo):

   ```bash
   git clone https://github.com/Juneleonn/wangyiyun_app.git
   cd wangyiyun_app
   npm install
   npm run serve
   ```

3. Open the URL from the terminal (e.g. `http://localhost:8080`) and use a **mobile viewport** or real device for the best experience.

The frontend uses `http://localhost:3000` in development and a public API URL in production builds, so no extra config is needed for local runs.

### Build for production

```bash
npm run build
```

Output is in the `dist/` folder.

---

Summary:

| Goal              | What to do |
|-------------------|------------|
| Share code        | [Frontend repo](https://github.com/Juneleonn/wangyiyun_app) · [Backend API repo](https://github.com/Juneleonn/neteasecloudmusicapi-main). |
| Run locally       | Start backend (`node app.js` in API folder), then `npm run serve` here. |
| Live demo online  | Deploy `dist/` to Vercel/Netlify; no need to run or deploy the backend. |

---

## Live demo

🔗 **[wangyiyun-app-rho.vercel.app](https://wangyiyun-app-rho.vercel.app/#/)** — frontend deployed on Vercel (uses public API).

---

## License

For portfolio and demonstration use only.
