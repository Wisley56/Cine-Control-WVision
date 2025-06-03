"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/filmes', label: 'Filmes' },
  { href: '/salas', label: 'Salas' },
  { href: '/cadastro-sessoes', label: 'Cadastrar Sessão' },
  { href: '/sessoes', label: 'Sessões Disponíveis' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  
  const HamburgerIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  );

  
  const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  );

  return (
    <nav
      className="shadow-md sticky top-0 z-40" 
      style={{ backgroundColor: 'var(--card-background)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold transition-colors"
          style={{
            color: 'var(--primary-accent)',
          }}
        >
          WVison Cine Manager
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-3 lg:space-x-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-150 ease-in-out`}
                  style={{
                    backgroundColor: isActive ? 'var(--primary-accent)' : 'transparent',
                    color: isActive ? 'var(--background)' : 'var(--muted-text)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--secondary-accent)';
                      e.currentTarget.style.color = 'var(--primary-accent)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--muted-text)';
                    }
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-[var(--muted-text)] hover:text-[var(--primary-accent)] focus:outline-none p-2 rounded-md"
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 shadow-lg" style={{ backgroundColor: 'var(--card-background)' }}>
          <ul className="flex flex-col items-center py-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} className="w-full">
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full text-center px-4 py-3 text-base font-medium transition-all duration-150 ease-in-out`}
                    style={{
                      backgroundColor: isActive ? 'var(--primary-accent)' : 'transparent',
                      color: isActive ? 'var(--background)' : 'var(--muted-text)',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="border-b-2 opacity-50" style={{ borderColor: 'var(--border-color)' }}></div>
        </div>
      )}

      <div
        className="border-b-2 opacity-50"
        style={{ borderColor: 'var(--border-color)' }}
      ></div>
    </nav>
  );
}