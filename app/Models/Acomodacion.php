<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Acomodacion extends Model
{
    use HasFactory;

    /**
     * Tabla a la que hace referencia el modelo
     */
    protected $table = "acomodaciones";

    /**
     * Agregamos los campos de la tabla requedios para la insercioón de un registro
     */
    protected $fillable = ['acomodacion'];


    /**
    * Los tipos de habitación que pertenecen a la acomodación
    */
    public function tipoHabitaciones()
    {
        return $this->belongsToMany('App\Models\TipoHabitacion', 'acomodacion_tipo_habitaciones', 'acomodacion_id', 'tipo_habitacion_id');
    }
}
