import {Skeleton} from "@nextui-org/react";

export default function LoadingAvatarSkeleton() {
    return (
        <div className="w-[260px] bg-layout mt-6">
            <figure className="w-full mt-10 space-y-4">
                <Skeleton className="rounded-full w-32 h-32 mx-auto"/>
                <figcaption className="space-y-3">
                    <Skeleton className="h-4 w-3/4 rounded-lg mx-auto"/>
                    <Skeleton className="h-4 w-3/4 rounded-lg mx-auto"/>
                </figcaption>
            </figure>
            <nav className="w-full mt-10">
                <ul className="space-y-3">
                    <li><Skeleton className="h-4 w-4/5 rounded-lg mx-auto"/></li>
                    <li><Skeleton className="h-4 w-4/5 rounded-lg mx-auto"/></li>
                    <li><Skeleton className="h-4 w-4/5 rounded-lg mx-auto"/></li>
                    <li><Skeleton className="h-4 w-4/5 rounded-lg mx-auto"/></li>
                    <li><Skeleton className="h-4 w-4/5 rounded-lg mx-auto"/></li>
                    <li><Skeleton className="h-4 w-4/5 rounded-lg mx-auto"/></li>
                    <li><Skeleton className="h-4 w-4/5 rounded-lg mx-auto"/></li>
                    <li><Skeleton className="h-4 w-4/5 rounded-lg mx-auto"/></li>
                </ul>
            </nav>
        </div>
    );
}