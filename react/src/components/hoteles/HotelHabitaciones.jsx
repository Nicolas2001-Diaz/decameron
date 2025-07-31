import { PlusIcon } from "@heroicons/react/24/outline";
import HabitacionEditor from "./HabitacionEditor";
import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios";

function HotelHabitaciones({
    habitaciones,
    maxHabitaciones,
    onHabitacionesUpdate,
}) {
    const { showToast } = useStateContext();

    const [tiposHabitacion, setTiposHabitacion] = useState([]);

    const [misHabitaciones, setMisHabitaciones] = useState([...habitaciones]);

    const [posicion, setPosicion] = useState(0);

    function getTipoHabitaciones() {
        axiosClient.get("/tipo-habitaciones").then(({ data }) => {
            setTiposHabitacion(data.data);
        });
    }

    const addHabitacion = (index) => {
        if (maxHabitaciones == 0) {
            showToast(
                "error",
                "No puede agregar habitaciones antes de ingresar la cantidad permitida"
            );

            return;
        }

        if (habitaciones.length >= maxHabitaciones) {
            showToast(
                "error",
                `No puede agregar más habitaciones, el máximo permitido es ${maxHabitaciones}`
            );

            return;
        }

        setPosicion(posicion + 1);

        index = index !== undefined ? index : misHabitaciones.length;

        misHabitaciones.splice(index, 0, {
            id: posicion,
            cantidad: "",
            tipo: "",
            acomodacion: "",
        });

        setMisHabitaciones([...misHabitaciones]);
        onHabitacionesUpdate(misHabitaciones);
    };

    const habitacionChange = (habitacion) => {
        if (!habitacion) return;

        const newHabitaciones = misHabitaciones.map((h) => {
            if (h.id === habitacion.id) {
                return { ...habitacion };
            }

            return h;
        });

        setMisHabitaciones(newHabitaciones);
        onHabitacionesUpdate(newHabitaciones);
    };

    const deleteHabitacion = (habitacion) => {
        const newHabitaciones = misHabitaciones.filter(
            (h) => h.id !== habitacion.id
        );

        setMisHabitaciones(newHabitaciones);
        onHabitacionesUpdate(newHabitaciones);
    };

    useEffect(() => {
        setMisHabitaciones(habitaciones);
    }, [habitaciones]);

    useEffect(() => {
        getTipoHabitaciones();
    }, []);

    return (
        <div className="md:col-span-8 bg-zinc-800 p-10 rounded-md mb-5">
            <div className="flex justify-between">
                <h3 className="text-2xl font-bold">Habitaciones</h3>
                
                <button
                    type="button"
                    className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                    onClick={() => addHabitacion()}
                >
                    <PlusIcon className="w-4 mr-2" />
                    Agregar Habitación
                </button>
            </div>

            {misHabitaciones.length ? (
                misHabitaciones.map((h, ind) => (
                    <HabitacionEditor
                        tiposHabitacion={tiposHabitacion}
                        habitaciones={habitaciones}
                        key={h.id}
                        index={ind}
                        habitacion={h}
                        habitacionChange={habitacionChange}
                        addHabitacion={addHabitacion}
                        deleteHabitacion={deleteHabitacion}
                    />
                ))
            ) : (
                <div className="text-gray-400 text-center py-4">
                    Este hotel no tiene habitaciones creadas
                </div>
            )}
        </div>
    );
}

export default HotelHabitaciones;
