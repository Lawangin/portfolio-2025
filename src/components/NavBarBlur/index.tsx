import { useEffect, useRef, useState } from 'react';
import { animate, createScope, Scope } from 'animejs';
import { RxHome, RxPerson, RxCode, RxEnvelopeClosed } from "react-icons/rx";
import './styles.css';

const NavBar = () => {
    const root = useRef<HTMLDivElement | null>(null);
    const scope = useRef<Scope | null>(null);

    const [activeIcon, setActiveIcon] = useState<number>(1);


    useEffect(() => {

        scope.current = createScope({ root: root as React.RefObject<HTMLElement | SVGElement> }).add(scope => {

            animate('.icon-wrapper-1', {
                width: '45px',
                height: '45px',
                duration: 100
            });


            scope.add('moveBlob', (transValue) => {
                animate('.circle-select', {
                    left: `${transValue}px`,
                    duration: 500,
                });
            });

            scope.add('animateActive', (selector: string) => {
                animate(selector, {
                    width: '45px',
                    height: '45px',
                    delay: 200,
                });
            });

            scope.add('animateInactive', (selector: string) => {
                animate(selector, {
                    width: '25px',
                    height: '25px',
                    delay: 200,
                });
            });

        });

        // Properly cleanup all anime.js instances declared inside the scope
        return () => scope?.current?.revert()

    }, []);

    const handleClick = (iconIndex: number, transValue: number) => {
        if (activeIcon !== iconIndex) {
            scope?.current?.methods.animateInactive(`.icon-wrapper-${activeIcon}`);
        }
        setActiveIcon(iconIndex);
        scope?.current?.methods.moveBlob(transValue);
        scope?.current?.methods.animateActive(`.icon-wrapper-${iconIndex}`);
        // scope?.current?.methods.logoAnimateInActive();
    };

    return (
        <div ref={root}>
            <div className='stage'>
                <div className='circle-select' />
                <div className='circle-one' />
                <div className='circle-two' />
                <div className='circle-three' />
                <div className='circle-four' />
                <div className='circle-one-s2' />
                <div className='circle-two-s2' />
                <div className='circle-three-s2' />
                <div className={'icon-wrapper-1'}
                    onClick={() => handleClick(1, 25)}
                >
                    <RxHome className="icon" />
                </div>
                <div className={'icon-wrapper-2'}
                    onClick={() => handleClick(2, 100)}
                >
                    <RxPerson className="icon" />
                </div>
                <div className={'icon-wrapper-3'}
                    onClick={() => handleClick(3, 175)}
                >
                    <RxCode className="icon" />
                </div>
                <div className={'icon-wrapper-4'}
                    onClick={() => handleClick(4, 250)}
                >
                    <RxEnvelopeClosed className="icon" />
                </div>

            </div>

        </div>
    );
}

export default NavBar;
