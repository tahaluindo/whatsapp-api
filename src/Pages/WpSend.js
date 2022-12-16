import React, { useState } from 'react'
import axios from 'axios'

function WpSend() {
    const [number, setNumber] = useState()
    const [type, setType] = useState()
    const [parameter, setParameter] = useState()
    const [orderId, setOrderId] = useState()

    const handleSave = () => {
        console.log(process.env.REACT_APP_ACCESS_TOKEN)
        // console.log("Values", number, type, parameter)
        const mobileNo = +91 + number;
        const config = {
            headers: { Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}` }
        };

        const bodyParameterSimple = {  // This is for send message directly without variables
            messaging_product: "whatsapp",
            to: mobileNo,
            type: "template",
            template: {
                name: type,
                language: {
                    "code": "en_US"
                }
            }
        };

        axios.post(
            `https://graph.facebook.com/v14.0/${process.env.REACT_APP_PHONE_NUMBER_ID}/messages`,
            bodyParameterSimple,
            config
        ).then(console.log).catch(console.log);
    }

    return (
        <>
            <div className='border p-10 shadow-2xl leading-7'>
                <p className='text-center text-2xl font-semibold'>Simple Static</p>
                <div className='my-2'>
                    <p>WhatsApp Number</p>
                    <input onChange={(e) => setNumber(e.target.value)} type="text" className='px-3 border border-gray-400 w-60 h-8' />
                </div>
                <div className='my-2'>
                    <p>Type</p>
                    <select onChange={(e) => setType(e.target.value)} type="" className='px-3 border border-gray-400 w-60 h-8' >
                        <option value="">Select</option>
                        <option value="hello_world">Hello World</option>
                        <option value="trans_first">Trans First</option>
                    </select>
                </div>
                {/* <div className='my-2'>
                    <p>Name</p>
                    <input onChange={(e) => setParameter(e.target.value)} type="text" className='px-3 border border-gray-400 w-60 h-8' />
                </div>
                <div className='my-2'>
                    <p>Oder ID</p>
                    <input onChange={(e) => setOrderId(e.target.value)} type="text" className='px-3 border border-gray-400 w-60 h-8' />
                </div> */}
                <div className='my-3 flex justify-center'>
                    <button onClick={handleSave} className='px-4 py-1 bg-green-500'>Send</button>
                </div>
            </div>
        </>
    )
}

export default WpSend

/*
Exported To -
1. WhatsAppIndex.js
*/