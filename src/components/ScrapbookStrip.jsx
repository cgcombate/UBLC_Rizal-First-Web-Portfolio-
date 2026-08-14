import { useFlexibleImage } from '../hooks/useFlexibleImage';

const TILTS = [-4, 2.5, -2, 3.5, -3];

const Polaroid = ({ image, index, isActive, onSelect, categoryTitle }) => {
  const { src, handleError, handleLoad } = useFlexibleImage(
    image.src,
    'https://placehold.co/400x300/e8e2d8/12172B?text=Image+Unavailable'
  );
  const tilt = TILTS[index % TILTS.length];

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      className={`group w-24 cursor-pointer bg-[#fbf9f4] p-1.5 pb-3 text-left shadow-[0_10px_24px_rgba(18,23,43,0.16)] transition-[transform,box-shadow,translate] duration-200 hover:-translate-y-1.5 hover:shadow-[0_16px_34px_rgba(18,23,43,0.26)] focus-visible:outline-[var(--best-brass)] sm:w-32 ${
        isActive
          ? 'ring-2 ring-[var(--best-brass)] ring-offset-2 ring-offset-[var(--paper)]'
          : 'opacity-85 hover:opacity-100'
      }`}
      style={{ transform: `rotate(${isActive ? 0 : tilt}deg)` }}
      aria-label={`View ${image.caption} from ${categoryTitle}`}
      aria-pressed={isActive}
    >
      <img
        src={src}
        alt=""
        className="aspect-[4/3] w-full object-cover"
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
      <span className="mt-2 block w-full truncate px-0.5 text-[10px] italic leading-snug text-[rgba(18,23,43,0.78)] sm:text-[11px]">
        {image.caption}
      </span>
    </button>
  );
};

const ScrapbookStrip = ({ images, currentIndex, onNavigate, categoryTitle }) => (
  <div className="flex flex-wrap items-start justify-center gap-5 sm:gap-6">
    {images.map((image, index) => (
      <Polaroid
        key={image.id}
        image={image}
        index={index}
        isActive={index === currentIndex}
        onSelect={onNavigate}
        categoryTitle={categoryTitle}
      />
    ))}
  </div>
);

export default ScrapbookStrip;
