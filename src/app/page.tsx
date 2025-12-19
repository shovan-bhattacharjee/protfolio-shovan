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
} from "lucide-react";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { JetBrains_Mono, Inter } from "next/font/google";
import { CyberBackground } from "@/components/ui/ui/CyberBackground";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
    img: "/1754936250266.jfif",
    tagline: "MERN + Socket.io",
    desc: "Real-time messaging application with online status, typing indicators, and secure authentication.",
    tech: ["Socket.io", "React", "Node.js", "MongoDB", "Redux"],
    repo: "https://github.com/shovan-bhattacharjee/Real-Time-Chat-App-Socket.io",
    live: "#",
    icon: SiSocketdotio,
  },
  {
    title: "AI Content Generator",
    img: "/1753806714762.jfif",
    tagline: "SaaS Platform",
    desc: "AI-powered tool for generating professional blog posts and emails with secure authentication and media management.",
    tech: ["Next.js", "TypeScript", "Prisma", "NextAuth", "Zod"],
    repo: "https://github.com/shovan-bhattacharjee/Ai-Content-Generator",
    live: "https://ai-content-generator-next.vercel.app",
    icon: Bot,
  },
  {
    title: "Knowledge Corner",
    img: "/1716485570000.jfif",
    tagline: "Library Management System",
    desc: "Full-stack system for book inventory, borrowing, returns, and automatic fine calculation.",
    tech: ["React", "Node.js", "MongoDB", "JWT", "Firebase"],
    clientRepo:
      "https://github.com/shovan-bhattacharjee/Knowledge-Corner-Client",
    serverRepo:
      "https://github.com/shovan-bhattacharjee/Knowledge-Corner-Server",
    live: "https://knowledge-corner-55271.web.app",
    icon: BookOpen,
  },
  {
    title: "Asia Adventure",
    img: "/1714734363387.jfif",
    tagline: "Tourism Booking Platform",
    desc: "Dynamic travel platform for exploring and booking adventure packages across Asia.",
    tech: ["React", "Tailwind", "Firebase", "Express"],
    clientRepo:
      "https://github.com/shovan-bhattacharjee/Asia-Adventurer-Client",
    serverRepo:
      "https://github.com/shovan-bhattacharjee/Asia-Adventurer-Server",
    live: "https://asia-adventurer.web.app",
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
    year: "Jul 2023 – Dec 2023",
    role: "Undergraduate Teaching Assistant",
    org: "Dept. of CSE, IIUC",
    desc: "Mentored students in lab sessions and strengthened communication & leadership skills.",
    type: "work",
  },
  {
    year: "2024",
    role: "Champion – Data Hackathon",
    org: "Comilla University IT Fest",
    desc: "Led team to first place developing data-driven machine learning solutions.",
    type: "award",
  },
];

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
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
  });

  const getCodeSnippet = (tech: string): string => {
    const snippets: Record<string, string> = {
      "Next.js": `// Server Component + Streaming
export default async function Page() {
  const posts = await db.post.findMany({ take: 10 });

  return (
    <section>
      <h1 className="text-4xl mb-8">Latest Posts</h1>
      {posts.map(post => (
        <article key={post.id} className="mb-6 p-4 rounded-lg bg-white/5">
          <h2 className="text-2xl">{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </section>
  );
}`,
      "TanStack Query": `// Infinite scroll + caching
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});`,
      TypeScript: `// Advanced types & generics
type APIResponse<T> = {
  data: T;
  error: string | null;
  status: number;
};

const fetchUser = async (): Promise<APIResponse<User>> => {
  const res = await fetch('/api/user');
  return res.json();
};`,
      Zod: `// Form validation with transformation
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  remember: z.boolean().optional(),
}).transform(data => ({
  ...data,
  remember: data.remember ?? false
}));`,
      "React Hook Form": `// Efficient form with watch & validation
const { register, watch, formState: { errors } } = useForm();
const password = watch("password");

<input
  {...register("confirmPassword", {
    validate: value => value === password || "Passwords don't match"
  })}
/>`,
      "Tailwind CSS": `// Responsive card with dark mode
<article className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
  <img src="/project.jpg" alt="Project" className="w-full h-48 object-cover" />
  <div className="p-6">
    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Project Title</h3>
  </div>
</article>`,
      "Node.js": `// Fastify API with plugins
const app = fastify({ logger: true });

app.register(authPlugin);
app.register(userRoutes, { prefix: '/api/users' });

app.listen({ port: 3000 });`,
      "Software Design": `// Repository Pattern
interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

class PrismaUserRepository implements UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
}`,
      MongoDB: `// Aggregation pipeline
const topUsers = await User.aggregate([
  { $group: { _id: "$role", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 5 }
]);`,
      PostgreSQL: `// Complex query with CTE
WITH ranked_posts AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY userId ORDER BY createdAt DESC) as rn
  FROM posts
)
SELECT * FROM ranked_posts WHERE rn = 1;`,
      "Prisma ORM": `// Relation + select optimization
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    posts: {
      select: { title: true, published: true },
      where: { published: true }
    }
  }
});`,
      Laravel: `// Eloquent relationship + policy
class Post extends Model {
  public function user() {
    return $this->belongsTo(User::class);
  }
}

// In Policy
public function update(User $user, Post $post) {
  return $user->id === $post->user_id;
}`,
      Docker: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html`,
      Git: `# Conventional commits + rebase
git checkout -b feature/payment-gateway
git add .
git commit -m "feat: add Stripe integration"
git push -u origin feature/payment-gateway
git rebase main`,
      Postman: `// Collection variable + test script
pm.test("Status code is 200", () => {
  pm.response.to.have.status(200);
});

pm.test("Response has user data", () => {
  const json = pm.response.json();
  pm.expect(json).to.have.property('id');
  pm.expect(json.email).to.include('@');
});`,
      Selenium: `// Page Object Model pattern
class LoginPage {
  constructor(driver) { this.driver = driver; }

  async login(username, password) {
    await this.driver.findElement(By.id('email')).sendKeys(username);
    await this.driver.findElement(By.id('password')).sendKeys(password);
    await this.driver.findElement(By.css('button[type=submit]')).click();
  }
}`,
      "OOP (C++)": `// RAII + Smart Pointers
class DatabaseConnection {
private:
  MYSQL* conn;
public:
  DatabaseConnection() { conn = mysql_init(nullptr); }
  ~DatabaseConnection() { if (conn) mysql_close(conn); }

  bool connect(const string& host, const string& user) {
    return mysql_real_connect(conn, host.c_str(), user.c_str(), ...);
  }
};`,
      MySQL: `// Stored procedure with transaction
START TRANSACTION;

INSERT INTO orders (user_id, total) VALUES (?, ?);
SET @order_id = LAST_INSERT_ID();

INSERT INTO order_items (order_id, product_id, qty)
VALUES (@order_id, ?, ?), (@order_id, ?, ?);

COMMIT;`,
      "Modern Stack & Perf": SKILLS_CODE["Modern Stack & Perf"],
      "Backend & Architecture": SKILLS_CODE["Backend & Architecture"],
      "DevOps & Tools": SKILLS_CODE["DevOps & Tools"],
    };

    return snippets[tech] || "// Click a technology to explore real-world code";
  };

  const getCodeLanguage = (tech: string): string => {
    const langMap: Record<string, string> = {
      Docker: "dockerfile",
      "Prisma ORM": "prisma",
      Git: "bash",
      Postman: "javascript",
      Selenium: "javascript",
      "OOP (C++)": "cpp",
      MySQL: "sql",
      PostgreSQL: "sql",
      Laravel: "php",
    };
    return langMap[tech] || "typescript";
  };

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
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-cyan-500 to-purple-500 z-50 origin-left"
        style={{ scaleX }}
      />

      <Section id="hero" className="py-16 md:py-24 lg:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <span className="inline-block px-4 py-2 text-xs font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 rounded-full mb-6">
                Available for opportunities
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-white">
                Shovan Bhattacharjee
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-cyan-300 font-light mb-6 tracking-wide">
                Full Stack Software Engineer
              </h2>
              <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                I design and develop clean, type-safe, and maintainable
                full-stack applications. Specialized in Next.js, React, Node.js,
                Express, JavaScript (ES6), TypeScript, PHP, Laravel, PostgreSQL,
                TanStack Query, Zod, and modern software architecture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/cv-shovan.pdf"
                  download
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-1"
                >
                  <Download size={20} /> Download Resume
                </a>
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-slate-500 hover:border-white text-white font-medium rounded-lg transition-all hover:bg-white/5"
                >
                  <Mail size={20} /> Get in Touch
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center order-1 lg:order-2"
            >
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-120 max-w-full group mb-10">
                <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-emerald-500/20 via-cyan-500/10 to-purple-600/20 blur-3xl group-hover:blur-xl transition-all duration-1000" />
                <div
                  className="absolute inset-0 bg-linear-to-br from-emerald-600/20 via-transparent to-cyan-600/20 animate-[spin_40s_linear_infinite]"
                  style={{
                    clipPath:
                      "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
                  }}
                />
                <div
                  className="absolute inset-2 md:inset-4 bg-gray-900/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                  style={{
                    clipPath:
                      "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
                  }}
                >
                  <div className="relative w-full h-full bg-linear-to-t from-black/60 via-transparent to-transparent">
                    <Image
                      src="/shovan-img.png"
                      alt="Shovan Bhattacharjee"
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="(max-width: 768px) 80vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 skew-x-12" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute -top-6 -right-6 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
              </div>

              <div className="flex gap-8">
                <a
                  href="https://github.com/shovan-bhattacharjee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-emerald-500/60 hover:bg-emerald-950/40 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <Github
                    size={36}
                    className="text-slate-300 group-hover:text-emerald-400 transition-colors duration-300"
                  />
                </a>
                <a
                  href="https://linkedin.com/in/shovan-bhattacharjee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-emerald-500/60 hover:bg-emerald-950/40 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="36"
                    height="36"
                    fill="currentColor"
                    className="text-slate-300 group-hover:text-emerald-400 transition-colors duration-300"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.164 0-2.108-.944-2.108-2.108 0-1.164.944-2.108 2.108-2.108 1.164 0 2.108.944 2.108 2.108 0 1.164-.944 2.108-2.108 2.108zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.208 0 22.225 0z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-20 max-w-5xl mx-auto bg-[#111827]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-3 hover:bg-white/5 rounded-lg transition-colors"
              >
                <stat.icon className={cn("w-8 h-8 mb-2", stat.color)} />
                <span className="text-2xl font-bold text-white font-mono">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="skills" className="py-12 md:py-20 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center font-mono text-white">
          <span className="text-emerald-500">01.</span> Technical Arsenal
        </h2>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex flex-col space-y-8">
              <div className="flex flex-wrap gap-3 justify-center">
                {Object.keys(SKILL_ICONS).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveTab(key as keyof typeof SKILL_ICONS);
                      setSelectedTech(null);
                    }}
                    className={cn(
                      "px-5 py-3 rounded-lg font-mono text-sm whitespace-nowrap transition-all duration-300",
                      activeTab === key && !selectedTech
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/40 font-bold"
                        : "bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20"
                    )}
                  >
                    {key}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {SKILL_ICONS[activeTab]?.map((skill, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setSelectedTech(skill.name)}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "bg-white/5 backdrop-blur-md border p-5 rounded-xl flex flex-col items-center gap-3 transition-all duration-300 min-h-30",
                      selectedTech === skill.name
                        ? "border-emerald-500 bg-emerald-950/30 shadow-xl shadow-emerald-500/20"
                        : "border-white/10 hover:border-emerald-500/40 hover:bg-white/10"
                    )}
                  >
                    <skill.icon
                      className={cn("text-3xl sm:text-4xl", skill.color)}
                    />
                    <span className="text-xs sm:text-sm font-semibold text-slate-200 text-center leading-tight">
                      {skill.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              <div className="p-5 bg-emerald-900/10 border border-emerald-500/20 rounded-xl text-sm sm:text-base text-emerald-200/90 font-mono leading-relaxed">
                <span className="text-emerald-400 font-bold block mb-2">
                  Currently Viewing:
                </span>
                {selectedTech ? (
                  <span className="text-cyan-300 font-bold text-lg">
                    {selectedTech}
                  </span>
                ) : (
                  <span>
                    {activeTab === "Modern Stack & Perf"
                      ? "Type-safe forms (Zod + React Hook Form) and optimized data fetching (TanStack Query)."
                      : activeTab === "Backend & Architecture"
                      ? "Robust schemas (Prisma/PostgreSQL) and scalable backend architecture."
                      : "Containerization (Docker), version control (Git), and quality assurance (Selenium)."}
                  </span>
                )}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-cyan-500 opacity-20 blur-xl group-hover:opacity-40 transition duration-700 rounded-xl pointer-events-none" />

              <div className="relative bg-[#0d1117] rounded-xl shadow-2xl border border-gray-800 overflow-hidden h-full flex flex-col">
                <div className="overflow-auto flex-1">
                  <div className="p-5">
                    <motion.div
                      key={selectedTech || activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CodeBlock
                        code={getCodeSnippet(selectedTech || activeTab)}
                        language={getCodeLanguage(selectedTech || activeTab)}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="projects" className="py-12 md:py-20 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center font-mono text-white">
          <span className="text-emerald-500">02.</span> Deployed Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 shadow-2xl flex flex-col"
            >
              <div className="h-48 bg-linear-to-br from-gray-900 to-black relative overflow-hidden border-b border-gray-800 group-hover:bg-gray-900/50 transition-colors">
                <div className="absolute inset-0 opacity-20 bg-slate-900"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {
                    project.img ? (
                      <Image
                        src={project.img}
                        alt={project.title}
                        width={400}
                        height={400}
                        className="object-cover object-top max-h-100"
                      />
                    ) : (
                      <project.icon className="text-6xl text-emerald-500" />
                    )
                  }
                </div>
              </div>
              <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-emerald-600 font-mono mb-4 uppercase tracking-wide">
                  {project.tagline}
                </p>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed grow">
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
                  {project.clientRepo ? (
                    <div className="flex gap-4">
                      <a
                        href={project.clientRepo}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        <Github size={16} /> Client
                      </a>
                      <a
                        href={project.serverRepo}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        <Github size={16} /> Server
                      </a>
                    </div>
                  ) : (
                    <a
                      href={project.repo}
                      className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      <Github size={16} /> Source
                    </a>
                  )}
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

      <Section id="experience">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-16 text-center font-mono text-white">
          <span className="text-emerald-500">03.</span> Professional Experience
        </h2>

        <div className="max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-linear-to-r from-emerald-950/50 to-gray-900 border border-emerald-500/30 p-6 md:p-8 rounded-2xl relative overflow-hidden"
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

        <div className="relative max-w-4xl mx-auto pl-6 md:pl-8 border-l border-gray-800 space-y-12">
          {HISTORY.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-6 md:pl-8"
            >
              <div
                className={cn(
                  "absolute -left-10.25 md:-left-11 top-1 w-8 h-8 rounded-full border-4 border-[#0b0f14] flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]",
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
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {item.role}
                  </h3>
                  <span className="text-xs font-mono text-emerald-500 bg-emerald-950/30 px-2 py-1 rounded border border-emerald-900 w-fit mt-2 sm:mt-0">
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

      <Section id="education">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-16 text-center font-mono text-white">
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
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4 sm:gap-0">
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

      <Section id="contact" className="py-20 md:py-32 max-w-4xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-16">
          <span className="text-emerald-400">05.</span> Let&apos;s Connect
        </h2>

        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 via-cyan-500/5 to-purple-600/5 pointer-events-none" />

          <div className="relative p-6 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-500/10 backdrop-blur border border-emerald-500/20 rounded-full text-emerald-400 text-sm sm:text-base font-medium mb-6">
                <Terminal size={20} />
                <span>Ready to collaborate?</span>
              </div>
              <p className="sm:text-lg md:text-xl text-slate-300">
                Drop me a message and I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(async (data) => {
                setStatus("sending");
                setError(null);

                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });

                  if (res.ok) {
                    setStatus("success");
                    reset();
                  } else {
                    throw new Error();
                  }
                } catch {
                  setStatus("idle");
                  setError(
                    "Something went wrong. Please try again or email me directly."
                  );
                }
              })}
              className="space-y-8"
            >
              <div className="relative">
                <input
                  {...register("name")}
                  type="text"
                  className={cn(
                    "w-full px-6 py-5 bg-white/5 backdrop-blur border rounded-xl text-white placeholder-slate-500",
                    "focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20",
                    "transition-all duration-300",
                    errors.name ? "border-red-500" : "border-white/10"
                  )}
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  {...register("email")}
                  type="email"
                  className={cn(
                    "w-full px-6 py-5 bg-white/5 backdrop-blur border rounded-xl text-white placeholder-slate-500",
                    "focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20",
                    "transition-all duration-300",
                    errors.email ? "border-red-500" : "border-white/10"
                  )}
                  placeholder="Email Address"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <textarea
                  {...register("message")}
                  rows={6}
                  className={cn(
                    "w-full px-6 py-5 bg-white/5 backdrop-blur border rounded-xl text-white placeholder-slate-500",
                    "focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20",
                    "transition-all duration-300 resize-none",
                    errors.message ? "border-red-500" : "border-white/10"
                  )}
                  placeholder="Your Message"
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-emerald-400 font-semibold text-lg flex items-center justify-center gap-3"
                >
                  <span className="text-2xl">✓</span> Message sent successfully!
                  I&apos;ll reply soon.
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

              <button
                type="submit"
                disabled={isSubmitting || status === "sending"}
                className="w-full py-5 bg-linear-to-r from-emerald-600 via-cyan-600 to-emerald-600 hover:from-emerald-500 hover:via-cyan-500 hover:to-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-emerald-500/40 transition-all duration-500 flex items-center justify-center gap-3"
              >
                {isSubmitting || status === "sending" ? (
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

            <div className="mt-12 pt-12 xs:text-base sm:text-sm md:text-sm border-t border-white/10 flex flex-col md:flex-row justify-center gap-6 md:gap-10 text-slate-400 items-center">
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
