"use client";

import { useEffect, useState } from "react";
import {FaHtml5, FaCss3 , FaReact , FaJs, FaPhp} from "react-icons/fa"
import {SiTailwindcss, SiNextdotjs, SiFlutter, SiDart, SiExpress, SiAdonisjs, SiTypescript, SiSupabase, SiPostgresql, SiMysql, SiMongodb} from "react-icons/si";


const about = {
  title:"About Me",
  description: "Hello! My name is Habib Azizy Siddiq, and I am 19 years old. I am currently studying at Politeknik Negeri Padang, majoring in Information Technology with a study program in Informatics Management." ,
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
  description: "My education journey so far." ,
  items:[
    {
      Pendidikan: "SDN 13 Balai-Balai",
      tahun: "2013 - 2019"
    },
    {
        Pendidikan: "SMPN 6 Padang Panjang",
        tahun: "2019 - 2022"
    },
    {
      Pendidikan: "SMKN 2 Padang Panjang",
      tahun:"2022 - 2025"
    },
    {
      Pendidikan: "Politeknik Negeri Padang",
      tahun:"2025 - Present"
    },
  ],
};

const skills = {
  title: "My Skills",
  description:
    "Some of the programming languages, frameworks, and databases I have learned.",
  groups: [
    {
      title: "Programming Language",
      items: [
        { icon: <FaJs />, name: "Javascript" },
        { icon: <SiTypescript/>, name: "TypeScript" },
        { icon: <SiDart />, name: "Dart" },
      ],
    },
    {
      title: "FE Framework",
      items: [
        { icon: <FaReact />, name: "React JS" },
        { icon: <SiNextdotjs />, name: "Next JS" },
        { icon: <SiTailwindcss />, name: "Tailwind CSS" },
        { icon: <SiFlutter />, name: "Flutter" },
      ],
    },
    {
      title: "Backend Framework",
      items: [{ icon: <SiExpress />, name: "Express JS" },
        { icon: <SiAdonisjs />, name: "Adonis JS" },
      ],
    },
    {
      title: "Databases",
      items: [
        { icon: <SiSupabase />, name: "Supabase" },
        { icon: <SiPostgresql />, name: "PostgreSQL" },
        { icon: <SiMysql />, name: "MySQL" },
        { icon: <SiMongodb />, name: "MongoDB" },
      ],
    },
  ],
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
  
import { ScrollArea } from "@radix-ui/react-scroll-area";

import { motion } from "framer-motion";

type GithubStats = {
  username: string;
  publicRepos: number | null;
  createdAt: string | null;
  contributionsLastYear: number | null;
  contributionsDaily: { date: string; count: number; color: string }[] | null;
  repos:
    | {
        name: string;
        url: string;
        description: string | null;
        stargazers: number;
        language: string | null;
        updatedAt: string;
      }[]
    | null;
};

const Profile = () => {
  const githubUsername = "hbibazzysddq";
  const [github, setGithub] = useState<GithubStats | null>(null);
  const [githubYear, setGithubYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/github?user=${encodeURIComponent(githubUsername)}&year=${githubYear}&repos=6`
        );
        if (!res.ok) return;
        const data = (await res.json()) as GithubStats;
        if (!cancelled) setGithub(data);
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [githubYear]);

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
      className="flex flex-col xl:flex-row gap-[60px] pb-10">
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

              <div className="pt-6">
                <h4 className="text-2xl font-semibold">GitHub</h4>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[620px] mx-auto xl:mx-0">
                  <div className="bg-[#232329] rounded-xl py-6 px-6 flex flex-col gap-1">
                    <span className="text-white/60 text-sm">Public Repositories</span>
                    <div className="text-3xl font-bold text-accent">
                      {github?.publicRepos ?? "—"}
                    </div>
                    <span className="text-white/50 text-sm">@{githubUsername}</span>
                  </div>
                  <div className="bg-[#232329] rounded-xl py-6 px-6 flex flex-col gap-1">
                    <span className="text-white/60 text-sm">Contributions (Last 12 Months)</span>
                    <div className="text-3xl font-bold text-accent">
                      {github?.contributionsLastYear ?? "—"}
                    </div>
                    <span className="text-white/50 text-sm">
                      {github?.contributionsLastYear == null ? "Set GITHUB_TOKEN to enable." : "From GitHub API"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[620px] mx-auto xl:mx-0">
                  <div className="bg-[#232329] rounded-xl py-6 px-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <h5 className="font-semibold">Contributions</h5>
                        <select
                          value={githubYear}
                          onChange={(e) => setGithubYear(Number(e.target.value))}
                          className="bg-[#27272c] text-white/80 rounded-md px-3 py-1 text-sm outline-none border border-white/10 focus:border-accent"
                        >
                          {(() => {
                            const startYear = github?.createdAt
                              ? new Date(github.createdAt).getFullYear()
                              : new Date().getFullYear();
                            const endYear = new Date().getFullYear();
                            const years: number[] = [];
                            for (let y = endYear; y >= startYear; y--) years.push(y);
                            return years.map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ));
                          })()}
                        </select>
                      </div>
                      <span className="text-white/50 text-sm">{githubYear}</span>
                    </div>
                    <div className="mt-4 space-y-2">
                      {(github?.contributionsDaily ?? []).length === 0 ? (
                        <div className="text-white/50 text-sm">
                          {github?.contributionsDaily == null ? "Set GITHUB_TOKEN to enable." : "No data."}
                        </div>
                      ) : (
                        (() => {
                          const days = github!.contributionsDaily!;
                          const firstDow = new Date(days[0].date).getDay(); // 0=Sun ... 6=Sat
                          const padded: ({ date: string; count: number; color: string } | null)[] = [
                            ...Array.from({ length: firstDow }, () => null),
                            ...days,
                          ];

                          return (
                            <div className="space-y-3">
                              <div className="overflow-x-auto">
                                <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
                                {padded.map((d, idx) => (
                                  <div
                                    key={d ? d.date : `pad-${idx}`}
                                    title={d ? `${d.date} • ${d.count} contributions` : ""}
                                    className="w-3 h-3 rounded-[2px] bg-[#27272c]"
                                    style={d ? { backgroundColor: d.count > 0 ? d.color : "#27272c" } : undefined}
                                  />
                                ))}
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-xs text-white/50">
                                <span>Less</span>
                                <div className="flex items-center gap-1">
                                  {["#27272c", "#0e4429", "#006d32", "#26a641", "#39d353"].map((c) => (
                                    <div key={c} className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: c }} />
                                  ))}
                                </div>
                                <span>More</span>
                              </div>
                            </div>
                          );
                        })()
                      )}
                    </div>
                  </div>

                  <div className="bg-[#232329] rounded-xl py-6 px-6">
                    <div className="flex items-center justify-between gap-4">
                      <h5 className="font-semibold">Recent Repositories</h5>
                      <span className="text-white/50 text-sm">Top 6</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {(github?.repos ?? []).length === 0 ? (
                        <div className="text-white/50 text-sm">No data.</div>
                      ) : (
                        github!.repos!.map((r) => (
                          <a
                            key={r.url}
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block rounded-lg bg-[#27272c] px-4 py-3 hover:bg-[#2d2d33] transition-colors"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="font-semibold">{r.name}</span>
                              <span className="text-white/60 text-sm">★ {r.stargazers}</span>
                            </div>
                            {r.description ? (
                              <div className="text-white/60 text-sm mt-1 line-clamp-2">{r.description}</div>
                            ) : null}
                            <div className="text-white/50 text-xs mt-2">
                              {r.language ?? "—"} • Updated {new Date(r.updatedAt).toLocaleDateString()}
                            </div>
                          </a>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
                        <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.Pendidikan}</h3>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
            </div>
          </TabsContent>




          {/* Skills */}
          <TabsContent value="skills" className="w-full pb-10">
            <div className="flex flex-col gap-[30px]">
              <h3 className="text-4xl font-bold">{skills.title}</h3>
              <p className="max-w-[600px] text-white/60">{skills.description}</p>
            </div>
            <div className="mt-8 space-y-10">
              {skills.groups.map((group) => (
                <section key={group.title} className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="text-2xl font-semibold">{group.title}</h4>
                  </div>

                  <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-[30px]">
                    {group.items.map((skill) => (
                      <li key={`${group.title}-${skill.name}`} className="pt-4 pb-2">
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex flex-col justify-center items-center gap-3 group">
                              <div className="text-6xl group-hover:text-accent transition-all duration-300">
                                {skill.icon}
                              </div>
                              <div className="capitalize text-white/80 group-hover:text-white transition-colors">
                                {skill.name}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize">{skill.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  </motion.div>
  );
};

export default Profile
