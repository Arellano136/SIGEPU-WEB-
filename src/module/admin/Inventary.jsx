import React, { useState, useEffect } from 'react';
import InventaryCard from '../../components/InventaryCard';
import AddCutModal from '../../components/AddCutModal';
import OffCanvas from '../../components/OffCanvas';
import AxiosClient from '../../config/http-gateway/http-client';

function Inventary() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [selectedCut, setSelectedCut] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedCutId, setSelectedCutId] = useState(null);
    const [cuts, setCuts] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleEditModalToggle = (cut) => {
        setSelectedCut(cut);
        setShowModalEdit(!showModalEdit);
    }

    const handleAddModalToggle = () => {
        setShowModalAdd(!showModalAdd);
    }

    const handleCerrarModalAdd = () => {
        setShowModalAdd(false);
    };

    const handleImageUpload = (event) => {
        const file = event.currentTarget.files[0];
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleOffCanvasToggle = (cut) => {
        setSelectedCut(cut);
        setShowOffcanvas(!showOffcanvas);
    }

    const getInventary = async () => {
        try {
            setLoading(true);
            const response = await AxiosClient({ url: "/inventory/", method: "GET" });
            console.log(response);
            if (!response.error) setCuts(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    const refreshInventary = () => {
        getInventary();
    };
    const updateSelectedCut = (updatedCut) => {
        setSelectedCut(updatedCut);
    };
    useEffect(() => {
        getInventary();
    }, []);

    return (
        <div className="container mt-4">
            <div className='grid grid-flex justify-center mb-8'>
                <h2 className='text-4xl font-semibold'>Inventario</h2>
            </div>
            <div>
                <div className="grid justify-items-end">
                    <button type="button" onClick={handleAddModalToggle} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 mb-4">
                        Añadir Corte
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 card effect-shadow-div p-6'>
                {cuts.map((cut, index) => (
                    <InventaryCard
                        key={index}
                        selectedCut={cut}
                        setShowOffcanvas={setShowOffcanvas}
                        showOffcanvas={showOffcanvas}
                        handleEditModalToggle={handleEditModalToggle}
                    />
                ))}
            </div>
            <AddCutModal
                showModalAdd={showModalAdd}
                handleCerrarModalAdd={handleCerrarModalAdd}
                handleImageUpload={handleImageUpload}
                refreshInventary={refreshInventary}
            />
            {selectedCut && (
                <OffCanvas
                    showOffcanvas={showOffcanvas}
                    setShowOffcanvas={setShowOffcanvas}
                    selectedCut={selectedCut}
                    handleEditModalToggle={handleEditModalToggle}
                    refreshInventary={refreshInventary}
                    updateSelectedCut={updateSelectedCut}
                />
            )}
        </div>
    );
}

export default Inventary;