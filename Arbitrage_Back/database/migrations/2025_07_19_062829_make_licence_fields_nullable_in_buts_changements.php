<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeLicenceFieldsNullableInButsChangements extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Modifier la table buts
        Schema::table('buts', function (Blueprint $table) {
            $table->string('joueur_numero_licence')->nullable()->change();
        });

        // Modifier la table changements
        Schema::table('changements', function (Blueprint $table) {
            $table->string('joueur_licence_sort')->nullable()->change();
            $table->string('joueur_licence_entr')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Remettre les contraintes NOT NULL
        Schema::table('buts', function (Blueprint $table) {
            $table->string('joueur_numero_licence')->nullable(false)->change();
        });

        Schema::table('changements', function (Blueprint $table) {
            $table->string('joueur_licence_sort')->nullable(false)->change();
            $table->string('joueur_licence_entr')->nullable(false)->change();
        });
    }
}