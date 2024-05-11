import Image from "next/image";
import HeadingText from "./HeadingText";
import BackgroundBeams from "./BackgroundBeams";

export default function HeaderComponent() {
    return(
        <>
            <section className="w-screen h-[60.4rem] mt-[-2rem] bg-layout-400 flex flex-col">
                    <section className="w-full">
                        <HeadingText />
                    </section>
                    <section className="relative z-50 w-full flex justify-around">
                        <div className="mt-[-6rem] lg:w-1/2">
                            <Image
                                alt="device"
                                src={'/home/device2.png'}
                                width={800}
                                height={800}
                                quality={100}
                                className="z-20"
                                loading="lazy"
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <Image
                                alt="device"
                                className="mr-44 device z-20"
                                src={'/home/device.png'}
                                width={800}
                                height={800}
                                quality={100}
                                loading="lazy"
                            />
                        </div>
                    </section>
                    <BackgroundBeams /> 
            </section>       
        </>
    );
}