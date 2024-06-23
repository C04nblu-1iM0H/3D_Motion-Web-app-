import {useSelector, useDispatch} from 'react-redux';
import {Input, Button, Select, SelectItem} from "@nextui-org/react";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaSquarePhone } from "react-icons/fa6";

import GroupButtonProfile from "@/components/Button/GroupButtonProfile";
import { setDate, setGender, setIsVisibleEdit, setName, setPhone, setSurname } from '@/store/userProfileSlice';

export default function ProfileFormEnabled({handleSubmit}) {
    const dispatch = useDispatch();

    const isEdit = useSelector(state => state.userProfile.isEdit);
    const nameUser = useSelector(state => state.userProfile.name);
    const surname = useSelector(state => state.userProfile.surname);
    const gender = useSelector(state => state.userProfile.gender);
    const date = useSelector(state => state.userProfile.date);
    const phone = useSelector(state => state.userProfile.phone);

    const handleName = (value) => dispatch(setName(value)); 
    const handleSurname = (value) => dispatch(setSurname(value));
    const handleDate = (e) => dispatch(setDate(e.target.value));
    const handlePhone = (value) => dispatch(setPhone(value));
    const handleGender = (e) => dispatch(setGender(e.target.value));
    const handleClick = () => dispatch(setIsVisibleEdit(!isEdit));

    return (
        <form onSubmit={handleSubmit}  className="w-3/4 h-[37rem] mt-4 flex flex-col justify-evenly">
            <Input
                type="text"
                label="Имя"
                placeholder="Введите ваше Имя"
                labelPlacement="outside"
                value={nameUser}
                onValueChange={handleName}
                startContent={
                    <FaRegUser />
                }
            />
            <Input
                type="text"
                label="Фамилия"
                placeholder="Введите вашу Фамилию"
                labelPlacement="outside"
                value={surname}
                onValueChange={handleSurname}
                startContent={
                    <FaRegUser />
                }
            />
            <Select
                labelPlacement="outside"
                label="Ваш пол"
                placeholder="Выберите ваш пол"
                className="w-full"
                selectedKeys={gender}
                onChange={handleGender}
                >
                    <SelectItem key={0} value={0}>Женский</SelectItem>
                    <SelectItem key={1} value={1}>Мужской</SelectItem>
            </Select>
            <div className="relative flex flex-col justify-between h-[4.4rem]">
                <label className="text-sm">Введите дату вашего рождения</label>
                <input
                    type="date"
                    className="block bg-layout-100 w-full py-2 pl-3 pr-10 mt-1 box-border border-none rounded-xl hover:bg-default-200 focus:outline-none focus:ring-0 select-none"
                    value={date}
                    onChange={handleDate}
                />
                <IoIosArrowDown className="absolute w-3.5 h-3.5 inset-y-2/3 right-3 -translate-y-1/2 pointer-events-none"/>
            </div>
            <Input
                type="text"
                label="Номер телефона"
                placeholder={'+7(000)000-00-00'}
                labelPlacement="outside"
                value={phone}
                onValueChange={handlePhone}
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
                    <GroupButtonProfile /> 
                )
            }
    </form>
    )
}