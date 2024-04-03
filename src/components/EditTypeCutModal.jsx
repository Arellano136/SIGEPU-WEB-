import React,{useEffect} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import AxiosClient from '../config/http-gateway/http-client';

function EditTypeCutModal({
    selectedCut,
    showModal,
    handleCerrarModal,
    setShowOffcanvas,
    refreshInventary,
    updateSelectedCut
}) {
    if (!selectedCut) {
        return null;
      }
    useEffect(() => {
            formik.setFieldValue('cutName', selectedCut.cutName);
            formik.setFieldValue('cost', selectedCut.cost);  
    }, [selectedCut])
    const validationSchema = yup.object().shape({
        cutName: yup.string()
            .max(50, 'No debe exceder los 50 caracteres')
            .required('Campo obligatorio'),
        cost: yup.number().min(0, 'Solo números positivos').required('Campo obligatorio'),
    });

    
    const formik = useFormik({
        initialValues: {
            cutName: '',
            cost: '',
        },
        validationSchema,
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
                try {const payload = {
                    id_cuts: selectedCut.id_cuts,
                    cutName: values.cutName,
                    cost: values.cost,
                    orders: null
                };
                    const response = await AxiosClient({
                        url: `/cuts/`,
                        method: "PUT",
                        data: payload,
                    });
                    console.log(response.data);
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'Guardado correctamente',
                    });

                    setShowOffcanvas(true);
                    handleCerrarModal();
                    refreshInventary();
                    updateSelectedCut();
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

    const closeEditModal = () => {
        const isModified = formik.dirty;
        if (!isModified) {
            setShowOffcanvas(true);
            handleCerrarModal();
        } else {
            Swal.fire({
                title: '¿Descartar cambios?',
                text: 'Si cierras el modal, los cambios no se guardarán.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Descartar',
                cancelButtonText: 'Cancelar',
            }).then(result => {
                if (result.isConfirmed) {
                    formik.resetForm();
                    setShowOffcanvas(true);
                    handleCerrarModal();
                }
            });
        }
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-25">
                    <div id="authentication-modal" className={`absolute top-0 right-0 left-0 z-50 flex justify-start items-center h-screen`}>
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="p-4 md:p-5">
                                    <div className="grid justify-end">
                                        <button
                                            onClick={closeEditModal}
                                            type="button"
                                            className="text-sm font-medium text-end text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        >
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
                                    <p className="font-bold text-xl text-center text-red-800">Tipo de Corte</p>

                                    <div className="col-span-12 flex flex-row mt-3 mb-8 gap-4">
                                        <div className="">
                                            <label htmlFor="cutName" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                                                Corte
                                            </label>
                                            <input
                                                type="text"
                                                id="cutName"
                                                name="cutName"
                                                className={`effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formik.touched.cutName && formik.errors.cutName ? 'border-red-500' : ''}`}
                                                {...formik.getFieldProps('cutName')}
                                                placeholder=""
                                             />
                                            {formik.touched.cutName && formik.errors.cutName && (
                                                <p className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.cutName}</p>
                                            )}
                                        </div>
                                        <div className="">
                                            <label htmlFor="cost" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                                                Precio
                                            </label>
                                            <input
                                                type="number"
                                                id="cost"
                                                name="cost"
                                                className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder=""
                                                {...formik.getFieldProps('cost')}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid justify-end">
                                        <button
                                            type="submit"
                                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mb-4"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditTypeCutModal;
