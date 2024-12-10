import {Skeleton} from "@nextui-org/react";

export default function LoadingStatisticsSkeleton() {
    return(
        <div className="container">
            <div className="flex flex-col">
                <div className=" flex flex-wrap">
                    <div className="flex flex-col w-80 p-5 h-32 ml-16 mt-10 bg-layout rounded-md">
                        <Skeleton className="h-3 w-4/5 rounded-lg"/>
                        <div className="flex items-center mt-6">
                            <Skeleton className="flex rounded-full w-16 h-12"/>
                            <div className="flex flex-col ml-4 w-full">
                                <Skeleton className="h-3 w-4/5 rounded-lg"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-80 p-5 h-32 ml-16 mt-10 bg-layout rounded-md">
                        <Skeleton className="h-3 w-4/5 rounded-lg"/>
                        <div className="flex items-center mt-6">
                            <Skeleton className="flex rounded-full w-16 h-12"/>
                            <div className="flex flex-col ml-4 w-full">
                                <Skeleton className="h-3 w-4/5 rounded-lg"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-80 p-5 h-32 ml-16 mt-10 bg-layout rounded-md">
                        <Skeleton className="h-3 w-4/5 rounded-lg"/>
                        <div className="flex items-center mt-6">
                            <Skeleton className="flex rounded-full w-16 h-12"/>
                            <div className="flex flex-col ml-4 w-full">
                                <Skeleton className="h-3 w-4/5 rounded-lg"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-3/4 p-5 h-fit ml-16 mt-10 bg-layout rounded-md">
                    <Skeleton className="mx-auto h-3 w-1/4 rounded-lg"/>
                    <div className="flex flex-col mt-6">
                        <div className="flex w-full justify-between mb-3">
                            <Skeleton className="h-3 w-1/4 rounded-lg"/>
                            <Skeleton className="h-3 w-1/12 rounded-lg"/>
                        </div>
                        <Skeleton className="h-3 w-full rounded-lg"/>
                    </div>
                    <div className="flex flex-col mt-6">
                        <div className="flex w-full justify-between mb-3">
                            <Skeleton className="h-3 w-1/4 rounded-lg"/>
                            <Skeleton className="h-3 w-1/12 rounded-lg"/>
                        </div>
                        <Skeleton className="h-3 w-full rounded-lg"/>
                    </div>
                    <div className="flex flex-col mt-6">
                        <div className="flex w-full justify-between mb-3">
                            <Skeleton className="h-3 w-1/4 rounded-lg"/>
                            <Skeleton className="h-3 w-1/12 rounded-lg"/>
                        </div>
                        <Skeleton className="h-3 w-full rounded-lg"/>
                    </div>
                </div>
            </div>
        </div>
    )
}