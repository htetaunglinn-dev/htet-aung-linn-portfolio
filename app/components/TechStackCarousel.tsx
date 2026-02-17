'use client';

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiTailwindcss,
  SiRedux,
  SiDocker,
  SiAwsamplify,
  SiGit,
  SiLinux,
  SiNginx,
  SiMysql
} from 'react-icons/si';
import { IconType } from 'react-icons';

interface TechLogo {
  name: string;
  Icon: IconType;
}

const techLogos: TechLogo[] = [
  { name: 'React', Icon: SiReact },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Express', Icon: SiExpress },
  { name: 'NestJS', Icon: SiNestjs },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'GraphQL', Icon: SiGraphql },
  { name: 'Tailwind CSS', Icon: SiTailwindcss },
  { name: 'Redux', Icon: SiRedux },
  { name: 'Docker', Icon: SiDocker },
  { name: 'AWS', Icon: SiAwsamplify },
  { name: 'Git', Icon: SiGit },
  { name: 'Linux', Icon: SiLinux },
  { name: 'Nginx', Icon: SiNginx },
  { name: 'MySQL', Icon: SiMysql },
];

export default function TechStackCarousel() {
  // Duplicate the logos array for seamless loop
  const duplicatedLogos = [...techLogos, ...techLogos];

  return (
    <section className="py-40 px-6 bg-gradient-to-b from-black to-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Infinite Scrolling Carousel */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays - Extended to full edges */}
          <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-black via-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-black via-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div className="flex gap-12 py-8 overflow-hidden">
            <div className="flex gap-12 animate-scroll-smooth">
              {duplicatedLogos.map((tech, index) => {
                const Icon = tech.Icon;
                return (
                  <div
                    key={`${tech.name}-${index}`}
                    className="flex-shrink-0"
                  >
                    <div className="w-24 h-24 bg-[#0a0a0a]/90 border border-[#4A6FFF]/20 rounded-2xl p-5 shadow-lg shadow-[#4A6FFF]/30 flex items-center justify-center">
                      <Icon className="w-full h-full text-white opacity-80" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#4A6FFF]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#4A6FFF]/5 rounded-full blur-3xl" />
        {/* Additional Lighting Effects */}
        <div className="absolute top-0 left-10 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(65,105,225,0.1),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(74,111,255,0.08),transparent_70%)] blur-3xl" />
      </div>

      <style jsx>{`
        @keyframes scroll-smooth {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }

        .animate-scroll-smooth {
          animation: scroll-smooth 30s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
