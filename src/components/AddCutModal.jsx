import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import AxiosClient from '../config/http-gateway/http-client';
function AddCutModal({ showModalAdd, handleCerrarModalAdd, handleImageUpload ,
    refreshInventary}) {
    const formik = useFormik({
        initialValues: {
            cut: '',
            quantity: '',
            price: '',
            image: '',
            description: ''
        },
        validationSchema: yup.object({
            cut: yup.string()
                .max(50, 'No debe exceder los 50 caracteres')
                .required('Campo obligatorio'),
            quantity: yup.number().required('Campo Obligatorio').positive('Solo números positivos'),
            price: yup.number().required('Campo Obligatorio').positive('Solo números positivos'),
            image: yup.mixed().required('Campo Obligatorio'),
            description: yup.string().required('Campo Obligatorio').max(200, 'No debe exceder los 200 caracteres'),
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
                        meatName: values.cut,
                        cost: values.price,
                        kg: values.quantity,
                        image: values.image,
                        description: values.description,
                        orders: null
                    }
                    console.log(payload);
                    const response = await AxiosClient({
                        url: "/inventory/",
                        method: "POST",
                        data: payload,
                    });
                    Swal.fire({
                        icon: 'success',
                        title: '¡Exito!',
                        text: 'Guardado correctamente',
                    });
                    refreshInventary();
                    console.log(response.values);
                    handleCerrarModalAdd();
                } catch (error) {
                    console.log(values);
                    console.error("Error:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un error al guardar el corte. Por favor, inténtalo de nuevo más tarde.',
                    });
                }
            }
        },
    });

    const handleChangeAvatar = (event) => {
        const files = event.target.files;
        if (files.length > 0 && files.length < 2) {
            const file = files[0];
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
            if (!allowedTypes.includes(file.type)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El archivo seleccionado no es una imagen válida.',
                });
                return;
            }
    
            const reader = new FileReader();
            reader.onloadend = (data) => {
                const base64Image = data.target.result;
                    formik.setFieldValue('image', base64Image);
                    formik.setFieldTouched('image', true);
                
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        if (!showModalAdd) {
            formik.resetForm();
        }
    }, [showModalAdd]);

    return (
        <div>
            {showModalAdd && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-25">
                    <div id="authentication-modal" className={`absolute top-0 right-0 left-0 z-50 flex justify-start items-center h-screen`}>
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="p-4 md:p-5 ">
                                <div className="grid justify-end">
                                    <button
                                        onClick={handleCerrarModalAdd}
                                        type="button"
                                        className=" text-sm font-medium text-end text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <p className="font-bold text-xl  text-center text-red-800 mb-3">Corte de Carne</p>

                                <form onSubmit={formik.handleSubmit}>
                                    <div>
                                        <label htmlFor="cut" className="block mb-1  text-ms font-normal text-gray-900 dark:text-white">
                                            Corte
                                        </label>
                                        <input
                                            type="text"
                                            id="cut"
                                            name="cut"
                                            className="effect-shadow-input w-full"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.cut}
                                        />
                                        {formik.touched.cut && formik.errors.cut ? (
                                            <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.cut}</div>
                                        ) : null}

                                        <div className="col-span-12 flex flex-row mt-3 mb-3 gap-4">
                                            <div className="">
                                                <label htmlFor="quantity" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                                                    Kilo(s)
                                                </label>
                                                <input
                                                    type="number"
                                                    id="quantity"
                                                    name="quantity"
                                                    className="effect-shadow-input w-full"
                                                    min="0"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.quantity}
                                                />
                                                {formik.touched.quantity && formik.errors.quantity ? (
                                                    <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.quantity}</div>
                                                ) : null}
                                            </div>
                                            <div className="">
                                                <label htmlFor="price" className="block mb-1  text-ms font-normal text-gray-900 dark:text-white">
                                                    Precio por Kilo
                                                </label>
                                                <input
                                                    type="number"
                                                    id="price"
                                                    name="price"
                                                    className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    min="0"
                                                    pattern="[0-9]*"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.price}
                                                />
                                                {formik.touched.price && formik.errors.price ? (
                                                    <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.price}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="mt-3 mb-3">
                                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                                            <textarea
                                                id="description"
                                                rows="3"
                                                className="effect-shadow-input block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder=""
                                                value={formik.values.description}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            ></textarea>
                                            {formik.touched.description && formik.errors.description ? (
                                                <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.description}</div>
                                            ) : null}
                                        </div>
                                        <div className="grid items-center justify-center w-full">
                                            <label
                                                className="block mb-1 text-ms font-normal text-gray-900 dark:text-white" htmlFor="image"
                                            >Subir Imagen
                                            </label>

                                            <input
                                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                aria-describedby="image_help"
                                                id="image"
                                                type="file"
                                                onChange={(e) => handleChangeAvatar(e)}
                                            />

                                            <p className="mt-1 text-xs text-gray-500 text-end justify-items-end dark:text-gray-300" id="image_help">
                                                SVG, PNG, JPG or GIF (MAX. 800x400px).
                                            </p>
                                            {formik.touched.image && formik.errors.image ? (
                                                <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.image}</div>
                                            ) : null}

                                        </div>
                                        <div className="grid justify-end mt-4">
                                            <button
                                                type="submit"
                                                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 mb-4"
                                            >
                                                Guardar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddCutModal;
