import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import SpinnerWithBackdrop from "@/components/Button/Spinner";
import SideBarImage from './ui/SideBarImage';
import Menu from "./ui/Menu";

export default function SideBarComponent(){
    const { data: session, status } = useSession();
    
    if(status === 'loading'){return <SpinnerWithBackdrop isLoading={true}/>;}
    setTimeout(() => {
        if (status === 'unauthenticated') {
            return redirect('/Signin');
        }
    }, 30000);
    const {name, email, image} = session.user;
    return(
        <div className="w-[260px] h-[52.5rem] bg-layout border-gray-200 mt-[-1rem]">
            <SideBarImage  name={name} email={email} image={image}/>
            <Menu/>
        </div>
    );
}