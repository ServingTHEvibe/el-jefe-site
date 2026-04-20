"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InteractiveProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  logoUrl: string;
  title: string;
  description: string;
  price: string;
  tag?: string;
}

export function InteractiveProductCard({
  className,
  imageUrl,
  logoUrl,
  title,
  description,
  price,
  tag,
  ...props
}: InteractiveProductCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y - height / 2) / (height / 2)) * -8;
    const rotateY = ((x - width / 2) / (width / 2)) * 8;
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-in-out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, transformStyle: "preserve-3d" }}
      className={cn(
        "relative w-full aspect-[9/12] rounded-3xl shadow-xl cursor-pointer",
        className
      )}
      {...props}
    >
      {/* Background image */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover rounded-3xl"
        style={{ transform: "translateZ(-20px) scale(1.1)" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent rounded-3xl" />

      {/* Tag badge */}
      {tag && (
        <div
          className="absolute top-4 left-4 px-3 py-1 text-xs font-black tracking-widest uppercase text-white rounded-none"
          style={{ background: '#E8001D', transform: "translateZ(50px)" }}
        >
          {tag}
        </div>
      )}

      {/* 3D content layer */}
      <div
        className="absolute inset-0 p-5 flex flex-col justify-between"
        style={{ transform: "translateZ(40px)" }}
      >
        {/* Spacer for top */}
        <div />

        {/* Bottom glass card */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-base font-black uppercase text-white leading-tight tracking-tight">
                {title}
              </h3>
              <p className="text-xs text-white/60 font-medium">{description}</p>
            </div>
            {/* El Jefe logo */}
            <img
              src={logoUrl}
              alt="El Jefe Energy"
              className="h-5 w-auto object-contain opacity-90 shrink-0 ml-2 mt-0.5"
            />
          </div>

          {/* Price + CTA row */}
          <div className="flex items-center justify-between px-1">
            <span
              className="rounded-full px-4 py-1.5 text-sm font-black text-white"
              style={{ background: 'rgba(212,175,55,0.25)', border: '1px solid rgba(212,175,55,0.4)' }}
            >
              {price}
            </span>
            <button
              className="px-5 py-1.5 text-xs font-black tracking-widest uppercase text-white rounded-full transition-colors"
              style={{ background: '#E8001D' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#ff1a1a')}
              onMouseLeave={e => (e.currentTarget.style.background = '#E8001D')}
            >
              Shop →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
