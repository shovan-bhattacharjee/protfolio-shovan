"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Terminal,
  Code2,
  Github,
  ExternalLink,
  Download,
  Trophy,
  Award,
  Mail,
  MapPin,
  Phone,
  Briefcase,
  GraduationCap,
  Globe,
  LayoutTemplate,
  Bot,
  BookOpen,
  Layers,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiRedux,
  SiFirebase,
  SiSelenium,
  SiPostman,
  SiCplusplus,
  SiLaravel,
  SiSocketdotio,
  SiDocker,
  SiGit,
  SiPrisma,
  SiPostgresql,
  SiMysql,
  SiReactquery,
  SiZod,
  SiReacthookform,
} from "react-icons/si";

import { Section } from "@/components/ui/Section";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { cn } from "@/lib/utils";

// Fonts
import { JetBrains_Mono, Inter } from "next/font/google";
import { CyberBackground } from "@/components/ui/ui/CyberBackground";
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// ── DATA ────────────────────────────────────────────────────────────────

const STATS = [
  {
    label: "Codeforces Solved",
    value: "192+",
    icon: Code2,
    color: "text-cyan-400",
  },
  {
    label: "CodeChef Solved",
    value: "31+",
    icon: Code2,
    color: "text-orange-400",
  },
  {
    label: "Hackathons Won",
    value: "01",
    icon: Trophy,
    color: "text-yellow-400",
  },
  {
    label: "CGPA (B.Sc)",
    value: "3.806",
    icon: GraduationCap,
    color: "text-emerald-400",
  },
];

const SKILL_ICONS = {
  "Modern Stack & Perf": [
    { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
    { name: "TanStack Query", icon: SiReactquery, color: "text-red-500" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
    { name: "Zod", icon: SiZod, color: "text-blue-400" },
    { name: "React Hook Form", icon: SiReacthookform, color: "text-pink-500" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-300" },
  ],
  "Backend & Architecture": [
    { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
    { name: "Software Design", icon: LayoutTemplate, color: "text-purple-400" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-400" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-300" },
    { name: "Prisma ORM", icon: SiPrisma, color: "text-white" },
    { name: "Laravel", icon: SiLaravel, color: "text-red-600" },
  ],
  "DevOps & Tools": [
    { name: "Docker", icon: SiDocker, color: "text-blue-500" },
    { name: "Git", icon: SiGit, color: "text-orange-600" },
    { name: "Postman", icon: SiPostman, color: "text-orange-500" },
    { name: "Selenium", icon: SiSelenium, color: "text-green-600" },
    { name: "OOP (C++)", icon: SiCplusplus, color: "text-blue-600" },
    { name: "MySQL", icon: SiMysql, color: "text-blue-200" },
  ],
};

const SKILLS_CODE = {
  "Modern Stack & Perf": `// TanStack Query + Zod + React Hook Form
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(['ADMIN', 'USER'])
});

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const res = await fetch(\`/api/users/\${userId}\`);
      const data = await res.json();
      return UserSchema.parse(data);
    },
    staleTime: 1000 * 60 * 5,
  });
};`,
  "Backend & Architecture": `// Prisma Schema (Type-Safe DB)
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  role      Role     @default(USER)
  posts     Post[]
  profile   Profile? 

  @@index([email])
}

model Post {
  id        String   @id @default(cuid())
  title     String
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
}`,
  "DevOps & Tools": `# Docker Compose for Dev
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
    depends_on:
      - db
  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp`,
};

const PROJECTS = [
  {
    title: "PingMe - Realtime Chat",
    tagline: "MERN + Socket.io",
    desc: "Real-time messaging application with online status, typing indicators, and secure authentication.",
    tech: ["Socket.io", "React", "Node.js", "MongoDB", "Redux"],
    repo: "#",
    live: "#",
    icon: SiSocketdotio,
  },
  {
    title: "AI Content Generator",
    tagline: "SaaS Platform",
    desc: "AI-powered tool for generating professional blog posts and emails with secure authentication and media management.",
    tech: ["Next.js", "TypeScript", "Prisma", "NextAuth", "Zod"],
    repo: "#",
    live: "#",
    icon: Bot,
  },
  {
    title: "Knowledge Corner",
    tagline: "Library Management System",
    desc: "Full-stack system for book inventory, borrowing, returns, and automatic fine calculation.",
    tech: ["React", "Node.js", "MongoDB", "JWT", "Firebase"],
    repo: "#",
    live: "#",
    icon: BookOpen,
  },
  {
    title: "Asia Adventure",
    tagline: "Tourism Booking Platform",
    desc: "Dynamic travel platform for exploring and booking adventure packages across Asia.",
    tech: ["React", "Tailwind", "Firebase", "Express"],
    repo: "#",
    live: "#",
    icon: Globe,
  },
];

const HISTORY = [
  {
    year: "Aug 2024 – Dec 2024",
    role: "SQA Trainee",
    org: "Bangladesh Computer Council (EDGE)",
    desc: "Intensive training in manual & automated testing (Selenium) – 80 hours.",
    type: "certification",
  },
  {
    year: "2024",
    role: "Champion – Data Hackathon",
    org: "Comilla University IT Fest",
    desc: "Led team to first place developing data-driven machine learning solutions.",
    type: "award",
  },
  {
    year: "Jul 2023 – Dec 2023",
    role: "Undergraduate Teaching Assistant",
    org: "Dept. of CSE, IIUC",
    desc: "Mentored students in lab sessions and strengthened communication & leadership skills.",
    type: "work",
  },
];

// New Education Data
const EDUCATION = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "International Islamic University Chittagong",
    period: "2021 - 2025",
    gpa: "3.806 / 4.00",
    icon: GraduationCap,
  },
  {
    degree: "Higher Secondary Certificate (Science)",
    institution: "Bepza Public School & College",
    period: "2017 - 2019",
    gpa: "4.75 / 5.00",
    icon: Award,
  },
];

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [activeTab, setActiveTab] = useState<keyof typeof SKILL_ICONS>(
    "Modern Stack & Perf"
  );
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main
      className={cn(
        "min-h-screen text-slate-200 font-sans selection:bg-emerald-500/30 overflow-x-hidden",
        jetbrains.variable,
        inter.variable
      )}
    >
      <CyberBackground />

      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}

      <Section id="hero" className="items-center py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left z-10 order-2 lg:order-1"
          >
            <span className="inline-block px-4 py-2 text-sm font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 rounded-full mb-8">
              Available for opportunities
            </span>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              Shovan Bhattacharjee
            </h1>

            <h2 className="text-2xl md:text-3xl text-cyan-300 font-light mb-8 tracking-wide">
              Full Stack Software Engineer
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-2xl">
              I design and develop clean, type-safe, and maintainable full-stack
              applications. Specialized in{" "}
              <span className="text-emerald-400 font-semibold">Next.js</span>,{" "}
              <span className="text-emerald-400 font-semibold">React</span>,{" "}
              <span className="text-emerald-400 font-semibold">Node.js</span>,
              Prisma/PostgreSQL, TanStack Query, Zod, and modern software
              architecture.
            </p>

            <div className="flex flex-wrap gap-5">
              <a
                href="/cv-shovan.pdf"
                download
                className="flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-1"
              >
                <Download size={20} /> Download Resume
              </a>
              <a
                href="#contact"
                className="flex items-center gap-3 px-8 py-4 bg-transparent border border-slate-500 hover:border-white text-white font-medium rounded-lg transition-all hover:bg-white/5"
              >
                <Mail size={20} /> Get in Touch
              </a>
            </div>
          </motion.div>

          {/* Professional Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-80 h-96 md:w-96 md:h-[480px] group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-500/20 via-cyan-500/10 to-purple-600/20 blur-3xl group-hover:blur-xl transition-all duration-1000" />

              <div
                className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-transparent to-cyan-600/10 animate-[spin_30s_linear_infinite]"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              />

              <div
                className="absolute inset-2 md:inset-4 bg-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <div className="relative w-full h-full flex flex-col items-center justify-end p-8 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <img
                    src="/shovan-img.png"
                    alt="Shovan Bhattacharjee"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black opacity-10" />
                  <div className="relative z-10 text-center">
                    <div className="mt-4 flex gap-4 justify-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 backdrop-blur border border-emerald-400/30 flex items-center justify-center">
                        <Code2 size={18} className="text-emerald-400" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-cyan-500/20 backdrop-blur border border-cyan-400/30 flex items-center justify-center">
                        <Layers size={18} className="text-cyan-400" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 backdrop-blur border border-purple-400/30 flex items-center justify-center">
                        <Globe size={18} className="text-purple-400" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="absolute -top-4 -right-4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 w-full max-w-5xl bg-[#111827]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <stat.icon className={cn("w-8 h-8 mb-2", stat.color)} />
              <span className="text-3xl font-bold text-white font-mono">
                {stat.value}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <Section id="skills">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-mono text-white flex items-center justify-center gap-3">
          <span className="text-emerald-500">01.</span> Technical Arsenal
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 p-1 bg-[#111827] rounded-lg border border-white/10 w-fit">
              {Object.keys(SKILL_ICONS).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={cn(
                    "px-6 py-2 rounded-md font-mono text-sm transition-all",
                    activeTab === key
                      ? "bg-emerald-600 text-white font-bold shadow-lg"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {key}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SKILL_ICONS[activeTab]?.map((skill: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(16, 185, 129, 0.5)",
                  }}
                  className="bg-[#1f2937]/50 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-3 cursor-default"
                >
                  <skill.icon className={cn("text-2xl", skill.color)} />
                  <span className="text-sm font-bold text-slate-200">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-200/80 font-mono">
              <span className="text-emerald-500 font-bold">Focus:</span>{" "}
              {activeTab === "Modern Stack & Perf" &&
                "Type-safe forms (Zod + React Hook Form) and optimized data fetching (TanStack Query)."}
              {activeTab === "Backend & Architecture" &&
                "Robust schemas (Prisma/PostgreSQL) and scalable backend architecture."}
              {activeTab === "DevOps & Tools" &&
                "Containerization (Docker), version control (Git), and quality assurance (Selenium)."}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-20 blur-xl group-hover:opacity-40 transition duration-500" />
            <div className="relative z-10 bg-[#0d1117] rounded-xl shadow-2xl overflow-hidden border border-gray-800 h-full min-h-[300px]">
              <CodeBlock
                code={SKILLS_CODE[activeTab]}
                language={
                  activeTab === "Modern Stack & Perf"
                    ? "typescript"
                    : activeTab === "Backend & Architecture"
                    ? "prisma"
                    : "yaml"
                }
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <Section id="projects">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-mono text-white">
          <span className="text-emerald-500">02.</span> Deployed Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 shadow-2xl flex flex-col"
            >
              <div className="h-48 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden border-b border-gray-800 group-hover:bg-gray-900/50 transition-colors">
                <div className="absolute inset-0 opacity-20 bg-slate-900"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <project.icon
                    size={48}
                    className="text-gray-700 group-hover:text-emerald-500 transition-colors duration-500"
                  />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-emerald-600 font-mono mb-4 uppercase tracking-wide">
                  {project.tagline}
                </p>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono text-cyan-300 bg-cyan-950/30 border border-cyan-800/50 px-2 py-1 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-4 border-t border-gray-800">
                  <a
                    href={project.repo}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    <Github size={16} /> Source
                  </a>
                  <a
                    href={project.live}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors ml-auto"
                  >
                    Live Demo <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <Section id="experience">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center font-mono text-white">
          <span className="text-emerald-500">03.</span> Professional Experience
        </h2>

        <div className="max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-emerald-950/50 to-gray-900 border border-emerald-500/30 p-8 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Briefcase size={120} />
            </div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-mono rounded mb-4 border border-emerald-500/30">
                CURRENT ROLE
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                Junior Developer
              </h3>
              <h4 className="text-xl text-emerald-400 font-mono mb-4">
                @ Bit Apps
              </h4>
              <p className="text-slate-300 max-w-2xl leading-relaxed">
                Building scalable SaaS products with Next.js (frontend + server
                components) and Laravel (robust backend). Emphasis on clean
                architecture, maintainability, and performance.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="relative max-w-4xl mx-auto pl-8 border-l border-gray-800 space-y-12">
          {HISTORY.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8"
            >
              <div
                className={cn(
                  "absolute -left-[44px] top-1 w-8 h-8 rounded-full border-4 border-[#0b0f14] flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]",
                  item.type === "award"
                    ? "bg-yellow-500 text-black"
                    : item.type === "certification"
                    ? "bg-cyan-500 text-black"
                    : "bg-emerald-600 text-white"
                )}
              >
                {item.type === "award" && <Trophy size={14} />}
                {item.type === "certification" && <Award size={14} />}
                {item.type === "work" && <Briefcase size={14} />}
              </div>
              <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl hover:border-emerald-500/30 transition-all hover:bg-[#161b22]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{item.role}</h3>
                  <span className="text-xs font-mono text-emerald-500 bg-emerald-950/30 px-2 py-1 rounded border border-emerald-900">
                    {item.year}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-400 mb-3 flex items-center gap-2">
                  <Briefcase size={14} /> {item.org}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── EDUCATION ────────────────────────────────────────────────────── */}
      <Section id="education">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center font-mono text-white">
          <span className="text-emerald-500">04.</span> Academic Background
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {EDUCATION.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#111827] border border-gray-800 p-8 rounded-2xl hover:border-emerald-500/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                  <edu.icon size={24} />
                </div>
                <span className="font-mono text-xs text-slate-500 border border-slate-800 px-2 py-1 rounded">
                  {edu.period}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {edu.degree}
              </h3>
              <h4 className="text-slate-400 mb-4">{edu.institution}</h4>
              <div className="flex items-center gap-2 text-sm font-mono text-emerald-400 bg-emerald-950/30 px-3 py-2 rounded w-fit">
                <Trophy size={14} />
                <span>CGPA: {edu.gpa}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <Section id="contact" className="py-32 max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-16">
          <span className="text-emerald-400">05.</span> Let's Connect
        </h2>

        {/* Glassmorphic Card */}
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-purple-600/5 pointer-events-none" />

          {/* Card Content */}
          <div className="relative p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/10 backdrop-blur border border-emerald-500/20 rounded-full text-emerald-400 font-medium mb-6">
                <Terminal size={20} />
                <span>Ready to collaborate?</span>
              </div>
              <p className="text-xl text-slate-300">
                Drop me a message — I'll get back to you within 24 hours.
              </p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setStatus("sending");
                setError(null);

                const formData = new FormData(e.currentTarget);
                const data = {
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  message: formData.get("message") as string,
                };

                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });

                  if (res.ok) {
                    setStatus("success");
                    (e.target as HTMLFormElement).reset();
                  } else {
                    throw new Error();
                  }
                } catch {
                  setStatus("idle");
                  setError(
                    "Something went wrong. Please try again or email me directly."
                  );
                }
              }}
              className="space-y-8"
            >
              {/* Name */}
              <div className="relative">
                <input
                  name="name"
                  type="text"
                  required
                  className="peer w-full px-6 py-5 bg-white/5 backdrop-blur border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all duration-300"
                  placeholder=" "
                />
                <label className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-base transition-all duration-300 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-1/2 peer-focus:-top-4 peer-focus:text-emerald-400 peer-focus:text-sm peer-focus:bg-black/80 peer-focus:px-2 peer-focus:rounded-md">
                  Your Name
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  required
                  className="peer w-full px-6 py-5 bg-white/5 backdrop-blur border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all duration-300"
                  placeholder=" "
                />
                <label className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-base transition-all duration-300 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-1/2 peer-focus:-top-4 peer-focus:text-emerald-400 peer-focus:text-sm peer-focus:bg-black/80 peer-focus:px-2 peer-focus:rounded-md">
                  Email Address
                </label>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="peer w-full px-6 py-5 bg-white/5 backdrop-blur border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all duration-300 resize-none"
                  placeholder=" "
                />
                <label className="absolute left-6 top-6 text-slate-400 text-base transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:text-emerald-400 peer-focus:text-sm peer-focus:bg-black/80 peer-focus:px-2 peer-focus:rounded-md">
                  Your Message
                </label>
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-emerald-400 font-semibold text-lg flex items-center justify-center gap-3"
                >
                  <span className="text-2xl">✓</span> Message sent successfully!
                  I'll reply soon.
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-red-400 font-semibold text-lg"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-5 bg-gradient-to-r from-emerald-600 via-cyan-600 to-emerald-600 hover:from-emerald-500 hover:via-cyan-500 hover:to-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-emerald-500/40 transition-all duration-500 flex items-center justify-center gap-3"
              >
                {status === "sending" ? (
                  <>
                    Sending
                    <span className="animate-pulse">...</span>
                  </>
                ) : (
                  <>
                    Send Message
                    <Terminal size={20} />
                  </>
                )}
              </button>
            </form>

            {/* Direct Links */}
            <div className="mt-12 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-center gap-10 text-slate-400">
              <a
                href="tel:+8801300911247"
                className="flex items-center gap-4 hover:text-emerald-400 transition"
              >
                <Phone size={22} /> +880 1300 911 247
              </a>
              <a
                href="mailto:shovancse.iiuc.cp@gmail.com"
                className="flex items-center gap-4 hover:text-emerald-400 transition"
              >
                <Mail size={22} /> shovancse.iiuc.cp@gmail.com
              </a>
              <div className="flex items-center gap-4">
                <MapPin size={22} /> Chattogram, Bangladesh
              </div>
            </div>
          </div>
        </div>
      </Section>

      <footer className="py-8 text-center text-slate-500 text-xs font-mono relative z-10 bg-[#0b0f14] border-t border-white/5">
        <p className="mt-2">
          © {new Date().getFullYear()} Shovan Bhattacharjee. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}
