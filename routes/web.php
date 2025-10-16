<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PublicationController;
use Inertia\Inertia;

// RUTAS PÚBLICAS
// 1. HOME
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// 2. CONOCENOS
Route::get('/conocenos', function () {
    return Inertia::render('Conocenos');
})->name('conocenos');

// 3. LOGIN
Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

// 4. REGISTRO
Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register');
Route::get('/publicaciones', function () {
    // Esta ruta renderiza el componente AllPublicationsPage
    return Inertia::render('AllPublicationsPage');
})->name('publications.index');


// RUTAS PROTEGIDAS MANEJADAS POR EL CLIENTE (Eliminamos el middleware 'auth')
// Estas páginas ahora confían en la verificación de localStorage/router.visit en su respectivo .jsx

// CHAT: Pasa el query parameter 'chat' como prop 'chatId'
Route::get('/chat', function () {
    // Obtiene el parámetro 'chat' de la URL, por ejemplo: /chat?chat=bomberos
    $chatId = request()->query('chat', 'general');
    return Inertia::render('Chat', [ // Apunta a resources/js/Pages/Chat.jsx
        'chatId' => $chatId,
    ]);
})->name('chat');

// PUBLICAR
Route::get('/publicar', function () {
    return Inertia::render('Publication'); // Publication.jsx
})->name('publicar');

// PERFIL DE USUARIO
Route::get('/perfil', function () {
    return Inertia::render('UserProfile');
})->name('perfil');

// BUZÓN
Route::get('/buzon', function () {
    return Inertia::render('Buzon'); 
})->name('buzon');

// Las rutas que necesiten una verdadera protección de Laravel (ej: APIs internas)
// deberían mantener el middleware 'auth' o usar Sanctum en Laravel.

// NOTA: Si necesitas rutas con autenticación real de Laravel, puedes crear un nuevo grupo:
/*
Route::middleware(['auth:sanctum'])->group(function () {
    // ... Tus rutas de API o de backend protegidas
});
*/