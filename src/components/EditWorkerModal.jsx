import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import AxiosClient from '../config/http-gateway/http-client';

const EditWorkerModal = ({ showModalEdit, closeModalEdit, clienteEditando, refreshClients }) => {
    useEffect(() => {
        if (clienteEditando && clienteEditando.persons) {
            formik.setFieldValue('name', clienteEditando.persons.name);
            formik.setFieldValue('lastname', clienteEditando.persons.lastname);
            formik.setFieldValue('phone', clienteEditando.persons.phone);
            formik.setFieldValue('email', clienteEditando.email);
            console.log(clienteEditando.id_admin);
        }
    }, [clienteEditando]);

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            phone: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(50, 'No debe exceder los 50 caracteres')
                .required('Campo obligatorio'),
            lastname: Yup.string()
                .max(50, 'No debe exceder los 50 caracteres')
                .required('Campo obligatorio'),
            email: Yup.string().email('Correo electrónico inválido').required('Campo obligatorio'),
            phone: Yup.string()
                .matches(/^\d{10}$/, 'Número de teléfono inválido')
                .required('Campo obligatorio'),
        }),
        onSubmit: async (values) => {
            const confirmSave = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¿Deseas guardar este corte?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
            });

            if (confirmSave.isConfirmed) {
                try {
                    const payload = {
                        id_admin: clienteEditando.id_user,
                        name: values.name,
                        lastname: values.lastname,
                        email: values.email,
                        phone: values.phone,
                        address: ''
                    };
                    const response = await AxiosClient({
                        url: `/admin/`,
                        method: 'PUT',
                        data: payload,
                    });
                    refreshClients();
                    closeModalEdit();
                    console.log(response.data);
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'Guardado correctamente',
                    });
                } catch (error) {
                    console.log(values);
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un error al guardar el trabajador. Por favor, inténtalo de nuevo más tarde.',
                    });
                }
            }
        },
    });

    return (
        showModalEdit && (
            <div className="fixed inset-0 z-40 bg-black bg-opacity-25 flex justify-center items-center overflow-auto">
                <div id="authentication-modal" className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md">
                    <div className="p-8 md:p-4">
                        <div className="grid justify-end">
                            <button
                                onClick={closeModalEdit}
                                type="button"
                                className="text-sm font-medium text-end text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <p className="font-bold text-2xl  text-center text-red-800 mb-3">Actualizar información</p>
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  border-red-500"
                                        placeholder=""
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="grid justify-items-end text-red-500">{formik.errors.name}</div>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="lasname" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                                        Apellido
                                    </label>
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  border-red-500"
                                        {...formik.getFieldProps('lastname')}
                                    />
                                    {formik.touched.lastname && formik.errors.lastname ? (
                                        <div className="grid justify-items-end text-red-500">{formik.errors.lastname}</div>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                                        Correo Elétronico
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  border-red-500"
                                        placeholder=""
                                        {...formik.getFieldProps('email')}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="grid justify-items-end text-red-500">{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                                        Telefono
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  border-red-500"
                                        placeholder=""
                                        {...formik.getFieldProps('phone')}
                                    />
                                    {formik.touched.phone && formik.errors.phone ? (
                                        <div className="grid justify-items-end text-red-500">{formik.errors.phone}</div>
                                    ) : null}
                                </div>
                                <div className="grid justify-items-center mt-4">
                                    <button
                                        type="submit"
                                        className="w-full focus:outline-none text-white bg-red hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default EditWorkerModal;
