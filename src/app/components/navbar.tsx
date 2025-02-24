'use client';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Fecha o menu mobile ao clicar em um link
    }
  };

  return (
    <nav className="bg-black/30 backdrop-blur-sm text-white py-3 fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo com animação e hover de zoom */}
        <div className="flex items-center ml-6 animate-logoAnimation hover:scale-105 transition-transform duration-300">
          <img
            src="/logo.png" // Substitua pelo caminho da sua logo
            alt="Logo"
            className="h-12 w-auto filter invert" // Filtro para inverter a cor da logo (preto para branco)
          />
        </div>

        {/* Menu Desktop (centralizado) */}
        <div className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center font-jura font-light text-white hover:text-green-400 transition-all duration-300 relative group"
          >
            HOME
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="flex items-center font-jura font-light text-white hover:text-green-400 transition-all duration-300 relative group"
          >
            SOBRE
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection('models')}
            className="flex items-center font-jura font-light text-white hover:text-green-400 transition-all duration-300 relative group"
          >
            MODELOS
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection('races')}
            className="flex items-center font-jura font-light text-white hover:text-green-400 transition-all duration-300 relative group"
          >
            CORRIDAS
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection('news')} // Adicionado link para a seção de notícias
            className="flex items-center font-jura font-light text-white hover:text-green-400 transition-all duration-300 relative group"
          >
            NOTÍCIAS
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="flex items-center font-jura font-light text-white hover:text-green-400 transition-all duration-300 relative group"
          >
            CONTATO
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>

        {/* Menu Mobile Hambúrguer */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl transform rotate-180 transition-all duration-300" /> // Ícone de "X" com animação
            ) : (
              <FaBars className="text-2xl transition-all duration-300" /> // Ícone de hambúrguer com animação
            )}
          </button>
        </div>

        {/* Menu Mobile (Dropdown) */}
        <div
          className={`md:hidden absolute top-16 right-0 bg-black/30 backdrop-blur-sm w-full shadow-lg transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}
        >
          <button
            onClick={() => scrollToSection('home')}
            className="block w-full text-left px-6 py-3 font-jura font-light text-white hover:text-green-400 hover:bg-gray-800/50 transition-all duration-300"
          >
            HOME
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="block w-full text-left px-6 py-3 font-jura font-light text-white hover:text-green-400 hover:bg-gray-800/50 transition-all duration-300"
          >
            SOBRE
          </button>
          <button
            onClick={() => scrollToSection('models')}
            className="block w-full text-left px-6 py-3 font-jura font-light text-white hover:text-green-400 hover:bg-gray-800/50 transition-all duration-300"
          >
            MODELOS
          </button>
          <button
            onClick={() => scrollToSection('races')}
            className="block w-full text-left px-6 py-3 font-jura font-light text-white hover:text-green-400 hover:bg-gray-800/50 transition-all duration-300"
          >
            CORRIDAS
          </button>
          <button
            onClick={() => scrollToSection('news')} // Adicionado link para a seção de notícias
            className="block w-full text-left px-6 py-3 font-jura font-light text-white hover:text-green-400 hover:bg-gray-800/50 transition-all duration-300"
          >
            NOTÍCIAS
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="block w-full text-left px-6 py-3 font-jura font-light text-white hover:text-green-400 hover:bg-gray-800/50 transition-all duration-300"
          >
            CONTATO
          </button>
        </div>
      </div>
    </nav>
  );
}