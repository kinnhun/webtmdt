import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Leaf, Play } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
const vp = { once: true, amount: 0.15 as const };

export default function FactoryVideoSection() {
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Map current language to the schema keys (vi, uk, us)
  const langKey = i18n.language === 'vi-VN' ? 'vi' : i18n.language === 'en-GB' ? 'uk' : 'us';

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/home-content");
        if (res.ok) {
          const json = await res.json();
          if (json) {
            setContent(json);
          }
        }
      } catch (err) {
        console.error("Failed to load factory video:", err);
      }
    })();
  }, []);

  if (!content || !content.factoryVideoUrl) return null;

  const isYouTube = content.factoryVideoUrl.includes('youtube') || content.factoryVideoUrl.includes('youtu.be');
  let videoId = null;
  let embedUrl = null;

  if (isYouTube) {
    // Extract YouTube video ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = content.factoryVideoUrl.match(regExp);
    videoId = match && match[2].length === 11 ? match[2] : null;
    
    // Autoplay is 1, controls=0 to hide bottom bar, modestbranding to remove logo
    if (videoId) {
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&playsinline=1&fs=0&iv_load_policy=3`;
    }
  }

  return (
    <section className="relative pb-20 sm:pb-32" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content - Editorial Style */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={vp} 
            transition={{ duration: 1, ease }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="h-[1px] w-12 inline-block" style={{ backgroundColor: "hsl(var(--orange))" }} />
              <span className="font-body text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>
                {t("home.video.label", "Craftsmanship")}
              </span>
            </div>
            
            <h2 className="font-display font-bold leading-[0.95] tracking-tight mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "hsl(var(--navy-deep))" }}>
              {content?.factoryVideoTitle1?.[langKey] || t("home.video.title1", "The Art of")}<br/>
              <span className="italic font-light" style={{ color: "hsl(var(--orange))" }}>{content?.factoryVideoTitle2?.[langKey] || t("home.video.title2", "Creation.")}</span>
            </h2>
            
            <p className="font-body text-base sm:text-lg leading-relaxed max-w-md" style={{ color: "hsl(var(--muted-foreground))" }}>
              {content?.factoryVideoDescription?.[langKey] || t("home.video.description", "Mỗi sản phẩm nội thất DHT đều bắt nguồn từ đôi bàn tay khéo léo và quy trình sản xuất chuẩn mực. Xem video để bước vào không gian sáng tạo nơi vật liệu tự nhiên hòa quyện cùng thiết kế đương đại.")}
            </p>
            
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full border-2 border-white bg-[#E2E8F0] overflow-hidden">
                  <img src="/img/WhoWeAre1.png" alt="Crafting" className="w-full h-full object-cover" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white bg-[#CBD5E0] overflow-hidden">
                   <img src="/img/WhoWeAre2.png" alt="Wood" className="w-full h-full object-cover" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white bg-[#EDF2F7] flex items-center justify-center text-xs font-bold text-[#4A5568]">
                  +50k
                </div>
              </div>
              <div className="font-body text-xs uppercase tracking-widest font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                {t("home.video.productionLabel", "Sản phẩm / Tháng")}
              </div>
            </div>
          </motion.div>

          {/* Video Player - Organic & Soft */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} 
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
            viewport={vp} 
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="lg:col-span-7 relative"
          >
            {/* Rotating Natural Badge */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -top-12 -left-12 sm:-top-16 sm:-left-16 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center shadow-lg z-20 hidden md:flex"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
                <path id="curve" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="transparent" />
                <text className="font-body text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.25em] font-bold" style={{ fill: "hsl(var(--navy-deep))" }}>
                  <textPath href="#curve" startOffset="0%">
                    • DHT OUTDOOR FURNITURE • DHT OUTDOOR FURNITURE
                  </textPath>
                </text>
              </svg>
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-[#D97706]" />
            </motion.div>

            {/* Elegant Video Frame */}
            <div className="relative rounded-[2rem] sm:rounded-[3rem] p-3 sm:p-4 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-[#EDF2F7]">
              <div className="relative w-full rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden bg-[#F7FAFC]" style={{ aspectRatio: "16/9" }}>
                {!isYouTube ? (
                  <video
                    src={content.factoryVideoUrl}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                ) : !isPlaying ? (
                  <div 
                    className="absolute inset-0 cursor-pointer group flex items-center justify-center overflow-hidden" 
                    onClick={() => setIsPlaying(true)}
                  >
                    <img 
                      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                      onError={(e) => {
                        // Fallback to hqdefault if maxresdefault doesn't exist
                        e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                      }}
                      alt="Factory Video Thumbnail" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#D97706] ml-2" />
                    </div>
                  </div>
                ) : (
                  <>
                    <iframe
                      src={embedUrl!}
                      title="Factory Tour Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full object-cover"
                    ></iframe>
                    {/* Invisible overlay to click and pause (goes back to thumbnail) */}
                    <div 
                      className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20"
                      onClick={() => setIsPlaying(false)}
                      title="Nhấn để tạm dừng"
                    >
                       <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 border-l-4 border-r-4 border-white h-8 w-8" style={{ width: '20px', height: '24px' }}></div>
                       </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Soft decorative blur behind the frame */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#D97706] opacity-[0.04] blur-[80px] -z-10 rounded-full pointer-events-none"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
