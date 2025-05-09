"use client";
import { useCallback, useEffect, useRef } from "react"

interface useAutoResizeTextAreaProps{
    minHeight:number;
    maxHeight?:number;
}

export function useAutoResizeTextArea ({minHeight,maxHeight}:useAutoResizeTextAreaProps){
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    
    const adjustHeight = useCallback(
        (reset?:boolean)=> {
            const textarea = textAreaRef.current;
            if(!textarea) return;

            if(reset){
                textarea.style.height = `${minHeight}px`;
            }

            // Temporarily shrink to get the right scrollHeight
            textarea.style.height = `${minHeight}px`;
            // Calculate new height
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );
            textarea.style.height = `${newHeight}px`;
        },
        [minHeight,maxHeight]
    )
    
    useEffect(() => {
        // Set initial height
        const textarea = textAreaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return {textAreaRef,adjustHeight};
}