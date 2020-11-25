import React, { useState } from 'react'
import { Cell } from './Cell'

export function Spreadsheet ({ headers, rows }) {
  const [editId, setEditId] = useState(null)

  const handleUpdate = (id, value) => {
    handleEditDone()
    console.log(`update id ${id} with value: '${value}'`)
    // TODO update data
  }

  const handleEditDone = () => {
    setEditId(null)
  }

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
                  <Cell
                    key={rowData.value_id}
                    data={rowData}
                    isEditing={editId === rowData.value_id}
                    onEditStart={() => { setEditId(rowData.value_id) }}
                    onEditSubmit={(value) => handleUpdate(rowData.value_id, value)}
                    onEditCancel={handleEditDone}
                  />
                ))
              }
            </tr>
          ))
          }
      </tbody>
    </table>
  )
}
