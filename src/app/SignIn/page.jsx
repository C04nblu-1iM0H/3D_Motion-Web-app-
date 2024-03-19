'use client'
import { Provider } from "react-redux";
import store from '@/store';

import SinginPageForm from "./SinginPageForm/page";

export default function Login() {
   
    return (
      <Provider store={store}>
        <SinginPageForm />
      </Provider>
    );
}