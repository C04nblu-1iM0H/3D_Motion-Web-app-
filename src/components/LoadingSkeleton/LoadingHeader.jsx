import {Skeleton} from "@nextui-org/react";

export default function LoadingHeader() {
    return(
        <header className="z-50 w-screen h-16 bg-layout flex justify-around items-center">
            <Skeleton className="w-1/12 h-4 rounded-full"/>
            <div className="flex w-72 space-x-4">
                <Skeleton className="w-3/4 h-4 rounded-full "/>
                <Skeleton className="w-3/4 h-4 rounded-full "/>
                <Skeleton className="w-3/4 h-4 rounded-full "/>
            </div>
            <div className="flex w-72 space-x-4">
                <Skeleton className="w-3/4 h-4 rounded-full "/>
                <Skeleton className="w-3/4 h-4 rounded-full "/>
                <Skeleton className="w-3/4 h-4 rounded-full "/>
            </div>
        </header>   
    );
}