import { TypeAnimation } from 'react-type-animation';

export default function HeadingText() {
    
    return(
        <div className='w-screen pt-40 pl-32'>
            <TypeAnimation
                sequence={[
                    'Курс 3D моделирования',
                ]}
                wrapper="h1"
                cursor={false}
                className='text-5xl leading-normal'
            />
            <TypeAnimation
                preRenderFirstString={true}
                sequence={[
                1000,
                'Вы станете универсальным специалистом, который умеет работать с текстурами.', 
                2000,
                'Вы станете универсальным специалистом, который умеет оптимизировать модели.',
                2000,
                'Вы станете универсальным специалистом, который умеет анимировать объекты.',
                2000,
                'Вы станете универсальным специалистом, который умеет рендерить сцены.',
                2000,
                'Вы станете универсальным специалистом, который умеет всё в 3D.',
                2000,
                ]}
                speed={75}
                wrapper="p"
                repeat={Infinity}
                className='text-xl pl-32'
            />
        </div>
    );
}