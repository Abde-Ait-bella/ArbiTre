<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class But extends Model
{
    use HasFactory;

    protected $fillable = [
        'matche_id',
        'club_id',
        'joueur_numero',
        'joueur_nom',
        'minute',
    ];

    public function club(){
        return $this->belongsTo(Club::class);
    }
}
