"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"button">;

export function MagneticButton({
  href,
  children,
  className = "",
  type = "button",
  ...buttonProps
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.35 });

  function handleMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const wrapperClasses = className.includes("w-full")
    ? "block w-full sm:inline-block sm:w-auto"
    : "inline-block";
  const classes = `border-beam inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold uppercase tracking-[0.16em] text-rice shadow-glow transition duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${className}`;

  if (href) {
    return (
      <motion.span
        className={wrapperClasses}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <Link className={classes} href={href}>
          {children}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.span
      className={wrapperClasses}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <button className={classes} type={type} {...buttonProps}>
        {children}
      </button>
    </motion.span>
  );
}
