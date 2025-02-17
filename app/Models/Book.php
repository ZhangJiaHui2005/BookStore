<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'author_id', 'category_id', 'price', 'isbn', 'description', 'image'];
    public $timestamps = false;

    protected $primaryKey = 'book_id';

    /**
     * Get the author of the book.
     */
    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    /**
     * Get the category of the book.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}