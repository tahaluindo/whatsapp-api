import React, { useState } from 'react'
import axios from 'axios'

function WPpdfWithApi() {
    const [number, setNumber] = useState()
    const [inputName, setInputName] = useState()

    //Generate PDF
    const handleSend=()=>{
        
        axios.post('http://203.129.217.245:80/api/pdfview', {"name":inputName, "phone":number})
        .then((res) => {
            console.log("PDF Generated", res)
            handleSave(res.data.data)
        })
        .catch((err) => console.log("Error ocrres while generating pdf", err))
    
    }


    const handleSave = (url) => {
        console.log("URL is", url)
        console.log(process.env.REACT_APP_ACCESS_TOKEN)
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
                                    // link: "http://www.xmlpdf.com/manualfiles/hello-world.pdf",
                                    link:url,
                                    filename: "Payment Receipt.pdf"
                                }
                            }
                        ]
                    },
                ]
            }

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
                <p className='text-center text-2xl font-semibold'>Send PDF using <br /> PDF Generate API</p>
                <div className='my-2'>
                    <p>WhatsApp Number</p>
                    <input onChange={(e) => setNumber(e.target.value)} type="text" className='px-3 border border-gray-400 w-60 h-8' />
                </div>
                <div className='my-2'>
                    <p>Name</p>
                    <input onChange={(e) => setInputName(e.target.value)} type="text" className='px-3 border border-gray-400 w-60 h-8' />
                </div>
                <div className='my-3 flex justify-center'>
                    <button onClick={handleSend} className='px-4 py-1 bg-green-500'>Send</button>
                </div>
            </div>
        </>
    )
}

export default WPpdfWithApi


/*
Exported To -
1. WhatsAppIndex.js
*/