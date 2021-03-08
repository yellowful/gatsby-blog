import React from 'react'
import { navigate } from '@reach/router';

const GoBack = () => {
    const handleGoBack = () => {
        navigate(-1);
    }
    return (
        <div className="w-100 tr ma2">
            <button className="bg-gray near-white pointer dim br2 grow pa2" onClick={handleGoBack}>
                回上一頁
            </button>
        </div>
    )
}

export default GoBack
