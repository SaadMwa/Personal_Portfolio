import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { 
  Zap, ArrowDown, ExternalLink, Code2, 
  Terminal, Server, Database, CheckCircle2,
  Mail, Github, Linkedin, FileText, Send,
  Cpu, Activity
} from "lucide-react";
import { z } from "zod";

import { useCreateMessage } from "@/hooks/use-messages";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CursorTrail } from "@/components/CursorTrail";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// --- Types & Data ---
type MessageForm = z.infer<typeof api.messages.create.input>;

const projects = [
  {
    title: "BusinessFlow AI",
    badge: "FEATURED · AI SAAS",
    description: "AI-powered business management platform that processes high volumes of transactions. Built for real SMBs, not tutorials.",
    hook: "What makes this different: I designed the multi-tenant architecture from scratch, implemented real-time dashboards, and integrated OpenAI APIs for business insights. This isn't a simple CRUD app.",
    tech: "React · TypeScript · Node.js · MongoDB · OpenAI",
    impact: "Scalable architecture processing massive real-world data",
    icon: Activity
  },
  {
    title: "Moody Journal",
    badge: "AI APP",
    description: "Sentiment analysis that tracks emotional patterns over time.",
    hook: "Built a custom NLP pipeline and visualized complex mood trends with optimized charting libraries.",
    tech: "React · Node.js · NLP APIs · PostgreSQL",
    impact: "High-performance data visualization",
    icon: Zap
  },
  {
    title: "SyncNotes",
    badge: "FULL STACK",
    description: "Real-time collaborative workspace across devices with offline support.",
    hook: "Implemented WebSockets and CRDTs for seamless conflict resolution during concurrent editing.",
    tech: "React · WebSockets · Express · Redis",
    impact: "Sub-50ms latency synchronization",
    icon: Terminal
  },
  {
    title: "FairShare",
    badge: "FINTECH",
    description: "Split expenses with complex group logic and automated settlement.",
    hook: "Engineered algorithms to handle uneven splits, recurring IOUs, and minimal transaction path settlements.",
    tech: "React · Node.js · SQL · Auth0",
    impact: "Complex algorithmic problem solving",
    icon: Database
  }
];

export default function Home() {
  const { toast } = useToast();
  const createMessage = useCreateMessage();
  const [isCopied, setIsCopied] = useState(false);

  const form = useForm<MessageForm>({
    resolver: zodResolver(api.messages.create.input),
    defaultValues: { email: "", message: "" }
  });

  const onSubmit = (data: MessageForm) => {
    createMessage.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@engineer.dev");
    setIsCopied(true);
    toast({ title: "Copied!", description: "Email copied to clipboard." });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-primary selection:text-black font-sans">
      <ScrollProgress />
      <CursorTrail />

      {/* SECTION 1: THE 5-SECOND HOOK */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20">
        <div className="max-w-5xl mx-auto w-full flex flex-col items-start z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 border border-primary px-4 py-2 bg-primary/5 text-primary text-xs tracking-widest font-bold uppercase animate-pulse-border inline-flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-primary" />
            OPEN TO INDUSTRY LEADING OPPORTUNITIES
          </motion.div>

          <Reveal>
            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold font-display leading-[1.1] mb-6 text-foreground">
              FULL STACK ENGINEER
              <span className="block text-muted-foreground mt-2">
                who builds AI products
              </span>
              <span className="block text-primary text-glow underline decoration-2 underline-offset-8 mt-2">
                that actually ship.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed border-l-2 border-muted pl-6">
              Built 4 production-ready apps including an AI SaaS platform handling high-volume transactions. 
              Strong fundamentals: C/C++, Python, OOP.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <button 
              onClick={scrollToContact}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-5 flex items-center gap-3 transition-all duration-300 hover-shake box-glow"
            >
              <ExternalLink className="w-6 h-6" />
              SEE WHY I'M DIFFERENT
            </button>
          </Reveal>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-sm cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => document.getElementById('metrics')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span>Scroll to see architecture</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* SECTION 2: METRICS BAR */}
      <section id="metrics" className="w-full bg-card border-y border-border py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-border">
          {[
            { value: "High Vol.", label: "Transactions Processed", sub: "(AI SaaS beta)" },
            { value: "4", label: "Production Apps Built", sub: "(Shipped & Live)" },
            { value: "100%", label: "Self-taught Fundamentals", sub: "(C/C++/Python/Sys Design)" }
          ].map((metric, i) => (
            <div key={i} className="flex flex-col items-center text-center group pt-8 md:pt-0 first:pt-0">
              <Reveal delay={i * 0.1}>
                <span className="text-5xl md:text-6xl font-bold font-display text-primary text-glow block mb-2 transition-transform duration-300 group-hover:scale-110">
                  {metric.value}
                </span>
                <span className="text-lg font-bold text-foreground block mb-1">{metric.label}</span>
                <span className="text-sm text-muted-foreground">{metric.sub}</span>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: PROJECTS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-sm tracking-widest text-primary mb-12 font-bold uppercase flex items-center gap-3">
            <span className="w-12 h-[1px] bg-primary"></span>
            Projects that scream "Interview Me"
          </h2>
        </Reveal>

        <div className="flex flex-col gap-12">
          {projects.map((project, idx) => (
            <Reveal key={idx} delay={0.1}>
              <div className={`group bg-card border border-border p-8 md:p-12 transition-all duration-500 hover:border-muted-foreground/30 hover:bg-[#151515] flex flex-col ${idx === 0 ? 'lg:flex-row gap-12' : 'gap-6'} items-start`}>
                
                <div className={idx === 0 ? 'lg:w-5/12' : 'w-full'}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-bold tracking-wider text-primary bg-primary/10 px-3 py-1 border border-primary/20">
                      {project.badge}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="bg-background border border-border p-5 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
                    <p className="text-sm text-foreground/90 italic leading-relaxed font-mono">
                      "{project.hook}"
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.split('·').map(t => (
                      <span key={t} className="text-xs text-muted-foreground bg-background px-2 py-1 border border-border">
                        {t.trim()}
                      </span>
                    ))}
                  </div>

                  <button className="text-primary hover:text-foreground font-bold flex items-center gap-2 text-sm transition-colors border-b border-primary/30 hover:border-foreground pb-1">
                    <ExternalLink className="w-4 h-4" />
                    SEE IT LIVE
                  </button>
                </div>

                {/* Right side specifically for the first featured project to show architecture */}
                {idx === 0 && (
                  <div className="lg:w-7/12 w-full bg-background border border-border p-8 flex flex-col justify-center items-center min-h-[300px] relative overflow-hidden group-hover:border-primary/30 transition-colors">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    
                    <div className="z-10 flex flex-col items-center text-center">
                      <project.icon className="w-16 h-16 text-primary mb-6 opacity-80" />
                      <h4 className="text-xl font-bold font-display text-foreground mb-2">Architecture Built for Scale</h4>
                      <p className="text-muted-foreground text-sm max-w-md">
                        {project.impact}
                      </p>
                      
                      {/* Fake architecture diagram flow */}
                      <div className="mt-8 flex items-center justify-center gap-4 text-xs font-mono text-muted-foreground opacity-70">
                        <div className="p-2 border border-border">React</div>
                        <span>→</span>
                        <div className="p-2 border border-border">API Node</div>
                        <span>→</span>
                        <div className="p-2 border border-primary/50 text-primary">OpenAI</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECTION 4: FUNDAMENTALS */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-border">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-16 text-center">
            What I Actually Know
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Reveal delay={0.1}>
            <div className="border border-border bg-card p-10 h-full hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-border">
                <Code2 className="text-primary w-8 h-8" />
                <h3 className="text-2xl font-bold font-display">Full Stack Core</h3>
              </div>
              <ul className="space-y-4 font-mono text-sm text-muted-foreground mb-8">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-secondary" /> React.js • TypeScript • Node.js</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-secondary" /> Express • PostgreSQL • MongoDB</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-secondary" /> REST APIs • GraphQL</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-secondary" /> Tailwind • Framer Motion • Git</li>
              </ul>
              <p className="text-primary font-bold italic">"I ship features end-to-end."</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="border border-border bg-card p-10 h-full hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-4 mb-8 pb-4 border-b border-border">
                <Server className="text-secondary w-8 h-8" />
                <h3 className="text-2xl font-bold font-display">The Fundamentals</h3>
              </div>
              <ul className="space-y-4 font-mono text-sm text-muted-foreground mb-8">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-primary" /> C • C++ • Python (OOP)</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-primary" /> Data Structures & Algorithms</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-primary" /> System Design & Architecture</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-primary" /> Database Optimization</li>
              </ul>
              <p className="text-secondary font-bold italic">"I understand how computers work."</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="bg-primary/5 border border-primary/20 p-6 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-sm">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-muted-foreground">CURRENTLY:</span>
              <span className="text-foreground">Building system design knowledge</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-border"></div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">NEXT:</span>
              <span className="text-foreground">AWS Solutions Architect</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-border"></div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">OPEN TO:</span>
              <span className="text-primary font-bold">Top Tech Full Stack Roles</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SECTION 5: LOW MAINTENANCE */}
      <section className="bg-card py-24 px-6 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <blockquote className="text-2xl md:text-4xl font-display font-medium text-foreground leading-snug mb-16 text-center border-l-4 border-accent pl-6 py-2 ml-4">
              "I write clean code, document my work, and communicate clearly. You don't need to hand-hold me. Give me a problem and I'll ship the solution."
            </blockquote>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Reveal delay={0.1}>
              <div className="p-8">
                <Zap className="w-12 h-12 text-primary mx-auto mb-6" />
                <h4 className="text-xl font-bold font-display mb-3">SHIPS FAST</h4>
                <p className="text-muted-foreground font-mono text-sm">"MVP in weeks, not months."</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="p-8">
                <Cpu className="w-12 h-12 text-secondary mx-auto mb-6" />
                <h4 className="text-xl font-bold font-display mb-3">OWNS PROBLEMS</h4>
                <p className="text-muted-foreground font-mono text-sm">"Finds root cause independently."</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="p-8">
                <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-6" />
                <h4 className="text-xl font-bold font-display mb-3">CLEAR COMMUNICATOR</h4>
                <p className="text-muted-foreground font-mono text-sm">"Writes docs, avoids silos."</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 6: CONTACT */}
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 relative">
        <div className="md:w-1/2 flex flex-col justify-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
              Don't let me get hired by <span className="text-primary text-glow">someone else.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              I'm actively interviewing and have phone screens coming up. If you're looking for a full stack engineer who ships scalable products, reach out now before my calendar fills up.
            </p>
            
            <div className="flex flex-col gap-4 mb-12">
              <button 
                onClick={copyEmail}
                className="flex items-center gap-4 bg-card border border-border p-4 hover:border-primary transition-colors text-left group"
              >
                <div className="bg-background p-3 group-hover:bg-primary/10 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Email Me</div>
                  <div className="text-muted-foreground font-mono">{isCopied ? "📋 Copied!" : "hello@engineer.dev"}</div>
                </div>
              </button>

              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex items-center gap-3 border border-border bg-card p-4 hover:border-secondary transition-colors group">
                  <Linkedin className="w-5 h-5 text-secondary" />
                  <span className="font-bold text-sm">LinkedIn</span>
                </a>
                <a href="#" className="flex items-center gap-3 border border-border bg-card p-4 hover:border-foreground transition-colors group">
                  <Github className="w-5 h-5 text-foreground" />
                  <span className="font-bold text-sm">GitHub</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-accent font-mono text-sm bg-accent/10 p-4 border border-accent/20">
              <Zap className="w-4 h-4" />
              Available for phone screens this week. Quick response guaranteed.
            </div>
          </Reveal>
        </div>

        <div className="md:w-1/2 relative">
          <Reveal delay={0.2}>
            <div className="bg-card border border-border p-8 relative z-10">
              <h3 className="text-2xl font-bold font-display mb-6 border-b border-border pb-4">Send a direct message</h3>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Your Email</label>
                  <Input 
                    {...form.register("email")}
                    className="bg-background border-border focus-visible:ring-primary focus-visible:border-primary rounded-none h-12"
                    placeholder="recruiter@company.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-sm">{form.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Message</label>
                  <Textarea 
                    {...form.register("message")}
                    className="bg-background border-border focus-visible:ring-primary focus-visible:border-primary rounded-none min-h-[150px] resize-none"
                    placeholder="Hey, we'd love to schedule a technical screen with you this week..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-destructive text-sm">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  disabled={createMessage.isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-14 rounded-none text-lg"
                >
                  {createMessage.isPending ? "SENDING..." : (
                    <>
                      SEND MESSAGE <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
            
            {/* Decorative element behind form */}
            <div className="absolute -inset-4 border border-border/50 -z-10 translate-x-4 translate-y-4"></div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border text-center text-sm text-muted-foreground font-mono px-6">
        <p>Preparing for system design interviews? I've been studying distributed systems and scaling patterns.</p>
        <p className="mt-2 text-xs opacity-50">© {new Date().getFullYear()} Software Engineer. Built from scratch.</p>
      </footer>
    </div>
  );
}
