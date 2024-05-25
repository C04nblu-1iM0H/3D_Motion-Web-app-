import {Skeleton} from "@nextui-org/skeleton";

export default function LoadingSkeletonAuthore(){
    return(
        <div className="flex justify-end mt-4">
            <Skeleton className="h-3 w-1/6 rounded-lg"/>
        </div>
    );
}