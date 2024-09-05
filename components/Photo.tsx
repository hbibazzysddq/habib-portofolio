"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const Photo = () => {
  return (
    <div className="w-full h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2, duration: 0.4, ease: "easeIn" }
        }}
        className="relative w-full h-full" // Ukuran sesuai dengan kontainer induk
      >
        <motion.div 
        initial={{opacity: 0}}
        animate={{
            opacity: 1,
            transition: {delay:2.4, duration:0.4, ease:"easeInOut"}
        }}
        className="w-[298] h-[298] xl:w-[498] xl:h-[498] mix-blend-lighten">
        <Image 
            src="/habib.jpg" 
            alt="foto" 
            width={350}
            height={350} 
            className="rounded-full border-accent border-4"
        />   
        </motion.div> 
      </motion.div>
    </div>
  );
}

export default Photo;
