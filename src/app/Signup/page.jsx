'use client'
import { Provider } from "react-redux";
import store from '@/store';

import SingupPageForm from "./SingupPageForm/page";

export default function SignupPage() {
 
  return ( 
    <Provider store={store}>
      <SingupPageForm />
    </Provider>
  );
} 