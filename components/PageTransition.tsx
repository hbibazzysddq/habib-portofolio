"use client";
import { useEffect, useState } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { usePathname } from 'next/navigation';

const PageTransition = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const pathname = usePathname()
    if (!mounted) return null;

    return (
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          <div key={pathname}>
            <m.div
              initial={{ opacity: 1 }}
              animate={{
                opacity: 0,
                transition: { delay: 1, duration: 0.4, ease: "easeInOut" },
              }}
              className="h-screen w-screen fixed bg-primary top-0 pointer-events-none"
            />
          </div>
        </AnimatePresence>
      </LazyMotion>
    );
}

export default PageTransition;
