'use client';
import { useEffect, useState, useRef } from 'react'; // Adicionei useRef aqui
import { FaArrowRight } from 'react-icons/fa';

export default function HeroSection() {
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isBackgroundDark, setIsBackgroundDark] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null); // Referência para o vídeo

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Função para ativar o modo de tela cheia no vídeo
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen(); // Método padrão
      }
    }
  };

  useEffect(() => {
    // Animação de entrada: logo aparece gradualmente
    const timer1 = setTimeout(() => {
      setIsLogoVisible(true); // Faz a logo aparecer gradualmente
    }, 500); // A logo começa a aparecer após 0.5 segundos

    const timer2 = setTimeout(() => {
      setIsLogoVisible(false); // Faz a logo desaparecer
    }, 2500); // A logo desaparece após 2 segundos

    const timer3 = setTimeout(() => {
      setIsBackgroundDark(false); // Restaura o fundo ao normal após 3 segundos
    }, 3000);

    const timer4 = setTimeout(() => {
      setIsContentVisible(true); // Exibe o letreiro e o subtítulo após 3 segundos
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Vídeo de fundo da Aston Martin */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef} // Referência para o vídeo
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
          style={{ transform: 'translateZ(0)' }}
        >
          <source src="/astonmartin.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
      </div>

      {/* Overlay escuro */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ${isBackgroundDark ? 'opacity-100' : 'opacity-0'}`}
      ></div>

      {/* Logo centralizada */}
      {isLogoVisible && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img
            src="/logo.png" // Substitua pelo caminho da sua logo
            alt="Logo Aston Martin"
            className="h-32 w-auto filter invert animate-logoFadeInOut"
          />
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="text-center z-10 relative transform translate-y-40">
        {/* Título "Aston Martin" centralizado */}
        {isContentVisible && (
          <h1 className="text-7xl font-montserrat font-light text-white uppercase tracking-widest animate-fadeIn">
            ASTON MARTIN
          </h1>
        )}

        {/* Subtítulo com estilo minimalista */}
        {isContentVisible && (
          <p className="text-xl font-montserrat font-light text-gray-300 mt-4 animate-slideIn">
            Onde a elegância encontra a performance.
          </p>
        )}

        {/* Botão para tela cheia */}
        {isContentVisible && (
          <div className="flex justify-center mt-8"> {/* Centraliza o botão */}
            <button
              onClick={handleFullscreen}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 animate-fadeIn"
            >
              <span>Assistir em tela cheia</span>
              <FaArrowRight className="text-xl" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}