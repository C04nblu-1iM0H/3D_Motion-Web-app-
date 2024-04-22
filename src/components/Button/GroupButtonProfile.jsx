import {useSelector, useDispatch} from 'react-redux';
import {Button} from "@nextui-org/react";
import { setIsVisibleEdit } from '@/store/userProfileSlice';

export default function GroupButtonProfile(){
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.userProfile.isLoading);

    const handleClick = () => dispatch(setIsVisibleEdit(true))
    
    return(
        <div className="flex">
            <Button color="success" className="w-full mr-1" type="submit" isLoading={isLoading} > Сохранить </Button>
            {
                isLoading?
                    <Button color="danger" className="w-full ml-1" isDisabled>Выйти</Button>
                    :
                    <Button color="danger" className="w-full ml-1" onClick={handleClick}>Выйти</Button>
            }   

        </div>
    )
}