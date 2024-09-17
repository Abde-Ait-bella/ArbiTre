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
        Schema::table('matches', function (Blueprint $table) {
            $table->bigInteger('arbitre_4_id')->unsigned()->nullable();
            $table->foreign('arbitre_4_id')->references('id')->on('arbitres')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('matches', function (Blueprint $table) {
            $table->dropForeign(['arbitre_4_id']);
            $table->dropColumn('arbitre_4_id');
        });
    }
};
