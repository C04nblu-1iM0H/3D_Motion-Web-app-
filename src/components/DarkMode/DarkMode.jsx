'use client'
import {useSelector, useDispatch} from 'react-redux';
import React, {useEffect } from 'react';

import {setToggleMode} from '../../store/themeSlice'
import Image from "next/image";
import "./DarkMode.scss";

const DarkMode = () => {
    const mode = useSelector(state => state.theme.theme);
    const dispatch = useDispatch();


    useEffect(() => {
        // Check if window is defined to ensure code runs in the browser
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem("selectedTheme");
            dispatch(setToggleMode(storedTheme === "dark"))
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !mode;
        dispatch(setToggleMode(newDarkMode))
        if (typeof window !== 'undefined') {
            localStorage.setItem("selectedTheme", newDarkMode ? "dark" : "light");
        }
    };

    useEffect(() => {
        // Apply theme to body
        if (mode) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
        }
    }, [mode]);


    return (
        <div className='dark_mode'>
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
                src="/Sun.svg"
                alt="Sun Logo"
                width={20}
                height={20}
                priority
            />
            <Image
                className=' svg svg_moon'
                src="/Moon.svg"
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
