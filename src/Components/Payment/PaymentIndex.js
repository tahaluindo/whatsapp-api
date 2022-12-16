import React from 'react'
import RazorpayOld from './RazorpayOld'
import RzpNew from './RzpNew'
import UPI from './UPI'

function PaymentIndex() {
    return (
        <div>
            ------------- New Razorpay With OrderId Backend-------------
            <RzpNew />


            ------------- Simple Razorpay -------------
            <RazorpayOld />

================== QR Code ================
<UPI />

        </div>
    )
}

export default PaymentIndex
