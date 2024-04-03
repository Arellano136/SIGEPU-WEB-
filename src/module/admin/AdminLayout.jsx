import React from 'react';

import { Outlet, NavLink } from "react-router-dom";
import Logo from '../../assets/img/logo.png';

const AdminLayout = () => {
    return (
        <div className="flex">
        <aside className="fixed h-full text-base top-0 left-0 z-40 flex-1 h-screen transition-transform bg-red dark:bg-gray-800 h-full">
          <div className="h-full overflow-y-auto bg-red dark:bg-gray-800">
            <div className="flex items-center">
              <img width="135" height="135" src={Logo} alt="Logo de la carniceria" />
            </div>
            <ul className="space-y-2">
              <li className="w-full px-3">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive
                      ? "flex nav-a items-center p-2 text-red-800 bg-white rounded-lg dark:text-white dark:bg-gray-700 group"
                      : "flex nav-a items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  }
                >
                  <i className="fa-solid fa-house mr-2"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">Inicio</span>
                </NavLink>
              </li>
              <li className="w-full px-3">
                <NavLink
                  to="/inventary"
                  className={({ isActive }) =>
                    isActive
                      ? "flex nav-a items-center p-2 text-red-800 bg-white rounded-lg dark:text-white dark:bg-gray-700 group"
                      : "flex nav-a items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  }
                >
                  <i className="fa-solid fa-grip mr-2"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">Inventario </span>
                </NavLink>
              </li>
              <li className="w-full px-3">
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    isActive
                      ? "flex nav-a items-center p-2 text-red-800 bg-white rounded-lg dark:text-white dark:bg-gray-700 group"
                      : "flex nav-a items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  }
                >
                  <i className="fa-solid fa-calendar-days mr-2"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">Pedidos</span>
                </NavLink>
              </li>
              <li className="w-full px-3">
                <NavLink
                  to="/clients"
                  className={({ isActive }) =>
                    isActive
                      ? "flex nav-a items-center p-2 text-red-800 bg-white rounded-lg dark:text-white dark:bg-gray-700 group"
                      : "flex nav-a items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  }
                >
                  <i className="fa-solid fa-user mr-2"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap"> Clientes</span>
                </NavLink>
              </li>
              <li className="w-full px-3">
                <NavLink
                  to="/workers"
                  className={({ isActive }) =>
                    isActive
                      ? "flex nav-a items-center p-2 text-red-800 bg-white rounded-lg dark:text-white dark:bg-gray-700 group"
                      : "flex nav-a items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  }
                >
                  <i className="fa-solid fa-users mr-2"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap"> Trabajadores</span>
                </NavLink>
              </li>
              <li className=" absolute bottom-0 left-0 right-0 mx-2 px-3">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "flex nav-a items-center p-2 text-red-800 bg-white rounded-lg dark:text-white dark:bg-gray-700 group"
                      : "flex nav-a items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  }
                ><i className="fa-solid fa-circle-user"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap"> Perfil</span>
                </NavLink>
                <div className="absolute top-0 left-0 w-full h-px bg-gray-300 dark:bg-gray-700"></div>
              </li>
            </ul>
          </div>
        </aside>
        <main className="pt-4 ml-48 flex-1 px-16">
          <section>
            <Outlet />
          </section>
        </main>
      </div>
    );
};

export default AdminLayout;
