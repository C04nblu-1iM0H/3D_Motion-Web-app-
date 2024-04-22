import React, {useEffect } from 'react';
import TimelineItem from './TimeLineItem';
import { TimelineCircle } from './TimelineCircle';

export default function TimeLineComponent({timelineItems}){
    useEffect(() => {
        const line = document.querySelector('.timeline-line');
        const circles = document.querySelectorAll('.timeline-circle');
        let screenPosition = line.getBoundingClientRect().top + window.scrollY;
        const timelineHeight = line.offsetHeight;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY >= screenPosition && scrollY <= screenPosition + (timelineHeight+600)) {
                const pixelsScrolledPast = scrollY - (screenPosition + 350);
                const percentageScrolled = (pixelsScrolledPast / timelineHeight) * 100;
                line.style.background = `linear-gradient(to bottom, #6A9FF5 ${percentageScrolled}%, white ${percentageScrolled}%)`;

                // Закрашивание кругов
                circles.forEach(circle => {
                    const circlePosition = circle.getBoundingClientRect().top + window.scrollY;
                    if (scrollY >= circlePosition-400) {
                        circle.style.background = '#6A9FF5';
                    } else {
                        circle.style.background = 'white';
                    }
                });
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return(
        <section className="relative flex flex-col items-center justify-center py-32 min-h-screen">
            <h1 className="text-2xl font-semibold text-center capitalize lg:text-4xl lg:mt-10 lg:mb-24">
                Программа курса
            </h1>
            <div className="absolute bg-white w-[0.35rem] h-[325rem] border border-solid border-blue-500 mt-72 timeline-line"></div>
            <div className="w-4/5 max-w-screen-xl mx-auto grid grid-cols-[minmax(0,_1fr)_1px_minmax(0,1fr)]">
                {timelineItems.map((item, index) => {
                    if(index % 2 === 0){
                        return(
                            <>
                                <div></div>
                                <TimelineCircle />
                                <TimelineItem title={item.title} descriptions={item.description} />
                            </>
                        )
                    }else{
                        return(
                            <>
                                <TimelineItem title={item.title} descriptions={item.description} />
                                <TimelineCircle />
                                <div></div>
                            </>
                        )
                    }
                })}
            </div>
        </section>
    );
}