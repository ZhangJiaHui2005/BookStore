<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['category_name'];
    public $timestamps = false;

    /**
     * Get the books associated with the category.
     */
    public function books()
    {
        return $this->hasMany(Book::class);
    }
}