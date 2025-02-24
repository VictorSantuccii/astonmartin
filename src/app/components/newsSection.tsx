'use client';

import React, { useEffect, useRef, useState } from 'react';

const NewsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Dispara a animação quando 10% da seção estiver visível
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
      id="news"
      ref={sectionRef}
      className="relative py-32 bg-black text-white overflow-hidden"
    >
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/f1.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
      </div>

      {/* Conteúdo da seção */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Título e subtítulo */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-montserrat font-light tracking-widest animate-fadeIn">
            NOTÍCIAS
          </h2>
          <p className="text-lg font-jura font-light mt-4 text-gray-300">
            Fique por dentro das últimas novidades do mundo da Aston Martin.
          </p>
        </div>

        {/* Cards de notícias */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Card 1 */}
          <div className="relative group overflow-hidden rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105 border-2 border-white/10">
            <img
              src="/db11.jpg"
              alt="Notícia 1"
              className="w-full h-64 object-cover transition-all duration-500 group-hover:opacity-50"
            />
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <h3 className="text-2xl font-jura font-light mb-2">
                Aston Martin lança novo modelo esportivo
              </h3>
              <p className="text-sm font-light">
                A Aston Martin revelou seu mais recente modelo esportivo, combinando design futurista e performance de alto nível.
              </p>
            </div>
            <div className="absolute top-4 left-4 bg-black/70 px-4 py-2 rounded-full text-sm font-jura font-light">
              Novidade
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative group overflow-hidden rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105 border-2 border-white/10">
            <img
              src="/f1aston.jpg"
              alt="Notícia 2"
              className="w-full h-64 object-cover transition-all duration-500 group-hover:opacity-50"
            />
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <h3 className="text-2xl font-jura font-light mb-2">
                Aston Martin na F1: Novas atualizações para a temporada
              </h3>
              <p className="text-sm font-light">
                A equipe Aston Martin F1 anunciou atualizações significativas para o carro, visando melhorar o desempenho nas próximas corridas.
              </p>
            </div>
            <div className="absolute top-4 left-4 bg-black/70 px-4 py-2 rounded-full text-sm font-jura font-light">
              F1
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative group overflow-hidden rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105 border-2 border-white/10">
            <img
              src="/eletricaston.jpg"
              alt="Notícia 3"
              className="w-full h-64 object-cover transition-all duration-500 group-hover:opacity-50"
            />
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <h3 className="text-2xl font-jura font-light mb-2">
                Aston Martin apresenta conceito elétrico
              </h3>
              <p className="text-sm font-light">
                A Aston Martin revelou um novo conceito de carro elétrico, prometendo inovação e sustentabilidade para o futuro.
              </p>
            </div>
            <div className="absolute top-4 left-4 bg-black/70 px-4 py-2 rounded-full text-sm font-jura font-light">
              Elétrico
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;