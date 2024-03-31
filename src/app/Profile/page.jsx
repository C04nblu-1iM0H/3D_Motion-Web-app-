'use client'
import { Provider } from "react-redux";
import store from '@/store';

import UserProfile from "./UserProfile/page";

export default function Profile() {
 
  return ( 
    <Provider store={store}>
        <UserProfile />
    </Provider>
  );
} 