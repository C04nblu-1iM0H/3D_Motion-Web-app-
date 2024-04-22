'use client'
import { Provider } from "react-redux";
import store from '@/store';

import OnlineUsersComponent from "./ui/OnlineUsersComponent";
import SideBarComponent from "./ui/SideBarComponent";
import TotalUsersComponent from "./ui/TotalUsersComponent";


export default function AdminComponent(){
    return(
        <Provider store={store}>
            <section className="w-full flex">
                <SideBarComponent />
                <OnlineUsersComponent />
                <TotalUsersComponent />
            </section>
        </Provider>

    );
}