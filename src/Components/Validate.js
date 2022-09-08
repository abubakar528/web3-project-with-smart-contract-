import * as Yup from 'yup';

  export const LoginSchema = Yup.object().shape({
    mintAddress: Yup.string().required("address is required"),
    mintAmount: Yup.string().required("amount is required"),
    // tokenDecimals: Yup.string().required("decimals must be 18"),
    // initialSupply: Yup.number().required("must provide initial supply").moreThan(0, "initail supply must be greater than 0"),
    // totalSupply: Yup.number().required("total supply required").moreThan(0, "total supply must be greater than 0"),
  });


  export const BurnSchema = Yup.object().shape({
    burnAddress: Yup.string().required("address is required"),
    burnAmount: Yup.string().required("amount is required"),
   
  });
  export const TransferSchema = Yup.object().shape({
    transferAddress: Yup.string().required("address is required"),
    transferAmount: Yup.string().required("amount is required"),
   
  });
  export const BuySchema = Yup.object().shape({
    buyAmount: Yup.string().required("Eneter Amount "),
  });
  export const SellSchema = Yup.object().shape({
    sellAmount: Yup.string().required("Eneter Amount "),
  });
