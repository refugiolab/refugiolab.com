// src/pages/LoginPage/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin');
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            setError('Error al iniciar sesión. Verifica tu email y contraseña.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Envía el correo de verificación al nuevo usuario
            await sendEmailVerification(user);

            // Informa al usuario que se registró y que debe verificar su correo
            console.log('Usuario registrado. Correo de verificación enviado.');
            alert('¡Registro exitoso! Por favor, verifica tu correo electrónico para iniciar sesión.');
            
            // Opcional: cambia a la vista de login después del registro exitoso
            setIsRegistering(false);

        } catch (error) {
            console.error('Error al registrar:', error.message);
            setError('Error al registrar. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="login-container">
            <h2>{isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}</h2>
            <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">
                    {isRegistering ? 'Registrarse' : 'Entrar'}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p>
                {isRegistering ? (
                    <>
                        ¿Ya tienes una cuenta?{' '}
                        <button onClick={() => setIsRegistering(false)}>Inicia sesión</button>
                    </>
                ) : (
                    <>
                        ¿No tienes una cuenta?{' '}
                        <button onClick={() => setIsRegistering(true)}>Regístrate</button>
                    </>
                )}
            </p>
        </div>
    );
};

export default LoginPage;