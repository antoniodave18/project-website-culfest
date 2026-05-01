'use client';

import { useRef, useEffect, useState } from 'react';

type DescriptionScrollableProps = {
  description: string;
};

export default function DescriptionScrollable({ description }: DescriptionScrollableProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      setIsScrollable(container.scrollHeight > container.clientHeight);
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [description]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="order-2 md:order-1 max-h-50 md:max-h-100 overflow-scroll flex flex-col gap-10"
      >
        <p className="text-justify text-sm md:text-xl lg:text-2xl text-[#461500] font-bold tracking-wide">
          {description}
        </p>
      </div>

      {isScrollable && (
        <div className="absolute -bottom-10 md:-bottom-15 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="animate-bounce">
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-[#461500]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
