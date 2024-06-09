import { TypeAnimation } from 'react-type-animation';

export default function HeadingText() {
    return (
        <div className='w-screen pt-10 md:pt-10 lg:pt-28 xl:pt-40 px-4 md:px-16 lg:px-32'>
            <TypeAnimation
                sequence={[
                    'Библиотека электронных ресурсов',
                ]}
                wrapper="h1"
                cursor={false}
                className='text-3xl xl:text-5xl lg:text-3xl leading-normal text-layout-450'
            />
            <TypeAnimation
                preRenderFirstString={true}
                sequence={[
                    1000,
                    'Помогает работать и обмениваться различной информацией.', 
                    2000,
                    'Помогает развивать навыки эффективного поиска и изучения.',
                    2000,
                    'Помогает улучшить свои навыки в области цифровой грамотности.',
                    2000,
                    'Помогает изучить новые технологии, а также полезна для профессионального роста.',
                    2000,
                    'Помогает получить навык самостоятельного обучения и исследования.',
                    2000,
                ]}
                speed={75}
                wrapper="p"
                repeat={Infinity}
                className='text-base md:text-lg lg:text-xl text-layout-450 mt-4'
            />
        </div>
    );
}
