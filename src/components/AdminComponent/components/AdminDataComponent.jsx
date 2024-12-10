import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import OnlineUsers from "./ui/OnlineUsers";
import TotalCourse from "./ui/TotalCourse";
import TotalUsers from "./ui/TotalUsers";
import { formatDateСhart, formatDate } from "@/utils/dateСonversion";

export default function AdminDataComponent({countUserOnline}) {
    return(
        <section className="flex flex-col w-full h-screen">
            <div className="flex flex-wrap">
                <OnlineUsers />
                <TotalUsers />
                <TotalCourse />
            </div>
            <div className="mt-20 ml-16 w-2/3 h-fit bg-layout rounded-md">
                <div className="w-full mt-10">
                  <LineChart
                    width={830}
                    height={320}
                    data={countUserOnline}
                    className="ml-20"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="last_login" tickFormatter={(last_login) => formatDateСhart(last_login)} />
                    <YAxis />
                    <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-layout w-72 p-4 border-1 border-solid border-zinc-20">
                                            <p className="label">{`Дата: ${formatDate(label)}`}</p>
                                            <p className="desc">{`Пользователи: ${payload[0].value}`}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    <Legend />
                    <Line type="monotone" dataKey="countOnlineUserInDay" stroke="#82ca9d"  />
                  </LineChart>
                </div>  
            </div>
        </section>
    )
}