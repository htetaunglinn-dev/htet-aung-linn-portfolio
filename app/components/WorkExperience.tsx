"use client";

import { useEffect, useState } from "react";
import WorkExperienceCard from "./WorkExperienceCard";

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
    company: "GoFive",
    companyUrl: "https://www.gofive.co.th/",
    logo: "https://res.cloudinary.com/htetaunglinn-dev/image/upload/v1739081714/Portfolio%20Next%20JS%202025/logo/3.png",
    position: "Software Engineer",
    period: "January 2024 - Present",
    location: "Bangkok, Thailand",
    description:
      "Leading end-to-end development of enterprise CRM system from concept to production deployment. Driving technical excellence through performance optimization, mentorship, and data-driven architectural decisions that directly impact user experience and business metrics.",
    achievements: [
      "Spearheaded greenfield CRM project from requirements gathering through architecture design and production deployment, collaborating directly with stakeholders and enterprise clients",
      "Architected performance optimizations using data-driven analysis and strategic code splitting, achieving 15% efficiency gains and 10% faster load times across the platform",
      "Mentored 3 junior developers on Angular best practices, TypeScript implementation, and modern frontend architecture patterns, accelerating team velocity by 25%",
      "Engineered advanced memory optimization with efficient state management solutions, reducing overhead by 30% and significantly improving application stability",
      "Built automated systems integrating with existing enterprise platforms, streamlining workflows and reducing delivery delays by 12%",
      "Led data-driven UI redesign initiative leveraging user analytics and modern React patterns, resulting in 20% increase in user satisfaction scores",
    ],
    techStack: [
      "Angular",
      "Rxjs",
      "TypeScript",
      "Tailwind CSS",
      "SCSS",
      "AWS",
      "Storybook",
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
      "Enhanced DFSP Portal with proactive maintenance and strategic feature integration, driving 30% boost in user engagement within Q1 post-launch",
      "Optimized RESTful APIs for enterprise scalability, slashing response times by 20% and enabling seamless future integrations with third-party services",
      "Designed intuitive, user-centric interfaces for Finance Portal and Admin UI using React and modern UX patterns, improving overall user experience by 25%",
      "Led cross-functional team to successfully launch Thitsa Wallet—a secure digital wallet platform for financial transfers—on schedule and within budget",
      "Established comprehensive documentation processes and development best practices, enhancing team transparency and reducing onboarding time by 40%",
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
      "Delivered pixel-perfect UI implementations from Figma designs using React and Tailwind CSS, achieving 98% design accuracy and 45% faster load times",
      "Built and optimized reusable component architecture, reducing bundle size by 50% and dramatically improving application performance across multiple enterprise projects",
      "Developed comprehensive Access Management Software with detailed technical documentation, leading to successful deployment across 3 major enterprise clients",
      "Integrated Google Maps API and custom QR code tracking system, reducing manual monitoring effort by 40% and improving real-time tracking accuracy",
      "Implemented robust JWT authentication and security middleware protocols, decreasing vulnerability risks by 15% and ensuring full SOC 2 compliance",
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
  const [sectionVisible, setSectionVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
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
            setSectionVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("experience");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

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
    <section
      id="experience"
      className={`py-40 px-6 relative transition-all duration-1000 ${
        sectionVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#4A6FFF] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Building impactful solutions and leading teams across diverse
            industries
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-16 md:space-y-20">
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
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
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
              className="bg-black/40 backdrop-blur-md border border-[#4A6FFF]/10 rounded-2xl p-6 text-center hover:border-[#4A6FFF]/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#4A6FFF]/10"
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
