import { useFlexibleImage } from '../hooks/useFlexibleImage';

const ImageCard = ({ image, onClick, categoryTitle, isActive = false, delay = 0 }) => {
  const getPlaceholderUrl = () => {
    const colors = ['e2e8f0', 'cbd5e1', '94a3b8', '64748b', '475569'];
    const colorIndex = (image.id - 1) % colors.length;
    return `https://placehold.co/600x450/${colors[colorIndex]}/64748b?text=${encodeURIComponent(image.caption)}`;
  };

  const { src, isLoaded, isFailed, handleError, handleLoad } = useFlexibleImage(
    image.src,
    getPlaceholderUrl()
  );

  return (
    <button
      type="button"
      className="group card-reveal block w-full cursor-pointer text-left"
      style={{ '--card-delay': `${delay}ms` }}
      onClick={() => onClick(image)}
      aria-label={`View ${image.caption} from ${categoryTitle}`}
      aria-pressed={isActive}
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden border bg-[var(--paper-strong)] shadow-[0_14px_30px_rgba(18,23,43,0.08)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_22px_44px_rgba(18,23,43,0.16)] ${
          isActive ? 'border-[var(--best-brass)]' : 'border-transparent'
        }`}
      >
        {!isLoaded && !isFailed && (
          <div className="absolute inset-0 animate-pulse bg-[rgba(18,23,43,0.06)]" />
        )}
        {isFailed ? (
          <img
            src={src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={src}
            alt={image.alt}
            className={`h-full w-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onError={handleError}
            onLoad={handleLoad}
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,23,43,0.44)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-3 text-[var(--paper)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="eyebrow text-[10px] tracking-[0.18em]">Open Reflection</p>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-[var(--ink)] underline-offset-4 group-hover:underline">
          {image.caption}
        </h3>
      </div>
    </button>
  );
};

export default ImageCard;
