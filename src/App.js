import React, { useState } from 'react'
import { useMutation, useQuery, gql } from '@apollo/client'

const getTodosQuery = gql`
  query GetTodos {
    todos {
      id
      type
    }
}
`

const addTodoQuery = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`

function AddTodo () {
  const [value, setValue] = useState('')
  const [addTodo] = useMutation(addTodoQuery)

  const submitHandler = event => {
    event.preventDefault()
    addTodo({
      variables: {
        type: value
      },
      refetchQueries: ['GetTodos']
    })
    setValue('')
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type='text' value={value} onChange={(event) => { setValue(event.target.value) }} />
        <button type='submit'>Add Todo</button>
      </form>
    </div>
  )
}

function App () {
  const { loading, error, data } = useQuery(getTodosQuery)
  if (loading) {
    return 'Loading...'
  }

  if (error) {
    return 'Error :('
  }

  return (
    <div>
      <ul>
        {
          data.todos.map(todo => (
            <li key={todo.id}>
              {todo.type}
            </li>
          ))
        }
      </ul>
      <hr />
      <AddTodo />
    </div>
  )
}

export default App
