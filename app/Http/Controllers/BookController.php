<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index() {
        $books = Book::paginate(10);

        return Inertia::render('Admin/Book/Index', [
            'books' => $books
        ]);
    }

    public function create(Request $request, Response $response) {
        $validated = $request->validate([
            'title' => ['required', 'max:255'],
            'author_id' => ['required', 'integer', 'exists:authors,author_id'],
            'category_id' => ['required', 'integer', 'exists:categories,category_id'],
            'price' => ['required', 'numeric'],
            'isbn' => ['required', 'max:20'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('book_images', 'public');
        }

        Book::create($validated);

        return to_route('books.index');
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'title' => ['required', 'max:255'],
            'author_id' => ['required', 'integer', 'exists:authors,author_id'],
            'category_id' => ['required', 'integer', 'exists:categories,category_id'],
            'price' => ['required', 'numeric'],
            'isbn' => ['required', 'max:20'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        $book = Book::findOrFail($id);

        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($book->image) {
                Storage::disk('public')->delete($book->image);
            }
            $validated['image'] = $request->file('image')->store('book_images', 'public');
        }

        $book->update($validated);

        return to_route('books.index');
    }

    public function delete($id) {
        $book = Book::findOrFail($id);

        // Delete the image if it exists
        if ($book->image) {
            Storage::disk('public')->delete($book->image);
        }

        $book->delete();

        return to_route('books.index');
    }
}
