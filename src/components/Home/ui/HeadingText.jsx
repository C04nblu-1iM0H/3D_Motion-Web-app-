import { TypeAnimation } from 'react-type-animation';

export default function HeadingText() {
    
    return(
        <div className='w-screen pt-40 pl-32'>
            <TypeAnimation
                sequence={[
                    'Библиотека электроннх ресурсов',
                ]}
                wrapper="h1"
                cursor={false}
                className='text-3xl leading-normal lg:text-5xl text-layout-450'
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
                'Помогает изучить новые технологии, а также полезна для проффесионального роста.',
                2000,
                'Помогает получить навык самостоятельного обучения и исследования.',
                2000,
                ]}
                speed={75}
                wrapper="p"
                repeat={Infinity}
                className='text-lg pl-36 lg:text-xl text-layout-450'
            />
        </div>
    );
}