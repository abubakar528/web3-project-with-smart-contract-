import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from "../images/logo.jpg"
import { ethers, utils } from "ethers";


const Navbar = () => {
  const [connect, setConnect] = useState(false);
  useEffect(()=>{
    setTimeout(() => {
      if(window.ethereum.selectedAddress){
        connectWallet();
      }
    }, 500)
  })
  const connectWallet= async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const blanceOfUser= Number(await signer.getBalance()/1e18);
    console.log("Balance of User",blanceOfUser)
    console.log(address);
    setConnect(true);
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12" id="first">
            {' '}
            <div id="navbar" className="col-7">
             {/* <img id="logoImg" src={Logo}></img>*/}
             <button className='btn btn-success' onClick={connectWallet}> 
           {connect ? "Connected" :  "Connect Wallet"} 
           </button>
            </div>
            <div className="col-5" id="nav1">
            <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
                <div class="container-fluid">
                 
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#" style={{ color: 'white' }}>
                          <Link
                            to="/"
                            style={{ color: 'white', textDecoration: 'none' }}
                          >
                            Home
                          </Link>
                          
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          aria-current="page"
                          style={{ color: 'white' }}
                          href="#"
                        >
                        
                         
                          <Link
                            to="mint"
                            style={{ color: 'white', textDecoration: 'none' }}
                          >
                            Mint
                          </Link>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#" style={{ color: 'white' }}>
                          <Link
                            to="burn"
                            style={{ color: 'white', textDecoration: 'none' }}
                          >
                            Burn
                          </Link>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#" style={{ color: 'white' }}>
                          <Link
                            to="transfer"
                            style={{ color: 'white', textDecoration: 'none' }}
                          >
                            Transfer
                          </Link>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#" style={{ color: 'white' }}>
                          <Link
                            to="buytoken"
                            style={{ color: 'white', textDecoration: 'none' }}
                          >
                            Buy
                          </Link>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#" style={{ color: 'white' }}>
                          <Link
                            to="selltoken"
                            style={{ color: 'white', textDecoration: 'none' }}
                          >
                            Sell
                          </Link>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#" style={{ color: 'white' }}>
                          <Link
                            to="withdraw"
                            style={{ color: 'white', textDecoration: 'none' }}
                          >
                            WithDraw
                          </Link>
                          
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
