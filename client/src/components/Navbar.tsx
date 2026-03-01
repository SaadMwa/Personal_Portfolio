import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";

type SectionId = "home" | "projects" | "contact";

const navItems: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const NAVBAR_OFFSET = 88;

export function Navbar() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: SectionId) => {
    const target = document.getElementById(id);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#111111]/95 backdrop-blur">
      <nav className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-6 text-white">
        <button
          onClick={() => scrollToSection("home")}
          className="text-lg font-display font-semibold tracking-wide"
        >
          Portfolio
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "text-sm font-semibold transition-colors",
                activeSection === item.id ? "text-primary" : "text-white hover:text-primary",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded border border-white/20 p-2 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#111111] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "w-full rounded px-3 py-2 text-left text-sm font-semibold transition-colors",
                  activeSection === item.id
                    ? "bg-primary/20 text-primary"
                    : "text-white hover:bg-white/10 hover:text-primary",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
