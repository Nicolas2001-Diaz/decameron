import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import PaginationLinks from "../components/PaginationLinks";
import HotelListItem from "../components/hoteles/HotelListItem";

function HomePage() {
    const { showToast } = useStateContext();
    const [hoteles, setHoteles] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(false);

    const onDeleteClick = (id) => {
        axiosClient.delete(`/hotel/${id}`).then(() => {
            getHoteles();

            showToast("success", "El hotel fue eliminado");
        });
    };

    const onPageClick = (link) => {
        getHoteles(link.url);
    };

    const getHoteles = (url) => {
        url = url || "/hotel";

        setLoading(true);

        axiosClient.get(url).then(({ data }) => {
            setHoteles(data.data);

            setMeta(data.meta);

            setLoading(false);
        });
    };

    useEffect(() => {
        getHoteles();
    }, []);

    return (
        <>
            {loading && <div className="text-center text-lg">Cargando...</div>}

            {!loading && (
                <div>
                    {hoteles.length === 0 && (
                        <div className="py-8 text-center">
                            No tiene hoteles creados
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                        {hoteles.map((hotel) => (
                            <HotelListItem
                                hotel={hotel}
                                key={hotel.id}
                                onDeleteClick={onDeleteClick}
                            />
                        ))}
                    </div>

                    {hoteles.length > 0 && (
                        <PaginationLinks
                            meta={meta}
                            onPageClick={onPageClick}
                        />
                    )}
                </div>
            )}
        </>
    );
}

export default HomePage;
