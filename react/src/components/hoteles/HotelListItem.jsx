import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import { Card } from "../ui/Card";
import TypeButton from "../ui/TypeButton";

import { useStateContext } from "../../contexts/ContextProvider";
import ConfirmModal from "../ConfirmModal";
import { useState } from "react";

function HotelListItem({ hotel, onDeleteClick }) {
    const { setEditHotel } = useStateContext();

    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        onDeleteClick(hotel.id);
        setShowModal(false);
    };

    return (
        <>
            <Card>
                <h1 className="text-2xl font-bold">{hotel.nombre}</h1>

                <p className="text-slate-300 pt-2">
                    {hotel.direccion}, {hotel.ciudad}
                </p>

                <p className="text-slate-300 py-2">NIT: {hotel.nit}</p>

                <p className="text-slate-300">
                    {hotel.numero_habitaciones} Habitaciones ({" "}
                    {hotel.habitaciones_count} asignadas )
                </p>

                <div className="flex justify-between items-center mt-3">
                    <TypeButton
                        to={`/hotel/${hotel.id}`}
                        onClick={() => setEditHotel(true)}
                    >
                        <PencilIcon className="w-5 h-5 mr-2" /> Editar
                    </TypeButton>

                    <div className="flex items-center">
                        <TypeButton
                            onClick={handleDeleteClick}
                            circle
                            link
                            color="red"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </TypeButton>
                    </div>
                </div>
            </Card>

            <ConfirmModal
                isOpen={showModal}
                title="¿Eliminar hotel?"
                message={`¿Está seguro de eliminar ${hotel.nombre}?`}
                onCancel={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}

export default HotelListItem;
