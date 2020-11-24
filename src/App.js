import React from 'react'
import { useQuery, gql } from '@apollo/client'

const exchangeRatesQuery = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`

function App () {
  const { loading, error, data } = useQuery(exchangeRatesQuery)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ))
}

export default App
