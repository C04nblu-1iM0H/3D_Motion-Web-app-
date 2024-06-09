import {Skeleton} from "@nextui-org/skeleton";

export default function LoadingSkeletonMessageComponent(){
    return(
        <div className="w-1/2 mx-auto mt-6">
            <ul className="w-full h-[calc(100vh-7rem)] border-2 border-zinc-600 rounded-md">
                <div className="flex flex-row justify-between items-center p-4 border-b-2 border-zinc-600 hover:bg-neutral-700">
                    <figure className="flex items-center">
                        <Skeleton className="flex rounded-full w-12 h-12"/>
                        <figcaption className="w-96 gap-y-3 flex flex-col ml-5">
                            <div className="flex gap-x-4">
                                <Skeleton className="h-3 w-1/5 rounded-lg"/>
                                <Skeleton className="h-3 w-1/5 rounded-lg"/>
                            </div>
                                <Skeleton className="h-3 w-5/6 rounded-lg"/>
                        </figcaption>
                    </figure>
                </div>
                <div className="flex flex-row justify-between items-center p-4 border-b-2 border-zinc-600 hover:bg-neutral-700">
                    <figure className="flex items-center">
                        <Skeleton className="flex rounded-full w-12 h-12"/>
                        <figcaption className="w-64 gap-y-3 flex flex-col ml-5">
                            <div className="flex gap-x-4">
                                <Skeleton className="h-3 w-1/5 rounded-lg"/>
                                <Skeleton className="h-3 w-1/5 rounded-lg"/>
                            </div>
                                <Skeleton className="h-3 w-5/6 rounded-lg"/>
                        </figcaption>
                    </figure>
                </div>
                <div className="flex flex-row justify-between items-center p-4 border-b-2 border-zinc-600 hover:bg-neutral-700">
                    <figure className="flex items-center">
                        <Skeleton className="flex rounded-full w-12 h-12"/>
                        <figcaption className="w-80 gap-y-3 flex flex-col ml-5">
                            <div className="flex gap-x-4">
                                <Skeleton className="h-3 w-1/5 rounded-lg"/>
                                <Skeleton className="h-3 w-1/5 rounded-lg"/>
                            </div>
                                <Skeleton className="h-3 w-5/6 rounded-lg"/>
                        </figcaption>
                    </figure>
                </div>
            </ul>
        </div>
    );
}