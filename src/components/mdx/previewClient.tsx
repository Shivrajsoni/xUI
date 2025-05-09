"use client";
import React from 'react'
import Preview from './preview';
import RefreshButton from './RefreshButton';

interface PreviewClientProps {
    children: React.ReactNode;
    className?: string;
    isPremium?: boolean;
    link: string;
    useIframe?: boolean;
    height?: string;
    compact?: boolean;
    comment?: string[];
}
const PreviewClient = (props:PreviewClientProps) => {
  const [key , setKey] = React.useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };
  return (
    <div className='relative'>
        <RefreshButton onRefresh = {handleRefresh}/>
        <div
        key={key}
        >
            <Preview {...props}/>
        </div>
      
    </div>
  )
}

export default PreviewClient
