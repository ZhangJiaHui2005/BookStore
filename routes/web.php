<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $books = Book::limit(10)->get();

    return Inertia::render("Client/Home", [
        'books' => $books
    ]);
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

Route::prefix('/author')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [AuthorController::class, 'index'])->name('authors.index');
    Route::post('/create', [AuthorController::class, 'create'])->name('authors.create');
    Route::delete('/delete/{id}', [AuthorController::class, 'delete'])->name('authors.delete');
    Route::put('/update/{id}', [AuthorController::class, 'update'])->name('authors.update');
});

Route::prefix('/book')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [BookController::class, 'index'])->name('books.index');
    Route::post('/create', [BookController::class, 'create'])->name('books.create');
    Route::delete('/delete/{id}', [BookController::class, 'delete'])->name('books.delete');
    Route::post('/update/{id}', [BookController::class, 'update'])->name('books.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
