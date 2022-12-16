import React from 'react'
import PaytmFirst from './PaytmFirst'
import PaytmQR from './PaytmQR'

function PaytmIndex() {
    return (
        <>
            <p className='my-5'>  ---------   Paytm Payment Gatewat   -----------</p>
            <PaytmFirst />
            <p className='my-5'>  ---------   Paytm QR   -----------</p>
            <PaytmQR />
        </>
    )
}

export default PaytmIndex