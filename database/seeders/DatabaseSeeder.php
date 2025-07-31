<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        /**
         * Llamadao a los seeders para la base de datos
         */
        $this->call([
            TipoHabitacionSeeder::class,
            AcomodacionSeeder::class,
        ]);

        /**
         * Registros de las acomodaciones para una habitación Estándar
         */

        // Habitación Estándar con acomodación Sencilla
        DB::table('acomodacion_tipo_habitaciones')->insert([
            'acomodacion_id' => 1,
            'tipo_habitacion_id' => 1
        ]);

        // Habitación Estándar con acomodación Doble
        DB::table('acomodacion_tipo_habitaciones')->insert([
            'acomodacion_id' => 2,
            'tipo_habitacion_id' => 1
        ]);


        /**
         * Registros de las acomodaciones para una habitación Junior
         */

        // Habitación Junior con acomodación Triple
        DB::table('acomodacion_tipo_habitaciones')->insert([
            'acomodacion_id' => 3,
            'tipo_habitacion_id' => 2
        ]);

        // Habitación Junior con acomodación Cuádruple
        DB::table('acomodacion_tipo_habitaciones')->insert([
            'acomodacion_id' => 4,
            'tipo_habitacion_id' => 2
        ]);


        /**
         * Registros de las acomodaciones para una habitación Suite
         */

        // Habitación Suite con acomodación Sencilla
        DB::table('acomodacion_tipo_habitaciones')->insert([
            'acomodacion_id' => 1,
            'tipo_habitacion_id' => 3
        ]);

        // Habitación Suite con acomodación Doble
        DB::table('acomodacion_tipo_habitaciones')->insert([
            'acomodacion_id' => 2,
            'tipo_habitacion_id' => 3
        ]);

        // Habitación Suite con acomodación Triple
        DB::table('acomodacion_tipo_habitaciones')->insert([
            'acomodacion_id' => 3,
            'tipo_habitacion_id' => 3
        ]);
    }
}
