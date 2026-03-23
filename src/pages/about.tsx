import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { Award, Users, Truck, Shield, Globe, Leaf } from "lucide-react";
import MarqueeStrip from "@/components/MarqueeStrip";

const values = [
  { icon: Award, title: "Quality First", desc: "ISO 9001:2015 certified. Multi-stage quality control on every piece." },
  { icon: Users, title: "400+ Craftspeople", desc: "Skilled artisans with generations of furniture-making expertise." },
  { icon: Truck, title: "Global Export", desc: "Reliable shipping to 25+ countries with full documentation." },
  { icon: Shield, title: "Warranty", desc: "5-year structural warranty on all products." },
  { icon: Globe, title: "Custom OEM/ODM", desc: "Custom designs, finishes, and branding for your projects." },
  { icon: Leaf, title: "Sustainable", desc: "FSC-certified timber. Eco-friendly finishing processes." },
];

const timeline = [
  { year: "2008", title: "Founded", desc: "Started as a small workshop in Jakarta with 12 craftspeople." },
  { year: "2012", title: "ISO Certified", desc: "Achieved ISO 9001 certification. Expanded to 50 staff." },
  { year: "2016", title: "Export Expansion", desc: "First container shipments to Singapore, Australia, and Europe." },
  { year: "2020", title: "New Factory", desc: "Opened 5,000m² production facility with modern machinery." },
  { year: "2024", title: "25+ Countries", desc: "Serving hospitality and residential projects worldwide." },
];

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us — DHT Outdoor Furniture</title>
        <meta name="description" content="Learn about DHT Outdoor Furniture — 15+ years of furniture manufacturing excellence." />
      </Head>
      <div className="pt-20">
        <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "hsl(var(--navy-deep))" }}>
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop&q=85" alt="Factory" className="w-full h-full object-cover opacity-30" />
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-display font-bold text-white mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>About DHT</motion.h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="font-body text-white/60 text-base max-w-lg mx-auto">Premium outdoor furniture manufacturer. Crafting durable, weather-resistant pieces since 2008.</motion.p>
          </div>
        </section>

        <MarqueeStrip />

        <section className="py-24" style={{ backgroundColor: "hsl(var(--warm-cream))" }}>
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                  <span className="font-body text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>Our Story</span>
                </div>
                <h2 className="font-display font-bold text-foreground leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>From Workshop to World-Class Factory</h2>
                <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
                  <p>DHT Outdoor Furniture Production started in 2008 as a small workshop in Jakarta with just 12 craftspeople and a passion for quality.</p>
                  <p>Today, we operate a 5,000m² modern production facility with 400+ skilled artisans, exporting to 25+ countries. Our ISO 9001:2015 certification reflects our commitment to consistent quality.</p>
                  <p>We specialize in teak, solid wood, and weather-resistant materials — crafting furniture for hotels, resorts, restaurants, and luxury residences worldwide.</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-sm overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img src="https://images.unsplash.com/photo-1549497538-303791108f95?w=900&auto=format&fit=crop&q=85" alt="DHT production" className="w-full h-full object-cover" />
              </motion.div>
            </div>

            <div className="mb-24">
              <div className="text-center mb-12">
                <div className="flex items-center gap-3 justify-center mb-4">
                  <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                  <span className="font-body text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>Our Values</span>
                  <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                </div>
                <h2 className="font-display font-bold text-foreground" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Why Choose Us</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="bg-white rounded-sm p-7 border border-border hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded flex items-center justify-center mb-4" style={{ backgroundColor: "hsl(var(--orange)/0.1)" }}>
                      <Icon size={22} style={{ color: "hsl(var(--orange))" }} />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">{title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-center mb-12">
                <div className="flex items-center gap-3 justify-center mb-4">
                  <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                  <span className="font-body text-xs tracking-[0.25em] uppercase font-medium" style={{ color: "hsl(var(--orange))" }}>Journey</span>
                  <span className="h-px w-8" style={{ backgroundColor: "hsl(var(--orange))" }} />
                </div>
                <h2 className="font-display font-bold text-foreground" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Our Timeline</h2>
              </div>
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute left-6 top-0 bottom-0 w-px" style={{ backgroundColor: "hsl(var(--border))" }} />
                {timeline.map(({ year, title, desc }, i) => (
                  <motion.div key={year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="relative pl-16 pb-10 last:pb-0">
                    <div className="absolute left-3.5 top-1 w-5 h-5 rounded-full border-2 bg-white" style={{ borderColor: "hsl(var(--orange))" }} />
                    <span className="font-body text-xs font-bold tracking-wider uppercase" style={{ color: "hsl(var(--orange))" }}>{year}</span>
                    <h3 className="font-display font-semibold text-lg text-foreground mt-1 mb-1">{title}</h3>
                    <p className="font-body text-sm text-muted-foreground">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 text-center" style={{ backgroundColor: "hsl(var(--navy-deep))" }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="font-display font-bold text-white mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>Ready to Work Together?</motion.h2>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm font-body font-semibold text-sm text-white mt-4 hover:opacity-90 transition-all" style={{ backgroundColor: "hsl(var(--orange))" }}>Contact Us</Link>
        </section>
      </div>
    </>
  );
}
