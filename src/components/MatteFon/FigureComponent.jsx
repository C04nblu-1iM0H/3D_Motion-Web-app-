import Image from "next/image";

import './Matte.css'

export default function FigureComponent(){
    return(
        <div className="blurry_background bg-layout-300">
            <div className="shapes">
                    {[300, 300, 300, 300].map((size, index) => (
                        <Image
                            key={index}
                            className={`shape${index + 1}`}
                            src={`/fonfigure/circlefon${index + 1}.svg`}
                            alt='icon'
                            width={size}
                            height={size}
                            priority
                        />
                    ))}
            </div>
        </div>
    );
}