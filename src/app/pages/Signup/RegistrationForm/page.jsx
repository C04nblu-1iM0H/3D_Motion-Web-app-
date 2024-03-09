'use client'
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

import {setEmail, setPassword, resetForm} from "../../../store/userSlice"
import Header from "@/app/components/Header/Header";
import {validateForm} from './validationForm';

export default function RegistrationForm() {
  const {email, password} = useSelector( state => state.user);
  const dispatch = useDispatch();

  
  const handleEmail = (e) => dispatch(setEmail(e.target.value));
  
  const handlePassword = (e) => dispatch(setPassword(e.target.value));

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(setEmail(email));
    dispatch(setPassword(password));
    const validationError = validateForm(email, password); // Validate inputs
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      const response = await axios.post('/api/user', {email, password});
      if (response.status === 200) {
        dispatch(resetForm());
        toast.success("Вы успешно зарегестрировались", {icon: "👍"});
      } else if(response.status === 400) {
        toast.warning("Такой Email уже существует", {icon: "🤔"});
      }else{
        toast.success("Failed to sign up");
        throw new Error('Failed to sign up');
      }
    } catch (error) {
      toast.success("Error signing up check console in browser");
      console.error('Error signing up:', error);
    }
  };

  return (
    <>
        <Header/>
        <ToastContainer/>
        <form onSubmit={handleSubmit} >
        <div>
            <label htmlFor="email">Email:</label>
            <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmail}
            autoComplete="email"
            />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
            autoComplete="current-password"
            />
        </div>
        <button type="submit">Sign Up</button>
        </form>
    </>
  );
}