import './styles.css'
import { useEffect, useRef, useState } from 'react';
import { animate, createScope, Scope, createSpring, waapi } from 'animejs';
import { RxHome, RxPerson, RxCode, RxEnvelopeClosed } from "react-icons/rx";


const NavBar = () => {
    const root = useRef<HTMLDivElement | null>(null);
    const scope = useRef<Scope | null>(null);
    const circleActiveRef = useRef<HTMLDivElement | null>(null);
    const circleStartRef = useRef<HTMLDivElement | null>(null);

    const [activeIcon, setActiveIcon] = useState<number>(1);
    const [circleActiveLeft, setCircleActiveLeft] = useState<number>(0);


    const getActiveCirclePosition = () => {
        if (circleActiveRef.current) {
            const computedStyle = getComputedStyle(circleActiveRef.current);
            console.log(parseFloat(computedStyle.left))
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

            animate('.circle-1', {
                width: '40px',
                height: '40px'
            })

            scope.add('animateActiveBlob', (iconIndex) => {
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

                animate('.bubble', {
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
        const handleWheel = (event: WheelEvent) => {
            if (event.deltaY > 0) {
                // Scrolling down
                if (activeIcon < 4) {
                    handleClick(activeIcon + 1);
                }
            } else if (event.deltaY < 0) {
                // Scrolling up
                if (activeIcon > 1) {
                    handleClick(activeIcon - 1);
                }
            }
        };

        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [activeIcon]);

    const handleClick = (iconIndex: number) => {
        if (activeIcon !== iconIndex) {
            scope?.current?.methods.animateInactive(`.circle-${activeIcon}`);
        }
        setActiveIcon(iconIndex);
        scope?.current?.methods.animateActiveBlob(iconIndex);
        scope?.current?.methods.animateActive(`.circle-${iconIndex}`);
    };

    return (
        <div ref={root} className='circle-container'>
            <div className="bubble" />
            <div className="circle-active" ref={circleActiveRef}
                style={{
                    left: `${circleActiveLeft}px`,
                }} />
            <div className={`circle-1 ${activeIcon === 1 ? 'active' : ''}`} ref={circleStartRef} onClick={() => handleClick(1)}>
                <RxHome className='icon' />
            </div>
            <div className={`circle-2 ${activeIcon === 2 ? 'active' : ''}`} onClick={() => handleClick(2)} >
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