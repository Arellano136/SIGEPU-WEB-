import React, { useState } from 'react';

const TableComponent = ({ handleAsignar, columns, data, PerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [clientesPerPage] = useState(PerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastCliente = currentPage * clientesPerPage;
  const indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
  const currentClientes = data.slice(indexOfFirstCliente, indexOfLastCliente);

  return (
    <>
      <div className="overflow-x-auto relative rounded-lg">
        <table className="w-full text-black">
          <thead className="text-white bg-red text-left">
            <tr>
              {columns.map(({ label }, index) => (
                <th key={index} scope="col" className="text-left p-3">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-left">
            {currentClientes.map((item, index) => (
              <tr key={index} className="text-left shadow-md">
                {columns.map(({ accessor, render }, columnIndex) => (
                  <td key={columnIndex} className="text-left p-2">
                    {render ? render(item, index) : item[accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid justify-items-center mt-5">
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={currentPage === 1 ? 'disabled' : ''}
          >
            Anterior
          </button>
          {Array.from({ length: Math.ceil(data.length / clientesPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(data.length / clientesPerPage)}
            className={currentPage === Math.ceil(data.length / clientesPerPage) ? 'disabled' : ''}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default TableComponent;
