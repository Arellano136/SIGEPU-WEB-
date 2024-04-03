import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import AxiosClient from '../config/http-gateway/http-client.js';

const AddWorkerModal = ({ showModal, closeModal, refreshClients }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(45, 'No debe exceder los 50 caracteres')
        .required('Campo obligatorio'),
      lastname: Yup.string()
        .max(45, 'No debe exceder los 50 caracteres')
        .required('Campo obligatorio'),
      email: Yup.string()
        .email('Correo electrónico inválido')
        .required('Campo obligatorio'),
      phone: Yup.string()
        .matches(/^\d{10}$/, 'Número de teléfono inválido')
        .required('Campo obligatorio'),
      password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('Campo obligatorio'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('Campo obligatorio'),
    }),
    onSubmit: async (values) => {
      const confirmSave = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se guardará el trabajador',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar'
      });

      if (confirmSave.isConfirmed) {
        try {
          const payload = {
            email: values.email,
            password: values.password,
            role: {
              id_role: 2,
              role: "TRABAJADOR_ROLE"
            },
            persons: {
              name: values.name,
              lastname: values.lastname,
              email: values.email,
              phone: values.phone,
              address: ""
            }
          }
          console.log(payload);
          const response = await AxiosClient({
            url: "/users/",
            method: "POST",
            data: payload,
          });
          Swal.fire({
            icon: 'success',
            title: '¡Guardado!',
            text: 'El trabajador se almaceno Correctamente',
          });
          console.log(response.values);
          closeModal();
          refreshClients();
        } catch (error) {
          console.log(values);
          console.error("Error:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al guardar el trabajador. Por favor, inténtalo de nuevo más tarde.',
          });
        }
      }
    },
  });


  useEffect(() => {
    if (!showModal) {
      formik.resetForm();
    }
  }, [showModal]);
  return (
    showModal && (
      <div className="fixed inset-0 z-40 bg-black bg-opacity-25 flex justify-center items-center overflow-auto">
        <div id="authentication-modal" className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md px-6">
          <div className="p-8 md:p-4">
            <div className="grid justify-end">
              <button
                onClick={closeModal}
                type="button"
                className="text-sm font-medium text-end text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <p className="font-bold text-2xl text-center text-red-800 mb-3">Trabajador</p>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-2">
                <label htmlFor="name" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`effect-shadow-input bg-gray-50 border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.name}</div>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="lastname" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className={`effect-shadow-input bg-gray-50 border ${formik.touched.lastname && formik.errors.lastname ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastname && formik.errors.lastname && (
                  <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.lastname}</div>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`effect-shadow-input bg-gray-50 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.email}</div>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="phone" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                  Número de Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`effect-shadow-input bg-gray-50 border ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.phone}</div>
                )}
              </div>
              <div className="mb-2 relative">
                <label htmlFor="password" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                  Contraseña
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`effect-shadow-input bg-gray-50 border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-red-800`}></i>
                </button>
                {formik.touched.password && formik.errors.password && (
                  <div className="grid justify-items-end text-red-500 text-sm mt-2">{formik.errors.password}</div>
                )}
              </div>
              <div className="mb-2 relative">
                <label htmlFor="confirmPassword" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                  Confirmar Contraseña
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`effect-shadow-input bg-gray-50 border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 "
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-red-800`}></i>
                </button>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <div className="grid justify-items-end text-red-500 text-sm mt-2">{formik.errors.confirmPassword}</div>
                )}
              </div>
              <div className="grid justify-items-center mt-4">
                <button
                  type="submit"
                  className="w-full focus:outline-none text-white bg-red hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default AddWorkerModal;