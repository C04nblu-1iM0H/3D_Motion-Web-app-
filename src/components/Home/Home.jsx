import Image from "next/image";

import HeadingText from "./HeadingText";
import './style.css';

export default function Home(){
    return(
        <>
            <section className="w-screen h-[60.4rem] mt-[-2rem] bg-layout flex flex-col">
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
                            className="mr-44 "
                            src={'/home/device.png'}
                            width={800}
                            height={800}
                            quality={100}
                            style={{ width: 'auto', height: 'auto' }}
                        />
                    </div>
                </section>
            </section>
            <section className="mt-36">
                <div className="container px-6 py-10 mx-auto">
                    <h1 className="text-2xl font-semibold text-center capitalize lg:text-3xl">
                        Кому подойдёт этот курс
                    </h1>

                    <section className="mt-8 space-y-8 lg:mt-12">
                        <section className="lg:flex lg:items-center">
                            <div className="lg:w-1/2 ">
                                <h2 className="mt-2 mb-4 text-4xl font-semibold capitalize">
                                    Новичкам
                                </h2>
                                <p className="text-lg tracking-wider">
                                    Освоите трёхмерную графику, научитесь моделировать 3D-объекты, 
                                    анимировать персонажей, создавать оружие и окружение и сможете начать карьеру в мире 3D.
                                </p>
                            </div>
                            <Image
                                alt="img"
                                className="absolute top-[66rem] left-[5%] lg:w-auto lg:max-w-none"
                                src={'/home/Sphere1.png'}
                                width={500}
                                height={500}
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

                        <section className="lg:flex lg:items-center">
                            <div className="mt-4 lg:w-1/2 lg:mt-0">
                                <Image
                                    alt="img"
                                    src={'/home/beginner_work.svg'}
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div className="lg:w-1/2 ">
                                <h2 className="mt-2 mb-4 text-4xl font-semibold capitalize text-right">
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
                                <h2 className="mt-2 mb-4 text-4xl font-semibold capitalize">
                                    Начинающим иллюстраторам, графическим и веб-дизайнерам
                                </h2>
                                <p className="text-lg tracking-wider">
                                    Добавите к своим навыкам в рисунке и дизайне опыт создания 3D-моделей и анимации, 
                                    освоите ключевые программы — Maya, Houdini, Marmoset — и сможете развиваться в новом направлении.
                                </p>
                            </div>

                            <div className="mt-4 lg:w-1/2 lg:mt-0">
                                <Image
                                    alt="img"
                                    src={'/home/hard_work.svg'}
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                        </section>
                        <section className="lg:flex lg:items-center">
                            <div className="mt-4 lg:w-1/2 lg:mt-0">
                                <Image
                                    alt="img"
                                    src={'/home/proffesional_work.svg'}
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div className="lg:w-1/2 ">
                                <h2 className="mt-2 mb-4 text-4xl font-semibold capitalize text-right">
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
        </>
    );
}