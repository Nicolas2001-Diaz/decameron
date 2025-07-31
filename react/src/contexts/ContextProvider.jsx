import { createContext, useContext, useState } from "react";

const stateContext = createContext({
    tiposHabitacion: [],
    acomodaciones: [],
    addHotel: false,
    editHotel: false,
    toast: {
        type: null,
        message: null,
        show: false,
    },
});

export const ContextProvider = ({ children }) => {
    const [tiposHabitacion] = useState([]);

    const [acomodaciones] = useState([]);

    const [toast, setToast] = useState({ type: "", message: "", show: false });

    const [addHotel, setAddHotel] = useState(false);
    const [editHotel, setEditHotel] = useState(false);

    const showToast = (type, message) => {
        setToast({ type, message, show: true });

        setTimeout(() => {
            setToast({ type: "", message: "", show: false });
        }, 5000);
    };

    return (
        <stateContext.Provider
            value={{
                toast,
                addHotel,
                editHotel,
                tiposHabitacion,
                acomodaciones,
                showToast,
                setAddHotel,
                setEditHotel,
            }}
        >
            {children}
        </stateContext.Provider>
    );
};

export const useStateContext = () => useContext(stateContext);
