// import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Input, Button, Select, SelectItem} from "@nextui-org/react";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaSquarePhone } from "react-icons/fa6";

import GroupButtonProfile from "@/components/Button/GroupButtonProfile";
import { setIsVisibleEdit } from '@/store/userProfileSlice';

export default function ProfileFormDisabled() {
    const dispatch = useDispatch();
    const isEdit = useSelector(state => state.userProfile.isEdit);

    const handleClick = () => dispatch(setIsVisibleEdit(!isEdit));
    return (
        <form className="w-3/4 h-[37rem] mt-4 flex flex-col justify-evenly">
            <Input
                isDisabled
                type="text"
                label="Name"
                placeholder={'Ваше Имя'}
                labelPlacement="outside"
                startContent={
                    <FaRegUser />
                }
            />
            <Input
                isDisabled
                type="text"
                label="Surname"
                placeholder={ 'Ваша Фамилия'}
                labelPlacement="outside"
                startContent={
                    <FaRegUser />
                }
            />
            <Select
                isDisabled
                labelPlacement="outside"
                label="Ваш пол"
                placeholder="Выберите ваш пол"
                className="w-full"
                >
                    <SelectItem key={0} value="Женский">Женский</SelectItem>
                    <SelectItem key={1} value="Мужской">Мужской</SelectItem>
            </Select>
            <div className="relative flex flex-col justify-between h-[4.4rem]">
                <label className="text-sm text-layout-foreground">Введите дату вашего рождения</label>
                <input
                    type="date"
                    disabled
                    className="block text-layout-foreground bg-layout-200 w-full py-2 pl-3 pr-10 mt-1 box-border border-none rounded-xl select-none"
                />
                <IoIosArrowDown className="absolute w-3.5 h-3.5 inset-y-2/3 right-3 -translate-y-1/2 pointer-events-none"/>
            </div>
            <Input
                isDisabled
                type="text"
                label="Phone number"
                placeholder={'+7(000)000-00-00'}
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