import Reveal from './Reveal';

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ index, eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-10 md:mb-20">
      <Reveal variant="blur">
        <p className="inline-flex items-center gap-3 text-xs md:text-sm font-medium tracking-[0.35em] uppercase text-[#4169E1] mb-5">
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#4169E1]" />
          {index} · {eyebrow}
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#4169E1]" />
        </p>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">{title}</h2>
      </Reveal>
      <Reveal variant="scale" delay={200}>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#4169E1] to-transparent mx-auto" />
      </Reveal>
      {subtitle && (
        <Reveal delay={300}>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mt-6">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
