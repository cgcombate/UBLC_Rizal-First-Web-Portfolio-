import Scrapbook from './Scrapbook';
import ScrapbookStrip from './ScrapbookStrip';

const ImageGrid = ({ images, selectedImage, onNavigate, onOpenImage, categoryTitle, markColor }) => {
  const selectedIndex = images.findIndex((image) => image.id === selectedImage.id);

  return (
    <section className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start">
        <Scrapbook
          images={images}
          currentImage={selectedImage}
          onNavigate={onNavigate}
          onOpenImage={onOpenImage}
          categoryTitle={categoryTitle}
          markColor={markColor}
        />

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
          <p className="eyebrow text-[var(--ink)]">Snapshots</p>
          <p className="text-sm text-soft">
            Click a snapshot to flip it onto the scrapbook page.
          </p>
        </div>
        <ScrapbookStrip
          images={images}
          currentIndex={selectedIndex}
          onNavigate={onNavigate}
          categoryTitle={categoryTitle}
        />
      </div>
    </section>
  );
};

export default ImageGrid;