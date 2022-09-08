import React from 'react'
import './home.css'

const Home = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-0" id="home">
            <div id="homeLeft" className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="col-8" id="inLeft">
                <h2>Crypto Currency</h2>
                <p>
                  In computer science, a cryptocurrency, crypto-currency, or
                  crypto is a digital currency that does not rely on any central
                  authority to uphold or maintain it. Instead, transaction and
                  ownership data is stored in a digital ledger using distributed
                  ledger technology, typically a blockchain
                </p>
              </div>
            </div>
            <div id="homeRight" className="ccol-lg-6 col-md-6 col-sm-12 col-12">
              rigth
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
