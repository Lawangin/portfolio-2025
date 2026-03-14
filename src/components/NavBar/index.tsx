import './styles.css'
import { useEffect, useRef, useState } from 'react'
import { animate, createScope, Scope, createSpring, waapi } from 'animejs'
import { RxHome, RxPerson, RxCode, RxEnvelopeClosed } from 'react-icons/rx'
import { usePageContext } from '@/context/PageContext/PageContext'
import { useRouter } from '@tanstack/react-router'
import { SPRING_STIFFNESS } from '@/lib/constants'
import {
  type INavProps,
  MOBILE_STEPS,
  mobilePathToIndexMap,
  mobilePageMap,
  mobileTitleMap,
  getNextStep,
} from '@/lib/navConfig'

const NavBar = ({ className }: INavProps) => {
  const router = useRouter()

  const root = useRef<HTMLDivElement | null>(null)
  const scope = useRef<Scope | null>(null)
  const circleActiveRef = useRef<HTMLDivElement | null>(null)
  const circleStartRef = useRef<HTMLDivElement | null>(null)

  const [activeIcon, setActiveIcon] = useState<number>(1)
  // Track touch positions
  const touchStartY = useRef<number>(0)
  const touchEndY = useRef<number>(0)

  const { pageIndex, setPageTitle } = usePageContext()

  const getActiveCirclePosition = () => {
    if (circleActiveRef.current) {
      const computedStyle = getComputedStyle(circleActiveRef.current)
      return parseFloat(computedStyle.left) ?? 0
    }
  }

  const getFirstCirclePosition = (targetIndex?: number) => {
    const indexToUse = targetIndex || pageIndex

    const activeCircleElement = root.current?.querySelector(
      `.circle-${indexToUse}`,
    ) as HTMLElement

    if (activeCircleElement) {
      const rect = activeCircleElement.getBoundingClientRect()
      const containerRect = root.current?.getBoundingClientRect()

      if (containerRect) {
        return rect.left - containerRect.left
      }

      return rect.left
    }

    return (indexToUse - 1) * 70
  }

  const [circleActiveLeft, setCircleActiveLeft] = useState<number>(60)
  const handleClick = (iconIndex: number) => {
    setPageTitle(mobileTitleMap[iconIndex] || 'Home')

    const deactivationTarget =
      activeIcon === 1.5 ? 2 : activeIcon === 2.5 ? 3 : Math.floor(activeIcon)

    const visualTarget =
      iconIndex === 1.5 ? 2 : iconIndex === 2.5 ? 3 : Math.floor(iconIndex)

    if (activeIcon !== iconIndex) {
      scope?.current?.methods.animateInactive(`.circle-${deactivationTarget}`)
    }

    setActiveIcon(iconIndex)

    scope?.current?.methods.animateActiveBlob(
      visualTarget,
      visualTarget === deactivationTarget,
      iconIndex,
    )

    scope?.current?.methods.animateActive(`.circle-${visualTarget}`)
  }

  useEffect(() => {
    scope.current = createScope({
      root: root as React.RefObject<HTMLElement | SVGElement>,
    }).add((scope) => {
      animate('.circle-active', {
        scale: 1.75,
      })

      scope.add(
        'animateActiveBlob',
        (iconIndex, indexSimilar, actualIndexForPath) => {
          const leftValue = circleActiveLeft + (iconIndex - 1) * 70
          const currentActiveLeftValue = getActiveCirclePosition()!
          const scaleYKeyFrames = [1.75, 1.75, 1, 1.75]
          const scaleXKeyFrames = [1.75, 1, 1.75, 1.75]

          const scaleY =
            leftValue < currentActiveLeftValue
              ? scaleYKeyFrames
              : scaleYKeyFrames.reverse()
          const scaleX =
            leftValue < currentActiveLeftValue
              ? scaleXKeyFrames
              : scaleXKeyFrames.reverse()

          const path = mobilePageMap[actualIndexForPath]

          if (path) {
            router.navigate({ to: path, replace: false })
          }

          waapi.animate('.circle-active', {
            left: `${leftValue}px`,
            scaleY: scaleY,
            scaleX: scaleX,
            ease: createSpring({ stiffness: SPRING_STIFFNESS }),
          })

          const bubbleLeft = [
            `${currentActiveLeftValue + 70}px`,
            `${currentActiveLeftValue + 40}px`,
          ]
          const bubbleRight = [
            `${currentActiveLeftValue - 30}px`,
            `${currentActiveLeftValue}px`,
          ]

          const isFullStepTransition =
            Number.isInteger(iconIndex) && Number.isInteger(pageIndex)

          if (!indexSimilar && isFullStepTransition) {
            animate('.bubble', {
              left:
                leftValue < currentActiveLeftValue ? bubbleRight : bubbleLeft,
              opacity: [0, 1, 0],
              scale: [1, 0.5, 0.2],
              delay: 200,
              duration: 600,
            })
          }
        },
      )

      scope.add('animateActive', (selector: string) => {
        animate(selector, {
          width: '40px',
          height: '40px',
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

    const currentPath = router.state.location.pathname
    const matchedIndex = mobilePathToIndexMap[currentPath]

    if (matchedIndex) {
      setActiveIcon(matchedIndex)

      const initialLeft = getFirstCirclePosition(1)
      setCircleActiveLeft(initialLeft - 20)

      setPageTitle(mobileTitleMap[matchedIndex] || 'Home')

      const visualTarget =
        matchedIndex === 1.5
          ? 2
          : matchedIndex === 2.5
            ? 3
            : Math.floor(matchedIndex)

      const allCircles = [1, 2, 3, 4]
      for (let i of allCircles) {
        if (i !== visualTarget) {
          scope.current?.methods.animateInactive(`.circle-${i}`)
        }
      }

      scope.current?.methods.animateActiveBlob(visualTarget, true, matchedIndex)
      scope.current?.methods.animateActive(`.circle-${visualTarget}`)
    }

    return () => scope?.current?.revert()
  }, [circleActiveLeft, pageIndex])

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0].clientY
    }

    const handleTouchEnd = (event: TouchEvent) => {
      touchEndY.current = event.changedTouches[0].clientY

      const distance = touchStartY.current - touchEndY.current

      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 5
      const atTop = window.scrollY <= 5

      if (Math.abs(distance) > 50) {
        const direction = distance > 0 ? 'down' : 'up'

        if (
          (direction === 'down' && atBottom) ||
          (direction === 'up' && atTop)
        ) {
          const nextIcon = getNextStep(MOBILE_STEPS, activeIcon, direction)
          if (nextIcon !== activeIcon) {
            handleClick(nextIcon)
          }
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
        const nextIcon = getNextStep(MOBILE_STEPS, activeIcon, direction)
        if (nextIcon !== activeIcon) {
          handleClick(nextIcon)
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIcon])

  return (
    <div ref={root} className={`circle-container ${className}`}>
      <div className="bubble" />
      <div
        className="circle-active"
        ref={circleActiveRef}
        style={{ left: `${circleActiveLeft}px` }}
      />

      <div
        className={`circle-1 ${activeIcon === 1 ? 'active' : ''}`}
        ref={circleStartRef}
        onClick={() => handleClick(1)}
      >
        <RxHome className="icon" />
      </div>

      <div
        className={`circle-2 ${activeIcon >= 1.5 && activeIcon <= 2 ? 'active' : ''}`}
        onClick={() => handleClick(1.5)}
      >
        <RxPerson className="icon" />
      </div>

      <div
        className={`circle-3 ${activeIcon >= 2.5 && activeIcon <= 3 ? 'active' : ''}`}
        onClick={() => handleClick(2.5)}
      >
        <RxCode className="icon" />
      </div>

      <div
        className={`circle-4 ${activeIcon === 4 ? 'active' : ''}`}
        onClick={() => handleClick(4)}
      >
        <RxEnvelopeClosed className="icon" />
      </div>
    </div>
  )
}
export default NavBar
