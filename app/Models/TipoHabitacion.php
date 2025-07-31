<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoHabitacion extends Model
{
    use HasFactory;

    protected $table="tipo_habitaciones";

    protected $fillable = ['tipo'];

    /**
    * Las acomodaciones que pertenecen al tipo de habitación
    */
    public function acomodaciones()
    {
        return $this->belongsToMany('App\Models\Acomodacion', 'acomodacion_tipo_habitaciones', 'tipo_habitacion_id', 'acomodacion_id');
    }
}
