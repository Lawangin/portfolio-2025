import './styles.css'
import { useEffect, useRef, useState } from 'react';
import { animate, createScope, Scope, createSpring, waapi } from 'animejs';
import { RxHome, RxPerson, RxCode, RxEnvelopeClosed } from "react-icons/rx";
import { usePageContext } from '@/context/PageContext/PageContext';
import { useRouter } from '@tanstack/react-router'

interface INavProps {
    className: string;
}

const NavBar = ({ className }: INavProps) => {
    const router = useRouter();

    const root = useRef<HTMLDivElement | null>(null);
    const scope = useRef<Scope | null>(null);
    const circleActiveRef = useRef<HTMLDivElement | null>(null);
    const circleStartRef = useRef<HTMLDivElement | null>(null);

    const [activeIcon, setActiveIcon] = useState<number>(1);
    const [circleActiveLeft, setCircleActiveLeft] = useState<number>(0);

    // Track touch positions
    const touchStartY = useRef<number>(0);
    const touchEndY = useRef<number>(0);

    const { pageIndex, setPageIndex, setPageTitle } = usePageContext();

    const getActiveCirclePosition = () => {
        if (circleActiveRef.current) {
            const computedStyle = getComputedStyle(circleActiveRef.current);
            return parseFloat(computedStyle.left) ?? 0;
        }
    }

    const getFirstCirclePosition = () => {
        if (circleStartRef.current) {
            const rect = circleStartRef.current.getBoundingClientRect();
            return rect.left
        }
        return 0;
    }

    const handleClick = (iconIndex: number) => {
        switch (iconIndex) {
            case 1:
                setPageTitle("Home");
                break;
            case 1.5:
                setPageTitle("About Me Part 1");
                break;
            case 2:
                setPageTitle("About Me Part 2");
                break;
            case 2.5:
                setPageTitle("Projects Part 1");
                break;
            case 3:
                setPageTitle("Projects Part 2");
                break;
            case 4:
                setPageTitle("Contact Me");
                break;
            default:
                setPageTitle("Home");
        }

        // Define which icon should get deactivated
        const deactivationTarget =
            activeIcon === 1.5 ? 2 :
                activeIcon === 2.5 ? 3 :
                    Math.floor(activeIcon);

        // Define which icon should be visually activated
        const visualTarget =
            iconIndex === 1.5 ? 2 :
                iconIndex === 2.5 ? 3 :
                    Math.floor(iconIndex);

        if (activeIcon !== iconIndex) {
            scope?.current?.methods.animateInactive(`.circle-${deactivationTarget}`);
        }

        setActiveIcon(iconIndex);
        setPageIndex(iconIndex);

        scope?.current?.methods.animateActiveBlob(
            visualTarget,
            visualTarget === deactivationTarget
        );

        scope?.current?.methods.animateActive(`.circle-${visualTarget}`);

        const pageMap: Record<number, string> = {
            1: '/',
            1.5: '/about-1',
            2: '/about-2',
            2.5: '/projects-1',
            3: '/projects-2',
            4: '/contact',
          };
        
          const path = pageMap[iconIndex];
          if (path) {
            setTimeout(() => {
              router.navigate({ to: path, replace: false });
            }, 1000); // match your animation duration
          }

    };

    useEffect(() => {
        const initialLeft = getFirstCirclePosition();
        setCircleActiveLeft(initialLeft - 20);
    }, []);

    useEffect(() => {
        scope.current = createScope({ root: root as React.RefObject<HTMLElement | SVGElement> }).add(scope => {
            animate('.circle-active', {
                scale: 1.75
            })

            animate(`.circle-${pageIndex}`, {
                width: '40px',
                height: '40px'
            })

            scope.add('animateActiveBlob', (iconIndex, indexSimilar) => {
                const leftValue = circleActiveLeft + ((iconIndex - 1) * 70);
                const currentActiveLeftValue = getActiveCirclePosition()!;
                const scaleYKeyFrames = [1.75, 1.75, 1, 1.75]
                const scaleXKeyFrames = [1.75, 1, 1.75, 1.75]

                const scaleY = leftValue < currentActiveLeftValue ? scaleYKeyFrames : scaleYKeyFrames.reverse();
                const scaleX = leftValue < currentActiveLeftValue ? scaleXKeyFrames : scaleXKeyFrames.reverse();

                waapi.animate('.circle-active', {
                    left: `${leftValue}px`,
                    scaleY: scaleY,
                    scaleX: scaleX,
                    ease: createSpring({ stiffness: 70 }),
                });

                const bubbleLeft = [`${currentActiveLeftValue + 70}px`, `${currentActiveLeftValue + 40}px`];
                const bubbleRight = [`${currentActiveLeftValue - 30}px`, `${currentActiveLeftValue}px`];

                const isFullStepTransition = Number.isInteger(iconIndex) && Number.isInteger(pageIndex);

                if (!indexSimilar && isFullStepTransition) {
                    animate('.bubble', {
                        left: leftValue < currentActiveLeftValue ? bubbleRight : bubbleLeft,
                        opacity: [0, 1, 0],
                        scale: [1, .5, .2],
                        delay: 200,
                        duration: 600
                    })
                }
            })

            scope.add('animateActive', (selector: string) => {
                animate(selector, {
                    width: '40px',
                    height: '40px',
                    ease: 'outQuad',
                    delay: 400,
                    duration: 400
                });
            });

            scope.add('animateInactive', (selector: string) => {
                animate(selector, {
                    width: '30px',
                    height: '30px',
                });
            });
        });
        return () => scope?.current?.revert();
    }, [circleActiveLeft]);

    const scrollSteps = [1, 1.5, 2, 2.5, 3, 4];

    useEffect(() => {
        const getNextStep = (current: number, direction: 'up' | 'down') => {
            const currentIndex = scrollSteps.indexOf(current);
            if (currentIndex === -1) return current;

            if (direction === 'down' && currentIndex < scrollSteps.length - 1) {
                return scrollSteps[currentIndex + 1];
            }
            if (direction === 'up' && currentIndex > 0) {
                return scrollSteps[currentIndex - 1];
            }

            return current;
        };

        const handleWheel = (event: WheelEvent) => {
            const direction = event.deltaY > 0 ? 'down' : 'up';

            const nextIcon = getNextStep(activeIcon, direction);
          
            if (nextIcon !== activeIcon) {
              handleClick(nextIcon);
            }
        };

        const handleTouchStart = (event: TouchEvent) => {
            touchStartY.current = event.touches[0].clientY; // Record the starting Y position
        };

        const handleTouchEnd = (event: TouchEvent) => {
            touchEndY.current = event.changedTouches[0].clientY;

            const distance = touchStartY.current - touchEndY.current;

            if (Math.abs(distance) > 50) {
                const direction = distance > 0 ? 'down' : 'up';
                const nextIcon = getNextStep(activeIcon, direction);
                if (nextIcon !== activeIcon) {
                    handleClick(nextIcon);
                }
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            let direction: 'up' | 'down' | null = null;

            if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                direction = 'down';
            } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                direction = 'up';
            }

            if (direction) {
                const nextIcon = getNextStep(activeIcon, direction);
                if (nextIcon !== activeIcon) {
                    handleClick(nextIcon);
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [activeIcon]);

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

    );
}
export default NavBar;