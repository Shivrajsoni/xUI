"use client";
import { Moon,SunDim } from "lucide-react";
import {useTheme} from "next-themes"
import React, { useEffect, useState } from 'react'

const ThemeToggle = () => {
    const [mounted,setMounted] = useState(false);
    const {theme,setTheme} = useTheme();
    
    useEffect(()=>{
        setMounted(true);
    },[])

    if(!mounted)
        return null;
    
    return (
    <div
    className="cursor-pointer"
    onClick={()=>{
        setTheme(theme ==="dark"?"light":"dark")
    }}>
        {theme ==="light" ? (
            <SunDim className="h-5 w-5 text-black"/>
        ):(<Moon className="h-5 w-5 text-white" color="white"/>)}
      
    </div>
  )
}

export default ThemeToggle
