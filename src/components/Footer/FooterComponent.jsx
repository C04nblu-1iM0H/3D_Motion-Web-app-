import Image from "next/image";

export default function FooterComponent(){
    return(
        <div className="w-full bg-black bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <footer className="w-full">
                    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <Image
                                src={'/DL4.png'}
                                width={200}
                                height={200}
                                quality={100}
                                alt='logo'
                            />
                            <p>Мы рады Вас видеть у нас 🤝😊</p>
                        </div>
                        <hr className="my-6 border-gray-100 sm:mx-auto lg:my-8" />
                        <span className="block text-sm text-gray-50 sm:text-center ">© 2024 Digital Library.</span>
                    </div>
                </footer>
        </div>
    );
}