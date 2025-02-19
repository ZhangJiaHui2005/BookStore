<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    protected $fillable = ['name'];
    public $timestamps = false;

    /**
     * Get the books written by the author.
     */
    public function books()
    {
        return $this->hasMany(Book::class);
    }
}

?>