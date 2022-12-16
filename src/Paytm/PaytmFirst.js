import axios from 'axios'
import React, { useState } from 'react'

function PaytmFirst() {
    const [amount, setAmount] = useState()

    const handleBtn = () => {

        const payload = {
            "amount": amount
        }


        // axios.post('http://192.168.0.240:82/api/transaction-token', payload)
        axios.post('http://http://203.129.217.245:80/api/transaction-token', payload)
            .then((res) => {
                console.log("Pytm success", res)
                openJsCheckoutPopup(res.data.orderId, res.data.txnToken, res.data.amount,)
            })
            .catch((err) => console.log("Error Paytm", err))

    }

    function openJsCheckoutPopup(orderId, txnToken, amount) {
        var config = {
            "root": "",
            "flow": "DEFAULT",
            "data": {
                "orderId": orderId,
                "token": txnToken,
                "tokenType": "TXN_TOKEN",
                "amount": amount
            },
            "merchant": {
                "redirect": true
            },
            "handler": {
                "notifyMerchant": function (eventName, data) {
                    console.log("notifyMerchant handler function called");
                    console.log("eventName => ", eventName);
                    console.log("data => ", data);
                }
            }
        };
        if (window.Paytm && window.Paytm.CheckoutJS) {
            // initialze configuration using init method 
            window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                // after successfully updating configuration, invoke checkoutjs
                window.Paytm.CheckoutJS.invoke();
            }).catch(function onError(error) {
                console.log("error => ", error);
            });
        }
    }



    return (
        <>
            <div className='m-5'>
                <p>
                    <input onChange={(e) => setAmount(e.target.value)} type="number" className='border border-black my-5' placeholder='Enter Amount here' />
                </p>

                <button className='border bg-sky-400 rounded-sm shadow-md py-2 px-4' onClick={handleBtn}> Payment Pateway </button>
            </div>
        </>
    )
}

export default PaytmFirst