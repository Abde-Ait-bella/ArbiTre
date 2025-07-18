<?php

namespace Database\Seeders;

use App\Models\Arbitre;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArbitreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $arbitres = [
            // ['nom' => 'ELMANSOURI', 'prenom' => 'ABDELBASSIT', 'type' => 'centre', 'ville_id' => 9, 'user_id' => null],
            // ['nom' => 'LQTIB', 'prenom' => 'ABDELLAH', 'type' => 'assistant', 'ville_id' => 1, 'user_id' => null],
            // ['nom' => 'OUMOULAY', 'prenom' => 'MOHAMED', 'type' => 'assistant', 'ville_id' => 1, 'user_id' => null],
            // ['nom' => 'ROUANE', 'prenom' => 'ABDELOUHAB', 'type' => 'centre', 'ville_id' => 1, 'user_id' => null],
            // ['nom' => 'AIT-BELLA', 'prenom' => 'ABDESSAMAD', 'type' => 'assistant', 'ville_id' => 1, 'user_id' => null],
            // ['nom' => 'BACHAD', 'prenom' => 'ABDELAZIZ', 'type' => 'assistant', 'ville_id' => 9, 'user_id' => null],
            // ['nom' => 'BENAICHA', 'prenom' => 'ISMAIL', 'type' => 'centre', 'ville_id' => 9, 'user_id' => null],
            // ['nom' => 'EL JAAFARI', 'prenom' => 'YASSINE', 'type' => 'centre', 'ville_id' => 1, 'user_id' => null],
            // ['nom' => 'EL IDRISSI', 'prenom' => 'MOURAD', 'type' => 'centre', 'ville_id' => 1, 'user_id' => null],
            // ['nom' => 'ELYOUSFI', 'prenom' => 'ABDERRAHIM', 'type' => 'centre', 'ville_id' => 1, 'user_id' => null],
            // ['nom' => 'BRIBICH', 'prenom' => 'ABDERRAHMAN', 'type' => 'assistant', 'ville_id' => 1, 'user_id' => null],
            // ['nom' => 'AIT HASSOUN', 'prenom' => 'MOAD', 'type' => 'centre', 'ville_id' => 1, 'user_id' => null],
            // ['nom' => 'RAGHNI', 'prenom' => 'HODAIFA', 'type' => 'assistant', 'ville_id' => 1, 'user_id' => null],
            // ['nom' => 'LEMOUADEN', 'prenom' => 'LAHOUCINE', 'type' => 'assistant', 'ville_id' => 1, 'user_id' => null],
            // ['nom' => 'MAMI', 'prenom' => 'MOHAMMED', 'type' => 'centre', 'ville_id' => 1, 'user_id' => null],
            // ['nom' => 'MADIDI', 'prenom' => 'ACHRAF', 'type' => 'centre', 'ville_id' => 1, 'user_id' => null],
            // ['nom' => 'SAHNOUN', 'prenom' => 'AHLAM', 'type' => 'centre', 'ville_id' => 1, 'user_id' => null],
            // ['nom' => 'ZOUIZOU', 'prenom' => 'FATMA EZZAHRA', 'type' => 'assistant', 'ville_id' => 1, 'user_id' => null],
            // ['nom' => 'BOUGHROUM', 'prenom' => 'KELTOUMA', 'type' => 'assistant', 'ville_id' => 1, 'user_id' => null],
            // ['nom' => 'LAHRARMA', 'prenom' => 'MOHAMED', 'type' => 'centre', 'ville_id' => 4, 'user_id' => null],
            // ['nom' => 'EL FADILI', 'prenom' => 'AYOUB', 'type' => 'assistant', 'ville_id' => 4, 'user_id' => null],
            // ['nom' => 'ERRAJI', 'prenom' => 'ABDESSAMAD', 'type' => 'centre', 'ville_id' => 4, 'user_id' => null],
            // ['nom' => 'ZAGHARI', 'prenom' => 'ANAS', 'type' => 'assistant', 'ville_id' => 4, 'user_id' => null],
            // ['nom' => 'MERRI MED', 'prenom' => 'YACINE', 'type' => 'assistant', 'ville_id' => 4, 'user_id' => null],
            // ['nom' => 'BAYBEL', 'prenom' => 'KAMAL', 'type' => 'centre', 'ville_id' => 3, 'user_id' => null],
            // ['nom' => 'LOUIHN', 'prenom' => 'MOUSTAPHA', 'type' => 'assistant', 'ville_id' => 3, 'user_id' => null],
            // ['nom' => 'BAICH', 'prenom' => 'OMAR', 'type' => 'assistant', 'ville_id' => 3, 'user_id' => null],
            // ['nom' => 'AZKRI', 'prenom' => 'BRAHIM', 'type' => 'centre', 'ville_id' => 3, 'user_id' => null],
            // ['nom' => 'ARKHAOUI', 'prenom' => 'OMAR', 'type' => 'centre', 'ville_id' => 3, 'user_id' => null],
            // ['nom' => 'El AISSAOUI', 'prenom' => 'ISMAIL', 'type' => 'centre', 'ville_id' => 3, 'user_id' => null],
            // ['nom' => 'ACHADMI', 'prenom' => 'RACHID', 'type' => 'assistant', 'ville_id' => 3, 'user_id' => null],
            // ['nom' => 'HAMDAN', 'prenom' => 'HASSAN', 'type' => 'assistant', 'ville_id' => 3, 'user_id' => null],
            // ['nom' => 'FARGOUS', 'prenom' => 'HAFID', 'type' => 'centre', 'ville_id' => 3, 'user_id' => null],
            // ['nom' => 'ADOUNIS', 'prenom' => 'ANAS', 'type' => 'assistant', 'ville_id' => 3, 'user_id' => null],
            // ['nom' => 'LANSARI', 'prenom' => 'AYOUB', 'type' => 'centre', 'ville_id' => 3, 'user_id' => null],
            // ['nom' => 'ISAGOURRAM', 'prenom' => 'HICHAM', 'type' => 'assistant', 'ville_id' => 3, 'user_id' => null],
            // ['nom' => 'LANSARI', 'prenom' => 'MAROUAN', 'type' => 'centre', 'ville_id' => 3, 'user_id' => null],
            // ['nom' => 'BATTAS', 'prenom' => 'OUMOULOD', 'type' => 'assistant', 'ville_id' => 3, 'user_id' => null],
            // ['nom' => 'REDOUAN', 'prenom' => 'TAHIRI', 'type' => 'assistant', 'ville_id' => 3, 'user_id' => null],
            // ['nom' => 'SAID', 'prenom' => 'AGENGOU', 'type' => 'assistant', 'ville_id' => 3, 'user_id' => null],
            // Nouveaux arbitres ajoutés
            ['nom' => 'LASSIL', 'prenom' => 'OMAR', 'type' => 'assistant', 'ville_id' => 4, 'user_id' => null],
            ['nom' => 'BEN WAHMAN', 'prenom' => 'MAROUANE', 'type' => 'centre', 'ville_id' => 4, 'user_id' => null],
            ['nom' => 'ZAGHARI', 'prenom' => 'ANAS', 'type' => 'assistant', 'ville_id' => 4, 'user_id' => null],
            ['nom' => 'MERRI', 'prenom' => 'MOHAMED YACINE', 'type' => 'assistant', 'ville_id' => 4, 'user_id' => null],
            ['nom' => 'KZIT', 'prenom' => 'YOUSSEF', 'type' => 'assistant', 'ville_id' => 4, 'user_id' => null],
            ['nom' => 'EL JAKRINE', 'prenom' => 'ABDERAZAK', 'type' => 'assistant', 'ville_id' => 4, 'user_id' => null],
            ['nom' => 'ERRAJI', 'prenom' => 'ABDSAMAD', 'type' => 'centre', 'ville_id' => 4, 'user_id' => null],
            ['nom' => 'FERIATI', 'prenom' => 'MOHAMED', 'type' => 'assistant', 'ville_id' => 4, 'user_id' => null],
            ['nom' => 'IBNELAZRAQ', 'prenom' => 'ABDSAMAD', 'type' => 'centre', 'ville_id' => 4, 'user_id' => null],
            
            // Arbitres ville = agadir
            ['nom' => 'KOUTI', 'prenom' => 'OTHMANE', 'type' => 'centre', 'ville_id' => 2, 'user_id' => null],
            ['nom' => 'EL YAAKOUBI', 'prenom' => 'MED REDA', 'type' => 'assistant', 'ville_id' => 2, 'user_id' => null],
            ['nom' => 'AMSAGGUINE', 'prenom' => 'OMAR', 'type' => 'assistant', 'ville_id' => 2, 'user_id' => null],
            
            ['nom' => 'ATIGUI', 'prenom' => 'ABDESSAMIAA', 'type' => 'centre', 'ville_id' => 2, 'user_id' => null],
            ['nom' => 'MAAIZ', 'prenom' => 'MOUHE DDINE', 'type' => 'assistant', 'ville_id' => 2, 'user_id' => null],
            ['nom' => 'DAFNOUJ', 'prenom' => 'AYOUB', 'type' => 'assistant', 'ville_id' => 2, 'user_id' => null],
            
            ['nom' => 'MOUSTATIA', 'prenom' => 'ALI', 'type' => 'centre', 'ville_id' => 2, 'user_id' => null],
            ['nom' => 'BEN AISSA', 'prenom' => 'YOUSSEF', 'type' => 'assistant', 'ville_id' => 2, 'user_id' => null],
            ['nom' => 'IDNAROUR', 'prenom' => 'SALAH EDDINE', 'type' => 'assistant', 'ville_id' => 2, 'user_id' => null],
            
            ['nom' => 'QARMACH', 'prenom' => 'IMAD', 'type' => 'centre', 'ville_id' => 2, 'user_id' => null],
            ['nom' => 'ATOUGA', 'prenom' => 'ABDERRAHMAN', 'type' => 'assistant', 'ville_id' => 2, 'user_id' => null],
            ['nom' => 'EL FASSI', 'prenom' => 'HASSAN', 'type' => 'assistant', 'ville_id' => 2, 'user_id' => null],
            
            ['nom' => 'ASSFOURY', 'prenom' => 'NESRINE', 'type' => 'centre', 'ville_id' => 2, 'user_id' => null],
            ['nom' => 'ZEROUAL', 'prenom' => 'MAREIM', 'type' => 'assistant', 'ville_id' => 2, 'user_id' => null],
            ['nom' => 'LOUZALI', 'prenom' => 'FATIMA', 'type' => 'assistant', 'ville_id' => 2, 'user_id' => null],
            
            ['nom' => 'SAROUALA', 'prenom' => 'YASSER', 'type' => 'centre', 'ville_id' => 2, 'user_id' => null],
            ['nom' => 'LACHGAR', 'prenom' => 'FATIMA EZZAHRA', 'type' => 'assistant', 'ville_id' => 2, 'user_id' => null],
            ['nom' => 'ELMIR', 'prenom' => 'KHAOULA', 'type' => 'assistant', 'ville_id' => 2, 'user_id' => null],
        ];

        foreach ($arbitres as $arbitre) {
            Arbitre::create($arbitre);
        }
    }
}
