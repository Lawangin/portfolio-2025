import { useEffect, useRef, useState } from 'react';
import { animate, createScope, Scope } from 'animejs';
import { RxHome, RxPerson, RxCode, RxEnvelopeClosed } from "react-icons/rx";
import './styles.css';

const NavBarDesktop = () => {
    const root = useRef<HTMLDivElement | null>(null);
    const scope = useRef<Scope | null>(null);

    const [activeIcon, setActiveIcon] = useState<number>(1);

    useEffect(() => {
        scope.current = createScope({ root: root as React.RefObject<HTMLElement | SVGElement> }).add(scope => {
            animate('.icon-wrapper-1-dsktp', {
                width: '40px',
                height: '40px',
                duration: 100
            });

            scope.add('moveBlob', (transValue) => {
                animate('.circle-select-dsktp', {
                    top: `${transValue}px`,
                    duration: 500,
                });
            });

            scope.add('animateActive', (selector: string) => {
                animate(selector, {
                    width: '40px',
                    height: '40px',
                    delay: 200,
                });
            });

            scope.add('animateInactive', (selector: string) => {
                animate(selector, {
                    width: '20px',
                    height: '20px',
                });
            });
        });

        // Properly cleanup all anime.js instances declared inside the scope
        return () => scope?.current?.revert();
    }, []);

    const handleClick = (iconIndex: number, transValue: number) => {
        if (activeIcon !== iconIndex) {
            scope?.current?.methods.animateInactive(`.icon-wrapper-${activeIcon}-dsktp`);
        }
        setActiveIcon(iconIndex);
        scope?.current?.methods.moveBlob(transValue);
        scope?.current?.methods.animateActive(`.icon-wrapper-${iconIndex}-dsktp`);
    };

    return (
        <div ref={root}>
            <div className="stage-dsktp">
            <div className="stage-overlay"></div> {/* Add this overlay */}

                <div className="circle-select-dsktp" />
                <div className="circle-one-dsktp" />
                <div className="circle-two-dsktp" />
                <div className="circle-three-dsktp" />
                <div className="circle-four-dsktp" />
                <div className="circle-one-s2-dsktp" />
                <div className="circle-two-s2-dsktp" />
                <div className="circle-three-s2-dsktp" />
                <div
                    className={`icon-wrapper-1-dsktp ${activeIcon === 1 ? 'active' : ''}`}
                    onClick={() => handleClick(1, 42)}
                >
                    <RxHome className="icon-dsktp" />
                    <span className="icon-label">Home</span>
                </div>
                <div
                    className={`icon-wrapper-2-dsktp ${activeIcon === 2 ? 'active' : ''}`}
                    onClick={() => handleClick(2, 93)}
                >
                    <RxPerson className="icon-dsktp" />
                    <span className="icon-label">About Me</span>
                </div>
                <div
                    className={`icon-wrapper-3-dsktp ${activeIcon === 3 ? 'active' : ''}`}
                    onClick={() => handleClick(3, 143)}
                >
                    <RxCode className="icon-dsktp" />
                    <span className="icon-label">Projects</span>
                </div>
                <div
                    className={`icon-wrapper-4-dsktp ${activeIcon === 4 ? 'active' : ''}`}
                    onClick={() => handleClick(4, 193)}
                >
                    <RxEnvelopeClosed className="icon-dsktp" />
                    <span className="icon-label">Contact Me</span>
                </div>
            </div>
        </div>
    );
};

export default NavBarDesktop;