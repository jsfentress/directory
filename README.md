# Nashville Music Radar - Event Directory

This is an [Astro](https://astro.build) project for managing and displaying music events in Nashville.

## 🚀 Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── EventCard.astro
│   │   ├── EventDirectory.jsx
│   │   └── NavDrawer.jsx
│   ├── lib/
│   │   └── pocketbase.ts
│   ├── pages/
│   │   ├── api/
│   │   │   └── submit-event.ts
│   │   ├── index.astro
│   │   ├── submit.astro
│   │   └── thank-you.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
└── README.md
```

## 🔧 Environment Setup

Before running the project, you need to set up environment variables:

1. Create a `.env` file in the root directory:
```bash
POCKETBASE_URL=https://dpocket-production.up.railway.app
```

2. For Netlify deployment, add the environment variable in your Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add `POCKETBASE_URL` with value `https://dpocket-production.up.railway.app`

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`     |
| `npm run build`        | Build your production site to `./dist/`         |
| `npm run preview`      | Preview your build locally, before deploying    |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |

## 📝 Form Integration

The event submission form is located at `/submit` and connects to your PocketBase instance. Make sure:

1. Your PocketBase instance is running and accessible
2. The `POCKETBASE_URL` environment variable is set correctly
3. CORS is configured in PocketBase to allow requests from your domain

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
