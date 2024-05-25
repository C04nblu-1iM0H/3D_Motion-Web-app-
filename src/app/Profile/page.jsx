'use client'
import { useSession } from "next-auth/react";

import SpinnerWithBackdrop from "@/components/Button/Spinner";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";



export default function Profile(){
    const { data: status } = useSession();

    if(status === 'loading'){return <SpinnerWithBackdrop isLoading={true}/>;}
    if(status === 'unauthenticated'){return redirect('/Signin');}

    return(
        <>
            <section className="w-screen">
                <section className="flex gap-x-5 flex-wrap">
                    <ProfileAvatar />
                </section>
            </section>
        </>
    )
}