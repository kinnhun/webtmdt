import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function ReadyToWorkTogether() {
  const { t, i18n } = useTranslation();
  const isVi = i18n.language?.startsWith("vi");

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28 flex items-center justify-center border-t border-white/10"
      style={{ backgroundColor: "#173C2C" }}
    >
      <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="font-display font-bold text-white mb-5 leading-tight"
          style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.6rem)" }}
        >
          {t(
            "home.cta.heading",
            isVi
              ? "Trao đổi với DHT về nhu cầu nội thất của bạn."
              : "Let’s Discuss Your Furniture Requirements."
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-body text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-10"
        >
          {t(
            "home.cta.description",
            isVi
              ? "Hãy cho chúng tôi biết nhu cầu của bạn: bộ sưu tập ngoài trời, nội thất trong nhà hoặc giải pháp cho dự án. Chia sẻ thị trường mục tiêu, số lượng dự kiến và tiến độ. DHT sẽ phối hợp các bước tiếp theo với đội ngũ phù hợp."
              : "Tell us what you need - outdoor collections, indoor furniture or project solutions. Share your target market, estimated quantity and timeline. DHT will coordinate the next steps with the relevant team."
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/contact?type=proposal"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90 w-full sm:w-auto shadow-md"
            style={{ backgroundColor: "hsl(var(--orange))" }}
          >
            {t("home.cta.btn1", isVi ? "Yêu cầu Báo giá" : "Request a Quotation")}
          </Link>
          <a
            href="/DHT_Company_Profile_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm font-body font-semibold text-sm text-white/90 border border-white/25 bg-white/5 hover:bg-white/10 transition-all w-full sm:w-auto"
          >
            {t("home.cta.btn2", isVi ? "Tải Hồ sơ Năng lực (PDF)" : "Download Company Profile (PDF)")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
