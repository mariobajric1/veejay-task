import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import axios from "axios";


function App() {
  const [currecncies, set_currecncies] = useState(
    ['BTC',
    'ETH',
    'USDC',
    'BNB',
    'BUSD',
    'XRP',
    'ADA',
    'SOL',
    'DOT'])
  const [current_top_ten, set_current_top_ten] = useState(
    ['BTCUSDT',
    'ETHUSDT',
    'USDCUSDT',
    'BNBUSDT',
    'BUSDUSDT',
    'XRPUSDT',
    'ADAUSDT',
    'SOLUSDT',
    'DOTUSDT'])
    const [prices_array, set_prices_array] = useState([]);
    const [percent_array, set_percent_array] = useState([]);

    const [table_data, set_table_data] = useState({
      
    })



  async function get_price_data() {
    let prices = []
    for (let i = 0; i <= 8; i++) {
      await axios
         .get(
           `https://mycorsproxystee.herokuapp.com/https://api.binance.com/api/v3/avgPrice?symbol=${current_top_ten[i]}`
         )
           
         .then((res) => {
          let response = res?.data?.price;
          let result = response.replace('USDT','')
          prices.push(result)

           })
           
            
          
           
    }
    set_prices_array(prices)
  };

  async function get_daily_change() {
    let percent = []
      await axios
         .get(
           `https://api.binance.com/api/v3/ticker/24hr?symbols=[%22BTCUSDT%22,%22ETHUSDT%22,%22USDCUSDT%22,%22BNBUSDT%22,%22BUSDUSDT%22,%22XRPUSDT%22,%22ADAUSDT%22,%22SOLUSDT%22,%22DOTUSDT%22]`
         )
           
         .then( (res) =>  {
          
          for (let i = 0; i <= 8; i++){
            console.log(res?.data[i]?.priceChangePercent)
            percent.push(res?.data[i]?.priceChangePercent)

          }


           })
            set_percent_array(percent)
            console.log(percent_array);
          };

  useEffect(() => {
    get_price_data();
    get_daily_change();
  }, []);











  return (
    <div className="app">
      <div></div>
      <div id='currency_table'>
        <p id='watchlist'>Watchlist</p>

          <div id='table_header'>
            <p id='currency'>Currency</p>
            <p id='last'>Last</p>
            <p id='day_change'>24h%</p>
            <p id='week_change'>7d%</p>
            <p id='mktcap'>Mrkt Cap</p>
          </div>

        

          <div id='col-1' className="col">
            {currecncies.map(coin =>
              <>
              <p id='coin'>{coin}</p>
              <div id='line'></div>
              </>
            )}
          </div>
          <div id='col-2' className="col">
            {prices_array.map(x =>
              <>
              <p>{Number(x).toFixed(2)}</p>
              {/* <div id='line' className={`row${x}`}></div> */}
              </>
            )}
          </div>
          <div id='col-3' className="col">
            {percent_array.map(x =>
              <>
              <p>{Number(x).toFixed(2)}%</p>
              {/* <div id='line' className={`row${x}`}></div> */}
              </>
            )}
          </div>
          <div id='col-4' className="col">
            <p>3.02%</p>
            <p>3.02%</p>
            <p>3.02%</p>
            <p>3.02%</p>
            <p>3.02%</p>
            <p>3.02%</p>
            <p>3.02%</p>
            <p>3.02%</p>
            <p>3.02%</p>


          </div>
          <div id='col-5'className="col">
            <p>$370 B</p>
            <p>$370 B</p>
            <p>$370 B</p>
            <p>$370 B</p>
            <p>$370 B</p>
            <p>$370 B</p>
            <p>$370 B</p>
            <p>$370 B</p>
            <p>$370 B</p>
          </div>

            








      </div>
      <div></div>
    </div>
  );
}

export default App;
