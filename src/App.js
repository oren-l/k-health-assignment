import React from 'react'
import { useQuery, gql } from '@apollo/client'
import * as R from 'ramda'
import { nanoid } from 'nanoid'
import './App.css'

const getSpreadsheet = gql`
  query GetSpreadsheet {
    headers {
      header_id
      header_name
    }
    rows {
      row_id
    }
    values {
      value_id
      header_id
      row_id
      value
    }
  }
`
function App () {
  const { loading, error, data } = useQuery(getSpreadsheet)

  if (loading) {
    return 'Loading...'
  }

  if (error) {
    return 'Error :('
  }

  const valuesIndex = R.pipe(
    R.groupBy(R.prop('row_id')),
    R.map(R.groupBy(R.prop('header_id'))),
    R.map(R.map(R.head))
  )(data.values)

  console.log('R.index:', valuesIndex)

  const headersIndex = R.pipe(
    R.groupBy(R.prop('header_id')),
    R.map(R.head)
  )(data.headers)

  console.log('headersIndex:', headersIndex)

  const rows = R.map(({ row_id }) => { // eslint-disable-line camelcase
    const matchingRow = valuesIndex[row_id]
    return {
      row_id,
      data: R.map(({ header_id }) => { // eslint-disable-line camelcase
        const matchingValue = matchingRow[header_id]
        return {
          row_id,
          header_id,
          value_id: matchingValue?.value_id || nanoid(), // TODO: replace nonoid with a numeric id generator to match schema
          value: matchingValue?.value
        }
      })(data.headers)
    }
  })(data.rows)

  console.log('rows:', rows)

  return (
    <div>
      <table>
        <thead>
          <tr>
            {
              data.headers.map(header => (
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
    </div>
  )
}

export default App
