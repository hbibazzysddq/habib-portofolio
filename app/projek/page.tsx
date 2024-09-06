"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import Link from "next/link";
import Image from "next/image";
import { Swiper as SwiperType } from "swiper";  // Import Swiper type
import WorkSliderBtns from "@/components/WorkSliderBtns";

// Projects array
const projects = [
  {
    num: "01",
    category: "Crud dengan Php",
    title: "Project 1",
    description: "Crud Menggunakan Php",
    stack: [
      { name: "Html" },
      { name: "Css" },
      { name: "Php" },
    ],
    image:"/",
    live:"",
    github:""
  },
  {
    num: "02",
    category: "Aplikasi To Do List With Laravel",
    title: "Project 2",
    description: "Membuat aplikasi To Do List sederhana menggunakan Laravel",
    stack: [
      { name: "Html" },
      { name: "Css" },
      { name: "Php" },
      { name: "laravel" },
    ],
    image: '/', // Ganti dengan path gambar yang benar
    live: "",
    github: ""
  },
  // Tambahkan proyek lain di sini jika ada
];

const Projek = () => {
  const [project, setProject] = useState(projects[0]); // Set default project

  // Define the type of swiper parameter explicitly
  const handleSlideChange = (swiper: SwiperType) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, 
        transition: { delay: 2.4,duration:0.4, ease:"easeIn"}
      }}
      className="max-h-full flex flex-col justify-center py-5 xl:px-36 pb-[85px]"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col justify-around order-2 xl:order-none">
            <div className="flex flex-col gap-[30px]">
              <div className="text-8xl leading-none font-extrabold text-white">
                {project.num}
              </div>
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.category}
              </h2>
              <p className="text-white/60">{project.description}</p>

              {/* Stack rendering */}
              <ul className="flex gap-1">
                {project.stack.map((item, index) => (
                  <li key={index} className="text-xl text-accent">
                    {item.name}
                    {index !== project.stack.length - 1 && ", "}
                  </li>
                ))}
              </ul>

              <div className="border border-white/20 my-4"></div>
            </div>

            {/* Live and GitHub Links with Tooltip */}
            <div className="flex items-center gap-4">
              <Link href={project.live}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                      <BsArrowUpRight className="text-white text-2xl group-hover:text-accent" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Live project</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>

              <Link href={project.github}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                      <BsGithub className="text-white text-2xl" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>GitHub</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </div>
          </div>

          {/* Right column with slider */}
          <div className="w-full xl:w-[50%] ">
            <Swiper onSlideChange={handleSlideChange} spaceBetween={30} slidesPerView={1}
            className="xl:h-[520px] mb-12"
           
            >
              {projects.map((project, index) => (
                <SwiperSlide key={index} className="xl:h-[520px] ">
                  <div className="h-[460px] relative group flex justify-center items-center bg-pink-50">
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      <div className="relative w-full h-full">
                          <Image
                          src = {project.image}
                          fill
                          className="object-cover"
                          alt=""
                          />
                      </div>
                  </div>
                </SwiperSlide>
              ))}

              <WorkSliderBtns 
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none" 
                btnStyles="bg-accent hover:bg-accent-hover text-primary text[22px] w-[44px] h-[44px] flex justify-center items-center transition-all" 
                iconStyles={""}              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projek;
