import React from 'react'

//在風格的頁面下，用來裝所有文章預覽的框框
const MeterList = (props) => {
    return (
        <div className="w-100 flex justify-center bg-light-gray">
            <div className="w-100 w-90-m w-80-l mw8 flex flex-column ph3 pa3-ns">
                {props.children}
            </div>
        </div>
    )
}

export default MeterList
