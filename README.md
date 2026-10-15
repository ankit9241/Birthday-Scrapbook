# Birthday Scrapbook

A handmade, interactive digital birthday scrapbook crafted with love and memories.

## Features

- **Interactive Scrapbook Scenes**: Cover, Intro, Sides of Anshika, Team memories (Basera gang), Personal Letter / Note, Birthday Wishes & Flaps, Mini Prank, Candle Wish, and Final Polaroid Gallery.
- **Custom Polaroid Frames & Stamps**: Realistic washi tape, handwritten fonts, and click-to-enlarge photo polaroids with captions.
- **Centralized Content**: All photos, captions, and texts live in `src/content/birthday.ts`.

## Tech Stack

- [TanStack Start](https://tanstack.com/start)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

## Development

```sh
bun install
bun run dev
```

## Adding Photos

Photos and captions are configured in `src/content/birthday.ts`. Drop image files into `src/assets/photos/` or `public/photos/` and configure their paths in `birthday.ts`.
