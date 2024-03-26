import {Input, Button, Select, SelectItem} from "@nextui-org/react";
import { CiMail } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

import GroupButtonProfile from "@/components/Button/GroupButtonProfile";

export default function ProfileFormDisabled({handleClick, isEdit, setStateIsEdit, email}) {


    return (
        <form className="w-3/4 h-3/4 mt-4 flex flex-col justify-evenly">
            <Input
                isDisabled
                type="text"
                label="Email"
                placeholder={email}
                labelPlacement="outside"
                startContent={
                    <CiMail />
                }
            />
            <Input
                isDisabled
                type="text"
                label="Name"
                placeholder={email}
                labelPlacement="outside"
                startContent={
                    <FaRegUser />
                }
            />
            <Input
                isDisabled
                type="text"
                label="Surname"
                placeholder={email}
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
                <label className="text-sm text-Layout-foreground">Введите дату вашего рождения</label>
                <input
                    type="date"
                    disabled
                    className="block text-Layout-foreground bg-Layout-200 w-full py-2 pl-3 pr-10 mt-1 box-border border-none rounded-xl select-none"
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