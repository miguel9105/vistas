import React, { useState } from 'react'; // Necesitas useState
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head } from '@inertiajs/react'; // Mantenemos Head
import axios from 'axios'; // 💡 IMPORTANTE: Agregar axios

// 💡 Nueva: URL de tu API externa en Railway
const API_BASE_URL = 'https://api10desas-production-bdfa.up.railway.app/api/v1'; 

export default function ForgotPassword({ status: initialStatus }) {
    // Reemplazamos useForm por useState para manejo de estado local
    const [data, setData] = useState({ email: '' });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState(initialStatus); // Para mensajes de éxito

    const submit = async (e) => { // Hacemos la función asíncrona
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        setStatus(null); // Limpiar mensajes de estado

        try {
            // 💡 Conexión al ENDPOINT DE EMAIL DE RECUPERACIÓN de tu API
            // Asumiendo que tu API tiene un endpoint para enviar el correo de recuperación
            const response = await axios.post(`${API_BASE_URL}/password/email`, {
                email: data.email,
            });
            
            // Si la API es exitosa, muestra el mensaje
            setStatus(response.data.message || 'Se ha enviado el enlace de restablecimiento de contraseña.'); 
            setData({ email: '' }); // Limpiar el campo de email

        } catch (error) {
            if (error.response) {
                if (error.response.data.errors) {
                    // Errores de validación de Laravel (si la API usa ese formato)
                    setErrors(error.response.data.errors);
                } else {
                    // Otros errores del API (p.ej., email no encontrado)
                    setStatus(error.response.data.message || 'Error al enviar el correo.');
                }
            } else {
                setStatus('Error de conexión con la API.');
            }
        } finally {
            setProcessing(false);
        }
    };
    
    // Función para manejar el cambio en el input
    const handleChange = (e) => {
        setData({ email: e.target.value });
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            
            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={handleChange} // Usamos la función local
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {processing ? 'Enviando...' : 'Email Password Reset Link'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}