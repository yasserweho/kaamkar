export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="16" fill="#0B2E22" />
      <path d="M18 16v32" stroke="#F6F1E4" strokeWidth="5.2" strokeLinecap="round" />
      <path d="M20.5 32.5L42 17" stroke="#F6F1E4" strokeWidth="5.2" strokeLinecap="round" />
      <path d="M20.5 32.5L46 47.5" stroke="#E8C86A" strokeWidth="5.2" strokeLinecap="round" />
      <circle cx="46" cy="47.5" r="3.6" fill="#E8C86A" />
    </svg>
  );
}
