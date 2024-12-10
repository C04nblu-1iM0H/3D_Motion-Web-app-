import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, User} from "@nextui-org/react";
import { ImExit } from "react-icons/im";
import { VscAccount } from "react-icons/vsc";
import { TfiPanel } from "react-icons/tfi";

export default function DropDownMenuComponent({username, email, role, handleClick}){
    return(
        <Dropdown>
            <DropdownTrigger>
                <User
                as="button"
                avatarProps={{
                    isBordered: true,
                    name: username || email
                }}
                className="transition-transform"
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownSection >  
                    <DropdownItem 
                        key="profile" 
                        href="/Profile"
                        showDivider = {role === 1 ? false : true}
                        description={ username || email}
                        startContent={<VscAccount className="w-4 h-4" />}
                    > 
                    Мой аккаунт
                    </DropdownItem>
                </DropdownSection>
                {role === 1 ?
                    <DropdownSection showDivider>  
                        <DropdownItem 
                        key="admin" 
                        href="/adminpanel"
                        startContent={<TfiPanel  className="w-4 h-4" />}
                        > 
                        Панель администратора
                    </DropdownItem>
                    </DropdownSection> 
                    :''
                }
                <DropdownSection>
                    <DropdownItem
                        onClick={handleClick} 
                        className="text-danger-400"
                        startContent={<ImExit className="w-4 h-4 text-danger-400" />}
                    >
                        Выход
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}