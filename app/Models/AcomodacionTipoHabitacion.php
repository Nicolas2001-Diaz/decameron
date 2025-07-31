<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class AcomodacionTipoHabitacion extends Pivot
{
    /**
     * Tabla a la que hace referencia el modelo
     */
    protected $table = "acomodacion_tipo_habitaciones";

    public function acomodacion()
    {
        return $this->belongsTo('App\Models\Acomodacion');
    }

    public function tipoHabitacion()
    {
        return $this->belongsTo('App\Models\TipoHabitacion');
    }
}