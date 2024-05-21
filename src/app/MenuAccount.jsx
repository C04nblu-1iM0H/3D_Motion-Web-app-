'use client'
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import {useSelector} from 'react-redux';
import axios from 'axios';

import DropDownMenuComponent from "@/components/Header/DropDownMenuComponent";

export default function MenuAccaunt({username, email}) {
  const role = useSelector(state => state.user.role);

  const signOutMutation = useMutation({
    mutationFn: async () => await axios.put('/api/installOnline', { email, logout: true }),
    onError: (error) => {
      console.error('Failed to sign out:', error);
    },
    onSuccess: () => {
      signOut();
    },
  });

  const handleClickSignOut = async () => {
    signOutMutation.mutate();
  };

  return (
    <DropDownMenuComponent username={username} email={email} role={role} handleClick={handleClickSignOut}/>
  );
}


