import React from 'react';

const TableComponent = ({ columns, data }) => {
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
            {data.map((item, index) => (
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
    </>
  );
};

export default TableComponent;
