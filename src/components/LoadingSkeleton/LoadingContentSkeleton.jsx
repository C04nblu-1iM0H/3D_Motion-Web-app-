import {Skeleton} from "@nextui-org/react";
import LoadingCard from "./LoadingCard";
export default function LoadingContentSkeleton() {
    return(
        <div className="w-3/4 mx-auto h-full flex flex-col justify-evenly">
            <div className="mt-16  w-1/4 mx-auto my-5">
                <div className="flex items-center justify-center">
                    <Skeleton className="p-3 w-full h-4 rounded-xl"></Skeleton>
                </div>
            </div> 
            <div className="mt-6 flex flex-row justify-evenly items-center">
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
            </div>
            <div className=" mt-6 flex flex-row justify-evenly items-center">
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
            </div>
        </div>
    );
}