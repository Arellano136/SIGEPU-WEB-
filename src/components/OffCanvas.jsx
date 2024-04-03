import React, { useState, useEffect } from 'react';
import AddTypeCutModal from './AddTypeCutModal';
import EditCutModal from './EditCutModal';
import EditTypeCutModal from './EditTypeCutModal';
import TableComponent from './TableComponent2';
import AxiosClient from '../config/http-gateway/http-client';
import Swal from 'sweetalert2';

function OffCanvas({
    showOffcanvas,
    setShowOffcanvas,
    setSelectedCut,
    selectedCut,
    refreshInventary,
    updateSelectedCut
}) {
    const [showModalEditPreparation, setShowModalEditPreparation] = useState(false);
    const [showAddPreparationModal, setShowAddPreparationModal] = useState(false);
    const [showEditCutModal, setShowEditCutModal] = useState(false);
    const [cuts, setCuts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCutToEdit, setSelectedCutToEdit] = useState(null); // Nuevo estado

    const isCutSelected = selectedCut !== null;

    const handleModalToggle = () => {
        setShowOffcanvas(false);
    }

    const handleEditPreparationModalToggle = (cut) => {
        setSelectedCutToEdit(cut);
        setShowModalEditPreparation(true);
        setShowOffcanvas(false);
    }

    const handleAddPreparationModalToggle = () => {
        setShowAddPreparationModal(true);
    }

    const handleEditCutModalToggle = () => {
        setShowEditCutModal(true);
        setShowOffcanvas(false);
    }

    const handleDeletePreparation = (cut) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará la preparación. ¿Estás seguro de que quieres continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await AxiosClient({
                        url: `/cuts/${cut.id_cuts}`,
                        method: "DELETE",
                    });
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'Guardado correctamente',
                    });
                    Swal.fire(
                        'Eliminado',
                        'La preparación ha sido eliminada.',
                        'success'
                    );
                } catch (error) {
                    console.error('Error al eliminar la preparación:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un error al intentar eliminar la preparación.',
                    });
                }
            }
        });
    };





    const getCuts = async () => {
        try {
            setLoading(true);
            const response = await AxiosClient({ url: "/cuts/", method: "GET" });
            console.log(response);
            if (!response.error) setCuts(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCuts();
    }, []);

    const columns = [
        { label: 'Tipo de corte', accessor: 'cutName' },
        { label: 'Costo', accessor: 'cost' },
        {
            label: 'Acciones',
            render: (cut) => (
                <div>
                    <button
                        type="button"
                        onClick={() => handleEditPreparationModalToggle(cut)} // Pasar el corte como argumento
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-sm rounded-md text-lg p-1.5 px-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mr-1"
                    >
                        <i className="fas fa-pen"></i>
                    </button>
                    <button
                        onClick={() => handleDeletePreparation(cut)}
                        type="button"
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-sm rounded-md text-lg p-1.5 px-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 "
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            {showOffcanvas && <div className="fixed inset-0 z-40 bg-black bg-opacity-25" onClick={() => setShowOffcanvas(false)}></div>}
            <div
                id="drawer-right-example"
                className={`fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800 transition-transform duration-300 ${showOffcanvas ? 'translate-x-0' : 'translate-x-full'
                    }`}
                tabIndex="-1"
                aria-labelledby="drawer-right-label"
                role="dialog"
                aria-modal="true"
            >
                <div className="mb-4 ">
                    <div className="grid justify-end">
                        <button
                            type="button"
                            onClick={handleModalToggle}
                            aria-controls="drawer-right-example"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <i className="fas fa-times"></i>
                            <span className="sr-only">Cerrar menú</span>
                        </button>
                    </div>
                </div>
                {isCutSelected && (
                    <div className="flex flex-col items-center mb-2">
                        <img src={selectedCut.image} className="rounded-t-lg img-offcanvas mb-1" alt="" width="" />
                        <p className="font-bold text-4xl ">{selectedCut.meatName}</p>
                    </div>
                )}
                {isCutSelected && (
                    <div className="col-span-10 gap-24 flex items-center mb-3">
                        <div className="col-span-5 ">
                            <p className="font-light text-lg ">Kilo(s)</p>
                            <p className="font-semibold text-3xl ">{selectedCut.kg}</p>
                        </div>
                        <div className="col-span-5">
                            <p className="font-light text-lg ">Precio</p>
                            <p className="font-semibold text-3xl ">${selectedCut.cost}</p>
                        </div>
                    </div>
                )}
                {isCutSelected && (
                    <button
                        type="button"
                        onClick={handleEditCutModalToggle}
                        className="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mb-4"
                    >
                        Cambiar
                    </button>
                )}

                <div className="tablePreparaciones mb-6">
                    <div className="p-1 pl-2 rounded-md">
                        <p className="text-2xl text-black text-bold text-center">Tipo de corte</p>
                    </div>
                    <TableComponent columns={columns} data={cuts} progress={loading} />
                </div>

                <button
                    onClick={handleAddPreparationModalToggle}
                    className="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mb-4"
                >
                    Añadir
                </button>
            </div>
            <AddTypeCutModal showModal={showAddPreparationModal} handleCerrarModal={() => setShowAddPreparationModal(false)} />
            <EditCutModal
                showModalEdit={showEditCutModal}
                selectedCut={selectedCut}
                setShowEditCutModal={setShowEditCutModal}
                setShowOffcanvas={setShowOffcanvas}
                refreshInventary={refreshInventary}
                updateSelectedCut={updateSelectedCut}
            />
            <EditTypeCutModal
                showModal={showModalEditPreparation}
                selectedCut={selectedCutToEdit}
                handleCerrarModal={() => setShowModalEditPreparation(false)}
                setShowOffcanvas={setShowOffcanvas}
                refreshInventary={refreshInventary}
                updateSelectedCut={updateSelectedCut}
            />
        </>
    );
}

export default OffCanvas;
