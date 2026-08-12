# How I Live UB's Core Values & BEST Attributes

A personal portfolio website showcasing 7 categories (3 Core Values and 4 BEST Attributes) with photographs and personal reflections.

## Project Structure

- `src/data/categories.js` - Contains all content data (7 categories, 35 images with reflections)
- `src/components/` - React components (Navbar, Footer, Hero, CategoryPreviewGrid, CategoryPage, ImageGrid, ImageCard, Lightbox, CategoryNav)
- `src/assets/images/` - Image directories for each category (replace placeholder .txt files with your actual .jpg images)

## Adding Your Photos

1. Replace the placeholder .txt files in each category directory with your actual photos:
   - `src/assets/images/faith-in-god/1.jpg` through `5.jpg`
   - `src/assets/images/love-of-wisdom/1.jpg` through `5.jpg`
   - `src/assets/images/service-to-fellowmen/1.jpg` through `5.jpg`
   - `src/assets/images/builder-and-innovator/1.jpg` through `5.jpg`
   - `src/assets/images/efficient-professional/1.jpg` through `5.jpg`
   - `src/assets/images/social-moral-global/1.jpg` through `5.jpg`
   - `src/assets/images/transformed-lifelong-learner/1.jpg` through `5.jpg`

2. Update the placeholder reflections in `src/data/categories.js` with your personal stories (replace the `[PLACEHOLDER - Replace with personal reflection]` text with your own 5-7 sentence reflections).

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
