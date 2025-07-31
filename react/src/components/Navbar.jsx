import { Link } from "react-router-dom";
import TypeButton from "./ui/TypeButton";

import { useStateContext } from "../contexts/ContextProvider";

export function Navbar() {
    const { addHotel, setAddHotel, editHotel, setEditHotel } =
        useStateContext();

    const returnHome = () => {
        setAddHotel(false);
        setEditHotel(false);
    };

    return (
        <nav className="flex justify-between items-center bg-zinc-700 my-3 py-5 px-10 rounded-lg">
            <h1 className="text-2xl font-bold tracking-tight">
                <Link to="/" onClick={() => returnHome()}>
                    HOTELES DECAMERON DE COLOMBIA
                </Link>
            </h1>

            {addHotel && (
                <div className="text-center text-lg">Agregando...</div>
            )}

            {!addHotel && !editHotel && (
                <ul className="flex gap-x-2">
                    <li>
                        <TypeButton
                            to="/add-hotel"
                            onClick={() => setAddHotel(true)}
                            color="green"
                        >
                            Agregar Hotel
                        </TypeButton>
                    </li>
                </ul>
            )}

            {editHotel && (
                <div className="text-center text-lg">Editando...</div>
            )}
        </nav>
    );
}
