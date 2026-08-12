import { useParams } from 'react-router-dom';
import { categories } from '../data/categories';
import ImageGrid from './ImageGrid';
import CategoryNav from './CategoryNav';
import { useEffect, useState } from 'react';
import Lightbox from './Lightbox';
import { getCategoryLabel, getCategoryTheme } from '../utils/categoryTheme';

const CategoryPage = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const category = categories.find(cat => cat.id === id);

  useEffect(() => {
    if (category) {
      setActiveImage(category.images[0]);
      setLightboxImage(null);
      setLightboxIndex(0);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [category]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextValue = documentHeight <= 0 ? 0 : (scrollTop / documentHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, nextValue)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!category) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-soft">Category not found.</p>
      </div>
    );
  }

  const theme = getCategoryTheme(category);

  const handleSelectImage = (image) => {
    setActiveImage(image);
  };

  const handleOpenLightbox = (image) => {
    const index = category.images.findIndex(img => img.id === image.id);
    setActiveImage(image);
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const handleLightboxClose = () => {
    setLightboxImage(null);
  };

  const handleLightboxNext = () => {
    const nextIndex = (lightboxIndex + 1) % category.images.length;
    setLightboxIndex(nextIndex);
    setActiveImage(category.images[nextIndex]);
    setLightboxImage(category.images[nextIndex]);
  };

  const handleLightboxPrev = () => {
    const prevIndex = (lightboxIndex - 1 + category.images.length) % category.images.length;
    setLightboxIndex(prevIndex);
    setActiveImage(category.images[prevIndex]);
    setLightboxImage(category.images[prevIndex]);
  };

  return (
    <div className="relative">
      <div className="fixed left-0 right-0 top-0 z-[60] h-px bg-transparent">
        <div
          className="progress-sweep h-full origin-left"
          style={{
            width: `${scrollProgress}%`,
            backgroundColor: category.group === 'Core Value' ? theme.accent : theme.accentAlt,
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <header className="mb-10 border-t pt-6 surface-line">
          <div className="flex flex-wrap items-center gap-4">
            <span className="eyebrow" style={{ color: theme.accent }}>
              {getCategoryLabel(category)}
            </span>
            <span className="eyebrow" style={{ color: category.group === 'Core Value' ? theme.accent : theme.accentAlt }}>
              {category.group}
            </span>
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight tracking-[-0.03em] md:text-5xl lg:text-6xl">
            {category.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-soft md:text-lg">
            {category.intro}
          </p>
        </header>

        <ImageGrid
          images={category.images}
          selectedImage={activeImage ?? category.images[0]}
          onSelectImage={handleSelectImage}
          onOpenImage={handleOpenLightbox}
          categoryTitle={category.title}
        />

        <div className="mt-14">
          <CategoryNav currentCategoryId={category.id} />
        </div>
      </div>

      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          currentIndex={lightboxIndex}
          totalImages={category.images.length}
          onClose={handleLightboxClose}
          onNext={handleLightboxNext}
          onPrev={handleLightboxPrev}
        />
      )}
    </div>
  );
};

export default CategoryPage;
