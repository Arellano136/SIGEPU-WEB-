import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import TableComponent from '../../components/TableComponent';
import EditWorkerModal from '../../components/EditWorkerModal';
import AddWorkerModal from '../../components/AddWorkerModal';
import ChangePasswordModal from '../../components/ChangePasswordModal'
import AxiosClient from '../../config/http-gateway/http-client';

function Workers() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [currentClient, setCurrentClient] = useState(null);

  const getClients = async () => {
    try {
      setLoading(true);
      const response = await AxiosClient({ url: "/users/", method: "GET" });
      console.log(response);
      if (response.status === "OK" && !response.error) {
        const usersWithRole2 = response.data.filter(user => user.role.id_role === 2);
        setClients(usersWithRole2);
      } else {
        throw new Error("Error fetching clients data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getClients();
  }, []);
  const refreshWorkers = () => {
    getClients();
  }
  const changeStatus = (cliente) => {
    setCurrentClient(cliente);
    console.log(cliente)
    Swal.fire({
      title: 'Confirmación',
      text: '¿Estás seguro de que quieres cambiar el estado de este cliente?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await AxiosClient({
            url: `/users/${cliente.id_user}`,
            method: "PATCH",
            data: { status: !cliente.status }
          });
          Swal.fire({
            icon: 'success',
            title: 'Solicitud exitosa',
            text: 'La solicitud se ha realizado correctamente.',
          });
          refreshWorkers();
          console.log(response);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al realizar la solicitud. Por favor, inténtalo de nuevo.',
          });
        }
      }
    });
  };

  const handleStatusChange = (cliente) => {
    setCurrentClient(cliente);
    changeStatus(cliente);
  };


  const openModal = () => {
    setShowModal(true);
  };

  const openModalEdit = () => {
    setShowModalEdit(true);
  };

  const closeModalPassword = () => {
    setShowPasswordModal(false);
  };

  const openModalPassword = () => {
    setShowPasswordModal(true);
  };

  const closeModalEdit = () => {
    setShowModalEdit(false);
  };

  const refreshClients = () => {
    getClients();
  };

  const columns = [
    { label: "#", accessor: null, render: (_, index) => index + 1 },
    { label: 'Nombre', accessor: 'name', render: (client) => client.persons.name },
    { label: 'Apellido', accessor: 'lastname', render: (client) => client.persons.lastname },
    { label: 'Num. Teléfono', accessor: 'phone', render: (client) => client.persons.phone },
    { label: 'Correo Electrónico', accessor: 'email' },
    {
      label: 'Estado',
      accessor: 'status',
      render: (cliente) => (
        <button
          onClick={() => handleStatusChange(cliente)}
          className={`status-btn ${cliente.status === true ? 'active' : 'inactive'}`}
        >
          {cliente.status === true ? 'Activo' : 'Inactivo'}
        </button>
      )
    }, {
      label: 'Acciones',
      render: (client) => (
        <div>
          <button
            onClick={() => {
              setEditingClient(client);
              openModalEdit();
            }}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-2.5 py-1.5 text-center  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red dark:focus:ring-red-900"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>

          <button
            onClick={() => {
              setEditingClient(client);
              setShowPasswordModal(true); // Aquí se cambia setShowModal(true) para abrir el modal de cambio de contraseña
            }}
            className="text-black hover:text-white border border-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-md text-center px-2.5 py-1.5 mx-3  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red dark:focus:ring-red-900"
          >
            <i className="fa-solid fa-gear"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <p className='text-4xl font-extrabold text-left mb-6 mt-10'>Trabajadores</p>
      <div className="grid justify-items-end">
        <button type="button" onClick={openModal} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mb-4">
          Añadir Trabajadores
        </button>
      </div>
      <TableComponent columns={columns} data={clients} PerPage={15} progress={loading} />
      <AddWorkerModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        refreshClients={refreshClients}
      />

      <EditWorkerModal
        showModalEdit={showModalEdit}
        closeModalEdit={closeModalEdit}
        clienteEditando={editingClient || {}}
        refreshClients={refreshClients}
      />
      <ChangePasswordModal
        showPasswordModal={showPasswordModal}
        closeModal={closeModalPassword}
        dataWorker={editingClient || {}}
      />
    </>
  );
}

export default Workers;
