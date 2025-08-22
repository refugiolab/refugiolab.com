import React, { useState, useEffect, useRef } from 'react';
// Importamos el video desde la ruta relativa en public
import VideoIntro from '../../public/VideoIntro.mp4';
// Importamos el logo desde la ruta relativa en public
import logo from '../../public/icons/logo.png';

const EntradaInmersiva = ({ onEntrar }) => {
  const texts = [
    "La vida es un ritual.",
    "Encontrá tu propio ritmo.",
    "Estamos en movimiento.",
    "Vestir(nos) con sentido."
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // Iniciamos el audio silenciado para evitar el error
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Iniciamos el audio en pausa
  const audioRef = useRef(null);

  // Manejador para el primer clic del usuario
  const handleUserInteraction = () => {
    if (!isAudioPlaying) {
      setIsAudioPlaying(true);
      setIsMuted(false);
    }
    // Una vez que el usuario interactúa, puedes iniciar la lógica de entrada.
    // Aquí puedes decidir si el clic en el botón "Habitarlo" también inicia el audio.
  };

  // Efecto para la secuencia de texto
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


  // Efecto para controlar la reproducción y mute del audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (isAudioPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Error al intentar reproducir el audio:", e);
          setIsAudioPlaying(false); // Si falla, lo ponemos en pausa
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted, isAudioPlaying]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Si estaba silenciado y lo activas, asegúrate de que esté reproduciéndose
    if (isMuted && !isAudioPlaying) {
      setIsAudioPlaying(true);
    }
  };

  const toggleAudioPlay = () => {
    setIsAudioPlaying(!isAudioPlaying);
    // Si lo pones a reproducir, quita el silencio si estaba silenciado
    if (!isAudioPlaying && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div className="entrada-inmersiva" onClick={handleUserInteraction}>
      <video className="video-fondo" autoPlay loop muted playsInline>
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