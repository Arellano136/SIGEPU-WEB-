import React, { useState, useEffect } from 'react';
import TableComponent from '../../components/TableComponent';
import Swal from 'sweetalert2';
import AxiosClient from '../../config/http-gateway/http-client';

function Clients() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);

  const getClientes = async () => {
    try {
      setLoading(true);
      const response = await AxiosClient({ url: "/users/", method: "GET" });
      console.log(response);
      if (response.status === "OK" && !response.error) {
        const usersWithRole3 = response.data.filter(user => user.role.id_role === 3);
        setClientes(usersWithRole3);
      } else {
        throw new Error("Error fetching clients data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
console.log(clientes)
  useEffect(() => {
    getClientes();
  }, []);
  const refreshClient=()=>{
    getClientes();
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
          refreshClient();
          console.log(response);
        } catch (error) {
          console.log(error);
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

  const columns = [
    { label: "#", accessor: null, render: (_, index) => index + 1 },
    { label: 'Nombre', accessor: 'name', render: (cliente) => cliente.persons.name },
    { label: 'Apellido', accessor: 'lastname', render: (cliente) => cliente.persons.lastname },
    { label: 'Num. Teléfono', accessor: 'phone', render: (cliente) => cliente.persons.phone },
    { label: 'Correo Electrónico', accessor: 'email' },
    { label: 'Dirección', accessor: 'address', render: (cliente) => cliente.persons.address },
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
    }
  ];

  return (
    <>
      <p className='text-4xl font-extrabold text-left mb-6 mt-10'>Clientes</p>
      <TableComponent columns={columns} data={clientes} PerPage={15} progress={loading} />
    </>
  );
}

export default Clients;
