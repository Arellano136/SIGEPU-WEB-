import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import TableComponent from '../../components/TableComponent2';
const ordersData = [
  {
    id: "1",
    repartidor: "Juan Lopez",
    fechaSolicitud: "23/03/2024",
    fechaEntrega: "25/03/2024",
    estado: "Pendiente",
    clienteNombre: "Anna Garcia",
    clienteTelefono: "555-123-4567",
    clienteDireccion: "Avenida Independencia, Ciudad, País",
    total: "1340",
    productos: [
      {
        corte: "Filete",
        kilos: 13,
        preparacion:
          "Corte estilo filete.",
        total: 130,
      },
      {
        corte: "Costillas",
        kilos: 13,
        preparacion:
          "Perfecto para asar lentamente o cocinar a fuego lento.",
        total: 130,
      },
    ],
  },
  {
    id: "1",
    repartidor: "Juan Lopez",
    fechaSolicitud: "23/03/2024",
    fechaEntrega: "25/03/2024",
    estado: "Pendiente",
    clienteNombre: "Anna Garcia",
    clienteTelefono: "555-123-4567",
    clienteDireccion: "Avenida Independencia, Ciudad, País",
    total: "1200  ",
    productos: [
      {
        corte: "Filete",
        kilos: 13,
        preparacion:
          "Tierno y jugoso, ideal para asar a la parrilla o cocinar a la sartén.",
        total: 130,
      },
      {
        corte: "Costillas",
        kilos: 13,
        preparacion:
          "Sabroso y con un buen marmoleado, perfecto para asar lentamente o cocinar a fuego lento.",
        total: 130,
      },
      {
        corte: "Costillas",
        kilos: 13,
        preparacion:
          "Sabroso y con un buen marmoleado, perfecto para asar lentamente o cocinar a fuego lento.",
        total: 130,
      },
    ],
  },
];

function Orders() {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openDetailsModal = (order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };
  const handleOpenModal = () => {
    setIsDetailsModalOpen(!isDetailsModalOpen);

  };


  const columns = [
    { label: 'Repartidor', accessor: 'repartidor' },
    { label: 'Fecha de Solicitud', accessor: 'fechaSolicitud' },
    { label: 'Fecha de Entrega', accessor: 'fechaEntrega' },
    { label: 'Estatus', accessor: 'estado' },
    {
      label: 'Detalles',
      render: (item) => (
        <button
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red dark:focus:ring-red-900"
          onClick={() => openDetailsModal(item)}
        >
          <FiPlus />
        </button>
      ),
    },
  ];
  const columnsDetails = [
    { label: 'Corte', accessor: 'corte' },
    { label: 'Kilos', accessor: 'kilos' },
    { label: 'Tipo de corte', accessor: 'preparacion' },
    { label: 'Total', accessor: 'total' },
  ];
  return (
    <>
      <p className='text-4xl font-extrabold text-left mb-6 mt-10'>Pedidos</p>
      <TableComponent
        handler={() => { }}
        columns={columns}
        data={ordersData}
        PerPage={15}
      />
      {isDetailsModalOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-25">
          {selectedOrder && (
            <div id="authentication-modal" className={`absolute top-0 right-0 left-0 z-50 flex justify-start items-center h-screen`}>
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="grid justify-end mx-6 mt-6">

                  <button
                    onClick={handleOpenModal}
                    type="button"
                    className=" text-sm font-medium text-end text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>            </div>
                <div className="w-full px-10 pb-8">
                  <p className='text-2xl font-extrabold text-center mb-6'>Información de pedido</p>
                  <div className="grid grid-cols-12 gap-2 mb-10">
                    <div className="col-span-5">
                      <p className="text-xl font-bold">Pedido</p>
                      <>
                        <div className="grid grid-cols-5">
                          <div className="col-span-2">
                            <p className=" text-sm font-semibold">Fecha de Solicitud:</p>
                          </div>
                          <div className="col-span-3">
                            <p className=" text-sm font-medium">{selectedOrder.fechaSolicitud}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-5">
                          <div className="col-span-2">
                            <p className=" text-sm font-semibold">Fecha de entrega:</p>
                          </div>
                          <div className="col-span-3">
                            <p className=" text-sm font-medium">{selectedOrder.fechaEntrega}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-5">
                          <div className="col-span-2">
                            <p className=" text-sm font-semibold">Estado:</p>
                          </div>
                          <div className="col-span-3">
                            <p className=" text-sm font-medium"> {selectedOrder.estado}</p>
                          </div>
                        </div>
                      </>
                    </div>

                    <div className="col-span-5">
                      <p className="text-xl font-bold">Cliente</p>
                      <>
                        <div className="grid grid-cols-5">
                          <div className="col-span-1">
                            <p className=" text-sm font-semibold">Nombre:</p>
                          </div>
                          <div className="col-span-4">
                            <p className=" text-sm font-medium">
                              {selectedOrder.clienteNombre}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-5">
                          <div className="col-span-1">
                            <p className=" text-sm font-semibold">Teléfono: </p>
                          </div>
                          <div className="col-span-4">
                            <p className=" text-sm font-medium">{selectedOrder.clienteTelefono}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-5">
                          <div className="col-span-1">
                            <p className=" text-sm font-semibold">Dirección: </p>
                          </div>
                          <div className="col-span-4">
                            <p className=" text-sm font-semibold">{selectedOrder.clienteDireccion}</p>
                          </div>
                        </div>
                      </>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xl font-bold">Monto a Pagar</p>
                      <p className="text-5xl font-semibold text-center">${selectedOrder.total}</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <TableComponent
                      handler={() => { }}
                      columns={columnsDetails}
                      data={selectedOrder.productos}
                     />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Orders