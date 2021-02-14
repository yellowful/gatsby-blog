import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlgolia } from '@fortawesome/free-brands-svg-icons'
import { connectPoweredBy } from "react-instantsearch-dom"

const PoweredBy = ({url}) => {
    return (
        <div className="w-100 tr near-white h2">
            本搜尋由
            <a href={url}>
                Algolia<FontAwesomeIcon icon={faAlgolia} />
            </a>
            提供
        </div>
    )
}

const CustomPoweredBy = connectPoweredBy(PoweredBy);

export default CustomPoweredBy
