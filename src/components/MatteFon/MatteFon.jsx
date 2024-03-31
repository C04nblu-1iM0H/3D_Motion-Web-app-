import { useTheme } from 'next-themes';

import CircleComponent from "./CircleComponent";
import FigureComponent from "./FigureComponent";
import './Matte.css';

export default function MatteFon(){
    const {theme} = useTheme();
    return(
        <>
            { theme === 'dark'?<CircleComponent />: <FigureComponent />}
        </>
    )
}