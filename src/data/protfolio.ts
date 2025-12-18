export const PROFILE = {
  name: "Shovan Bhattacharjee",
  role: "Senior Frontend Engineer & UI Architect",
  bio: "Proactive Web Developer specializing in scalable, secure web applications using React.js, Next.js, and TypeScript. Experienced in converting UI/UX designs into high-quality code and implementing robust state management.",
  email: "shovancse.iiuc.cp@gmail.com",
};

export const SKILLS_CODE = {
  Frontend: `// Component: Hero.tsx
const Hero = () => {
  const [tech, setTech] = useState(["React", "Next.js", "Tailwind"]);
  
  return (
    <motion.div initial={{ opacity: 0 }}>
      <h1 className="text-glow">Welcome to my Digital Garden</h1>
      {tech.map((t) => <Badge key={t}>{t}</Badge>)}
    </motion.div>
  );
};`,
  Backend: `// API Route: /api/generate-content
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const body = await req.json();
  const user = await getUser(req); // NextAuth.js
  
  const content = await prisma.post.create({
    data: {
      ...body,
      authorId: user.id
    }
  });
  
  return NextResponse.json({ success: true, content });
}`,
  QA: `// Test: LoginFlow.spec.ts
import { test, expect } from '@playwright/test';

test('should allow user login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', 'shovan@dev.com');
  await page.fill('input[name="password"]', 'securepass');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('.welcome-msg')).toBeVisible();
});`
};

export const PROJECTS = [
  {
    title: "AI Content Generator",
    desc: "SaaS platform for generating SEO-optimized content using OpenRouter.ai API.",
    tech: ["Next.js", "Prisma", "NextAuth", "Zod", "Redux"],
    repo: "#",
    live: "#"
  },
  {
    title: "Knowledge Corner",
    desc: "Library Management System with real-time inventory and fine calculation.",
    tech: ["React.js", "MongoDB", "Express", "JWT", "Firebase"],
    repo: "#",
    live: "#"
  },
    {
    title: "CareLogix",
    desc: "Bug reporting & QA showcase for a healthcare platform.",
    tech: ["Selenium", "Manual Testing", "Jira"],
    repo: "#",
    live: "#"
  }
];

export const EDUCATION = [
  {
    school: "International Islamic University Chittagong",
    degree: "B.Sc. in Computer Science and Engineering",
    year: "2021 - 2025",
    gpa: "CGPA: 3.806/4.00"
  },
  {
    school: "Bepza Public School & College",
    degree: "Higher Secondary Certificate (Science)",
    year: "2017 - 2019",
    gpa: "GPA: 4.75/5.00"
  }
];