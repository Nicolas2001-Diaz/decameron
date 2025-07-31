<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HotelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "nombre" => $this->nombre,
            "direccion" => $this->direccion,
            "ciudad" => $this->ciudad,
            "nit" => $this->nit,
            "numero_habitaciones" => $this->numero_habitaciones,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'habitaciones' => HabitacionResource::collection($this->habitaciones),
            'habitaciones_count' => $this->when(isset($this->habitaciones_count), $this->habitaciones_count),
        ];
    }
}
