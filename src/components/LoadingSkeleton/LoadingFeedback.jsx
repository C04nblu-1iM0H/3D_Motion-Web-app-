import {Skeleton} from "@nextui-org/react";

export default function LoadingFeedback() {
    return(
        <div className="h-96 max-h-96 w-3/4 mx-auto overflow-y-auto rounded-lg border-2 border-solid border-zinc-600 my-20">
            <div className="flex flex-col justify-end h-full">
                <div className="w-full my-3 flex">
                        <div className="flex flex-col py-2 px-4 rounded-lg w-full gap-y-4">
                            <Skeleton className="h-6 w-1/5 rounded-lg"/>
                        </div>
                </div>
                <div className="w-full my-3 flex">
                        <div className="flex flex-col items-end py-2 px-4 rounded-lg w-full gap-y-4">
                            <Skeleton className="h-6 w-1/4 rounded-lg"/>
                            <Skeleton className="h-6 w-1/3 rounded-lg"/>
                        </div>
                </div>
                <div className="w-full my-3 flex">
                        <div className="flex flex-col py-2 px-4 rounded-lg w-full gap-y-4">
                            <Skeleton className="h-6 w-1/5 rounded-lg"/>
                            <Skeleton className="h-6 w-1/3 rounded-lg"/>
                        </div>
                </div>
                <div className="w-full my-3 flex">
                        <div className="flex flex-col items-end py-2 px-4 rounded-lg w-full gap-y-4">
                            <Skeleton className="h-6 w-1/6 rounded-lg"/>
                            <Skeleton className="h-6 w-1/4 rounded-lg"/>
                        </div>
                </div>
            </div>
        </div>
    ); 
}