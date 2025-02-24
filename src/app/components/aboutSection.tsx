'use client';
import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Observer para animações
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            if (entry.target === titleRef.current) {
              setTimeout(() => {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
              }, 300);
            }
            if (entry.target === textRef.current) {
              setTimeout(() => {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
              }, 600);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (textRef.current) observer.observe(textRef.current);

    // Listener para fullscreen change
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (textRef.current) observer.unobserve(textRef.current);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleFullscreen = () => {
    if (!videoRef.current) return;

    if (!isFullscreen) {
      videoRef.current.requestFullscreen().catch(console.error);
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(console.error);
      }
    }
  };

  return (
    <section
      id="about"
      className="relative py-40 bg-black/70 backdrop-blur-sm overflow-hidden min-h-screen flex items-center justify-center"
      ref={sectionRef}
    >
      {/* Vídeo de fundo */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ transform: 'translateZ(0)' }}
      >
        <source src="/astonmartin2.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/50 z-1"></div>

      {/* Conteúdo principal */}
      <div className="container mx-auto text-center relative z-10 px-4">
        {/* Título */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-montserrat font-light mb-8 text-white glow-text opacity-0 translate-y-10 transition-all duration-1000 cursor-pointer"
          style={{ letterSpacing: '0.2em' }}
        >
          QUEM SOMOS?
        </h2>

        {/* Texto sobre a Aston Martin */}
        <p
          ref={textRef}
          className="text-lg md:text-xl font-montserrat font-thin text-gray-300 max-w-4xl mx-auto opacity-0 translate-y-10 transition-all duration-1000 leading-relaxed"
        >
          A Aston Martin é sinônimo de luxo, desempenho e elegância. Fundada em 1913, a marca britânica é conhecida por seus carros esportivos icônicos, como o DB5, imortalizado nos filmes de James Bond. Combinando design atemporal, tecnologia de ponta e uma paixão pela inovação, a Aston Martin continua a definir o padrão para carros de alto desempenho.
        </p>

        {/* Botão centralizado */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleFullscreen}
            className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isFullscreen ? (
              <>
                <span>Sair da tela cheia</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </>
            ) : (
              <>
                <span>Assistir em tela cheia</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}