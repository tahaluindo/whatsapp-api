import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <>
            <div className='h-14 w-full bg-sky-300 py-2'>
                <div className='mt-2'>
                    <Link className='border bg-blue-400 px-4 py-1 mx-2' to="/"> WhatsApp Interation</Link>
                    <Link className='border bg-blue-400 px-4 py-1 mx-2' to="/payment"> Payment Interation</Link>
                    <Link className='border bg-blue-400 px-4 py-1 mx-2' to="/paytm"> Paytm Interation</Link>
                    <Link className='border bg-blue-400 px-4 py-1 mx-2' to="/admin"> Admin View</Link>
                    <Link className='border bg-blue-400 px-4 py-1 mx-2' to="/chat"> Chat</Link>
                </div>

            </div>
        </>
    )
}

export default Header
