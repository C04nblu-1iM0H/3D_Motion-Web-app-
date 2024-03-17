import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, Button, User, Avatar} from "@nextui-org/react";
import { ImExit } from "react-icons/im";
import { VscAccount } from "react-icons/vsc";
import { signOut } from "next-auth/react";

export default function MenuAccaunt({data}) {
  const userName = data.data.user.email
  return (
    <Dropdown>
      <DropdownTrigger>
          <Avatar
            isBordered
            className="transition-transform"
            name={userName}
          />
      </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
            <DropdownSection showDivider>  
                <DropdownItem 
                  description={userName}
                  startContent={<VscAccount />}
                > 
                My Account 
              </DropdownItem>
            </DropdownSection>
            <DropdownSection>
                <DropdownItem
                  onClick={()=>signOut()} 
                  startContent={<ImExit />}
                >
                  Exit
                </DropdownItem>
            </DropdownSection>
        </DropdownMenu>
    </Dropdown>
  );
}

