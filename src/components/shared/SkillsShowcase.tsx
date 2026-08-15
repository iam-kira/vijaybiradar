"use client";

import { motion } from "framer-motion";
import { AnimatedSkillCard } from "@/components/shared/AnimatedSkillCard";
import { BentoGrid, BentoGridItem } from "@/components/shared/BentoGrid";
import { AnimatedTooltip } from "@/components/shared/AnimatedTooltip";
import { EnhancedButton } from "@/components/shared/EnhancedButton";
import { TextMorph } from "@/components/shared/TextMorph";

interface SkillsShowcaseProps {
  title?: string;
  subtitle?: string;
  showGrid?: boolean;
  showBento?: boolean;
}

const skills = [
  {
    title: "Data Engineering",
    description: "ETL pipelines, SQL optimization, data warehousing",
    category: "engineering" as const,
    icon: "🏗️",
  },
  {
    title: "AI & ML",
    description: "Model training, vector search, prompt optimization",
    category: "engineering" as const,
    icon: "🤖",
  },
  {
    title: "Cloud Architecture",
    description: "Azure infrastructure, scalability, performance",
    category: "engineering" as const,
    icon: "☁️",
  },
  {
    title: "Cybersecurity",
    description: "Threat detection, vulnerability management, compliance",
    category: "security" as const,
    icon: "🛡️",
  },
  {
    title: "System Design",
    description: "Enterprise systems, microservices, distributed computing",
    category: "engineering" as const,
    icon: "🔧",
  },
  {
    title: "Leadership",
    description: "Team mentoring, strategic planning, culture building",
    category: "leadership" as const,
    icon: "👥",
  },
];

const bentoSkills = [
  {
    title: "SQL & Databases",
    description: "Advanced query optimization and database design",
    icon: "📊",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Talend Platform",
    description: "ETL orchestration and data integration",
    icon: "🔄",
    gradient: "from-purple-500/20 to-blue-500/20",
    span: "col-span-2" as const,
  },
  {
    title: "Azure Ecosystem",
    description: "Data Factory, Synapse, Cognitive Services",
    icon: "☁️",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "Python & Scripting",
    description: "Automation, data processing, ML frameworks",
    icon: "🐍",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "AI Innovation",
    description: "LLM integration, RAG systems, prompt engineering",
    icon: "✨",
    gradient: "from-amber-500/20 to-orange-500/20",
    span: "col-span-2" as const,
  },
];

export function SkillsShowcase({
  title = "Conqueror of Complexity",
  subtitle = "Skills that Transform Chaos into Clarity",
  showGrid = true,
  showBento = true,
}: SkillsShowcaseProps) {
  return (
    <div className="w-full py-20 px-4 md:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </motion.div>

      {/* Grid Skills View */}
      {showGrid && (
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-white mb-8 text-center"
          >
            Core Competencies
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {skills.map((skill, i) => (
              <AnimatedTooltip
                key={`${skill.title}-${i}`}
                content={`Master of ${skill.title}`}
                side="top"
                delay={i * 0.1}
              >
                <AnimatedSkillCard
                  {...skill}
                  delay={i * 0.1}
                />
              </AnimatedTooltip>
            ))}
          </div>
        </div>
      )}

      {/* Bento Grid Skills View */}
      {showBento && (
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-white mb-8 text-center"
          >
            Technical Arsenal
          </motion.h3>

          <BentoGrid className="max-w-5xl mx-auto">
            {bentoSkills.map((skill, i) => (
              <BentoGridItem
                key={`${skill.title}-${i}`}
                {...skill}
                delay={i * 0.1}
              />
            ))}
          </BentoGrid>
        </div>
      )}

      {/* Text Morph Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center py-12 border-t border-white/10 mt-20"
      >
        <p className="text-gray-300 mb-6 text-lg">
          Specialized in transforming
        </p>
        <TextMorph
          words={[
            "Complexity",
            "Challenges",
            "Chaos",
            "Data",
            "Ideas",
          ]}
          duration={4}
          className="text-3xl md:text-4xl font-bold"
          colors={[
            "text-blue-400",
            "text-purple-400",
            "text-red-400",
            "text-cyan-400",
            "text-yellow-400",
          ]}
        />
        <p className="text-gray-300 mt-6 text-lg">into Impact</p>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-4 mt-12"
      >
        <EnhancedButton
          variant="primary"
          size="lg"
          href="/resume"
        >
          View Full Resume
        </EnhancedButton>
        <EnhancedButton
          variant="secondary"
          size="lg"
          href="/contact"
        >
          Start a Mission
        </EnhancedButton>
      </motion.div>
    </div>
  );
}
