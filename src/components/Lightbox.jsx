import { useEffect, useRef, useState } from 'react';
import { useFlexibleImage } from '../hooks/useFlexibleImage';

const pad = (number) => String(number).padStart(2, '0');

const Lightbox = ({
  image,
  currentIndex,
  totalImages,
  onClose,
  onNext,
  onPrev,
  categoryTitle = '',
  accent = '#B08D57',
}) => {
  const { src: imageSrc, handleError, handleLoad } = useFlexibleImage(
    image.src,
    'https://placehold.co/1200x960/e8e2d8/12172B?text=Image+Unavailable'
  );

  const [isClosing, setIsClosing] = useState(false);
  const [displayed, setDisplayed] = useState(() => ({
    id: image.id,
    src: imageSrc,
    key: 0,
  }));
  const [outgoing, setOutgoing] = useState(null);
  const outKeyRef = useRef(0);

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const requestClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    window.setTimeout(onClose, reduceMotion ? 40 : 260);
  };

  useEffect(() => {
    if (image.id === displayed.id) {
      setDisplayed((current) => ({ ...current, src: imageSrc }));
      return undefined;
    }

    setOutgoing({ src: displayed.src, key: ++outKeyRef.current });
    setDisplayed({ id: image.id, src: imageSrc, key: displayed.key + 1 });
    const timer = window.setTimeout(() => setOutgoing(null), 480);
    return () => window.clearTimeout(timer);
  }, [image.id, imageSrc, displayed.id, displayed.src, displayed.key]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        requestClose();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className={`lightbox-backdrop fixed inset-0 z-50 overflow-hidden ${
        isClosing ? 'lightbox-backdrop--closing' : ''
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${image.caption}, image ${currentIndex + 1} of ${totalImages}`}
      onClick={requestClose}
    >
      <div
        className="lightbox-ambient pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={imageSrc}
          alt=""
          className="h-full w-full scale-125 object-cover opacity-25 blur-[80px] saturate-[0.85]"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(247,245,241,0.92)_0%,rgba(247,245,241,0.68)_46%,rgba(247,245,241,0.92)_100%)]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -top-44 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-[0.16]"
        style={{ background: `radial-gradient(circle, ${accent}66, transparent 70%)` }}
        aria-hidden="true"
      />

      <div
        className="absolute left-0 right-0 top-0 z-20 h-[3px] bg-[rgba(18,23,43,0.08)]"
        aria-hidden="true"
      >
        <div
          className="h-full transition-[width] duration-500 ease-out"
          style={{
            width: `${((currentIndex + 1) / totalImages) * 100}%`,
            backgroundColor: accent,
          }}
        />
      </div>

      <header className="relative z-10 flex h-16 items-center justify-between gap-4 px-5 sm:px-8">
        <span className="eyebrow" style={{ color: accent }}>
          {pad(currentIndex + 1)} / {pad(totalImages)}
        </span>
        <p className="hidden truncate font-display text-lg italic text-[rgba(18,23,43,0.6)] md:block">
          {categoryTitle}
        </p>
        <button
          type="button"
          onClick={requestClose}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(18,23,43,0.16)] bg-white/70 text-[var(--ink)] shadow-[0_10px_28px_rgba(18,23,43,0.12)] backdrop-blur-xl transition-all duration-300 hover:-rotate-90 hover:bg-white focus-visible:outline-[var(--best-brass)]"
          aria-label="Close lightbox"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>

      <div
        className={`lightbox-in relative z-10 mx-auto flex h-[calc(100%-4rem)] w-full max-w-[96rem] flex-col gap-4 px-4 pb-4 sm:px-8 lg:flex-row lg:items-stretch lg:gap-7 lg:px-10 lg:pb-7 ${
          isClosing ? 'lightbox-in--closing' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex min-h-0 min-w-0 flex-1 items-center justify-center">
          <figure className="flex h-full w-full items-center justify-center">
            {outgoing && (
              <img
                key={`lb-out-${outgoing.key}`}
                src={outgoing.src}
                alt=""
                aria-hidden="true"
                className="lightbox-img--fade-out absolute max-h-full max-w-full object-contain"
              />
            )}
            <img
              key={`lb-in-${displayed.key}`}
              src={displayed.src}
              alt={image.alt}
              className="lightbox-img--fade-in max-h-full max-w-full border border-[rgba(18,23,43,0.14)] bg-[var(--paper-strong)] object-contain shadow-[0_40px_90px_rgba(18,23,43,0.24)]"
              onError={handleError}
              onLoad={handleLoad}
            />
          </figure>

          {totalImages > 1 && (
            <>
              <button
                type="button"
                onClick={onPrev}
                className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(18,23,43,0.16)] bg-white/70 text-[var(--ink)] shadow-[0_10px_28px_rgba(18,23,43,0.14)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white focus-visible:outline-[var(--best-brass)] sm:left-4"
                aria-label="Previous image"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={onNext}
                className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(18,23,43,0.16)] bg-white/70 text-[var(--ink)] shadow-[0_10px_28px_rgba(18,23,43,0.14)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white focus-visible:outline-[var(--best-brass)] sm:right-4"
                aria-label="Next image"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        <aside className="flex max-h-[42vh] w-full shrink-0 flex-col border border-[rgba(18,23,43,0.12)] bg-white/70 shadow-[0_24px_60px_rgba(18,23,43,0.12)] backdrop-blur-xl lg:max-h-none lg:w-[360px] xl:w-[400px]">
          <div className="overflow-y-auto px-5 py-5 lg:px-7 lg:py-6">
            <p className="eyebrow" style={{ color: accent }}>
              Reflection
            </p>
            <h3 className="mt-3 font-display text-2xl italic leading-snug text-[var(--ink)] md:text-3xl">
              {image.caption}
            </h3>

            <div
              className="mt-5 h-px w-10"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />

            <p className="mt-5 whitespace-pre-line text-sm leading-7 text-soft md:text-[15px]">
              {image.reflection}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Lightbox;