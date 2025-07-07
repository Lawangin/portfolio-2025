import { useEffect, useRef, useState } from 'react'
import { animate, createScope, Scope, createSpring, waapi } from 'animejs'
import { RxHome, RxPerson, RxCode, RxEnvelopeClosed } from 'react-icons/rx'
import { usePageContext } from '@/context/PageContext/PageContext'
import { useRouter } from '@tanstack/react-router'

interface INavProps {
  className: string
}

const NavBarDesktop = ({ className }: INavProps) => {
  const { pageIndex, setPageTitle } = usePageContext()
  const router = useRouter()

  const root = useRef<HTMLDivElement | null>(null)
  const scope = useRef<Scope | null>(null)
  const circleActiveRef = useRef<HTMLDivElement | null>(null)
  const circleStartRef = useRef<HTMLDivElement | null>(null)

  const [activeIcon, setActiveIcon] = useState<number>(pageIndex)
  const [circleActiveTop, setCircleActiveTop] = useState<number>(332.5)

  // Track touch positions
  const touchStartY = useRef<number>(0)
  const touchEndY = useRef<number>(0)


  const getActiveCirclePosition = () => {
    if (circleActiveRef.current) {
      const computedStyle = getComputedStyle(circleActiveRef.current)
      return parseFloat(computedStyle.top) ?? 0
    }
  }

  const getFirstCirclePosition = (targetIndex?: number) => {
    const indexToUse = targetIndex || pageIndex

    // Get the circle element based on the specified index
    const activeCircleElement = root.current?.querySelector(`.circle-${indexToUse}`) as HTMLElement

    if (activeCircleElement) {
      const rect = activeCircleElement.getBoundingClientRect()
      const containerRect = root.current?.getBoundingClientRect()

      if (containerRect) {
        return rect.top - containerRect.top
      }

      return rect.top
    }

    // Fallback calculation based on the specified index
    return (indexToUse - 1) * 70
  }

  const handleClick = (iconIndex: number) => {
    if (activeIcon === iconIndex) return

    if (activeIcon !== iconIndex) {
      scope?.current?.methods.animateInactive(`.circle-${activeIcon}`)
    }
    setActiveIcon(iconIndex)

    scope?.current?.methods.animateActiveBlob(
      iconIndex,
      false,
    )
    scope?.current?.methods.animateActive(`.circle-${iconIndex}`)

    // setPageIndex(iconIndex)
    const titleMap: Record<number, string> = {
      1: 'Home',
      2: 'About Me',
      3: 'Projects',
      4: 'Contact Me',
    }
    setPageTitle(titleMap[iconIndex])
  }

  useEffect(() => {
    scope.current = createScope({
      root: root as React.RefObject<HTMLElement | SVGElement>,
    }).add((scope) => {
      animate('.circle-active', {
        scale: 2,
      })

      scope.add('animateActiveBlob', (iconIndex, indexSimilar) => {
        const topValue = 332.5 + (iconIndex - 1) * 70

        // const topValue = circleActiveTop + (iconIndex - 1) * 70
        const currentActiveTopValue = getActiveCirclePosition()!
        const scaleYKeyFrames = [2, 1, 2, 2]
        const scaleXKeyFrames = [2, 1, 1, 2]

        const scaleY =
          topValue < currentActiveTopValue
            ? scaleYKeyFrames
            : scaleYKeyFrames.reverse()
        const scaleX =
          topValue < currentActiveTopValue
            ? scaleXKeyFrames
            : scaleXKeyFrames.reverse()

        const pageMap: Record<number, string> = {
          1: '/',
          2: '/About-1',
          3: '/Projects-1',
          4: '/Contact',
        }

        const path = pageMap[iconIndex]
        if (router.state.location.pathname === path && !indexSimilar) return

        waapi.animate('.circle-active', {
          top: `${topValue}px`,
          scaleY: scaleY,
          scaleX: scaleX,
          ease: createSpring({ stiffness: 70 }),
          onComplete: () => {
            if (path && router.state.location.pathname !== path) {
              router.navigate({ to: path, replace: false })
            }
          },
        })

        const bubbleLeft = [
          `${currentActiveTopValue + 70}px`,
          `${currentActiveTopValue + 40}px`,
        ]
        const bubbleRight = [
          `${currentActiveTopValue - 30}px`,
          `${currentActiveTopValue}px`,
        ]

        !indexSimilar &&
          animate('.bubble', {
            top: topValue < currentActiveTopValue ? bubbleRight : bubbleLeft,
            opacity: [0, 1, 0],
            scale: [1, 0.5, 0.2],
            delay: 200,
            duration: 600,
          })
      })

      scope.add('animateActive', (selector: string) => {
        animate(selector, {
          width: '50px',
          height: '50px',
          ease: 'outQuad',
          delay: 400,
          duration: 400,
        })
      })

      scope.add('animateInactive', (selector: string) => {
        animate(selector, {
          width: '30px',
          height: '30px',
        })
      })
    })

    const pathToIndexMap: Record<string, number> = {
      '/': 1,
      '/About-1': 2,
      '/Projects-1': 3,
      '/Contact': 4,
    }


    const currentPath = router.state.location.pathname
    const matchedIndex = pathToIndexMap[currentPath]

    if (matchedIndex) {
      setActiveIcon(matchedIndex)

      // Set the initial position of circle-active after the DOM is mounted
      const initialTop = getFirstCirclePosition(matchedIndex)
      setCircleActiveTop(initialTop - 20)

      // Set correct page title
      switch (matchedIndex) {
        case 1:
          setPageTitle('Home')
          break
        case 2:
          setPageTitle('About Me')
          break
        case 3:
          setPageTitle('Projects')
          break
        case 4:
          setPageTitle('Contact Me')
          break
      }

      // Reset ALL circles to inactive state first
      for (let i = 1; i <= 4; i++) {
        if (i !== matchedIndex) {
          scope.current?.methods.animateInactive(`.circle-${i}`)
        }
      }

      scope.current?.methods.animateActiveBlob(
        matchedIndex,
        true, // indexSimilar
      )

      scope.current?.methods.animateActive(`.circle-${matchedIndex}`)

    }
    return () => scope?.current?.revert()
  }, [circleActiveTop, pageIndex])

  const scrollSteps = [1, 2, 3, 4]

  useEffect(() => {
    const getNextStep = (current: number, direction: 'up' | 'down') => {
      const currentIndex = scrollSteps.indexOf(current)
      if (currentIndex === -1) return current

      if (direction === 'down' && currentIndex < scrollSteps.length - 1) {
        return scrollSteps[currentIndex + 1]
      }
      if (direction === 'up' && currentIndex > 0) {
        return scrollSteps[currentIndex - 1]
      }

      return current
    }

    const handleTouchEnd = (event: TouchEvent) => {
      touchEndY.current = event.changedTouches[0].clientY
      const distance = touchStartY.current - touchEndY.current

      if (Math.abs(distance) > 50) {
        const direction = distance > 0 ? 'down' : 'up'
        const nextIcon = getNextStep(activeIcon, direction)

        if (nextIcon !== activeIcon) {
          handleClick(nextIcon)
        }
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      let direction: 'up' | 'down' | null = null

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        direction = 'down'
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        direction = 'up'
      }

      if (direction) {
        const nextIcon = getNextStep(activeIcon, direction)
        if (nextIcon !== activeIcon) {
          handleClick(nextIcon)
        }
      }
    }

    // window.addEventListener('wheel', handleWheel)
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      //   window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIcon])

  return (
    <div ref={root} className={`circle-container  ${className}`}>
      <div className="bubble" />
      <div
        className="circle-active"
        ref={circleActiveRef}
        style={{
          top: `${circleActiveTop}px`,
        }}
      />
      <div
        className={`circle-1 ${activeIcon === 1 ? 'active' : ''}`}
        ref={circleStartRef}
        onClick={() => handleClick(1)}
      >
        <RxHome className="icon" />
        {activeIcon !== 1 && <span className="icon-label">Home</span>}
      </div>
      <div
        className={`circle-2 ${activeIcon === 2 ? 'active' : ''}`}
        onClick={() => handleClick(2)}
      >
        <RxPerson className="icon" />
        {activeIcon !== 2 && <span className="icon-label">About Me</span>}
      </div>
      <div
        className={`circle-3 ${activeIcon === 3 ? 'active' : ''}`}
        onClick={() => handleClick(3)}
      >
        <RxCode className="icon" />
        {activeIcon !== 3 && <span className="icon-label">Projects</span>}
      </div>
      <div
        className={`circle-4 ${activeIcon === 4 ? 'active' : ''}`}
        onClick={() => handleClick(4)}
      >
        <RxEnvelopeClosed className="icon" />
        {activeIcon !== 4 && <span className="icon-label">Contact Me</span>}
      </div>
    </div>
  )
}
export default NavBarDesktop
