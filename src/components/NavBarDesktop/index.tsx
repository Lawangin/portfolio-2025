import { useEffect, useRef, useState } from 'react'
import { animate, createScope, Scope, createSpring, waapi } from 'animejs'
import { RxHome, RxPerson, RxCode, RxEnvelopeClosed } from 'react-icons/rx'
import { usePageContext } from '@/context/PageContext/PageContext'
import { useRouter } from '@tanstack/react-router'

interface INavProps {
  className: string
}

const NavBarDesktop = ({ className }: INavProps) => {
  const router = useRouter()

  const root = useRef<HTMLDivElement | null>(null)
  const scope = useRef<Scope | null>(null)
  const circleActiveRef = useRef<HTMLDivElement | null>(null)
  const circleStartRef = useRef<HTMLDivElement | null>(null)

  const [activeIcon, setActiveIcon] = useState<number>(1)
  const [circleActiveTop, setCircleActiveTop] = useState<number>(0)

  // Track touch positions
  const touchStartY = useRef<number>(0)
  const touchEndY = useRef<number>(0)

  const { pageIndex, setPageIndex, setPageTitle } = usePageContext()

  const getActiveCirclePosition = () => {
    if (circleActiveRef.current) {
      const computedStyle = getComputedStyle(circleActiveRef.current)
      return parseFloat(computedStyle.top) ?? 0
    }
  }

  const getFirstCirclePosition = () => {
    if (circleStartRef.current) {
      const rect = circleStartRef.current.getBoundingClientRect()
      return rect.top
    }
    return 0
  }

  const handleClick = (iconIndex: number) => {
    if (activeIcon !== iconIndex) {
      scope?.current?.methods.animateInactive(`.circle-${activeIcon}`)
    }
    setActiveIcon(iconIndex)

    scope?.current?.methods.animateActiveBlob(
      iconIndex,
      iconIndex === activeIcon,
    )
    scope?.current?.methods.animateActive(`.circle-${iconIndex}`)

    setPageIndex(iconIndex)
    switch (iconIndex) {
      case 2:
        setPageTitle('About Me')
        break
      case 3:
        setPageTitle('Projects')
        break
      case 4:
        setPageTitle('Contact Me')
        break
      default:
        setPageTitle('Home')
    }
  }

  useEffect(() => {
    // Set the initial position of circle-active after the DOM is mounted
    const initialTop = getFirstCirclePosition()
    setCircleActiveTop(initialTop - 20)

    const pathToIndexMap: Record<string, number> = {
      '/': 1,
      '/about-1': 2,
      '/projects-1': 3,
      '/contact': 4,
    }

    const currentPath = router.state.location.pathname
    const matchedIndex = pathToIndexMap[currentPath]

    if (matchedIndex) {
      setActiveIcon(matchedIndex)
      setPageIndex(matchedIndex)

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

      setTimeout(() => {
        // Optional: deactivate previous icon if coming from a different route
        const prevCircle = matchedIndex > 1 ? matchedIndex - 1 : null

        if (prevCircle) {
          scope.current?.methods.animateInactive(`.circle-${prevCircle}`)
        }

        scope.current?.methods.animateActiveBlob(
          matchedIndex,
          true, // indexSimilar
        )

        scope.current?.methods.animateActive(`.circle-${matchedIndex}`)
      }, 50)
    }
  }, [])

  useEffect(() => {
    scope.current = createScope({
      root: root as React.RefObject<HTMLElement | SVGElement>,
    }).add((scope) => {
      animate('.circle-active', {
        scale: 2,
      })

      animate(`.circle-${pageIndex}`, {
        width: '50px',
        height: '50px',
      })

      scope.add('animateActiveBlob', (iconIndex, indexSimilar) => {
        const topValue = circleActiveTop + (iconIndex - 1) * 70
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
          2: '/about-1',
          3: '/projects-1',
          4: '/contact',
        }

        const path = pageMap[iconIndex]

        waapi.animate('.circle-active', {
          top: `${topValue}px`,
          scaleY: scaleY,
          scaleX: scaleX,
          ease: createSpring({ stiffness: 70 }),
          onComplete: () => {
            if (path) {
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
    return () => scope?.current?.revert()
  }, [circleActiveTop])

  const scrollSteps = [1, 2, 3, 4]

  useEffect(() => {
    const SCROLL_THRESHOLD = 120 // Adjust this value as needed
    let scrollBuffer = 0
    let isScrolling = false

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

    const resetScroll = () => {
      scrollBuffer = 0
      isScrolling = false
    }

    const handleWheel = (event: WheelEvent) => {
      scrollBuffer += event.deltaY

      if (isScrolling) return

      if (scrollBuffer > SCROLL_THRESHOLD) {
        isScrolling = true
        const next = getNextStep(activeIcon, 'down')
        if (next !== activeIcon) handleClick(next)
        setTimeout(resetScroll, 600) // adjust for animation duration
      } else if (scrollBuffer < -SCROLL_THRESHOLD) {
        isScrolling = true
        const next = getNextStep(activeIcon, 'up')
        if (next !== activeIcon) handleClick(next)
        setTimeout(resetScroll, 600)
      }
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
