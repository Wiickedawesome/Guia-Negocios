# Repository Utility Scripts

This directory contains developer utility scripts for working with the **Guia Negocios** database and environment.

## Available Scripts

### `fetch-blogs.js`
Reads blog posts from Firebase Firestore and prints titles/slugs to stdout.

#### Usage:
Ensure `.env` exists with valid Firebase client credentials (`PUBLIC_FIREBASE_API_KEY`, etc.), then run:
```bash
node scripts/fetch-blogs.js
```
