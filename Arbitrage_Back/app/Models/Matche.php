<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matche extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'saison_id',
        'club_id_1',
        'club_id_2',
        'result_club_1',
        'result_club_2',
        'competition_id',
        'ville_id',
        'stade_id',
        'categorie_id',
        'arbitre_c_id',
        'centre_ville',
        'arbitre_a1_id',
        'assistant_1_ville',
        'arbitre_a2_id',
        'assistant_2_ville',
        'arbitre_4_id',
        'arbitre_4_ville',
        'delegue_id',
        'delegue_ville',
        'temps',
        'date',
        'temp_presence_delegue',
        'temp_presence_agents_sécurité',
        'nombre_agents_sécurité',
        'etat_stade',
        'etat_vestiaire',
        'rapport_supp',
        'user_id',
    ];

    public function saison()
    {
        return $this->belongsTo(Saison::class);
    }
    public function club()
    {
        return $this->hasMany(Club::class);
    }
    public function competition()
    {
        return $this->belongsTo(Competition::class);
    }
    public function ville()
    {
        return $this->belongsTo(Ville::class);
    }
    public function stade()
    {
        return $this->belongsTo(Stade::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function arbitre()
    {
        return $this->belongsToMany(Arbitre::class);
    }
    public function delegue()
    {
        return $this->belongsTo(Delegue::class);
    }
    public function penlty()
    {
        return $this->belongsToMany(Penalty::class);
    }
}
