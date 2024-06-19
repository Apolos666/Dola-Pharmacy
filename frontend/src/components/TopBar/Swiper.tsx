import {useEffect, useState} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import styles from "./Swiper.module.css";
import {swiperSliderContent} from "@/components/TopBar/SwiperConfig.ts";

export function Swiper() {
    const [textSlideIndex, setTextSlideIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextSlideIndex((prevIndex) => (prevIndex + 1) % swiperSliderContent.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="xl:h-6 text-left">
                <TransitionGroup>
                    <CSSTransition
                        key={textSlideIndex}
                        timeout={1000}
                        classNames={{
                            enter: styles.fadeEnter,
                            enterActive: styles.fadeEnterActive,
                            exit: styles.fadeExit,
                            exitActive: styles.fadeExitActive,
                        }}
                    >
                        <div className="absolute transition-opacity duration-1000 ease-in-out text-white font-bold text-sm">
                            {swiperSliderContent[textSlideIndex]}
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </>
    )
}