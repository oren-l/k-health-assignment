import React, { useRef, useState } from 'react'
import { useClickAway } from 'ahooks'

export function CellEdit ({
  value,
  onSubmit,
  onCancel
}) {
  const thisEl = useRef()
  const [temp, setTemp] = useState(value)

  const done = () => {
    if (value === temp) {
      onCancel()
    } else {
      onSubmit(temp)
    }
  }

  useClickAway(() => {
    done()
  }, thisEl)

  const selectInputText = event => {
    event.target.select()
  }

  const handleInputChange = event => {
    setTemp(event.target.value)
  }

  const handleEditSubmit = event => {
    event.preventDefault()
    done()
  }

  return (
    <form onSubmit={handleEditSubmit} ref={thisEl}>
      <input
        type='text'
        value={temp}
        onChange={handleInputChange}
        onFocus={selectInputText}
        autoFocus
      />
    </form>
  )
}
