import React from 'react'
import DynamicVar from './DynamicVar'
import DynamicWithURL from './DynamicWithURL'
import WpFileUpload from './WpFileUpload'
import WPpdfWithApi from './WPpdfWithApi'
import WpSend from './WpSend'

function WhatsAppIndex() {
    return (
        <div>
            <div className='flex '>
                <div className='flex flex-wrap m-5 leading-7 space-x-5'>
                    <WpSend />
                    <DynamicVar />
                    <DynamicWithURL />
                    <WpFileUpload />
                    <WPpdfWithApi />
                </div>
            </div>
        </div>
    )
}

export default WhatsAppIndex
