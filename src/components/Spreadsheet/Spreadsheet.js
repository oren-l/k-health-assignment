import React from 'react'

export function Spreadsheet ({ headers, rows }) {
  return (
    <table>
      <thead>
        <tr>
          {
            headers.map(header => (
              <th key={header.header_id}>
                {header.header_name}
              </th>
            ))
            }
        </tr>
      </thead>
      <tbody>
        {
          rows.map(row => (
            <tr key={row.row_id}>
              {
                row.data.map(rowData => (
                  <td key={rowData.value_id} title={JSON.stringify(rowData, null, 2)}>
                    {rowData.value}
                  </td>
                ))
              }
            </tr>
          ))
          }
      </tbody>
    </table>
  )
}
