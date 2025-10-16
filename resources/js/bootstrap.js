/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// 💡 CONFIGURACIÓN CLAVE: URL base de tu API (necesaria para Login y Register)
window.axios.defaults.baseURL = 'https://api10desas-production-bdfa.up.railway.app/api/v1';

// 🚫 ELIMINADO: El interceptor que adjuntaba el token a todas las peticiones
// Esto asegura que la autenticación solo se use en el Login, no para las vistas.

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// ... (El resto del código de Echo comentado) ...