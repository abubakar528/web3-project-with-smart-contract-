import React, { useEffect, useState } from 'react'
import './Mint.css'
import { useFormik } from 'formik'
import { LoginSchema } from './Validate'
import { ethers } from 'ethers'
import abi from './contract.json'

const Mint = () => {
  const [owner, setOwner] = useState('')
  const [loading, setLoading] = useState(null)

  const formik = useFormik({
    // set initail values to the form fields
    initialValues: {
      mintAddress: '',
      mintAmount: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      // alert("you clicked")
      // alert(JSON.stringify(values, null, 2))
      console.log(values)
      let address = document.getElementById('mint1').value
      console.log(address)
      let amount = document.getElementById('mint2').value
      console.log(amount)
      amount = ethers.utils.parseUnits(amount, 18)
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      let dollar
      dollar = new ethers.Contract(
        '0xcdDE91494F756194866304dE60186d3ffA7bFB6C',
        abi,
        provider,
      )
      const signer = await provider.getSigner()
      const addressofUser = await signer.getAddress()
      console.log('add of USER', addressofUser)
      console.log('Signer', window.ethereum.selectedAddress)
      if (addressofUser !== owner) {
        alert('caller in not owner')
        setLoading(false)
      } else {
        const Contract = dollar.connect(signer)
        setLoading(true)
        await Contract.mint(address, amount)
          .then((res) => {
            setLoading(false)
          })
          .catch((err) => {
            console.log('this is error', err)
            setLoading(false)
          })
      }
    },
  })

  useEffect(() => {
    ownerOf()
  })

  const ownerOf = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    let dollar
    dollar = new ethers.Contract(
      '0xcdDE91494F756194866304dE60186d3ffA7bFB6C',
      abi,
      provider,
    )
    console.log('OWNER', await dollar.owner())
    setOwner(await dollar.owner())
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 " id="mint">
            <div className="col-lg-4 col-md-4 col-sm-12 col-12"  id="innerMint">
              <h3>Mint Token</h3>
              <div id="m1" className="col-12">
                <input
                  type="text"
                  id="mint1"
                  name="mintAddress"
                  onChange={formik.handleChange}
                  value={formik.values.mintAddress}
                  onBlur={formik.handleBlur}
                  class="form-control"
                  placeholder="Enter Address"
                  aria-label=""
                  aria-describedby="basic-addon2"
                />
                {formik.errors.mintAddress && (
                  <div className="error" style={{ color: 'red' }}>
                    {formik.errors.mintAddress}
                  </div>
                )}
              </div>
              <div id="m2" className="col-12">
                <input
                  type="text"
                  id="mint2"
                  name="mintAmount"
                  onChange={formik.handleChange}
                  value={formik.values.mintAmount}
                  onBlur={formik.handleBlur}
                  class="form-control"
                  placeholder="Enter Amount"
                  aria-label=""
                  aria-describedby="basic-addon2"
                />
                {formik.errors.mintAmount && (
                  <div className="error" style={{ color: 'red' }}>
                    {formik.errors.mintAmount}
                  </div>
                )}
              </div>
              <button
                className="btn btn-primary"
                id="mintBtn"
                type='submit'
                onClick={formik.handleSubmit}
              >
                {loading ? 'Minting.....' : 'Mint Token'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Mint
