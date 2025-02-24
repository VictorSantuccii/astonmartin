'use client';
import { useState, useEffect, useRef } from 'react';
import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  // Função para enviar mensagem via WhatsApp
  const sendWhatsAppMessage = () => {
    const phoneNumber = '5516991440887';
    const text = `Olá, meu nome é ${name} (${email}). ${message}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Efeito para animação de scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      {
        threshold: 0.1, // Dispara a animação quando 10% da seção estiver visível
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="contact" // ID da seção para navegação
      ref={sectionRef}
      className="relative py-20 bg-black/90 backdrop-blur-sm overflow-hidden min-h-screen flex items-center justify-center opacity-0 translate-y-10 transition-all duration-1000"
    >
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 z-0">
        <video
        autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ transform: 'translateZ(0)' }}
        >
          <source src="/contato.mp4" type="video/mp4" /> {/* Substitua pelo caminho do vídeo */}
          Seu navegador não suporta vídeos HTML5.
        </video>
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto text-center relative z-10 px-4">
        {/* Título da seção */}
        <h2 className="text-4xl md:text-5xl font-montserrat font-light mb-12 text-white glow-text uppercase tracking-wider">
          CONTATO
        </h2>

        {/* Formulário futurista */}
        <div className="max-w-2xl mx-auto bg-black/10 p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 group">
          <div className="grid grid-cols-1 gap-6">
            {/* Campo Nome */}
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all duration-300 font-montserrat font-thin"
                placeholder="Nome"
              />
            </div>

            {/* Campo Email */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all duration-300 font-montserrat font-thin"
                placeholder="Email"
              />
            </div>

            {/* Campo Mensagem */}
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all duration-300 font-montserrat font-thin"
                placeholder="Mensagem"
                rows={4}
              />
            </div>

            {/* Botão de enviar */}
            <button
              onClick={sendWhatsAppMessage}
              className="mt-6 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <FaWhatsapp className="text-xl transform group-hover:scale-110 transition-transform duration-300" />
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                Enviar via WhatsApp
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 py-6 bg-black/50 backdrop-blur-sm text-white text-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          {/* Direitos autorais */}
          <p className="text-sm font-montserrat font-thin">
            &copy; Víctor Santucci - 2025. Todos os direitos reservados.
          </p>

          {/* Ícones de redes sociais */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="https://www.instagram.com/victorsantuccii"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300 transform hover:scale-110"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/victorsantuccii"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300 transform hover:scale-110"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href="https://github.com/VictorSantuccii"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300 transform hover:scale-110"
            >
              <FaGithub className="text-2xl" />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}