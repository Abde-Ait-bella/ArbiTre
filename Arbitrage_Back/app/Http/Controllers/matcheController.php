<?php

namespace App\Http\Controllers;

use App\Models\Matche;
use App\Models\Arbitre;
use App\Models\Delegue;
use App\Models\Club;
use App\Models\Stade; // Ajouter l'import du modèle Stade
use App\Models\Avertissement;
use App\Models\But;
use App\Models\Changement;
use App\Models\Penalty;
use App\Models\Ville;
use Illuminate\Http\Request;

class MatcheController extends Controller
{
    public function index()
    {
        $matche = Matche::with(['stade.ville', 'ville', 'delegue.ville', 'competition', 'saison'])->get();
        return $matche;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->all();
            $user_id = $request->user_id;   

            // Fonction pour créer ou récupérer une ville
            $this->handleVille($data, 'centre_ville', $user_id);
            $this->handleVille($data, 'assistant_1_ville', $user_id);
            $this->handleVille($data, 'assistant_2_ville', $user_id);
            $this->handleVille($data, 'delegue_ville', $user_id);
            $this->handleVille($data, 'ville_id', $user_id);
            $this->handleVille($data, 'arbitre_4_ville', $user_id);

            // Fonction pour créer ou récupérer un arbitre
            $this->handleArbitre($data, 'arbitre_c_id', 'centre', $user_id, $data['centre_ville']);
            $this->handleArbitre($data, 'arbitre_a1_id', 'assistant', $user_id, $data['assistant_1_ville']);
            $this->handleArbitre($data, 'arbitre_a2_id', 'assistant', $user_id, $data['assistant_2_ville']);
            
            if (isset($data['arbitre_4_id'])) {
                $this->handleArbitre($data, 'arbitre_4_id', 'centre', $user_id, $data['arbitre_4_ville']);
            } else {
                $data['arbitre_4_id'] = null;
                $data['arbitre_4_ville'] = null;
            }

            // Fonction pour créer ou récupérer un délégué
            $this->handleDelegue($data, 'delegue_id', $user_id, $data['delegue_ville']);

            // Fonction pour créer ou récupérer un stade
            $this->handleStade($data, 'stade_id', $user_id, $data['ville_id']);

            // Fonction pour créer ou récupérer les clubs
            $this->handleClub($data, 'club_id_1', $user_id, $data['stade_id'], $data['ville_id']);
            $this->handleClub($data, 'club_id_2', $user_id, null, null);

            // Créer le match avec les IDs numériques
            $match = Matche::create($data);

            return response()->json([
                'status' => true,
                'message' => 'Match créé avec succès',
                'data' => $data
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Erreur lors de la création du match: ' . $e->getMessage()
            ], 500);
        }
    }

    private function handleArbitre(&$data, $field, $type, $user_id, $ville_id)
    {
        if (isset($data[$field]) && !is_numeric($data[$field])) {
            // Si c'est une string, on crée l'arbitre
            $nom_complet = strtoupper($data[$field]);
            $parts = explode(' ', $nom_complet);

            if (isset($parts)) {
                $nom = $parts[0];
                $prenom = implode(' ', array_slice($parts, 1));
                
                // Vérifier si l'arbitre existe déjà
                $arbitre = Arbitre::where('nom', $nom)
                    ->where('prenom', $prenom)
                    ->where('user_id', $user_id)
                    ->first();
                
                if (!$arbitre) {
                    // Créer le nouvel arbitre
                    $arbitre = Arbitre::create([
                        'nom' => $nom,
                        'prenom' => $prenom,
                        'type' => $type,
                        'user_id' => $user_id,
                        'ville_id' => $ville_id
                    ]);
                }
                
                // Remplacer la string par l'ID
                $data[$field] = $arbitre->id;
            } else {
                // Si le format n'est pas correct, on supprime le champ
                unset($data[$field]);
            }
        }
    }

    private function handleDelegue(&$data, $field, $user_id, $ville_id)
    {
        if (isset($data[$field]) && !is_numeric($data[$field])) {
            // Si c'est une string, on crée le délégué
            $nom_complet = strtoupper($data[$field]);
            $parts = explode(' ', $nom_complet);
            
            if (isset($parts)) {
                $nom = $parts[0];
                $prenom = implode(' ', array_slice($parts, 1));
                
                // Vérifier si le délégué existe déjà
                $delegue = Delegue::where('nom', $nom)
                    ->where('prenom', $prenom)
                    ->where('user_id', $user_id)
                    ->first();
                
                if (!$delegue) {
                    // Créer le nouveau délégué
                    $delegue = Delegue::create([
                        'nom' => $nom,
                        'prenom' => $prenom,
                        'user_id' => $user_id,
                        'ville_id' => $ville_id 
                    ]);
                }
                
                // Remplacer la string par l'ID
                $data[$field] = $delegue->id;
            } else {
                // Si le format n'est pas correct, on supprime le champ
                unset($data[$field]);
            }
        }
    }

    // Nouvelle fonction pour gérer les clubs
    private function handleClub(&$data, $field, $user_id, $stade_id = null, $ville_id = null)
    {
        if (isset($data[$field]) && !is_numeric($data[$field])) {
            // Si c'est une string, on crée le club
            $nom_club_complet = trim($data[$field]);
            
            if (!empty($nom_club_complet)) {
                // Vérifier si le nom contient une abréviation entre parenthèses
                $nom_club = $nom_club_complet;
                $abbr_club = null;
                
                // Rechercher le pattern (XXX) à la fin du nom
                if (preg_match('/^(.+?)\s*\(([^)]+)\)$/', $nom_club_complet, $matches)) {
                    $nom_club = trim($matches[1]); // Nom sans l'abréviation
                    $abbr_club = trim($matches[2]); // Abréviation sans les parenthèses
                }
                
                // Vérifier si le club existe déjà
                $club = Club::where('nom', $nom_club)
                    ->where('user_id', $user_id)
                    ->first();
                
                if (!$club) {
                    // Créer le nouveau club
                    $club = Club::create([
                        'nom' =>  $nom_club,
                        'abbr' => !$abbr_club ? $nom_club : $abbr_club, // Utiliser l'abréviation ou le nom complet
                        'user_id' => $user_id,
                        'ville_id' => $ville_id, 
                        'stade_id' => $stade_id, 
                    ]);
                }
                
                // Remplacer la string par l'ID
                $data[$field] = $club->id;
            } else {
                // Si le nom est vide, on supprime le champ
                unset($data[$field]);
            }
        }
    }

    // Nouvelle fonction pour gérer les stades
    private function handleStade(&$data, $field, $user_id, $ville_id)
    {

        
        if (isset($data[$field]) && !is_numeric($data[$field])) {
            // Si c'est une string, on crée le stade
            $nom_stade = trim($data[$field]);
            
            if (!empty($nom_stade)) {
                // Vérifier si le stade existe déjà
                $stade = Stade::where('nom', $nom_stade)
                    ->where('user_id', $user_id)
                    ->first();
                
                if (!$stade) {
                    // Créer le nouveau stade
                    $stade = Stade::create([
                        'nom' => $nom_stade,
                        'ville_id' => $ville_id,
                        'user_id' => $user_id
                    ]);
                }
                
                // Remplacer la string par l'ID
                $data[$field] = $stade->id;
                
                // Aussi mettre à jour ville_id si ce n'était pas défini
                // if (!isset($data['ville_id']) && $stade->ville_id) {
                //     $data['ville_id'] = $stade->ville_id;
                // }
            } else {
                // Si le nom est vide, on supprime le champ
                unset($data[$field]);
            }
        }
    }

    // Nouvelle fonction pour gérer les villes
    private function handleVille(&$data, $field, $user_id)
    {
        if (isset($data[$field]) && !is_numeric($data[$field])) {
            $nom_ville = trim($data[$field]);
            if (!empty($nom_ville)) {
                // Vérifier si la ville existe déjà
                $ville = Ville::where('nom', $nom_ville)
                    ->where('user_id', $user_id)
                    ->first();

                if (!$ville) {
                    // Créer la nouvelle ville
                    $ville = Ville::create([
                        'nom' => $nom_ville,
                        'user_id' => $user_id
                    ]);
                }

                // Remplacer la string par l'ID
                $data[$field] = $ville->id;
            } else {
                unset($data[$field]);
            }
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $data = $request->all();
            $user_id = $request->input('user_id');

            // Gestion des villes
            $this->handleVille($data, 'centre_ville', $user_id);
            $this->handleVille($data, 'assistant_1_ville', $user_id);
            $this->handleVille($data, 'assistant_2_ville', $user_id);
            $this->handleVille($data, 'delegue_ville', $user_id);
            $this->handleVille($data, 'ville_id', $user_id);
            $this->handleVille($data, 'arbitre_4_ville', $user_id);

            // Gestion des arbitres
            $this->handleArbitre($data, 'arbitre_c_id', 'centre', $user_id, $data['centre_ville']);
            $this->handleArbitre($data, 'arbitre_a1_id', 'assistant', $user_id, $data['assistant_1_ville']);
            $this->handleArbitre($data, 'arbitre_a2_id', 'assistant', $user_id, $data['assistant_2_ville']);

            if (isset($data['arbitre_4_id'])) {
                $this->handleArbitre($data, 'arbitre_4_id', 'centre', $user_id, $data['arbitre_4_ville']);
            } else {
                $data['arbitre_4_id'] = null;
                $data['arbitre_4_ville'] = null;
            }

            // Gestion du délégué
            $this->handleDelegue($data, 'delegue_id', $user_id, $data['delegue_ville']);

            // Gestion du stade
            $this->handleStade($data, 'stade_id', $user_id, $data['ville_id']);

            // Gestion des clubs
            $this->handleClub($data, 'club_id_1', $user_id, $data['stade_id'], $data['ville_id']);
            $this->handleClub($data, 'club_id_2', $user_id, null, null);

            $matche = Matche::find($id);
            $matche->update($data);
            return [
                "status" => true,
                "data" => $matche
            ];
        } catch (\Exception $e) {
            return [
                "status" => false,
                "message" => 'Erreur lors de la mise à jour du match: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $matche = Matche::find($id);
        $matche->delete();

        $penalty = Penalty::where('matche_id', $id);
        $penalty->delete();

        $avert = Avertissement::where('matche_id', $id);
        $avert->delete();

        $but = But::where('matche_id', $id);
        $but->delete();

        $changement = Changement::where('matche_id', $id);
        $changement->delete();
    }
}
