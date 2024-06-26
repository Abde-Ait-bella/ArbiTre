<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delegue extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'ville_id',
        'user_id'
    ];

    public function Ville(){
        return $this->belongsTo(Ville::class);
    }
}
