import UBLogo from '../assets/UBlogo.png';

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b surface-line">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent" />
      <div className="absolute left-1/2 top-8 -translate-x-1/2 opacity-[0.08]">
        <img
          src={UBLogo}
          alt=""
          aria-hidden="true"
          className="h-auto w-[18rem] max-w-none object-contain md:w-[28rem]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="max-w-4xl">
          <p className="eyebrow mb-5 text-[var(--best-brass)]">Seven Categories. Thirty-Five Reflections.</p>
          <h1 className="font-display text-5xl leading-[0.95] tracking-[-0.03em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
            How I Live UB&apos;s Core Values &amp; BEST Attributes
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-soft sm:text-lg">
            A redesigned visual index of faith, wisdom, service, innovation, professionalism,
            citizenship, and lifelong learning, told through photographs and personal reflection.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
