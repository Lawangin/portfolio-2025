import { useEffect, useRef } from 'react'
import { animate, Scope } from 'animejs'
import { createFileRoute } from '@tanstack/react-router'
import { usePageContext } from '@/context/PageContext/PageContext'
import { SkillsPage } from '@/components/SkillsPage/SkillsPage'

export const Route = createFileRoute('/about-2')({
  component: RouteComponent,
})

function RouteComponent() {
  const { pageTitle } = usePageContext()
  const scope = useRef<Scope | null>(null)

  useEffect(() => {
    if (pageTitle === 'About Me Part 2') {
      animate('.about-container', {
        y: ['100px', '0px'],
        opacity: [0, 1],
        duration: 1500,
      })
    } else {
      animate('.about-container', {
        y: ['0px', '-100px'],
        opacity: [1, 0],
        duration: 1500,
      })
    }

    return () => {
      scope?.current?.revert()
    }
  }, [pageTitle])

  return <SkillsPage isPageTwo={true} />
}
