import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from 'src/components/layout/Header.tsx'
import { Footer } from 'src/components/layout/Footer.tsx'
import { LandingHero } from 'src/components/sections/LandingHero.tsx'
import AboutPage from 'src/pages/AboutPage.tsx'
import ContactPage from 'src/pages/ContactPage.tsx'
import ModelShowcasePage from 'src/pages/ModelShowcasePage.tsx'
import ExperiencePage from 'src/pages/ExperiencePage.tsx'
import { ThemeProvider } from './context/ThemeContext'
import {ComponentBaseProps} from 'src/types'
import 'src/styles/base.css'
import 'src/styles/index.css'

interface Props extends ComponentBaseProps {
  logoUrl: string
  navLinks: {
    to: string
    label: string
  }[]
  copyrightText: string
  legalLinks: {
    text: string
    href: string
  }[]
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  modelPath: string
}

const App: React.FC<Props> = () => {
  const logoUrl = '/logo.svg'
  const navLinks = [
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/model-showcase', label: 'Models' },
    { to: '/experience', label: 'Experience' }
  ]
  const copyrightText = '© 2024 FurryDelight'
  const legalLinks = [
    { text: 'Terms of Service', href: '/terms' },
    { text: 'Privacy Policy', href: '/privacy' }
  ]
  const title = 'Discover the Purrfect Meal'
  const subtitle = 'Explore our 3D cat food marketplace for a truly delightful experience.'
  const ctaText = 'Explore Now'
  const ctaHref = '/model-showcase'
  const modelPath = '/models/bag.glb'
  
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header logoUrl={logoUrl} navLinks={navLinks} />
        <Routes>
          <Route path="/" element={<LandingHero title={title} subtitle={subtitle} ctaText={ctaText} ctaHref={ctaHref} modelPath={modelPath} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/model-showcase" element={<ModelShowcasePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
        </Routes>
        <Footer copyrightText={copyrightText} legalLinks={legalLinks} />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App