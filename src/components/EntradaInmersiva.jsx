import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // ⚠️ Importamos useNavigate

const EntradaInmersiva = () => { // ⚠️ Eliminamos la prop onEntrar
  const navigate = useNavigate(); // ⚠️ Inicializamos el hook useNavigate
  
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

  // ⚠️ Nueva función para manejar el clic del botón
  const handleEntrar = () => {
    navigate('/home'); // ⚠️ Navegamos a la ruta /home
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
        <source src="/VideoIntro.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
      <audio ref={audioRef} autoPlay loop muted={isMuted}>
        {/* Aquí se podría añadir la fuente de audio */}
        Tu navegador no soporta la etiqueta de audio.
      </audio>

      <div className="overlay"></div>

      <div className="contenido-central">
        <img src="/icons/logo.png" alt="Refugio Logo" className="logo-refugio final" />
        {/* ⚠️ El onClick ahora llama a la nueva función handleEntrar */}
        <button className="boton-entrar" onClick={handleEntrar}>
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