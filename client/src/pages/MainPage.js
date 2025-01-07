import React, { useEffect, useState } from 'react'
import axios from 'axios'

function MainPage() {

    const [date, setDate] = useState(null);
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
    const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
    const [currencyNames, setCurrencyNames] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const response = await axios.get("http://localhost:5000/convert" , {
                params:{
                    date,
                    sourceCurrency,
                    targetCurrency,
                    amountInSourceCurrency,
                },
            });

            setAmountInTargetCurrency(response.data);
            setLoading(false);

            console.log(amountInSourceCurrency, amountInTargetCurrency)
        } catch (err) {
            console.error(err);
        }
    }
    
    //get all currencies
    useEffect(() => {
        const getCurrencyNames = async () => {
            try {
                const response = await axios.get("http://localhost:5000/getAllCurrency");
                setCurrencyNames(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getCurrencyNames();
    }, [])

  return (
    <div>
        <h1 className=' lg:mx-32 text-5xl font-bold text-yellow-500'>Convert Your Currency</h1>
        <p className=' lg:mx-32 opacity-40 py-6'>Welcome to Currency converter app. You can easily convert your currencies through this app based on the latest exchange rates
            Whther you are planning a trip, managing your finance, or simply curious about the value of your money in different currencies,
            this tool is here to help.
        </p>

        <div className=' mt-5 flex items-center justify-center flex-col'>
            <section className=' w-full lg:w-1/2'>
                <form onSubmit={handleSubmit}>
                    <div className=" mb-4">
                        <label 
                        htmlFor={date}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Date
                        </label>
                        <input
                        onChange={(e) => setDate(e.target.value)} 
                        type="Date" 
                        id={date}
                        name={date} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500" 
                        placeholder="name@flowbite.com" required />
                    </div>

                    <div className=" mb-4">
                        <label 
                        htmlFor={sourceCurrency}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Source Currency
                        </label>
                        <select
                        onChange={(e) => setSourceCurrency(e.target.value)} 
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500" 
                         name={sourceCurrency} 
                         id={sourceCurrency}
                         value={sourceCurrency}>
                            <option value="">Select source currency</option>
                            {Object.keys(currencyNames).map((currency) => (
                                <option className=' p-1' key={currency} value={currency}>
                                    {currencyNames[currency]}
                                </option>
                            ))}

                        </select>
                    </div>

                    <div className=" mb-4">
                        <label 
                        htmlFor={targetCurrency}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Target Currency
                        </label>
                        <select 
                         onChange={(e) => setTargetCurrency(e.target.value)}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500" 
                         name={targetCurrency} 
                         id={targetCurrency}
                         value={targetCurrency}>
                            <option value="">Select target currency</option>
                            {Object.keys(currencyNames).map((currency) => (
                                <option className=' p-1' key={currency} value={currency}>
                                    {currencyNames[currency]}
                                </option>
                            ))}

                        </select>
                    </div>

                    <div className=" mb-4">
                        <label 
                        htmlFor={amountInSourceCurrency}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Amount in source currency
                        </label>
                        <input
                        onChange={(e) => setAmountInSourceCurrency(e.target.value)} 
                        type="text" 
                        id={amountInSourceCurrency}
                        name={amountInSourceCurrency} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500" 
                        placeholder="Amount in source currency" required />
                    </div>

                    <button className=' bg-yellow-600 hover:bg-yellow-700 text-white font-medium 
                     py-2 px-4 rounded-md'>
                        Get the target currency
                        </button>
                    
                </form>
            </section>
        </div>

        {!loading ? (
        <section className=' lg:mx-60 mt-5 text-xl'>
        {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equal to{" "}
        <span className=' text-yellow-500 font-bold'>{amountInTargetCurrency}</span> in {currencyNames[targetCurrency]}
        </section>
        ) : null}

        
       
    </div>
  )
}

export default MainPage