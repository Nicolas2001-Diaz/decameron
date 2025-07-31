<?php

namespace Database\Seeders;

use App\Models\TipoHabitacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoHabitacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TipoHabitacion::create(['tipo' => 'Estándar']);
        TipoHabitacion::create(['tipo' => 'Junior']);
        TipoHabitacion::create(['tipo' => 'Suite']);
    }
}
