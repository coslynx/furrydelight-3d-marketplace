import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import type { ComponentBaseProps } from '../../types'
interface FooterProps extends ComponentBaseProps{copyrightText?:string;legalLinks?:{text:string;href:string}[]
}
export const Footer:React.FC<FooterProps>=({className='',style,copyrightText='© 2024 FurryDelight',legalLinks=[],...restProps})=>{const{isDarkMode}=useTheme()
return(
<footer className={`fixed bottom-0 left-0 w-full z-40 transition-colors duration-300 ${isDarkMode?'bg-gray-900 text-white border-t border-gray-700':'bg-white text-gray-900 border-t border-gray-200'} ${className}`}style={style}{...restProps}>
<div className="container mx-auto px-4 py-3 flex items-center justify-between">
<p className="text-sm">{copyrightText}</p>
<nav className="flex items-center space-x-4">
{legalLinks&&legalLinks.length>0?(
legalLinks.map((link)=>(
<NavLink key={link.href}to={link.href}className="text-sm hover:text-blue-500 transition-colors duration-200">{link.text}</NavLink>
))
):null}
</nav>
</div>
</footer>
)
}