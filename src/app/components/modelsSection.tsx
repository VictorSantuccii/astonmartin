'use client';
import { useState, useEffect, useRef } from 'react';

// Dados dos modelos (pode ser substituído por uma API ou banco de dados)
const models = [
  {
    id: 1,
    name: 'Aston Martin Valiant',
    video: '/valiant.mp4', // Substitua pelo caminho do vídeo
    description: 'O Valiant é um carro esportivo de alto desempenho, projetado para oferecer a máxima emoção ao volante.',
    topSpeed: '350 km/h',
    acceleration: '3.2s (0-100 km/h)',
    power: '750 HP',
    color: 'gold', // Cor personalizada para o Valiant
    additionalInfo: {
      engine: 'V12 Biturbo',
      torque: '900 Nm',
      weight: '1,650 kg',
    },
  },
  {
    id: 2,
    name: 'Aston Martin Vanquish',
    video: '/vanquish.mp4', // Substitua pelo caminho do vídeo
    description: 'O Vanquish é um Grand Tourer que combina luxo, conforto e desempenho excepcional.',
    topSpeed: '340 km/h',
    acceleration: '3.5s (0-100 km/h)',
    power: '700 HP',
    color: 'red', // Cor personalizada para o Vanquish
    additionalInfo: {
      engine: 'V12 Natural Aspirated',
      torque: '800 Nm',
      weight: '1,750 kg',
    },
  },
  {
    id: 3,
    name: 'Aston Martin DBX707',
    video: '/dbx707.mp4', // Substitua pelo caminho do vídeo
    description: 'O DBX707 é um SUV de alto desempenho, redefinindo o conceito de luxo e potência.',
    topSpeed: '330 km/h',
    acceleration: '3.8s (0-100 km/h)',
    power: '707 HP',
    color: 'orange', // Cor personalizada para o DBX707
    additionalInfo: {
      engine: 'V8 Biturbo',
      torque: '900 Nm',
      weight: '2,200 kg',
    },
  },
];

export default function ModelsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Função para avançar para o próximo modelo
  const nextModel = () => {
    setIsTextVisible(false); // Oculta o texto antes de trocar o modelo
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % models.length);
      setIsTextVisible(true); // Mostra o texto após trocar o modelo
    }, 300); // Delay para a animação de transição
  };

  // Função para voltar ao modelo anterior
  const prevModel = () => {
    setIsTextVisible(false); // Oculta o texto antes de trocar o modelo
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + models.length) % models.length);
      setIsTextVisible(true); // Mostra o texto após trocar o modelo
    }, 300); // Delay para a animação de transição
  };

  // Efeito para mostrar o texto ao carregar ou trocar o modelo
  useEffect(() => {
    setIsTextVisible(true);
    if (videoRef.current) {
      videoRef.current.load(); // Recarrega o vídeo ao trocar de modelo
      videoRef.current.play(); // Reproduz o vídeo automaticamente
    }
  }, [currentIndex]);

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
      id="models" // ID da seção para navegação
      ref={sectionRef}
      className="relative py-20 bg-black/90 backdrop-blur-sm overflow-hidden min-h-screen flex items-center justify-center opacity-0 translate-y-10 transition-all duration-1000"
    >
      {/* Vídeo de fundo do modelo atual */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        >
          <source src={models[currentIndex].video} type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto text-center relative z-10 px-4">
        {/* Título da seção */}
        <h2 className="text-4xl md:text-5xl font-montserrat font-light mb-12 text-white glow-text uppercase tracking-wider">
          NOSSOS MODELOS
        </h2>

        {/* Setas de navegação */}
        <button
          onClick={prevModel}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full hover:text-gray-300 transition-colors duration-300 z-20"
        >
          &#10094; {/* Ícone de seta para a esquerda */}
        </button>
        <button
          onClick={nextModel}
          className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full hover:text-gray-300 transition-colors duration-300 z-20"
        >
          &#10095; {/* Ícone de seta para a direita */}
        </button>

        {/* Informações do modelo atual */}
        <div className={`mt-48 text-white transition-opacity duration-500 ${isTextVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Nome do modelo */}
          <h3 className="text-3xl font-montserrat font-light mb-4 transform transition-all duration-500 ${isTextVisible ? 'translate-y-0' : 'translate-y-10'}">
            {models[currentIndex].name}
          </h3>

          {/* Descrição do modelo */}
          <p className="text-lg font-montserrat font-thin max-w-2xl mx-auto mb-6 transform transition-all duration-500 ${isTextVisible ? 'translate-y-0' : 'translate-y-10'}">
            {models[currentIndex].description}
          </p>

          {/* Informações técnicas (ocultas em mobile) */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Velocidade máxima */}
            <div className="text-center group">
              <h4 className="text-xl font-montserrat font-light mb-2">Velocidade Máxima</h4>
              <p className="text-2xl font-bold text-white relative inline-block">
                {models[currentIndex].topSpeed}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </p>
              <p className="text-sm font-montserrat font-thin mt-2">
                Motor: {models[currentIndex].additionalInfo.engine}
              </p>
            </div>

            {/* Aceleração */}
            <div className="text-center group">
              <h4 className="text-xl font-montserrat font-light mb-2">Aceleração (0-100 km/h)</h4>
              <p className="text-2xl font-bold text-white relative inline-block">
                {models[currentIndex].acceleration}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </p>
              <p className="text-sm font-montserrat font-thin mt-2">
                Torque: {models[currentIndex].additionalInfo.torque}
              </p>
            </div>

            {/* Potência */}
            <div className="text-center group">
              <h4 className="text-xl font-montserrat font-light mb-2">Potência</h4>
              <p className="text-2xl font-bold text-white relative inline-block">
                {models[currentIndex].power}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </p>
              <p className="text-sm font-montserrat font-thin mt-2">
                Peso: {models[currentIndex].additionalInfo.weight}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}