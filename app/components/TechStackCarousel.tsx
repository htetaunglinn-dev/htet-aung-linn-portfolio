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
  SiGit,
  SiLinux,
  SiNginx,
  SiMysql,
  SiAngular,
  SiReactivex,
  SiSass,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiSocketdotio,
  SiRedis,
  SiPrisma,
  SiPython,
  SiStorybook,
  SiVitest,
  SiFigma,
  SiStripe,
  SiVercel,
  SiGithubactions,
  SiPostman,
  SiMui,
} from 'react-icons/si';
import SectionHeading from './SectionHeading';
import { FaAws } from 'react-icons/fa6';
import { IconType } from 'react-icons';

interface TechLogo {
  name: string;
  Icon: IconType;
}

// Two rows drifting in opposite directions, like orbits at different radii.
const languagesAndFrameworks: TechLogo[] = [
  { name: 'React', Icon: SiReact },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'Angular', Icon: SiAngular },
  { name: 'RxJS', Icon: SiReactivex },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Express', Icon: SiExpress },
  { name: 'NestJS', Icon: SiNestjs },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'GraphQL', Icon: SiGraphql },
  { name: 'Tailwind CSS', Icon: SiTailwindcss },
  { name: 'Redux', Icon: SiRedux },
  { name: 'Sass', Icon: SiSass },
  { name: 'Material UI', Icon: SiMui },
  { name: 'Flutter', Icon: SiFlutter },
  { name: 'Dart', Icon: SiDart },
  { name: 'Python', Icon: SiPython },
];

const platformsAndTools: TechLogo[] = [
  { name: 'Docker', Icon: SiDocker },
  { name: 'AWS', Icon: FaAws },
  { name: 'Git', Icon: SiGit },
  { name: 'Linux', Icon: SiLinux },
  { name: 'Nginx', Icon: SiNginx },
  { name: 'MySQL', Icon: SiMysql },
  { name: 'Redis', Icon: SiRedis },
  { name: 'Prisma', Icon: SiPrisma },
  { name: 'Firebase', Icon: SiFirebase },
  { name: 'Socket.io', Icon: SiSocketdotio },
  { name: 'Stripe', Icon: SiStripe },
  { name: 'Vercel', Icon: SiVercel },
  { name: 'GitHub Actions', Icon: SiGithubactions },
  { name: 'Storybook', Icon: SiStorybook },
  { name: 'Vitest', Icon: SiVitest },
  { name: 'Postman', Icon: SiPostman },
  { name: 'Figma', Icon: SiFigma },
];

function LogoRow({ logos, reverse = false }: { logos: TechLogo[]; reverse?: boolean }) {
  // Duplicate the logos array for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="flex py-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className={`flex gap-12 pr-12 animate-scroll-smooth ${reverse ? 'animate-scroll-reverse' : ''}`}>
        {duplicatedLogos.map((tech, index) => {
          const Icon = tech.Icon;
          return (
            <div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0"
              title={tech.name}
              aria-hidden={index >= logos.length}
            >
              <div className="w-24 h-24 bg-[#0a0a0a]/90 border border-[#4A6FFF]/20 rounded-2xl p-5 shadow-lg shadow-[#4A6FFF]/30 flex items-center justify-center">
                <Icon className="w-full h-full text-white opacity-80" aria-label={tech.name} />
              </div>
            </div>
          );
        })}
      </div>
        <style jsx>{`
          @keyframes scroll-smooth {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll-smooth {
            animation: scroll-smooth 45s linear infinite;
            will-change: transform;
          }

          .animate-scroll-reverse {
            animation-direction: reverse;
            animation-duration: 55s;
          }

          .animate-scroll-smooth:hover {
            animation-play-state: paused;
          }
        `}</style>
    </div>
  );
}

export default function TechStackCarousel() {
  return (
    <section id="skills" className="py-10 md:py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          index="02"
          eyebrow="Toolkit"
          title="Tech Universe"
          subtitle="The languages, frameworks and platforms I build with every day"
        />

        {/* Infinite Scrolling Carousel */}
        <div className="relative space-y-4">
          <LogoRow logos={languagesAndFrameworks} />
          <LogoRow logos={platformsAndTools} reverse />
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#4A6FFF]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#4A6FFF]/5 rounded-full blur-3xl" />
      </div>

    </section>
  );
}
