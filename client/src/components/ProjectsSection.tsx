import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { Reveal } from "@/components/Reveal";

type Project = {
  name: string;
  description: string;
  challengeSolved: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
};

const projects: Project[] = [
  {
    name: "AI Business Management SaaS",
    description:
      "A multi-tenant AI-powered business management platform for operations and analytics workflows.",
    challengeSolved:
      "Designed a scalable architecture for high-volume business data while keeping dashboards responsive.",
    techStack: ["React", "TypeScript", "Node.js", "MongoDB", "Gemini API"],
    githubUrl: "https://github.com/username/businessflow-ai",
    liveUrl: "https://businessflow-ai.vercel.app",
  },
  {
    name: "Moody Journal",
    description:
      "A mood tracking journal that combines reflections with sentiment analysis and trend insights.",
    challengeSolved:
      "Built efficient mood trend visualization to handle large journal history without UI lag.",
    techStack: ["React", "Node.js", "TypeScript,TailwindCSS"],
    githubUrl: "https://github.com/SaadMwa/Moody_Journal.git",
    liveUrl: "https://saadmwa.github.io/Moody_Journal/",
  },
  {
    name: "SyncNotes",
    description:
      "A collaborative notes app with real-time updates across devices and offline-friendly editing. offLine First artchiticture using indexedDB, Automatic Sync when connection is restored",
    challengeSolved:
      "Implemented conflict-safe sync logic for concurrent edits to prevent lost changes.",
    techStack: ["React", "Node.js", "Express", "indexedDB", "Redis"],
    githubUrl: "https://github.com/SaadMwa/syncnotes..git",
    liveUrl: "  https://syncnotes-omega.vercel.app/",
  
  },
  {
    name: "FairShare",
    description:
      "A group expense splitter with settlement optimization and recurring balance tracking.",
    challengeSolved:
      "Solved complex split calculations to minimize transactions and keep settlements transparent.",
    techStack: ["React", "Node.js", "SQL", "Auth0"],
    githubUrl: "https://github.com/SaadMwa/bill-splitter-webapp-saad.git",
    liveUrl: "https://saadmwa.github.io/bill-splitter-webapp-saad/",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-28">
      <Reveal>
        <h2 className="text-sm tracking-widest text-primary mb-12 font-bold uppercase flex items-center gap-3">
          <span className="w-12 h-[1px] bg-primary"></span>
          Projects
        </h2>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, idx) => (
          <Reveal key={project.name} delay={idx * 0.08}>
            <article className="flex h-full flex-col border border-border bg-card p-8 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1">
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                {project.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>

              <p className="mb-5 text-sm leading-relaxed text-foreground/90 border-l-2 border-primary/60 pl-4">
                <span className="font-semibold text-primary">Challenge solved:</span>{" "}
                {project.challengeSolved}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-[6px] bg-[#333333] px-5 py-[10px] text-[14px] font-semibold text-white transition-all duration-200 hover:bg-[#444444] hover:-translate-y-0.5"
                >
                  <FaGithub className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-[6px] bg-[#22c55e] px-5 py-[10px] text-[14px] font-semibold text-black transition-all duration-200 hover:bg-[#16a34a] hover:-translate-y-0.5"
                >
                  <FiExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
