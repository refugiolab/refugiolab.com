import React, { useState, useEffect, useRef } from 'react';
import './EntradaInmersiva.css';
import logoRefugio from '/isoblanco.svg';
import VideoIntro from '/VideoIntro.mp4';
import { FaPlay, FaPause } from 'react-icons/fa';

const frases = [
  "La vida es un ritual",
  "Encontrá tu propio ritmo",
  "Estamos en movimiento",
  "Vestir(nos) con sentido"
];

const EntradaInmersiva = ({ onEnter }) => {
  const [currentFrase, setCurrentFrase] = useState(0);
  const [showButton, setShowButton] = useState(true); // El botón ahora es visible desde el principio
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Este efecto maneja la animación final del logo
    const logo = logoRef.current;
    if (logo) {
      // El logo se anima inmediatamente
      const logoAnimationTimeout = setTimeout(() => {
        logo.classList.add('final');
      }, 500); // Pequeño retraso para que la animación se vea fluida
      return () => clearTimeout(logoAnimationTimeout);
    }
  }, []);

  useEffect(() => {
    // Este efecto maneja el cambio de frases
    const intervalId = setInterval(() => {
      setCurrentFrase((prev) => (prev + 1) % frases.length);
    }, 3500);
    return () => clearInterval(intervalId);
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(error => console.error("Error al reproducir el audio:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="entrada-inmersiva">
      <video
        ref={videoRef}
        id="video-fondo"
        className="video-fondo"
        src={VideoIntro}
        autoPlay
        loop
        muted
        playsInline
      ></video>
      <div className="overlay"></div>

      <div className="contenido-central">
        <img ref={logoRef} src={logoRefugio} alt="Refugio Logo" className="logo-refugio" />
        <div className="narrativa-texto">
          <span key={currentFrase} className="frase-animada">
            {frases[currentFrase]}
          </span>
        </div>
        {showButton && (
          <button className="boton-entrar" onClick={onEnter}>
            Ingresar
          </button>
        )}
      </div>

      <div className="controles-musica">
        <audio ref={audioRef} src="/audio/musica-ambiente.mp3" loop />
        <button onClick={toggleAudio} className="boton-audio" aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}>
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
      </div>
    </div>
  );
};

export default EntradaInmersiva;