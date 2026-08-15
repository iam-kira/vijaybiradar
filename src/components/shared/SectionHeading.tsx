import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accent?: "blue" | "purple" | "gold" | "green";
  align?: "left" | "center";
  numeral?: string;
}

export function SectionHeading({
  title,
  subtitle,
  accent = "blue",
  align = "center",
  numeral,
}: SectionHeadingProps) {
  const colorClass = {
    blue: "text-bronze",
    purple: "text-purple",
    gold: "text-gold-text",
    green: "text-gold-text",
  }[accent];

  return (
    <motion.div
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {numeral && (
        <span className={`mb-2 block font-chapter text-sm tracking-[0.4em] ${colorClass}`}>{numeral}</span>
      )}
      <h2 className={`text-3xl md:text-4xl font-display font-bold ${colorClass}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-text-secondary max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div
        className={`mt-4 h-[2px] w-16 bg-current ${colorClass} ${
          align === "center" ? "mx-auto" : ""
        } rounded-full opacity-60`}
      />
    </motion.div>
  );
}
