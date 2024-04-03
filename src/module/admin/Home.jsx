import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import TableComponent from "../../components/TableComponent";

const schema = yup.object().shape({
    repartidor: yup.string().required("Selecciona un repartidor"),
});

function Home() {
    const [selectedData, setSelectedData] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [showInstructions, setShowInstructions] = useState(true);

    const asignarRepartidor = (pedidoId, repartidorNombre) => {
        const pedidoActualizado = pedidos.map((pedido) => {
            if (pedido.id === pedidoId) {
                return {
                    ...pedido,
                    repartidor: repartidorNombre,
                };
            }
            return pedido;
        });

        setPedidos(pedidoActualizado);
    };

    const formik = useFormik({
        initialValues: {
            repartidor: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            Swal.fire({
                title: "¿Asignar repartidor?",
                text: `¿Deseas asignar el repartidor ${values.repartidor} al pedido?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, asignar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    asignarRepartidor(selectedData.pedido.id, values.repartidor);
                    setSelectedData(null);
                    setShowInstructions(true);

                    formik.resetForm();
                    Swal.fire(
                        "¡Repartidor asignado!",
                        "El repartidor ha sido asignado al pedido.",
                        "success"
                    );
                }
            });
        },
    });

    const handleAsignar = (pedido, cliente) => {
        setSelectedData({ pedido, cliente });
        setShowInstructions(false);
    };

    const handleCancelar = () => {
        if (formik.values.repartidor) {
            Swal.fire({
                title: "¿Cancelar asignación?",
                text: "¿Estás seguro de cancelar la asignación del repartidor?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, cancelar",
                cancelButtonText: "No, mantener",
            }).then((result) => {
                if (result.isConfirmed) {
                    setSelectedData(null);
                    formik.resetForm();
                    setShowInstructions(true);
                }
            });
        } else {
            setSelectedData(null);
            formik.resetForm();
            setShowInstructions(true);
        }
    };

    const repartidores = [
        {
            id: 1,
            nombre: "Juan Pérez",
            vehiculo: "Moto",
        },
    ];

    const columns = [
        { label: "#", accessor: "id" },
        { label: "Nombre", accessor: "nombre" },
        { label: "Apellido", accessor: "apellido" },
        { label: "Estado", accessor: "estatus" },
        {
            label: "Repartidor",
            render: (item) => (
                <button
                    type="submit"
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={() =>
                        handleAsignar(item.pedido, {
                            nombre: item.nombre,
                            apellido: item.apellido,
                            estatus: item.estatus,
                            telefono: item.telefono,
                            direccion: item.direccion,
                        })
                    }
                >
                    Asignar
                </button>
            ),
        },
    ];

    const data = [
        {
            id: 1,
            nombre: "Anna",
            apellido: "Garcia",
            estatus: "Pendiente",
            telefono: "777-455-55-55",
            direccion: "Avenida Independencia, Ciudad, País",
            pedido: {
                num_pedido: "13GOA12",
                fecha_de_solicitud: "13-mar-2024",
                fecha_de_entrega: "15-mar-2024",
                monto: 1233,
            },
        },
    ];

    return (
        <>
            <p className="text-3xl font-extrabold text-center mb-6">Solicitud de Pedido</p>
            <div className="cardPedido w-full effect-shadow-div pb-3 pt-4 px-6 mt-3 mb-6">
                {showInstructions && (
                    <p className="text-sm text-center mb-4">
                        Haga clic en el botón "Asignar" en la tabla para asignar un repartidor al pedido.
                    </p>
                )}
                {selectedData && (
                    <div className="grid grid-cols-12 gap-2 mb-4">
                        <div className="col-span-5">
                            <p className="text-xl font-bold">Pedido</p>
                            <>
                                <div className="grid grid-cols-5">
                                    <div className="col-span-2">
                                        <p className=" text-sm font-semibold">Fecha de Solicitud:</p>
                                    </div>
                                    <div className="col-span-3">
                                        <p className=" text-sm font-medium">{selectedData.pedido.fecha_de_solicitud}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-5">
                                    <div className="col-span-2">
                                        <p className=" text-sm font-semibold">Fecha de entrega:</p>
                                    </div>
                                    <div className="col-span-3">
                                        <p className=" text-sm font-medium">{selectedData.pedido.fecha_de_entrega}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-5">
                                    <div className="col-span-2">
                                        <p className=" text-sm font-semibold">Estado:</p>
                                    </div>
                                    <div className="col-span-3">
                                        <p className=" text-sm font-medium"> {selectedData.cliente.estatus}</p>
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
                                            {selectedData.cliente.nombre} {selectedData.cliente.apellido}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-5">
                                    <div className="col-span-1">
                                        <p className=" text-sm font-semibold">Teléfono: </p>
                                    </div>
                                    <div className="col-span-4">
                                        <p className=" text-sm font-medium">{selectedData.cliente.telefono}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-5">
                                    <div className="col-span-1">
                                        <p className=" text-sm font-semibold">Dirección: </p>
                                    </div>
                                    <div className="col-span-4">
                                        <p className=" text-sm font-semibold">{selectedData.cliente.direccion}</p>
                                    </div>
                                </div>
                            </>
                        </div>
                        <div className="col-span-2">
                            <p className="text-xl font-bold">Monto a Pagar</p>
                            {selectedData && <p className="text-5xl font-semibold text-center">${selectedData.pedido.monto}</p>}
                        </div>
                    </div>
                )}
                <form onSubmit={formik.handleSubmit}>
                    {selectedData && (
                        <div className="w-3/5 mb-8">
                            <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Seleccionar repartidor
                            </label>
                            <select
                                id="repartidor"
                                name="repartidor"
                                value={formik.values.repartidor}
                                onChange={formik.handleChange}
                                className={`bg-gray border effect-shadow-input border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formik.errors.repartidor ? "border-red-500" : ""
                                    }`}
                            >
                                <option value="">Seleccione un repartidor...</option>
                                {repartidores.map((repartidor) => (
                                    <option key={repartidor.id} value={repartidor.nombre}>
                                        {repartidor.nombre}
                                    </option>
                                ))}
                            </select>
                            {formik.errors.repartidor && <p className="text-red-500 text-sm mt-1">{formik.errors.repartidor}</p>}
                        </div>
                    )}
                    {selectedData && (
                        <div className="grid grid-flow-col justify-end gap-4">
                            <button
                                type="button"
                                onClick={handleCancelar}
                                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red dark:focus:ring-red-900"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red dark:focus:ring-red-900"
                            >
                                Guardar
                            </button>
                        </div>
                    )}
                </form>
            </div>
            <p className="text-2xl font-extrabold text-start">Pedidos Pendientes</p>
            <TableComponent handler={handleAsignar} columns={columns} data={data} PerPage={5} />
        </>
    )
}

export default Home