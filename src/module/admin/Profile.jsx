import React, { useState,useEffect  } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import Logo from "../../assets/img/logo.png";


function Profile() {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const data = localStorage.getItem('user');
      if (data) {
        setUserData(JSON.parse(data));
    }
    }, []);
    const updateFormik = useFormik({
      initialValues: {
        email: '',
        phone: '',
        name: '',
        lastName: '',
      },
      validationSchema: yup.object({
        email: yup.string().email('Correo electrónico inválido').required('Campo requerido'),
        phone: yup.string().required('Campo requerido'),
        name: yup.string().required('Campo requerido'),
        lastName: yup.string().required('Campo requerido'),
      }),
      onSubmit: (values) => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: '¿Deseas actualizar la información?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Guardar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            console.log('Datos guardados:', values);
  
            Swal.fire('¡Actualizado!', 'La información se actualizó correctamente.', 'success');
          }
        });
      },
    });
  console.log(userData)
    const changePasswordFormik = useFormik({
      initialValues: {
        newPassword: '',
        confirmPassword: '',
        currentPassword: '',
      },
      validationSchema: yup.object({
        newPassword: yup.string().required('Campo requerido'),
        confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Las contraseñas no coinciden').required('Campo requerido'),
        currentPassword: yup.string().required('Campo requerido'),
      }),
  
      onSubmit: (values) => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: '¿Deseas cambiar la contraseña?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Guardar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            // Aquí puedes realizar alguna acción, como enviar los datos al servidor
            console.log('Datos guardados:', values)
            Swal.fire('¡Guardado!', 'La contraseña se actualizó correctamente.', 'success');
          }
        });
      },
    });
    return (
        <>
            <div className='grid  mb-5 justify-items-center'>
                <img width="20%" height="20%" src={Logo} alt="Logo de la carniceria" />
                <p className='text-3xl font-extrabold text-center '> </p>
                <div className='grid grid-flow-col gap-4'>
                    <p className='text-xl font-extrabold text-center'></p>
                    <p className='text-xl font-extrabold text-center'></p>
                </div>
            </div>

            <div className='w-full bg-red p-2 rounded-t-lg'>
                <p className='text-white text-light-600'>Actualizar Información</p>
            </div>
            <form onSubmit={updateFormik.handleSubmit}>
                <div className='grid grid-cols-2 gap-4 px-5 pt-5'>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo Electrónico</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={updateFormik.values.email}
                            onChange={updateFormik.handleChange}
                            onBlur={updateFormik.handleBlur}
                            className={`effect-shadow-input w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${updateFormik.touched.email && updateFormik.errors.email ? 'border-red-500' : ''}`}
                            placeholder=""
                        />
                        {updateFormik.touched.email && updateFormik.errors.email ? (
                            <div className="grid justify-items-end text-red-500  text-sm mt-2" >{updateFormik.errors.email}</div>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={updateFormik.values.phone}
                            onChange={updateFormik.handleChange}
                            onBlur={updateFormik.handleBlur}
                            className={`effect-shadow-input w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${updateFormik.touched.phone && updateFormik.errors.phone ? 'border-red-500' : ''}`}
                            placeholder=""
                        />
                        {updateFormik.touched.phone && updateFormik.errors.phone ? (
                            <div className="grid justify-items-end text-red-500  text-sm mt-2">{updateFormik.errors.phone}</div>
                        ) : null}
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4 px-5 pt-5'>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={updateFormik.values.name}
                            onChange={updateFormik.handleChange}
                            onBlur={updateFormik.handleBlur}
                            className={`effect-shadow-input w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${updateFormik.touched.name && updateFormik.errors.name ? 'border-red-500' : ''}`}
                            placeholder=""
                        />
                        {updateFormik.touched.name && updateFormik.errors.name ? (
                            <div className="grid justify-items-end text-red-500  text-sm mt-2">{updateFormik.errors.name}</div>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={updateFormik.values.lastName}
                            onChange={updateFormik.handleChange}
                            onBlur={updateFormik.handleBlur}
                            className={`effect-shadow-input w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${updateFormik.touched.name && updateFormik.errors.name ? 'border-red-500' : ''}`}
                            placeholder=""
                        />
                        {updateFormik.touched.name && updateFormik.errors.name ? (
                            <div className="grid justify-items-end text-red-500  text-sm mt-2">{updateFormik.errors.name}</div>
                        ) : null}
                    </div>
                </div>


                <div className="grid justify-end m-5">
                    <button type="submit" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red dark:focus:ring-red-900">Actualizar</button>
                </div>
            </form>

            <div>
                <div className="w-full bg-red p-2 rounded-t-lg">
                    <p className="text-white text-light-600">Cambio contraseña</p>
                </div>
                <form onSubmit={changePasswordFormik.handleSubmit}>
                    <div className="grid grid-cols-3 gap-4 px-5 pt-2 pb-3">
                        <div>
                            <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Contraseña Actual
                            </label>
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={changePasswordFormik.values.currentPassword}
                                    onChange={changePasswordFormik.handleChange}
                                    onBlur={changePasswordFormik.handleBlur}
                                    className={`effect-shadow-input w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${changePasswordFormik.touched.currentPassword && changePasswordFormik.errors.currentPassword ? 'border-red-500' : ''}`}
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            {changePasswordFormik.touched.currentPassword && changePasswordFormik.errors.currentPassword ? (
                                <div className="grid justify-items-end text-red-500  text-sm mt-2">{changePasswordFormik.errors.currentPassword}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Nueva Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    id="newPassword"
                                    name="newPassword"
                                    value={changePasswordFormik.values.newPassword}
                                    onChange={changePasswordFormik.handleChange}
                                    onBlur={changePasswordFormik.handleBlur}
                                    className={`effect-shadow-input w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${changePasswordFormik.touched.newPassword && changePasswordFormik.errors.newPassword ? 'border-red-500' : ''}`}
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            {changePasswordFormik.touched.newPassword && changePasswordFormik.errors.newPassword ? (
                                <div className="grid justify-items-end text-red-500  text-sm mt-2">{changePasswordFormik.errors.newPassword}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Confirmar Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={changePasswordFormik.values.confirmPassword}
                                    onChange={changePasswordFormik.handleChange}
                                    onBlur={changePasswordFormik.handleBlur}
                                    className={`effect-shadow-input w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${changePasswordFormik.touched.confirmPassword && changePasswordFormik.errors.confirmPassword ? 'border-red-500' : ''}`}
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            {changePasswordFormik.touched.confirmPassword && changePasswordFormik.errors.confirmPassword ? (
                                <div className="grid justify-items-end text-red-500  text-sm mt-2">{changePasswordFormik.errors.confirmPassword}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className="grid justify-end mx-5">
                        <button
                            type="submit"
                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red dark:focus:ring-red-900"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Profile