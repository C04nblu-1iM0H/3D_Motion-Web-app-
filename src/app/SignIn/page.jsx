'use client'
import { Provider } from "react-redux";
import store from '@/store';

import SinginPageForm from "./SinginPageForm/page";
import MatteFon from "@/components/MatteFon/MatteFon";

export default function Login() {
   
    return (
      <Provider store={store}>
        <SinginPageForm />
        <MatteFon />
      </Provider>
    );
}