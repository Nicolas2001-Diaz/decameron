import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios";
import HotelHabitaciones from "../components/hoteles/HotelHabitaciones";
import { useStateContext } from "../contexts/ContextProvider";
import TypeButton from "../components/ui/TypeButton";

function HotelFormPage() {
    const { showToast, setEditHotel, setAddHotel } = useStateContext();

    const navigate = useNavigate();

    const { id } = useParams();

    const [hotel, setHotel] = useState({
        nombre: "",
        direccion: "",
        ciudad: "",
        nit: "",
        numero_habitaciones: "",
        habitaciones: [],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = { ...hotel };

        let res = null;

        if (id) {
            res = axiosClient.put(`/hotel/${id}`, payload);
        } else {
            res = axiosClient.post("/hotel", payload);
        }

        res.then(() => {
            setAddHotel(false);
            setEditHotel(false);

            navigate("/");

            if (id) {
                showToast("success", "El hotel ha sido actualizado");
            } else {
                showToast("success", "El hotel ha sido creado");
            }
        }).catch((err) => {
            if (err && err.response) {
                setError(err.response.data.message);
            }
        });
    };

    function onHabitacionesUpdate(habitaciones) {
        setHotel({ ...hotel, habitaciones });
    }

    useEffect(() => {
        if (id) {
            setLoading(true);

            setEditHotel(true);

            axiosClient.get(`hotel/${id}`).then(({ data }) => {
                setHotel(data.data);

                setLoading(false);
            });
        } else {
            setAddHotel(true);
        }
    }, [id]);

    return (
        <>
            {loading && <div className="text-center text-lg">Cargando...</div>}

            {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4 bg-zinc-800 p-10 mb-5 rounded-md">
                        {error && (
                            <div className="bg-red-500 text-white py-3 px-3">
                                {error}
                            </div>
                        )}

                        {/* Input para el nombre del hotel */}
                        <label
                            htmlFor="nombre"
                            className="text-xs block my-1 text-slate-300"
                        >
                            Nombre del hotel
                        </label>

                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Nombre del hotel"
                            autoFocus
                            value={hotel.nombre}
                            onChange={(ev) =>
                                setHotel({
                                    ...hotel,
                                    nombre: ev.target.value,
                                })
                            }
                            className="w-full bg-zinc-700 text-white px-4 py-2 mb-2 rounded-md"
                        />

                        {/* Input para la dirección del hotel */}
                        <label
                            htmlFor="direccion"
                            className="text-xs block my-1 text-slate-300"
                        >
                            Dirección del hotel
                        </label>

                        <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            placeholder="Dirección del hotel"
                            value={hotel.direccion}
                            onChange={(ev) =>
                                setHotel({
                                    ...hotel,
                                    direccion: ev.target.value,
                                })
                            }
                            className="w-full bg-zinc-700 text-white px-4 py-2 mb-2 rounded-md"
                        />

                        {/* Input para la ciudad donde esta ubicado el hotel */}
                        <label
                            htmlFor="ciudad"
                            className="text-xs block my-1 text-slate-300"
                        >
                            Ciudad donde se ubica el hotel
                        </label>

                        <input
                            type="text"
                            id="ciudad"
                            name="ciudad"
                            placeholder="Ciudad donde se ubica el hotel"
                            value={hotel.ciudad}
                            onChange={(ev) =>
                                setHotel({
                                    ...hotel,
                                    ciudad: ev.target.value,
                                })
                            }
                            className="w-full bg-zinc-700 text-white px-4 py-2 mb-2 rounded-md"
                        />

                        {/* Input para el NIT del hotel */}
                        <label
                            htmlFor="nit"
                            className="text-xs block my-1 text-slate-300"
                        >
                            NIT del hotel
                        </label>

                        <input
                            type="text"
                            id="nit"
                            name="nit"
                            placeholder="NIT del hotel"
                            value={hotel.nit}
                            onChange={(ev) =>
                                setHotel({
                                    ...hotel,
                                    nit: ev.target.value,
                                })
                            }
                            className="w-full bg-zinc-700 text-white px-4 py-2 mb-2 rounded-md"
                        />

                        {/* Input para la cantidad de habitaciones del hotel */}
                        <label
                            htmlFor="numero_habitaciones"
                            className="text-xs block my-1 text-slate-300"
                        >
                            Cantidad de habitaciones del hotel
                        </label>

                        <input
                            type="number"
                            id="numero_habitaciones"
                            name="numero_habitaciones"
                            placeholder="99"
                            value={hotel.numero_habitaciones}
                            onChange={(ev) =>
                                setHotel({
                                    ...hotel,
                                    numero_habitaciones: ev.target.value,
                                })
                            }
                            className="w-full bg-zinc-700 text-white px-4 py-2 mb-2 rounded-md"
                        />

                        <TypeButton onClick={onSubmit}>Guardar</TypeButton>
                    </div>

                    <HotelHabitaciones
                        habitaciones={hotel.habitaciones}
                        onHabitacionesUpdate={onHabitacionesUpdate}
                        maxHabitaciones={hotel.numero_habitaciones}
                    />
                </div>
            )}
        </>
    );
}

export default HotelFormPage;
