'use client'
import { Provider } from "react-redux";

import store from '@/store';
import Admin from "./admin/page";


export default function AdminPanel() {

    return (
        <Provider store={store}>
            <Admin />
        </Provider>
    );
}
