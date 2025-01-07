const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// middle wares
app.use(express.json());
app.use(cors());

//get all currencies
app.get("/getAllCurrency", async(req, res) => {

    const nameURL = `https://openexchangerates.org/api/currencies.json?app_id=960676c397914fe98c5e577da9782fa9`

      try {
        const nameResponse = await axios.get(nameURL);
        const nameData = nameResponse.data;
    
        return res.json(nameData);
    } catch (err) {
        console.error(err);
    }
     
})

//get the target amount
app.get("/convert" , async(req, res) => {

    const {date,
        sourceCurrency,
        targetCurrency,
        amountInSourceCurrency} = req.query;

        try {
            const dataUrl =`https://openexchangerates.org/api/historical/${date}.json?app_id=960676c397914fe98c5e577da9782fa9`

          const dataResponse = await axios.get(dataUrl);
          const rates = dataResponse.data.rates;

          //rates
          const sourceRate = rates[sourceCurrency];
          const targetRate = rates[targetCurrency];

          //target value
          const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

          return res.json(targetAmount.toFixed(2));

        } catch (err) {
            console.error(err);
        }
})

// listen to the port number
app.listen( 5000, () => {
    console.log("Server is running on port 5000");
})