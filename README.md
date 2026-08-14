# How I Live UB's Core Values & BEST Attributes

A personal portfolio website showcasing 7 categories (3 Core Values and 4 BEST Attributes) with photographs and personal reflections.

## Project Structure

- `src/data/categories.js` - Contains all content data (7 categories, 35 images with reflections)
- `src/components/` - React components (Navbar, Footer, Hero, CategoryPreviewGrid, CategoryPage, ImageGrid, ImageCard, Lightbox, CategoryNav)
- `public/assets/images/` - Image directories for each category (drop your actual photos here as `1.jpg` through `5.jpg`)

## Adding Your Photos

1. Add your photos to the category directories in `public/assets/images/`, naming each one `1.jpg` through `5.jpg` (jpg/jpeg/png/webp all work):
   - `public/assets/images/faith-in-god/1.jpg` through `5.jpg`
   - `public/assets/images/love-of-wisdom/1.jpg` through `5.jpg`
   - `public/assets/images/service-to-fellowmen/1.jpg` through `5.jpg`
   - `public/assets/images/builder-and-innovator/1.jpg` through `5.jpg`
   - `public/assets/images/efficient-professional/1.jpg` through `5.jpg`
   - `public/assets/images/social-moral-global/1.jpg` through `5.jpg`
   - `public/assets/images/transformed-lifelong-learner/1.jpg` through `5.jpg`

2. Any common format works (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`). The site automatically falls back across extensions, so if the code expects `1.jpg` but you saved `1.png`, it will still display — no path edits needed.

3. Personal reflections in `src/data/categories.js` are pre-written; edit any to match your own story.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Features

- Responsive design (mobile-first)
- Lightbox for viewing images and reflections
- Category navigation (prev/next)
- Clean, editorial styling with Tailwind CSS
- Lazy-loaded images with fallback placeholders
