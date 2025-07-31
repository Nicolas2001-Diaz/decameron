import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";

function HabitacionEditor({
    tiposHabitacion,
    habitaciones,
    index = 0,
    habitacion,
    addHabitacion,
    deleteHabitacion,
    habitacionChange,
}) {
    const { showToast } = useStateContext();

    const [model, setModel] = useState({ ...habitacion });

    useEffect(() => {
        habitacionChange(model);
    }, [model]);

    function onTipoHabitacionChange(ev) {
        const newModel = {
            ...model,
            tipo: ev.target.value,
            acomodacion: "",
        };

        if (esDuplicada(newModel)) return;

        setModel(newModel);
    }

    function onAcomodacionChange(ev) {
        const newModel = {
            ...model,
            acomodacion: ev.target.value,
        };

        if (esDuplicada(newModel)) return;

        setModel(newModel);
    }

    function esDuplicada(newHabitacion) {
        const duplicada = habitaciones.some(
            (h, i) =>
                i !== index &&
                h.tipo == newHabitacion.tipo &&
                h.acomodacion == newHabitacion.acomodacion
        );

        if (duplicada) {
            showToast(
                "warning",
                "Ya existe una habitación con este tipo y acomodación"
            );
        }

        return duplicada;
    }

    const tipoSeleccionado = tiposHabitacion.find((t) => t.id == model.tipo);

    const acomodaciones = tipoSeleccionado?.acomodaciones || [];
    return (
        <>
            <div>
                <div className="flex justify-between my-3">
                    <h4>{index + 1}.</h4>

                    <div className="flex items-center">
                        <button
                            type="button"
                            className="
                            flex
                            items-center
                            text-xs
                            py-1
                            px-3
                            mr-2
                            rounded-sm
                            text-white
                            bg-gray-600
                            hover:bg-gray-700"
                            onClick={() => addHabitacion(index + 1)}
                        >
                            <PlusIcon className="w-4" />
                            Agregar
                        </button>

                        <button
                            type="button"
                            className="
                            flex
                            items-center
                            text-xs
                            py-1
                            px-3
                            rounded-sm
                            border border-transparent
                            text-red-500
                            hover:border-red-600
                            font-semibold
                            "
                            onClick={() => deleteHabitacion(habitacion)}
                        >
                            <TrashIcon className="w-4" />
                            Eliminar
                        </button>
                    </div>
                </div>

                <div className="flex gap-1 justify-between items-center mb-3">
                    <div>
                        <label
                            htmlFor={`tipo-${index}`}
                            className="text-xs block my-1 text-slate-300"
                        >
                            Tipo de habitación
                        </label>

                        <select
                            id={`tipo-${index}`}
                            value={model.tipo}
                            onChange={onTipoHabitacionChange}
                            className="w-full bg-zinc-700 text-white px-4 py-2 mb-2 rounded-md"
                        >
                            <option value="">Seleccione</option>

                            {tiposHabitacion.map((tipo) => (
                                <option value={tipo.id} key={tipo.id}>
                                    {tipo.tipo}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor={`acomodacion-${index}`}
                            className="text-xs block my-1 text-slate-300"
                        >
                            Tipo de acomodación
                        </label>

                        <select
                            id={`acomodacion-${index}`}
                            value={model.acomodacion}
                            onChange={onAcomodacionChange}
                            className="w-full bg-zinc-700 text-white px-4 py-2 mb-2 rounded-md"
                        >
                            <option value="">Seleccione</option>

                            {acomodaciones.map((a) => (
                                <option value={a.id} key={a.id}>
                                    {a.acomodacion}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <hr />
        </>
    );
}

export default HabitacionEditor;
