import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlgolia } from '@fortawesome/free-brands-svg-icons'
import { connectPoweredBy } from "react-instantsearch-dom"

//是custom的，需要傳給api的connectPoweredBy
//algolia回傳url進來，我們需要render出連結
const PoweredBy = ({url}) => {
    return (
        <div className="w-100 tr near-white h2">
            站內搜尋由
            <a href={url}>
                <FontAwesomeIcon icon={faAlgolia} /> algolia
            </a>
            提供
        </div>
    )
}

//api的connectPoweredBy會傳回完成的component
const CustomPoweredBy = connectPoweredBy(PoweredBy);

export default CustomPoweredBy
