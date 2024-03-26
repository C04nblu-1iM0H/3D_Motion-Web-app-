import {Input, Button, Select, SelectItem} from "@nextui-org/react";
import { CiMail } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

import GroupButtonProfile from "@/components/Button/GroupButtonProfile";

export default function ProfileFormEnabled({handleClick, isEdit, setStateIsEdit}) {
    return (
        <form className="w-3/4 h-3/4 mt-4 flex flex-col justify-evenly">
            <Input
                type="text"
                label="Email"
                placeholder="Введите ваш Email адрес"
                labelPlacement="outside"
                startContent={
                    <CiMail />
                }
            />
            <Input
                type="text"
                label="Name"
                placeholder="Введите ваше Имя"
                labelPlacement="outside"
                startContent={
                    <FaRegUser />
                }
            />
            <Input
                type="text"
                label="Surname"
                placeholder="Введите вашу Фамилию"
                labelPlacement="outside"
                startContent={
                    <FaRegUser />
                }
            />
            <Select
                labelPlacement="outside"
                label="Ваш пол"
                placeholder="Выберите ваш пол"
                className="w-full"
                >
                    <SelectItem key={0} value="Женский">Женский</SelectItem>
                    <SelectItem key={1} value="Мужской">Мужской</SelectItem>
            </Select>
            <div className="relative flex flex-col justify-between h-[4.4rem]">
                <label className="text-sm">Введите дату вашего рождения</label>
                <input
                    type="date"
                    className="block bg-Layout-100 w-full py-2 pl-3 pr-10 mt-1 box-border border-none rounded-xl hover:bg-default-200 focus:outline-none focus:ring-0 select-none"
                />
                <IoIosArrowDown className="absolute w-3.5 h-3.5 inset-y-2/3 right-3 -translate-y-1/2 pointer-events-none"/>
            </div>
            {isEdit
                ?(
                    <Button 
                    color="primary"
                    onClick={handleClick}
                    >Редактировать</Button> 
                ):(
                    <GroupButtonProfile setState={setStateIsEdit}/> 
                )
            }
    </form>
    )
}