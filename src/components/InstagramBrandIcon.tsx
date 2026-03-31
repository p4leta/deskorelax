type InstagramBrandIconProps = {
  size?: number;
  className?: string;
};

const InstagramBrandIcon = ({ size = 24, className }: InstagramBrandIconProps) => {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="instagram-brand-gradient" x1="3" x2="21" y1="21" y2="3" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="28%" stopColor="#FA7E1E" />
          <stop offset="55%" stopColor="#D62976" />
          <stop offset="78%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect
        height="16"
        rx="4.5"
        stroke="url(#instagram-brand-gradient)"
        strokeWidth="2"
        width="16"
        x="4"
        y="4"
      />
      <circle cx="12" cy="12" r="3.5" stroke="url(#instagram-brand-gradient)" strokeWidth="2" />
      <circle cx="17.2" cy="6.8" fill="url(#instagram-brand-gradient)" r="1.2" />
    </svg>
  );
};

export default InstagramBrandIcon;
