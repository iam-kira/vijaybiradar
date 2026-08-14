"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { MeaningSection } from "@/components/identity/MeaningSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="The Meaning of Vijay"
          subtitle="A name is not just a label. It is an expectation."
          accent="purple"
        />
        <MeaningSection />
      </div>
    </div>
  );
}
