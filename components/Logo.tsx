export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="12" fill="#0F3D2C" />
      <rect x="2" y="2" width="44" height="44" rx="10" stroke="#C9A227" strokeWidth="1.5" opacity="0.85" />
      <path d="M16 12v24" stroke="#EFE6D4" strokeWidth="3.2" strokeLinecap="round" />
      <path
        d="M16 24L32 12M16 24L33 36"
        stroke="#EFE6D4"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="33.5" cy="36" r="3.2" fill="#C9A227" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="brand">
      <LogoMark />
      <span className="wordmark">
        Kaamkar
        <small>Jobs · Pakistan & Gulf</small>
      </span>
    </span>
  );
}
