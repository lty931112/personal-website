"use client";

import { motion } from "framer-motion";

/**
 * 技能/专长展示组件
 * 展示个人技术栈和专业领域
 */

/* 技能分类 */
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

/* 动画配置 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function SkillsSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {/* 标题 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">技术栈</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            多年开发经验积累的技术能力，覆盖前端、后端、人工智能和 DevOps 全栈领域
          </p>
        </motion.div>

        {/* 技能卡片 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              className="rounded-xl border p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.4)", boxShadow: "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)" }}
              variants={cardVariants}
            >
              {/* 分类标题 */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>

              {/* 技能列表 */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <span className="text-slate-500">{skill.level}%</span>
                    </div>
                    {/* 进度条 */}
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
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
      </div>
    </section>
  );
}
