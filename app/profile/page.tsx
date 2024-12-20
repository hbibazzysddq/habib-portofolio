"use client";

import { Description } from "@radix-ui/react-dialog";
import { info } from "console";
import { title } from "process";
import {FaHtml5, FaCss3 , FaReact , FaJs, FaPhp} from "react-icons/fa"
import {SiTailwindcss, SiNextdotjs, SiFlutter, SiDart, SiExpress} from "react-icons/si";


const about = {
  title:"About Me",
  description: "Hello! My name is Habib Azizy Siddiq, and I am 17 years old. I am studying at SMKN 2 Padang Panjang with a focus on Software Engineering, and I am currently in the 12th grade." ,
  items: [
    {
      fieldName: "Name",
      fieldValue:"Habib Azizy Siddiq"
    },
    {
      fieldName: "Phone",
      fieldValue:"(+62) 896-1605-6468"
    },
    {
      fieldName: "Email",
      fieldValue:"habibsiddiq169@gmail.com"
    },
    {
      fieldName: "Status",
      fieldValue:"Student"
    }
  ]
};


const pendidikan = {
  title:"My Education ",
  description: "The education that I have undergone at this time" ,
  items:[
    {
      sekolah: "SDN 13 Balai-Balai",
      tahun: "2013 - 2019"
    },
    {
        sekolah: "SMPN 6 Padang Panjang",
        tahun: "2019 - 2022"
    },
    {
      sekolah: "SMKN 2 Padang Panjang",
      tahun:"2022 - 2025"
    },
  ],
};

const skills = {
  title:"My Skill",
  description:"Some of the Programming Languages, Libraries, and Frameworks I have learned.",
  skillist:[
    {
      icon: <FaHtml5/>,
      name: "html 5"
    },
    {
      icon: <FaCss3/>,
      name: "css3"
    },
    {
      icon: <FaJs/>,
      name:"javascript"
    },
    {
      icon: <FaPhp/>,
      name:"php"
    },
    {
      icon: <FaReact/>,
      name:"react.js"
    },
    {
      icon: <SiNextdotjs/>,
      name:"next.js"
    },
    {
      icon: <SiTailwindcss/>,
      name:"tailwind.css"
    },
    {
      icon: <SiFlutter/>,
      name:"flutter"
    },
    {
      icon: <SiDart/>,
      name:"dart"
    },
    {
      icon: <SiExpress/>,
      name:"express"
    }
  ]
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
  
import { ScrollArea } from "@radix-ui/react-scroll-area";

import { motion } from "framer-motion";

const profile = () => {
  return (
  <motion.div initial={{ opacity:0}} animate={{
    opacity:1,
    transition: {
      delay:2.4,
      duration:0.4,
      ease:"easeIn"
    }
  }}
  className="min-h-[81.2vh] flex items-center justify-center py-10 xl:py-0 xl:px-36">
    <div className="container mx-auto">




      {/* About */}
      <Tabs defaultValue="about"
      className="flex flex-col xl:flex-row gap-[60px]">
        <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
          <TabsTrigger value="about" className="inline-flex  items-center w-full bg-[#27272c] justify-center whitespace-nowrap text-white rounded-lg p-3 text-base font-medium ring-offset-white transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-accent data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-sm">About Me</TabsTrigger>
          <TabsTrigger value="education" className="inline-flex  items-center w-full bg-[#27272c] justify-center whitespace-nowrap text-white rounded-lg p-3 text-base font-medium ring-offset-white transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-accent data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-sm">My Education</TabsTrigger>
          <TabsTrigger value="skills" className="inline-flex  items-center w-full bg-[#27272c] justify-center whitespace-nowrap text-white rounded-lg p-3 text-base font-medium ring-offset-white transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-accent data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-sm">My Skills</TabsTrigger>
        </TabsList>
        <div className=" w-full">
          <TabsContent value="about" className="min-h-[81.2vh] w-full">
            <div className="flex flex-col gap-[30px] text-center xl:text-left">
              <h3 className="text-4xl font-bold">{about.title}</h3>
              <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{about.description}
              </p>
              <ScrollArea className="h-full">
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                {about.items.map((item, index) => (
                  <li key={index}
                  className="flex items-center justify-center xl:justify-start gap-4">
                    <span className="text-white/60">{item.fieldName}</span>
                    <p className="text-base">{item.fieldValue}</p>
                  </li>
                ))}
                </ul>
              </ScrollArea>
            </div>
          </TabsContent>




          {/* Education */}
          <TabsContent value="education" className="min-h-[121.2vh] xl:min-h-[81.2vh] w-full ">
            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">
                  {pendidikan.title}
                </h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{pendidikan.description}</p>
                <ScrollArea className="h-[400px] ">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {pendidikan.items.map((item, index)=> (
                      <li key={index}
                      className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1" >
                        <span className="text-accent">{item.tahun}</span>
                        <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.sekolah}</h3>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
            </div>
          </TabsContent>




          {/* Skills */}
          <TabsContent value="skills" className="w-full">
            <div className="flex flex-col gap-[30px]">
              <h3 className="text-4xl font-bold">{skills.title}</h3>
              <p className="max-w-[600px] text-white/60">{skills.description}</p>
            </div>
            <ul className="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
              {skills.skillist.map((skill, index)=>{
                return(
                <li key={index}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                        <div className="text-6xl group-hover:text-accent transition-all duration-300">{skill.icon}</div>
                      </TooltipTrigger>
                      <TooltipTrigger className="">
                        <div className="capitalize">{skill.name}</div>
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                </li>
                )
              })}
            </ul>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  </motion.div>
  );
};

export default profile
