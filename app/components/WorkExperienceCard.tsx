"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface WorkExperienceCardProps {
  company: string;
  companyUrl: string;
  logo: string;
  position: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
  isLast?: boolean;
  index: number;
}

export default function WorkExperienceCard({
  company,
  companyUrl,
  logo,
  position,
  period,
  location,
  description,
  achievements,
  techStack,
  isLast = false,
  index,
}: WorkExperienceCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`experience-card-${index}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      id={`experience-card-${index}`}
      className={`relative transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Content Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column - Date and Logo (Desktop) */}
        <div className="hidden md:flex flex-col items-end pr-12 text-right">
          <div className="sticky top-24">
            {/* Company Logo */}
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl p-3 mb-4 border border-[#4A6FFF]/20 hover:border-[#4A6FFF]/50 transition-all duration-300 hover:scale-105 shadow-lg group">
              <div className="relative w-full h-full">
                <Image
                  src={logo}
                  alt={`${company} logo`}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 rounded-lg"
                />
              </div>
            </div>

            {/* Date Badge */}
            <div className="inline-flex flex-col items-end">
              <div className="px-4 py-2 bg-[#4A6FFF]/10 border border-[#4A6FFF]/30 rounded-lg text-[#4A6FFF] text-sm font-semibold mb-2 backdrop-blur-sm">
                {period}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Main Content */}
        <div className="md:col-span-2">
          <div className="group bg-black/40 backdrop-blur-md border border-[#4A6FFF]/10 rounded-2xl p-8 hover:border-[#4A6FFF]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#4A6FFF]/10 hover:-translate-y-1">
            {/* Mobile - Logo and Date */}
            <div className="md:hidden mb-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-[#4A6FFF]/20">
                  <div className="relative w-full h-full">
                    <Image
                      src={logo}
                      alt={`${company} logo`}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <div className="px-3 py-1.5 bg-[#4A6FFF]/10 border border-[#4A6FFF]/30 rounded-lg text-[#4A6FFF] text-xs font-semibold mb-1">
                    {period}
                  </div>
                </div>
              </div>
            </div>

            {/* Company Name */}
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-3xl font-bold text-white hover:text-[#4A6FFF] transition-colors duration-300 mb-2 group/link"
            >
              {company}
              <svg
                className="w-5 h-5 opacity-0 group-hover/link:opacity-100 -translate-y-1 translate-x-1 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            {/* Position and Location */}
            <h3 className="text-xl font-semibold text-gray-300 mb-1">
              {position}
            </h3>
            <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {location}
            </p>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed mb-6 text-[15px]">
              {description}
            </p>

            {/* Achievements */}
            <div className="space-y-3 mb-6">
              {achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-gray-400 text-[15px] leading-relaxed group/item"
                >
                  <div className="mt-1.5 flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-[#4A6FFF] group-hover/item:scale-110 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="group-hover/item:text-gray-300 transition-colors duration-200">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="border-t border-[#4A6FFF]/10 pt-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-[#4A6FFF]/10 border border-[#4A6FFF]/20 text-[#4A6FFF] text-sm rounded-lg hover:bg-[#4A6FFF]/20 hover:border-[#4A6FFF]/40 hover:scale-105 transition-all duration-200 cursor-default font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
