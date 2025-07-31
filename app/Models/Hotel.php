<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;

    /**
     * Tabla a la que hace referencia el modelo
     */
    protected $table = "hoteles";

    /**
     * Agregamos los campos de la tabla requedios para la insercioón de un registro
     */
    protected $fillable = ['nombre', 'direccion', 'ciudad', 'nit', 'numero_habitaciones'];

    /** Obtener las habitaciones del hotel */
    public function habitaciones()
    {
        return $this->hasMany('App\Models\Habitacion');
    }
}
