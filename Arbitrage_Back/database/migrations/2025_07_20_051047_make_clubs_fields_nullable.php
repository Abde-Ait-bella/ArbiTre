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
        Schema::table('clubs', function (Blueprint $table) {
            $table->string('abbr')->nullable()->change();
            $table->unsignedBigInteger('ville_id')->nullable()->change();
            $table->unsignedBigInteger('stade_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('clubs', function (Blueprint $table) {
            $table->string('nom')->nullable(false)->change();
            $table->unsignedBigInteger('ville_id')->nullable(false)->change();
            $table->unsignedBigInteger('stade_id')->nullable(false)->change();
        });
    }
};
