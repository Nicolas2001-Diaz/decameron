<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Habitacion extends Model
{
    use HasFactory;

    /**
     * Tabla a la que hace referencia el modelo
     */
    protected $table = "habitaciones";

    /**
     * Agregamos los campos de la tabla requedios para la insercioón de un registro
     */
    protected $fillable = ['hotel_id', 'acomodacion_tipo_habitacion_id'];

    /**
     * Obtener el hotel al que pertenece la habitación
     */
    public function hotel()
    {
        return $this->belongsTo('App\Models\Hotel');
    }

    function acomodacionTipoHabitacion()
    {
        return $this->belongsTo('App\Models\AcomodacionTipoHabitacion');
    }

    function getAcomodacionAttribute()
    {
        return $this->acomodacionTipoHabitacion->acomodacion;
    }

    function getTipoHabitacionAttribute()
    {
        return $this->acomodacionTipoHabitacion->tipoHabitacion;
    }
}
