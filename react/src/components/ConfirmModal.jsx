import TypeButton from "./ui/TypeButton";

export default function ConfirmModal({
    isOpen,
    title,
    message,
    onCancel,
    onConfirm,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-zinc-800 rounded-lg shadow-lg p-6 w-full max-w-sm animate-fade-in-down">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="mt-2 text-white">{message}</p>

                <div className="mt-4 flex justify-end gap-2">
                    <TypeButton onClick={onCancel}>Cancelar</TypeButton>

                    <TypeButton onClick={onConfirm} color="red">Confirmar</TypeButton>
                </div>
            </div>
        </div>
    );
}
