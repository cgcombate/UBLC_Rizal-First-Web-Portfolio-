import { useEffect } from 'react';

const Lightbox = ({ image, currentIndex, totalImages, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(18,23,43,0.9)] p-4 backdrop-blur-sm fade-in"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-6xl flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-0 top-0 z-10 m-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/18"
          aria-label="Close lightbox"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-hidden border border-white/10 bg-[rgba(247,245,241,0.06)] shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[58vh] w-full object-contain"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
            }}
          />
        </div>

        <div className="grid gap-5 border border-t-0 border-white/10 bg-[var(--paper)] p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:p-6">
          <div className="max-h-[26vh] overflow-y-auto pr-1">
            <p className="eyebrow text-[var(--best-brass)]">Reflection</p>
            <h3 className="mt-2 font-display text-2xl text-[var(--ink)]">
              {image.caption}
            </h3>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-soft md:text-base">
              {image.reflection}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 md:flex-col md:items-end">
            <span className="eyebrow text-[var(--ink)]">
              {currentIndex + 1} / {totalImages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onPrev}
                disabled={totalImages <= 1}
                className="inline-flex items-center gap-2 border border-[rgba(18,23,43,0.16)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:border-[var(--best-brass)] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Previous image"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
                </svg>
                Prev
              </button>
              <button
                onClick={onNext}
                disabled={totalImages <= 1}
                className="inline-flex items-center gap-2 border border-[rgba(18,23,43,0.16)] bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--paper)] hover:bg-[var(--best-navy)] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Next image"
              >
                Next
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
