<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penalty extends Model
{
    use HasFactory;

    public function matche()
    {
        return $this->belongsTo(Matche::class);
    }

    protected $fillable = [
        'club_id',
        'result',
        'opportunity',
        'matche_id'
    ];
}
