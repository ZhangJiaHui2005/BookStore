<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index() {
         $categories = Category::paginate(10);

        return Inertia::render('Admin/Category/Index', [
            'categories' => $categories,
        ]);
    }

    public function create(Request $request) {
        Category::create($request->validate([
            'category_name' => ['required', 'max:50'],
          ]));

        return to_route('categories.index');
    }

    public function update(Request $request, $id) {
        Category::where('category_id', $id)->update($request->validate([
            'category_name' => ['required', 'max:50'],
        ]));

        return to_route('categories.index');
    }

    public function delete($id) {
        Category::where('category_id', $id)->delete();

        return to_route('categories.index');
    }
}
