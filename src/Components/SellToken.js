import React, { useState } from 'react';
import "./Sell.css"
import { useFormik } from 'formik'
import { SellSchema } from './Validate'
import { ethers } from 'ethers'
import abi from './contract.json'

const SellToken = () => {

  const [loading, setLoading] = useState(null)


  const formik = useFormik({
    // set initail values to the form fields
    initialValues: {
      sellAmount: ''
    },
    validationSchema: SellSchema,
    onSubmit: async (values) => {
      // alert("you clicked")
      // alert(JSON.stringify(values, null, 2))
      console.log(values)
        let amountBuy = document.getElementById("s1").value;
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
        await Contract.sellToken( amountBuy);
        setLoading(false);
      
    }
  })
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-12 " id="buy">
        <div className="col-lg-4 col-md-4 col-sm-12 col-12" id="innerBuy">
          <h3>Sell Token</h3>
          <div id="se1" className="col-12">
            <input
              type="text"
              id="s1"
              name="sellAmount"
              onChange={formik.handleChange}
              value={formik.values.sellAmount}
              onBlur={formik.handleBlur}
              class="form-control"
              placeholder="Enter Address"
              aria-label=""
              aria-describedby="basic-addon2"
            />
            {formik.errors.sellAmount && (
              <div className="error" style={{ color: 'red' }}>
                {formik.errors.sellAmount}
              </div>
            )}
          </div>
         
          <button
            className="btn btn-primary"
            id="burnBtn"
            onClick={formik.handleSubmit}
          >
            {loading ? 'Selling' : 'Sell Token'}
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SellToken