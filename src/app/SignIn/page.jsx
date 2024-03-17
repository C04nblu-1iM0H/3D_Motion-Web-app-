'use client'
import { useState } from 'react';
import {signIn} from "next-auth/react";
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';

import {validateForm} from '../../utils/validationForm';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const router = useRouter();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const validationError = validateForm(email, password);
        if (validationError) {
          toast.error(validationError);
          return;
        }
        setIsLoading(true);

        await signIn('credentials', {email, password});

        setIsLoading(false); 
      };


    return (
        <>
            <ToastContainer/>
            <form className='relative z-10' onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    autoComplete="email"
                    disabled = {isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    autoComplete="current-password"
                    disabled = {isLoading}
                    />
                </div>
                <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Sign In'}</button>
            </form>
        </>

    );
}