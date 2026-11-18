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
        className={`inline-flex items-center gap-2 select-none ${
          isBadge
            ? "bg-[#0E241B]/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/15"
            : ""
        } ${className}`}
      >
        <img
          src="/img/pdf-guide/logos/dht-hexagon-icon.png"
          alt="DHT"
          className={isBadge ? "w-4 h-4 object-contain" : "w-6 h-6 object-contain"}
        />
        <span
          className={`font-body font-extrabold tracking-wider uppercase leading-none ${
            isBadge
              ? "text-xs text-white"
              : isLight
              ? "text-xl text-white"
              : "text-lg text-[#132A1F]"
          }`}
        >
          DHT<sup className="text-[9px] font-normal ml-0.5">®</sup>
        </span>
      </span>
    );
  }

  if (brand === "JAGER") {
    return (
      <span
        className={`inline-flex items-center gap-1 select-none ${
          isBadge
            ? "bg-[#1A1A1A]/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/15"
            : ""
        } ${className}`}
      >
        <svg
          viewBox="0 0 34 32"
          className={isBadge ? "w-4 h-4 shrink-0" : "w-6 h-6 shrink-0"}
          fill="none"
          aria-hidden="true"
        >
          {/* Two orange-red dots above J */}
          <circle cx="19" cy="5" r="2.3" fill="#E03C1F" />
          <circle cx="25.5" cy="5" r="2.3" fill="#E03C1F" />
          {/* Stylized J curve with small step */}
          <path
            d="M23 9.5V20.5C23 25.2 19.5 28 14.8 28C10.2 28 7 25.2 7 21.2H11.5C11.5 23.1 12.8 24.2 14.8 24.2C16.9 24.2 18.4 22.9 18.4 20.5V9.5H23Z"
            fill="#E03C1F"
          />
          <rect x="6.5" y="14" width="5" height="3.2" rx="0.8" fill="#E03C1F" />
        </svg>
        <span
          className={`font-body font-extrabold tracking-[0.06em] uppercase leading-none ${
            isBadge
              ? "text-xs text-white"
              : isLight
              ? "text-xl text-white"
              : "text-lg text-[#132A1F]"
          }`}
        >
          AGER<sup className="text-[9px] font-normal ml-0.5">®</sup>
        </span>
      </span>
    );
  }

  if (brand === "THE ONE") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 select-none ${
          isBadge
            ? "bg-[#0D5C9E]/95 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/20"
            : ""
        } ${className}`}
      >
        <svg
          viewBox="0 0 36 32"
          className={isBadge ? "w-4 h-4 shrink-0" : "w-6 h-6 shrink-0"}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 5C4 3.9 4.9 3 6 3H30C31.1 3 32 3.9 32 5V16C32 22.8 25.5 27.6 18 29.5C10.5 27.6 4 22.8 4 16V5Z"
            fill={isBadge ? "#FFFFFF" : "#0D5C9E"}
            fillOpacity={isBadge ? 0.2 : 1}
            stroke={isBadge || isLight ? "#60A5FA" : "#0D5C9E"}
            strokeWidth="1.5"
          />
          <path
            d="M11 16L15.5 11.5L20 16L15.5 20.5L11 16ZM16 16L20.5 11.5L25 16L20.5 20.5L16 16Z"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className={`font-body font-extrabold tracking-[0.04em] uppercase leading-none ${
            isBadge
              ? "text-xs text-white"
              : isLight
              ? "text-lg text-white"
              : "text-base text-[#0D5C9E]"
          }`}
        >
          THE ONE<sup className="text-[9px] font-normal ml-0.5">®</sup>
        </span>
      </span>
    );
  }

  // MEKONG
  return (
    <span
      className={`inline-flex items-center gap-1.5 select-none ${
        isBadge
          ? "bg-[#0E241B]/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/15"
          : ""
      } ${className}`}
    >
      <svg
        viewBox="0 0 32 30"
        className={isBadge ? "w-4 h-4 shrink-0" : "w-6 h-6 shrink-0"}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M16 4L28 10L16 16L4 10L16 4Z"
          stroke={isBadge || isLight ? "#E5B869" : "#173C2C"}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M4 15L16 21L28 15"
          stroke={isBadge || isLight ? "#E5B869" : "#173C2C"}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 20L16 26L28 20"
          stroke={isBadge || isLight ? "#E5B869" : "#173C2C"}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={`font-body font-extrabold tracking-[0.05em] uppercase leading-none ${
          isBadge
            ? "text-xs text-white"
            : isLight
            ? "text-xl text-white"
            : "text-lg text-[#132A1F]"
        }`}
      >
        MEKONG<sup className="text-[9px] font-normal ml-0.5">®</sup>
      </span>
    </span>
  );
}
