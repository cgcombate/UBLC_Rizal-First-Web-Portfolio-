const Footer = () => {
  return (
    <footer className="mt-auto border-t surface-line">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 text-sm text-soft md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-[var(--best-brass)]">Reflection Portfolio</p>
            <p className="mt-2 font-display text-xl text-[var(--ink)]">
              How I Live UB&apos;s Core Values &amp; BEST Attributes
            </p>
          </div>
          <p className="max-w-md text-sm leading-6">
            Preserving the original seven categories, image set, and routing while presenting the
            work through a more editorial visual language.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
