import React from 'react'
import { Link } from 'react-router-dom'
import type { ComponentBaseProps } from '../../types'
import '../../styles/layout/minimal-layout.css'
interface MinimalLayoutProps extends ComponentBaseProps{showBackButton?:boolean;backButtonHref?:string;children:React.ReactNode
}
export const MinimalLayout:React.FC<MinimalLayoutProps>=({children,showBackButton=false,backButtonHref='/'})=>{return(<divclassName="relative w-full h-screen overflow-hidden"><divclassName="absolute inset-0">{children}</div>{showBackButton&&(
<Link to={backButtonHref}aria-label="Go back"className="absolute top-4 left-4 z-10 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"><svgxmlns="http://www.w3.org/2000/svg"className="h-6 w-6"fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth="2"><pathstrokeLinecap="round"strokeLinejoin="round"d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg></Link>)}</div>)}