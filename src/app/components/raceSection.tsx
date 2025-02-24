'use client';
import { useState, useEffect, useRef } from 'react';

// Dados da equipe Aston Martin na F1
const teamStats = {
  teamName: 'Aston Martin Aramco Cognizant F1 Team',
  seasons: [
    {
      year: 2022,
      points: 55,
      position: 7,
      wins: 0,
      podiums: 0,
      poles: 0,
      drivers: [
        {
          id: 1,
          name: 'Fernando Alonso',
          nationality: 'Espanhol',
          carNumber: 14,
          points: 81,
          podiums: 0,
          bestResult: '5º lugar',
        },
        {
          id: 2,
          name: 'Lance Stroll',
          nationality: 'Canadense',
          carNumber: 18,
          points: 18,
          podiums: 0,
          bestResult: '6º lugar',
        },
      ],
    },
    {
      year: 2023,
      points: 280,
      position: 4,
      wins: 2,
      podiums: 8,
      poles: 1,
      drivers: [
        {
          id: 1,
          name: 'Fernando Alonso',
          nationality: 'Espanhol',
          carNumber: 14,
          points: 180,
          podiums: 6,
          bestResult: '1º lugar',
        },
        {
          id: 2,
          name: 'Lance Stroll',
          nationality: 'Canadense',
          carNumber: 18,
          points: 100,
          podiums: 2,
          bestResult: '3º lugar',
        },
      ],
    },
    {
      year: 2024,
      points: 150, // Dados fictícios para 2024
      position: 5,
      wins: 1,
      podiums: 4,
      poles: 0,
      drivers: [
        {
          id: 1,
          name: 'Fernando Alonso',
          nationality: 'Espanhol',
          carNumber: 14,
          points: 90,
          podiums: 3,
          bestResult: '2º lugar',
        },
        {
          id: 2,
          name: 'Lance Stroll',
          nationality: 'Canadense',
          carNumber: 18,
          points: 60,
          podiums: 1,
          bestResult: '4º lugar',
        },
      ],
    },
  ],
};

export default function RacesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSeasonIndex, setCurrentSeasonIndex] = useState(1); // Começa em 2023

  // Função para avançar para a próxima temporada
  const nextSeason = () => {
    setCurrentSeasonIndex((prevIndex) => (prevIndex + 1) % teamStats.seasons.length);
  };

  // Função para voltar à temporada anterior
  const prevSeason = () => {
    setCurrentSeasonIndex((prevIndex) => (prevIndex - 1 + teamStats.seasons.length) % teamStats.seasons.length);
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
      id="races" // ID da seção para navegação
      ref={sectionRef}
      className="relative py-20 bg-black/50 backdrop-blur-sm overflow-hidden min-h-screen flex items-center justify-center opacity-0 translate-y-10 transition-all duration-1000"
    >
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover "
        >
          <source src="/races.mp4" type="video/mp4" /> {/* Substitua pelo caminho do vídeo */}
          Seu navegador não suporta vídeos HTML5.
        </video>
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto text-center relative z-10 px-4">
        {/* Título da seção */}
        <h2 className="text-4xl md:text-5xl font-montserrat font-light mb-12 text-white glow-text uppercase tracking-wider">
          CORRIDAS
        </h2>

        {/* Estatísticas da equipe */}
        <div className="relative max-w-4xl mx-auto mb-12">
          {/* Setas de navegação para as temporadas */}
          <button
            onClick={prevSeason}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full hover:text-gray-300 transition-colors duration-300 z-20"
          >
            &#10094; {/* Ícone de seta para a esquerda */}
          </button>
          <button
            onClick={nextSeason}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full hover:text-gray-300 transition-colors duration-300 z-20"
          >
            &#10095; {/* Ícone de seta para a direita */}
          </button>

          {/* Card da temporada atual */}
          <div className="p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 group">
            <h3 className="text-3xl font-montserrat font-light mb-6 text-white">
              {teamStats.teamName} - Temporada {teamStats.seasons[currentSeasonIndex].year}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-white">
              {[
                { label: 'Pontos', value: teamStats.seasons[currentSeasonIndex].points },
                { label: 'Posição', value: `${teamStats.seasons[currentSeasonIndex].position}º` },
                { label: 'Vitórias', value: teamStats.seasons[currentSeasonIndex].wins },
                { label: 'Pódios', value: teamStats.seasons[currentSeasonIndex].podiums },
                { label: 'Pole Positions', value: teamStats.seasons[currentSeasonIndex].poles },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg hover:bg-white/5 transition-all duration-300"
                >
                  <h4 className="text-xl font-montserrat font-light mb-2">{stat.label}</h4>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Informações dos pilotos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {teamStats.seasons[currentSeasonIndex].drivers.map((driver) => (
            <div
              key={driver.id}
              className="relative p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden"
            >
              {/* Efeito de brilho ao passar o mouse */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Informações do piloto */}
              <h3 className="text-2xl font-montserrat font-light mb-4 text-white">
                {driver.name} <span className="text-sm text-gray-400">({driver.nationality})</span>
              </h3>
              <div className="text-white">
                <p className="text-lg font-montserrat font-thin mb-2">
                  Número do carro: <span className="font-bold">{driver.carNumber}</span>
                </p>
                <p className="text-lg font-montserrat font-thin mb-2">
                  Pontos: <span className="font-bold">{driver.points}</span>
                </p>
                <p className="text-lg font-montserrat font-thin mb-2">
                  Pódios: <span className="font-bold">{driver.podiums}</span>
                </p>
                <p className="text-lg font-montserrat font-thin">
                  Melhor resultado: <span className="font-bold">{driver.bestResult}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}