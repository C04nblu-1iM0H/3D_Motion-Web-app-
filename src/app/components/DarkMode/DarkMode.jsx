'use client'
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import "./DarkMode.scss";

const DarkMode = () => {
    
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check if window is defined to ensure code runs in the browser
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem("selectedTheme");
            setDarkMode(storedTheme === "dark");
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        if (typeof window !== 'undefined') {
            localStorage.setItem("selectedTheme", newDarkMode ? "dark" : "light");
        }
    };

    useEffect(() => {
        // Apply theme to body
        if (darkMode) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
        }
    }, [darkMode]);


    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                checked={darkMode}
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
