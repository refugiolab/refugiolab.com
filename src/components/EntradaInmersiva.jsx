import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const EntradaInmersiva = () => {
  const navigate = useNavigate();
  
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
    // Si el audio no está sonando, inicia la reproducción y desmutea
    if (!isAudioPlaying && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true);
        setIsMuted(false);
      }).catch(e => {
        console.error("Error al intentar iniciar el audio con interacción de usuario:", e);
        setIsAudioPlaying(false);
        setIsMuted(true); // Si falla, vuelve a mutear
      });
    } else if (isMuted && audioRef.current) {
        // Si está muteado y ya está reproduciendo (o intentando), desmutea
        setIsMuted(false);
    }
  };

  const handleEntrar = () => {
    navigate('/home');
  };

  // Efecto para la secuencia de textos
  useEffect(() => {
    let textTimer;
    if (currentTextIndex < texts.length) {
      const delay = currentTextIndex === 0 ? 2000 : 3500;
      textTimer = setTimeout(() => {
        setCurrentTextIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else if (currentTextIndex === texts.length) {
      // Opcional: Si quieres que el último texto se quede un tiempo más o hacer algo al final
      // Por ahora, solo deja que el timer termine
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
          setIsAudioPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }

    // Función de limpieza: se ejecuta cuando el componente se desmonta
    return () => {
      if (audioRef.current) {
        audioRef.current.pause(); // Pausa el audio para evitar el error de interrupción
        audioRef.current.currentTime = 0; // Opcional: reinicia el audio al inicio
      }
    };
  }, [isMuted, isAudioPlaying]);


  const toggleMute = () => {
    setIsMuted(prevIsMuted => {
      // Si estaba muteado y se va a desmutear, y el audio no estaba reproduciendo, intenta iniciarlo.
      if (prevIsMuted && !isAudioPlaying && audioRef.current) {
        audioRef.current.play().catch(e => {
          console.error("Error al intentar reproducir al desmutear:", e);
          setIsAudioPlaying(false);
        });
        setIsAudioPlaying(true); // Asume que intentará reproducir
      }
      return !prevIsMuted;
    });
  };

  const toggleAudioPlay = () => {
    setIsAudioPlaying(prevIsAudioPlaying => {
      if (!prevIsAudioPlaying && audioRef.current) { // Si no estaba reproduciendo y se va a iniciar
        audioRef.current.play().catch(e => {
          console.error("Error al intentar reproducir con el botón de play/pause:", e);
          // Si falla al reproducir, asegúrate de que el estado refleje eso.
          setIsAudioPlaying(false); 
        });
      }
      return !prevIsAudioPlaying;
    });
  };

  return (
    <div className="entrada-inmersiva" onClick={handleUserInteraction}>
      <video className="video-fondo" autoPlay loop muted playsInline>
        <source src="/VideoIntro.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
      <audio ref={audioRef} autoPlay loop muted={isMuted}>
        {/* Aquí debes añadir la fuente de audio real de tu proyecto */}
        <source src="/audio/background-music.mp3" type="audio/mpeg" />
        Tu navegador no soporta la etiqueta de audio.
      </audio>

      <div className="overlay"></div>

      <div className="contenido-central">
        {/* ¡Ruta del logo corregida! */}
        <img src="/icons/logo.png" alt="Refugio Logo" className="logo-refugio final" />
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
