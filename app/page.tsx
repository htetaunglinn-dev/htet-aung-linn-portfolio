'use client';

import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import WireframeGlobe from './components/WireframeGlobe';
import FloatingParticles from './components/FloatingParticles';

export default function Home() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

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
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-background to-purple-950/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.08),transparent_50%)]" />
          </div>

          {/* Wireframe Globe */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-4xl aspect-square relative">
              <WireframeGlobe />
            </div>
          </div>

          {/* Floating Stats Cards */}
          <div className="absolute top-1/4 left-[10%] z-20 animate-float">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl">
              <p className="text-xs text-gray-400 mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-white">98%</p>
            </div>
          </div>

          <div className="absolute bottom-1/4 right-[15%] z-20 animate-float-delayed">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl">
              <p className="text-xs text-gray-400 mb-1">Projects Delivered</p>
              <p className="text-2xl font-bold text-white">50+</p>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Elevate Your
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
                Development Experience
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Unlock your project's potential in a fully regulated environment, powered by cutting-edge
              technology and innovative solutions
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="#projects"
                className="px-8 py-3 bg-white hover:bg-gray-100 text-black rounded-lg transition-all duration-300 hover:scale-105 font-medium shadow-lg"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border border-white/20 rounded-lg transition-all duration-300 hover:scale-105 font-medium backdrop-blur-sm"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-32 px-6 relative transition-all duration-1000 ${
          isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { label: 'Years Experience', value: '4+', icon: '🚀' },
              { label: 'Projects Completed', value: '50+', icon: '⚡' },
              { label: 'Client Satisfaction', value: '98%', icon: '⭐' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a passionate Full Stack Developer with over 4 years of experience crafting elegant digital
                solutions. My journey in tech has been driven by a commitment to excellence and innovation.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                From building scalable web applications to implementing cutting-edge AI solutions, I bring
                technical expertise and creative problem-solving to every project. My approach combines clean
                code, thoughtful architecture, and user-centric design.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Currently serving as Lead Developer at GoFive, I specialize in React, Next.js, TypeScript, and
                cloud technologies, delivering solutions that make a real impact.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">Core Expertise</h3>
              <div className="space-y-4">
                {[
                  { skill: 'Frontend Development', level: 95 },
                  { skill: 'Backend Development', level: 90 },
                  { skill: 'Cloud & DevOps', level: 85 },
                  { skill: 'UI/UX Design', level: 80 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{item.skill}</span>
                      <span className="text-blue-400 font-semibold">{item.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                        style={{ width: isVisible.about ? `${item.level}%` : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-32 px-6 bg-black/20 relative transition-all duration-1000 ${
          isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: 'Frontend',
                icon: '🎨',
                skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'React Query'],
              },
              {
                category: 'Backend',
                icon: '⚙️',
                skills: ['Node.js', 'Express', 'NestJS', 'PostgreSQL', 'MongoDB', 'GraphQL'],
              },
              {
                category: 'DevOps & Tools',
                icon: '🚀',
                skills: ['Docker', 'AWS', 'Git', 'CI/CD', 'Nginx', 'Linux'],
              },
            ].map((group, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                <div className="text-5xl mb-4">{group.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-6">{group.category}</h3>
                <div className="space-y-3">
                  {group.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className={`py-32 px-6 relative transition-all duration-1000 ${
          isVisible.experience ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>

          <div className="space-y-8">
            {[
              {
                company: 'GoFive',
                role: 'Lead Developer',
                period: '2023 - Present',
                description:
                  'Leading development of enterprise-level applications, architecting scalable solutions, and mentoring junior developers.',
                achievements: [
                  'Reduced application load time by 60%',
                  'Led team of 5 developers',
                  'Implemented CI/CD pipelines',
                ],
              },
              {
                company: 'ThitsaWorks',
                role: 'Senior Full Stack Developer',
                period: '2022 - 2023',
                description:
                  'Developed and maintained multiple client projects using React, Node.js, and cloud technologies.',
                achievements: [
                  'Delivered 15+ projects successfully',
                  'Improved code quality by 40%',
                  'Integrated AI/ML features',
                ],
              },
              {
                company: 'Smilax Global',
                role: 'Full Stack Developer',
                period: '2021 - 2022',
                description:
                  'Built responsive web applications and RESTful APIs for international clients.',
                achievements: [
                  'Implemented payment gateways',
                  'Optimized database queries',
                  'Enhanced security protocols',
                ],
              },
            ].map((job, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{job.role}</h3>
                    <p className="text-blue-400 font-semibold">{job.company}</p>
                  </div>
                  <div className="text-gray-400 mt-2 md:mt-0">{job.period}</div>
                </div>
                <p className="text-gray-300 mb-4">{job.description}</p>
                <div className="space-y-2">
                  {job.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-gray-300">
                      <div className="text-green-400 mt-1">✓</div>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-32 px-6 bg-black/20 relative transition-all duration-1000 ${
          isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-amber-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Powered Analytics Dashboard',
                description: 'Real-time analytics platform with ML predictions and data visualization',
                tags: ['Next.js', 'Python', 'TensorFlow'],
                impact: '+200% efficiency',
                icon: '📊',
              },
              {
                title: 'E-Commerce Marketplace',
                description: 'Full-featured marketplace with payment integration and admin panel',
                tags: ['React', 'Node.js', 'Stripe'],
                impact: '$500K+ revenue',
                icon: '🛍️',
              },
              {
                title: 'Healthcare Management System',
                description: 'HIPAA-compliant system for patient records and appointment scheduling',
                tags: ['Next.js', 'PostgreSQL', 'AWS'],
                impact: '10K+ users',
                icon: '🏥',
              },
              {
                title: 'Real-Time Collaboration Tool',
                description: 'WebSocket-based platform for team collaboration and project management',
                tags: ['React', 'Socket.io', 'Redis'],
                impact: '5K+ teams',
                icon: '👥',
              },
              {
                title: 'Crypto Trading Platform',
                description: 'Secure platform with real-time charts and automated trading bots',
                tags: ['Next.js', 'WebSocket', 'MongoDB'],
                impact: '$2M+ volume',
                icon: '💰',
              },
              {
                title: 'Social Media Dashboard',
                description: 'Multi-platform analytics and scheduling tool for social media managers',
                tags: ['React', 'Node.js', 'GraphQL'],
                impact: '20K+ posts',
                icon: '📱',
              },
            ].map((project, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
              >
                <div className="text-5xl mb-4">{project.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full font-semibold">
                    {project.impact}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-32 px-6 relative transition-all duration-1000 ${
          isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
              Let's Build Something Amazing
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-16 text-center max-w-2xl mx-auto">
            I'm always excited to collaborate on innovative projects and connect with fellow tech enthusiasts
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                label: 'Email',
                value: 'htet@example.com',
                href: 'mailto:htet@example.com',
                icon: '✉️',
                color: 'blue',
              },
              {
                label: 'GitHub',
                value: '@htetaunglinn',
                href: 'https://github.com/htetaunglinn',
                icon: '💻',
                color: 'purple',
              },
              {
                label: 'LinkedIn',
                value: 'Htet Aung Linn',
                href: 'https://linkedin.com/in/htetaunglinn',
                icon: '💼',
                color: 'blue',
              },
              {
                label: 'Phone',
                value: '+95 123 456 789',
                href: 'tel:+95123456789',
                icon: '📱',
                color: 'green',
              },
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target={contact.label !== 'Email' && contact.label !== 'Phone' ? '_blank' : undefined}
                rel={contact.label !== 'Email' && contact.label !== 'Phone' ? 'noopener noreferrer' : undefined}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 text-center"
              >
                <div className="text-4xl mb-3">{contact.icon}</div>
                <div className="text-sm text-gray-400 mb-1">{contact.label}</div>
                <div className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                  {contact.value}
                </div>
              </a>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Start a Project?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you have a project in mind or just want to chat about technology, I'd love to hear from
              you. Let's create something exceptional together.
            </p>
            <a
              href="mailto:htet@example.com"
              className="inline-block px-8 py-4 bg-white hover:bg-gray-100 text-black rounded-xl transition-all duration-300 hover:scale-105 font-semibold shadow-lg"
            >
              Send Me a Message
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Htet Aung Linn
              </h3>
              <p className="text-gray-400 text-sm">Full Stack Developer & Tech Enthusiast</p>
            </div>

            <div className="flex gap-4">
              {[
                { label: 'GitHub', href: 'https://github.com', icon: '💻' },
                { label: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
                { label: 'Twitter', href: 'https://twitter.com', icon: '🐦' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 text-xl"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Htet Aung Linn. All rights reserved. Built with Next.js & Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
