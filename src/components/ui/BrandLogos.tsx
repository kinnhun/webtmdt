import type { BrandLogoProps, DhtHorizontalLogoProps } from "@/types/dht.types";

export function DhtHorizontalLogo({
  className = "",
  iconSize = 36,
  textClassName = "text-lg sm:text-xl",
}: DhtHorizontalLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <img
        src="/img/pdf-guide/logos/dht-hexagon-icon.png"
        alt="DHT Furniture"
        width={iconSize}
        height={iconSize}
        className="object-contain shrink-0"
      />
      <span
        className={`font-body font-extrabold tracking-[0.06em] uppercase leading-none flex items-center gap-1.5 whitespace-nowrap ${textClassName}`}
      >
        <span className="text-[#D89B3C]">DHT</span>
        <span className="text-white">FURNITURE</span>
      </span>
    </span>
  );
}

export function BrandLogo({
  brand,
  variant = "color",
  className = "",
}: BrandLogoProps) {
  const isLight = variant === "light";
  const isBadge = variant === "badge";

  if (brand === "DHT") {
    return (
      <span
        className={`inline-flex items-center gap-2.5 select-none ${
          isBadge
            ? "bg-[#0E241B]/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/15"
            : ""
        } ${className}`}
      >
        <img
          src="/img/pdf-guide/logos/dht-hexagon-icon.png"
          alt="DHT"
          className={isBadge ? "w-4 h-4 object-contain" : "w-9 h-9 object-contain"}
        />
        <span
          className={`font-body font-extrabold tracking-[0.06em] uppercase leading-none ${
            isBadge
              ? "text-xs text-white"
              : isLight
              ? "text-[25px] text-white"
              : "text-lg text-[#132A1F]"
          }`}
        >
          DHT<sup className="text-[11px] font-normal ml-0.5">®</sup>
        </span>
      </span>
    );
  }

  if (brand === "JAGER") {
    return (
      <span
        className={`inline-flex items-center gap-0.5 select-none ${
          isBadge
            ? "bg-[#1A1A1A]/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/15"
            : ""
        } ${className}`}
      >
        <svg
          viewBox="0 0 34 36"
          className={isBadge ? "w-4 h-4 shrink-0" : "w-9 h-9 shrink-0 -mr-0.5 -mt-1.5"}
          fill="none"
          aria-hidden="true"
        >
          {/* Official left red dot + right golden-yellow dot */}
          <circle cx="17.5" cy="5.5" r="2.7" fill="#E03C1F" />
          <circle cx="25.2" cy="5.5" r="2.7" fill="#F4B629" />
          {/* Stylized crimson J mark */}
          <path
            d="M23.8 11V23C23.8 28 20 31.2 14.8 31.2C9.8 31.2 6.5 28.2 6.5 23.8H11.5C11.5 25.8 12.9 27.1 15 27.1C17.3 27.1 19 25.6 19 23V11H23.8Z"
            fill="#E03C1F"
          />
          <rect x="6.5" y="15.8" width="5.5" height="3.8" rx="0.8" fill="#E03C1F" />
        </svg>
        <span
          className={`font-body font-extrabold tracking-[0.06em] uppercase leading-none ${
            isBadge
              ? "text-xs text-white"
              : isLight
              ? "text-[25px] text-white"
              : "text-lg text-[#132A1F]"
          }`}
        >
          AGER<sup className="text-[11px] font-normal ml-0.5">®</sup>
        </span>
      </span>
    );
  }

  if (brand === "THE ONE") {
    if (isBadge) {
      return (
        <span
          className={`inline-flex items-center gap-1.5 select-none bg-[#0D5C9E]/95 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/20 ${className}`}
        >
          <svg viewBox="0 0 36 32" className="w-4 h-4 shrink-0" fill="none" aria-hidden="true">
            <path
              d="M4 5C4 3.9 4.9 3 6 3H30C31.1 3 32 3.9 32 5V16C32 22.8 25.5 27.6 18 29.5C10.5 27.6 4 22.8 4 16V5Z"
              fill="#FFFFFF"
              fillOpacity={0.2}
              stroke="#60A5FA"
              strokeWidth="1.5"
            />
            <path
              d="M11 16L15.5 11.5L20 16L15.5 20.5L11 16ZM16 16L20.5 11.5L25 16L20.5 20.5L16 16Z"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-body font-extrabold tracking-[0.04em] uppercase leading-none text-xs text-white">
            THE ONE<sup className="text-[9px] font-normal ml-0.5">®</sup>
          </span>
        </span>
      );
    }

    return (
      <span className={`inline-flex items-center select-none ${className}`}>
        <svg
          viewBox="0 0 120 50"
          className="h-[42px] w-auto shrink-0"
          fill="none"
          aria-label="THE ONE"
        >
          <defs>
            <linearGradient id="theone-shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1D84DB" />
              <stop offset="100%" stopColor="#0A59A2" />
            </linearGradient>
          </defs>
          {/* Official THE ONE Blue Curved Shield */}
          <path
            d="M4 7C4 3.69 6.69 1 10 1H110C113.31 1 116 3.69 116 7V24.5C116 37.5 87.5 46.8 60 48.5C32.5 46.8 4 37.5 4 24.5V7Z"
            fill="url(#theone-shield-grad)"
          />
          <text
            x="57"
            y="21"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="15.5"
            fontWeight="800"
            letterSpacing="0.04em"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            THE ONE
          </text>
          <text x="99" y="14" fill="#FFFFFF" fontSize="7.5" fontWeight="600">
            ®
          </text>
          {/* White interlocking double-diamond emblem */}
          <path
            d="M46 33.5L53.5 27L61 33.5L53.5 40L46 33.5ZM59 33.5L66.5 27L74 33.5L66.5 40L59 33.5Z"
            stroke="#FFFFFF"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  // MEKONG — Official 5-Petal Lotus sitting atop M + Golden MDF + Mekong®
  if (isBadge) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 select-none bg-[#0E241B]/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/15 ${className}`}
      >
        <svg viewBox="0 0 46 34" className="w-5 h-4 shrink-0" fill="none" aria-hidden="true">
          <path d="M23 3C26.2 9.2 26.5 17.5 23 24C19.5 17.5 19.8 9.2 23 3Z" fill="#F6EFE0" />
          <path d="M12.5 7.5C17.8 11.2 20.5 18 20 25C14.2 21.5 11.5 14.5 12.5 7.5Z" fill="#EFE5CF" />
          <path d="M33.5 7.5C28.2 11.2 25.5 18 26 25C31.8 21.5 34.5 14.5 33.5 7.5Z" fill="#EFE5CF" />
          <path d="M4.5 15.5C10.8 16.2 16 20.2 18 26.5C11.2 26.2 6.2 21.8 4.5 15.5Z" fill="#E3D4B5" />
          <path d="M41.5 15.5C35.2 16.2 30 20.2 28 26.5C34.8 26.2 39.8 21.8 41.5 15.5Z" fill="#E3D4B5" />
        </svg>
        <span className="font-body font-extrabold tracking-[0.05em] uppercase leading-none text-xs text-white">
          MEKONG<sup className="text-[9px] font-normal ml-0.5">®</sup>
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 132 54"
        className="h-[46px] w-auto shrink-0"
        fill="none"
        aria-label="MDF Mekong"
      >
        {/* 5-Petal Lotus Bloom above stylized M */}
        <path
          d="M27 2C30.8 8.5 31 17.5 27 24.5C23 17.5 23.2 8.5 27 2Z"
          fill={isLight ? "#F8F1E1" : "#173C2C"}
        />
        <path
          d="M15.5 7C21.2 11 24.2 18 23.8 25.5C17.5 21.8 14.2 14.5 15.5 7Z"
          fill={isLight ? "#F0E6CE" : "#245741"}
        />
        <path
          d="M38.5 7C32.8 11 29.8 18 30.2 25.5C36.5 21.8 39.8 14.5 38.5 7Z"
          fill={isLight ? "#F0E6CE" : "#245741"}
        />
        <path
          d="M5 15.5C12.2 16.5 18 21 20.5 27.5C13 27.2 7.2 22.5 5 15.5Z"
          fill={isLight ? "#E6D7B7" : "#B27B42"}
        />
        <path
          d="M49 15.5C41.8 16.5 36 21 33.5 27.5C41 27.2 46.8 22.5 49 15.5Z"
          fill={isLight ? "#E6D7B7" : "#B27B42"}
        />

        {/* Warm Orange-Gold 'MDF' to the right of the lotus */}
        <text
          x="56"
          y="24"
          fill="#E59A34"
          fontSize="14.5"
          fontWeight="800"
          letterSpacing="0.06em"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          MDF
        </text>

        {/* Stylized 'Mekong®' seamlessly anchored beneath lotus & MDF */}
        <text
          x="16"
          y="46"
          fill={isLight ? "#FFFFFF" : "#132A1F"}
          fontSize="24"
          fontWeight="500"
          letterSpacing="0.01em"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Mekong
        </text>
        <text
          x="105"
          y="36"
          fill={isLight ? "#FFFFFF" : "#132A1F"}
          fontSize="8.5"
          fontWeight="500"
        >
          ®
        </text>
      </svg>
    </span>
  );
}
