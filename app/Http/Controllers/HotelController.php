<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Http\Requests\StoreHotelRequest;
use App\Http\Requests\UpdateHotelRequest;
use App\Http\Resources\AcomodacionResource;
use App\Http\Resources\HotelResource;
use App\Http\Resources\TipoHabitacionResource;
use App\Models\Habitacion;
use App\Models\TipoHabitacion;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class HotelController extends Controller
{
    /**
     * Mostrar una lista de los hoteles
     */
    public function index()
    {
        return HotelResource::collection(
            Hotel::withCount('habitaciones')
                ->orderBy('id', 'DESC')
                ->paginate(10)
        );
    }

    /**
     * Almacenar un hotel recién creado en el almacenamiento
     */
    public function store(StoreHotelRequest $request)
    {
        $data = $request->validated();

        $hotel = Hotel::create($data);

        // Crear nuevas habitaciones
        foreach ($data['habitaciones'] as $habitacion) {
            $habitacion['hotel_id'] = $hotel->id;

            $this->createHabitacion($habitacion);
        }

        return new HotelResource($hotel);
    }

    /**
     * Mostrar el hotel especificado
     */
    public function show(Hotel $hotel)
    {
        return new HotelResource($hotel);
    }

    /**
     * Actualizar el hotel especificado en el almacenamiento
     */
    public function update(UpdateHotelRequest $request, Hotel $hotel)
    {
        $data = $request->validated();

        $hotel->update($data);

        // Obtener los ids de las habitaciones asociadas al hotel
        $existingIds = $hotel->habitaciones()->pluck('id')->toArray();

        // Obtener los ids de las nuevas habitaciones a agregar
        $newIds = Arr::pluck($data['habitaciones'], 'id');

        // Buscar las habitaciones a eliminar
        $toDelete = array_diff($existingIds, $newIds);

        //Buscar las habitaciones para agregar
        $toAdd = array_diff($newIds, $existingIds);

        // Eliminar las habitaciones
        Habitacion::destroy($toDelete);

        // Crear nuevas habitaciones
        foreach ($data['habitaciones'] as $habitacion) {
            if (in_array($habitacion['id'], $toAdd)) {
                $habitacion['hotel_id'] = $hotel->id;

                $this->createHabitacion($habitacion);
            }
        }

        // Actualizar habitaciones existentes
        $habitacionMap = collect($data['habitaciones'])->keyBy('id');

        foreach ($hotel->habitaciones as $habitacion) {
            if (isset($habitacionMap[$habitacion->id])) {
                $this->updateHabitacion($habitacion, $habitacionMap[$habitacion->id]);
            }
        }

        return new HotelResource($hotel);
    }

    /**
     * Eliminar el hotel especificado del almacenamiento
     */
    public function destroy(Hotel $hotel)
    {
        $hotel->delete();

        return response()->json(null, 204);
    }


    /**
     * Crear las habitaciones
     */
    private function createHabitacion($data)
    {
        $existType = DB::table('acomodacion_tipo_habitaciones')
            ->where('acomodacion_id', $data['acomodacion'])
            ->where('tipo_habitacion_id', $data['tipo'])
            ->get();

        if (count($existType) == 1) {
            $data['acomodacion_tipo_habitacion_id'] = $existType[0]->id;
        } else {
            return response('Error', 400);
        }

        $exist = Habitacion::query()
            ->where('hotel_id', $data['hotel_id'])
            ->where('acomodacion_tipo_habitacion_id', $data['acomodacion_tipo_habitacion_id'])
            ->get();

        if (count($exist) == 1) {
            return response()->json(['error' => 'asdsdadasdasddasd'], 400);
        } else {
            $validator = Validator::make($data, [
                'hotel_id' => 'exists:App\Models\Hotel,id',
                'acomodacion_tipo_habitacion_id' => 'required'
            ]);

            return Habitacion::create($validator->validated());
        }
    }

    /**
     * Actualizar las habitaciones
     */

    private function updateHabitacion(Habitacion $habitacion, $data)
    {
        $exist = DB::table('acomodacion_tipo_habitaciones')
            ->where('acomodacion_id', $data['acomodacion'])
            ->where('tipo_habitacion_id', $data['tipo'])
            ->get();

        if (count($exist) == 1) {
            $data['acomodacion_tipo_habitacion_id'] = $exist[0]->id;
        } else {
            return response('Error', 400);
        }

        $validator = Validator::make($data, [
            'hotel_id' => 'exists:App\Models\Hotel,id',
            'acomodacion_tipo_habitacion_id' => 'required'
        ]);

        return $habitacion->update($validator->validated());
    }

    /**
     * Mostrar una lista de los tipos de habitaciones
     */
    function getTipoHabitaciones()
    {
        return TipoHabitacionResource::collection(
            TipoHabitacion::with('acomodaciones')->orderBy('id', 'ASC')->get()
        );
    }
}
