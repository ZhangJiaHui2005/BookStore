<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Models\Category;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render("Client/Home");
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/categories', function () {
    return Inertia::render('Admin/Category/Index');
})->middleware(['auth', 'verified'])->name('categories.index');

Route::prefix('/categories')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/create', [CategoryController::class, 'create'])->name('categories.create');
    Route::delete('/delete/{id}', [CategoryController::class, 'delete'])->name('categories.delete');
    Route::put('/update/{id}', [CategoryController::class, 'update'])->name('categories.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
