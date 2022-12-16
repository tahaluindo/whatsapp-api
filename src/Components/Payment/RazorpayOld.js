//////////////////////////////////////////////////////////////////////////////////////
//    Author - Dipu Singh
//    Version - 1.0
//    Date - 18 Aug 2022
//    Revision - 1
//    Project - JUIDCO
//    Component  - RazorpayOld.js
//    DESCRIPTION - RazorpayOld Component
//////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { format } from 'date-fns'

function RazorpayOld({ data }) {
    const [bearerToken, setBearerToken] = useState()
    const [paymentId, setPaymentId] = useState()
    // console.log("Prop data", data)

    //Bearer Tocken 
    useEffect(() => {
        const bearerTokenInit = localStorage.getItem('token');
        setBearerToken(bearerTokenInit)
        console.log("RZP  Token is : ", bearerToken)
    }, [data])


    // console.log("date is",format ( new Date(), 'dd-MM-yyyy hh:mm:ss'))
    // const dateNow = format(new Date(), 'dd-MM-yyyy hh:mm:ss')

    // const amount = 100;
   
    const payNow = () => {
        var options = {
            key: "rzp_test_1qUbsrxFZinD7l",
            key_secret: "uQ8xjJ0ttUVdOubPHol6jBDJ",
            // amount: amount * 100,
            amount: 100 * 100,
            currency: "INR",
            name: "JUDCO Corp.",
            description: "This is test Payment",
            handler: function (response) {
                console.log("All response", response)
                alert("Payment Susscess", response.razorpay_payment_id);
                setPaymentId(response.razorpay_payment_id)
                console.log("Payment ID", response.razorpay_payment_id);
                // saveData(response.razorpay_payment_id, "Complated")
            },
            prefill: {
                name: "Dipu",
                email: "Dipu@testmail.com",
                contact: 9708846652
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
        pay.open();
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
                <button
                    className="bg-green-700 my-5 hover:bg-green-500 text-white font-bold py-2 px-10 rounded"
                    onClick={payNow}>
                    Pay Now
                </button>
            </div>
        </>
    )
}

export default RazorpayOld

/*
Exported to
1. Many files where needed
*/