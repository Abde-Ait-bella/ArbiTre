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

    public function arbitre()
    {
        return $this->belongsTo(Arbitre::class, );
    }

    public function equipeA()
    {
        return $this->belongsTo(Club::class);
    }

    public function equipeB()
    {
        return $this->belongsTo(Club::class);
    }

    public function stade()
    {
        return $this->belongsTo(Stade::class);
    }

      public function arbitreAssistant1()
    {
        return $this->belongsTo(Arbitre::class);
    }

    public function arbitreAssistant2()
    {
        return $this->belongsTo(Arbitre::class);
    }

    public function quatriemeArbitre()
    {
        return $this->belongsTo(Arbitre::class);
    }

    public function delegue()
    {
        return $this->belongsTo(Delegue::class);
    }

    public function competition()
    {
        return $this->belongsTo(Competition::class);
    }

    public function buts()
    {
        return $this->hasMany(But::class, 'matche_id');
    }

    public function changements()
    {
        return $this->hasMany(Changement::class, 'matche_id');
    }

    public function avertissements()
    {
        return $this->hasMany(Avertissement::class, 'matche_id');
    }

    public function penalties()
    {
        return $this->hasMany(Penalty::class, 'matche_id');
    }

    public function saison()
    {
        return $this->belongsTo(Saison::class, 'saison_id');
    }
    

    public function categories()
    {
        return $this->belongsTo(Category::class, 'categorie_id');
    }

    public function ville()
    {
        return $this->belongsTo(Ville::class, 'ville_id');
    }
}
