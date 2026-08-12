import ImageCard from './ImageCard';

const ImageGrid = ({ images, selectedImage, onSelectImage, onOpenImage, categoryTitle }) => {
  return (
    <section className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
        <button
          type="button"
          onClick={() => onOpenImage(selectedImage)}
          className="group relative block overflow-hidden border border-[rgba(18,23,43,0.12)] bg-[var(--paper-strong)] text-left surface-shadow transition-all duration-300 hover:-translate-y-1 hover:surface-shadow-lift"
          aria-label={`Open enlarged view for ${selectedImage.caption}`}
        >
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="aspect-[5/4] h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.src = 'https://placehold.co/1200x900/e8e2d8/12172B?text=Image+Unavailable';
            }}
          />
        </button>

        <article className="border-t pt-5 surface-line">
          <p className="eyebrow text-[var(--best-brass)]">Primary Reflection</p>
          <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
            {selectedImage.caption}
          </h2>
          <p className="mt-5 whitespace-pre-line text-base leading-8 text-soft">
            {selectedImage.reflection}
          </p>
        </article>
      </div>

      <div className="border-t pt-5 surface-line">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="eyebrow text-[var(--ink)]">Thumbnail Rail</p>
          <p className="text-sm text-soft">Four supporting images remain below the primary frame.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {images
            .filter((image) => image.id !== selectedImage.id)
            .map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                onClick={onSelectImage}
                categoryTitle={categoryTitle}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGrid;
