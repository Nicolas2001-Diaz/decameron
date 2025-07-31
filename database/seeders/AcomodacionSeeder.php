<?php

namespace Database\Seeders;

use App\Models\Acomodacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AcomodacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Acomodacion::create(['acomodacion' => 'Sencilla']);
        Acomodacion::create(['acomodacion' => 'Doble']);
        Acomodacion::create(['acomodacion' => 'Triple']);
        Acomodacion::create(['acomodacion' => 'Cuádruple']);
    }
}
