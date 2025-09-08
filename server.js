// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const port = process.env.SERVER_PORT || 3001;

// --- Middlewares ---
// Habilita CORS
app.use(cors());

// Analiza las solicitudes JSON
app.use(express.json());

// --- Configuración de Nodemailer ---
// Crea un "transporter" que se encargará de enviar los correos.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// --- Rutas (Endpoints) del Servidor ---

// Endpoint para manejar la solicitud de contacto
app.post('/api/contact', async (req, res) => {
    // Extrae los datos del formulario
    const { nombre, email, mensaje } = req.body;

    // Validación básica de los datos
    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        // Opciones del correo electrónico a enviar
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Destinatario
            subject: `Nuevo mensaje de contacto de ${nombre}`,
            html: `
                <h3>Detalles del Contacto:</h3>
                <ul>
                    <li>Nombre: ${nombre}</li>
                    <li>Email: ${email}</li>
                </ul>
                <h4>Mensaje:</h4>
                <p>${mensaje}</p>
            `,
        };

        // Envía el correo electrónico
        await transporter.sendMail(mailOptions);
        
        // Responde con un mensaje de éxito
        res.status(200).json({ message: 'Mensaje enviado con éxito.' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ message: 'Error al enviar el mensaje. Por favor, intenta de nuevo más tarde.' });
    }
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor de backend escuchando en http://localhost:${port}`);
});