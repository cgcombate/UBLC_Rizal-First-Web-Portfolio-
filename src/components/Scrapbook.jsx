import { useEffect, useRef, useState } from 'react';
import { useFlexibleImage } from '../hooks/useFlexibleImage';

const pad = (number) => String(number).padStart(2, '0');

const ScrapPage = ({ image, onOpenImage, markColor }) => {
  const { src, handleError, handleLoad } = useFlexibleImage(
    image.src,
    'https://placehold.co/1200x960/e8e2d8/12172B?text=Image+Unavailable'
  );

  return (
    <div className="scrap-paper relative border border-[rgba(18,23,43,0.14)] px-5 pb-6 pt-12 shadow-[0_30px_70px_rgba(18,23,43,0.22)]">
      <div
        className="pointer-events-none absolute inset-x-0 -top-2.5 z-10 flex justify-around px-16"
        aria-hidden="true"
      >
        {[0, 1, 2].map((ring) => (
          <span
            key={ring}
            className="h-5 w-4 rounded-b-full border-2 border-t-0 border-[rgba(176,141,87,0.7)]"
          />
        ))}
      </div>

      <div className="mb-3 flex items-end justify-end gap-4">
        <span className="eyebrow text-soft">{image.caption}</span>
      </div>

      <div className="relative">
        <span
          className="pointer-events-none absolute -left-3 -top-3 z-10 h-6 w-16 rotate-[-8deg] bg-[rgba(176,141,87,0.35)] shadow-sm"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -right-3 -top-3 z-10 h-6 w-14 rotate-[7deg] bg-[rgba(18,23,43,0.09)] shadow-sm"
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={() => onOpenImage(image)}
          className="group/img relative block w-full cursor-pointer overflow-hidden border border-[rgba(18,23,43,0.16)] transition-transform duration-300 hover:scale-[1.015]"
          aria-label={`Open enlarged view for ${image.caption}`}
        >
          <img
            src={src}
            alt={image.alt}
            className="aspect-[5/4] h-full w-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.03]"
            onError={handleError}
            onLoad={handleLoad}
          />
          <span
            className="absolute inset-0 flex items-center justify-center bg-[rgba(18,23,43,0.4)] opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/img:opacity-100 focus-visible:opacity-100"
            aria-hidden="true"
          >
            <span className="inline-flex items-center gap-2 eyebrow text-[var(--paper)]">
              View Full Reflection
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover/img:translate-x-0.5 group-hover/img:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 19L19 5m0 0h-9m9 0v9" />
              </svg>
            </span>
          </span>
        </button>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <p className="font-display text-lg italic leading-snug text-[var(--ink)]">
          {image.caption}
        </p>
        <span
          className="mt-0.5 rotate-6 border border-dashed px-2 py-1 text-[10px] uppercase tracking-[0.18em] opacity-70"
          style={{ color: markColor, borderColor: markColor }}
        >
          UB · 2026
        </span>
      </div>
    </div>
  );
};

const Scrapbook = ({
  images,
  currentImage,
  onNavigate,
  onOpenImage,
  categoryTitle,
  markColor,
}) => {
  const total = images.length;
  const [displayed, setDisplayed] = useState(currentImage);
  const [previous, setPrevious] = useState(null);
  const [direction, setDirection] = useState('next');
  const prevSrcRef = useRef(currentImage.src);

  useEffect(() => {
    if (currentImage.src === prevSrcRef.current) return;
    prevSrcRef.current = currentImage.src;

    const prevIndex = images.findIndex((img) => img.src === displayed.src);
    const nextIndex = images.findIndex((img) => img.src === currentImage.src);
    const movedForward =
      nextIndex > prevIndex || (prevIndex === total - 1 && nextIndex === 0);
    setDirection(movedForward ? 'next' : 'prev');

    setPrevious(displayed);
    setDisplayed(currentImage);
    const timer = setTimeout(() => setPrevious(null), 800);
    return () => clearTimeout(timer);
  }, [currentImage, displayed, images, total]);

  const displayedIndex = images.findIndex((img) => img.id === displayed.id);

  return (
    <div className="min-w-0">
      <div className="mb-3 flex items-end justify-between gap-4">
        <span className="eyebrow" style={{ color: markColor }}>
          Page {pad(displayedIndex + 1)} / {pad(total)}
        </span>
        <span className="eyebrow text-soft">{categoryTitle}</span>
      </div>

      <div className="group relative" style={{ perspective: '1200px' }}>
        {previous && (
          <div
            key={`out-${previous.src}`}
            className={`scrap-page--flip-out ${direction === 'next' ? 'flip-fwd' : 'flip-back'} pointer-events-none absolute inset-0 z-20`}
          >
            <ScrapPage
              image={previous}
              onOpenImage={onOpenImage}
              markColor={markColor}
            />
            <div className="scrap-sheen absolute inset-0" aria-hidden="true" />
          </div>
        )}

        <div
          key={`in-${displayed.src}`}
          className={`relative z-10 ${
            previous
              ? `scrap-page--flip-in ${direction === 'next' ? 'flip-fwd' : 'flip-back'}`
              : ''
          }`}
        >
          <ScrapPage
            image={displayed}
            onOpenImage={onOpenImage}
            markColor={markColor}
          />
        </div>

        {previous && (
          <div
            className="scrap-shadow absolute inset-0 z-[15]"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate((displayedIndex - 1 + total) % total)}
          className="group/btn inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--ink)] transition-colors duration-200 hover:text-[color:var(--scrap-accent)] focus-visible:outline-[var(--best-brass)]"
          style={{ '--scrap-accent': markColor }}
          aria-label="Previous page"
        >
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover/btn:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <div className="flex items-center gap-2" aria-hidden="true">
          {images.map((image, index) => (
            <span
              key={image.id}
              className="rounded-full transition-all duration-300"
              style={{
                width: index === displayedIndex ? '1.25rem' : '0.375rem',
                height: '0.375rem',
                backgroundColor:
                  index === displayedIndex
                    ? markColor
                    : 'rgba(18, 23, 43, 0.18)',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => onNavigate((displayedIndex + 1) % total)}
          className="group/btn inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--ink)] transition-colors duration-200 hover:text-[color:var(--scrap-accent)] focus-visible:outline-[var(--best-brass)]"
          style={{ '--scrap-accent': markColor }}
          aria-label="Next page"
        >
          Next
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Scrapbook;
