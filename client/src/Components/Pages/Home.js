import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NumberFormat from 'react-number-format'

const Home = props => {
  const [price, setPrice] = useState()
  useEffect(() => {
    const fetchPrice = () => {
      axios
        .get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
        .then(res => {
          setPrice(res.data.price)
        })
        .catch(error => {
          console.log(error)
        })
    }
    const interval = setInterval(() => fetchPrice(), 2000)
    return () => {
      clearInterval(interval)
    }
  }, [price])
  return (
    <React.Fragment>
      <div className="content-wrapper">
        <h2> Home</h2>
        <div class="card card-primary card-outline">
          {price && (
            <div class="card-body box-profile">
              <div class="text-center">
                <img
                  class="profile-user-img img-fluid img-circle"
                  src="https://investadvocate.com.ng/wp-content/uploads/2018/02/Bitcoin.png"
                  alt="User profile picture"
                />

                <h3>Bitcoin in USD: </h3>
                <NumberFormat
                  value={price}
                  className="profile-username"
                  displayType={'text'}
                  type="number"
                  decimalScale={2}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              </div>
              <a
                href="https://www.binance.com/en/trade/BTC_USDT?layout=basic"
                class="btn btn-primary btn-block"
                target="_blank"
              >
                <b>Check it out with Binance website</b>
              </a>
            </div>
          )}
          {!price && (
            <div className="profile-username">
              <h5>Loading...</h5>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}
export default Home
