"use client";

import { useEffect, useState } from "react";
import WorkExperienceCard from "./WorkExperienceCard";
import SectionHeading from "./SectionHeading";
import { useScrollProgress } from "../hooks/useScrollProgress";

interface WorkExperienceItem {
  company: string;
  companyUrl: string;
  logo: string;
  position: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

const workExperience: WorkExperienceItem[] = [
  {
    company: "Famoulee",
    companyUrl: "https://famoulee.com/en",
    logo: "https://res.cloudinary.com/htetaunglinn-dev/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1781797863/Portfolio%20Next%20JS%202025/logo/dw5vu0pxyrekdk2c5ftm.svg",
    position: "Software Engineer",
    period: "March 2026 - Present",
    location: "Remote, Germany",
    description:
      "Building Famoulee, a multilingual family-relationship platform for preserving memories and connecting loved ones, shipping production features across the Next.js web app, Node.js API, and Flutter mobile app.",
    achievements: [
      "Engineered end-to-end encrypted (E2EE) chat with passwordless device approval and confidential self-deleting messages, keeping private family conversations secure across web and mobile",
      "Implemented HLS video streaming with server-side transcoding, delivering smooth playback of multi-page video documents on web, iOS, and Android",
      "Built real-time calls and live presence with LiveKit and Socket.io, and integrated Paddle and Apple in-app subscription billing ahead of the production launch",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Flutter",
      "E2EE",
      "HLS",
      "LiveKit",
      "Socket.io",
      "Firebase",
      "Paddle",
      "StoreKit",
    ],
  },
  {
    company: "GoFive",
    companyUrl: "https://www.gofive.co.th/",
    logo: "https://res.cloudinary.com/htetaunglinn-dev/image/upload/v1739081714/Portfolio%20Next%20JS%202025/logo/3.png",
    position: "Software Engineer",
    period: "January 2024 - February 2026",
    location: "Bangkok, Thailand",
    description:
      "Led end-to-end development of an enterprise CRM platform on a microservices architecture, from concept to production deployment, alongside the company's custom component library, design system, and CRM tools such as an email template builder and web page creator.",
    achievements: [
      "Led end-to-end development of enterprise CRM on microservices, collaborating directly with stakeholders and delivering 15% performance gains through strategic optimization",
      "Designed the company's custom component library and design system, and delivered an email template builder and web page creator that let teams publish marketing content without code",
      "Mentored 3 junior developers on Angular and TypeScript best practices, accelerating team velocity by 25%, and engineered memory optimizations reducing overhead by 30%",
    ],
    techStack: [
      "Angular",
      "Rxjs",
      "TypeScript",
      "Microservices",
      "Design System",
      "Storybook",
      "Tailwind CSS",
      "SCSS",
      "AWS",
      "Git",
    ],
  },
  {
    company: "ThitsaWorks",
    companyUrl: "https://www.thitsaworks.com/",
    logo: "https://res.cloudinary.com/htetaunglinn-dev/image/upload/v1739081714/Portfolio%20Next%20JS%202025/logo/2.png",
    position: "Software Engineer",
    period: "June 2023 - January 2024",
    location: "Yangon, Myanmar",
    description:
      "Delivered high-impact fintech solutions including digital wallet and financial portals. Led cross-functional teams to build secure, scalable applications while optimizing APIs and establishing development best practices across the organization.",
    achievements: [
      "Led cross-functional team to launch Thitsa Wallet digital platform on schedule, delivering secure financial transfer capabilities and 30% user engagement boost",
      "Optimized RESTful APIs achieving 20% faster response times while designing intuitive React interfaces that improved user experience by 25%",
      "Established comprehensive documentation and development best practices, reducing onboarding time by 40% and enhancing team collaboration",
    ],
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "REST APIs",
      "Git",
    ],
  },
  {
    company: "Smilax Global",
    companyUrl: "https://smilaxglobal.com/",
    logo: "https://res.cloudinary.com/htetaunglinn-dev/image/upload/v1739081714/Portfolio%20Next%20JS%202025/logo/1.png",
    position: "Mid Frontend Developer",
    period: "June 2022 - January 2023",
    location: "Yangon, Myanmar",
    description:
      "Built enterprise-grade access management software and tracking solutions for multiple clients. Focused on pixel-perfect UI implementation, performance optimization, and security-first architecture while delivering comprehensive documentation and SOC 2 compliance.",
    achievements: [
      "Delivered pixel-perfect React UIs with 98% design accuracy and optimized component architecture, reducing bundle size by 50% and improving load times by 45%",
      "Built Access Management Software deployed across 3 enterprise clients, integrating Google Maps API and QR tracking to reduce manual monitoring by 40%",
      "Implemented JWT authentication and security middleware ensuring SOC 2 compliance while decreasing vulnerability risks by 15%",
    ],
    techStack: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "REST APIs",
      "JWT",
      "Google Maps API",
      "Material UI",
    ],
  },
];

export default function WorkExperience() {
  const [statsVisible, setStatsVisible] = useState(false);
  const timelineRef = useScrollProgress<HTMLDivElement>("center");
  const [counts, setCounts] = useState({
    years: 0,
    projects: 0,
    satisfaction: 0,
    users: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    const stats = document.getElementById("experience-stats");
    if (stats) {
      observer.observe(stats);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const targets = {
      years: 4,
      projects: 50,
      satisfaction: 98,
      users: 100,
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        years: Math.floor(targets.years * progress),
        projects: Math.floor(targets.projects * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
        users: Math.floor(targets.users * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [statsVisible]);

  return (
    <section id="experience" className="py-10 md:py-16 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeading
          index="03"
          eyebrow="Trajectory"
          title="Work Experience"
          subtitle="Building impactful solutions and leading teams across diverse industries"
        />

        {/* Timeline: an orbit track that fills as you scroll through it */}
        <div ref={timelineRef} className="relative space-y-10 md:space-y-20">
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-0 bottom-0 w-px -translate-x-1/2 bg-white/10"
            style={{ left: "calc((100% - 4rem) / 3 + 1rem)" }}
          >
            <div className="timeline-fill absolute inset-0 bg-gradient-to-b from-[#5a7dee] via-[#4169E1] to-[#4169E1]/0 shadow-[0_0_12px_rgba(65,105,225,0.8)]" />
          </div>

          {workExperience.map((job, index) => (
            <WorkExperienceCard
              key={index}
              {...job}
              index={index}
              isLast={index === workExperience.length - 1}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div
          id="experience-stats"
          className="mt-12 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: counts.years, suffix: "+", label: "Years Experience" },
            {
              value: counts.projects,
              suffix: "+",
              label: "Projects Completed",
            },
            {
              value: counts.satisfaction,
              suffix: "%",
              label: "Client Satisfaction",
            },
            { value: counts.users, suffix: "K+", label: "Users Served" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-[#0a0a0a]/80 border border-[#4A6FFF]/10 rounded-2xl p-6 text-center hover:border-[#4A6FFF]/30 transition-colors duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#4A6FFF] mb-2">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-sm text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#4A6FFF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#4A6FFF]/5 rounded-full blur-3xl" />
        {/* Enhanced Lighting Effects */}
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.12),transparent_70%)] blur-3xl" />
        <div className="absolute top-2/3 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(74,111,255,0.1),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.08),transparent_70%)] blur-3xl" />
      </div>
    </section>
  );
}
