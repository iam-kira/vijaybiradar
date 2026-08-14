"use client";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectSection } from "@/components/architecture/ProjectSection";
import { projects } from "@/data/projects";

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Architecture Gallery"
          subtitle="Five systems. Real problems. Real platforms."
          accent="blue"
        />
        <div className="space-y-20">
          {projects.map((project, i) => (
            <ProjectSection key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
