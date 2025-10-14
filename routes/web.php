<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. HOME
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// 2. CHAT: Pasa el query parameter 'chat' como prop 'chatId'
Route::get('/chat', function () {
    // Obtiene el parámetro 'chat' de la URL, por ejemplo: /chat?chat=bomberos
    // Si no existe, usa 'general' como valor predeterminado.
    $chatId = request()->query('chat', 'general');
    
    return Inertia::render('Chat', [ // Apunta a resources/js/Pages/Chat.jsx
        'chatId' => $chatId,
    ]);
})->name('chat');

// 3. PUBLICAR
Route::get('/publicar', function () {
    return Inertia::render('Publication'); // Publicar.jsx (anteriormente Publication.jsx)
})->name('publicar');

// 4. CONOCENOS
Route::get('/conocenos', function () {
    return Inertia::render('Conocenos');
})->name('conocenos');

// 5. LOGIN
Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

// 6. RUTAS PENDIENTES (Crear estos archivos en resources/js/Pages)
Route::get('/buzon', function () {
    return Inertia::render('Buzon'); // Necesita crear Buzon.jsx
})->name('buzon');

Route::get('/perfil', function () {
    return Inertia::render('UserProfile'); // Necesita crear Perfil.jsx
})->name('perfil');

// 6. REGISTRO (Nueva ruta añadida para conectar Login.jsx con Register.jsx)
Route::get('/register', function () {
    return Inertia::render('Register'); // Apunta a resources/js/Pages/Register.jsx
})->name('register');