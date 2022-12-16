import React, { useState } from 'react'
import axios from 'axios'

function WpFileUpload() {
    const [number, setNumber] = useState()
    const [type, setType] = useState()
    const [parameter, setParameter] = useState()
    const [url, setUrl] = useState()

    const handleSave = () => {
        console.log(process.env.REACT_APP_ACCESS_TOKEN)
        // console.log("Values", number, type, parameter)
        const mobileNo = '91' + number;
        
        const config = {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
                contentType: "application/json"
            }
        };



        const bodyParameterDynamic = {  // This is for pass two variable in body
            //916201675668
            //918404801234

            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: mobileNo,
            type: "template",
            template: {
                name: "file_test ",
                language: {
                    code: "en_US"
                },
                components: [
                    {
                        type: "header",
                        parameters: [
                            {
                                type: "document",
                                document: {
                                    link: "http://www.xmlpdf.com/manualfiles/hello-world.pdf",
                                    filename: "Payment Receipt.pdf"
                                }
                            }
                        ]
                    },
                ]
            }






            // to: "916201675668",
            // messaging_product: "whatsapp",
            // recipient_type: "individual",

            // type: "document",
            // document: {
            //     link: "http://www.xmlpdf.com/manualfiles/hello-world.pdf",
            //     filename: "Hello World.pdf",                               
            // },

            // type: "image",
            // image: {
            //     link: "https://i.stack.imgur.com/LxXXn.png",               
            // }

        };

        axios.post(
            `https://graph.facebook.com/v15.0/${process.env.REACT_APP_PHONE_NUMBER_ID}/messages`,
            bodyParameterDynamic,
            config
        ).then((res) => {
            console.log("Sent", res)
        })
            .catch((err) => {
                console.log("Error ", err)
            })
    }

    return (
        <>
            <div className='border p-10 shadow-2xl leading-7'>
                <p className='text-center text-2xl font-semibold'>File Upload</p>
                <div className='my-2'>
                    <p>WhatsApp Number</p>
                    <input onChange={(e) => setNumber(e.target.value)} type="text" className='px-3 border border-gray-400 w-60 h-8' />
                </div>
                <div className='my-2'>
                    <p>Type</p>
                    <select onChange={(e) => setType(e.target.value)} type="" className='px-3 border border-gray-400 w-60 h-8' >
                        <option value="">Select</option>
                        <option value="trns_first_img">Image</option>
                        <option value="trans_3_var">PDF</option>
                    </select>
                </div>
                <div className='my-2'>
                    <p>Name</p>
                    <input onChange={(e) => setParameter(e.target.value)} type="text" className='px-3 border border-gray-400 w-60 h-8' />
                </div>
                <div className='my-2'>
                    <p>URL</p>
                    <input onChange={(e) => setUrl(e.target.value)} type="text" className='px-3 border border-gray-400 w-60 h-8' />
                </div>
                <div className='my-3 flex justify-center'>
                    <button onClick={handleSave} className='px-4 py-1 bg-green-500'>Send</button>
                </div>
            </div>
        </>
    )
}

export default WpFileUpload
