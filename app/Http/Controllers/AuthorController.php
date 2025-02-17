<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthorController extends Controller
{
    public function index() {
        $authors = Author::paginate(10);

        return Inertia::render('Admin/Author/Index', [
            'authors' => $authors
        ]);
    }

    public function create(Request $request) {
        Author::create($request->validate([
            'name' => ['required', 'max:50'],
          ], ['name.required' => 'The author name is required.']));

        return to_route('authors.index');
    }

    public function update(Request $request, $id) {
        Author::where('author_id', $id)->update($request->validate([
            'name' => ['required', 'max:50'],
        ], ['name.required' => 'The author name is required']));

        return to_route('authors.index');
    }

    public function delete($id) {
        Author::where('author_id', $id)->delete();

        return to_route('authors.index');
    }
}
