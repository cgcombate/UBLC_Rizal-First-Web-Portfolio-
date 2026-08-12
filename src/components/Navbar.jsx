import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UBLogo from '../assets/UBlogo.png';

const Navbar = () => {
  const [isCompressed, setIsCompressed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompressed(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b surface-line backdrop-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between gap-4 ${
            isCompressed ? 'py-3' : 'py-4 md:py-5'
          }`}
        >
          <Link
            to="/"
            className="group inline-flex min-w-0 items-center gap-3 text-[var(--ink)]"
          >
            <img
              src={UBLogo}
              alt="University of Batangas logo"
              className="h-10 w-auto max-w-[8.5rem] shrink-0 object-contain"
            />
            <div className="min-w-0">
              <span className="eyebrow text-[var(--best-brass)]">UB Values Portfolio</span>
              <p className="font-display text-lg leading-tight md:text-xl">
                How I Live UB&apos;s Core Values &amp; BEST Attributes
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-5 text-sm font-medium text-[var(--ink)]">
            <Link
              to="/"
              className="relative pb-1 text-xs uppercase tracking-[0.22em] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[var(--ink)] after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100 sm:text-sm"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;