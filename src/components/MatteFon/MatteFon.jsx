import Image from "next/image";
import './Matte.scss';

export default function MatteFon(){

    return(
        <div className="blurry-background">
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
    )
}