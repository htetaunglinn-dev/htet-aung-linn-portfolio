'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import FloatingParticles from './components/FloatingParticles';
import ParallaxCard from './components/ParallaxCard';
import WorkExperience from './components/WorkExperience';
import TechStackCarousel from './components/TechStackCarousel';
import SecureExternalLink from './components/SecureExternalLink';

export default function Home() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [revealedContacts, setRevealedContacts] = useState<Record<string, boolean>>({});
  const [stars, setStars] = useState<Array<{ top: number; left: number; size: 'lg' | 'md' | 'sm'; duration: number; delay: number; opacity?: number }>>([]);
  const [shootingStars, setShootingStars] = useState<Array<{ top: number; left: number; duration: number; delay: number }>>([]);
  const [isMounted, setIsMounted] = useState(false);

  const handleRevealContact = (type: string) => {
    setRevealedContacts(prev => ({ ...prev, [type]: true }));
  };

  useEffect(() => {
    setIsMounted(true);

    // Generate stars on client side only
    const generatedStars = [
      // Large stars
      ...Array.from({ length: 20 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 'lg' as const,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 5,
      })),
      // Medium stars
      ...Array.from({ length: 40 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 'md' as const,
        duration: 1.5 + Math.random() * 2,
        delay: Math.random() * 3,
        opacity: 0.6 + Math.random() * 0.4,
      })),
      // Small stars
      ...Array.from({ length: 60 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 'sm' as const,
        duration: 0,
        delay: 0,
        opacity: 0.3 + Math.random() * 0.3,
      })),
    ];
    setStars(generatedStars);

    // Generate shooting stars
    const generatedShootingStars = Array.from({ length: 2 }, (_, i) => ({
      top: Math.random() * 50,
      left: -10 + Math.random() * 20,
      duration: 6 + Math.random() * 4,
      delay: i * 15,
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

          {/* Nebula/Galaxy Clouds */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.15),rgba(138,43,226,0.1),transparent_70%)] blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(138,43,226,0.12),rgba(65,105,225,0.08),transparent_70%)] blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
            <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.1),transparent_60%)] blur-2xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
          </div>

          {/* Starfield Layers - Fixed (No Parallax) */}
          <div className="absolute inset-0 opacity-40" style={{ transform: 'translateZ(0)' }}>
            {stars.map((star, i) => (
              <div
                key={`star-${star.size}-${i}`}
                className={`absolute bg-white rounded-full ${
                  star.size === 'lg' ? 'w-1 h-1 animate-pulse' :
                  star.size === 'md' ? 'w-0.5 h-0.5 animate-pulse' :
                  'w-px h-px'
                }`}
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  transform: 'translate3d(0, 0, 0)',
                  ...(star.duration > 0 && {
                    animationDuration: `${star.duration}s`,
                    animationDelay: `${star.delay}s`,
                  }),
                  ...(star.opacity !== undefined && { opacity: star.opacity }),
                }}
              />
            ))}
          </div>

          {/* Shooting Stars - Fixed (No Parallax) */}
          {isMounted && (
            <div className="absolute inset-0 overflow-hidden">
              {shootingStars.map((star, i) => (
                <div
                  key={`shooting-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: `${star.top}%`,
                    left: `${star.left}%`,
                    animationName: 'shooting-star',
                    animationDuration: `${star.duration}s`,
                    animationTimingFunction: 'ease-in',
                    animationIterationCount: 'infinite',
                    animationDelay: `${star.delay}s`,
                    boxShadow: '0 0 4px 2px rgba(255,255,255,0.3)',
                  }}
                />
              ))}
            </div>
          )}

          {/* Black Hole Effect */}
          <div className="absolute top-1/4 right-[15%] w-64 h-64 hidden lg:block">
            <div className="relative w-full h-full">
              {/* Event Horizon */}
              <div className="absolute inset-0 rounded-full bg-black border-2 border-[#4169E1]/30 animate-pulse" style={{ animationDuration: '3s' }} />

              {/* Accretion Disk */}
              <div className="absolute inset-0 rounded-full">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#4169E1]/20 to-transparent blur-xl animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#8a2be2]/15 to-transparent blur-xl animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
              </div>

              {/* Gravitational Lensing Effect */}
              <div className="absolute -inset-8 rounded-full border border-[#4169E1]/10 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
              <div className="absolute -inset-16 rounded-full border border-[#4169E1]/5 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
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
                I&apos;m a passionate Software Engineer with 4+ years of experience building high-performance web applications
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
        {/* Subtle Lighting Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.1),transparent_70%)] blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(74,111,255,0.08),transparent_70%)] blur-3xl" />
          <div className="absolute bottom-1/4 left-1/2 w-[550px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.09),transparent_70%)] blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center text-white">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#4169E1] to-transparent mx-auto mb-20" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Powered Analytics Dashboard',
                description: 'Real-time analytics platform with ML predictions and data visualization for enterprise clients',
                tags: ['Next.js', 'Python', 'TensorFlow'],
                impact: '+200% efficiency',
                image: '/Project 1.svg',
              },
              {
                title: 'E-Commerce Marketplace',
                description: 'Full-featured marketplace with payment integration, admin panel, and inventory management',
                tags: ['React', 'Node.js', 'Stripe'],
                impact: '$500K+ revenue',
                image: '/Project 2.svg',
              },
              {
                title: 'Healthcare Management System',
                description: 'HIPAA-compliant system for patient records, appointment scheduling, and billing',
                tags: ['Next.js', 'PostgreSQL', 'AWS'],
                impact: '10K+ users',
                image: '/Project 3.svg',
              },
              {
                title: 'Real-Time Collaboration Tool',
                description: 'WebSocket-based platform for team collaboration and agile project management',
                tags: ['React', 'Socket.io', 'Redis'],
                impact: '5K+ teams',
                image: '/Project 4.svg',
              },
              {
                title: 'Crypto Trading Platform',
                description: 'Secure trading platform with real-time charts and automated algorithmic trading bots',
                tags: ['Next.js', 'WebSocket', 'MongoDB'],
                impact: '$2M+ volume',
                image: '/Project 5.svg',
              },
              {
                title: 'Social Media Dashboard',
                description: 'Multi-platform analytics and scheduling tool for social media managers and agencies',
                tags: ['React', 'Node.js', 'GraphQL'],
                impact: '20K+ posts',
                image: '/Project 6.svg',
              },
            ].map((project, index) => (
              <ParallaxCard
                key={index}
                intensity={10}
                className="group relative bg-black/40 backdrop-blur-sm border border-[#4169E1]/10 rounded-2xl p-8 hover:border-[#4169E1]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#4169E1]/10"
              >
                {/* Thumbnail Placeholder */}
                <div className="relative w-full h-48 bg-gradient-to-br from-[#4169E1]/10 to-[#4169E1]/5 rounded-xl mb-6 border border-[#4169E1]/10 group-hover:border-[#4169E1]/30 transition-colors overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} project preview`}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    priority={index < 2}
                  />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#4169E1] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-5 text-sm leading-relaxed">{project.description}</p>

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

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-[#4169E1] font-medium text-sm group-hover:gap-3 transition-all"
                >
                  View Project
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </ParallaxCard>
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
        {/* Subtle Lighting Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/3 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.12),transparent_70%)] blur-3xl" />
          <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(74,111,255,0.1),transparent_70%)] blur-3xl" />
          <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.08),transparent_70%)] blur-3xl" />
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
                  href="/resume.pdf"
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
              &copy; 2025 Htet Aung Linn. All rights reserved.
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
