import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { getCategoryLabel, getCategoryTheme } from '../utils/categoryTheme';

const CategoryNav = ({ currentCategoryId }) => {
  const currentIndex = categories.findIndex(cat => cat.id === currentCategoryId);
  const prevCategory = currentIndex > 0 ? categories[currentIndex - 1] : null;
  const nextCategory = currentIndex < categories.length - 1 ? categories[currentIndex + 1] : null;

  const NavLinkCard = ({ category, direction }) => {
    const theme = getCategoryTheme(category);

    return (
      <Link
        to={`/category/${category.id}`}
        className="group border-t px-0 py-4 surface-line"
        style={{ borderColor: theme.accentLine }}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="eyebrow" style={{ color: theme.accent }}>
              {direction} {getCategoryLabel(category)}
            </span>
            <p className="mt-2 font-display text-xl leading-tight group-hover:underline">
              {category.title}
            </p>
          </div>
          <svg className={`h-5 w-5 text-[var(--ink)] transition-transform duration-200 ${direction === 'Previous' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={direction === 'Previous' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
          </svg>
        </div>
      </Link>
    );
  };

  return (
    <div className="grid gap-8 border-t pt-8 surface-line lg:grid-cols-[1fr_auto_1fr] lg:items-start">
      <div>{prevCategory ? <NavLinkCard category={prevCategory} direction="Previous" /> : null}</div>
      <Link
        to="/"
        className="inline-flex items-center justify-center border border-[rgba(18,23,43,0.16)] px-5 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--ink)] hover:border-[var(--best-brass)] hover:bg-white/50"
      >
        Back to Index
      </Link>
      <div>{nextCategory ? <NavLinkCard category={nextCategory} direction="Next" /> : null}</div>
    </div>
  );
};

export default CategoryNav;
