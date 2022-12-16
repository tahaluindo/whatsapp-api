//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 25 Oct 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - RzpNew.js
//    DESCRIPTION - RzpNew Component
//////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
// import { format } from 'date-fns'

function RzpNew({ data }) {
    const [bearerToken, setBearerToken] = useState()
    const [paymentId, setPaymentId] = useState()
    const [loader, setLoader] = useState(false)
    const [amount, setAmount] = useState()
    const [number, setNumber] = useState()
    // console.log("Prop data", data)

    //Bearer Tocken 
    useEffect(() => {
        const bearerTokenInit = localStorage.getItem('token');
        setBearerToken(bearerTokenInit)
        console.log("RZP  Token is : ", bearerToken)
    }, [data])

    //////////////// DELETE LATER //////////////////////

    const handleSend = (payment_Id) => {

        axios.post('http://192.168.0.240:82/api/pdfview', { "name": payment_Id, "phone": amount })
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
                                    link: url,
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


    ////////////////// Delete Lalter /////////////////////////////////


    console.log("amount", amount)

    const getOrderId = async () => {

        // check razorpay server
        const res = await (
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }


        setLoader(true)
        axios.post('http://192.168.0.240:82/api/razorpay-payment', { "amount": amount })
            .then((res) => {
                console.log("Order Id Response ", res)
                if (res.data.status === true) {
                    console.log("OrderId Generated", res.data.data.orderId)
                    payNow(res.data.data.orderId, res.data.data.amount)
                    setLoader(false)
                }
            })
            .catch((err) => {
                alert("Backend Server error. Are you online?");
                console.log("Order Id ERROR ", err)
                setLoader(false)
            })
    }




    const payNow = (orderId, amount) => {
        var options = {
            key: "rzp_test_3MPOKRI8WOd54p",
            amount: amount,
            currency: "INR",
            image: "http://example.com/your_logo.jpg",
            name: "JUDCO Corp.",
            description: "Testing with SAM and WEbhook",
            order_id: orderId,
            handler: function (response) {
                console.log("All response", response)
                alert("Payment Susscess", response.razorpay_payment_id);
                console.log("Payment ID", response.razorpay_payment_id);
                handleSend(response.razorpay_payment_id)
                // setPaymentId(response.razorpay_payment_id)
                // saveData(response.razorpay_payment_id, "Complated")
            },
            // handler: async function (response) {
            //     const data = {
            //         orderCreationId: orderId,
            //         razorpayPaymentId: response.razorpay_payment_id,
            //         razorpayOrderId: response.razorpay_order_id,
            //         razorpaySignature: response.razorpay_signature,
            //     };
            //     const result = await axios.post("http://localhost:5000/payment/success", data);
            //     alert(result.data.msg);
            // },
            prefill: {
                name: "Sam",
                email: "sam@testmail.com",
                contact: 9785458000
                // name: data.name,
                // email: data.email,
                // contact: data.phone
            },
            "modal": {
                "ondismiss": function (response) {
                    //  window.location.replace("//put your redirect URL");
                    console.log("Payment Cancel BY user", response);
                    // saveData("Cancel by User", "Cancel")
                },
                "onfailed": function (response) {
                    console.log("Payment Failed Response", response);
                    // saveData(response.razorpay_payment_id, "Failed")
                }
            },
            notes: {
                address: "Razorpay Corporate office"
            },
            theme: {
                color: "#3399cc"
            }
        };
        var pay = new window.Razorpay(options);

        pay.on('payment.failed', function (response) {
            console.log("Failed Response", response)
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });

        pay.open();
        // setLoader(false)
    }



    //Registration Data using AXIOS POST

    // const saveData = (id, staus) => {
    //     console.log("id is= and status", id, staus)
    //     axios({
    //         method: "post",
    //         url: "http://192.168.0.166/api/store-payment",
    //         data: {
    //             "paymentID": id,
    //             "orderID": "",
    //             "amount": data.amount,
    //             "name": data.name,
    //             "email": data.email,
    //             "phone": data.phone,
    //             "module": data.module,
    //             "paymentStatus": staus,
    //             // "paymentDate":"2022-08-08 06:55:58", 
    //             "paymentDate": dateNow,
    //         },
    //         headers: {
    //             // Authorization: `Bearer ${bearerToken}`,
    //             Authorization: `Bearer 373|jWdkkHZ9U84znkR3PJCGvL7HabJB2jbeg7Z0FiSP`,
    //             Accept: 'application/json',
    //         }
    //     })
    //         .then(function (response) {
    //             if (response.data.status) {
    //                 console.log("Payment Data Stores Sussussfull", response);
    //             } else {
    //                 console.log("Data Not Saved..")
    //             }
    //         })
    //         .catch(function (response) {
    //             console.log("Failed to Store Data", response);
    //         });
    // }

    return (
        <>
            <div>
                {
                    loader &&
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                }
                <div>
                    <p>
                        <label htmlFor="number">Amount </label>  <input type="number" className='border rounded-md' onChange={(e) => setAmount(e.target.value)} />
                    </p>
                    <p>
                        <label htmlFor="number">Phone Number </label>  <input type="number" className='border rounded-md' onChange={(e) => setNumber(e.target.value)} />

                    </p>
                </div>

                <button
                    className="bg-green-700 my-5 hover:bg-green-500 text-white font-bold py-2 px-10 rounded"
                    onClick={getOrderId}>
                    {/* onClick={payNow}> */}
                    Rzp Pay New
                </button>
            </div>
        </>
    )
}

export default RzpNew

/*
Exported to
1. Many files where needed
*/
// export default RzpNew