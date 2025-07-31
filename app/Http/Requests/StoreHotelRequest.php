<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreHotelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:255|unique:hoteles,nombre',
            'direccion' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'nit' => 'required|string|max:50|unique:hoteles,nit',
            'numero_habitaciones' => 'required|integer',
            'habitaciones' => 'array'
        ];
    }
}
