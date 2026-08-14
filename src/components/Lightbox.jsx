import { useEffect } from 'react';
import { useFlexibleImage } from '../hooks/useFlexibleImage';

const pad = (number) => String(number).padStart(2, '0');

const Lightbox = ({ image, currentIndex, totalImages, onClose, onNext, onPrev }) => {
  const { src: imageSrc, handleError, handleLoad } = useFlexibleImage(
    image.src,
    'https://placehold.co/1200x960/e8e2d8/12172B?text=Image+Unavailable'
  );

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="lightbox-backdrop fixed inset-0 z-50 overflow-hidden bg-[rgba(247,245,241,0.94)] backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${image.caption}, image ${currentIndex + 1} of ${totalImages}`}
      onClick={onClose}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(176,141,87,0.1)_0%,transparent_55%)]"
        aria-hidden="true"
      />

      <header className="relative z-10 flex h-16 items-center justify-between px-5 sm:px-8">
        <span className="eyebrow text-soft">
          {pad(currentIndex + 1)} / {pad(totalImages)}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(18,23,43,0.18)] bg-[var(--paper)] text-[var(--ink)] shadow-[0_6px_16px_rgba(18,23,43,0.1)] transition-colors duration-200 hover:bg-white focus-visible:outline-[var(--best-brass)]"
          aria-label="Close lightbox"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>

      <div
        className="lightbox-in relative z-10 mx-auto flex h-[calc(100%-4rem)] w-full max-w-[90rem] flex-col gap-5 px-4 pb-4 sm:px-8 lg:flex-row lg:items-stretch lg:gap-8 lg:px-10 lg:pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex min-h-0 min-w-0 flex-1 items-center justify-center">
          <figure className="flex h-full w-full items-center justify-center">
            <img
              src={imageSrc}
              alt={image.alt}
              className="max-h-full max-w-full border border-[rgba(18,23,43,0.12)] bg-[var(--paper-strong)] object-contain shadow-[0_24px_60px_rgba(18,23,43,0.16)]"
              onError={handleError}
              onLoad={handleLoad}
            />
          </figure>

          {totalImages > 1 && (
            <>
              <button
                type="button"
                onClick={onPrev}
                className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(18,23,43,0.18)] bg-[var(--paper)] text-[var(--ink)] shadow-[0_6px_16px_rgba(18,23,43,0.12)] transition-colors duration-200 hover:bg-white focus-visible:outline-[var(--best-brass)]"
                aria-label="Previous image"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={onNext}
                className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(18,23,43,0.18)] bg-[var(--paper)] text-[var(--ink)] shadow-[0_6px_16px_rgba(18,23,43,0.12)] transition-colors duration-200 hover:bg-white focus-visible:outline-[var(--best-brass)]"
                aria-label="Next image"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        <aside className="flex max-h-[45vh] w-full shrink-0 flex-col overflow-y-auto border-t border-[rgba(18,23,43,0.12)] bg-[rgba(255,255,255,0.55)] px-5 py-5 backdrop-blur-sm lg:max-h-none lg:w-[340px] lg:border-l lg:border-t-0 lg:px-7 lg:py-6 xl:w-[380px]">
          <p className="eyebrow text-[var(--best-brass)]">Reflection</p>
          <h3 className="mt-3 font-display text-2xl italic leading-snug text-[var(--ink)] md:text-3xl">
            {image.caption}
          </h3>

          <div className="mt-5 h-px w-10 bg-[var(--best-brass)]" aria-hidden="true" />

          <p className="mt-5 whitespace-pre-line text-sm leading-7 text-soft md:text-[15px]">
            {image.reflection}
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Lightbox;