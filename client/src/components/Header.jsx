import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './ui/Logo'
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
  ]

  return (
    <header className="sticky top-0 z-50 max-w-full mx-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : ''}`
              }
            >
              {item.name}
            </NavLink>
          ))}
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost">Log in</Button>
            <Button>Sign up</Button>
          </div>
        </nav>



        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden fixed inset-0 top-20 z-40 w-full bg-background/80 backdrop-blur-md transition-all duration-300 ease-in-out ${isMenuOpen
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 -translate-y-5 invisible"
          }`}
      >
        <div className="container mx-auto flex flex-col p-4 gap-4 bg-transparent">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `text-sm font-medium py-3 px-4 hover:bg-muted/50 rounded-md transition-colors ${isActive ? 'bg-muted' : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
          <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-border/40">
            <Button variant="ghost" className="justify-start">Log in</Button>
            <Button className="w-full">Sign up</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
