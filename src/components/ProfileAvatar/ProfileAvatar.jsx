import { useSession } from "next-auth/react";
import ProfilImage from "./ui/ProfilImage";
import ProfilMenu from "./ui/ProfilMenu";
import SpinnerWithBackdrop from "../Button/Spinner";
import { redirect } from "next/navigation";

export default function ProfileAvatar({handleFileChange}) {
    const { data: session, status } = useSession();

    if(status === 'loading') return <SpinnerWithBackdrop isLoading={true}/>;
    if(status === 'unauthenticated') return redirect('/Signin');
    const {name, email, image} = session.user;

    return(
        <div className="w-1/5 bg-layout border-gray-200 h-[calc(100vh-4rem)]">
            <ProfilImage image={image} sassionName={name} email={email} handleFileChange={handleFileChange}/>
            <ProfilMenu />
        </div>   
    )
}