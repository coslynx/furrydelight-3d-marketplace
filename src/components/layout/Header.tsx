import React, { useState, useCallback, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { three3DHelpersUtil } from '../../utils/three-helpers'
import type { ComponentBaseProps } from '../../types'
interface HeaderProps extends ComponentBaseProps{logoUrl:string;navLinks:{to:string;label:string}[]
}
export const Header:React.FC<HeaderProps>=({className='',style,logoUrl,navLinks=[],...restProps})=>{const{isDarkMode,toggleTheme}=useTheme()
const[isMobileMenuOpen,setIsMobileMenuOpen]=useState(false)
const headerRef=useRef<HTMLElement>(null)
const toggleMobileMenu=useCallback(()=>{setIsMobileMenuOpen(prev=>!prev)},[])
useEffect(()=>{const handleResize=()=>{if(window.innerWidth>768){setIsMobileMenuOpen(false)}}
window.addEventListener('resize',handleResize)
return()=>{window.removeEventListener('resize',handleResize)}},[])
return(
<header className={`fixed top-0 left-0 w-full z-50 bg-opacity-90 backdrop-blur-md transition-colors duration-300 ${isDarkMode?'bg-gray-900 text-white border-b border-gray-700':'bg-white text-gray-900 border-b border-gray-200'} ${className}`}style={style}ref={headerRef}{...restProps}>
<div className="container mx-auto px-4 py-3 flex items-center justify-between">
<NavLink to="/"className="text-xl font-bold flex-shrink-0">
{logoUrl?(<img src={logoUrl}alt="Logo"className="h-8 w-auto"/>):'FurryDelight'}
</NavLink>
<nav className="hidden md:flex items-center space-x-6">
{navLinks.map((link)=>(
<NavLinkkey={link.to}to={link.to}className="hover:text-blue-500 transition-colors duration-200">{link.label}</NavLink>
))}
</nav>
<button onClick={toggleMobileMenu}className="md:hidden text-gray-500 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200">
{isMobileMenuOpen?(<XclassName="h-6 w-6"/>):(<MenuclassName="h-6 w-6"/>)}
</button>
</div>
<AnimatePresence>
{isMobileMenuOpen&&(
<motion.nav
initial={{height:0,opacity:0}}
animate={{height:'auto',opacity:1}}
exit={{height:0,opacity:0}}
transition={{duration:0.3,ease:'easeInOut'}}
className="md:hidden overflow-hidden">
<div className="px-4 py-2 flex flex-col space-y-3">
{navLinks.map((link)=>(
<NavLinkkey={link.to}to={link.to}className="block py-2 hover:text-blue-500 transition-colors duration-200">{link.label}</NavLink>
))}
</div>
</motion.nav>
)}
</AnimatePresence>
</header>
)
}