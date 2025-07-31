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
        Schema::create('acomodacion_tipo_habitaciones', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('acomodacion_id')->constrained('acomodaciones');
            $table->foreignId('tipo_habitacion_id')->constrained('tipo_habitaciones');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acomodacion_tipo_habitaciones');
    }
};
