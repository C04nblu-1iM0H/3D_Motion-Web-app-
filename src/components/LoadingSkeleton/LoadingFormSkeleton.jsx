import {Skeleton} from "@nextui-org/react";

export default function LoadingFormSkeleton(){
    return(
        <div className="w-full flex flex-col items-center ">
            <div className="w-3/5 bg-layout rounded-xl mt-10">
                <div className="py-10">
                    <Skeleton className="h-3 w-1/5 rounded-lg mx-auto"/>
                </div>
                <div className="h-auto flex flex-col space-y-8 pb-10">
                    <div className="w-full flex flex-col items-center space-y-3">
                        <div className="w-4/5">
                            <Skeleton className="h-4 w-1/6 rounded-lg"/>
                        </div>
                        <Skeleton className="h-20 w-4/5 rounded-lg"/>
                    </div>
                    <div className="w-full flex flex-col items-center space-y-3">
                        <div className="w-4/5">
                            <Skeleton className="h-4 w-1/6 rounded-lg"/>
                        </div>
                        <Skeleton className="h-20 w-4/5 rounded-lg"/>
                    </div>
                    <div className="w-full flex flex-col items-center space-y-3">
                        <div className="w-4/5">
                            <Skeleton className="h-4 w-1/6 rounded-lg"/>
                        </div>
                        <Skeleton className="h-20 w-4/5 rounded-lg"/>
                    </div>
                </div>
            </div>
        </div>
    )
}