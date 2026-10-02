export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="kk-bg" x1="8" y1="4" x2="58" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#165C3F" />
          <stop offset="1" stopColor="#0B2E22" />
        </linearGradient>
        <linearGradient id="kk-gold" x1="18" y1="12" x2="54" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E8C86A" />
          <stop offset="1" stopColor="#B8891C" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#kk-bg)" />
      <rect x="2.5" y="2.5" width="59" height="59" rx="14" stroke="url(#kk-gold)" strokeWidth="1.4" opacity="0.7" />
      <path
        d="M18 16v32"
        stroke="#F6F1E4"
        strokeWidth="5.2"
        strokeLinecap="round"
      />
      <path
        d="M20.5 32.5L42 17"
        stroke="#F6F1E4"
        strokeWidth="5.2"
        strokeLinecap="round"
      />
      <path
        d="M20.5 32.5L46 47.5"
        stroke="url(#kk-gold)"
        strokeWidth="5.2"
        strokeLinecap="round"
      />
      <circle cx="46" cy="47.5" r="3.6" fill="#E8C86A" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="brand">
      <LogoMark />
      <span className="wordmark">
        <span className="wordmark-name">kaamkar.com</span>
        <small>Pakistan & Gulf jobs</small>
      </span>
    </span>
  );
}
