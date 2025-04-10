import { createFileRoute } from '@tanstack/react-router'
import { animate, svg, utils, Scope, createScope } from 'animejs';
import { useEffect, useRef } from 'react';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  const root = useRef<HTMLDivElement | null>(null);
  const scope = useRef<Scope | null>(null);

  useEffect(() => {
    scope.current = createScope({ root: root as React.RefObject<HTMLElement | SVGElement> }).add(scope => {
      // utils.set('circle-two', { points: })
      // animate('.circle-one', {
      //   d: svg.morphTo(".circle-two"),
      //   duration: 1500,
      //   easing: 'easeInOutQuad',
      //   direction: 'alternate',
      //   loop: true
      // });
    });
    return () => scope?.current?.revert();
  }, []);


  return (
    <div ref={root}>
      <svg viewBox="0 0 200 200" width="300" height="300">
        <path className="circle-one" fill="#4f46e5" d="M100,50
  C130,50 150,70 150,100
  C150,130 130,150 100,150
  C70,150 50,130 50,100
  C50,70 70,50 100,50 Z" />

        <path className="circle-two" fill="red"
          style={{ opacity: 0, width: '30px', height: 'auto' }} d="M200,60
C224,60 240,76 240,100
C240,124 224,140 200,140
C176,140 160,124 160,100
C160,76 176,60 200,60 Z" />
      </svg>
    </div>

  )
}
