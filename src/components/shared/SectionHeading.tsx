import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accent?: "blue" | "purple" | "gold" | "green";
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  accent = "blue",
  align = "center",
}: SectionHeadingProps) {
  const glowClass = {
    blue: "from-accent-blue to-accent-purple",
    purple: "from-accent-purple to-accent-glow",
    gold: "from-accent-gold to-yellow-300",
    green: "from-accent-green to-cyan-400",
  }[accent];

  return (
    <motion.div
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2
        className={`text-3xl md:text-4xl font-display font-bold bg-gradient-to-r ${glowClass} bg-clip-text text-transparent`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-text-secondary max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div
        className={`mt-4 h-[2px] w-16 bg-gradient-to-r ${glowClass} ${
          align === "center" ? "mx-auto" : ""
        } rounded-full`}
      />
    </motion.div>
  );
}
