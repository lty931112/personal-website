"use client";

import { motion } from "framer-motion";

/**
 * 技能/专长展示组件
 * 纯卡片内容，不包含外层 section 和标题（由父组件控制）
 */

const skillCategories = [
  {
    title: "前端开发",
    icon: "🎨",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Vue / Nuxt.js", level: 85 },
    ],
  },
  {
    title: "后端开发",
    icon: "⚙️",
    skills: [
      { name: "Java / Spring Boot", level: 90 },
      { name: "Node.js / Express", level: 85 },
      { name: "Python / FastAPI", level: 80 },
      { name: "PostgreSQL / MySQL", level: 88 },
    ],
  },
  {
    title: "人工智能",
    icon: "🤖",
    skills: [
      { name: "LLM 应用开发", level: 85 },
      { name: "RAG / 向量检索", level: 82 },
      { name: "Prompt Engineering", level: 88 },
      { name: "AI Agent 开发", level: 78 },
    ],
  },
  {
    title: "DevOps",
    icon: "🚀",
    skills: [
      { name: "Docker / K8s", level: 82 },
      { name: "CI/CD (GitHub Actions)", level: 85 },
      { name: "Nginx / Linux", level: 80 },
      { name: "云服务 (AWS/阿里云)", level: 75 },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SkillsSection() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ staggerChildren: 0.1 }}
    >
      {skillCategories.map((category) => (
        <motion.div
          key={category.title}
          className="rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
          style={{
            background: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(0,0,0,0.06)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}
          variants={cardVariants}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{category.icon}</span>
            <h3 className="text-lg font-semibold text-slate-800">{category.title}</h3>
          </div>

          <div className="space-y-4">
            {category.skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700">{skill.name}</span>
                  <span className="text-slate-500">{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "#e2e8f0" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
