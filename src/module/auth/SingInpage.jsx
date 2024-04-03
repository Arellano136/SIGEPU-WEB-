import { Spinner } from "flowbite-react";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as yup from "yup";
import { customAlert } from "../../config/alert/alert";
import AxiosClient from "../../config/http-gateway/http-client";
import AuthContext from "../../config/context/auth-context";
import { useNavigate } from "react-router-dom";

import ImagenLogo from "../../assets/img/logo.png";
import "./img.css";

const SignInPage = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Campo obligatorio"),
      password: yup.string().required("Campo obligatorio"),
    }),onSubmit: async (values, { setSubmitting }) => {
      
       try {
         const response = await AxiosClient({
           url: "/auth/signin",
           method: "POST",
           data: values,
         });
         if (!response?.error) {
           dispatch({
             type: "SIGNIN",
             payload: response.data,
           });
           console.log(response.data);
           navigate("/home", { replace: true });
         } else throw Error("error");
       } catch (error) {
         console.log(error);
         customAlert(
           "Iniciar Sesion",
           "Usuario y/o contraseña incorrectos",
           "error"
         );
       } finally {
         setSubmitting(false);
       }
     },
     
  });
  return (
    <div className="fondo h-screen mt-0 flex">
      <div className="shadow-lg rounded-lg flex items-center justify-center w-1/2 mx-auto">
	  <div className="w-1/2 p-10 bg-img-red flex rounded-lg items-center justify-center h-2/6 md:h-auto sm:h-auto !h-3/4 md:w-3/4 sm:w-5/6 h-full">
        <img src={ImagenLogo} alt="" />
      </div>
        <div className="w-1/2 p-10 bg-white rounded-lg md:h-auto !h-3/4 sm:h-auto md:w-3/4 sm:w-5/6">
          <div>
            <h1 className=" text-center text-3xl font-extrabold text-red-800">
              Bienvenido Administrador
            </h1>
          </div>

          <form
            className="mt-10  space-y-6"
            action="#"
            method="POST"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <div className="wrapper">
              <div className="icon">
                <svg
                  className="w-6 h-6 text-red-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <input
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                type="email"
                autoComplete="email"
                required
                className=" input rounded-lg border-gray-300 w-full"
                placeholder="Correo electrónico"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-600">{formik.errors.email}</div>
              )}
            </div>

            <div className="wrapper">
              <div className="icon">
                <svg
                  class="w-6 h-6 text-red-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7c0-1.1.9-2 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6c.6 0 1 .4 1 1v3a1 1 0 1 1-2 0v-3c0-.6.4-1 1-1Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <input
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                type="password"
                autoComplete="current-password"
                required
                className=" input rounded-lg border-gray-300 w-full"
                placeholder="Contraseña"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-600">{formik.errors.password}</div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {formik.isSubmitting ? <Spinner /> : "Iniciar sesión"}
              </button>
            </div>
          </form>

          <div className="w-full text-center mt-5">
            <a className="text-red-600"> ¿Olvidaste tu contraseña?</a>
          </div>

          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
