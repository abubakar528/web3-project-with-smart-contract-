import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import abi from "./contract.json"
import "./Withdraw.css"

const WidthDraw = () => {
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(null);



  useEffect(()=>{
    ownerOf();
  })
  // this is ownwer function 
    const ownerOf =async()=>{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let dollar;
      dollar = new ethers.Contract(
        "0xcdDE91494F756194866304dE60186d3ffA7bFB6C",
        abi,
        provider
      );
      console.log("OWNER",await dollar.owner());
      setOwner(await dollar.owner());
    }
  
  const withDraw=async()=>{
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let dollar;
    dollar = new ethers.Contract(
      "0xcdDE91494F756194866304dE60186d3ffA7bFB6C",
      abi,
      provider
    );
    const signer = await provider.getSigner();
    const addressofUser = await signer.getAddress()
    console.log("add of USER",addressofUser);
    console.log("Signer",window.ethereum.selectedAddress);
    if(addressofUser!==owner){
      alert("caller in not owner")
    }
    else{
      const Contract = dollar.connect(signer);
      setLoading(true); 
      await Contract.withdraw().then((res =>{
      })).catch((err)=>{
        console.log("this is error", err)
      });
    }
  }
  return (
    <>
    <div className="container-fluid">
    <div className="row">
      <div className="col-12 " id="with">
        <div className="col-lg-4 col-md-4 col-sm-12 col-12" id="innerwith">
          <h3>Draw Your Money</h3>
          <div id="we1" className="col-12">
           
           
         
          <button
          className='btn btn-success'
          onClick={withDraw}
            
          >
          WidthDraw Your Ethers
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
  </>
  )
}

export default WidthDraw