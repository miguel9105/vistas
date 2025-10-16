import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, router } from '@inertiajs/react'; // Mantenemos useForm y añadimos router
import axios from 'axios'; // 💡 IMPORTANTE: Agregar axios

// 💡 Nueva: URL de tu API externa en Railway
const API_BASE_URL = 'https://api10desas-production-bdfa.up.railway.app/api/v1';

export default function ResetPassword({ token, email }) {
    // Mantenemos useForm de Inertia, pero la usaremos para manejar el estado, no para el post
    const { data, setData, reset, processing, setProcessing, errors, setErrors } = useForm({ // Modificamos para usar setProcessing/setErrors
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = async (e) => { // Hacemos la función asíncrona
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            // 💡 Conexión al ENDPOINT DE RESET DE CONTRASEÑA de tu API
            // Asumiendo que tu API usa un endpoint y formato de datos estándar
            const response = await axios.post(`${API_BASE_URL}/password/reset`, {
                token: data.token,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
            });

            // Si es exitoso, redirigimos al login con un mensaje de éxito
            // Usamos router.visit de Inertia para mantener la navegación
            router.visit('/login', {
                data: {
                    status: response.data.message || 'Tu contraseña ha sido restablecida exitosamente.'
                }
            });

        } catch (error) {
            setProcessing(false);
            if (error.response) {
                if (error.response.data.errors) {
                    // Errores de validación
                    setErrors(error.response.data.errors);
                } else {
                    alert(error.response.data.message || 'Error al restablecer la contraseña. Verifica tus datos.');
                }
            } else {
                alert('Error de conexión con la API.');
            }
        }
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />
            {/* ... Resto del JSX que usa data, setData, errors ... */}
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        disabled // El email se recibe como prop y no debería cambiarse
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}