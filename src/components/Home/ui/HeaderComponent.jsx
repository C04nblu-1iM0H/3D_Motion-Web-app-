import Image from "next/image";
import HeadingText from "./HeadingText";

export default function HeaderComponent() {
    return(
        <>
            <div className="h-svh w-full bg-black bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <section className="w-screen h-[60.4rem] mt-[-2rem] flex flex-col">
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
                </section>       
            </div>
        </>
    );
}