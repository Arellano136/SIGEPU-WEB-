import React from 'react';

function InventaryCard({ selectedCut, setShowOffcanvas, showOffcanvas, handleEditModalToggle }) {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-1 effect-shadow-input">
            <img src={selectedCut.image} className="rounded-t-lg card-img" alt="" width=""/>
            <div className="card-body p-2">
                <div className="grid grid-cols-10 gap-2 items-start">
                    <div className="col-span-5">
                        <p className="card-text  lg:text-base font-bold	text-3xl">{selectedCut.meatName}</p>
                    </div>
                    <div className="col-span-4">
                        <p className="card-text text-xl font-bold lg:text-base">$ {selectedCut.cost}</p>
                    </div>
                    <div className="col-span-1 flex justify-start">
                        <button
                            className="text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full"
                            type="button"
                            onClick={() => {
                                setShowOffcanvas(true); // Muestra el offcanvas al hacer clic
                                handleEditModalToggle(selectedCut); // Pasar el objeto seleccionado a handleEditModalToggle
                            }}
                            aria-controls="drawer-right-example"
                            aria-expanded={showOffcanvas}
                        >
                            <i className="fas fa-ellipsis-v text-xl"></i>
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-8 gap-4">
                    <div className="col-span-6">
                        <p className="card-text font-bold lg:text-ms">Cantidad: {selectedCut.kg}</p>
                    </div>
                    <div className="col-span-2 flex justify-end">
                        <p className="card-text lg:text-ms">Kilo(s)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InventaryCard;
