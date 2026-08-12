import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { categories } from '../data/categories';
import { getCategoryLabel, getCategoryTheme } from '../utils/categoryTheme';

const CategoryRow = ({ category, index }) => {
  const rowRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const theme = getCategoryTheme(category);

  useEffect(() => {
    const node = rowRef.current;

    if (!node) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={rowRef}
      className={`reveal-row border-t px-1 ${isVisible ? 'is-visible' : ''}`}
      style={{
        '--reveal-delay': `${index * 90}ms`,
        borderColor: theme.accentLine,
      }}
    >
      <Link
        to={`/category/${category.id}`}
        className="group grid gap-6 py-6 md:grid-cols-[96px_minmax(0,1fr)_auto] md:items-end md:gap-8"
        style={{ '--row-accent': theme.accent }}
      >
        <div className="flex items-center gap-3 md:block">
          <span className="eyebrow" style={{ color: theme.accent }}>
            {getCategoryLabel(category)}
          </span>
          <span className="h-px flex-1 md:hidden" style={{ backgroundColor: theme.accentLine }} />
        </div>

        <div>
          <h3 className="font-display text-2xl leading-tight text-[var(--ink)] transition-colors duration-200 group-hover:text-[color:var(--row-accent)] md:text-3xl">
            {category.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-soft md:text-base">
            {category.intro}
          </p>
        </div>

        <div className="flex items-center justify-between gap-6 md:justify-end">
          <span
            className="eyebrow"
            style={{ color: category.group === 'Core Value' ? theme.accent : theme.accentAlt }}
          >
            {category.group}
          </span>
          <span
            className="inline-flex items-center gap-3 border-b pb-1 text-sm font-medium text-[var(--ink)]"
            style={{
              borderColor: theme.accentLine,
            }}
          >
            Explore {category.images.length}
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </span>
        </div>
      </Link>
    </li>
  );
};

const CategorySection = ({ title, eyebrow, items }) => (
  <section className="mb-16 md:mb-20">
    <div className="mb-8 flex items-end justify-between gap-6 border-t pt-5 surface-line">
      <div>
        <p className="eyebrow text-[var(--best-brass)]">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl leading-tight md:text-4xl">{title}</h2>
      </div>
      <p className="hidden max-w-sm text-right text-sm leading-6 text-soft md:block">
        Browse each category as an index entry, then open the full photographic reflection set.
      </p>
    </div>

    <ol>
      {items.map((category, index) => (
        <CategoryRow key={category.id} category={category} index={index} />
      ))}
    </ol>
  </section>
);

const CategoryPreviewGrid = () => {
  const coreValues = categories.filter((category) => category.group === 'Core Value');
  const bestAttributes = categories.filter((category) => category.group === 'BEST Attribute');

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-18 lg:px-8 lg:py-20">
      <CategorySection title="Core Values" eyebrow="Maroon Signal" items={coreValues} />
      <CategorySection title="BEST Attributes" eyebrow="Navy + Brass Signal" items={bestAttributes} />
    </div>
  );
};

export default CategoryPreviewGrid;
