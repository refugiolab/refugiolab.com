import React, { useState, useEffect, useRef } from 'react';
import './EntradaInmersiva.css';
import logoRefugio from '/isonegro.svg'; // La ruta corregida

import VideoIntro from '/VideoIntro.mp4';
import { FaPlay, FaPause } from 'react-icons/fa';

const frases = [
  "La vida es un ritual.",
  "El bienestar es la nueva alta costura.",
  "La moda es un refugio."
];

const EntradaInmersiva = ({ onEnter }) => {
  const [currentFrase, setCurrentFrase] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    let timeoutId;
    if (videoRef.current) {
      const handleVideoReady = () => {
        timeoutId = setTimeout(() => {
          const logo = logoRef.current;
          if (logo) {
            logo.classList.add('final');
          }
          setShowButton(true);
        }, 10000);
      };
      
      handleVideoReady();
    }
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
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
            Habitarlo
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