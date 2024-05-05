'use client'
import {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import axios from "axios";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, User} from "@nextui-org/react";
import { ImExit } from "react-icons/im";
import { VscAccount } from "react-icons/vsc";
import { signOut } from "next-auth/react";
import { TfiPanel } from "react-icons/tfi";
import { setUserRole } from "@/store/userSlice";

export default function MenuAccaunt({username, email}) {
  const dispatch = useDispatch();

  const role = useSelector(state => state.user.role);

  useEffect(() => {
    const fetchUserData = async (email) => {
        try {
            const response = await axios.post('/api/getUserRole', { email });
            if (response.status === 200) {
              dispatch(setUserRole(response.data.userRole))
            }
        } catch (error) {
            console.error(error);
        }
    };
    fetchUserData(email); 
},[email]);


  const handleClickSignOut  = async () =>{
    await axios.post('/api/getUserRole', {email, logout: true });
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
                My Account 
              </DropdownItem>
            </DropdownSection>
            {role === 1 ?
              <DropdownSection showDivider>  
                  <DropdownItem 
                    key="profile" 
                    href="/adminpanel"
                    startContent={<TfiPanel  className="w-4 h-4" />}
                  > 
                  Admin panel
                </DropdownItem>
              </DropdownSection> 
              :''
            }
            <DropdownSection>
                <DropdownItem
                  onClick={handleClickSignOut} 
                  className="text-danger-400"
                  startContent={<ImExit className="w-4 h-4 text-danger-400" />}
                >
                  Exit
                </DropdownItem>
            </DropdownSection>
        </DropdownMenu>
    </Dropdown>
  );
}


