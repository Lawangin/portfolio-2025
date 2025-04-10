import './styles.css'
import { useEffect, useRef, useState } from 'react';
import { animate, createScope, Scope, createSpring, waapi } from 'animejs';
import { RxHome, RxPerson, RxCode, RxEnvelopeClosed } from "react-icons/rx";
import { usePageContext } from '@/context/PageContext/PageContext';

interface INavProps {
    className: string;
}

const NavBar = ({ className }: INavProps) => {
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

    const handleClick = (iconIndex: number, backwards?: boolean) => {
        const normalizedIconIndex = backwards ? Math.round(iconIndex) : Math.floor(iconIndex);
        const normalizedActiveIcon = backwards ? Math.round(activeIcon) : Math.floor(activeIcon)

        if (iconIndex === 2.5 || iconIndex === 1.5) {
            setActiveIcon(iconIndex);
            setPageIndex(iconIndex)
            return;
        }

        if (activeIcon !== iconIndex) {
            scope?.current?.methods.animateInactive(`.circle-${normalizedActiveIcon}`); // Use floored value for the current active icon
        }
        setActiveIcon(iconIndex); // Update the state with the exact value

        // Use flooredIconIndex for animations
        scope?.current?.methods.animateActiveBlob(normalizedIconIndex, normalizedIconIndex === normalizedActiveIcon);
        scope?.current?.methods.animateActive(`.circle-${normalizedIconIndex}`);


        setPageIndex(iconIndex)
        switch (iconIndex) {
            case 2:
                setPageTitle('About Me');
                break;
            case 3:
                setPageTitle("Projects");
                break;
            case 4:
                setPageTitle("Contact Me");
                break;
            default:
                setPageTitle("Home")
        }
    };

    useEffect(() => {
        // Set the initial position of circle-active after the DOM is mounted
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

                !indexSimilar && animate('.bubble', {
                    left: leftValue < currentActiveLeftValue ? bubbleRight : bubbleLeft,
                    opacity: [0, 1, 0],
                    scale: [1, .5, .2],
                    delay: 200,
                    duration: 600
                })
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

    useEffect(() => {
        const backwards = true

        const handleWheel = (event: WheelEvent) => {
            if (event.deltaY > 0) {
                // Scrolling down
                if (activeIcon < 4) {
                    if (activeIcon == 2) {
                        handleClick(activeIcon + .5)
                    } else {
                        handleClick(Math.floor(activeIcon + 1));
                    }
                }
            } else if (event.deltaY < 0) {
                // Scrolling up
                if (activeIcon > 1) {
                    if (activeIcon == 2) {
                        handleClick(activeIcon - .5, backwards)
                    } else {
                        handleClick(Math.round(activeIcon - 1), backwards);
                    }
                }
            }
        };

        const handleTouchStart = (event: TouchEvent) => {
            touchStartY.current = event.touches[0].clientY; // Record the starting Y position
        };

        const handleTouchEnd = (event: TouchEvent) => {
            touchEndY.current = event.changedTouches[0].clientY; // Record the ending Y position

            if (touchStartY.current - touchEndY.current > 50) {
                // Swiping up
                if (activeIcon < 4) {
                    if (activeIcon == 2) {
                        handleClick(activeIcon + .5)
                    } else {
                        handleClick(Math.floor(activeIcon + 1));
                    }
                }
            } else if (touchEndY.current - touchStartY.current > 50) {
                // Swiping down
                if (activeIcon > 1) {
                    if (activeIcon == 2) {
                        handleClick(activeIcon - .5, backwards)
                    } else {
                        handleClick(Math.round(activeIcon - 1), backwards);
                    }
                }
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                // Down/Right arrow key pressed
                if (activeIcon < 4) {
                    if (activeIcon == 2) {
                        handleClick(activeIcon + .5)
                    } else {
                        handleClick(Math.floor(activeIcon + 1));
                    }
                }
            } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                // Up/Left arrow key pressed
                if (activeIcon > 1) {
                    if (activeIcon == 2) {
                        handleClick(activeIcon - .5, backwards)
                    } else {
                        handleClick(Math.round(activeIcon - 1), backwards);
                    }
                }
            }
        };

        window.addEventListener('wheel', handleWheel);
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
        <div ref={root} className={`circle-container  ${className}`}>
            <div className="bubble" />
            <div className="circle-active" ref={circleActiveRef}
                style={{
                    left: `${circleActiveLeft}px`,
                }} />
            <div className={`circle-1 ${activeIcon === 1 ? 'active' : ''}`} ref={circleStartRef} onClick={() => handleClick(1)}>
                <RxHome className='icon' />
            </div>
            <div className={`circle-2 ${(activeIcon >= 1.5 && activeIcon <= 2.5) ? 'active' : ''}`} 
            onClick={() => handleClick(2)} >
                <RxPerson className='icon' />
            </div>
            <div className={`circle-3 ${activeIcon === 3 ? 'active' : ''}`} onClick={() => handleClick(3)} >
                <RxCode className='icon' />
            </div>
            <div className={`circle-4 ${activeIcon === 4 ? 'active' : ''}`} onClick={() => handleClick(4)} >
                <RxEnvelopeClosed className='icon' />
            </div>
        </div>
    );
}
export default NavBar;