'use client';

import { useEffect, useState } from 'react';
import WorkExperienceCard from './WorkExperienceCard';

interface WorkExperienceItem {
  company: string;
  companyUrl: string;
  logo: string;
  position: string;
  period: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

const workExperience: WorkExperienceItem[] = [
  {
    company: 'GoFive',
    companyUrl: 'https://www.gofive.co.th/',
    logo: 'https://res.cloudinary.com/htetaunglinn-dev/image/upload/v1739081714/Portfolio%20Next%20JS%202025/logo/3.png',
    position: 'Frontend Developer',
    period: 'Jan 2024 - Present',
    duration: '1 year 9 months',
    location: 'Bangkok, Thailand',
    description:
      'Leading development of enterprise-level web applications, architecting scalable solutions with modern technologies, and delivering high-performance user experiences for international clients.',
    achievements: [
      'Architected and deployed 3 enterprise SaaS platforms serving 50,000+ active users with 99.9% uptime',
      'Reduced application load time by 60% through code splitting, lazy loading, and optimization techniques',
      'Implemented real-time collaboration features using WebSockets, improving team productivity by 45%',
      'Led team of 5 developers, conducting code reviews and establishing best practices that improved code quality by 40%',
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'React Query', 'AWS', 'Docker'],
  },
  {
    company: 'ThitsaWorks',
    companyUrl: 'https://www.thitsaworks.com/',
    logo: 'https://res.cloudinary.com/htetaunglinn-dev/image/upload/v1739081714/Portfolio%20Next%20JS%202025/logo/2.png',
    position: 'Frontend Developer',
    period: 'Apr 2023 - Jan 2024',
    duration: '9 months',
    location: 'Yangon, Myanmar',
    description:
      'Developed and maintained multiple client projects using React, Node.js, and cloud technologies. Delivered full-stack solutions with focus on performance and user experience.',
    achievements: [
      'Successfully delivered 15+ client projects with 98% satisfaction rate and zero critical bugs',
      'Implemented CI/CD pipelines using GitHub Actions, reducing deployment time from 2 hours to 15 minutes',
      'Integrated AI/ML features including image recognition and natural language processing for enhanced UX',
      'Optimized database queries and API responses, improving overall application performance by 50%',
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL', 'AWS', 'Git'],
  },
  {
    company: 'Smilax Global',
    companyUrl: 'https://smilaxglobal.com/',
    logo: 'https://res.cloudinary.com/htetaunglinn-dev/image/upload/v1739081714/Portfolio%20Next%20JS%202025/logo/1.png',
    position: 'Frontend Developer',
    period: 'Mar 2022 - Feb 2023',
    duration: '1 year',
    location: 'Yangon, Myanmar',
    description:
      'Built responsive web applications and RESTful APIs for international clients, focusing on e-commerce solutions with secure payment integrations and scalable architectures.',
    achievements: [
      'Developed secure e-commerce platform processing $500K+ in transactions using Stripe integration',
      'Implemented comprehensive security protocols including JWT authentication and role-based access control',
      'Enhanced database performance by 50% through query optimization and proper indexing strategies',
      'Created reusable component library reducing development time for new features by 30%',
    ],
    techStack: ['React', 'JavaScript', 'Node.js', 'MySQL', 'Stripe', 'REST APIs', 'Linux', 'Nginx'],
  },
];

export default function WorkExperience() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState({ years: 0, projects: 0, satisfaction: 0, users: 0 });

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

    const section = document.getElementById('experience');
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
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    const stats = document.getElementById('experience-stats');
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
        sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
            Building impactful solutions and leading teams across diverse industries
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
        <div id="experience-stats" className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: counts.years, suffix: '+', label: 'Years Experience' },
            { value: counts.projects, suffix: '+', label: 'Projects Completed' },
            { value: counts.satisfaction, suffix: '%', label: 'Client Satisfaction' },
            { value: counts.users, suffix: 'K+', label: 'Users Served' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-md border border-[#4A6FFF]/10 rounded-2xl p-6 text-center hover:border-[#4A6FFF]/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#4A6FFF]/10"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#4A6FFF] mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
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
