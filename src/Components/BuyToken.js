import React, { useState } from 'react'
import "./Buy.css"
import { useFormik } from 'formik'
import { BuySchema } from './Validate'
import { ethers } from 'ethers'
import abi from './contract.json'

const BuyToken = () => {
  const [loading, setLoading] = useState(null)


  const formik = useFormik({
    // set initail values to the form fields
    initialValues: {
      buyAmount: ''
    },
    validationSchema: BuySchema,
    onSubmit: async (values) => {
      // alert("you clicked")
      // alert(JSON.stringify(values, null, 2))
      console.log(values)
        let amountBuy = document.getElementById("buyt1").value;
        console.log(amountBuy ,"amount of buying token");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        let dollar;
        dollar = new ethers.Contract(
          "0xcdDE91494F756194866304dE60186d3ffA7bFB6C",
          abi,
          provider
        );
        const signer = provider.getSigner();
        const Contract = dollar.connect(signer);
        setLoading(true);
        await Contract.buyToken( amountBuy,  {
          value: (100000000000000 * Number(amountBuy)).toString(),
        });
        setLoading(false);
      
    }
  })
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 " id="buy">
          <div className="col-lg-4 col-md-4 col-sm-12 col-12" id="innerBuy">
            <h3>Buy Token</h3>
            <div id="buyT1" className="col-12">
              <input
                type="text"
                id="buyt1"
                name="buyAmount"
                onChange={formik.handleChange}
                value={formik.values.buyAmount}
                onBlur={formik.handleBlur}
                class="form-control"
                placeholder="Enter Address"
                aria-label=""
                aria-describedby="basic-addon2"
              />
              {formik.errors.buyAmount && (
                <div className="error" style={{ color: 'red' }}>
                  {formik.errors.buyAmount}
                </div>
              )}
            </div>
           
            <button
              className="btn btn-primary"
              id="burnBtn"
              onClick={formik.handleSubmit}
            >
              {loading ? 'Buying' : 'Buy Token'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyToken