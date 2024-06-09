'use client'
import {useTheme} from "next-themes";
import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect } from 'react';

import {setToggleMode} from '../../store/themeSlice'
import Image from "next/image";
import "./DarkMode.css";

const DarkMode = () => {
    const { theme, setTheme } = useTheme();
    const mode = useSelector(state => state.theme.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem("selectedTheme");
            dispatch(setToggleMode(storedTheme === "dark"));
            if (storedTheme) {
                setTheme(storedTheme);
            }
        }
        
    }, [dispatch, setTheme]);

    const toggleDarkMode = () => {
        const newDarkMode = theme === 'dark' ? 'light' : 'dark';
        dispatch(setToggleMode(newDarkMode === 'dark'));
        if (typeof window !== 'undefined') {
            localStorage.setItem("selectedTheme", newDarkMode);
            setTheme(newDarkMode);
        }
    };


    return (
        <div className='dark_mode lg:ml-6 lg:mt-[-20px]'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                checked={mode}
                onChange={toggleDarkMode}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
            <Image
                className=' svg svg_sun'
                src="/theme/Sun.svg"
                alt="Sun Logo"
                width={20}
                height={20}
                priority
            />
            <Image
                className=' svg svg_moon'
                src="/theme/Moon.svg"
                alt="Next.js Logo"
                width={20}
                height={20}
                priority
            />
            </label>
        </div>
    );
};

export default DarkMode;
