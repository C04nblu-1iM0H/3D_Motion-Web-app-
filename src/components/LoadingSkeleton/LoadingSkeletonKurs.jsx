import {Skeleton} from "@nextui-org/react";

export default function  LoadingSkeletonKurs() {
    return(
        <div className="flex flex-col container mx-auto mt-10">
            <div className="flex w-80 space-x-6">
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
            </div>
            <div className="w-full bg-layout rounded-xl mt-10">
                <div className="py-10">
                    <Skeleton className="h-3 w-1/5 rounded-lg mx-auto"/>
                </div>
                <div className="h-96 flex flex-col items-center justify-around pb-10">
                    <Skeleton className="h-4 w-4/5 rounded-lg"/>
                    <Skeleton className="h-4 w-4/5 rounded-lg"/>
                    <Skeleton className="h-4 w-4/5 rounded-lg"/>
                    <Skeleton className="h-4 w-4/5 rounded-lg"/>
                    <Skeleton className="h-4 w-4/5 rounded-lg"/>
                    <Skeleton className="h-4 w-4/5 rounded-lg"/>
                    <Skeleton className="h-4 w-4/5 rounded-lg"/>
                    <Skeleton className="h-4 w-4/5 rounded-lg"/>
                    <Skeleton className="h-4 w-4/5 rounded-lg"/>
                    <Skeleton className="h-4 w-4/5 rounded-lg"/>
                    <Skeleton className="h-4 w-4/5 rounded-lg"/>
                    <Skeleton className="h-4 w-4/5 rounded-lg"/>
                </div>
            </div>
        </div>
    )
}