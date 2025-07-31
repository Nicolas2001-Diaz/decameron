import { useStateContext } from "../contexts/ContextProvider";

function Toast() {
    const { toast } = useStateContext();

    const toastColors = {
        success: "bg-emerald-500",
        error: "bg-red-500",
        warning: "bg-yellow-500 text-black",
        info: "bg-blue-500",
    };

    const toastColor = toastColors[toast.type] || "bg-gray-700";

    return (
        <>
            {toast.show && (
                <div
                    className={`w-[300px] py-2 px-3 text-white rounde fixed right-4 bottom-4 z-50 animate-fade-in-down ${toastColor}`}
                >
                    {toast.message}
                </div>
            )}
        </>
    );
}

export default Toast;
