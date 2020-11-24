import React from 'react'
import { useQuery, gql } from '@apollo/client'

const exchangeRatesQuery = gql`
  query GetExchangeRates($currency: String!) {
    rates(currency: $currency) {
      currency
      rate
    }
  }
`

function App () {
  const { loading, error, data, refetch } = useQuery(exchangeRatesQuery, {
    variables: {
      currency: 'ILS'
    },
    pollInterval: 5000,
    notifyOnNetworkStatusChange: true
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      {
        data.rates.map(({ currency, rate }) => (
          <div key={currency}>
            <p>
              {currency}: {rate}
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default App
