'use client'
import { Provider } from "react-redux";
import store from '@/store';

import SingupPageForm from "./SingupPageForm/page";
import MatteFon from "@/components/MatteFon/MatteFon";

export default function SignupPage() {
 
  return ( 
    <Provider store={store}>
      <SingupPageForm />
      <MatteFon />
    </Provider>
  );
} 