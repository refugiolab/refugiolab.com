// src/pages/ImmersiveIntro/ImmersiveIntroPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPause } from 'react-icons/fa';
import data from './intro-data'; // ¡Aquí está el cambio!
import './ImmersiveIntroPage.css';
import logoRefugio from '/logorefugioblanco.svg';

const ImmersiveIntroPage = () => {
    const navigate = useNavigate();
    const [currentFrase, setCurrentFrase] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const logoRef = useRef(null);

    // Animación del logo al cargar
    useEffect(() => {
        const logo = logoRef.current;
        if (logo) {
            const logoAnimationTimeout = setTimeout(() => {
                logo.classList.add('final');
            }, 500);
            return () => clearTimeout(logoAnimationTimeout);
        }
    }, []);

    // Rotación de frases
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentFrase((prevFrase) => (prevFrase + 1) % data.frases.length);
        }, 3500); // Duración de 3.5 segundos por frase
        return () => clearInterval(intervalId);
    }, []);

    // Lógica para el botón de "Entrar"
    const handleEnter = () => {
        if (videoRef.current) {
            videoRef.current.classList.add('fade-out'); // Agregar clase para fade-out del video
        }
        if (audioRef.current) {
            audioRef.current.volume = 0; // Silenciar audio
        }
        // Retraso para que la animación se complete antes de la navegación
        setTimeout(() => {
            navigate('/inicio');
        }, 1000); // Duración de la animación
    };

    // Lógica para reproducir/pausar audio
    const toggleAudio = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play().catch(error => console.log("Error al reproducir audio:", error));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="immersive-intro-page">
            <video
                ref={videoRef}
                id="video-fondo"
                className="video-fondo"
                src={data.video.url}
                autoPlay
                loop
                muted
                playsInline
            ></video>
            <div className="overlay"></div>

            <div className="contenido-central">
                <div className="content-group">
                    <img ref={logoRef} src="/logorefugioblanco.svg" alt="Refugio Logo" className="logo-refugio" />
                    <div className="narrativa-texto">
                        <span key={currentFrase} className="frase-animada">
                            {data.frases[currentFrase]}
                        </span>
                    </div>
                    <button className="boton-entrar" onClick={handleEnter}>
                        {data.botonEntrar}
                    </button>
                </div>
            </div>

            <div className="controles-musica">
                <audio ref={audioRef} src={data.audio.url} loop />
                <button onClick={toggleAudio} className="boton-audio" aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}>
                    {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
                </button>
            </div>
        </div>
    );
};

export default ImmersiveIntroPage;