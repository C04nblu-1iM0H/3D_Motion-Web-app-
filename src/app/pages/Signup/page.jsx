'use client'
import { Provider } from "react-redux";
import store from '../../store';
import RegistrationForm from "./RegistrationForm/page";

export default function SignupPage() {
  return ( 
    <Provider store={store}>
      <RegistrationForm  />
    </Provider>
  );
} 