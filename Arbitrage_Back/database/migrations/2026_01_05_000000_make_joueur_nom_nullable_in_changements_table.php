<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('changements', function (Blueprint $table) {
            $table->string('joueur_nom_sort', 25)->nullable()->change();
            $table->string('joueur_nom_entr', 25)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('changements', function (Blueprint $table) {
            $table->string('joueur_nom_sort', 25)->nullable(false)->change();
            $table->string('joueur_nom_entr', 25)->nullable(false)->change();
        });
    }
};
