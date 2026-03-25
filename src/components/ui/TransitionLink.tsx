"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode } from "react";
import { animate } from "framer-motion";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  href: string;
}

export default function TransitionLink({ children, href, className, ...props }: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.location.pathname === href) return;

    // 1. Accent bar slides in from left (200ms)
    await animate(
      "#transition-bar",
      { scaleX: 1 },
      { duration: 0.2, ease: "easeIn" }
    );

    // 2. Black screen slides up (350ms)
    await animate(
      "#transition-overlay",
      { clipPath: "inset(0% 0 0 0)" },
      { duration: 0.35, ease: [0.65, 0, 0.35, 1] } // power3.inOut equivalent
    );

    // Navigate to next page
    router.push(href);

    // Reset bar quietly
    animate("#transition-bar", { scaleX: 0 }, { duration: 0 });

    // 3. New page entry: Wait slightly for React to mount new route
    setTimeout(async () => {
      // Black screen slides up and out
      await animate(
        "#transition-overlay",
        { clipPath: "inset(0% 0 100% 0)" },
        { duration: 0.35, ease: [0.65, 0, 0.35, 1] }
      );
      
      // Reset overlay quietly for next use
      animate("#transition-overlay", { clipPath: "inset(100% 0 0 0)" }, { duration: 0 });
    }, 150);
  };

  return (
    <Link {...props} href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
