import React, { useState } from 'react'
import './Transfer.css'
import { useFormik } from 'formik'
import { TransferSchema } from './Validate'
import { ethers } from 'ethers'
import abi from './contract.json'

const Transfer = () => {
  const [loading, setLoading] = useState(null)

  const formik = useFormik({
    // set initail values to the form fields
    initialValues: {
      transferAddress: '',
      transferAmount: '',
    },
    validationSchema: TransferSchema,
    onSubmit: async (values) => {
      // alert("you clicked")
      // alert(JSON.stringify(values, null, 2))
      console.log(values)

      let addressOfReciever = document.getElementById('transfer1').value
      console.log(addressOfReciever)
      let amountOfTransfer = document.getElementById('transfer2').value
      console.log(amountOfTransfer)
      amountOfTransfer = ethers.utils.parseUnits(amountOfTransfer, 18)
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      let dollar
      dollar = new ethers.Contract(
        '0xcdDE91494F756194866304dE60186d3ffA7bFB6C',
        abi,
        provider,
      )
      const signer = await provider.getSigner()
      const Contract = dollar.connect(signer)
      setLoading(true)

      await Contract.transfer(addressOfReciever, amountOfTransfer)
        .then((res) => {
          setLoading(false)
        })
        .catch((err) => {
          console.log('this is error', err)
          setLoading(false)
        })
    },
  })
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 " id="transfer">
          <div className="col-lg-4 col-md-4 col-sm-12 col-12" id="innerTransfer">
            <h3>Transfer Token</h3>
            <div id="t1" className="col-12">
              <input
                type="text"
                id="transfer1"
                name="transferAddress"
                onChange={formik.handleChange}
                value={formik.values.transferAddress}
                onBlur={formik.handleBlur}
                class="form-control"
                placeholder="Enter Address"
                aria-label=""
                aria-describedby="basic-addon2"
              />
              {formik.errors.transferAddress && (
                <div className="error" style={{ color: 'red' }}>
                  {formik.errors.transferAddress}
                </div>
              )}
            </div>
            <div id="b2" className="col-12">
              <input
                type="text"
                id="transfer2"
                name="transferAmount"
                onChange={formik.handleChange}
                value={formik.values.transferAmount}
                onBlur={formik.handleBlur}
                class="form-control"
                placeholder="Enter Amount Burn"
                aria-label=""
                aria-describedby="basic-addon2"
              />
              {formik.errors.transferAmount && (
                <div className="error" style={{ color: 'red' }}>
                  {formik.errors.transferAmount}
                </div>
              )}
            </div>
            <button
              className="btn btn-primary"
              id="burnBtn"
              onClick={formik.handleSubmit}
            >
              {loading ? 'Transfering.....' : 'Transfer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transfer
