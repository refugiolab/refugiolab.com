import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import './ImmersiveIntroPage.css';
import logoRefugio from '/logorefugioblanco.svg';
import VideoIntro from '/VideoIntro.mp4';
import { FaPlay, FaPause } from 'react-icons/fa';

const frases = [
    "La vida es un ritual",
    "Encontrá tu propio ritmo",
    "Estamos en movimiento",
    "Vestir(nos) con sentido"
];

const ImmersiveIntroPage = () => {
    const navigate = useNavigate(); // Inicializa useNavigate
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
            setCurrentFrase((prev) => (prev + 1) % frases.length);
        }, 3500);
        return () => clearInterval(intervalId);
    }, []);

    // Control de audio
    const toggleAudio = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(error => console.error("Error al reproducir el audio:", error));
        }
        setIsPlaying(!isPlaying);
    };

    // Función para manejar la entrada a la página principal
    const handleEnter = () => {
        navigate('/inicio'); // Redirige a la ruta /inicio
    };

    return (
        <div className="immersive-intro-page">
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
                <div className="content-group">
                    <img ref={logoRef} src={logoRefugio} alt="Refugio Logo" className="logo-refugio" />
                    <div className="narrativa-texto">
                        <span key={currentFrase} className="frase-animada">
                            {frases[currentFrase]}
                        </span>
                    </div>
                    <button className="boton-entrar" onClick={handleEnter}>
                        Ingresar
                    </button>
                </div>
            </div>

            <div className="controles-musica">
                <audio ref={audioRef} src="/audio/musica-ambiente.mp3" loop />
                <button onClick={toggleAudio} className="boton-audio" aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}>
                    {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
                </button>
            </div>
        </div>
    );
};

export default ImmersiveIntroPage;