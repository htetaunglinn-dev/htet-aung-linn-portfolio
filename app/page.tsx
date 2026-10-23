"use client";

import Image from "next/image";
import { useState } from "react";
import Navigation from "./components/Navigation";
import CosmosBackground from "./components/CosmosBackground";
import ScrollProgress from "./components/ScrollProgress";
import SmoothScroll from "./components/SmoothScroll";
import Reveal from "./components/Reveal";
import SectionHeading from "./components/SectionHeading";
import ParallaxCard from "./components/ParallaxCard";
import WorkExperience from "./components/WorkExperience";
import TechStackCarousel from "./components/TechStackCarousel";
import SecureExternalLink from "./components/SecureExternalLink";
import { PROJECTS } from "./project-data.const";
import { useCountUp } from "./hooks/useCountUp";
import { useScrollProgress } from "./hooks/useScrollProgress";

const CAREER_START_YEAR = 2022;

const CORE_EXPERTISE = [
  "React",
  "Next.js",
  "Angular",
  "TypeScript",
  "Node.js",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "GraphQL",
  "REST APIs",
  "Tailwind CSS",
  "Git",
  "CI/CD",
  "Redux",
  "NestJS",
];

export default function Home() {
  const yearsExperience = new Date().getFullYear() - CAREER_START_YEAR;
  const yearsCount = useCountUp(yearsExperience);
  const projectsCount = useCountUp(50);
  const satisfactionCount = useCountUp(98);
  const heroRef = useScrollProgress<HTMLElement>("exit");

  const [revealedContacts, setRevealedContacts] = useState<
    Record<string, boolean>
  >({});

  const handleRevealContact = (type: string) => {
    setRevealedContacts((prev) => ({ ...prev, [type]: true }));
  };

  return (
    <>
      <SmoothScroll />
      <CosmosBackground />
      <Navigation />
      <ScrollProgress />
      <main className="min-h-screen overflow-x-hidden">
        {/* Hero Section */}
        <section
          id="home"
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Black Hole: far layer, sinks and grows as you scroll */}
          <div
            aria-hidden="true"
            className="hero-depth-far absolute top-[15%] right-[10%] w-96 h-96 hidden lg:block"
          >
            <div className="relative w-full h-full">
              {/* Deep space void */}
              <div className="absolute inset-[15%] rounded-full bg-black z-10" />

              {/* Event Horizon glow */}
              <div className="absolute inset-[12%] rounded-full border-2 border-[#4169E1]/40 z-10 shadow-[0_0_30px_rgba(65,105,225,0.3),inset_0_0_30px_rgba(65,105,225,0.2)]" />

              {/* Accretion Disk - outer ring */}
              <div className="absolute inset-0 rounded-full accretion-disk">
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(65,105,225,0.4),rgba(138,43,226,0.3),transparent,rgba(65,105,225,0.3),transparent)] blur-md" />
              </div>

              {/* Accretion Disk - inner glow ring */}
              <div
                className="absolute inset-[5%] rounded-full accretion-disk"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "15s",
                }}
              >
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,transparent,rgba(90,125,238,0.5),rgba(138,43,226,0.25),transparent)] blur-sm" />
              </div>

              {/* Gravitational Lensing - glowing rings */}
              <div className="absolute -inset-6 rounded-full border border-[#4169E1]/20 shadow-[0_0_15px_rgba(65,105,225,0.1)]" />
              <div className="absolute -inset-12 rounded-full border border-[#4169E1]/10 shadow-[0_0_10px_rgba(65,105,225,0.05)]" />
              <div className="absolute -inset-20 rounded-full border border-[#4169E1]/5" />

              {/* Light bending streaks near the horizon */}
              <div className="absolute inset-[-2%] rounded-full accretion-glow">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[8px] bg-gradient-to-r from-transparent via-[#4169E1]/30 to-transparent blur-sm rounded-full" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[8px] bg-gradient-to-r from-transparent via-[#5a7dee]/25 to-transparent blur-sm rounded-full" />
              </div>
            </div>
          </div>

          {/* Floating Stats Cards: near layer, drift up faster than the page */}
          <div className="hero-depth-near absolute top-1/4 left-[8%] z-20 hidden lg:block">
            <div className="animate-float">
              <div className="bg-black/75 border border-[#4169E1]/20 rounded-xl p-5 shadow-2xl">
                <p className="text-4xl font-bold text-[#4169E1] mb-1">{yearsCount}+</p>
                <p className="text-xs text-gray-400 tracking-wide">
                  Years Experience
                </p>
              </div>
            </div>
          </div>

          <div className="hero-depth-near absolute bottom-1/4 right-[8%] z-20 hidden lg:block">
            <div className="animate-float-delayed">
              <div className="bg-black/75 border border-[#4169E1]/20 rounded-xl p-5 shadow-2xl">
                <p className="text-4xl font-bold text-[#4169E1] mb-1">{projectsCount}+</p>
                <p className="text-xs text-gray-400 tracking-wide">
                  Projects Delivered
                </p>
              </div>
            </div>
          </div>

          <div className="hero-depth-near absolute top-1/3 right-[12%] z-20 hidden lg:block">
            <div className="animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="bg-black/75 border border-[#4169E1]/20 rounded-xl p-5 shadow-2xl">
                <p className="text-4xl font-bold text-[#4169E1] mb-1">{satisfactionCount}%</p>
                <p className="text-xs text-gray-400 tracking-wide">
                  Client Satisfaction
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="hero-content relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
            {/* Orbit rings behind the headline */}
            <div aria-hidden="true" className="pointer-events-none hidden sm:block">
              <div className="orbit-ring w-[640px] h-[640px]" />
              <div
                className="orbit-ring w-[880px] h-[880px] opacity-60"
                style={{ animationDuration: "90s", animationDirection: "reverse" }}
              />
            </div>

            <Reveal variant="blur" className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#4169E1]/10 border border-[#4169E1]/20 rounded-full text-[#4169E1] text-sm font-medium mb-8">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#4169E1] opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-[#4169E1]" />
                </span>
                Software Engineer
              </span>
            </Reveal>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 text-white leading-[1.15] tracking-tight">
              <Reveal as="span" delay={150} className="inline-block">
                Crafting Digital
              </Reveal>
              <br />
              <Reveal as="span" variant="blur" delay={350} className="inline-block">
                <span className="bg-gradient-to-r from-[#4169E1] via-[#5a7dee] to-[#4169E1] bg-clip-text text-transparent">
                  Excellence
                </span>
              </Reveal>
            </h1>
            <Reveal delay={550}>
              <p className="text-xl md:text-2xl text-gray-400 mb-10 md:mb-16 max-w-3xl mx-auto leading-relaxed font-light">
                Building exceptional web experiences with modern technologies,{" "}
                <br className="hidden md:block" />
                elegant architecture, and meticulous attention to detail
              </p>
            </Reveal>
            <Reveal delay={750} className="flex flex-col items-center sm:flex-row gap-4 justify-center">
              <a
                href="#projects"
                className="group px-8 py-4 md:px-10 bg-[#4169E1] hover:bg-[#3454b4] text-white rounded-lg transition-all duration-300 hover:scale-105 font-semibold shadow-2xl shadow-[#4169E1]/20"
              >
                View My Work
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
              <a
                href="#contact"
                className="px-8 py-4 md:px-10 bg-transparent hover:bg-white/5 text-white border-2 border-[#4169E1]/30 hover:border-[#4169E1] rounded-lg transition-all duration-300 hover:scale-105 font-semibold"
              >
                Let&apos;s Connect
              </a>
            </Reveal>
          </div>

          {/* Scroll Indicator */}
          <a
            href="#about"
            className="hero-content absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-gray-500 hover:text-[#4169E1] transition-colors"
          >
            Scroll to explore
            <span className="w-6 h-10 border-2 border-[#4169E1]/30 rounded-full flex items-start justify-center p-2 animate-bounce">
              <span className="w-1 h-2 bg-[#4169E1] rounded-full" />
            </span>
          </a>
        </section>

        {/* About Section */}
        <section id="about" className="py-10 md:py-16 px-6 relative">
          {/* Subtle Lighting Effect */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.08),transparent_70%)] blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto">
            <SectionHeading index="01" eyebrow="Origin" title="About Me" />

            <div className="grid md:grid-cols-5 gap-8 md:gap-16 items-start">
              <div className="md:col-span-3 space-y-6">
                {[
                  <>
                    I&apos;m a passionate Software Engineer building
                    high-performance web applications that drive business
                    growth. My expertise spans the entire development
                    lifecycle - from architecture design to production deployment.
                  </>,
                  <>
                    Specializing in React ecosystem and modern frontend
                    technologies, I&apos;ve delivered enterprise CRM systems,
                    fintech platforms, and scalable SaaS applications. I focus
                    on performance optimization, clean architecture, and
                    mentoring teams to build exceptional user experiences.
                  </>,
                  <>
                    Currently building multilingual web and mobile experiences
                    at Famoulee, after leading end-to-end development of
                    enterprise solutions at GoFive in Bangkok - achieving
                    measurable improvements in performance, user satisfaction,
                    and team efficiency.
                  </>,
                ].map((paragraph, index) => (
                  <Reveal key={index} variant="left" delay={index * 150}>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>

              <div className="md:col-span-2">
                {/* Profile in orbit */}
                <Reveal variant="scale" className="relative w-48 h-48 mx-auto md:mx-0 mb-12">
                  <div aria-hidden="true" className="orbit-ring w-[135%] h-[135%]" style={{ animationDuration: "24s" }} />
                  <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-[#5a7dee] via-[#4169E1]/40 to-transparent shadow-[0_0_60px_rgba(65,105,225,0.35)]">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
                      <Image
                        src="/profile.jpg"
                        alt="Htet Aung Linn"
                        width={192}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </Reveal>

                <Reveal>
                  <h3 className="text-xl font-semibold mb-6 text-white">
                    Core Expertise
                  </h3>
                </Reveal>
                <div className="flex flex-wrap gap-3">
                  {CORE_EXPERTISE.map((skill, index) => (
                    <Reveal key={skill} as="span" variant="scale" delay={index * 40}>
                      <span className="inline-block px-4 py-2 bg-[#4169E1]/10 border border-[#4169E1]/20 rounded-lg text-[#4169E1] text-sm font-medium hover:bg-[#4169E1]/20 transition-colors cursor-default">
                        {skill}
                      </span>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <TechStackCarousel />

        {/* Experience Section */}
        <WorkExperience />

        {/* Projects Section */}
        <section id="projects" className="py-10 md:py-16 px-6 relative">
          {/* Subtle Lighting Effects - Reduced from 3 to 1 for performance */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.1),transparent_70%)] blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto">
            <SectionHeading
              index="04"
              eyebrow="Missions"
              title="Featured Projects"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.map((project, index) => (
                <Reveal key={project.title} delay={(index % 3) * 120} className="h-full">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full focus:outline-none focus:ring-2 focus:ring-[#4169E1] rounded-2xl"
                  >
                    <ParallaxCard
                      intensity={10}
                      className="group relative bg-black/40 backdrop-blur-sm border border-[#4169E1]/30 lg:border-[#4169E1]/10 rounded-2xl p-8 hover:border-[#4169E1]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#4169E1]/10 h-full flex flex-col"
                    >
                      {/* Thumbnail Placeholder */}
                      <div className="relative w-full h-48 bg-gradient-to-br from-[#4169E1]/10 to-[#4169E1]/5 rounded-xl mb-6 border border-[#4169E1]/30 lg:border-[#4169E1]/10 group-hover:border-[#4169E1]/30 transition-colors overflow-hidden shrink-0">
                        <Image
                          src={project.image}
                          alt={`${project.title} project preview`}
                          fill
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          priority={index < 2}
                          loading={index < 2 ? "eager" : "lazy"}
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0icmdiYSg2NSwxMDUsMjI1LDAuMSkiLz48L3N2Zz4="
                        />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#4169E1] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-5 text-sm leading-relaxed flex-grow">
                        {project.description}
                      </p>

                      <div className="flex items-center gap-2 mb-5">
                        <span className="px-3 py-1.5 bg-[#4169E1]/10 border border-[#4169E1]/20 text-[#4169E1] text-xs rounded-lg font-semibold">
                          {project.impact}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="inline-flex items-center gap-2 text-[#4169E1] font-medium text-sm group-hover:gap-3 transition-all mt-auto">
                        View Project
                        <span className="group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </ParallaxCard>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-10 md:py-16 px-6 relative">
          {/* Subtle Lighting Effects - Reduced from 3 to 1 for performance */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-1/3 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.12),transparent_70%)] blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto">
            <SectionHeading
              index="05"
              eyebrow="Transmission"
              title="Let's Work Together"
              subtitle="I'm always excited to collaborate on innovative projects and connect with fellow tech enthusiasts. Let's create something exceptional together."
            />

            <div
              className="grid md:grid-cols-2 gap-8 mb-16"
              suppressHydrationWarning
            >
              {[
                {
                  label: "LinkedIn",
                  value: "linkedin.com/in/htet-aung-linn",
                  href: "https://www.linkedin.com/in/htet-aung-linn-51146923b/",
                  needsReveal: false,
                },
                {
                  label: "Email",
                  value: "htaunglin@gmail.com",
                  href: "mailto:htaunglin@gmail.com",
                  needsReveal: true,
                },
                {
                  label: "GitHub",
                  value: "github.com/htetaunglinn-dev",
                  href: "https://github.com/htetaunglinn-dev",
                  needsReveal: false,
                },
                {
                  label: "Phone",
                  value: "+66 620911336",
                  href: "tel:+66620911336",
                  needsReveal: true,
                },
              ].map((contact, index) => {
                const isRevealed = revealedContacts[contact.label];
                const needsReveal = contact.needsReveal && !isRevealed;

                const card = needsReveal ? (
                    <button
                      onClick={() => handleRevealContact(contact.label)}
                      className="group bg-black/40 backdrop-blur-sm border border-[#4169E1]/10 rounded-2xl p-5 md:p-8 hover:border-[#4169E1]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#4169E1]/10 w-full h-full flex items-center justify-between text-left"
                    >
                      <div>
                        <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">
                          {contact.label}
                        </div>
                        <div className="text-white text-base md:text-xl font-medium group-hover:text-[#4169E1] transition-colors">
                          Click to reveal {contact.label.toLowerCase()}
                        </div>
                      </div>
                      <span className="text-[#4169E1] text-2xl flex-shrink-0 ml-3">
                        🔒
                      </span>
                    </button>
                ) : (
                  <a
                    href={contact.href}
                    target={
                      contact.label !== "Email" && contact.label !== "Phone"
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      contact.label !== "Email" && contact.label !== "Phone"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group bg-black/40 backdrop-blur-sm border border-[#4169E1]/10 rounded-2xl p-5 md:p-8 hover:border-[#4169E1]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#4169E1]/10 w-full h-full flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">
                        {contact.label}
                      </div>
                      <div className="text-white text-base md:text-xl font-medium group-hover:text-[#4169E1] transition-colors truncate">
                        {contact.value}
                      </div>
                    </div>
                    <span className="text-[#4169E1] text-2xl group-hover:translate-x-2 transition-transform flex-shrink-0 ml-3">
                      →
                    </span>
                  </a>
                );

                return (
                  <Reveal
                    key={contact.label}
                    className="h-full"
                    variant={index % 2 === 0 ? "left" : "right"}
                    delay={Math.floor(index / 2) * 120}
                  >
                    {card}
                  </Reveal>
                );
              })}
            </div>

            <Reveal variant="scale">
              <div className="relative bg-gradient-to-r from-[#4169E1]/10 to-[#4169E1]/5 backdrop-blur-sm border-2 border-[#4169E1]/20 rounded-3xl p-8 md:p-16 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(65,105,225,0.1),transparent_70%)]" />
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Have a Project in Mind?
                  </h3>
                  <p className="text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                    Whether it&apos;s a complex web application or a simple
                    landing page, I&apos;m here to help bring your vision to life
                    with clean code and elegant solutions.
                  </p>
                  <div className="flex flex-col items-center sm:flex-row gap-4 justify-center">
                    <a
                      href="mailto:htaunglin@gmail.com"
                      className="group inline-flex items-center gap-3 px-7 py-4 md:px-10 md:py-5 bg-[#4169E1] hover:bg-[#3454b4] text-white rounded-xl transition-all duration-300 hover:scale-105 font-bold text-base md:text-lg shadow-2xl shadow-[#4169E1]/20"
                    >
                      Send a Message
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </a>
                    <a
                      href="/Htet_Aung_Linn_Resume.pdf"
                      download="Htet_Aung_Linn_Resume.pdf"
                      className="inline-flex items-center gap-3 px-7 py-4 md:px-10 md:py-5 bg-transparent hover:bg-white/5 border-2 border-[#4169E1]/30 hover:border-[#4169E1] text-white rounded-xl transition-all duration-300 hover:scale-105 font-bold text-base md:text-lg"
                    >
                      Download Resume
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative overflow-hidden pt-40 pb-16 px-6">
          {/* Planet horizon: rises into view over the last stretch of the page.
              The mask fades its glow out before the footer's top edge, so there is no hard line. */}
          <div aria-hidden="true" className="horizon-frame absolute inset-0 overflow-hidden pointer-events-none">
            <div data-page-progress className="horizon absolute left-1/2 top-40" />
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#4169E1] to-[#5a7dee] bg-clip-text text-transparent mb-3">
                  Htet Aung Linn
                </h3>
                <p className="text-gray-400">
                  Software Engineer & Tech Enthusiast
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Building the future, one line at a time
                </p>
              </div>

              <div className="flex gap-4">
                <SecureExternalLink
                  href="https://www.linkedin.com/in/htet-aung-linn-51146923b/"
                  ariaLabel="LinkedIn"
                  className="w-14 h-14 bg-[#4169E1]/10 hover:bg-[#4169E1]/20 border border-[#4169E1]/20 hover:border-[#4169E1] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg
                    className="w-6 h-6 text-[#4169E1]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </SecureExternalLink>
                <SecureExternalLink
                  href="https://github.com/htetaunglinn-dev"
                  ariaLabel="GitHub"
                  className="w-14 h-14 bg-[#4169E1]/10 hover:bg-[#4169E1]/20 border border-[#4169E1]/20 hover:border-[#4169E1] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg
                    className="w-6 h-6 text-[#4169E1]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </SecureExternalLink>
                <SecureExternalLink
                  href="https://www.facebook.com/profile.php?id=100064075331112"
                  ariaLabel="Facebook"
                  className="w-14 h-14 bg-[#4169E1]/10 hover:bg-[#4169E1]/20 border border-[#4169E1]/20 hover:border-[#4169E1] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg
                    className="w-6 h-6 text-[#4169E1]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </SecureExternalLink>
              </div>
            </div>

            <div className="pt-8 border-t border-[#4169E1]/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Htet Aung Linn. All rights
                reserved.
              </p>
              <p className="text-gray-500 text-sm">
                Built with Next.js, TypeScript & Tailwind CSS
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
