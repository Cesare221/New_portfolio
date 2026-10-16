import { Monitor, Settings, Link2, FileText, FileCode2, Database } from 'lucide-react';
import { TECH_STACK, STACK_GROUPS } from '../data/portfolio.js';
import {
    FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaPython, FaDocker,
} from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiNextdotjs,
  SiTailwindcss, SiPostgresql, SiPrisma,
  SiMongodb, SiSupabase, SiVercel, SiRailway,
  SiResend, SiSentry, SiGithub, SiOpenai, SiAnthropic,
} from 'react-icons/si';


const TECH_ICONS = {
    javascript: <SiJavascript size={18} color="#F7DF1E" />,
    typescript: <SiTypescript size={18} color="#3178C6" />,
    react: <FaReact size={18} color="#61DAFB" />,
    nextjs: <SiNextdotjs size={18} color="#888" />,
    nodejs: <FaNodeJs size={18} color="#3C873A" />,
    tailwind: <SiTailwindcss size={18} color="#06B6D4" />,
    python: <FaPython size={18} color="#3776AB" />,
    postgresql: <SiPostgresql size={18} color="#4169E1" />,
    prisma: <SiPrisma size={18} color="#888" />,
    docker: <FaDocker size={18} color="#2496ED" />,
    html5: <FaHtml5 size={18} color="#E34F26" />,
    css3: <FaCss3Alt size={18} color="#1572B6" />,
    git: <FaGitAlt size={18} color="#F05032" />,
    mongodb: <SiMongodb size={18} color="#47A248" />,
    supabase: <SiSupabase size={18} color="#3ECF8E" />,
    vercel: <SiVercel size={18} className="text-foreground" />,
    railway: <SiRailway size={18} className="text-foreground" />,
    resend: <SiResend size={18} className="text-foreground" />,
    grok: <span className="font-semibold text-foreground">G</span>,
    sentry: <SiSentry size={18} className="text-foreground" />,
    github: <SiGithub size={18} className="text-foreground" />,
    codex: <SiOpenai size={18} className="text-foreground" />,
    claude: <SiAnthropic size={18} className="text-foreground" />,
};

const techStackWithIcons = TECH_STACK.map((item) => ({
  ...item,
  icon: TECH_ICONS[item.icon],
}));

export default function Stack({ bgCanvas }) {

    return (
        <section
                    id="stack"
                    className={`border-b border-white/10 py-14 sm:py-16 ${bgCanvas} gsap-reveal`}
                    >
                    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 mb-8 grid items-end gap-6 text-left lg:grid-cols-2">
                      <div><span className="eyebrow">Especialidades</span>
                      <h2 className="mt-4 font-display font-semibold text-3xl sm:text-4xl tracking-[-0.02em]">
                        Do problema<br />à solução completa.
                      </h2></div>
                      <p className="mt-4 max-w-2xl text-body-md leading-relaxed text-muted">
                        Combino desenvolvimento web, integrações e automação para transformar problemas reais em soluções práticas.
                        </p>
                    </div>

                    <div className="mx-auto mb-10 grid max-w-content grid-cols-1 gap-px px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 xl:grid-cols-6 lg:px-8">
                      {[
                        { icon: <Monitor />, title: 'Aplicações web', text: 'Interfaces modernas, responsivas e conectadas ao backend.' },
                        { icon: <Settings />, title: 'Automações', text: 'Processos que reduzem tarefas manuais e economizam tempo.' },
                        { icon: <Link2 />, title: 'Integrações', text: 'Conexão entre sistemas, APIs e serviços de terceiros.' },
                        { icon: <FileText />, title: 'OCR', text: 'Extração e organização de dados de documentos.' },
                        { icon: <FileCode2 />, title: 'APIs', text: 'Desenvolvimento e consumo de APIs para conectar aplicações.' },
                        { icon: <Database />, title: 'Sistemas sob medida', text: 'Soluções para organizar dados e apoiar rotinas reais.' },
                      ].map(({ icon, title, text }) => (
                        <div key={title} className="border border-white/10 p-5">
                          <span aria-hidden="true" className="inline-flex text-brand [&>svg]:h-8 [&>svg]:w-8 [&>svg]:stroke-[1.5]">{icon}</span>
                          <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mx-auto mb-5 max-w-content px-4 sm:px-6 lg:px-8"><p className="eyebrow">Tecnologias que utilizo</p></div>
                    <div className="max-w-content mx-auto grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 sm:px-6 lg:px-8">
                    {STACK_GROUPS.map((group) => (
                    <div
                        key={group.id}
                        className="border-t border-white/10 py-4"
                    >
                        <h3 className="font-display text-base font-semibold text-foreground">
                        {group.title}
                        </h3>

                        <ul className="mt-3 flex flex-wrap gap-2">
                        {techStackWithIcons
                            .filter((item) => item.category === group.id)
                            .map((item) => (
                            <li
                                key={item.name}
                                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-2.5 py-1.5 text-body-sm text-muted"
                            >
                                <span aria-hidden="true">{item.icon}</span>
                                <span>{item.name}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                    ))}
                    </div>
            </section>
    );
}
