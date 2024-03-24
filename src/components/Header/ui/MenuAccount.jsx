import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, User} from "@nextui-org/react";
import { ImExit } from "react-icons/im";
import { VscAccount } from "react-icons/vsc";
import { signOut } from "next-auth/react";

export default function MenuAccaunt({username}) {
  
  const handleClickSignOut  = async () =>{
    await signOut();
    window.location.href = 'http://localhost:3000/Signin'; 
  }

  return (
    <Dropdown>
      <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              name: username
            }}
            className="transition-transform"
          />
      </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
            <DropdownSection showDivider>  
                <DropdownItem 
                  key="profile" 
                  href="/Profile"
                  description={username}
                  startContent={<VscAccount />}
                > 
                My Account 
              </DropdownItem>
            </DropdownSection>
            <DropdownSection>
                <DropdownItem
                  onClick={handleClickSignOut} 
                  startContent={<ImExit />}
                >
                  Exit
                </DropdownItem>
            </DropdownSection>
        </DropdownMenu>
    </Dropdown>
  );
}


