'use client'
import { useMutation} from "@tanstack/react-query";
import {useSelector} from 'react-redux';
import axios from "axios";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import DropDownMenuComponent from "@/components/Header/DropDownMenuComponent";

export default function MenuAccaunt({username, email}) {
  const role = useSelector(state => state.user.role);

  const signOutMutation = useMutation({
    mutationFn: async () => await axios.post('/api/installOnline', { logout: true }),
    onError: (error) => {
      console.error('Failed to sign out:', error);
    },
    onSuccess: () => {
      signOut();
      redirect('/Signin');
    },
  });

  const handleClickSignOut = async () => {
    signOutMutation.mutate();
  };

  return (
    <DropDownMenuComponent username={username} email={email} role={role} handleClick={handleClickSignOut}/>
  );
}


