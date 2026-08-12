const SealMark = ({ className = '', tone = 'default' }) => {
  const stroke = tone === 'muted' ? 'currentColor' : '#12172B';
  const accent = tone === 'muted' ? 'currentColor' : '#B08D57';

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="60" cy="60" r="51" stroke={stroke} strokeWidth="1.5" opacity="0.9" />
      <circle cx="60" cy="60" r="39" stroke={accent} strokeWidth="1.5" opacity="0.85" />
      <path
        d="M60 22L66 34H54L60 22ZM24 60l12-6v12L24 60Zm72-6 12 6-12 6V54ZM60 98l-6-12h12l-6 12Z"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M41 40v40m0-40c10 0 15 3 19 8 4-5 9-8 19-8m-19 8v32m0-32c4 5 9 8 19 8m-19-8c-4 5-9 8-19 8"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 85c9-8 17-12 25-12s16 4 25 12"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SealMark;
