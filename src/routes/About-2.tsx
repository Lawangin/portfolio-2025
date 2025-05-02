import { useEffect, useRef, useState } from 'react';
import { animate, createScope, Scope } from 'animejs';
import { createFileRoute } from '@tanstack/react-router'
import {
  SiTypescript,
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiAmazon,
  SiDocker,
  SiHtml5,
  SiCss3,
  SiPostgresql,
  SiMongodb,
  SiGraphql,
  SiGithub,
  SiPython,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaJava } from "react-icons/fa";


export const Route = createFileRoute('/About-2')({
  component: RouteComponent,
})

function RouteComponent() {
  const root = useRef<HTMLDivElement | null>(null);
  const scope = useRef<Scope | null>(null);

  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  const icons = [
    { id: 1, icon: <SiTypescript />, label: 'TypeScript' },
    { id: 2, icon: <SiReact />, label: 'React' },
    { id: 3, icon: <SiJavascript />, label: 'JavaScript' },
    { id: 4, icon: <SiNodedotjs />, label: 'Node.js' },
    { id: 5, icon: <SiAmazon />, label: 'AWS' },
    { id: 6, icon: <SiDocker />, label: 'Docker' },
    { id: 7, icon: <SiHtml5 />, label: 'HTML' },
    { id: 8, icon: <SiCss3 />, label: 'CSS' },
    { id: 9, icon: <SiPostgresql />, label: 'PostgreSQL' },
    { id: 10, icon: <SiMongodb />, label: 'MongoDB' },
    { id: 11, icon: <SiGraphql />, label: 'GraphQL' },
    { id: 12, icon: <VscVscode />, label: 'VS Code' },
    { id: 13, icon: <SiGithub />, label: 'GitHub' },
    { id: 15, icon: <SiPython />, label: 'Python' },
    { id: 16, icon: <FaJava />, label: 'Java' },
  ];

  useEffect(() => {
    scope.current = createScope({ root: root as React.RefObject<HTMLElement | SVGElement> }).add(scope => {

      scope.add('enterIcon', (selector: string) => {
        animate(selector, {
          width: '100px',
          duration: 300,
        });

      });

      scope.add('leaveIcon', (selector: string) => {
        animate(selector, {
          width: '60px',
          duration: 300,
        });
      });

    });

    return () => {
      scope?.current?.revert();
    };
  }, []);

  return (
    <div ref={root} className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-3 gap-6 place-items-start w-75">
        {icons.map(({ id, icon, label }) => (
          <div
            key={id}
            className={
              `w-15 
              h-15 
              relative
              rounded-full 
              border 
              border-white/30 
              bg-white/20 
              backdrop-blur-lg 
              shadow-lg 
              flex 
              items-center 
              justify-center 
              text-white 
              overflow-visible
              icon-bubble-${id}
              `}
            onMouseEnter={() => {
              scope?.current?.methods.enterIcon(`.icon-bubble-${id}`);
              setHoveredIcon(id)
            }
            }
            onMouseLeave={() => {
              scope?.current?.methods.leaveIcon(`.icon-bubble-${id}`);
              setHoveredIcon(null)
            }
            }
          >
            {hoveredIcon !== id && (
              <div
                className={`text-3xl icon-${id}`}
              >
                {icon}
              </div>
            )}

            {hoveredIcon === id && (
              <span className="text-sm font-medium whitespace-nowrap m-20">{label}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
