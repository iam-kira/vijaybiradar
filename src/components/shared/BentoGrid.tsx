"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoGridItemProps {
  title: string;
  description: string;
  icon?: ReactNode;
  span?: "col-span-1" | "col-span-2" | "col-span-3";
  span_row?: "row-span-1" | "row-span-2" | "row-span-3";
  gradient?: string;
  children?: ReactNode;
  delay?: number;
}

export function BentoGridItem({
  title,
  description,
  icon,
  span = "col-span-1",
  span_row = "row-span-1",
  gradient = "from-blue-500/20 to-purple-500/20",
  children,
  delay = 0,
}: BentoGridItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)",
      }}
      className={`group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${gradient} backdrop-blur-sm p-6 cursor-pointer ${span} ${span_row}`}
    >
      {/* Animated border on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(168, 85, 247, 0.5))",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {icon && (
          <motion.div
            className="text-4xl mb-3"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {icon}
          </motion.div>
        )}

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-gray-300 group-hover:text-gray-100 transition-colors mb-4">
          {description}
        </p>

        {children}
      </div>

      {/* Bottom accent bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-max ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
