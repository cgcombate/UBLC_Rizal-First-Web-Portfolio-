import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { getCategoryLabel, getCategoryTheme } from '../utils/categoryTheme';

const CategoryQuickNav = ({ currentCategoryId }) => {
  const coreValues = categories.filter(
    (category) => category.group === 'Core Value'
  );
  const bestAttributes = categories.filter(
    (category) => category.group === 'BEST Attribute'
  );

  const QuickLink = ({ category }) => {
    const theme = getCategoryTheme(category);
    const accent =
      category.group === 'Core Value' ? theme.accent : theme.accentAlt;
    const isActive = category.id === currentCategoryId;

    return (
      <li key={category.id}>
        <Link
          to={`/category/${category.id}`}
          className={`group inline-flex items-center gap-2 border px-3.5 py-2 transition-all duration-200 ${
            isActive
              ? 'bg-white/60 shadow-[0_4px_14px_rgba(18,23,43,0.08)]'
              : 'border-[rgba(18,23,43,0.1)] hover:bg-white/60 hover:shadow-[0_4px_14px_rgba(18,23,43,0.08)]'
          }`}
          style={isActive ? { borderColor: accent } : undefined}
          aria-current={isActive ? 'page' : undefined}
        >
          <span className="eyebrow" style={{ color: accent }}>
            {getCategoryLabel(category)}
          </span>
          <span
            className={`hidden font-display text-[13px] italic leading-none normal-case tracking-normal sm:inline ${
              isActive
                ? 'text-[var(--ink)]'
                : 'text-soft group-hover:text-[var(--ink)]'
            }`}
          >
            {category.title}
          </span>
        </Link>
      </li>
    );
  };

  const GroupRow = ({ eyebrow, accent, items }) => (
    <div>
      <span className="eyebrow" style={{ color: accent }}>
        {eyebrow}
      </span>
      <ul className="mt-2 flex flex-wrap items-center gap-2">
        {items.map((category) => (
          <QuickLink key={category.id} category={category} />
        ))}
      </ul>
    </div>
  );

  return (
    <nav
      className="mt-10 border-t pt-6 surface-line"
      aria-label="Quick navigation between reflection categories"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="eyebrow text-[var(--ink)]">Browse All Reels</p>
        <p className="text-xs text-soft">Jump to any category.</p>
      </div>

      <div className="flex flex-col gap-3">
        <GroupRow eyebrow="Core Values" accent="#6B2737" items={coreValues} />
        <GroupRow eyebrow="BEST" accent="#B08D57" items={bestAttributes} />
      </div>
    </nav>
  );
};

export default CategoryQuickNav;