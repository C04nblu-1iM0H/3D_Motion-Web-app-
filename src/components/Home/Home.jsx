'use client'
import Image from "next/image";

import HeadingText from "./ui/HeadingText";
import TimeLineComponent from "./ui/TimeLineComponent";
import {timelineItems} from '@/const'
import './style.css';

export default function Home(){
    return(
        <>
            <section className="w-screen h-[60.4rem] mt-[-2rem] bg-layout-400 flex flex-col">
                <section className="w-full">
                    <HeadingText />
                </section>
                <section className="w-full flex justify-around">
                    <div className="mt-[-6rem] lg:w-1/2">
                        <Image
                            alt="device"
                            src={'/home/device2.png'}
                            width={800}
                            height={800}
                            quality={100}
                            priority={true}
                        />
                    </div>
                    <div className="lg:w-1/2">
                        <Image
                            alt="device"
                            className="mr-44 device"
                            src={'/home/device.png'}
                            width={800}
                            height={800}
                            quality={100}
                        />
                    </div>
                </section>
            </section>
            <section className="mt-36">
                <div className="container px-6 py-10 mx-auto">
                    <h1 className="text-2xl mb-20 font-semibold text-center capitalize lg:text-3xl">
                        Кому подойдёт этот курс
                    </h1>

                    <section className="mt-8 space-y-8 lg:mt-12">
                        <section className="lg:flex lg:items-center">
                            <div className="lg:w-1/2 ">
                                <h2 className="mt-2 mb-4 text-2xl font-semibold capitalize lg:text-4xl">
                                    Новичкам
                                </h2>
                                <p className="text-base tracking-wider lg:text-lg">
                                    Освоите трёхмерную графику, научитесь моделировать 3D-объекты, 
                                    анимировать персонажей, создавать оружие и окружение и сможете начать карьеру в мире 3D.
                                </p>
                            </div>
                            <Image
                                alt="img"
                                className="hidden xl:block xl:absolute max-w-none w-1/2 xl:top-[73rem] xl:left-[20%]  2xl:top-[105rem] 2xl:left-[20%] lg:w-[25rem]"
                                src={'/home/Cube3.png'}
                                width={400}
                                height={400}
                            />
                            <div className="mt-4 lg:w-1/2 lg:mt-0">
                                <Image
                                    alt="img"
                                    src={'/home/easy_work.svg'}
                                    width={1000}
                                    height={1000}
                                    priority={true}
                                />
                            </div>
                        </section>

                        <section className="lg:flex lg:items-center lg:flex-row flex flex-col-reverse">
                            <Image
                                alt="img"
                                className="hidden xl:block xl:absolute max-w-none w-1/2 xl:top-[113rem] xl:left-[60%]  2xl:top-[126rem] 2xl:left-[60%] lg:w-[25rem]"
                                src={'/home/Star3.png'}
                                width={400}
                                height={400}
                            />
                            <div className="mt-4 lg:w-1/2 lg:mt-0">
                                <Image
                                    alt="img"
                                    src={'/home/beginner_work.svg'}
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div className="lg:w-1/2 ">
                                <h2 className="mt-2 mb-4 text-2xl font-semibold capitalize lg:text-4xl">
                                    Начинающим 3D-дизайнерам
                                </h2>
                                <p className="text-lg tracking-wider text-right">
                                    Отточите навыки в 3D-моделировании, создании окружения и текстурировании. 
                                    Овладеете Maya и Houdini на профессиональном уровне. 
                                    Сможете анимировать отдельные модели и группы объектов, 
                                    освоите весь процесс разработки трёхмерной графики.
                                </p>
                            </div>
                        </section>
                        <section className="lg:flex lg:items-center">
                            <div className="lg:w-1/2 ">
                                <h2 className="mt-2 mb-4 text-2xl font-semibold capitalize lg:text-4xl">
                                    Начинающим иллюстраторам, графическим и веб-дизайнерам
                                </h2>
                                <p className="text-lg tracking-wider">
                                    Добавите к своим навыкам в рисунке и дизайне опыт создания 3D-моделей и анимации, 
                                    освоите ключевые программы — Maya, Houdini, Marmoset — и сможете развиваться в новом направлении.
                                </p>
                            </div>
                            <Image
                                alt="img"
                                className="hidden xl:block xl:absolute max-w-none w-1/2 xl:top-[153rem] xl:left-[10%]  2xl:top-[175rem] 2xl:left-[10%] lg:w-[25rem]"
                                src={'/home/Sphere1.png'}
                                width={400}
                                height={400}
                            />
                            <div className="mt-4 lg:w-1/2 lg:mt-0">
                                <Image
                                    alt="img"
                                    src={'/home/hard_work.svg'}
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                        </section>
                        <section className="lg:flex lg:items-center lg:flex-row flex flex-col-reverse">
                            <Image
                                alt="img"
                                className="hidden xl:block xl:absolute max-w-none w-1/2 xl:top-[195rem] xl:left-[60%]  2xl:top-[223rem] 2xl:left-[65%] lg:w-[25rem]"
                                src={'/home/Swirl2.png'}
                                width={400}
                                height={400}
                            />
                            <div className="mt-4 lg:w-1/2 lg:mt-0">
                                <Image
                                    alt="img"
                                    src={'/home/proffesional_work.svg'}
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div className="lg:w-1/2 ">
                                <h2 className="mt-2 mb-4 text-2xl font-semibold capitalize lg:text-4xl">
                                    Профессионалам в 3D
                                </h2>
                                <p className="text-lg tracking-wider text-right">
                                    Узнаете, как создавать анимированные 3D -сцены в Houdini, 
                                    делать сложные 3D -модели для кино и игр, проектировать риги персонажей. 
                                    Расширите круг выполняемых задач и сможете претендовать на должность универсального 3D-специалиста.
                                </p>
                            </div>
                        </section>
                    </section>
                </div>
            </section>

            <section className="mt-20 bg-layout-400">
                <div className="container px-6 py-10 mx-auto relative">
                    <h1 className="text-2xl font-semibold text-center capitalize lg:text-4xl lg:mt-10 text-layout-450">
                        Наши Преимущества
                    </h1>

                    <p className="mt-4 text-center mb-32 text-layout-450">
                        Почему мы - лучший выбор для вашего обучения в 3D дизайне
                    </p>

                    
                    <Image
                        alt="img"
                        className="absolute left-24 top-[15rem]"
                        src={'/home/object1.png'}
                        width={400}
                        height={400}
                        quality={100}
                        style={{ width: "auto" }}
                    />

                    <Image
                        alt="img"
                        className="absolute left-[55rem] top-[50rem] rotate-90"
                        src={'/home/object2.png'}
                        width={300}
                        height={300}
                        quality={100}
                        style={{ width: "auto" }}
                    />
                    <Image
                        alt="img"
                        className="absolute left-20 top-[60rem]"
                        src={'/home/object3.png'}
                        width={250}
                        height={250}
                        quality={100}
                        style={{ width: "auto" }}
                        priority={false}
                    />

                    <div className="flex flex-col mt-8 xl:mt-12 xl:justify-center lg:gap-32 items-center xl:flex-row md:flex-wrap ">
                        <Image
                            alt="img"
                            className="absolute  2xl:left-[60rem] 2xl:top-48 xl:left-[50rem] xl:top-52"
                            src={'/home/object4.png'}
                            width={400}
                            height={400}
                            quality={100}
                            style={{ width: "auto" }}
                        />
                        <div className="flex flex-col items-center w-[30rem] relative rounded-3xl bg-opacity-20 bg-white backdrop-filter backdrop-blur-sm border border-white shadow-lg">
                            <div className="-z-10 absolute inset-0 bg-gray-200 opacity-30 rounded-3xl"></div>
                            <Image
                                alt="img"
                                className=""
                                src={'/home/money.png'}
                                width={400}
                                height={400}
                                quality={100}
                                style={{ width: "auto" }}
                            />
                            <h2 className="mt-4 text-xl font-semibold capitalize text-layout-450">
                                Гибкие цены
                            </h2>
                            <p className="mt-2 text-lg tracking-wider text-layout-450">Website</p>
                        </div>

                        <div className="flex flex-col items-center w-[30rem] relative rounded-3xl bg-opacity-20 bg-white backdrop-filter backdrop-blur-sm border border-white shadow-lg">
                            <div className="z-[-1] absolute inset-0 bg-gray-200 opacity-30 rounded-3xl"></div>
                            <Image
                                alt="img"
                                className=""
                                src={'/home/traning.png'}
                                width={400}
                                height={400}
                                quality={100}
                                style={{ width: "auto" }}
                            />
                            <h2 className="mt-4 text-xl font-semibold text-layout-450">
                                Быстрая скорость обучения
                            </h2>
                            <p className="mt-2 text-lg tracking-wider text-layout-450">Mockups</p>
                        </div>

                        <div className="flex flex-col items-center w-[30rem] relative rounded-3xl bg-opacity-20 bg-white backdrop-filter backdrop-blur-sm border border-white shadow-lg">
                            <div className="z-[-1] absolute inset-0 bg-gray-200 opacity-30 rounded-3xl"></div>
                            <Image
                                alt="img"
                                className="my-auto"
                                src={'/home/guarantees.png'}
                                width={400}
                                height={400}
                                quality={100}
                                style={{ width: "auto" }}
                            />
                            <h2 className="mt-4 text-xl font-semibold text-layout-450">
                                Получения профессиональных новыков
                            </h2>
                            <p className="mt-2 text-lg tracking-wider text-layout-450">Mockups</p>
                        </div>
                        <div className="flex flex-col items-center w-[30rem] relative rounded-3xl bg-opacity-20 bg-white backdrop-filter backdrop-blur-sm border border-white shadow-lg">
                            <div className="z-[-1] absolute inset-0 bg-gray-200 opacity-30 rounded-3xl"></div>
                            <Image
                                alt="img"
                                className=""
                                src={'/home/support.png'}
                                width={400}
                                height={400}
                                quality={100}
                                style={{ width: "auto" }}
                            />
                            <h2 className="mt-4 text-xl font-semibold text-layout-450">
                                Мгновенная скорость откликов специалистов
                            </h2>
                            <p className="mt-2 text-lg tracking-wider text-layout-450">Mockups</p>
                        </div>
                    </div>
                </div>
            </section>
            <TimeLineComponent timelineItems={timelineItems}/>
        </>
    );
}