import React from 'react';

const ArrayTable = ({ hasNumberColumn, columnLabels, data }) => (
  <table>
    { columnLabels.length > 0 && (
      <thead>
        <tr>
          { columnLabels.map((label, i) => (
            <th
              className='w-20'
              key={ `columnLabel-${ i }` }
            >
              { label }
            </th>
          )) }
        </tr>
      </thead>
    ) }

    <tbody>
      { data.map((value, i) => (
        <tr key={ `dataRow-${ i }` }>
          { hasNumberColumn && (
            <td className='text-center'>{ i + 1 }</td>
          ) }
          <td className='text-center'>{ value }</td>
        </tr>
      )) }
    </tbody>
  </table>
);

export default ArrayTable;
