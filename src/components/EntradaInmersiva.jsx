import React, { useState, useEffect, useRef } from 'react';
// ⚠️ La ruta corregida para importar el video y el logo
import VideoIntro from '/VideoIntro.mp4';
import logo from '/icons/logo.png';

const EntradaInmersiva = ({ onEntrar }) => {
  const texts = [
    "La vida es un ritual.",
    "Encontrá tu propio ritmo.",
    "Estamos en movimiento.",
    "Vestir(nos) con sentido."
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleUserInteraction = () => {
    if (!isAudioPlaying) {
      setIsAudioPlaying(true);
      setIsMuted(false);
    }
  };

  useEffect(() => {
    let textTimer;
    if (currentTextIndex < texts.length) {
      const delay = currentTextIndex === 0 ? 2000 : 3500;
      textTimer = setTimeout(() => {
        setCurrentTextIndex((prevIndex) => prevIndex + 1);
      }, delay);
    }
    return () => clearTimeout(textTimer);
  }, [currentTextIndex, texts.length]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (isAudioPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Error al intentar reproducir el audio:", e);
          setIsAudioPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted, isAudioPlaying]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted && !isAudioPlaying) {
      setIsAudioPlaying(true);
    }
  };

  const toggleAudioPlay = () => {
    setIsAudioPlaying(!isAudioPlaying);
    if (!isAudioPlaying && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div className="entrada-inmersiva" onClick={handleUserInteraction}>
      <video className="video-fondo" autoPlay loop muted playsInline>
        {/* ⚠️ La ruta del video ha sido corregida */}
        <source src={VideoIntro} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
      <audio ref={audioRef} autoPlay loop muted={isMuted}>
        {/* Aquí se podría añadir la fuente de audio */}
        Tu navegador no soporta la etiqueta de audio.
      </audio>

      <div className="overlay"></div>

      <div className="contenido-central">
        <img src={logo} alt="Refugio Logo" className="logo-refugio final" />
        <button className="boton-entrar" onClick={onEntrar}>
          Habitarlo
        </button>
        <div className="narrativa-texto">
          {currentTextIndex < texts.length && (
            <p key={currentTextIndex} className="frase-animada">
              {texts[currentTextIndex]}
            </p>
          )}
        </div>
      </div>

      <div className="controles-musica">
        <button onClick={toggleAudioPlay} className="boton-audio">
          {isAudioPlaying ? '⏸️' : '▶️'}
        </button>
        <button onClick={toggleMute} className="boton-audio">
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
    </div>
  );
};

export default EntradaInmersiva;