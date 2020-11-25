import React, { useState } from 'react'
import { CellEdit } from './CellEdit'

export function Cell ({
  data,
  isEditing,
  onEditStart,
  onEditSubmit,
  onEditCancel
}) {
  return (
    <td onDoubleClick={onEditStart}>
      {
        isEditing
          ? (
            <CellEdit
              value={data.value}
              onSubmit={onEditSubmit}
              onCancel={onEditCancel}
            />
            )
          : data.value
      }

    </td>
  )
}
