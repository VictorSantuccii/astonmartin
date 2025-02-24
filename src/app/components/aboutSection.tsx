'use client';
import { useEffect, useRef } from 'react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            // Animação para o título com delay
            if (entry.target === titleRef.current) {
              setTimeout(() => {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
              }, 300); // Delay de 300ms para o título
            }
            // Animação para o texto com delay
            if (entry.target === textRef.current) {
              setTimeout(() => {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
              }, 600); // Delay de 600ms para o texto
            }
          }
        });
      },
      {
        threshold: 0.1, // Dispara a animação quando 10% da seção estiver visível
      }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (textRef.current) observer.observe(textRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, []);

  return (
    <section
      id="about"
      className="relative py-40 bg-black/70 backdrop-blur-sm overflow-hidden min-h-screen flex items-center justify-center"
      ref={sectionRef}
    >
      {/* Vídeo de fundo */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0"
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
      </div>
    </section>
  );
}