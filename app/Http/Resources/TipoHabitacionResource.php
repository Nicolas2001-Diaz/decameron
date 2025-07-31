<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TipoHabitacionResource extends JsonResource
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
            "tipo" => $this->tipo,
            'acomodaciones' => AcomodacionResource::collection($this->whenLoaded('acomodaciones')),
        ];
    }
}
