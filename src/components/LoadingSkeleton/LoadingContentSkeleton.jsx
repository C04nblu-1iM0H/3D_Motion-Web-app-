
import LoadingCard from "./LoadingCard";
export default function LoadingContentSkeleton() {
    return(
        <div className="w-3/4 mx-auto h-full flex flex-col justify-evenly">
            <div className="flex flex-row justify-evenly items-center">
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
            </div>
            <div className="flex flex-row justify-evenly items-center">
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
            </div>
        </div>
    );
}