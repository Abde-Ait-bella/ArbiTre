<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Changement extends Model
{
    use HasFactory;

    protected $fillable = [
        'matche_id',
        'club_id',
        'joueur_num_sort',
        'joueur_num_entr',
        'minute',
    ];
    public function club(){
        return $this->belongsTo(Club::class);
    }

}
