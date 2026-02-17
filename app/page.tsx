'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import FloatingParticles from './components/FloatingParticles';
import ParallaxCard from './components/ParallaxCard';
import WorkExperience from './components/WorkExperience';
import TechStackCarousel from './components/TechStackCarousel';
import SecureExternalLink from './components/SecureExternalLink';
import { PROJECTS } from './project-data.const';

export default function Home() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [revealedContacts, setRevealedContacts] = useState<Record<string, boolean>>({});
  const [shootingStars, setShootingStars] = useState<Array<{ top: number; left: number; duration: number; delay: number }>>([]);
  const [isMounted, setIsMounted] = useState(false);

  const handleRevealContact = (type: string) => {
    setRevealedContacts(prev => ({ ...prev, [type]: true }));
  };

  useEffect(() => {
    setIsMounted(true);

    // Generate shooting stars (3 with staggered delays)
    const generatedShootingStars = Array.from({ length: 3 }, (_, i) => ({
      top: Math.random() * 40,
      left: -5 + Math.random() * 15,
      duration: 4 + Math.random() * 3,
      delay: i * 8,
    }));
    setShootingStars(generatedShootingStars);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <FloatingParticles />
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

          {/* Nebula/Galaxy Clouds - visible cosmic colors */}
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-[-10%] right-[10%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.2),rgba(138,43,226,0.12),transparent_70%)] blur-3xl" />
            <div className="absolute bottom-[-5%] left-[5%] w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(138,43,226,0.15),rgba(65,105,225,0.1),transparent_70%)] blur-3xl" />
            <div className="absolute top-[30%] left-[40%] w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(88,60,180,0.1),transparent_70%)] blur-3xl" />
          </div>

          {/* CSS Star Field - 3 layers, ~65 stars, only 3 DOM nodes */}
          <div className="absolute inset-0" style={{ transform: 'translateZ(0)' }}>
            <div className="star-field-layer-1" />
            <div className="star-field-layer-2" />
            <div className="star-field-layer-3" />
          </div>

          {/* Shooting Stars with sparkle trails */}
          {isMounted && (
            <div className="absolute inset-0 overflow-hidden">
              {shootingStars.map((star, i) => (
                <div
                  key={`shooting-${i}`}
                  className="shooting-star-sparkle"
                  style={{
                    top: `${star.top}%`,
                    left: `${star.left}%`,
                    animationName: 'shooting-star',
                    animationDuration: `${star.duration}s`,
                    animationTimingFunction: 'ease-in',
                    animationIterationCount: 'infinite',
                    animationDelay: `${star.delay}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Black Hole Effect - larger, more visible */}
          <div className="absolute top-[15%] right-[10%] w-96 h-96 hidden lg:block">
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
              <div className="absolute inset-[5%] rounded-full accretion-disk" style={{ animationDirection: 'reverse', animationDuration: '15s' }}>
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

          {/* Subtle Geometric Pattern (no mouse parallax) */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(65,105,225,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(65,105,225,0.1) 1px, transparent 1px)`,
              backgroundSize: '100px 100px'
            }} />
          </div>

          {/* Floating Stats Cards */}
          <div className="absolute top-1/4 left-[8%] z-20 animate-float hidden lg:block">
            <div className="bg-black/60 backdrop-blur-md border border-[#4169E1]/20 rounded-xl p-5 shadow-2xl">
              <p className="text-4xl font-bold text-[#4169E1] mb-1">4+</p>
              <p className="text-xs text-gray-400 tracking-wide">Years Experience</p>
            </div>
          </div>

          <div className="absolute bottom-1/4 right-[8%] z-20 animate-float-delayed hidden lg:block">
            <div className="bg-black/60 backdrop-blur-md border border-[#4169E1]/20 rounded-xl p-5 shadow-2xl">
              <p className="text-4xl font-bold text-[#4169E1] mb-1">50+</p>
              <p className="text-xs text-gray-400 tracking-wide">Projects Delivered</p>
            </div>
          </div>

          <div
            className="absolute top-1/3 right-[12%] z-20 animate-float hidden lg:block"
            style={{ animationDelay: '0.5s' }}
          >
            <div className="bg-black/60 backdrop-blur-md border border-[#4169E1]/20 rounded-xl p-5 shadow-2xl">
              <p className="text-4xl font-bold text-[#4169E1] mb-1">98%</p>
              <p className="text-xs text-gray-400 tracking-wide">Client Satisfaction</p>
            </div>
          </div>

          {/* Floating Depth Layers */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-[#4169E1]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-40 right-20 w-40 h-40 bg-[#5a7dee]/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#4169E1]/15 rounded-full blur-2xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-[#4169E1]/10 border border-[#4169E1]/20 rounded-full text-[#4169E1] text-sm font-medium mb-8">
                Software Engineer
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 text-white leading-[1.15] tracking-tight">
              Crafting Digital
              <br />
              <span className="bg-gradient-to-r from-[#4169E1] via-[#5a7dee] to-[#4169E1] bg-clip-text text-transparent">
                Excellence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
              Building exceptional web experiences with modern technologies,
              <br className="hidden md:block" />
              elegant architecture, and meticulous attention to detail
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <a
                href="#projects"
                className="group px-10 py-4 bg-[#4169E1] hover:bg-[#3454b4] text-white rounded-lg transition-all duration-300 hover:scale-105 font-semibold shadow-2xl shadow-[#4169E1]/20"
              >
                View My Work
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="#contact"
                className="px-10 py-4 bg-transparent hover:bg-white/5 text-white border-2 border-[#4169E1]/30 hover:border-[#4169E1] rounded-lg transition-all duration-300 hover:scale-105 font-semibold backdrop-blur-sm"
              >
                Let&apos;s Connect
              </a>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-[#4169E1]/30 rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-2 bg-[#4169E1] rounded-full" />
              </div>
            </div>
          </div>
        </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-40 px-6 relative transition-all duration-1000 ${
          isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Subtle Lighting Effect */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.08),transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center text-white">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#4169E1] to-transparent mx-auto mb-20" />

          <div className="grid md:grid-cols-5 gap-16 items-start">
            <div className="md:col-span-3 space-y-6">
              <p className="text-gray-400 text-lg leading-relaxed">
                I&apos;m a passionate Software Engineer building high-performance web applications
                that drive business growth. My expertise spans the entire development lifecycle—from architecture design to
                production deployment.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Specializing in React ecosystem and modern frontend technologies, I&apos;ve delivered enterprise CRM systems,
                fintech platforms, and scalable SaaS applications. I focus on performance optimization, clean architecture,
                and mentoring teams to build exceptional user experiences.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Currently serving as Software Engineer at GoFive in Bangkok, Thailand, where I lead end-to-end development
                of enterprise solutions, achieving measurable improvements in performance, user satisfaction, and team efficiency.
              </p>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-6 text-white">Core Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  'React',
                  'Next.js',
                  'Angular',
                  'TypeScript',
                  'Node.js',
                  'Express',
                  'PostgreSQL',
                  'MongoDB',
                  'AWS',
                  'Docker',
                  'GraphQL',
                  'REST APIs',
                  'Tailwind CSS',
                  'Git',
                  'CI/CD',
                  'Redux',
                  'NestJS',
                ].map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-[#4169E1]/10 border border-[#4169E1]/20 rounded-lg text-[#4169E1] text-sm font-medium hover:bg-[#4169E1]/20 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
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
      <section
        id="projects"
        className={`py-40 px-6 bg-gradient-to-b from-[#0a0a0a] to-black relative transition-all duration-1000 ${
          isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Subtle Lighting Effects - Reduced from 3 to 1 for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.1),transparent_70%)] blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center text-white">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#4169E1] to-transparent mx-auto mb-20" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full focus:outline-none focus:ring-2 focus:ring-[#4169E1] rounded-2xl"
              >
                <ParallaxCard
                  intensity={10}
                  className="group relative bg-black/40 backdrop-blur-sm border border-[#4169E1]/10 rounded-2xl p-8 hover:border-[#4169E1]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#4169E1]/10 h-full flex flex-col"
                >
                  {/* Thumbnail Placeholder */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-[#4169E1]/10 to-[#4169E1]/5 rounded-xl mb-6 border border-[#4169E1]/10 group-hover:border-[#4169E1]/30 transition-colors overflow-hidden shrink-0">
                    <Image
                      src={project.image}
                      alt={`${project.title} project preview`}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      priority={index < 2}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0icmdiYSg2NSwxMDUsMjI1LDAuMSkiLz48L3N2Zz4="
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#4169E1] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-5 text-sm leading-relaxed flex-grow">{project.description}</p>

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

                  <div
                    className="inline-flex items-center gap-2 text-[#4169E1] font-medium text-sm group-hover:gap-3 transition-all mt-auto"
                  >
                    View Project
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </ParallaxCard>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-40 px-6 relative transition-all duration-1000 ${
          isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Subtle Lighting Effects - Reduced from 3 to 1 for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.12),transparent_70%)] blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center text-white">
            Let&apos;s Work Together
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#4169E1] to-transparent mx-auto mb-12" />
          <p className="text-xl text-gray-400 mb-20 text-center max-w-3xl mx-auto leading-relaxed">
            I&apos;m always excited to collaborate on innovative projects and connect with fellow tech enthusiasts.
            Let&apos;s create something exceptional together.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16" suppressHydrationWarning>
            {[
              {
                label: 'LinkedIn',
                value: 'linkedin.com/in/htet-aung-linn',
                href: 'https://www.linkedin.com/in/htet-aung-linn-51146923b/',
                needsReveal: false,
              },
              {
                label: 'Email',
                value: 'htaunglin@gmail.com',
                href: 'mailto:htaunglin@gmail.com',
                needsReveal: true,
              },
              {
                label: 'GitHub',
                value: 'github.com/htetaunglinn-dev',
                href: 'https://github.com/htetaunglinn-dev',
                needsReveal: false,
              },
              {
                label: 'Phone',
                value: '+66 620911336',
                href: 'tel:+66620911336',
                needsReveal: true,
              },
            ].map((contact, index) => {
              const isRevealed = revealedContacts[contact.label];
              const needsReveal = contact.needsReveal && !isRevealed;

              if (needsReveal) {
                return (
                  <button
                    key={index}
                    onClick={() => handleRevealContact(contact.label)}
                    className="group bg-black/40 backdrop-blur-sm border border-[#4169E1]/10 rounded-2xl p-8 hover:border-[#4169E1]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#4169E1]/10 flex items-center justify-between text-left"
                  >
                    <div>
                      <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">{contact.label}</div>
                      <div className="text-white text-xl font-medium group-hover:text-[#4169E1] transition-colors">
                        Click to reveal {contact.label.toLowerCase()}
                      </div>
                    </div>
                    <span className="text-[#4169E1] text-2xl">🔒</span>
                  </button>
                );
              }

              return (
                <a
                  key={index}
                  href={contact.href}
                  target={contact.label !== 'Email' && contact.label !== 'Phone' ? '_blank' : undefined}
                  rel={contact.label !== 'Email' && contact.label !== 'Phone' ? 'noopener noreferrer' : undefined}
                  className="group bg-black/40 backdrop-blur-sm border border-[#4169E1]/10 rounded-2xl p-8 hover:border-[#4169E1]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#4169E1]/10 flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm text-gray-400 mb-2 uppercase tracking-wider">{contact.label}</div>
                    <div className="text-white text-xl font-medium group-hover:text-[#4169E1] transition-colors">
                      {contact.value}
                    </div>
                  </div>
                  <span className="text-[#4169E1] text-2xl group-hover:translate-x-2 transition-transform">→</span>
                </a>
              );
            })}
          </div>

          <div className="relative bg-gradient-to-r from-[#4169E1]/10 to-[#4169E1]/5 backdrop-blur-sm border-2 border-[#4169E1]/20 rounded-3xl p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(65,105,225,0.1),transparent_70%)]" />
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Have a Project in Mind?
              </h3>
              <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                Whether it&apos;s a complex web application or a simple landing page, I&apos;m here to help bring your
                vision to life with clean code and elegant solutions.
              </p>
              <div className="flex gap-6 justify-center flex-wrap">
                <a
                  href="mailto:htaunglin@gmail.com"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-[#4169E1] hover:bg-[#3454b4] text-white rounded-xl transition-all duration-300 hover:scale-105 font-bold text-lg shadow-2xl shadow-[#4169E1]/20"
                >
                  Send a Message
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
                <a
                  href="/Htet_Aung_Linn_Resume.pdf"
                  download="Htet_Aung_Linn_Resume.pdf"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-transparent hover:bg-white/5 border-2 border-[#4169E1]/30 hover:border-[#4169E1] text-white rounded-xl transition-all duration-300 hover:scale-105 font-bold text-lg"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-[#4169E1]/10 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#4169E1] to-[#5a7dee] bg-clip-text text-transparent mb-3">
                Htet Aung Linn
              </h3>
              <p className="text-gray-400">Software Engineer & Tech Enthusiast</p>
              <p className="text-gray-500 text-sm mt-2">Building the future, one line at a time</p>
            </div>

            <div className="flex gap-4">
              <SecureExternalLink
                href="https://www.linkedin.com/in/htet-aung-linn-51146923b/"
                ariaLabel="LinkedIn"
                className="w-14 h-14 bg-[#4169E1]/10 hover:bg-[#4169E1]/20 border border-[#4169E1]/20 hover:border-[#4169E1] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-6 h-6 text-[#4169E1]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </SecureExternalLink>
              <SecureExternalLink
                href="https://github.com/htetaunglinn-dev"
                ariaLabel="GitHub"
                className="w-14 h-14 bg-[#4169E1]/10 hover:bg-[#4169E1]/20 border border-[#4169E1]/20 hover:border-[#4169E1] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-6 h-6 text-[#4169E1]" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
              </SecureExternalLink>
              <SecureExternalLink
                href="https://www.facebook.com/profile.php?id=100064075331112"
                ariaLabel="Facebook"
                className="w-14 h-14 bg-[#4169E1]/10 hover:bg-[#4169E1]/20 border border-[#4169E1]/20 hover:border-[#4169E1] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <svg className="w-6 h-6 text-[#4169E1]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </SecureExternalLink>
            </div>
          </div>

          <div className="pt-8 border-t border-[#4169E1]/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Htet Aung Linn. All rights reserved.
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
