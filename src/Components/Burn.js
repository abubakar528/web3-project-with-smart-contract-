import React, { useEffect, useState } from 'react';
import "./Burn.css"
import { useFormik } from 'formik'
import { BurnSchema } from './Validate'
import { ethers } from 'ethers'
import abi from './contract.json'

const Burn = () => {
  const [owner, setOwner] = useState('')
  const [loading, setLoading] = useState(null)

  const formik = useFormik({
    // set initail values to the form fields
    initialValues: {
      burnAddress: '',
      burnAmount: '',
    },
    validationSchema: BurnSchema,
    onSubmit: async (values) => {
      // alert("you clicked")
      // alert(JSON.stringify(values, null, 2))
      console.log(values)
      let amountBuy = document.getElementById("burn2").value;
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
    await Contract.burn(amountBuy);
    setLoading(false);

    }
  })

 
  return (
    <>
       <div className="container-fluid">
        <div className="row">
          <div className="col-12 " id="burn">
            <div className="col-lg-4 col-md-4 col-sm-12 col-12"  id="innerBurn">
              <h3>Burn Token</h3>
             
              <div id="b2" className="col-12">
                <input
                  type="text"
                  id="burn2"
                  name="burnAmount"
                  onChange={formik.handleChange}
                  value={formik.values.burnAmount}
                  onBlur={formik.handleBlur}
                  class="form-control"
                  placeholder="Enter Amount Burn"
                  aria-label=""
                  aria-describedby="basic-addon2"
                />
                {formik.errors.burnAmount && (
                  <div className="error" style={{ color: 'red' }}>
                    {formik.errors.burnAmount}
                  </div>
                )}
              </div>
              <button
                className="btn btn-primary"
                id="burnBtn"
                onClick={formik.handleSubmit}
              >
                {loading ? 'Burning.....' : 'Burn Token'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Burn