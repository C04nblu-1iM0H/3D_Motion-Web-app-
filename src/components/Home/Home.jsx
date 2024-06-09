import Image from "next/image";
import './style.css';
import HeaderComponent from "./ui/HeaderComponent";
export default function Home(){
    return(
        <>
            <HeaderComponent />
            <section className="mt-36">
                <div className="container px-6 py-10 mx-auto">
                    <h1 className="text-2xl mb-20 font-semibold text-center lg:text-3xl">
                        Кому подойдёт библиотека электронных ресурсов
                    </h1>

                    <section className="mt-8 space-y-8 lg:mt-12">
                        <section className="lg:flex lg:items-center">
                            <div className="lg:w-1/2 ">
                                <h2 className="mt-2 mb-4 text-2xl font-semibold capitalize lg:text-4xl">
                                    Учащимся
                                </h2>
                                <p className="text-base tracking-wider lg:text-lg">
                                    Учащиеся смогут использовать библиотеку электронных ресурсов для поиска и чтения учебных материалов, 
                                    научных статей, и художественной литературы. Это поможет прогрессировать в любой области.
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
                                <h2 className="mt-2 mb-4 text-2xl font-semibold capitalize text-right lg:text-4xl">
                                    Исследователям или ученым
                                </h2>
                                <p className="text-lg tracking-wider text-right">
                                    Исследователи или учёные могут делится своими знаниями и опытом, а также получать их из других статей. 
                                </p>
                            </div>
                        </section>
                        <section className="lg:flex lg:items-center">
                            <div className="lg:w-1/2 ">
                                <h2 className="mt-2 mb-4 text-2xl font-semibold capitalize lg:text-4xl">
                                    Преподователям и педагогам
                                </h2>
                                <p className="text-lg tracking-wider">
                                    Возможность получать новые знания, привлекать школьников и студентов
                                    к усвоению учебных материалов, опубликованных педагогом или другим автором.
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
                                <h2 className="mt-2 mb-4 text-2xl font-semibold capitalize lg:text-4xl text-right">
                                    Профессионалам и специалистам 
                                </h2>
                                <p className="text-lg tracking-wider text-right">
                                    Поможет профессионалам и специалистам  в разных сферах деятельности, 
                                    предоставит возможность непрерывного обучения и повышения квалификации.
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

                    <p className="mt-4 text-center mb-16 text-layout-450">
                        Почему мы - лучший выбор для ваших знаний 
                    </p>

                    
                    <Image
                        alt="img"
                        className="absolute sm:hidden md:left-[30rem] md:top-[80rem] xl:block xl:left-[-9rem] xl:top-[9rem]  2xl:left-2 2xl:top-[5rem]"
                        src={'/home/object1.png'}
                        width={400}
                        height={400}
                        quality={100}
                        style={{ width: "auto" }}
                    />

                    <Image
                        alt="img"
                        className="absolute md:left-[35rem] md:top-[85rem] xl:left-[30rem] xl:top-[30rem] 2xl:left-[40rem] 2xl:top-[30rem] rotate-90"
                        src={'/home/object2.png'}
                        width={400}
                        height={400}
                        quality={100}
                        style={{ width: "auto" }}
                    />
                    
                    <Image
                        alt="img"
                        className="absolute md:left-[35rem] md:top-60  xl:left-[55rem] xl:top-60 2xl:left-[65rem] 2xl:top-96 2xl:rotate-12"
                        src={'/home/object4.png'}
                        width={400}
                        height={400}
                        quality={100}
                        style={{ width: "auto" }}
                    />

                    <Image
                        alt="img"
                        className="absolute rotate-180 md:left-[5rem] md:top-[47rem] xl:hidden"
                        src={'/home/object4.png'}
                        width={400}
                        height={400}
                        quality={100}
                        style={{ width: "auto" }}
                    />

                   

                    <div className="flex flex-col mt-8 pb-20 xl:mt-12 xl:justify-center lg:gap-20 items-center xl:flex-row md:flex-wrap ">

                        <div className="flex flex-col items-center w-[30rem] relative rounded-3xl bg-opacity-20 bg-white backdrop-filter backdrop-blur-sm border border-white shadow-lg">
                            <div className="-z-10 absolute inset-0 bg-gray-200 opacity-30 rounded-3xl"></div>
                            <Image
                                alt="img"
                                className="pt-11"
                                src={'/home/free.png'}
                                width={400}
                                height={400}
                                quality={100}
                                style={{ width: "auto" }}
                            />
                            <h2 className="mt-4 pb-10 text-xl font-semibold capitalize text-layout-450">
                                Доступность
                            </h2>
                        </div>

                        <div className="flex flex-col items-center w-[30rem] relative rounded-3xl bg-opacity-20 bg-white backdrop-filter backdrop-blur-sm border border-white shadow-lg">
                            <div className="z-[-1] absolute inset-0 bg-gray-200 opacity-30 rounded-3xl"></div>
                            <Image
                                alt="img"
                                className=""
                                src={'/home/clock.png'}
                                width={400}
                                height={400}
                                quality={100}
                                style={{ width: "auto" }}
                            />
                            <h2 className="mt-4 pb-10 text-xl font-semibold text-layout-450">
                                Экономия времени
                            </h2>
                        </div>

                        <div className="flex flex-col items-center w-[30rem] relative rounded-3xl bg-opacity-20 bg-white backdrop-filter backdrop-blur-sm border border-white shadow-lg">
                            <div className="z-[-1] absolute inset-0 bg-gray-200 opacity-30 rounded-3xl"></div>
                            <Image
                                alt="img"
                                className="my-auto"
                                src={'/home/profession.png'}
                                width={400}
                                height={400}
                                quality={100}
                                style={{ width: "auto" }}
                            />
                            <h2 className="mt-4 pb-10 text-xl font-semibold text-layout-450">
                                Получения профессиональных новыков
                            </h2>
                        </div>
                        <div className="flex flex-col items-center w-[30rem] relative rounded-3xl bg-opacity-20 bg-white backdrop-filter backdrop-blur-sm border border-white shadow-lg">
                            <div className="z-[-1] absolute inset-0 bg-gray-200 opacity-30 rounded-3xl"></div>
                            <Image
                                alt="img"
                                className=""
                                src={'/home/update.png'}
                                width={400}
                                height={400}
                                quality={100}
                                style={{ width: "auto" }}
                            />
                            <h2 className="mt-4 pb-10 text-xl font-semibold text-layout-450">
                                Постоянное обновление
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}