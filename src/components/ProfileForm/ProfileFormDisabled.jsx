import {useSelector, useDispatch} from 'react-redux';
import {Input, Button, Select, SelectItem} from "@nextui-org/react";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaSquarePhone } from "react-icons/fa6";

import GroupButtonProfile from "@/components/Button/GroupButtonProfile";
import { setIsVisibleEdit } from '@/store/userProfileSlice';
import {dataConversion} from '@/utils/dateСonversion';

export default function ProfileFormDisabled() {
    const dispatch = useDispatch();
    const isEdit = useSelector(state => state.userProfile.isEdit);
    const userData  = useSelector(state => state.userProfile.userData);
    const { username, surname, id_gender, data_birthday, telephone} = userData || {};

    const handleClick = () => dispatch(setIsVisibleEdit(!isEdit));

    return (
        <form className="w-3/4 h-[37rem] mt-4 flex flex-col justify-evenly">
            <Input
                isReadOnly
                type="text"
                label="Name"
                placeholder={username || 'Ваше Имя'}
                labelPlacement="outside"
                startContent={
                    <FaRegUser />
                }
            />
            <Input
                isReadOnly
                type="text"
                label="Surname"
                placeholder={surname || 'Ваша Фамилия'}
                labelPlacement="outside"
                startContent={
                    <FaRegUser />
                }
            />
            <Select
                isReadOnly
                labelPlacement="outside"
                label="Ваш пол"
                placeholder={id_gender === 0 ? "Женский" : "Мужской" || "Выберите ваш пол"}
                className="w-full"
                >
                    <SelectItem key={0} value={0}>Женский</SelectItem>
                    <SelectItem key={1} value={1}>Мужской</SelectItem>
            </Select>
            <div className="relative flex flex-col justify-between h-[4.4rem]">
                <label className="text-smd">Введите дату вашего рождения</label>
                <input
                    type="date"
                    value={data_birthday ? dataConversion(data_birthday) : ''}
                    disabled
                    className="block bg-layout-200 w-full py-2 pl-3 pr-10 mt-1 box-border border-none rounded-xl select-none"
                />
                <IoIosArrowDown className="absolute w-3.5 h-3.5 inset-y-2/3 right-3 -translate-y-1/2 pointer-events-none"/>
            </div>
            <Input
                isReadOnly
                type="text"
                label="Phone number"
                placeholder={telephone || '+7(000)000-00-00'}
                labelPlacement="outside"
                startContent={
                    <FaSquarePhone />
                }
            />
            {isEdit
                ?(
                    <Button 
                        color="primary"
                        onClick={handleClick}
                    >
                        Редактировать
                    </Button> 
                ):(
                    <GroupButtonProfile/> 
                )
            }
            
    </form>
    )
}