import OnlineUsers from "./ui/OnlineUsers";
import TotalUsers from "./ui/TotalUsers";

export default function AdminDataComponent() {
    return(
        <section className="flex flex-wrap">
            <OnlineUsers />
            <TotalUsers />
        </section>
    )
}